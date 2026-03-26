import { useRef, useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const categoryColors = {
  'Agentic AI': 'var(--neon-green)',
  'Full-Stack': 'var(--neon-cyan)',
  'ML & Data Science': 'var(--neon-purple)',
  'Local LLMs': 'var(--neon-hot)',
}

function ProjectCard({ project, index }) {
  const catColor = categoryColors[project.category] || 'var(--neon-green)'
  const cardRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const [tiltStyle, setTiltStyle] = useState({})
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  const handleMouseMove = useCallback((e) => {
    if (isMobile || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2

    const rotateX = ((y - cy) / cy) * -8
    const rotateY = ((x - cx) / cx) * 8

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`,
    })
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })
  }, [isMobile])

  const handleMouseLeave = useCallback(() => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
    })
    setGlowPos({ x: 50, y: 50 })
  }, [])

  return (
    <motion.div
      ref={cardRef}
      layout="position"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card-hover-scan project-card p-5 border rounded cursor-default relative overflow-hidden"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-dim)',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        ...tiltStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Moving radial gradient highlight */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.05) 0%, transparent 60%)`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Top row: category + featured badge */}
      <div className="flex items-center justify-between mb-3 relative z-2">
        <span
          className="font-jetbrains text-[11px] uppercase tracking-wider"
          style={{ color: catColor }}
        >
          ⟩ {project.category}
        </span>
        {project.featured && (
          <span
            className="font-jetbrains text-[11px]"
            style={{ color: 'var(--neon-hot)' }}
          >
            ★ FEATURED
          </span>
        )}
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
        {project.tags.map(tag => (
          <span
            key={tag}
            className="font-jetbrains text-[11px] px-2 py-0.5 border rounded-[3px]"
            style={{
              background: 'var(--bg-void)',
              borderColor: 'var(--border-dim)',
              color: 'var(--text-secondary)',
            }}
          >
            {tag}
          </span>
        ))}
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
