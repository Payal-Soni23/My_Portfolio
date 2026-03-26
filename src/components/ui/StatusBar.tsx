"use client";
import { motion } from "framer-motion";
import {  Globe, Circle } from "lucide-react";

export default function StatusBar() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-t border-white/5 px-6 py-2 flex justify-between items-center text-[10px] md:text-xs font-mono text-slate-500 tracking-wider"
    >
      {/* Left side: Status Indicator */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Circle size={8} className="fill-emerald-500 text-emerald-500" />
          </motion.div>
          <span className="uppercase text-emerald-500/80">Active Instance</span>
        </div>
        <span className="hidden md:inline border-l border-slate-800 pl-4 uppercase">
          Loc: Nagaur, Rajasthan
        </span>
      </div>

      {/* Middle: Current Focus (Typewriter effect) */}
      <div className="hidden lg:flex items-center gap-2">
        <span className="text-slate-600 underline underline-offset-2 uppercase">Current Focus:</span>
        <motion.span 
          animate={{ opacity: [0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="text-cyan-400"
        >
          Architecting AI-powered 3D Dashboards with Three.js...
        </motion.span>
      </div>

      {/* Right side: Meta Data */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
           {/* <Github size={14} /> */}
           <span>v1.0.4-stable</span>
        </div>
        <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
           <Globe size={14} />
           <span>{currentDate}</span>
        </div>
      </div>
    </motion.div>
  );
}