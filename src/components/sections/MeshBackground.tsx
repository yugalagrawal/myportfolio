"use client";

import { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  background: { color: { value: "transparent" } },
  fpsLimit: 50,
  particles: {
    number: { value: 50, density: { enable: true } },
    color: { value: ["#635bff", "#228be6", "#845ef7"] },
    links: {
      enable: true,
      color: "#635bff",
      distance: 160,
      opacity: 0.1,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      random: true,
      outModes: { default: "bounce" },
    },
    opacity: { value: { min: 0.15, max: 0.5 } },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2 } },
  },
  detectRetina: true,
  interactivity: {
    events: { onHover: { enable: true, mode: "grab" }, resize: { enable: true } },
    modes: { grab: { distance: 140, links: { opacity: 0.3 } } },
  },
};

export default function MeshBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const loaded = useCallback(async () => {}, []);

  if (!init) return null;
  return (
    <Particles
      id="mesh-particles"
      className="absolute inset-0 z-0"
      options={options}
      particlesLoaded={loaded}
    />
  );
}
