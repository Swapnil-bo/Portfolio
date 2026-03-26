import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '../data/projects'

const commands = {
  help: () => [
    'Available commands:',
    '  help     — show this list',
    '  about    — who am I?',
    '  projects — list all projects',
    '  contact  — get in touch',
    '  github   — open GitHub profile',
    '  clear    — clear terminal',
    '  exit     — close terminal',
  ],
  about: () => [
    'Swapnil Hazra — AI Engineer & Vibe Coder',
    'Building privacy-first agents and local LLM systems.',
    'Currently on the 100 Days of Vibe Coding challenge.',
    '13 projects shipped. Every line of code is public.',
  ],
  projects: () => [
    'Projects shipped:',
    ...projects.map((p, i) => `  ${i + 1}. ${p.name} — ${p.category}`),
  ],
  contact: () => [
    'Email: swapnilhazra8@gmail.com',
    'GitHub: github.com/Swapnil-bo',
    'LinkedIn: linkedin.com/in/swapnil-hazra-4831322b7',
    'X: x.com/SwapnilHazra4',
  ],
  github: () => {
    window.open('https://github.com/Swapnil-bo', '_blank', 'noopener,noreferrer')
    return ['Opening GitHub...']
  },
}

function EasterTerminal() {
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState([
    '> Neural Terminal v2.0 — Type "help" for commands',
  ])
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  const handleCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    const newLines = [`> ${cmd}`]

    if (trimmed === 'clear') {
      setLines(['> Terminal cleared'])
      return
    }

    if (trimmed === 'exit') {
      setOpen(false)
      return
    }

    if (commands[trimmed]) {
      const result = commands[trimmed]()
      newLines.push(...result)
    } else {
      newLines.push(`Command not found: "${trimmed}". Type "help" for available commands.`)
    }

    setLines(prev => [...prev, ...newLines])
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCommand(input)
    setInput('')
  }

  // Toggle on backtick
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`') {
        // Don't trigger if typing in another input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
          if (!open) return
        }
        e.preventDefault()
        setOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Auto-focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 300, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: 300,
            background: 'var(--bg-void)',
            borderTop: '1px solid var(--border-glow)',
            zIndex: 99998,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{
              borderBottom: '1px solid var(--border-dim)',
              background: 'var(--bg-surface)',
            }}
          >
            <span
              className="font-jetbrains text-xs"
              style={{ color: 'var(--neon-green)' }}
            >
              NEURAL TERMINAL
            </span>
            <button
              onClick={() => setOpen(false)}
              className="font-mono text-xs cursor-pointer"
              style={{ color: 'var(--text-ghost)', background: 'none', border: 'none' }}
            >
              [ESC]
            </button>
          </div>

          {/* Output */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 font-mono text-sm"
            style={{ color: 'var(--neon-green)' }}
          >
            {lines.map((line, i) => (
              <div key={i} className="mb-1" style={{
                color: line.startsWith('>') ? 'var(--text-secondary)' : 'var(--neon-green)',
              }}>
                {line}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex items-center px-4 py-3" style={{ borderTop: '1px solid var(--border-dim)' }}>
            <span className="font-mono text-sm mr-2" style={{ color: 'var(--neon-green)' }}>{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent font-mono text-sm outline-none"
              style={{ color: 'var(--text-primary)', caretColor: 'var(--neon-green)' }}
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EasterTerminal
