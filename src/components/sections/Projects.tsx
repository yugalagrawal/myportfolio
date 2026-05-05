"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading label="// 03  projects" title="Case Studies"
          subtitle="Real products, real impact — the work I'm most proud of." />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileTap={{ scale: 0.98 }}
              className="glass glass-hover rounded-2xl overflow-hidden flex flex-col group"
            >
              {/* Top gradient bar */}
              <div className="h-px w-full"
                style={{
                  background: i % 2 === 0
                    ? "linear-gradient(90deg, #635bff, #228be6)"
                    : "linear-gradient(90deg, #228be6, #845ef7)",
                }} />

              <div className="p-5 sm:p-6 flex flex-col flex-1">
                {/* Metric badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold"
                    style={{ background: "rgba(99,91,255,0.08)", color: "#635bff", border: "1px solid rgba(99,91,255,0.2)" }}>
                    <TrendingUp size={12} />
                    <span>{project.metric}</span>
                    <span className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.25)" }}>
                      {project.metricLabel}
                    </span>
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "#635bff", background: "rgba(99,91,255,0.08)" }}>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold mb-1"
                  style={{ color: "rgba(255,255,255,0.92)", fontFamily: "var(--font-display)" }}>
                  {project.title}
                </h3>
                <p className="text-xs font-mono mb-3"
                  style={{ color: "#845ef7", fontFamily: "var(--font-mono)" }}>
                  @ {project.company}
                </p>
                <p className="text-sm leading-relaxed flex-1 mb-5"
                  style={{ color: "rgba(255,255,255,0.35)" }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-mono"
                      style={{
                        background: "rgba(99,91,255,0.07)",
                        color: "rgba(255,255,255,0.3)",
                        border: "1px solid rgba(99,91,255,0.15)",
                        fontFamily: "var(--font-mono)",
                      }}>
                      {tag}
                    </span>
                  ))}
                  <span className="text-xs px-2.5 py-1 rounded-full ml-auto"
                    style={{ color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-mono)" }}>
                    {project.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
