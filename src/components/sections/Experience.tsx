"use client";

import { useState, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { X, MapPin, Briefcase, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { experience, ExperienceItem } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";

const defaultTheme = { color: "var(--accent-text)", border: "rgba(99,91,255,0.3)", bg: "rgba(99,91,255,0.06)", glow: "rgba(99,91,255,0.15)" };

/** One accent for the whole section, so the timeline and the drawer match. */
const themeFor = (_company: string) => defaultTheme;

const startDate = (period: string) => {
  const m = period.match(/([A-Za-z]{3}) (\d{4})/);
  return m ? new Date(`${m[1]} 1, ${m[2]}`) : new Date(0);
};
/** Most recent finish first; a current role ("Present") always leads. */
const endDate = (period: string) => {
  if (/present/i.test(period)) return Infinity;
  const all = [...period.matchAll(/([A-Za-z]{3}) (\d{4})/g)];
  const last = all[all.length - 1];
  return last ? new Date(`${last[1]} 1, ${last[2]}`).getTime() : 0;
};

const MONTHS: Record<string, number> = { Jan:0, Feb:1, Mar:2, Apr:3, May:4, Jun:5, Jul:6, Aug:7, Sep:8, Oct:9, Nov:10, Dec:11 };

/** "Jun 2023 – May 2026" -> { start: "2023", end: "2026", span: "2y 11m" } (current roles end at today) */
function parseRange(period: string) {
  const parts = [...period.matchAll(/([A-Za-z]{3}) (\d{4})/g)].map(m => ({ m: MONTHS[m[1]] ?? 0, y: Number(m[2]) }));
  const first = parts[0], last = parts[1];
  const now = new Date();
  const current = /present/i.test(period);
  const end = current ? { m: now.getMonth(), y: now.getFullYear() } : (last ?? first);
  const months = Math.max(1, (end.y - first.y) * 12 + (end.m - first.m) + 1);
  const yrs = Math.floor(months / 12), mo = months % 12;
  const span = months < 12
    ? `${months} mo`
    : `${yrs} ${yrs === 1 ? "yr" : "yrs"}${mo ? ` ${mo} mo` : ""}`;
  return { start: String(first.y), end: current ? "Now" : String(end.y), span };
}

/** Big start year, with the tenure and exact months written small underneath. */
function YearStamp({ period, current, size, align = "left" }: { period: string; current?: boolean; size: string; align?: "left" | "right" }) {
  const { start, span } = parseRange(period);
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <span className={`block ${size} font-black leading-none tracking-tight ${current ? "gradient-text" : ""}`}
        style={{ fontFamily: "var(--font-display)", color: current ? undefined : "var(--text-1)" }}>
        {start}
      </span>
      <span className="block text-xs mt-2 tracking-wide" style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }} suppressHydrationWarning>
        <span style={{ color: "var(--text-2)" }}>{span}</span>
        <span aria-hidden="true"> · </span>
        {period}
      </span>
    </div>
  );
}

/* ── Journey map: cards on alternating sides of a winding, scroll-drawn road ── */
function Timeline({ items, onOpen }: { items: ExperienceItem[]; onOpen: (i: ExperienceItem) => void }) {
  const sorted = [...items].sort((a, b) => endDate(b.period) - endDate(a.period) || startDate(b.period).getTime() - startDate(a.period).getTime());
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

            {/* Big start year on the open side of the road (desktop) */}
            <div className={`hidden md:flex ${left ? "col-start-3" : "col-start-1"} row-start-1 flex-col pt-4 ${left ? "items-start pl-6 lg:pl-10" : "items-end pr-6 lg:pr-10"}`}>
              <YearStamp period={item.period} current={item.current} size="text-5xl lg:text-6xl" align={left ? "left" : "right"} />
            </div>

            {/* Card */}
            <button
              type="button"
              onClick={() => onOpen(item)}
              className={`group col-start-2 row-start-1 ${left ? "md:col-start-1" : "md:col-start-3"} text-left w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 transition duration-200 hover:bg-white/[0.05] hover:border-[#8b85ff99] hover:-translate-y-0.5 focus-visible:border-[#8b85ff99] outline-none`}
            >
              <span className="md:hidden block mb-4">
                <YearStamp period={item.period} current={item.current} size="text-4xl" />
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
              <span className="flex flex-wrap gap-1.5 mt-4">
                {item.keywords.map((k) => (
                  <span key={k} className="text-xs px-2.5 py-1 rounded-full border border-white/10"
                    style={{ color: "var(--text-2)", background: "rgba(255,255,255,0.03)" }}>
                    {k}
                  </span>
                ))}
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
                    {active.keywords.map((tag) => (
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
