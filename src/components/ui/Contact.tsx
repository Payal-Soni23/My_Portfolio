"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Zap, ExternalLink, Globe } from "lucide-react";

// Using your custom SVG strings for consistency
const BrandIcons = {
  github: (
    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 496 512" height="18" width="18"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.5 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5.7 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-.7zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
  ),
  linkedin: (
    <svg stroke="currentColor" fill="currentColor" viewBox="0 0 448 512" height="18" width="18"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path></svg>
  ),
};

export default function Footer() {
  return (
    <footer className="pt-24 pb-12 px-6 w-full max-w-7xl mx-auto border-t border-white/5 mt-20">
      <div className="flex flex-col mx-5 mb-10 md:flex-row justify-between items-start md:items-end gap-6">
  
  {/* Identity & Status */}
  {/* Removed max-w-xs to let the text breathe, and lowered space-y to 3 */}
  <div className="space-y-3 flex-1">
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
      <Zap size={12} className="animate-pulse" /> System.Uplink
    </div>
    <h2 className="text-4xl font-bold text-white tracking-tighter">
      Let's Connect<span className="text-cyan-500">_</span>
    </h2>
    <p className="text-slate-500 font-light text-sm leading-relaxed max-w-[280px]">
      Initializing secure handshake for internships and 3D/AI collaborations.
    </p>
  </div>

  {/* Actionable Social Grid */}
  {/* Changed gap-4 to gap-3 to bring icons closer together */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto shrink-0">
    <FooterLink 
      href="mailto:payal.soni@mbm.ac.in" 
      icon={<Mail size={18} />} 
      label="Email" 
      value="MBM.ac.in" 
    />
    <FooterLink 
      href="https://github.com/payalsoni" 
      icon={BrandIcons.github} 
      label="Github" 
      value="@payalsoni" 
    />
    <FooterLink 
      href="https://linkedin.com/in/payalsoni" 
      icon={BrandIcons.linkedin} 
      label="Linkedin" 
      value="payalsoni" 
    />
  </div>
</div>

      {/* Baseline Info */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.2em]">
          © 2026 Payal Soni // All Protocols Reserved.
        </p>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">Available for Hire</span>
          </div>
          <span className="text-[10px] font-mono text-slate-700 uppercase tracking-widest flex items-center gap-1">
            <Globe size={10} /> IST (UTC+5:30)
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, icon, label, value }: any) {
  return (
    <motion.a 
      href={href} 
      target="_blank" 
      whileHover={{ y: -5 }}
      className="flex flex-col p-5 rounded-2xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all group min-w-[160px]"
    >
      <div className="text-slate-500 group-hover:text-cyan-400 transition-colors mb-3">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-[9px] text-slate-600 uppercase font-mono tracking-widest">{label}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-slate-300 group-hover:text-white transition-colors truncate">{value}</p>
          <ExternalLink size={10} className="text-slate-800 group-hover:text-cyan-500 transition-colors" />
        </div>
      </div>
    </motion.a>
  );
}