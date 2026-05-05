"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "About",         href: "#about" },
  { label: "Experience",    href: "#experience" },
  { label: "Projects",      href: "#projects" },
  { label: "Skills",        href: "#skills" },
  { label: "Personal Space",href: "#personal-space" },
  { label: "Contact",       href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("");

  // Glass effect on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10, 15, 30, 0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="font-bold text-lg tracking-tight"
            style={{ fontFamily: "var(--font-mono)", color: "#00d4ff" }}
          >
            {profile.initials}
            <span style={{ color: "#a855f7" }}>.</span>
          </a>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm font-medium transition-colors duration-200 relative group"
                    style={{
                      color: isActive ? "#00d4ff" : "#94a3b8",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 h-px transition-all duration-300"
                      style={{
                        background: "linear-gradient(90deg, #00d4ff, #a855f7)",
                        width: isActive ? "100%" : "0%",
                      }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex btn-outline text-sm py-2 px-5"
          >
            Resume
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: "#f1f5f9" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{
              background: "rgba(10, 15, 30, 0.97)",
              backdropFilter: "blur(24px)",
            }}
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg"
                style={{ color: "#f1f5f9" }}
                aria-label="Close menu"
              >
                <X size={26} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-semibold transition-colors duration-200"
                  style={{
                    color: active === link.href.slice(1) ? "#00d4ff" : "#f1f5f9",
                    fontFamily: "var(--font-display)",
                    minHeight: "44px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-4 text-base px-8 py-3"
                onClick={() => setMenuOpen(false)}
              >
                Download Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
