"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mic } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

/* ══ Light notebook palette ════════════════════════════════════════════ */
const PAGE_BG   = "#f2ece0";   // warm cream desk
const PAPER     = "#fffdf8";   // notebook paper
const INK       = "#2b1a0a";   // dark brown ink
const INK_MED   = "#8b6e52";   // warm medium text
const INK_FAINT = "#c4aa8e";   // faint warm muted

const AMB = "#d97706";         // amber  — shayari
const ROZ = "#db2777";         // rose   — kavitayein
const SKY = "#2563eb";         // blue   — english
const SAG = "#16a34a";         // sage   — origin

const TINT: Record<string, string> = {
  picks:   "#fdf8f0",
  shayari: "#fff9e8",  kavita: "#fff0f7",
  english: "#eff5ff",  story:  "#f0fdf5",
};
const ACC: Record<string, string> = {
  picks:   "#b45309",
  shayari: AMB, kavita: ROZ, english: SKY, story: SAG,
};

type M = "picks" | "shayari" | "kavita" | "english" | "story";
type S = "lambi" | "char" | "do";
type Poem = { title: string; content: string; year?: string };

/* ══ BEST PICKS — edit this list to curate your favourites ════════════ */
type Pick = {
  title: string;
  content: string;
  category: "शायरी" | "कविता" | "English";
  accent: string;
  note?: string;
};

const PICKS: Pick[] = [
  {
    title: "हसरतें शबाब की हैं",
    category: "शायरी",
    accent: AMB,
    content: `हसरतें शबाब की हैं, मुकम्मल सिर्फ शराब हैं\n'मैं हूँ तेरे ख्वाब में', यह तो मेरा ख्वाब है !`,
  },
  {
    title: "याद रहता हैं",
    category: "शायरी",
    accent: AMB,
    content: `याद रहता हैं कि "क्यों तुझको भूल बैठे हैं",\nआग भुझाकर धुएँ से मरना इसी को कहते है !`,
  },
  {
    title: "तू वैसा वाला गीत है",
    category: "कविता",
    accent: ROZ,
    content: `तेरी बातों में संगीत हैं\nतेरा काजल मेरी प्रीत है\nतेरी आँखें भी सुनती हैं: तू वैसा वाला गीत है\n\nतेरी बालियां गुनगुनाती हैं\nतेरी कहानियाँ कह जाती हैं\nतेरे होंठ भी बताते हैं: तू वैसा वाला गीत है\n\nतेरी मोती पायल पीली है\nतेरी नाभी भी सुरीली है\nतेरी चाल भी कटीली है: तू वैसा वाला गीत है\n\nतेरे गीत कि पंक्ति बन जाना है\nतेरे स्वरों सा मुझको सन जाना है\nअरे कभी तो तुझको भी गाना है: "तू वैसा वाला गीत है"`,
  },
  {
    title: "एक रुपया",
    category: "कविता",
    accent: "#7c3aed",
    content: `तेरे कमर पर झूलते भरे हुए पर्स में पड़े एक रूपये के\nहलके-भारी छोटे सिक्के सा हूं मैं,\nजब तेरे हाथ बड़े-बड़े नोटों की तलाश में पर्स को टटोलते है\nउनमे चुपके से उलझ जाता हूं\nतेरी उँगलियों को छूने के लिए, तेरे हाथों से लिपटने के लिए !\n\nतेरी उँगलियों उन हल्के बड़े नोटों को तो पकड़ लेती हैं\nमगर तुझे मेरा उनमे छुपे होने का इल्म नहीं होता\nऔर इस बेर से मैं तेरी उँगलियों के फासले से छलांग लगाकर\nज़मीन पर खो जाना चाहता हूं\nमगर तेरे आस-पास ही !\n\nमैं गिरता हूं और खनखनाके तुझे बताना चाहता हूं\nकि तू कुछ खो रही है\nतुझे आवाज़ लगाता हूं तू सुनती भी है\nशायद तेरी आँखें मेरी आवाज़ कि दिशा में देखती भी है\nमगर में नज़र नहीं आता !\n\nमैं अब रोष और उम्मीद में टकटकी लगाए\nतेरी निगाहों का मुझसे टकराने का इंतज़ार करता हूं\nये सोचता हूं कि तेरे आँखों के कंचो में खुद को निहारूँगा\nऔर तेरी उँगलियाँ मुझसे लिपटकर मुझे पुचकारेंगी !\n\nतेरी आँखों में मुझे न ढूढ़ने कि झलक देखकर\nमैं बेचैन हो जाता हूं, घबराने लगता हूं !\n\nऔर तू, तू नाफिकरी से चली जाती हैं\nजैसे कि तूने कुछ खोया ही नहीं, जैसे कि मेरे तेरे लिए था ही नहीं\nऔर मैं, मैं वही गिरा रह जाता हूं ठहरा रह जाता हूं\nजैसे कि में कुछ हूँ ही नहीं, जैसे कि मैं कुछ था ही नहीं !`,
  },
  {
    title: "People People went away!",
    category: "English",
    accent: SKY,
    content: `Life is a building with a sway,\nFew floors up and more down stay,\nSome people you met in life elevator\nSome in the stairs or the arena way.\n\nYour peeps whom you love today,\nWill left you in a random floor someday,\nSome will come to rescue your pain\n& you'll shout: people people stay away.\n\nLife is a building with a sway,\nFew floors up and more down stay,\nYou can't see in black and white\nEvery moment is a shade of grey.\n\nYou get locked in anxiety clay,\nYou're shouting: people people stay away.\nYour people know to water your clay,\nTo set you free with fun ball to play.\n\nYou now loving your black trauma walls,\nWant you to be buried in their great fall.\nYour people know to water your clay,\nJust talk to them and jump your sad hall.\n\nLife is a building with a sway,\nFew floors up and more down stay,\nYou have to shout heal me mate,\nYour peeps will run to hug you tight\nWhom you said to stay away !`,
  },
];
/* ══ DATA ════════════════════════════════════════════════════════════════ */

const THODI: Poem[] = [
  { title: "दोनों साथ थे", content: `इश्क़ के समुन्दर में हम कूदे तो दोनों साथ थे,\nतुम भीग के निकल गयी, हम डूबे के रुके रहे।\n\nरेत के टीले बनाये हमने तो दोनों साथ थे,\nतुम धुल सुन चली गयी, हम रेत में धसे रहे।\n\nखैर इन बातों को हम करते तो साथ थे,\nतुम बिन सुने निकल गयी, हम शायरी करते रहे।` },
  { title: "ज़ुल्फ़ों", content: `तेरी आँखों पे लटकी ज़ुल्फ़ों से\nतेरी ही उंगलिया क्यूँ खेल रही हैं?\n\nचेहरे पे आयी ये मुस्कराहट को\nहल्के हाथों से पीछे क्यूँ धकेल रही हैं?\n\nबता दो अपने हाथों की उँगलियों को\nकर दो आगाह या दो डांट उन्हें\n\nजो मेरे नाम की अंगूठी पहने बगैर\nतेरी ज़ुल्फ़ों की गलियों मेँ घूम रही हैं !` },
  { title: "मेरी गुलाब बनोगी", content: `क्या याद हैं आज भी\nवो बेमौसम गुलाब तुम्हे\nजो बस यूँ ही दे दिया था मैंने\n\nकोई दिन नहीं था फरवरी का\nकोई इल्म नहीं था हड़बड़ी का\nवो ठहर के कपकपाते होठों से\nजो बस यूँ ही कह दिया था मैंने\n\n"हाँ तुम फूल हो,\nक्या मेरी गुलाब बनोगी?"` },
  { title: "आलसी आशिक", content: `डांका डालने से पहले\nहोती हैं लम्बी रैकी,\n\nदो नोट चुराने कोई\nरात का इंतज़ार नहीं करता\n\nक्या गिनने तुमने तारों को\nनींद हैं अपनी फैंकी?\n\nधत आलसी आशिक कहते\n"हमें कोई प्यार नहीं करता"` },
  { title: "लेहेंगा", content: `न डाल पागल ये लेहेंगा चोली\nतू दूर देश की लगती हैं\n\nआग न बन सर्दी की तू वो\nभीड़ चारो तरफ जिसके लगती हैं\n\nमैं अभी विदेशी हूँ मुझे\nनागरिकता तो लेने दे\n\nफिर पहन के लेहेंगा देखना शीशा\nमेरी लगाई बिंदी कैसी लगती हैं?` },
  { title: "ये तुम्हारे ख़ारेपन की बेचैनी हैं", content: `ये तुम्हारे ख़ारेपन की बेचैनी है,\nतुम बेवजह उनके चाँद को कोसते हो\n\nये लेहरे तुम्हारी बोखलाहट है,\nसबब उनके गुरुत्वाकर्षण को सोचते हो\n\nये जो जमावड़े लगे हैं न\nदर्शको के तुम्हारे किनारे\n\nतुम्हारी लेहरे देखने आये है\nतुम अपने अथाह को गुरूर समझते हो` },
  { title: "थोड़ा सब्र करो न तुम", content: `नदी पे बाँध बना के तुम\nबिजली बनाना चाहते हो दोस्त?\n\nये मन के खेल में तुम\nगणित समझाना चाहते हो दोस्त?\n\nथोड़ा सब्र करो न तुम\n\nनदी को समुन्दर तक आने दो दोस्त\nपास कि रेत पर गणित हल करेंगे!` },
  { title: "ऐ दिल कहाँ जा रहे हो?", content: `पूर्णिमा का चाँद है आज,\nतुम ये झालर लगा रहे हो\n\nआसमान को देखने के दिन हैं तुम्हारे,\nतुम ये नज़रे झुका रहे हो\n\nवो शायद वाले कल के लिए\nतुम ये आज गवा रहे हो\n\nठहर के पुछा हैं खुदसे कभी:\nऐ दिल ! कहाँ जा रहे हो?` },
  { title: "तू नहीं तो हम तो हैं ही", content: `तू नहीं तो हम तो हैं ही,\nजो हम हैं तो तू तो हैं ही!\n\nतेरी आँखों में खोने को\nतेरा होना ज़रूरी थोड़ी\nदिखे न दिखे तस्वीरों मैं,\nमेरी आँखों मैं तू तो हैं ही!\n\nतू नहीं तो हम तो हैं ही,\nजो हम हैं तो तू तो हैं ही!` },
];

const CHAR: string[] = [
  `चटक जाती हैं घड़ी मगर\nवक्त फिर भी रुकता नहीं।\nचाँद खूबसूरत हो तो देख लो उसे\nरोज़-रोज़ वो ऐसा दीखता नहीं।`,
  `इकरार तेरा मरोड़ कर हाथ मैंने क्यूँ किया,\nतू राज़ी जो इश्क़ को थी प्यार मैंने क्यूँ किया?\n\nछोड़ कर जाओ मुझे कहना तेरा वाजिब हैं,\nमलाल तेरी बात का नहीं इंकार मैंने क्यूँ किया?`,
  `ऐ खूबसूरत चाँद तू कर ले घमंड,\nनहीं बेर मुझे - तेरे चाहने वाले तारे कितने हैं।\n\nहम रोज़ ताँके तुझे, करे आँखों से सम्बन्ध,\nगिनती पता हैं तुझे? - रोज़ गिरते ऐसे तारे कितने हैं।`,
  `समुन्दर से दिल लगा बैठे हैं लेकिन\nअब दूर से ही इसकी लहरें देखेंगे,\nजो तेरे खारे पानी में उतरे तो फिर\nज़खमों पर नमक लगेंगे !`,
  `साथ पे तुम्हारे\nकिताब लिखने का इरादा था\nगर तुम तो\n८ (8) पंक्ति की कविता भी न बन सकी !`,
  `तुझे रोज़ लिखूंगा मैं\nकलम न सही, दबी जुबाँ से\nतू किरदार तो प्यारा ही है\nफर्क नहीं, कहानी के अंजाम से`,
  `ग़ज़ल तेरी आँखों पर लिखनी है मुझे\nमतला तेरे काजल से लूंगा\nइरशाद तो मेरा इश्क़ दे देगा\nवाह मैं तेरी वफ़ा से लूंगा !`,
];

const DO: string[] = [
  `हम धरती से तकते रह गए उस चाँद को - वो आया न फिर पास मेरे,\nपूर्णिमा सी हाँ बोलकर अमावस हो गया!`,
  `ये बादलों का ज़ोर का कड़कड़ाना, तेरे होंठो के मुस्कुराने सा हैं,\nइसकी बारिश में भीगते भीगते, न जाने कब बिजली गिर जाए !`,
  `वो एक काँटा जो तेरे पाँव को चूम रहा हैं,\nहुस्न के राज़ को तेरे खून में ढूंद रहा हैं !`,
  `लहरें भी धीमी हैं, न तू शोर कर रही है\nन तेरी रौशनी है, ये शाम भी ढल रही है।`,
  `याद रहता हैं कि "क्यों तुझको भूल बैठे हैं",\nआग भुझाकर धुएँ से मरना इसी को कहते है !`,
  `खिड़की से तेरे छज्जे कूदूं में उतना मुस्तैद हूँ\nअरे चार खुले दरवाज़े हैं देखो फिर भी क़ैद हूँ !`,
  `घाट पर बैठे, आ करे बात जीवन की\nतेरे भी मन की, और मेरे भी मन की।`,
  `हसरतें शबाब की हैं, मुकम्मल सिर्फ शराब हैं\n'मैं हूँ तेरे ख्वाब में', यह तो मेरा ख्वाब है !`,
];

const KAVITA: Poem[] = [
  { title: "एक रुपया", content: `तेरे कमर पर झूलते भरे हुए पर्स में पड़े एक रूपये के\nहलके-भारी छोटे सिक्के सा हूं मैं,\nजब तेरे हाथ बड़े-बड़े नोटों की तलाश में पर्स को टटोलते है\nउनमे चुपके से उलझ जाता हूं\nतेरी उँगलियों को छूने के लिए, तेरे हाथों से लिपटने के लिए !\n\nतेरी उँगलियों उन हल्के बड़े नोटों को तो पकड़ लेती हैं\nमगर तुझे मेरा उनमे छुपे होने का इल्म नहीं होता\nऔर इस बेर से मैं तेरी उँगलियों के फासले से छलांग लगाकर\nज़मीन पर खो जाना चाहता हूं\nमगर तेरे आस-पास ही !\n\nमैं गिरता हूं और खनखनाके तुझे बताना चाहता हूं\nकि तू कुछ खो रही है\nतुझे आवाज़ लगाता हूं तू सुनती भी है\nशायद तेरी आँखें मेरी आवाज़ कि दिशा में देखती भी है\nमगर में नज़र नहीं आता !\n\nमैं अब रोष और उम्मीद में टकटकी लगाए\nतेरी निगाहों का मुझसे टकराने का इंतज़ार करता हूं\nये सोचता हूं कि तेरे आँखों के कंचो में खुद को निहारूँगा\nऔर तेरी उँगलियाँ मुझसे लिपटकर मुझे पुचकारेंगी !\n\nतेरी आँखों में मुझे न ढूढ़ने कि झलक देखकर\nमैं बेचैन हो जाता हूं, घबराने लगता हूं !\n\nऔर तू, तू नाफिकरी से चली जाती हैं\nजैसे कि तूने कुछ खोया ही नहीं, जैसे कि मेरे तेरे लिए था ही नहीं\nऔर मैं, मैं वही गिरा रह जाता हूं ठहरा रह जाता हूं\nजैसे कि में कुछ हूँ ही नहीं, जैसे कि मैं कुछ था ही नहीं !` },
  { title: "ठंडी चाय", content: `गर्म से मौसम में,\nकल कुछ हल्की-हल्की ठंडी हवा सी थी।\n\nचंद बौछार की बूँदें गिरी,\nऔर मेरे चश्मे से अचानक चिपक गयी।\n\nमेरी उंगलिया मेरे रुमाल को साथ लायी\nऔर बूंदों के हटते ही\nमेरी नज़रों ने जब फिर चश्मे में देखा\nतो सामने तुम दिखी,\nहाँ वही 'तुम' जो कभी मेरी 'मैं' थी।\n\nनजाने उत्सुकता में कुछ यूँ हालात बने\nकि हम मुस्कुराये और मौसम कि मेहरबानी से\nसाथ में कदमताल पर निकल लिए।\n\nउसकी हर एक बात\nमेरे कानों को बहुत मीठी लग रही थी।\nमानो आपने बहुत मेहनत व प्रेम से\nएक कप चाय बनाई हो\nमगर एक काम में उलझने के कारण\nवो चाय कप में पड़े-पड़े ठंडी हो गयी हो\nलेकिन वो एकदम ठंडी पड़ी चाय भी\nआपको बहुत मीठी लगती है\nवो मिठास चाय से ज़्यादा आपके भाव की होती है।\n\nबस उतना ही मीठा मुझे वो समय लग रहा था\nऔर उसके होंठो से निकला हर लफ्ज़\nकिसी कड़क चाय की चुस्की से कम न था।` },
  { title: "काशी के किनारों में", content: `कुछ तो बात थी, उन काशी के किनारो में\nइतने सुन्दर नहीं थे, पर मोह लेते थे\n\nहर तरफ कई अंजान लोगों का शोर था,\nलेकिन दो घड़ी बैठो तो अपनी सी शांति\n\nसाज सज्जा ऐसी जैसे बिखरी हुई पंक्तिया,\nलेकिन जो शब्द बटोरो तो तिलस्मी ग़ज़ल\n\nवो बड़ी-बड़ी लकड़ी की चटकी चटकी नाव,\nपर बैठ के गंगा में उतरो तो पुष्पक विमान\n\nकुछ तो बात थी, उन काशी के किनारों में\nइतने सुंदर नहीं थे, पर मोह लेते थे !` },
  { title: "होली", content: `तुम रंग हों, खुशबु हों,\nफूलों की तरह !\n\nहर पल जैसे चार चाँद की\nचमक हैं तुम्हारे साथ\n\nजब भी देखता हूँ तुमको\nलाल अबीर उड़ता हैं मन में,\nचाहे होली का त्यौहार हों या न हों !\n\nउड़ते अबीर में आंखें खोलना कितना\nमुश्किल हैं ये तो जानती होंगी तुम,\nमगर तुम्हे लाल इश्क़ में रंगे देखने के\nअपने इस मोह को नहीं समझा सकता मैं !\n\nये तुझे रंग में देखने को\nहां मेरे रंग में देखने को\nहर साल\nहोली का इंतज़ार नहीं कर सकता मैं !` },
  { title: "बस में लिखता जाऊ तू पढ़ती जाए", content: `कहती हैं वो अक्सर मुझसे\n"तुम्हारी कविताओं के अंत में स्वाद नहीं"\n\nन करती हैं rhyme सही,\nन अर्ध (,) या पूर्ण (।) विराम कही,\n\nशुरुवात इतनी जब करते हों प्यारी\nतो अंत पे हैं क्यूँ ध्यान नहीं\n\nभोली हैं! डर को नहीं समझती मेरे\n\nजो लिख दिया खूबसूरत अंत कही\nतो प्यारी शुरुवात भूल न जाए\nकभी अंत नहीं करनी तेरी कविता\nबस मेँ लिखता जाऊ तू पढ़ती जाए !` },
  { title: "इज़हार", content: `इज़हार कर नहीं सकते मगर प्यार हैं,\nक्या बात होती जो तू कहती 'तू तैयार हैं',\n\nहर पल तेरी याद में बीतें मैं भूल गया गिन\nअच्छा नहीं कहना तेरा 'जीलो मेरे बिन'\n\nचाँद भी सोता हैं, तारें भी सो जाते हैं\nकम्भख्त तेरे ख्वाब लेकिन\nमेरी नींद में आतें हैं, मुझको जगा जाते हैं\n\nइज़हार कर नहीं सकते मगर प्यार हैं,\nघड़ी पहनता हूँ अब, तेरा इंतज़ार हैं\n\nक्या बात होती जो तू कहती 'तू तैयार हैं',\nकाट देते सब गांठे मुश्किलों की\nतेरे इश्क़ की तलवार मैं इतनी तो धार हैं!` },
  { title: "साथ दे सकते हैं पर साथ रह सकते नहीं", content: `उसे समझ नहीं आती मेरी शायरी,\nऔर हम सीधे-सीधे कह सकते नहीं\n\nवो हस के कहती हैं मुझसे हर दफा\n'मैं भूल गयी', क्यूँ तुम भूल सकते नहीं?\n\nएक नाव मैं बैठा हूँ उसके साथ\nमगर दूसरे छोर पर,\nसाथ दे सकते हैं पर साथ रह सकते नहीं !\n\nमंज़ूर हैं ये सफर भी\nकमसे कम तेरा एहसास तो हैं,\nबता सकते नहीं, जता सकते नहीं\nकोई बात नहीं, मगर प्यार तो हैं !` },
  { title: "'पर'", content: `आसमान के सारे तारे टूट चुके हैं,\nपर ज़मीन पर रौशनी की कमी नही हुई हैं\n\nकोई अंजान सी जगह हैं,\nजहाँ सुकून सा लगता हैं\nवहा तुम और मैं साथ हैं\nऔर बीच में कोई 'पर' भी नहीं हैं\n\nअब मैं हर रात\nइस सपने को देखने के लिए सोता हूँ\n\nऔर हर अगली सुबह के सूर्य में उन गिरे\nतारों की खोज पे निकलता हूँ!` },
  { title: "तू मेरी One & Only", content: `तू मेरी one & only, मैं तेरा one of the\nक्यूँ कर लिया दिल ने तुझसे ये घाटे का सौदा\n\nतेरी रोज़ की बातें तू सिर्फ मुझे सुनती हैं\nमेरी ही बाहों में सिर्फ तू चैन पाती हैं\nगलतफहमियों के इन सपनो पे अब हस्ता\nतू मेरी one & only, मैं तेरा one of the\n\nलिख लिख कर किताबें तुझपे भी मैं नहीं थकता\nसुनाते और भी दस लोग तुझपे कविताये हैं\nमेरी वाली क्यूँ नहीं पढ़ी शिकायत भी नहीं कर सकता\nतू मेरी one & only, मैं तेरा one of the` },
  { title: "कब तक?", content: `कब तक इस चाँद के नूर के बहाने\nतेरे होने का ज़िक्र करू?\n\nकब तक ये बारिश वाली मिट्टी की खुश्बू में\nतेरी महक महसूस करू?\n\nकब तक ये गरजते ठंडे-ठंडे बादलों में\nतेरा चुलबुला शोर सुना करू?\n\nतारे, फूल, झरने, नदिया, समुन्दर, धुप, बारिश, बहार, जादू,\nतितली बस अब खत्म हों रहे हैं रूपक अलंकार मुझपे\n\nकब तक तुम्हे लिखने को,\nतुम्हे कही और ढूंढा करू?` },
  { title: "तू वैसा वाला गीत है", content: `तेरी बातों में संगीत हैं\nतेरा काजल मेरी प्रीत है\nतेरी आँखें भी सुनती हैं: तू वैसा वाला गीत है\n\nतेरी बालियां गुनगुनाती हैं\nतेरी कहानियाँ कह जाती हैं\nतेरे होंठ भी बताते हैं: तू वैसा वाला गीत है\n\nतेरी मोती पायल पीली है\nतेरी नाभी भी सुरीली है\nतेरी चाल भी कटीली है: तू वैसा वाला गीत है\n\nतेरे गीत कि पंक्ति बन जाना है\nतेरे स्वरों सा मुझको सन जाना है\nअरे कभी तो तुझको भी गाना है: "तू वैसा वाला गीत है"` },
  { title: "चल कोई बात नहीं", content: `यूँ तो है कहानी में किरदार कई\nगर तेरी वाली किसी में भी बात नहीं\n\nयूँ तो हर शाम के बाद आती रात नई\nगर तेरी खुश्बू के तारे अब हाथ नहीं\n\nयूँ तो हसी ठिठोली दोस्तों से रोज़ नई\nगर तेरी वाली मुस्कान अब साथ नहीं\n\nज़िन्दगी है कभी दुःख तो कभी ख़ुशी नई\nक्या कहे सिवाए "चल कोई बात नहीं" !` },
  { title: "साहित्य तेरा मेरा", content: `एक रात हो, मैं एक कविता करू\nएक सुबह हो, मैं एक छंद पढ़ू\n\nएक शाम हों, मैं एक शेर करू\nएक रात हों, मैं एक श्लोक जपु\n\nऐ समझ न यारा, तू एक हैं\nकितनी दफा तुझे लिखने को\nहर बार कुछ नया करू\n\nबदलके हर दफा सिर्फ व्याकरण\nक्यूँ साहित्य तेरा मेरा मैं बार-बार करू!` },
  { title: "समाज में आई आँधी है", year: "2014", content: `समाज में आई आँधी है,\nजननी बनी मर्दानी है,\nकोमल कोमल हाथो को अब - चूल्हा नहीं,\nअपनी किस्मत सुलगानी है।\n\nकलम होगी हाथ में,\nपुस्तक साथ में,\nमन आत्मविश्वास में,\nबुलंदी आवाज में,\nतभी बनेगी बात ये।\nसमाज में आई आँधी है,\nजननी बनी मर्दानी है।\n\nनहीं आएगा मसीहा कोई,\nसोच बदलने समाज की,\nबदलेगी जब सोच हमारी,\nजीतेगी फिर भारतीय नारी।\n\nसमाज में आई आँधी है,\nजननी बनी मर्दानी है।` },
];

const ENG: Poem[] = [
  { title: "Ended up with Cold!", content: `I met her on a sunny day\nMy heart skipped a beat in way\n\nWe walked and talked,\nshe laughed and smiled\nI knew then, my love for her\nwould never be exiled.\n\nWe danced together,\nin the warm sunshine\nMy happiness,\nlike a bottle of fine wine.\n\nBut then the clouds\ngrew dark and grey\nAnd the rain came\npouring down to play.\n\nI had no umbrella, but\nshe was with a raincoat,\nWe danced together, but\nI ended up with cold.\n\nShe made distance,\nnot to catch my cold\nAnd said goodbye,\nwith a hand to hold,\nI knew then,\nit was done\nBut my love for her,\nstill burns like the sun.` },
  { title: "People People went away!", content: `Life is a building with a sway,\nFew floors up and more down stay,\nSome people you met in life elevator\nSome in the stairs or the arena way.\n\nYour peeps whom you love today,\nWill left you in a random floor someday,\nSome will come to rescue your pain\n& you'll shout: people people stay away.\n\nLife is a building with a sway,\nFew floors up and more down stay,\nYou can't see in black and white\nEvery moment is a shade of grey.\n\nYou get locked in anxiety clay,\nYou're shouting: people people stay away.\nYour people know to water your clay,\nTo set you free with fun ball to play.\n\nYou now loving your black trauma walls,\nWant you to be buried in their great fall.\nYour people know to water your clay,\nJust talk to them and jump your sad hall.\n\nLife is a building with a sway,\nFew floors up and more down stay,\nYou have to shout heal me mate,\nYour peeps will run to hug you tight\nWhom you said to stay away !` },
  { title: "Undone", content: `Two hearts entwined, in a love so true and pure\nA bond so strong, it could forever endure.\n\nTwo souls in perfect harmony, a dance so divine\nTheir love was the envy, of all who saw them shine.\n\nBut destiny wanted to play, something changed in one\nOut of blue all of the sudden, the rosy reds turned undone.\n\nThe love that once burned, began to fade away\nLeaving the other, in a state of disarray.\n\nThe one who was left, couldn't understand why\nThe love of their life, no longer met their eye.\n\nThey tried to hold on, to the love that was there\nBut the other had moved on, as if it's a game called dare.\n\nThe love they shared, now a distant memory\nLeft behind the lover, In a single character story.\n\nThey realize the end but can't help, but to still love and miss,\nthe person who left, who once shared the same bliss.\n\nIt's a hard truth to accept, and a harder one to mend\nthat one's feelings undone, while the other's still blend!` },
  { title: "Love-Love", content: `I don't want to win from you\nI don't wish to lose from you\n\nCan't we keep our score to "Love-Love"\nknown the journey of forever be "rough-rough".\n\nIf I hit the birdie a little high\nJust pass it back please don't cry.\n\nIf by mistake the birdie falls in court of you,\nwe will smash the ground like any kid would do.\n\nStill we'll keep our score to "Love-Love" & Love\nForgetting the fall & point to play UP UP & Above!` },
  { title: "Drop of Dew", content: `I'll show my love with actions, not with words,\nWith effortless grace, Not with expressions in herd.\n\nI'll water the seed of love, I've planted deep,\nAnd hope that one day, it will sprout and leap.\n\nI'll tend to it with care, and watch it grow,\nAnd hope that you'll see it, and come to know,\nThat what I feel for you, is more than true,\nAs if I am any leaf, And you drop of dew!` },
  { title: "No harm in watching the rain!", content: `Once a beautiful sky with clouds so fair,\nSuddenly turned dark, like a nightmare.\nThe wind howled and the lightning flashed,\nThe storm raged on, the sky was mashed.\n\nJust like the storm, your love turned black,\nThe beauty faded, it didn't come back.\nWhat once was warm, turned cold as ice,\nLove was lost, like a roll of the dice.\n\nSo cherish love when it's bright and true,\nBefore it turns dark, and leaves you blue.\nHold on tight, with all your might,\nAnd never let it slip, out of sight.\n\nThe skies will clear, and the storm will pass,\nThe sun will shine, on the dewy grass.\n\nThe day will come, and the vibe will match again,\nEven if it doesn't, No harm in watching the rain.` },
  { title: "Until we die!", content: `With candlelight & ocean breeze,\nTogether we'll create memories,\nThe waves glide by as we dine,\nWith you my love, all is just fine.\n\nYour hair swings gently with the air,\nI play with them without any care.\nThis moment's perfect, just you and I,\nTogether forever until we die.` },
  { title: "Fear", content: `I wish you'd trust in\nour love's pure might,\nAnd set sail on a journey\nthat's looking so bright.\n\nBut you chose the road\nwithout care to drive,\nAfraid of the small stream\nthat's not tough to thrive.\n\nYou said you loved me,\nbut now I see,\nYour fear is what's\nstanding in between.\n\nSo come out brave,\nlet go of that fear,\nTogether let's embark\non this adventure, my dear.` },
  { title: "I am a Journey", content: `I am a journey, not sure where I'll end\nWill I find you at my destination, my friend?\n\nI set out on this path with hope in my heart\nBut the road ahead is long and the journey is hard\n\nI'll keep you close in my thoughts as I roam\nHoping that our paths will soon find a home\n\nSo I'll keep moving forward, one step at a time\nTrusting that our paths will one day entwine\n\nI am a journey, with no certain end\nBut I'll keep searching for you, my dear friend!` },
  { title: "Only Wish", content: `I am not just your well-wisher,\nBut you are my only-wish,\nWith you by my side,\nI feel so blessed and rich.\n\nIn your happiness, I find my own,\nIn your sorrows, I feel alone,\nWith you, my heart sings,\nWithout you, it just mourns.\n\nI will wait for that star to fall,\nNo matter how long my eye itch,\nI am not just your well-wisher,\nBut you are my only-wish!` },
  { title: "Love Exchange", content: `He loved her deeply, with all his heart,\nTheir bond was strong, right from the start,\nBut one day she said, "I don't feel the same,"\nAnd left him wondering, who was to blame.\n\nThey tried to be friends, and it seemed to work,\nBut his heart still ached, it was a constant hurt,\nHe couldn't understand how it could all change,\nAnd if it was real or just an act, a love exchange.\n\nWas their love true, or just a game,\nA show put on, for personal fame,\nHe questioned everything, every memory they shared,\nAnd wondered if she ever truly cared.\n\nBut still, his heart yearned for her touch,\nFor her love, that meant so much,\nHe couldn't help but love her still,\nDespite the heartache and the better pill.\n\nHe knew that she didn't feel the same,\nBut his love for her would never wane,\nAnd he hoped that someday she'd see,\nThe love he had for her was real, indeed.` },
  { title: "Loving you, without hoping!", content: `Loving you without hoping is tough\nbut easier than moving on\nBut still, there are times when\nit's hard to hold on\nWhen doubts and fears start\nto creep in and dawn\n\nAnd we wonder if our love is enough to survive\nBut then I think of all the reasons that I'm alive\n\nSo I vow to love you, with all that I am\nTo hold you close and be your biggest fan\n\nFor me, you are the one\nwho makes my heart skip a beat\nAnd loving you, without hoping is\npainful but worthy damn so sweet.` },
  { title: "Right from the start!", content: `Life's a journey filled with twists and turns,\nWith ups and downs and lessons to be learned.\n\nMisery and happiness, they come and go,\nAnd leave behind a story that we all know.\n\nWe learn to dance in life's rough weather,\nAnd find joy in the darkest of days, together.\n\nFor in the end, It's not the pain or the glee,\nBut how we face it, that sets us all free.\n\nBut still, I hold on to hope and to my dreams,\nBelieving that love, like a ray of sunshine, beams.\n\nFor someday, my heart will find its missing part,\nAnd I'll know the love, right from the start!` },
  { title: "You being mine!", content: `Loving you is like my daily dream,\nBut loved by you was "nirvana" theme.\n\nMy feelings and effort, I hope you see,\nFor winning you back, is my destiny.\n\nYour eyes and memory, I hope they hold,\nThe love and care that never grows old.\n\nMy efforts are not for show,\nA natural flow of love, that will never slow.\n\nEven if fate does not align,\nI'll love the thought of you being mine.` },
  { title: "Song that I prefer!", content: `Amidst the noise and vibrant throngs,\nMy eyes and ears seek only her.\nThough music fills the air around,\nShe's the only song that I prefer.` },
  { title: "Soar Higher", content: `I promise you, my love to be true,\nWith open arms, my world I'll give to you.\n\nChoose your path, your heart's desire,\nWith you by my side, we'll soar higher.` },
];

/* ══ Pick spotlight card ════════════════════════════════════════════════ */
const CAT_COLORS: Record<string, string> = { "शायरी": AMB, "कविता": ROZ, "English": SKY };

function PickCard({ pick, idx }: { pick: Pick; idx: number }) {
  const [expanded, setExpanded] = useState(false);
  const catColor = CAT_COLORS[pick.category] ?? pick.accent;
  const stanzas        = pick.content.split("\n\n");
  const previewStanzas = stanzas.slice(0, 2);
  const hiddenStanzas  = stanzas.slice(2);
  const hasMore        = hiddenStanzas.length > 0;

  const renderStanza = (stanza: string, si: number) => (
    <div key={si} className="mb-4 last:mb-0">
      {stanza.split("\n").map((line, li) => (
        <span key={li} className="block text-[15px] leading-[2.1] italic"
          style={{ color: INK_MED, fontFamily: "Georgia, 'Times New Roman', serif" }}>
          {line || " "}
        </span>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden"
      style={{
        backgroundColor: PAPER,
        border: `1.5px solid ${pick.accent}28`,
        boxShadow: `0 4px 24px ${pick.accent}14, 0 1px 4px rgba(0,0,0,0.06)`,
      }}>

      {/* ── colour stripe top ── */}
      <div className="h-1.5 w-full"
        style={{ background: `linear-gradient(to right, ${pick.accent}, ${pick.accent}55, transparent)` }} />

      {/* ── large faint number watermark ── */}
      <div className="absolute top-3 right-5 font-black select-none pointer-events-none leading-none"
        style={{ fontSize: 96, color: pick.accent, opacity: 0.045,
                 fontFamily: "var(--font-display)" }}>
        {String(idx + 1).padStart(2, "0")}
      </div>

      <div className="px-7 pt-5 pb-6">
        {/* category + note row */}
        <div className="flex items-center gap-2.5 mb-4 flex-wrap">
          <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wide"
            style={{ backgroundColor: `${catColor}15`, color: catColor,
                     border: `1px solid ${catColor}30`, fontFamily: "var(--font-mono)" }}>
            {pick.category}
          </span>
          {pick.note && (
            <span className="text-[11px] italic" style={{ color: INK_FAINT, fontFamily: "Georgia, serif" }}>
              — {pick.note}
            </span>
          )}
        </div>

        {/* title */}
        <h3 className="text-xl sm:text-2xl font-black mb-5 leading-snug"
          style={{ fontFamily: "var(--font-display)", color: INK, letterSpacing: "-0.3px" }}>
          {pick.title}
        </h3>

        {/* always-visible first 2 stanzas */}
        <div>{previewStanzas.map(renderStanza)}</div>

        {/* hidden stanzas — animated reveal */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}>
              <div className="pt-1">{hiddenStanzas.map((s, i) => renderStanza(s, i + 2))}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* expand / fold button */}
        {hasMore && (
          <div className="relative mt-2">
            {!expanded && (
              <div className="absolute -top-12 inset-x-0 h-12 pointer-events-none"
                style={{ background: `linear-gradient(to bottom, transparent, ${PAPER})` }} />
            )}
            <button
              onClick={() => setExpanded(o => !o)}
              className="flex items-center gap-2 text-xs font-semibold transition-all duration-200"
              style={{ color: pick.accent, fontFamily: "var(--font-mono)" }}>
              <span className="h-px flex-shrink-0 w-6 inline-block"
                style={{ backgroundColor: `${pick.accent}50` }} />
              {expanded ? "fold poem ↑" : "read full poem ↓"}
            </button>
          </div>
        )}
      </div>

      {/* bottom accent strip */}
      <div className="h-px mx-7 mb-4"
        style={{ background: `linear-gradient(to right, ${pick.accent}30, transparent)` }} />
    </motion.div>
  );
}

/* ══ Spiral rings decoration ════════════════════════════════════════════ */
function Spiral({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-2.5 px-6 py-2 overflow-hidden"
      style={{ backgroundColor: `${color}12`, borderBottom: `1.5px solid ${color}22` }}>
      {Array.from({ length: 22 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 rounded-full border-2"
          style={{ width: 14, height: 14, borderColor: `${color}55`, backgroundColor: PAPER }} />
      ))}
    </div>
  );
}

/* ══ Poem accordion ═════════════════════════════════════════════════════ */
function PoemCard({ title, content, accent, year, idx }: {
  title: string; content: string; accent: string; year?: string; idx: number;
}) {
  const [open, setOpen] = useState(false);
  const lines   = content.split("\n").filter(l => l.trim());
  const preview = lines.slice(0, 2).join("   ·   ");
  const hasMore = lines.length > 2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="border-b"
      style={{ borderColor: "rgba(100,80,50,0.1)" }}>
      <div className="py-4">
        {/* Title row */}
        <div className="flex items-start gap-3 justify-between">
          <div className="flex items-start gap-2.5 flex-1 min-w-0">
            {/* Dot */}
            <span className="mt-[7px] flex-shrink-0 rounded-full"
              style={{ width: 7, height: 7, backgroundColor: accent,
                       boxShadow: open ? `0 0 0 3px ${accent}28` : "none",
                       transition: "box-shadow 0.2s", display: "block" }} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-[15px] font-semibold leading-snug"
                  style={{ color: open ? INK : `${INK}cc`,
                           fontFamily: "var(--font-display)", transition: "color 0.2s" }}>
                  {title}
                </span>
                {year && (
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}30` }}>
                    {year}
                  </span>
                )}
              </div>
              {!open && (
                <p className="mt-0.5 text-xs leading-relaxed truncate"
                  style={{ color: INK_FAINT, fontStyle: "italic",
                           fontFamily: "Georgia, 'Times New Roman', serif" }}>
                  {preview}{hasMore ? " …" : ""}
                </p>
              )}
            </div>
          </div>
          {hasMore && (
            <button onClick={() => setOpen(o => !o)}
              className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full transition-all duration-200"
              style={{
                color:      open ? accent : INK_FAINT,
                border:     `1px solid ${open ? `${accent}50` : "rgba(100,80,50,0.15)"}`,
                background: open ? `${accent}12` : "transparent",
                fontFamily: "var(--font-mono)",
              }}>
              {open ? "fold ↑" : "read ↓"}
            </button>
          )}
        </div>

        {/* Full poem */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}>
              <div className="mt-4 ml-[19px] pl-4 py-5 rounded-r-xl"
                style={{
                  borderLeft: `2px solid ${accent}70`,
                  backgroundColor: `${accent}08`,
                }}>
                {content.split("\n\n").map((stanza, si, arr) => (
                  <div key={si}>
                    {stanza.split("\n").map((line, li) => (
                      <span key={li} className="block text-sm leading-[1.95] italic"
                        style={{ color: INK_MED,
                                 fontFamily: "Georgia, 'Times New Roman', serif" }}>
                        {line || " "}
                      </span>
                    ))}
                    {si < arr.length - 1 && (
                      <div className="text-center my-3 text-xs select-none"
                        style={{ color: accent, opacity: 0.5, letterSpacing: "0.4em" }}>
                        ✦
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ══ 4-liner card ═══════════════════════════════════════════════════════ */
const CARD_COLORS = ["#e07c0c","#2563eb","#db2777","#16a34a","#7c3aed","#0891b2","#dc2626"];

function CharCard({ text, idx }: { text: string; idx: number }) {
  const ac = CARD_COLORS[idx % CARD_COLORS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05, duration: 0.35 }}
      className="relative rounded-2xl p-5 overflow-hidden"
      style={{
        backgroundColor: PAPER,
        border: `1.5px solid ${ac}22`,
        boxShadow: `0 2px 12px rgba(0,0,0,0.06), 0 0 0 0px ${ac}00`,
        transition: "box-shadow 0.2s, border-color 0.2s",
      }}
      whileHover={{ boxShadow: `0 4px 20px rgba(0,0,0,0.1), 0 0 0 2px ${ac}20` }}>
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: `linear-gradient(to right, ${ac}, ${ac}44)` }} />
      {/* Faint quote watermark */}
      <div className="absolute -top-2 right-3 font-black select-none pointer-events-none text-8xl leading-none"
        style={{ color: ac, opacity: 0.06, fontFamily: "Georgia, serif" }}>&ldquo;</div>
      <div className="text-sm leading-loose italic"
        style={{ color: INK_MED, fontFamily: "Georgia, 'Times New Roman', serif" }}>
        {text.split("\n").map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${ac}40, transparent)` }} />
        <span className="text-[10px]" style={{ color: `${ac}80`, fontFamily: "var(--font-mono)" }}>
          {String(idx + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
}

/* ══ 2-liner card ═══════════════════════════════════════════════════════ */
function DoCard({ text, idx }: { text: string; idx: number }) {
  const ac = CARD_COLORS[(idx * 3) % CARD_COLORS.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.06, duration: 0.35 }}
      className="relative rounded-2xl py-6 px-7 text-center overflow-hidden"
      style={{
        backgroundColor: PAPER,
        border: `1.5px solid ${ac}20`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
      whileHover={{ boxShadow: `0 4px 20px rgba(0,0,0,0.1)`, borderColor: `${ac}45`,
                   transition: { duration: 0.2 } }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${ac}70, transparent)` }} />
      <div className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{ background: `radial-gradient(ellipse at center, ${ac}06, transparent 70%)` }} />
      <p className="relative text-sm sm:text-base leading-loose italic"
        style={{ color: INK_MED, fontFamily: "Georgia, 'Times New Roman', serif" }}>
        {text.split("\n").map((line, i) => <span key={i} style={{ display: "block" }}>{line}</span>)}
      </p>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-full"
        style={{ background: `linear-gradient(to right, transparent, ${ac}50, transparent)` }} />
    </motion.div>
  );
}

/* ══ Page flip animation ════════════════════════════════════════════════ */
const FLIP = {
  initial: { opacity: 0, y: 16, scaleY: 0.97, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0,  scaleY: 1,    filter: "blur(0px)" },
  exit:    { opacity: 0, y: -10, scaleY: 0.98, filter: "blur(1px)" },
};

/* ══ YouTube card ═══════════════════════════════════════════════════════ */
function YTCard({ id, title, sub }: { id: string; title: string; sub: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden"
        style={{ aspectRatio: "16/9", backgroundColor: "#f0ebe0",
                 border: `1.5px solid ${SAG}22`,
                 boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border-2 animate-spin"
              style={{ borderColor: `${SAG}33`, borderTopColor: SAG }} />
          </div>
        )}
        <iframe src={`https://www.youtube.com/embed/${id}`} title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen onLoad={() => setLoaded(true)} className="w-full h-full" style={{ border: "none" }} />
      </div>
      <p className="mt-2 text-sm font-medium" style={{ color: INK_MED }}>{title}</p>
      <p className="text-xs mt-0.5" style={{ color: INK_FAINT, fontFamily: "var(--font-mono)" }}>{sub}</p>
    </div>
  );
}

/* ══ Main Page ══════════════════════════════════════════════════════════ */
export default function PoetryPage() {
  const [tab, setTab] = useState<M>("picks");
  const [sub, setSub] = useState<S>("lambi");

  const accent = ACC[tab];
  const tint   = TINT[tab];

  const TABS = [
    { id: "picks"   as M, label: "Best Picks", emoji: "⭐",  acc: "#b45309", n: PICKS.length },
    { id: "shayari" as M, label: "शायरी",      emoji: "✍️",  acc: AMB,       n: THODI.length + CHAR.length + DO.length },
    { id: "kavita"  as M, label: "कविताएं",    emoji: "📖",  acc: ROZ,       n: KAVITA.length },
    { id: "english" as M, label: "English",     emoji: "✒️",  acc: SKY,       n: ENG.length   },
    { id: "story"   as M, label: "Origin",      emoji: "🌱",  acc: SAG,       n: 0            },
  ];

  const SUBS = [
    { id: "lambi" as S, label: "थोड़ी लंबी", n: THODI.length },
    { id: "char"  as S, label: "चार मिसरे",  n: CHAR.length  },
    { id: "do"    as S, label: "दो मिसरे",   n: DO.length    },
  ];

  /* ruled paper styles */
  const ruledBg = {
    backgroundImage: `repeating-linear-gradient(transparent 0px, transparent 27px, rgba(80,100,200,0.07) 27px, rgba(80,100,200,0.07) 28px)`,
    backgroundSize: "100% 28px",
    backgroundPositionY: "12px",
    backgroundColor: tint,
  };

  return (
    <main style={{ backgroundColor: PAGE_BG, minHeight: "100vh" }}>

      {/* ── back link ── */}
      <div className="max-w-2xl mx-auto px-5 pt-4 pb-2">
        <Link href="/#library"
          className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: INK_FAINT, fontFamily: "var(--font-mono)" }}
          onMouseEnter={e => (e.currentTarget.style.color = accent)}
          onMouseLeave={e => (e.currentTarget.style.color = INK_FAINT)}>
          <ArrowLeft size={13} /> back
        </Link>
      </div>

      {/* ══ NOTEBOOK ══ */}
      <div className="max-w-2xl mx-auto px-5 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            backgroundColor: PAPER,
            boxShadow: "0 8px 40px rgba(80,50,20,0.14), 0 2px 8px rgba(80,50,20,0.08)",
            border: "1.5px solid rgba(180,150,100,0.2)",
          }}>

          {/* ── Spiral rings (animated color change) ── */}
          <motion.div animate={{ backgroundColor: `${accent}10`, borderBottomColor: `${accent}20` }}
            transition={{ duration: 0.4 }}>
            <Spiral color={accent} />
          </motion.div>

          {/* ── Cover / header ── */}
          <div className="px-7 pt-7 pb-5"
            style={{
              backgroundImage: `repeating-linear-gradient(transparent 0px, transparent 27px, rgba(80,100,200,0.06) 27px, rgba(80,100,200,0.06) 28px)`,
              backgroundSize: "100% 28px",
              backgroundPositionY: "4px",
              borderBottom: "1.5px solid rgba(180,150,100,0.12)",
              position: "relative",
            }}>
            {/* Red margin line */}
            <div className="absolute left-16 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(220,50,50,0.15) 15%, rgba(220,50,50,0.15) 85%, transparent)" }} />

            <div className="pl-8">
              {/* Tiny label */}
              <p className="text-[10px] tracking-[0.25em] uppercase mb-2"
                style={{ color: INK_FAINT, fontFamily: "var(--font-mono)" }}>
                yugal agarwal · personal notebook
              </p>

              <h1 className="font-black leading-none mb-2"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px,8vw,64px)",
                         letterSpacing: "-2px", color: INK }}>
                Poetry
              </h1>

              <p className="text-sm italic mb-5"
                style={{ color: INK_MED, fontFamily: "Georgia, serif" }}>
                "Sometimes, when I don&apos;t feel sleepy, I write."
              </p>

              {/* Clickable stat chips */}
              <div className="flex flex-wrap gap-2">
                {TABS.filter(t => t.n > 0).map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                    style={{
                      backgroundColor: tab === t.id ? `${t.acc}18` : "transparent",
                      border: `1.5px solid ${tab === t.id ? `${t.acc}50` : "rgba(150,120,80,0.2)"}`,
                      color: tab === t.id ? t.acc : INK_MED,
                      fontWeight: t.id === "picks" ? 700 : undefined,
                    }}>
                    <span>{t.emoji}</span>
                    {t.id !== "picks" && <span style={{ fontFamily: "var(--font-mono)" }}>{t.n}</span>}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Section tabs — notebook dividers ── */}
          <div className="flex border-b" style={{ borderColor: "rgba(180,150,100,0.15)" }}>
            {TABS.map(t => {
              const active = tab === t.id;
              return (
                <button key={t.id}
                  onClick={() => setTab(t.id)}
                  className="relative flex-1 py-3 text-xs font-semibold transition-all duration-250 text-center"
                  style={{
                    color:           active ? t.acc : INK_FAINT,
                    backgroundColor: active ? tint : "transparent",
                    borderRight:     "1px solid rgba(180,150,100,0.12)",
                  }}>
                  {active && (
                    <motion.div layoutId="nb-tab" className="absolute inset-x-0 bottom-0 h-0.5"
                      style={{ backgroundColor: t.acc }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }} />
                  )}
                  <span className="block text-base leading-none mb-0.5">{t.emoji}</span>
                  <span className="hidden sm:block">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Content ── */}
          <AnimatePresence mode="wait">
            <motion.div key={tab} {...FLIP}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="origin-top">

              {/* ════ BEST PICKS ═════════════════════════════ */}
              {tab === "picks" && (
                <div className="px-5 py-6 flex flex-col gap-5"
                  style={{ backgroundColor: TINT.picks }}>

                  {/* Section header */}
                  <div className="flex items-center gap-3 px-1">
                    <div>
                      <p className="text-[10px] tracking-[0.2em] uppercase font-semibold"
                        style={{ color: "#b45309", fontFamily: "var(--font-mono)" }}>
                        ⭐ personally curated
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: INK_FAINT, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                        The ones that stuck with me the most.
                      </p>
                    </div>
                  </div>

                  {/* Pick cards */}
                  {PICKS.map((pick, i) => <PickCard key={pick.title} pick={pick} idx={i} />)}

                  {/* Footer nudge */}
                  <p className="text-center text-xs pt-2" style={{ color: INK_FAINT, fontFamily: "Georgia, serif", fontStyle: "italic" }}>
                    Browse all {THODI.length + CHAR.length + DO.length + KAVITA.length + ENG.length} pieces across the tabs above ↑
                  </p>
                </div>
              )}

              {/* ════ SHAYARI ════════════════════════════════ */}
              {tab === "shayari" && (
                <div>
                  {/* Sub-tabs */}
                  <div className="flex gap-1 px-5 py-3 border-b"
                    style={{ borderColor: "rgba(180,150,100,0.1)", backgroundColor: "#fff9e8" }}>
                    {SUBS.map(s => (
                      <button key={s.id} onClick={() => setSub(s.id)}
                        className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
                        style={{
                          color:           sub === s.id ? AMB : INK_FAINT,
                          backgroundColor: sub === s.id ? `${AMB}18` : "transparent",
                          border:          `1px solid ${sub === s.id ? `${AMB}45` : "rgba(180,150,100,0.18)"}`,
                        }}>
                        {s.label}
                        <span className="ml-1" style={{ fontFamily: "var(--font-mono)", opacity: 0.6 }}>{s.n}</span>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={sub} {...FLIP} transition={{ duration: 0.22 }}>

                      {/* Thodi Lambi */}
                      {sub === "lambi" && (
                        <div className="px-6 py-2" style={ruledBg}>
                          {/* Red margin */}
                          <div className="relative">
                            <div className="absolute left-7 top-0 bottom-0 w-px"
                              style={{ background: "rgba(220,50,50,0.12)" }} />
                            <div className="pl-9">
                              {THODI.map((p, i) => <PoemCard key={p.title} title={p.title} content={p.content} accent={AMB} idx={i} />)}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Char Misre */}
                      {sub === "char" && (
                        <div className="p-5" style={{ backgroundColor: tint }}>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {CHAR.map((t, i) => <CharCard key={i} text={t} idx={i} />)}
                          </div>
                        </div>
                      )}

                      {/* Do Misre */}
                      {sub === "do" && (
                        <div className="p-5" style={{ backgroundColor: tint }}>
                          <div className="flex flex-col gap-3">
                            {DO.map((t, i) => <DoCard key={i} text={t} idx={i} />)}
                          </div>
                        </div>
                      )}

                    </motion.div>
                  </AnimatePresence>
                </div>
              )}

              {/* ════ KAVITAYEIN ═════════════════════════════ */}
              {tab === "kavita" && (
                <div className="px-6 py-2" style={ruledBg}>
                  <div className="relative">
                    <div className="absolute left-7 top-0 bottom-0 w-px"
                      style={{ background: "rgba(220,50,50,0.12)" }} />
                    <div className="pl-9">
                      {KAVITA.map((p, i) => (
                        <PoemCard key={p.title} title={p.title} content={p.content} accent={ROZ} year={p.year} idx={i} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ════ ENGLISH ════════════════════════════════ */}
              {tab === "english" && (
                <div className="px-6 py-2" style={ruledBg}>
                  <div className="relative">
                    <div className="absolute left-7 top-0 bottom-0 w-px"
                      style={{ background: "rgba(220,50,50,0.12)" }} />
                    <div className="pl-9">
                      {ENG.map((p, i) => (
                        <PoemCard key={p.title} title={p.title} content={p.content} accent={SKY} idx={i} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ════ ORIGIN STORY ═══════════════════════════ */}
              {tab === "story" && (
                <div className="p-6 flex flex-col gap-6" style={{ backgroundColor: TINT.story }}>

                  {/* Story card */}
                  <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4 }}>
                    <div className="rounded-2xl p-6"
                      style={{ backgroundColor: PAPER, border: `1.5px solid ${SAG}22`,
                               borderLeft: `3px solid ${SAG}`, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                      <p className="text-[10px] tracking-widest uppercase mb-3"
                        style={{ color: SAG, fontFamily: "var(--font-mono)" }}>
                        // how it began
                      </p>
                      <h2 className="text-lg font-bold mb-4"
                        style={{ color: INK, fontFamily: "var(--font-display)" }}>
                        My Beginning of Writing Poems in Hindi
                      </h2>
                      <div className="space-y-3 text-sm leading-relaxed italic"
                        style={{ color: INK_MED, fontFamily: "Georgia, serif" }}>
                        <p>Honestly, I don&apos;t remember when I actually started writing poems. I have lost many of my diaries where I used to write them, and I am not good at remembering them.</p>
                        <p>But I have a name for my first official Hindi poem that I wrote and even recited — for the first time ever — in <strong style={{color:INK,fontStyle:"normal"}}>2014</strong>, when I was in <strong style={{color:INK,fontStyle:"normal"}}>9th Standard</strong> at my school.</p>
                        <p>The poem was on the theme of <strong style={{color:SAG,fontStyle:"normal"}}>&lsquo;women empowerment&rsquo;</strong>. I received <strong style={{color:INK,fontStyle:"normal"}}>1st Prize</strong> — which might be the reason that motivated me to keep writing. Though I don&apos;t write much, honestly.</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Featured poem */}
                  <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.1 }}>
                    <div className="rounded-2xl overflow-hidden"
                      style={{ backgroundColor: PAPER, border: `1.5px solid ${SAG}22`,
                               boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                      <div className="h-1" style={{ background: `linear-gradient(to right, ${SAG}, ${SAG}44)` }} />
                      <div className="px-7 py-7"
                        style={{
                          backgroundImage: `repeating-linear-gradient(transparent 0px, transparent 27px, rgba(80,100,200,0.06) 27px, rgba(80,100,200,0.06) 28px)`,
                          backgroundSize: "100% 28px",
                        }}>
                        <h2 className="text-xl font-black text-center mb-1"
                          style={{ fontFamily: "var(--font-display)", color: INK }}>
                          &ldquo;समाज में आई आँधी है&rdquo;
                        </h2>
                        <p className="text-center text-xs mb-6"
                          style={{ color: INK_FAINT, fontFamily: "var(--font-mono)" }}>
                          — युगल अग्रवाल, 2014 · प्रथम पुरस्कार
                        </p>
                        <div className="text-center space-y-5 text-sm leading-loose italic"
                          style={{ color: INK_MED, fontFamily: "Georgia, serif" }}>
                          {[
                            `समाज में आई आँधी है,\nजननी बनी मर्दानी है,\nकोमल कोमल हाथो को अब - चूल्हा नहीं,\nअपनी किस्मत सुलगानी है।`,
                            `कलम होगी हाथ में,\nपुस्तक साथ में,\nमन आत्मविश्वास में,\nबुलंदी आवाज में,\nतभी बनेगी बात ये।`,
                            `नहीं आएगा मसीहा कोई,\nसोच बदलने समाज की,\nबदलेगी जब सोच हमारी,\nजीतेगी फिर भारतीय नारी।`,
                            `समाज में आई आँधी है,\nजननी बनी मर्दानी है।`,
                          ].map((stanza, i) => (
                            <div key={i}>
                              {stanza.split("\n").map((line, j) => <span key={j} style={{display:"block"}}>{line}</span>)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Audio poetry */}
                  <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.2 }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Mic size={13} style={{ color: SAG }} />
                      <p className="text-xs font-medium" style={{ color: SAG }}>Audio Poetry · 2021</p>
                      <p className="text-xs" style={{ color: INK_FAINT }}>— on a whim 😄</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <YTCard id="V3AuA9tnozE" title="Kaisi Ho? || Audio Poetry" sub="Poemwala · 2021" />
                      <YTCard id="N-9uJe2LfR4" title="Jaanti Ho Na? || Audio Poetry" sub="Poemwala · 2021" />
                    </div>
                  </motion.div>

                </div>
              )}

            </motion.div>
          </AnimatePresence>

          {/* ── Notebook footer ── */}
          <div className="px-7 py-4 border-t text-center"
            style={{ borderColor: "rgba(180,150,100,0.12)", backgroundColor: `${accent}08` }}>
            <p className="text-xs italic" style={{ color: INK_FAINT, fontFamily: "Georgia, serif" }}>
              All originals © Yugal Agarwal &nbsp;·&nbsp; Please credit if you share 🙏
            </p>
          </div>

        </motion.div>
      </div>
    </main>
  );
}
