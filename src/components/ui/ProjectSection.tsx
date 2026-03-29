"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Layers, Bot, ShoppingCart, Gamepad2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

// --- PROJECT DATA ---
const projects = [
  {
    title: "AI Chatbot using LLM APIs",
    description: "Developed an AI-powered chatbot with real-time conversational capabilities. Implemented context-aware responses using OpenAI and Node.js.",
    tags: ["React", "Node.js", "OpenAI", "Prompt Eng."],
    type: "AI & Intelligence",
    icon: <Bot size={20} />,
    link: "#",
    github: "#"
  },
  {
    title: "Jewelry E-Commerce Platform",
    description: "Full-stack platform with secure JWT authentication and product filtering. Designed reusable UI components for a luxury luxury feel.",
    tags: ["React", "Express", "JWT", "PostgreSQL"],
    type: "Full Stack Dev",
    icon: <ShoppingCart size={20} />,
    link: "#",
    github: "https://github.com/Payal-Soni23/jewellery"
  },
  {
    title: "Gamified Learning (SIH)",
    description: "A 3D interactive learning interface built for SIH. Focused on immersion through Three.js and real-time state management.",
    tags: ["Three.js", "R3F", "Framer Motion"],
    type: "3D Interaction",
    icon: <Gamepad2 size={20} />,
    link: "https://ecora-m-lynx.netlify.app/",
    github: "#"
  }
];

// --- 3D TILT CARD COMPONENT ---
function ProjectCard({ title, description, tags, type, icon, github, link }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile to disable tilt
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX: isMobile ? 0 : rotateX, 
        rotateY: isMobile ? 0 : rotateY, 
        transformStyle: "preserve-3d" 
      }}
      className="relative w-full rounded-2xl md:rounded-3xl bg-slate-900/40 border border-white/10 p-5 md:p-8 cursor-pointer group backdrop-blur-xl shadow-2xl"
    >
      <div style={{ transform: isMobile ? "none" : "translateZ(50px)" }} className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              {icon}
            </div>
            <span className="text-cyan-500 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.2em] md:tracking-[0.3em]">{type}</span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white mt-4 group-hover:text-cyan-400 transition-colors tracking-tight">
            {title}
          </h3>
          <p className="text-slate-400 mt-3 md:mt-4 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
            {description}
          </p>
        </div>

        <div className="mt-6 md:mt-8">
          <div className="flex gap-1.5 flex-wrap mb-5 md:mb-6">
            {tags.map((tag: string) => (
              <span key={tag} className="px-2 md:px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[9px] font-mono text-slate-300">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex gap-3 md:gap-4">
            <a href={github} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
              <FaGithub size={16} />
            </a>
            <a href={link} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none hidden md:block">
        <Layers size={80} className="text-white" />
      </div>
    </motion.div>
  );
}

// --- MASTER TIMELINE SECTION ---
export default function ProjectTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="projects" ref={containerRef} className="py-16 md:py-32 px-4 md:px-6 bg-slate-950 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 mb-12 md:mb-16 items-center md:items-start text-center md:text-left">
          <div className="w-fit inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
            <Layers size={12} /> Production.Build_Logs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Featured Projects</h2>
          <p className="text-slate-500 mt-2 font-light uppercase tracking-widest text-[10px]">A Chronology of Creation</p>
        </div>

        <div className="relative">
          {/* THE VERTICAL LINE (Modified for Mobile) */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-px h-full bg-slate-800">
            <motion.div 
              style={{ height: pathHeight }} 
              className="w-full bg-linear-to-b from-cyan-500 via-purple-500 to-emerald-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" 
            />
          </div>

          <div className="space-y-12 md:space-y-24">
            {projects.map((proj, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`flex flex-col md:flex-row items-center justify-between w-full relative ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  
                  {/* CARD CONTAINER */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full pl-10 md:pl-0 md:w-[45%]"
                  >
                    <ProjectCard {...proj} />
                  </motion.div>

                  {/* CENTER NODE */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-slate-950 border-2 border-cyan-500 z-10 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    <div className="absolute h-6 w-6 md:h-8 md:w-8 rounded-full bg-cyan-500/20 animate-ping" />
                  </div>

                  {/* DATE / INDEX (Hidden or repositioned for mobile) */}
                  <div className="hidden md:block w-[45%]">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className={`text-slate-800/50 font-mono text-6xl font-black uppercase ${isEven ? "pl-20" : "pr-20 text-right"}`}
                    >
                      0{i + 1}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}