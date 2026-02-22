"use client";

import { motion } from "framer-motion";
import { ArrowRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
    // Staggered text reveal variants
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-20 text-center selection:bg-emerald-500/30 overflow-hidden">
            {/* Ambient Animated Background Glow */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute h-[800px] w-[800px] rounded-full bg-gradient-to-bl from-cyan-500/10 to-emerald-900/10 blur-[150px]"
                />
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } },
                }}
                className="flex flex-col items-center z-10"
            >
                <motion.div variants={textVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 opacity-80 backdrop-blur-md">
                    <Terminal className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-medium tracking-tight text-emerald-400">
                        Currently undertaking 100 Days of Vibe Coding
                    </span>
                </motion.div>

                <motion.h1 variants={textVariants} className="mb-8 max-w-5xl text-5xl font-extrabold tracking-tighter text-white sm:text-7xl lg:text-8xl leading-tight">
                    Hi, I'm <br className="md:hidden" />
                    <motion.span
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-500 bg-[length:200%_auto] block md:inline whitespace-nowrap"
                    >
                        Swapnil Hazra.
                    </motion.span>
                </motion.h1>

                <motion.p variants={textVariants} className="mb-12 max-w-2xl text-lg font-medium tracking-tight text-slate-400/90 sm:text-xl leading-relaxed">
                    AI Engineer & Vibe Coder crafting privacy-first agents and local LLM workflows. Pushing the boundaries of intelligent systems at Brainware University.
                </motion.p>

                <motion.a
                    variants={textVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="mailto:swapnilhazra8@gmail.com"
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-[2rem] border border-emerald-500/30 bg-white/5 backdrop-blur-xl px-8 py-4 font-semibold text-emerald-50 transition-all hover:bg-white/10 hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]"
                >
                    <span className="relative z-10 tracking-wide">Available for June 2026 Internships</span>
                    <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1 text-emerald-400" />

                    {/* Subtle inner button glow */}
                    <div className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.a>
            </motion.div>
        </section>
    );
}
