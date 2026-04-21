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
        <p
          className="font-jetbrains text-[11px] hidden md:flex items-center gap-2"
          style={{ color: 'var(--text-ghost)' }}
          aria-hidden="true"
        >
          <span>press</span>
          <kbd
            className="font-jetbrains inline-flex items-center justify-center"
            style={{
              minWidth: 20,
              height: 20,
              padding: '0 6px',
              background: 'var(--bg-void)',
              border: '1px solid var(--border-dim)',
              borderRadius: 3,
              color: 'var(--neon-green)',
            }}
          >
            `
          </kbd>
          <span>for terminal ·</span>
          <kbd
            className="font-jetbrains inline-flex items-center justify-center"
            style={{
              minWidth: 20,
              height: 20,
              padding: '0 6px',
              background: 'var(--bg-void)',
              border: '1px solid var(--border-dim)',
              borderRadius: 3,
              color: 'var(--neon-green)',
            }}
          >
            ?
          </kbd>
          <span>for shortcuts</span>
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
