"use client";

import { motion } from "framer-motion";
import { pmSkills, tools, toolCategories } from "@/data/skills";
import SectionHeading from "@/components/ui/SectionHeading";

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Analytics:    { bg: "rgba(99,91,255,0.08)",  text: "#635bff", border: "rgba(99,91,255,0.2)" },
  Design:       { bg: "rgba(132,94,247,0.08)", text: "#845ef7", border: "rgba(132,94,247,0.2)" },
  Dev:          { bg: "rgba(34,139,230,0.08)", text: "#228be6", border: "rgba(34,139,230,0.2)" },
  Productivity: { bg: "rgba(20,184,166,0.08)", text: "#14b8a6", border: "rgba(20,184,166,0.2)" },
  Research:     { bg: "rgba(249,115,22,0.08)", text: "#f97316", border: "rgba(249,115,22,0.2)" },
};

export default function Skills() {
  return (
    <section id="skills" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading label="// 04  skills" title="Skills & Tools"
          subtitle="What I bring to the table as a modern Product Manager." />

        {/* PM Skills */}
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>
            Core PM Skills
          </p>
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
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
          <p className="text-xs font-mono tracking-widest uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>
            Tools & Platforms
          </p>
          <div className="flex flex-col gap-4">
            {toolCategories.map((cat, ci) => {
              const catTools = tools.filter((t) => t.category === cat);
              const colors = categoryColors[cat];
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: ci * 0.07 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="text-xs font-mono px-3 py-1.5 rounded-full flex-shrink-0 w-fit sm:w-28 text-center"
                    style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                    {cat}
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap">
                    {catTools.map((tool) => (
                      <span
                        key={tool.name}
                        className="text-xs px-3 py-1.5 rounded-lg flex-shrink-0 transition-all duration-200 cursor-default"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.3)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          whiteSpace: "nowrap",
                          fontFamily: "var(--font-mono)",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.target as HTMLElement;
                          el.style.background = colors.bg;
                          el.style.color = colors.text;
                          el.style.borderColor = colors.border;
                        }}
                        onMouseLeave={(e) => {
                          const el = e.target as HTMLElement;
                          el.style.background = "rgba(255,255,255,0.04)";
                          el.style.color = "rgba(255,255,255,0.3)";
                          el.style.borderColor = "rgba(255,255,255,0.07)";
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
