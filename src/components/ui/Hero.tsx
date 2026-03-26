"use client";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import DeveloperLaptop from "../canvas/DeveloperLaptop";
import { Download, Rocket, Cpu, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const ROLES = ["Software Engineer", "AI Enthusiast", "3D Interface Designer", "Full Stack Developer"];
  
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayText.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length + 1)), 80);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length - 1)), 50);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const xRange = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const x = useSpring(xRange, { stiffness: 100, damping: 20 });
  
  // --- MOUSE TRACKING LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothing out the rotation
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Map mouse movement to degrees of rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Normalize values between -0.5 and 0.5
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-slate-100">
      
      {/* --- NAVBAR (Logic same as before) --- */}
      <nav className="fixed top-0 z-50 w-full flex justify-center p-4 md:p-6">
        <div className="flex items-center justify-between w-full max-w-7xl px-6 py-3 rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-2 z-60">
            <div className="p-2 bg-cyan-500 rounded-lg"><Cpu size={20} className="text-slate-950" /></div>
            <span className="font-mono font-bold text-xl">PS.</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors">{link.name}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-xs font-bold uppercase tracking-widest px-4 py-2 border border-cyan-500/50 text-cyan-400 rounded-lg">Contact</button>
            <button className="md:hidden z-60 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- CONTENT GRID --- */}
      {/* On mobile: flex-col-reverse puts the second motion.div (laptop) on top */}
      <div className="relative z-10 flex flex-col-reverse md:grid md:grid-cols-2 items-center w-full max-w-7xl px-8 md:px-16 gap-8 md:gap-12 pt-28 md:pt-10">
        
        {/* LEFT: TEXT AREA */}
        <motion.div
          className="space-y-6 text-center md:text-left flex flex-col items-center md:items-start" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-2">
            <h1 className="font-bold tracking-tighter leading-none">
              <span className="block text-sm md:text-2xl text-slate-400 font-mono mb-2 uppercase tracking-widest">
                System.init(Payal_Soni)
              </span>
              <span className="block text-4xl md:text-7xl bg-linear-to-r from-white via-cyan-400 to-indigo-400 bg-clip-text text-transparent pb-2">
                Payal Soni
              </span>
            </h1>
            <div className="h-10 flex items-center justify-center md:justify-start">
              <span className="text-slate-500 mr-2 font-mono text-lg">{">"}</span>
              <p className="text-lg md:text-3xl font-light text-slate-200 tracking-wide">
                {displayText}
                <span className="inline-block w-2 h-6 md:h-8 ml-1 bg-cyan-500 animate-pulse align-middle" />
              </p>
            </div>
          </div>

          {/* HIDDEN ON MOBILE: Description */}
          <p className="hidden md:block max-w-lg text-lg text-slate-400 leading-relaxed font-light">
            Architecting high-performance <span className="text-white">Full-Stack</span> applications
            with a focus on <span className="text-cyan-400">AI integration</span> and immersive
            <span className="text-indigo-400"> 3D WebGL</span> interfaces.
          </p>

          {/* BUTTONS: Smaller width/padding on mobile */}
          <div className="flex flex-row items-center justify-center md:justify-start gap-3 pt-2">
            <a href="#projects"
               className="group inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 md:px-8 py-2.5 md:py-3 text-[10px] md:text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition-all active:scale-95">
              <span>Projects</span>
              <Rocket size={14} className="md:w-4.5" />
            </a>
            <a href="/Resume.pdf"
               className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 md:px-8 py-2.5 md:py-3 text-[10px] md:text-sm font-bold text-white backdrop-blur-md hover:bg-white/10 transition-all active:scale-95">
              <span>Resume</span>
              <Download size={14} className="md:w-4.5" />
            </a>
          </div>

          {/* Tags also centered for mobile */}
          <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-4">
            {["Next.js", "Three.js", "AI", "Node.js"].map((tech) => (
              <span key={tech} className="text-[9px] uppercase tracking-widest font-bold text-slate-500 border border-slate-800 px-2 py-1 rounded-md bg-slate-900/50">
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* RIGHT: LAPTOP AREA (Top on mobile) */}
        <motion.div
          className="w-full flex items-center justify-center select-none"
          style={{ 
            rotateX, 
            rotateY, 
            transformStyle: "preserve-3d",
            perspective: "1000px"}}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1,
            y: [0, -10, 0],
            rotateY: [-5, 5, -5],
            scale: 1 
          }}
          transition={{
            opacity: { duration: 1 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 0.8 }
          }}
        >
          <div className="relative group flex flex-col items-center">
            {/* laptop width set to be smaller on mobile (88vw is max, but min-400 limits it) */}
            <div 
              className="relative flex flex-col items-center scale-75 md:scale-100" // Shrink laptop on mobile
              style={{ 
                transformStyle: "preserve-3d",
                width: "min(360px, 80vw)", // Smaller mobile width
              }}
            >
              <div className="absolute inset-0 bg-cyan-500/15 blur-[60px] md:blur-[100px] rounded-full group-hover:bg-cyan-500/25 transition-colors" />
              <div className="w-full" style={{ minHeight: "160px" }}>
                 <DeveloperLaptop />
              </div>

              <div
                className="relative mt-0 flex justify-center w-full"
                style={{
                  transform: "rotateX(72deg) translateZ(-14px) translateY(-6px)",
                  transformOrigin: "top center",
                }}
                
              >
                <div className="h-3 w-[118%] rounded-b-3xl bg-linear-to-b from-slate-700 to-slate-950 shadow-xl" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
  