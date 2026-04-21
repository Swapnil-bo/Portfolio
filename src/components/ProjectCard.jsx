import { useRef, useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { projectDetails } from '../data/projectDetails'

const categoryConfig = {
  'Agentic AI': { color: 'var(--neon-green)', rgb: '0, 255, 136' },
  'Full-Stack': { color: 'var(--neon-cyan)', rgb: '0, 212, 255' },
  'ML & Data Science': { color: 'var(--neon-purple)', rgb: '168, 85, 247' },
  'Local LLMs': { color: 'var(--neon-hot)', rgb: '255, 51, 102' },
}

function ProjectCard({ project, index, onOpenDetail, onTagClick, activeTag }) {
  const hasDetails = Boolean(projectDetails[project.name])
  const cat = categoryConfig[project.category] || categoryConfig['Agentic AI']
  const cardRef = useRef(null)
  const rafRef = useRef(0)
  const latestPointerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const applyTilt = useCallback(() => {
    rafRef.current = 0
    const card = cardRef.current
    const pointer = latestPointerRef.current
    if (!card || !pointer) return

    const rect = card.getBoundingClientRect()
    const x = pointer.clientX - rect.left
    const y = pointer.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotateX = ((y - cy) / cy) * -8
    const rotateY = ((x - cx) / cx) * 8

    // Write directly — no setState, no re-render.
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
    card.style.setProperty('--glow-x', `${(x / rect.width) * 100}%`)
    card.style.setProperty('--glow-y', `${(y / rect.height) * 100}%`)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return
    latestPointerRef.current = { clientX: e.clientX, clientY: e.clientY }
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(applyTilt)
    }
  }, [isMobile, applyTilt])

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
    latestPointerRef.current = null
    const card = cardRef.current
    if (!card) return
    // Clear inline transform so framer-motion can reclaim it; reset glow center.
    card.style.transform = ''
    card.style.setProperty('--glow-x', '50%')
    card.style.setProperty('--glow-y', '50%')
  }, [])

  return (
    <motion.div
      ref={cardRef}
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`card-hover-scan project-card p-5 border rounded relative overflow-hidden ${hasDetails ? 'cursor-pointer' : 'cursor-default'} ${project.featured ? 'featured-card' : ''}`}
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-dim)',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        '--card-glow-rgb': cat.rgb,
        '--glow-x': '50%',
        '--glow-y': '50%',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={hasDetails ? () => onOpenDetail?.(project) : undefined}
      onKeyDown={hasDetails ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpenDetail?.(project)
        }
      } : undefined}
      role={hasDetails ? 'button' : undefined}
      tabIndex={hasDetails ? 0 : undefined}
      aria-label={hasDetails ? `View case study for ${project.name}` : undefined}
    >
      {/* Corner brackets */}
      <span className="corner-bracket corner-tl" />
      <span className="corner-bracket corner-tr" />
      <span className="corner-bracket corner-bl" />
      <span className="corner-bracket corner-br" />

      {/* Moving radial gradient highlight */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(var(--card-glow-rgb), 0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Top row: category + featured badge */}
      <div className="flex items-center justify-between mb-3 relative z-2">
        <span
          className="font-jetbrains text-[11px] uppercase tracking-wider flex items-center gap-1.5"
          style={{ color: cat.color }}
        >
          <span className="category-dot" style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }} />
          {project.category}
        </span>
        <div className="flex items-center gap-3">
          {project.featured && (
            <span
              className="font-jetbrains text-[11px] flex items-center gap-1.5"
              style={{ color: 'var(--neon-hot)' }}
            >
              <span className="pulse-dot-hot" />
              ★ FEATURED
            </span>
          )}
          {hasDetails && (
            <span
              className="font-jetbrains text-[10px] uppercase tracking-wider px-1.5 py-0.5 border rounded-[3px]"
              style={{
                color: 'var(--neon-cyan)',
                borderColor: 'rgba(0, 212, 255, 0.3)',
                background: 'rgba(0, 212, 255, 0.05)',
              }}
            >
              + CASE STUDY
            </span>
          )}
        </div>
      </div>

      {/* Project name */}
      <h3
        className="font-syne font-semibold text-lg mb-2 relative z-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p
        className="font-mono text-[14px] leading-relaxed mb-4 line-clamp-3 relative z-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        {project.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4 relative z-2">
        {project.tags.map(tag => {
          const isActive = activeTag === tag
          return (
            <button
              key={tag}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onTagClick?.(tag)
              }}
              className="tag-chip-clickable font-jetbrains text-[11px] px-2 py-0.5 border rounded-[3px] cursor-pointer transition-all duration-150"
              style={{
                background: isActive ? 'rgba(0, 255, 136, 0.12)' : 'var(--bg-void)',
                borderColor: isActive ? 'var(--neon-green)' : 'var(--border-dim)',
                color: isActive ? 'var(--neon-green)' : 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--border-glow)'
                  e.currentTarget.style.color = 'var(--neon-green)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = 'var(--border-dim)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }
              }}
              aria-label={`Filter projects by ${tag}`}
              aria-pressed={isActive}
            >
              {tag}
            </button>
          )
        })}
      </div>

      {/* Divider */}
      <div
        className="mb-4 relative z-2"
        style={{
          borderTop: '1px dashed var(--border-dim)',
        }}
      />

      {/* Action links */}
      <div className="flex items-center justify-between relative z-2">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="font-jetbrains text-xs transition-colors duration-150"
          style={{ color: 'var(--neon-green)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--neon-green)' }}
        >
          GitHub →
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-jetbrains text-xs transition-colors duration-150"
            style={{ color: 'var(--neon-cyan)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--neon-cyan)' }}
          >
            Live Demo →
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default ProjectCard
