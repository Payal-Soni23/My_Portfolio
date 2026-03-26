"use client";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame, Canvas } from "@react-three/fiber";


const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float iTime;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float len = length(p);
    
    // Create organic flowing movement
    float color = 0.5 + 0.5 * sin(iTime + len * 3.0);
    
    // Deep slate to dark cyan gradient
    vec3 darkBlue = vec3(0.01, 0.02, 0.05);
    vec3 accentCyan = vec3(0.0, 0.1, 0.15);
    
    vec3 finalColor = mix(darkBlue, accentCyan, color * 0.2);
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  const uniforms = useMemo(() => ({
    iTime: { value: 0 },
  }), []);

  useFrame((state) => {
    uniforms.iTime.value = state.clock.getElapsedTime() * 0.5;
  });

  return (
    <mesh ref={meshRef} scale={[20, 20, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function BackgroundShader() {
  return (
    <div className="fixed inset-0 -z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}