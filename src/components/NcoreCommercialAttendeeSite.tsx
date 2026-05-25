import { useMemo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Hotel,
  Menu,
  Music,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Utensils,
  X,
  GraduationCap,
  HeartHandshake,
  BadgeCheck,
  Compass,
  Headphones,
  MessageCircle,
  WalletCards,
  Landmark,
  PartyPopper,
  Volume2,
  Loader2,
  Languages,
} from "lucide-react";

const nav = [
  { label: "Experience", href: "#experience" },
  { label: "ARIA", href: "#aria" },
  { label: "Vegas", href: "#vegas" },
  { label: "Program", href: "#program" },
  { label: "NALU", href: "#nalu" },
  { label: "Partners", href: "#partners" },
];

const audienceCards = [
  {
    icon: GraduationCap,
    title: "Students",
    copy: "Find sessions, cultural activations, networking pathways, mentor moments, and Las Vegas experiences curated around learning and belonging.",
  },
  {
    icon: Users,
    title: "Faculty + Staff",
    copy: "Access professional development, institutional collaboration, dialogue tracks, and destination support built around NCORE's academic mission.",
  },
  {
    icon: Landmark,
    title: "Institutions",
    copy: "Coordinate group attendance, official housing, sponsorship, visibility, recruitment, alumni engagement, and executive receptions.",
  },
  {
    icon: BadgeCheck,
    title: "Sponsors + Partners",
    copy: "Connect through hospitality, exhibit packages, brand activations, content, media, dining, tourism, sports, and live event inventory.",
  },
];


const slideDeck = [
  {
    eyebrow: "Slide 01",
    title: "NCORE 2027 • Las Vegas",
    subtitle: "A TPG Worldwide destination platform anchored at ARIA Las Vegas.",
    bullets: ["Official 2027 destination positioning", "Higher education + culture + hospitality", "Integrated live-event and sponsor architecture"],
  },
  {
    eyebrow: "Slide 02",
    title: "Why NCORE Matters",
    subtitle: "A national forum for identity, access, opportunity, dialogue, and institutional growth.",
    bullets: ["Race, ethnicity, culture, and human identity", "Student success and inclusive academic pathways", "Faculty, staff, executive, and student engagement"],
  },
  {
    eyebrow: "Slide 03",
    title: "Why Las Vegas",
    subtitle: "A global convention, tourism, dining, sports, and entertainment engine.",
    bullets: ["Premium hospitality infrastructure", "World-class destination experiences", "Scalable room block and sponsor inventory"],
  },
  {
    eyebrow: "Slide 04",
    title: "ARIA Venue Hold",
    subtitle: "A luxury conference environment built for high-touch programming and attendee flow.",
    bullets: ["Ballrooms, breakouts, receptions", "Integrated lodging and amenities", "VIP hospitality and partner events"],
  },
  {
    eyebrow: "Slide 05",
    title: "TPG Worldwide Platform",
    subtitle: "The commercial layer around the conference, destination, audience, and experience.",
    bullets: ["Travel + hospitality + entertainment + sports", "Sponsor, exhibitor, and content monetization", "Future venue-hold pipeline"],
  },
  {
    eyebrow: "Slide 06",
    title: "NALU AI Concierge",
    subtitle: "The always-on information engine for attendees, partners, and institutions.",
    bullets: ["NCORE and ARIA questions", "Dining, tourism, sports, and entertainment", "Multilingual support and real-time guidance"],
  },
  {
    eyebrow: "Slide 07",
    title: "NCORE Live by Majestra",
    subtitle: "A live programming and activation layer for culture, media, and premium experiences.",
    bullets: ["Mainstage and cultural activations", "Private receptions and sponsor events", "Production, venue, and artist alignment"],
  },
  {
    eyebrow: "Slide 08",
    title: "Destination Experiences",
    subtitle: "Conference attendance connected to a full Las Vegas attendee journey.",
    bullets: ["Curated dining and entertainment", "Sports and nightlife recommendations", "Student, faculty, and executive tracks"],
  },
  {
    eyebrow: "Slide 09",
    title: "Partner Revenue Architecture",
    subtitle: "Commercial participation without losing the mission-driven center of NCORE.",
    bullets: ["Official housing and room blocks", "Exhibitor and sponsor packages", "Media, content, VIP, and tourism overlays"],
  },
  {
    eyebrow: "Slide 10",
    title: "The Road to 2027",
    subtitle: "A national conference platform with Las Vegas as the first destination anchor.",
    bullets: ["Attendee acquisition site", "Institutional partner portal", "Future cities and venue holds"],
  },
];

const vegasItems = [
  { icon: Utensils, title: "Dining", copy: "Chef-led restaurants, group dining, receptions, and curated post-session experiences." },
  { icon: Trophy, title: "Sports", copy: "Raiders, Golden Knights, Aces, Formula 1, UFC, boxing, and premium watch-party opportunities." },
  { icon: Music, title: "Entertainment", copy: "Residencies, concerts, cultural showcases, private events, and Majestra-facilitated programming." },
  { icon: Plane, title: "Travel", copy: "Fly-in accessibility, hospitality coordination, group blocks, and attendee concierge support." },
];

const conciergeOffers = [
  { icon: Music, title: "Entertainment Access", copy: "Curated ticket links, concierge referrals, sponsor-hosted receptions, artist showcases, cultural events, comedy, concerts, residencies, and NCORE Live experiences." },
  { icon: Utensils, title: "Food + Beverage", copy: "Preferred dining windows, group dinner options, reception menus, chef partnerships, ARIA vendor spotlights, and off-site participating restaurant offers." },
  { icon: Trophy, title: "Golf + Recreation", copy: "Preferred tee-time coordination, group golf outings, sponsor-hosted foursomes, executive networking rounds, and destination leisure packages." },
  { icon: WalletCards, title: "Discount Marketplace", copy: "Vendor offers, attendee perks, promotional codes, sponsor bundles, group savings, and NALU-routed recommendations for participating merchants." },
];

const vendorCategories = ["ARIA restaurants", "ARIA nightlife and lounges", "Off-site restaurants", "Golf clubs", "Entertainment venues", "Retail and wellness", "Transportation", "Tourism operators"];

const handsPillars = [
  { title: "Affordable Housing Access", copy: "Connect participants to housing education, rental readiness, affordable housing navigation, and community-based intake pathways." },
  { title: "Mortgage Readiness", copy: "Support qualified families with education around credit, income documentation, lending pathways, mortgage products, and sustainable homeownership." },
  { title: "Down Payment Support", copy: "Route users toward down payment assistance, grants, employer-assisted housing models, local programs, and lender-partner resources." },
  { title: "Resource Navigation", copy: "Use NALU and TPG partner systems to simplify intake, triage, referrals, eligibility, and follow-up across public, private, and nonprofit channels." },
];

const handPillars = [
  { title: "Humanity First", copy: "Treat asylum seekers as people navigating crisis, trauma, uncertainty, language barriers, and displacement — not merely as case files or statistics." },
  { title: "Resource Allocation", copy: "Coordinate housing, food, clothing, translation, transportation, communication, legal referrals, workforce readiness, and community placement support." },
  { title: "Navigation + Stabilization", copy: "Help families understand where to go, who to contact, what documents matter, and how to access lawful, practical, and local support pathways." },
  { title: "Community Integration", copy: "Support receiving communities with better coordination, reduced confusion, partner accountability, and compassionate service delivery." },
];

const WWTC_KEY = "95a35451.30ece979-c4bd-447b-8b1e-fd9a6c77418b";
const WWTC_BASE = "https://api.worldwidetechconnections.com/services/tts";

const LANGUAGES = [
  { code: "english-united-states",   label: "English (US)" },
  { code: "spanish-international",   label: "Español" },
  { code: "french-france",           label: "Français" },
  { code: "portuguese-brazil",       label: "Português (BR)" },
  { code: "chinese-mandarin",        label: "中文 (Mandarin)" },
  { code: "arabic",                  label: "العربية" },
  { code: "hindi",                   label: "हिन्दी" },
  { code: "japanese",                label: "日本語" },
  { code: "korean",                  label: "한국어" },
  { code: "german",                  label: "Deutsch" },
  { code: "italian",                 label: "Italiano" },
  { code: "russian",                 label: "Русский" },
  { code: "swahili",                 label: "Kiswahili" },
  { code: "vietnamese",              label: "Tiếng Việt" },
  { code: "tagalog",                 label: "Filipino" },
  { code: "haitian-creole",          label: "Kreyòl Ayisyen" },
  { code: "polish",                  label: "Polski" },
  { code: "dutch",                   label: "Nederlands" },
  { code: "turkish",                 label: "Türkçe" },
  { code: "thai",                    label: "ภาษาไทย" },
];

function NaluWidget() {
  const [query, setQuery]         = useState("What should I know before planning my NCORE 2027 trip to Las Vegas?");
  const [language, setLanguage]   = useState("english-united-states");
  const [translated, setTranslated] = useState<{ text: string; audio: string } | null>(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);
  const [playing, setPlaying]     = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const response = useMemo(() => {
    const q = query.toLowerCase();
    if (q.includes("aria")) return "ARIA is positioned as the venue-hold anchor for NCORE 2027, supporting meetings, lodging, hospitality, breakouts, receptions, and attendee destination flow.";
    if (q.includes("food") || q.includes("dining") || q.includes("restaurant")) return "NALU will help attendees find dining near ARIA, group dinner options, sponsor-hosted receptions, cultural dining experiences, and late-night recommendations.";
    if (q.includes("sports") || q.includes("entertainment")) return "NALU can recommend Las Vegas sports, concerts, residencies, watch parties, cultural activations, and NCORE Live experiences connected to the conference calendar.";
    if (q.includes("register") || q.includes("ticket") || q.includes("waitlist")) return "NALU can route users to registration, waitlist, housing, partner, sponsor, and institutional group-interest pathways once those official forms are activated.";
    return "NALU will function as the NCORE 2027 information concierge for conference questions, Las Vegas planning, ARIA logistics, dining, entertainment, sports, travel, group coordination, and partner experiences.";
  }, [query]);

  // Reset translation when query or language changes
  useEffect(() => {
    setTranslated(null);
    setError(null);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlaying(false);
  }, [query, language]);

  async function handleTranslate() {
    if (language === "english-united-states") return;
    setLoading(true);
    setError(null);
    setTranslated(null);
    try {
      const url = `${WWTC_BASE}/english-united-states/${language}?text=${encodeURIComponent(response)}&serviceCode=ttt&sourceLanguageCode=english-united-states&targetLanguageCode=${language}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { accept: "application/json", "api-authorization": WWTC_KEY },
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setTranslated({ text: data.translated_text, audio: data.audio });
    } catch (e: any) {
      setError("Translation unavailable — please try again.");
    }
    setLoading(false);
  }

  function playAudio() {
    if (!translated?.audio) return;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    const bytes = atob(translated.audio);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    const blob = new Blob([arr], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audioRef.current = audio;
    audio.onended = () => setPlaying(false);
    audio.play();
    setPlaying(true);
  }

  const isEnglish = language === "english-united-states";

  return (
    <div className="rounded-[2rem] border border-cyan-300/30 bg-black/50 p-5 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-black shadow-lg shadow-cyan-300/20">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-200">NALU</p>
            <h3 className="text-xl font-black text-white">Ask the NCORE Concierge</h3>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2">
          <Languages className="h-4 w-4 shrink-0 text-cyan-300" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-xs font-bold text-white outline-none"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} className="bg-slate-900 text-white">{l.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Query input */}
      <div className="mt-5 flex gap-3 rounded-2xl border border-white/10 bg-slate-950/80 p-3">
        <Search className="mt-3 h-5 w-5 shrink-0 text-cyan-200" />
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="min-h-24 w-full resize-none bg-transparent p-2 text-sm text-white outline-none placeholder:text-slate-500"
          placeholder="Ask about NCORE, ARIA, Las Vegas, restaurants, sports, entertainment, registration, or hotels..."
        />
      </div>

      {/* English response */}
      <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-slate-100">
        <span className="font-bold text-cyan-100">NALU:</span> {response}
      </div>

      {/* Translate button */}
      {!isEnglish && !translated && (
        <button
          onClick={handleTranslate}
          disabled={loading}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-300 py-3 text-sm font-black text-black disabled:opacity-60"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Translating…</>
          ) : (
            <><Languages className="h-4 w-4" /> Translate &amp; Listen</>
          )}
        </button>
      )}

      {/* Error */}
      {error && <p className="mt-3 text-center text-xs text-red-400">{error}</p>}

      {/* Translated response + audio */}
      {translated && (
        <div className="mt-3 rounded-2xl border border-teal-300/30 bg-teal-300/10 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-200 mb-2">
            {LANGUAGES.find(l => l.code === language)?.label} Translation
          </p>
          <p className="text-sm leading-6 text-slate-100">{translated.text}</p>
          <button
            onClick={playAudio}
            disabled={playing}
            className="mt-3 flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-xs font-bold text-teal-100 disabled:opacity-50"
          >
            <Volume2 className="h-4 w-4" />
            {playing ? "Playing…" : "▶ Play Audio"}
          </button>
        </div>
      )}
    </div>
  );
}

function MiniMap() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_54%,rgba(34,211,238,.25),transparent_18%),radial-gradient(circle_at_40%_20%,rgba(20,184,166,.13),transparent_28%)]" />
      <div className="relative z-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-teal-200">United States Destination Map</p>
        <h3 className="mt-2 text-3xl font-black text-white">Las Vegas designated for 2027</h3>
      </div>
      <svg viewBox="0 0 900 500" className="relative z-10 mt-6 h-auto w-full">
        <defs>
          <linearGradient id="ncoreMap" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <filter id="cyanGlow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <path d="M100 185 C190 90 300 105 385 130 C465 152 525 105 620 130 C735 160 800 220 805 300 C710 340 620 352 515 335 C405 318 315 358 220 330 C145 308 90 260 100 185Z" fill="url(#ncoreMap)" stroke="#64748b" strokeWidth="3" />
        <circle cx="248" cy="275" r="11" fill="#22d3ee" filter="url(#cyanGlow)" />
        <circle cx="248" cy="275" r="30" fill="none" stroke="#22d3ee" strokeWidth="3" opacity=".55">
          <animate attributeName="r" from="22" to="48" dur="1.9s" repeatCount="indefinite" />
          <animate attributeName="opacity" from=".7" to="0" dur="1.9s" repeatCount="indefinite" />
        </circle>
        <text x="280" y="268" fill="#ffffff" fontSize="28" fontWeight="800">Las Vegas</text>
        <text x="280" y="300" fill="#5eead4" fontSize="17">NCORE 2027 Destination</text>
        <path d="M248 275 C390 180 520 195 670 250" stroke="#22d3ee" strokeWidth="3" strokeDasharray="8 10" fill="none" opacity=".7" />
        <path d="M248 275 C350 340 495 375 660 326" stroke="#14b8a6" strokeWidth="3" strokeDasharray="8 10" fill="none" opacity=".65" />
      </svg>
    </div>
  );
}

export default function NcoreCommercialAttendeeSite() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050816] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(34,211,238,.22),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(20,184,166,.18),transparent_26%),linear-gradient(180deg,#020617,#050816_45%,#020617)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-teal-300 font-black text-black shadow-lg shadow-cyan-500/20">N</div>
            <div>
              <p className="text-sm font-black tracking-wide">NCORE 2027</p>
              <p className="text-xs text-slate-400">Las Vegas Attendee Experience</p>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-300 lg:flex">
            {nav.map((item) => <a key={item.label} href={item.href} className="hover:text-cyan-200">{item.label}</a>)}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <a href="#institutional" className="rounded-full border border-white/15 px-5 py-2 text-sm font-bold text-white hover:border-cyan-300/50">Institutional Site</a>
            <a href="#waitlist" className="rounded-full bg-white px-5 py-2 text-sm font-black text-black">Join Waitlist</a>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="rounded-xl border border-white/10 p-2 lg:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-white/10 px-6 py-4 lg:hidden">
            <div className="grid gap-3">
              {nav.map((item) => <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-xl bg-white/5 p-3 text-sm font-semibold text-slate-200">{item.label}</a>)}
              <a href="#waitlist" className="rounded-xl bg-cyan-300 p-3 text-center text-sm font-black text-black">Join Waitlist</a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(34,211,238,.12),transparent_40%),radial-gradient(circle_at_70%_30%,rgba(255,255,255,.08),transparent_20%)]" />
          <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-28">
            <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                <Sparkles className="h-4 w-4" /> No 2026 conference • Next expected event: 2027
              </div>
              <h1 className="text-6xl font-black leading-[0.9] tracking-tight md:text-8xl">
                NCORE<br />
                <span className="bg-gradient-to-r from-cyan-200 via-teal-200 to-white bg-clip-text text-transparent">LAS VEGAS</span>
              </h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-300">
                The forward-facing attendee destination for NCORE 2027: ARIA Las Vegas, cultural dialogue, higher education, tourism, dining, entertainment, sports, NCORE Live, and NALU-powered concierge support.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <a href="#waitlist" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-black shadow-xl shadow-cyan-500/10">Join Attendee Waitlist <ArrowRight className="h-4 w-4" /></a>
                <a href="#nalu" className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-7 py-4 text-sm font-black text-cyan-100">Ask NALU <Bot className="h-4 w-4" /></a>
              </div>
              <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
                {["ARIA", "2027", "Vegas"].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-2xl font-black text-white">{item}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">Destination</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7, delay: .1 }} className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-300/20 to-teal-300/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/50 p-5 shadow-2xl backdrop-blur-xl">
                <div className="aspect-[4/5] rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_40%_20%,rgba(34,211,238,.25),transparent_30%),linear-gradient(160deg,#0f172a,#020617)] p-7">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">Commercial Attendee Site</p>
                      <h2 className="mt-5 text-5xl font-black leading-none">Live. Learn. Listen. Love. Lead.</h2>
                      <p className="mt-5 text-sm leading-6 text-slate-300">A destination-first NCORE experience connecting people, place, programming, and purpose.</p>
                    </div>
                    <div className="grid gap-3">
                      {["Conference Info", "Hotel + Travel", "Dining + Sports", "NALU Concierge"].map((item) => (
                        <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold">
                          {item}<ChevronRight className="h-4 w-4 text-cyan-200" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">Attendee Gateway</p>
              <h2 className="mt-2 text-4xl font-black md:text-5xl">One front door for every NCORE journey.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-400">This commercial site sits in front of the existing institutional microsite, driving attendees, groups, sponsors, and partners into the right pathway.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {audienceCards.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-300/40 hover:bg-cyan-300/5">
                <Icon className="h-8 w-8 text-cyan-300" />
                <h3 className="mt-5 text-xl font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about-ncore-unite" className="mx-auto max-w-7xl px-6 py-16">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#0b1324] via-[#10253a] to-[#050816] p-8 md:p-12">
            <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-300/15 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-teal-300/10 blur-3xl" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">About NCORE Unite</p>
                <h2 className="mt-3 text-5xl font-black leading-tight">Preserving the legacy. Expanding the future.</h2>
                <p className="mt-6 text-base leading-8 text-slate-300">NCORE Unite is positioned as the next evolution of the NCORE ecosystem — a platform designed to honor the conference's decades-long legacy while expanding its reach through independent infrastructure, destination experiences, industry alignment, digital systems, and next-generation attendee engagement.</p>

                <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/25 p-6">
                  <p className="text-sm leading-7 text-slate-300"><span className="font-bold text-white">Historical foundation:</span> The National Conference on Race and Ethnicity in Higher Education has operated for decades as a national forum organized through the Southwest Center for Human Relations Studies at the University of Oklahoma, fostering equity, inclusion, cross-cultural dialogue, and professional development in higher education. The conference has grown into a trusted national gathering for educators, students, administrators, and advocates.</p>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-6">
                  <div className="flex items-center gap-3">
                    <Compass className="h-7 w-7 text-cyan-200" />
                    <h3 className="text-2xl font-black">Infrastructure Autonomy</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-200">NCORE Unite introduces the concept of independent systems infrastructure — including autonomous digital publishing, CEU distribution pathways, attendee intelligence systems, destination services, and long-term organizational scalability. The positioning emphasizes innovation without abandoning the conference's mission-centered identity.</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                  <div className="flex items-center gap-3">
                    <Globe2 className="h-7 w-7 text-teal-200" />
                    <h3 className="text-2xl font-black">A National + Global Gathering</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">NCORE Unite expands the experience beyond a traditional conference by integrating hospitality, tourism, entertainment, sports, culture, workforce pathways, technology, and multilingual attendee support through the NALU concierge system.</p>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-black/30 p-6">
                  <div className="flex items-center gap-3">
                    <HeartHandshake className="h-7 w-7 text-[#f4cf3d]" />
                    <h3 className="text-2xl font-black">Unity Through Transition</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-300">The NCORE Unite framework is designed to preserve the conference's historical influence while opening new pathways for institutions, students, sponsors, practitioners, workforce leaders, and community stakeholders to collaborate around the future of equity, access, belonging, and opportunity.</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-10 grid gap-5 lg:grid-cols-4">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <Users className="h-8 w-8 text-cyan-300" />
                <h3 className="mt-5 text-xl font-black">Community</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">A trusted gathering place for educators, students, administrators, and change-makers.</p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <GraduationCap className="h-8 w-8 text-teal-300" />
                <h3 className="mt-5 text-xl font-black">Education</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">Professional development, CEU pathways, workshops, journals, and collaborative learning.</p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <PartyPopper className="h-8 w-8 text-[#f4cf3d]" />
                <h3 className="mt-5 text-xl font-black">Destination Experience</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">Las Vegas hospitality, dining, entertainment, sports, culture, and immersive attendee engagement.</p>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
                <ShieldCheck className="h-8 w-8 text-cyan-300" />
                <h3 className="mt-5 text-xl font-black">Future Infrastructure</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">Independent systems, attendee intelligence, publishing evolution, and scalable partner architecture.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="concierge" className="mx-auto max-w-7xl px-6 py-16">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#f4cf3d]/20 blur-3xl" />
            <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-[#20a68f]/20 blur-3xl" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f4cf3d]">Slide 01 Page • Concierge</p>
                <h2 className="mt-3 text-5xl font-black">NCORE Vegas Concierge</h2>
                <p className="mt-5 text-base leading-8 text-slate-300">A colorful attendee marketplace inspired by the deck's unity artwork: entertainment, dining, golf, discount offers, ARIA vendor locations, and off-site participating vendors routed through NALU.</p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {vendorCategories.map((item) => <span key={item} className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-bold text-slate-200">{item}</span>)}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {conciergeOffers.map(({ icon: Icon, title, copy }) => (
                  <div key={title} className="rounded-[2rem] border border-white/10 bg-black/40 p-6">
                    <Icon className="h-8 w-8 text-[#f4cf3d]" />
                    <h3 className="mt-5 text-xl font-black">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="chairman-letter" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#7893a3]/25 via-slate-950 to-black p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8fd14f]">Slide 02 Page • Chairman Welcome</p>
                <h2 className="mt-3 text-5xl font-black">A Letter from Jeff Williams</h2>
                <p className="mt-4 text-lg font-semibold text-cyan-100">Chairman, TPG Worldwide</p>
                <p className="mt-5 text-sm leading-7 text-slate-400">Designed as the formal welcome page for guests, vendors, sponsors, hospitality partners, and participating Las Vegas businesses.</p>
              </div>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 text-sm leading-7 text-slate-300">
                <p className="font-bold text-white">Dear NCORE 2027 Guests, Vendors, Sponsors, and Community Partners,</p>
                <p className="mt-4">On behalf of TPG Worldwide, welcome to the NCORE 2027 Las Vegas destination experience. We are honored to help shape a platform that brings together higher education, cultural dialogue, hospitality, tourism, entertainment, business, and community impact in one of the most dynamic cities in the world.</p>
                <p className="mt-4">Our goal is simple: create an environment where attendees feel informed, supported, welcomed, and connected. For participating vendors and partners, this platform is designed to create responsible visibility, meaningful engagement, and commercial opportunity while respecting the mission-driven spirit of NCORE.</p>
                <p className="mt-4">Through ARIA Las Vegas, NALU concierge intelligence, Majestra-facilitated live programming, and TPG Worldwide's destination infrastructure, we intend to build more than a conference website. We intend to build a living ecosystem where guests can learn, gather, dine, celebrate, explore, and access resources with confidence.</p>
                <p className="mt-4">We welcome every vendor, guest, institution, sponsor, and community stakeholder into this experience and look forward to working together to make NCORE 2027 a thoughtful, productive, and unforgettable Las Vegas destination event.</p>
                <p className="mt-6 font-bold text-white">Respectfully,<br />Jeff Williams<br />Chairman, TPG Worldwide</p>
              </div>
            </div>
          </div>
        </section>

        <section id="hands" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2.5rem] border border-white/10 bg-[#234a57] p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f5a313]">Slide 03 Page • H.A.N.D.S.</p>
                <h2 className="mt-3 text-5xl font-black">Helping Americans Negotiate Dwelling Shortages</h2>
                <p className="mt-5 text-base leading-8 text-slate-200">H.A.N.D.S. positions NCORE 2027 as more than an academic gathering. It creates a public-facing resource path for Americans seeking affordable housing access, sustainable mortgage education, responsible lending pathways, and down payment assistance navigation.</p>
                <div className="mt-7 rounded-[2rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-sm leading-7 text-slate-300"><span className="font-bold text-white">Positioning:</span> This page should not promise loan approval, subsidy availability, or government benefit access. It should route users to education, participating lenders, housing nonprofits, municipal resources, and verified assistance channels.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {handsPillars.map((item, idx) => (
                  <div key={item.title} className="rounded-[2rem] border border-white/10 bg-black/25 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5a313] text-lg font-black text-black">{idx + 1}</div>
                    <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="hand" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2.5rem] border border-white/10 bg-[#234a57] p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div className="grid gap-4 sm:grid-cols-2">
                {handPillars.map((item, idx) => (
                  <div key={item.title} className="rounded-[2rem] border border-white/10 bg-black/25 p-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2f8bc2] text-lg font-black text-white">{idx + 1}</div>
                    <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{item.copy}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#2f8bc2]">Slide 04 Page • H.A.N.D.</p>
                <h2 className="mt-3 text-5xl font-black">Helping Asylum Seekers Navigate Displacement</h2>
                <p className="mt-5 text-base leading-8 text-slate-200">H.A.N.D. frames displacement as a humanity issue and a resource allocation challenge. The page should support compassionate navigation while organizing real-world pathways for communication, housing, food, legal referral, transportation, clothing, and integration support.</p>
                <div className="mt-7 rounded-[2rem] border border-white/10 bg-black/20 p-5">
                  <p className="text-sm leading-7 text-slate-300"><span className="font-bold text-white">Operating principle:</span> Help people understand available resources without making immigration, legal, benefit, housing, or financial promises. NALU should direct users to verified partners, official sources, and approved service providers.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="aria" className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-[1fr_1fr] lg:items-stretch">
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cyan-300/10 to-teal-300/5 p-8">
            <div className="flex items-center gap-3 text-cyan-200"><Hotel className="h-6 w-6" /><p className="text-xs font-bold uppercase tracking-[0.3em]">ARIA Las Vegas</p></div>
            <h2 className="mt-5 text-5xl font-black">Venue hold secured for 2027 positioning.</h2>
            <p className="mt-5 text-base leading-7 text-slate-300">ARIA operates as the attendee anchor: hotel, meeting environment, hospitality zone, sponsor platform, receptions, breakout activity, and a central launch point for the Las Vegas experience.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Rooms + Hospitality", "Breakout Sessions", "VIP Receptions", "Sponsor Lounges"].map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm font-bold">{item}</div>)}
            </div>
          </div>
          <MiniMap />
        </section>

        <section id="vegas" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-teal-200">Las Vegas Destination Layer</p>
                <h2 className="mt-2 text-4xl font-black md:text-5xl">Conference by day. Destination by design.</h2>
              </div>
              <a href="#nalu" className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/30 px-5 py-3 text-sm font-bold text-cyan-100">Plan with NALU <ArrowRight className="h-4 w-4" /></a>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {vegasItems.map(({ icon: Icon, title, copy }) => (
                <div key={title} className="rounded-[2rem] bg-slate-950/80 p-6">
                  <Icon className="h-8 w-8 text-teal-300" />
                  <h3 className="mt-5 text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="program" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-9">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">Integrated Slide Narrative</p>
            <h2 className="mt-2 text-4xl font-black md:text-5xl">TPG/NCORE commercial story blocks.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {slideDeck.map((slide) => (
              <div key={slide.title} className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900 to-black p-7 transition hover:border-cyan-300/40">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan-300">{slide.eyebrow}</p>
                <h3 className="mt-4 text-3xl font-black">{slide.title}</h3>
                <p className="mt-2 text-base leading-7 text-teal-100">{slide.subtitle}</p>
                <div className="mt-6 space-y-3">
                  {slide.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 text-sm leading-6 text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                      {bullet}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="nalu" className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-300">AI Concierge</p>
            <h2 className="mt-2 text-5xl font-black">NALU is the attendee help desk.</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">NALU should be deployed as both a neural enterprise button and a consumer-facing mascot assistant across the NCORE site. It routes every attendee question into answers, recommendations, registration pathways, partner offers, and Las Vegas destination support.</p>
            <div className="mt-7 grid gap-3">
              {["Conference questions", "ARIA logistics", "Dining and tourism", "Sports and entertainment", "Sponsor activations", "Group and institutional support"].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold text-slate-200"><MessageCircle className="h-5 w-5 text-cyan-300" />{item}</div>
              ))}
            </div>
          </div>
          <NaluWidget />
        </section>

        <section id="partners" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 lg:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-teal-200">Commercial Pathways</p>
              <h2 className="mt-3 text-4xl font-black">The site converts attention into action.</h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Attendee waitlist", "Institutional group interest", "Official housing inquiries", "Sponsor and exhibitor interest", "Media and cultural activations", "Future venue-hold partnerships", "Dining and tourism packages", "VIP hospitality requests"].map((item) => (
                  <div key={item} className="rounded-2xl bg-slate-950/80 p-4 text-sm font-bold text-slate-200">{item}</div>
                ))}
              </div>
            </div>
            <div id="institutional" className="rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 p-7">
              <Building2 className="h-8 w-8 text-cyan-200" />
              <h3 className="mt-5 text-3xl font-black">Institutional Micro-Site Linkage</h3>
              <p className="mt-4 text-sm leading-7 text-slate-300">This consumer attendee site should sit in front of the existing institutional microsite. Consumer users see the event experience first; universities, sponsors, venues, and partners route deeper into the TPG/NCORE platform architecture.</p>
              <a href="#program" className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black">View Platform Story <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        <section id="waitlist" className="mx-auto max-w-7xl px-6 py-16 pb-28">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cyan-300/20 via-slate-950 to-teal-300/10 p-8 md:p-12">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-100">Join the 2027 Interest List</p>
                <h2 className="mt-3 text-5xl font-black">Be first in line for NCORE Las Vegas updates.</h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">Use this section as the conversion block for attendees, institutions, sponsors, exhibitors, hotel partners, dining partners, entertainment partners, sports partners, and future venue-hold conversations.</p>
              </div>
              <form className="rounded-[2rem] border border-white/10 bg-black/50 p-5 backdrop-blur-xl" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-3">
                  <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none placeholder:text-slate-500" placeholder="Full name" />
                  <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white outline-none placeholder:text-slate-500" placeholder="Email address" />
                  <select className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-4 text-sm text-white outline-none">
                    <option>Attendee</option>
                    <option>Institution / University</option>
                    <option>Sponsor / Brand Partner</option>
                    <option>Hotel / Venue / Tourism Partner</option>
                    <option>Media / Entertainment Partner</option>
                  </select>
                  <button className="rounded-2xl bg-white px-5 py-4 text-sm font-black text-black">Request Priority Updates</button>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">Form is a front-end placeholder for CRM, ticketing, email campaign, and NALU routing integration.</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <a href="#nalu" className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-300 text-black shadow-2xl shadow-cyan-500/30 ring-4 ring-cyan-300/20">
        <Headphones className="h-7 w-7" />
      </a>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-slate-500">
        <p>NCORE 2027 Commercial Attendee Site • TPG Worldwide • ARIA Las Vegas • NALU Concierge • Majestra-Facilitated NCORE Live</p>
      </footer>
    </div>
  );
}
