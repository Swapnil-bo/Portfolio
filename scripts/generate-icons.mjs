import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const svgPath = resolve(here, '..', 'public', 'favicon.svg')
const publicDir = resolve(here, '..', 'public')

const svg = await readFile(svgPath)

async function renderPng(size) {
  return sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 6, g: 6, b: 14, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toBuffer()
}

// 180x180 apple-touch-icon for iOS home screen
const appleTouch = await renderPng(180)
await writeFile(resolve(publicDir, 'apple-touch-icon.png'), appleTouch)
console.log(`✓ apple-touch-icon.png (${appleTouch.byteLength} bytes)`)

// 192 and 512 for PWA / Android install prompts (referenced by manifest.json)
const icon192 = await renderPng(192)
await writeFile(resolve(publicDir, 'icon-192.png'), icon192)
console.log(`✓ icon-192.png (${icon192.byteLength} bytes)`)

const icon512 = await renderPng(512)
await writeFile(resolve(publicDir, 'icon-512.png'), icon512)
console.log(`✓ icon-512.png (${icon512.byteLength} bytes)`)

// Multi-size favicon.ico (16, 32, 48) — hand-assembled ICO wrapping PNGs
// ICO spec: ICONDIR(6) + ICONDIRENTRY(16)*N + PNG data concatenated
const sizes = [16, 32, 48]
const pngs = await Promise.all(sizes.map(renderPng))

const headerSize = 6 + 16 * sizes.length
let offset = headerSize
const entries = []
for (let i = 0; i < sizes.length; i++) {
  entries.push({ size: sizes[i], bytes: pngs[i].byteLength, offset })
  offset += pngs[i].byteLength
}

const header = Buffer.alloc(headerSize)
header.writeUInt16LE(0, 0)                // Reserved
header.writeUInt16LE(1, 2)                // Type: ICO
header.writeUInt16LE(sizes.length, 4)     // Count

entries.forEach((e, i) => {
  const base = 6 + 16 * i
  header.writeUInt8(e.size === 256 ? 0 : e.size, base + 0)   // Width (0 = 256)
  header.writeUInt8(e.size === 256 ? 0 : e.size, base + 1)   // Height (0 = 256)
  header.writeUInt8(0, base + 2)                             // ColorCount
  header.writeUInt8(0, base + 3)                             // Reserved
  header.writeUInt16LE(1, base + 4)                          // Planes
  header.writeUInt16LE(32, base + 6)                         // BitCount (RGBA)
  header.writeUInt32LE(e.bytes, base + 8)                    // BytesInRes
  header.writeUInt32LE(e.offset, base + 12)                  // ImageOffset
})

const ico = Buffer.concat([header, ...pngs])
await writeFile(resolve(publicDir, 'favicon.ico'), ico)
console.log(`✓ favicon.ico (${ico.byteLength} bytes, ${sizes.length} sizes)`)
