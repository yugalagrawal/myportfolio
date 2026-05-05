"use client";

import { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particleOptions: ISourceOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true } },
    color: { value: ["#00d4ff", "#a855f7"] },
    links: {
      enable: true,
      color: "#00d4ff",
      distance: 150,
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
    },
    opacity: { value: { min: 0.2, max: 0.6 } },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2.5 } },
  },
  detectRetina: true,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.4 } },
    },
  },
};

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0"
      options={particleOptions}
      particlesLoaded={particlesLoaded}
    />
  );
}
