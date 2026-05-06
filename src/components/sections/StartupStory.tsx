"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Rocket, Users, Banknote, Tv2, Play, X } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";

/* ═══════════════════════════════════════════════════════════════════════════
   EDIT THIS — drop in your real photos and YouTube video IDs
   ─────────────────────────────────────────────────────────────────────────
   type "photo"  → put the image path in `src`   (e.g. "/images/startup/my-pic.jpg")
   type "video"  → put the YouTube video ID in `youtubeId`
                   (the part after "watch?v=" in the URL)
═══════════════════════════════════════════════════════════════════════════ */
type GalleryItem =
  | { type: "photo"; src: string; alt?: string }
  | { type: "video"; youtubeId: string; title?: string };

const GALLERY_ITEMS: GalleryItem[] = [
  /* ── Photos ──────────────────────────────────────── */
  { type: "photo", src: "/images/startup/IMG-20201030-WA0015.jpg",      alt: "Early days" },
  { type: "photo", src: "/images/startup/IMG20210827100218.jpg",         alt: "Building Nogozo" },
  { type: "photo", src: "/images/startup/IMG20210827132546.jpg",         alt: "Team at work" },
  { type: "photo", src: "/images/startup/IMG_20211218_171244.jpg",       alt: "Milestone moment" },
  { type: "photo", src: "/images/startup/IMG-20211219-WA0013.jpg",       alt: "Startup journey" },
  { type: "photo", src: "/images/startup/IMG20220302104148.jpg",         alt: "Growth phase" },
  { type: "photo", src: "/images/startup/IMG-20220305-WA0049.jpg",       alt: "On the ground" },
  { type: "photo", src: "/images/startup/1638971212330.jpg",             alt: "Nogozo team" },
  { type: "photo", src: "/images/startup/Screenshot 2026-05-06 164553.png", alt: "Shark Tank" },
  { type: "photo", src: "/images/startup/Screenshot 2026-05-06 164608.png", alt: "Media feature" },
  /* ── YouTube videos ──────────────────────────────── */
  { type: "video", youtubeId: "LDVWRjEIjYk", title: "Nogozo Feature" },
  { type: "video", youtubeId: "HYjaXf3ptFI", title: "Startup Story"  },
];

/* Row 1: photos 1-6 + video 1 | Row 2: photos 7-10 + video 2 + photos 1-2 (for density) */
const ROW_1 = [...GALLERY_ITEMS.slice(0, 6),  GALLERY_ITEMS[10]];
const ROW_2 = [...GALLERY_ITEMS.slice(6, 10), GALLERY_ITEMS[11], GALLERY_ITEMS[1], GALLERY_ITEMS[3]];

const STATS = [
  { icon: Users,    value: "10K+", label: "Users"      },
  { icon: Banknote, value: "₹5L",  label: "Govt Grant" },
  { icon: Tv2,      value: "S1",   label: "Shark Tank" },
];

/* ─── Individual gallery card ──────────────────────────────────────────── */
function GalleryCard({
  item, onClick,
}: { item: GalleryItem; onClick?: () => void }) {
  const isVideo = item.type === "video";
  const thumbSrc = isVideo
    ? `https://img.youtube.com/vi/${item.youtubeId}/maxresdefault.jpg`
    : item.src;

  return (
    <div
      onClick={onClick}
      className={`relative flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden ${isVideo ? "cursor-pointer" : ""}`}
      style={{ width: "clamp(190px, 21vw, 280px)", aspectRatio: "3/2" }}
    >
      {/* Thumbnail */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={thumbSrc}
        alt={isVideo ? (item.title ?? "Video") : (item.alt ?? "")}
        className="w-full h-full object-cover"
        loading="lazy"
        {...(isVideo && {
          onError: (e) => {
            (e.target as HTMLImageElement).src =
              `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`;
          },
        })}
      />

      {/* Video overlay */}
      {isVideo && (
        <>
          <div className="absolute inset-0 bg-black/35 group-hover/card:bg-black/15 transition-colors duration-200" />
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.28)",
              }}
            >
              <Play size={17} fill="white" style={{ color: "white", marginLeft: 2 }} />
            </div>
          </div>
          {/* Title pill */}
          {item.title && (
            <div className="absolute bottom-0 inset-x-0 px-3 py-2"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
              <p className="text-xs font-mono truncate" style={{ color: "rgba(255,255,255,0.6)" }}>
                {item.title}
              </p>
            </div>
          )}
        </>
      )}

      {/* Subtle inner border */}
      <div className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)" }} />
    </div>
  );
}

/* ─── Marquee row — CSS animation so hover:paused works cleanly ─────────── */
function MarqueeRow({
  items, reverse = false, duration = 30, onVideoClick,
}: {
  items: GalleryItem[];
  reverse?: boolean;
  duration?: number;
  onVideoClick: (id: string) => void;
}) {
  /* Triple the items so short lists look seamless on wide screens */
  const looped = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden w-full marquee-gallery-strip group/strip">
      <div
        className="flex gap-3 sm:gap-4 marquee-track group/strip-hover:pause"
        style={{
          width: "max-content",
          animation: `${reverse ? "marquee-right" : "marquee-left"} ${duration}s linear infinite`,
        }}
      >
        {looped.map((item, i) => (
          <div key={i} className="group/card">
            <GalleryCard
              item={item}
              onClick={
                item.type === "video"
                  ? () => onVideoClick(item.youtubeId)
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Video lightbox modal ──────────────────────────────────────────────── */
function VideoModal({
  videoId, onClose,
}: { videoId: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0"
        style={{ background: "rgba(0,0,0,0.9)", backdropFilter: "blur(16px)" }} />

      {/* Player */}
      <motion.div
        className="relative w-full max-w-4xl z-10"
        initial={{ scale: 0.9, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{ aspectRatio: "16/9", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            className="w-full h-full"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"; }}
        >
          <X size={15} style={{ color: "rgba(255,255,255,0.8)" }} />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main section
═══════════════════════════════════════════════════════════════════════════ */
export default function StartupStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      {/* CSS keyframes + marquee-pause-on-hover */}
      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0%); }
          to   { transform: translateX(-33.333%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-33.333%); }
          to   { transform: translateX(0%); }
        }
        .marquee-gallery-strip:hover .marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <AnimatePresence>
        {activeVideo && (
          <VideoModal videoId={activeVideo} onClose={() => setActiveVideo(null)} />
        )}
      </AnimatePresence>

      <section ref={sectionRef} id="startup" className="relative overflow-hidden">

        {/* Ambient emerald glow */}
        <div className="absolute pointer-events-none"
          style={{
            top: "0%", left: "50%", transform: "translateX(-50%)",
            width: "900px", height: "700px",
            background: "radial-gradient(ellipse, rgba(16,185,129,0.055) 0%, transparent 65%)",
          }} />

        <div className="section-divider" />

        <div className="section-container pb-10">
          <SectionHeading
            label="// startup"
            title="The Startup Chapter"
            subtitle="Before corporate life, in the middle of college, I was trying to build something from scratch — and it taught me more than any IIT/IIM degree ever could have."
          />
        </div>

        {/* ── Gallery + floating CTA ─────────────────────────────────── */}
        <div className="relative">

          {/* Marquee rows — dimmed, serve as backdrop */}
          <div className="flex flex-col gap-3 sm:gap-4 py-3" style={{ opacity: 0.45 }}>
            <MarqueeRow items={ROW_1} duration={34} onVideoClick={setActiveVideo} />
            <MarqueeRow items={ROW_2} reverse duration={27} onVideoClick={setActiveVideo} />
          </div>

          {/* Edge fades */}
          {["left","right"].map(side => (
            <div key={side}
              className={`absolute inset-y-0 ${side}-0 w-28 sm:w-40 pointer-events-none z-10`}
              style={{ background: `linear-gradient(to ${side === "left" ? "right" : "left"}, #06030f 30%, transparent)` }}
            />
          ))}
          <div className="absolute inset-x-0 top-0 h-14 pointer-events-none z-10"
            style={{ background: "linear-gradient(to bottom, #06030f, transparent)" }} />
          <div className="absolute inset-x-0 bottom-0 h-14 pointer-events-none z-10"
            style={{ background: "linear-gradient(to top, #06030f, transparent)" }} />

          {/* ── CTA card — centred, pointer-events-none wrapper so marquee
               items at the edges stay clickable ─────────────────────── */}
          <div className="absolute inset-0 flex items-center justify-center z-20 px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-3xl p-8 sm:p-10 text-center w-full max-w-[420px] pointer-events-auto"
              style={{
                background: "rgba(6,3,15,0.76)",
                backdropFilter: "blur(32px)",
                border: "1px solid rgba(16,185,129,0.2)",
                boxShadow: "0 0 90px rgba(16,185,129,0.08), inset 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Top glow */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(16,185,129,0.22), transparent 70%)" }} />

              {/* Rocket icon — wobbles on repeat */}
              <motion.div
                animate={{ rotate: [0, -7, 7, -3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(16,185,129,0.11)", border: "1px solid rgba(16,185,129,0.24)" }}
              >
                <Rocket size={22} style={{ color: "#10b981" }} />
              </motion.div>

              <p className="text-xs font-mono tracking-widest uppercase mb-3"
                style={{ color: "rgba(16,185,129,0.55)", fontFamily: "var(--font-mono)" }}>
                // Nogozo · 2019 – 2022
              </p>

              <h3
                className="text-2xl sm:text-3xl font-black leading-[1.15] mb-3"
                style={{ fontFamily: "var(--font-display)", color: "rgba(255,255,255,0.92)", letterSpacing: "-1px" }}
              >
                Before the PM job,<br />
                <span style={{ color: "#10b981" }}>there was a startup.</span>
              </h3>

              <p className="text-sm leading-relaxed mb-7" style={{ color: "rgba(255,255,255,0.33)" }}>
                A COVID-born idea that grew to 10K+ users, won a ₹5L government grant, and made it to Shark Tank Season 1.
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-7 sm:gap-9 mb-8">
                {STATS.map(({ icon: Icon, value, label }, idx) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.45 + idx * 0.08 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <Icon size={12} style={{ color: "rgba(16,185,129,0.45)" }} />
                    <p className="text-lg font-black leading-none"
                      style={{ color: "#10b981", fontFamily: "var(--font-display)" }}>
                      {value}
                    </p>
                    <p className="text-[11px]"
                      style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}>
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA button */}
              <Link
                href="/startup-story"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: "rgba(16,185,129,0.11)",
                  color: "#10b981",
                  border: "1px solid rgba(16,185,129,0.28)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(16,185,129,0.2)";
                  el.style.borderColor = "rgba(16,185,129,0.5)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(16,185,129,0.11)";
                  el.style.borderColor = "rgba(16,185,129,0.28)";
                }}
              >
                Read My Startup Story <ArrowUpRight size={14} />
              </Link>

              {/* Hint for clickable videos */}
              <p className="mt-4 text-[11px] font-mono"
                style={{ color: "rgba(255,255,255,0.14)", fontFamily: "var(--font-mono)" }}>
                hover the gallery · click ▶ to watch
              </p>
            </motion.div>
          </div>
        </div>

        <div className="h-10 sm:h-16" />
      </section>
    </>
  );
}
