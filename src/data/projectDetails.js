export const projectDetails = {
  "J.A.R.V.I.S.": {
    fullName: "J.A.R.V.I.S. — Just A Rather Very Intelligent System",
    tagline: "A 6-phase, fully local voice assistant that sees your screen, writes and self-heals Python, and remembers you — running on a MacBook Air M1 (8GB) with zero cloud dependencies.",
    problem: "Every \"AI assistant\" demo relies on OpenAI's API and breaks the moment your internet drops. Local models are powerful but nobody shows you how to wire them into a real, usable system on consumer hardware. I wanted a voice assistant that actually works — offline, private, and fast — without needing a GPU cluster or a subscription.",
    approach: [
      "Two-stage router: keyword pre-filter handles 95% of commands in <1ms, Phi-3 only fires for ambiguous queries",
      "Three-layer identity firewall prevents Phi-3 from confusing user facts with facts about itself (classic small-model failure mode)",
      "Vision pipeline uses macOS native OCR (~200ms, 0MB RAM) for text and LLaVA-Phi3 for visual understanding — same base weights as Phi-3, so Ollama swaps them without double-loading",
      "Code executor generates Python via raw=True NLU mode, runs in a sandboxed workspace with 30s timeout, self-heals on failure with error-type-classified fix prompts",
      "ChromaDB stores 163+ past exchanges; memory context injected per query with identity-safe rewriting"
    ],
    stack: {
      AI: ["Ollama", "Phi-3 Mini 3.8B (Q4)", "LLaVA-Phi3", "mlx-whisper"],
      Backend: ["FastAPI", "WebSocket", "Python 3.11"],
      Memory: ["ChromaDB (local embedded)"],
      Vision: ["macOS Vision framework", "imagesnap"],
      Frontend: ["Glassmorphic dashboard", "Real-time WebSocket"],
      Infra: ["MLX (Apple Silicon)", "Metal GPU", "Neural Engine"]
    },
    challenges: [
      {
        title: "Phi-3 identity confusion",
        body: "Injecting memory context like \"User studies at Brainware University\" caused Phi-3 to say \"I study at Brainware University.\" Fixed with a 3-layer firewall — hardcoded shortcuts for identity questions, memory rewriting to prefix every fact with \"The user:\", and output poison-phrase detection."
      },
      {
        title: "Model swap 404s",
        body: "Switching between Phi-3 and LLaVA-Phi3 caused HTTP 404 mid-swap as one model unloaded before the other was ready. Fixed by choosing models that share base weights (faster swap) and adding retry loops with 3s delays in the NLU engine."
      },
      {
        title: "Code gen vs post-processing conflict",
        body: "The NLU cleaner stripped markdown backticks to sanitize chat output — but code generation needs those backticks to extract the code block. Result was an empty string being executed as Python. Fixed with a raw=True flag that bypasses all post-processing for code generation paths only."
      }
    ],
    metrics: [
      { value: "3.1GB", label: "Peak RAM (39%)" },
      { value: "<1ms", label: "Keyword routing" },
      { value: "~200ms", label: "Native OCR" },
      { value: "5–10s", label: "Full voice loop" },
      { value: "163", label: "Past exchanges" },
      { value: "0", label: "Cloud deps" }
    ],
    status: "Shipped"
  },
  "NEXUS": {
    fullName: "NEXUS — Neural EXecution & Understanding System",
    tagline: "A 4-agent Python code generator that plans, writes, runs, and fixes its own bugs — 100% local on a 6GB GPU.",
    problem: "ChatGPT and Copilot can write code but can't verify it works, and they send your prompts to the cloud. Small local models (3B–7B) are fast but unreliable — they hallucinate syntax, produce malformed JSON, and can't catch their own mistakes. I wanted a self-correcting pipeline that runs entirely on consumer hardware with zero API costs and full data privacy, while still being robust enough to trust.",
    approach: [
      "Planner agent decomposes natural language tasks into 2–10 structured steps",
      "Developer writes a complete Python script from the plan",
      "Code Runner executes it in a sandboxed subprocess (10s timeout, stdout/stderr captured)",
      "Reviewer validates output against task, classifies errors, and feeds specific fix instructions back to the Developer",
      "LangGraph state machine retries up to 3 times before failing gracefully"
    ],
    stack: {
      AI: ["Ollama", "qwen2.5-coder:7b", "LangGraph", "LangChain"],
      Backend: ["Python 3.10+", "Pydantic v2", "Subprocess sandbox"],
      Frontend: ["Rich (terminal UI)", "Syntax highlighting", "Spinners & panels"],
      Infra: ["Fully local", "RTX 3050 6GB", "No API keys"]
    },
    challenges: [
      {
        title: "Small-model JSON chaos",
        body: "Small models produce broken JSON constantly — empty fields, invented error types, markdown wrappers. Solved with a 4-layer defense: forced JSON mode, response cleaning, Pydantic schemas, and a @model_validator that auto-coerces model quirks (e.g., \"FileNotFoundError\" → \"logic_error\", empty error_type + is_valid:true → \"pass\")."
      },
      {
        title: "Windows subprocess file-locking",
        body: "Windows subprocess execution broke NamedTemporaryFile due to file-locking issues. Rewrote with a manual create/write/close/execute/delete cycle and sys.executable (not 'python') to respect venv activation."
      },
      {
        title: "Context bloat on retries",
        body: "Context window bloat across retries caused agents to drift. Solved with context pruning — the Developer sees only the latest code + latest feedback, never the full error log."
      },
      {
        title: "Interactive input() hangs",
        body: "Discovered during stress testing that interactive prompts (input()) hang the sandbox. Fixed by adding sandbox-awareness rules to both Developer and Reviewer prompts so they cooperate on hardcoding values."
      }
    ],
    metrics: [
      { value: "9/13", label: "Pass rate (69%)" },
      { value: "30–60s", label: "End-to-end / task" },
      { value: "~4.5GB", label: "VRAM (fits on GPU)" },
      { value: "3", label: "Max retries" },
      { value: "4", label: "Agents" },
      { value: "$0", label: "API cost" }
    ],
    status: "Shipped"
  },
  "SynthBoard": {
    fullName: "SynthBoard",
    tagline: "A local-first platform that fine-tunes language models with QLoRA and pits them against base models in a blind Elo arena — all on a 6GB RTX 3050.",
    problem: "Most fine-tuning pipelines assume a beefy A100 and a clean dataset. And once you've trained a model, you have no way to actually tell if it got better — you just squint at the loss curve and hope. I wanted the full MLOps lifecycle (upload → format → train → export → evaluate) running locally on consumer hardware, with a real evaluation mechanism that feels like Chatbot Arena.",
    approach: [
      "Upload any dataset (CSV/JSONL/JSON/Parquet) — auto-detects Alpaca / ShareGPT / QA / raw and converts to a standardized format via streaming parsers (never loads full file into RAM)",
      "QLoRA fine-tune via unsloth (4-bit, gradient checkpointing, 8-bit optimizer) — full VRAM guard + global training lock prevents OOM on 6GB",
      "SFTTrainer runs in a ThreadPoolExecutor; a broadcast SSE callback streams loss/VRAM/ETA to the React dashboard in real time",
      "Export via save_pretrained_merged → llama-quantize.exe → Q4_K_M GGUF → auto-register in Ollama with model-family-aware chat templates (Qwen, Llama, SmolLM, Phi)",
      "Blind arena runs sequential inference (Model A loads → generates → unloads → Model B) with 120s timeout; user votes A/Tie/B/Skip and Elo updates (K=32)"
    ],
    stack: {
      "AI / ML": ["unsloth", "PyTorch", "trl (SFTTrainer)", "bitsandbytes", "peft", "Ollama", "llama.cpp"],
      Backend: ["FastAPI", "httpx", "SSE", "ThreadPoolExecutor", "aiosqlite", "pynvml"],
      Frontend: ["React", "Vite", "Tailwind", "Recharts", "react-dropzone", "react-router-dom"],
      Infra: ["SQLite (indexed battle tables)", "Ollama local server", "RTX 3050 6GB", "Windows 11 native"]
    },
    challenges: [
      {
        title: "unsloth save_to_gguf hung forever",
        body: "unsloth's save_to_gguf hung indefinitely on native Windows because it silently tries to build llama.cpp from source via CMake. Fix: rewrote the exporter to use save_pretrained_merged → convert_hf_to_gguf.py → pre-built llama-quantize.exe. Zero compilation, works every time."
      },
      {
        title: "Training blocked the whole server",
        body: "SFTTrainer.train() is synchronous and blocking. Calling it directly in a FastAPI route froze the entire server and broke SSE. Fix: ThreadPoolExecutor(max_workers=1) + a bounded broadcast queue pattern so multiple browser tabs can watch the same run without consume-once semantics."
      },
      {
        title: "Arena sequentiality vs live UX",
        body: "Arena inference is fundamentally sequential on 6GB (can't load two 7B models simultaneously), which conflicted with a \"both panels stream live\" UX. Fix: built an explicit state machine — Panel A streams while Panel B shows \"Waiting…\" — which turned the constraint into a reveal mechanic that's actually more engaging than parallel output."
      },
      {
        title: "Chat templates aren't portable",
        body: "A hardcoded ChatML template would silently break every non-Qwen model in the arena. Fix: OLLAMA_TEMPLATES dict keyed on model family, generates the correct Modelfile per export (Qwen, Llama, SmolLM, Phi)."
      }
    ],
    metrics: [
      { value: "~91s", label: "Qwen2.5-1.5B / 100 samples" },
      { value: "3.2GB", label: "Peak VRAM (QLoRA)" },
      { value: "1.66 → 0.77", label: "Loss in 5 steps" },
      { value: "940MB", label: "GGUF export (Q4_K_M)" },
      { value: "<10min", label: "Full E2E cycle" },
      { value: "16/16", label: "E2E tests passing" }
    ],
    status: "Shipped"
  },
  "AI Product Teardown": {
    fullName: "AI Product Teardown",
    tagline: "Drop any product URL or description — get a brutal, board-room-grade PM teardown in 15 seconds, powered by LLaMA 3.3 70B on Groq.",
    problem: "Every PM teardown tool I found either summarized the product back at you or hid behind a paywall. I wanted something that actually diagnosed — personas, moat, monetization gaps, red flags, and a kill-or-scale verdict — the way a Series B investor would read it. Nothing free did that. So I built the prompt, then built everything around it.",
    approach: [
      "Jina Reader scrapes any product URL to clean markdown — no API key, no Playwright, no headless browser overhead",
      "Falls back to direct HTTP fetch + HTML stripping if Jina returns thin content",
      "A 200-line system prompt primes LLaMA 3.3 70B to think in PM frameworks (JTBD, Blue Ocean, Outcome-driven Innovation) and return a strict JSON schema",
      "FastAPI analyzer validates, sanitizes, and clamps every enum field before it touches the frontend — malformed LLM output never reaches the UI",
      "React renders 9 collapsible sections with staggered animations, an animated SVG score ring, and a kill/pivot/hold/scale verdict chip"
    ],
    stack: {
      AI: ["Groq API", "LLaMA 3.3 70B", "Jina Reader (r.jina.ai)"],
      Backend: ["FastAPI", "Python", "httpx", "Pydantic v2", "python-dotenv"],
      Frontend: ["React 18", "Vite", "Lucide React", "Pure CSS design system"],
      Infra: ["Render (backend)", "Vercel (frontend)"]
    },
    challenges: [
      {
        title: "Inconsistent LLM array lengths",
        body: "LLMs return inconsistent array lengths — pain_points_solved would sometimes have 2 items, sometimes 9, breaking the frontend layout. Fixed by adding explicit \"return exactly N items\" constraints inside the JSON schema comment blocks in the system prompt. Output is now deterministic in length."
      },
      {
        title: "Malformed JSON from Groq",
        body: "Groq occasionally returns trailing commas and JS-style // comments in JSON, which json.loads() hard-crashes on. Built a multi-pass extract_json() that strips markdown fences, finds outermost braces, removes comments, strips trailing commas, then falls back to single-quote replacement before giving up. Zero JSON crashes in production."
      },
      {
        title: "Duplicate style injection on re-render",
        body: "React re-renders Section.jsx 9 times per teardown — injecting a <style> block on every render meant 9 duplicate rule sets in the DOM. Solved with a module-level stylesInjected boolean and a useInjectStyles() hook that writes the stylesheet exactly once per app lifetime regardless of render count."
      }
    ],
    metrics: [
      { value: "12–18s", label: "Avg teardown time" },
      { value: "~98%", label: "JSON parse success" },
      { value: "0", label: "VRAM (cloud inference)" },
      { value: "312", label: "Prompt lines" },
      { value: "12", label: "Schema sections" },
      { value: "5", label: "Enum-validated fields" }
    ],
    status: "Shipped"
  },
  "AutoResearcher": {
    fullName: "AutoResearcher",
    tagline: "A 3-agent deep research system that reads the web, cites every claim, and runs entirely on a 6GB laptop GPU — open-source Perplexity Pro with the curtain pulled back.",
    problem: "Perplexity is closed, hosted, and logs every query. Local LLMs hallucinate, and their RAG stacks are usually glued together with cloud APIs that defeat the point. I wanted a fully-local research pipeline where three specialized agents collaborate on a single question, every source is traceable, and nothing leaves the machine — fitting inside the VRAM I actually have.",
    approach: [
      "Search Agent (Mistral 7B) decomposes the question into 3–5 angled queries, runs DuckDuckGo/Tavily, LLM-ranks the top 10 URLs",
      "Extraction Agent (Qwen 2.5 7B) scrapes the top 8, strips boilerplate, chunks + embeds into a session-scoped ChromaDB collection, writes per-source summaries",
      "Synthesis Agent (Qwen 2.5 7B) does multi-query RAG retrieval over those chunks and streams a cited, structured markdown report token-by-token over SSE",
      "Format node (non-LLM) repairs hallucinated [Source N] markers, rebuilds the References section programmatically from the citation map, cleans up, deletes the ChromaDB collection",
      "Entire pipeline orchestrated as a LangGraph StateGraph with conditional error/cancel edges at every node boundary"
    ],
    stack: {
      AI: ["Ollama", "Mistral 7B-Instruct", "Qwen 2.5 7B", "sentence-transformers (MiniLM-L6-v2)", "LangGraph", "LangChain", "ChromaDB"],
      Backend: ["Python 3.11", "FastAPI", "uvicorn", "sse-starlette", "httpx", "BeautifulSoup4", "ddgs", "Tavily"],
      Frontend: ["React 18", "Vite", "Tailwind CSS", "Framer Motion", "React-Markdown", "EventSource API"],
      Infra: ["100% localhost", "No API keys required", "RTX 3050 6GB", "Windows 11 / 8GB RAM"]
    },
    challenges: [
      {
        title: "Hallucinated citation markers",
        body: "Local 7B models hallucinate citations — they invent [Source 9] when only 6 sources exist and place markers inconsistently. Rather than fight the model with heavier prompts, I built a format node that trusts the content and fixes the format: scans the output, strips orphaned markers, and rebuilds the References section programmatically from the citation map. Every reference in the final report is guaranteed to resolve to a real scraped URL."
      },
      {
        title: "6GB VRAM can't hold two 7Bs",
        body: "6GB VRAM can only hold one 7B model at a time, so parallel agent execution was off the table. I leaned into the constraint by using LangGraph's sequential node execution as the scheduler — Ollama swaps models between nodes naturally, no custom queueing needed. A pre-flight Ollama ping at pipeline start prevents the \"crash 3 minutes in with a cryptic ConnectionError\" failure mode."
      },
      {
        title: "SSE reconnect duplicated events",
        body: "SSE reconnection on mid-pipeline drops was replaying every event from index 0, causing duplicate agent cards, double-appended report tokens, and glitching source cards. Solved by stamping monotonic timestamps on every backend event and dropping anything with timestamp <= lastSeen in the frontend useStream primitive."
      },
      {
        title: "Scrapers fail 20–30% of the time",
        body: "Paywalls, bot detection, 404s. Rather than treat this as an error path, I designed the pipeline to degrade gracefully — failures go into state[\"scraping_errors\"], surface in the UI with their reason, and the pipeline continues. A report from 4 of 8 sources beats a crashed pipeline every time."
      }
    ],
    metrics: [
      { value: "3–8 min", label: "Full pipeline (RTX 3050)" },
      { value: "0", label: "API keys required" },
      { value: "~20", label: "RAG chunks / synthesis" },
      { value: "~75kB", label: "Frontend bundle" },
      { value: "3", label: "Specialized agents" },
      { value: "10", label: "SSE event types" }
    ],
    status: "Shipped"
  },
  "ONEIROS": {
    fullName: "ONEIROS — Dream Interpreter",
    tagline: "A local-first AI oracle that decodes your dreams through Jungian, Freudian, and symbolic analysis — running entirely on your GPU, zero cloud, zero keys.",
    problem: "Every \"AI dream interpreter\" online is a thin GPT-4 wrapper behind a paywall that gives you three generic sentences and calls it psychology. Dream analysis is inherently personal and private — your unconscious mind shouldn't be sent to a server in California. I wanted something that went genuinely deep across multiple psychological frameworks, felt like consulting an ancient oracle rather than a SaaS dashboard, and ran entirely on local hardware with no data leaving the machine.",
    approach: [
      "qwen2.5:7b receives a carefully engineered system prompt that gives it the persona of ONEIROS — an oracle versed in Jung, Freud, Campbell, von Franz, Hillman, and Bachelard — forced to respond in structured JSON",
      "A 4-strategy JSON extraction pipeline fights back against every way a local LLM can malform its output: direct parse → brace extraction → markdown fence stripping → trailing comma repair",
      "FastAPI validates the response through Pydantic v2 schemas with field constraints, clamps mood_score to [0.0, 1.0], normalizes symbol arrays, and retries with true exponential backoff (2s → 4s → 8s) on parse failure",
      "React frontend renders 4 analysis tabs with a typewriter effect that pauses 18× longer on periods, 6× on commas — the oracle breathes",
      "A 210° SVG arc gauge with mathematical RGB interpolation across 7 color anchors visualizes the dream's emotional signature from The Abyss to Transcendent"
    ],
    stack: {
      AI: ["Ollama", "qwen2.5:7b", "Custom prompt engineering"],
      Backend: ["FastAPI", "Python 3.11", "Pydantic v2", "pydantic-settings", "httpx"],
      Frontend: ["React 18", "Vite 5", "Framer Motion 11", "Zustand 4", "html2canvas"],
      Typography: ["Cinzel (display)", "Crimson Pro (body)", "JetBrains Mono (labels)"],
      Storage: ["localStorage", "Schema versioning", "Migration system"]
    },
    challenges: [
      {
        title: "Local LLMs don't reliably return valid JSON",
        body: "qwen2.5:7b would occasionally wrap responses in markdown fences, add trailing commas, or pad with preamble text. A single JSON.parse() call failed ~15% of the time. Built a 4-strategy extraction pipeline where each strategy is a progressively more aggressive attempt to recover valid JSON from malformed output. Failure rate dropped to near zero."
      },
      {
        title: "The typewriter couldn't be naive",
        body: "A character-per-tick typewriter at fixed speed felt robotic. Analysis text is dense with punctuation — periods, em-dashes, commas. Built a punctuation-aware delay system: periods pause 18× the base speed, em-dashes 10×, commas 6×. The result is text that feels like it's being considered, not printed. Recruiters who actually used the app noticed this immediately."
      },
      {
        title: "SVG arc math for the mood gauge",
        body: "CSS progress bars were rejected — they don't match the occult aesthetic. Built the gauge entirely in SVG: polar-to-cartesian conversion for tick marks, strokeDashoffset animation for the fill arc, a counter-rotating needle, and a 7-anchor RGB interpolation system for the color. The needle tip position, the glow filter, the pivot orb — all computed mathematically. No chart library. ~120 lines of pure SVG + Framer Motion."
      }
    ],
    metrics: [
      { value: "25–45s", label: "Analysis time (RTX 3050)" },
      { value: "~99%", label: "JSON parse success" },
      { value: "~4.2GB", label: "VRAM (qwen2.5:7b Q4)" },
      { value: "100", label: "Dreams / journal" },
      { value: "2×", label: "Share card retina" },
      { value: "~3.2k", label: "Lines / 21 files" }
    ],
    status: "Shipped"
  }
}
