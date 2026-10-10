// ─────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your work experience
//  Source of truth: the resume (YugalAgarwal_Resume_Sept26.pdf)
//  - `keywords` (exactly 3, industry / ecosystem names) show on the timeline cards
//  - `description` + `bullets` show in the detail drawer
//    (wrap a phrase in **double asterisks** to highlight it)
// ─────────────────────────────────────────────────────────

export interface ExperienceItem {
  company:     string;
  role:        string;
  period:      string;
  location:    string;
  type:        "Full-time" | "Contract" | "Intern" | "Founder";
  keywords:    string[];
  description: string;
  bullets:     string[];
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
    keywords:    ["Logistics", "Applied AI", "B2B Platforms"],
    description: "Building AI-enabled operations and a ground-up logistics platform, from invoicing automation to partner growth.",
    bullets: [
      "**AI-powered invoicing & compliance:** Designed and rolled out automated invoicing operations for **$40M+ annual** intra-B2B volume. Standardised invoice formats and billing structures to cut billing discrepancies and audit exposure, and rebuilt MIS review for compliance visibility. Brought Finance and Operations on board for **75%+ adoption in 2 months** and a **9/10 NPS**.",
      "**0→1 Part Truck Load platform:** Own product end to end for a ground-up PTL logistics platform carrying **$1M+/month** in business. Led **2 APMs and 5 developers** through Agile sprints in Jira: PRDs, user journeys, and the User, Client and Pricing modules delivered to **99% completion within 2 months** of kickoff. The roadmap targets **$3M+/month within 12 months**.",
      "**Contracting & documentation:** Partnered with Legal to automate the MSA (Master Service Agreement) communication flow, reducing manual coordination and contractual risk. Digitised Lorry Receipt generation, replacing paper trip documents with a structured, backend-integrated, audit-ready flow.",
      "**Partner growth:** Conceived and launched a Partner App referral program that brought in **1,000+ partners in 2 months**, at **25% retention against a ~10% industry benchmark**, alongside structured vehicle-data cleansing and management workflows.",
    ],
    url: "https://www.letstransport.team",
  },
  {
    company:     "Media.net",
    role:        "Sr. Product Analyst · Product Owner, Data Platform & Bidding",
    period:      "Jun 2023 – May 2026",
    location:    "Bengaluru, India",
    type:        "Full-time",
    keywords:    ["AdTech", "RTB", "Data Platforms"],
    description: "Product owner for the internal data platform behind bidding, keyword and yield decisions across the ad exchange.",
    bullets: [
      "**Roadmap ownership:** Owned the roadmap for the internal data intelligence platform powering bidding, keyword and yield analytics across the ad exchange. Turned auction-level signals into structured PRDs, cutting roadmap-to-ship cycle time by **20%**.",
      "**Revenue recovery through RCA:** Led cross-functional root-cause analyses on programmatic bidding and keyword performance, recovering **25%** of leaked capital and feeding the findings straight into the priority backlog.",
      "**Feature innovation:** Took two capabilities, **Diversity/Relevance Score** and **App Bidding**, from proof of concept to launch, delivering **$40K/week** in structural savings, a **10%** reduction in bidding overheads.",
      "**Automated revenue identification:** Architected a pre-bidding workflow that flagged **$7K/week** of high-value seller opportunities and removed **15 hrs/week** of manual audit effort, with alerting and debugging workflows rolled out alongside.",
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
    description: "Founder of a books marketplace turned merchant and logistics suite, from first idea to Shark Tank India.",
    bullets: [
      "**0→1 product and team:** Founded and scaled a Buy/Rent/Sell books marketplace to **10K+ active users** and **INR 4L+ in commissions** (**INR 3.5Cr+ GMV**) with no marketing capital. Expanded into a Merchant & Logistics app suite, leading a **12-person** team across engineering, operations and growth.",
      "**Recognition & partnerships:** Secured an **INR 5L UP Government grant** and Startup India incubation at GLA. Onboarded enterprise clients including Decimal Technologies, earned **INR 50K+** in sponsorships from Disha Publication, and reached the pre-finals of Sony's **Shark Tank India Season 1**.",
    ],
    url: "https://www.nogozo.com",
  },
];
