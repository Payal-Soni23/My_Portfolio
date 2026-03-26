"use client";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

const CODE_LINES = [
  '>> [SYSTEM]: Status_Online... v3.0.4',
  '>> [AUTH]: Identity_Verified: PAYAL SONI',
  '>> [INFO]: Welcome to my digital space.',
  '>> [SKILLS]: Next.js | Three.js | Python',
  '', 
  'export const Portfolio = {',
  '  status: "Available_for_Innovation",',
  '  action: () => "Let\'s build together."',
  '}'
];

interface IntroLaptopProps {
  onComplete: () => void;
}

const LINE_DELAY_MS = 180;
const HOLD_AFTER_LAST_LINE_MS = 1000;

export default function IntroLaptop({ onComplete }: IntroLaptopProps) {
  const [phase, setPhase] = useState<"closed" | "opening" | "codeVisible" | "done">("closed");
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const lidControls = useAnimationControls();

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("opening");
      lidControls.start({
        rotateX: 0,
        transition: { type: "spring", stiffness: 80, damping: 18, mass: 1.2 },
      });
    }, 800);
    return () => clearTimeout(t);
  }, [lidControls]);

  useEffect(() => {
    if (phase !== "opening") return;
    const t = setTimeout(() => setPhase("codeVisible"), 1300);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "codeVisible") return;
    if (visibleLineCount >= CODE_LINES.length) {
      const t = setTimeout(() => {
        setPhase("done");
        onComplete();
      }, HOLD_AFTER_LAST_LINE_MS);
      return () => clearTimeout(t);
    }
    const id = setTimeout(() => {
      setVisibleLineCount((n) => n + 1);
    }, LINE_DELAY_MS);
    return () => clearTimeout(id);
  }, [phase, visibleLineCount, onComplete]);

  return (
    <motion.div
      className="relative min-h-screen w-full inset-0 z-60 flex items-center justify-center bg-black overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* Background Grid - Adjusted for mobile scale */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.1] md:opacity-[0.15]" 
          style={{
            backgroundImage: `linear-gradient(to right, #f2f9fa 1px, transparent 1px), 
                              linear-gradient(to bottom, #f2f9fa 1px, transparent 1px)`,
            backgroundSize: '20px 20px', // Smaller grid on mobile
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
            transform: 'perspective(500px) rotateX(60deg) translateY(200px) scale(2.5)',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-150 md:h-150 bg-cyan-500/5 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      {/* 3D Container - Scaling based on viewport */}
      <div 
        className="flex flex-col items-center justify-center transition-all duration-500" 
        style={{ perspective: "min(1400px, 250vw)" }} // Adjusts depth for narrow screens
      >
        <motion.div
          layoutId="main-laptop"
          className="relative flex flex-col items-center scale-[0.7] sm:scale-90 md:scale-100" // Shrinks for small screens
          style={{ transformStyle: "preserve-3d" }}
          initial={{ rotateY: -12, rotateX: 8 }}
          animate={{ rotateY: -12, rotateX: 8 }}
        >
          {/* Lid (screen) */}
          <motion.div
            className="relative origin-bottom"
            style={{
              transformStyle: "preserve-3d",
              width: "min(420px, 90vw)",
            }}
            initial={{ rotateX: -92 }}
            animate={lidControls}
          >
            <div
              className="relative mx-auto rounded-t-xl border border-slate-600/80 bg-slate-900 shadow-2xl"
              style={{ transform: "translateZ(1px)", minHeight: "220px" }}
            >
              <div className="absolute inset-1 rounded-lg overflow-hidden bg-slate-950">
                {phase !== "closed" && (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-3 py-2 text-[10px] text-slate-400">
                      <div className="flex gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500/80" />
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="rounded bg-slate-800/80 px-2 py-0.5 text-slate-300 font-medium">portfolio.js</span>
                    </div>

                    <div className="flex flex-1 bg-slate-950 overflow-hidden">
                      {/* Line Numbers - Hidden on very small screens to save space */}
                      <div className="hidden sm:flex select-none flex-col items-end bg-slate-950/90 px-2 py-2 text-[11px] md:text-[13px] leading-5 text-slate-600">
                        {CODE_LINES.map((_, i) => <span key={i}>{i + 1}</span>)}
                      </div>

                      {/* Code Area */}
                      <div className="flex-1 overflow-hidden px-3 py-2 font-mono text-[11px] sm:text-[12px] md:text-[14px] leading-relaxed text-slate-200">
                        <pre className="whitespace-pre-wrap wrap-break-word">
                          {CODE_LINES.map((line, i) => (
                            <motion.span
                              key={i}
                              className={`block ${
                                line.startsWith('>>') ? 'text-cyan-400 font-bold' : 
                                line.includes('export') ? 'text-purple-400' : 
                                line.includes('"') ? 'text-emerald-400' : 'text-slate-300'
                              }`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={i < visibleLineCount ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {line}
                            </motion.span>
                          ))}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Base (keyboard) */}
          <div
            className="relative mt-0 flex justify-center w-full"
            style={{
              transform: "rotateX(72deg) translateZ(-14px) translateY(-6px)",
              transformOrigin: "top center",
            }}
          >
            <div className="h-4 w-[112%] rounded-b-3xl bg-linear-to-b from-slate-700 to-slate-950 shadow-xl" />
            <div className="absolute bottom-0 left-1/2 h-2.5 w-[85%] -translate-x-1/2 rounded-b-2xl bg-slate-900/95" />
          </div>
        </motion.div>
        
        {/* Shadow */}
        <div className="absolute -bottom-10 left-1/2 h-12 w-[120%] -translate-x-1/2 rounded-full bg-slate-900/70 blur-2xl" />
      </div>
    </motion.div>
  );
}