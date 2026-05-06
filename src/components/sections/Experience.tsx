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

const defaultTheme = { color: "#635bff", border: "rgba(99,91,255,0.3)", bg: "rgba(99,91,255,0.06)", glow: "rgba(99,91,255,0.15)" };

/* ── Truck animation ── */
function TruckAnimation({ color }: { color: string }) {
  return (
    <div className="relative w-full h-14 overflow-hidden flex items-end">
      {/* Road */}
      <div className="absolute bottom-2 left-0 right-0 h-px" style={{ background: `${color}33` }} />
      {/* Moving dashes */}
      <motion.div className="absolute bottom-2 flex gap-4"
        animate={{ x: [0, -56] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-5 h-px flex-shrink-0" style={{ background: `${color}55` }} />
        ))}
      </motion.div>
      {/* Truck — cabin on RIGHT (facing right, moving left→right) */}
      <motion.div className="absolute bottom-3" style={{ left: 0 }}
        animate={{ x: ["-130%", "160%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
        <svg width="72" height="30" viewBox="0 0 72 30" fill="none">
          {/* Cargo (left/back) */}
          <rect x="4"  y="3"  width="46" height="20" rx="2" fill={`${color}22`} stroke={color} strokeWidth="1.2" />
          {/* Cabin (right/front) */}
          <rect x="52" y="10" width="18" height="13" rx="2" fill={`${color}33`} stroke={color} strokeWidth="1.2" />
          {/* Windshield (front-facing right) */}
          <rect x="60" y="12" width="8"  height="8"  rx="1" fill={`${color}55`} />
          {/* Exhaust pipe on top of cabin */}
          <rect x="54" y="6"  width="3"  height="5"  rx="1" fill={`${color}44`} stroke={color} strokeWidth="1" />
          {/* Wheels */}
          <circle cx="14" cy="26" r="3.5" fill={`${color}22`} stroke={color} strokeWidth="1.2" />
          <circle cx="34" cy="26" r="3.5" fill={`${color}22`} stroke={color} strokeWidth="1.2" />
          <circle cx="62" cy="26" r="3.5" fill={`${color}22`} stroke={color} strokeWidth="1.2" />
          {/* Speed lines trailing behind (left side) */}
          <line x1="3" y1="9"  x2="10" y2="9"  stroke={`${color}44`} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="1" y1="13" x2="10" y2="13" stroke={`${color}33`} strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      </motion.div>
    </div>
  );
}

/* ── RTB / AdTech animation ── */
const barHeights = [
  [28, 44, 20, 36],
  [40, 20, 44, 28],
  [20, 36, 28, 44],
  [44, 28, 36, 20],
  [32, 44, 24, 40],
  [44, 24, 40, 32],
  [28, 40, 44, 20],
];

function DataAnimation({ color }: { color: string }) {
  return (
    <div className="flex items-end justify-center gap-1.5 w-full h-14 px-2 pb-1">
      {barHeights.map((heights, i) => (
        <motion.div key={i} className="w-3 rounded-t flex-shrink-0"
          style={{ background: `${color}33`, border: `1px solid ${color}66` }}
          animate={{ height: heights.map(h => `${h}px`) }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
      {/* Bid price tag */}
      <motion.div className="absolute"
        animate={{ opacity: [0, 1, 1, 0], y: [-4, -8, -12, -16] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        style={{ fontSize: "9px", color, fontFamily: "monospace", marginBottom: "2px" }}>
        $2.4
      </motion.div>
    </div>
  );
}

/* ── Bookshelf animation (Nogozo) ── */
const shelfBooks = [
  { x: 6,   w: 12, h: 30, shade: "55" },
  { x: 20,  w: 9,  h: 22, shade: "33" },
  { x: 31,  w: 14, h: 32, shade: "44" },
  { x: 47,  w: 10, h: 26, shade: "2a" },
  { x: 59,  w: 11, h: 20, shade: "55" }, // picked-up book
  { x: 72,  w: 13, h: 29, shade: "33" },
  { x: 87,  w: 9,  h: 23, shade: "44" },
  { x: 98,  w: 14, h: 31, shade: "2a" },
  { x: 114, w: 10, h: 24, shade: "55" },
  { x: 126, w: 12, h: 28, shade: "33" },
  { x: 140, w: 13, h: 22, shade: "44" },
];

const SHELF_Y = 43;

function BookAnimation({ color }: { color: string }) {
  return (
    <div className="flex items-center justify-center w-full h-14 px-1">
      <svg width="158" height="50" viewBox="0 0 158 50" fill="none">

        {shelfBooks.map((b, i) => {
          const topY = SHELF_Y - b.h;
          const isFloating = i === 4;
          return (
            <motion.g key={i}
              animate={{ y: isFloating ? [0, -7, 0] : [0, i % 2 === 0 ? -1 : -0.5, 0] }}
              transition={isFloating
                ? { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
                : { duration: 2.6 + i * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }
              }
            >
              {/* Book spine / body */}
              <rect x={b.x} y={topY} width={b.w} height={b.h} rx="1"
                fill={`${color}${b.shade}`} stroke={`${color}77`} strokeWidth="0.8" />
              {/* Top cap — gives slight 3-D depth */}
              <rect x={b.x + 1} y={topY} width={b.w - 2} height="2.5" rx="0.5"
                fill={`${color}88`} />
              {/* Spine centre line */}
              {b.h > 23 && (
                <line
                  x1={b.x + Math.round(b.w / 2)} y1={topY + 6}
                  x2={b.x + Math.round(b.w / 2)} y2={SHELF_Y - 5}
                  stroke={`${color}33`} strokeWidth="0.8"
                />
              )}
            </motion.g>
          );
        })}

        {/* Shelf board */}
        <rect x="2" y={SHELF_Y} width="154" height="5" rx="1.5"
          fill={`${color}1a`} stroke={`${color}55`} strokeWidth="0.9" />
        {/* Shelf shadow line */}
        <line x1="2" y1="49" x2="156" y2="49" stroke={`${color}18`} strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function CompanyVisual({ company, color }: { company: string; color: string }) {
  if (company === "LetsTransport") return <TruckAnimation color={color} />;
  if (company === "Media.net")     return <DataAnimation  color={color} />;
  if (company === "Nogozo")        return <BookAnimation  color={color} />;
  return null;
}

export default function Experience() {
  const [active, setActive] = useState<ExperienceItem | null>(null);

  return (
    <section id="experience" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading label="// experience" title="Work Experience"
          subtitle="Spoiler: I did not single-handedly save any of these companies. But I helped." />

        <div className="flex flex-col gap-4">
          {experience.map((item, i) => {
            const theme = companyTheme[item.company] ?? defaultTheme;
            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                onClick={() => setActive(item)}
                className="w-full text-left rounded-2xl overflow-hidden group transition-all duration-300"
                style={{
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  boxShadow: `0 0 0 0 ${theme.glow}`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${theme.glow}`;
                  (e.currentTarget as HTMLElement).style.borderColor = theme.color + "66";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = theme.border;
                }}
              >
                {/* Gradient top bar */}
                <div className="h-0.5 w-full"
                  style={{ background: `linear-gradient(90deg, ${theme.color}, ${theme.color}44, transparent)` }} />

                <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-center gap-4">
                  {/* Left — role / company / meta */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <motion.div className="w-3 h-3 rounded-full border-2"
                        style={{
                          borderColor: theme.color,
                          background: item.current ? theme.color : "transparent",
                          boxShadow: item.current ? `0 0 10px ${theme.color}` : "none",
                        }}
                        animate={item.current ? { boxShadow: [`0 0 6px ${theme.color}`, `0 0 14px ${theme.color}`, `0 0 6px ${theme.color}`] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-sm sm:text-base" style={{ color: "rgba(255,255,255,0.92)" }}>
                          {item.role}
                        </span>
                        {item.current && (
                          <span className="text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{ background: `${theme.color}18`, color: theme.color, border: `1px solid ${theme.color}44` }}>
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs"
                        style={{ fontFamily: "var(--font-mono)" }}>
                        <span className="font-bold text-sm" style={{ color: theme.color }}>{item.company}</span>
                        <span className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.28)" }}>
                          <Briefcase size={9} />{item.period}
                        </span>
                        <span className="flex items-center gap-1" style={{ color: "rgba(255,255,255,0.28)" }}>
                          <MapPin size={9} />{item.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Middle — animated visual */}
                  <div className="hidden md:block w-48 flex-shrink-0 relative">
                    <CompanyVisual company={item.company} color={theme.color} />
                  </div>

                  {/* Right — one-liner + arrow */}
                  <div className="hidden sm:flex items-center gap-3 flex-shrink-0 max-w-[220px]">
                    <p className="text-xs text-right leading-snug" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {item.description}
                    </p>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                      style={{ background: `${theme.color}18`, border: `1px solid ${theme.color}33` }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke={theme.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {active && (() => {
          const theme = companyTheme[active.company] ?? defaultTheme;
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
                className="fixed top-0 right-0 h-full z-50 overflow-y-auto"
                style={{
                  width: "min(480px, 100vw)",
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
                    {active.company === "Nogozo" && (
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

                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {active.description}
                  </p>

                  <div className="h-px" style={{ background: `${theme.color}22` }} />

                  <div>
                    <p className="text-xs font-mono tracking-widest uppercase mb-4"
                      style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>
                      Highlights
                    </p>
                    <ul className="flex flex-col gap-3">
                      {active.bullets.map((b, i) => (
                        <motion.li key={i}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.08 }}
                          className="flex items-start gap-3 text-sm leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.65)" }}>
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
