import { useSyncExternalStore } from 'react'
import { isMuted, toggleMuted, subscribeMuted } from '../utils/soundPrefs'
import { playClickSound } from '../utils/hoverSound'

function SoundToggle({ className = '' }) {
  const muted = useSyncExternalStore(subscribeMuted, isMuted, () => false)

  const handleClick = () => {
    const wasMuted = muted
    toggleMuted()
    if (wasMuted) playClickSound()
  }

  const label = muted ? 'Unmute UI sounds' : 'Mute UI sounds'

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)'
        if (!muted) playClickSound()
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
      }}
      aria-label={label}
      title={label}
      className={`flex items-center justify-center w-9 h-9 rounded border bg-transparent cursor-pointer transition-all duration-150 ${className}`}
      style={{
        color: muted ? 'var(--text-ghost)' : 'var(--neon-green)',
        borderColor: muted ? 'var(--border-dim)' : 'var(--border-glow)',
        boxShadow: muted ? 'none' : '0 0 12px rgba(0, 255, 136, 0.15)',
      }}
    >
      {muted ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  )
}

export default SoundToggle
