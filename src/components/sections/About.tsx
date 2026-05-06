"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const BIRTH = new Date(1999, 10, 11, 10, 0, 0); // Nov 11, 1999 10:00 AM

function useAge() {
  const [age, setAge] = useState({ years: 0, months: 0, days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      let years   = now.getFullYear() - BIRTH.getFullYear();
      let months  = now.getMonth()    - BIRTH.getMonth();
      let days    = now.getDate()     - BIRTH.getDate();
      let hours   = now.getHours()    - BIRTH.getHours();
      let minutes = now.getMinutes()  - BIRTH.getMinutes();

      if (minutes < 0) { minutes += 60; hours--; }
      if (hours   < 0) { hours   += 24; days--; }
      if (days    < 0) { days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); months--; }
      if (months  < 0) { months  += 12; years--; }

      setAge({ years, months, days, hours, minutes });
    };
    calc();
    const t = setInterval(calc, 30000);
    return () => clearInterval(t);
  }, []);

  return age;
}

export default function About() {
  const age = useAge();
  const [ageHovered, setAgeHovered] = useState(false);

  return (
    <section id="about" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading
          label="// about"
          title="About Me"
          subtitle={
            <span style={{ fontSize: "clamp(11px, 1.5vw, 14px)", whiteSpace: "nowrap" }}>
              &ldquo;The self is not something one finds, it is something one creates.&rdquo; —{" "}
              <a
                href="https://en.wikipedia.org/wiki/Thomas_Szasz"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#635bff", textDecoration: "underline", textUnderlineOffset: "3px" }}
              >
                Thomas Szasz
              </a>
            </span>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — Avatar */}
          <ScrollReveal direction="left">
            <div className="flex flex-col items-center lg:items-start gap-6">
              {/* Photo */}
              <div className="relative">
                <div
                  className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden relative"
                  style={{ border: "1px solid rgba(99,91,255,0.35)", boxShadow: "0 0 50px rgba(99,91,255,0.18)" }}
                >
                  <Image
                    src="/images/avatar.jpg"
                    alt={profile.name}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
                {/* Glow rings */}
                <div className="absolute -inset-3 rounded-3xl -z-10" style={{ border: "1px solid rgba(99,91,255,0.12)" }} />
                <div className="absolute -inset-6 rounded-3xl -z-10" style={{ border: "1px solid rgba(34,139,230,0.07)" }} />
                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 rounded-xl px-3 py-2 text-xs font-mono font-bold"
                  style={{
                    background: "linear-gradient(135deg, rgba(99,91,255,0.9), rgba(34,139,230,0.85))",
                    color: "#fff",
                    boxShadow: "0 4px 20px rgba(99,91,255,0.4)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  3+ yrs · PM
                </motion.div>
              </div>

              {/* Info pills */}
              <div className="flex flex-col gap-3 w-full max-w-xs">
                {/* Location */}
                <div className="glass rounded-xl px-4 py-3 flex items-center gap-3"
                  style={{ border: "1px solid rgba(99,91,255,0.12)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(99,91,255,0.15)" }}>
                    <MapPin size={14} style={{ color: "#635bff" }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                      {(profile as { location: string }).location}
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
                      {(profile as { locationNative?: string }).locationNative}
                    </p>
                  </div>
                </div>

                {/* College */}
                <div className="glass rounded-xl px-4 py-3 flex items-center gap-3"
                  style={{ border: "1px solid rgba(99,91,255,0.12)" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(99,91,255,0.15)" }}>
                    <span style={{ fontSize: "14px" }}>🎓</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                      IIT BHU, Varanasi
                    </p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
                      Grad Year 2023
                    </p>
                  </div>
                </div>

                {/* Age counter */}
                <motion.div
                  className="glass rounded-xl px-4 py-3 cursor-default relative overflow-hidden"
                  style={{ border: "1px solid rgba(99,91,255,0.12)" }}
                  onMouseEnter={() => setAgeHovered(true)}
                  onMouseLeave={() => setAgeHovered(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(99,91,255,0.15)" }}>
                      <span style={{ fontSize: "14px" }}>🎂</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      {!ageHovered ? (
                        <motion.div
                          key="age"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p className="text-xs font-mono leading-tight"
                            style={{ color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-mono)" }}>
                            <span className="gradient-text font-bold">{age.years}y </span>
                            <span style={{ color: "rgba(255,255,255,0.5)" }}>{age.months}mo </span>
                            <span style={{ color: "rgba(255,255,255,0.5)" }}>{age.days}d </span>
                            <span style={{ color: "rgba(255,255,255,0.35)" }}>{age.hours}hr </span>
                            <span style={{ color: "rgba(255,255,255,0.25)" }}>{age.minutes}min</span>
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}>
                            Age (live)
                          </p>
                        </motion.div>
                      ) : (
                        <motion.p
                          key="hover"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.2 }}
                          className="text-xs italic leading-snug"
                          style={{ color: "#635bff" }}
                        >
                          But My Heart is a kid &amp; Age is just a number 💙
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Bio + Stats */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="space-y-4 mb-8">
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                I&rsquo;m a Product Manager with 3+ years of experience across Logistics and AdTech, fueled by the conviction that &ldquo;in God we trust; all others must bring data.&rdquo;
              </p>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                An IIT BHU alumnus and former founder, I scaled my startup{" "}
                <a href="https://www.nogozo.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: "#635bff", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Nogozo
                </a>{" "}
                to 10k+ users and reached the Shark Tank India Season 1 pre-finals. That experience, combined with my time at{" "}
                <a href="https://www.media.net" target="_blank" rel="noopener noreferrer"
                  style={{ color: "#635bff", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  Media.net
                </a>
                , taught me how to architect high-impact efficiencies and distill chaos into data-driven roadmaps.
              </p>
              <p className="text-base sm:text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                Beyond the metrics, I&rsquo;m a writer, traveller, and cricket enthusiast who enjoys everything from old Hindi classics to modern hits. Lately, I&rsquo;ve been exploring content creation at{" "}
                <a href="https://www.instagram.com/talksofyug/" target="_blank" rel="noopener noreferrer"
                  style={{ color: "#635bff", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                  @talksofyug
                </a>
                , translating my founder&rsquo;s mindset into stories that bridge the gap between &ldquo;what&rsquo;s happening&rdquo; and &ldquo;what&rsquo;s next.&rdquo;
              </p>
            </div>

            <blockquote className="border-l-2 pl-5 mb-10 italic text-sm sm:text-base"
              style={{ borderColor: "#635bff", color: "rgba(255,255,255,0.25)" }}>
              {profile.philosophy}
            </blockquote>

          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
