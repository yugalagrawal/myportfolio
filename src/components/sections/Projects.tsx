"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading
          label="// projects"
          title="Decks, Deep Dives & Dossiers"
          subtitle="The kind of work that starts with 'why does this even exist?' and ends with 'here's how to fix it'."
        />

        {/* ── Case studies ── */}
        <p className="text-xs mb-3" style={{ color: "var(--accent2-text)", fontFamily: "var(--font-mono)" }}>
          // case studies &amp; concepts
        </p>
        <div className="-mx-6 px-6 sm:mx-0 sm:px-0 flex sm:grid sm:grid-cols-2 gap-4 md:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar pb-2">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass rounded-2xl overflow-hidden flex flex-col cursor-pointer shrink-0 w-[84%] sm:w-auto snap-center"
              style={{ border: "1px solid rgba(99,91,255,0.12)" }}
              onClick={() => {
                if (project.externalLink) window.open(project.externalLink, "_blank", "noopener,noreferrer");
                else window.location.href = `/projects/${project.slug}`;
              }}
            >
              {/* ── Image area ── */}
              <div className="relative w-full aspect-[1.9/1] overflow-hidden bg-[#0d0a1a] flex-shrink-0">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  /* Placeholder gradient when no image */
                  <div
                    className="absolute inset-0"
                    style={{
                      background: i % 2 === 0
                        ? "linear-gradient(135deg, rgba(99,91,255,0.18) 0%, rgba(34,139,230,0.1) 100%)"
                        : "linear-gradient(135deg, rgba(132,94,247,0.18) 0%, rgba(99,91,255,0.1) 100%)",
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-5xl font-black opacity-10 select-none"
                        style={{ fontFamily: "var(--font-display)", color: "var(--accent-text)" }}>
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Content ── */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <div className="inline-flex items-baseline gap-2 mb-2">
                  <span className="text-xl font-black gradient-text" style={{ fontFamily: "var(--font-display)" }}>
                    {project.metric}
                  </span>
                  <span className="text-xs" style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                    {project.metricLabel}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-1"
                  style={{ color: "rgba(255,255,255,0.92)", fontFamily: "var(--font-display)" }}>
                  {project.title}
                </h3>
                <p className="text-xs font-mono mb-3" style={{ color: "#a78bfa", fontFamily: "var(--font-mono)" }}>
                  {project.type} · {project.company}
                </p>
                <p className="text-sm leading-relaxed flex-1 mb-5 line-clamp-4"
                  style={{ color: "var(--text-2)" }}>
                  {project.description}
                </p>

                {/* Tags + CTA row */}
                <div className="flex items-end justify-between gap-3 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(99,91,255,0.07)",
                          color: "var(--text-3)",
                          border: "1px solid rgba(99,91,255,0.15)",
                          fontFamily: "var(--font-mono)",
                        }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA — project page or external link */}
                  {project.externalLink ? (
                    <a
                      href={project.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 min-h-[44px] rounded-lg flex-shrink-0 transition-all duration-200"
                      style={{
                        background: "rgba(99,91,255,0.1)",
                        color: "var(--accent-text)",
                        border: "1px solid rgba(99,91,255,0.25)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,91,255,0.2)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "rgba(99,91,255,0.1)")}
                    >
                      View <ArrowUpRight size={11} />
                    </a>
                  ) : (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 min-h-[44px] rounded-lg flex-shrink-0 transition-all duration-200"
                      style={{
                        background: "rgba(99,91,255,0.1)",
                        color: "var(--accent-text)",
                        border: "1px solid rgba(99,91,255,0.25)",
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(99,91,255,0.2)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "rgba(99,91,255,0.1)")}
                    >
                      Read More <ArrowUpRight size={11} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
