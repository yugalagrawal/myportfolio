import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const SITE_URL = "https://yugalagarwal.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/startup-story", "/library/pm", "/library/poetry"];
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...projects.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}` })),
  ];
}
