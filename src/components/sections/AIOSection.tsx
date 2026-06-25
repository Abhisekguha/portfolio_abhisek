"use client";

import { useEffect, useRef } from "react";
import { portfolioData } from "@/lib/portfolio-data";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

export function AIOSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".ai-os-panel");
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.set(".ai-os-title", { opacity: 0, y: 40, filter: "blur(8px)" });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${totalScroll + window.innerHeight * 0.5}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        animation: gsap
          .timeline()
          .to(".ai-os-title", { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3 }, 0)
          .to(track, { x: -totalScroll, ease: "none" }, 0)
          .fromTo(
            panels,
            { opacity: 0.4, scale: 0.95, filter: "blur(4px)" },
            {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              stagger: 0.15,
              duration: 0.3,
              ease: "power2.out",
            },
            0.1
          ),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="ai-os" className="relative min-h-screen bg-bg overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(59,130,246,0.08),transparent)]" />

      <div className="sticky top-0 h-screen flex flex-col justify-center">
        <h2 className="ai-os-title px-6 md:px-12 text-[clamp(2rem,8vw,6rem)] font-black uppercase tracking-[-0.05em] leading-none mb-12 gpu">
          AI OPERATING
          <br />
          <span className="text-electric text-glow">SYSTEM</span>
        </h2>

        <div ref={trackRef} className="flex gap-8 md:gap-16 px-6 md:px-12 w-max gpu">
          {portfolioData.aiOSPanels.map((panel, i) => (
            <article
              key={panel.id}
              className="ai-os-panel relative w-[85vw] md:w-[70vw] lg:w-[55vw] shrink-0 min-h-[50vh] flex flex-col justify-end p-8 md:p-12 border border-white/5 rounded-3xl bg-white/[0.02] backdrop-blur-sm"
            >
              <span className="absolute top-8 right-8 font-mono text-xs text-muted">
                0{i + 1}
              </span>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-electric/5 via-transparent to-purple/5 pointer-events-none" />
              <h3 className="text-[clamp(2.5rem,6vw,5rem)] font-black tracking-[-0.04em] uppercase text-electric mb-6">
                {panel.title}
              </h3>
              <ul className="flex flex-wrap gap-3 mb-6">
                {panel.items.map((item) => (
                  <li
                    key={item}
                    className="px-4 py-2 text-xs uppercase tracking-widest border border-white/10 rounded-full text-white/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-muted text-sm md:text-base max-w-md leading-relaxed">
                {panel.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
