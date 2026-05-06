"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group glass rounded-2xl overflow-hidden flex flex-col cursor-pointer"
              style={{ border: "1px solid rgba(99,91,255,0.12)" }}
              onClick={() => {
                if (project.externalLink) window.open(project.externalLink, "_blank", "noopener,noreferrer");
                else window.location.href = `/projects/${project.slug}`;
              }}
            >
              {/* ── Image area ── */}
              <div className="relative w-full h-48 overflow-hidden bg-[#0d0a1a] flex-shrink-0">
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
                        style={{ fontFamily: "var(--font-display)", color: "#635bff" }}>
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Bottom fade into card */}
                <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(13,10,26,0.95))" }} />

                {/* Metric badge — overlaid on image */}
                <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold"
                  style={{
                    background: "rgba(6,3,15,0.75)",
                    color: "#635bff",
                    border: "1px solid rgba(99,91,255,0.3)",
                    backdropFilter: "blur(8px)",
                  }}>
                  <TrendingUp size={10} />
                  <span>{project.metric}</span>
                  <span className="font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>
                    {project.metricLabel}
                  </span>
                </div>

              </div>

              {/* ── Content ── */}
              <div className="p-5 sm:p-6 flex flex-col flex-1">
                <h3 className="text-lg sm:text-xl font-bold mb-1"
                  style={{ color: "rgba(255,255,255,0.92)", fontFamily: "var(--font-display)" }}>
                  {project.title}
                </h3>
                <p className="text-xs font-mono mb-3" style={{ color: "#845ef7", fontFamily: "var(--font-mono)" }}>
                  @ {project.company}
                </p>
                <p className="text-sm leading-relaxed flex-1 mb-5"
                  style={{ color: "rgba(255,255,255,0.35)" }}>
                  {project.description}
                </p>

                {/* Tags + CTA row */}
                <div className="flex items-end justify-between gap-3 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(99,91,255,0.07)",
                          color: "rgba(255,255,255,0.3)",
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
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 transition-all duration-200"
                      style={{
                        background: "rgba(99,91,255,0.1)",
                        color: "#635bff",
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
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 transition-all duration-200"
                      style={{
                        background: "rgba(99,91,255,0.1)",
                        color: "#635bff",
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
