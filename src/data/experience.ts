// ─────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your work experience timeline
// ─────────────────────────────────────────────────────────

export interface ExperienceItem {
  company:     string;
  role:        string;
  period:      string;
  location:    string;
  type:        "Full-time" | "Contract" | "Intern";
  description: string;
  bullets:     string[];
  tags:        string[];
  current?:    boolean;
}

export const experience: ExperienceItem[] = [
  {
    company:     "Your Current Company",
    role:        "Senior Product Manager",
    period:      "Jan 2023 – Present",
    location:    "Remote / India",
    type:        "Full-time",
    current:     true,
    description: "Leading product strategy for a core consumer product.",
    bullets: [
      "Drove a 35% increase in D30 retention by redesigning the onboarding funnel",
      "Launched 3 major features in 6 months, each with a defined OKR and metric playbook",
      "Partnered with engineering, design, and marketing across 4 time zones",
      "Built and maintained the product roadmap, prioritized using RICE scoring",
    ],
    tags: ["Growth", "B2C", "Retention"],
  },
  {
    company:     "Previous Company",
    role:        "Product Manager",
    period:      "Jun 2021 – Dec 2022",
    location:    "Bangalore, India",
    type:        "Full-time",
    description: "Owned the payments and checkout experience for a fintech platform.",
    bullets: [
      "Reduced checkout drop-off by 22% through UX iteration and A/B testing",
      "Integrated 2 new payment gateways, expanding to 5 new markets",
      "Led discovery sessions with 40+ enterprise clients to inform the B2B roadmap",
      "Shipped a real-time analytics dashboard used by 500+ merchants",
    ],
    tags: ["Fintech", "B2B", "Payments"],
  },
  {
    company:     "Startup / Earlier Role",
    role:        "Associate Product Manager",
    period:      "Aug 2019 – May 2021",
    location:    "Delhi, India",
    type:        "Full-time",
    description: "First PM hire at a Series A startup — built 0→1 products.",
    bullets: [
      "Built the MVP from scratch and achieved product-market fit within 8 months",
      "Grew MAU from 0 to 200K in the first year post-launch",
      "Established the product development process, sprint cadence, and OKR framework",
      "Ran 50+ user interviews and usability studies to shape the core product vision",
    ],
    tags: ["0→1", "Startup", "Consumer"],
  },
];
