"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

type CoreProps = {
  scrollProgress: React.MutableRefObject<number>;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
};

function MetallicCore({ scrollProgress, mouse }: CoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const scroll = scrollProgress.current;

    meshRef.current.rotation.y = t * (0.15 + scroll * 0.8);
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.15 + mouse.current.y * 0.3;
    meshRef.current.position.x = mouse.current.x * 0.4;
    meshRef.current.position.y = mouse.current.y * 0.2;

    const scale = 1 - scroll * 0.25;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 64]} />
        <MeshDistortMaterial
          color="#1a3a6e"
          emissive="#3b82f6"
          emissiveIntensity={0.35}
          metalness={0.95}
          roughness={0.15}
          distort={0.35}
          speed={2}
          envMapIntensity={1.2}
        />
      </mesh>
    </Float>
  );
}

function GlowRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.1;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[2.4, 0.02, 16, 100]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
    </mesh>
  );
}

type AICoreProps = {
  scrollProgress: React.MutableRefObject<number>;
};

export function AICore({ scrollProgress }: AICoreProps) {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  return (
    <div
      className="relative w-full h-[50vh] md:h-full min-h-[320px]"
      onPointerMove={handlePointerMove}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25)_0%,transparent_65%)] pointer-events-none" />
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#3b82f6" />
        <pointLight position={[-5, -3, 2]} intensity={0.8} color="#8b5cf6" />
        <MetallicCore scrollProgress={scrollProgress} mouse={mouse} />
        <GlowRing />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

export function AICoreFallback() {
  return (
    <div className="relative w-full h-full min-h-[320px] flex items-center justify-center">
      <div className="w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.5)_0%,transparent_70%)] animate-pulse" />
    </div>
  );
}
