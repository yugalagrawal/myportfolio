"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, Feather, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRef, ReactNode, useState } from "react";

const V = "#845ef7";

const MOODS: Record<string, string> = {
  "ठंडी चाय":                                "#d97706",
  "तू मेरी One & Only":                       "#ec4899",
  "कब तक?":                                  "#6366f1",
  "काशी के किनारों में":                      "#f59e0b",
  "होली":                                     "#f97316",
  "साथ दे सकते हैं पर साथ रह सकते नहीं":    "#3b82f6",
  "इज़हार":                                   "#ef4444",
  "'पर'":                                     "#a78bfa",
  "बस मेँ लिखता जाऊ तू पढ़ती जाए":          "#14b8a6",
  "चल कोई बात नहीं":                         "#94a3b8",
  "साहित्य तेरा मेरा":                        "#22c55e",
  "एक रुपया":                                 "#c97316",
  "तू वैसा वाला गीत है":                      "#f472b6",
  "समाज में आई आँधी है":                     "#7c3aed",
};
const mood = (t: string) => MOODS[t] ?? V;

/* ─── Fade ─────────────────────────────────────────────────────────── */
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

/* ─── Poem text ─────────────────────────────────────────────────────── */
function PoemLines({ text, accentColor = V }: { text: string; accentColor?: string }) {
  const stanzas = text.split("\n\n");
  return (
    <div className="text-sm sm:text-base leading-loose"
      style={{ color: "rgba(255,255,255,0.72)" }}>
      {stanzas.map((stanza, si) => (
        <div key={si}>
          <div>
            {stanza.split("\n").map((line, li) => (
              <span key={li} style={{ display: "block" }}>{line || " "}</span>
            ))}
          </div>
          {si < stanzas.length - 1 && (
            <div className="text-center my-4 text-xs select-none"
              style={{ opacity: 0.25, color: accentColor, letterSpacing: "0.4em" }}>
              ✦
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════ DATA ══════════════════════════════════════════ */

const KAVITAYEIN: { title: string; year?: string; content: string }[] = [
  {
    title: "ठंडी चाय",
    content:
`गर्म से मौसम में,
कल कुछ हल्की-हल्की ठंडी हवा सी थी।

चंद बौछार की बूँदें गिरी,
और मेरे चश्मे से अचानक चिपक गयी।

मेरी उंगलिया मेरे रुमाल को साथ लायी
और बूंदों के हटते ही
मेरी नज़रों ने जब फिर चश्मे में देखा
तो सामने तुम दिखी,
हाँ वही 'तुम' जो कभी मेरी 'मैं' थी।

नजाने उत्सुकता में कुछ यूँ हालात बने
कि हम मुस्कुराये और मौसम कि मेहरबानी से
साथ में कदमताल पर निकल लिए।

उसकी हर एक बात
मेरे कानों को बहुत मीठी लग रही थी।
मानो आपने बहुत मेहनत व प्रेम से
एक कप चाय बनाई हो
मगर एक काम में उलझने के कारण
वो चाय कप में पड़े-पड़े ठंडी हो गयी हो
लेकिन वो एकदम ठंडी पड़ी चाय भी
आपको बहुत मीठी लगती है
वो मिठास चाय से ज़्यादा आपके भाव की होती है।

बस उतना ही मीठा मुझे वो समय लग रहा था
और उसके होंठो से निकला हर लफ्ज़
किसी कड़क चाय की चुस्की से कम न था।

कभी वो मेरे दाए चलती
तो कभी वो मेरे बाए चलती
मेरे कदमो को उसके कदमो के साथ
चलने में न जाने क्या अमृत मिल रहा था
न थक रहे थे, न रुकना चाहते थे।`,
  },
  {
    title: "तू मेरी One & Only",
    content:
`तू मेरी one & only, मैं तेरा one of the
क्यूँ कर लिया दिल ने तुझसे ये घाटे का सौदा

तेरी रोज़ की बातें तू सिर्फ मुझे सुनती हैं
मेरी ही बाहों में सिर्फ तू चैन पाती हैं
गलतफहमियों के इन सपनो पे अब हस्ता
तू मेरी one & only, मैं तेरा one of the

लिख लिख कर किताबें तुझपे भी मैं नहीं थकता
सुनाते और भी दस लोग तुझपे कविताये हैं
मेरी वाली क्यूँ नहीं पढ़ी शिकायत भी नहीं कर सकता
तू मेरी one & only, मैं तेरा one of the

तू मेरी one & only, मैं तेरा one of the
क्यूँ कर लिया दिल ने तुझसे ये घाटे का सौदा`,
  },
  {
    title: "कब तक?",
    content:
`कब तक इस चाँद के नूर के बहाने
तेरे होने का ज़िक्र करू?

कब तक ये बारिश वाली मिट्टी की खुश्बू में
तेरी महक महसूस करू?

कब तक ये गरजते ठंडे-ठंडे बादलों में
तेरा चुलबुला शोर सुना करू?

तारे, फूल, झरने, नदिया, समुन्दर, धुप, बारिश, बहार, जादू,
तितली बस अब खत्म हों रहे हैं रूपक अलंकार मुझपे

कब तक तुम्हे लिखने को,
तुम्हे कही और ढूंढा करू?`,
  },
  {
    title: "काशी के किनारों में",
    content:
`कुछ तो बात थी, उन काशी के किनारो में
इतने सुन्दर नहीं थे, पर मोह लेते थे

हर तरफ कई अंजान लोगों का शोर था,
लेकिन दो घड़ी बैठो तो अपनी सी शांति

साज सज्जा ऐसी जैसे बिखरी हुई पंक्तिया,
लेकिन जो शब्द बटोरो तो तिलस्मी ग़ज़ल

वो बड़ी-बड़ी लकड़ी की चटकी चटकी नाव,
पर बैठ के गंगा में उतरो तो पुष्पक विमान

कुछ तो बात थी, उन काशी के किनारों में
इतने सुंदर नहीं थे, पर मोह लेते थे !`,
  },
  {
    title: "होली",
    content:
`तुम रंग हों, खुशबु हों,
फूलों की तरह !

हर पल जैसे चार चाँद की
चमक हैं तुम्हारे साथ

जब भी देखता हूँ तुमको
लाल अबीर उड़ता हैं मन में,
चाहे होली का त्यौहार हों या न हों !

उड़ते अबीर में आंखें खोलना कितना
मुश्किल हैं ये तो जानती होंगी तुम,
मगर तुम्हे लाल इश्क़ में रंगे देखने के
अपने इस मोह को नहीं समझा सकता मैं !

ये तुझे रंग में देखने को
हां मेरे रंग में देखने को
हर साल
होली का इंतज़ार नहीं कर सकता मैं !`,
  },
  {
    title: "साथ दे सकते हैं पर साथ रह सकते नहीं",
    content:
`उसे समझ नहीं आती मेरी शायरी,
और हम सीधे-सीधे कह सकते नहीं

वो हस के कहती हैं मुझसे हर दफा
'मैं भूल गयी', क्यूँ तुम भूल सकते नहीं?

एक नाव मैं बैठा हूँ उसके साथ
मगर दूसरे छोर पर,
साथ दे सकते हैं पर साथ रह सकते नहीं !

मंज़ूर हैं ये सफर भी
कमसे कम तेरा एहसास तो हैं,
बता सकते नहीं, जता सकते नहीं
कोई बात नहीं, मगर प्यार तो हैं !`,
  },
  {
    title: "इज़हार",
    content:
`इज़हार कर नहीं सकते मगर प्यार हैं,
क्या बात होती जो तू कहती 'तू तैयार हैं',

हर पल तेरी याद में बीतें मैं भूल गया गिन
अच्छा नहीं कहना तेरा 'जीलो मेरे बिन'

चाँद भी सोता हैं, तारें भी सो जाते हैं
कम्भख्त तेरे ख्वाब लेकिन
मेरी नींद में आतें हैं, मुझको जगा जाते हैं

इज़हार कर नहीं सकते मगर प्यार हैं,
घड़ी पहनता हूँ अब, तेरा इंतज़ार हैं

क्या बात होती जो तू कहती 'तू तैयार हैं',
काट देते सब गांठे मुश्किलों की
तेरे इश्क़ की तलवार मैं इतनी तो धार हैं!`,
  },
  {
    title: "'पर'",
    content:
`आसमान के सारे तारे टूट चुके हैं,
पर ज़मीन पर रौशनी की कमी नही हुई हैं

कोई अंजान सी जगह हैं,
जहाँ सुकून सा लगता हैं
वहा तुम और मैं साथ हैं
और बीच में कोई 'पर' भी नहीं हैं

अब मैं हर रात
इस सपने को देखने के लिए सोता हूँ

और हर अगली सुबह के सूर्य में उन गिरे
तारों की खोज पे निकलता हूँ!`,
  },
  {
    title: "बस मेँ लिखता जाऊ तू पढ़ती जाए",
    content:
`कहती हैं वो अक्सर मुझसे
"तुम्हारी कविताओं के अंत में स्वाद नहीं"

न करती हैं rhyme सही,
न अर्ध (,) या पूर्ण (।) विराम कही,

शुरुवात इतनी जब करते हों प्यारी
तो अंत पे हैं क्यूँ ध्यान नहीं

भोली हैं! डर को नहीं समझती मेरे

जो लिख दिया खूबसूरत अंत कही
तो प्यारी शुरुवात भूल न जाए
कभी अंत नहीं करनी तेरी कविता
बस मेँ लिखता जाऊ तू पढ़ती जाए !`,
  },
  {
    title: "चल कोई बात नहीं",
    content:
`यूँ तो है कहानी में किरदार कई
गर तेरी वाली किसी में भी बात नहीं

यूँ तो हर शाम के बाद आती रात नई
गर तेरी खुश्बू के तारे अब हाथ नहीं

यूँ तो हसी ठिठोली दोस्तों से रोज़ नई
गर तेरी वाली मुस्कान अब साथ नहीं

ज़िन्दगी है कभी दुःख तो कभी ख़ुशी नई
क्या कहे सिवाए "चल कोई बात नहीं" !`,
  },
  {
    title: "साहित्य तेरा मेरा",
    content:
`एक रात हो, मैं एक कविता करू
एक सुबह हो, मैं एक छंद पढ़ू

एक शाम हों, मैं एक शेर करू
एक रात हों, मैं एक श्लोक जपु

ऐ समझ न यारा, तू एक हैं
कितनी दफा तुझे लिखने को
हर बार कुछ नया करू

बदलके हर दफा सिर्फ व्याकरण
क्यूँ साहित्य तेरा मेरा मैं बार-बार करू!`,
  },
  {
    title: "एक रुपया",
    content:
`तेरे कमर पर झूलते भरे हुए पर्स में पड़े एक रूपये के
हलके-भारी छोटे सिक्के सा हूं मैं,
जब तेरे हाथ बड़े-बड़े नोटों की तलाश में पर्स को टटोलते है
उनमे चुपके से उलझ जाता हूं
तेरी उँगलियों को छूने के लिए, तेरे हाथों से लिपटने के लिए !

तेरी उँगलियों उन हल्के बड़े नोटों को तो पकड़ लेती हैं
मगर तुझे मेरा उनमे छुपे होने का इल्म नहीं होता
और इस बेर से मैं तेरी उँगलियों के फासले से छलांग लगाकर
ज़मीन पर खो जाना चाहता हूं
मगर तेरे आस-पास ही !

मैं गिरता हूं और खनखनाके तुझे बताना चाहता हूं
कि तू कुछ खो रही है
तुझे आवाज़ लगाता हूं तू सुनती भी है
शायद तेरी आँखें मेरी आवाज़ कि दिशा में देखती भी है
मगर में नज़र नहीं आता !

मैं अब रोष और उम्मीद में टकटकी लगाए
तेरी निगाहों का मुझसे टकराने का इंतज़ार करता हूं
ये सोचता हूं कि तेरे आँखों के कंचो में खुद को निहारूँगा
और तेरी उँगलियाँ मुझसे लिपटकर मुझे पुचकारेंगी !

तेरी आँखों में मुझे न ढूढ़ने कि झलक देखकर
मैं बेचैन हो जाता हूं, घबराने लगता हूं !

और तू, तू नाफिकरी से चली जाती हैं
जैसे कि तूने कुछ खोया ही नहीं, जैसे कि मेरे तेरे लिए था ही नहीं
और मैं, मैं वही गिरा रह जाता हूं ठहरा रह जाता हूं
जैसे कि में कुछ हूँ ही नहीं, जैसे कि मैं कुछ था ही नहीं !`,
  },
  {
    title: "तू वैसा वाला गीत है",
    content:
`तेरी बातों में संगीत हैं
तेरा काजल मेरी प्रीत है
तेरी आँखें भी सुनती हैं: तू वैसा वाला गीत है

तेरी बालियां गुनगुनाती हैं
तेरी कहानियाँ कह जाती हैं
तेरे होंठ भी बताते हैं: तू वैसा वाला गीत है

तेरी मोती पायल पीली है
तेरी नाभी भी सुरीली है
तेरी चाल भी कटीली है: तू वैसा वाला गीत है

तेरी नाक कला कि मुनि है
तेरी मुस्कान मीठी ध्वनि है
तेरी आवाज़ मैंने सुनी है: तू वैसा वाला गीत है

तेरे गीत कि पंक्ति बन जाना है
तेरे स्वरों सा मुझको सन जाना है
अरे कभी तो तुझको भी गाना है: "तू वैसा वाला गीत है"

तेरी बातों में संगीत हैं
तेरा काजल मेरी प्रीत है
तेरी आँखें भी सुनाती हैं: तू वैसा वाला गीत है
तू वैसा वाला गीत है
तू वैसा वाला गीत है !`,
  },
  {
    title: "समाज में आई आँधी है",
    year: "2014",
    content:
`समाज में आई आँधी है,
जननी बनी मर्दानी है,
कोमल कोमल हाथो को अब - चूल्हा नहीं,
अपनी किस्मत सुलगानी है।

कलम होगी हाथ में,
पुस्तक साथ में,
मन आत्मविश्वास में,
बुलंदी आवाज में,
तभी बनेगी बात ये।
समाज में आई आँधी है,
जननी बनी मर्दानी है।

अलबेली माया देखो इस अंधे समाज की,
रोक कर विकास हमारा,
ले लेता रीति का सहारा,
सोचता हूँ कभी —
"क्या रीति ने ही खाया है भविष्य का उजियारा?"

याद दिलाकर पाठ उसे,
रीति की समाज का,
कहता है ये समाज हमारा,
जीवन जीने का हक है सिर्फ पृथ्वीराज का।

कहने को तो देश हमारा,
बन रहा विकसित सितारा,
किस बात का ये सितारा —
जिसमें नहीं है जरा भी उजियारा?
समाज में आई आँधी है,
जननी बनी मर्दानी है।

बदलाव देखकर दंग हुए सब,
हुआ है सोच का विकार अब,
टिप टिप टिप टिप बनते सपने,
मिल रहे हैं नदियों में,
बाँध बना है अगर कोई,
तो हट जाएगा शोर से,
मिलकर ही रहेगी अब,
नदी ये समुद्र की डोर से।

नहीं आएगा मसीहा कोई,
सोच बदलने समाज की,
बदलेगी जब सोच हमारी,
जीतेगी फिर भारतीय नारी।

समाज में आई आँधी है,
जननी बनी मर्दानी है।`,
  },
];

/* ══════════════════════════ PAGE ══════════════════════════════════════ */
export default function KavitayeinPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <main className="min-h-screen mesh-bg" style={{ background: "#06030f" }}>

      {/* Ambient glows */}
      <div className="fixed pointer-events-none inset-0 overflow-hidden" aria-hidden>
        <div style={{
          position: "absolute", top: "-10%", left: "40%",
          width: 700, height: 500,
          background: `radial-gradient(ellipse, ${V}0d 0%, transparent 65%)`,
        }} />
        <div style={{
          position: "absolute", bottom: "20%", right: "-5%",
          width: 350, height: 350,
          background: `radial-gradient(ellipse, rgba(251,191,36,0.04) 0%, transparent 65%)`,
        }} />
      </div>

      {/* Sticky nav */}
      <div className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(6,3,15,0.92)", borderColor: `${V}18`, backdropFilter: "blur(24px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/library/poetry"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}
            onMouseEnter={e => (e.currentTarget.style.color = V)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
            <ArrowLeft size={14} /> Back
          </Link>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.12)", fontFamily: "var(--font-mono)" }}>
            कविताएँ · yugal agarwal
          </span>
        </div>
      </div>

      {/* ══ HERO ══ */}
      <div className="relative overflow-hidden max-w-3xl mx-auto px-6 pt-14 sm:pt-20 pb-8">

        <div className="absolute top-0 right-4 font-black leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(80px,20vw,160px)", color: V, opacity: 0.03,
                   fontFamily: "var(--font-display)" }}>
          कविता
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: `${V}12`, border: `1px solid ${V}30` }}>
            <Feather size={11} style={{ color: V }} />
            <span className="text-xs" style={{ color: V, fontFamily: "var(--font-mono)" }}>Hindi Kavitayein</span>
          </div>

          <h1 className="font-black leading-none mb-3"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,8vw,68px)",
                     letterSpacing: "-2.5px", color: "rgba(255,255,255,0.93)" }}>
            Words in Hindi,<br />
            <span style={{ color: V }}>straight from the soul.</span>
          </h1>

          <p className="text-sm leading-relaxed mb-2"
            style={{ color: "rgba(255,255,255,0.3)", maxWidth: "460px" }}>
            {KAVITAYEIN.length} poems — all originals, sorted new first.
          </p>
          <p className="text-xs italic" style={{ color: "rgba(255,255,255,0.12)", fontFamily: "var(--font-mono)" }}>
            All content on this page are my originals only.
          </p>

        </motion.div>
      </div>

      {/* ══ POEM LIST ══ */}
      <div className="max-w-3xl mx-auto px-6 pb-28">
        <div className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
          {KAVITAYEIN.map((poem, i) => {
            const m = mood(poem.title);
            const open = openIdx === i;
            return (
              <div key={i}>
                {/* Row */}
                <Fade delay={i * 0.03}>
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-150"
                    style={{
                      background: open ? `${m}0c` : "transparent",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                    onMouseEnter={e => { if (!open) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)"; }}
                    onMouseLeave={e => { if (!open) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {/* Mood dot */}
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5 transition-all duration-200"
                      style={{ background: m, opacity: open ? 1 : 0.4,
                               boxShadow: open ? `0 0 8px ${m}` : "none" }} />

                    <span className="flex-1 text-sm sm:text-base"
                      style={{ color: open ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.52)" }}>
                      {poem.title}
                      {poem.year && (
                        <span className="ml-2 text-[10px]"
                          style={{ color: `${m}70`, fontFamily: "var(--font-mono)" }}>
                          · {poem.year}
                        </span>
                      )}
                    </span>

                    <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                      <ChevronDown size={14} style={{ color: open ? m : "rgba(255,255,255,0.18)" }} />
                    </motion.div>
                  </button>
                </Fade>

                {/* Expanded */}
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}>
                      <div className="relative px-6 py-8"
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                          background: `linear-gradient(135deg, ${m}06 0%, transparent 60%)`,
                        }}>
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                          style={{ background: `linear-gradient(to bottom, transparent, ${m}80, transparent)` }} />
                        <PoemLines text={poem.content} accentColor={m} />
                        <p className="mt-6 text-xs"
                          style={{ color: `${m}55`, fontFamily: "var(--font-mono)" }}>
                          — युगल अग्रवाल{poem.year ? `, ${poem.year}` : ""}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t text-center py-8 px-6"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.12)", fontFamily: "var(--font-mono)" }}>
          All content © Yugal Agarwal &nbsp;·&nbsp; Originals only &nbsp;·&nbsp; Please credit if you share 🙏
        </p>
      </div>

    </main>
  );
}
