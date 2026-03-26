import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { timeline } from '../data/timeline'
import { useTextScramble } from './useTextScramble'

function Timeline() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.1 })
  const scrambledTitle = useTextScramble('The Path', headerInView)

  return (
    <section id="timeline" className="py-20 px-4 md:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        ref={headerRef}
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="font-jetbrains text-sm mb-2" style={{ color: 'var(--text-ghost)' }}>
          // journey
        </p>
        <h2 className="font-syne font-bold text-3xl md:text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
          {scrambledTitle}<span className="typed-cursor" />
        </h2>
        <div
          className="w-[60px] h-[2px] glow-green"
          style={{ background: 'var(--neon-green)' }}
        />
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Center line */}
        <div
          className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] -translate-x-1/2"
          style={{ background: 'rgba(0, 255, 136, 0.15)' }}
        />

        {timeline.map((entry, i) => {
          const isLeft = i % 2 === 0

          return (
            <div
              key={entry.year}
              className="relative mb-12 last:mb-0 flex items-start md:items-center"
            >
              {/* Node dot + icon — mobile: left-aligned, desktop: centered */}
              <div
                className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full glow-green"
                style={{ background: 'var(--bg-void)', border: '2px solid var(--neon-green)' }}
              >
                <span className="text-base">{entry.icon}</span>
              </div>

              {/* Card — mobile: always right, desktop: alternates */}
              <motion.div
                className={`
                  ml-14 md:ml-0 w-full
                  md:w-[calc(50%-50px)]
                  ${isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'}
                `}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                {/* Connector line — desktop only */}
                <div
                  className={`
                    hidden md:block absolute top-5 w-[30px] h-[2px]
                    ${isLeft ? 'right-[calc(50%-30px)]' : 'left-[calc(50%-30px)]'}
                  `}
                  style={{ background: 'rgba(0, 255, 136, 0.15)' }}
                />

                {/* Year badge */}
                <span
                  className="font-syne font-bold text-sm mb-2 inline-block"
                  style={{ color: 'var(--neon-green)' }}
                >
                  {entry.year}
                </span>

                {/* Card */}
                <div
                  className="p-6 rounded border"
                  style={{
                    background: 'var(--bg-surface)',
                    borderColor: 'var(--border-dim)',
                  }}
                >
                  <h3
                    className="font-syne font-semibold text-lg mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {entry.title}
                  </h3>
                  <p
                    className="font-mono text-sm leading-relaxed mb-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {entry.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.tags.map(tag => (
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
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Timeline
