"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ScrollTrigger, registerGSAP } from "@/lib/gsap";
import * as THREE from "three";

type StarFieldProps = {
  progress: React.MutableRefObject<number>;
};

function StarField({ progress }: StarFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = Math.random() * 100;
      velocities[i] = 0.5 + Math.random();
    }
    return { positions, velocities };
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const speed = 0.5 + progress.current * 8;

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 2] -= velocities[i] * speed;
      if (pos[i * 3 + 2] < -5) {
        pos[i * 3 + 2] = 100;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    const stretch = 1 + progress.current * 4;
    pointsRef.current.scale.set(1, 1, stretch);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.15 + progress.current * 0.4}
        color="#ffffff"
        transparent
        opacity={0.6 + progress.current * 0.4}
        sizeAttenuation
      />
    </points>
  );
}

type WarpTransitionProps = {
  progress: React.MutableRefObject<number>;
};

function WarpScene({ progress }: WarpTransitionProps) {
  return (
    <>
      <StarField progress={progress} />
      <fog attach="fog" args={["#050505", 10, 80]} />
    </>
  );
}

export function WarpTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    registerGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <WarpScene progress={progress} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg pointer-events-none" />
    </section>
  );
}
