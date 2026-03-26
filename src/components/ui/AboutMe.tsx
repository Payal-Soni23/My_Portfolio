"use client";
import * as THREE from "three";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, MeshWobbleMaterial } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, Cpu, Globe, Mail } from "lucide-react";

// --- CUTE ROBOT COMPONENT ---
export function CuteRobot({ scale = 1 }: { scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const eyeMaterialRef = useRef<THREE.MeshBasicMaterial>(null!);

  useFrame((state) => {
  // Use state.clock.getElapsedTime() - this is the correct 'Timer' replacement
  const t = state.clock.getElapsedTime();
  const { x: mouseX, y: mouseY } = state.mouse; 

  if (groupRef.current) {
    // 1. BASE ROTATION (The constant spin)
    // We don't lerp the auto-rotation itself, we let it be the 'base'
    const baseRotationY = t * 0.4; 

    // 2. MOUSE INFLUENCE (The tilt)
    // We lerp the OFFSET, not the whole rotation, to avoid "spinning" glitches
    const targetRotX = -mouseY * 0.4;
    const targetRotY = baseRotationY + (mouseX * 0.5);

    // Apply Lerp for smoothness
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, 
      targetRotX, 
      0.1 // Increased alpha slightly for better responsiveness
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, 
      targetRotY, 
      0.1
    );

    // 3. POSITIONING (The Float/Bobbing)
    groupRef.current.position.y = Math.sin(t) * 0.15;
  }

  // 4. EYE EMISSIVE PULSE
  if (eyeMaterialRef.current) {
    // We use .setScalar on the color to pulse the brightness/intensity
    const pulse = Math.sin(t * 3) * 0.5 + 0.5;
    const intensity = 0.8 + pulse * 0.4;
    eyeMaterialRef.current.color.setScalar(intensity); 
  }
});

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={scale}>
        <RoundedBox args={[1, 1, 1]} radius={0.2} smoothness={4}>
          <MeshWobbleMaterial 
            color="#0ea5e9" 
            factor={0.05} 
            speed={1} 
            metalness={0.8} 
            roughness={0.2}
            emissive="#0284c7"
            emissiveIntensity={0.4}
          />
        </RoundedBox>
        <mesh position={[-0.25, 0.15, 0.51]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshBasicMaterial ref={eyeMaterialRef} color="white" />
        </mesh>
        <mesh position={[0.25, 0.15, 0.51]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshBasicMaterial color="white" />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2]} />
          <meshStandardMaterial color="#0ea5e9" metalness={1} />
        </mesh>
      </group>
    </Float>
  );
}

const BrandIcons = {
  github: (
    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 496 512" height="18" width="18"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.5 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"></path></svg>
  ),
  linkedin: (
    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" height="18" width="18"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
  ),
};

export default function AboutMe() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const networkY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center py-12 md:py-20 overflow-hidden px-4">
      <motion.div style={{ y: networkY }} className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg viewBox="0 0 1000 1000" className="w-full h-full object-cover">
          <path d="M100,200 Q300,50 500,300 T900,100" stroke="#334155" fill="none" strokeWidth="0.5" />
          <path d="M50,600 Q250,400 600,700 T950,500" stroke="#334155" fill="none" strokeWidth="0.5" />
          <circle cx="500" cy="300" r="3" fill="#22d3ee" className="animate-pulse" />
        </svg>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 w-full max-w-7xl rounded-4xl md:rounded-[3rem] bg-slate-900/40 border border-white/10 backdrop-blur-xl p-6 md:p-16 shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* LEFT SIDE: Narrative */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[9px] md:text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                <Terminal size={12} /> Payal_Soni.instance_data
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                About Me<span className="text-cyan-500">_</span>
              </h2>
            </div>

            <div className="space-y-4 md:space-y-6 text-slate-400 text-sm md:text-lg leading-relaxed font-light">
              {isMobile ? (
                /* SHORTENED FOR MOBILE */
                <p>
                  I am a <span className="text-white font-medium">Software Engineer</span> and 3D Creator at <span className="text-white">MBM University</span>. I build performant digital ecosystems by bridging the gap between <span className="text-cyan-400">Full-Stack Dev</span> and immersive <span className="text-purple-400">Three.js</span> environments.
                </p>
              ) : (
                /* FULL FOR DESKTOP */
                <>
                  <p>
                    I am a <span className="text-white font-medium">Software Engineer</span> and 3D Creator currently pursuing my B.Tech at <span className="text-white">MBM University</span>. My work thrives at the intersection of logical architecture and sensory immersion.
                  </p>
                  <p>
                    With deep expertise in <span className="text-cyan-400">Full-Stack Development</span>, I focus on building performant digital ecosystems integrating AI-powered backends with <span className="text-purple-400">Three.js</span> environments.
                  </p>
                </>
              )}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-white/5 text-[10px] md:text-xs font-mono text-slate-300">
                <Globe size={12} className="text-cyan-500" /> Rajasthan, India
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-white/5 text-[10px] md:text-xs font-mono text-slate-300">
                <Cpu size={12} className="text-purple-500" /> B.Tech CSE (2027)
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 md:gap-4 pt-2">
              {[
                { icon: BrandIcons.github, href: "#" },
                { icon: BrandIcons.linkedin, href: "#" },
                { icon: <Mail size={18} />, href: "#" },
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  whileHover={{ y: -4, backgroundColor: "rgba(34, 211, 238, 0.1)" }}
                  className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Robot (Order swapped for mobile to show it first/central) */}
          <div className="lg:col-span-5 h-64 md:h-100 lg:h-137.5 relative cursor-grab active:cursor-grabbing order-1 lg:order-2">
            <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-[60px] md:blur-[100px]" />
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={2} color="#22d3ee" />
              <Suspense fallback={null}>
                {/* Scaled down for mobile (0.7) vs Desktop (1) */}
                <CuteRobot scale={isMobile ? 0.75 : 1} />
              </Suspense>
            </Canvas>
          </div>

        </div>
      </motion.div>
    </section>
  );
}