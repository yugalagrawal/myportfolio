"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;    // Small label above (e.g. "// 02")
  title: string;    // Main heading
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
        className="text-sm font-mono mb-3"
        style={{ color: "#00d4ff", fontFamily: "var(--font-mono, monospace)" }}
      >
        {label}
      </p>
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
        style={{ fontFamily: "var(--font-display, sans-serif)" }}
      >
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg max-w-2xl" style={{ color: "#94a3b8" }}>
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      <div className="mt-6 flex items-center gap-3">
        <div
          className="h-px w-12"
          style={{ background: "linear-gradient(90deg, #00d4ff, transparent)" }}
        />
        <div
          className="h-1 w-1 rounded-full"
          style={{ background: "#00d4ff" }}
        />
      </div>
    </motion.div>
  );
}
