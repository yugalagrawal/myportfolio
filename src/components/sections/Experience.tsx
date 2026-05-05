"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ChevronDown } from "lucide-react";
import { experience } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading label="// 02  experience" title="Work Experience"
          subtitle="The roles, companies, and impact that shaped me as a PM." />

        <div className="relative">
          {/* Timeline line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, #635bff 0%, #228be6 60%, transparent 100%)", opacity: 0.25 }} />

          <div className="flex flex-col gap-6 md:gap-0">
            {experience.map((item, i) => {
              const isEven = i % 2 === 0;
              const isOpen = expanded === i;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className={`relative md:w-[46%] md:mb-10 ${isEven ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}
                >
                  {/* Timeline dot */}
                  <div
                    className="hidden md:block absolute top-6 w-3 h-3 rounded-full border-2"
                    style={{
                      background: item.current ? "#635bff" : "#12101f",
                      borderColor: "#635bff",
                      [isEven ? "right" : "left"]: "-22px",
                      transform: "translateX(50%)",
                      boxShadow: item.current ? "0 0 14px rgba(99,91,255,0.7)" : "none",
                    }}
                  />

                  {/* Card */}
                  <div
                    className="glass rounded-2xl overflow-hidden cursor-pointer md:cursor-default glass-hover"
                    onClick={() => setExpanded(isOpen ? null : i)}
                  >
                    <div className="p-5 sm:p-6">
                      {/* Gradient top bar */}
                      <div className="h-px w-full mb-4"
                        style={{ background: "linear-gradient(90deg, #635bff, #228be6, transparent)" }} />

                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          {item.current && (
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-full mb-2"
                              style={{ background: "rgba(99,91,255,0.1)", color: "#635bff", border: "1px solid rgba(99,91,255,0.2)" }}>
                              <motion.span className="w-1.5 h-1.5 rounded-full"
                                style={{ background: "#635bff" }}
                                animate={{ opacity: [1, 0.4, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }} />
                              Current
                            </span>
                          )}
                          <h3 className="text-base sm:text-lg font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>
                            {item.role}
                          </h3>
                          <div className="text-sm font-semibold mt-0.5 gradient-text-name">{item.company}</div>
                        </div>
                        <button
                          className="md:hidden p-1 flex-shrink-0 transition-transform duration-300"
                          style={{
                            color: "rgba(255,255,255,0.25)",
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          }}
                          onClick={(e) => { e.stopPropagation(); setExpanded(isOpen ? null : i); }}
                        >
                          <ChevronDown size={18} />
                        </button>
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs mb-3"
                        style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}>
                        <span className="flex items-center gap-1"><Briefcase size={10} />{item.period}</span>
                        <span className="flex items-center gap-1"><MapPin size={10} />{item.location}</span>
                        <span className="px-2 py-0.5 rounded-full"
                          style={{ background: "rgba(132,94,247,0.1)", color: "#845ef7", border: "1px solid rgba(132,94,247,0.2)" }}>
                          {item.type}
                        </span>
                      </div>

                      <p className="text-sm mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>{item.description}</p>

                      {/* Bullets — always desktop, collapsible mobile */}
                      <div className="hidden md:block"><Bullets bullets={item.bullets} tags={item.tags} /></div>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div key="mob"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: "hidden" }}
                            className="md:hidden"
                          >
                            <Bullets bullets={item.bullets} tags={item.tags} />
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

function Bullets({ bullets, tags }: { bullets: string[]; tags: string[] }) {
  return (
    <div className="pt-1">
      <ul className="space-y-2 mb-4">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: "#635bff" }} />
            {b}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => <span key={tag} className="pill">{tag}</span>)}
      </div>
    </div>
  );
}
