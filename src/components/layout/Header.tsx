"use client";

import { portfolioData } from "@/lib/portfolio-data";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Header() {
  const links = [
    { href: "#ai-os", label: "System" },
    { href: "#projects", label: "Projects" },
    { href: "#manifesto", label: "Manifesto" },
    { href: "#experience", label: "Experience" },
    { href: "#skills", label: "Skills" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 mix-blend-difference">
      <a href="#home" className="font-mono text-sm tracking-tight text-white/90">
        <span className="text-electric">&lt;</span>AG<span className="text-electric">/&gt;</span>
      </a>
      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs uppercase tracking-[0.2em] text-white/50 hover:text-electric transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <MagneticButton
        href="#ask-ai"
        className="group px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border border-electric/40 text-electric hover:glow-blue hover:border-electric/80"
      >
        Ask Me ✦
      </MagneticButton>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 px-6 md:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="font-mono text-xs text-muted uppercase tracking-widest">
        © {new Date().getFullYear()} {portfolioData.name}
      </p>
      <div className="flex gap-6">
        {[
          { href: portfolioData.linkedin, label: "LinkedIn" },
          { href: portfolioData.github, label: "GitHub" },
          { href: portfolioData.x, label: "X" },
          { href: `mailto:${portfolioData.email}`, label: "Email" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-electric transition-colors uppercase tracking-wider"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
