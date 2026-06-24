"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

function MouseGroup({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.mouse.x * 0.12,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -state.mouse.y * 0.08,
      0.04
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

function MainBlob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.08;
  });
  return (
    <Float speed={1.4} floatIntensity={0.8} rotationIntensity={0.2}>
      <mesh ref={ref} position={[3.2, 0.4, -0.5]}>
        <sphereGeometry args={[1.9, 128, 128]} />
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.45}
          speed={1.5}
          roughness={0.05}
          metalness={0.25}
          transparent
          opacity={0.45}
        />
      </mesh>
    </Float>
  );
}

function AccentBlob({
  position,
  color,
  scale,
  speed = 1.8,
}: {
  position: [number, number, number];
  color: string;
  scale: number;
  speed?: number;
}) {
  return (
    <Float speed={speed} floatIntensity={1.2} rotationIntensity={0.4}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={0.55}
          speed={speed}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

function WireframeTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.18;
    ref.current.rotation.y = state.clock.elapsedTime * 0.28;
  });
  return (
    <mesh ref={ref} position={[-3, 1.8, -3]}>
      <torusGeometry args={[1.1, 0.28, 20, 80]} />
      <meshStandardMaterial color="#0ea5e9" wireframe transparent opacity={0.18} />
    </mesh>
  );
}

function WireframeIco() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.22;
    ref.current.rotation.z = state.clock.elapsedTime * 0.14;
  });
  return (
    <mesh ref={ref} position={[1.5, -2.8, -4]}>
      <icosahedronGeometry args={[0.9, 0]} />
      <meshStandardMaterial color="#f59e0b" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

function Scene() {
  return (
    <MouseGroup>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 3]} intensity={3} color="#7c3aed" />
      <pointLight position={[-5, -2, 2]} intensity={2} color="#0ea5e9" />
      <pointLight position={[0, -5, 1]} intensity={1} color="#f59e0b" />

      <MainBlob />
      <AccentBlob position={[-3.8, 2.2, -3.5]} color="#0ea5e9" scale={0.55} speed={2.2} />
      <AccentBlob position={[1.2, -2.8, -5]} color="#f59e0b" scale={0.38} speed={1.4} />
      <AccentBlob position={[-1.5, -1, -6]} color="#7c3aed" scale={0.3} speed={2.6} />
      <WireframeTorus />
      <WireframeIco />
    </MouseGroup>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Scene />
    </Canvas>
  );
}
