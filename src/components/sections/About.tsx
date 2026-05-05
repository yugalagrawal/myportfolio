"use client";

import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading label="// 01  about" title="About Me" subtitle="A quick intro to who I am and how I think about product." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Avatar */}
          <ScrollReveal direction="left" className="flex flex-col items-center lg:items-start">
            <div className="relative mb-8">
              <div
                className="w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden glass flex items-center justify-center"
                style={{ border: "1px solid rgba(99,91,255,0.3)", boxShadow: "0 0 60px rgba(99,91,255,0.15)" }}
              >
                <span
                  className="text-6xl font-black gradient-text"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {profile.initials}
                </span>
              </div>
              {/* Glow rings */}
              <div className="absolute -inset-3 rounded-3xl -z-10" style={{ border: "1px solid rgba(99,91,255,0.15)" }} />
              <div className="absolute -inset-6 rounded-3xl -z-10" style={{ border: "1px solid rgba(34,139,230,0.08)" }} />
              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 glass rounded-xl px-3 py-2 text-xs font-mono"
                style={{ border: "1px solid rgba(99,91,255,0.25)", color: "#635bff" }}
              >
                5+ yrs · PM
              </motion.div>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                <MapPin size={13} style={{ color: "#635bff" }} />
                {profile.location}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} style={{ color: "#635bff" }} />
                <a href={`mailto:${profile.email}`} className="transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.3)" }}>
                  {profile.email}
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Bio + Stats */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="space-y-5 mb-8">
              {profile.bio.trim().split("\n").map((para, i) => (
                <p key={i} className="text-base sm:text-lg leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}>
                  {para.trim()}
                </p>
              ))}
            </div>

            <blockquote className="border-l-2 pl-5 mb-10 italic text-sm sm:text-base"
              style={{ borderColor: "#635bff", color: "rgba(255,255,255,0.25)" }}>
              &ldquo;{profile.philosophy}&rdquo;
            </blockquote>

            <div className="grid grid-cols-2 gap-3">
              {profile.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                  className="stat-card"
                >
                  <div className="text-2xl sm:text-3xl font-black mb-1 gradient-text"
                    style={{ fontFamily: "var(--font-display)" }}>
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
