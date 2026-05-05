"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-12 md:mb-16"
    >
      <p
        className="text-xs font-mono mb-3 tracking-widest uppercase"
        style={{ color: "#635bff", fontFamily: "var(--font-mono, monospace)" }}
      >
        {label}
      </p>
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight"
        style={{ fontFamily: "var(--font-display, sans-serif)" }}
      >
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ color: "rgba(255,255,255,0.35)" }}>
          {subtitle}
        </p>
      )}
      <div className="mt-6 flex items-center gap-3">
        <div className="h-px w-10" style={{ background: "linear-gradient(90deg, #635bff, transparent)" }} />
        <div className="h-1 w-1 rounded-full" style={{ background: "#635bff" }} />
      </div>
    </motion.div>
  );
}
