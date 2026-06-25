"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/lib/portfolio-data";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

export function SkillsMap() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const active = portfolioData.skills.find((s) => s.id === activeId);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".skill-node", {
        opacity: 0,
        scale: 0.8,
        filter: "blur(8px)",
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <h2 className="text-[clamp(2rem,6vw,4rem)] font-black uppercase tracking-[-0.04em] mb-6">
        Capability
        <span className="text-electric"> Map</span>
      </h2>
      <p className="text-muted text-sm uppercase tracking-widest mb-16 max-w-md">
        Interactive system architecture — hover to explore connections
      </p>

      <div className="relative max-w-5xl mx-auto min-h-[480px] md:min-h-[520px]">
        {/* Center hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-electric/30 flex items-center justify-center bg-bg glow-blue z-10">
          <span className="font-mono text-[10px] uppercase tracking-widest text-electric text-center">
            AI
            <br />
            Core
          </span>
        </div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
          {portfolioData.skills.map((skill, i) => {
            const angle = (i / portfolioData.skills.length) * Math.PI * 2 - Math.PI / 2;
            const cx = 50 + Math.cos(angle) * 35;
            const cy = 50 + Math.sin(angle) * 35;
            const isActive = activeId === skill.id;
            return (
              <line
                key={skill.id}
                x1="50%"
                y1="50%"
                x2={`${cx}%`}
                y2={`${cy}%`}
                stroke={skill.color}
                strokeWidth={isActive ? 2 : 1}
                strokeOpacity={isActive ? 0.6 : 0.15}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>

        {/* Skill nodes */}
        {portfolioData.skills.map((skill, i) => {
          const angle = (i / portfolioData.skills.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * 35;
          const y = 50 + Math.sin(angle) * 35;
          const isActive = activeId === skill.id;

          return (
            <motion.button
              key={skill.id}
              type="button"
              className="skill-node absolute -translate-x-1/2 -translate-y-1/2 gpu"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => setActiveId(skill.id)}
              onMouseLeave={() => setActiveId(null)}
              animate={{
                scale: isActive ? 1.15 : 1,
                opacity: activeId && !isActive ? 0.4 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div
                className="px-4 py-3 md:px-6 md:py-4 rounded-2xl border backdrop-blur-sm transition-shadow duration-500"
                style={{
                  borderColor: isActive ? skill.color : "rgba(255,255,255,0.08)",
                  boxShadow: isActive ? `0 0 40px ${skill.color}40` : "none",
                  background: isActive ? `${skill.color}15` : "rgba(255,255,255,0.02)",
                }}
              >
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                  {skill.label}
                </span>
              </div>
            </motion.button>
          );
        })}

        {/* Expanded tools panel */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 glass rounded-2xl p-6 md:p-8 min-h-[120px]"
          animate={{ opacity: active ? 1 : 0.5, y: active ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          {active ? (
            <div>
              <h3 className="text-sm uppercase tracking-widest mb-4" style={{ color: active.color }}>
                {active.label} Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {active.tools.map((tool, i) => (
                  <motion.span
                    key={tool}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="px-3 py-1.5 text-xs border border-white/10 rounded-full text-white/70"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted text-sm">Hover a capability node to reveal tools and connections</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
