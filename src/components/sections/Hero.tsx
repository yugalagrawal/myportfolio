"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Briefcase } from "lucide-react";
import { profile } from "@/data/profile";
import dynamic from "next/dynamic";

// Lazy-load particles only on desktop
const ParticleBackground = dynamic(() => import("./ParticleBackground"), {
  ssr: false,
});

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx,   setWordIdx]   = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = words[wordIdx];

    const tick = () => {
      if (isDeleting) {
        setDisplayed((prev) => prev.slice(0, -1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          timerRef.current = setTimeout(() => setIsDeleting(true), pause);
          return;
        }
      }
    };

    timerRef.current = setTimeout(tick, isDeleting ? speed / 2 : speed);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [displayed, wordIdx, isDeleting, words, speed, pause]);

  return displayed;
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none)").matches;
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setShowParticles(!isTouchDevice());
  }, []);

  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollDown = useCallback(() => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grid-bg"
      aria-label="Hero section"
    >
      {/* Particle background (desktop only) */}
      {showParticles && <ParticleBackground />}

      {/* Mobile animated gradient bg */}
      {!showParticles && (
        <div className="absolute inset-0 animated-bg" aria-hidden="true" />
      )}

      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(0,212,255,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 max-w-4xl mx-auto">
        {/* Pre-title badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass text-sm font-mono"
          style={{ color: "#00d4ff", fontFamily: "var(--font-mono)" }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#00d4ff" }}
          />
          Available for new opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          <span style={{ color: "#f1f5f9" }}>{profile.name.split(" ")[0]} </span>
          <span className="gradient-text">{profile.name.split(" ")[1]}</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-xl sm:text-2xl md:text-3xl font-mono mb-4 h-10 flex items-center justify-center gap-1"
          style={{ color: "#94a3b8", fontFamily: "var(--font-mono)" }}
        >
          <span style={{ color: "#a855f7" }}>// </span>
          <span className="cursor-blink">{typed}</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-base sm:text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#64748b" }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToProjects}
            className="btn-primary w-full sm:w-auto min-h-[48px] justify-center"
          >
            <Briefcase size={16} />
            <span>View My Work</span>
          </button>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline w-full sm:w-auto min-h-[48px] justify-center"
          >
            <Download size={16} />
            <span>Download Resume</span>
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={scrollDown}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 group"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ArrowDown
              size={20}
              style={{ color: "#00d4ff" }}
              className="group-hover:opacity-80 transition-opacity"
            />
          </motion.div>
        </motion.button>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent, #0a0f1e)",
        }}
      />
    </section>
  );
}
