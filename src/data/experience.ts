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
    company:     "Letstransport",
    role:        "Product Manager",
    period:      "May 2026 – Present",
    location:    "Bengaluru, India",
    type:        "Full-time",
    current:     true,
    description: "Placeholder — details to be added soon.",
    bullets: [
      "Details coming soon.",
    ],
    tags: ["Product", "Logistics"],
    url: "https://www.letstransport.team",
  },
  {
    company:     "Media.net",
    role:        "Sr. Product Analyst",
    period:      "Jun 2023 – May 2026",
    location:    "Bengaluru, India",
    type:        "Full-time",
    description: "Owned product roadmap for an internal data intelligence platform — PRDs, sprint priorities, and high-impact feature delivery across AdTech.",
    bullets: [
      "**Product Roadmap Ownership:** Owned product roadmap for an internal data intelligence platform; defined PRDs, user stories, and sprint priorities in collaboration with engineering and business stakeholders, improving feature delivery velocity by **30%**.",
      "**Revenue Recovery via RCA:** Drove **25% recovery in revenue leakage** by leading structured RCAs on programmatic bidding and keyword performance, directly translating insights into roadmap decisions.",
      "**Feature Innovation — 0 to Launch:** Shipped 2 high-impact features (Diversity/Relevance Score, App Bidding) from PoC to launch — delivering **$40K/week in cost savings** (10% reduction in total bidding costs).",
      "**Automated Revenue Identification:** Designed an automated pre-bidding workflow that identified **$7K/week** worth of sellertags to bid — eliminating **15 man-hours/week** of manual analysis.",
      "**Platform Enhancements:** Led data platform improvements including real-time visualization charts, spam detection automated workflows, RCA tooling, and custom alerts — saving **10 hrs/week** in manual validation for its users.",
    ],
    tags: ["AdTech", "RTB", "PRD", "Analytics", "Roadmapping", "Product"],
    url: "https://www.media.net",
  },
  {
    company:     "Nogozo Private Limited",
    role:        "Founder",
    period:      "Jun 2020 – Mar 2023",
    location:    "Agra, Uttar Pradesh",
    type:        "Founder",
    description: "eComm+SaaS, built by a broke college kid — backed by UP Govt, pitched to the Sharks, regrets: 0, Users: 10k+",
    bullets: [
      "**0-to-1 Product Build:** Designed and launched a Buy/Rent/Sell book marketplace for Tier-2/3 city students from scratch — scaled to **10K+ users** and generated **INR 4L+ in commissions revenue**, solving a real access gap with zero external marketing spend.",
      "**SaaS Expansion:** Built a parallel Merchant & Delivery App Suite for onboarded sellers; acquired **B2B clients** including Decimal Technologies for corporate book gifting, validating a multi-sided B2C + B2B revenue model.",
      "**Monetization & Partnerships:** Secured **INR 50K+ in sponsorships** from Disha Publication and local coaching institutes for in-app ads placement — diversifying revenue beyond transactional GMV.",
      "**Team & Execution:** Led **12 people** across product, engineering, marketing, and ops — owned roadmap, wrote specs, executed features, and made every product call end to end.",
      "**Recognition:** Won **INR 5L grant by UP Govt** for social impactful startup; Incubated under Startup India Scheme at GLA Mathura; Qualified for pre-finals of **Sony Shark Tank India Season 1**.",
      "**Origin:** Started as a COVID-19 social initiative — digitised **30+ local merchants**, hit **1K+ downloads in 3 months**, featured in Dainik Jagran. Used those early product instincts to build NOGOZO.",
    ],
    tags: ["0→1", "eCommerce", "SaaS", "Startup", "Shark Tank"],
    url: "https://www.nogozo.com",
  },
  {
    company:     "eSamudaay",
    role:        "Product Management Intern",
    period:      "Oct 2021 – Jun 2022",
    location:    "Remote",
    type:        "Intern",
    description: "Set up analytics from scratch and drove data-informed product decisions for a hyperlocal commerce platform.",
    bullets: [
      "**Analytics Foundation from 0:** Set up the entire analytics stack from scratch — Google Analytics and Mixpanel across app and web — turning a data-blind product into one with full visibility into funnels, cohorts, segmentation, and user behaviour.",
      "**Churn Reduction:** Pinpointed notification fatigue as the churn culprit via path and funnel analysis; ran A/B tests that brought **churn down by 40%**.",
      "**Feature Execution:** Proposed and executed **\"Delivery Slot Booking\"** and **\"Loyalty Daily Games\"** — both addressing real drop-off points identified in the user journey.",
      "**Stakeholder Reporting:** Built dashboards in Google Data Studio, ran bi-weekly metrics reports, and started a product newsletter tracking industry trends — making data and product thinking a team habit.",
    ],
    tags: ["Analytics", "A/B Testing", "Mixpanel", "Growth", "Internship"],
  },
];
