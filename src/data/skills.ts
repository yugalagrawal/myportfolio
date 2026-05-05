// ─────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your skills and tools
// ─────────────────────────────────────────────────────────

export const pmSkills = [
  "Product Strategy",
  "Roadmapping",
  "User Research",
  "A/B Testing",
  "Funnel Analysis",
  "OKR Frameworks",
  "Go-to-Market",
  "Stakeholder Management",
  "Data-Driven Decisions",
  "Agile / Scrum",
  "Design Thinking",
  "Prioritization (RICE / ICE)",
  "SQL",
  "PRD Writing",
  "Competitive Analysis",
  "Customer Development",
];

export interface Tool {
  name:     string;
  category: "Analytics" | "Design" | "Dev" | "Productivity" | "Research";
  icon?:    string;   // react-icons identifier (optional)
}

export const tools: Tool[] = [
  // Analytics
  { name: "Mixpanel",    category: "Analytics" },
  { name: "Amplitude",   category: "Analytics" },
  { name: "Google Analytics", category: "Analytics" },
  { name: "Looker",      category: "Analytics" },
  { name: "SQL",         category: "Analytics" },
  // Design
  { name: "Figma",       category: "Design" },
  { name: "Miro",        category: "Design" },
  // Dev
  { name: "JIRA",        category: "Dev" },
  { name: "Linear",      category: "Dev" },
  { name: "GitHub",      category: "Dev" },
  // Productivity
  { name: "Notion",      category: "Productivity" },
  { name: "Confluence",  category: "Productivity" },
  { name: "Slack",       category: "Productivity" },
  { name: "Loom",        category: "Productivity" },
  // Research
  { name: "UserTesting", category: "Research" },
  { name: "Hotjar",      category: "Research" },
  { name: "Dovetail",    category: "Research" },
];

export const toolCategories = ["Analytics", "Design", "Dev", "Productivity", "Research"] as const;
