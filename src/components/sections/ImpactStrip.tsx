"use client";

import { motion } from "framer-motion";
import { impact } from "@/data/impact";

/** Resume-backed outcomes. Swipeable on phones, 2×2 grid on larger screens. */
export default function ImpactStrip() {
  return (
    <div className="mb-10">
      <p className="text-xs mb-3 tracking-widest uppercase"
        style={{ color: "var(--accent2-text)", fontFamily: "var(--font-mono)" }}>
        Shipped at work
      </p>
      <div className="-mx-6 px-6 md:mx-0 md:px-0 flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory no-scrollbar pb-2">
        {impact.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="glass rounded-2xl p-5 flex flex-col shrink-0 w-[82%] sm:w-[60%] md:w-auto snap-center"
            style={{ border: "1px solid rgba(99,91,255,0.15)" }}
          >
            <span className="text-xs mb-3" style={{ color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
              {item.company}
            </span>
            <span className="text-3xl font-black gradient-text leading-none mb-1" style={{ fontFamily: "var(--font-display)" }}>
              {item.metric}
            </span>
            <span className="text-xs mb-3 leading-snug" style={{ color: "var(--text-2)", fontFamily: "var(--font-mono)" }}>
              {item.label}
            </span>
            <span className="text-base font-semibold mb-1.5 leading-snug" style={{ color: "var(--text-1)" }}>
              {item.title}
            </span>
            <span className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
              {item.detail}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
