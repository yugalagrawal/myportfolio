"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { X, Briefcase, ArrowUpRight, GraduationCap, Download } from "lucide-react";
import Link from "next/link";
import { experience, milestones, ExperienceItem, Milestone } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

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
  type Entry =
    | { kind: "role"; item: ExperienceItem; key: number }
    | { kind: "milestone"; m: Milestone; key: number };
  const sorted: Entry[] = [
    ...items.map((item): Entry => ({ kind: "role", item, key: endDate(item.period) })),
    ...milestones.map((m): Entry => ({ kind: "milestone", m, key: startDate(m.date).getTime() })),
  ].sort((a, b) =>
    b.key - a.key ||
    (a.kind === "role" && b.kind === "role" ? startDate(b.item.period).getTime() - startDate(a.item.period).getTime() : 0));
  let roleIdx = -1;
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

      {sorted.map((entry, i) => {
        if (entry.kind === "milestone") {
          const m = entry.m;
          return (
            <motion.li
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4 }}
              className="relative grid grid-cols-[2.5rem_1fr] md:grid-cols-[1fr_6rem_1fr] gap-x-3 md:gap-x-0 pb-8 md:pb-10"
            >
              <div className="relative col-start-1 row-start-1 md:col-start-2">
                <span
                  ref={(el) => { nodeRefs.current[i] = el; }}
                  className="absolute top-[5px] left-[15px] md:left-[calc(50%-5px)] w-2.5 h-2.5 rounded-full"
                  style={{ background: "#06030f", border: "1.5px solid rgba(255,255,255,0.55)" }}
                />
              </div>
              <p className="col-start-2 row-start-1 md:col-start-3 md:pl-6 lg:pl-10 flex flex-wrap items-center gap-x-2 text-sm">
                {m.icon === "education"
                  ? <GraduationCap size={15} aria-hidden="true" style={{ color: "var(--accent2-text)" }} />
                  : <Briefcase size={15} aria-hidden="true" style={{ color: "var(--accent2-text)" }} />}
                <span style={{ color: "var(--text-1)" }}>{m.label}</span>
                <span className="hidden sm:inline" aria-hidden="true" style={{ color: "var(--text-3)" }}>·</span>
                <span className="basis-full sm:basis-auto pl-[23px] sm:pl-0 text-xs sm:text-sm" style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>{m.detail}</span>
              </p>
            </motion.li>
          );
        }
        const item = entry.item;
        roleIdx++;
        const left = roleIdx % 2 === 0; // card on the left of the road (desktop)
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

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="experience" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading label="// experience" title="Work Experience"
          subtitle="Spoiler: I did not single-handedly save any of these companies. But I helped." />

        <p className="text-base mb-10 max-w-2xl" style={{ color: "var(--text-2)" }}>
          Founder, then scale, then AI. Three steps, one arc.
        </p>
        <Timeline items={experience} onOpen={setActive} />
      </div>

      {/* Details: a short, resume-inspired brief */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key="details-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: "rgba(6,3,15,0.72)", backdropFilter: "blur(4px)" }}
              onClick={() => setActive(null)}
            >
            <motion.div
              role="dialog" aria-modal="true" aria-label={`${active.role} at ${active.company}`}
              initial={{ opacity: 0, scale: 0.96, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg max-h-[88vh] flex flex-col overflow-hidden rounded-2xl border border-white/10"
              style={{ background: "#0a0716", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
            >
              <div className="flex items-start justify-between gap-4 px-6 sm:px-7 pt-6 sm:pt-7">
                <p className="text-xs pt-2" style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                  {active.period} · {active.location}
                </p>
                <button type="button" onClick={() => setActive(null)} aria-label="Close details"
                  className="-mt-1 -mr-2 w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-white/5"
                  style={{ color: "var(--text-2)" }}>
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 sm:px-7 pb-6 sm:pb-8 flex-1 overflow-y-auto">
                <h3 className="text-xl sm:text-2xl font-bold leading-snug mt-1" style={{ color: "var(--text-1)" }}>{active.role}</h3>
                <p className="text-sm mt-1" style={{ color: "var(--accent2-text)" }}>{active.company}</p>

                <p className="mt-4 sm:mt-6 text-base leading-relaxed" style={{ color: "var(--text-2)" }}>{active.description}</p>

                <ul className="mt-4 sm:mt-6 pt-4 sm:pt-6 space-y-3 sm:space-y-4 border-t border-white/10">
                  {active.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-[15px] leading-relaxed" style={{ color: "var(--text-2)" }}>
                      <span aria-hidden="true" className="mt-[10px] w-1 h-1 rounded-full shrink-0" style={{ background: "rgba(255,255,255,0.4)" }} />
                      <span>{b.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                        part.startsWith("**") && part.endsWith("**")
                          ? <strong key={j} className="font-semibold" style={{ color: "var(--text-1)" }}>{part.slice(2, -2)}</strong>
                          : part
                      )}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 sm:px-7 py-4 sm:py-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
                <a href={profile.resumeUrl} download={profile.resumeFileName}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 min-h-[36px] rounded-lg border border-white/15 transition-colors hover:border-white/30 hover:text-white"
                  style={{ color: "var(--text-2)" }}>
                  <Download size={13} /> Resume for details
                </a>
                {active.company.startsWith("Nogozo") && (
                  <Link href="/startup-story"
                    className="inline-flex items-center gap-1 text-sm transition-colors hover:text-white"
                    style={{ color: "var(--accent-text)" }}>
                    My startup story <ArrowUpRight size={13} />
                  </Link>
                )}
              </div>
            </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
