"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle } from "lucide-react";
import { FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { profile } from "@/data/profile";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/ui/ScrollReveal";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function Contact() {
  const [form,       setForm]       = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setError("");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) { setSubmitted(true); setForm({ name: "", email: "", message: "" }); }
      else setError("Something went wrong. Please email me directly.");
    } catch { setError("Network error. Please email me directly."); }
    finally { setSubmitting(false); }
  };

  const socials = [
    { icon: FaLinkedin, href: profile.socials.linkedin, label: "LinkedIn",  color: "#0a66c2" },
    { icon: FaGithub,   href: profile.socials.github,   label: "GitHub",    color: "#94a3b8" },
    { icon: FaXTwitter, href: profile.socials.twitter,  label: "Twitter/X", color: "#fff" },
    { icon: Mail,       href: `mailto:${profile.email}`,label: "Email",     color: "#635bff" },
  ].filter((s) => s.href && s.href !== "mailto:");

  const inputStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.92)",
    width: "100%",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    minHeight: "48px",
    fontFamily: "inherit",
  };

  return (
    <section id="contact" className="relative">
      <div className="section-divider" />
      <div className="section-container">
        <SectionHeading label="// 06  contact" title="Get In Touch"
          subtitle="Have an opportunity, a question, or just want to say hi?" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left */}
          <ScrollReveal direction="left">
            <p className="text-base sm:text-lg leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.35)" }}>
              I&rsquo;m always open to discussing product strategy, new opportunities,
              or just swapping notes on what&rsquo;s working in the PM world.
            </p>
            <a href={`mailto:${profile.email}`} className="btn-primary inline-flex mb-10">
              <Mail size={15} />{profile.email}
            </a>

            <p className="text-xs font-mono tracking-widest uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>
              Find me on
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 min-h-[44px] glass"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = `${color}55`;
                    el.style.color = color;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.color = "rgba(255,255,255,0.35)";
                  }}
                  aria-label={label}
                >
                  <Icon size={15} />
                  <span className="text-sm font-medium">{label}</span>
                </a>
              ))}
            </div>
          </ScrollReveal>

          {/* Right — Form */}
          <ScrollReveal direction="right" delay={0.1}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-10 text-center flex flex-col items-center gap-4"
              >
                <CheckCircle size={44} style={{ color: "#635bff" }} />
                <h3 className="text-xl font-bold" style={{ color: "rgba(255,255,255,0.92)" }}>Message Sent!</h3>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Thanks for reaching out. I&rsquo;ll get back to you within 1–2 business days.
                </p>
                <button onClick={() => setSubmitted(false)} className="btn-outline text-sm mt-2">
                  Send Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 flex flex-col gap-4">
                {(["name", "email"] as const).map((field) => (
                  <div key={field}>
                    <label className="block text-xs font-mono mb-1.5"
                      style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)", textTransform: "capitalize" }}>
                      {field}
                    </label>
                    <input
                      id={field} name={field}
                      type={field === "email" ? "email" : "text"}
                      required
                      value={form[field]}
                      onChange={handleChange}
                      placeholder={field === "email" ? "you@example.com" : "Your name"}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(99,91,255,0.4)"; }}
                      onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-mono mb-1.5"
                    style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}>
                    Message
                  </label>
                  <textarea
                    id="message" name="message" required rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="What's on your mind?"
                    style={{ ...inputStyle, resize: "none", minHeight: "unset" }}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(99,91,255,0.4)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
                  />
                </div>
                {error && <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>}
                <button type="submit" disabled={submitting}
                  className="btn-primary justify-center min-h-[48px] w-full disabled:opacity-60 disabled:cursor-not-allowed mt-1">
                  <Send size={14} />
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 px-6"
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
