import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import { useTextScramble } from './useTextScramble'

const filters = ['All', 'Agentic AI', 'Local LLMs', 'ML & Data Science', 'Full-Stack']

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.1 })
  const scrambledTitle = useTextScramble("What I've Built", headerInView)

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  return (
    <section id="projects" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        ref={headerRef}
        className="mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-jetbrains text-sm mb-2" style={{ color: 'var(--text-ghost)' }}>
          // projects
        </p>
        <h2 className="font-syne font-bold text-3xl md:text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
          {scrambledTitle}<span className="typed-cursor" />
        </h2>
        <div
          className="w-[60px] h-[2px] glow-green"
          style={{ background: 'var(--neon-green)' }}
        />
      </motion.div>

      {/* Filter bar */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="font-jetbrains text-xs px-4 py-2.5 md:py-1.5 rounded border transition-all duration-150 cursor-pointer"
              style={{
                background: activeFilter === filter ? 'var(--neon-green)' : 'var(--bg-surface)',
                color: activeFilter === filter ? 'var(--bg-void)' : 'var(--text-secondary)',
                borderColor: activeFilter === filter ? 'var(--neon-green)' : 'var(--border-dim)',
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== filter) e.currentTarget.style.borderColor = 'var(--border-glow)'
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== filter) e.currentTarget.style.borderColor = 'var(--border-dim)'
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        <span className="font-jetbrains text-xs" style={{ color: 'var(--text-ghost)' }}>
          showing {filtered.length} of {projects.length}
        </span>
      </motion.div>

      {/* Project Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default Projects
