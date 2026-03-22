import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BootSequence from './components/BootSequence'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import ParticleField from './components/ParticleField'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [booted, setBooted] = useState(() => {
    return sessionStorage.getItem('booted') === 'true'
  })

  const handleBootComplete = () => {
    sessionStorage.setItem('booted', 'true')
    setBooted(true)
  }

  return (
    <>
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
          <Projects />
          <Timeline />
          <Contact />
          <Footer />
        </main>
      )}
    </>
  )
}

export default App
