"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowLeft, Feather, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRef, ReactNode, useState } from "react";

const A = "#60a5fa"; // sky blue accent

/* ─── Scroll reveal ─────────────────────────────────────────────────── */
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
function PoemLines({ text, accentColor = A }: { text: string; accentColor?: string }) {
  const stanzas = text.split("\n\n");
  return (
    <div className="text-sm sm:text-base leading-loose"
      style={{ color: "rgba(255,255,255,0.72)", fontStyle: "italic" }}>
      {stanzas.map((stanza, si) => (
        <div key={si}>
          <div>
            {stanza.split("\n").map((line, li) => (
              <span key={li} style={{ display: "block" }}>{line || " "}</span>
            ))}
          </div>
          {si < stanzas.length - 1 && (
            <div className="text-center my-4 text-xs select-none"
              style={{ opacity: 0.3, color: accentColor, letterSpacing: "0.4em", fontStyle: "normal" }}>
              ✦
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── Mood accent per poem ───────────────────────────────────────────── */
const MOODS: Record<string, string> = {
  "Love Exchange":                 "#f43f5e",
  "No harm in watching the rain!": "#60a5fa",
  "Right from the start!":         "#34d399",
  "Loving you, without hoping!":   "#a78bfa",
  "Until we die!":                 "#f59e0b",
  "I am a Journey":                "#38bdf8",
  "Only Wish":                     "#fb923c",
  "Love-Love":                     "#ec4899",
  "Fear":                          "#c084fc",
  "Ended up with Cold!":           "#94a3b8",
  "Soar Higher":                   "#4ade80",
  "Song that I prefer!":           "#fbbf24",
  "You being mine!":               "#f472b6",
  "Drop of Dew":                   "#2dd4bf",
  "Undone":                        "#818cf8",
  "People People went away!":      "#fb7185",
};
const mood = (t: string) => MOODS[t] ?? A;

/* ══════════════════════════ DATA ══════════════════════════════════════ */

const POEMS: { title: string; content: string }[] = [
  {
    title: "Love Exchange",
    content:
`He loved her deeply, with all his heart,
Their bond was strong, right from the start,
But one day she said, "I don't feel the same,"
And left him wondering, who was to blame.

They tried to be friends, and it seemed to work,
But his heart still ached, it was a constant hurt,
He couldn't understand how it could all change,
And if it was real or just an act, a love exchange.

Was their love true, or just a game,
A show put on, for personal fame,
He questioned everything, every memory they shared,
And wondered if she ever truly cared.

He wondered if their love was real,
Or just a game, a mere ordeal,
Did she ever feel the way he did,
Or was his love just something she hid?

But still, his heart yearned for her touch,
For her love, that meant so much,
He couldn't help but love her still,
Despite the heartache and the better pill.

He knew that she didn't feel the same,
But his love for her would never wane,
And he hoped that someday she'd see,
The love he had for her was real, indeed.`,
  },
  {
    title: "No harm in watching the rain!",
    content:
`Once a beautiful sky with clouds so fair,
Suddenly turned dark, like a nightmare.
The wind howled and the lightning flashed,
The storm raged on, the sky was mashed.

Just like the storm, your love turned black,
The beauty faded, it didn't come back.
What once was warm, turned cold as ice,
Love was lost, like a roll of the dice.

So cherish love when it's bright and true,
Before it turns dark, and leaves you blue.
Hold on tight, with all your might,
And never let it slip, out of sight.

The skies will clear, and the storm will pass,
The sun will shine, on the dewy grass.

The day will come, and the vibe will match again,
Even if it doesn't, No harm in watching the rain.`,
  },
  {
    title: "Right from the start!",
    content:
`Life's a journey filled with twists and turns,
With ups and downs and lessons to be learned.

Misery and happiness, they come and go,
And leave behind a story that we all know.

We learn to dance in life's rough weather,
And find joy in the darkest of days, together.

For in the end, It's not the pain or the glee,
But how we face it, that sets us all free.

But still, I hold on to hope and to my dreams,
Believing that love, like a ray of sunshine, beams.

For someday, my heart will find its missing part,
And I'll know the love, right from the start!`,
  },
  {
    title: "Loving you, without hoping!",
    content:
`Loving you without hoping is tough
but easier than moving on
But still, there are times when
it's hard to hold on
When doubts and fears start
to creep in and dawn

And we wonder if our love is enough to survive
But then I think of all the reasons that I'm alive

So I vow to love you, with all that I am
To hold you close and be your biggest fan

For me, you are the one
who makes my heart skip a beat
And loving you, without hoping is
painful but worthy damn so sweet.`,
  },
  {
    title: "Until we die!",
    content:
`With candlelight & ocean breeze,
Together we'll create memories,
The waves glide by as we dine,
With you my love, all is just fine.

Your hair swings gently with the air,
I play with them without any care.
This moment's perfect, just you and I,
Together forever until we die.`,
  },
  {
    title: "I am a Journey",
    content:
`I am a journey, not sure where I'll end
Will I find you at my destination, my friend?

I set out on this path with hope in my heart
But the road ahead is long and the journey is hard

I'll keep you close in my thoughts as I roam
Hoping that our paths will soon find a home

So I'll keep moving forward, one step at a time
Trusting that our paths will one day entwine

I am a journey, with no certain end
But I'll keep searching for you, my dear friend!`,
  },
  {
    title: "Only Wish",
    content:
`I am not just your well-wisher,
But you are my only-wish,
With you by my side,
I feel so blessed and rich.

In your happiness, I find my own,
In your sorrows, I feel alone,
With you, my heart sings,
Without you, it just mourns.

I will wait for that star to fall,
No matter how long my eye itch,
I am not just your well-wisher,
But you are my only-wish!`,
  },
  {
    title: "Love-Love",
    content:
`I don't want to win from you
I don't wish to lose from you

Can't we keep our score to "Love-Love"
known the journey of forever be "rough-rough".

If I hit the birdie a little high
Just pass it back please don't cry.

If by mistake the birdie falls in court of you,
we will smash the ground like any kid would do.

Still we'll keep our score to "Love-Love" & Love
Forgetting the fall & point to play UP UP & Above!`,
  },
  {
    title: "Fear",
    content:
`I wish you'd trust in
our love's pure might,
And set sail on a journey
that's looking so bright.

But you chose the road
without care to drive,
Afraid of the small stream
that's not tough to thrive.

You said you loved me,
but now I see,
Your fear is what's
standing in between.

So come out brave,
let go of that fear,
Together let's embark
on this adventure, my dear.`,
  },
  {
    title: "Ended up with Cold!",
    content:
`I met her on a sunny day
My heart skipped a beat in way

We walked and talked,
she laughed and smiled
I knew then, my love for her
would never be exiled.

We danced together,
in the warm sunshine
My happiness,
like a bottle of fine wine.

But then the clouds
grew dark and grey
And the rain came
pouring down to play.

I had no umbrella, but
she was with a raincoat,
We danced together, but
I ended up with cold.

She made distance,
not to catch my cold
And said goodbye,
with a hand to hold,
I knew then,
it was done
But my love for her,
still burns like the sun.`,
  },
  {
    title: "Soar Higher",
    content:
`I promise you, my love to be true,
With open arms, my world I'll give to you.

Choose your path, your heart's desire,
With you by my side, we'll soar higher.`,
  },
  {
    title: "Song that I prefer!",
    content:
`Amidst the noise and vibrant throngs,
My eyes and ears seek only her.
Though music fills the air around,
She's the only song that I prefer.`,
  },
  {
    title: "You being mine!",
    content:
`Loving you is like my daily dream,
But loved by you was "nirvana" theme.

My feelings and effort, I hope you see,
For winning you back, is my destiny.

Your eyes and memory, I hope they hold,
The love and care that never grows old.

My efforts are not for show,
A natural flow of love, that will never slow.

Even if fate does not align,
I'll love the thought of you being mine.`,
  },
  {
    title: "Drop of Dew",
    content:
`I'll show my love with actions, not with words,
With effortless grace, Not with expressions in herd.

I'll water the seed of love, I've planted deep,
And hope that one day, it will sprout and leap.

I'll tend to it with care, and watch it grow,
And hope that you'll see it, and come to know,
That what I feel for you, is more than true,
As if I am any leaf, And you drop of dew!`,
  },
  {
    title: "Undone",
    content:
`Two hearts entwined, in a love so true and pure
A bond so strong, it could forever endure.

Two souls in perfect harmony, a dance so divine
Their love was the envy, of all who saw them shine.

But destiny wanted to play, something changed in one
Out of blue all of the sudden, the rosy reds turned undone.

The love that once burned, began to fade away
Leaving the other, in a state of disarray.

The one who was left, couldn't understand why
The love of their life, no longer met their eye.

They tried to hold on, to the love that was there
But the other had moved on, as if it's a game called dare.

The love they shared, now a distant memory
Left behind the lover, In a single character story.

They realize the end but can't help, but to still love and miss,
the person who left, who once shared the same bliss.

It's a hard truth to accept, and a harder one to mend
that one's feelings undone, while the other's still blend!`,
  },
  {
    title: "People People went away!",
    content:
`Life is a building with a sway,
Few floors up and more down stay,
Some people you met in life elevator
Some in the stairs or the arena way.

Your peeps whom you love today,
Will left you in a random floor someday,
Some will come to rescue your pain
& you'll shout: people people stay away.

Life is a building with a sway,
Few floors up and more down stay,
You can't see in black and white
Every moment is a shade of grey.

You get locked in anxiety clay,
You're shouting: people people stay away.
Your people know to water your clay,
To set you free with fun ball to play.

You now loving your black trauma walls,
Want you to be buried in their great fall.
Your people know to water your clay,
Just talk to them and jump your sad hall.

Life is a building with a sway,
Few floors up and more down stay,
You have to shout heal me mate,
Your peeps will run to hug you tight
Whom you said to stay away!`,
  },
];

/* ══════════════════════════ PAGE ══════════════════════════════════════ */
export default function EnglishPoemsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <main className="min-h-screen" style={{ background: "#06030f" }}>

      {/* ── Ambient glows ── */}
      <div className="fixed pointer-events-none inset-0 overflow-hidden" aria-hidden>
        <div style={{
          position: "absolute", top: "-10%", left: "35%",
          width: 700, height: 500,
          background: `radial-gradient(ellipse, ${A}0c 0%, transparent 65%)`,
        }} />
        <div style={{
          position: "absolute", bottom: "15%", right: "-5%",
          width: 400, height: 400,
          background: `radial-gradient(ellipse, rgba(244,63,94,0.04) 0%, transparent 65%)`,
        }} />
      </div>

      {/* ── Top nav ── */}
      <div className="sticky top-0 z-50 border-b"
        style={{ background: "rgba(6,3,15,0.92)", borderColor: `${A}18`, backdropFilter: "blur(24px)" }}>
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/library/poetry"
            className="inline-flex items-center gap-2 text-sm transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}
            onMouseEnter={e => (e.currentTarget.style.color = A)}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
            <ArrowLeft size={14} /> Back
          </Link>
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.12)", fontFamily: "var(--font-mono)" }}>
            english poems · yugal agarwal
          </span>
        </div>
      </div>

      {/* ══ HERO ══ */}
      <div className="relative overflow-hidden max-w-3xl mx-auto px-6 pt-14 sm:pt-20 pb-10">

        {/* Watermark */}
        <div className="absolute top-0 right-0 font-black leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(80px, 20vw, 160px)", color: A, opacity: 0.03,
                   fontFamily: "var(--font-display)", right: "16px", top: "8px" }}>
          poems
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: `${A}12`, border: `1px solid ${A}30` }}>
            <Feather size={11} style={{ color: A }} />
            <span className="text-xs" style={{ color: A, fontFamily: "var(--font-mono)" }}>English Poems</span>
          </div>

          <h1 className="font-black leading-none mb-3"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,8vw,68px)",
                     letterSpacing: "-2.5px", color: "rgba(255,255,255,0.93)" }}>
            Words in English,<br />
            <span style={{ color: A }}>straight from the soul.</span>
          </h1>

          <p className="text-sm leading-relaxed mb-6"
            style={{ color: "rgba(255,255,255,0.3)", maxWidth: "460px" }}>
            About 1 in 10 times I write in English. Turns out they don&apos;t sound all that bad.
          </p>

          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black" style={{ color: A, fontFamily: "var(--font-display)" }}>
              {POEMS.length}
            </span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>
              poems
            </span>
          </div>
        </motion.div>
      </div>

      {/* ══ POEM LIST ══ */}
      <div className="max-w-3xl mx-auto px-6 pb-28">
        <Fade>
          <div className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            {POEMS.map((poem, i) => {
              const m    = mood(poem.title);
              const open = openIdx === i;
              return (
                <div key={i}>
                  {/* Row */}
                  <button
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="w-full flex items-center gap-3 px-5 py-4 text-left transition-all duration-150"
                    style={{
                      background:   open ? `${m}0c` : "transparent",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                    onMouseEnter={e => { if (!open) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)"; }}
                    onMouseLeave={e => { if (!open) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    {/* Mood dot */}
                    <div className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5 transition-all duration-200"
                      style={{ background: m, opacity: open ? 1 : 0.45,
                               boxShadow: open ? `0 0 8px ${m}` : "none" }} />

                    <span className="flex-1 text-sm sm:text-base"
                      style={{ color: open ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.52)" }}>
                      {poem.title}
                    </span>

                    <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
                      <ChevronDown size={14} style={{ color: open ? m : "rgba(255,255,255,0.18)" }} />
                    </motion.div>
                  </button>

                  {/* Expanded poem */}
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
                          {/* Left mood bar */}
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                            style={{ background: `linear-gradient(to bottom, transparent, ${m}80, transparent)` }} />
                          <PoemLines text={poem.content} accentColor={m} />
                          <p className="mt-6 text-xs" style={{ color: `${m}55`, fontFamily: "var(--font-mono)" }}>
                            — Yugal Agarwal
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Fade>
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
