import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import { useTextScramble } from './useTextScramble'
import { playClickSound } from '../utils/hoverSound'

const filters = ['All', 'Featured', 'Agentic AI', 'Local LLMs', 'ML & Data Science', 'Full-Stack']

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeTag, setActiveTag] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.1 })
  const scrambledTitle = useTextScramble("What I've Built", headerInView)

  const filtered = activeTag
    ? projects.filter(p => p.tags.includes(activeTag))
    : activeFilter === 'All'
      ? projects
      : activeFilter === 'Featured'
        ? projects.filter(p => p.featured)
        : projects.filter(p => p.category === activeFilter)

  const handleTagClick = (tag) => {
    setActiveTag(prev => {
      const next = prev === tag ? null : tag
      if (next) setActiveFilter('All')
      return next
    })
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
    setActiveTag(null)
  }

  const clearTag = () => setActiveTag(null)

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
              onClick={() => handleFilterClick(filter)}
              className="font-jetbrains text-xs px-4 py-2.5 md:py-1.5 rounded border transition-all duration-150 cursor-pointer"
              style={{
                background: activeFilter === filter
                  ? (filter === 'Featured' ? 'var(--neon-hot)' : 'var(--neon-green)')
                  : 'var(--bg-surface)',
                color: activeFilter === filter ? 'var(--bg-void)' : 'var(--text-secondary)',
                borderColor: activeFilter === filter
                  ? (filter === 'Featured' ? 'var(--neon-hot)' : 'var(--neon-green)')
                  : 'var(--border-dim)',
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== filter) e.currentTarget.style.borderColor = 'var(--border-glow)'
                playClickSound()
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

      {/* Active tag pill */}
      <AnimatePresence>
        {activeTag && (
          <motion.div
            key="active-tag-pill"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mb-6 flex items-center gap-2"
          >
            <span className="font-jetbrains text-xs" style={{ color: 'var(--text-ghost)' }}>
              ▸ filtering by tag:
            </span>
            <button
              onClick={clearTag}
              onMouseEnter={() => playClickSound()}
              className="font-jetbrains text-xs px-3 py-1 rounded border flex items-center gap-2 transition-all duration-150 cursor-pointer glow-green"
              style={{
                background: 'var(--neon-green)',
                color: 'var(--bg-void)',
                borderColor: 'var(--neon-green)',
              }}
              aria-label={`Clear ${activeTag} tag filter`}
            >
              {activeTag}
              <span style={{ fontSize: '14px', lineHeight: 1 }}>✕</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              onOpenDetail={setSelectedProject}
              onTagClick={handleTagClick}
              activeTag={activeTag}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}

export default Projects
