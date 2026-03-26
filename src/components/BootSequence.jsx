import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const bootLines = [
  '[BOOT] Neural Terminal v2.0.26',
  '[INIT] Loading identity matrix... OK',
  '[SCAN] 14 projects indexed',
  '[LINK] GitHub connection established',
  '[SYS]  All modules operational',
  '> Welcome. Initializing interface...',
]

function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines < bootLines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1)
      }, 300)
      return () => clearTimeout(timer)
    }

    // All lines shown — wait a beat then exit
    const exitTimer = setTimeout(() => {
      onComplete()
    }, 800)
    return () => clearTimeout(exitTimer)
  }, [visibleLines, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[10001] flex items-center justify-center"
      style={{ background: 'var(--bg-void)' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="w-full max-w-xl px-6">
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
