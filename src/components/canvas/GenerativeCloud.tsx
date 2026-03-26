"use client";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";


export default function GenerativeCloud() {
  const points = useRef<THREE.Points>(null!);

  // Create 2000 random points in a sphere
  const particlesCount = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const { mouse } = state;
    // Slow rotation
    points.current.rotation.y += 0.002;
    points.current.rotation.x += 0.001;

    // Subtle reaction to mouse movement (the "AI Intelligence" feel)
    points.current.position.x = THREE.MathUtils.lerp(points.current.position.x, mouse.x * 0.5, 0.1);
    points.current.position.y = THREE.MathUtils.lerp(points.current.position.y, mouse.y * 0.5, 0.1);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
                  attach="attributes-position"
                  count={particlesCount}
                  array={positions}
                  itemSize={3} args={[]}        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#22d3ee" // Cyan-400 to match your UI
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
}
