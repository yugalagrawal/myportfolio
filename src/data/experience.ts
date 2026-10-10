// ─────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your work experience
//  Source of truth: the resume (YugalAgarwal_Resume_Sept26.pdf)
//  - `keywords` (exactly 3, industry / ecosystem names) show on the timeline cards
//  - `description` + 3 short `bullets` show in the details view
//    (wrap a phrase in **double asterisks** to emphasise it)
//  - the resume download button in the details view links to the full story
// ─────────────────────────────────────────────────────────

export interface ExperienceItem {
  company:     string;
  role:        string;
  /** Shorter title for the timeline card; the details view shows the full `role`. */
  cardRole?:   string;
  period:      string;
  location:    string;
  type:        "Full-time" | "Contract" | "Intern" | "Founder";
  keywords:    string[];
  description: string;
  bullets:     string[];
  current?:    boolean;
  url?:        string;
}

/**
 * Small one-line markers on the timeline (not cards).
 * `date` ("Mon YYYY") only decides where the marker sits in the list; it is not displayed.
 */
export interface Milestone {
  label:  string;
  detail: string;
  date:   string;
  icon:   "education" | "work";
}

export const milestones: Milestone[] = [
  { label: "Graduated from IIT (BHU) '23", detail: "CGPA 8.51",  date: "May 2023", icon: "education" },
  { label: "PM Intern at eSamudaay",       detail: "9 months",   date: "Apr 2023", icon: "work" },
];

export const experience: ExperienceItem[] = [
  {
    company:     "LetsTransport",
    role:        "AI Product Manager",
    period:      "May 2026 – Present",
    location:    "Bengaluru, India",
    type:        "Full-time",
    current:     true,
    keywords:    ["Logistics", "Applied AI", "B2B Platforms"],
    description: "Building AI-enabled operations and a ground-up logistics platform.",
    bullets: [
      "**Automated invoicing and compliance** for $40M+ of annual B2B volume: **75%+ adoption in 2 months**, 9/10 NPS.",
      "**Own a 0→1 Part Truck Load platform**, leading 2 APMs and 5 developers: **$1M+/month** in volume, core modules **99% done in 2 months**.",
      "**Launched a partner referral loop**: **1,000+ partners in 2 months** at **25% retention** against a ~10% benchmark.",
    ],
    url: "https://www.letstransport.team",
  },
  {
    company:     "Media.net",
    role:        "Sr. Product Analyst · Product Owner, Data Platform & Bidding",
    cardRole:    "Sr. Product Analyst",
    period:      "Jun 2023 – May 2026",
    location:    "Bengaluru, India",
    type:        "Full-time",
    keywords:    ["AdTech", "RTB", "Data Platforms"],
    description: "Product owner for the internal data platform behind bidding and keyword decisions.",
    bullets: [
      "**Cut roadmap-to-ship time by 20%** by turning auction-level signals into structured PRDs.",
      "**Recovered 25% of leaked revenue** through cross-functional root-cause analyses.",
      "**Shipped Diversity/Relevance Score and App Bidding**, saving **$40K/week**, plus a pre-bidding workflow that surfaced **$7K/week** of seller opportunities.",
    ],
    url: "https://www.media.net",
  },
  {
    company:     "Nogozo Private Limited",
    role:        "Founder",
    period:      "Jun 2020 – Mar 2023",
    location:    "Agra, Uttar Pradesh",
    type:        "Founder",
    keywords:    ["eCommerce", "Startup India", "Shark Tank India"],
    description: "Founded a books marketplace and grew it into a merchant and logistics suite.",
    bullets: [
      "**Scaled to 10K+ users** and INR 3.5Cr+ GMV with no marketing spend, leading a team of 12.",
      "**Won an INR 5L UP Government grant**, Startup India incubation at GLA, and INR 50K+ in sponsorships.",
      "**Reached the Shark Tank India Season 1 pre-finals.**",
    ],
    url: "https://www.nogozo.com",
  },
];
