"use client";

import { motion } from "framer-motion";
import { Cpu, Code2, Sparkles, BookOpen } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const techStack = [
    "Cursor", "Claude Code", "Python", "React", "Next.js", "TypeScript",
    "Tailwind CSS", "Agentic Workflows", "PyTorch", "LangChain"
];

export function AboutSection() {
    return (
        <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <GlassCard className="flex flex-col justify-center">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10">
                        <BookOpen className="h-6 w-6 text-emerald-400" />
                    </div>
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-white">The Engineer Behind the AI</h2>
                    <p className="mb-6 text-lg text-slate-400 leading-relaxed">
                        I'm a student at <span className="text-white font-medium tracking-tight">Brainware University</span>, immersed in the world of Generative AI and modern web design. I specialize in "vibe coding"—a workflow where intuition, rapid iteration, and agentic AI pairs seamlessly to craft premium digital experiences.
                    </p>
                    <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
                        <span className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-emerald-400" /> Vibe Coder
                        </span>
                        <span className="flex items-center gap-2">
                            <Code2 className="h-4 w-4 text-cyan-400" /> Full-Stack
                        </span>
                        <span className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-purple-400" /> Local LLMs
                        </span>
                    </div>
                </GlassCard>

                <GlassCard className="relative overflow-hidden flex flex-col justify-center border-emerald-500/20 bg-gradient-to-br from-white/5 to-emerald-500/5">
                    <h3 className="mb-8 text-xl font-semibold tracking-tight text-white text-center">Current Arsenal</h3>

                    <div className="relative flex overflow-hidden">
                        {/* Gradient masks for smooth fade at edges */}
                        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-[#030712] to-transparent" />
                        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-[#030712] to-transparent" />

                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                            className="flex whitespace-nowrap"
                        >
                            {[...techStack, ...techStack].map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="mx-4 rounded-full border border-white/10 bg-white/5 px-6 py-3 font-mono text-sm tracking-tight text-slate-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </GlassCard>
            </div>
        </section>
    );
}
