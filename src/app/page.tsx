import { HeroSection } from "@/components/sections/hero";
import { BentoProjects } from "@/components/sections/bento-projects";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
    return (
        <main className="min-h-screen selection:bg-emerald-500/30">
            <HeroSection />
            <BentoProjects />
            <AboutSection />
            <ContactSection />
        </main>
    );
}
