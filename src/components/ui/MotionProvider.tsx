"use client";

import { MotionConfig } from "framer-motion";

/** Respects the visitor's "reduce motion" OS setting for every framer-motion animation. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
