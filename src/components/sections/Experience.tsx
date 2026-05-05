"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ChevronDown } from "lucide-react";
import { experience } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="relative" aria-label="Experience section">
      {/* Subtle section separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)",
        }}
      />

      <div className="section-container">
        <SectionHeading
          label="// 02  experience"
          title="Work Experience"
          subtitle="The roles, companies, and impact that shaped me as a PM."
        />

        <div className="relative">
          {/* Vertical timeline line (hidden on mobile, visible on md+) */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, #00d4ff 0%, #a855f7 60%, transparent 100%)",
              opacity: 0.4,
            }}
          />

          <div className="flex flex-col gap-8 md:gap-0">
            {experience.map((item, i) => {
              const isEven   = i % 2 === 0;
              const isOpen   = expanded === i;
              const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
                  className={`relative md:w-[46%] ${
                    isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                  }`}
                >
                  {/* Timeline dot (desktop) */}
                  <div
                    className="hidden md:block absolute top-6 w-3 h-3 rounded-full border-2 -z-0"
                    style={{
                      background: item.current ? "#00d4ff" : "#1e2d45",
                      borderColor: "#00d4ff",
                      [isEven ? "right" : "left"]: "-24px",
                      transform: "translateX(50%)",
                      boxShadow: item.current ? "0 0 12px rgba(0,212,255,0.6)" : "none",
                    }}
                  />

                  {/* Card */}
                  <div
                    className="glass glass-hover rounded-2xl overflow-hidden cursor-pointer md:cursor-default"
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    <div className="p-5 sm:p-6">
                      {/* Header row */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          {/* Current badge */}
                          {item.current && (
                            <span
                              className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-full mb-2"
                              style={{
                                background: "rgba(0,212,255,0.1)",
                                color: "#00d4ff",
                                border: "1px solid rgba(0,212,255,0.25)",
                              }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                style={{ background: "#00d4ff" }}
                              />
                              Current
                            </span>
                          )}
                          <h3
                            className="text-base sm:text-lg font-semibold leading-tight"
                            style={{ color: "#f1f5f9" }}
                          >
                            {item.role}
                          </h3>
                          <div
                            className="text-sm font-medium mt-0.5"
                            style={{ color: "#00d4ff" }}
                          >
                            {item.company}
                          </div>
                        </div>

                        {/* Chevron toggle (mobile) */}
                        <button
                          className="md:hidden p-1 flex-shrink-0 transition-transform duration-300"
                          style={{
                            color: "#64748b",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                          aria-label={isOpen ? "Collapse" : "Expand"}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(isOpen ? null : i);
                          }}
                        >
                          <ChevronDown size={18} />
                        </button>
                      </div>

                      {/* Meta row */}
                      <div
                        className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-3"
                        style={{ color: "#64748b", fontFamily: "var(--font-mono)" }}
                      >
                        <span className="flex items-center gap-1">
                          <Briefcase size={11} />
                          {item.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={11} />
                          {item.location}
                        </span>
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{
                            background: "rgba(168,85,247,0.1)",
                            color: "#a855f7",
                            border: "1px solid rgba(168,85,247,0.2)",
                          }}
                        >
                          {item.type}
                        </span>
                      </div>

                      {/* Description always visible */}
                      <p className="text-sm mb-3" style={{ color: "#94a3b8" }}>
                        {item.description}
                      </p>

                      {/* Bullets — always on desktop, collapsible on mobile */}
                      <AnimatePresence initial={false}>
                        <div className="hidden md:block">
                          <BulletList bullets={item.bullets} tags={item.tags} />
                        </div>

                        {isOpen && (
                          <motion.div
                            className="md:hidden"
                            key="mobile-detail"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <BulletList bullets={item.bullets} tags={item.tags} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
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

function BulletList({ bullets, tags }: { bullets: string[]; tags: string[] }) {
  return (
    <div className="pt-1">
      <ul className="space-y-2 mb-4">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#94a3b8" }}>
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#00d4ff" }}
            />
            {b}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="pill">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
