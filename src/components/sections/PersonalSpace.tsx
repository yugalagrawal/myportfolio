"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, PenLine } from "lucide-react";
import { articles } from "@/data/articles";
import SectionHeading from "@/components/ui/SectionHeading";

const platformColors: Record<string, { bg: string; text: string }> = {
  Medium:    { bg: "rgba(0,212,255,0.08)",  text: "#00d4ff" },
  Substack:  { bg: "rgba(245,158,11,0.08)", text: "#f59e0b" },
  LinkedIn:  { bg: "rgba(10,102,194,0.12)", text: "#0a9af6" },
  Personal:  { bg: "rgba(168,85,247,0.08)", text: "#a855f7" },
  Other:     { bg: "rgba(148,163,184,0.08)",text: "#94a3b8" },
};

export default function PersonalSpace() {
  const isEmpty = articles.length === 0;

  return (
    <section id="personal-space" className="relative" aria-label="Personal Space section">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.2), transparent)" }}
      />

      <div className="section-container">
        <SectionHeading
          label="// 05  personal space"
          title="Personal Space"
          subtitle="Thoughts, essays, and things I find worth sharing."
        />

        {isEmpty ? (
          /* Empty / Coming Soon State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-10 sm:p-16 text-center max-w-lg mx-auto"
          >
            <div
              className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)" }}
            >
              <PenLine size={28} style={{ color: "#a855f7" }} />
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "#f1f5f9", fontFamily: "var(--font-display)" }}
            >
              Articles Coming Soon
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#64748b" }}>
              I&rsquo;m working on a collection of essays on product strategy, PM craft, and
              lessons from building products. Check back soon.
            </p>
            {/* Hint how to add articles */}
            <p
              className="text-xs font-mono"
              style={{ color: "#334155", fontFamily: "var(--font-mono)" }}
            >
              // Add articles in <code className="text-electric">src/data/articles.ts</code>
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article, i) => {
              const colors = platformColors[article.platform] ?? platformColors.Other;
              return (
                <motion.a
                  key={i}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass glass-hover rounded-2xl p-5 sm:p-6 flex flex-col group"
                  aria-label={`Read "${article.title}" on ${article.platform}`}
                >
                  {/* Platform badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-xs font-mono px-2.5 py-1 rounded-full"
                      style={{
                        background: colors.bg,
                        color: colors.text,
                        border: `1px solid ${colors.text}33`,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {article.platform}
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "#00d4ff" }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base sm:text-lg font-semibold leading-snug mb-2 flex-1"
                    style={{
                      color: "#f1f5f9",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#64748b" }}>
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs" style={{ color: "#475569" }}>
                      {article.date}
                    </span>
                    {article.readTime && (
                      <span
                        className="text-xs flex items-center gap-1"
                        style={{ color: "#475569", fontFamily: "var(--font-mono)" }}
                      >
                        <Clock size={11} />
                        {article.readTime}
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            color: "#475569",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
