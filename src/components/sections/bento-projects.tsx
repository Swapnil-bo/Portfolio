"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Mic, MessageSquare, Briefcase, Film, Github, ExternalLink, Network, Globe, Waypoints, Podcast, Home } from "lucide-react";

const CATEGORIES = ["All", "Agentic AI", "Local LLMs", "ML & Data Science", "Full-Stack"];

type Project = {
    title: string;
    category: string;
    description: string;
    tags: string[];
    icon: React.ReactNode;
    className: string;
    href: string;
    content?: React.ReactNode;
    architecture?: string[];
};

const projects: Project[] = [
    {
        title: "Jarvis",
        category: "Local LLMs",
        description: "100% local AI assistant with voice, vision, memory & code execution — running on 8GB RAM. No cloud. No API keys. No excuses.",
        tags: ["Python", "AI Assistant", "Voice Assistant", "Local-LLM", "Phi-3", "Ollama", "Apple Silicon", "MacOS", "Code Execution", "Whisper", "MLX"],
        icon: <Mic className="h-6 w-6 text-emerald-400" />,
        className: "md:col-span-2 md:row-span-2",
        href: "https://github.com/Swapnil-bo/Jarvis",
        architecture: ["Voice Input -> CoreML Wake Word", "Local LLM Routing (Ollama/Phi-3)", "Sub-process Code Execution", "Audio Output Generation"],
        content: (
            <div className="mt-6 flex-1 rounded-xl border border-white/10 bg-[#0a0a0a] p-4 text-xs font-mono text-emerald-400 shadow-inner">
                <div className="mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                    <span className="ml-2 text-slate-500 font-sans text-[10px]">jarvis — -zsh</span>
                </div>
                <p className="text-slate-300">{`~ % python3 start_jarvis.py`}</p>
                <p className="mt-1">{`[System] Initializing CoreML Neural Engine...`}</p>
                <p className="mt-1 animate-pulse">{`[Audio] Listening for wake word...`}</p>
            </div>
        )
    },
    {
        title: "NEXUS",
        category: "Agentic AI",
        description: "A local multi-agent system that plans, writes, executes, and self-corrects Python code — powered by LangGraph and a 3B parameter model.",
        tags: ["Python", "Multi-Agent", "Agentic Workflows", "Ollama", "LangGraph", "Pydantic", "LangChain"],
        icon: <Network className="h-6 w-6 text-blue-400" />,
        className: "md:col-span-2 md:row-span-1 border-blue-500/20",
        href: "https://github.com/Swapnil-bo/NEXUS",
        architecture: ["User Prompt -> LangGraph Orchestrator", "Agent 1: Code Generation (3B Model)", "Agent 2: Execution & Testing", "Self-Correcting Feedback Loop"],
    },
    {
        title: "EchoChamber",
        category: "Agentic AI",
        description: "AI-powered auto-podcast generator. Drop a URL, PDF, or Wikipedia page — get a 5-minute debate podcast with two AI personas.",
        tags: ["Python", "Multi-Agent", "Agentic Workflows", "PyDub", "LangChain", "FastAPI", "Edge-TTS", "React", "Gemini", "TypeScript", "Vite"],
        icon: <Podcast className="h-6 w-6 text-emerald-400" />,
        className: "md:col-span-2 md:row-span-1 border-emerald-500/20",
        href: "https://github.com/Swapnil-bo/EchoChamber",
        architecture: ["Document Ingestion (URL/PDF)", "LangChain Parsing & Chunking", "Multi-Agent Debate Generation (Gemini Flash)", "PyDub + Edge-TTS Audio Synthesis"],
    },
    {
        title: "Butterfly Effect Simulator",
        category: "Full-Stack",
        description: "AI-powered butterfly effect simulator — input a small decision, get a 10-year consequence chain as an interactive React Flow graph. FastAPI + Groq + Next.js.",
        tags: ["Python", "FastAPI", "Next.js", "React Flow", "Groq", "Ollama", "TypeScript"],
        icon: <Waypoints className="h-6 w-6 text-fuchsia-400" />,
        className: "md:col-span-1 md:row-span-1 border-fuchsia-500/20",
        href: "https://github.com/Swapnil-bo/Butterfly-Effect-Simulator",
    },
    {
        title: "Chat-Vibe",
        category: "Full-Stack",
        description: "High-performance WhatsApp analyzer built with Next.js 14 and Gemini for deep psychological insights.",
        tags: ["Next.js", "TypeScript", "Generative AI", "Web Workers", "Data Visualization", "Recharts", "Privacy First"],
        icon: <MessageSquare className="h-6 w-6 text-cyan-400" />,
        className: "md:col-span-1 md:row-span-1",
        href: "https://github.com/Swapnil-bo/Chat-Vibe",
    },
    {
        title: "ResumeRank-AI",
        category: "Agentic AI",
        description: "Automated screening agent using Gemini 2.5 Flash to rank resumes via LLM-based gap analysis.",
        tags: ["Python", "Agentic Workflows", "Pandas", "JSON", "PyPDF", "Gemini", "Streamlit"],
        icon: <Briefcase className="h-6 w-6 text-purple-400" />,
        className: "md:col-span-1 md:row-span-1",
        href: "https://github.com/Swapnil-bo/ResumeRank-AI",
    },
    {
        title: "CineMatch",
        category: "ML & Data Science",
        description: "Collaborative filtering engine built with Scikit-learn and Streamlit for personalized movie discovery.",
        tags: ["Python", "Pandas", "NumPy", "Scipy", "Scikit-learn", "Streamlit"],
        icon: <Film className="h-6 w-6 text-pink-400" />,
        className: "md:col-span-2 md:row-span-1",
        href: "https://github.com/Swapnil-bo/Movie-Recommendation-System",
    },
    {
        title: "House Price Predictor",
        category: "ML & Data Science",
        description: "End-to-end House Price Prediction pipeline featuring advanced EDA, multicollinearity handling (VIF), and Scikit-Learn pipelines for robust regression modeling.",
        tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "Regression", "Scikit-Learn", "Streamlit"],
        icon: <Home className="h-6 w-6 text-emerald-400" />,
        className: "md:col-span-1 md:row-span-1 border-emerald-500/20",
        href: "https://github.com/Swapnil-bo/House-Price-Predictor",
    },
    {
        title: "AI-Language Translator",
        category: "Local LLMs",
        description: "Privacy-focused offline translator using Streamlit and MarianMT, supporting bidirectional translation for 6+ language pairs.",
        tags: ["Python", "HuggingFace", "Local-LLM", "MarianMT", "Transformers", "PyTorch", "Streamlit"],
        icon: <Globe className="h-6 w-6 text-indigo-400" />,
        className: "md:col-span-1 md:row-span-1 border-indigo-500/20",
        href: "https://github.com/Swapnil-bo/AI-Language-Translator",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

export function BentoProjects() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({});

    const filteredProjects = projects.filter(
        (project) => activeCategory === "All" || project.category === activeCategory
    );

    return (
        <section id="projects" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured Modules</h2>
                    <p className="mt-2 text-slate-400">Deployed agents and applications from the 100 days sprint.</p>
                </div>
                <a
                    href="https://github.com/Swapnil-bo"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                    <Github className="h-4 w-4" />
                    <span>View GitHub</span>
                </a>
            </div>

            {/* Filter UI */}
            <div className="mb-12 flex flex-wrap justify-center gap-3">
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                            activeCategory === category
                                ? "border border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                layout
                className={`grid grid-cols-1 gap-6 md:auto-rows-[minmax(280px,auto)] grid-flow-row-dense ${
                    activeCategory === "All" || filteredProjects.length >= 3
                        ? "md:grid-cols-3"
                        : filteredProjects.length === 2
                        ? "md:grid-cols-2 max-w-5xl mx-auto"
                        : "md:grid-cols-1 max-w-2xl mx-auto w-full"
                }`}
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.title}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className={
                                activeCategory === "All"
                                    ? project.className
                                    : project.className.replace(/md:col-span-\d+/g, "").replace(/md:row-span-\d+/g, "").trim()
                            }
                        >
                            <a
                                href={project.href}
                                target="_blank"
                                rel="noreferrer"
                                className="group block h-full focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-[2.5rem]"
                            >
                                <GlassCard
                                    glow
                                    className="flex h-full flex-col justify-between"
                                >
                                    <div className="flex flex-1 flex-col">
                                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
                                            {project.icon}
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold tracking-tight text-white">{project.title}</h3>
                                        <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                                        {project.content && project.content}
                                        {project.architecture && (
                                            <div className="mt-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setExpandedIds((prev) => ({ ...prev, [project.title]: !prev[project.title] }));
                                                    }}
                                                    className="text-xs text-slate-400 hover:text-emerald-400 transition-colors focus:outline-none"
                                                >
                                                    {expandedIds[project.title] ? "[-] Hide Architecture" : "[+] View Architecture"}
                                                </button>
                                                <AnimatePresence initial={false}>
                                                    {expandedIds[project.title] && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="mt-3 flex flex-col gap-2 border-l border-emerald-500/30 pl-3 py-1">
                                                                {project.architecture.map((step, idx) => (
                                                                    <div key={idx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                                                                        <span className="text-emerald-500/50 mt-0.5">{`0${idx + 1}`}</span>
                                                                        <span className="leading-relaxed">{step}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="absolute right-6 top-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <ExternalLink className="h-5 w-5 text-slate-500" />
                                    </div>
                                </GlassCard>
                            </a>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}
