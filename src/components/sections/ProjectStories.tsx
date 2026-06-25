"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { portfolioData } from "@/lib/portfolio-data";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/gsap";

const ProjectBackground = dynamic(
  () => import("./ProjectBackground").then((m) => m.ProjectBackground),
  { ssr: false }
);

export function ProjectStories() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray<HTMLElement>(".project-slide");

      slides.forEach((slide, i) => {
        if (i === slides.length - 1) return;

        ScrollTrigger.create({
          trigger: slide,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: 1,
          pinSpacing: true,
          animation: gsap
            .timeline()
            .to(slide.querySelector(".project-inner"), {
              scale: 0.85,
              opacity: 0.3,
              filter: "blur(8px)",
              ease: "none",
            })
            .fromTo(
              slides[i + 1],
              { yPercent: 100 },
              { yPercent: 0, ease: "none" },
              0
            ),
        });
      });

      gsap.utils.toArray<HTMLElement>(".project-metric").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative">
      {portfolioData.projects.map((project, index) => (
        <article
          key={project.id}
          className="project-slide relative h-screen w-full overflow-hidden"
        >
          <ProjectBackground theme={project.theme} />
          <div className="project-inner absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 gpu">
            <span className="font-mono text-xs uppercase tracking-[0.4em] text-electric mb-6">
              Case Study 0{index + 1}
            </span>
            <h2 className="text-[clamp(3rem,10vw,7rem)] font-black uppercase tracking-[-0.05em] leading-[0.9] mb-4">
              {project.name}
            </h2>
            <p className="text-lg md:text-xl text-purple/90 uppercase tracking-widest mb-8 font-medium">
              {project.subtitle}
            </p>
            <p className="max-w-2xl text-muted text-base md:text-lg leading-relaxed mb-12">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-8 md:gap-16 mb-12">
              {project.metrics.map((metric) => (
                <div key={metric.label} className="project-metric">
                  <div className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-transparent bg-clip-text bg-gradient-to-r from-electric to-purple tracking-tight">
                    {metric.value}
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] text-muted mt-2">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-[10px] uppercase tracking-widest border border-white/10 rounded-full text-white/50"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
