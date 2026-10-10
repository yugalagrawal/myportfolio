"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
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

function YearRange({ period, current, className }: { period: string; current?: boolean; className: string }) {
  const ys = period.match(/\d{4}/g) ?? [];
  const start = ys[0] ?? "";
  const end = /present/i.test(period) ? "Now" : (ys[1] ?? start);
  return (
    <span className={`${className} font-black leading-none tracking-tight whitespace-nowrap ${current ? "gradient-text" : ""}`}
      style={{ fontFamily: "var(--font-display)", color: current ? undefined : "var(--text-1)" }}>
      {start}
      <span className="mx-[0.18em] font-light" style={{ opacity: 0.45 }}>–</span>
      {end}
    </span>
  );
}

/* ── Journey map: cards on alternating sides of a winding, scroll-drawn road ── */
function Timeline({ items, onOpen }: { items: ExperienceItem[]; onOpen: (i: ExperienceItem) => void }) {
  const sorted = [...items].sort((a, b) => startDate(b.period).getTime() - startDate(a.period).getTime());
  const wrapRef  = useRef<HTMLOListElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [road, setRoad] = useState({ d: "", w: 0, h: 0 });
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 75%", "end 55%"] });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Build the road from the real node positions (offset-based, so entrance transforms don't skew it).
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const measure = () => {
      const pts = nodeRefs.current.filter((n): n is HTMLSpanElement => !!n).map((n) => {
        let x = n.offsetWidth / 2, y = n.offsetHeight / 2;
        let el: HTMLElement | null = n;
        while (el && el !== wrap) { x += el.offsetLeft; y += el.offsetTop; el = el.offsetParent as HTMLElement | null; }
        return { x, y };
      });
      if (pts.length < 2) return;
      let d = `M ${pts[0].x} 0 L ${pts[0].x} ${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i], b = pts[i + 1], m = (a.y + b.y) / 2;
        d += ` C ${a.x} ${m}, ${b.x} ${m}, ${b.x} ${b.y}`;
      }
      d += ` L ${pts[pts.length - 1].x} ${wrap.offsetHeight}`;
      setRoad({ d, w: wrap.offsetWidth, h: wrap.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [sorted.length]);

  return (
    <ol ref={wrapRef} className="relative">
      {road.d && (
        <svg className="absolute inset-0 pointer-events-none" width={road.w} height={road.h}
          viewBox={`0 0 ${road.w} ${road.h}`} fill="none" aria-hidden="true">
          <defs>
            <linearGradient id="road-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8b85ff" />
              <stop offset="1" stopColor="#a78bfa" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          {/* the road */}
          <path d={road.d} stroke="rgba(255,255,255,0.05)" strokeWidth="22" strokeLinecap="round" />
          {/* lane marking */}
          <path d={road.d} stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeDasharray="6 9" strokeLinecap="round" />
          {/* progress, drawn as you scroll */}
          <motion.path d={road.d} stroke="url(#road-grad)" strokeWidth="3" strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : drawn, filter: "drop-shadow(0 0 6px rgba(139,133,255,0.55))" }} />
        </svg>
      )}

      {sorted.map((item, i) => {
        const left = i % 2 === 0; // card on the left of the road (desktop)
        return (
          <motion.li
            key={item.company}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="relative grid grid-cols-[2.5rem_1fr] md:grid-cols-[1fr_6rem_1fr] gap-x-3 md:gap-x-0 pb-10 md:pb-14 last:pb-0"
          >
            {/* Road column: node + connector */}
            <div className="relative col-start-1 row-start-1 md:col-start-2">
              <span
                ref={(el) => { nodeRefs.current[i] = el; }}
                className={`absolute top-8 w-3.5 h-3.5 rounded-full ${left ? "left-[6px] md:left-[calc(50%-34px)]" : "left-[20px] md:left-[calc(50%+20px)]"}`}
                style={{
                  background: item.current ? "var(--accent-text)" : "#06030f",
                  border: `2px solid ${item.current ? "var(--accent-text)" : "rgba(167,139,250,0.7)"}`,
                  boxShadow: item.current ? "0 0 0 5px rgba(139,133,255,0.18), 0 0 18px rgba(139,133,255,0.6)" : "none",
                }}
              />
              <span aria-hidden="true"
                className={`hidden md:block absolute top-[39px] h-px border-t border-dashed border-white/20 ${left ? "left-0 w-[calc(50%-27px)]" : "left-[calc(50%+27px)] right-0"}`} />
            </div>

            {/* Big date on the open side of the road (desktop) */}
            <div className={`hidden md:flex ${left ? "col-start-3" : "col-start-1"} row-start-1 flex-col justify-start pt-3 ${left ? "items-start pl-6 lg:pl-10" : "items-end pr-6 lg:pr-10 text-right"}`}>
              <YearRange period={item.period} current={item.current} className="text-5xl lg:text-6xl" />
              <span className="text-sm mt-2" style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                {item.period}
              </span>
            </div>

            {/* Card */}
            <button
              type="button"
              onClick={() => onOpen(item)}
              className={`group col-start-2 row-start-1 ${left ? "md:col-start-1" : "md:col-start-3"} text-left w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 transition duration-200 hover:bg-white/[0.05] hover:border-[#8b85ff99] hover:-translate-y-0.5 focus-visible:border-[#8b85ff99] outline-none`}
            >
              <span className="md:hidden flex items-baseline flex-wrap gap-x-3 gap-y-1 mb-3">
                <YearRange period={item.period} current={item.current} className="text-3xl" />
                <span className="text-xs" style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                  {item.period}
                </span>
              </span>
              {item.current && (
                <span className="inline-block text-xs px-2 py-0.5 rounded-full mb-2"
                  style={{ background: "rgba(139,133,255,0.14)", color: "var(--accent-text)", border: "1px solid rgba(139,133,255,0.35)", fontFamily: "var(--font-mono)" }}>
                  Current
                </span>
              )}
              <span className="block text-lg font-semibold leading-snug" style={{ color: "var(--text-1)" }}>
                {item.role}
              </span>
              <span className="block text-sm mt-0.5" style={{ color: "var(--accent2-text)" }}>
                {item.company}
              </span>
              <span className="block text-sm leading-relaxed mt-3" style={{ color: "var(--text-2)" }}>
                {item.description}
              </span>
              <span className="inline-flex items-center gap-1 mt-3 text-xs transition-colors group-hover:text-[var(--accent-text)]"
                style={{ color: "var(--text-3)" }}>
                Details <ArrowUpRight size={12} />
              </span>
            </button>
          </motion.li>
        );
      })}
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
