"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, Feather, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRef, ReactNode, useState } from "react";

const V = "#845ef7";
type Tab = "thodi" | "char" | "do";

/* ─── mood palette ───────────────────────────────────────────────────── */
const MOODS: Record<string, string> = {
  "तू नहीं तो हम तो हैं ही":            "#ec4899",
  "मेरी गुलाब बनोगी":                    "#f43f5e",
  "लेहेंगा":                              "#f97316",
  "ज़ुल्फ़ों":                             "#a78bfa",
  "आलसी आशिक":                           "#fbbf24",
  "ये तुम्हारे ख़ारेपन की बेचैनी हैं":  "#38bdf8",
  "थोड़ा सब्र करो न तुम":               "#34d399",
  "ऐ दिल कहाँ जा रहे हो?":              "#60a5fa",
  "दोनों साथ थे":                        "#c084fc",
};
const mood = (t: string) => MOODS[t] ?? V;

/* ─── 4-liner accent palette ─────────────────────────────────────────── */
const ACCENTS = [
  "#f59e0b","#60a5fa","#f43f5e","#34d399","#a78bfa",
  "#fb923c","#38bdf8","#e879f9","#4ade80","#fbbf24","#f87171",
];

/* ─── Fade ───────────────────────────────────────────────────────────── */
function Fade({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

/* ─── Poem text renderer ─────────────────────────────────────────────── */
function PoemLines({ text, accentColor = V }: { text: string; accentColor?: string }) {
  const stanzas = text.split("\n\n");
  return (
    <div className="text-sm sm:text-base leading-loose"
      style={{ color: "rgba(255,255,255,0.72)" }}>
      {stanzas.map((stanza, si) => (
        <div key={si}>
          <div>
            {stanza.split("\n").map((line, li) => (
              <span key={li} style={{ display: "block" }}>
                {line || " "}
              </span>
            ))}
          </div>
          {si < stanzas.length - 1 && (
            <div className="text-center my-4 text-xs select-none"
              style={{ opacity: 0.3, color: accentColor, letterSpacing: "0.4em" }}>
              ✦
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════ DATA ══════════════════════════════════════ */

const THODI_LAMBI: { title: string; year?: string; content: string | null }[] = [
  {
    title: "तू नहीं तो हम तो हैं ही",
    content:
`तू नहीं तो हम तो हैं ही,
जो हम हैं तो तू तो हैं ही!

तेरी आँखों में खोने को
तेरा होना ज़रूरी थोड़ी
दिखे न दिखे तस्वीरों मैं,
मेरी आँखों मैं तू तो हैं ही!

तू नहीं तो हम तो हैं ही,
जो हम हैं तो तू तो हैं ही!`,
  },
  {
    title: "मेरी गुलाब बनोगी",
    content:
`क्या याद हैं आज भी
वो बेमौसम गुलाब तुम्हे
जो बस यूँ ही दे दिया था मैंने

कोई दिन नहीं था फरवरी का
कोई इल्म नहीं था हड़बड़ी का
वो ठहर के कपकपाते होठों से
जो बस यूँ ही कह दिया था मैंने

"हाँ तुम फूल हो,
क्या मेरी गुलाब बनोगी?"`,
  },
  {
    title: "लेहेंगा",
    content:
`न डाल पागल ये लेहेंगा चोली
तू दूर देश की लगती हैं

आग न बन सर्दी की तू वो
भीड़ चारो तरफ जिसके लगती हैं

मैं अभी विदेशी हूँ मुझे
नागरिकता तो लेने दे

फिर पहन के लेहेंगा देखना शीशा
मेरी लगाई बिंदी कैसी लगती हैं?`,
  },
  {
    title: "ज़ुल्फ़ों",
    content:
`तेरी आँखों पे लटकी ज़ुल्फ़ों से
तेरी ही उंगलिया क्यूँ खेल रही हैं?

चेहरे पे आयी ये मुस्कराहट को
हल्के हाथों से पीछे क्यूँ धकेल रही हैं?

बता दो अपने हाथों की उँगलियों को
कर दो आगाह या दो डांट उन्हें

जो मेरे नाम की अंगूठी पहने बगैर
तेरी ज़ुल्फ़ों की गलियों मेँ घूम रही हैं !`,
  },
  {
    title: "आलसी आशिक",
    content:
`डांका डालने से पहले
होती हैं लम्बी रैकी,

दो नोट चुराने कोई
रात का इंतज़ार नहीं करता

क्या गिनने तुमने तारों को
नींद हैं अपनी फैंकी?

धत आलसी आशिक कहते
"हमें कोई प्यार नहीं करता"`,
  },
  {
    title: "ये तुम्हारे ख़ारेपन की बेचैनी हैं",
    content:
`ये तुम्हारे ख़ारेपन की बेचैनी है,
तुम बेवजह उनके चाँद को कोसते हो

ये लेहरे तुम्हारी बोखलाहट है,
सबब उनके गुरुत्वाकर्षण को सोचते हो

ये जो जमावड़े लगे हैं न
दर्शको के तुम्हारे किनारे

तुम्हारी लेहरे देखने आये है
तुम अपने अथाह को गुरूर समझते हो`,
  },
  {
    title: "थोड़ा सब्र करो न तुम",
    content:
`नदी पे बाँध बना के तुम
बिजली बनाना चाहते हो दोस्त?

ये मन के खेल में तुम
गणित समझाना चाहते हो दोस्त?

थोड़ा सब्र करो न तुम

नदी को समुन्दर तक आने दो दोस्त
पास कि रेत पर गणित हल करेंगे!`,
  },
  {
    title: "ऐ दिल कहाँ जा रहे हो?",
    content:
`पूर्णिमा का चाँद है आज,
तुम ये झालर लगा रहे हो

आसमान को देखने के दिन हैं तुम्हारे,
तुम ये नज़रे झुका रहे हो

वो शायद वाले कल के लिए
तुम ये आज गवा रहे हो

ठहर के पुछा हैं खुदसे कभी:
ऐ दिल ! कहाँ जा रहे हो?`,
  },
  {
    title: "दोनों साथ थे",
    content:
`इश्क़ के समुन्दर में हम कूदे तो दोनों साथ थे,
तुम भीग के निकल गयी, हम डूबे के रुके रहे।

रेत के टीले बनाये हमने तो दोनों साथ थे,
तुम धुल सुन चली गयी, हम रेत में धसे रहे।

खैर इन बातों को हम करते तो साथ थे,
तुम बिन सुने निकल गयी, हम शायरी करते रहे।`,
  },
];

const CHAR_LINER = [
  `चटक जाती हैं घड़ी मगर\nवक्त फिर भी रुकता नहीं।\nचाँद खूबसूरत हो तो देख लो उसे\nरोज़-रोज़ वो ऐसा दीखता नहीं।`,
  `ऐ खूबसूरत चाँद तू कर ले घमंड,\nनहीं बेर मुझे - तेरे चाहने वाले तारे कितने हैं।\n\nहम रोज़ ताँके तुझे, करे आँखों से सम्बन्ध,\nगिनती पता हैं तुझे? - रोज़ गिरते ऐसे तारे कितने हैं।`,
  `समुन्दर से दिल लगा बैठे हैं लेकिन\nअब दूर से ही इसकी लहरें देखेंगे,\nजो तेरे खारे पानी में उतरे तो फिर\nज़खमों पर नमक लगेंगे !`,
  `साथ पे तुम्हारे\nकिताब लिखने का इरादा था\nगर तुम तो\n८ (8) पंक्ति की कविता भी न बन सकी !`,
  `तुझे रोज़ लिखूंगा मैं\nकलम न सही, दबी जुबाँ से\nतू किरदार तो प्यारा ही है\nफर्क नहीं, कहानी के अंजाम से`,
  `इकरार तेरा मरोड़ कर हाथ मैंने क्यूँ किया,\nतू राज़ी जो इश्क़ को थी प्यार मैंने क्यूँ किया?\n\nछोड़ कर जाओ मुझे कहना तेरा वाजिब हैं,\nमलाल तेरी बात का नहीं इंकार मैंने क्यूँ किया?`,
  `ग़ज़ल तेरी आँखों पर लिखनी है मुझे\nमतला तेरे काजल से लूंगा\nइरशाद तो मेरा इश्क़ दे देगा\nवाह मैं तेरी वफ़ा से लूंगा !`,
];

const DO_LINER = [
  `हम धरती से तकते रह गए उस चाँद को - वो आया न फिर पास मेरे,\nपूर्णिमा सी हाँ बोलकर अमावस हो गया!`,
  `लहरें भी धीमी हैं, न तू शोर कर रही है\nन तेरी रौशनी है, ये शाम भी ढल रही है।`,
  `घाट पर बैठे, आ करे बात जीवन की\nतेरे भी मन की, और मेरे भी मन की।`,
  `ये बादलों का ज़ोर का कड़कड़ाना, तेरे होंठो के मुस्कुराने सा हैं,\nइसकी बारिश में भीगते भीगते, न जाने कब बिजली गिर जाए !`,
  `वो एक काँटा जो तेरे पाँव को चूम रहा हैं,\nहुस्न के राज़ को तेरे खून में ढूंद रहा हैं !`,
  `याद रहता हैं कि "क्यों तुझको भूल बैठे हैं",\nआग भुझाकर धुएँ से मरना इसी को कहते है !`,
  `खिड़की से तेरे छज्जे कूदूं में उतना मुस्तैद हूँ\nअरे चार खुले दरवाज़े हैं देखो फिर भी क़ैद हूँ !`,
  `हसरतें शबाब की हैं, मुकम्मल सिर्फ शराब हैं\n'मैं हूँ तेरे ख्वाब में', यह तो मेरा ख्वाब है !`,
];

/* ══════════════════════════ PAGE ══════════════════════════════════════ */
export default function ShayarisPage() {
  const [tab, setTab]       = useState<Tab>("thodi");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const TABS = [
    { id: "thodi" as Tab, hi: "थोड़ी लंबी", en: "Long-ish", n: THODI_LAMBI.length },
    { id: "char"  as Tab, hi: "चार मिसरे",  en: "4 Liner",  n: CHAR_LINER.length  },
    { id: "do"    as Tab, hi: "दो मिसरे",   en: "2 Liner",  n: DO_LINER.length    },
  ];

  return (
    <main className="min-h-screen mesh-bg" style={{ background: "#06030f" }}>

      {/* ── Ambient glows ── */}
      <div className="fixed pointer-events-none inset-0 overflow-hidden" aria-hidden>
        <div style={{
          position:"absolute", top:"-10%", left:"40%",
          width:700, height:500,
          background:`radial-gradient(ellipse, ${V}0d 0%, transparent 65%)`,
        }}/>
        <div style={{
          position:"absolute", bottom:"10%", right:"-5%",
          width:400, height:400,
          background:`radial-gradient(ellipse, rgba(244,63,94,0.04) 0%, transparent 65%)`,
        }}/>
      </div>

      {/* ── Top nav ── */}
      <div className="sticky top-0 z-50 border-b"
        style={{ background:"rgba(6,3,15,0.92)", borderColor:`${V}18`, backdropFilter:"blur(24px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/library/poetry"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color:"rgba(255,255,255,0.3)", fontFamily:"var(--font-mono)" }}
            onMouseEnter={e=>(e.currentTarget.style.color=V)}
            onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.3)")}>
            <ArrowLeft size={14}/> Back
          </Link>
          <span className="text-xs" style={{ color:"rgba(255,255,255,0.12)", fontFamily:"var(--font-mono)" }}>
            शायरी · yugal agarwal
          </span>
        </div>
      </div>

      {/* ══ HERO ══ */}
      <div className="relative overflow-hidden max-w-3xl mx-auto px-6 pt-14 sm:pt-20 pb-8">

        {/* Background watermark */}
        <div className="absolute top-0 right-0 font-black leading-none select-none pointer-events-none"
          style={{ fontSize:"clamp(90px,22vw,180px)", color:V, opacity:0.03,
                   fontFamily:"var(--font-display)", right:"16px", top:"8px" }}>
          शायरी
        </div>

        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background:`${V}12`, border:`1px solid ${V}30` }}>
            <Feather size={11} style={{ color:V }}/>
            <span className="text-xs" style={{ color:V, fontFamily:"var(--font-mono)" }}>My Shayaris</span>
          </div>

          <h1 className="font-black leading-none mb-3"
            style={{ fontFamily:"var(--font-display)", fontSize:"clamp(34px,8vw,68px)",
                     letterSpacing:"-2.5px", color:"rgba(255,255,255,0.93)" }}>
            Short, punchy,<br/>
            <span style={{ color:V }}>straight from the heart.</span>
          </h1>

          <p className="text-sm leading-relaxed mb-6"
            style={{ color:"rgba(255,255,255,0.3)", maxWidth:"460px" }}>
            Sorted new first. All originals — the kind you screenshot and forward at 2am.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {TABS.map(t => (
              <div key={t.id} className="flex items-baseline gap-1.5">
                <span className="text-xl font-black" style={{ color:V, fontFamily:"var(--font-display)" }}>{t.n}</span>
                <span className="text-xs" style={{ color:"rgba(255,255,255,0.2)", fontFamily:"var(--font-mono)" }}>{t.en}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Tab bar (sticky below top nav) ── */}
      <div className="sticky z-40 border-b"
        style={{ top:"57px", background:"rgba(6,3,15,0.88)", borderColor:"rgba(255,255,255,0.06)",
                 backdropFilter:"blur(20px)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-1 py-3">
            {TABS.map(t => (
              <button key={t.id}
                onClick={() => { setTab(t.id); setOpenIdx(null); }}
                className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  color:     tab===t.id ? "#fff" : "rgba(255,255,255,0.3)",
                  background:tab===t.id ? `${V}22` : "transparent",
                  border:    tab===t.id ? `1px solid ${V}50` : "1px solid transparent",
                }}>
                <span>{t.hi}</span>
                <span className="ml-1.5 text-[10px]"
                  style={{ color:tab===t.id ? `${V}cc` : "rgba(255,255,255,0.14)",
                           fontFamily:"var(--font-mono)" }}>
                  {t.n}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab content ── */}
      <AnimatePresence mode="wait">
        <motion.div key={tab}
          initial={{ opacity:0, y:14 }}
          animate={{ opacity:1, y:0 }}
          exit={{ opacity:0, y:-8 }}
          transition={{ duration:0.3, ease:[0.22,1,0.36,1] }}
          className="max-w-3xl mx-auto px-6 py-8 pb-28">

          {/* ════ THODI LAMBI ════ */}
          {tab==="thodi" && (
            <div className="rounded-2xl overflow-hidden"
              style={{ border:"1px solid rgba(255,255,255,0.07)" }}>
              {THODI_LAMBI.map((poem, i) => {
                const m   = mood(poem.title);
                const open = openIdx === i;
                return (
                  <div key={i}>
                    {/* Row */}
                    <button
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-150"
                      style={{
                        background: open ? `${m}0c` : "transparent",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                      }}
                      onMouseEnter={e=>{ if(!open)(e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.025)"; }}
                      onMouseLeave={e=>{ if(!open)(e.currentTarget as HTMLElement).style.background="transparent"; }}
                    >
                      {/* Mood dot */}
                      <div className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5 transition-all duration-200"
                        style={{ background: m, opacity: open ? 1 : 0.45,
                                 boxShadow: open ? `0 0 8px ${m}` : "none" }}/>

                      <span className="flex-1 text-sm sm:text-base"
                        style={{ color: open ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.52)" }}>
                        {poem.title}
                        {poem.year && (
                          <span className="ml-2 text-[10px]" style={{ color:`${m}70`, fontFamily:"var(--font-mono)" }}>
                            · {poem.year}
                          </span>
                        )}
                      </span>

                      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.2 }} className="flex-shrink-0">
                        <ChevronDown size={14} style={{ color: open ? m : "rgba(255,255,255,0.18)" }}/>
                      </motion.div>
                    </button>

                    {/* Expanded poem */}
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ height:0, opacity:0 }}
                          animate={{ height:"auto", opacity:1 }}
                          exit={{ height:0, opacity:0 }}
                          transition={{ duration:0.38, ease:[0.22,1,0.36,1] }}
                          style={{ overflow:"hidden" }}>
                          <div className="relative px-6 py-8"
                            style={{
                              borderBottom:"1px solid rgba(255,255,255,0.05)",
                              background:`linear-gradient(135deg, ${m}06 0%, transparent 60%)`,
                            }}>
                            {/* Left mood bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                              style={{ background:`linear-gradient(to bottom, transparent, ${m}80, transparent)` }}/>
                            <PoemLines text={poem.content ?? ""} accentColor={m}/>
                            {poem.year && (
                              <p className="mt-6 text-xs" style={{ color:`${m}55`, fontFamily:"var(--font-mono)" }}>
                                — युगल अग्रवाल{poem.year ? `, ${poem.year}` : ""}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}

          {/* ════ 4 LINER ════ */}
          {tab==="char" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CHAR_LINER.map((s, i) => {
                const ac = ACCENTS[i % ACCENTS.length];
                return (
                  <motion.div key={i}
                    initial={{ opacity:0, y:20 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay:i*0.045, duration:0.5, ease:[0.22,1,0.36,1] }}
                    className="relative rounded-2xl p-6 overflow-hidden group cursor-default"
                    style={{ background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)" }}
                    whileHover={{ borderColor:`${ac}55`, background:`rgba(255,255,255,0.04)`,
                                  transition:{ duration:0.15 } }}>

                    {/* Atmospheric bg glow */}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background:`radial-gradient(ellipse at top-right, ${ac}06 0%, transparent 65%)` }}/>

                    {/* Big decorative quote */}
                    <div className="absolute top-2 right-3 leading-none select-none pointer-events-none font-black"
                      style={{ fontSize:"5rem", color:ac, opacity:0.07, fontFamily:"Georgia, serif", lineHeight:1 }}>
                      &ldquo;
                    </div>

                    {/* Poem lines */}
                    <div className="relative text-sm sm:text-base leading-loose"
                      style={{ color:"rgba(255,255,255,0.72)" }}>
                      {s.split("\n").map((line, j) => (
                        <span key={j} style={{ display:"block" }}>{line}</span>
                      ))}
                    </div>

                    {/* Bottom accent */}
                    <div className="mt-5 flex items-center justify-between">
                      <div className="h-px flex-1"
                        style={{ background:`linear-gradient(to right, ${ac}50, transparent)` }}/>
                      <span className="ml-3 text-[10px]"
                        style={{ color:`${ac}60`, fontFamily:"var(--font-mono)" }}>
                        {String(i+1).padStart(2,"0")}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* ════ 2 LINER ════ */}
          {tab==="do" && (
            <div className="flex flex-col gap-4">
              {DO_LINER.map((s, i) => {
                const ac = ACCENTS[(i*4) % ACCENTS.length];
                return (
                  <motion.div key={i}
                    initial={{ opacity:0, y:20 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay:i*0.08, duration:0.5 }}
                    className="relative rounded-2xl py-10 px-8 overflow-hidden text-center"
                    style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)" }}
                    whileHover={{ borderColor:`${ac}50`, transition:{ duration:0.15 } }}>

                    {/* Glow */}
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background:`radial-gradient(ellipse at center, ${ac}05 0%, transparent 70%)` }}/>

                    {/* Top bar */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-0.5 rounded-full"
                      style={{ background:`linear-gradient(to right, transparent, ${ac}80, transparent)` }}/>

                    <p className="relative text-base sm:text-xl leading-loose"
                      style={{ color:"rgba(255,255,255,0.78)" }}>
                      {s.split("\n").map((line, j) => (
                        <span key={j} style={{ display:"block" }}>{line}</span>
                      ))}
                    </p>

                    {/* Bottom bar */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                      style={{ background:`linear-gradient(to right, transparent, ${ac}50, transparent)` }}/>
                  </motion.div>
                );
              })}
            </div>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <div className="border-t text-center py-8 px-6"
        style={{ borderColor:"rgba(255,255,255,0.05)" }}>
        <p className="text-xs" style={{ color:"rgba(255,255,255,0.12)", fontFamily:"var(--font-mono)" }}>
          All content © Yugal Agarwal &nbsp;·&nbsp; Originals only &nbsp;·&nbsp; Please credit if you share 🙏
        </p>
      </div>

    </main>
  );
}
