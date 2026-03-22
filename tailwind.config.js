/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-void': 'var(--bg-void)',
        'bg-surface': 'var(--bg-surface)',
        'bg-elevated': 'var(--bg-elevated)',
        'border-dim': 'var(--border-dim)',
        'border-glow': 'var(--border-glow)',
        'neon-green': 'var(--neon-green)',
        'neon-cyan': 'var(--neon-cyan)',
        'neon-hot': 'var(--neon-hot)',
        'neon-purple': 'var(--neon-purple)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-ghost': 'var(--text-ghost)',
      },
      fontFamily: {
        orbitron: ['"Orbitron"', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
        jetbrains: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
