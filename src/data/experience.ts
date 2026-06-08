// ─────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your work experience
// ─────────────────────────────────────────────────────────

export interface ExperienceItem {
  company:     string;
  role:        string;
  period:      string;
  location:    string;
  type:        "Full-time" | "Contract" | "Intern" | "Founder";
  description: string;
  bullets:     string[];
  tags:        string[];
  current?:    boolean;
  url?:        string;
}

export const experience: ExperienceItem[] = [
  {
    company:     "Media.net",
    role:        "Sr. Product Analyst",
    period:      "May 2023 – Present",
    current:     true,
    location:    "Bangalore, India",
    type:        "Full-time",
    description: "Owned AdTech analytics — RTB pipelines, keyword intelligence, and the tool nobody knew they needed.",
    bullets: [
      "Ran RCAs on programmatic bidders & keyword performance to diagnose revenue leakage — roadmap fixes recovered **25% of potential losses** over 2 years by shifting focus to high-yield opportunities.",
      "Shipped PoCs (Diversity/Relevance Scores, App Bidding) end-to-end — delivered **$40K/week in cost savings**, a **10% reduction** in total bidding costs.",
      "Automated a pre-bid workflow to surface high-revenue ad slots — unlocked **+$7K/week** in incremental revenue and eliminated **15 hrs/week** of manual analysis.",
      "Owned the internal Data Dashboard product (real-time viz, spam detection, RCA workflows, custom alerts) — saved **10 hrs/week** in manual validation for publisher-managing teams.",
    ],
    tags: ["AdTech", "RTB", "Analytics", "Workflows", "Product"],
    url: "https://www.media.net",
  },
  {
    company:     "Nogozo",
    role:        "Founder",
    period:      "Jun 2020 – Mar 2023",
    location:    "Agra, India",
    type:        "Founder",
    description: "eComm+SaaS, built by a broke college kid — backed by UP Govt, pitched to the Sharks, regrets: 0, Users: 10k+",
    bullets: [
      "Built a Buy/Rent/Sell book app from scratch targeting Tier-2/3 city students — scaled to **10K+ users** and secured sponsorships from publishers & coaching institutes for in-app ads.",
      "Developed a **Merchant & Delivery App Suite** as a SaaS layer for sellers — expanded into corporate book gifting and secured B2B clients including Decimal Technologies.",
      "Led a team of **12+ people** across product, marketing & ops — won **₹5L govt grant** (StartinUp), incubated under StartupIndia, and qualified for **Shark Tank India S1** auditions.",
      "Before pivoting to eComm+SaaS, Nogozo started as a social initiative during COVID-19 — a hyperlocal app that onboarded **30+ merchants**, hit **1K+ downloads in 3 months**, and got featured in **Dainik Jagran**.",
    ],
    tags: ["0→1", "eCommerce", "SaaS", "Startup", "Shark Tank"],
    url: "https://www.nogozo.com",
  },
];
