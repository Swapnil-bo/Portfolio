"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Mic, MessageSquare, Briefcase, Film, Github, ExternalLink } from "lucide-react";

const projects = [
    {
        title: "Jarvis",
        description: "Fully local, voice-activated AI assistant running on Apple Silicon.",
        tags: ["Python", "Local AI", "CoreML"],
        icon: <Mic className="h-6 w-6 text-emerald-400" />,
        className: "md:col-span-2 md:row-span-2",
        href: "https://github.com/Swapnil-bo/Jarvis",
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
        title: "Chat-Vibe",
        description: "Privacy-first WhatsApp analyzer built with Gemini 2.5 Flash.",
        tags: ["TypeScript", "Web Workers", "Next.js"],
        icon: <MessageSquare className="h-6 w-6 text-cyan-400" />,
        className: "md:col-span-1 md:row-span-1",
        href: "https://github.com/Swapnil-bo/Chat-Vibe",
    },
    {
        title: "ResumeRank-AI",
        description: "AI-powered candidate screening agent simulating HR workflows.",
        tags: ["Python", "Agentic Workflows"],
        icon: <Briefcase className="h-6 w-6 text-purple-400" />,
        className: "md:col-span-1 md:row-span-1",
        href: "https://github.com/Swapnil-bo/ResumeRank-AI",
    },
    {
        title: "CineMatch",
        description: "Item-based collaborative filtering recommender.",
        tags: ["Python", "Scikit-learn", "Streamlit"],
        icon: <Film className="h-6 w-6 text-pink-400" />,
        className: "md:col-span-2 md:row-span-1",
        href: "https://github.com/Swapnil-bo/Movie-Recommendation-System",
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

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function BentoProjects() {
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

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 gap-6 md:grid-cols-3 md:auto-rows-[250px]"
            >
                {projects.map((project, idx) => (
                    <a
                        key={idx}
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`group block h-full focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-[2.5rem] ${project.className}`}
                    >
                        <GlassCard
                            variants={itemVariants}
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

                            {/* Hover arrow indicator */}
                            <div className="absolute right-6 top-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <ExternalLink className="h-5 w-5 text-slate-500" />
                            </div>
                        </GlassCard>
                    </a>
                ))}
            </motion.div>
        </section>
    );
}
