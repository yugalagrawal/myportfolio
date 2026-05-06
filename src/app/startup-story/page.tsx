"use client";

import { motion, useInView } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRef, ReactNode } from "react";

const E = "#059669";

/* ─── Base scroll-reveal wrapper ────────────────────────────────────────── */
function Fade({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Section date divider ───────────────────────────────────────────────── */
function Era({ date }: { date: string }) {
  return (
    <Fade>
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1 h-px" style={{ background: "#e7e5e1" }} />
        <span className="text-[11px] font-mono tracking-widest uppercase px-2"
          style={{ color: E, fontFamily: "var(--font-mono)", flexShrink: 0 }}>
          {date}
        </span>
        <div className="flex-1 h-px" style={{ background: "#e7e5e1" }} />
      </div>
    </Fade>
  );
}

/* ─── Body paragraph ─────────────────────────────────────────────────────── */
function P({ children, first = false }: { children: ReactNode; first?: boolean }) {
  return (
    <Fade>
      <p className={`text-base sm:text-[17px] leading-[1.9] ${first ? "first-para" : ""}`}
        style={{ color: "#44403c" }}>
        {children}
      </p>
    </Fade>
  );
}

/* ─── Inline highlight ───────────────────────────────────────────────────── */
function Hi({ children }: { children: ReactNode }) {
  return <strong style={{ color: "#1c1917", fontWeight: 600 }}>{children}</strong>;
}

/* ─── Pull quote ──────────────────────────────────────────────────────────── */
function Quote({ children }: { children: ReactNode }) {
  return (
    <Fade>
      <div className="py-6 px-2 sm:px-8 text-center">
        <p className="text-2xl sm:text-[28px] font-black italic leading-snug"
          style={{ fontFamily: "var(--font-display)", color: "#1c1917", letterSpacing: "-0.5px" }}>
          &ldquo;{children}&rdquo;
        </p>
      </div>
    </Fade>
  );
}

/* ─── Inline stat pill ───────────────────────────────────────────────────── */
function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-sm font-semibold"
      style={{ background: "rgba(5,150,105,0.08)", color: E, border: "1px solid rgba(5,150,105,0.15)" }}>
      {value}
      <span className="font-normal text-xs" style={{ color: "#78716c" }}>{label}</span>
    </span>
  );
}

/* ─── Float image — small, text wraps around it ──────────────────────────── */
function FloatSection({
  img,
  side = "right",
  children,
}: {
  img: { src: string; caption?: string };
  side?: "left" | "right";
  children: ReactNode;
}) {
  return (
    <Fade>
      {/* overflow:hidden acts as clearfix so the container stretches to contain floated child */}
      <div style={{ overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <figure
          style={{
            float: side,
            width: "clamp(130px, 32%, 210px)",
            marginLeft:  side === "right" ? "1.25rem" : 0,
            marginRight: side === "left"  ? "1.25rem" : 0,
            marginBottom: "0.5rem",
            marginTop: "0.15rem",
          }}
        >
          <img
            src={img.src}
            alt={img.caption || ""}
            loading="lazy"
            style={{
              width: "100%",
              display: "block",
              borderRadius: 10,
              border: "1px solid #e7e5e1",
              boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
            }}
          />
          {img.caption && (
            <figcaption style={{
              fontSize: 11, textAlign: "center", color: "#a8a29e",
              fontStyle: "italic", marginTop: 6, lineHeight: 1.4,
            }}>
              {img.caption}
            </figcaption>
          )}
        </figure>
        {children}
      </div>
    </Fade>
  );
}

/* ─── Two images, fixed aspect ratio for visual consistency ──────────────── */
function ImgPair({ a, b }: {
  a: { src: string; caption?: string };
  b: { src: string; caption?: string };
}) {
  return (
    <Fade>
      <div className="grid grid-cols-2 gap-3 my-1">
        {[a, b].map((img, i) => (
          <figure key={i}>
            <div className="overflow-hidden rounded-xl"
              style={{ aspectRatio: "3/2", border: "1px solid #e7e5e1", boxShadow: "0 4px 20px rgba(0,0,0,0.07)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.caption || ""} loading="lazy"
                className="w-full h-full object-cover object-top" />
            </div>
            {img.caption && (
              <figcaption className="mt-2 text-xs text-center italic" style={{ color: "#a8a29e" }}>
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </Fade>
  );
}

/* ─── Polaroid-style photo cluster ───────────────────────────────────────── */
function Gallery({ photos }: {
  photos: { src: string; caption?: string; rotate?: number }[];
}) {
  return (
    <Fade>
      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 py-6">
        {photos.map((photo, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 24, rotate: photo.rotate ?? 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: photo.rotate ?? 0 }}
            whileHover={{ scale: 1.06, rotate: 0, zIndex: 20 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            style={{
              background: "#fff",
              padding: "8px 8px 32px",
              boxShadow: "0 6px 24px rgba(0,0,0,0.14)",
              width: "clamp(130px, 28vw, 190px)",
              cursor: "default",
              flexShrink: 0,
              position: "relative",
            }}
          >
            <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.caption || ""} loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} />
            </div>
            {photo.caption && (
              <figcaption
                style={{
                  position: "absolute", bottom: 6, left: 0, right: 0,
                  textAlign: "center", fontSize: 10, color: "#a8a29e",
                  fontFamily: "var(--font-mono)",
                }}>
                {photo.caption}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>
    </Fade>
  );
}

/* ─── Image paths ────────────────────────────────────────────────────────── */
const B = "/images/Main%20Story/";
const I = {
  videoCall:  B + "PGkwZ8GfckWftcIe_SUYApF1jv0K9-prKXSthdAZ6m1ITLWBXrXhpbqkG4V6cl17kHdHUtoJzZKgX_RyHkYSNPRp8QQvCiXOU4_gjtohjtu3NZ2Csyr1Ik17dCdG8CVWBSu-QRc8HCJ4_fxRYZGHeuxbAo4=s2048.jpg",
  nogozo1:   B + "ThYKvZQCHEui9YdOC0obdEHKsn8-QFdXjivZdqtRxce41n1M1lbCIOaGgHLeQFJtISMBzVEOzH2lAQaa-bTtCfSGE0YYxjb4opevJ3DHkmNIz4Z9NnENex4XgB5oaC54i5ut=s2048.jpg",
  newspaper:  B + "Newspaper%20(1).png",
  app:        B + "Screenshot%202025-01-06%20173613.png",
  sharkTank:  B + "yJ-xTXpKpIbSI7hjPAA_u402mLcnT2S5Jabw3hptJpbWypNjLPV13GpC4YG3uEDAatnEYyn12mqqR_soVXohtUFRjohM5sO-uGqq_12MItNe-Tvz7Y6xHJDXhSgE2wbWQHTH1KyZEIG9CEo8Uo2eaC7FDM798o8tAUfhd6XZd4PVU9buGy5ZzavkKWOuaLYi3BESlopb7lbY284l%20(1).jpg",
  dec1:       B + "1638971212330%20(1).jpg",
  dec2:       B + "1640011916444%20(1).jpg",
  governor:   B + "QuuZeUYIX1WrYastXO3ifpzL_c0Jtr8YyD3armQw4jGIatB1FFFK_sQ1VOHBnhO92fhHtN1RwZ9RkvK2pt59LuOXSOwjPBbRKAKyQUy46o8q3IXENu5YANClew=s2048.jpg",
  wrapped:    B + "Tjlp1H69_MXUgb2K7y5vUinOqDdCwRgrKOjQFvxvtwHHdeC0A0vZ_3TyiCuu5VPpnLdeFvXwP85mwBwMsIcLlfMVU4Vv6vLtUIaQ3JsEcd5yxupU07EsRaoL9eZUqJX2Nwc=s2048.jpg",
};

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function StartupStoryPage() {
  return (
    <main style={{ background: "#fdf9f4", minHeight: "100vh" }}>

      {/* Drop-cap + first paragraph style */}
      <style>{`
        .first-para::first-letter {
          float: left;
          font-size: 4.8em;
          line-height: 0.78;
          margin: 0.04em 0.1em 0 0;
          font-family: var(--font-display);
          font-weight: 900;
          color: #059669;
        }
      `}</style>

      {/* ── Nav ── */}
      <div className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(253,249,244,0.94)", borderColor: "#e7e5e1", backdropFilter: "blur(16px)" }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/#startup"
            className="inline-flex items-center gap-2 text-sm font-mono transition-colors duration-200"
            style={{ color: "#78716c", fontFamily: "var(--font-mono)" }}
            onMouseEnter={e => (e.currentTarget.style.color = E)}
            onMouseLeave={e => (e.currentTarget.style.color = "#78716c")}>
            <ArrowLeft size={14} /> Back
          </Link>
          <span className="text-xs font-mono" style={{ color: "#c4bdb7", fontFamily: "var(--font-mono)" }}>
            nogozo pvt. ltd. · 2020 – 2023
          </span>
        </div>
      </div>

      {/* ══════ HERO ══════ */}
      <div className="max-w-2xl mx-auto px-6 pt-16 sm:pt-24 pb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

          <p className="text-[11px] font-mono tracking-widest uppercase mb-7"
            style={{ color: E, fontFamily: "var(--font-mono)" }}>
            A Founding Story &nbsp;·&nbsp; 2020 – 2023
          </p>

          <h1 className="font-black leading-none mb-5"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(60px, 14vw, 108px)",
              letterSpacing: "-4px", color: "#1c1917" }}>
            NOGOZO
          </h1>

          <p className="text-lg sm:text-xl leading-relaxed mb-8" style={{ color: "#57534e", maxWidth: "520px" }}>
            Before corporate life, in the middle of college, I was trying to build something from scratch —
            and it taught me more than any degree ever could have.
          </p>

          <div className="flex flex-wrap gap-2 pb-10 border-b" style={{ borderColor: "#e7e5e1" }}>
            {[["10K+","Users"], ["₹5L","Govt Grant"], ["Shark Tank","Season 1"], ["PAN India","Deliveries"]].map(([v, l]) => (
              <span key={l} className="text-xs px-3 py-1.5 rounded-full"
                style={{ background: "rgba(5,150,105,0.07)", color: E,
                  border: "1px solid rgba(5,150,105,0.15)", fontFamily: "var(--font-mono)" }}>
                <strong>{v}</strong> · {l}
              </span>
            ))}
          </div>

        </motion.div>
      </div>

      {/* ══════ STORY ══════ */}
      <div className="max-w-2xl mx-auto px-6 pb-28 flex flex-col gap-5">

        {/* ── Opening — video call image floated right ── */}
        <FloatSection img={{ src: I.videoCall, caption: "The video call that started it all — April 2020" }} side="right">
          <p className="text-base sm:text-[17px] leading-[1.9] first-para" style={{ color: "#44403c" }}>
            It was April 2020. The country was in lockdown, college was shut, and I was at home
            on a video call with my school friends — Anuj, Dushyant, Samyak, and Vikas. We were
            talking about COVID, as everyone was those days. But something specific kept nagging
            at us: the government had restricted shop timings to reduce crowding. It was doing
            the exact opposite. Same narrow window. More people. More spread.
          </p>
          <p className="text-base sm:text-[17px] leading-[1.9] mt-5" style={{ color: "#44403c" }}>
            We looked at each other through our screens and asked:{" "}
            <em style={{ color: "#1c1917" }}>could we actually fix this?</em> The social intention
            was genuine — but the startup itch was there too, if we&rsquo;re being honest. We
            named ourselves <Hi>VADSY</Hi>, the first letters of our names combined. Cliché?
            Absolutely. Ours? Without question.
          </p>
        </FloatSection>

        <Era date="May – October 2020" />

        {/* ── NOGOZO 1.0 — nogozo1 floated left ── */}
        <FloatSection img={{ src: I.nogozo1, caption: "NOGOZO 1.0 — on the ground with our merchants, 2020" }} side="left">
          <p className="text-base sm:text-[17px] leading-[1.9]" style={{ color: "#44403c" }}>
            By May, VADSY had a name that actually meant something: <Hi>NOGOZO</Hi> —
            {" "}&ldquo;No need to Go when you have Zo.&rdquo; We built an app for ordering daily
            necessities with scheduled pickups and deliveries, so no one had to crowd into a shop.
            Website. WhatsApp API. On-ground merchant research with local shops. Social media
            campaigns. A team of interns doing fieldwork across the city.
          </p>
        </FloatSection>

        {/* ── Dainik Jagran — newspaper floated right ── */}
        <FloatSection img={{ src: I.newspaper, caption: "Featured in Dainik Jagran, Agra — our first press coverage" }} side="right">
          <p className="text-base sm:text-[17px] leading-[1.9]" style={{ color: "#44403c" }}>
            By June, life happened — three of the original five had stepped back. Only Anuj and I
            remained. But those interns? They became our core team, and they were brilliant.
            By October 2020 we had connected{" "}<Stat value="25+" label="merchants" />{" "}
            with over{" "}<Stat value="1,000" label="users" />. And then something remarkable
            happened — <Hi>Dainik Jagran</Hi> wrote about us. We were just two college guys trying
            to solve a problem — and suddenly, people were writing about it.
          </p>
        </FloatSection>

        <Quote>We were just two college guys trying to solve a problem — and suddenly, people were writing about it.</Quote>

        <Era date="November 2020 — The First Goodbye" />

        <P>
          By November, we shut NOGOZO 1.0 down. The financial runway was gone — we&rsquo;d
          started as a social initiative and never optimised for revenue. The timing made it
          harder to process: both Anuj&rsquo;s and my families were fighting COVID. Health came
          first, always. But beyond the circumstances, we&rsquo;d also gained enough clarity to
          know that while this was a good project, it wasn&rsquo;t the right startup for us
          to pursue long-term.
        </P>

        <Fade>
          <p className="text-sm text-center italic py-2" style={{ color: "#a8a29e" }}>
            — The shutdown stung. The lessons didn&rsquo;t. —
          </p>
        </Fade>

        <Era date="February – March 2021" />

        {/* ── 2.0 app — floated left ── */}
        <FloatSection img={{ src: I.app, caption: "NOGOZO 2.0 — the All-in-One Bookstore app" }} side="left">
          <p className="text-base sm:text-[17px] leading-[1.9]" style={{ color: "#44403c" }}>
            Anuj called in late February. He&rsquo;d been sharpening his web dev skills during
            an internship and felt ready for round two. &ldquo;Remember your idea about renting
            books?&rdquo; he asked. &ldquo;Would you be interested in pursuing that?&rdquo;
            This time we did things properly — consumer research, student surveys, bookshop visits,
            pricing analysis. By March 2021 we launched <Hi>NOGOZO All-in-One Doorstep Bookstore</Hi>:
            buy, rent, or sell new and used books from home.
          </p>
        </FloatSection>

        <Era date="Summer – August 2021" />

        {/* ── Shark Tank — floated right ── */}
        <FloatSection img={{ src: I.sharkTank, caption: "Shark Tank India pre-final auditions — August 2021" }} side="right">
          <p className="text-base sm:text-[17px] leading-[1.9]" style={{ color: "#44403c" }}>
            We spotted a Shark Tank India application link and submitted it without much
            thought, treating it like any other startup competition. Then we actually watched
            a few episodes. The scale of the show hit us. The calibre of the investors hit us.
            We were absolutely convinced we didn&rsquo;t stand a chance.
          </p>
          <p className="text-base sm:text-[17px] leading-[1.9] mt-5" style={{ color: "#44403c" }}>
            We were wrong. We moved through multiple rounds and reached the{" "}
            <Hi>pre-final auditions in August 2021</Hi>. We didn&rsquo;t make the televised
            rounds — but we walked away with something more valuable than a camera moment: the
            belief that what we were building was genuinely worth pitching to anyone, in any room.
            Worth noting: this was also the first pitch deck we&rsquo;d ever made.
          </p>
        </FloatSection>

        <Quote>We were convinced we didn&rsquo;t stand a chance. We were wrong.</Quote>

        <Era date="The Grind — 2021 to 2022" />

        <P>
          While Anuj continued his internship, I had burned through <Hi>₹25,000 in trading
          savings</Hi> from the previous year. We had an unspoken rule from the beginning: no
          money from family. Not because family funding is wrong — it isn&rsquo;t. But it was
          our personal line in the sand, our test. So I found an intern gig within a month of
          looking, and the pay covered operations.
        </P>

        <P>
          We did everything: deliveries, customer support, inventory, accounts. We wore every
          hat and somehow thrived in the chaos. When the{" "}
          <Hi>Android app launched in late October 2021</Hi>, it gained traction fast — users
          loved the simplicity, orders grew steadily, reviews were kind. By December we&rsquo;d
          crossed 1,000 users and celebrated by opening a physical outlet, which we had to
          shutter within two months. Some experiments just don&rsquo;t work. That&rsquo;s the game.
        </P>

        {/* Photo cluster — polaroid style */}
        <Gallery photos={[
          { src: I.dec1,     caption: "The Outlet",      rotate: -2.5 },
          { src: I.dec2,     caption: "J&K Governor",    rotate: 1.5  },
          { src: I.governor, caption: "StartinUp Grant",  rotate: -1   },
        ]} />

        <P>
          We also got a chance to present NOGOZO to the{" "}
          <Hi>Hon. Manoj Sinha (Lieutenant Governor of J&K)</Hi> as part of the IIT BHU Alumni
          Association showcase. Standing in front of a governor, pitching a startup built on
          ₹25,000 in savings — it felt almost absurd. We loved every second of it.
        </P>

        <Era date="Spring – Winter 2022 — The Grant" />

        <P>
          Spring 2022: incubated at <Hi>Sparkle, Mathura</Hi> — one of UP Government&rsquo;s
          official incubation centres. We pitched for the <Hi>StartinUP initiative</Hi>, which
          was backing socially impactful startups across Uttar Pradesh. Winter 2022: we were
          among the select few startups across the entire state to receive the{" "}
          <Hi>₹5 Lakh government grant</Hi>.
        </P>

        <P>
          Two college kids. Just a problem we refused to stop solving.
        </P>

        <Era date="Summer 2023 — The Wrap" />

        <Fade>
          <figure className="my-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={I.wrapped} alt="NOGOZO wrapped" loading="lazy"
              className="w-full rounded-xl"
              style={{ border: "1px solid #e7e5e1", boxShadow: "0 4px 24px rgba(0,0,0,0.07)", display: "block" }} />
            <figcaption className="mt-2.5 text-xs sm:text-[13px] text-center italic"
              style={{ color: "#a8a29e" }}>
              NOGOZO — wrapped. Summer 2023.
            </figcaption>
          </figure>
        </Fade>

        <P>
          Operations wound down by spring. By the time we officially closed:{" "}
          <Stat value="10,000+" label="users" />. Orders fulfilled from Kashmir to Kerala,
          Rajasthan to Assam. Corporate clients too. A growth deck that captured numbers
          we hadn&rsquo;t dared imagine in April 2020.
        </P>

        <P>
          But the numbers aren&rsquo;t what stayed with me. People did. More than 10 customers
          are now in my personal WhatsApp as genuine friends — people I talk to regularly, not
          about books, just about life. I don&rsquo;t fully understand how it happened, except
          that we never treated them as customers. We treated them as family. Maybe they could
          feel that.
        </P>

        {/* ── Closing statement ── */}
        <Fade>
          <div className="py-10 sm:py-14 text-center border-t border-b my-2"
            style={{ borderColor: "#e7e5e1" }}>
            <p className="text-[11px] font-mono tracking-widest uppercase mb-6"
              style={{ color: "#c4bdb7", fontFamily: "var(--font-mono)" }}>
              In our own words
            </p>
            <p className="text-2xl sm:text-[30px] font-black italic leading-snug"
              style={{ fontFamily: "var(--font-display)", color: "#1c1917", letterSpacing: "-0.5px" }}>
              &ldquo;In the end, we learned a lot and now are better than before.
              Be it Highs or Lows —
              <span style={{ color: E }}> NOGOZO has all my heart.&rdquo;</span>
            </p>
            <p className="text-sm font-mono mt-6" style={{ color: "#a8a29e", fontFamily: "var(--font-mono)" }}>
              — Yugal Agarwal, Co-Founder, NOGOZO Pvt. Ltd.
            </p>
          </div>
        </Fade>

        {/* ── Lessons ── */}
        <Fade>
          <div className="pt-2">
            <p className="text-[11px] font-mono tracking-widest uppercase mb-6"
              style={{ color: "#a8a29e", fontFamily: "var(--font-mono)" }}>
              What it actually taught me
            </p>
            <ol className="flex flex-col gap-6">
              {[
                ["Execution over ideation, always.",
                  "Everyone has ideas. The only thing that separates founders is who actually ships. We shipped twice."],
                ["Resource constraints are a feature, not a bug.",
                  "₹25,000 in savings forced us to be creative, scrappy, and brutally prioritised. No investor could have taught us that."],
                ["Your customers are your best investors.",
                  "Not financially — emotionally. Those 10 friends in my WhatsApp funded our belief more than any grant ever did."],
                ["Knowing when to stop is a skill too.",
                  "Shutting NOGOZO 1.0 down was the smartest decision we made. It freed us to build something better."],
              ].map(([title, body], i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-xs font-mono mt-0.5 flex-shrink-0" style={{ color: E, fontFamily: "var(--font-mono)" }}>
                    0{i + 1}.
                  </span>
                  <div>
                    <p className="text-sm font-semibold mb-1" style={{ color: "#1c1917" }}>{title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#78716c" }}>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Fade>

        {/* ── Footer ── */}
        <Fade>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-10 border-t"
            style={{ borderColor: "#e7e5e1" }}>
            <Link href="/#startup"
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200"
              style={{ background: "#f0ece7", color: "#57534e", border: "1px solid #e7e5e1" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#e8e2db"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#f0ece7"; }}>
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>
            <a href="https://drive.google.com/file/d/1odXkU_B_5MiXI1AtidsRfkA1reU4NIme/view?usp=sharing"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200"
              style={{ background: "rgba(5,150,105,0.07)", color: E, border: "1px solid rgba(5,150,105,0.18)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(5,150,105,0.14)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(5,150,105,0.07)"; }}>
              Deck that helped us win ₹5L Grant <ExternalLink size={13} />
            </a>
          </div>
        </Fade>

      </div>
    </main>
  );
}
