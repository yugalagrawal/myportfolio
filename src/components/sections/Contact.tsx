"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle } from "lucide-react";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

// ─── Replace FORMSPREE_ID with your free Formspree endpoint ID ───
// 1. Go to formspree.io → New Form → copy the ID from the endpoint URL
// 2. Replace "YOUR_FORM_ID" below
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

interface FormState {
  name:    string;
  email:   string;
  message: string;
}

export default function Contact() {
  const [form,       setForm]       = useState<FormState>({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError("Something went wrong. Please email me directly.");
      }
    } catch {
      setError("Network error. Please email me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const socials = [
    { icon: FaLinkedin, href: profile.socials.linkedin, label: "LinkedIn",  color: "#0a66c2" },
    { icon: FaGithub,   href: profile.socials.github,   label: "GitHub",    color: "#94a3b8" },
    { icon: FaXTwitter, href: profile.socials.twitter,  label: "Twitter/X", color: "#f1f5f9" },
    { icon: Mail,       href: `mailto:${profile.email}`,label: "Email",     color: "#00d4ff" },
  ].filter((s) => s.href && s.href !== "mailto:");

  return (
    <section id="contact" className="relative" aria-label="Contact section">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)" }}
      />

      <div className="section-container">
        <SectionHeading
          label="// 06  contact"
          title="Get In Touch"
          subtitle="Have an opportunity, a question, or just want to say hi? I'd love to hear from you."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Social links + CTA text */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div>
                <p
                  className="text-base sm:text-lg leading-relaxed mb-6"
                  style={{ color: "#94a3b8" }}
                >
                  I&rsquo;m always open to discussing product strategy, new opportunities,
                  or just swapping notes on what&rsquo;s working in the PM world.
                </p>
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-primary inline-flex"
                >
                  <Mail size={16} />
                  <span>{profile.email}</span>
                </a>
              </div>

              {/* Social icons */}
              <div>
                <p
                  className="text-xs font-mono mb-4 tracking-widest uppercase"
                  style={{ color: "#475569", fontFamily: "var(--font-mono)" }}
                >
                  Find me on
                </p>
                <div className="flex flex-wrap gap-3">
                  {socials.map(({ icon: Icon, href, label, color }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 min-h-[44px]"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#94a3b8",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = color + "55";
                        (e.currentTarget as HTMLElement).style.color = color;
                        (e.currentTarget as HTMLElement).style.background =
                          color + "11";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                        (e.currentTarget as HTMLElement).style.color = "#94a3b8";
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                      }}
                      aria-label={label}
                    >
                      <Icon size={16} />
                      <span className="text-sm font-medium">{label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Contact form */}
          <ScrollReveal direction="right" delay={0.1}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-8 sm:p-10 text-center flex flex-col items-center gap-4"
              >
                <CheckCircle size={44} style={{ color: "#00d4ff" }} />
                <h3
                  className="text-xl font-semibold"
                  style={{ color: "#f1f5f9", fontFamily: "var(--font-display)" }}
                >
                  Message Sent!
                </h3>
                <p className="text-sm" style={{ color: "#64748b" }}>
                  Thanks for reaching out. I&rsquo;ll get back to you within 1–2 business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline text-sm mt-2"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-6 sm:p-8 flex flex-col gap-4"
                noValidate
              >
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-mono mb-1.5"
                    style={{ color: "#64748b", fontFamily: "var(--font-mono)" }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none min-h-[48px]"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#f1f5f9",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(0,212,255,0.4)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono mb-1.5"
                    style={{ color: "#64748b", fontFamily: "var(--font-mono)" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none min-h-[48px]"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#f1f5f9",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(0,212,255,0.4)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono mb-1.5"
                    style={{ color: "#64748b", fontFamily: "var(--font-mono)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What's on your mind?"
                    className="w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 outline-none resize-none"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#f1f5f9",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(0,212,255,0.4)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.08)";
                    }}
                  />
                </div>

                {error && (
                  <p className="text-sm" style={{ color: "#ef4444" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary justify-center mt-1 min-h-[48px] w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  <span>{submitting ? "Sending…" : "Send Message"}</span>
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center py-8 px-6 border-t"
        style={{ borderColor: "rgba(255,255,255,0.05)", color: "#334155" }}
      >
        <p className="text-xs font-mono" style={{ fontFamily: "var(--font-mono)" }}>
          Built with Next.js + Tailwind + Framer Motion ·{" "}
          <span className="gradient-text font-semibold">{profile.name}</span> © {new Date().getFullYear()}
        </p>
      </footer>
    </section>
  );
}
