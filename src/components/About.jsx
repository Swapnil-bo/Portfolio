import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTextScramble } from './useTextScramble'

const infoCards = [
  {
    emoji: '🎯',
    label: 'FOCUS',
    value: 'Generative AI · Agentic Systems · RAG',
    borderColor: 'var(--neon-green)',
  },
  {
    emoji: '🔥',
    label: 'STREAK',
    value: '100 Days of Vibe Coding',
    borderColor: 'var(--neon-hot)',
    live: true,
  },
  {
    emoji: '🎓',
    label: 'STUDYING',
    value: 'B.Tech CSE - AI · Brainware University',
    borderColor: 'var(--neon-cyan)',
  },
  {
    emoji: '⚡',
    label: 'SEEKING',
    value: 'AI/ML Product Management Internships',
    borderColor: 'var(--neon-purple)',
  },
]

const skills = [
  'Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn', 'LangChain', 'LangGraph', 'Ollama', 'Hugging Face',
  'Groq', 'Gemini', 'RAG', 'ChromaDB', 'Vector DBs', 'MySQL',
  'React', 'Next.js', 'FastAPI', 'Tailwind CSS', 'TypeScript', 'WebSockets', 'Vite', 'Flask', 'NumPy', 'Pandas',
  'Git', 'GitHub', 'Vercel', 'Render', 'Markdown', 'Streamlit',
  'Claude Code', 'Cursor', 'Antigravity', 'macOS',
]

function About() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.1 })
  const scrambledTitle = useTextScramble('Who I Am', headerInView)

  return (
    <section id="about" className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        ref={headerRef}
        className="mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-jetbrains text-sm mb-2" style={{ color: 'var(--text-ghost)' }}>
          // about
        </p>
        <h2 className="font-syne font-bold text-3xl md:text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
          {scrambledTitle}<span className="typed-cursor" />
        </h2>
        <div
          className="w-[60px] h-[2px] glow-green"
          style={{ background: 'var(--neon-green)' }}
        />
      </motion.div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-10 mb-16">
        {/* Left — Bio (60%) */}
        <motion.div
          className="lg:w-[60%]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="font-mono text-sm md:text-base leading-[1.7] space-y-4" style={{ color: 'var(--text-secondary)' }}>
            <p>
              I'm an AI Engineer specializing in{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Generative AI</span>,{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>agentic workflows</span>, and{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>local LLM systems</span>. I build
              multi-agent pipelines that plan, reason, and self-correct — running entirely on consumer GPUs.
            </p>
            <p>
              Currently on Day X of my{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>100 Days of Vibe Coding</span>{' '}
              challenge — shipping an open-source AI project every few days. 20 projects and counting. Every
              line of code is public.
            </p>
            <p>
              I don't just use AI frameworks. I stress-test them, break them, and rebuild them until they work
              on an{' '}
              <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>RTX 3050 with 8GB RAM and a MacBook Air M1</span>.
              Constraints breed creativity.
            </p>
          </div>
        </motion.div>

        {/* Right — Info Grid (40%) */}
        <div className="lg:w-[40%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.label}
              className="p-4"
              style={{
                background: 'var(--bg-surface)',
                borderLeft: `4px solid ${card.borderColor}`,
                borderRadius: '4px',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <p
                className="font-jetbrains text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1.5"
                style={{ color: 'var(--text-ghost)' }}
              >
                <span>{card.emoji}</span> {card.label}
                {card.live && (
                  <span className="flex items-center gap-1 ml-1 text-[10px]" style={{ color: 'var(--neon-hot)' }}>
                    <span className="pulse-dot" style={{ width: 6, height: 6, background: 'var(--neon-hot)' }} />
                    LIVE
                  </span>
                )}
              </p>
              <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                {card.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Arsenal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-jetbrains text-sm mb-4" style={{ color: 'var(--text-ghost)' }}>
          tech_stack = [
        </p>
        <div className="flex flex-wrap gap-2 mb-4 pl-4">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="font-jetbrains text-[13px] px-3 py-1.5 border rounded-[3px] transition-all duration-150 cursor-default"
              style={{
                background: 'var(--bg-elevated)',
                borderColor: 'var(--border-dim)',
                color: 'var(--text-secondary)',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-glow)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,136,0.15), 0 0 60px rgba(0,255,136,0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-dim)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
        <p className="font-jetbrains text-sm" style={{ color: 'var(--text-ghost)' }}>
          ]
        </p>
      </motion.div>
    </section>
  )
}

export default About
