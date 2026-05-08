"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Circle, BookOpen,
  Clock, Award, Menu, X, ChevronRight, Zap, Target,
  TrendingUp, Code, Brain, Sparkles, RotateCcw,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════ */
const BG      = "#07091a";
const SURFACE = "#0d1025";
const CARD    = "#111630";
const BORDER  = "rgba(255,255,255,0.07)";
const BORDER2 = "rgba(255,255,255,0.12)";
const PRI     = "#635bff";
const VIO     = "#8b5cf6";
const TEAL    = "#0d9488";
const AMB     = "#d97706";
const ROSE    = "#db2777";
const EMR     = "#059669";
const WHITE   = "rgba(255,255,255,0.93)";
const TEXT    = "rgba(255,255,255,0.72)";
const MUTED   = "rgba(255,255,255,0.35)";
const DIM     = "rgba(255,255,255,0.18)";

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
  | { t: "img";   label: string; desc: string }
  | { t: "divider" };

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
        return <p key={i} className="mb-4 leading-[1.85] text-[15px]" style={{ color: TEXT }}>{ri(b.txt)}</p>;

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
          <blockquote key={i} className="my-6 pl-5 py-1" style={{ borderLeft: `2px solid ${accent}` }}>
            <p className="text-base italic leading-relaxed" style={{ color: TEXT }}>{b.txt}</p>
            {b.author && <p className="text-xs mt-2" style={{ color: MUTED }}>— {b.author}</p>}
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
        return (
          <div key={i} className="my-6 rounded-xl flex flex-col items-center justify-center py-10 px-6 text-center"
            style={{ background: CARD, border: `2px dashed ${BORDER2}` }}>
            <span className="text-3xl mb-3">🖼️</span>
            <p className="text-xs font-semibold mb-1" style={{ color: accent, fontFamily: "var(--font-mono)" }}>{b.label}</p>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: MUTED }}>{b.desc}</p>
          </div>
        );

      case "divider":
        return <hr key={i} className="my-8" style={{ borderColor: BORDER }} />;

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
      {t:"img",label:"KPI Tree Diagram",desc:"A tree visualization showing how 'Profit' decomposes into Revenue and Costs, which further break into sub-metrics at each level — helping you identify exactly where to focus."},
      {t:"tip",txt:"Practice: Try building KPI trees for an e-commerce GMV goal, a SaaS MRR target, or a ride-sharing platform's daily rides. This is a classic PM interview exercise.\n\n10 practice questions are linked at the end of this chapter in the original guide."},
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
      {t:"h2",txt:"B. Kano Model"},
      {t:"p",txt:"Customer satisfaction is directly influenced by how effectively a feature is implemented — from 'Didn't do it at all' to 'Did it Very Well'."},
      {t:"table",heads:["Category","Meaning","Smartphone Example"],rows:[
        ["**Expected (Must-Be)**","Customers assume it exists. Absence = instant dissatisfaction.","Ability to make calls and send texts"],
        ["**Normal (Performance)**","More of it = more satisfaction. Linear relationship.","Battery life, storage capacity"],
        ["**Exciting (Attractive)**","Unexpected delight. Absence is fine — presence creates wow.","Advanced AI photo editor"],
        ["**Indifferent**","Presence or absence doesn't affect satisfaction.","Color of the internal circuit board"],
      ]},
      {t:"callout",title:"How to Measure with Kano",txt:"Ask users two questions per feature:\n1. 'If you **HAD** this feature, how do you feel?'\n2. 'If you **DIDN'T** have this feature, how do you feel?'\n\nAnswers: I like it / I expect it / I'm neutral / I can tolerate it / I dislike it"},
      {t:"h2",txt:"C. RICE Framework"},
      {t:"callout",title:"RICE Score Formula",txt:"**RICE Score = (Reach × Impact × Confidence) / Effort**\n\nHigher score = higher priority."},
      {t:"table",heads:["Factor","What It Measures","Example"],rows:[
        ["**Reach**","How many people are affected in a given time frame","1,000 users/month · 20% interact → Reach = 200"],
        ["**Impact**","How strongly it influences each user (3=Massive, 2=High, 1=Medium, 0.5=Low)","One-click checkout = 2 (High) · Dark mode = 1 (Medium)"],
        ["**Confidence**","How certain you are of your estimates (100%/80%/50%)","Good data on Reach & Effort, limited on Impact → 80%"],
        ["**Effort**","Total work in person-months (only negative factor)","1wk planning + 4wk design + 3wk FE + 4wk BE = 3 person-months"],
      ]},
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
      {t:"img",label:"Customer Journey Map — Spotify Example",desc:"A journey map from when a user first opens Spotify on mobile, through to whether they like a song a friend shared. Includes touchpoints, user thoughts, feelings, and pain points at each stage."},
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
      {t:"img",label:"Mind Map Example",desc:"A radial mind map showing 'Increase ARR to $6M' at the center, with branches for each 'By' solution, sub-branches for tactics, and annotations for the 'Because' and 'Without' constraints."},
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
      {t:"h2",txt:"A/B Testing"},
      {t:"p",txt:"A/B testing (split-testing) tests variations of digital products. You start with a goal and test two versions with similar audiences."},
      {t:"callout",title:"Simple A/B Testing Framework",txt:"1. **What is the question?** — What hypothesis are you testing?\n2. **What are the tests?** — Which variants will you run?\n3. **What is the impact?** — How will you measure success and what's the target metric?"},
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
        style={{ width: 272, background: SURFACE, borderRight: `1px solid ${BORDER}` }}>

        {/* header */}
        <div className="flex-shrink-0 px-5 pt-5 pb-4 border-b" style={{ borderColor: BORDER }}>
          <div className="flex items-center justify-between mb-4">
            <Link href="/#library"
              className="flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
              onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
              <ArrowLeft size={12} /> home
            </Link>
            <button onClick={onClose} className="lg:hidden p-1 rounded" style={{ color: MUTED }}>
              <X size={16} />
            </button>
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] font-mono mb-1" style={{ color: MUTED }}>PM Master Guide</p>
          <h2 className="text-sm font-black leading-snug" style={{ color: WHITE }}>Beginner to Intermediate</h2>

          {/* progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px]" style={{ color: MUTED }}>Progress</span>
              <span className="text-[11px] font-semibold" style={{ color: PRI }}>{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
              <motion.div className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${PRI}, ${VIO})` }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5 }} />
            </div>
            <p className="text-[10px] mt-1.5" style={{ color: DIM }}>{completed.size} of {TOTAL} chapters</p>
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
                        background: isCurrent ? `${accent}18` : "transparent",
                        border: isCurrent ? `1px solid ${accent}30` : "1px solid transparent",
                      }}>
                      <div className="flex-shrink-0 mt-0.5">
                        {isDone
                          ? <CheckCircle2 size={13} style={{ color: accent }} />
                          : <Circle size={13} style={{ color: isCurrent ? accent : DIM }} />
                        }
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[9px] font-mono" style={{ color: isCurrent ? accent : DIM }}>
                            {typeof ch.num === "string" ? ch.num : String(ch.num).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="text-[12px] leading-snug font-medium truncate"
                          style={{ color: isCurrent ? WHITE : (isDone ? TEXT : MUTED) }}>
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
    <div className="max-w-[720px] mx-auto px-6 py-10">
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
      style={{ background: `${SURFACE}ee`, borderColor: BORDER, backdropFilter: "blur(20px)" }}>
      <div className="max-w-[720px] mx-auto px-6 py-3 flex items-center gap-4">
        {/* prev */}
        <button onClick={onPrev} disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "rgba(255,255,255,0.05)", color: TEXT, border: `1px solid ${BORDER}` }}
          onMouseEnter={e => { if (current > 0) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}>
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
              style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: WHITE, boxShadow: `0 4px 16px ${PRI}40` }}>
              <Award size={14} /> Finish!
            </button>
          ) : (
            <button onClick={onNext}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: WHITE, boxShadow: `0 4px 16px ${PRI}40` }}
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
   COVER / LANDING PAGE
═══════════════════════════════════════════════════ */
function CoverPage({ onStart, hasProgress, completed, onContinue }: {
  onStart: () => void;
  hasProgress: boolean;
  completed: Set<string>;
  onContinue: () => void;
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
      style={{ background: BG }}>

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
          <Link href="/#library" className="flex items-center gap-1.5 text-xs transition-colors"
            style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
            onMouseEnter={e => (e.currentTarget.style.color = WHITE)}
            onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>
            <ArrowLeft size={12} /> back to library
          </Link>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
          style={{ background: `${PRI}14`, border: `1px solid ${PRI}28` }}>
          <BookOpen size={11} style={{ color: PRI }} />
          <span className="text-[11px] font-mono" style={{ color: PRI }}>PM Master Guide · Beginner to Intermediate</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-4"
          style={{ color: WHITE, letterSpacing: "-1.5px" }}>
          Everything you need to
          <span style={{ display: "block", background: `linear-gradient(135deg, ${PRI}, ${VIO})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            think like a PM.
          </span>
        </h1>

        <p className="text-base leading-relaxed mb-8 max-w-lg" style={{ color: TEXT }}>
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
              style={{ background: CARD, border: `1px solid ${BORDER}` }}>
              <p className="text-2xl font-black mb-0.5" style={{ color: WHITE }}>{s.value}</p>
              <p className="text-[11px]" style={{ color: MUTED }}>{s.label}</p>
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
                  <p className="text-xs font-semibold" style={{ color: WHITE }}>{m.label}</p>
                  <p className="text-[10px]" style={{ color: MUTED }}>{m.count} chapters</p>
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
              style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: WHITE, boxShadow: `0 8px 32px ${PRI}40` }}>
              Continue ({pct}% done) <ChevronRight size={18} />
            </button>
            <button onClick={onStart}
              className="flex items-center justify-center gap-2 px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-150"
              style={{ background: CARD, color: MUTED, border: `1px solid ${BORDER}` }}>
              <RotateCcw size={14} /> Restart
            </button>
          </div>
        ) : (
          <button onClick={onStart}
            className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200"
            style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: WHITE, boxShadow: `0 8px 32px ${PRI}40` }}
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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center relative overflow-hidden"
      style={{ background: BG }}>
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
        <h1 className="text-4xl font-black mb-4 leading-tight" style={{ color: WHITE, letterSpacing: "-1px" }}>
          You've completed the
          <span style={{ display: "block", background: `linear-gradient(135deg, ${PRI}, ${VIO})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            PM Master Guide.
          </span>
        </h1>
        <p className="text-base leading-relaxed mb-8" style={{ color: TEXT }}>
          You now have a solid foundation in product thinking — from discovery to metrics, strategy, design, and tech. Go build something.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/#library"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ background: `linear-gradient(135deg, ${PRI}, ${VIO})`, color: WHITE }}>
            Back to Library
          </Link>
          <button onClick={onRestart}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-medium"
            style={{ background: CARD, color: TEXT, border: `1px solid ${BORDER}` }}>
            <RotateCcw size={14} /> Restart Course
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */
export default function PMCoursePage() {
  const [phase, setPhase] = useState<"cover" | "reading" | "done">("cover");
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [hydrated, setHydrated] = useState(false);

  /* load from localStorage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const { completedIds, currentIdx, phaseVal } = JSON.parse(raw);
        if (completedIds) setCompleted(new Set(completedIds));
        if (typeof currentIdx === "number") setCurrent(currentIdx);
        if (phaseVal) setPhase(phaseVal);
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  /* save to localStorage */
  const save = useCallback((c: Set<string>, idx: number, ph: "cover" | "reading" | "done") => {
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
    } else {
      setPhase("done");
      save(completed, current, "done");
    }
  }, [current, markComplete, completed, save]);

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

  const startCourse = () => {
    setCurrent(0);
    setPhase("reading");
    save(completed, 0, "reading");
  };

  const continueCourse = () => {
    setPhase("reading");
    save(completed, current, "reading");
  };

  const restart = () => {
    const empty = new Set<string>();
    setCompleted(empty);
    setCurrent(0);
    setPhase("cover");
    save(empty, 0, "cover");
  };

  const pct = Math.round((completed.size / TOTAL) * 100);

  if (!hydrated) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: BG }}>
      <div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: `${PRI}33`, borderTopColor: PRI }} />
    </div>
  );

  if (phase === "cover") {
    return <CoverPage onStart={startCourse} hasProgress={completed.size > 0}
      completed={completed} onContinue={continueCourse} />;
  }

  if (phase === "done") {
    return <CompletionScreen onRestart={restart} />;
  }

  /* ── Reading View ── */
  return (
    <div className="min-h-screen" style={{ background: BG }}>
      <ProgressBar pct={pct} />

      {/* mobile top bar */}
      <div className="fixed top-0.5 inset-x-0 z-40 flex items-center justify-between px-4 py-3 lg:hidden"
        style={{ background: `${SURFACE}f0`, borderBottom: `1px solid ${BORDER}`, backdropFilter: "blur(20px)" }}>
        <button onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 text-sm font-medium" style={{ color: TEXT }}>
          <Menu size={18} />
          <span className="text-xs" style={{ color: MUTED }}>Ch {current + 1}/{TOTAL}</span>
        </button>
        <span className="text-xs font-mono" style={{ color: PRI }}>{pct}% done</span>
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
    </div>
  );
}
