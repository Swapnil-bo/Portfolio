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
  }
}
