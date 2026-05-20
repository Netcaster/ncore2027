import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search, MapPin, Calendar, Hotel, Music, Utensils, Trophy,
  Users, ShieldCheck, Building2, Sparkles, ArrowRight, Mic2,
  Globe2, Bot, Handshake, Ticket, Plane,
} from "lucide-react";

// ── Design tokens extracted from NCORE VEGAS ARIA 2027 2.pptx ─
const C = {
  bg:     "#1a2f3d",
  panel:  "#274552",
  teal:   "#17a186",
  orange: "#f39e14",
  red:    "#c13a2c",
  lime:   "#92d050",
  blue:   "#2a81ba",
};

const nav = ["Overview", "Destination", "Program", "Venue", "NCORE Live", "NALU", "Partners"];

const faqs = [
  { q: "Is there an NCORE conference in 2026?",       a: "No. The current positioning states there will be no NCORE conference held in 2026, with the next expected conference in 2027." },
  { q: "Where is NCORE 2027 being positioned?",       a: "TPG Worldwide has secured a venue hold at ARIA Resort & Casino in Las Vegas for the NCORE 2027 destination program." },
  { q: "What is NCORE?",                              a: "NCORE is a leading higher education forum focused on race, ethnicity, cultural diversity, identity, access, opportunity, cross-cultural understanding, and institutional success." },
  { q: "What will NALU answer?",                      a: "NALU will operate as the event information engine for NCORE, ARIA, Las Vegas travel, dining, entertainment, sports, program updates, venue logistics, and attendee support." },
  { q: "What is the TPG Live / venue hold layer?",    a: "It is TPG Worldwide's event infrastructure layer for venue holds, entertainment overlays, destination programming, hospitality, sponsorship, and future conference activation pipelines." },
];

const programTiles = [
  { icon: Users,       title: "Higher Education Forum", copy: "Sessions, panels, workshops, and collaborative dialogue for institutions, faculty, staff, students, and DEI leadership." },
  { icon: ShieldCheck, title: "Access + Opportunity",   copy: "Programming focused on institutional pathways, student success, underrepresented populations, and inclusive systems." },
  { icon: Globe2,      title: "Identity + Culture",     copy: "Content tracks may extend beyond race and ethnicity into gender, first-generation experiences, LGBTQ+ issues, disability, culture, and human identity." },
  { icon: Sparkles,    title: "Destination Experience", copy: "Las Vegas hospitality, dining, sports, entertainment, tourism, and curated attendee experiences connected through NALU." },
];

const venueStack = [
  { label: "Venue Hold",     value: "ARIA Las Vegas" },
  { label: "Host City",      value: "Las Vegas, Nevada" },
  { label: "Program Year",   value: "2027" },
  { label: "Platform Layer", value: "TPG Worldwide + NALU" },
];

// ── Bubble cluster — replicates the PPTX slide 3/4 visual ─────
function BubbleCluster({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 720" className={className} aria-hidden="true">
      {/* ghost / muted circles */}
      <circle cx="380" cy="55"  r="28" fill="rgba(255,255,255,0.09)" />
      <circle cx="440" cy="120" r="42" fill="rgba(255,255,255,0.07)" />
      <circle cx="355" cy="190" r="20" fill="rgba(255,255,255,0.09)" />
      <circle cx="445" cy="255" r="30" fill="rgba(255,255,255,0.06)" />
      <circle cx="305" cy="310" r="17" fill="rgba(255,255,255,0.09)" />
      <circle cx="390" cy="355" r="13" fill="rgba(255,255,255,0.07)" />
      <circle cx="442" cy="415" r="19" fill="rgba(255,255,255,0.06)" />
      <circle cx="315" cy="480" r="15" fill="rgba(255,255,255,0.08)" />
      <circle cx="415" cy="535" r="11" fill="rgba(255,255,255,0.06)" />
      <circle cx="340" cy="610" r="14" fill="rgba(255,255,255,0.07)" />
      {/* main accent circles */}
      <circle cx="355" cy="400" r="82"  fill={C.teal} />
      <circle cx="275" cy="520" r="64"  fill={C.orange} />
      <circle cx="415" cy="600" r="94"  fill={C.red} />
      {/* white connector lines + dots */}
      <line x1="90"  y1="385" x2="275" y2="400" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
      <circle cx="275" cy="400" r="3" fill="white" opacity="0.65" />
      <line x1="70"  y1="510" x2="213" y2="520" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
      <circle cx="213" cy="520" r="3" fill="white" opacity="0.65" />
      <line x1="100" y1="595" x2="323" y2="600" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
      <circle cx="323" cy="600" r="3" fill="white" opacity="0.65" />
    </svg>
  );
}

// ── Google Maps embed of ARIA Las Vegas ───────────────────────
function DestinationMapCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-white/10 p-6 shadow-2xl"
      style={{ background: C.panel }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: C.teal }}>
            Las Vegas Destination Map
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            ARIA Resort &amp; Casino, Las Vegas
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
            NCORE 2027 is positioned at the ARIA Resort &amp; Casino on the Las Vegas Strip — a AAA Five Diamond property anchoring conference programming, hospitality, and TPG Live activations.
          </p>
        </div>
        <MapPin className="h-8 w-8 shrink-0" style={{ color: C.orange }} />
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl border border-white/10" style={{ height: 400 }}>
        <iframe
          title="ARIA Resort Casino Las Vegas"
          src="https://maps.google.com/maps?q=ARIA+Resort+Casino+Las+Vegas&output=embed&z=15"
          width="100%"
          height="100%"
          className="border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}

// ── NALU demo panel ───────────────────────────────────────────
function NaluPanel() {
  const [query, setQuery] = useState("Where should I eat near ARIA after the NCORE keynote?");
  const answer = useMemo(() => {
    if (query.toLowerCase().includes("aria"))     return "NALU can answer venue logistics, room block guidance, meeting locations, attendee flow, dining near ARIA, transportation, accessibility, entertainment, and curated Las Vegas options.";
    if (query.toLowerCase().includes("register")) return "NALU can route users to official registration information when released, explain deadlines, application steps, travel planning, and attendee support pathways.";
    if (query.toLowerCase().includes("program"))  return "NALU can explain expected program tracks, speakers, sessions, partner activations, student/faculty engagement, and NCORE Live updates as they become available.";
    return "NALU will be trained as the NCORE 2027 information concierge: event Q&A, ARIA venue support, Las Vegas destination intelligence, travel, food, sports, entertainment, and TPG partner activations.";
  }, [query]);

  return (
    <div
      className="rounded-[2rem] border p-6 shadow-2xl"
      style={{ borderColor: `${C.teal}40`, background: `${C.teal}18` }}
    >
      <div className="flex items-center gap-3">
        <div className="rounded-2xl p-3" style={{ background: `${C.teal}28`, color: C.teal }}>
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: C.teal }}>NALU Query Engine</p>
          <h3 className="text-2xl font-semibold text-white">Ask anything about NCORE 2027</h3>
        </div>
      </div>
      <div className="mt-6 flex gap-3 rounded-2xl border border-white/10 p-3" style={{ background: C.bg }}>
        <Search className="mt-3 h-5 w-5 shrink-0 text-slate-400" />
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-24 w-full resize-none bg-transparent p-2 text-sm text-white outline-none placeholder:text-slate-500"
          placeholder="Ask NALU about NCORE, ARIA, Las Vegas, dining, entertainment, sports, travel, or the 2027 program…"
        />
      </div>
      <div className="mt-4 rounded-2xl bg-white/5 p-4 text-sm leading-6 text-slate-200">
        <span className="font-semibold" style={{ color: C.teal }}>NALU Response Preview:</span>{" "}
        {answer}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function Ncore2027Microsite() {
  return (
    <div className="min-h-screen text-white" style={{ background: C.bg }}>

      {/* ── Sticky nav ──────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl"
        style={{ background: `${C.panel}e8` }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white font-black text-slate-950">N</div>
            <div>
              <p className="text-sm font-bold tracking-wide">NCORE 2027</p>
              <p className="text-xs text-slate-400">TPG Worldwide Destination Platform</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>
          <a
            href="#nalu"
            className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
            style={{ background: C.teal }}
          >
            Ask NALU
          </a>
        </div>
      </header>

      <main>

        {/* ── Hero — ARIA photo background ────────────────────── */}
        <section id="overview" className="relative overflow-hidden">

          {/* ARIA Las Vegas photo fill */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1605833556294-ea5c2a2d36f2?auto=format&fit=crop&w=1920&q=80"
              alt="ARIA Resort Las Vegas"
              className="h-full w-full object-cover object-center"
            />
            {/* gradient: strong dark on left for text legibility, fades right, full bleed to bg at bottom */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, ${C.panel}f2 30%, ${C.panel}b0 60%, ${C.panel}70 100%), linear-gradient(to bottom, transparent 50%, ${C.bg} 100%)`,
              }}
            />
          </div>

          {/* Bubble cluster — right edge decoration from PPTX */}
          <BubbleCluster className="pointer-events-none absolute -right-12 top-0 h-full w-auto max-w-xs opacity-85 lg:max-w-sm" />

          {/* Hero content */}
          <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-6 py-28 lg:grid-cols-[1.15fr_.85fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm"
                style={{ color: C.teal }}
              >
                <Calendar className="h-4 w-4" />
                No 2026 conference • Next expected event: 2027
              </div>
              <h1 className="text-5xl font-black tracking-tight md:text-7xl">
                NCORE 2027 at{" "}
                <span
                  style={{
                    background: `linear-gradient(to right, ${C.teal}, ${C.orange})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ARIA Las Vegas
                </span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
                A TPG Worldwide microsite for general NCORE information, Las Vegas destination readiness, ARIA venue support, future venue holds, TPG Live event programming, and NALU-powered attendee intelligence.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#destination"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
                  style={{ background: C.teal }}
                >
                  Explore Destination <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#ncore-live"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm"
                >
                  TPG Live Layer <Music className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: .95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .7, delay: .12 }}
              className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-sm"
            >
              {venueStack.map((item) => (
                <div key={item.label} className="rounded-3xl p-5" style={{ background: `${C.panel}cc` }}>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Destination map ──────────────────────────────────── */}
        <section id="destination" className="mx-auto max-w-7xl px-6 py-12">
          <DestinationMapCard />
        </section>

        {/* ── Program tiles ────────────────────────────────────── */}
        <section id="program" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: C.orange }}>
              General NCORE Information
            </p>
            <h2 className="mt-2 text-4xl font-bold">Conference positioning</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {programTiles.map(({ icon: Icon, title, copy }, idx) => {
              const accent = [C.teal, C.orange, C.red, C.lime][idx];
              return (
                <div
                  key={title}
                  className="rounded-[2rem] border border-white/10 p-6"
                  style={{ background: C.panel }}
                >
                  <Icon className="h-8 w-8" style={{ color: accent }} />
                  <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Venue ────────────────────────────────────────────── */}
        <section id="venue" className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-3">
          <div
            className="rounded-[2rem] border border-white/10 p-7 lg:col-span-2"
            style={{ background: C.panel }}
          >
            <div className="flex items-center gap-3" style={{ color: C.teal }}>
              <Hotel className="h-6 w-6" />
              <p className="text-xs uppercase tracking-[0.3em]">ARIA Venue Hold</p>
            </div>
            <h2 className="mt-4 text-4xl font-bold">Premium convention platform on the Las Vegas Strip</h2>
            <p className="mt-4 leading-7 text-slate-300">
              The ARIA layer should function as the anchor for rooms, meetings, breakouts, VIP activations, partner hospitality, private receptions, sponsor lounges, speaker support, and TPG-managed event overlays.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {["Convention + Ballrooms", "Breakout Sessions", "VIP Hospitality"].map((x) => (
                <div key={x} className="rounded-2xl p-4 text-sm font-semibold" style={{ background: `${C.bg}dd` }}>{x}</div>
              ))}
            </div>
          </div>
          <div
            className="rounded-[2rem] border p-7"
            style={{ background: `linear-gradient(135deg, ${C.red}28, ${C.orange}14)`, borderColor: `${C.orange}35` }}
          >
            <Building2 className="h-8 w-8" style={{ color: C.orange }} />
            <h3 className="mt-4 text-2xl font-bold">Future Venue Holds</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Build the AEG Live-style inventory pipeline: venue holds, room blocks, sponsor inventory, branded activations, ticketing, destination programming, and event monetization.
            </p>
          </div>
        </section>

        {/* ── NCORE Live ───────────────────────────────────────── */}
        <section id="ncore-live" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2.5rem] border border-white/10 p-8 shadow-2xl" style={{ background: C.panel }}>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: C.teal }}>
              TPG / AEG Live Style + TPG-LiveNation Event Side
            </p>
            <h2 className="mt-3 text-4xl font-bold">NCORE Live facilitated by Majestra</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                { icon: Mic2,      title: "Speaker + Mainstage", copy: "Keynotes, panels, plenaries, sponsored sessions, fireside chats, and cultural programming.",                                                                   color: C.teal   },
                { icon: Ticket,    title: "Event Monetization",  copy: "Partner packages, venue inventory, hospitality, premium access, sponsorship, exhibit, and curated experience revenue.",                                         color: C.orange },
                { icon: Handshake, title: "Partner Pipeline",    copy: "Majestra-facilitated production, venue procurement, brand activation, artist/live event alignment, and institutional sponsorship.", color: C.red    },
              ].map(({ icon: Icon, title, copy, color }) => (
                <div key={title} className="rounded-[2rem] p-6" style={{ background: C.bg }}>
                  <Icon className="h-7 w-7" style={{ color }} />
                  <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NALU section ─────────────────────────────────────── */}
        <section id="nalu" className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: C.teal }}>Attendee Intelligence</p>
            <h2 className="mt-3 text-4xl font-bold">NALU becomes the always-on NCORE concierge.</h2>
            <p className="mt-4 leading-7 text-slate-300">
              NALU should sit across the microsite as a persistent assistant: answering event questions, routing attendees, explaining program details, surfacing Vegas recommendations, and supporting partners, sponsors, students, faculty, exhibitors, and executives.
            </p>
            <div className="mt-6 grid gap-3">
              {[Plane, Utensils, Trophy, Music].map((Icon, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 p-4"
                  style={{ background: C.panel }}
                >
                  <Icon className="h-5 w-5" style={{ color: C.teal }} />
                  <span className="text-sm text-slate-200">Travel, dining, sports, entertainment, and destination guidance</span>
                </div>
              ))}
            </div>
          </div>
          <NaluPanel />
        </section>

        {/* ── Partners + FAQ ───────────────────────────────────── */}
        <section id="partners" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 p-7" style={{ background: C.panel }}>
              <h2 className="text-3xl font-bold">Revenue + alignment opportunities</h2>
              <div className="mt-6 grid gap-3 text-sm text-slate-300">
                {[
                  "Official housing and room block management",
                  "Destination sponsorship packages",
                  "Exhibitor and institutional partner packages",
                  "VIP receptions and private hosted experiences",
                  "Dining, entertainment, sports, and tourism affiliate layers",
                  "NALU sponsored answers and concierge intelligence",
                  "Future venue hold pipeline with TPG Live / Majestra",
                  "Media, content, recap, and streaming-lite programming",
                ].map((x) => (
                  <div key={x} className="rounded-2xl p-4" style={{ background: C.bg }}>{x}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 p-7" style={{ background: C.panel }}>
              <h2 className="text-3xl font-bold">FAQ preview</h2>
              <div className="mt-6 space-y-3">
                {faqs.map((item) => (
                  <details key={item.q} className="rounded-2xl p-4" style={{ background: C.bg }}>
                    <summary className="cursor-pointer font-semibold text-white">{item.q}</summary>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-slate-400">
        <p>NCORE 2027 Destination Microsite Concept • TPG Worldwide • ARIA Las Vegas • NALU Query Engine • Majestra-Facilitated Live Event Layer</p>
      </footer>
    </div>
  );
}
