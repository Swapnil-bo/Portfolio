import { useState, useEffect } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import BootSequence from './components/BootSequence'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import EasterTerminal from './components/EasterTerminal'
import KeyboardShortcuts from './components/KeyboardShortcuts'
import SectionDivider from './components/SectionDivider'
import { initHoverSound } from './utils/hoverSound'
import { prefersReducedMotion } from './utils/reducedMotion'

function App() {
  const [booted, setBooted] = useState(() => {
    // Skip boot entirely if user prefers reduced motion
    if (prefersReducedMotion()) return true
    return sessionStorage.getItem('booted') === 'true'
  })

  // Initialize hover sound on first interaction
  useEffect(() => {
    initHoverSound()
  }, [])

  // Restore hash-link scroll target after boot/mount
  useEffect(() => {
    if (!booted) return
    const hash = window.location.hash
    if (!hash || hash === '#') return
    const id = decodeURIComponent(hash.slice(1))
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(raf)
  }, [booted])

  const handleBootComplete = () => {
    sessionStorage.setItem('booted', 'true')
    setBooted(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <CustomCursor />

      <AnimatePresence mode="wait">
        {!booted && (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      {booted && (
        <main id="main-content" tabIndex={-1}>
          <div className="noise-overlay" />
          <ScrollProgress />
          <Navbar />
          <Hero />
          <About />
          <SectionDivider />
          <Projects />
          <SectionDivider />
          <Timeline />
          <SectionDivider />
          <Contact />
          <Footer />
        </main>
      )}

      <EasterTerminal />
      <KeyboardShortcuts />
    </MotionConfig>
  )
}

export default App
