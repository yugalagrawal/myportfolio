"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, TrendingUp, AlertCircle } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { projects } from "@/data/projects";

/* ── Per-section accent colours (cycles for sections 2-N) ── */
const ACCENTS = [
  { color: "#635bff", bg: "rgba(99,91,255,0.04)",  border: "rgba(99,91,255,0.18)",  left: "rgba(99,91,255,0.5)"  },
  { color: "#228be6", bg: "rgba(34,139,230,0.04)", border: "rgba(34,139,230,0.18)", left: "rgba(34,139,230,0.5)" },
  { color: "#14b8a6", bg: "rgba(20,184,166,0.04)", border: "rgba(20,184,166,0.18)", left: "rgba(20,184,166,0.5)" },
  { color: "#845ef7", bg: "rgba(132,94,247,0.04)", border: "rgba(132,94,247,0.18)", left: "rgba(132,94,247,0.5)" },
  { color: "#f97316", bg: "rgba(249,115,22,0.04)", border: "rgba(249,115,22,0.18)", left: "rgba(249,115,22,0.5)" },
];

/* ── Smart content renderer ── */
function ContentBlock({ content, accentColor = "#635bff" }: { content: string; accentColor?: string }) {
  const chunks = content.split("\n\n").filter(Boolean);

  return (
    <div className="flex flex-col gap-5">
      {chunks.map((chunk, i) => {
        const lines = chunk.split("\n").filter(l => l.trim());
        if (!lines.length) return null;

        const bulletLines = lines.filter(l => l.trim().startsWith("•"));
        const textLines   = lines.filter(l => !l.trim().startsWith("•"));

        /* ── Chunk has bullets ── */
        if (bulletLines.length > 0) {
          return (
            <div key={i} className="flex flex-col gap-2">
              {textLines.map((line, j) => (
                <p key={j} className="text-sm font-semibold mb-1"
                  style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-display)" }}>
                  {line.replace(/:$/, "")}
                </p>
              ))}
              <ul className="flex flex-col gap-2.5">
                {bulletLines.map((line, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: accentColor }} />
                    <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
                      {line.replace(/^•\s*/, "")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        /* ── Single line ── */
        if (lines.length === 1) {
          const line = lines[0];
          const colonIdx = line.indexOf(":");
          const isLabel = colonIdx > 0 && colonIdx < 42 && !line.slice(0, colonIdx).includes(".");
          if (isLabel && colonIdx < line.length - 1) {
            return (
              <p key={i} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
                <strong style={{ color: "rgba(255,255,255,0.78)", fontWeight: 600 }}>
                  {line.slice(0, colonIdx)}:{" "}
                </strong>
                {line.slice(colonIdx + 1).trim()}
              </p>
            );
          }
          return (
            <p key={i} className="text-sm sm:text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
              {line}
            </p>
          );
        }

        /* ── Multi-line, no bullets (sub-header + body) ── */
        const [firstLine, ...rest] = lines;
        return (
          <div key={i} className="flex flex-col gap-1.5">
            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "var(--font-display)" }}>
              {firstLine.replace(/:$/, "")}
            </p>
            {rest.map((line, j) => (
              <p key={j} className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.48)" }}>
                {line}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════ */
export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();

  const [problemSection, ...restSections] = project.sections ?? [];

  return (
    <main className="min-h-screen mesh-bg dot-grid" style={{ background: "#06030f" }}>

      {/* ── Sticky nav ── */}
      <div className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(6,3,15,0.85)", borderColor: "rgba(99,91,255,0.1)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-mono transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#635bff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}>
            <ArrowLeft size={14} /> Back
          </Link>
          {project.externalLink && (
            <a href={project.externalLink} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg transition-all duration-200"
              style={{ color: "#635bff", border: "1px solid rgba(99,91,255,0.3)", background: "rgba(99,91,255,0.08)" }}>
              Open File <ArrowUpRight size={11} />
            </a>
          )}
        </div>
      </div>

      {/* ════════════════ HERO ════════════════ */}
      <div className="relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute pointer-events-none"
          style={{
            top: "-20%", left: "50%", transform: "translateX(-50%)",
            width: "900px", height: "700px",
            background: "radial-gradient(ellipse, rgba(99,91,255,0.08) 0%, transparent 68%)",
          }} />

        <div className="max-w-5xl mx-auto px-6 pt-16 sm:pt-20 pb-14 relative">

          {/* Type + company chips */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-2 mb-7">
            <span className="text-xs px-2.5 py-1 rounded-full font-mono"
              style={{ background: "rgba(99,91,255,0.12)", color: "#635bff",
                border: "1px solid rgba(99,91,255,0.25)", fontFamily: "var(--font-mono)" }}>
              {project.type}
            </span>
            <span style={{ color: "rgba(255,255,255,0.12)" }}>·</span>
            <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
              {project.company}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.07 }}
            className="font-black leading-[1.04] mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(38px, 7.5vw, 76px)",
              letterSpacing: "-2.5px",
              color: "rgba(255,255,255,0.93)",
            }}>
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.13 }}
            className="text-base sm:text-lg leading-relaxed max-w-2xl mb-9"
            style={{ color: "rgba(255,255,255,0.38)" }}>
            {project.description}
          </motion.p>

          {/* Metric + tags */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
              style={{ background: "rgba(99,91,255,0.1)", border: "1px solid rgba(99,91,255,0.25)" }}>
              <TrendingUp size={13} style={{ color: "#635bff" }} />
              <span className="text-xl font-black" style={{ color: "#635bff", fontFamily: "var(--font-display)", letterSpacing: "-0.5px" }}>
                {project.metric}
              </span>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.28)" }}>{project.metricLabel}</span>
            </div>
            {project.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(99,91,255,0.06)",
                  color: "rgba(255,255,255,0.28)",
                  border: "1px solid rgba(99,91,255,0.12)",
                  fontFamily: "var(--font-mono)",
                }}>
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ════════════════ BODY ════════════════ */}
      <div className="max-w-5xl mx-auto px-6 pb-28">

        {/* ── Problem — first section, red treatment ── */}
        {problemSection && (
          <motion.div
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.28 }}
            className="mb-14 rounded-3xl p-8 sm:p-11 relative overflow-hidden"
            style={{ background: "rgba(239,68,68,0.03)", border: "1px solid rgba(239,68,68,0.14)",
              borderLeft: "3px solid rgba(239,68,68,0.5)" }}>

            {/* Watermark */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none font-black leading-none"
              style={{ fontSize: "clamp(90px,16vw,180px)", opacity: 0.035, color: "#ef4444",
                fontFamily: "var(--font-display)" }}>!</div>

            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.22)" }}>
                <AlertCircle size={13} style={{ color: "#ef4444" }} />
              </div>
              <p className="text-xs font-mono tracking-widest uppercase"
                style={{ color: "rgba(239,68,68,0.55)", fontFamily: "var(--font-mono)" }}>
                The Problem
              </p>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold mb-6"
              style={{ color: "rgba(255,255,255,0.88)", fontFamily: "var(--font-display)" }}>
              {problemSection.title}
            </h2>

            <ContentBlock content={problemSection.content} accentColor="#ef4444" />
          </motion.div>
        )}

        {/* ── Embedded deck ── */}
        {project.embedUrl && (
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="mb-14">
            <p className="text-xs font-mono tracking-widest uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-mono)" }}>
              // The Deck
            </p>
            <div className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(99,91,255,0.2)",
                aspectRatio: "16/9",
                boxShadow: "0 0 60px rgba(99,91,255,0.07)",
              }}>
              <iframe
                src={project.embedUrl}
                className="w-full h-full"
                allow="autoplay"
                allowFullScreen
                style={{ border: "none" }}
              />
            </div>
          </motion.div>
        )}

        {/* ── Remaining sections ── */}
        {restSections.length > 0 && (
          <div className="flex flex-col gap-5">
            {restSections.map((sec, i) => {
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className="rounded-2xl p-7 sm:p-10 relative overflow-hidden"
                  style={{
                    background: accent.bg,
                    border: `1px solid ${accent.border}`,
                    borderLeft: `3px solid ${accent.left}`,
                  }}>

                  {/* Watermark number */}
                  <div className="absolute right-5 bottom-0 select-none pointer-events-none font-black leading-none"
                    style={{
                      fontSize: "clamp(70px, 12vw, 130px)",
                      opacity: 0.04,
                      color: accent.color,
                      fontFamily: "var(--font-display)",
                    }}>
                    {String(i + 2).padStart(2, "0")}
                  </div>

                  {/* Section label */}
                  <p className="text-xs font-mono tracking-widest uppercase mb-3"
                    style={{ color: accent.color, opacity: 0.7, fontFamily: "var(--font-mono)" }}>
                    // {String(i + 2).padStart(2, "0")}
                  </p>

                  <h2 className="text-lg sm:text-xl font-bold mb-6"
                    style={{ color: "rgba(255,255,255,0.88)", fontFamily: "var(--font-display)" }}>
                    {sec.title}
                  </h2>

                  <ContentBlock content={sec.content} accentColor={accent.color} />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ── Footer ── */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-12 mt-14 border-t"
          style={{ borderColor: "rgba(99,91,255,0.1)" }}>
          <Link href="/#projects" className="btn-outline inline-flex items-center gap-2">
            <ArrowLeft size={14} /> All Projects
          </Link>
          {project.externalLink && (
            <a href={project.externalLink} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2">
              Open Full Deck <ArrowUpRight size={14} />
            </a>
          )}
        </motion.div>

      </div>
    </main>
  );
}
