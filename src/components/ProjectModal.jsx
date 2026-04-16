import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { projectDetails } from '../data/projectDetails'

const categoryConfig = {
  'Agentic AI': { color: 'var(--neon-green)', rgb: '0, 255, 136' },
  'Full-Stack': { color: 'var(--neon-cyan)', rgb: '0, 212, 255' },
  'ML & Data Science': { color: 'var(--neon-purple)', rgb: '168, 85, 247' },
  'Local LLMs': { color: 'var(--neon-hot)', rgb: '255, 51, 102' },
}

function SectionHeader({ tag, title, accentColor = 'var(--neon-green)' }) {
  return (
    <div className="mb-4">
      <p className="font-jetbrains text-xs mb-1" style={{ color: 'var(--text-ghost)' }}>
        {tag}
      </p>
      <h3 className="font-syne font-semibold text-xl" style={{ color: 'var(--text-primary)' }}>
        {title}<span style={{ color: accentColor }}>_</span>
      </h3>
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  const details = project ? projectDetails[project.name] : null
  const cat = project ? (categoryConfig[project.category] || categoryConfig['Agentic AI']) : null

  useEffect(() => {
    if (!project || !details) return
    const handleEsc = (e) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [project, details, onClose])

  return createPortal(
    <AnimatePresence>
      {project && details && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10001,
            background: 'rgba(6, 6, 14, 0.85)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '5vh 16px',
            overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-glow)',
              boxShadow: `0 0 40px rgba(${cat.rgb}, 0.15), 0 0 120px rgba(${cat.rgb}, 0.05)`,
              borderRadius: '6px',
              width: '100%',
              maxWidth: '900px',
              padding: '40px 32px 32px',
            }}
          >
            <span className="corner-bracket corner-tl" />
            <span className="corner-bracket corner-tr" />
            <span className="corner-bracket corner-bl" />
            <span className="corner-bracket corner-br" />

            <button
              onClick={onClose}
              aria-label="Close case study"
              className="font-jetbrains text-sm cursor-pointer transition-all duration-150"
              style={{
                position: 'absolute',
                top: '16px',
                right: '20px',
                background: 'transparent',
                border: '1px solid var(--border-dim)',
                color: 'var(--text-secondary)',
                padding: '4px 10px',
                borderRadius: '3px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--neon-green)'
                e.currentTarget.style.color = 'var(--neon-green)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-dim)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              ESC ✕
            </button>

            {/* Header row: category + featured + status */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span
                className="font-jetbrains text-[11px] uppercase tracking-wider flex items-center gap-1.5"
                style={{ color: cat.color }}
              >
                <span className="category-dot" style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }} />
                {project.category}
              </span>
              {project.featured && (
                <span
                  className="font-jetbrains text-[11px] flex items-center gap-1.5"
                  style={{ color: 'var(--neon-hot)' }}
                >
                  <span className="pulse-dot-hot" />
                  ★ FEATURED
                </span>
              )}
              {details.status && (
                <span
                  className="font-jetbrains text-[11px] uppercase tracking-wider px-2 py-0.5 border rounded-[3px]"
                  style={{
                    color: 'var(--neon-green)',
                    borderColor: 'var(--border-glow)',
                    background: 'rgba(0, 255, 136, 0.05)',
                  }}
                >
                  {details.status}
                </span>
              )}
            </div>

            {/* Full name */}
            <h2
              className="font-syne font-bold mb-4"
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                lineHeight: 1.15,
              }}
            >
              {details.fullName || project.name}
            </h2>

            {/* Tagline */}
            <p
              className="font-mono text-base md:text-lg leading-relaxed mb-6"
              style={{ color: 'var(--neon-green)', textShadow: '0 0 10px rgba(0,255,136,0.2)' }}
            >
              {details.tagline}
            </p>

            {/* Accent line */}
            <div
              className="w-[60px] h-[2px] mb-8 glow-green"
              style={{ background: 'var(--neon-green)' }}
            />

            {/* Problem */}
            {details.problem && (
              <section className="mb-10">
                <SectionHeader tag="// problem" title="The Problem" />
                <p className="font-mono text-[15px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {details.problem}
                </p>
              </section>
            )}

            {/* Approach */}
            {details.approach?.length > 0 && (
              <section className="mb-10">
                <SectionHeader tag="// approach" title="How It Works" accentColor="var(--neon-cyan)" />
                <ul className="space-y-3">
                  {details.approach.map((item, i) => (
                    <li
                      key={i}
                      className="font-mono text-[14px] leading-relaxed flex gap-3"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span style={{ color: 'var(--neon-cyan)', flexShrink: 0 }}>▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Stack */}
            {details.stack && (
              <section className="mb-10">
                <SectionHeader tag="// stack" title="Tech Stack" accentColor="var(--neon-purple)" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(details.stack).map(([group, items]) => (
                    <div
                      key={group}
                      className="p-3 border rounded"
                      style={{
                        background: 'var(--bg-void)',
                        borderColor: 'var(--border-dim)',
                      }}
                    >
                      <p
                        className="font-jetbrains text-[11px] uppercase tracking-wider mb-2"
                        style={{ color: 'var(--neon-purple)' }}
                      >
                        {group}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((item) => (
                          <span
                            key={item}
                            className="font-jetbrains text-[11px] px-2 py-0.5 border rounded-[3px]"
                            style={{
                              background: 'var(--bg-surface)',
                              borderColor: 'var(--border-dim)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges */}
            {details.challenges?.length > 0 && (
              <section className="mb-10">
                <SectionHeader tag="// what broke" title="Challenges &amp; Decisions" accentColor="var(--neon-hot)" />
                <div className="space-y-3">
                  {details.challenges.map((ch, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded relative overflow-hidden"
                      style={{
                        background: 'var(--bg-void)',
                        borderColor: 'var(--border-dim)',
                        borderLeft: '3px solid var(--neon-hot)',
                      }}
                    >
                      <h4
                        className="font-syne font-semibold text-base mb-2"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        <span style={{ color: 'var(--neon-hot)', marginRight: '8px' }}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {ch.title}
                      </h4>
                      <p
                        className="font-mono text-[14px] leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {ch.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Metrics */}
            {details.metrics?.length > 0 && (
              <section className="mb-10">
                <SectionHeader tag="// metrics" title="The Numbers" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {details.metrics.map((m, i) => (
                    <div
                      key={i}
                      className="p-3 border rounded text-center"
                      style={{
                        background: 'var(--bg-void)',
                        borderColor: 'var(--border-dim)',
                      }}
                    >
                      <p
                        className="font-syne font-bold text-xl md:text-2xl mb-1"
                        style={{ color: 'var(--neon-green)', textShadow: '0 0 10px rgba(0,255,136,0.3)' }}
                      >
                        {m.value}
                      </p>
                      <p
                        className="font-jetbrains text-[11px] uppercase tracking-wider"
                        style={{ color: 'var(--text-ghost)' }}
                      >
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Divider */}
            <div className="mb-5" style={{ borderTop: '1px dashed var(--border-dim)' }} />

            {/* Footer links */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jetbrains text-sm px-4 py-2 border rounded transition-all duration-150"
                style={{
                  color: 'var(--neon-green)',
                  borderColor: 'var(--neon-green)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 136, 0.08)'
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                [ GitHub → ]
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jetbrains text-sm px-4 py-2 border rounded transition-all duration-150"
                  style={{
                    color: 'var(--neon-cyan)',
                    borderColor: 'var(--neon-cyan)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.08)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  [ Live Demo → ]
                </a>
              )}
              {details.extraLinks?.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-jetbrains text-sm px-4 py-2 border rounded transition-all duration-150"
                  style={{
                    color: 'var(--neon-purple)',
                    borderColor: 'var(--neon-purple)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(168, 85, 247, 0.08)'
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.2)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  [ {link.label} ↗ ]
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default ProjectModal
