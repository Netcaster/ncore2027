import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { NeuralWidget } from "./NeuralWidget";
import {
  Search, MapPin, Calendar, Hotel, Music, Utensils, Trophy,
  Users, ShieldCheck, Building2, Sparkles, ArrowRight, Mic2,
  Globe2, Bot, Handshake, Ticket, Plane, Sun, Moon,
} from "lucide-react";

// ── PPTX accent colours (same in both modes) ─────────────────
const A = {
  teal:   "#17a186",
  orange: "#f39e14",
  red:    "#c13a2c",
  lime:   "#92d050",
  blue:   "#2a81ba",
};

// ── Day / Night theme tokens ──────────────────────────────────
const DARK = {
  bg:          "#1a2f3d",
  panel:       "#274552",
  panelAlt:    "#1e3a4a",
  text:        "#ffffff",
  muted:       "#94a3b8",
  subtleMuted: "#64748b",
  border:      "rgba(255,255,255,0.10)",
  cardInner:   "rgba(26,47,61,0.85)",
  navBg:       "rgba(39,69,82,0.92)",
  heroL:       "rgba(39,69,82,0.93)",
  heroR:       "rgba(39,69,82,0.62)",
  heroFade:    "#1a2f3d",
  glassBg:     "rgba(255,255,255,0.08)",
  glassBorder: "rgba(255,255,255,0.14)",
};

const LIGHT = {
  bg:          "#ddedf2",
  panel:       "#ffffff",
  panelAlt:    "#f0f8fb",
  text:        "#0f2130",
  muted:       "#3d5a6a",
  subtleMuted: "#5a7a8a",
  border:      "rgba(0,0,0,0.09)",
  cardInner:   "rgba(255,255,255,0.90)",
  navBg:       "rgba(255,255,255,0.92)",
  heroL:       "rgba(15,33,48,0.82)",
  heroR:       "rgba(15,33,48,0.42)",
  heroFade:    "#ddedf2",
  glassBg:     "rgba(255,255,255,0.22)",
  glassBorder: "rgba(255,255,255,0.40)",
};

type Theme = typeof DARK;

const nav = ["Overview", "Destination", "Program", "Venue", "NCORE Live", "NALU", "Partners"];

const faqs = [
  { q: "Is there an NCORE conference in 2026?",    a: "No. The current positioning states there will be no NCORE conference held in 2026, with the next expected conference in 2027." },
  { q: "Where is NCORE 2027 being positioned?",    a: "TPG Worldwide has secured a venue hold at ARIA Resort & Casino in Las Vegas for the NCORE 2027 destination program." },
  { q: "What is NCORE?",                           a: "NCORE is a leading higher education forum focused on race, ethnicity, cultural diversity, identity, access, opportunity, cross-cultural understanding, and institutional success." },
  { q: "What will NALU answer?",                   a: "NALU will operate as the event information engine for NCORE, ARIA, Las Vegas travel, dining, entertainment, sports, program updates, venue logistics, and attendee support." },
  { q: "What is the TPG Live / venue hold layer?", a: "It is TPG Worldwide's event infrastructure layer for venue holds, entertainment overlays, destination programming, hospitality, sponsorship, and future conference activation pipelines." },
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

// ── Bubble cluster — replicates PPTX slide 3/4 visual ────────
function BubbleCluster({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 480 720" className={className} aria-hidden="true">
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
      <circle cx="355" cy="400" r="82"  fill={A.teal}   />
      <circle cx="275" cy="520" r="64"  fill={A.orange} />
      <circle cx="415" cy="600" r="94"  fill={A.red}    />
      <line x1="90"  y1="385" x2="275" y2="400" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
      <circle cx="275" cy="400" r="3" fill="white" opacity="0.65" />
      <line x1="70"  y1="510" x2="213" y2="520" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
      <circle cx="213" cy="520" r="3" fill="white" opacity="0.65" />
      <line x1="100" y1="595" x2="323" y2="600" stroke="white" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
      <circle cx="323" cy="600" r="3" fill="white" opacity="0.65" />
    </svg>
  );
}

// ── Google Maps embed ─────────────────────────────────────────
function DestinationMapCard({ T }: { T: Theme }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] p-6 shadow-2xl" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: A.teal }}>Las Vegas Destination Map</p>
          <h3 className="mt-2 text-2xl font-semibold" style={{ color: T.text }}>ARIA Resort &amp; Casino, Las Vegas</h3>
          <p className="mt-2 max-w-xl text-sm leading-6" style={{ color: T.muted }}>
            NCORE 2027 is positioned at the ARIA Resort &amp; Casino on the Las Vegas Strip — a AAA Five Diamond property anchoring conference programming, hospitality, and TPG Live activations.
          </p>
        </div>
        <MapPin className="h-8 w-8 shrink-0" style={{ color: A.orange }} />
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl" style={{ height: 400, border: `1px solid ${T.border}` }}>
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
function NaluPanel({ T }: { T: Theme }) {
  const [query, setQuery] = useState("Where should I eat near ARIA after the NCORE keynote?");
  const answer = useMemo(() => {
    if (query.toLowerCase().includes("aria"))     return "NALU can answer venue logistics, room block guidance, meeting locations, attendee flow, dining near ARIA, transportation, accessibility, entertainment, and curated Las Vegas options.";
    if (query.toLowerCase().includes("register")) return "NALU can route users to official registration information when released, explain deadlines, application steps, travel planning, and attendee support pathways.";
    if (query.toLowerCase().includes("program"))  return "NALU can explain expected program tracks, speakers, sessions, partner activations, student/faculty engagement, and NCORE Live updates as they become available.";
    return "NALU will be trained as the NCORE 2027 information concierge: event Q&A, ARIA venue support, Las Vegas destination intelligence, travel, food, sports, entertainment, and TPG partner activations.";
  }, [query]);

  return (
    <div className="rounded-[2rem] p-6 shadow-2xl" style={{ background: `${A.teal}18`, border: `1px solid ${A.teal}40` }}>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl p-3" style={{ background: `${A.teal}28`, color: A.teal }}>
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em]" style={{ color: A.teal }}>NALU Query Engine</p>
          <h3 className="text-2xl font-semibold" style={{ color: T.text }}>Ask anything about NCORE 2027</h3>
        </div>
      </div>
      <div className="mt-6 flex gap-3 rounded-2xl p-3" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
        <Search className="mt-3 h-5 w-5 shrink-0" style={{ color: T.subtleMuted }} />
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-24 w-full resize-none bg-transparent p-2 text-sm outline-none"
          style={{ color: T.text }}
          placeholder="Ask NALU about NCORE, ARIA, Las Vegas, dining, entertainment, sports, travel, or the 2027 program…"
        />
      </div>
      <div className="mt-4 rounded-2xl p-4 text-sm leading-6" style={{ background: T.glassBg, color: T.muted }}>
        <span className="font-semibold" style={{ color: A.teal }}>NALU Response Preview:</span>{" "}{answer}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function Ncore2027Microsite() {
  const [dark, setDark] = useState(true);

  // Read saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("ncore-theme");
    if (saved === "light") setDark(false);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("ncore-theme", next ? "dark" : "light");
  };

  const T = dark ? DARK : LIGHT;

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: T.bg, color: T.text }}>

      {/* ── Sticky nav ──────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300"
        style={{ background: T.navBg, borderBottom: `1px solid ${T.border}` }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-2xl font-black text-sm"
              style={{ background: A.teal, color: "#ffffff" }}
            >
              N
            </div>
            <div>
              <p className="text-sm font-bold tracking-wide" style={{ color: T.text }}>NCORE 2027</p>
              <p className="text-xs" style={{ color: T.subtleMuted }}>TPG Worldwide Destination Platform</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm lg:flex" style={{ color: T.muted }}>
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                className="transition-colors hover:opacity-80"
                style={{ color: T.muted }}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Day / Night toggle */}
            <button
              onClick={toggleTheme}
              aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
              className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:opacity-80"
              style={{ background: T.glassBg, border: `1px solid ${T.border}`, color: T.text }}
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              href="#nalu"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
              style={{ background: A.teal }}
            >
              Ask NALU
            </a>
          </div>
        </div>
      </header>

      <main>

        {/* ── Hero — actual ARIA building photo ───────────────── */}
        <section id="overview" className="relative overflow-hidden">

          {/* ARIA Las Vegas building — Wikimedia Commons CC-BY-SA 3.0 */}
          <div className="absolute inset-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Aria_Las_Vegas.JPG"
              alt="ARIA Resort & Casino Las Vegas"
              className="h-full w-full object-cover object-center"
            />
            {/* gradient: strong dark left for text legibility, lighter right, full fade to bg at bottom */}
            <div
              className="absolute inset-0 transition-colors duration-300"
              style={{
                background: `linear-gradient(to right, ${T.heroL} 25%, ${T.heroR} 65%, transparent 100%), linear-gradient(to bottom, transparent 55%, ${T.heroFade} 100%)`,
              }}
            />
          </div>

          {/* Bubble cluster — right-edge PPTX decoration, always on dark overlay area */}
          <BubbleCluster className="pointer-events-none absolute -right-10 top-0 h-full w-auto max-w-[280px] opacity-80 lg:max-w-sm" />

          {/* Hero content */}
          <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-7xl items-center gap-10 px-6 py-28 lg:grid-cols-[1.15fr_.85fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
              <div
                className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm backdrop-blur-sm"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.20)", color: A.teal }}
              >
                <Calendar className="h-4 w-4" />
                No 2026 conference • Next expected event: 2027
              </div>

              <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
                NCORE 2027 at{" "}
                <span style={{ background: `linear-gradient(to right, ${A.teal}, ${A.orange})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
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
                  style={{ background: A.teal }}
                >
                  Explore Destination <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#ncore-live"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm"
                >
                  TPG Live Layer <Music className="h-4 w-4" />
                </a>
                <a
                  href="https://dev.vibe-platform-vpj.pages.dev/ncore-vibe.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${A.orange}, #c47a00)` }}
                >
                  NCORE on VIBE <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: .95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: .7, delay: .12 }}
              className="grid gap-4 rounded-[2rem] p-4 shadow-2xl backdrop-blur-sm"
              style={{ background: T.glassBg, border: `1px solid ${T.glassBorder}` }}
            >
              {venueStack.map((item) => (
                <div key={item.label} className="rounded-3xl p-5" style={{ background: T.cardInner }}>
                  <p className="text-xs uppercase tracking-[0.25em]" style={{ color: T.subtleMuted }}>{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Destination map ──────────────────────────────────── */}
        <section id="destination" className="mx-auto max-w-7xl px-6 py-12">
          <DestinationMapCard T={T} />
        </section>

        {/* ── Program tiles ────────────────────────────────────── */}
        <section id="program" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: A.orange }}>General NCORE Information</p>
            <h2 className="mt-2 text-4xl font-bold" style={{ color: T.text }}>Conference positioning</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {programTiles.map(({ icon: Icon, title, copy }, idx) => {
              const accent = [A.teal, A.orange, A.red, A.lime][idx];
              return (
                <div key={title} className="rounded-[2rem] p-6" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
                  <Icon className="h-8 w-8" style={{ color: accent }} />
                  <h3 className="mt-5 text-xl font-semibold" style={{ color: T.text }}>{title}</h3>
                  <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>{copy}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Venue ────────────────────────────────────────────── */}
        <section id="venue" className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-3">
          <div className="rounded-[2rem] p-7 lg:col-span-2" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
            <div className="flex items-center gap-3" style={{ color: A.teal }}>
              <Hotel className="h-6 w-6" />
              <p className="text-xs uppercase tracking-[0.3em]">ARIA Venue Hold</p>
            </div>
            <h2 className="mt-4 text-4xl font-bold" style={{ color: T.text }}>Premium convention platform on the Las Vegas Strip</h2>
            <p className="mt-4 leading-7" style={{ color: T.muted }}>
              The ARIA layer should function as the anchor for rooms, meetings, breakouts, VIP activations, partner hospitality, private receptions, sponsor lounges, speaker support, and TPG-managed event overlays.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {["Convention + Ballrooms", "Breakout Sessions", "VIP Hospitality"].map((x) => (
                <div key={x} className="rounded-2xl p-4 text-sm font-semibold" style={{ background: T.panelAlt, color: T.text }}>{x}</div>
              ))}
            </div>
          </div>
          <div
            className="rounded-[2rem] p-7"
            style={{ background: `linear-gradient(135deg, ${A.red}28, ${A.orange}14)`, border: `1px solid ${A.orange}35` }}
          >
            <Building2 className="h-8 w-8" style={{ color: A.orange }} />
            <h3 className="mt-4 text-2xl font-bold" style={{ color: T.text }}>Future Venue Holds</h3>
            <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>
              Build the AEG Live-style inventory pipeline: venue holds, room blocks, sponsor inventory, branded activations, ticketing, destination programming, and event monetization.
            </p>
          </div>
        </section>

        {/* ── NCORE Live ───────────────────────────────────────── */}
        <section id="ncore-live" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2.5rem] p-8 shadow-2xl" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: A.teal }}>TPG / AEG Live Style + TPG-LiveNation Event Side</p>
            <h2 className="mt-3 text-4xl font-bold" style={{ color: T.text }}>NCORE Live facilitated by Majestra</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[
                { icon: Mic2,      title: "Speaker + Mainstage", copy: "Keynotes, panels, plenaries, sponsored sessions, fireside chats, and cultural programming.",                                                        color: A.teal   },
                { icon: Ticket,    title: "Event Monetization",  copy: "Partner packages, venue inventory, hospitality, premium access, sponsorship, exhibit, and curated experience revenue.",                              color: A.orange },
                { icon: Handshake, title: "Partner Pipeline",    copy: "Majestra-facilitated production, venue procurement, brand activation, artist/live event alignment, and institutional sponsorship.",                  color: A.red    },
              ].map(({ icon: Icon, title, copy, color }) => (
                <div key={title} className="rounded-[2rem] p-6" style={{ background: T.panelAlt }}>
                  <Icon className="h-7 w-7" style={{ color }} />
                  <h3 className="mt-4 text-xl font-semibold" style={{ color: T.text }}>{title}</h3>
                  <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NALU section ─────────────────────────────────────── */}
        <section id="nalu" className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: A.teal }}>Attendee Intelligence</p>
            <h2 className="mt-3 text-4xl font-bold" style={{ color: T.text }}>NALU becomes the always-on NCORE concierge.</h2>
            <p className="mt-4 leading-7" style={{ color: T.muted }}>
              NALU should sit across the microsite as a persistent assistant: answering event questions, routing attendees, explaining program details, surfacing Vegas recommendations, and supporting partners, sponsors, students, faculty, exhibitors, and executives.
            </p>
            <div className="mt-6 grid gap-3">
              {[Plane, Utensils, Trophy, Music].map((Icon, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl p-4" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
                  <Icon className="h-5 w-5" style={{ color: A.teal }} />
                  <span className="text-sm" style={{ color: T.muted }}>Travel, dining, sports, entertainment, and destination guidance</span>
                </div>
              ))}
            </div>
          </div>
          <NaluPanel T={T} />
        </section>

        {/* ── Partners + FAQ ───────────────────────────────────── */}
        <section id="partners" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] p-7" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
              <h2 className="text-3xl font-bold" style={{ color: T.text }}>Revenue + alignment opportunities</h2>
              <div className="mt-6 grid gap-3 text-sm">
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
                  <div key={x} className="rounded-2xl p-4" style={{ background: T.panelAlt, color: T.muted }}>{x}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] p-7" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
              <h2 className="text-3xl font-bold" style={{ color: T.text }}>FAQ preview</h2>
              <div className="mt-6 space-y-3">
                {faqs.map((item) => (
                  <details key={item.q} className="rounded-2xl p-4" style={{ background: T.panelAlt }}>
                    <summary className="cursor-pointer font-semibold" style={{ color: T.text }}>{item.q}</summary>
                    <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <NeuralWidget />

      <footer style={{ borderTop: `1px solid ${T.border}` }} className="px-6 py-10 text-center text-sm" >
        <p style={{ color: T.subtleMuted }}>
          NCORE 2027 Destination Microsite Concept • TPG Worldwide • ARIA Las Vegas • NALU Query Engine • Majestra-Facilitated Live Event Layer
        </p>
        <p className="mt-1 text-xs" style={{ color: T.subtleMuted, opacity: 0.5 }}>
          ARIA photo: Wikimedia Commons / CC-BY-SA 3.0
        </p>
      </footer>
    </div>
  );
}
