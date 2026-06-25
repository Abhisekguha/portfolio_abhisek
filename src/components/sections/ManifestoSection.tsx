"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/lib/portfolio-data";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";
import { useEffect } from "react";

const GRADIENTS = [
  "from-blue-600/40 to-purple-900/40",
  "from-cyan-600/30 to-blue-900/40",
  "from-violet-600/40 to-indigo-900/40",
  "from-emerald-600/30 to-blue-900/40",
  "from-purple-600/40 to-pink-900/30",
  "from-sky-600/30 to-violet-900/40",
  "from-indigo-600/40 to-cyan-900/30",
  "from-blue-500/30 to-purple-800/40",
  "from-teal-600/30 to-indigo-900/40",
  "from-electric/30 to-purple/40",
];

export function ManifestoSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".manifesto-item", {
        opacity: 0,
        x: -40,
        filter: "blur(8px)",
        stagger: 0.08,
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

  const activeIndex = portfolioData.manifesto.findIndex((m) => m.id === activeId);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="relative py-32 md:py-48 px-6 md:px-12"
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      <h2 className="text-[clamp(2rem,6vw,4rem)] font-black uppercase tracking-[-0.04em] mb-16 md:mb-24">
        Engineering
        <span className="text-electric"> Manifesto</span>
      </h2>

      <div className="max-w-4xl space-y-2 md:space-y-4">
        {portfolioData.manifesto.map((item, i) => (
          <motion.div
            key={item.id}
            className="manifesto-item relative cursor-default py-3 md:py-4 border-b border-white/5"
            onHoverStart={() => setActiveId(item.id)}
            onHoverEnd={() => setActiveId(null)}
            animate={{
              opacity: activeId && activeId !== item.id ? 0.25 : 1,
              x: activeId === item.id ? 12 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-baseline gap-4 md:gap-8">
              <span className="font-mono text-xs text-electric/60 shrink-0">{item.id}</span>
              <motion.span
                className="text-[clamp(1.25rem,3vw,2.5rem)] font-bold uppercase tracking-[-0.02em]"
                animate={{ scale: activeId === item.id ? 1.02 : 1 }}
              >
                {item.text}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeId && activeIndex >= 0 && (
          <motion.div
            className="fixed pointer-events-none z-40 w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/10 glow-blue gpu hidden md:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cursor.x - 128,
              y: cursor.y - 128,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div
              className={`w-full h-full bg-gradient-to-br ${GRADIENTS[activeIndex]} flex items-center justify-center`}
            >
              <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
                {portfolioData.manifesto[activeIndex].text.split(" ")[0]}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
