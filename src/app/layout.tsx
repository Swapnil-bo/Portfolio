import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Swapnil Hazra | AI Engineer & Vibe Coder",
    description: "Portfolio of Swapnil Hazra, an AI Engineer specializing in local LLMs, agentic workflows, and privacy-first applications. Student at Brainware University.",
    keywords: ["AI Developer", "Vibe Coding", "Next.js", "Gemini", "Local AI", "Jarvis", "West Bengal Developers"],
    openGraph: {
        title: "Swapnil Hazra | AI Engineer & Vibe Coder",
        description: "Portfolio of Swapnil Hazra, an AI Engineer specializing in local LLMs, agentic workflows, and privacy-first applications.",
        url: "https://swapnilhazra.com", // Placeholder for actual domain
        siteName: "Swapnil Hazra Portfolio",
        images: [
            {
                url: "/og-image.png", // Placeholder image for visual preview
                width: 1200,
                height: 630,
                alt: "Swapnil Hazra Portfolio Hero Section",
            },
        ],
        locale: "en_US",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} min-h-screen bg-[#030712] text-slate-50 antialiased selection:bg-emerald-500/30`}>
                {children}
            </body>
        </html>
    );
}
