"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { experience, ExperienceItem } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";

const companyTheme: Record<string, { color: string; border: string; bg: string; glow: string }> = {
  "LetsTransport": {
    color:  "#f59e0b",
    border: "rgba(245,158,11,0.3)",
    bg:     "rgba(245,158,11,0.06)",
    glow:   "rgba(245,158,11,0.15)",
  },
  "Media.net": {
    color:  "#06b6d4",
    border: "rgba(6,182,212,0.3)",
    bg:     "rgba(6,182,212,0.06)",
    glow:   "rgba(6,182,212,0.15)",
  },
  "Nogozo": {
    color:  "#10b981",
    border: "rgba(16,185,129,0.3)",
    bg:     "rgba(16,185,129,0.06)",
    glow:   "rgba(16,185,129,0.15)",
  },
};

const defaultTheme = { color: "var(--accent-text)", border: "rgba(99,91,255,0.3)", bg: "rgba(99,91,255,0.06)", glow: "rgba(99,91,255,0.15)" };

function themeFor(company: string) {
  const key = Object.keys(companyTheme).find(k => company.toLowerCase().startsWith(k.toLowerCase()));
  return key ? companyTheme[key] : defaultTheme;
}

const startDate = (period: string) => {
  const m = period.match(/([A-Za-z]{3}) (\d{4})/);
  return m ? new Date(`${m[1]} 1, ${m[2]}`) : new Date(0);
};
const startYear = (period: string) => period.match(/\d{4}/)?.[0] ?? "";
const endLabel  = (period: string) =>
  /present/i.test(period) ? "Now" : (period.match(/(\d{4})\s*$/)?.[1] ?? "");

/* ── Minimal timeline: one hairline, one accent, one outcome line per role ── */
function Timeline({ items, onOpen }: { items: ExperienceItem[]; onOpen: (i: ExperienceItem) => void }) {
  const sorted = [...items].sort((a, b) => startDate(b.period).getTime() - startDate(a.period).getTime());
  return (
    <ol className="relative ml-1.5 border-l border-white/10">
      {sorted.map((item, i) => (
        <motion.li
          key={item.company}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          className="relative pl-7 sm:pl-10 pb-12 last:pb-0"
        >
          <span aria-hidden="true"
            className="absolute -left-[5px] top-[9px] w-[9px] h-[9px] rounded-full"
            style={{
              background: item.current ? "var(--accent-text)" : "#06030f",
              border: `1px solid ${item.current ? "var(--accent-text)" : "rgba(255,255,255,0.45)"}`,
            }} />
          <button
            type="button"
            onClick={() => onOpen(item)}
            className="group w-full text-left grid gap-1 md:grid-cols-[11rem_1fr] md:gap-8 outline-none"
          >
            <span className="text-sm md:pt-1" style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
              {item.period.replace(/\s+–\s+/, " – ")}
            </span>
            <span className="block">
              <span className="block text-xl font-semibold leading-snug" style={{ color: "var(--text-1)" }}>
                {item.role}
              </span>
              <span className="block text-sm mt-0.5" style={{ color: "var(--text-2)" }}>
                {item.company}
              </span>
              <span className="block text-base leading-relaxed mt-3 max-w-2xl" style={{ color: "var(--text-2)" }}>
                {item.description}
              </span>
              <span className="inline-flex items-center gap-1 mt-3 text-sm transition-colors group-hover:text-[var(--accent-text)] group-focus-visible:text-[var(--accent-text)]"
                style={{ color: "var(--text-3)" }}>
                Details <ArrowUpRight size={13} />
              </span>
            </span>
          </button>
        </motion.li>
      ))}
    </ol>
  );
}

export default function Experience() {
  const [active, setActive] = useState<ExperienceItem | null>(null);

  return (
    <section id="experience" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading label="// experience" title="Work Experience"
          subtitle="Spoiler: I did not single-handedly save any of these companies. But I helped." />

        <p className="text-base mb-10 max-w-2xl" style={{ color: "var(--text-2)" }}>
          Founder, then product craft, then scale, then AI. Four steps, one arc.
        </p>
        <Timeline items={experience} onOpen={setActive} />
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {active && (() => {
          const theme = themeFor(active.company);
          return (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50"
                style={{ background: "rgba(6,3,15,0.75)", backdropFilter: "blur(4px)" }}
                onClick={() => setActive(null)}
              />
              <motion.div
                initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                className="fixed top-0 right-0 h-full z-50 overflow-y-auto overflow-x-hidden"
                style={{
                  width: "min(480px, 100vw)",
                  maxWidth: "100vw",
                  background: "rgba(8,5,20,0.98)",
                  borderLeft: `1px solid ${theme.border}`,
                  boxShadow: `-20px 0 60px rgba(0,0,0,0.6)`,
                }}
              >
                {/* Top colour bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${theme.color}, ${theme.color}44)` }} />

                {/* Header */}
                <div className="sticky top-0 z-10 flex items-start justify-between px-6 py-5"
                  style={{ background: "rgba(8,5,20,0.97)", borderBottom: `1px solid ${theme.color}22` }}>
                  <div>
                    <p className="text-xs font-mono mb-1" style={{ color: theme.color, fontFamily: "var(--font-mono)" }}>
                      {active.period} · {active.location}
                    </p>
                    <h3 className="font-black text-xl mb-0.5" style={{ color: "rgba(255,255,255,0.95)", fontFamily: "var(--font-display)" }}>
                      {active.role}
                    </h3>
                    <p className="font-bold text-base" style={{ color: theme.color }}>{active.company}</p>
                  </div>
                  <button onClick={() => setActive(null)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center mt-1 flex-shrink-0 transition-colors duration-200"
                    style={{ background: `${theme.color}18`, color: theme.color, border: `1px solid ${theme.color}33` }}
                    onMouseEnter={e => (e.currentTarget.style.background = `${theme.color}33`)}
                    onMouseLeave={e => (e.currentTarget.style.background = `${theme.color}18`)}>
                    <X size={15} />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6 flex flex-col gap-6">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs px-3 py-1.5 rounded-full"
                      style={{ background: `${theme.color}15`, color: theme.color, border: `1px solid ${theme.color}33`, fontFamily: "var(--font-mono)" }}>
                      {active.type}
                    </span>
                    {active.company.startsWith("Nogozo") && (
                      <Link href="/startup-story"
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold transition-all duration-200"
                        style={{
                          background: `${theme.color}18`,
                          color: theme.color,
                          border: `1px solid ${theme.color}55`,
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = `${theme.color}30`)}
                        onMouseLeave={e => (e.currentTarget.style.background = `${theme.color}18`)}>
                        My Startup Story <ArrowUpRight size={11} />
                      </Link>
                    )}
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                    {active.description}
                  </p>

                  <div className="h-px" style={{ background: `${theme.color}22` }} />

                  <div>
                    <p className="text-xs font-mono tracking-widest uppercase mb-4"
                      style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                      Highlights
                    </p>
                    <ul className="flex flex-col gap-3">
                      {active.bullets.map((b, i) => (
                        <motion.li key={i}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08 }}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                          style={{ color: "var(--text-2)", wordBreak: "break-word", overflowWrap: "anywhere" }}>
                          <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: theme.color }} />
                          <span>{b.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                            part.startsWith("**") && part.endsWith("**")
                              ? <strong key={j} style={{ color: theme.color, fontWeight: 700 }}>{part.slice(2, -2)}</strong>
                              : part
                          )}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {active.tags.map((tag) => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full"
                        style={{ background: `${theme.color}12`, color: theme.color, border: `1px solid ${theme.color}33`, fontFamily: "var(--font-mono)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            </>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
