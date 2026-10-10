import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { profile } from "@/data/profile";

interface SiteBarProps {
  /** "dark" for the glass pages, "paper" for the cream reading pages */
  variant: "dark" | "paper";
  backHref: string;
  backLabel?: string;
  /** Small context text shown on the right on wide screens */
  meta?: string;
  /** Extra controls rendered before the Resume button */
  trailing?: React.ReactNode;
  /** Max width class to match the page's content column */
  widthClass?: string;
}

const THEME = {
  dark: {
    bar:    { background: "rgba(6,3,15,0.88)", borderColor: "rgba(99,91,255,0.12)" },
    text:   "text-[var(--text-2)] hover:text-white",
    meta:   { color: "var(--text-3)" },
    brand:  "text-[var(--accent-text)]",
    resume: "border-[rgba(255,255,255,0.14)] text-[var(--text-2)] hover:text-white hover:border-[rgba(255,255,255,0.3)]",
  },
  paper: {
    bar:    { background: "rgba(253,249,244,0.94)", borderColor: "#e7e5e1" },
    text:   "text-[#57534e] hover:text-[#047857]",
    meta:   { color: "#78716c" },
    brand:  "text-[#047857]",
    resume: "border-[#d6d3d1] text-[#57534e] hover:text-[#047857] hover:border-[#047857]",
  },
} as const;

/** One consistent top bar for every sub-page: back, home wordmark, resume. */
export default function SiteBar({
  variant, backHref, backLabel = "Back", meta, trailing, widthClass = "max-w-2xl",
}: SiteBarProps) {
  const t = THEME[variant];
  return (
    <div className="sticky top-0 z-50 border-b backdrop-blur-xl" style={t.bar}>
      <div className={`${widthClass} mx-auto px-5 sm:px-6 h-14 flex items-center justify-between gap-3`}>
        <div className="flex items-center gap-4 min-w-0">
          <Link href={backHref}
            className={`inline-flex items-center gap-1.5 text-sm font-mono min-h-[44px] transition-colors ${t.text}`}
            style={{ fontFamily: "var(--font-mono)" }}>
            <ArrowLeft size={14} /> {backLabel}
          </Link>
          <Link href="/" aria-label="Home"
            className={`font-black text-sm tracking-tight ${t.brand}`}
            style={{ fontFamily: "var(--font-display)" }}>
            YA.
          </Link>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {meta && <span className="hidden md:inline text-xs font-mono" style={{ ...t.meta, fontFamily: "var(--font-mono)" }}>{meta}</span>}
          {trailing}
          <a href={profile.resumeUrl} download={profile.resumeFileName}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 min-h-[36px] rounded-lg border transition-colors ${t.resume}`}>
            <Download size={13} /> Resume
          </a>
        </div>
      </div>
    </div>
  );
}
