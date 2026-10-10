"use client";

import { Mail } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const socials = [
  { icon: FaLinkedin,  href: profile.socials.linkedin,                label: "LinkedIn",     color: "#0a66c2" },
  { icon: FaGithub,    href: profile.socials.github,                  label: "GitHub",       color: "#8b949e" },
  { icon: FaInstagram, href: "https://www.instagram.com/yugal_agarwal_/", label: "Instagram",    color: "#e1306c" },
  { icon: FaInstagram, href: "https://www.instagram.com/talksofyug/",     label: "Talks of Yug", color: "#f77737" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative">
      <div className="section-divider" />
      <div className="section-container" style={{ paddingTop: 48, paddingBottom: 16 }}>
        <SectionHeading
          label="// contact"
          title="Get In Touch"
          subtitle="Have an opportunity, a question, or just want to say hi?"
        />

        <ScrollReveal direction="up">
          <div className="flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary justify-center min-h-[44px]"
              title={profile.email}>
              <Mail size={15} />
              Say hello
            </a>

            <span className="hidden sm:block w-px h-6 mx-1" style={{ background: "rgba(255,255,255,0.12)" }} aria-hidden="true" />

            {socials.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 min-h-[44px] rounded-xl text-sm border border-white/10 bg-white/[0.03] transition-colors hover:bg-white/[0.06] hover:border-white/25"
                style={{ color: "var(--text-2)" }}
              >
                <Icon size={15} style={{ color }} />
                {label}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>

      {/* Footer */}
      <footer className="text-center py-5 px-6 mt-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "var(--text-3)" }}>
        <p className="text-xs font-mono" style={{ fontFamily: "var(--font-mono)" }}>
          Built with Next.js · Tailwind · Framer Motion ·{" "}
          <span className="gradient-text font-semibold">{profile.name}</span>{" "}
          © {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
}
