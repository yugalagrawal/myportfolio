"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";

const tagColors: Record<string, string> = {
  Growth:    "rgba(0,212,255,0.1)",
  Platform:  "rgba(168,85,247,0.1)",
  "0→1":     "rgba(245,158,11,0.1)",
  Fintech:   "rgba(168,85,247,0.1)",
  Consumer:  "rgba(0,212,255,0.1)",
  Mobile:    "rgba(0,212,255,0.1)",
  Data:      "rgba(245,158,11,0.1)",
  B2B:       "rgba(168,85,247,0.1)",
  B2C:       "rgba(0,212,255,0.1)",
  API:       "rgba(245,158,11,0.1)",
  UX:        "rgba(0,212,255,0.1)",
  Startup:   "rgba(245,158,11,0.1)",
};

export default function Projects() {
  return (
    <section id="projects" className="relative" aria-label="Projects section">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(168,85,247,0.2), transparent)",
        }}
      />

      <div className="section-container">
        <SectionHeading
          label="// 03  projects"
          title="Case Studies"
          subtitle="Real products, real impact — the work I'm most proud of."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              whileTap={{ scale: 0.98 }}
              className={`glass glass-hover rounded-2xl overflow-hidden group flex flex-col ${
                project.featured ? "ring-1 ring-neon/10" : ""
              }`}
              style={
                project.featured
                  ? { boxShadow: "0 0 0 1px rgba(0,212,255,0.1)" }
                  : {}
              }
            >
              {/* Gradient accent bar */}
              <div
                className="h-1 w-full"
                style={{
                  background:
                    i % 2 === 0
                      ? "linear-gradient(90deg, #00d4ff, #a855f7)"
                      : "linear-gradient(90deg, #a855f7, #00d4ff)",
                }}
              />

              <div className="p-5 sm:p-6 flex flex-col flex-1">
                {/* Metric badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold"
                    style={{
                      background: "rgba(0,212,255,0.08)",
                      color: "#00d4ff",
                      border: "1px solid rgba(0,212,255,0.2)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    <TrendingUp size={13} />
                    <span>{project.metric}</span>
                    <span
                      className="text-xs font-normal"
                      style={{ color: "#64748b" }}
                    >
                      {project.metricLabel}
                    </span>
                  </div>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      style={{
                        color: "#00d4ff",
                        background: "rgba(0,212,255,0.08)",
                      }}
                      aria-label={`View ${project.title}`}
                    >
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>

                {/* Title + Company */}
                <h3
                  className="text-lg sm:text-xl font-semibold mb-1"
                  style={{ color: "#f1f5f9", fontFamily: "var(--font-display)" }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-xs font-mono mb-3"
                  style={{ color: "#a855f7", fontFamily: "var(--font-mono)" }}
                >
                  @ {project.company}
                </p>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed flex-1 mb-5"
                  style={{ color: "#94a3b8" }}
                >
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{
                        background: tagColors[tag] ?? "rgba(255,255,255,0.05)",
                        color: "#94a3b8",
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  <span
                    className="text-xs px-2.5 py-1 rounded-full ml-auto"
                    style={{ color: "#475569", fontFamily: "var(--font-mono)" }}
                  >
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
