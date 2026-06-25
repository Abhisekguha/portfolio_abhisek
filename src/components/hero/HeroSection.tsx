"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { portfolioData } from "@/lib/portfolio-data";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { AICoreFallback } from "./AICore";

const AICore = dynamic(() => import("./AICore").then((m) => m.AICore), {
  ssr: false,
  loading: () => <AICoreFallback />,
});

const HEADLINE_LINES = [
  "I DON'T BUILD DEMOS.",
  "I BUILD AI SYSTEMS",
  "THAT SURVIVE PRODUCTION.",
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".hero-line");
      const desc = section.querySelector(".hero-desc");
      const coreWrap = section.querySelector(".hero-core-wrap");

      gsap.set(lines, { opacity: 0, y: 80, filter: "blur(16px)" });
      gsap.set(desc, { opacity: 0, y: 40, filter: "blur(8px)" });
      gsap.set(coreWrap, { opacity: 0, scale: 0.85, filter: "blur(12px)" });

      const loadTl = gsap.timeline({ delay: 0.3 });
      loadTl
        .to(lines, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        })
        .to(desc, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }, "-=0.5")
        .to(coreWrap, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }, "-=0.7");

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
        },
        animation: gsap
          .timeline()
          .to(".hero-content", { y: -120, scale: 0.92, ease: "none" }, 0)
          .to(".hero-core-wrap", { y: -60, ease: "none" }, 0),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 px-6 md:px-12 pt-28 pb-16 items-center overflow-hidden"
    >
      <div className="hero-content relative z-10 flex flex-col justify-center">
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.35em] text-electric mb-8 opacity-60">
          AI Engineer · Production Systems
        </div>
        <h1 className="space-y-1 md:space-y-2">
          {HEADLINE_LINES.map((line, i) => (
            <span
              key={line}
              className="hero-line block text-[clamp(2rem,6vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] uppercase gpu"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {i === 1 ? (
                <>
                  I BUILD{" "}
                  <span className="gradient-heading text-glow">
                    AI SYSTEMS
                  </span>
                </>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>
        <p className="hero-desc mt-8 max-w-lg text-sm md:text-base text-muted leading-relaxed tracking-wide">
          {portfolioData.tagline}
        </p>
      </div>

      <div className="hero-core-wrap relative z-10 gpu">
        <AICore scrollProgress={scrollProgress} />
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-electric/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
