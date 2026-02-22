import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "AI Developer Portfolio",
    description: "A dark-mode first, Glassmorphism Next.js portfolio.",
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
