import { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import { NeuralWidget } from "./NeuralWidget";
import {
  Search, MapPin, Calendar, Hotel, Music, Utensils, Trophy,
  Users, ShieldCheck, Building2, Sparkles, ArrowRight, Mic2,
  Globe2, Handshake, Ticket, Plane, Sun, Moon, WalletCards,
  Headphones, Loader2, Languages,
  GraduationCap, BadgeCheck, Landmark, CheckCircle2,
  Compass, HeartHandshake, PartyPopper,
} from "lucide-react";

const WWTC_KEY  = "95a35451.30ece979-c4bd-447b-8b1e-fd9a6c77418b";
const WWTC_BASE = "https://api.worldwidetechconnections.com/services/tts";

const LANGUAGES = [
  { code: "english-united-states", label: "English (US)" },
  { code: "spanish-international", label: "Español" },
  { code: "french-france",         label: "Français" },
  { code: "portuguese-brazil",     label: "Português (BR)" },
  { code: "chinese-mandarin",      label: "中文 (Mandarin)" },
  { code: "arabic",                label: "العربية" },
  { code: "hindi",                 label: "हिन्दी" },
  { code: "japanese",              label: "日本語" },
  { code: "korean",                label: "한국어" },
  { code: "german",                label: "Deutsch" },
  { code: "italian",               label: "Italiano" },
  { code: "russian",               label: "Русский" },
  { code: "swahili",               label: "Kiswahili" },
  { code: "vietnamese",            label: "Tiếng Việt" },
  { code: "tagalog",               label: "Filipino" },
  { code: "haitian-creole",        label: "Kreyòl Ayisyen" },
  { code: "polish",                label: "Polski" },
  { code: "dutch",                 label: "Nederlands" },
  { code: "turkish",               label: "Türkçe" },
  { code: "thai",                  label: "ภาษาไทย" },
];

const NeuralIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="3.5" fill="white"/>
    <circle cx="15" cy="5"  r="2.2" fill="white" opacity="0.85"/>
    <circle cx="23.5" cy="10" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="23.5" cy="20" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="15" cy="25" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="6.5" cy="20" r="2.2" fill="white" opacity="0.85"/>
    <circle cx="6.5" cy="10" r="2.2" fill="white" opacity="0.85"/>
    <line x1="15" y1="7.2"   x2="15"   y2="11.5" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="21.7" y1="11.2" x2="18.2" y2="13.2" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="21.7" y1="18.8" x2="18.2" y2="16.8" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="15" y1="22.8"  x2="15"   y2="18.5" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="8.3" y1="18.8" x2="11.8" y2="16.8" stroke="white" strokeWidth="1" opacity="0.45"/>
    <line x1="8.3" y1="11.2" x2="11.8" y2="13.2" stroke="white" strokeWidth="1" opacity="0.45"/>
    <circle cx="15" cy="15" r="7"  stroke="white" strokeWidth="0.5" opacity="0.15"/>
    <circle cx="15" cy="15" r="12" stroke="white" strokeWidth="0.4" opacity="0.08"/>
  </svg>
);

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

const nav = [
  { label: "Overview",    href: "#overview"     },
  { label: "Destination", href: "#destination"  },
  { label: "Program",     href: "#program"      },
  { label: "Concierge",   href: "#concierge"    },
  { label: "H.A.N.D.S.",  href: "#hands"        },
  { label: "H.A.N.D.",    href: "#hand"         },
  { label: "NALU",        href: "#nalu"         },
  { label: "Partners",    href: "#partners"     },
  { label: "Waitlist",    href: "#waitlist"     },
];

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

// ── Concierge data ────────────────────────────────────────────
const conciergeOffers = [
  { icon: Music,       title: "Entertainment Access",  copy: "Curated ticket links, concierge referrals, sponsor-hosted receptions, artist showcases, cultural events, comedy, concerts, residencies, and NCORE Live experiences." },
  { icon: Utensils,    title: "Food + Beverage",        copy: "Preferred dining windows, group dinner options, reception menus, chef partnerships, ARIA vendor spotlights, and off-site participating restaurant offers." },
  { icon: Trophy,      title: "Golf + Recreation",      copy: "Preferred tee-time coordination, group golf outings, sponsor-hosted foursomes, executive networking rounds, and destination leisure packages." },
  { icon: WalletCards, title: "Discount Marketplace",   copy: "Vendor offers, attendee perks, promotional codes, sponsor bundles, group savings, and NALU-routed recommendations for participating merchants." },
];

const vendorCategories = [
  "ARIA restaurants", "ARIA nightlife and lounges", "Off-site restaurants",
  "Golf clubs", "Entertainment venues", "Retail and wellness", "Transportation", "Tourism operators",
];

// ── H.A.N.D.S. data ───────────────────────────────────────────
const handsPillars = [
  { title: "Affordable Housing Access",  copy: "Connect participants to housing education, rental readiness, affordable housing navigation, and community-based intake pathways." },
  { title: "Mortgage Readiness",         copy: "Support qualified families with education around credit, income documentation, lending pathways, mortgage products, and sustainable homeownership." },
  { title: "Down Payment Support",       copy: "Route users toward down payment assistance, grants, employer-assisted housing models, local programs, and lender-partner resources." },
  { title: "Resource Navigation",        copy: "Use NALU and TPG partner systems to simplify intake, triage, referrals, eligibility, and follow-up across public, private, and nonprofit channels." },
];

// ── H.A.N.D. data ─────────────────────────────────────────────
const handPillars = [
  { title: "Humanity First",               copy: "Treat asylum seekers as people navigating crisis, trauma, uncertainty, language barriers, and displacement — not merely as case files or statistics." },
  { title: "Resource Allocation",          copy: "Coordinate housing, food, clothing, translation, transportation, communication, legal referrals, workforce readiness, and community placement support." },
  { title: "Navigation + Stabilization",   copy: "Help families understand where to go, who to contact, what documents matter, and how to access lawful, practical, and local support pathways." },
  { title: "Community Integration",        copy: "Support receiving communities with better coordination, reduced confusion, partner accountability, and compassionate service delivery." },
];

// ── Audience gateway cards ────────────────────────────────────
const audienceCards = [
  { icon: GraduationCap, title: "Students",           copy: "Find sessions, cultural activations, networking pathways, mentor moments, and Las Vegas experiences curated around learning and belonging." },
  { icon: Users,         title: "Faculty + Staff",    copy: "Access professional development, institutional collaboration, dialogue tracks, and destination support built around NCORE's academic mission." },
  { icon: Landmark,      title: "Institutions",       copy: "Coordinate group attendance, official housing, sponsorship, visibility, recruitment, alumni engagement, and executive receptions." },
  { icon: BadgeCheck,    title: "Sponsors + Partners", copy: "Connect through hospitality, exhibit packages, brand activations, content, media, dining, tourism, sports, and live event inventory." },
];

// ── 10-slide program deck ──────────────────────────────────────
const slideDeck = [
  { eyebrow: "Slide 01", title: "NCORE 2027 • Las Vegas",       subtitle: "A TPG Worldwide destination platform anchored at ARIA Las Vegas.",                          bullets: ["Official 2027 destination positioning", "Higher education + culture + hospitality", "Integrated live-event and sponsor architecture"] },
  { eyebrow: "Slide 02", title: "Why NCORE Matters",            subtitle: "A national forum for identity, access, opportunity, dialogue, and institutional growth.",    bullets: ["Race, ethnicity, culture, and human identity", "Student success and inclusive academic pathways", "Faculty, staff, executive, and student engagement"] },
  { eyebrow: "Slide 03", title: "Why Las Vegas",                subtitle: "A global convention, tourism, dining, sports, and entertainment engine.",                   bullets: ["Premium hospitality infrastructure", "World-class destination experiences", "Scalable room block and sponsor inventory"] },
  { eyebrow: "Slide 04", title: "ARIA Venue Hold",              subtitle: "A luxury conference environment built for high-touch programming and attendee flow.",        bullets: ["Ballrooms, breakouts, receptions", "Integrated lodging and amenities", "VIP hospitality and partner events"] },
  { eyebrow: "Slide 05", title: "TPG Worldwide Platform",       subtitle: "The commercial layer around the conference, destination, audience, and experience.",         bullets: ["Travel + hospitality + entertainment + sports", "Sponsor, exhibitor, and content monetization", "Future venue-hold pipeline"] },
  { eyebrow: "Slide 06", title: "NALU AI Concierge",            subtitle: "The always-on information engine for attendees, partners, and institutions.",                bullets: ["NCORE and ARIA questions", "Dining, tourism, sports, and entertainment", "Multilingual support and real-time guidance"] },
  { eyebrow: "Slide 07", title: "NCORE Live by Majestra",       subtitle: "A live programming and activation layer for culture, media, and premium experiences.",      bullets: ["Mainstage and cultural activations", "Private receptions and sponsor events", "Production, venue, and artist alignment"] },
  { eyebrow: "Slide 08", title: "Destination Experiences",      subtitle: "Conference attendance connected to a full Las Vegas attendee journey.",                      bullets: ["Curated dining and entertainment", "Sports and nightlife recommendations", "Student, faculty, and executive tracks"] },
  { eyebrow: "Slide 09", title: "Partner Revenue Architecture", subtitle: "Commercial participation without losing the mission-driven center of NCORE.",               bullets: ["Official housing and room blocks", "Exhibitor and sponsor packages", "Media, content, VIP, and tourism overlays"] },
  { eyebrow: "Slide 10", title: "The Road to 2027",             subtitle: "A national conference platform with Las Vegas as the first destination anchor.",            bullets: ["Attendee acquisition site", "Institutional partner portal", "Future cities and venue holds"] },
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
  const [query, setQuery]     = useState("Where should I eat near ARIA after the NCORE keynote?");
  const [language, setLanguage] = useState("english-united-states");
  const [translated, setTranslated] = useState<{ text: string; audio: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const answer = useMemo(() => {
    if (query.toLowerCase().includes("aria"))     return "NALU can answer venue logistics, room block guidance, meeting locations, attendee flow, dining near ARIA, transportation, accessibility, entertainment, and curated Las Vegas options.";
    if (query.toLowerCase().includes("register")) return "NALU can route users to official registration information when released, explain deadlines, application steps, travel planning, and attendee support pathways.";
    if (query.toLowerCase().includes("program"))  return "NALU can explain expected program tracks, speakers, sessions, partner activations, student/faculty engagement, and NCORE Live updates as they become available.";
    return "NALU will be trained as the NCORE 2027 information concierge: event Q&A, ARIA venue support, Las Vegas destination intelligence, travel, food, sports, entertainment, and TPG partner activations.";
  }, [query]);

  useEffect(() => {
    setTranslated(null); setError(null);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlaying(false);
  }, [query, language]);

  async function handleTranslate() {
    if (language === "english-united-states") return;
    setLoading(true); setError(null); setTranslated(null);
    try {
      // Step 1: translate NALU's English answer into the target language
      const tttUrl = `${WWTC_BASE}/english-united-states/${language}?text=${encodeURIComponent(answer)}&serviceCode=ttt&sourceLanguageCode=english-united-states&targetLanguageCode=${language}`;
      const tttRes = await fetch(tttUrl, { method: "POST", headers: { accept: "application/json", "api-authorization": WWTC_KEY } });
      if (!tttRes.ok) throw new Error();
      const { translated_text } = await tttRes.json();

      // Step 2: get audio of the translated answer spoken in the target language
      const ttsUrl = `${WWTC_BASE}/${language}/${language}?text=${encodeURIComponent(translated_text)}&serviceCode=tts&sourceLanguageCode=${language}&targetLanguageCode=${language}`;
      const ttsRes = await fetch(ttsUrl, { method: "POST", headers: { accept: "application/json", "api-authorization": WWTC_KEY } });
      if (!ttsRes.ok) throw new Error();
      const { audio } = await ttsRes.json();

      setTranslated({ text: translated_text, audio });
    } catch { setError("Translation unavailable — please try again."); }
    setLoading(false);
  }

  function playAudio() {
    if (!translated?.audio) return;
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    const bytes = atob(translated.audio);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    const blob = new Blob([arr], { type: "audio/wav" });
    const audio = new Audio(URL.createObjectURL(blob));
    audioRef.current = audio;
    audio.onended = () => setPlaying(false);
    audio.play(); setPlaying(true);
  }

  const isEnglish = language === "english-united-states";

  return (
    <div className="rounded-[2rem] p-6 shadow-2xl" style={{ background: `${A.teal}18`, border: `1px solid ${A.teal}40` }}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", boxShadow: "0 4px 16px rgba(99,102,241,0.35)" }}>
            <NeuralIcon size={24} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: A.teal }}>NALU Query Engine</p>
            <h3 className="text-2xl font-semibold" style={{ color: T.text }}>Ask anything about NCORE 2027</h3>
          </div>
        </div>
        {/* Language selector */}
        <div className="flex items-center gap-2 rounded-xl px-3 py-2" style={{ background: T.glassBg, border: `1px solid ${T.border}` }}>
          <Languages className="h-4 w-4 shrink-0" style={{ color: A.teal }} />
          <select value={language} onChange={(e) => setLanguage(e.target.value)}
            className="bg-transparent text-xs font-bold outline-none" style={{ color: T.text }}>
            {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
        </div>
      </div>

      {/* Query input */}
      <div className="mt-6 flex gap-3 rounded-2xl p-3" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
        <Search className="mt-3 h-5 w-5 shrink-0" style={{ color: T.subtleMuted }} />
        <textarea value={query} onChange={(e) => setQuery(e.target.value)}
          className="min-h-24 w-full resize-none bg-transparent p-2 text-sm outline-none" style={{ color: T.text }}
          placeholder="Ask NALU about NCORE, ARIA, Las Vegas, dining, entertainment, sports, travel, or the 2027 program…" />
      </div>

      {/* English answer */}
      <div className="mt-4 rounded-2xl p-4 text-sm leading-6" style={{ background: T.glassBg, color: T.muted }}>
        <span className="font-semibold" style={{ color: A.teal }}>NALU Response Preview:</span>{" "}{answer}
      </div>

      {/* Translate button */}
      {!isEnglish && !translated && (
        <button onClick={handleTranslate} disabled={loading}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold disabled:opacity-60"
          style={{ background: A.teal, color: "#fff" }}>
          {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Translating…</> : <><Languages className="h-4 w-4" /> Translate &amp; Listen</>}
        </button>
      )}

      {error && <p className="mt-3 text-center text-xs" style={{ color: A.red }}>{error}</p>}

      {/* Translated result + audio */}
      {translated && (
        <div className="mt-3 rounded-2xl p-4" style={{ background: `${A.teal}15`, border: `1px solid ${A.teal}35` }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: A.teal }}>
            {LANGUAGES.find(l => l.code === language)?.label} Translation
          </p>
          <p className="text-sm leading-6" style={{ color: T.text }}>{translated.text}</p>
          <button onClick={playAudio} disabled={playing}
            className="mt-3 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold disabled:opacity-50"
            style={{ border: `1px solid ${A.teal}50`, color: A.teal, background: `${A.teal}12` }}>
            <Headphones className="h-4 w-4" />
            {playing ? "Playing…" : "▶ Play Audio"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function Ncore2027Microsite() {
  const [dark, setDark] = useState(true);

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
          <a href="#overview" className="flex items-center gap-3 transition-opacity hover:opacity-80">
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
          </a>

          <nav className="hidden items-center gap-5 text-sm lg:flex" style={{ color: T.muted }}>
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition-colors hover:opacity-80"
                style={{ color: T.muted }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
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
          <div className="absolute inset-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c6/Aria_Las_Vegas.JPG"
              alt="ARIA Resort & Casino Las Vegas"
              className="h-full w-full object-cover object-center"
            />
            <div
              className="absolute inset-0 transition-colors duration-300"
              style={{
                background: `linear-gradient(to right, ${T.heroL} 25%, ${T.heroR} 65%, transparent 100%), linear-gradient(to bottom, transparent 55%, ${T.heroFade} 100%)`,
              }}
            />
          </div>

          <BubbleCluster className="pointer-events-none absolute -right-10 top-0 h-full w-auto max-w-[280px] opacity-80 lg:max-w-sm" />

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

        {/* ── Chairman Welcome Letter ──────────────────────────── */}
        <section id="welcome" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2.5rem] p-8 md:p-12 shadow-2xl" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: A.lime }}>Chairman Welcome</p>
                <h2 className="mt-3 text-5xl font-black" style={{ color: T.text }}>A Letter from Jeff Williams</h2>
                <p className="mt-4 text-lg font-semibold" style={{ color: A.teal }}>Chairman, TPG Worldwide</p>
                <p className="mt-5 text-sm leading-7" style={{ color: T.muted }}>
                  Jeff Williams brings decades of experience in event infrastructure, destination programming, and institutional partnership to NCORE 2027 — welcoming every guest, vendor, sponsor, and community partner into the Las Vegas experience.
                </p>
              </div>
              <div className="rounded-[2rem] p-7 text-sm leading-7" style={{ background: T.panelAlt, border: `1px solid ${T.border}`, color: T.muted }}>
                <p className="font-bold" style={{ color: T.text }}>Dear NCORE 2027 Guests, Vendors, Sponsors, and Community Partners,</p>
                <p className="mt-4">On behalf of TPG Worldwide, welcome to the NCORE 2027 Las Vegas destination experience. We are honored to help shape a platform that brings together higher education, cultural dialogue, hospitality, tourism, entertainment, business, and community impact in one of the most dynamic cities in the world.</p>
                <p className="mt-4">Our goal is simple: create an environment where attendees feel informed, supported, welcomed, and connected. For participating vendors and partners, this platform is designed to create responsible visibility, meaningful engagement, and commercial opportunity while respecting the mission-driven spirit of NCORE.</p>
                <p className="mt-4">Through ARIA Las Vegas, NALU concierge intelligence, Majestra-facilitated live programming, and TPG Worldwide's destination infrastructure, we intend to build more than a conference website. We intend to build a living ecosystem where guests can learn, gather, dine, celebrate, explore, and access resources with confidence.</p>
                <p className="mt-4">We welcome every vendor, guest, institution, sponsor, and community stakeholder into this experience and look forward to working together to make NCORE 2027 a thoughtful, productive, and unforgettable Las Vegas destination event.</p>
                <p className="mt-6 font-bold" style={{ color: T.text }}>Respectfully,<br />Jeff Williams<br />Chairman, TPG Worldwide</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Audience Gateway ────────────────────────────────────── */}
        <section id="audience" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: A.teal }}>Attendee Gateway</p>
              <h2 className="mt-2 text-4xl font-bold md:text-5xl" style={{ color: T.text }}>One front door for every NCORE journey.</h2>
            </div>
            <p className="max-w-xl text-sm leading-6" style={{ color: T.muted }}>Every attendee, institution, sponsor, and partner has a place at NCORE 2027. Find your pathway and connect to the right experience.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {audienceCards.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="rounded-[2rem] p-6" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
                <Icon className="h-8 w-8" style={{ color: A.teal }} />
                <h3 className="mt-5 text-xl font-semibold" style={{ color: T.text }}>{title}</h3>
                <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Destination map ──────────────────────────────────── */}
        <section id="destination" className="mx-auto max-w-7xl px-6 py-12">
          <DestinationMapCard T={T} />
        </section>

        {/* ── Program tiles ────────────────────────────────────── */}
        <section id="program" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: A.orange }}>NCORE 2027 Conference</p>
            <h2 className="mt-2 text-4xl font-bold" style={{ color: T.text }}>What to expect at NCORE</h2>
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

        {/* ── 10-Slide Program Deck ────────────────────────────── */}
        <section id="slide-deck" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-9">
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: A.teal }}>Platform Overview</p>
            <h2 className="mt-2 text-4xl font-bold" style={{ color: T.text }}>The NCORE 2027 story — from vision to venue.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {slideDeck.map((slide) => (
              <div key={slide.title} className="rounded-[2rem] p-7" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
                <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: A.teal }}>{slide.eyebrow}</p>
                <h3 className="mt-4 text-3xl font-bold" style={{ color: T.text }}>{slide.title}</h3>
                <p className="mt-2 text-base leading-7" style={{ color: A.orange }}>{slide.subtitle}</p>
                <div className="mt-6 space-y-3">
                  {slide.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3 rounded-2xl p-4 text-sm leading-6" style={{ background: T.panelAlt, color: T.muted }}>
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: A.teal }} />
                      {bullet}
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
              ARIA serves as the anchor for rooms, meetings, breakouts, VIP activations, partner hospitality, private receptions, sponsor lounges, speaker support, and TPG-managed event overlays.
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
              An AEG Live-style event infrastructure pipeline covering venue holds, room blocks, sponsor inventory, branded activations, ticketing, destination programming, and event monetization.
            </p>
          </div>
        </section>

        {/* ── NCORE Unite ──────────────────────────────────────── */}
        <section id="ncore-unite" className="mx-auto max-w-7xl px-6 py-16">
          <div className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 shadow-2xl" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
            <div className="absolute -left-24 top-0 h-72 w-72 rounded-full blur-3xl" style={{ background: `${A.teal}20` }} />
            <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full blur-3xl" style={{ background: `${A.orange}15` }} />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: A.teal }}>About NCORE Unite</p>
                <h2 className="mt-3 text-5xl font-black leading-tight" style={{ color: T.text }}>Preserving the legacy. Expanding the future.</h2>
                <p className="mt-6 text-base leading-8" style={{ color: T.muted }}>NCORE Unite is positioned as the next evolution of the NCORE ecosystem — a platform designed to honor the conference's decades-long legacy while expanding its reach through independent infrastructure, destination experiences, industry alignment, digital systems, and next-generation attendee engagement.</p>
                <div className="mt-8 rounded-[2rem] p-6" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                  <p className="text-sm leading-7" style={{ color: T.muted }}>
                    <span className="font-bold" style={{ color: T.text }}>Historical foundation:</span> The National Conference on Race and Ethnicity in Higher Education has operated for decades as a national forum organized through the Southwest Center for Human Relations Studies at the University of Oklahoma, fostering equity, inclusion, cross-cultural dialogue, and professional development in higher education. The conference has grown into a trusted national gathering for educators, students, administrators, and advocates.
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-[2rem] p-6" style={{ background: `${A.teal}15`, border: `1px solid ${A.teal}35` }}>
                  <div className="flex items-center gap-3">
                    <Compass className="h-7 w-7" style={{ color: A.teal }} />
                    <h3 className="text-2xl font-black" style={{ color: T.text }}>Infrastructure Autonomy</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7" style={{ color: T.muted }}>NCORE Unite introduces the concept of independent systems infrastructure — including autonomous digital publishing, CEU distribution pathways, attendee intelligence systems, destination services, and long-term organizational scalability.</p>
                </div>
                <div className="rounded-[2rem] p-6" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                  <div className="flex items-center gap-3">
                    <Globe2 className="h-7 w-7" style={{ color: A.blue }} />
                    <h3 className="text-2xl font-black" style={{ color: T.text }}>A National + Global Gathering</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7" style={{ color: T.muted }}>NCORE Unite expands the experience beyond a traditional conference by integrating hospitality, tourism, entertainment, sports, culture, workforce pathways, technology, and multilingual attendee support through the NALU concierge system.</p>
                </div>
                <div className="rounded-[2rem] p-6" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                  <div className="flex items-center gap-3">
                    <HeartHandshake className="h-7 w-7" style={{ color: A.orange }} />
                    <h3 className="text-2xl font-black" style={{ color: T.text }}>Unity Through Transition</h3>
                  </div>
                  <p className="mt-4 text-sm leading-7" style={{ color: T.muted }}>The NCORE Unite framework is designed to preserve the conference's historical influence while opening new pathways for institutions, students, sponsors, practitioners, workforce leaders, and community stakeholders to collaborate around equity, access, belonging, and opportunity.</p>
                </div>
              </div>
            </div>
            <div className="relative z-10 mt-10 grid gap-5 lg:grid-cols-4">
              {[
                { icon: Users,         title: "Community",              copy: "A trusted gathering place for educators, students, administrators, and change-makers.",                                       color: A.teal   },
                { icon: GraduationCap, title: "Education",              copy: "Professional development, CEU pathways, workshops, journals, and collaborative learning.",                                    color: A.orange },
                { icon: PartyPopper,   title: "Destination Experience", copy: "Las Vegas hospitality, dining, entertainment, sports, culture, and immersive attendee engagement.",                           color: A.lime   },
                { icon: ShieldCheck,   title: "Future Infrastructure",  copy: "Independent systems, attendee intelligence, publishing evolution, and scalable partner architecture.",                        color: A.teal   },
              ].map(({ icon: Icon, title, copy, color }) => (
                <div key={title} className="rounded-[2rem] p-6" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                  <Icon className="h-8 w-8" style={{ color }} />
                  <h3 className="mt-5 text-xl font-semibold" style={{ color: T.text }}>{title}</h3>
                  <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NCORE Live ───────────────────────────────────────── */}
        <section id="ncore-live" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2.5rem] p-8 shadow-2xl" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: A.teal }}>Live Event Programming</p>
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

        {/* ── NCORE Vegas Concierge ─────────────────────────────── */}
        <section id="concierge" className="mx-auto max-w-7xl px-6 py-16">
          <div className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 shadow-2xl" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl" style={{ background: `${A.orange}22` }} />
            <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full blur-3xl" style={{ background: `${A.teal}22` }} />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: A.orange }}>NCORE Vegas Concierge</p>
                <h2 className="mt-3 text-5xl font-black" style={{ color: T.text }}>NCORE Vegas Concierge</h2>
                <p className="mt-5 text-base leading-8" style={{ color: T.muted }}>
                  Entertainment, dining, golf, discount offers, ARIA vendor locations, and off-site participating vendors — all connected and routed through NALU for a seamless attendee experience.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {vendorCategories.map((item) => (
                    <span key={item} className="rounded-full px-4 py-2 text-xs font-bold" style={{ background: T.panelAlt, border: `1px solid ${T.border}`, color: T.muted }}>{item}</span>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {conciergeOffers.map(({ icon: Icon, title, copy }) => (
                  <div key={title} className="rounded-[2rem] p-6" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                    <Icon className="h-8 w-8" style={{ color: A.orange }} />
                    <h3 className="mt-5 text-xl font-black" style={{ color: T.text }}>{title}</h3>
                    <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── H.A.N.D.S. Housing Access ────────────────────────── */}
        <section id="hands" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2.5rem] p-8 md:p-12 shadow-2xl" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
            <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: A.orange }}>H.A.N.D.S.</p>
                <h2 className="mt-3 text-4xl font-black leading-tight" style={{ color: T.text }}>Helping Americans Negotiate Dwelling Shortages</h2>
                <p className="mt-5 text-base leading-8" style={{ color: T.muted }}>
                  H.A.N.D.S. positions NCORE 2027 as more than an academic gathering. It creates a public-facing resource path for Americans seeking affordable housing access, sustainable mortgage education, responsible lending pathways, and down payment assistance navigation.
                </p>
                <div className="mt-7 rounded-[2rem] p-5" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                  <p className="text-sm leading-7" style={{ color: T.muted }}>
                    <span className="font-bold" style={{ color: T.text }}>Our commitment:</span>{" "}
                    We connect people to education, participating lenders, housing nonprofits, municipal resources, and verified assistance channels — providing guidance without making loan, subsidy, or benefit promises.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {handsPillars.map((item, idx) => (
                  <div key={item.title} className="rounded-[2rem] p-6" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-black"
                      style={{ background: A.orange, color: "#000" }}
                    >
                      {idx + 1}
                    </div>
                    <h3 className="mt-5 text-xl font-black" style={{ color: T.text }}>{item.title}</h3>
                    <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>{item.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── H.A.N.D. Asylum Displacement ─────────────────────── */}
        <section id="hand" className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2.5rem] p-8 md:p-12 shadow-2xl" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
            <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
              <div className="grid gap-4 sm:grid-cols-2">
                {handPillars.map((item, idx) => (
                  <div key={item.title} className="rounded-[2rem] p-6" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-black text-white"
                      style={{ background: A.blue }}
                    >
                      {idx + 1}
                    </div>
                    <h3 className="mt-5 text-xl font-black" style={{ color: T.text }}>{item.title}</h3>
                    <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>{item.copy}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: A.blue }}>H.A.N.D.</p>
                <h2 className="mt-3 text-4xl font-black leading-tight" style={{ color: T.text }}>Helping Asylum Seekers Navigate Displacement</h2>
                <p className="mt-5 text-base leading-8" style={{ color: T.muted }}>
                  H.A.N.D. frames displacement as a humanity issue and a resource coordination challenge. We support compassionate navigation and organize real-world pathways for communication, housing, food, legal referral, transportation, clothing, and community integration.
                </p>
                <div className="mt-7 rounded-[2rem] p-5" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                  <p className="text-sm leading-7" style={{ color: T.muted }}>
                    <span className="font-bold" style={{ color: T.text }}>Our approach:</span>{" "}
                    NALU connects people to verified partners, official sources, and approved service providers — helping families understand available resources without making immigration, legal, benefit, or financial promises.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── NALU section ─────────────────────────────────────── */}
        <section id="nalu" className="mx-auto grid max-w-7xl gap-6 px-6 py-16 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.3em]" style={{ color: A.teal }}>Attendee Intelligence</p>
            <h2 className="mt-3 text-4xl font-bold" style={{ color: T.text }}>NALU becomes the always-on NCORE concierge.</h2>
            <p className="mt-4 leading-7" style={{ color: T.muted }}>
              NALU is your always-on NCORE concierge — answering event questions, routing attendees, surfacing Las Vegas recommendations, and supporting partners, sponsors, students, faculty, exhibitors, and executives around the clock.
            </p>
            <div className="mt-6 grid gap-3">
              {[
                { Icon: Plane,    label: "Flight, hotel, and travel planning guidance" },
                { Icon: Utensils, label: "Dining, group meals, and ARIA restaurant recommendations" },
                { Icon: Trophy,   label: "Sports, golf, and recreation experiences in Las Vegas" },
                { Icon: Music,    label: "Entertainment, concerts, residencies, and NCORE Live events" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl p-4" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
                  <Icon className="h-5 w-5" style={{ color: A.teal }} />
                  <span className="text-sm" style={{ color: T.muted }}>{label}</span>
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
              <h2 className="text-3xl font-bold" style={{ color: T.text }}>Frequently Asked Questions</h2>
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

        {/* ── Commercial Pathways ──────────────────────────────── */}
        <section id="commercial" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] p-7 lg:col-span-2" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
              <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: A.teal }}>Commercial Pathways</p>
              <h2 className="mt-3 text-4xl font-bold" style={{ color: T.text }}>How to get involved with NCORE 2027.</h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Attendee waitlist", "Institutional group interest", "Official housing inquiries", "Sponsor and exhibitor interest", "Media and cultural activations", "Future venue-hold partnerships", "Dining and tourism packages", "VIP hospitality requests"].map((item) => (
                  <div key={item} className="rounded-2xl p-4 text-sm font-bold" style={{ background: T.panelAlt, color: T.muted }}>{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] p-7" style={{ background: `${A.teal}15`, border: `1px solid ${A.teal}35` }}>
              <Building2 className="h-8 w-8" style={{ color: A.teal }} />
              <h3 className="mt-5 text-3xl font-bold" style={{ color: T.text }}>Institutional Micro-Site Linkage</h3>
              <p className="mt-4 text-sm leading-7" style={{ color: T.muted }}>Universities, sponsors, venues, and partners connect through the TPG/NCORE institutional platform — designed for group attendance, sponsorship packages, official housing coordination, and full event architecture access.</p>
              <a href="#slide-deck" className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-black text-white" style={{ background: A.teal }}>View Platform Story <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </section>

        {/* ── Waitlist ─────────────────────────────────────────── */}
        <section id="waitlist" className="mx-auto max-w-7xl px-6 py-16 pb-28">
          <div className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 shadow-2xl" style={{ background: `linear-gradient(135deg, ${A.teal}22, ${T.panel})`, border: `1px solid ${A.teal}40` }}>
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full blur-3xl" style={{ background: `${A.teal}28` }} />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: A.teal }}>Join the 2027 Interest List</p>
                <h2 className="mt-3 text-5xl font-black" style={{ color: T.text }}>Be first in line for NCORE Las Vegas updates.</h2>
                <p className="mt-5 max-w-2xl text-base leading-8" style={{ color: T.muted }}>Whether you're an attendee, institution, sponsor, hotel, dining, media, or entertainment partner — join the interest list now and be first to receive registration details, partner opportunities, and NCORE 2027 updates.</p>
              </div>
              <form className="rounded-[2rem] p-5 shadow-2xl" style={{ background: T.panel, border: `1px solid ${T.border}` }} onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-3">
                  <input className="rounded-2xl px-4 py-4 text-sm outline-none" style={{ background: T.panelAlt, border: `1px solid ${T.border}`, color: T.text }} placeholder="Full name" />
                  <input className="rounded-2xl px-4 py-4 text-sm outline-none" style={{ background: T.panelAlt, border: `1px solid ${T.border}`, color: T.text }} placeholder="Email address" />
                  <select className="rounded-2xl px-4 py-4 text-sm outline-none" style={{ background: T.panelAlt, border: `1px solid ${T.border}`, color: T.text }}>
                    <option>Attendee</option>
                    <option>Institution / University</option>
                    <option>Sponsor / Brand Partner</option>
                    <option>Hotel / Venue / Tourism Partner</option>
                    <option>Media / Entertainment Partner</option>
                  </select>
                  <button className="rounded-2xl px-5 py-4 text-sm font-black text-white" style={{ background: A.teal }}>Request Priority Updates</button>
                </div>
                <p className="mt-4 text-xs leading-5" style={{ color: T.subtleMuted }}>Your information will only be used to send NCORE 2027 updates and relevant partner communications.</p>
              </form>
            </div>
          </div>
        </section>

      </main>

      <NeuralWidget />

      <footer style={{ borderTop: `1px solid ${T.border}` }} className="px-6 py-10 text-center text-sm">
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
