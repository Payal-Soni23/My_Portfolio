"use client";
import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Zap, BookOpen } from "lucide-react";

export default function Education() {
  const education = {
    school: "MBM University",
    location: "Jodhpur, Rajasthan",
    degree: "Bachelor of Engineering (B.E.)",
    major: "Computer Science Engineering",
    status: "Expected 2027",
    courses: ["Data Structures", "Operating Systems", "Computer Networks", "DBMS"]
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Sidebar Header */}
        <div className="lg:col-span-4 space-y-3 md:space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 uppercase tracking-widest">
            <Zap size={12} className="animate-pulse" /> System.Foundation
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Education</h2>
          <p className="text-slate-500 font-light leading-relaxed text-sm md:text-base max-w-md mx-auto lg:mx-0">
            Academic protocols and core theoretical architecture.
          </p>
        </div>

        {/* Education Content */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="lg:col-span-8 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-4 w-full">
              <div className="p-3 w-fit rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                  {education.school}
                </h3>
                <p className="text-blue-400 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-2 leading-relaxed">
                  {education.degree} <br className="block md:hidden" /> — {education.major}
                </p>
              </div>
            </div>
            
            <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto border-t border-white/5 md:border-none pt-4 md:pt-0">
              <span className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/5 border border-white/10 text-white font-mono text-[9px] md:text-[10px] uppercase tracking-widest whitespace-nowrap">
                {education.status}
              </span>
              <div className="flex items-center gap-2 text-slate-500 text-[10px] md:text-xs font-mono ml-auto md:ml-0">
                <MapPin size={12} /> {education.location}
              </div>
            </div>
          </div>

          <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-white/5">
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-mono uppercase tracking-widest mb-4">
              <BookOpen size={14} /> Core_Curriculum
            </div>
            <div className="flex flex-wrap gap-2">
              {education.courses.map((course) => (
                <span key={course} className="px-2.5 py-1 bg-blue-500/5 border border-blue-500/10 rounded-lg text-[9px] md:text-[10px] text-blue-300 font-mono">
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Background Ambient Glow for Mobile */}
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}