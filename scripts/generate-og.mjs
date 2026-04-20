import sharp from 'sharp'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const svgPath = resolve(here, 'og-image.svg')
const outPath = resolve(here, '..', 'public', 'og.png')

const svg = await readFile(svgPath)
const png = await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: 'contain', background: '#06060e' })
  .png({ compressionLevel: 9 })
  .toBuffer()

await writeFile(outPath, png)
console.log(`✓ wrote ${outPath} (${png.byteLength} bytes)`)
