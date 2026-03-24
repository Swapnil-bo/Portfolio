import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleField from './ParticleField'

const typedText = '> initializing swapnil_hazra...'

const stats = [
  { value: '12', label: 'Projects Shipped' },
  { value: '100', label: 'Days Challenge' },
  { value: '6+', label: 'Agent Systems' },
]

function Hero() {
  const [displayedChars, setDisplayedChars] = useState(0)
  const [typingDone, setTypingDone] = useState(false)

  // Typed effect — one character every ~50ms for ~1.5s total
  useEffect(() => {
    if (displayedChars < typedText.length) {
      const timer = setTimeout(() => {
        setDisplayedChars(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timer)
    }
    // Small pause after typing finishes before revealing content
    const doneTimer = setTimeout(() => setTypingDone(true), 200)
    return () => clearTimeout(doneTimer)
  }, [displayedChars])

  return (
    <section id="hero" className="min-h-screen relative flex items-center overflow-hidden">
      {/* Particle canvas background */}
      <ParticleField />

      {/* Faint grid underlay */}
      <div className="grid-underlay" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[800px] pl-[10%] pr-4 md:pr-8">
        {/* Line 1: Typed text */}
        <p className="font-mono text-sm md:text-base mb-4" style={{ color: 'var(--text-secondary)' }}>
          {typedText.slice(0, displayedChars)}
          <span className="typed-cursor" />
        </p>

        {/* Line 2: Name — slides up after typing */}
        {typingDone && (
          <h1
            className="font-syne font-bold mb-2 glitch-hover flex flex-wrap gap-x-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
          >
            {['Swapnil', 'Hazra'].map((word, i) => (
              <motion.span
                key={word}
                className="inline-block"
                style={{ color: 'var(--text-primary)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: 'easeOut' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        )}

        {/* Line 3: Subtitle */}
        {typingDone && (
          <motion.p
            className="font-syne font-semibold text-lg md:text-xl mb-4 text-glow"
            style={{ color: 'var(--neon-green)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            AI Engineer &amp; Vibe Coder
          </motion.p>
        )}

        {/* Line 4: Description */}
        {typingDone && (
          <motion.p
            className="font-mono text-sm md:text-base max-w-[600px] mb-8"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            Building privacy-first agents and local LLM systems. Shipping every day for 100 days.
          </motion.p>
        )}

        {/* Stats bar */}
        {typingDone && (
          <motion.div
            className="flex flex-wrap items-center gap-4 md:gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="hidden md:inline mr-2" style={{ color: 'var(--text-ghost)' }}>|</span>
                )}
                <span className="font-syne font-bold text-xl md:text-2xl" style={{ color: 'var(--neon-green)' }}>
                  {stat.value}
                </span>
                <span className="font-mono text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* CTA row */}
        {typingDone && (
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-syne font-semibold text-sm px-7 py-3 rounded transition-all duration-150 hover:scale-[1.02]"
              style={{
                background: 'var(--neon-green)',
                color: 'var(--bg-void)',
                boxShadow: 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,136,0.25), 0 0 80px rgba(0,255,136,0.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
            >
              View Projects ↓
            </a>
            <a
              href="https://github.com/Swapnil-bo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-syne font-semibold text-sm px-7 py-3 rounded border transition-all duration-150"
              style={{
                color: 'var(--neon-green)',
                borderColor: 'var(--neon-green)',
                background: 'transparent',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,136,0.08)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              GitHub →
            </a>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      {typingDone && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator"
          style={{ color: 'var(--text-ghost)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <span className="text-2xl">∨</span>
        </motion.div>
      )}
    </section>
  )
}

export default Hero
