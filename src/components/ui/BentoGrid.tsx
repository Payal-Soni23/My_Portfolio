"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  Code2, Terminal, Database, Cpu, 
  Layers, GitBranch 
} from "lucide-react";

const skillModules = [
  { 
    title: "Core Languages", 
    icon: <Terminal size={20} />, 
    skills: ["C", "C++", "Python", "Java", "JS"], 
    status: "Active", 
    accent: "text-blue-400",
    glow: "group-hover:border-blue-500/50" 
  },
  { 
    title: "Frontend", 
    icon: <Layers size={20} />, 
    skills: ["React", "Next.js", "Tailwind", "Three.js", "UI/UX"], 
    status: "Rendering", 
    accent: "text-cyan-400",
    glow: "group-hover:border-cyan-500/50" 
  },
  { 
    title: "Backend", 
    icon: <Code2 size={20} />, 
    skills: ["Node.js", "Express", "REST APIs", "JWT"], 
    status: "Online", 
    accent: "text-emerald-400",
    glow: "group-hover:border-emerald-500/50" 
  },
  { 
    title: "Intelligence", 
    icon: <Cpu size={20} />, 
    skills: ["NumPy", "Pandas", "Scikit-Learn", "NLP"], 
    status: "Processing", 
    accent: "text-purple-400",
    glow: "group-hover:border-purple-500/50" 
  },
  { 
    title: "Databases", 
    icon: <Database size={20} />, 
    skills: ["MySQL", "MongoDB", "PostgreSQL"], 
    status: "Connected", 
    accent: "text-amber-400",
    glow: "group-hover:border-amber-500/50" 
  },
  { 
    title: "Dev Tools", 
    icon: <GitBranch size={20} />, 
    skills: ["Git", "GitHub", "Postman", "VS Code"], 
    status: "Synced", 
    accent: "text-rose-400",
    glow: "group-hover:border-rose-500/50" 
  }
];

export default function TechEcosystem() {
  return (
    <section id="skills" className="py-16 md:py-24 px-4 w-full max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-6 border-b border-white/5 pb-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <div className="flex flex-col items-center md:items-start gap-3 mb-6 md:mb-8">
            <div className="w-fit inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[9px] md:text-[10px] font-mono text-purple-400 uppercase tracking-widest">
              <Cpu size={12} className="animate-pulse" /> System.Engine_Core
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Technical Stack</h2>
            <p className="text-slate-500 mt-2 font-light max-w-md text-sm md:text-base">
              Modular breakdown of engineering capabilities and core protocols.
            </p>
          </div>
        </motion.div>
        
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-900/50 rounded-full border border-white/5 mb-4 md:mb-0">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </div>
          <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">System: Stable</span>
        </div>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {skillModules.map((module, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ 
              y: -5, 
              scale: 1.01,
              transition: { duration: 0.2 } 
            }}
            className={`group relative overflow-hidden rounded-4xl md:rounded-4xl bg-slate-900/40 border border-white/5 backdrop-blur-xl p-6 md:p-8 transition-all duration-500 ${module.glow}`}
          >
            {/* Live Status Indicator */}
            <div className="absolute top-5 right-6 flex items-center gap-2">
              <span className="text-[7px] md:text-[8px] font-mono text-slate-600 group-hover:text-slate-300 transition-colors uppercase tracking-widest">
                {module.status}
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-slate-800 group-hover:bg-cyan-500 transition-colors shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            </div>

            {/* Module Icon */}
            <div className={`mb-4 md:mb-6 p-2.5 md:p-3 w-fit rounded-xl md:rounded-2xl bg-slate-800/50 border border-white/5 group-hover:border-white/20 transition-all duration-500 ${module.accent}`}>
              {module.icon}
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 tracking-tight">
              {module.title}
            </h3>
            
            {/* Skill Pills */}
            <div className="flex flex-wrap gap-2 relative z-10">
              {module.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="text-[9px] md:text-[11px] font-mono text-slate-400 px-2.5 py-1 md:px-3 md:py-1.5 bg-white/5 border border-white/5 rounded-lg group-hover:text-white group-hover:bg-white/10 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Scanning Animation - Hidden on mobile to save performance/avoid clutter */}
            <motion.div 
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-0.5 bg-linear-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none hidden md:block" 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}