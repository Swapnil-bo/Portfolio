import { motion } from 'framer-motion'

const categoryColors = {
  'Agentic AI': 'var(--neon-green)',
  'Full-Stack': 'var(--neon-cyan)',
  'ML & Data Science': 'var(--neon-purple)',
  'Local LLMs': 'var(--neon-hot)',
}

function ProjectCard({ project, index }) {
  const catColor = categoryColors[project.category] || 'var(--neon-green)'

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="card-hover-scan p-5 border rounded transition-all duration-200 cursor-default group"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-dim)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'var(--border-glow)'
        e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,136,0.15), 0 0 60px rgba(0,255,136,0.05)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'var(--border-dim)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Top row: category + featured badge */}
      <div className="flex items-center justify-between mb-3">
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
        className="font-syne font-semibold text-lg mb-2"
        style={{ color: 'var(--text-primary)' }}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p
        className="font-mono text-[14px] leading-relaxed mb-4 line-clamp-3"
        style={{ color: 'var(--text-secondary)' }}
      >
        {project.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
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
        className="mb-4"
        style={{
          borderTop: '1px dashed var(--border-dim)',
        }}
      />

      {/* Action links */}
      <div className="flex items-center justify-between">
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
