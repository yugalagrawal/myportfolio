// ─────────────────────────────────────────────────────────
//  EDIT THIS FILE to add your book reads and PM resources
//  Leave this array empty [] to show "Coming Soon" state
// ─────────────────────────────────────────────────────────

export interface Read {
  title:    string;
  author?:  string;
  type:     "Book" | "Resource" | "Tool" | "Course" | "Newsletter" | "Podcast";
  excerpt:  string;
  url?:     string;
  tags?:    string[];
  rating?:  1 | 2 | 3 | 4 | 5;
}

export const reads: Read[] = [
  // Add your reads here. Example:
  // {
  //   title:   "Inspired: How to Create Tech Products Customers Love",
  //   author:  "Marty Cagan",
  //   type:    "Book",
  //   excerpt: "The definitive playbook for product managers. Changed how I think about discovery vs. delivery.",
  //   tags:    ["Product Strategy", "Discovery"],
  //   rating:  5,
  // },
  // {
  //   title:   "Lenny's Newsletter",
  //   type:    "Newsletter",
  //   excerpt: "Best PM-focused newsletter out there — practical, opinionated, and full of real benchmarks.",
  //   url:     "https://www.lennysnewsletter.com",
  //   tags:    ["PM Craft", "Growth"],
  //   rating:  5,
  // },
];
