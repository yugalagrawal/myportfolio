// ─────────────────────────────────────────────────────────
//  EDIT THIS FILE to update the "Shipped at work" highlights
//  (numbers come from the resume — keep them in sync with it)
// ─────────────────────────────────────────────────────────

export interface ImpactItem {
  company: string;
  metric:  string;
  label:   string;
  title:   string;
  detail:  string;
}

export const impact: ImpactItem[] = [
  {
    company: "LetsTransport",
    metric:  "75%+",
    label:   "adoption in 2 months · 9/10 NPS",
    title:   "AI-Powered Invoicing & Compliance Automation",
    detail:  "Standardised invoicing and MIS review for $40M+ annual intra-B2B operations, cutting billing discrepancies and audit exposure.",
  },
  {
    company: "LetsTransport",
    metric:  "$1M+/mo",
    label:   "volume · 99% of core modules in 2 months",
    title:   "0→1 Part Truck Load Platform",
    detail:  "Led 2 APMs and 5 developers to ship User, Client and Pricing modules, with a roadmap targeting $3M+/month in 12 months.",
  },
  {
    company: "LetsTransport",
    metric:  "1,000+",
    label:   "partners in 2 months · 25% retention vs ~10%",
    title:   "Partner App Referral Program",
    detail:  "Conceived and launched the referral loop, plus vehicle-data cleansing workflows behind it.",
  },
  {
    company: "Media.net",
    metric:  "$40K/wk",
    label:   "structural cost savings",
    title:   "Diversity/Relevance Score & App Bidding",
    detail:  "Took two capabilities from PoC to launch, a 10% cut in bidding overheads, on top of 25% revenue leakage recovered via RCA.",
  },
];
