"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function Particles({ count = 80, color = "#3b82f6" }: { count?: number; color?: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function TraceLines() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * 0.02;
  });

  const linePoints = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const pts: THREE.Vector3[] = [];
      for (let j = 0; j < 50; j++) {
        pts.push(
          new THREE.Vector3(
            (j / 50) * 8 - 4,
            Math.sin(j * 0.3 + i) * 1.5,
            Math.cos(j * 0.2 + i * 0.5) * 0.5
          )
        );
      }
      return pts;
    });
  }, []);

  return (
    <group ref={ref}>
      {linePoints.map((pts, i) => (
        <Line key={i} points={pts} color="#8b5cf6" transparent opacity={0.25} lineWidth={1} />
      ))}
    </group>
  );
}

function GraphNodes() {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = useMemo(
    () =>
      Array.from({ length: 20 }, () => ({
        pos: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
        ] as [number, number, number],
      })),
    []
  );

  useFrame((state) => {
    if (groupRef.current) groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#3b82f6" />
        </mesh>
      ))}
      {nodes.slice(0, -1).map((n, i) => {
        const next = nodes[(i + 3) % nodes.length];
        return (
          <Line
            key={`edge-${i}`}
            points={[new THREE.Vector3(...n.pos), new THREE.Vector3(...next.pos)]}
            color="#3b82f6"
            transparent
            opacity={0.15}
            lineWidth={1}
          />
        );
      })}
    </group>
  );
}

export function ProjectBackground({ theme }: { theme: "documents" | "traces" | "graph" }) {
  return (
    <div className="absolute inset-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.25]} gl={{ alpha: true }}>
        {theme === "documents" && <Particles count={100} />}
        {theme === "traces" && <TraceLines />}
        {theme === "graph" && <GraphNodes />}
      </Canvas>
    </div>
  );
}
