"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Zap } from "lucide-react";

const experiences = [
  {
    company: "Sosotech Advisory LLP",
    role: "Frontend Intern",
    period: "AUG – OCT 2025",
    points: [
      "Built responsive React interfaces with component-driven architecture",
      "Created 10+ reusable UI components for improved scalability",
      "Optimized navigation flow and accessibility for Finance Saarthi"
    ],
    tech: ["React", "Tailwind", "UI/UX"]
  },
  {
    company: "ESRC (MBM)",
    role: "Robotics Intern",
    period: "JUN – JUL 2024",
    points: [
      "Developed Arduino systems and IR-based line-follower robots",
      "Implemented Bluetooth wireless navigation and logic gates",
      "Designed automation logic for a Tic-Tac-Toe robot"
    ],
    tech: ["C++", "Arduino", "IoT"]
  }
];

export default function Experience() {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Sidebar Header */}
        <div className="lg:col-span-4 space-y-3 md:space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
            <Zap size={12} className="animate-pulse" /> System.Operations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Experience</h2>
          <p className="text-slate-500 font-light text-sm md:text-base leading-relaxed max-w-sm mx-auto lg:mx-0">
            Field-tested deployments and operational history.
          </p>
        </div>

        {/* Experience List */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-500"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-3">
                <div className="space-y-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em]">{exp.company}</p>
                </div>
                <div className="shrink-0">
                  <span className="text-[9px] md:text-[10px] font-mono text-emerald-500 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3 mb-6">
                {exp.points.map((point, idx) => (
                  <li key={idx} className="flex gap-3 text-xs md:text-sm text-slate-400 font-light leading-snug">
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2 pt-5 border-t border-white/5">
                {exp.tech.map(t => (
                  <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono text-slate-600 group-hover:text-emerald-400 transition-colors">
                    #{t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}