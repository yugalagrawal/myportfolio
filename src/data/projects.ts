// ─────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your projects / case studies
// ─────────────────────────────────────────────────────────

export interface ProjectSection {
  title:   string;
  content: string;
}

export interface ProjectItem {
  slug:          string;
  title:         string;
  company:       string;
  description:   string;        // Short card description
  metric:        string;
  metricLabel:   string;
  tags:          string[];
  type:          "Case Study" | "Side Project" | "Deck" | "Open Source";
  image?:        string;
  embedUrl?:     string;        // Google Drive /preview or YouTube embed
  externalLink?: string;
  sections?:     ProjectSection[];
  featured?:     boolean;
}

export const projects: ProjectItem[] = [
  {
    slug:        "vahansync",
    title:       "VahanSync: An Autonomous Logistics OS",
    company:     "Logistics · Strategy",
    description: "India's freight market bleeds 14% of every rupee to broker chains and empty miles. VahanSync is a zero-touch autonomous matchmaking OS that connects shippers to the right vehicle in under 20 minutes — no human in the loop.",
    metric:      "₹100Cr",
    metricLabel: "ARR Blueprint",
    tags:        ["Logistics", "AI/ML", "Marketplace", "B2B", "Strategy", "0→1"],
    type:        "Case Study",
    image:       "/images/projects/vahansync.png",
    embedUrl:    "https://drive.google.com/file/d/1Ohr5GmujpLZI9p3k8UQtKstlfTVSR56t/preview",
    featured:    true,
    sections: [
      {
        title:   "The Problem",
        content: "India's ₹429B logistics market (CAGR 6.48%, roadways 55% share) runs on phone calls, 3–5 broker layers, and gut instinct. The result: 30–40% empty return miles, 2–3 days of idle time per trip, and a trust deficit so severe that drivers ghost, payments delay, and shippers have zero visibility. Competitors are digitising the surface — building apps over broken brokerage. The deeper problem is structural: there's no intelligent matching protocol underneath.",
      },
      {
        title:   "My Approach",
        content: "Designed VahanSync — an Autonomous Logistics OS built around a weighted scoring engine:\n\nS = (w₁ · Distance) + (w₂ · Reliability) + (w₃ · Margin) − (w₄ · Opportunity Cost)\n\nEvery match request flows through three phases: (1) Ingestion & normalisation — contextualisation, dynamic geofencing, hard constraint checks. (2) Batched optimisation — a 30-second window evaluates all pending requests globally (vs. greedy first-come-first-served), producing network-optimal matches. (3) Tiered resolution — Tier 1 (internal fleet, <10 mins), Tier 2 (verified drivers, 20 mins), Tier 3 (external API aggregators). Resolution is zero-touch: smart contract executes on geofence completion, payment triggers automatically.",
      },
      {
        title:   "Smart Features",
        content: "Load Pooling: Mathematically verifies if a single vehicle can serve two Part Load requests within 15% route deviation — directly attacking empty mile waste.\n\nPredictive Rebalancing: Demand surge forecasted 2 hours in advance; drivers in low-demand zones receive repositioning bonuses pre-spike.\n\nMulti-Stop Optimisation (TSP): Traveling Salesperson logic re-sequences multi-drop routes to minimise fuel consumption vs. inefficient sequential routing.\n\nAI as Margin Expander: Multilingual voice bots handle queries in 12+ dialects (−20% OpEx). Predictive pricing engine forecasts demand 2 hours ahead (+5% yield improvement).",
      },
      {
        title:   "Go-to-Market",
        content: "Supply Side — The Anchor Model: Target 2,000 fleet owners (50 trucks each = 1L trucks) rather than individuals. Hook: fuel credit for first 5 trips. Retain via backhaul guarantee (prioritise round trips). Channels: 40K Digi-Check activations at toll plazas, 30K peer-referral convoy, 30K WhatsApp bot reach.\n\nDemand Side — The Trojan Horse: Offer a free Light-TMS for 3 months to SME clusters (Ludhiana auto parts, Morbi tiles, Tirupur textiles) — captures dispatch data and makes VahanSync the default 'Book Now' button. ERP API plugins eliminate manual entry. Density creates liquidity.",
      },
      {
        title:   "Revenue Architecture",
        content: "10,000 shippers × 12 trips/month × ₹6,000 AOV × 14% take rate × 12 months = ~₹100.8 Cr ARR\n\nMargin expanders (VAS): Cargo insurance + driver financing + premium guaranteed match fees → additional 2–3% net margin.\n\nQuarterly roadmap: Q1 Cluster Blitz (Ludhiana/Tirupur) → Q2 Anchor Scaling (fleet owner onboarding) → Q3 Transactional Density (12 trips/month target) → Q4 Yield Maximiser (premium fees, 18% EBITDA).",
      },
    ],
  },
  {
    slug:        "whatsapp-marketplace",
    title:       "Rebuilding WhatsApp Marketplace",
    company:     "Personal · Product Strategy",
    description: "500M Indians use WhatsApp daily — yet local commerce still runs on chaotic chat threads and zero order tracking. A product redesign that turns the world's most-used messenger into a hyper-local, end-to-end marketplace for India's 60M+ SMBs.",
    metric:      "$55B→$350B",
    metricLabel: "The eCommerce Delta",
    tags:        ["Consumer", "Product Strategy", "Marketplace", "SMB", "UX", "0→1"],
    type:        "Case Study",
    image:       "/images/projects/whatsappmarketplace.png",
    embedUrl:    "https://drive.google.com/file/d/1Poe_poVp0LSKzuN4IxhwRsEeXy8yjLjI/preview",
    sections: [
      {
        title:   "The Post-Pandemic Retail Gap",
        content: "India's eCommerce market sits at $55B today, projected to hit $350B by the end of the decade — with 1 in 3 Indians becoming active online shoppers by 2030. But offline retail is shrinking, and the gap isn't being filled. Small businesses want to go online, but the current ecosystem is actively hostile to them:\n\n• Skill Gap: Most local sellers lack the technical ability to build independent websites or apps.\n• Complexity: Platforms like Shopify demand low-level technical navigation that leaves Tier-2 sellers behind.\n• Cost Prohibitive: High commissions on established marketplaces (Flipkart, Amazon) eat into razor-thin margins.\n• Limited Visibility: WhatsApp Business exists but has no discovery mechanism — exposure is locked to known circles.\n\nThe opportunity: 500M Indians already use WhatsApp daily. The infrastructure exists. What's missing is the marketplace layer on top of it.",
      },
      {
        title:   "The Two-Sided Ecosystem",
        content: "The problem isn't just one-sided. Two very different users are broken by the current system:\n\nThe Seller — Rajat Sharma, 38, Electronics Shop Owner, Tier-1 City:\nPain Point: Lost in the chaos of chat. No order tracking, sales dropping. He's managing 40+ customer conversations manually — copy-pasting catalogue images, losing track of orders in thread, unable to measure what's working.\n\nThe Buyer — Sudhir Chaudhary, 29, Software Developer, Remote Worker:\nPain Point: Wants local goods but hates the manual texting process. Needs a system. He prefers local businesses but the friction of asking 'what's available?', waiting for a reply, and manually sharing his address kills the purchase intent.\n\nThe insight: A dedicated Marketplace Mode — completely separate from personal chat — solves both sides simultaneously without fragmenting either experience.",
      },
      {
        title:   "The Solution — From Messenger to Marketplace",
        content: "The design centres on a single toggle: The Marketplace Switch. A seamless mode flip that dedicates the app space to commerce without cluttering personal conversations.\n\nDiscovery — Connecting with the Hyper-Local:\n• Geolocation radius filters: find verified stores within X km.\n• Category sorting and rating filters for quality control.\n• Direct integration with Business Status stories — sellers broadcast offers, buyers discover deals.\n\nThe Transaction — From Browse to Cart:\n• Direct 'Add to Cart' functionality replaces the manual text-query process.\n• Integrated WhatsApp Wallet + UPI Checkout: zero redirect, payment inside the app.\n• Saved Addresses for one-tap delivery — same friction level as Amazon Prime.\n\nSeller Tools — From Chaos to Kanban:\n• MVP: A dedicated order management system that replaces the manual scroll-through-chatlogs workflow.\n• Automated Logistics: API integration with Shiprocket for one-click dispatch; self-delivery option for local neighbourhoods.\n• Smart Automations: Greeting messages, order status updates, 'Away' notifications — no manual typing.",
      },
      {
        title:   "The End-to-End Value Chain",
        content: "WhatsApp Business 2.0 closes the full commerce loop without requiring any external app:\n\nDiscovery → Store Selection → Cart & Checkout → Order Processing → Dispatch → Payment → Review → back to Discovery\n\nEvery step happens within WhatsApp. No redirect. No new app to download. No account to create. The closed loop makes WhatsApp the operating system for India's local commerce — not just a communication tool.\n\nSeller Analytics Dashboard: Weekly sales data, customer demographics, retargeting cohort insights. The data flywheel means better sellers attract more buyers, and more buyers generate better seller data — a compounding moat.",
      },
      {
        title:   "Success Metrics & Risk Mitigation",
        content: "North Star Metrics (Indicative):\n• 125K Active Shops on the marketplace\n• $1.5M Monthly Transactions processed\n\nHealth Metrics:\n• 450K Switch Clicks (Awareness)\n• 80K New Signups (Acquisition)\n• 12.5M minutes Time on Marketplace (Engagement)\n• 72% retention & $45 AOV (Retention)\n\nRisks & Mitigations:\n• App Bloat — Feature creep increases app size. Mitigation: Modular features + efficient coding; Marketplace Mode is a downloadable extension, not a forced update.\n• User Noise — Marketplace distracts from core chat. Mitigation: The 'Switch' is opt-out by default; personal chat is always one tap away.\n• Trust & Security — Fake shops and scams. Mitigation: GSTIN/PAN Verification at seller onboarding + Report mechanisms for buyers.\n\nThe Vision: Bridging the gap between a simple chat app and a $350B economy — levelling the playing field for millions of small businesses across India.",
      },
    ],
  },
  {
    slug:        "bookmyshow-tiq",
    title:       "Engineering Fair Ticketing for High-Demand Events",
    company:     "Consumer · Product Strategy",
    description: "Coldplay Mumbai: 1.8 Lakh tickets, 1.3 Crore requests — a 73x oversubscription that crashed the platform and fed scalpers. Redesigned high-demand event booking from a speed race into a provably fair, IPO-style draw.",
    metric:      "73x",
    metricLabel: "Oversubscription — Solved",
    tags:        ["Consumer", "Product", "UX", "Marketplace", "Strategy"],
    type:        "Case Study",
    image:       "/images/projects/BMS.png",
    embedUrl:    "https://drive.google.com/file/d/1IPz-h44HF1TuCeI6P_Wcx0VPT1agDYbW/preview",
    featured:    true,
    sections: [
      {
        title:   "The Problem",
        content: "BookMyShow is India's undisputed ticketing leader — 75% market share, 50M+ downloads, 30M+ customers, ₹976Cr revenue in FY23. Their live events vertical grew 9.5x to ₹237Cr, driven by concerts, sports, and international shows.\n\nBut their biggest wins started creating their loudest complaints. The Coldplay Mumbai concert had 1.8 Lakh tickets against 1.3 Crore requests — a 73x oversubscription. The result: system crashes, failed payments, traffic queue chaos, and a thriving black market of scalpers selling tickets at 10x face value.\n\nThis isn't just a technical problem. It directly attacks BookMyShow's core business flywheel: a poor booking experience breaks the Events → Customers → Advertisers → Event Partners loop. And with Zomato (District, via Paytm Insider acquisition) ready to exploit every dissatisfied user, the stakes are high.",
      },
      {
        title:   "The Core Insight",
        content: "The old system is a speed race — whoever has the fastest internet connection and the luckiest timing wins. This rewards bots, not fans. It incentivises scalpers, not genuine buyers. And it guarantees a server crash when demand spikes.\n\nThe shift needed: stop reacting to demand and start managing it. Model the system on the principles of an IPO — a universally understood, fair, and orderly framework for allocating scarce assets under massive demand. Engineer fairness, not just uptime.",
      },
      {
        title:   "Part 1 — The Ticket Request Queue (TRQ)",
        content: "Instead of an instant sale that floods servers, the TRQ opens a time window for users to submit a request:\n\n1. Browse & Apply: Users click 'Apply' during the TRQ window — no need to be online at a specific second.\n2. Select Tiers: Users choose ticket category (Standing, Gold, Diamond) and quantity.\n3. Authorise Payment: A UPI mandate is set up — money is only debited if the application is successful.\n\nAllotment uses an IPO-style random draw, segmented by application categories (Solo, Couple, Group of 4+) — the same logic IPOs use to categorise Retail vs. HNI investors. A certified, publicly verifiable Random Number Generator (RNG) ensures transparency. The outcome: traffic spikes eliminated, crashes prevented, every genuine fan gets a fair shot.",
      },
      {
        title:   "Part 2 — The BMS Open Market",
        content: "The TRQ solves allocation. The Open Market solves the resale black market.\n\nUsers who are allotted tickets but can no longer attend can list them on the 'BMS Open Market' directly from 'My Bookings'. Tickets are sold at the original price — no price gouging. Users who missed the TRQ get a verified second chance. Transfers are verified (Name, Gender, Age) and controlled within the platform, making scalping unviable.\n\nBusiness model: BookMyShow charges a convenience fee on each Open Market transaction — an entirely new revenue stream from a problem that previously only created cost.",
      },
      {
        title:   "The Closed-Loop & Success Metrics",
        content: "TRQ + Open Market form a closed-loop ecosystem: minimal tech fatigue, black market nullified, genuine reselling solved, verified & secure transfers.\n\nThis directly re-ignites the business flywheel: fair system → customer trust → more users → more event partners → growth.\n\nSuccess tracked across three areas:\n• Platform Stability: Uptime during TRQ windows, reduction in payment failure rate.\n• User Satisfaction: NPS improvement for TRQ & Open Market, reduction in fairness-related support tickets.\n• Business Impact: Open Market transaction volume, event partner sign-up growth, positive lift in Power Loop metrics (customer acquisition, advertiser engagement).",
      },
    ],
  },
  {
    slug:        "edimension",
    title:       "Conceptualising a Product to Attain Enlightenment",
    company:     "Personal · 0→1 Concept",
    description: "What if your phone could introduce you to a version of yourself — stripped of bias, memory, and conditioning? e-Dimension is an AI wellness app that builds your 'Enlightened You': a digital avatar trained on your own voice and behaviour, reflecting your true inner nature back at you.",
    metric:      "0→1",
    metricLabel: "Original Concept",
    tags:        ["AI/ML", "Mental Wellness", "UX", "Product Strategy", "Consumer"],
    type:        "Case Study",
    image:       "/images/projects/edimension.png",
    embedUrl:    "https://drive.google.com/file/d/1oe47Ff9an5NF1RJuH26FaDWJMA0Cxqh4/preview",
    featured:    true,
    sections: [
      {
        title:   "The Problem — The Conflict of the Memory-Self",
        content: "Enlightenment is not supernatural. It is clarity — an unblemished life with no conditioning.\n\nHumans are trapped by the 'Memory-Self': a lifetime of evolutionary, genetic, and societal programming that colours every thought, decision, and self-perception. If intelligence is enslaved by memory, there is no freedom. The goal is to access the 'Inner-Self' — a true internal nature that exists beyond the noise of who the world has told you to be.",
      },
      {
        title:   "The Solution — Ingest, Separate, Reflect",
        content: "e-Dimension is an AI-powered ecosystem built on three phases:\n\n• Ingest: Learns the user's voice, biometrics (thumb impression as psychological anchor), and behavioural habits.\n• Separate: A Differentiation Engine filters 'Memory-Self' conditioning from 'Inner-Self' potential — scoring across dimensions like Empathy, Anger, and Diplomacy.\n• Reflect: Delivers the 'Enlightened Being' — an AI avatar that is a version of the user, stripped of memory intrusion.\n\nValue proposition: To delimit the barrier of human limitations by introducing the user to their unblemished self.",
      },
      {
        title:   "Core Features",
        content: "Voice Cloning & Psychometrics (Onboarding): Users read sentences to create a voice model. Situational Yes/No questions build the initial personality model. The user isn't just signing up — they are birthing a digital entity.\n\nGameified Training Loop: Daily tasks (Put Your Mind to Ease, Cope with Nightmares, Sleep Stories, Reaction Exercises) serve as data inputs that move the AI from 'Novice' to 'Enlightened'. Users play games — they are actually training the differentiation engine.\n\nEnlightened You: An AI-generated form of the user, free from memory-self. Communicates via the user's own cloned voice or text. The Mirror Effect — it cannot betray you because it IS you.\n\nPsychedelic Zone (Retention): Biometric trigger (phone shake / anxiety pattern) → AI detects emotional state → push notification → Relax Playlist (Meditation, ASMR, Motivational Speeches). Manages churn during emotional lows.\n\nDigital Diary & Cyclicity: Past audio/text entries → AI analysis → Cyclicity Feedback. The AI recalls older data and speaks back with a fresher, enlightened perspective. 'It will be the real you who can talk back to you about that day.'",
      },
      {
        title:   "Product Logic & Growth Hypothesis",
        content: "The Differentiation Engine processes three input streams — User Voice & Biometrics, External Data Logs, and Task Performance — to produce three outputs: the Enlightened You Persona, Progress Charts, and Clarity.\n\nGrowth is built on the 'Self-Addiction' Loop: humans are fundamentally obsessed with understanding themselves. The requirement of 10 mins/day to train the AI becomes a self-reinforcing habit. Engagement curve moves from 'Initial Challenge' → 'Addicted to Self-Improvement'. High early churn risk is mitigated by the Psychedelic Zone.\n\nRoadmap — The Climb to Clarity:\n• MVP: Basic Avatar & Voice Training\n• Cyclicity: AI recalls and reframes past data\n• Full Mirror: The complete Enlightened Being",
      },
      {
        title:   "Risk Assessment",
        content: "Trust Risk: Users may perceive it as a game rather than a serious tool. Mitigation: serious branding and verified psychological frameworks.\n\nData Integrity: Users faking emotions = Garbage In, Garbage Out. Mitigation: AI flags inconsistent data patterns over time.\n\nThe God Figure: Over-dependency on AI for critical life decisions (law, morality) — 'Shark Game' behaviour risk. Mitigation: safety protocols and content filters.\n\nStatus Symbol: Becomes a 'cool symbol' for millennials rather than a genuine utility. Mitigation: focus on long-term cyclicity and depth of engagement over novelty.",
      },
    ],
  },
  {
    slug:        "health-d2c-playbook",
    title:       "D2C Health Gap: The Protein-Fibre Code",
    company:     "Personal · Market Research",
    description: "68% of India's health D2C brands burn cash because they ignore three fatal traps. A deep-dive research deck cracking the Protein-Fiber white space in India's $60B health market — with a survival blueprint for a brand that could actually make it.",
    metric:      "$60B",
    metricLabel: "Market by 2033",
    tags:        ["D2C", "Research", "Market Analysis", "Strategy", "Health"],
    type:        "Deck",
    image:       "/images/projects/D2CHealth.png",
    embedUrl:    "https://drive.google.com/file/d/1l92WCoI1ry3pOtRRRJuRTJLLxZ00kWYC/preview",
    sections: [
      {
        title:   "The Market & The Crisis",
        content: "The Indian health & wellness market is a $60B opportunity by 2033 (CAGR 11%) — with $5B in healthy snacks alone. The problem: 68% of players are burning cash. The root cause is always the same unit economics trap: CAC > LTV.\n\nThe rules of the game have changed. Winning in 2026 requires mastering the '3 Ts':\n• Trust — Clean Label is the baseline. Consumers demand 100% transparency (The Whole Truth model).\n• Traceability — FSSAI 2026 Mandate (effective Jan 1). The 'Evidence Rule' applies — Immunity Boosting / Gut Healing claims must be backed by peer-reviewed clinical data. Re-packagers get delisted. Compliance is your moat.\n• Time — Q-Commerce is the new discovery channel. Blinkit/Zepto own 48% of revenue. 75% YoY growth.",
      },
      {
        title:   "The Alpha — The Protein-Fiber White Space",
        content: "The Indian diet is simultaneously 80% Protein Deficient and 90% Fiber Deficient. The market has answered protein (most bars have 20g protein) but completely ignored fiber (typically just 2g).\n\nThe white space: High Fiber + High Protein = Fullness for 4 hours. Indulgent Functionality. Weight management that doesn't taste like medicine.\n\nThe target user is the 'Label Detective': 84% label literacy (PwC 2025), 80% use wearables to guide food choices, checks 'Added Sugar' before price. These consumers are smarter than the brands of 2020.\n\nFeature gap analysis shows the real opportunity lies beyond the crowded 'Gym Bro' segment — in underserved life-stage needs: Middle-India (mass health at ₹20), Geriatric Nutrition (Age 60+, low-glycemic), and Women-Centric (PCOS/Hormonal Balance).",
      },
      {
        title:   "The D2C Graveyard — 3 Traps to Avoid",
        content: "70% of Indian D2C brands fail in Year 1 by ignoring these three physics:\n\nTrap 1 — Unit Economics (Mojo Bar & others): AOV ₹500 vs CAC ₹1,200. Rule: If LTV < 3x CAC, you burn out. Target: AOV ₹850+, LTV:CAC 3:1. If CAC > 40% of first order — no Series A.\n\nTrap 2 — The Cold Chain Myth (Epigamia / Yogurts): 15-20% spoilage in Tier-2 cities. Rule: Stick to shelf-stable until ₹50Cr ARR.\n\nTrap 3 — The 'Chalky' Taste (Early Protein Brands): Tasted like medicine. Rule: Taste is the #1 ingredient. Your first sale is marketing. Your second sale is the product. If the fiber doesn't work, they won't come back.",
      },
      {
        title:   "Competitive Landscape",
        content: "S-Tier (Independent Giants):\n• The Whole Truth — $15M+ ARR, $250M valuation. Strategy: Weaponised transparency cuts CAC by 40%.\n• Country Delight — $1B valuation. Strategy: Solved the 'Freshness' trust gap.\n\nA-Tier (The Exit Squad — all acquired by legacy FMCG):\n• Yoga Bar → ITC (legacy distribution power)\n• Oziva → HUL (plant-based authority)\n• Plix → Marico (effervescent format)\n\nStrategy Note: 'Vertical Authority' beats the 'General Supermarket' model. Own a specific problem deeply.",
      },
      {
        title:   "The Founder's Launch Blueprint",
        content: "Five non-negotiables before hitting launch:\n• Product Format: Shelf-Stable. No cold chain until scale.\n• Taste Test: Must pass blind test. Non-medicinal.\n• Claims: FSSAI clinical backing for Fiber & Satiety.\n• Channel: Blinkit-First. Design packaging for a 5-inch screen, not a supermarket shelf. High contrast, large typography, thumb-stoppable.\n• Retention: Build a daily ritual (4PM snack) not an occasional product.\n\nBundle Strategy: 'Office Snack Packs' to hit ₹850 AOV and clear the shipping loss zone.\n\nFuture watch (2027): Millet 2.0 (high-indulgence formats), Gut Health (India's #2 priority), Personalized Tech (CGM integration — sugar spike triggers Auto-Low-GI meal delivery).",
      },
    ],
  },
];
