"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, BookOpen, PenLine, Sparkles, X, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const CATEGORIES = [
  {
    icon: Rocket,
    label: "PM & Startups",
    desc: "Career guides, frameworks, startup notes — and what building actually looks like from the inside.",
    color: "#635bff",
    bg: "rgba(99,91,255,0.08)",
    border: "rgba(99,91,255,0.18)",
    funny: "🚧 Still under construction. Unlike most product roadmaps, this one will actually ship.",
    href: "/library/pm",
  },
  {
    icon: BookOpen,
    label: "Books & Articles",
    desc: "Reads that shifted how I think, and essays on everything from product to life to things I couldn't stop obsessing over.",
    color: "#14b8a6",
    bg: "rgba(20,184,166,0.07)",
    border: "rgba(20,184,166,0.18)",
    funny: "📚 The books are read. The notes are scattered. Give me a moment to find them.",
  },
  {
    icon: PenLine,
    label: "Poetry & Writing",
    desc: "Original works — some refined, some raw, mostly lame. Written when PRDs feel too serious. Read at your own risk.",
    color: "#845ef7",
    bg: "rgba(132,94,247,0.08)",
    border: "rgba(132,94,247,0.18)",
    funny: "✍️ The poet is still editing. He's been editing since 2021. We're working on it.",
    href: "/library/poetry",
  },
];

export default function Library() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const router = useRouter();

  function handleTileClick(i: number) {
    const cat = CATEGORIES[i] as typeof CATEGORIES[number] & { href?: string };
    if (cat.href) {
      router.push(cat.href);
    } else {
      setOpenIdx(openIdx === i ? null : i);
    }
  }

  return (
    <section id="library" className="relative">
      <div className="section-divider" />
      <div className="section-container">

        <SectionHeading
          label="// library"
          title="The Library"
          subtitle="Things I've written, read, and thought worth sharing."
        />

        {/* ── Single teaser tile ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Ambient glows */}
          <div className="absolute pointer-events-none"
            style={{ top: "-60px", left: "-60px", width: "400px", height: "400px",
              background: "radial-gradient(ellipse, rgba(99,91,255,0.09) 0%, transparent 70%)" }} />
          <div className="absolute pointer-events-none"
            style={{ bottom: "-40px", right: "-40px", width: "350px", height: "350px",
              background: "radial-gradient(ellipse, rgba(132,94,247,0.07) 0%, transparent 70%)" }} />

          <div className="relative p-8 sm:p-12 lg:p-14">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
                  style={{ background: "rgba(99,91,255,0.1)", border: "1px solid rgba(99,91,255,0.22)" }}>
                  <Sparkles size={11} style={{ color: "#635bff" }} />
                  <span className="text-xs font-mono" style={{ color: "#635bff", fontFamily: "var(--font-mono)" }}>
                    No consultants were hired.
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black mb-1.5 leading-tight"
                  style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.93)", letterSpacing: "-0.5px" }}>
                  Everything I Know,<br />
                  <span style={{ color: "#635bff" }}>Openly Shared.</span>
                </h3>
                <p className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-mono)" }}>
                  — stuff I wish someone had just told me.
                </p>

                <p className="text-sm sm:text-base leading-relaxed max-w-lg"
                  style={{ color: "rgba(255,255,255,0.35)" }}>
                  Part career resource, part personal journal. You&apos;ll find PM guides and
                  startup frameworks sitting right next to poetry and half-formed thoughts on
                  life. Some of it will help you get a job. Some of it will just remind you
                  that the person who wrote it is also figuring things out.
                </p>
              </div>

              <div className="flex-shrink-0">
                <div className="px-4 py-2 rounded-xl text-center"
                  style={{ background: "rgba(99,91,255,0.06)", border: "1px solid rgba(99,91,255,0.15)" }}>
                  <p className="text-[10px] font-mono tracking-widest uppercase mb-0.5"
                    style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>Status</p>
                  <p className="text-sm font-semibold" style={{ color: "#635bff" }}>Coming Soon</p>
                </div>
              </div>
            </div>

            {/* 3 category tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {CATEGORIES.map((cat, i) => (
                <div key={cat.label} className="flex flex-col gap-0">
                  <motion.button
                    onClick={() => handleTileClick(i)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-2xl p-5 text-left w-full transition-all duration-200 cursor-pointer"
                    style={{
                      background: openIdx === i ? cat.bg : "rgba(255,255,255,0.03)",
                      border: `1px solid ${openIdx === i ? cat.border : "rgba(255,255,255,0.07)"}`,
                      borderBottom: openIdx === i ? "none" : undefined,
                      borderBottomLeftRadius: openIdx === i ? 0 : undefined,
                      borderBottomRightRadius: openIdx === i ? 0 : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
                          <cat.icon size={13} style={{ color: cat.color }} />
                        </div>
                        <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.82)" }}>
                          {cat.label}
                        </p>
                      </div>
                      {(cat as typeof cat & { href?: string }).href ? (
                        <ArrowUpRight size={13} style={{ color: cat.color, opacity: 0.7 }} />
                      ) : (
                        <motion.div
                          animate={{ rotate: openIdx === i ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {openIdx === i
                            ? <X size={13} style={{ color: cat.color }} />
                            : <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 18, lineHeight: 1 }}>+</span>
                          }
                        </motion.div>
                      )}
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.32)" }}>
                      {cat.desc}
                    </p>
                  </motion.button>

                  {/* Funny coming soon reveal */}
                  <AnimatePresence>
                    {openIdx === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 py-4 rounded-b-2xl"
                          style={{ background: cat.bg, border: `1px solid ${cat.border}`, borderTop: "none" }}>
                          <p className="text-sm leading-relaxed" style={{ color: cat.color }}>
                            {cat.funny}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Bottom quote */}
            <div className="pt-8 mt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-sm italic text-center" style={{ color: "rgba(255,255,255,0.18)" }}>
                &ldquo;Everything here is something I wish I had when I was starting out.&rdquo;
              </p>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
