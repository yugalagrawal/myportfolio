"use client";

import { motion } from "framer-motion";
import { Mail, Download } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
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
    icon: FaGithub,
    href: profile.socials.github,
    label: "GitHub",
    color: "#8b949e",
    sub: "yugalagrawal",
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
          <p className="text-base sm:text-lg leading-relaxed mb-6 max-w-xl"
            style={{ color: "rgba(255,255,255,0.65)" }}>
            Happy to talk product, logistics, AI-enabled workflows, or startups.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a href={`mailto:${profile.email}`} className="btn-primary justify-center min-h-[48px]">
              <Mail size={15} />
              Say hello
            </a>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="btn-outline justify-center min-h-[48px]"
            >
              <Download size={15} />
              Download Resume
            </a>
          </div>

          <p className="text-xs font-mono tracking-widest uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "var(--font-mono)" }}>
            Or find me on
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl">
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
                  <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono)", maxWidth: "100%" }}>
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
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.45)" }}>
        <p className="text-xs font-mono" style={{ fontFamily: "var(--font-mono)" }}>
          Built with Next.js · Tailwind · Framer Motion ·{" "}
          <span className="gradient-text font-semibold">{profile.name}</span>{" "}
          © {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
}
