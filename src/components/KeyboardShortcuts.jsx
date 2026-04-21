import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navMap = {
  h: { id: 'hero', label: 'Home' },
  a: { id: 'about', label: 'About' },
  p: { id: 'projects', label: 'Projects' },
  t: { id: 'timeline', label: 'Timeline' },
  c: { id: 'contact', label: 'Contact' },
}

const groups = [
  {
    title: 'Navigation',
    items: [
      { keys: ['g', 'h'], label: 'Jump to Home' },
      { keys: ['g', 'a'], label: 'Jump to About' },
      { keys: ['g', 'p'], label: 'Jump to Projects' },
      { keys: ['g', 't'], label: 'Jump to Timeline' },
      { keys: ['g', 'c'], label: 'Jump to Contact' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { keys: ['`'], label: 'Toggle Neural Terminal' },
      { keys: ['?'], label: 'Toggle this cheat sheet' },
      { keys: ['Esc'], label: 'Close overlay / menu' },
    ],
  },
]

function Key({ children }) {
  return (
    <kbd
      className="font-jetbrains text-xs inline-flex items-center justify-center"
      style={{
        minWidth: 24,
        height: 24,
        padding: '0 8px',
        background: 'var(--bg-void)',
        border: '1px solid var(--border-glow)',
        borderRadius: 3,
        color: 'var(--neon-green)',
        boxShadow: '0 1px 0 rgba(0, 255, 136, 0.08)',
      }}
    >
      {children}
    </kbd>
  )
}

function KeyboardShortcuts() {
  const [open, setOpen] = useState(false)
  const prefixRef = useRef(null)
  const prefixTimerRef = useRef(null)

  useEffect(() => {
    const isTyping = (target) =>
      target?.tagName === 'INPUT' ||
      target?.tagName === 'TEXTAREA' ||
      target?.isContentEditable

    const clearPrefix = () => {
      prefixRef.current = null
      if (prefixTimerRef.current) {
        clearTimeout(prefixTimerRef.current)
        prefixTimerRef.current = null
      }
    }

    const scrollToId = (id) => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const onKey = (e) => {
      if (isTyping(e.target)) return

      if (e.key === 'Escape' && open) {
        setOpen(false)
        clearPrefix()
        return
      }

      if (e.key === '?') {
        e.preventDefault()
        clearPrefix()
        setOpen((prev) => !prev)
        return
      }

      if (prefixRef.current === 'g') {
        const target = navMap[e.key.toLowerCase()]
        clearPrefix()
        if (target) {
          e.preventDefault()
          scrollToId(target.id)
          setOpen(false)
        }
        return
      }

      if (
        e.key.toLowerCase() === 'g' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !e.shiftKey
      ) {
        prefixRef.current = 'g'
        prefixTimerRef.current = setTimeout(clearPrefix, 1000)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearPrefix()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Keyboard shortcuts"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(6, 6, 14, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '5vh 16px',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-glow)',
              boxShadow:
                '0 0 40px rgba(0, 255, 136, 0.15), 0 0 120px rgba(0, 255, 136, 0.05)',
              borderRadius: 6,
              width: '100%',
              maxWidth: 560,
              padding: '28px 28px 24px',
            }}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p
                  className="font-jetbrains text-xs mb-1"
                  style={{ color: 'var(--text-ghost)' }}
                >
                  // keyboard
                </p>
                <h2
                  className="font-syne font-semibold text-xl"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Shortcuts
                  <span style={{ color: 'var(--neon-green)' }}>_</span>
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close shortcuts"
                className="font-jetbrains text-xs cursor-pointer"
                style={{
                  background: 'transparent',
                  border: '1px solid var(--border-dim)',
                  color: 'var(--text-ghost)',
                  padding: '4px 10px',
                  borderRadius: 3,
                }}
              >
                [ESC]
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {groups.map((group) => (
                <div key={group.title}>
                  <p
                    className="font-jetbrains text-[11px] uppercase tracking-wider mb-3"
                    style={{ color: 'var(--text-ghost)' }}
                  >
                    {group.title}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center justify-between gap-4"
                      >
                        <span
                          className="font-mono text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {item.label}
                        </span>
                        <span className="flex items-center gap-1">
                          {item.keys.map((k, i) => (
                            <span key={i} className="flex items-center gap-1">
                              {i > 0 && (
                                <span
                                  className="font-mono text-xs"
                                  style={{ color: 'var(--text-ghost)' }}
                                >
                                  then
                                </span>
                              )}
                              <Key>{k}</Key>
                            </span>
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p
              className="font-jetbrains text-[11px] mt-6 pt-4"
              style={{
                color: 'var(--text-ghost)',
                borderTop: '1px solid var(--border-dim)',
              }}
            >
              Tip: shortcuts ignore while typing in inputs.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export default KeyboardShortcuts
