const STORAGE_KEY = 'sound-muted'
const listeners = new Set()

function getDefaultMuted() {
  if (typeof window === 'undefined') return false
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
}

function readMuted() {
  if (typeof window === 'undefined') return false
  let stored = null
  try {
    stored = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return getDefaultMuted()
  }
  if (stored === null) return getDefaultMuted()
  return stored === 'true'
}

let muted = readMuted()

export function isMuted() {
  return muted
}

export function setMuted(value) {
  muted = Boolean(value)
  try {
    window.localStorage.setItem(STORAGE_KEY, String(muted))
  } catch {
    // ignore quota / privacy-mode failures
  }
  listeners.forEach(fn => fn(muted))
}

export function toggleMuted() {
  setMuted(!muted)
  return muted
}

export function subscribeMuted(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}
