let audioCtx = null

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

export function playClickSound() {
  try {
    const ctx = initAudio()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()

    oscillator.connect(gain)
    gain.connect(ctx.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(800, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05)

    gain.gain.setValueAtTime(0.03, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.05)
  } catch {
    // Silently fail — audio is non-critical
  }
}

// Initialize AudioContext on first user interaction
let initialized = false
export function initHoverSound() {
  if (initialized) return
  initialized = true

  const init = () => {
    initAudio()
    document.removeEventListener('click', init)
    document.removeEventListener('keydown', init)
  }

  document.addEventListener('click', init, { once: true })
  document.addEventListener('keydown', init, { once: true })
}
