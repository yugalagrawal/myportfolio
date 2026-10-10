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
    company:     "LetsTransport",
    role:        "AI Product Manager",
    period:      "May 2026 – Present",
    location:    "Bengaluru, India",
    type:        "Full-time",
    current:     true,
    description: "AI-enabled automation, a 0→1 logistics platform and a partner referral engine: 75%+ adoption in 2 months, 1,000+ partners.",
    bullets: [
      "**AI-Powered Risk & Compliance Automation:** Spearheaded the design and rollout of an automated invoicing operations product for **$40M+ annual** intra-B2B operations, standardizing invoice formats and billing structures to reduce billing discrepancies and audit exposure, and overhauling MIS review workflows for compliance visibility — driving **75%+ adoption within 2 months** and a **9/10 NPS**.",
      "**0-to-1 Product Ownership:** Directing end-to-end development of a ground-up Part Truck Load (PTL) logistics platform supporting **$1M+/month** in business volume — leading 2 APMs and 5 developers through Agile sprints in Jira, authoring PRDs, mapping user journeys, and delivering User, Client, and Pricing modules to **99% completion within 2 months** of kickoff, with a roadmap targeting **$3M+/month within 12 months**.",
      "**Contracting & Documentation Risk Reduction:** Partnered with Legal to build and automate the MSA (Master Service Agreement) communication flow, cutting manual coordination and contractual risk; digitized Lorry Receipt (LR) generation, replacing paper-based trip documentation with a structured, backend-integrated, audit-ready flow.",
      "**Partner Growth & Data:** Conceived and launched a Partner App referral program that acquired **1,000+ new partners in 2 months** at **25% retention vs. ~10% industry benchmark**; established structured vehicle-data cleansing and management workflows.",
    ],
    tags: ["Logistics", "0→1", "AI Automation", "PRD", "Partner Growth", "Product"],
    url: "https://www.letstransport.team",
  },
  {
    company:     "Media.net",
    role:        "Sr. Product Analyst · Product Owner, Data Platform & Bidding",
    period:      "Jun 2023 – May 2026",
    location:    "Bengaluru, India",
    type:        "Full-time",
    description: "Owned the roadmap of an internal bidding and data platform, and shipped $40K/week in savings.",
    bullets: [
      "**Product Roadmap Ownership:** Owned the roadmap for Media.net's internal data intelligence platform powering bidding, keyword, and yield analytics across the ad exchange; translated auction-level signals into structured PRDs, cutting roadmap-to-ship cycle time by **20%**.",
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
    description: "Founded an eComm + SaaS startup to 10K+ users, with a UP Govt grant and a Shark Tank India S1 pre-final.",
    bullets: [
      "**0-to-1 Product Build:** Designed and launched a Buy/Rent/Sell book marketplace for Tier-2/3 city students from scratch — scaled to **10K+ users** and generated **INR 4L+ in commissions** (**INR 3.5Cr+ GMV**), solving a real access gap with zero external marketing spend.",
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
    description: "Set up analytics from scratch and cut churn by 40% through experiments.",
    bullets: [
      "**Analytics Foundation from 0:** Set up the entire analytics stack from scratch — Google Analytics and Mixpanel across app and web — turning a data-blind product into one with full visibility into funnels, cohorts, segmentation, and user behaviour.",
      "**Churn Reduction:** Pinpointed notification fatigue as the churn culprit via path and funnel analysis; ran A/B tests that brought **churn down by 40%**.",
      "**Feature Execution:** Proposed and executed **\"Delivery Slot Booking\"** and **\"Loyalty Daily Games\"** — both addressing real drop-off points identified in the user journey.",
      "**Stakeholder Reporting:** Built dashboards in Google Data Studio, ran bi-weekly metrics reports, and started a product newsletter tracking industry trends — making data and product thinking a team habit.",
    ],
    tags: ["Analytics", "A/B Testing", "Mixpanel", "Growth", "Internship"],
  },
];
