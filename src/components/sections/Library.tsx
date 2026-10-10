"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, BookOpen, PenLine, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const CATEGORIES = [
  {
    icon: Rocket,
    label: "PM & Startups",
    stat: "24 chapters",
    desc: "The PM Master Guide: frameworks, metrics, strategy, design thinking and technical fundamentals, everything I wish I'd been handed when starting out.",
    cta: "Start the guide",
    color: "var(--accent-text)",
    bg: "rgba(99,91,255,0.08)",
    border: "rgba(99,91,255,0.22)",
    href: "/library/pm",
  },
  {
    icon: PenLine,
    label: "Poetry & Writing",
    stat: "54 pieces",
    desc: "Original शायरी, कविताएं and English poems. Written when PRDs feel too serious. Read at your own risk.",
    cta: "Read the notebook",
    color: "var(--accent2-text)",
    bg: "rgba(132,94,247,0.08)",
    border: "rgba(132,94,247,0.22)",
    href: "/library/poetry",
  },
  {
    icon: BookOpen,
    label: "Books & Articles",
    stat: "Coming soon",
    desc: "Reads that shifted how I think, and essays on product, life and things I couldn't stop obsessing over. The books are read, the notes are scattered.",
    color: "#14b8a6",
    bg: "rgba(20,184,166,0.06)",
    border: "rgba(20,184,166,0.15)",
  },
];

export default function Library() {
  return (
    <section id="library" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading
          label="// library"
          title="The Library"
          subtitle="Things I've written, read, and thought worth sharing."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const body = (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: cat.bg, border: `1px solid ${cat.border}` }}
                  >
                    <Icon size={16} style={{ color: cat.color }} />
                  </div>
                  {cat.href && <ArrowUpRight size={15} style={{ color: cat.color }} />}
                </div>
                <h3
                  className="text-lg font-bold mb-0.5"
                  style={{ color: "rgba(255,255,255,0.92)", fontFamily: "var(--font-display)" }}
                >
                  {cat.label}
                </h3>
                <p
                  className="text-xs mb-3"
                  style={{ color: cat.color, fontFamily: "var(--font-mono)" }}
                >
                  {cat.stat}
                </p>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-2)" }}>
                  {cat.desc}
                </p>
                {cat.href && (
                  <span className="mt-4 text-xs font-semibold" style={{ color: cat.color }}>
                    {cat.cta} →
                  </span>
                )}
              </>
            );

            const cardProps = {
              className: "glass rounded-2xl p-6 flex flex-col text-left h-full",
              style: { border: `1px solid ${cat.border}`, opacity: cat.href ? 1 : 0.75 },
            };

            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                {cat.href ? (
                  <Link href={cat.href} {...cardProps} className={`${cardProps.className} glass-hover`}>
                    {body}
                  </Link>
                ) : (
                  <div {...cardProps}>{body}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
