// ─────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your projects / case studies
// ─────────────────────────────────────────────────────────

export interface ProjectItem {
  title:       string;
  company:     string;
  description: string;
  metric:      string;       // Key outcome (e.g. "↑32% retention")
  metricLabel: string;       // Context for metric
  tags:        string[];
  type:        "Case Study" | "Side Project" | "Open Source";
  link?:       string;       // URL to full case study or live product
  image?:      string;       // Path to image in /public/images/
  featured?:   boolean;
}

export const projects: ProjectItem[] = [
  {
    title:       "Onboarding Redesign",
    company:     "Current Company",
    description:
      "End-to-end redesign of the user onboarding flow. Identified key drop-off points via funnel analysis, ran 20+ user interviews, and shipped a progressive disclosure model that dramatically improved activation.",
    metric:      "↑35%",
    metricLabel: "D7 Retention",
    tags:        ["Growth", "UX", "A/B Testing"],
    type:        "Case Study",
    featured:    true,
  },
  {
    title:       "Payments Platform 2.0",
    company:     "Previous Company",
    description:
      "Rebuilt the checkout experience from scratch to support multi-currency, multi-gateway payments. Delivered a unified SDK for 3rd-party integrations and reduced checkout latency by 40%.",
    metric:      "↓22%",
    metricLabel: "Drop-off Rate",
    tags:        ["Fintech", "Platform", "API"],
    type:        "Case Study",
    featured:    true,
  },
  {
    title:       "Real-Time Merchant Dashboard",
    company:     "Previous Company",
    description:
      "Built a real-time analytics product for merchants — live GMV, conversion rates, and dispute alerts. Used by 500+ merchants within 3 months of launch with a NPS of 72.",
    metric:      "500+",
    metricLabel: "Merchants in 3 Months",
    tags:        ["Data", "B2B", "0→1"],
    type:        "Case Study",
    featured:    true,
  },
  {
    title:       "Consumer App MVP",
    company:     "Series A Startup",
    description:
      "First PM hire. Built the entire consumer product from blank page to launch. Ran discovery, defined the MVP scope, and shipped to 200K MAU in 12 months.",
    metric:      "200K",
    metricLabel: "MAU in Year One",
    tags:        ["0→1", "Consumer", "Mobile"],
    type:        "Case Study",
  },
];
