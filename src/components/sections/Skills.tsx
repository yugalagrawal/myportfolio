"use client";

import { motion } from "framer-motion";
import { pmSkills, tools, toolCategories } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Analytics:   { bg: "rgba(0,212,255,0.08)",   text: "#00d4ff", border: "rgba(0,212,255,0.2)" },
  Design:      { bg: "rgba(168,85,247,0.08)",  text: "#a855f7", border: "rgba(168,85,247,0.2)" },
  Dev:         { bg: "rgba(245,158,11,0.08)",  text: "#f59e0b", border: "rgba(245,158,11,0.2)" },
  Productivity:{ bg: "rgba(34,197,94,0.08)",   text: "#22c55e", border: "rgba(34,197,94,0.2)" },
  Research:    { bg: "rgba(239,68,68,0.08)",   text: "#ef4444", border: "rgba(239,68,68,0.2)" },
};

export default function Skills() {
  return (
    <section id="skills" className="relative" aria-label="Skills section">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.15), transparent)" }}
      />

      <div className="section-container">
        <SectionHeading
          label="// 04  skills"
          title="Skills & Tools"
          subtitle="What I bring to the table as a modern Product Manager."
        />

        {/* PM Skills */}
        <div className="mb-12">
          <h3
            className="text-xs font-mono mb-5 tracking-widest uppercase"
            style={{ color: "#64748b", fontFamily: "var(--font-mono)" }}
          >
            PM Core Skills
          </h3>
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.04 } },
            }}
          >
            {pmSkills.map((skill) => (
              <motion.span
                key={skill}
                variants={{
                  hidden: { opacity: 0, scale: 0.85 },
                  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
                }}
                className="pill"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Tools by category */}
        <div>
          <h3
            className="text-xs font-mono mb-5 tracking-widest uppercase"
            style={{ color: "#64748b", fontFamily: "var(--font-mono)" }}
          >
            Tools & Platforms
          </h3>

          <div className="flex flex-col gap-5">
            {toolCategories.map((cat, ci) => {
              const catTools = tools.filter((t) => t.category === cat);
              const colors = categoryColors[cat];

              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: ci * 0.08 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  {/* Category label */}
                  <div
                    className="text-xs font-mono px-3 py-1 rounded-full flex-shrink-0 w-fit sm:w-28 text-center"
                    style={{
                      background: colors.bg,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {cat}
                  </div>

                  {/* Horizontal scroll container on small screens */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap scrollbar-none">
                    {catTools.map((tool) => (
                      <span
                        key={tool.name}
                        className="text-xs px-3 py-1.5 rounded-lg flex-shrink-0 transition-all duration-200"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "#94a3b8",
                          border: "1px solid rgba(255,255,255,0.07)",
                          fontFamily: "var(--font-mono)",
                          whiteSpace: "nowrap",
                          cursor: "default",
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.background = colors.bg;
                          (e.target as HTMLElement).style.color = colors.text;
                          (e.target as HTMLElement).style.borderColor = colors.border;
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                          (e.target as HTMLElement).style.color = "#94a3b8";
                          (e.target as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                        }}
                      >
                        {tool.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
