import { Github, Linkedin, Mail } from "lucide-react";

export function ContactSection() {
    return (
        <footer id="contact" className="border-t border-white/10 bg-[#030712] py-12">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row sm:px-6 lg:px-8">
                <p className="text-sm font-medium tracking-tight text-slate-500">
                    © {new Date().getFullYear()} Swapnil. "Vibe Coding" the future.
                </p>

                <div className="flex items-center space-x-6">
                    <a
                        href="https://github.com/Swapnil-bo"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 transition-colors hover:text-emerald-400"
                    >
                        <span className="sr-only">GitHub</span>
                        <Github className="h-6 w-6" />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/swapnil-hazra-4831322b7/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 transition-colors hover:text-cyan-400"
                    >
                        <span className="sr-only">LinkedIn</span>
                        <Linkedin className="h-6 w-6" />
                    </a>
                    <a
                        href="mailto:swapnilhazra8@gmail.com"
                        className="text-slate-400 transition-colors hover:text-white"
                    >
                        <span className="sr-only">Email</span>
                        <Mail className="h-6 w-6" />
                    </a>
                </div>
            </div>
        </footer>
    );
}
