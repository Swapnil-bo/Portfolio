function Footer() {
  return (
    <footer
      className="py-6 px-4 md:px-8 border-t"
      style={{
        background: 'var(--bg-surface)',
        borderColor: 'var(--border-dim)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="font-mono text-xs" style={{ color: 'var(--text-ghost)' }}>
          &copy; 2026 Swapnil Hazra
        </p>
        <p className="font-mono text-xs flex items-center gap-1.5" style={{ color: 'var(--text-ghost)' }}>
          Built with React + Framer Motion ·
          <a
            href="https://github.com/Swapnil-bo/Portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:underline"
            style={{ color: 'var(--text-ghost)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--neon-green)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-ghost)' }}
          >
            view source ↗
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
