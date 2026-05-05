"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock, PenLine } from "lucide-react";
import { articles } from "@/data/articles";
import SectionHeading from "@/components/ui/SectionHeading";

const platformColors: Record<string, { bg: string; text: string }> = {
  Medium:    { bg: "rgba(99,91,255,0.08)",  text: "#635bff" },
  Substack:  { bg: "rgba(249,115,22,0.08)", text: "#f97316" },
  LinkedIn:  { bg: "rgba(34,139,230,0.1)",  text: "#228be6" },
  Personal:  { bg: "rgba(132,94,247,0.08)", text: "#845ef7" },
  Other:     { bg: "rgba(255,255,255,0.05)", text: "rgba(255,255,255,0.4)" },
};

export default function PersonalSpace() {
  const isEmpty = articles.length === 0;

  return (
    <section id="personal-space" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading label="// 05  personal space" title="Personal Space"
          subtitle="Thoughts, essays, and things I find worth sharing." />

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-12 sm:p-16 text-center max-w-md mx-auto"
          >
            <div className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(99,91,255,0.1)", border: "1px solid rgba(99,91,255,0.2)" }}>
              <PenLine size={26} style={{ color: "#635bff" }} />
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: "rgba(255,255,255,0.92)" }}>
              Articles Coming Soon
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.3)" }}>
              Working on a collection of essays on product strategy, PM craft, and lessons from building products.
            </p>
            <p className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-mono)" }}>
              // Add articles in src/data/articles.ts
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
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full"
                      style={{ background: colors.bg, color: colors.text,
                        border: `1px solid ${colors.text}33`, fontFamily: "var(--font-mono)" }}>
                      {article.platform}
                    </span>
                    <ArrowUpRight size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "#635bff" }} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold leading-snug mb-2 flex-1"
                    style={{ color: "rgba(255,255,255,0.92)" }}>
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>{article.date}</span>
                    {article.readTime && (
                      <span className="text-xs flex items-center gap-1"
                        style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>
                        <Clock size={10} />{article.readTime}
                      </span>
                    )}
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
