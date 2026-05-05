// ─────────────────────────────────────────────────────────
//  EDIT THIS FILE to add your articles, essays, and writings
//  Leave this array empty [] to show "Coming Soon" state
// ─────────────────────────────────────────────────────────

export interface Article {
  title:    string;
  platform: "Medium" | "Substack" | "LinkedIn" | "Personal" | "Other";
  date:     string;
  excerpt:  string;
  url:      string;
  tags?:    string[];
  readTime?: string;
}

export const articles: Article[] = [
  // Add your articles here. Example:
  // {
  //   title:    "Why Most Product Roadmaps Are Lies",
  //   platform: "Medium",
  //   date:     "March 2024",
  //   excerpt:  "A roadmap that nobody believes is just a pretty slide. Here's how to build one that drives real alignment.",
  //   url:      "https://medium.com/@yugal/...",
  //   tags:     ["Roadmapping", "Strategy"],
  //   readTime: "5 min read",
  // },
];
