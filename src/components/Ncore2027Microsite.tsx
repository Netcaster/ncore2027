import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Hotel, Music, Utensils, Trophy, Users, ShieldCheck, Building2, Sparkles, ArrowRight, Mic2, Globe2, Bot, Handshake, Ticket, Plane } from "lucide-react";

const nav = ["Overview", "Destination", "Program", "Venue", "NCORE Live", "NALU", "Partners"];

const faqs = [
  {
    q: "Is there an NCORE conference in 2026?",
    a: "No. The current positioning states there will be no NCORE conference held in 2026, with the next expected conference in 2027."
  },
  {
    q: "Where is NCORE 2027 being positioned?",
    a: "TPG Worldwide has secured a venue hold at ARIA Resort & Casino in Las Vegas for the NCORE 2027 destination program."
  },
  {
    q: "What is NCORE?",
    a: "NCORE is a leading higher education forum focused on race, ethnicity, cultural diversity, identity, access, opportunity, cross-cultural understanding, and institutional success."
  },
  {
    q: "What will NALU answer?",
    a: "NALU will operate as the event information engine for NCORE, ARIA, Las Vegas travel, dining, entertainment, sports, program updates, venue logistics, and attendee support."
  },
  {
    q: "What is the TPG Live / venue hold layer?",
    a: "It is TPG Worldwide's event infrastructure layer for venue holds, entertainment overlays, destination programming, hospitality, sponsorship, and future conference activation pipelines."
  }
];

const programTiles = [
  { icon: Users, title: "Higher Education Forum", copy: "Sessions, panels, workshops, and collaborative dialogue for institutions, faculty, staff, students, and DEI leadership." },
  { icon: ShieldCheck, title: "Access + Opportunity", copy: "Programming focused on institutional pathways, student success, underrepresented populations, and inclusive systems." },
  { icon: Globe2, title: "Identity + Culture", copy: "Content tracks may extend beyond race and ethnicity into gender, first-generation experiences, LGBTQ+ issues, disability, culture, and human identity." },
  { icon: Sparkles, title: "Destination Experience", copy: "Las Vegas hospitality, dining, sports, entertainment, tourism, and curated attendee experiences connected through NALU." }
];

const venueStack = [
  { label: "Venue Hold", value: "ARIA Las Vegas" },
  { label: "Host City", value: "Las Vegas, Nevada" },
  { label: "Program Year", value: "2027" },
  { label: "Platform Layer", value: "TPG Worldwide + NALU" }
];

function USMapCard() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,.18),transparent_35%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,.18),transparent_40%)]" />
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">U.S. Destination Map</p>
          <h3 className="mt-2 text-2xl font-semibold text-white">Las Vegas designated for 2027</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">A stylized national map anchors NCORE 2027 in the Southwest, positioning Las Vegas as the next destination hub for conference, hospitality, cultural dialogue, and curated attendee experiences.</p>
        </div>
        <MapPin className="h-8 w-8 text-fuchsia-300" />
      </div>
      <div className="relative z-10 mt-8 aspect-[16/9] rounded-3xl border border-white/10 bg-slate-900/70 p-4">
        <svg viewBox="0 0 900 500" className="h-full w-full">
          <defs>
            <linearGradient id="mapGradient" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <filter id="glow"><feGaussianBlur stdDeviation="4" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <path d="M110 190 C180 115 300 100 380 125 C455 148 520 105 610 130 C720 160 790 220 805 295 C715 330 620 345 520 335 C405 320 320 355 230 330 C155 310 105 260 110 190Z" fill="url(#mapGradient)" stroke="#64748b" strokeWidth="3" />
          <path d="M620 135 C665 120 720 125 760 150 C720 165 675 165 620 135Z" fill="#334155" stroke="#64748b" strokeWidth="2" />
          <path d="M225 210 C255 200 280 212 295 235 C265 252 230 240 225 210Z" fill="#475569" opacity=".7" />
          <path d="M300 135 C340 130 390 145 415 165 C375 178 330 170 300 135Z" fill="#475569" opacity=".65" />
          <circle cx="245" cy="275" r="10" fill="#e879f9" filter="url(#glow)" />
          <circle cx="245" cy="275" r="26" fill="none" stroke="#e879f9" strokeWidth="3" opacity=".5">
            <animate attributeName="r" from="18" to="42" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" from=".6" to="0" dur="1.8s" repeatCount="indefinite" />
          </circle>
          <text x="275" y="267" fill="#f8fafc" fontSize="24" fontWeight="700">Las Vegas</text>
          <text x="275" y="293" fill="#67e8f9" fontSize="16">NCORE 2027 Destination</text>
          <path d="M245 275 C370 205 505 205 650 250" stroke="#67e8f9" strokeWidth="3" strokeDasharray="8 10" fill="none" opacity=".7" />
          <path d="M245 275 C340 330 475 365 640 330" stroke="#a78bfa" strokeWidth="3" strokeDasharray="8 10" fill="none" opacity=".55" />
        </svg>
      </div>
    </div>
  );
}

function NaluPanel() {
  const [query, setQuery] = useState("Where should I eat near ARIA after the NCORE keynote?");
  const answer = useMemo(() => {
    if (query.toLowerCase().includes("aria")) return "NALU can answer venue logistics, room block guidance, meeting locations, attendee flow, dining near ARIA, transportation, accessibility, entertainment, and curated Las Vegas options.";
    if (query.toLowerCase().includes("register")) return "NALU can route users to official registration information when released, explain deadlines, application steps, travel planning, and attendee support pathways.";
    if (query.toLowerCase().includes("program")) return "NALU can explain expected program tracks, speakers, sessions, partner activations, student/faculty engagement, and NCORE Live updates as they become available.";
    return "NALU will be trained as the NCORE 2027 information concierge: event Q&A, ARIA venue support, Las Vegas destination intelligence, travel, food, sports, entertainment, and TPG partner activations.";
  }, [query]);

  return (
    <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-950/20 p-6 shadow-2xl">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-cyan-300/10 p-3 text-cyan-200"><Bot className="h-6 w-6" /></div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">NALU Query Engine</p>
          <h3 className="text-2xl font-semibold text-white">Ask anything about NCORE 2027</h3>
        </div>
      </div>
      <div className="mt-6 flex gap-3 rounded-2xl border border-white/10 bg-slate-950 p-3">
        <Search className="mt-3 h-5 w-5 shrink-0 text-slate-400" />
        <textarea value={query} onChange={(e) => setQuery(e.target.value)} className="min-h-24 w-full resize-none bg-transparent p-2 text-sm text-white outline-none placeholder:text-slate-500" placeholder="Ask NALU about NCORE, ARIA, Las Vegas, dining, entertainment, sports, travel, or the 2027 program..." />
      </div>
      <div className="mt-4 rounded-2xl bg-white/5 p-4 text-sm leading-6 text-slate-200">
        <span className="font-semibold text-cyan-200">NALU Response Preview:</span> {answer}
      </div>
    </div>
  );
}

export default function Ncore2027Microsite() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,.25),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,.18),transparent_30%),linear-gradient(180deg,#020617,#0f172a)]" />
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-950 font-black">N</div>
            <div>
              <p className="text-sm font-bold tracking-wide">NCORE 2027</p>
              <p className="text-xs text-slate-400">TPG Worldwide Destination Platform</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            {nav.map((item) => <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="hover:text-white">{item}</a>)}
          </nav>
          <a href="#nalu" className="rounded-full bg-cyan-300 px-5 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20">Ask NALU</a>
        </div>
      </header>

      <main>
        <section id="overview" className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-200">
              <Calendar className="h-4 w-4" /> No 2026 conference • Next expected event: 2027
            </div>
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">NCORE 2027 at <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">ARIA Las Vegas</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">A TPG Worldwide microsite for general NCORE information, Las Vegas destination readiness, ARIA venue support, future venue holds, TPG Live event programming, and NALU-powered attendee intelligence.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#destination" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950">Explore Destination <ArrowRight className="h-4 w-4" /></a>
              <a href="#ncore-live" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold text-white">TPG Live Layer <Music className="h-4 w-4" /></a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .1 }} className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl">
            {venueStack.map((item) => (
              <div key={item.label} className="rounded-3xl bg-slate-950/80 p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-white">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <section id="destination" className="mx-auto max-w-7xl px-6 py-12">
          <USMapCard />
        </section>

        <section id="program" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-300">General NCORE Information</p>
              <h2 className="mt-2 text-4xl font-bold">Conference positioning</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {programTiles.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <Icon className="h-8 w-8 text-cyan-300" />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="venue" className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7 lg:col-span-2">
            <div className="flex items-center gap-3 text-cyan-200"><Hotel className="h-6 w-6" /><p className="uppercase tracking-[0.3em] text-xs">ARIA Venue Hold</p></div>
            <h2 className="mt-4 text-4xl font-bold">Premium convention platform on the Las Vegas Strip</h2>
            <p className="mt-4 text-slate-300 leading-7">The ARIA layer should function as the anchor for rooms, meetings, breakouts, VIP activations, partner hospitality, private receptions, sponsor lounges, speaker support, and TPG-managed event overlays.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {["Convention + Ballrooms", "Breakout Sessions", "VIP Hospitality"].map((x) => <div key={x} className="rounded-2xl bg-slate-950/70 p-4 text-sm font-semibold">{x}</div>)}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/20 to-cyan-500/10 p-7">
            <Building2 className="h-8 w-8 text-fuchsia-200" />
            <h3 className="mt-4 text-2xl font-bold">Future Venue Holds</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">Build the AEG Live-style inventory pipeline: venue holds, room blocks, sponsor inventory, branded activations, ticketing, destination programming, and event monetization.</p>
          </div>
        </section>

        <section id="ncore-live" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2.5rem] border border-white/10 bg-slate-900/70 p-8 shadow-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">TPG / AEG Live Style + TPG-LiveNation Event Side</p>
            <h2 className="mt-3 text-4xl font-bold">NCORE Live facilitated by Majestra</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {[{ icon: Mic2, title: "Speaker + Mainstage", copy: "Keynotes, panels, plenaries, sponsored sessions, fireside chats, and cultural programming." }, { icon: Ticket, title: "Event Monetization", copy: "Partner packages, venue inventory, hospitality, premium access, sponsorship, exhibit, and curated experience revenue." }, { icon: Handshake, title: "Partner Pipeline", copy: "Majestra-facilitated production, venue procurement, brand activation, artist/live event alignment, and institutional sponsorship." }].map(({ icon: Icon, title, copy }) => <div key={title} className="rounded-[2rem] bg-slate-950/70 p-6"><Icon className="h-7 w-7 text-fuchsia-300" /><h3 className="mt-4 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p></div>)}
            </div>
          </div>
        </section>

        <section id="nalu" className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Attendee Intelligence</p>
            <h2 className="mt-3 text-4xl font-bold">NALU becomes the always-on NCORE concierge.</h2>
            <p className="mt-4 text-slate-300 leading-7">NALU should sit across the microsite as a persistent assistant: answering event questions, routing attendees, explaining program details, surfacing Vegas recommendations, and supporting partners, sponsors, students, faculty, exhibitors, and executives.</p>
            <div className="mt-6 grid gap-3">
              {[Plane, Utensils, Trophy, Music].map((Icon, i) => <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"><Icon className="h-5 w-5 text-cyan-300" /><span className="text-sm text-slate-200">Travel, dining, sports, entertainment, and destination guidance</span></div>)}
            </div>
          </div>
          <NaluPanel />
        </section>

        <section id="partners" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <h2 className="text-3xl font-bold">Revenue + alignment opportunities</h2>
              <div className="mt-6 grid gap-3 text-sm text-slate-300">
                {["Official housing and room block management", "Destination sponsorship packages", "Exhibitor and institutional partner packages", "VIP receptions and private hosted experiences", "Dining, entertainment, sports, and tourism affiliate layers", "NALU sponsored answers and concierge intelligence", "Future venue hold pipeline with TPG Live / Majestra", "Media, content, recap, and streaming-lite programming"].map((x) => <div key={x} className="rounded-2xl bg-slate-950/70 p-4">{x}</div>)}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <h2 className="text-3xl font-bold">FAQ preview</h2>
              <div className="mt-6 space-y-3">
                {faqs.map((item) => <details key={item.q} className="rounded-2xl bg-slate-950/70 p-4"><summary className="cursor-pointer font-semibold text-white">{item.q}</summary><p className="mt-3 text-sm leading-6 text-slate-300">{item.a}</p></details>)}
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
