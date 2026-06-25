"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/lib/portfolio-data";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

const YEARS = [2026, 2025, 2024];

export function ExperienceTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const ctx = gsap.context(() => {
      gsap.set(".timeline-node", { scale: 0, opacity: 0 });
      gsap.set(".timeline-card", { opacity: 0, x: 60, filter: "blur(8px)" });

      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 1,
        animation: gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none" }),
      });

      gsap.utils.toArray<HTMLElement>(".timeline-entry").forEach((entry) => {
        ScrollTrigger.create({
          trigger: entry,
          start: "top 75%",
          toggleActions: "play none none reverse",
          animation: gsap
            .timeline()
            .to(entry.querySelector(".timeline-node"), {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
            })
            .to(
              entry.querySelector(".timeline-card"),
              { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
              "-=0.2"
            ),
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 md:py-48 px-6 md:px-12">
      <h2 className="text-[clamp(2rem,6vw,4rem)] font-black uppercase tracking-[-0.04em] mb-20">
        Experience
        <span className="text-electric"> Timeline</span>
      </h2>

      <div className="relative max-w-3xl mx-auto">
        <div
          ref={lineRef}
          className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-electric via-purple to-transparent origin-top gpu"
        />

        <div className="space-y-16 md:space-y-24">
          {YEARS.map((year) => {
            const entries = portfolioData.experience.filter((e) => e.year === year);
            if (!entries.length) return null;

            return (
              <div key={year} className="relative">
                <div className="sticky top-24 z-10 mb-8">
                  <span className="font-mono text-[clamp(3rem,8vw,6rem)] font-black text-white/5 tracking-[-0.06em]">
                    {year}
                  </span>
                </div>

                {entries.map((exp) => (
                  <div key={exp.company} className="timeline-entry relative pl-12 md:pl-20 mb-12">
                    <div className="timeline-node absolute left-2 md:left-6 top-6 w-4 h-4 rounded-full bg-electric glow-blue gpu" />
                    <article className="timeline-card glass rounded-2xl p-6 md:p-8 gpu hover:border-electric/30 transition-colors duration-500">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
                        <h3 className="text-xl md:text-2xl font-bold">{exp.company}</h3>
                        <span className="text-xs uppercase tracking-widest text-electric">
                          {exp.role}
                        </span>
                      </div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-4">
                        {exp.period} · {exp.location}
                      </p>
                      <ul className="space-y-2">
                        {exp.highlights.map((h) => (
                          <li key={h} className="text-sm text-white/60 leading-relaxed pl-4 border-l border-white/10">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
