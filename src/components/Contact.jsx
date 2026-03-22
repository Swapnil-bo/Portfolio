import { useState } from 'react'
import { motion } from 'framer-motion'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/Swapnil-bo',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/swapnil-hazra-4831322b7/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/SwapnilHazra4',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733-16z" />
        <path d="M4 20l6.768-6.768" />
        <path d="M20 4l-6.768 6.768" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/swapnil_hazra_',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:swapnilhazra8@gmail.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M22 7l-10 7L2 7" />
      </svg>
    ),
  },
]

function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('swapnilhazra8@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="py-20 px-4 md:px-8">
      <div className="max-w-[600px] mx-auto">
        {/* Section Header */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-jetbrains text-sm mb-2" style={{ color: 'var(--text-ghost)' }}>
            // contact
          </p>
          <h2 className="font-syne font-bold text-3xl md:text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
            Let's Connect<span className="typed-cursor" />
          </h2>
          <div
            className="w-[60px] h-[2px] glow-green mx-auto"
            style={{ background: 'var(--neon-green)' }}
          />
        </motion.div>

        {/* Headline */}
        <motion.p
          className="font-syne font-semibold text-xl md:text-2xl text-center mb-3"
          style={{ color: 'var(--text-primary)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Have an internship opportunity or want to collaborate?
        </motion.p>

        {/* Subline */}
        <motion.p
          className="font-mono text-sm md:text-base text-center mb-8 text-glow"
          style={{ color: 'var(--neon-green)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          Currently seeking AI/ML Product Management internships.
        </motion.p>

        {/* Email CTA */}
        <motion.div
          className="flex justify-center mb-10 relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <button
            onClick={handleCopy}
            className="relative font-mono text-sm md:text-base px-6 py-3 border rounded cursor-pointer transition-all duration-150"
            style={{
              color: 'var(--neon-green)',
              borderColor: 'var(--neon-green)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,255,136,0.08)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            swapnilhazra8@gmail.com →
            {copied && (
              <span
                className="absolute -top-8 left-1/2 -translate-x-1/2 font-jetbrains text-xs px-2 py-1 rounded"
                style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--neon-green)',
                  whiteSpace: 'nowrap',
                }}
              >
                ✓ Copied!
              </span>
            )}
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          {socials.map(social => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex items-center gap-2 font-mono text-sm px-3 py-2 rounded transition-all duration-150"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--neon-green)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 0 20px rgba(0,255,136,0.15), 0 0 60px rgba(0,255,136,0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {social.icon}
              <span>{social.label}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
