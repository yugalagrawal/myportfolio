"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, FolderKanban, Building2 } from "lucide-react";
import { profile } from "@/data/profile";
import dynamic from "next/dynamic";

const MeshBackground = dynamic(() => import("./MeshBackground"), { ssr: false });

function getTimeSlot() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  if (h >= 17 && h < 21) return "evening";
  return "night";
}

const greetingMap = {
  morning:   { emoji: "☀️", text: "Good Morning!",   hover: "Don't tell me you're still in bed?" },
  afternoon: { emoji: "👋", text: "Good Afternoon!",  hover: "Lunch me kya plan hai?" },
  evening:   { emoji: "🌆", text: "Good Evening!",    hover: "Chai, ho jaye?" },
  night:     { emoji: "🌙", text: "Good Night!",      hover: "Don't tell me you gonna doomscroll till midnight" },
};

const mealMap = {
  morning:   { emoji: "🍳", text: "Breakfast done?", hover: "Don't tell me you skipped it" },
  afternoon: { emoji: "🍱", text: "Lunch done?",     hover: "Don't tell me you skipped it" },
  evening:   { emoji: "🍵", text: "Snacks done?",    hover: "Don't tell me you skipped it" },
  night:     { emoji: "🍽️", text: "Dinner done?",    hover: "Don't tell me you skipped it" },
};

function FloatingBubble({ emoji, text, hoverText, style, delay, duration, className = "" }: {
  emoji: string;
  text: string;
  hoverText: string;
  style: React.CSSProperties;
  delay: number;
  duration: number;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale:   { duration: 0.5, delay, type: "spring", stiffness: 200 },
        y:       { duration, repeat: Infinity, ease: "easeInOut", delay },
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`absolute flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-2xl cursor-default overflow-hidden ${className}`}
      style={{
        background:     "rgba(255,255,255,0.05)",
        border:         "1px solid rgba(99,91,255,0.25)",
        backdropFilter: "blur(16px)",
        boxShadow:      "0 8px 32px rgba(99,91,255,0.12)",
        color:          "rgba(255,255,255,0.75)",
        whiteSpace:     "normal",
        fontFamily:     "var(--font-mono)",
        fontSize:       "clamp(0.62rem, 1.8vw, 0.78rem)",
        maxWidth:       "160px",
        transition:     "border-color 0.2s, box-shadow 0.2s",
        ...(hovered ? {
        borderColor: "rgba(99,91,255,0.6)",
        boxShadow: "0 8px 32px rgba(99,91,255,0.3)",
        background: "rgba(99,91,255,0.15)",
      } : {}),
        ...style,
      }}
    >
      <span>{emoji}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={hovered ? "hover" : "default"}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{   opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          style={{ color: hovered ? "#fff" : "rgba(255,255,255,0.75)", fontWeight: hovered ? 600 : 400 }}
        >
          {hovered ? hoverText : text}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

export default function Hero() {
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
      {/* Animated gradient orbs */}
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

      {/* Floating bubbles */}
      {(() => {
        const slot = getTimeSlot();
        const g = greetingMap[slot];
        const m = mealMap[slot];
        return (
          <>
            <FloatingBubble
              emoji={g.emoji} text={g.text} hoverText={g.hover}
              style={{ bottom: "72px", left: "2%" }} delay={0.9} duration={4}
              className="hidden lg:flex"
            />
            <FloatingBubble
              emoji={m.emoji} text={m.text} hoverText={m.hover}
              style={{ bottom: "72px", right: "2%" }} delay={1.2} duration={3.5}
              className="hidden lg:flex"
            />
          </>
        );
      })()}

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 max-w-4xl mx-auto w-full pt-20 sm:pt-0">
        {/* Name */}
        <h1
          className="font-black leading-none tracking-tight mb-5"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(42px, 10vw, 110px)",
            letterSpacing: "-4px",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.92)" }}>{profile.name.split(" ")[0]}{" "}</span>
          <span className="gradient-text-name">{profile.name.split(" ")[1]}</span>
        </h1>

        {/* Positioning */}
        <p
          className="font-semibold max-w-3xl mx-auto mb-3 leading-snug"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(18px, 2.4vw, 26px)",
            color: "rgba(255,255,255,0.88)",
            textWrap: "balance",
          }}
        >
          {profile.headline}
        </p>

        {/* Where I've built things */}
        <p
          className="mb-5 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-2 gap-y-1"
          style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(11px,1.5vw,13px)", color: "rgba(255,255,255,0.5)" }}
        >
          {profile.context.map((c, i) => (
            <React.Fragment key={c}>
              {i > 0 && <span aria-hidden="true" className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.2)" }}>·</span>}
              <span>{c}</span>
            </React.Fragment>
          ))}
        </p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base max-w-lg mx-auto mb-6 sm:mb-9 leading-relaxed italic"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="btn-primary w-full sm:w-auto min-h-[48px] justify-center"
          >
            <FolderKanban size={15} />
            View My Projects
          </button>
          <button
            onClick={() => scrollTo("experience")}
            className="btn-outline w-full sm:w-auto min-h-[48px] justify-center"
          >
            <Building2 size={15} />
            Work Experience
          </button>
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
