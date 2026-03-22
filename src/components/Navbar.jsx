import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Timeline', id: 'timeline' },
  { label: 'Contact', id: 'contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Scroll detection for background blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for active section tracking
  useEffect(() => {
    const observers = []
    const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean)

    sections.forEach(section => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id)
          }
        },
        { threshold: 0.1, rootMargin: '-80px 0px -50% 0px' }
      )
      observer.observe(section)
      observers.push(observer)
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const scrollTo = (id) => {
    setMobileOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(6, 6, 14, 0.8)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-orbitron font-bold text-sm md:text-base flex items-center gap-0.5"
            style={{ color: 'var(--neon-green)' }}
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            <span className="inline-block" style={{ animation: 'pulse 2s ease-in-out infinite' }}>&#x27E9;</span>
            {' '}swapnil.hazra
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="relative font-jetbrains text-sm transition-all duration-150 hover:-translate-y-px bg-transparent border-none cursor-pointer"
                style={{ color: activeSection === link.id ? 'var(--neon-green)' : 'var(--text-secondary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--neon-green)' }}
                onMouseLeave={(e) => { if (activeSection !== link.id) e.currentTarget.style.color = 'var(--text-secondary)' }}
              >
                {link.label}
                {/* Active underline */}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] transition-all duration-300"
                  style={{
                    width: activeSection === link.id ? '100%' : '0%',
                    background: 'var(--neon-green)',
                    boxShadow: activeSection === link.id ? '0 0 8px rgba(0,255,136,0.4)' : 'none',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Resume Button */}
            <a
              href="/Swapnil_Hazra_Resume_.pdf"
              download
              className="font-jetbrains text-xs px-4 py-1.5 border rounded transition-all duration-150 hover:bg-[rgba(0,212,255,0.08)]"
              style={{
                color: 'var(--neon-cyan)',
                borderColor: 'var(--neon-cyan)',
              }}
            >
              Resume ↓
            </a>

            {/* Status Pill */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border font-jetbrains text-xs"
              style={{
                color: 'var(--neon-green)',
                borderColor: 'var(--border-dim)',
              }}
            >
              <span className="pulse-dot" />
              Open to Internships
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center gap-[5px] bg-transparent border-none cursor-pointer w-11 h-11"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-[2px] transition-all duration-200"
              style={{
                background: 'var(--neon-green)',
                transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none',
              }}
            />
            <span
              className="block w-5 h-[2px] transition-all duration-200"
              style={{
                background: 'var(--neon-green)',
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-[2px] transition-all duration-200"
              style={{
                background: 'var(--neon-green)',
                transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[45] flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(6, 6, 14, 0.95)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-syne text-2xl font-semibold bg-transparent border-none cursor-pointer py-2 px-4 min-h-[44px]"
                style={{ color: activeSection === link.id ? 'var(--neon-green)' : 'var(--text-primary)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.25 }}
              >
                {link.label}
              </motion.button>
            ))}

            {/* Mobile Resume + Status */}
            <motion.div
              className="flex flex-col items-center gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: navLinks.length * 0.08, duration: 0.25 }}
            >
              <a
                href="/Swapnil_Hazra_Resume_.pdf"
                download
                className="font-jetbrains text-sm px-5 py-2 border rounded transition-all duration-150"
                style={{ color: 'var(--neon-cyan)', borderColor: 'var(--neon-cyan)' }}
              >
                Resume ↓
              </a>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border font-jetbrains text-xs"
                style={{ color: 'var(--neon-green)', borderColor: 'var(--border-dim)' }}
              >
                <span className="pulse-dot" />
                Open to Internships
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
