"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Briefcase } from "lucide-react";
import { profile } from "@/data/profile";
import dynamic from "next/dynamic";

const MeshBackground = dynamic(() => import("./MeshBackground"), { ssr: false });

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed,  setDisplayed]  = useState("");
  const [wordIdx,    setWordIdx]    = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = words[wordIdx];
    const tick = () => {
      if (isDeleting) {
        setDisplayed((p) => p.slice(0, -1));
        if (displayed.length - 1 === 0) {
          setIsDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          timer.current = setTimeout(() => setIsDeleting(true), pause);
          return;
        }
      }
    };
    timer.current = setTimeout(tick, isDeleting ? speed / 2 : speed);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [displayed, wordIdx, isDeleting, words, speed, pause]);

  return displayed;
}

export default function Hero() {
  const typed = useTypewriter(profile.roles);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setShowParticles(!window.matchMedia("(hover: none)").matches);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mesh-bg dot-grid"
    >
      {/* Animated conic gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            background: "radial-gradient(ellipse, rgba(99,91,255,0.22) 0%, transparent 65%)",
            top: "-200px", left: "-150px",
          }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            background: "radial-gradient(ellipse, rgba(34,139,230,0.18) 0%, transparent 65%)",
            top: "-100px", right: "-100px",
          }}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 450, height: 450,
            background: "radial-gradient(ellipse, rgba(132,94,247,0.15) 0%, transparent 65%)",
            bottom: "-100px", left: "35%",
          }}
          animate={{ x: [0, 15, 0], y: [0, -25, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Particles (desktop) */}
      {showParticles && <MeshBackground />}

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 max-w-4xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-7 px-4 py-2 rounded-full glass text-xs font-mono"
          style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}
        >
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ background: "linear-gradient(135deg,#635bff,#228be6)" }}
            animate={{ opacity: [1, 0.5, 1], scale: [1, 0.85, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          Open to new opportunities · India
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-black leading-none tracking-tight mb-5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(52px, 10vw, 110px)",
            letterSpacing: "-4px",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.92)" }}>{profile.name.split(" ")[0]}{" "}</span>
          <span className="gradient-text-name">{profile.name.split(" ")[1]}</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center justify-center gap-2 mb-5 h-9"
          style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.3)", fontSize: "clamp(13px,2vw,16px)" }}
        >
          <span style={{ color: "#635bff" }}>// </span>
          <span className="cursor-blink">{typed}</span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="btn-primary w-full sm:w-auto min-h-[48px] justify-center"
          >
            <Briefcase size={15} />
            View My Work
          </button>
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline w-full sm:w-auto min-h-[48px] justify-center"
          >
            <Download size={15} />
            Download Resume
          </a>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto"
        >
          {profile.stats.map((stat, i) => (
            <div
              key={i}
              className="glass rounded-xl py-4 px-3 text-center"
              style={{ border: "1px solid rgba(99,91,255,0.15)" }}
            >
              <div
                className="text-xl sm:text-2xl font-black mb-1 gradient-text"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={18} style={{ color: "rgba(99,91,255,0.6)" }} />
        </motion.div>
      </motion.button>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #06030f)" }}
        aria-hidden="true"
      />
    </section>
  );
}
