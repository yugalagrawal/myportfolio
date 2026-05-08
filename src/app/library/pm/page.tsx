"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle, BookOpen,
  Clock, Award, Menu, X, ChevronRight, Zap, Target,
  TrendingUp, Code, Brain, Sparkles, RotateCcw, Mail,
  Layers, Star,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════ */

/* ── accent palette (shared everywhere) ── */
const PRI  = "#635bff";
const VIO  = "#8b5cf6";
const TEAL = "#0d9488";
const AMB  = "#d97706";
const ROSE = "#db2777";
const EMR  = "#059669";

/* ── light reading area ── */
const BG      = "#f5f4ff";
const SURFACE = "#ffffff";
const CARD    = "#eeeef8";
const BORDER  = "rgba(99,91,255,0.12)";
const BORDER2 = "rgba(99,91,255,0.2)";
const WHITE   = "#111827";          // headings (dark)
const TEXT    = "#374151";          // body text
const MUTED   = "#6b7280";          // secondary text
const DIM     = "#9ca3af";          // tertiary text
const BTN     = "#fff";             // text on coloured buttons

/* ── dark splash screens (landing · cover · completion) ── */
const D_BG      = "#07091a";
const D_SURFACE = "#0d1025";
const D_CARD    = "#111630";
const D_BORDER  = "rgba(255,255,255,0.07)";
const D_BORDER2 = "rgba(255,255,255,0.12)";
const D_WHITE   = "rgba(255,255,255,0.93)";
const D_TEXT    = "rgba(255,255,255,0.72)";
const D_MUTED   = "rgba(255,255,255,0.35)";
const D_DIM     = "rgba(255,255,255,0.18)";

/* ── sidebar specific ── */
const SB_BG     = "#10112a";
const SB_BORDER = "rgba(255,255,255,0.07)";

/* ═══════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════ */
type BlockType =
  | { t: "p";     txt: string }
  | { t: "h2";    txt: string }
  | { t: "h3";    txt: string }
  | { t: "h4";    txt: string }
  | { t: "callout"; color?: string; title?: string; txt: string }
  | { t: "quote"; txt: string; author?: string }
  | { t: "ol";    items: string[] }
  | { t: "ul";    items: string[] }
  | { t: "code";  code: string; lang?: string }
  | { t: "table"; heads: string[]; rows: string[][] }
  | { t: "tip";   txt: string }
  | { t: "warn";  txt: string }
  | { t: "img";   label: string; desc: string; src?: string; caption?: string }
  | { t: "video"; youtubeId: string; caption?: string }
  | { t: "practice" }
  | { t: "divider" }
  | { t: "furtherread"; title: string; url: string; source?: string; desc?: string };

type PracticeQ = {
  num: number;
  title: string;
  prompt: string;
  blocks: BlockType[];
};

type Category = "foundation" | "metrics" | "strategy" | "design" | "technical";

type Chapter = {
  id: string;
  num: number | string;
  title: string;
  emoji: string;
  readTime: string;
  category: Category;
  blocks: BlockType[];
};

const CAT_COLOR: Record<Category, string> = {
  foundation: PRI,
  metrics:    TEAL,
  strategy:   AMB,
  design:     ROSE,
  technical:  EMR,
};
const CAT_LABEL: Record<Category, string> = {
  foundation: "Foundation",
  metrics:    "Metrics & Frameworks",
  strategy:   "Strategy",
  design:     "Design Thinking",
  technical:  "Technical",
};
const CAT_ICON: Record<Category, typeof BookOpen> = {
  foundation: Target,
  metrics:    TrendingUp,
  strategy:   Zap,
  design:     Sparkles,
  technical:  Code,
};

/* ═══════════════════════════════════════════════════
   INLINE TEXT RENDERER  (**bold**, *italic*, `code`)
═══════════════════════════════════════════════════ */
function ri(txt: string): React.ReactNode {
  const parts = txt.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**"))
      return <strong key={i} style={{ color: WHITE, fontWeight: 700 }}>{p.slice(2, -2)}</strong>;
    if (p.startsWith("*") && p.endsWith("*"))
      return <em key={i} style={{ color: WHITE }}>{p.slice(1, -1)}</em>;
    if (p.startsWith("`") && p.endsWith("`"))
      return <code key={i} className="px-1.5 py-0.5 rounded text-xs mx-0.5"
        style={{ background: "rgba(99,91,255,0.18)", color: "#a5b4fc", fontFamily: "var(--font-mono)" }}>{p.slice(1, -1)}</code>;
    return p;
  });
}

/* ═══════════════════════════════════════════════════
   BLOCK RENDERER
═══════════════════════════════════════════════════ */
function renderBlocks(blocks: BlockType[], accent: string) {
  return blocks.map((b, i) => {
    switch (b.t) {
      case "p":
        return <p key={i} className="mb-5 leading-[1.9] text-[16px]" style={{ color: TEXT }}>{ri(b.txt)}</p>;

      case "h2":
        return (
          <h2 key={i} className="text-2xl font-black mb-3 mt-10 leading-tight tracking-tight"
            style={{ color: WHITE, borderBottom: `1px solid ${BORDER}`, paddingBottom: "0.6rem" }}>
            {b.txt}
          </h2>
        );

      case "h3":
        return <h3 key={i} className="text-lg font-bold mb-2 mt-7" style={{ color: WHITE }}>{b.txt}</h3>;

      case "h4":
        return <h4 key={i} className="text-base font-semibold mb-2 mt-5" style={{ color: WHITE }}>{b.txt}</h4>;

      case "callout": {
        const cc = b.color ?? accent;
        return (
          <div key={i} className="my-5 rounded-xl px-5 py-4"
            style={{ background: `${cc}10`, border: `1px solid ${cc}28`, borderLeft: `3px solid ${cc}` }}>
            {b.title && (
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2"
                style={{ color: cc, fontFamily: "var(--font-mono)" }}>{b.title}</p>
            )}
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: TEXT }}>{ri(b.txt)}</p>
          </div>
        );
      }

      case "quote":
        return (
          <blockquote key={i} className="my-6 px-5 py-4 rounded-xl italic"
            style={{ background: `${accent}08`, borderLeft: `3px solid ${accent}80` }}>
            <p className="text-[15px] leading-[1.8]" style={{ color: TEXT }}>{b.txt}</p>
            {b.author && <p className="text-xs mt-2 font-semibold not-italic" style={{ color: accent }}>— {b.author}</p>}
          </blockquote>
        );

      case "ol":
        return (
          <ol key={i} className="mb-4 space-y-2 ml-4 list-decimal">
            {b.items.map((item, j) => (
              <li key={j} className="text-[14px] leading-relaxed pl-1" style={{ color: TEXT }}>{ri(item)}</li>
            ))}
          </ol>
        );

      case "ul":
        return (
          <ul key={i} className="mb-4 space-y-2">
            {b.items.map((item, j) => (
              <li key={j} className="flex items-start gap-3 text-[14px] leading-relaxed" style={{ color: TEXT }}>
                <span className="mt-[7px] flex-shrink-0 rounded-full w-1.5 h-1.5" style={{ background: accent }} />
                <span>{ri(item)}</span>
              </li>
            ))}
          </ul>
        );

      case "code":
        return (
          <div key={i} className="my-5 rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER2}` }}>
            {b.lang && (
              <div className="px-4 py-2.5 flex items-center gap-2 border-b" style={{ background: CARD, borderColor: BORDER }}>
                <div className="flex gap-1.5">
                  {["#ff5f57","#febc2e","#28c840"].map((c, ci) => <div key={ci} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}
                </div>
                <span className="ml-2 text-[10px] font-mono uppercase tracking-widest" style={{ color: MUTED }}>{b.lang}</span>
              </div>
            )}
            <pre className="px-6 py-5 text-sm overflow-x-auto leading-[1.8]"
              style={{ background: "#060818", color: "#a5b4fc", fontFamily: "var(--font-mono)" }}>
              <code>{b.code}</code>
            </pre>
          </div>
        );

      case "table":
        return (
          <div key={i} className="my-5 overflow-x-auto rounded-xl" style={{ border: `1px solid ${BORDER}` }}>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ background: CARD }}>
                  {b.heads.map((h, j) => (
                    <th key={j} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap"
                      style={{ color: accent, borderBottom: `1px solid ${BORDER}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, j) => (
                  <tr key={j} style={{ borderBottom: j < b.rows.length - 1 ? `1px solid ${BORDER}` : "none",
                    background: j % 2 ? "rgba(255,255,255,0.015)" : "transparent" }}>
                    {row.map((cell, k) => (
                      <td key={k} className="px-4 py-3 text-[13px] leading-relaxed align-top" style={{ color: TEXT }}>{ri(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "tip":
        return (
          <div key={i} className="my-4 rounded-xl px-5 py-4 flex items-start gap-3"
            style={{ background: `${TEAL}0e`, border: `1px solid ${TEAL}22` }}>
            <span className="text-base flex-shrink-0 mt-0.5">💡</span>
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: TEXT }}>{ri(b.txt)}</p>
          </div>
        );

      case "warn":
        return (
          <div key={i} className="my-4 rounded-xl px-5 py-4 flex items-start gap-3"
            style={{ background: `${AMB}0e`, border: `1px solid ${AMB}22` }}>
            <span className="text-base flex-shrink-0 mt-0.5">⚠️</span>
            <p className="text-sm leading-relaxed" style={{ color: TEXT }}>{ri(b.txt)}</p>
          </div>
        );

      case "img":
        return b.src ? (
          <figure key={i} className="my-8">
            <div className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${BORDER2}`, background: CARD }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.src} alt={b.label}
                style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            {(b.caption || b.label) && (
              <figcaption className="mt-2.5 text-center text-xs leading-relaxed"
                style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
                {b.caption ?? b.label}
              </figcaption>
            )}
          </figure>
        ) : (
          <div key={i} className="my-6 rounded-xl flex flex-col items-center justify-center py-10 px-6 text-center"
            style={{ background: CARD, border: `2px dashed ${BORDER2}` }}>
            <span className="text-3xl mb-3">🖼️</span>
            <p className="text-xs font-semibold mb-1" style={{ color: accent, fontFamily: "var(--font-mono)" }}>{b.label}</p>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: MUTED }}>{b.desc}</p>
          </div>
        );

      case "video":
        return (
          <figure key={i} className="my-8">
            <div className="rounded-2xl overflow-hidden relative"
              style={{ border: `1px solid ${BORDER2}`, background: "#000", paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${b.youtubeId}?rel=0&modestbranding=1`}
                title={b.caption ?? "Video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
              />
            </div>
            {b.caption && (
              <figcaption className="mt-2.5 text-center text-xs leading-relaxed"
                style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
                {b.caption}
              </figcaption>
            )}
          </figure>
        );

      case "practice":
        return <PracticeSection key={i} accent={accent} />;

      case "divider":
        return <hr key={i} className="my-8" style={{ borderColor: BORDER }} />;

      case "furtherread":
        return (
          <a key={i} href={b.url} target="_blank" rel="noopener noreferrer"
            className="flex items-start gap-4 my-6 rounded-2xl p-4 group transition-all duration-200 no-underline"
            style={{ background: `${accent}08`, border: `1px solid ${accent}22`, textDecoration: "none" }}>
            <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center mt-0.5"
              style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono tracking-widest uppercase mb-1" style={{ color: accent, fontFamily: "var(--font-mono)" }}>
                📖 Recommended Read{b.source ? ` · ${b.source}` : ""}
              </p>
              <p className="text-sm font-semibold leading-snug group-hover:underline" style={{ color: WHITE, textDecoration: "none" }}>
                {b.title}
              </p>
              {b.desc && <p className="text-xs mt-1 leading-relaxed" style={{ color: MUTED }}>{b.desc}</p>}
            </div>
            <svg className="flex-shrink-0 mt-1 opacity-40 group-hover:opacity-80 transition-opacity" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </a>
        );

      default:
        return null;
    }
  });
}

/* ═══════════════════════════════════════════════════
   CHAPTER DATA
═══════════════════════════════════════════════════ */
const CHAPTERS: Chapter[] = [
  /* ── 1 ──────────────────────────────────────── */
  {
    id:"ch1", num:1, emoji:"🎯", readTime:"8 min", category:"foundation",
    title:"Who is a Product Manager, Are you?",
    blocks:[
      {t:"p",txt:"A product manager is responsible for three core things:"},
      {t:"ol",items:["Identifying the problem. **(WHAT?)**","Understanding why the problem exists. **(WHY?)**","Developing solutions to solve the problem. **(HOW?)**"]},
      {t:"p",txt:"This is a multi-functional role where the PM works across engineering, design, data analytics, business, and marketing to fulfil one or all of the above three points."},
      {t:"h2",txt:"The Art of Prioritization (AOP)"},
      {t:"p",txt:"AOP is an essential skill for a PM. As a PM, you may face multiple problems, various reasons for their existence, and numerous solutions. What should you do in situations that occur almost 99% of the time?"},
      {t:"p",txt:"You need to choose the most important (or impactful) problem, identify the most significant reason behind it, and work on the most effective solution. This thought process is called AOP."},
      {t:"callout",title:"Key Insight",txt:"AOP results from your **general awareness, user empathy, and data-driven, evidence-based approaches** — not from what's flashy or based on gut feelings."},
      {t:"tip",txt:"More on Prioritization Frameworks in Chapter 10."},
      {t:"h2",txt:"Build What Your Users Ask? Absolutely Not!"},
      {t:"p",txt:"Users might suggest they need X feature or Y feature. As a PM with empathy, you listen to them — but delivering exactly what they ask for isn't your task. User empathy is often misunderstood in the PM world."},
      {t:"quote",txt:"Consider yourself a doctor and your users as patients. Whatever they are saying about their problems is not the actual issue; they are merely describing the symptoms. It's your responsibility to make sense of the symptoms and ask smart questions to narrow down your diagnosis.\n\nChest pain can be a symptom of gastric conditions or a heart attack. Imagine the consequences if you prescribe incorrectly."},
      {t:"h2",txt:"P for Product; M for Management!"},
      {t:"p",txt:"In PM, management stands for **People & Processes**. As a PM, you work with multiple functions in the organization (people), and to ensure smooth cross-functionality, you need processes. These are not rigid rules but elements that impact the **North Star Metric** of your product delivery — a blend of speed and quality."},
      {t:"h2",txt:"Required Skills for Being a Great PM"},
      {t:"ol",items:["**Thinking Spectrum** — from first principles to moon-shot vision","**Verbal & Written Communication** — being a jargon-free PM","**Data Analytics & Statistics** — not just understanding maths but making sense of the data","**Product Design** — distinguishing between bad UI/UX and good UI/UX","**Business Awareness & Adaptability** — e.g., understanding AI is now essential for a PM"]},
    ]
  },

  /* ── 2 ──────────────────────────────────────── */
  {
    id:"ch2", num:2, emoji:"🔄", readTime:"6 min", category:"foundation",
    title:"System Thinking",
    blocks:[
      {t:"p",txt:"**System Thinking** provides a perspective for considering the second and third-order effects of how systems work. This approach goes beyond simple, linear cause-and-effect thinking. Products exist within ecosystems interconnected with several other systems."},
      {t:"callout",title:"Think About This",txt:"How have carpool products reduced drunk driving accidents? That's system thinking in action — an indirect, second-order effect."},
      {t:"h2",txt:"Bottlenecks"},
      {t:"p",txt:"A restriction or constriction in a system that limits the overall system's performance or capacity."},
      {t:"callout",color:"#1877f2",title:"Facebook Example",txt:"You might increase advertisements to onboard more people on Facebook. That's not a bad approach, but is it optimal?\n\nFacebook's famous **\"Get 7 Friends in 10 Days\"** insight made users far more likely to become regulars — which attracted even more users. That's the bottleneck a great PM focuses on."},
      {t:"h2",txt:"Feedback Loops"},
      {t:"p",txt:"Functions within systems where the output from one component becomes the input for another. Can be **positive** (amplifying) or **negative** (reducing a system behaviour)."},
      {t:"callout",color:"#1ed760",title:"Spotify — Positive Loop",txt:"Play Genre X → Suggested Genre X again → Listen → Algorithm learns → Suggests even more Genre X. Each iteration strengthens the loop."},
      {t:"callout",color:"#ff9900",title:"Amazon Marketplace — Business Loop",txt:"Get sellers → Attract customers → Good products attract more customers → Attract more sellers → Loop strengthens continuously."},
      {t:"h2",txt:"Iceberg Model"},
      {t:"p",txt:"A tool to understand the underlying causes of a problem by looking beneath the surface — enhancing your observation and interpretation skills."},
      {t:"callout",title:"Queue Problem Example",txt:"A shop has a queue problem. The visible queue is just the tip of the iceberg. By observing carefully, you collect pattern insights:\n- *When* are queues longest?\n- *Why* are people queuing?\n- What's the availability and distance of nearby shops?\n\nSolving the root cause beats managing the symptom."},
    ]
  },

  /* ── 3 ──────────────────────────────────────── */
  {
    id:"ch3", num:3, emoji:"♻️", readTime:"8 min", category:"foundation",
    title:"Product Development Life Cycle (PDLC)",
    blocks:[
      {t:"callout",title:"Key Distinction",txt:"The **Product Life Cycle (PLC)** ≠ **Product Development Life Cycle (PDLC)**.\n\nPLC addresses the maturity of the product and market share. Based on the PLC stage, the PDLC is determined."},
      {t:"h2",txt:"The 6 Stages of PDLC"},
      {t:"ol",items:["**Planning & Discovery** — Research and ideation: what to build, for whom, and why","**Development** — Prototyping and MVP building based on Planning & Discovery","**Launch** — Acquiring users, gathering real-time data, collecting feedback","**Measurements** — Tracking product success KPIs and identifying areas for improvement","**Learning** — Learning from measurement insights for future iterations","**Product Iterations** — Constant improvements, re-running all steps until maximum potential is reached"]},
      {t:"h2",txt:"The Four Big Risks in Product Discovery"},
      {t:"ul",items:["**Value risk** — Will customers buy it or choose to use it? [Market Research]","**Usability risk** — Can users figure out how to use it? [Simple UI/UX]","**Feasibility risk** — Can your engineers build it with the time, skills & technology available? [Engineering Effort]","**Business viability risk** — Does this solution work for all aspects of your business? [Vision & Money]"]},
      {t:"p",txt:"As a great PM, you need to manage for all these risks before delivering your solutions."},
      {t:"h2",txt:"Modern Product Discovery is a Continuous Process"},
      {t:"p",txt:"Let's understand this with an example — not definitions."},
      {t:"callout",title:"Iteration 1: Pool Maintenance App",txt:"**[WHAT?]** Help companies spend less time on daily maintenance of swimming pools.\n\n**[WHY?]** An operator visits several dozen pools multiple times a day to measure water quality — high effort & time consuming.\n\n**[HOW?]** Enable them to measure and control parameters remotely."},
      {t:"p",txt:"After delivering this solution, a **new problem** emerges:"},
      {t:"callout",title:"Iteration 2: Filter Reminders",txt:"**[WHAT?]** The operator can now control remotely, but still needs to visit each pool weekly to check the filter. He needs to maintain a list to track visit schedules.\n\n**[WHY?]** It's difficult to remember when to go to which pool.\n\n**[HOW?]** Add a Set Alert by Pool Details feature."},
      {t:"p",txt:"And again, you discover yet another opportunity:"},
      {t:"callout",title:"Iteration 3: Clogging Prediction",txt:"**[WHAT?]** Operator still visits to check if the filter is clogged — if it's not clogged, the visit was completely wasted.\n\n**[WHY?]** Periodic visits waste time even when nothing is wrong.\n\n**[HOW?]** Enable the app to measure pressure and predict clogging remotely."},
      {t:"tip",txt:"See how each solution revealed the next problem? That's how Modern Product Discovery works — it's never a one-and-done process."},
    ]
  },

  /* ── 4 ──────────────────────────────────────── */
  {
    id:"ch4", num:4, emoji:"⚡", readTime:"4 min", category:"foundation",
    title:"What's a Good Product Effort?",
    blocks:[
      {t:"p",txt:"We often emphasize that a product should be valuable and usable for our customers. We aim to please them by delivering solutions and providing an attractive UI. But is this enough? Is this truly a good product effort?"},
      {t:"callout",title:"The Core Truth",txt:"As a PM, you should understand the TRUE WHY — **any product effort should ultimately aim at generating a business benefit**."},
      {t:"p",txt:"Suppose you hypothesized that doing X would improve engagement by increasing time users spend in your app. If successful, that sounds great — but imagine the order placement rate dropped as a result. Is this a good product effort?"},
      {t:"p",txt:"While engagement is crucial and you improved it, you're not truly successful if the effort doesn't lead to a business benefit. In fact, it reduced value by negatively impacting the business."},
      {t:"quote",txt:"Any product effort is considered good only when it's aligned with business outcomes — whether that's revenue, vision, brand image, etc."},
      {t:"tip",txt:"However, even 'failed' efforts are worthwhile. Over-engagement might actually slow down your business. Every effort is valuable if you either succeed or learn from it to iterate effectively."},
    ]
  },

  /* ── 5 ──────────────────────────────────────── */
  {
    id:"ch5", num:5, emoji:"📊", readTime:"5 min", category:"foundation",
    title:"Business Outcome Vs Product Outcome",
    blocks:[
      {t:"callout",title:"Definitions",txt:"**Business Outcome** = a metric that moves the business forward.\n\n**Product Outcome** = a metric that helps us understand if the product is moving the business forward."},
      {t:"p",txt:"Example: your company wants to **increase revenue**."},
      {t:"h2",txt:"Business POV"},
      {t:"ul",items:["Will you grow revenue because you will have more products to sell?","Will you grow revenue because you can command a higher price?","Will you grow revenue by capturing new market shares?"]},
      {t:"p",txt:"Here, business strategies are the decision-makers contributing to the business outcome (revenue)."},
      {t:"h2",txt:"Product POV"},
      {t:"table",heads:["Product Outcome","Feature Examples"],rows:[["Customers buy **sooner**","Reminder notifications, urgency messaging (\"only 10 units left\")"],["Customers buy **more**","Cross-sell recommendations (\"those who bought this also bought...\")"],["Customers **spend more**","Renewal discounts, subscription pricing tiers"]]},
      {t:"p",txt:"Product features → Product outcomes → Business outcomes. They're connected in a chain."},
      {t:"callout",title:"PM's Role",txt:"As a Product Manager, you mainly work on **Product Outcomes** — but always ensure they're aligned with **Business Outcomes**. Never optimize a product metric that hurts the business."},
    ]
  },

  /* ── 6 ──────────────────────────────────────── */
  {
    id:"ch6", num:6, emoji:"🌳", readTime:"5 min", category:"metrics",
    title:"KPI (Key Performance Indicator) Tree",
    blocks:[
      {t:"p",txt:"A **KPI** is a specific quantitative metric demonstrating how well your efforts are working towards your aimed objective."},
      {t:"p",txt:"A **KPI Tree** is a structured visualization that breaks down high-level business objectives into smaller, measurable KPIs at different levels of the organization. This helps identify root causes of problems and narrow down areas for improvement."},
      {t:"callout",title:"Example: Breaking Down Profit",txt:"**Profit** = Revenue − Costs\n\n**Revenue** = Volume × Price per Unit\n**Costs** = Fixed Costs + Variable Costs\n\n**Volume** = New Users + Returning Users\n**Price per Unit** = Average Order Value\n...and you keep breaking it down until you reach actionable, measurable leaf nodes."},
      {t:"img",src:"/images/pm/KPI.png",label:"KPI Tree",desc:"",caption:"KPI Tree — breaking a top-level business goal down into measurable, actionable leaf nodes"},
      {t:"practice"},
    ]
  },

  /* ── 7 ──────────────────────────────────────── */
  {
    id:"ch7", num:7, emoji:"⭐", readTime:"7 min", category:"metrics",
    title:"North Star Metric (NSM)",
    blocks:[
      {t:"callout",title:"KPI vs NSM — The Key Distinction",txt:"A **North Star Metric** is a *single, overarching metric* that captures the core value a product delivers to customers. It aligns the entire organization around a singular focus for long-term success.\n\nA **KPI** can pertain to anything — it depends on the specific product objective you want to achieve."},
      {t:"quote",txt:"If you can move your North Star directly, it's probably not a good North Star. The goal is to be one level out of reach — it's meant to be a composite of the parts of the company working in tandem together."},
      {t:"h2",txt:"What Makes a Good NSM?"},
      {t:"ol",items:["Should **express what customers value** about your product. (DAU or Signup Count is NOT a good NSM — it's business-centric, not customer-centric.)","Should be a **leading indicator**, not a lagging one. (MRR and ARPU are lagging — they tell you what already happened.)","Should be **measurable**. ('Number of thoughts a user has while using our app' = not measurable.)"]},
      {t:"callout",title:"Leading vs Lagging Indicators",txt:"**Leading indicators** tell you what COULD happen (predictive).\n**Lagging indicators** tell you what HAS ALREADY happened (retrospective).\n\nA good NSM is leading — it predicts future business health."},
      {t:"h2",txt:"NSM Examples Across Products"},
      {t:"table",heads:["Company","North Star Metric","Why It Works"],rows:[
        ["Netflix","Hours watched per user per month","Signals engagement and content relevance, essential for subscription retention"],
        ["Spotify","Time spent listening per subscriber","Indicates satisfaction with the platform"],
        ["Airbnb","Nights booked","Directly relates to revenue generation"],
        ["Uber","Completed rides","Reflects demand and service utilization"],
        ["Slack","Messages sent per team per day","Reflects true utility as a collaboration hub"],
        ["Zoom","Weekly meeting minutes hosted","Reflects reliance on Zoom, impacting renewals"],
        ["Twitter","Daily active users with meaningful conversations","Focuses on actual value delivered"],
        ["PayPal","Total Payment Volume (TPV)","Reflects customer trust and usage"],
      ]},
      {t:"furtherread",title:"North Star Playbook — Why You Should Read This",url:"https://amplitude.com/books/north-star/intro-why-should-you-read-this-playbook",source:"Amplitude",desc:"A comprehensive playbook on defining and operationalising your North Star Metric. Essential reading if you want to go deeper on aligning teams around a single guiding metric."},
    ]
  },

  /* ── 8 ──────────────────────────────────────── */
  {
    id:"ch8", num:8, emoji:"🏴‍☠️", readTime:"5 min", category:"metrics",
    title:"AARRR Vs RARRA Framework",
    blocks:[
      {t:"h2",txt:"What is AARRR? (Pirate Metrics)"},
      {t:"p",txt:"Five stages a person goes through on the path to becoming a paying customer:"},
      {t:"table",heads:["Stage","What It Means"],rows:[
        ["**Acquisition**","Someone visits your website for the first time"],
        ["**Activation**","That person has their first positive user experience"],
        ["**Retention**","That person revisits in the future"],
        ["**Referral**","That person shares it with others"],
        ["**Revenue**","That person makes a purchase → becomes a paying customer"],
      ]},
      {t:"h2",txt:"What is RARRA?"},
      {t:"p",txt:"Same components, different priority order — starting with Retention instead of Acquisition:"},
      {t:"table",heads:["Stage","Focus"],rows:[
        ["**Retention**","Create incredible value so everyone who visits is retained"],
        ["**Activation**","Make sure new visitors see that value on their very first visit"],
        ["**Referral**","Get them talking about and sharing your product"],
        ["**Revenue**","Convert some people into customers based on value you provide"],
        ["**Acquisition**","Use your paying customers to help find more like them"],
      ]},
      {t:"h2",txt:"Which Model to Use?"},
      {t:"callout",title:"It Depends on Your Stage",txt:"**AARRR:** Best for startups in a new market — acquire first, build awareness.\n\n**RARRA:** Best for competitive spaces or established players — avoid expensive acquisition, focus on keeping existing users and growing through word-of-mouth."},
    ]
  },

  /* ── 9 ──────────────────────────────────────── */
  {
    id:"ch9", num:9, emoji:"🚀", readTime:"6 min", category:"metrics",
    title:"PLG (Product Led Growth) Model",
    blocks:[
      {t:"p",txt:"**PLG (Product-Led Growth)** is a growth strategy that leverages the product itself — rather than marketing or sales — to drive acquisition, retention, and monetization."},
      {t:"h2",txt:"The PLG Customer Journey"},
      {t:"h3",txt:"Acquisition"},
      {t:"p",txt:"With PLG, the product drives new users to sign up through **virality** and **user-generated content**."},
      {t:"ul",items:["**Virality:** Word-of-mouth, incentivized referrals, in-product collaboration (e.g., Miro boards)","**User-generated content:** Users distribute content themselves (SurveyMonkey forms, Notion templates), or the product does it for them (Zapier workflows)"]},
      {t:"h3",txt:"Activation"},
      {t:"p",txt:"Activation is when a user experiences their first **'aha' moment**. With PLG, it's critical to have a simple setup and onboarding process so users quickly reach that moment without any intervention from a sales or support team."},
      {t:"h3",txt:"Engagement"},
      {t:"p",txt:"Engagement measures how **'sticky'** a product is. With PLG, the product delights users or prompts them to explore new use cases. **Integration** is a key tactic — designing products to plug into others (like Jira roadmaps inside Confluence) without leaving the platform."},
      {t:"h3",txt:"Retention"},
      {t:"p",txt:"Retention occurs when users build a **habit** with your product and return after initial use. Tactics like push notifications and in-product messages help repeatedly draw users back — like Calm's daily meditation reminders."},
      {t:"h3",txt:"Monetization"},
      {t:"p",txt:"With PLG, users complete a **self-serve checkout** without a sales team. Common tactics:"},
      {t:"ul",items:["Free trials","Credit card trials","Freemium models","Reverse trials (give premium free, then revert)","Pricing updates and upgrade nudges"]},
    ]
  },

  /* ── 10 ──────────────────────────────────────── */
  {
    id:"ch10", num:10, emoji:"⚖️", readTime:"15 min", category:"metrics",
    title:"Product Prioritization Frameworks",
    blocks:[
      {t:"p",txt:"Product prioritization is the structured approach of assessing the relative value of tasks, ideas, and requests to remove inefficiencies and maximize customer impact as quickly as possible within existing constraints."},
      {t:"h2",txt:"A. Value vs. Complexity Quadrant"},
      {t:"p",txt:"A simple 2×2 matrix: **Value** (what it gives) vs **Complexity** (what it takes). Priority Order = Value / Complexity."},
      {t:"table",heads:["Quadrant","Label","Action"],rows:[
        ["High Value · Low Complexity","**Quick Wins**","Do first — maximum ROI with minimum effort"],
        ["High Value · High Complexity","**Major Projects**","Plan carefully — worth doing, needs resources"],
        ["Low Value · Low Complexity","**Fill-ins**","Do when you have spare capacity"],
        ["Low Value · High Complexity","**Time Sink Features**","Avoid entirely"],
      ]},
      {t:"img",src:"/images/pm/ValuevsComplexity.png",label:"Value vs Complexity Matrix",desc:"",caption:"Value vs. Complexity quadrant — prioritise Quick Wins, plan Major Projects, skip Time Sinks"},
      {t:"h2",txt:"B. Kano Model"},
      {t:"p",txt:"Customer satisfaction is directly influenced by how effectively a feature is implemented — from 'Didn't do it at all' to 'Did it Very Well'."},
      {t:"table",heads:["Category","Meaning","Smartphone Example"],rows:[
        ["**Expected (Must-Be)**","Customers assume it exists. Absence = instant dissatisfaction.","Ability to make calls and send texts"],
        ["**Normal (Performance)**","More of it = more satisfaction. Linear relationship.","Battery life, storage capacity"],
        ["**Exciting (Attractive)**","Unexpected delight. Absence is fine — presence creates wow.","Advanced AI photo editor"],
        ["**Indifferent**","Presence or absence doesn't affect satisfaction.","Color of the internal circuit board"],
      ]},
      {t:"callout",title:"How to Measure with Kano",txt:"Ask users two questions per feature:\n1. 'If you **HAD** this feature, how do you feel?'\n2. 'If you **DIDN'T** have this feature, how do you feel?'\n\nAnswers: I like it / I expect it / I'm neutral / I can tolerate it / I dislike it"},
      {t:"img",src:"/images/pm/KANO.png",label:"Kano Model",desc:"",caption:"Kano Model — feature categories mapped to their effect on customer satisfaction"},
      {t:"h2",txt:"C. RICE Framework"},
      {t:"callout",title:"RICE Score Formula",txt:"**RICE Score = (Reach × Impact × Confidence) / Effort**\n\nHigher score = higher priority."},
      {t:"table",heads:["Factor","What It Measures","Example"],rows:[
        ["**Reach**","How many people are affected in a given time frame","1,000 users/month · 20% interact → Reach = 200"],
        ["**Impact**","How strongly it influences each user (3=Massive, 2=High, 1=Medium, 0.5=Low)","One-click checkout = 2 (High) · Dark mode = 1 (Medium)"],
        ["**Confidence**","How certain you are of your estimates (100%/80%/50%)","Good data on Reach & Effort, limited on Impact → 80%"],
        ["**Effort**","Total work in person-months (only negative factor)","1wk planning + 4wk design + 3wk FE + 4wk BE = 3 person-months"],
      ]},
      {t:"img",src:"/images/pm/RICE.png",label:"RICE Framework",desc:"",caption:"RICE Score = (Reach × Impact × Confidence) / Effort — higher score = higher priority"},
      {t:"h2",txt:"D. ICE Scoring Model"},
      {t:"p",txt:"**Impact + Confidence + Ease**, each scored 1–10. Average = ICE score. Quick and simple, but subjective — different people may rate the same feature differently."},
      {t:"h2",txt:"E. MoSCoW Method"},
      {t:"p",txt:"Prioritize features into four buckets within fixed timeframes:"},
      {t:"table",heads:["Category","Meaning","Food Delivery Example"],rows:[
        ["**Must Have (Mo)**","Core functionality — without it, the product fails its purpose","Browse restaurants and place an order"],
        ["**Should Have (S)**","Greatly improves UX but not mandatory for first release","Real-time delivery tracking map"],
        ["**Could Have (Co)**","Desirable but not necessary for usability","Favourite dishes / saved orders"],
        ["**Won't Have (W)**","Fun idea but not worth building yet","AR-based menu previews"],
      ]},
      {t:"h2",txt:"F. Opportunity Scoring"},
      {t:"p",txt:"Focus on features that are **highly important to users but have low satisfaction** today."},
      {t:"callout",title:"Formula",txt:"**Opportunity Score = (2 × Importance) − Satisfaction**\n\nOr equivalently: Importance + (Importance − Satisfaction)"},
      {t:"table",heads:["Feature","Importance","Satisfaction","Opportunity Score"],rows:[
        ["Task creation speed","9","6","**12**"],
        ["Mobile offline mode","8","3","**13** ← Highest Priority"],
        ["Custom themes","5","7","**3** ← Low Priority"],
        ["Team chat","6","6","**6**"],
      ]},
      {t:"tip",txt:"\"Mobile offline mode\" scores highest — users care about it deeply but are unhappy with the current experience. That's your focus."},
    ]
  },

  /* ── 11 ──────────────────────────────────────── */
  {
    id:"ch11", num:11, emoji:"🔨", readTime:"7 min", category:"strategy",
    title:"Jobs-to-be-Done (JTBD) Framework",
    blocks:[
      {t:"p",txt:"Why do you buy a toothbrush? If your answer is 'to brush my teeth in the morning,' you're describing its function. But the **real job** you're trying to get done is to keep your gums and teeth healthy."},
      {t:"p",txt:"If another solution came along that kept your teeth just as healthy — say, a quick mouth rinse that's cheaper, faster, and more effective — you'd stop buying toothbrushes entirely."},
      {t:"callout",title:"The Famous Drill Example",txt:"People don't buy drills because they want drills. They buy them because **they need holes in the wall**.\n\nJTBD helps uncover the deeper motivations behind customer behaviour — the real problems people are trying to solve."},
      {t:"quote",txt:"In this theory, people are trying to complete certain 'jobs,' which they 'hire' a specific product or service to accomplish. They may 'fire' a product if it's not adequately completing the job."},
      {t:"h2",txt:"Before Writing JTBD Statements"},
      {t:"ol",items:["Define your audience","Conduct market research","Talk to your users","Prioritise"]},
      {t:"callout",title:"JTBD Statement Template",txt:"**When I...** (context)\n**But...** (barrier)\n**Please help me...** (goal)\n**So I...** (outcome)"},
      {t:"h2",txt:"JTBD Examples"},
      {t:"h3",txt:"Discord"},
      {t:"callout",color:"#5865f2",txt:"*When I* want to jump into my favourite game, *but* I don't know if there are people around to play, *help me* safely coordinate with a group of like-minded gamers, *so I* can easily find a way to enjoy my favourite multiplayer game.\n\n**Implications:** Features like public/private servers and seamless text-to-voice switching."},
      {t:"h3",txt:"Airbnb"},
      {t:"callout",color:"#ff5a5f",txt:"*When I* plan a vacation, *but* I don't want to spend too much or stay somewhere generic, *help me* find unique, trustworthy homes hosted by locals, *so* I can feel comfortable, explore like a local, and save money.\n\n**Implications:** Host reviews, guest verification, filters by price, location & experience — all about building trust."},
      {t:"h3",txt:"Spotify"},
      {t:"callout",color:"#1ed760",txt:"*When I* want to listen to music that matches my mood, *but* I don't have time to curate playlists, *help me* instantly discover and stream music that fits what I'm feeling, *so* I can enjoy the moment effortlessly.\n\n**Implications:** Discover Weekly, Daily Mixes, Mood/Activity-based playlists."},
    ]
  },

  /* ── 12 ──────────────────────────────────────── */
  {
    id:"ch12", num:12, emoji:"🔍", readTime:"5 min", category:"strategy",
    title:"Product Opportunity Analysis",
    blocks:[
      {t:"p",txt:"A practical framework to evaluate and prioritize opportunities through a balanced lens of **impact, effort, and strategic alignment**. Example: an e-commerce product noticing a **drop in conversions after items are added to cart**."},
      {t:"table",heads:["Dimension","Description","Example (E-commerce)"],rows:[
        ["**Feature**","The specific feature or capability under discussion","Cart & Checkout Experience — users add items but don't complete purchases"],
        ["**User Problem**","Define with both qualitative and quantitative signals","60% of users drop off post item addition; friction with login prompts and hidden delivery charges"],
        ["**Severity**","The seriousness and urgency of the problem","High — directly impacts core revenue funnel and conversion rate"],
        ["**Compliance Impact**","Any regulatory implications","PCI-DSS compliance + RBI card data storage rules for payment flow updates"],
        ["**Impact on Outcomes**","How solving (or not solving) this affects key metrics","Fixing could lift conversions by 15% and improve GMV; ignoring it increases CAC inefficiency"],
        ["**Competitive Benchmarking**","Do competitors solve this better?","Blinkit & Swiggy offer one-tap checkouts and upfront delivery fee visibility"],
        ["**Feature Usage**","How many users engage with this feature and how often","85% of weekly active users reach the cart page — high visibility and leverage"],
        ["**Cost/Effort**","Estimate effort to deliver the solution","Medium — 2 sprints: checkout redesign, backend updates, payment QA"],
      ]},
    ]
  },

  /* ── BONUS ──────────────────────────────────── */
  {
    id:"bonus", num:"★", emoji:"💡", readTime:"8 min", category:"strategy",
    title:"Start-Up Idea Evaluation",
    blocks:[
      {t:"callout",title:"Note",txt:"This section is tangential to the PM guide directly — but it builds critical PM foundation for understanding startup thinking, market dynamics, and product-market fit."},
      {t:"h2",txt:"Mistakes To Avoid"},
      {t:"ol",items:[
        "**Solving a Problem That Doesn't Exist** — Most failed startups didn't die from bad execution, they died because nobody cared. Real problems pull you in. They keep you up at night because people won't stop complaining about them.",
        "**Getting Stuck in a Tarpit Idea** — 'Uber for X' or 'Tinder for Y' looks exciting from a distance. But once you step in, there's no real way out — hard to grow, hard to monetize, too easy to copy.",
        "**Not Stress Testing Your Idea** — Falling in love with your own idea is easy. Talk to customers, run small experiments, be brutally honest before you invest years into it.",
        "**Waiting for the 'Perfect Idea'** — You'll never find it. Most good ideas don't start good — they become good once you start working on them. Action gives clarity.",
      ]},
      {t:"h2",txt:"Evaluation Framework"},
      {t:"table",heads:["Question","Why It Matters","Lesson"],rows:[
        ["Do you have founder-market fit?","If you're not close to the problem, you'll give up when it gets tough.","Deep context > distant curiosity. Live the problem before solving it."],
        ["How big is the market?","You want markets that are big now or growing fast.","Bet on fast-growing markets, not static TAMs."],
        ["How painful is the problem?","Users only pay to fix real pain, not mild annoyances.","No pain = no urgency = no market."],
        ["Do you have competition?","Competition proves the market exists. Lack of it may mean no demand.","Competition validates; saturation limits."],
        ["Would you or friends use it?","If people you know wouldn't use it, chances are no one will.","If you can't find 5 users today, don't build it yet."],
        ["Did it recently become possible?","Timing creates opportunity — new tech or regulation unlocks ideas.","Build when the world just started allowing it."],
        ["Can it scale?","Startups grow faster than headcount.","If scaling means hiring endlessly, it's not a startup."],
        ["Work on this for 5+ years?","Startups are marathons — obsession keeps you alive.","If you're not obsessed, you'll quit before PMF."],
      ]},
      {t:"h2",txt:"Highest Success Rate Zones"},
      {t:"ul",items:[
        "**Hard to Get Started** — creates a natural moat (e.g., Stripe's payment infrastructure)",
        "**Boring Space** — unsexy but high value (e.g., Payroll Software)",
        "**Has Existing Competitors** — requires a step-function improvement (e.g., Dropbox vs. file sharing)",
      ]},
    ]
  },

  /* ── 13 ──────────────────────────────────────── */
  {
    id:"ch13", num:13, emoji:"👥", readTime:"7 min", category:"design",
    title:"User Segmentation & User Persona",
    blocks:[
      {t:"p",txt:"**User segmentation** is the practice of dividing users into groups sharing similar characteristics. These groups will likely have comparable behaviour and respond similarly to marketing/product activities."},
      {t:"h2",txt:"4 Parameters for Segmentation"},
      {t:"ul",items:["**Demographic** — Age, gender, education, occupation, income level","**Geographic** — Countries, regions, cities","**Behavioural** — Buying patterns, spending habits, desired benefits","**Technological** — Level of tech savviness"]},
      {t:"h2",txt:"The Problem with Segmentation Alone"},
      {t:"callout",title:"Numbers Without Emotion",txt:"Segmentation only answers **'who they are'**, not **'why they act this way.'**\n\n'Urban millennials who shop twice a month' — okay, but **why** do they shop? What frustrates them? What makes them return?\n\nSegmentation can't tell you that."},
      {t:"h2",txt:"The Fix: User Personas"},
      {t:"callout",color:VIO,title:"From Data to Empathy",txt:"Personas are fictional, research-backed characters that capture real people's motivations, frustrations, and goals.\n\nInstead of 'Users aged 25–35,' you have:\n\n**'Riya, 28, UX designer from Bangalore, loves sustainable fashion but feels overwhelmed by too many online options.'**\n\nThat's actionable. That's human."},
      {t:"table",heads:["Aspect","Segmentation","Personas"],rows:[
        ["Focus","Who your users are","Why your users behave that way"],
        ["Type","Data-driven","Emotion-driven"],
        ["Use","Marketing, targeting, analytics","UX, design, storytelling"],
        ["Output","Audience clusters","Relatable human archetypes"],
        ["Example","Urban professionals, 25–35","Aarav, 27, startup founder trying to save time daily"],
      ]},
      {t:"h2",txt:"How Industry Leaders Use Both"},
      {t:"table",heads:["Company","Segmentation (The What)","Persona (The Why)","Product Impact"],rows:[
        ["Spotify","Pop Lovers, Podcast Loyalists, Lo-Fi Listeners","Raj, 23, college student who listens to lo-fi beats during late-night study sessions","Focus Playlists, Study Mode recommendations, minimal UI distractions"],
        ["Airbnb","Hosts vs Guests, split by travel frequency and trip type","Priya, 35, Superhost managing listings remotely who values transparency and control","Host Dashboard, Smart Pricing, Remote Property Management tools"],
        ["Amazon","Frequent shoppers vs seasonal buyers by spend and location","Anita, 29, busy working mom who values one-day delivery and easy reordering","Subscribe & Save, Same-Day Delivery, Quick Reorder buttons"],
      ]},
      {t:"tip",txt:"Use Segmentation when analysing markets or planning campaigns. Use Personas when designing experiences or prioritizing problems. Segments give scale. Personas give soul."},
    ]
  },

  /* ── 14 ──────────────────────────────────────── */
  {
    id:"ch14", num:14, emoji:"🗺️", readTime:"4 min", category:"design",
    title:"Customer Journey Map",
    blocks:[
      {t:"p",txt:"A journey map **visualises the process a person goes through to accomplish a goal**. It starts by compiling user actions into a timeline, then fleshes this out with emotions and thoughts to create a narrative."},
      {t:"img",src:"/images/pm/customerjourney.png",label:"Customer Journey Map — Spotify Example",desc:"",caption:"Customer Journey Map — visualising every touchpoint, emotion, and pain point a user experiences"},
      {t:"callout",title:"Real Impact: Spotify Case Study",txt:"Spotify used journey mapping to deeply understand what users were thinking, feeling, and doing across every touchpoint. By visualizing pain points in the music-sharing flow, the product team uncovered friction — confusing share options, lack of visibility after sharing.\n\nThese insights directly informed product improvements: simplified sharing UX, personalized recommendations for shared songs, smoother cross-platform integration."},
      {t:"tip",txt:"For a PM, journey mapping turns abstract feedback into clear product priorities. It transformed sharing from a functional task into a delightful, viral experience for Spotify."},
    ]
  },

  /* ── 15 ──────────────────────────────────────── */
  {
    id:"ch15", num:15, emoji:"👂", readTime:"9 min", category:"design",
    title:"Stage 1: Empathize [User Research]",
    blocks:[
      {t:"p",txt:"User research is an iterative, cyclical process using observation and feedback methods to understand user behaviours, needs, and motivations — guiding the design and refinement of products and services."},
      {t:"h2",txt:"Types of User Research"},
      {t:"table",heads:["Type","Focus","Examples"],rows:[
        ["**Qualitative**","Understanding *WHY* users behave as they do","Interviews, field studies, diary studies"],
        ["**Quantitative**","Gathering measurable data on *WHAT* users do","Surveys, analytics, A/B tests"],
        ["**Attitudinal**","Listening to users' words","Interviews, concept tests"],
        ["**Behavioural**","Observing users' actual actions","Usability tests, observational studies, click-tracking"],
      ]},
      {t:"tip",txt:"The best understanding comes from using a mixture of all four — qualitative, quantitative, attitudinal, and behavioural methods."},
      {t:"h2",txt:"The Mom Test — Conducting User Interviews"},
      {t:"ul",items:["**Talk about their life, not your idea** — Don't sell; gain insights about problems","**Talk specifics, not hypotheticals** — Ask about their own past experiences, not 'what if' scenarios","**Listen, don't talk** — Don't influence them; this interview is for you, not for them"]},
      {t:"h2",txt:"What Questions to Ask (Dropbox Example)"},
      {t:"table",heads:["Question Type","✅ Good Example","❌ Bad Example"],rows:[
        ["**Pain Point**","Think about how you move files between computers. What's the single most frustrating step right now?","Would you find a service that automatically syncs your files helpful?"],
        ["**Concrete Story**","Tell me about the *last* time you needed a file on a different device and couldn't find it. Walk me through exactly what happened.","How often do you usually have problems with file versions?"],
        ["**Root Cause**","In that situation you just described, *why* did that file management method fail you? What broke down?","Did you forget to save the file?"],
        ["**Workaround**","To prevent that problem from happening again, what quick fixes or workarounds have you tried?","If you had a magic wand, what would you do to solve this?"],
        ["**Solution Critique**","You mentioned emailing files to yourself. What parts of that process are you truly *unhappy* with?","Do you think your current system is good enough?"],
      ]},
    ]
  },

  /* ── 16 ──────────────────────────────────────── */
  {
    id:"ch16", num:16, emoji:"📝", readTime:"7 min", category:"design",
    title:"Stage 2: Define [Problem Statement]",
    blocks:[
      {t:"p",txt:"A problem statement is a **concise description of an issue to be addressed or a condition to be improved upon**. It identifies the gap between the current (problem) state and desired (goal) state."},
      {t:"h2",txt:"Structure of a Problem Statement"},
      {t:"ol",items:["Context","Relevance","Quantify (Backup with data)","Solution Proposal","Benefits of Solution Proposed"]},
      {t:"h2",txt:"Example: E-Commerce Checkout Problem"},
      {t:"p",txt:"**Starting Point (Vague):** Let's build a faster eCommerce Checkout payment page."},
      {t:"h3",txt:"1. Put the Problem in Context"},
      {t:"callout",txt:"Our e-commerce platform relies on a seamless 3-step checkout process that should take customers under 90 seconds to complete from cart to payment confirmation. This experience is critical for our target demographic of busy professionals shopping during limited breaks."},
      {t:"h3",txt:"2. Explain the Relevance"},
      {t:"callout",txt:"This issue directly impacts revenue, as abandoned carts represent immediate lost sales. Furthermore, a frustrating checkout process erodes brand trust, potentially losing lifetime customer value and increasing customer acquisition costs over the long term."},
      {t:"h3",txt:"3. Backup with Data"},
      {t:"callout",txt:"Data shows the cart abandonment rate has jumped from the benchmark of **15% to 38%** over the last six weeks, specifically on the payment review page — indicating a significant break in the intended user flow."},
      {t:"h3",txt:"4. Propose a Solution"},
      {t:"callout",txt:"We propose redesigning the payment review page to simplify required inputs and implementing an A/B test comparing a **single-page checkout flow** versus the current 3-step process."},
      {t:"h3",txt:"5. Explain the Benefits"},
      {t:"callout",txt:"Simplifying the process is projected to reduce abandonment by **15 percentage points**, recovering an estimated **$80,000 in monthly revenue** and significantly improving customer satisfaction ratings."},
      {t:"h2",txt:"The Final Problem Statement"},
      {t:"callout",color:PRI,title:"Result",txt:"Our e-commerce platform's expected 90-second, 3-step checkout flow is currently failing, as the cart abandonment rate has spiked from 15% to 38% over the last six weeks, primarily on the payment review page. This failure directly results in lost revenue and long-term customer attrition. We propose an A/B test of a simplified, single-page checkout to mitigate this — projected to reduce abandonment by 15 percentage points, recovering an estimated $80,000 in monthly revenue while restoring brand trust."},
    ]
  },

  /* ── 17 ──────────────────────────────────────── */
  {
    id:"ch17", num:17, emoji:"💭", readTime:"4 min", category:"design",
    title:"Stage 3: Ideate",
    blocks:[
      {t:"p",txt:"The ideation phase is the key transitional step from **learning about your users** to **coming up with solutions**. This is where innovation thrives — where you stumble upon ground-breaking solutions your users have been missing."},
      {t:"h2",txt:"Principles of Ideation"},
      {t:"ol",items:["**Quantity, not quality** — Generate as many ideas as possible","**Suspend judgement** — No idea is too wild at this stage","**Every voice at the table** — Diverse perspectives fuel better ideas","**Novelty over relevance** — Push beyond the obvious answers"]},
      {t:"h2",txt:"Mind Maps — Best Method for Ideation"},
      {t:"p",txt:"A mind map is a visual diagram that helps product teams organize thoughts concretely."},
      {t:"callout",title:"How to Draw a Mind Map",txt:"**Step 1: Goal** — Articulate your overall objective\n**Step 2: Because** — Write the reason behind your goal\n**Step 3: While/Without** — Add secondary goals and things you don't want to do\n**Step 4: By** — Think of solutions for your goals"},
      {t:"callout",title:"Example: Increase ARR to $6M in Next Year",txt:"**Because:** We need capital to expand the engineering team and enter 3 new markets\n**Without:** Increasing headcount by more than 20% or compromising product quality\n**By:** Upselling current customers, launching annual plans, enterprise tier, partner integrations, reducing churn..."},
      {t:"video",youtubeId:"H8Xlrd2QGmU",caption:"Watch: Mind Mapping explained — a great visual walkthrough to get you started"},
    ]
  },

  /* ── 18 ──────────────────────────────────────── */
  {
    id:"ch18", num:18, emoji:"📈", readTime:"6 min", category:"strategy",
    title:"Decoding Product Growth",
    blocks:[
      {t:"h2",txt:"Growth Metrics (AARRR Expanded)"},
      {t:"ul",items:["**Acquisition** — New users who discovered and signed up for your product","**Activation** — Users who experienced enough value to become active users","**Retention** — Users who continue to use your product over time","**Referral** — Users who refer others, leading to organic growth","**Revenue** — Income generated by your product (subscriptions, purchases, etc.)"]},
      {t:"p",txt:"Based on the type and stage of your product, you need to move these metrics to decode product growth."},
      {t:"h2",txt:"Growth Channels"},
      {t:"ol",items:["Social Media Advertising","Content Marketing","Referral Program","Influencer Partnerships","A/B Testing (Features & Channels)","Leveraging Data (Segmentation, Funnel, Cohort Analysis)"]},
      {t:"tip",txt:"Virality and referral mechanisms can significantly impact your product's growth without massive marketing budgets. A viral product is one that encourages users to share it, leading to exponential growth."},
      {t:"h2",txt:"Four Fits Framework for Growth"},
      {t:"ol",items:["**Market ↔ Product Fit** — Think market first, then product","**Product ↔ Channel Fit** — Build products for specific channels first","**Channel ↔ Model Fit** — Specific channels fit with specific business models only","**Model ↔ Market Fit** — Your business model must fit with market sentiments"]},
      {t:"callout",title:"Easy Definitions",txt:"**Market:** Problems, motivations & alternative solutions available\n**Product:** Your solution to the problem\n**Channel:** How you reach your audience (determines ARPU/CAC relationship)\n**Model:** How you run your business with your chosen target group"},
      {t:"h2",txt:"Growth Loops"},
      {t:"p",txt:"A growth loop is a **self-reinforcing cycle** using existing user behaviour to continuously attract new users — replacing linear paid marketing models."},
      {t:"table",heads:["Loop Type","Example","How It Works"],rows:[
        ["**Content Loop**","Instagram","See Content → Engage → Post Content → More people see content → Loop repeats"],
        ["**Viral Loop**","Dropbox","Storage for Referral → More users join → More referrals → Utility increases with each loop"],
        ["**Engagement Loop**","Duolingo","Daily Streaks → Higher Engagement → Habit Formation → Daily return"],
      ]},
    ]
  },

  /* ── 19 ──────────────────────────────────────── */
  {
    id:"ch19", num:19, emoji:"🎨", readTime:"6 min", category:"design",
    title:"Design Fundamentals",
    blocks:[
      {t:"p",txt:"Apart from **Scale, Hierarchy, Consistency, Balance & Contrast** fundamentals, there is **GESTALT** — the most conceptually rich design principle for PMs to understand."},
      {t:"callout",title:"Gestalt Psychology",txt:"**'The Whole is different from the sum of its parts.'**\n\nGestalt principles explain how the human eye perceives visual elements as organized patterns rather than as individual elements in isolation."},
      {t:"h2",txt:"Gestalt Principles"},
      {t:"table",heads:["Principle","Meaning","Famous Example"],rows:[
        ["**Continuity**","Eye is compelled to move from one object to another","Amazon logo — arrow flowing from 'a' to 'z'"],
        ["**Closure**","Incomplete element that our subconscious completes","WWF panda logo — looks whole despite having gaps"],
        ["**Proximity**","Elements close together create a different perception","Unilever logo — different elements form a 'U' shape"],
        ["**Similarity**","Similar objects perceived as a pattern or group","NBC peacock feather logo"],
        ["**Symmetry**","Symmetrical elements perceived as one unified element","McDonald's 'M' logo"],
        ["**Figure & Ground**","Eye differentiates an object from its surroundings","FedEx logo — hidden arrow between 'E' and 'X'"],
      ]},
      {t:"h2",txt:"How PMs Think Design: Task Flow → User Flow → Wire Flow"},
      {t:"table",heads:["Level","Name","Question It Answers"],rows:[
        ["Action Level","**Task Flow**","What is the user doing?"],
        ["Interaction Level","**User Flow**","How will the user do what they want to do?"],
        ["Component Level","**Wire Flow**","How will the interaction look like?"],
      ]},
      {t:"tip",txt:"Wireframes are just layouts of different screens. When wireframes are represented in a User Flow, it becomes a WireFlow.\n\nTools: Balsamiq (quick wireframes) · Whimsical (flows) · Figma (high-fidelity)"},
    ]
  },

  /* ── 20 ──────────────────────────────────────── */
  {
    id:"ch20", num:20, emoji:"📏", readTime:"10 min", category:"metrics",
    title:"Product Metrics",
    blocks:[
      {t:"p",txt:"Product Metrics are data measurements used to evaluate a product's success and drive the business. They provide clarity, alignment, and prioritization for what to build — and a way to determine success and hold teams accountable."},
      {t:"h2",txt:"Primary (L1) vs. Supporting (L2) Metrics"},
      {t:"callout",txt:"**L1 (Primary):** The desired business outcome that reflects customer value — your goal metric.\n\n**L2 (Supporting):** The actionable levers that product/engineering teams can directly influence to move the L1 metric."},
      {t:"table",heads:["Company Type","L1 Metric (Goal)","L2 Metrics (Levers)"],rows:[
        ["**Streaming** (Netflix)","Total Hours Watched/Month","MAU · 7-Day Retention · Content Discovery Rate · Playback Error Rate"],
        ["**E-commerce** (Amazon)","GMV per Customer","Average Order Value · Conversion Rate · Cart-to-Purchase Rate · Delivery Latency"],
        ["**B2B SaaS** (Slack)","Weekly Active Teams","Messages/User/Day · New Workspace Creation · Integration Usage Rate · Churn Rate"],
      ]},
      {t:"h2",txt:"6 Categories of Product Metrics"},
      {t:"table",heads:["Category","Key Question","Examples"],rows:[
        ["**Health**","Is the product available and performing as users expect?","Latency (P95), Server Uptime %, HTTP 5xx Error Rate, Data Consistency Checks"],
        ["**Usage**","How are users interacting with the product?","Session Duration, Feature Click-Through Rate, Top 3 Action Flows, Frequency of Use"],
        ["**Adoption**","Is the product being used as much as you'd hope?","DAU/MAU ratio (stickiness), N-Day Retention, Feature Adoption Rate, Free-to-Paid Conversion"],
        ["**Satisfaction**","What is customer sentiment?","NPS, CSAT, App Store Rating, Feature Feedback Score"],
        ["**Ecosystem**","What's the macro state of the product?","Market Share %, Share of Wallet, 3rd-Party Integration Usage, TAM Penetration"],
        ["**Outcome**","What business results are you seeing?","MRR/ARR, CLV, ARPU, Churn Rate, Gross Margin %"],
      ]},
      {t:"h2",txt:"Netflix Metrics Example"},
      {t:"table",heads:["Category","Netflix Specific Metric"],rows:[
        ["Health","Video Startup Time (VST) or Buffering Rate"],
        ["Usage","Average Hours of Content Viewed per Subscriber per Month"],
        ["Adoption","N-Day Retention Rate (% of new subscribers still active after 90 days)"],
        ["Satisfaction","Net Promoter Score (NPS), Content Rating Participation Rate"],
        ["Ecosystem","Market Share % in Key Regions, Originals vs Licensed content mix"],
        ["Outcome","Monthly Recurring Revenue (MRR) / Subscriber Count"],
      ]},
      {t:"img",src:"/images/pm/Evaluation%20Metric.png",label:"Evaluation Metrics Framework",desc:"",caption:"Evaluation Metrics — a framework for measuring product success across all dimensions"},
      {t:"h2",txt:"A/B Testing"},
      {t:"p",txt:"A/B testing (split-testing) tests variations of digital products. You start with a goal and test two versions with similar audiences."},
      {t:"callout",title:"Simple A/B Testing Framework",txt:"1. **What is the question?** — What hypothesis are you testing?\n2. **What are the tests?** — Which variants will you run?\n3. **What is the impact?** — How will you measure success and what's the target metric?"},
      {t:"furtherread",title:"The Tenets of A/B Testing from Duolingo's Master Growth Hacker",url:"https://review.firstround.com/the-tenets-of-a-b-testing-from-duolingos-master-growth-hacker/",source:"First Round Review",desc:"A deep dive into how Duolingo runs rigorous A/B tests at scale — covering the principles, pitfalls, and mindset behind experimentation-driven growth."},
    ]
  },

  /* ── 21 ──────────────────────────────────────── */
  {
    id:"ch21", num:21, emoji:"🗄️", readTime:"10 min", category:"technical",
    title:"SQL Basics",
    blocks:[
      {t:"p",txt:"**Data** is information of any format, type, or size. A **Database** stores this data. A **DBMS** (Database Management System) allows Create, Read, Update, Delete operations. **SQL** (Structured Query Language) is the language you use to operate these DBMS."},
      {t:"h2",txt:"Types of Databases"},
      {t:"table",heads:["Type","Description","Examples","Use Cases"],rows:[
        ["**Relational**","Structured in Tables; based on relationship model (rows & columns)","MySQL, PostgreSQL, SQL Server","eCommerce orders, banking data"],
        ["**NoSQL**","Flexible data models: document, key-value, or graph","MongoDB, Cassandra, Redis","CMS, social media feeds, activity logs"],
        ["**In-memory**","Stores data in memory for faster access","Redis, Memcached, Apache Ignite","Session caching (cart), AdTech bidding"],
        ["**Graph**","Designed for highly interconnected data","Neo4j","Friend recommendations, fraud cartel detection"],
      ]},
      {t:"h2",txt:"Basic Commands"},
      {t:"code",lang:"sql",code:`-- Create a table
CREATE TABLE users (
  id        INT PRIMARY KEY,
  name      VARCHAR(100),
  email     VARCHAR(100)
);

-- Insert a record
INSERT INTO users (id, name, email)
VALUES (1, 'Yugal', 'yugal@example.com');

-- Select data
SELECT name, email
FROM users;`},
      {t:"h2",txt:"Generic Query Flow"},
      {t:"code",lang:"sql",code:`SELECT   col1, SUM(col2) AS total
FROM     table_name          -- 1. Pull the data
WHERE    status = 'active'   -- 2. Filter rows
GROUP BY col1                -- 3. Aggregate by dimensions
HAVING   SUM(col2) > 100     -- 4. Filter on aggregates
ORDER BY total DESC;         -- 5. Arrange output`},
      {t:"h2",txt:"Types of Joins"},
      {t:"table",heads:["Join Type","What It Returns"],rows:[
        ["**INNER JOIN**","Only records that match in both tables"],
        ["**LEFT JOIN**","All records from left table + matching from right"],
        ["**RIGHT JOIN**","All records from right table + matching from left"],
        ["**FULL OUTER JOIN**","All records from both tables, including non-matches"],
        ["**SELF JOIN**","A table joined to itself (e.g., employee-manager hierarchy)"],
        ["**CROSS JOIN**","Every row from one table combined with every row from another (Cartesian product)"],
      ]},
      {t:"h3",txt:"Self Join Example — Employee-Manager"},
      {t:"code",lang:"sql",code:`-- Find employee names and their managers
SELECT
  e1.employee_name AS employee,
  e2.employee_name AS manager
FROM employees e1
JOIN employees e2
  ON e1.manager_id = e2.employee_id;`},
      {t:"h2",txt:"COALESCE — Handle NULL Values"},
      {t:"p",txt:"Returns the first non-NULL value in a list of arguments."},
      {t:"code",lang:"sql",code:`-- If email is NULL, show phone instead
SELECT id, first_name, last_name,
       COALESCE(email, phone) AS contact_info
FROM customers;
-- If both email AND phone are NULL → returns NULL`},
      {t:"tip",txt:"**Aggregate functions:** SUM · COUNT · AVG · MAX · MIN\n**String functions:** LEN · LEFT · RIGHT · SUBSTRING · REPLACE · TRIM · RTRIM\n**NULL handling:** Use COALESCE() to substitute NULL values with a fallback"},
    ]
  },

  /* ── 22 ──────────────────────────────────────── */
  {
    id:"ch22", num:22, emoji:"🏗️", readTime:"12 min", category:"technical",
    title:"Fundamentals of Tech & System Design",
    blocks:[
      {t:"h2",txt:"Binary Language & Computing Basics"},
      {t:"callout",txt:"Computers use a **Base-2 system (1, 0)** because electronic components can be in two states: ON or OFF.\n\n**1011 in binary** = 1×2³ + 0×2² + 1×2¹ + 1×2⁰ = **11 in decimal**\n\nASCII maps characters to numbers: A-Z = 65–90, a-z = 97–122\n\n**1 Bit** = 0 or 1 · **1 Byte** = 8 bits = 1 character (e.g., 'A' = 01000001)\nFloat = 32 bit · Double = 64 bit"},
      {t:"h2",txt:"Networking Basics"},
      {t:"table",heads:["Concept","Explanation"],rows:[
        ["**IPv4**","32-bit address (8bit.8bit.8bit.8bit) — Max 2^32 = 4.2 billion addresses. Not enough for all devices."],
        ["**IPv6**","128-bit address — Max 2^128 addresses. More than enough for the foreseeable future."],
        ["**Server**","A computer that receives requests, processes them, and sends responses to clients."],
        ["**API**","Application Programming Interface — a way to send data back and forth between two applications."],
        ["**SDK**","System Development Kit — frameworks, APIs, docs, libraries to help build apps (Android SDK, iOS SDK, etc.)"],
      ]},
      {t:"h2",txt:"System Design — A PM's Framework"},
      {t:"p",txt:"Illustrated with **designing a Ride-Sharing App (like Uber):**"},
      {t:"h3",txt:"Step 1: Clarify Goals & Scope"},
      {t:"table",heads:["Requirement Type","Description","Example"],rows:[
        ["**Functional**","What the user does — core features","Riders book rides. Drivers accept rides. System matches them."],
        ["**Non-Functional**","How the system behaves — speed, reliability, security","Matching in real-time (<5 seconds). High availability during rush hour."],
      ]},
      {t:"h3",txt:"Step 2: Define Scale & Estimation"},
      {t:"callout",txt:"**1 million daily rides.** Drivers update GPS every 3 seconds → **write-heavy** system requiring high throughput.\n\n**Implication:** Cannot use a standard database for location tracking — need a specialized geospatial service."},
      {t:"h3",txt:"Step 3: High-Level Design & User Journey"},
      {t:"ol",items:["Rider opens app → Sends location to **Location Service**","Rider requests ride → Goes to **Matching Service**","Matching Service scans active drivers in **Driver Database**","Driver accepts → **Notification Service** alerts the rider"]},
      {t:"h3",txt:"Step 4: Data Entities"},
      {t:"table",heads:["Entity","Key Attributes"],rows:[
        ["**User**","Name, Rating, Payment Methods"],
        ["**Ride**","Source, Destination, Timestamp, Status (Requested/Ongoing/Completed)"],
        ["**Driver**","Car Model, License Plate, Current Lat/Long"],
      ]},
      {t:"h3",txt:"Step 5: Trade-offs (Most Critical for PMs)"},
      {t:"callout",color:AMB,title:"The Matching Problem — Speed vs Precision",txt:"**Option A:** Match with the absolute closest driver.\n❌ Computationally expensive — might take 10 seconds.\n\n**Option B:** Match with any driver within a 2-minute radius.\n✅ Instant matching (user delight).\n❌ Not perfectly optimized geospatially.\n\n**PM Decision:** Choose Option B. For ride-sharing, **low latency (speed) > perfect precision** for user experience."},
      {t:"h3",txt:"Step 6: Edge Cases & Failure Management"},
      {t:"callout",txt:"**Scenario:** A driver loses internet connection mid-ride.\n**System Behaviour:** Store GPS data locally on the driver's phone and upload once reconnected — ensuring the fare is calculated correctly later (Auditability)."},
      {t:"h3",txt:"Step 7: Success Metrics"},
      {t:"ul",items:["**Latency:** Average time to match a driver < 3 seconds","**Availability:** 99.99% uptime","**Error Rate:** Failed bookings < 1%"]},
    ]
  },

  /* ── 23 ──────────────────────────────────────── */
  {
    id:"ch23", num:23, emoji:"🤖", readTime:"10 min", category:"technical",
    title:"Fundamentals of Machine Learning",
    blocks:[
      {t:"p",txt:"**Machine Learning (ML)** is a type of AI that allows computers to improve at a specific task without explicit programming. AI is the broader field; ML focuses on the *ability to learn from data*."},
      {t:"h2",txt:"Categories of ML"},
      {t:"table",heads:["Category","How It Works","Examples"],rows:[
        ["**Supervised Learning**","Algorithm learns from labelled data (inputs with desired outputs)","Email spam filtering · Medical diagnosis · Stock price prediction"],
        ["**Unsupervised Learning**","Algorithm finds patterns in unlabelled data on its own","Customer segmentation · Anomaly detection · Recommendation engines"],
        ["**Reinforcement Learning**","Algorithm learns through trial and error — rewards for good actions, penalties for bad","Self-driving cars · Gaming AI (AlphaGo) · Personalized ads"],
      ]},
      {t:"h2",txt:"Common ML Algorithms"},
      {t:"h3",txt:"1. Linear Regression"},
      {t:"p",txt:"Finds a linear relationship between a continuous numerical variable and one or more independent variables. Creates a best-fit line to make predictions."},
      {t:"callout",txt:"**Use Cases:** House price prediction · Weather temperature forecasting · Sales forecasting by ad spend · Salary estimation by years of experience"},
      {t:"h3",txt:"2. Logistic Regression"},
      {t:"p",txt:"Tackles classification problems where the output falls into distinct categories — estimates the probability of belonging to a particular class."},
      {t:"callout",txt:"**Use Cases:** Spam filtering (Spam/Not Spam) · Medical screening (Positive/Negative) · Customer churn prediction (Yes/No) · Loan approval (Approve/Deny)"},
      {t:"h3",txt:"3. Decision Trees"},
      {t:"p",txt:"A flowchart-like structure that asks a series of yes/no questions to arrive at a classification or prediction. Interpretable — you can understand the logic behind each decision."},
      {t:"callout",txt:"**Use Cases:** Customer support routing · Insurance risk assessment · Plant identification apps · Quality control in factories · NPC behaviour in video games"},
      {t:"h3",txt:"4. K-Nearest Neighbors (KNN)"},
      {t:"p",txt:"Classifies a new data point by finding the k most similar items in training data and assigning the most frequent class among its neighbours — 'wisdom of the crowd.'"},
      {t:"callout",txt:"**Use Cases:** Music recommendations · Handwriting recognition · Retail product grouping · Credit profiling · Google image search ('visually similar images')"},
      {t:"h3",txt:"5. Support Vector Machines (SVM)"},
      {t:"p",txt:"Finds the optimal hyperplane (a separation boundary in high dimensions) that best distinguishes between different classes."},
      {t:"callout",txt:"**Use Cases:** Face detection · Hate speech detection · Bioinformatics (protein classification) · Signature/forgery verification · News article auto-classification"},
    ]
  },
];


/* ═══════════════════════════════════════════════════
   PRACTICE Q&A DATA
═══════════════════════════════════════════════════ */
const PRACTICE_QS: PracticeQ[] = [
  {
    num:1, title:"Increasing WAU for a Fitness Tracking App",
    prompt:"How would you break down the goal of boosting WAU into measurable KPIs across user engagement, retention, and acquisition?",
    blocks:[
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"You're the PM for a fitness tracking app tasked with **increasing Weekly Active Users (WAU)**. How would you break this goal into measurable KPIs?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"WAU is an **outcome metric** — to move it, we influence the **input metrics** that feed it. I'd structure a KPI Tree across three pillars: **Acquisition**, **Engagement**, and **Retention**."},
      {t:"code",code:"                      WAU\n                       |\n  -----------------------------------------------\n  |                    |                    |\nAcquisition         Engagement          Retention\n    KPIs               KPIs                KPIs"},
      {t:"h3",txt:"1. Acquisition KPIs — Get More New Users Weekly"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Weekly New Installs","New users entering the top of the funnel"],
        ["Click-to-Install Rate","Quality of ad creatives or store page"],
        ["Signup Conversion Rate","% of downloads that convert to accounts"],
        ["% Users Completing Onboarding","Completion correlates with higher activation"],
      ]},
      {t:"h3",txt:"2. Engagement KPIs — Increase Activation & Frequency"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Weekly Active Sessions per User","High frequency improves retention and WAU"],
        ["Avg. Session Duration","Proxy for value derived from the app"],
        ["% of Users Logging a Workout","Tracks core feature engagement"],
        ["Feature Adoption Rate","Are users discovering and using more than 1 feature?"],
        ["Push Notification CTR","How engaging are reactivation nudges?"],
      ]},
      {t:"h3",txt:"3. Retention KPIs — Keep Existing Users Coming Back"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["D1, D7, D30 Retention Rate","Standard product health checks for stickiness"],
        ["Weekly Returning Users","Users active in the past who came back"],
        ["Churn Rate (Weekly)","Helps track drop-offs"],
        ["Weekly Stickiness (WAU/MAU)","Higher ratio implies better habit formation"],
        ["NPS / CSAT Scores","Proxy for long-term retention risk"],
      ]},
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"How would you prioritize which set of KPIs to focus on first?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"I'd run a quick **diagnostic** to identify the biggest bottleneck:\n\n- **Installs stagnant** \u2192 focus on acquisition\n- **Installs high but WAU low** \u2192 check onboarding & short-term retention\n- **Active initially, then drop off** \u2192 deep-dive engagement & retention\n\nI'd also benchmark **WAU/MAU ratio** \u2014 below ~0.25 suggests poor stickiness."},
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"Can you give an example of how a feature experiment ties back to these KPIs?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"If we launch a **weekly challenge feature**, we'd expect:\n\n\u2192 **Engagement:** \u2191 % Users Participating in Challenges\n\u2192 **Retention:** \u2191 Weekly Returning Users\n\u2192 **Lagging:** \u2191 WAU\n\nWe'd A/B test and track all of these to validate impact. Secondary: monitor Push Notification CTR and Churn Rate."},
    ],
  },
  {
    num:2, title:"Improving Trial-to-Paid Conversion for a SaaS Product",
    prompt:"What sub-KPIs and leading indicators would you track to enhance the percentage of free trial users who convert to paid plans?",
    blocks:[
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"You're the PM for a B2B SaaS tool. Task: **increase trial-to-paid conversion rate**. What KPIs and leading indicators would you track?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"Trial-to-Paid Conversion Rate is a **mid-funnel efficiency metric**. I'd structure the KPI Tree across four pillars: **Activation**, **Feature Usage**, **Experience**, and **Pricing Alignment**."},
      {t:"code",code:"          Trial-to-Paid Conversion Rate\n                      |\n  ------------------------------------------\n  |           |             |             |\nActivation  Feature    Experience    Pricing\n  KPIs      Usage KPIs    KPIs      Alignment KPIs"},
      {t:"h3",txt:"1. Activation KPIs — Did they get started right?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["% Users Completing Onboarding","Users who understand the product convert better"],
        ["Time to First Value (TTFV)","How fast users experience core utility"],
        ["% Users Hitting Activation Milestone","E.g., sent first email, created first report"],
        ["Day 1 / Day 3 / Day 7 Activity","Proxy for early intent and engagement"],
      ]},
      {t:"h3",txt:"2. Feature Usage KPIs — Are they deriving core value?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["# of Key Feature Actions per User","Correlates with the 'aha' moment"],
        ["% of Users Using Core Features","E.g., analytics dashboard, integrations"],
        ["Breadth of Feature Adoption","Are users using multiple modules?"],
        ["Weekly Active Usage During Trial","Higher engagement = higher intent"],
      ]},
      {t:"h3",txt:"3. Experience KPIs — Is the trial frictionless?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Support Tickets per Trial User","Indicates usability issues"],
        ["NPS/CSAT During Trial Phase","Early satisfaction leads to better conversions"],
        ["Session Drop-off Points","Where are users exiting or getting stuck?"],
        ["% Users Reaching Paywall","How many even see pricing?"],
      ]},
      {t:"h3",txt:"4. Pricing Alignment KPIs — Is pricing a blocker or trigger?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["% of Users Viewing Pricing Page","Indicates intent to explore plans"],
        ["Click-to-Purchase Rate from Pricing","Measures final purchase intent"],
        ["Trial Length vs Conversion Rate","A/B test optimal trial duration"],
        ["Discount/Promo Impact on Conversions","Pricing elasticity check"],
      ]},
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"How would you use this to drive experiments?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"If **TTFV is long** and users drop before core actions:\n\n\u2192 Introduce revised **guided onboarding** and progress bars\n\u2192 Monitor: Activation Rate \u2191, Support Tickets \u2193, Conversion % change\n\nIf users visit pricing but **don't convert**:\n\n\u2192 A/B test pricing tiers or copy, add limited-time discounts\n\nPrioritise KPIs **highly correlated** with conversion AND **easy to influence** via product changes."},
    ],
  },
  {
    num:3, title:"Reducing User-Reported Bugs by 30% in a Mobile Game",
    prompt:"How might you structure KPIs to address technical quality, user feedback loops, and update stability?",
    blocks:[
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"You're the PM for a mobile game. Objective: **reduce user-reported bugs by 30%**. How would you structure your KPIs?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"I'd structure KPIs across **three pillars**: Technical Quality, User Feedback Loops, and Release Stability \u2014 each directly influencing the bug-reporting outcome."},
      {t:"code",code:"             \u2193 User-Reported Bugs\n                     |\n  ------------------------------------\n  |              |                  |\nTechnical      User Feedback     Release\nQuality KPIs   Loop KPIs        Stability KPIs"},
      {t:"h3",txt:"1. Technical Quality KPIs — Proactive Bug Prevention"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Crash-Free Sessions %","Core stability metric"],
        ["ANR Rate (App Not Responding)","Indicates poor performance"],
        ["Exception/Error Rate per 1,000 Sessions","Tracks issues before users report them"],
        ["% of Known Bugs Resolved","Effectiveness of backlog grooming"],
        ["Automated Test Coverage %","Higher coverage reduces regression bugs"],
        ["Bug Reopen Rate","Quality of engineering fixes"],
      ]},
      {t:"h3",txt:"2. User Feedback Loop KPIs — Surface, Track & Resolve"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["# of User-Reported Bugs per Week","Primary target metric"],
        ["Avg. Time to Acknowledge Bug Report","Responsiveness to users"],
        ["Avg. Time to Resolve (TTR)","Faster resolution improves trust"],
        ["% of Bugs Reported via In-App vs App Store","Encourages structured feedback"],
        ["In-App Feedback Submission Rate","Ease and adoption of feedback system"],
      ]},
      {t:"h3",txt:"3. Release Stability KPIs — Avoid New Bugs"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Post-Release Crash Rate","Key signal of release quality"],
        ["New Bugs Introduced per Release","Controls quality regression"],
        ["Hotfix Frequency","Indicates deployment instability"],
        ["Release Rollback Rate","Symptom of poor QA/testing"],
        ["Beta-to-Prod Bug Leakage Rate","Identifies QA process gaps"],
      ]},
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"How would you prioritize which area to address first?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"Run a **Root Cause Analysis** and categorize existing bugs:\n\n- Majority from **crashes/ANRs** \u2192 prioritize Technical Quality\n- Bugs emerging **post-deployment** \u2192 fix release practices\n- Bugs discovered **late** \u2192 enhance the user feedback loop\n\nProcess improvements: bug severity triaging, post-mortems for hotfixes, and a **'Report a Bug' in-app CTA** tied to session replay tools like Instabug or Firebase."},
    ],
  },
  {
    num:4, title:"Enhancing Average Session Duration on a News Platform",
    prompt:"What engagement and content-related metrics would feed into improving time spent per session?",
    blocks:[
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"You're the PM for a news aggregation product. Task: **increase average session duration**. What metrics would you track?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"Average Session Duration is a **core engagement metric**. I'd break it into: **Content Relevance & Quality**, **User Engagement Behaviour**, and **UX & Friction Metrics**."},
      {t:"code",code:"          \u2191 Average Session Duration\n                    |\n  -------------------------------------------\n  |                  |                      |\nContent         User Engagement         UX &\nRelevance KPIs    Metrics KPIs        Friction KPIs"},
      {t:"h3",txt:"1. Content Relevance & Quality KPIs — Hook them"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Avg. Article Completion Rate","Are users reading fully? Higher = longer session"],
        ["% of Personalized Articles Read","Measures relevance of recommendations"],
        ["CTR on Recommended Articles","Quality of curation and headlines"],
        ["Time per Article","How engaging the content is"],
        ["Bounce Rate from Homepage","Poor content = early exits"],
      ]},
      {t:"h3",txt:"2. User Engagement Metrics — More actions per session"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Articles Read per Session","More reads = longer duration"],
        ["Scroll Depth (per Article)","Measures true reading engagement"],
        ["Session Stickiness Rate","% crossing 5+ min or 3+ articles"],
        ["Engagement with Rich Media (Videos, Polls)","Non-text content increases time"],
        ["Save/Bookmark Article Rate","Shows deeper interest"],
      ]},
      {t:"h3",txt:"3. UX & Interaction Metrics — Reduce friction"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Page Load Time","Delays kill session time"],
        ["% of Infinite Scroll Sessions","Encourages binge consumption"],
        ["App Navigation Drop-off Points","Where do users lose momentum?"],
        ["In-App Recommendation CTR","Helps extend session loops"],
        ["Ad Load Time & Interrupt Rate","Poor ad experience breaks flow"],
      ]},
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"Would you run any experiments to influence session time?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"Experiments tied directly to KPIs:\n\n\u2022 **Auto-load Next Article** \u2192 \u2191 Articles per Session\n\u2022 **In-Article Recommendations (mid-scroll)** \u2192 \u2191 Scroll Depth + CTR\n\u2022 **AI Summary + Full Article toggle** \u2192 retains light and deep readers\n\u2022 **Gamify Streak Reading** \u2192 \u2191 habit loop\n\nDiagnose first: if users read only 1 article \u2192 focus on article chaining. If completion rate is low \u2192 check content quality or load times."},
    ],
  },
  {
    num:5, title:"Increasing Referrals per User for a P2P Payment App",
    prompt:"How would you incentivize and measure referral behaviour, including viral loops and reward effectiveness?",
    blocks:[
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"You're the PM for a P2P payment app. Task: **increase referrals per user**. How do you approach incentivizing and measuring referral behavior?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"Referrals in trust-based apps are powerful. I'd structure across three layers: **Incentivization Mechanics**, **Viral Loop Metrics**, and **Reward Effectiveness KPIs**."},
      {t:"code",code:"              \u2191 Referrals per User\n                      |\n  ------------------------------------------\n  |                    |                   |\nIncentive         Viral Loop        Reward\nMechanics KPIs     KPIs           Effectiveness KPIs"},
      {t:"h3",txt:"1. Incentive Mechanics KPIs — Are users motivated to refer?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["% of Users Who Refer At Least Once","Baseline referral participation"],
        ["Avg. Referral Invites per User","Top-of-funnel referral attempts"],
        ["Referral CTA Click-Through Rate","Visibility and appeal of prompts"],
        ["Conversion Rate (Invite \u2192 Signup)","Efficacy of incentive + UX"],
        ["Incentive Redemption Rate","Are users completing the reward loop?"],
        ["Time to First Referral","Speed indicates UX clarity"],
      ]},
      {t:"h3",txt:"2. Viral Loop KPIs — How well does it self-propagate?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Viral Coefficient (K-Factor)","Core metric: K > 1 = self-sustaining loop"],
        ["% of Signups via Referral","Indicates channel strength"],
        ["% of Referred Users Who Refer Again","Second-order virality"],
        ["Time Between Referral and Sign-Up","Lag impacts loop velocity"],
      ]},
      {t:"h3",txt:"3. Reward Effectiveness KPIs — Is it sustainable?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["CAC via Referral vs Other Channels","Cost-effective growth comparison"],
        ["% of Users Gaming the Referral","Fraud control to maintain ROI"],
        ["LTV of Referred Users","Ensures acquired users are valuable"],
        ["Referral Reward Cost per User","Monitors incentive burn rate"],
        ["Reward Variant A/B Performance","Identifies best-performing incentives"],
      ]},
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"Referrals are happening, but conversion is low. How would you troubleshoot?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"Diagnose both **incentive quality** and **UX flow**:\n\n**Reward not motivating?** \u2192 A/B test: cashback vs tiered incentives vs gamified streaks\n**UX friction?** \u2192 Audit referral flow, recipient experience, and redemption steps\n\n**To grow K-factor:** Make referral entry points visible (home banners, post-transaction nudges), add urgency, use deep links + QR codes.\n\n**Fraud prevention:** device fingerprinting, cap referrals per month, require first transaction before reward."},
    ],
  },
  {
    num:6, title:"Improving Search Success Rate in an E-Commerce App",
    prompt:"What KPIs would track search accuracy, user behaviour, and downstream conversions (e.g., clicks, purchases)?",
    blocks:[
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"You're the PM for a large e-commerce platform. Objective: **improve search success rate**. How do you approach this?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"I'd define **Search Success Rate** as % of search sessions resulting in a meaningful action (click, add-to-cart, or purchase). Breakdown: **Search Accuracy**, **User Behavior**, and **Conversion Funnel**."},
      {t:"code",code:"             \u2191 Search Success Rate\n                     |\n  ------------------------------------\n  |              |                  |\nSearch         User             Conversion\nAccuracy KPIs  Behavior KPIs    Funnel KPIs"},
      {t:"h3",txt:"1. Search Accuracy KPIs — Are results relevant?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Query-Product Match Precision","Relevance of top results"],
        ["Zero Results Rate","Frustrating \u2014 needs immediate fixing"],
        ["Query Reformulation Rate","Users re-search when results aren't good"],
        ["Click-Through Rate on Results","Immediate user engagement indicator"],
        ["First Click Position","Are top-ranked results actually clicked?"],
      ]},
      {t:"h3",txt:"2. User Behaviour KPIs — Engaged or frustrated?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Time to First Click on Result","Delay suggests difficulty finding a match"],
        ["Scroll Depth in Results","Shows engagement or desperation"],
        ["Filter Usage Rate","Results need refinement"],
        ["Search Exit Rate","Measures abandonment from results page"],
        ["Repeat Searches per Session","Signals frustration or unclear UX"],
      ]},
      {t:"h3",txt:"3. Conversion Funnel KPIs — Driving action?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Add to Cart Rate from Search","Signals actionable product interest"],
        ["Purchase Rate from Search","Key revenue indicator"],
        ["Revenue per Search Session","Ties search experience to business value"],
        ["Average Clicks Before Purchase","Shorter = better UX"],
        ["Search GMV Contribution %","Business weight of search channel"],
      ]},
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"Results seem relevant, but conversions are low. How do you troubleshoot?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"This is an **intent-to-action gap**. Possible causes:\n\n\u2022 **Pricing/inventory issues** \u2192 items out of stock or too expensive\n\u2022 **Poor metadata** \u2192 titles or images misleading\n\u2022 **No urgency** \u2192 add 'bestseller' tags, limited-time offers\n\n**For Zero Results:** use NLP + fuzzy matching, show fallback suggestions, mine query logs.\n\n**Search Health Score (composite):** CTR on Results (30%) + Add to Cart (25%) + Purchase Rate (25%) + inverse weight for Zero Results & Reformulations."},
    ],
  },
  {
    num:7, title:"Boosting Adoption of a New Premium Feature",
    prompt:"How would you measure awareness, onboarding, and value realization for the feature across user segments?",
    blocks:[
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"You've launched a **new premium feature** in a productivity tool. Goal: boost adoption. How do you measure success across awareness, onboarding, and value realization?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"I'd map the adoption journey as a funnel: **Awareness \u2192 Onboarding \u2192 Value Realization**, each with its own KPI layer."},
      {t:"code",code:"          \u2191 Premium Feature Adoption Rate\n                        |\n  ----------------------------------------\n  |                   |                  |\nAwareness          Onboarding         Value\n  KPIs              KPIs           Realization KPIs"},
      {t:"h3",txt:"1. Awareness KPIs — Do users know it exists?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["% of Users Exposed to Feature Messaging","Reach of banners, tooltips, emails"],
        ["Tooltip/View Impression Rate","How many saw the feature UI element"],
        ["Feature Discovery Rate","% who navigated to the feature screen"],
        ["CTA Click-Through Rate","Are users engaging with the prompt?"],
        ["Awareness by Segment (Free vs Paid)","Detect underperforming user groups"],
      ]},
      {t:"h3",txt:"2. Onboarding KPIs — Are users exploring it?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["% of Exposed Users Who Trial Feature","Key activation metric"],
        ["Time to First Use After Exposure","Lower = better UX clarity"],
        ["Completion of Onboarding Checklist","Guides users to success"],
        ["Drop-off Rate During Setup","Identifies UX friction"],
        ["Feature Activation Rate by Segment","Which cohorts need nudges?"],
      ]},
      {t:"h3",txt:"3. Value Realization KPIs — Getting repeated value?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Repeat Usage Rate (7-day or 30-day)","Core stickiness indicator"],
        ["Depth of Use (actions per session)","More depth = more perceived value"],
        ["Upgrade Conversion Rate (Free \u2192 Premium)","Indicates monetization potential"],
        ["Churn Rate: Feature Users vs Non-users","Shows impact on retention"],
        ["Support Ticket Volume (Feature-related)","Measures usability friction"],
      ]},
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"Feature usage is high, but upgrade conversion is low. What do you do?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"Three hypotheses:\n\n1. **Value unclear** \u2192 Add value recap screens ('This saved you X hours this week'), reframe premium benefit\n2. **Free users use it too easily** \u2192 Introduce gating (limited free uses/month, watermarking)\n3. **Pricing misalignment** \u2192 A/B test tiers, bundles, freemium boundaries\n\n**Segment-specific:** Free users need more nudges; SMBs vs Enterprise have different onboarding needs; power users should get early access to future features as a conversion hook."},
    ],
  },
  {
    num:8, title:"Decreasing Cart Abandonment for an Online Grocery Service",
    prompt:"What checkout flow metrics, friction points, and incentive strategies would you prioritize?",
    blocks:[
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"You're the PM for an online grocery platform. Leadership wants to **reduce cart abandonment rate** during peak buying hours. What metrics would you track?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"I'd use a **Cart Abandonment KPI Tree** across: **Checkout Flow Health**, **Friction Detection**, and **Incentive Strategy Effectiveness**."},
      {t:"code",code:"           \u2193 Cart Abandonment Rate\n                     |\n  -------------------------------------\n  |               |                  |\nCheckout        Friction         Incentive\nFlow KPIs     Point KPIs       Strategy KPIs"},
      {t:"h3",txt:"1. Checkout Flow KPIs — Where are users dropping off?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Funnel Drop-off Rate per Step","Pinpoints exits at address, payment, review screens"],
        ["Time Spent per Checkout Step","Long time = confusion or friction"],
        ["Average Cart Value at Drop-off","Higher values may signal price shock"],
        ["Device/Platform Abandonment Rate","Mobile web often performs worse than app"],
        ["Time from Cart Add to Checkout Start","Delay signals distraction or uncertainty"],
      ]},
      {t:"h3",txt:"2. Friction Point KPIs — What's causing drop-offs?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Payment Failure Rate","Tech or gateway issues"],
        ["Address Input Error Rate","UX or validation friction"],
        ["Promo Code Error Rate","Discount misuse/confusion"],
        ["Out-of-Stock After Add-to-Cart","Real-time inventory sync problem"],
        ["Number of Clicks to Complete Checkout","Simpler flows convert better"],
      ]},
      {t:"h3",txt:"3. Incentive Strategy KPIs — Are nudges converting?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Discount Redemption Rate","Are users acting on coupons/cashback?"],
        ["Recovery Email/SMS Click-through Rate","Re-engagement from nudges"],
        ["Post-abandonment Conversion Rate","Delayed conversions via retargeting"],
        ["% of Abandoned Carts Recovered via Incentives","Impact of offers/reminders"],
        ["Average Cost per Recovered Cart","Ensures economics remain viable"],
      ]},
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"Cart abandonment is high at the payment step. What next?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"**Quantitative:** High payment failure rate \u2192 check gateway errors. Long time on payment screen \u2192 UX confusion. Low completion on specific methods \u2192 redesign or remove.\n\n**Actions:** Streamline options (auto-suggest saved cards, UPI), offer COD, highlight trust elements (secure badge, money-back guarantee).\n\n**Smart incentives:** Segment by order value (offer only above threshold), customer type (new vs repeat), and test time-limited discounts vs free delivery vs loyalty points."},
    ],
  },
  {
    num:9, title:"Improving Monthly Retention for a Meditation App",
    prompt:"How could habit formation, content relevance, and churn triggers inform retention-focused KPIs?",
    blocks:[
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"You're the PM for a meditation app. Goal: **increase monthly retention** of paid users. How would you build a KPI framework using habit formation, content relevance, and churn signals?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"I'd use a **Retention KPI Tree** across three themes: why users stay or churn."},
      {t:"code",code:"              \u2191 Monthly Retention Rate\n                        |\n  ------------------------------------------\n  |                   |                    |\nHabit            Content             Churn Trigger\nFormation KPIs   Relevance KPIs      & Risk KPIs"},
      {t:"h3",txt:"1. Habit Formation KPIs — Building a routine?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Days Active per Week","Shows frequency and stickiness"],
        ["Streak Days Maintained","Gamified behaviour reinforcement"],
        ["Median Session Time per User","Signals depth of engagement"],
        ["Notification Opt-in & Open Rate","Habit reinforcement responsiveness"],
        ["Time to First Session Post Signup","Delay often leads to lower retention"],
      ]},
      {t:"h3",txt:"2. Content Relevance KPIs — Personalized and sticky?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Content Completion Rate","Do users finish sessions they start?"],
        ["Repeat Consumption of Specific Series","Indicates anchor content"],
        ["% of Users Engaging with New Content Drop","Freshness attracts re-engagement"],
        ["Category Preference Spread","Helps personalize recommendations"],
        ["Ratings / Thumbs-up Rate on Sessions","Quality and emotional connection"],
      ]},
      {t:"h3",txt:"3. Churn Risk KPIs — Detect and intervene early"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Days Since Last Session","Early sign of disengagement"],
        ["Drop after Free Trial","Price or value mismatch"],
        ["Drop in Session Frequency (Week over Week)","Identifies habit decay"],
        ["Support Tickets about Billing/Content","Leading churn friction signal"],
        ["Retention Recovery from Re-engagement Nudges","Effectiveness of churn prevention"],
      ]},
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"How do you know your retention efforts are working?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"**Diagnose first** \u2014 is high churn due to lack of habit, irrelevant content, or subscription friction?\n\n**Act based on diagnosis:**\n\u2022 Low habit formation \u2192 Gamify streaks, morning reminders\n\u2022 Content feels generic \u2192 Personalize via user goals and past sessions\n\u2022 Drop after trial \u2192 Add lower-tier plans, better value onboarding\n\u2022 Usage decline week 2 \u2192 Progressive unlocks or curated journeys\n\n**Success check:** If newer user cohorts retain better over 30/60/90 days than older ones \u2192 initiatives are working."},
    ],
  },
  {
    num:10, title:"Increasing Transactions per User in a Banking App",
    prompt:"What behavioural and product-usage metrics would drive frequent engagement with financial tools?",
    blocks:[
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"As PM for a digital banking app, how would you increase the number of **transactions per user (TPU)**?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"I'd structure a **KPI Tree** to systematically address the goal. TPU = Total Transactions / MAU. Goal: increase both **breadth** (types) and **depth** (frequency)."},
      {t:"code",code:"              \u2191 Transactions per User (TPU)\n                         |\n  ------------------------------------------\n  |                   |                    |\nUser              Product             Engagement &\nBehavior KPIs  Feature Usage KPIs   Nudging KPIs"},
      {t:"h3",txt:"1. User Behaviour KPIs — Patterns & Triggers"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Avg. Number of Transactions per Week","Frequency of use"],
        ["% of Users Making 3+ Transaction Types","Indicates feature exploration"],
        ["UPI/NEFT/IMPS Share in Transactions","Popular methods = UX priority"],
        ["Median Transaction Value","Gauge intent (micro vs high-value)"],
        ["Last Transaction Recency","Detects drop in momentum"],
      ]},
      {t:"h3",txt:"2. Product Usage KPIs — Which tools drive engagement?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["% of Users Using Bill Pay, Recharge, EMI","Diversification of utility"],
        ["Investment Tool Usage (FDs, SIPs, Gold)","Higher engagement loops"],
        ["Cross-Product Penetration Rate","Users using more than 1 product"],
        ["% of Users Saving Beneficiaries/Payees","Ease = more repeat payments"],
        ["Active Use of Wallet / Cashback Features","Gamified incentive behaviour"],
      ]},
      {t:"h3",txt:"3. Engagement & Nudging KPIs — Do reminders work?"},
      {t:"table",heads:["KPI","Why it Matters"],rows:[
        ["Nudged Transactions Conversion Rate","Efficacy of reminders"],
        ["Reminder Opt-in & Engagement Rate","Acceptance of behavioural nudging"],
        ["Personalized Offer Redemption Rate","Incentive-driven action"],
        ["In-App Notification Click-through Rate","Content-to-action efficiency"],
        ["Scheduled Transaction Setup Rate","Repeatability boost"],
      ]},
      {t:"callout",color:"#0d9488",title:"Interviewer",txt:"Transactions are flat despite MAUs rising. What do you investigate?"},
      {t:"callout",color:"#635bff",title:"Candidate",txt:"Key signals:\n\n\u2022 **Low % Multi-use Users** \u2192 users doing only 1 type of transaction\n\u2022 **Low Repeat Bill Payments** \u2192 friction or lack of reminders\n\u2022 **High Dormancy Post Signup** \u2192 poor onboarding/activation\n\u2022 **Low Investment Tool Engagement** \u2192 unclear value proposition\n\n**Growth strategies:**\n\u2192 Smart nudges (due bills, reminders) \u2192 \u2191 Bill pay frequency\n\u2192 Gamify streaks or cashback missions \u2192 \u2191 Weekly transactions\n\u2192 Simplify flows (1-tap repeat) \u2192 \u2191 Conversion Rate\n\u2192 Targeted education for savings/investments \u2192 \u2191 financial tool engagement"},
    ],
  },
];


/* ═══════════════════════════════════════════════════
   PRACTICE Q&A COMPONENTS
═══════════════════════════════════════════════════ */
function PracticeCard({ q, idx, accent }: { q: PracticeQ; idx: number; accent: string }) {
  const [state, setState] = useState<"idle" | "confirm" | "revealed">("idle");

  return (
    <div className="mb-4 rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${BORDER}`, background: SURFACE, boxShadow: "0 1px 6px rgba(99,91,255,0.05)" }}>

      {/* Question row */}
      <div className="flex items-start gap-4 p-5">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
          style={{ background: `${accent}14`, color: accent, border: `1px solid ${accent}28` }}>
          {idx + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold mb-1 leading-snug" style={{ color: WHITE }}>{q.title}</p>
          <p className="text-[13px] leading-relaxed" style={{ color: MUTED }}>{q.prompt}</p>
        </div>
        {state !== "revealed" && (
          <button onClick={() => setState(state === "confirm" ? "idle" : "confirm")}
            className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150 whitespace-nowrap"
            style={{ background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}
            onMouseEnter={e => { e.currentTarget.style.background = `${accent}20`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${accent}12`; }}>
            View Sample Answer
          </button>
        )}
        {state === "revealed" && (
          <button onClick={() => setState("idle")}
            className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap"
            style={{ background: CARD, color: MUTED, border: `1px solid ${BORDER}` }}>
            Collapse ↑
          </button>
        )}
      </div>

      {/* Brainstorm confirmation */}
      <AnimatePresence>
        {state === "confirm" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{ overflow: "hidden" }}>
            <div className="mx-5 mb-5 p-5 rounded-2xl text-center"
              style={{ background: `${accent}06`, border: `1px solid ${accent}18` }}>
              <div className="text-2xl mb-2">🤔</div>
              <p className="text-sm font-bold mb-1" style={{ color: WHITE }}>
                Have you brainstormed enough before seeing the answer?
              </p>
              <p className="text-xs mb-5" style={{ color: MUTED }}>
                The best way to learn KPI Trees is to attempt the structure yourself first.
              </p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <button onClick={() => setState("revealed")}
                  className="px-5 py-2 rounded-xl text-sm font-bold transition-all duration-150"
                  style={{ background: `linear-gradient(135deg, ${accent}, ${VIO})`, color: BTN, boxShadow: `0 4px 14px ${accent}35` }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
                  Yes, show me the answer ✓
                </button>
                <button onClick={() => setState("idle")}
                  className="px-5 py-2 rounded-xl text-sm font-medium transition-all duration-150"
                  style={{ background: CARD, color: MUTED, border: `1px solid ${BORDER}` }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#e0e0f0"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = CARD; }}>
                  Let me think again →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Answer */}
      <AnimatePresence>
        {state === "revealed" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}>
            <div className="px-5 pb-6 pt-2 border-t" style={{ borderColor: BORDER }}>
              {renderBlocks(q.blocks, accent)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PracticeSection({ accent }: { accent: string }) {
  return (
    <div className="my-10">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px flex-1" style={{ background: BORDER }} />
        <span className="text-xs font-mono uppercase tracking-widest px-3 py-1.5 rounded-full font-semibold"
          style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}22` }}>
          🎯 Practice Questions
        </span>
        <div className="h-px flex-1" style={{ background: BORDER }} />
      </div>
      <p className="text-sm text-center mb-7" style={{ color: MUTED }}>
        10 interview-style scenarios — attempt each yourself before revealing the sample answer.
      </p>
      {PRACTICE_QS.map((q, i) => (
        <PracticeCard key={q.num} q={q} idx={i} accent={accent} />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STORAGE KEY
═══════════════════════════════════════════════════ */
const TOTAL = CHAPTERS.length;
const STORAGE_KEY = "pm-course-v1";

/* ═══════════════════════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════════════════════ */
function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="fixed top-0 inset-x-0 z-50" style={{ height: 3, background: "rgba(255,255,255,0.06)" }}>
      <motion.div
        className="h-full"
        style={{ background: `linear-gradient(90deg, ${PRI}, ${VIO})` }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════════════ */
function Sidebar({
  current, completed, onSelect, isOpen, onClose
}: {
  current: number;
  completed: Set<string>;
  onSelect: (i: number) => void;
  isOpen: boolean;
  onClose: () => void;
}) {
  const pct = Math.round((completed.size / TOTAL) * 100);

  const catGroups: Record<Category, number[]> = {
    foundation: [], metrics: [], strategy: [], design: [], technical: [],
  };
  CHAPTERS.forEach((ch, i) => catGroups[ch.category].push(i));

  return (
    <>
      {/* overlay on mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col overflow-hidden transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ width: 272, background: SB_BG, borderRight: `1px solid ${SB_BORDER}` }}>

        {/* header */}
        <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b" style={{ borderColor: SB_BORDER }}>
          <div className="flex items-center justify-between mb-4">
            <Link href="/#library"
              className="flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: D_MUTED, fontFamily: "var(--font-mono)" }}
              onMouseEnter={e => (e.currentTarget.style.color = D_WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = D_MUTED)}>
              <ArrowLeft size={12} /> home
            </Link>
            <button onClick={onClose} className="lg:hidden p-1 rounded" style={{ color: D_MUTED }}>
              <X size={16} />
            </button>
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] font-mono mb-1" style={{ color: D_MUTED }}>PM Master Guide</p>
          <h2 className="text-sm font-black leading-snug" style={{ color: D_WHITE }}>Beginner to Intermediate</h2>

          {/* progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px]" style={{ color: D_MUTED }}>Progress</span>
              <span className="text-[11px] font-semibold" style={{ color: PRI }}>{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${PRI}, ${VIO})` }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5 }} />
            </div>
            <p className="text-[10px] mt-1.5" style={{ color: D_DIM }}>{completed.size} of {TOTAL} chapters</p>
          </div>
        </div>

        {/* chapter list */}
        <div className="flex-1 overflow-y-auto py-3 px-2">
          {(Object.keys(catGroups) as Category[]).map(cat => {
            const indices = catGroups[cat];
            if (!indices.length) return null;
            const accent = CAT_COLOR[cat];
            const Icon = CAT_ICON[cat];
            return (
              <div key={cat} className="mb-4">
                <div className="flex items-center gap-2 px-3 mb-1.5">
                  <Icon size={10} style={{ color: accent }} />
                  <span className="text-[9px] uppercase tracking-[0.18em] font-semibold"
                    style={{ color: accent, fontFamily: "var(--font-mono)" }}>{CAT_LABEL[cat]}</span>
                </div>
                {indices.map(i => {
                  const ch = CHAPTERS[i];
                  const isCurrent = i === current;
                  const isDone = completed.has(ch.id);
                  return (
                    <button key={ch.id}
                      onClick={() => { onSelect(i); onClose(); }}
                      className="w-full text-left px-3 py-2.5 rounded-lg mb-0.5 flex items-start gap-2.5 transition-all duration-150"
                      style={{
                        background: isCurrent ? `${accent}22` : "transparent",
                        border: isCurrent ? `1px solid ${accent}35` : "1px solid transparent",
                      }}>
                      <div className="flex-shrink-0 mt-0.5">
                        {isDone
                          ? <CheckCircle2 size={13} style={{ color: accent }} />
                          : <Circle size={13} style={{ color: isCurrent ? accent : D_DIM }} />
                        }
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-mono" style={{ color: isCurrent ? accent : D_DIM }}>
                            {typeof ch.num === "string" ? ch.num : String(ch.num).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="text-[12px] leading-snug font-medium truncate"
                          style={{ color: isCurrent ? D_WHITE : (isDone ? "rgba(255,255,255,0.55)" : D_MUTED) }}>
                          {ch.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}

/* ═══════════════════════════════════════════════════
   CHAPTER CONTENT AREA
═══════════════════════════════════════════════════ */
function ChapterContent({ ch, idx, completed }: { ch: Chapter; idx: number; completed: Set<string> }) {
  const accent = CAT_COLOR[ch.category];
  const isDone = completed.has(ch.id);

  return (
    <div className="max-w-[740px] mx-auto px-6 sm:px-10 py-12">
      {/* chapter meta */}
      <div className="flex items-center gap-3 flex-wrap mb-6">
        <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
          style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}28`, fontFamily: "var(--font-mono)" }}>
          {CAT_LABEL[ch.category]}
        </span>
        <span className="flex items-center gap-1.5 text-[11px]" style={{ color: MUTED }}>
          <Clock size={11} /> {ch.readTime}
        </span>
        {isDone && (
          <span className="flex items-center gap-1.5 text-[11px]" style={{ color: accent }}>
            <CheckCircle2 size={11} /> Completed
          </span>
        )}
      </div>

      {/* large faint chapter number */}
      <div className="relative mb-2">
        <div className="absolute -top-4 -left-2 font-black select-none pointer-events-none leading-none"
          style={{ fontSize: 96, color: accent, opacity: 0.05, fontFamily: "var(--font-display)" }}>
          {typeof ch.num === "string" ? ch.num : String(ch.num).padStart(2, "0")}
        </div>
        <div className="relative">
          <p className="text-[11px] font-mono uppercase tracking-widest mb-1" style={{ color: accent }}>
            {typeof ch.num === "number" ? `Chapter ${ch.num}` : "Bonus"} · {ch.emoji}
          </p>
          <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight" style={{ color: WHITE }}>
            {ch.title}
          </h1>
        </div>
      </div>

      {/* divider */}
      <div className="h-px mt-6 mb-8" style={{ background: `linear-gradient(to right, ${accent}60, transparent)` }} />

      {/* rendered content */}
      {renderBlocks(ch.blocks, accent)}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   BOTTOM NAVIGATION
═══════════════════════════════════════════════════ */
function BottomNav({
  current, completed, onPrev, onNext, onComplete,
}: {
  current: number;
  completed: Set<string>;
  onPrev: () => void;
  onNext: () => void;
  onComplete: () => void;
}) {
  const ch = CHAPTERS[current];
  const isDone = completed.has(ch.id);
  const isLast = current === TOTAL - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t"
      style={{ background: "rgba(255,255,255,0.96)", borderColor: BORDER, backdropFilter: "blur(20px)", boxShadow: "0 -1px 12px rgba(99,91,255,0.07)" }}>
      <div className="max-w-[720px] mx-auto px-6 py-3 flex items-center gap-4">
        {/* prev */}
        <button onClick={onPrev} disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: CARD, color: TEXT, border: `1px solid ${BORDER}` }}
          onMouseEnter={e => { if (current > 0) e.currentTarget.style.background = "#e4e4f4"; }}
          onMouseLeave={e => { e.currentTarget.style.background = CARD; }}>
          <ArrowLeft size={14} /> Prev
        </button>

        {/* center */}
        <div className="flex-1 text-center">
          <p className="text-[11px]" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
            {current + 1} / {TOTAL}
          </p>
        </div>

        {/* mark complete + next */}
        <div className="flex items-center gap-2">
          {!isDone && (
            <button onClick={onComplete}
              className="px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
              style={{ background: `${CAT_COLOR[ch.category]}18`, color: CAT_COLOR[ch.category],
                border: `1px solid ${CAT_COLOR[ch.category]}30` }}>
              Mark Done ✓
            </button>
          )}
          {isLast ? (
            <button onClick={onComplete}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: BTN, boxShadow: `0 4px 16px ${PRI}40` }}>
              <Award size={14} /> Finish!
            </button>
          ) : (
            <button onClick={onNext}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: BTN, boxShadow: `0 4px 16px ${PRI}40` }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1"; }}>
              Next <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PM & STARTUPS LANDING PAGE  (tile hub)
═══════════════════════════════════════════════════ */
function PMLanding({ onOpenCourse, completed }: {
  onOpenCourse: () => void;
  completed: Set<string>;
}) {
  const pct = Math.min(Math.round((completed.size / TOTAL) * 100), 100);
  const hasProgress = completed.size > 0;
  const isComplete = completed.size >= TOTAL;
  const nextChapter = Math.min(completed.size + 1, TOTAL);

  const tiles = [
    {
      icon: BookOpen,
      label: "PM Master Guide",
      tag: hasProgress ? `${pct}% complete` : "Beginner → Intermediate",
      tagColor: hasProgress ? EMR : PRI,
      desc: `${TOTAL} chapters covering frameworks, metrics, strategy, design thinking, and technical fundamentals — all in one place.`,
      color: PRI,
      bg: `${PRI}0e`,
      border: `${PRI}25`,
      ready: true,
      cta: isComplete ? "Review Course →" : hasProgress ? `Continue (Ch ${nextChapter}/${TOTAL})` : "Start Course →",
      onClick: onOpenCourse,
    },
    {
      icon: Zap,
      label: "Interview Playbook",
      tag: "Coming Soon",
      tagColor: TEAL,
      desc: "Real PM interview questions, mock frameworks, and answers that actually got people hired. No fluff.",
      color: TEAL,
      bg: `${TEAL}08`,
      border: `${TEAL}18`,
      ready: false,
      cta: "Coming Soon",
      onClick: undefined,
    },
    {
      icon: Star,
      label: "Case Study Bank",
      tag: "Coming Soon",
      tagColor: AMB,
      desc: "Teardowns of real products — what worked, what didn't, and the product lessons buried inside.",
      color: AMB,
      bg: `${AMB}08`,
      border: `${AMB}18`,
      ready: false,
      cta: "Coming Soon",
      onClick: undefined,
    },
  ];

  return (
    <div className="min-h-screen px-5 py-16 sm:py-24 relative overflow-hidden" style={{ background: D_BG }}>
      {/* ambient glows */}
      <div className="absolute pointer-events-none" style={{ top: "-10%", left: "-5%", width: 600, height: 600,
        background: `radial-gradient(ellipse, ${PRI}14 0%, transparent 65%)` }} />
      <div className="absolute pointer-events-none" style={{ bottom: "-5%", right: "-5%", width: 450, height: 450,
        background: `radial-gradient(ellipse, ${VIO}0e 0%, transparent 65%)` }} />

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* back link */}
        <Link href="/#library"
          className="inline-flex items-center gap-1.5 text-xs mb-10 transition-colors"
          style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
          onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
          onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
          <ArrowLeft size={12} /> back to library
        </Link>

        {/* header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }} className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: `${PRI}12`, border: `1px solid ${PRI}28` }}>
            <Layers size={11} style={{ color: PRI }} />
            <span className="text-[11px] font-mono" style={{ color: PRI }}>PM &amp; Startups</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-3"
            style={{ color: D_WHITE, letterSpacing: "-1.5px" }}>
            Build. Think. Ship.<br />
            <span style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Repeat.
            </span>
          </h1>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: D_TEXT }}>
            Career guides, startup notes, and frameworks — everything I wish someone had handed me when I was starting out.
          </p>
        </motion.div>

        {/* tile grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tiles.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <motion.div key={tile.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
                <div
                  className="flex flex-col h-full rounded-2xl p-6 relative overflow-hidden"
                  style={{
                    background: tile.bg,
                    border: `1px solid ${tile.border}`,
                    opacity: tile.ready ? 1 : 0.72,
                  }}>
                  {/* subtle glow */}
                  <div className="absolute pointer-events-none" style={{
                    top: -30, right: -30, width: 120, height: 120,
                    background: `radial-gradient(ellipse, ${tile.color}18 0%, transparent 70%)`,
                  }} />

                  {/* icon + tag */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${tile.color}18`, border: `1px solid ${tile.color}28` }}>
                      <Icon size={16} style={{ color: tile.color }} />
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-1 rounded-full"
                      style={{ background: `${tile.tagColor}14`, color: tile.tagColor, border: `1px solid ${tile.tagColor}22` }}>
                      {tile.tag}
                    </span>
                  </div>

                  <p className="text-sm font-bold mb-2" style={{ color: D_WHITE }}>{tile.label}</p>
                  <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color: D_MUTED }}>{tile.desc}</p>

                  {/* progress bar (course only) */}
                  {tile.ready && hasProgress && (
                    <div className="mb-4">
                      <div className="h-1 rounded-full w-full" style={{ background: `${PRI}20` }}>
                        <div className="h-1 rounded-full transition-all duration-700"
                          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${PRI}, ${VIO})` }} />
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  {tile.ready ? (
                    <button onClick={tile.onClick}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold transition-all duration-200"
                      style={{ background: `linear-gradient(135deg, ${tile.color}, ${VIO})`, color: BTN, boxShadow: `0 4px 16px ${tile.color}30` }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${tile.color}45`; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 4px 16px ${tile.color}30`; }}>
                      {tile.cta}
                    </button>
                  ) : (
                    <div className="flex items-center justify-center w-full py-2.5 rounded-xl text-xs font-semibold"
                      style={{ background: "rgba(255,255,255,0.04)", color: D_DIM, border: `1px solid ${D_BORDER}` }}>
                      {tile.cta}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   COVER / LANDING PAGE
═══════════════════════════════════════════════════ */
function CoverPage({ onStart, hasProgress, completed, onContinue, onBack }: {
  onStart: () => void;
  hasProgress: boolean;
  completed: Set<string>;
  onContinue: () => void;
  onBack: () => void;
}) {
  const pct = Math.round((completed.size / TOTAL) * 100);

  const modules = [
    { icon: Target,    label: "Foundation",          count: 5,  color: PRI  },
    { icon: TrendingUp,label: "Metrics & Frameworks", count: 5,  color: TEAL },
    { icon: Zap,       label: "Strategy",             count: 5,  color: AMB  },
    { icon: Sparkles,  label: "Design Thinking",      count: 5,  color: ROSE },
    { icon: Code,      label: "Technical Skills",     count: 3,  color: EMR  },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-20 relative overflow-hidden"
      style={{ background: D_BG }}>

      {/* ambient glows */}
      <div className="absolute pointer-events-none" style={{ top: "-20%", left: "-10%", width: 600, height: 600,
        background: `radial-gradient(ellipse, ${PRI}18 0%, transparent 65%)` }} />
      <div className="absolute pointer-events-none" style={{ bottom: "-10%", right: "-10%", width: 500, height: 500,
        background: `radial-gradient(ellipse, ${VIO}12 0%, transparent 65%)` }} />

      <motion.div className="relative z-10 max-w-2xl w-full"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

        {/* badge */}
        <div className="flex items-center gap-2 mb-6">
          <button onClick={onBack} className="flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: D_MUTED, fontFamily: "var(--font-mono)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
            onMouseEnter={e => (e.currentTarget.style.color = D_WHITE)}
            onMouseLeave={e => (e.currentTarget.style.color = D_MUTED)}>
            <ArrowLeft size={12} /> back to PM &amp; Startups
          </button>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
          style={{ background: `${PRI}14`, border: `1px solid ${PRI}28` }}>
          <BookOpen size={11} style={{ color: PRI }} />
          <span className="text-[11px] font-mono" style={{ color: PRI }}>PM Master Guide · Beginner to Intermediate</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-4"
          style={{ color: D_WHITE, letterSpacing: "-1.5px" }}>
          Everything you need to
          <span style={{ display: "block", background: `linear-gradient(135deg, ${PRI}, ${VIO})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            think like a PM.
          </span>
        </h1>

        <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: D_TEXT }}>
          A self-paced course covering frameworks, metrics, strategy, design thinking, and technical fundamentals — curated for aspiring and growing Product Managers.
        </p>

        {/* stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Chapters", value: String(TOTAL) },
            { label: "Reading time", value: "~2.5 hrs" },
            { label: "Frameworks", value: "20+" },
          ].map(s => (
            <div key={s.label} className="rounded-xl px-4 py-4 text-center"
              style={{ background: D_CARD, border: `1px solid ${D_BORDER}` }}>
              <p className="text-2xl font-black mb-0.5" style={{ color: D_WHITE }}>{s.value}</p>
              <p className="text-[11px]" style={{ color: D_MUTED }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* modules */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
          {modules.map(m => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{ background: `${m.color}0a`, border: `1px solid ${m.color}20` }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${m.color}18` }}>
                  <Icon size={13} style={{ color: m.color }} />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: D_WHITE }}>{m.label}</p>
                  <p className="text-[10px]" style={{ color: D_MUTED }}>{m.count} chapters</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        {hasProgress ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button onClick={onContinue}
              className="flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200"
              style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: BTN, boxShadow: `0 8px 32px ${PRI}40` }}>
              Continue ({pct}% done) <ChevronRight size={18} />
            </button>
            <button onClick={onStart}
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-150"
              style={{ background: D_CARD, color: D_MUTED, border: `1px solid ${D_BORDER}` }}>
              <RotateCcw size={14} /> Restart
            </button>
          </div>
        ) : (
          <button onClick={onStart}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200"
            style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: BTN, boxShadow: `0 8px 32px ${PRI}40` }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${PRI}55`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 32px ${PRI}40`; }}>
            Start Course <ChevronRight size={18} />
          </button>
        )}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   COMPLETION SCREEN
═══════════════════════════════════════════════════ */
function CompletionScreen({ onRestart }: { onRestart: () => void }) {
  const [showFeedback, setShowFeedback] = useState(false);

  const feedbackHref = "https://www.linkedin.com/in/yugal11/";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center relative overflow-hidden"
      style={{ background: D_BG }}>
      <div className="absolute pointer-events-none inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 40%, ${PRI}20 0%, transparent 60%)` }} />

      <motion.div className="relative z-10 max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

        <div className="text-6xl mb-6">🎉</div>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{ background: `${PRI}18`, border: `1px solid ${PRI}30` }}>
          <Award size={14} style={{ color: PRI }} />
          <span className="text-xs font-semibold" style={{ color: PRI }}>Course Complete!</span>
        </div>
        <h1 className="text-4xl font-black mb-4 leading-tight" style={{ color: D_WHITE, letterSpacing: "-1px" }}>
          You&apos;ve completed the
          <span style={{ display: "block", background: `linear-gradient(135deg, ${PRI}, ${VIO})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            PM Master Guide.
          </span>
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: D_TEXT }}>
          You now have a solid foundation in product thinking — from discovery to metrics, strategy, design, and tech. Go build something.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <button
            onClick={() => setShowFeedback(true)}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-200"
            style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: BTN, boxShadow: `0 8px 28px ${PRI}40` }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
            Finish! 🎉
          </button>
          <button onClick={onRestart}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium"
            style={{ background: D_CARD, color: D_TEXT, border: `1px solid ${D_BORDER}` }}>
            <RotateCcw size={14} /> Restart Course
          </button>
        </div>

        <Link href="/#library" className="text-xs" style={{ color: DIM }}
          onMouseEnter={e => (e.currentTarget.style.color = MUTED)}
          onMouseLeave={e => (e.currentTarget.style.color = DIM)}>
          ← back to library
        </Link>
      </motion.div>

      {/* ── Feedback Modal ── */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: "rgba(7,9,26,0.85)", backdropFilter: "blur(12px)" }}
            onClick={() => setShowFeedback(false)}>
            <motion.div
              className="relative w-full max-w-md rounded-3xl px-8 py-10 text-center"
              initial={{ scale: 0.88, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 16 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: D_SURFACE, border: `1px solid ${D_BORDER2}`, boxShadow: `0 32px 80px rgba(0,0,0,0.6)` }}
              onClick={e => e.stopPropagation()}>

              {/* close */}
              <button onClick={() => setShowFeedback(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                style={{ background: "rgba(255,255,255,0.06)", color: D_MUTED }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
                <X size={13} />
              </button>

              <div className="text-4xl mb-4">🙏</div>

              <h2 className="text-2xl font-black mb-2" style={{ color: D_WHITE, letterSpacing: "-0.5px" }}>
                Hope you learned something!
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: D_TEXT }}>
                I&apos;d genuinely love to hear what you thought — what was useful, what was confusing, or just a quick hi. Drop me a note, it takes 30 seconds.
              </p>

              {/* stars decoration */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={PRI} style={{ color: PRI, opacity: 0.9 - i * 0.12 }} />
                ))}
              </div>

              <a href={feedbackHref}
                className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-sm font-bold mb-3 transition-all duration-200"
                style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: BTN, boxShadow: `0 6px 24px ${PRI}40`, textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <Mail size={14} /> Connect on LinkedIn →
              </a>

              <button onClick={() => setShowFeedback(false)}
                className="text-xs transition-colors"
                style={{ color: D_DIM, background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.color = D_MUTED)}
                onMouseLeave={e => (e.currentTarget.style.color = D_DIM)}>
                Maybe later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */
export default function PMCoursePage() {
  const [phase, setPhase] = useState<"landing" | "cover" | "reading" | "done">("landing");
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showMidFeedback, setShowMidFeedback] = useState(false);
  const [midShown, setMidShown] = useState(false);

  /* load from localStorage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { completedIds, currentIdx, phaseVal } = JSON.parse(raw);
        if (completedIds) setCompleted(new Set(completedIds));
        if (typeof currentIdx === "number") setCurrent(currentIdx);
        if (phaseVal === "done") setPhase("done");
        else if (phaseVal === "reading" || phaseVal === "cover") setPhase("landing");
      }
      if (localStorage.getItem("pm-mid-feedback-shown") === "1") setMidShown(true);
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  /* save to localStorage */
  const save = useCallback((c: Set<string>, idx: number, ph: "landing" | "cover" | "reading" | "done") => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedIds: [...c], currentIdx: idx, phaseVal: ph }));
    } catch { /* ignore */ }
  }, []);

  /* scroll to top on chapter change */
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [current]);

  const markComplete = useCallback(() => {
    const ch = CHAPTERS[current];
    const next = new Set(completed);
    next.add(ch.id);
    setCompleted(next);
    save(next, current, "reading");
  }, [current, completed, save]);

  const goNext = useCallback(() => {
    markComplete();
    if (current < TOTAL - 1) {
      const nextIdx = current + 1;
      setCurrent(nextIdx);
      save(completed, nextIdx, "reading");
      // mid-course nudge after completing Chapter 3 (index 2)
      if (current === 2 && !midShown) {
        setTimeout(() => setShowMidFeedback(true), 700);
        setMidShown(true);
        try { localStorage.setItem("pm-mid-feedback-shown", "1"); } catch { /* ignore */ }
      }
    } else {
      setPhase("done");
      save(completed, current, "done");
    }
  }, [current, markComplete, completed, save, midShown]);

  const goPrev = useCallback(() => {
    if (current > 0) {
      const prevIdx = current - 1;
      setCurrent(prevIdx);
      save(completed, prevIdx, "reading");
    }
  }, [current, completed, save]);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    save(completed, idx, "reading");
  }, [completed, save]);

  const openCourse = () => {
    setPhase("cover");
    save(completed, current, "cover");
  };

  const startCourse = () => {
    setCurrent(0);
    setPhase("reading");
    save(completed, 0, "reading");
  };

  const continueCourse = () => {
    setPhase("reading");
    save(completed, current, "reading");
  };

  const backToLanding = () => {
    setPhase("landing");
    save(completed, current, "landing");
  };

  const restart = () => {
    const empty = new Set<string>();
    setCompleted(empty);
    setCurrent(0);
    setPhase("landing");
    save(empty, 0, "landing");
  };

  const pct = Math.round((completed.size / TOTAL) * 100);

  if (!hydrated) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
      <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: `${PRI}33`, borderTopColor: PRI }} />
    </div>
  );

  if (phase === "landing") {
    return <PMLanding onOpenCourse={openCourse} completed={completed} />;
  }

  if (phase === "cover") {
    return <CoverPage onStart={startCourse} hasProgress={completed.size > 0}
      completed={completed} onContinue={continueCourse} onBack={backToLanding} />;
  }

  if (phase === "done") {
    return <CompletionScreen onRestart={restart} />;
  }

  /* ── Reading View ── */
  return (
    <div className="min-h-screen" style={{ background: BG }}>
      <ProgressBar pct={pct} />

      {/* mobile top bar */}
      <div className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 py-3 lg:hidden"
        style={{ background: "rgba(255,255,255,0.95)", borderBottom: `1px solid ${BORDER}`, backdropFilter: "blur(20px)", boxShadow: "0 1px 8px rgba(99,91,255,0.06)" }}>
        <button onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-sm font-medium" style={{ color: WHITE }}>
          <Menu size={18} />
          <span className="text-xs" style={{ color: MUTED }}>Ch {current + 1}/{TOTAL}</span>
        </button>
        <span className="text-xs font-mono font-semibold" style={{ color: PRI }}>{pct}% done</span>
      </div>

      <Sidebar current={current} completed={completed}
        onSelect={goTo} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* content */}
      <div ref={contentRef} className="lg:pl-[272px] pt-12 lg:pt-3 pb-20 min-h-screen overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={CHAPTERS[current].id}
            initial={{ opacity: 0, y: 14, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <ChapterContent ch={CHAPTERS[current]} idx={current} completed={completed} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="lg:pl-[272px]">
        <BottomNav current={current} completed={completed}
          onPrev={goPrev} onNext={goNext} onComplete={markComplete} />
      </div>

      {/* ── Mid-course LinkedIn feedback popup ── */}
      <AnimatePresence>
        {showMidFeedback && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: "rgba(7,9,26,0.75)", backdropFilter: "blur(10px)" }}
            onClick={() => setShowMidFeedback(false)}>
            <motion.div
              className="relative w-full max-w-sm rounded-3xl px-7 py-8"
              initial={{ y: 40, scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 30, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: D_SURFACE, border: `1px solid ${D_BORDER2}`, boxShadow: "0 24px 60px rgba(0,0,0,0.5)" }}
              onClick={e => e.stopPropagation()}>

              <button onClick={() => setShowMidFeedback(false)}
                className="absolute top-3.5 right-3.5 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)", color: D_MUTED }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
                <X size={12} />
              </button>

              <div className="text-3xl mb-3">👋</div>
              <h3 className="text-lg font-black mb-1.5" style={{ color: D_WHITE, letterSpacing: "-0.3px" }}>
                3 chapters in — how&apos;s it going?
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: D_TEXT }}>
                I&apos;d love to hear your thoughts so far. Connect with me on LinkedIn and drop a quick note — I read every message.
              </p>

              <a href="https://www.linkedin.com/in/yugal11/" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold mb-2.5 transition-all duration-200"
                style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: BTN, boxShadow: `0 4px 18px ${PRI}35`, textDecoration: "none" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}>
                <Mail size={13} /> Connect on LinkedIn →
              </a>

              <button onClick={() => setShowMidFeedback(false)}
                className="w-full text-center text-xs py-1.5 transition-colors"
                style={{ color: D_DIM, background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.color = D_MUTED)}
                onMouseLeave={e => (e.currentTarget.style.color = D_DIM)}>
                Continue reading
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
