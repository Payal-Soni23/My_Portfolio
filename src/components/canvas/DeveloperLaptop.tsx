"use client";
import React, { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function DeveloperLaptop({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const sx = useSpring(px, { stiffness: 100, damping: 25 });
  const sy = useSpring(py, { stiffness: 100, damping: 25 });

  const rotateX = useTransform(sy, [-1, 1], [15, -15]);
  const rotateY = useTransform(sx, [-1, 1], [-20, 20]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    py.set((e.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  }, [px, py]);

  const handleMouseLeave = () => { px.set(0); py.set(0); };

  return (
    <motion.div
      layoutId="main-laptop"
      // Added scale-[0.7] for mobile, scaling up to 100% on desktop
      className={`relative w-full max-w-lg scale-[0.75] sm:scale-90 md:scale-100 mx-auto transition-all duration-500 ${className}`}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      style={{ 
        transformStyle: "preserve-3d", 
        rotateX, 
        rotateY, 
        perspective: "1200px", // Adding internal perspective for better 3D depth
        ...style 
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* SCREEN UNIT */}
      <div 
        className="relative mx-auto h-50 sm:h-56 md:h-64 w-full rounded-2xl border-2 border-slate-700/50 bg-slate-900 p-1.5 sm:p-2 shadow-[0_40px_100px_rgba(0,0,0,0.8)]" 
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="h-full w-full rounded-lg bg-[#0d1117] overflow-hidden border border-white/5 flex flex-col font-mono">
          
          {/* Editor Header */}
          <div className="flex items-center justify-between px-3 py-1.5 sm:px-4 sm:py-2 bg-[#161b22] border-b border-white/5">
            <div className="flex gap-1 sm:gap-1.5">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-500/50" />
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500/50" />
            </div>
            <span className="text-[8px] sm:text-[10px] text-slate-500 uppercase tracking-widest">ai_engine.ts</span>
          </div>

          {/* Code Content */}
          <div className="flex h-full text-[9px] sm:text-[10px] leading-relaxed overflow-hidden font-mono">
  
  {/* LEFT SIDEBAR: File Structure (1/4 Width) */}
  <div className="w-1/4 bg-[#161b22]/50 border-r border-white/5 flex flex-col pt-2 px-1 sm:px-2 select-none">
    <div className="flex items-center gap-1.5 py-1 opacity-40 uppercase text-[7px] tracking-widest mb-1">Explorer</div>
    
    {/* File Items */}
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-cyan-400/80 bg-cyan-500/5 px-1 rounded">
        <span className="text-[10px]">ts</span> 
        <span className="truncate">engine.ts</span>
      </div>
      <div className="flex items-center gap-1.5 text-slate-500 px-1 hover:text-slate-300 transition-colors">
        <span className="text-[10px]">py</span> 
        <span className="truncate">ai_model.py</span>
      </div>
      <div className="flex items-center gap-1.5 text-slate-500 px-1">
        <span className="text-[10px]">gl</span> 
        <span className="truncate">shader.frag</span>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-slate-600 px-1 opacity-50">
        <span>dir</span> 
        <span>components/</span>
      </div>
    </div>
  </div>

  {/* RIGHT SIDE: Code Editor (3/4 Width) */}
  <div className="flex-1 p-3 sm:p-4 bg-[#0d1117] overflow-hidden">
    <div className="flex gap-2 sm:gap-4">
      {/* Line Numbers */}
      <div className="text-slate-700 select-none text-right min-w-3 opacity-50">
        1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11
      </div>
      
      {/* Code Body */}
      <div className="whitespace-nowrap sm:whitespace-normal">
        <span className="text-purple-400 italic">const</span> <span className="text-cyan-400">Core</span> = <span className="text-blue-400">initEngine</span>({ "{"}
        <br/>
        &nbsp;&nbsp;<span className="text-slate-300">stack:</span> [<span className="text-emerald-400">"Next.js"</span>, <span className="text-emerald-400">"AI"</span>],
        <br/>
        &nbsp;&nbsp;<span className="text-slate-300">render:</span> <span className="text-blue-400">true</span>,
        <br/>
        &nbsp;&nbsp;<span className="text-slate-300">fps:</span> <span className="text-orange-400">144</span>
        <br/>
        {"}"});
        <br/>
        <span className="text-purple-400">async function</span> <span className="text-blue-400">deploy</span>() {"{"}
        <br/>
        &nbsp;&nbsp;<span className="text-purple-400">await</span> <span className="text-cyan-400">Core</span>.<span className="text-blue-400">verifyIdentity</span>(<span className="text-amber-400">"PAYAL_SONI"</span>);
        <br/>
        &nbsp;&nbsp;<span className="text-cyan-400">Core</span>.<span className="text-blue-400">status</span> = <span className="text-emerald-400">"Ready_to_Build"</span>;
        <br/>
        &nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-blue-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-amber-400">"Success!"</span>);
        <br/>
        {"}"}
        <br/>
        <span className="text-blue-400">deploy</span>();
      </div>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* KEYBOARD DECK (The "Base") */}
      <div 
        className="relative -mt-3 sm:-mt-4 mx-auto h-3 sm:h-4 w-[105%] sm:w-[110%] rounded-xl bg-linear-to-b from-slate-700 to-slate-900 border-t border-white/20 shadow-2xl"
        style={{ transform: "rotateX(60deg) translateZ(-20px)", transformOrigin: "top" }}
      >
        {/* Trackpad area */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-1.5 sm:h-2 bg-slate-800/50 rounded-sm border border-white/5" />
        
        {/* Keycap grid - Hidden on smallest screens to reduce clutter */}
        <div className="hidden sm:grid absolute top-1 inset-x-4 grid-cols-12 gap-1 opacity-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="h-0.5 bg-white rounded-full" />
          ))}
        </div>
      </div>

      {/* Under-glow Shadow */}
      <div className="absolute -bottom-6 sm:-bottom-10 left-1/2 -translate-x-1/2 w-[110%] h-12 sm:h-20 bg-cyan-500/10 blur-2xl sm:blur-[60px] rounded-full pointer-events-none" />
    </motion.div>
  );
}