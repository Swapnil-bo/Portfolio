# Swapnil Hazra — Portfolio

**A dark cyberpunk neural terminal portfolio — engineered to prove technical depth through its own execution.**

---

## Live

[https://swapnilhazra.vercel.app](https://swapnilhazra.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build | Vite |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Deployment | Vercel (static) |

---

## Features

- **Terminal boot sequence** — monospace line-by-line initialization on first visit, sessionStorage-gated
- **Interactive particle field** — canvas-based with mouse repulsion physics, responsive particle count
- **Typed hero animation** — character-by-character typing with blinking cursor and glitch hover on name
- **Filterable project grid** — 13 projects across 4 categories with Framer Motion `AnimatePresence` reflow
- **Alternating scroll-animated timeline** — left/right card layout with `whileInView` entrance animations
- **Copy-to-clipboard contact** — one-click email copy with transient confirmation tooltip
- **Resume download** — direct PDF download from navbar on both desktop and mobile
- **"Open to Internships" status pill** — persistent pulsing indicator in the navbar
- **Scroll progress bar** — 2px neon green bar tracking scroll position, fixed at viewport top
- **Fully responsive** — mobile-first Tailwind with breakpoints at 768px and 1024px, hamburger menu overlay
- **SEO + Open Graph** — full meta tags and OG image for link previews

---

## Sections

```
Boot Sequence → Hero → About → Projects → Timeline → Contact → Footer
```

Each section uses scroll-triggered Framer Motion animations with staggered reveals. The design system ("Neural Terminal") uses CSS custom properties for a consistent neon-on-void palette across all components.

---

## Run Locally

```bash
git clone https://github.com/Swapnil-bo/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Opens at `http://localhost:5173`.

---

## Built With

This project was built step-by-step using [Claude Code](https://claude.ai/claude-code) as an AI pair programmer, following a detailed `CLAUDE.md` blueprint that defined the design system, component architecture, animation spec, and build order. One component per step. One commit per verified working state.

---

## Connect

- [GitHub](https://github.com/Swapnil-bo)
- [LinkedIn](https://www.linkedin.com/in/swapnil-hazra-4831322b7/)
- [X](https://x.com/SwapnilHazra4)
- [Instagram](https://instagram.com/swapnil_hazra_)
- [Email](mailto:swapnilhazra8@gmail.com)

---

`> system.status: operational`
