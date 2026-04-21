import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import ParticleField from './ParticleField'
import { playClickSound } from '../utils/hoverSound'

const typedText = '> initializing swapnil_hazra...'

const stats = [
  { value: 26, label: 'Projects Shipped', suffix: '' },
  { value: 100, label: 'Days Challenge', suffix: '' },
  { value: 6, label: 'Agent Systems', suffix: '+' },
]

// Animated counter hook
function useCounter(target, shouldStart, duration = 1500) {
  const [count, setCount] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!shouldStart || hasStarted.current) return
    hasStarted.current = true

    const startTime = performance.now()

    const animate = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOut: 1 - (1 - t)^3
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)
      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [shouldStart, target, duration])

  return count
}

// Magnetic button wrapper
function MagneticButton({ children, className, style, ...props }) {
  const ref = useRef(null)
  const isMobile = useRef(false)

  useEffect(() => {
    isMobile.current = window.matchMedia('(pointer: coarse)').matches
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (isMobile.current || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < 80) {
      const pull = (1 - dist / 80) * 6
      ref.current.style.transform = `translate(${dx * pull / 80}px, ${dy * pull / 80}px)`
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)'
    }
  }, [])

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      <a
        ref={ref}
        className={className}
        style={{ ...style, transition: 'transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.15s ease' }}
        {...props}
      >
        {children}
      </a>
    </div>
  )
}

function Hero() {
  const [displayedChars, setDisplayedChars] = useState(0)
  const [typingDone, setTypingDone] = useState(false)
  const [startCounters, setStartCounters] = useState(false)

  // Start counters 500ms after typingDone (matches the stats bar stagger delay)
  useEffect(() => {
    if (!typingDone) return
    const timer = setTimeout(() => setStartCounters(true), 500)
    return () => clearTimeout(timer)
  }, [typingDone])

  const count0 = useCounter(stats[0].value, startCounters)
  const count1 = useCounter(stats[1].value, startCounters)
  const count2 = useCounter(stats[2].value, startCounters)
  const counts = [count0, count1, count2]

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

        {/* Stats bar — animated counters */}
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
                  {counts[i]}{stat.suffix}
                </span>
                <span className="font-mono text-xs md:text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* CTA row — magnetic buttons */}
        {typingDone && (
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <MagneticButton
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="font-syne font-semibold text-sm px-7 py-3 rounded transition-all duration-150 hover:scale-[1.02] inline-block"
              style={{
                background: 'var(--neon-green)',
                color: 'var(--bg-void)',
                boxShadow: 'none',
              }}
              data-sound
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(0,255,136,0.25), 0 0 80px rgba(0,255,136,0.08)'
                playClickSound()
              }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
            >
              View Projects ↓
            </MagneticButton>
            <MagneticButton
              href="https://github.com/Swapnil-bo"
              target="_blank"
              rel="noopener noreferrer"
              className="font-syne font-semibold text-sm px-7 py-3 rounded border transition-all duration-150 inline-block"
              style={{
                color: 'var(--neon-green)',
                borderColor: 'var(--neon-green)',
                background: 'transparent',
              }}
              data-sound
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,255,136,0.08)'
                playClickSound()
              }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              GitHub →
            </MagneticButton>
          </motion.div>
        )}
      </div>

      {/* Scroll indicator — cascading chevrons */}
      {typingDone && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center -space-y-3"
          style={{ color: 'var(--text-ghost)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <span className="chevron-cascade chevron-1 text-xl leading-none">∨</span>
          <span className="chevron-cascade chevron-2 text-xl leading-none">∨</span>
          <span className="chevron-cascade chevron-3 text-xl leading-none">∨</span>
        </motion.div>
      )}
    </section>
  )
}

export default Hero
