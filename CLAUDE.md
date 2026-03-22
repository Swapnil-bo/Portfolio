# CLAUDE.md — Swapnil Hazra Portfolio Website

## Project Overview
A dark cyberpunk-themed portfolio for Swapnil Hazra — AI Engineer & Vibe Coder. This isn't a resume website. It's a recruiter-stopping, bookmark-worthy experience that proves technical depth through its own execution. If the portfolio itself feels like an engineering project, the recruiter already knows the person behind it can build.

**Stack**: React 18 + Vite + Tailwind CSS v4 + Framer Motion · Deployed on Vercel · Fully static, no backend.

---

## Design System: "NEURAL TERMINAL"

### Core Concept
The entire site feels like you're navigating a high-tech neural interface. Not a toy terminal emulator — a sleek, premium command center. Think: Westworld UI meets GitHub's dark mode meets a Bloomberg terminal. Every surface has purpose. Every animation communicates state.

### Color Palette (define as CSS variables AND Tailwind config)
```
--bg-void:        #06060e       ← deepest background, the void
--bg-surface:     #0c0c18       ← card/section backgrounds
--bg-elevated:    #13132a       ← hovered cards, active states
--border-dim:     rgba(0, 255, 136, 0.06)   ← resting borders
--border-glow:    rgba(0, 255, 136, 0.25)   ← hover borders
--neon-green:     #00ff88       ← PRIMARY accent — terminal, headings, CTAs
--neon-cyan:      #00d4ff       ← SECONDARY accent — links, info highlights
--neon-hot:       #ff3366       ← DANGER/FEATURED accent — badges, warnings
--neon-purple:    #a855f7       ← TERTIARY — timeline, category accents
--text-primary:   #e4e4e7       ← main body text
--text-secondary: #71717a       ← muted text, timestamps, descriptions
--text-ghost:     #3f3f50       ← barely visible, decorative text
```

### Glow System (reusable utility classes)
```css
.glow-green    { box-shadow: 0 0 20px rgba(0,255,136,0.15), 0 0 60px rgba(0,255,136,0.05); }
.glow-green-lg { box-shadow: 0 0 30px rgba(0,255,136,0.25), 0 0 80px rgba(0,255,136,0.08); }
.glow-cyan     { box-shadow: 0 0 20px rgba(0,212,255,0.15); }
.glow-hot      { box-shadow: 0 0 20px rgba(255,51,102,0.2); }
.text-glow     { text-shadow: 0 0 10px rgba(0,255,136,0.5), 0 0 40px rgba(0,255,136,0.15); }
```

### Typography
- **Logo/Brand**: `"Orbitron"` (700) — sci-fi terminal vibe, used ONLY for the navbar logo
- **Headings**: `"Syne"` (600, 700) — bold, geometric, distinctive, underused — section titles, hero name
- **Body / Mono**: `"IBM Plex Mono"` (400, 500) — monospace everywhere to commit to the terminal aesthetic
- **Tags / Labels**: `"JetBrains Mono"` (400) — crisp, technical, for chips and small UI text
- Import ALL via Google Fonts `<link>` in `index.html`.

### Atmospheric Effects (defined once in `index.css`, reused via classes)
1. **Scanlines**: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)` as a `::after` pseudo on `body` — `pointer-events: none`, full viewport overlay, `z-index: 9999`
2. **Noise texture**: tiny SVG noise filter or CSS grain overlay at 3-5% opacity on body
3. **Grid underlay**: Faint `#00ff88` grid lines at ~80px intervals on the hero, `opacity: 0.03`
4. **Vignette**: Radial gradient darkening the edges of viewport, applied to body `::before`

---

## Site Sections (Top to Bottom)

### 0. BOOT SEQUENCE (Page Load Screen)
**This is the first thing a recruiter sees. It sets the tone for everything.**

A fullscreen loading/boot screen that plays for ~2.5 seconds on first visit:
- Black screen (`#06060e`) with monospace text appearing line by line:
  ```
  [BOOT] Neural Terminal v2.0.26
  [INIT] Loading identity matrix... OK
  [SCAN] 13 projects indexed
  [LINK] GitHub connection established
  [SYS]  All modules operational
  > Welcome. Initializing interface...
  ```
- Each line appears with a 300ms delay, slight flicker
- Green text (`--neon-green`) on void background, authentic terminal feel
- After the last line, the screen slides up (or dissolves away) to reveal the actual site beneath
- Use Framer Motion `AnimatePresence` to unmount cleanly
- Store a flag in `sessionStorage` so it only plays ONCE per browser session — return visitors skip it
- Component: `BootSequence.jsx`

### 1. Scroll Progress Bar
- A 2px neon green bar fixed at the very top of the viewport (`z-index: 10000`)
- Width scales from 0% to 100% as user scrolls
- Glows: `box-shadow: 0 0 8px rgba(0,255,136,0.4)`
- Pure JS — listen to `scroll` event, calculate `scrollTop / (scrollHeight - clientHeight) * 100`
- Component: `ScrollProgress.jsx`

### 2. Navbar (Fixed Top, below scroll bar)
- **Left**: `⟩ swapnil.hazra` in Orbitron font, `--neon-green`, with a subtle pulse animation on the `⟩` character
- **Center**: Nav links in JetBrains Mono — `About` · `Projects` · `Timeline` · `Contact`
  - Active section gets a neon green underline (animated width transition via Intersection Observer)
  - Hover: text color transitions to `--neon-green` + slight `translateY(-1px)`
- **Right**: Two action items:
  - `[ Resume ↓ ]` — outlined `--neon-cyan` button, triggers PDF download on click
  - Status pill: `◉ Open to Internships` — small pulsing green dot + text in `--neon-green`, dim border — **THIS IS CRITICAL FOR RECRUITERS TO SEE IMMEDIATELY**
- Background: fully transparent at top → on scroll past 50px, `backdrop-filter: blur(16px)` + `background: var(--bg-void)/80%`
- **Mobile**: Hamburger icon (three horizontal lines, monospace-styled) → fullscreen overlay dark menu with staggered link animations
- Component: `Navbar.jsx`

### 3. Hero Section (100vh)
- **Background**: Animated particle field (lightweight `<canvas>`) — ~80 dots connected by faint lines when within 120px, slowly drifting. On mouse move, nearby particles push away from cursor (repulsion physics). Color: `--neon-green` at 10-15% opacity. SUBTLE — atmosphere, not distraction. On mobile: reduce to ~40 particles, disable mouse interaction.
  - Component: `ParticleField.jsx` — uses `requestAnimationFrame`, typed with `useRef` for canvas, `useEffect` for animation loop

- **Content** (center-left aligned, max-width 800px, left-padded ~10%):
  - **Line 1** (typed animation): `> initializing swapnil_hazra...` — IBM Plex Mono, `--text-secondary`, typed character-by-character over ~1.5s with blinking `_` cursor
  - **Line 2** (staggered reveal, starts after typing finishes): `Swapnil Hazra` — HUGE (`clamp(2.5rem, 6vw, 5rem)`), Syne 700, `--text-primary` (white), each word slides up from 30px below with opacity 0→1, staggered 100ms per word
  - **Line 3** (200ms after Line 2): `AI Engineer & Vibe Coder` — Syne 600, `--neon-green` with `.text-glow`, fade in
  - **Line 4** (300ms after): `Building privacy-first agents and local LLM systems. Shipping every day for 100 days.` — IBM Plex Mono 400, `--text-secondary`, max-width 600px
  - **Stats bar** (400ms after, horizontal row):
    - `13` Projects Shipped · `100` Days Challenge · `6+` Agent Systems
    - Numbers: Syne 700 `--neon-green`, labels: IBM Plex Mono `--text-secondary`
    - Separated by faint `|` dividers in `--text-ghost`
  - **CTA row** (500ms after):
    - `[ View Projects ↓ ]` — solid `--neon-green` bg, `--bg-void` text, Syne 600 — PRIMARY. Hover: `glow-green-lg` + `scale(1.02)`
    - `[ GitHub → ]` — outlined `--neon-green`, transparent bg — SECONDARY. Hover: bg fills green at 10% opacity
    - Both: `border-radius: 4px` (sharp, terminal aesthetic), padding `12px 28px`

- **Scroll indicator**: Thin chevron `∨` at bottom center, `--text-ghost`, infinite bounce animation (`translateY(0→8px→0)` over 2s)
- Component: `Hero.jsx`

### 4. About Section
- **Section header** (this pattern is reused for ALL sections):
  - Line 1: `// about` — JetBrains Mono, `--text-ghost`, small size
  - Line 2: `Who I Am_` — Syne 700, `--text-primary`, with the underscore blinking in `--neon-green`
  - Line 3: Horizontal accent line — 60px wide, 2px tall, `--neon-green` with `.glow-green`

- **Two-column layout** (60/40 split, stacks on mobile):
  - **Left — Bio**:
    > I'm an AI Engineer specializing in Generative AI, agentic workflows, and local LLM systems. I build multi-agent pipelines that plan, reason, and self-correct — running entirely on consumer GPUs.
    >
    > Currently on Day X of my **100 Days of Vibe Coding** challenge — shipping an open-source AI project every few days. 13 projects and counting. Every line of code is public.
    >
    > I don't just use AI frameworks. I stress-test them, break them, and rebuild them until they work on an RTX 3050 with 8GB RAM. Constraints breed creativity.

    Style: IBM Plex Mono, `--text-secondary`, 1.7 line-height, bold phrases in `--text-primary`

  - **Right — Info Grid** (2×2 cards, each with a colored left-border accent):
    - `🎯 FOCUS` → Generative AI · Agentic Systems · RAG (left-border: `--neon-green`)
    - `🔥 STREAK` → 100 Days of Vibe Coding (left-border: `--neon-hot`) — add a tiny pulsing "LIVE" dot
    - `🎓 STUDYING` → B.Tech CS · Brainware University (left-border: `--neon-cyan`)
    - `⚡ SEEKING` → AI/ML Product Management Internships (left-border: `--neon-purple`) — **RECRUITER MAGNET**
    - Card style: `--bg-surface`, 4px colored left border, padding 16px, `--text-secondary` body, label in `--text-ghost` uppercase small

- **Tech Arsenal** (full-width below the two columns):
  - Opening: `tech_stack = [` — JetBrains Mono, `--text-ghost`
  - Wrapping flex grid of skill chips:
    - Chip style: `--bg-elevated`, `1px solid var(--border-dim)`, JetBrains Mono 13px, `--text-secondary`, `border-radius: 3px`, padding `6px 12px`
    - Hover: border → `--border-glow`, faint `glow-green`
    - Skills (ordered by domain):
      - Python, PyTorch, LangChain, LangGraph, Ollama, Hugging Face, Groq, Gemini, RAG, ChromaDB, Vector DBs
      - React, Next.js, FastAPI, Tailwind CSS, TypeScript, WebSockets, Vite
      - Claude Code, Git, Streamlit, Cursor, Linux
  - Closing: `]` — JetBrains Mono, `--text-ghost`
  - Staggered fade-in: each chip delayed by `index * 0.02s` on scroll into view

- Component: `About.jsx`

### 5. Projects Section — THE MAIN EVENT
- **Section header**: `// projects` → `What I've Built_`

- **Top bar** (flex row, space-between):
  - **Left**: Filter pills — `All` | `Agentic AI` | `Full-Stack` | `ML & Data Science` | `Local LLMs`
    - Active: solid `--neon-green` bg, `--bg-void` text
    - Inactive: `--bg-surface` bg, `1px solid var(--border-dim)`, `--text-secondary`
    - Hover (inactive): border → `--border-glow`
    - Use `onClick` handlers to set active filter in state
  - **Right**: `showing 13 of 13` counter in JetBrains Mono `--text-ghost` — dynamically updates with filter

- **Grid**: 3 columns desktop, 2 tablet, 1 mobile. Gap: 20px. Use Framer Motion `layout` prop on each card + `AnimatePresence` wrapping the grid for smooth reflow on filter.

- **Project Card** (`ProjectCard.jsx`):
  ```
  ┌─────────────────────────────────────────┐
  │ ⟩ AGENTIC AI                 ★ FEATURED │  ← category badge + optional featured
  │                                          │
  │ J.A.R.V.I.S.                             │  ← name: Syne 600, --text-primary
  │                                          │
  │ 100% local AI assistant with             │  ← desc: IBM Plex Mono 14px,
  │ voice, vision, memory & code             │    --text-secondary, 3 lines max
  │ execution — running on 8GB RAM.          │
  │                                          │
  │ ┌──────┐ ┌──────┐ ┌──────┐ ┌───────┐   │  ← tags: small chips, flex-wrap
  │ │Python│ │Ollama│ │Whisper│ │Voice AI│   │
  │ └──────┘ └──────┘ └──────┘ └───────┘   │
  │                                          │
  │ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │  ← faint divider line
  │ [ GitHub → ]           [ Live Demo → ]   │  ← action links
  └─────────────────────────────────────────┘
  ```
  - Background: `--bg-surface`, Border: `1px solid var(--border-dim)`
  - Hover: `translateY(-4px)`, border → `--border-glow`, `.glow-green`, 200ms ease. A faint horizontal neon scanline sweeps across the card top-to-bottom (CSS `@keyframes` on a `::before` pseudo, triggered on hover).
  - `★ FEATURED` badge: `--neon-hot` text, tiny, right-aligned. Only on: Jarvis, NEXUS, CutAI
  - Category badge colors: Agentic AI → `--neon-green`, Full-Stack → `--neon-cyan`, ML → `--neon-purple`, Local LLMs → `--neon-hot`
  - `[ Live Demo → ]` only renders if `project.demo` is not null. Styled same as GitHub link but with `--neon-cyan`
  - Tags chip: `--bg-void`, `1px solid var(--border-dim)`, JetBrains Mono 11px, padding `3px 8px`

- Component: `Projects.jsx` + `ProjectCard.jsx`

#### Project Data (src/data/projects.js):
```js
export const projects = [
  {
    name: "J.A.R.V.I.S.",
    desc: "100% local AI assistant with voice, vision, memory & code execution — running on 8GB RAM. No cloud. No API keys. No excuses.",
    tags: ["Python", "Ollama", "Whisper", "Voice AI", "Local-LLM", "Phi-3"],
    category: "Agentic AI",
    featured: true,
    github: "https://github.com/Swapnil-bo/Jarvis",
    demo: null
  },
  {
    name: "NEXUS",
    desc: "Local multi-agent system that plans, writes, executes, and self-corrects Python code — 4 agents powered by LangGraph on consumer hardware.",
    tags: ["Python", "LangGraph", "Ollama", "Multi-Agent", "Pydantic", "LangChain"],
    category: "Agentic AI",
    featured: true,
    github: "https://github.com/Swapnil-bo/NEXUS",
    demo: null
  },
  {
    name: "CutAI",
    desc: "AI Film Director & Storyboard Engine — feed it a script, get shot-by-shot breakdowns, camera angles, mood arcs, and a drag-and-drop visual timeline.",
    tags: ["React", "FastAPI", "Groq", "Ollama", "React Flow", "Recharts", "Zustand"],
    category: "Full-Stack",
    featured: true,
    github: "https://github.com/Swapnil-bo/CutAI",
    demo: "https://cut-ai.vercel.app"
  },
  {
    name: "LoreWeaver",
    desc: "Multiplayer tabletop RPG with a local Mistral 7B Dungeon Master, RAG/ChromaDB memory, React Flow world map, and real-time WebSocket multiplayer.",
    tags: ["FastAPI", "Mistral 7B", "ChromaDB", "React Flow", "WebSocket", "RAG"],
    category: "Full-Stack",
    featured: false,
    github: "https://github.com/Swapnil-bo/LoreWeaver",
    demo: null
  },
  {
    name: "EchoChamber",
    desc: "Drop a URL, PDF, or Wikipedia page — get a 5-minute two-host AI debate podcast. Full pipeline from scraping to text-to-speech.",
    tags: ["FastAPI", "React", "Gemini", "Edge-TTS", "PyDub", "LangChain"],
    category: "Full-Stack",
    featured: false,
    github: "https://github.com/Swapnil-bo/EchoChamber",
    demo: "https://echo-chamber-ai.vercel.app"
  },
  {
    name: "Butterfly Effect Simulator",
    desc: "Input a small decision, watch a 10-year AI-generated consequence chain unfold as an interactive graph. Chaos theory meets LLMs.",
    tags: ["FastAPI", "Next.js", "React Flow", "Groq", "Ollama"],
    category: "Full-Stack",
    featured: false,
    github: "https://github.com/Swapnil-bo/Butterfly-Effect-Simulator",
    demo: "https://butterfly-effect-simulator.vercel.app"
  },
  {
    name: "Chat-Vibe",
    desc: "High-performance WhatsApp chat analyzer — upload an export, get psychological insights and relationship dynamics powered by Gemini.",
    tags: ["Next.js", "TypeScript", "Gemini", "Web Workers", "Recharts"],
    category: "Full-Stack",
    featured: false,
    github: "https://github.com/Swapnil-bo/Chat-Vibe",
    demo: null
  },
  {
    name: "ResumeRank-AI",
    desc: "Automated resume screening agent — ranks candidates via LLM-based gap analysis using Gemini 2.5 Flash. Built for hiring workflows.",
    tags: ["Python", "Gemini", "Pandas", "PyPDF", "Streamlit"],
    category: "Agentic AI",
    featured: false,
    github: "https://github.com/Swapnil-bo/ResumeRank-AI",
    demo: null
  },
  {
    name: "BioSignal Decoder",
    desc: "EEG mental state classifier — brainwave signals → wavelet + FFT features → SVM + Random Forest ensemble. Zero LLMs, pure classical ML.",
    tags: ["Python", "MNE", "SciPy", "PyWavelets", "Scikit-learn", "Streamlit"],
    category: "ML & Data Science",
    featured: false,
    github: "https://github.com/Swapnil-bo/BioSignal",
    demo: null
  },
  {
    name: "TruthLens",
    desc: "Fake news detector with 5-signal credibility scoring and LIME phrase-level explainability. XGBoost + spaCy pipeline with visual breakdown.",
    tags: ["Python", "XGBoost", "spaCy", "LIME", "Plotly", "Streamlit"],
    category: "ML & Data Science",
    featured: false,
    github: "https://github.com/Swapnil-bo/TruthLens",
    demo: null
  },
  {
    name: "CineMatch",
    desc: "Collaborative filtering recommendation engine — cosine similarity on MovieLens data with a Streamlit discovery interface.",
    tags: ["Python", "Pandas", "NumPy", "Scipy", "Scikit-learn", "Streamlit"],
    category: "ML & Data Science",
    featured: false,
    github: "https://github.com/Swapnil-bo/Movie-Recommendation-System",
    demo: null
  },
  {
    name: "House Price Predictor",
    desc: "End-to-end price prediction — advanced EDA, VIF multicollinearity handling, Scikit-Learn pipelines for robust regression modeling.",
    tags: ["Python", "Pandas", "Seaborn", "Scikit-Learn", "Streamlit"],
    category: "ML & Data Science",
    featured: false,
    github: "https://github.com/Swapnil-bo/House-Price-Predictor",
    demo: null
  },
  {
    name: "AI-Language Translator",
    desc: "Privacy-first offline translator — MarianMT running locally for 6+ language pairs. No API calls, no data ever leaves your machine.",
    tags: ["Python", "HuggingFace", "MarianMT", "PyTorch", "Streamlit"],
    category: "Local LLMs",
    featured: false,
    github: "https://github.com/Swapnil-bo/AI-Language-Translator",
    demo: null
  }
];
```

### 6. Timeline Section
- **Section header**: `// journey` → `The Path_`

- **Layout**: Vertical timeline, centered line on desktop (cards alternate left/right), left-aligned single column on mobile
  - Center line: 2px wide, `--neon-green` at 15% opacity, runs full height of the section
  - Glowing node dots at each entry: 10px circles, `--neon-green`, `.glow-green`, connected to the center line
  - Each card connected to its dot via a short 30px horizontal line

- **Each timeline entry**:
  - Year badge: `--neon-green`, Syne 700, positioned near the dot
  - Icon emoji on the dot (overlaid on the circle)
  - Card: `--bg-surface`, `1px solid var(--border-dim)`, padding 24px
    - Title: Syne 600, `--text-primary`
    - Description: IBM Plex Mono, `--text-secondary`
    - Tags: small chips same style as project tags
  - Scroll-triggered animation: `whileInView` — left cards slide in from `x: -50`, right from `x: 50`, with `opacity: 0→1`

#### Timeline Data (src/data/timeline.js):
```js
export const timeline = [
  {
    year: "2026",
    title: "100 Days of Vibe Coding",
    desc: "Launched a public build challenge — shipping an AI project every few days. CutAI, EchoChamber, LoreWeaver, Butterfly Effect Simulator deployed. 13 projects open-sourced. Building in public on X and LinkedIn.",
    tags: ["React", "FastAPI", "Groq", "Vercel", "Claude Code"],
    icon: "🔥"
  },
  {
    year: "2025",
    title: "First Agentic Systems",
    desc: "Built NEXUS (4-agent self-correcting code pipeline) and J.A.R.V.I.S. (local voice assistant with 6 tool modules). Discovered LangGraph. Pushed a 7B model to its limits on 6GB VRAM.",
    tags: ["LangGraph", "Ollama", "Multi-Agent", "Whisper"],
    icon: "🤖"
  },
  {
    year: "2024",
    title: "ML & Data Science Foundations",
    desc: "Built the fundamentals: EEG signal classification, fake news detection, recommendation engines, regression pipelines. Classical ML before the LLM wave — SVM, XGBoost, Random Forest.",
    tags: ["Scikit-learn", "XGBoost", "spaCy", "Streamlit"],
    icon: "📊"
  },
  {
    year: "2023",
    title: "Started at Brainware University",
    desc: "Began B.Tech in Computer Science. First lines of Python. First encounter with AI/ML. The spark that started everything.",
    tags: ["Python", "CS Fundamentals"],
    icon: "🎓"
  }
];
```

### 7. Contact Section
- **Section header**: `// contact` → `Let's Connect_`
- Centered layout, max-width 600px
- **Headline**: `Have an internship opportunity or want to collaborate?` — Syne 600, `--text-primary`
- **Subline**: `Currently seeking AI/ML Product Management internships.` — IBM Plex Mono, `--neon-green`, `.text-glow`
- **Email CTA**: Large button — `[ swapnilhazra8@gmail.com → ]` — outlined `--neon-green`, on click: copy email to clipboard + show a brief `✓ Copied!` tooltip (use `navigator.clipboard.writeText`, tooltip fades after 2s via state)
- **Social links**: Horizontal row of icon+label buttons:
  - GitHub → `https://github.com/Swapnil-bo`
  - LinkedIn → `https://www.linkedin.com/in/swapnil-hazra-4831322b7/`
  - X (Twitter) → `https://x.com/SwapnilHazra4`
  - Instagram → `https://instagram.com/swapnil_hazra_`
  - Email → `mailto:swapnilhazra8@gmail.com`
  - Style: each is a flex row (SVG icon + label), `--text-secondary`, on hover → `--neon-green` + `.glow-green` + `translateY(-2px)`
  - Use inline SVG icons for GitHub, LinkedIn, X, Instagram, Mail (simple 20px outlines) — do NOT install an icon library, just embed minimal SVGs
- Component: `Contact.jsx`

### 8. Footer
- Full-width strip, `--bg-surface`, thin `--border-dim` top border
- Left: `© 2026 Swapnil Hazra` — IBM Plex Mono, `--text-ghost`
- Right: `Built with React + vibes` — IBM Plex Mono, `--text-ghost`
- Center bottom (optional): `"Vibe Coding" the future.` in `--text-ghost` small
- Component: `Footer.jsx`

---

## Animation & Interaction Spec

### Page Load Sequence (strict order):
1. Boot sequence plays for ~2.5s (skip if sessionStorage flag exists) → unmounts
2. Navbar slides down from `y: -60` (300ms, ease-out)
3. Particle field canvas fades in (500ms)
4. Hero typed line begins: `> initializing swapnil_hazra...` (1.5s typing)
5. After typing completes: hero name words slide up (stagger 100ms per word)
6. Subtitle fades in (200ms delay)
7. Description fades in (300ms delay)
8. Stats bar fades in (400ms delay)
9. CTA buttons fade in (500ms delay)
10. Scroll indicator begins bouncing loop

### Scroll Animations:
- Every section: Framer Motion `whileInView={{ opacity: 1, y: 0 }}` from `initial={{ opacity: 0, y: 30 }}`, `viewport={{ once: true, amount: 0.1 }}`
- Project cards: stagger `delay: index * 0.05`
- Timeline entries: left cards `x: [-50, 0]`, right cards `x: [50, 0]`
- Tech chips: stagger `delay: index * 0.02`
- About info cards: stagger `delay: index * 0.1`

### Hover Effects:
- Project cards: `translateY(-4px)`, border → `--border-glow`, `.glow-green`, neon scanline sweep (CSS `::before`)
- Nav links: color → `--neon-green`, `translateY(-1px)`, 150ms transition
- CTA primary: `glow-green-lg`, `scale(1.02)`, 150ms
- CTA secondary: `bg: rgba(0,255,136,0.08)`, 150ms
- Social icons: color → `--neon-green`, `translateY(-2px)`, glow
- Skill chips: border → `--border-glow`, faint glow

### CSS Special Effects:
- **Glitch hover**: On hover over hero name, brief clip-path based glitch (200ms). Class: `.glitch-hover`. Defined as CSS keyframes in `index.css`.
- **Typed cursor**: `.typed-cursor::after { content: '_'; animation: blink 1s step-end infinite; color: var(--neon-green); }`
- **Card scanline sweep**: `.card-hover-scan::before` — a 2px tall `--neon-green` line at 5% opacity that sweeps from top to bottom of the card over 600ms on hover, using `translateY` keyframes.
- **Pulse dot**: `.pulse-dot` — 8px circle with infinite `scale(1→1.5→1)` + `opacity(1→0.5→1)` over 2s, used for status pill and "LIVE" indicator.

---

## SEO & Open Graph

In `index.html` `<head>`:
```html
<title>Swapnil Hazra | AI Engineer & Vibe Coder</title>
<meta name="description" content="AI Engineer building privacy-first agents, multi-agent pipelines, and local LLM systems. 13 projects shipped. Currently on the 100 Days of Vibe Coding challenge." />

<!-- Open Graph -->
<meta property="og:title" content="Swapnil Hazra | AI Engineer & Vibe Coder" />
<meta property="og:description" content="Building privacy-first agents and local LLM systems. 13 projects shipped." />
<meta property="og:type" content="website" />
<meta property="og:image" content="/og.png" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Swapnil Hazra | AI Engineer & Vibe Coder" />
<meta name="twitter:description" content="Building privacy-first agents and local LLM systems. 13 projects shipped." />
<meta name="twitter:image" content="/og.png" />
```

**OG Image**: Create a simple 1200×630 dark image with "Swapnil Hazra" in Syne and "AI Engineer & Vibe Coder" in neon green. Can be generated manually or with a Vercel OG template. Place at `public/og.png`.

---

## Resume PDF
- Place resume at `public/Swapnil_Hazra_Resume.pdf`
- Navbar `[ Resume ↓ ]` links to it with `download` attribute
- **Swapnil: you must manually add your actual resume PDF before deploying.**

---

## Responsive Breakpoints
- **Desktop (1024px+)**: Full layout — 3-col project grid, 2-col about, alternating timeline, full navbar
- **Tablet (768–1023px)**: 2-col project grid, stacked about sections, left-aligned timeline, full navbar
- **Mobile (<768px)**: 1-col everything, hamburger menu → fullscreen overlay, ~40 particles (reduced), touch targets 44px+, boot sequence plays faster (1.5s total)

---

## File Structure
```
portfolio/
├── public/
│   ├── favicon.svg                  ← neon green ">" cursor icon
│   ├── og.png                       ← OG preview image 1200×630
│   └── Swapnil_Hazra_Resume.pdf     ← ADD MANUALLY
├── src/
│   ├── components/
│   │   ├── BootSequence.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── ParticleField.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── Timeline.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   ├── projects.js
│   │   └── timeline.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── index.html
├── package.json
├── vite.config.js
└── CLAUDE.md
```

---

## Build Order (Claude Code — ONE step per prompt)

| Step | What to Build | Commit Message |
|------|---------------|----------------|
| 1 | Scaffold: Vite + React + Tailwind v4 + Framer Motion. Set up `index.html` (Google Fonts, meta/OG tags, favicon). Set up `index.css` (CSS variables, all utility classes: glow, scanlines, noise, vignette, typed cursor, glitch, pulse-dot, card-scan). Set up `tailwind.config.js` extending colors from palette. | `init: project scaffold with design system` |
| 2 | `src/data/projects.js` + `src/data/timeline.js` — copy the exact data arrays from this CLAUDE.md | `feat: add project and timeline data` |
| 3 | `App.jsx` — imports all components (create stubs), manages boot sequence state, wraps everything in `<main>`, smooth scroll CSS | `feat: app shell with section stubs` |
| 4 | `BootSequence.jsx` — terminal boot animation, sessionStorage check, AnimatePresence exit | `feat: boot sequence screen` |
| 5 | `ScrollProgress.jsx` — fixed neon bar, scroll listener | `feat: scroll progress bar` |
| 6 | `Navbar.jsx` — logo, nav links with active tracking (Intersection Observer), resume download, status pill, scroll blur bg, mobile hamburger | `feat: navbar with resume + internship status` |
| 7 | `ParticleField.jsx` — canvas particle system with mouse repulsion, responsive particle count | `feat: interactive particle background` |
| 8 | `Hero.jsx` — typed effect, staggered name reveal, subtitle, desc, stats bar, CTAs, scroll indicator | `feat: hero section with animations` |
| 9 | `About.jsx` — bio text, info grid cards, tech arsenal chip cloud | `feat: about section with tech arsenal` |
| 10 | `ProjectCard.jsx` + `Projects.jsx` — card component, filterable grid, AnimatePresence, category colors, featured badges, live demo links | `feat: filterable project grid` |
| 11 | `Timeline.jsx` — vertical timeline, alternating cards, scroll animations, year badges, icons | `feat: journey timeline` |
| 12 | `Contact.jsx` + `Footer.jsx` — email copy-to-clipboard, social links with SVG icons, footer | `feat: contact and footer` |
| 13 | Polish pass — test all hover effects, responsive at 320/768/1024/1440px, fix z-index stacking, verify all links, check Lighthouse score, compress any assets | `polish: responsive + performance fixes` |
| 14 | `vercel --prod` to deploy | `deploy: ship to production` |

---

## Critical Rules for Claude Code

1. **ONE component per prompt.** Do NOT scaffold multiple components or jump ahead.
2. **ONE git commit per verified working step.** Run `npm run dev` and visually confirm before committing.
3. **Do NOT explore the full codebase** — work only on the file(s) specified for that step.
4. **npm dependencies allowed**: `framer-motion` only (beyond Vite/React/Tailwind defaults). No Three.js, GSAP, Lottie, or icon libraries.
5. **All external links**: `target="_blank" rel="noopener noreferrer"`
6. **No placeholder images.** This portfolio is text-and-code focused.
7. **Semantic HTML**: One `<h1>` only (hero name). Use `<nav>`, `<main>`, `<section id="...">`, `<footer>`. `aria-label` on icon-only links.
8. **CSS variables for ALL colors** — never hardcode hex in JSX. Define in `:root` in `index.css`, reference via Tailwind config `extend.colors` or inline `var()`.
9. **Performance**: Bundle under 200KB gzipped. Canvas particles use `requestAnimationFrame`. Throttle resize listeners. No layout thrash.
10. **Mobile-first Tailwind** — write base styles for mobile, override with `md:` and `lg:` prefixes.