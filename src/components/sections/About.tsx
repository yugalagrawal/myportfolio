"use client";

import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function About() {
  return (
    <section id="about" className="relative" aria-label="About section">
      <div className="section-container">
        <SectionHeading
          label="// 01  about"
          title="About Me"
          subtitle="A quick intro to who I am and how I think."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Avatar + Location */}
          <ScrollReveal direction="left" className="flex flex-col items-center lg:items-start">
            {/* Profile Image Placeholder */}
            <div className="relative mb-6">
              <div
                className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden neon-border"
                style={{ background: "rgba(0,212,255,0.06)" }}
              >
                {/* Replace with your actual image: <Image src="/images/photo.jpg" alt="Yugal Agarwal" fill className="object-cover" /> */}
                <div className="w-full h-full flex items-center justify-center text-6xl font-bold gradient-text"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {profile.initials}
                </div>
              </div>

              {/* Decorative rings */}
              <div
                className="absolute -inset-3 rounded-2xl opacity-20 -z-10"
                style={{ border: "1px solid #00d4ff" }}
              />
              <div
                className="absolute -inset-6 rounded-2xl opacity-10 -z-10"
                style={{ border: "1px solid #a855f7" }}
              />
            </div>

            {/* Location + Email */}
            <div className="flex flex-col gap-3 text-sm" style={{ color: "#64748b" }}>
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: "#00d4ff" }} />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: "#00d4ff" }} />
                <a
                  href={`mailto:${profile.email}`}
                  className="transition-colors hover:text-neon"
                  style={{ color: "#94a3b8" }}
                >
                  {profile.email}
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Bio + Stats */}
          <ScrollReveal direction="right" delay={0.1}>
            {/* Bio */}
            <div className="space-y-5 mb-8">
              {profile.bio.trim().split("\n").map((para, i) => (
                <p
                  key={i}
                  className="text-base sm:text-lg leading-relaxed"
                  style={{ color: "#cbd5e1" }}
                >
                  {para.trim()}
                </p>
              ))}
            </div>

            {/* Philosophy */}
            <blockquote
              className="border-l-2 pl-4 mb-8 italic text-sm sm:text-base"
              style={{ borderColor: "#00d4ff", color: "#64748b" }}
            >
              &ldquo;{profile.philosophy}&rdquo;
            </blockquote>

            {/* Quick Stats Grid */}
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
                  <div
                    className="text-2xl sm:text-3xl font-bold mb-1 gradient-text"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm" style={{ color: "#64748b" }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
