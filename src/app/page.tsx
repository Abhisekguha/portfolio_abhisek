"use client";

import dynamic from "next/dynamic";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header, Footer } from "@/components/layout/Header";
import { HeroSection } from "@/components/hero/HeroSection";

const AIOSection = dynamic(() => import("@/components/sections/AIOSection").then((m) => m.AIOSection));
const ProjectStories = dynamic(() =>
  import("@/components/sections/ProjectStories").then((m) => m.ProjectStories)
);
const WarpTransition = dynamic(() =>
  import("@/components/sections/WarpTransition").then((m) => m.WarpTransition)
);
const ManifestoSection = dynamic(() =>
  import("@/components/sections/ManifestoSection").then((m) => m.ManifestoSection)
);
const ExperienceTimeline = dynamic(() =>
  import("@/components/sections/ExperienceTimeline").then((m) => m.ExperienceTimeline)
);
const SkillsMap = dynamic(() => import("@/components/sections/SkillsMap").then((m) => m.SkillsMap));
const AskAbhisekAI = dynamic(() =>
  import("@/components/sections/AskAbhisekAI").then((m) => m.AskAbhisekAI)
);

export default function HomePage() {
  return (
    <SmoothScroll>
      <Header />
      <main className="relative">
        <HeroSection />
        <AIOSection />
        <WarpTransition />
        <ProjectStories />
        <WarpTransition />
        <ManifestoSection />
        <ExperienceTimeline />
        <SkillsMap />
        <AskAbhisekAI />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
