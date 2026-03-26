"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import IntroLaptop from "../components/canvas/IntroLaptop";
import Hero from "../components/ui/Hero";
import AboutMe from "../components/ui/AboutMe";
import BentoGrid from "../components/ui/BentoGrid";
import StatusBar from "../components/ui/StatusBar";
import ProjectSection from "../components/ui/ProjectSection";
import Experience from "../components/ui/Experience";
import Education from "../components/ui/Education";
import Contact from "../components/ui/Contact";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <main className="bg-slate-950 min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroLaptop key="intro" onComplete={() => setShowIntro(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Hero />
            <AboutMe />
            <BentoGrid />
            <ProjectSection/>
            <StatusBar />
            <Experience/>
            <Education/>
            <Contact/>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}