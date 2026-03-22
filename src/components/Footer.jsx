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
        <p className="font-mono text-xs" style={{ color: 'var(--text-ghost)' }}>
          Built with React + vibes
        </p>
      </div>
    </footer>
  )
}

export default Footer
