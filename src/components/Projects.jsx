import { useState, useRef, lazy, Suspense } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'
import { useTextScramble } from './useTextScramble'
import { playClickSound } from '../utils/hoverSound'

// Lazy-loaded: ~400-line modal only needed after a card is clicked.
// Keeps it out of the initial bundle.
const ProjectModal = lazy(() => import('./ProjectModal'))

const filters = ['All', 'Featured', 'Agentic AI', 'Local LLMs', 'ML & Data Science', 'Full-Stack']

function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeTag, setActiveTag] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  // Stays true after first open so the modal can play its exit animation on close
  // instead of unmounting synchronously with selectedProject going null.
  const [modalMounted, setModalMounted] = useState(false)
  const headerRef = useRef(null)

  const openProject = (project) => {
    setModalMounted(true)
    setSelectedProject(project)
  }
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

  const clearAllFilters = () => {
    setActiveTag(null)
    setActiveFilter('All')
  }

  const activeLabel = activeTag || (activeFilter !== 'All' ? activeFilter : null)

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
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              aria-pressed={activeFilter === filter}
              aria-label={`Filter by ${filter}`}
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

      {/* Project Grid OR empty state */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty-state"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border border-dashed rounded p-10 md:p-14 text-center flex flex-col items-center gap-5"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--border-dim)',
            }}
          >
            <p className="font-jetbrains text-xs" style={{ color: 'var(--text-ghost)' }}>
              // query returned 0 results
            </p>
            <p className="font-mono text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
              {activeLabel ? (
                <>
                  no projects matched{' '}
                  <span style={{ color: 'var(--neon-green)' }}>[{activeLabel}]</span>
                </>
              ) : (
                <>no projects to show</>
              )}
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              onMouseEnter={() => playClickSound()}
              className="font-jetbrains text-xs px-4 py-2 border rounded transition-all duration-150 cursor-pointer"
              style={{
                color: 'var(--neon-green)',
                borderColor: 'var(--neon-green)',
                background: 'transparent',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0,255,136,0.08)' }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'transparent' }}
            >
              [ clear filters ]
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="project-grid"
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.name}
                  project={project}
                  index={i}
                  onOpenDetail={openProject}
                  onTagClick={handleTagClick}
                  activeTag={activeTag}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {modalMounted && (
        <Suspense fallback={null}>
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </Suspense>
      )}
    </section>
  )
}

export default Projects
