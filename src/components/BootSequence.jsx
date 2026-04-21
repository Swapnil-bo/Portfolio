import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const bootLines = [
  '[BOOT] Neural Terminal v2.0.26',
  '[INIT] Loading identity matrix... OK',
  '[SCAN] 26 projects indexed',
  '[LINK] GitHub connection established',
  '[SYS]  All modules operational',
  '> Welcome. Initializing interface...',
]

function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const skipBtnRef = useRef(null)
  const skippedRef = useRef(false)

  const handleSkip = () => {
    if (skippedRef.current) return
    skippedRef.current = true
    onComplete()
  }

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    }

    // All lines shown — wait a beat then exit
    const exitTimer = setTimeout(() => {
      handleSkip()
    }, 800)
    return () => clearTimeout(exitTimer)
  }, [visibleLines])

  // Focus skip button on mount + Escape/Enter to skip
  useEffect(() => {
    skipBtnRef.current?.focus()

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        handleSkip()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[10001] flex items-center justify-center"
      style={{ background: 'var(--bg-void)' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Accessible announcement for screen readers (decorative lines are aria-hidden) */}
      <p role="status" aria-live="polite" className="sr-only">
        Loading portfolio. Press Escape or activate the skip button to continue.
      </p>

      {/* Skip button — focusable, visible, top-right */}
      <button
        ref={skipBtnRef}
        onClick={handleSkip}
        className="absolute top-4 right-4 font-jetbrains text-xs px-4 py-2 border rounded transition-all duration-150 cursor-pointer"
        style={{
          color: 'var(--neon-green)',
          borderColor: 'var(--border-dim)',
          background: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-glow)'
          e.currentTarget.style.background = 'rgba(0, 255, 136, 0.08)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-dim)'
          e.currentTarget.style.background = 'transparent'
        }}
      >
        Skip intro →
      </button>

      <div className="w-full max-w-xl px-6" aria-hidden="true">
        {bootLines.map((line, i) => (
          <motion.p
            key={i}
            className="font-mono text-sm md:text-base leading-relaxed"
            style={{ color: 'var(--neon-green)' }}
            initial={{ opacity: 0 }}
            animate={i < visibleLines ? { opacity: [0, 1, 0.7, 1] } : { opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {line}
          </motion.p>
        ))}

        {/* Blinking cursor after last visible line */}
        {visibleLines > 0 && visibleLines <= bootLines.length && (
          <span
            className="inline-block font-mono text-sm md:text-base typed-cursor"
            style={{ color: 'var(--neon-green)' }}
          />
        )}
      </div>
    </motion.div>
  )
}

export default BootSequence
