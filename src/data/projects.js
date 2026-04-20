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
    name: "AutoResearcher",
    desc: "Local-first multi-agent research system. Ask a question, get a cited research report. LangGraph orchestrates three specialized AI agents (Search → Extract → Synthesize) running entirely on Ollama. Open-source Perplexity, on your machine.",
    tags: ["Python", "LangGraph", "FastAPI", "ChromaDB", "Ollama", "Multi-Agent", "RAG", "React", "Local-LLM", "LangChain"],
    category: "Agentic AI",
    featured: true,
    github: "https://github.com/Swapnil-bo/AutoResearcher",
    demo: null
  },
  {
    name: "FossilAI",
    desc: "AI Code Archaeologist — upload any GitHub repo and FossilAI reverse-engineers its architecture. Interactive dependency graph, auto-generated ADRs, tech debt heatmap, and refactor simulations.",
    tags: ["Python", "React", "FastAPI", "Gemini", "Groq", "React Flow"],
    category: "Agentic AI",
    featured: false,
    github: "https://github.com/Swapnil-bo/FossilAI",
    demo: "https://fossil-ai.vercel.app/"
  },
  {
    name: "SynthBoard",
    desc: "Local fine-tuning pipeline + model arena for consumer GPUs. Upload datasets → auto-format → QLoRA fine-tune via unsloth → export to GGUF → compare against base models in a blind side-by-side arena with Elo ratings. Built for RTX 3050 6GB.",
    tags: ["Python", "FastAPI", "React", "Vite", "Tailwind CSS", "Ollama", "QLoRA", "Unsloth", "LoRA", "Transformers", "BitsAndBytes", "GGUF", "Llama.cpp", "SQLite", "SSE", "Local-LLM", "Elo Rating"],
    category: "Local LLMs",
    featured: true,
    github: "https://github.com/Swapnil-bo/SynthBoard",
    demo: null
  },
  {
    name: "ONEIROS",
    desc: "Describe your dream, receive a deep Jungian, Freudian & symbolic analysis powered by qwen2.5:7b running fully local. Dark occult UI with animated mood gauge, symbol extraction & dream journal.",
    tags: ["Python", "React", "Vite", "FastAPI", "JavaScript", "Ollama", "qwen2.5:7b", "Local LLM", "Local AI", "Framer Motion", "Zustand", "Pydantic"],
    category: "Local LLMs",
    featured: true,
    github: "https://github.com/Swapnil-bo/Dream-Interpreter",
    demo: null
  },
  {
    name: "Startup Idea Roulette",
    desc: "Spin three slot wheels, get a random audience + problem + tech, watch a local LLM roast your doomed startup idea in real time. Built with FastAPI, Ollama (Mistral 7B), React + Vite, and a dangerously good prompt.",
    tags: ["Python", "React", "Vite", "FastAPI", "JavaScript", "Tailwind CSS", "Framer Motion", "Ollama", "Mistral 7B", "Local AI", "Streaming", "Local LLM"],
    category: "Local LLMs",
    featured: false,
    github: "https://github.com/Swapnil-bo/Startup-Idea-Roulette",
    demo: null
  },
  {
    name: "NETLIFE",
    desc: "Turn your life into a Netflix Original Series using local AI — title, cast, episodes & trailer script. Built with React + Mistral 7B via Ollama. No API keys. No cloud. Runs 100% on your machine.",
    tags: ["React", "Vite", "JavaScript", "Tailwind CSS", "Ollama", "Mistral 7B", "Local AI"],
    category: "Local LLMs",
    featured: false,
    github: "https://github.com/Swapnil-bo/NETLIFE",
    demo: null
  },
  {
    name: "The Multiverse Courier",
    desc: "AI newspaper that generates today's headlines from alternate timelines using a local LLM. Feed it a date and get parallel-universe news articles, editorials, and breaking stories.",
    tags: ["Python", "React", "Vite", "FastAPI", "Tailwind CSS", "Ollama", "Mistral 7B", "Local AI"],
    category: "Local LLMs",
    featured: false,
    github: "https://github.com/Swapnil-bo/The-Multiverse-Courier",
    demo: null
  },
  {
    name: "Vibe Check Dashboard",
    desc: "Scrapes your GitHub commits for the last 30 days and uses local AI (qwen2.5:7b via Ollama) to analyze your builder energy — mood trends, productivity spikes, and burnout signals.",
    tags: ["Python", "React", "Vite", "FastAPI", "JavaScript", "Tailwind CSS", "Framer Motion", "Recharts", "Ollama", "qwen2.5:7b", "Local AI"],
    category: "Local LLMs",
    featured: false,
    github: "https://github.com/Swapnil-bo/Vibe-Check-Dashboard",
    demo: null
  },
  {
    name: "Anime-ify Me",
    desc: "Describe yourself and get your anime character profile, backstory & special power. Built with React, FastAPI & Mistral 7B running fully locally via Ollama — no API keys, no cloud, just on-device AI.",
    tags: ["Python", "React", "Vite", "FastAPI", "JavaScript", "Tailwind CSS", "Framer Motion", "Ollama", "Mistral 7B", "Local AI"],
    category: "Local LLMs",
    featured: false,
    github: "https://github.com/Swapnil-bo/Anime-ify-Me",
    demo: null
  },
  {
    name: "Roast My Resume",
    desc: "Upload your resume, pick a role — get brutally roasted and rewritten by a local AI. Powered by Mistral 7B via Ollama. No cloud. No API keys. Just pain.",
    tags: ["Python", "React", "Vite", "FastAPI", "JavaScript", "Framer Motion", "Ollama", "Mistral 7B", "Local AI"],
    category: "Local LLMs",
    featured: false,
    github: "https://github.com/Swapnil-bo/Roast-My-Resume",
    demo: null
  },
  {
    name: "LoreWeaver",
    desc: "Multiplayer tabletop RPG with a local Mistral 7B Dungeon Master, RAG/ChromaDB memory, React Flow world map, and real-time WebSocket multiplayer.",
    tags: ["FastAPI", "Mistral 7B", "ChromaDB", "React Flow", "WebSocket", "RAG"],
    category: "Local LLMs",
    featured: false,
    github: "https://github.com/Swapnil-bo/LoreWeaver",
    demo: null
  },
  {
    name: "AI Product Teardown",
    desc: "AI-powered product analysis tool that deconstructs any SaaS/app into a full PM teardown — personas, pain points, revenue model, feature gaps, and growth opportunities.",
    tags: ["Python", "React", "Vite", "FastAPI", "JavaScript", "Groq", "Generative AI"],
    category: "Full-Stack",
    featured: true,
    github: "https://github.com/Swapnil-bo/Ai-Product-Teardown",
    demo: "https://ai-product-teardown.vercel.app/"
  },
  {
    name: "AI Roast My Code",
    desc: "An AI-powered code roaster — paste any public GitHub repo and get destroyed. Built with FastAPI + Groq + React.",
    tags: ["FastAPI", "React", "Vite", "Groq", "Python", "Pillow", "Pydantic", "Uvicorn", "JavaScript", "REST API", "GitHub API", "Generative AI"],
    category: "Full-Stack",
    featured: false,
    github: "https://github.com/Swapnil-bo/AI-Roast-My-Code",
    demo: "https://ai-roast-my-code.vercel.app/"
  },
  {
    name: "VibeCheck",
    desc: "Paste any text — tweet, email, or message — and get a detailed emotional breakdown with tone tags, intent analysis, red flags, and a Vibe Score.",
    tags: ["FastAPI", "React", "Vite", "Groq", "Python", "Tailwind", "Framer Motion", "Pydantic", "Generative AI"],
    category: "Full-Stack",
    featured: false,
    github: "https://github.com/Swapnil-bo/Vibe-Check",
    demo: "https://vibe-check-api.vercel.app/"
  },
  {
    name: "CutAI",
    desc: "AI Film Director & Storyboard Engine — feed it a script, get shot-by-shot breakdowns, camera angles, mood arcs, and a drag-and-drop visual timeline.",
    tags: ["React", "FastAPI", "Groq", "React Flow", "Recharts", "Zustand"],
    category: "Full-Stack",
    featured: false,
    github: "https://github.com/Swapnil-bo/CutAI",
    demo: "https://cut-ai-nbx8.vercel.app/"
  },
  {
    name: "EchoChamber",
    desc: "Drop a URL, PDF, or Wikipedia page — get a 5-minute two-host AI debate podcast. Full pipeline from scraping to text-to-speech.",
    tags: ["FastAPI", "React", "Gemini", "Edge-TTS", "PyDub", "LangChain"],
    category: "Full-Stack",
    featured: false,
    github: "https://github.com/Swapnil-bo/EchoChamber",
    demo: null
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
    demo: "https://chat-vibe-psi.vercel.app/"
  },
  {
    name: "TruthLens",
    desc: "Fake news detector with 5-signal credibility scoring and LIME phrase-level explainability. XGBoost + spaCy pipeline with visual breakdown.",
    tags: ["Python", "XGBoost", "spaCy", "LIME", "Plotly", "Streamlit"],
    category: "ML & Data Science",
    featured: false,
    github: "https://github.com/Swapnil-bo/TruthLens",
    demo: "https://truthlens-b94mdhrr5aivpntlnzpju6.streamlit.app/"
  },
  {
    name: "CineMatch",
    desc: "Collaborative filtering recommendation engine — cosine similarity on MovieLens data with a Streamlit discovery interface.",
    tags: ["Python", "Pandas", "NumPy", "Scipy", "Scikit-learn", "Streamlit"],
    category: "ML & Data Science",
    featured: false,
    github: "https://github.com/Swapnil-bo/Movie-Recommendation-System",
    demo: "https://cinematch-srhdqinjayyzzwhvayghmy.streamlit.app/"
  },
  {
    name: "AI-Language Translator",
    desc: "Privacy-first offline translator — MarianMT running locally for 6+ language pairs. No API calls, no data ever leaves your machine.",
    tags: ["Python", "HuggingFace", "MarianMT", "PyTorch", "Streamlit"],
    category: "ML & Data Science",
    featured: false,
    github: "https://github.com/Swapnil-bo/AI-Language-Translator",
    demo: "https://ai-language-translator-crd3s3hykkbdu6wec2o6qj.streamlit.app/"
  },
  {
    name: "House Price Predictor",
    desc: "End-to-end price prediction — advanced EDA, VIF multicollinearity handling, Scikit-Learn pipelines for robust regression modeling.",
    tags: ["Python", "Pandas", "Seaborn", "Scikit-Learn", "Streamlit"],
    category: "ML & Data Science",
    featured: false,
    github: "https://github.com/Swapnil-bo/House-Price-Predictor",
    demo: "https://house-price-predictor-h4xszy5zhgrt42wjtcwkhb.streamlit.app/"
  },
  {
    name: "ResumeRank-AI",
    desc: "Automated resume screening agent — ranks candidates via LLM-based gap analysis using Gemini 2.5 Flash. Built for hiring workflows.",
    tags: ["Python", "Gemini", "Pandas", "PyPDF", "Streamlit"],
    category: "ML & Data Science",
    featured: false,
    github: "https://github.com/Swapnil-bo/ResumeRank-AI",
    demo: null
  }
];
