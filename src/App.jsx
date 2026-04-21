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

  const handleBootComplete = () => {
    sessionStorage.setItem('booted', 'true')
    setBooted(true)
  }

  return (
    <MotionConfig reducedMotion="user">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!booted && (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      {booted && (
        <main>
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
    </MotionConfig>
  )
}

export default App
