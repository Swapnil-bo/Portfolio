"use client";

import { ReactNode } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    className?: string;
    glow?: boolean;
    children: ReactNode;
}

export function GlassCard({ className, children, glow = false, ...props }: GlassCardProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
                "relative rounded-[2.5rem] p-8",
                "bg-white/5 backdrop-blur-2xl",
                "border border-white/10",
                "shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_0_0_1px_rgba(255,255,255,0.05)]",
                "hover:bg-white/10 hover:border-white/20 transition-all duration-300",
                glow && "hover:shadow-[0_0_40px_rgba(52,211,153,0.2),inset_0_0_0_1px_rgba(255,255,255,0.1)]",
                className
            )}
            {...props}
        >
            {/* Subtle interior glow overlay for layered glass effect */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-white/5 to-transparent opacity-50" />
            <div className="relative z-10 h-full w-full">{children}</div>
        </motion.div>
    );
}
