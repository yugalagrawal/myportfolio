"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa6";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const socials = [
  {
    icon: FaLinkedin,
    href: profile.socials.linkedin,
    label: "LinkedIn",
    color: "#0a66c2",
    sub: "yugal11",
  },
  {
    icon: Mail,
    href: `mailto:${profile.email}`,
    label: "Email",
    color: "#635bff",
    sub: profile.email,
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/yugal_agarwal_/",
    label: "Instagram",
    color: "#e1306c",
    sub: "@yugal_agarwal_",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/talksofyug/",
    label: "Talks of Yug",
    color: "#f77737",
    sub: "@talksofyug",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading
          label="// contact"
          title="Get In Touch"
          subtitle="Have an opportunity, a question, or just want to say hi?"
        />

        <ScrollReveal direction="up">
          <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            Feel free to reach out at any of these places:
          </p>

          <p className="text-xs font-mono tracking-widest uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>
            Find me on
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl">
            {socials.map(({ icon: Icon, href, label, color, sub }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="glass rounded-2xl p-5 flex flex-col gap-3 group transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${color}44`;
                  el.style.background = `${color}0d`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.background = "";
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: `${color}18`, border: `1px solid ${color}33` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: "rgba(255,255,255,0.85)" }}>
                    {label}
                  </p>
                  <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)", maxWidth: "100%" }}>
                    {sub}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 px-6 mt-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.15)" }}>
        <p className="text-xs font-mono" style={{ fontFamily: "var(--font-mono)" }}>
          Built with Next.js · Tailwind · Framer Motion ·{" "}
          <span className="gradient-text font-semibold">{profile.name}</span>{" "}
          © {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
}
