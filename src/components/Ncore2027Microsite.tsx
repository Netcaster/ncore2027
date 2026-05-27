import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { NeuralWidget } from "./NeuralWidget";
import {
  Search, MapPin, Calendar, Hotel, Music, Utensils, Trophy,
  Users, ShieldCheck, Building2, Sparkles, ArrowRight, Mic2,
  Globe2, Handshake, Ticket, Plane, Sun, Moon, WalletCards,
  Headphones, Loader2, Languages, Mic, MicOff,
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

// ── Slide visual background — pixel-traced from PNG slides ────
// Slide 1 PNG → H.A.N.D.S. hand-shaped bubble cluster (fingers spread upward)
// Slide 2 PNG → H.A.N.D. footprint bubble cluster (big toe top → heel bottom)
function SlideVisualBackground({ type = "hand" }: { type?: "hand" | "foot" }) {
  const isHand = type === "hand";
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
      {/* Ambient glow pulses */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full blur-3xl"
        style={{ background: isHand ? "rgba(243,158,20,0.18)" : "rgba(42,129,186,0.16)" }} />
      <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full blur-3xl"
        style={{ background: isHand ? "rgba(23,161,134,0.14)" : "rgba(34,211,238,0.12)" }} />

      {isHand ? (
        <img
          src="/ncore-hands-cluster.png"
          className="absolute bottom-[-4%] right-[-6%] w-[72%] opacity-[0.62]"
          aria-hidden="true"
        />
      ) : (
        <img
          src="/ncore-foot-cluster.png"
          className="absolute top-[-2%] right-[-6%] h-[34%] w-auto opacity-[0.62]"
          aria-hidden="true"
        />
      )}

      {/* Label watermark text */}
      <div className="absolute left-8 top-8 -rotate-[4deg] text-[6rem] font-black leading-none text-white/[0.04] md:text-[9rem]">
        {isHand ? "H.A.N.D.S." : "H.A.N.D."}
      </div>
      <div className="absolute bottom-10 left-10 rounded-full border border-white/10 bg-black/20 px-6 py-3 text-xs font-black uppercase tracking-[0.45em] text-white/20">
        {isHand ? "HIGH TOUCH" : "HIGH TECH"}
      </div>
    </div>
  );
}

// ── NCORE Regional US Map ─────────────────────────────────────
function MiniMap() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] p-6" style={{ background: "#050f1e", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 27% 58%,rgba(34,211,238,.18),transparent 28%)" }} />
      <div className="relative z-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#5eead4" }}>United States Destination Map</p>
        <h3 className="mt-2 text-2xl font-black text-white">Las Vegas designated for 2027</h3>
      </div>
      <div className="relative z-10 mt-4">
        <div className="relative">
          <img
            src="/ncore-regional-map.png"
            alt="NCORE 2027 National Regional Map"
            className="w-full h-auto block"
          />
          {/* Las Vegas pin — southern Nevada */}
          <div className="absolute pointer-events-none" style={{ left: "38%", top: "58%", transform: "translate(-50%, -100%)" }}>
            <svg width="32" height="40" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.7))" }}>
              <path d="M16 0C7.163 0 0 7.163 0 16c0 5.516 2.85 10.366 7.163 13.22L16 42l8.837-12.78C29.15 26.366 32 21.516 32 16 32 7.163 24.837 0 16 0z" fill="#f39e14"/>
              <circle cx="16" cy="16" r="7" fill="#1a2f3d" stroke="#f39e14" strokeWidth="1.5"/>
            </svg>
            <p className="text-center text-[9px] font-black uppercase tracking-wide whitespace-nowrap mt-0.5"
              style={{ color: "#f39e14", textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}>Las Vegas</p>
          </div>
        </div>
      </div>
    </div>
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
          src="https://www.openstreetmap.org/export/embed.html?bbox=-115.1820%2C36.1045%2C-115.1720%2C36.1102&layer=mapnik&marker=36.1072%2C-115.1767"
          width="100%"
          height="100%"
          className="border-0"
          loading="lazy"
        />
      </div>
    </div>
  );
}

// ── NALU panel ────────────────────────────────────────────────
const NALU_API = "https://naluask.com/api/embed/query";
const NALU_KEY = "ncore_k_2026_tpg";

function NaluPanel({ T }: { T: Theme }) {
  const [query, setQuery]       = useState("Where should I eat near ARIA after the NCORE keynote?");
  const [language, setLanguage] = useState("english-united-states");
  const [answer, setAnswer]     = useState<string | null>(null);
  const [asking, setAsking]     = useState(false);
  const [translated, setTranslated] = useState<{ text: string; audio: string } | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [playing, setPlaying]   = useState(false);
  const [recording, setRecording] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setAnswer(null); setTranslated(null); setError(null);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlaying(false);
  }, [query]);

  useEffect(() => {
    setTranslated(null); setError(null);
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setPlaying(false);
  }, [language]);

  async function handleAsk() {
    if (!query.trim() || asking) return;
    setAsking(true); setAnswer(null); setTranslated(null); setError(null);
    try {
      const res = await fetch(NALU_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: NALU_KEY, query: query.trim() }),
      });
      const data = await res.json();
      setAnswer(data.response || data.error || "No response from NALU.");
    } catch { setError("NALU unavailable — please try again."); }
    setAsking(false);
  }

  async function handleTranslate() {
    if (language === "english-united-states" || !answer) return;
    setLoading(true); setError(null); setTranslated(null);
    try {
      const tttUrl = `${WWTC_BASE}/english-united-states/${language}?text=${encodeURIComponent(answer)}&serviceCode=ttt&sourceLanguageCode=english-united-states&targetLanguageCode=${language}`;
      const tttRes = await fetch(tttUrl, { method: "POST", headers: { accept: "application/json", "api-authorization": WWTC_KEY } });
      if (!tttRes.ok) throw new Error();
      const { translated_text } = await tttRes.json();

      const ttsUrl = `${WWTC_BASE}/${language}/${language}?text=${encodeURIComponent(translated_text)}&serviceCode=tts&sourceLanguageCode=${language}&targetLanguageCode=${language}`;
      const ttsRes = await fetch(ttsUrl, { method: "POST", headers: { accept: "application/json", "api-authorization": WWTC_KEY } });
      if (!ttsRes.ok) throw new Error();
      const { audio } = await ttsRes.json();

      setTranslated({ text: translated_text, audio });
    } catch { setError("Translation unavailable — please try again."); }
    setLoading(false);
  }

  const SPEECH_LANG: Record<string, string> = {
    "english-united-states": "en-US", "spanish-international": "es-ES",
    "french-france": "fr-FR",         "portuguese-brazil": "pt-BR",
    "chinese-mandarin": "zh-CN",      "arabic": "ar-SA",
    "hindi": "hi-IN",                 "japanese": "ja-JP",
    "korean": "ko-KR",                "german": "de-DE",
    "italian": "it-IT",               "russian": "ru-RU",
    "swahili": "sw-KE",               "vietnamese": "vi-VN",
    "tagalog": "tl-PH",               "haitian-creole": "fr-HT",
    "polish": "pl-PL",                "dutch": "nl-NL",
    "turkish": "tr-TR",               "thai": "th-TH",
  };

  function startListening() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { setError("Speech recognition requires Chrome, Edge, or Safari — or type your question."); return; }
    setError(null);
    const rec = new SR();
    rec.lang = SPEECH_LANG[language] ?? "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    recognitionRef.current = rec;
    rec.onresult = (e: any) => {
      const transcript = Array.from(e.results as any[])
        .map((r: any) => r[0].transcript)
        .join("");
      setQuery(transcript);
    };
    rec.onerror = (e: any) => { setError(e.error === "not-allowed" ? "Mic access denied — check browser permissions." : `Mic error: ${e.error}`); setRecording(false); };
    rec.onend = () => setRecording(false);
    rec.start();
    setRecording(true);
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setRecording(false);
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
        <button
          onClick={recording ? stopListening : startListening}
          title={recording ? "Stop listening" : "Speak your question"}
          className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all"
          style={recording
            ? { background: "#ef4444", boxShadow: "0 0 0 4px rgba(239,68,68,0.25)", color: "#fff" }
            : { background: `${A.teal}22`, border: `1px solid ${A.teal}50`, color: A.teal }
          }
        >
          {recording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </button>
      </div>
      {recording && (
        <p className="mt-2 text-center text-xs animate-pulse" style={{ color: "#ef4444" }}>● Listening — speak now, tap to stop</p>
      )}

      {/* Ask NALU button */}
      <button onClick={handleAsk} disabled={asking || !query.trim()}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-bold disabled:opacity-60"
        style={{ background: A.teal, color: "#fff" }}>
        {asking ? <><Loader2 className="h-4 w-4 animate-spin" /> Asking NALU…</> : <>Ask NALU</>}
      </button>

      {/* NALU answer */}
      {answer && (
        <div className="mt-4 rounded-2xl p-4 text-sm leading-6" style={{ background: T.glassBg, color: T.muted }}>
          <span className="font-semibold" style={{ color: A.teal }}>NALU:</span>{" "}{answer}
        </div>
      )}

      {/* Translate button — only after we have an answer */}
      {answer && !isEnglish && !translated && (
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
  const [handsOpen, setHandsOpen] = useState<number | null>(null);
  const [handOpen,  setHandOpen]  = useState<number | null>(null);

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
                  <p className="text-xs uppercase tracking-[0.25em]" style={{ color: T.muted }}>{item.label}</p>
                  <p className="mt-2 text-2xl font-bold" style={{ color: T.text }}>{item.value}</p>
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
          <div className="mb-6">
            <MiniMap />
          </div>
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

        {/* ── Marquee Ticker ───────────────────────────────────── */}
        <div className="overflow-hidden border-y py-4" style={{ borderColor: T.border, background: dark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)" }}>
          <div className="marquee-track">
            {[1,2].map(n => (
              <span key={n} className="inline-flex items-center gap-0">
                <span className="mx-10 text-sm font-black uppercase tracking-[0.35em]" style={{ color: A.orange }}>H.A.N.D.S.</span>
                <span className="mx-4 opacity-30" style={{ color: T.text }}>·</span>
                <span className="mx-10 text-sm font-black uppercase tracking-[0.35em]" style={{ color: A.blue }}>H.A.N.D.</span>
                <span className="mx-4 opacity-30" style={{ color: T.text }}>·</span>
                <span className="mx-10 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: T.muted }}>The world requires both hands and feet</span>
                <span className="mx-4 opacity-30" style={{ color: T.text }}>·</span>
                <span className="mx-10 text-sm font-black uppercase tracking-[0.35em]" style={{ color: A.orange }}>High Touch</span>
                <span className="mx-4 opacity-30" style={{ color: T.text }}>·</span>
                <span className="mx-10 text-sm font-black uppercase tracking-[0.35em]" style={{ color: A.blue }}>High Tech</span>
                <span className="mx-4 opacity-30" style={{ color: T.text }}>·</span>
                <span className="mx-10 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: T.muted }}>Social Infrastructure</span>
                <span className="mx-4 opacity-30" style={{ color: T.text }}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── H.A.N.D.S. Housing Access ────────────────────────── */}
        <section id="hands" className="mx-auto max-w-7xl px-6 py-16">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl" style={{ background: T.panel, border: `1px solid ${T.border}` }}>

            {/* Watermark image — hands photo behind content */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
              <img
                src="/ncore-hands-photo.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-center"
                style={{ opacity: 0.13, mixBlendMode: dark ? "screen" : "multiply" }}
              />
              <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(to bottom right, rgba(26,47,61,0.82), rgba(39,69,82,0.88))" : "linear-gradient(to bottom right, rgba(221,237,242,0.88), rgba(240,248,251,0.92))" }} />
            </div>

            <SlideVisualBackground type="hand" />

            <div className="relative z-10 p-8 md:p-12">
              {/* Hero grid */}
              <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-start">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.3em]"
                    style={{ background: `${A.orange}20`, border: `1px solid ${A.orange}45`, color: A.orange }}>
                    🤲 The Hand · High Touch · Social Contracts
                  </div>
                  <h2 className="text-5xl font-black leading-none tracking-tight md:text-6xl" style={{ color: A.orange }}>H.A.N.D.S.</h2>
                  <p className="mt-4 text-xl font-bold" style={{ color: T.muted }}>Helping Americans Negotiate Dwelling Shortages</p>

                  <div className="mt-8 space-y-2 text-lg font-semibold leading-relaxed">
                    <p style={{ color: T.text }}>Housing is more than shelter.</p>
                    <p style={{ color: A.orange }}>It is stability.</p>
                    <p style={{ color: T.text }}>It is identity.</p>
                    <p style={{ color: A.teal }}>It is family preservation.</p>
                    <p style={{ color: T.text }}>It is economic participation.</p>
                    <p style={{ color: A.orange }}>It is dignity.</p>
                  </div>

                  <p className="mt-8 text-sm leading-8" style={{ color: T.muted }}>
                    H.A.N.D.S. exists to help Americans navigate housing insecurity through education, conversation, technology, partnerships, and real-world resource alignment.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["High Touch","Social Contracts","Human-Centered Systems","Community Stabilization","Economic Dignity"].map(tag => (
                      <span key={tag} className="rounded-full px-4 py-2 text-xs font-bold"
                        style={{ background: tag === "High Touch" ? `${A.orange}18` : tag === "Social Contracts" ? `${A.teal}14` : `${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"}`,
                                 border: `1px solid ${tag === "High Touch" ? A.orange+"35" : tag === "Social Contracts" ? A.teal+"30" : (dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)")}`,
                                 color: tag === "High Touch" ? A.orange : tag === "Social Contracts" ? A.teal : T.muted }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Reality card + challenge grid */}
                <div className="space-y-5">
                  <div className="rounded-[1.5rem] p-6" style={{ background: `${A.orange}10`, border: `1px solid ${A.orange}25` }}>
                    <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: A.orange }}>The Reality</p>
                    <h3 className="mt-3 text-2xl font-black leading-tight" style={{ color: T.text }}>Millions are not failing because they lack ambition.</h3>
                    <p className="mt-4 text-sm leading-7" style={{ color: T.muted }}>Many are struggling because the systems around housing, lending, affordability, and economic access have become increasingly difficult to navigate.</p>
                    <p className="mt-3 text-xs font-black uppercase tracking-[0.2em]" style={{ color: A.orange }}>For some, the challenge is:</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {["Rising rent","Inaccessible mortgages","Lack of down payment capital","Poor financial education","Credit barriers","Rising insurance costs","Unstable employment","Family displacement"].map(item => (
                        <div key={item} className="flex items-center gap-2 rounded-xl p-2 text-xs" style={{ color: T.muted, background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
                          <span style={{ color: A.orange }}>›</span>{item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.5rem] p-6" style={{ background: `${A.teal}10`, border: `1px solid ${A.teal}25` }}>
                    <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: A.teal }}>For others, the challenge is simply not knowing:</p>
                    <div className="mt-3 space-y-2">
                      {["Where to begin","Who to trust","What programs exist","How to qualify","How to stabilize"].map(item => (
                        <div key={item} className="flex items-center gap-2 text-sm" style={{ color: T.muted }}>
                          <span style={{ color: A.teal }}>›</span>{item}
                        </div>
                      ))}
                    </div>
                    <p className="mt-4 text-sm leading-7" style={{ color: T.muted }}>
                      <span className="font-bold" style={{ color: T.text }}>H.A.N.D.S.</span> is designed to create thoughtful conversation and actionable pathways — not as charity, not as politics, but as{" "}
                      <span className="font-bold" style={{ color: A.orange }}>coordinated social-economic infrastructure</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-10 h-px" style={{ background: `linear-gradient(90deg, transparent, ${A.orange}60, ${A.teal}60, transparent)` }} />

              {/* Use Cases — Accordion */}
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: A.orange }}>Real World Use Cases</p>
                <h3 className="mt-3 text-3xl font-black" style={{ color: T.text }}>Who H.A.N.D.S. serves.</h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    num: "1", accent: A.orange, numColor: "#000",
                    title: "The First-Time Homebuyer", sub: "Ownership becomes realistic, not abstract.",
                    body: "A young teacher earning stable income wants to purchase a home but believes ownership is impossible due to student loans and lack of down payment savings.",
                    listLabel: "Through H.A.N.D.S., they discover:", listColor: A.orange,
                    items: ["Down payment assistance programs","Municipal grants","Employer-assisted housing","Affordable mortgage pathways","Budgeting tools","Partner lenders + workshops"],
                    result: "The result: Ownership becomes realistic rather than abstract.", resultColor: A.teal,
                  },
                  {
                    num: "2", accent: A.teal, numColor: "#fff",
                    title: "The Working Family Facing Eviction", sub: "Prevent homelessness before it begins.",
                    body: "A two-income household experiences medical debt and temporary income disruption.",
                    listLabel: "H.A.N.D.S. connects them to:", listColor: A.teal,
                    items: ["Rental assistance referrals","Legal aid resources","Housing counselors","Workforce opportunities","Bridge financing education","Transitional housing pathways"],
                    result: "The goal: Prevent homelessness before it begins.", resultColor: A.orange,
                  },
                  {
                    num: "3", accent: dark ? "rgba(255,255,255,0.9)" : "#0f2130", numColor: dark ? "#0f2130" : "#fff",
                    title: "The Returning Student", sub: "Educational continuity instead of abandonment.",
                    body: "A first-generation college student cannot continue school due to unstable housing.",
                    listLabel: "H.A.N.D.S. coordinates:", listColor: T.text,
                    items: ["Campus support services","Housing referrals","Sponsor-backed aid","Transportation resources","Food + wellness support"],
                    result: "The result: Educational continuity instead of abandonment.", resultColor: T.text,
                  },
                ].map((uc, i) => (
                  <div key={i} className="overflow-hidden rounded-[1.5rem]"
                    style={{ border: `1px solid ${uc.accent}35`, background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                    <button
                      className="flex w-full items-center justify-between p-5 text-left"
                      onClick={() => setHandsOpen(handsOpen === i ? null : i)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black"
                          style={{ background: uc.accent, color: uc.numColor }}>{uc.num}</div>
                        <div>
                          <p className="font-black text-base" style={{ color: T.text }}>{uc.title}</p>
                          <p className="text-xs" style={{ color: T.muted }}>{uc.sub}</p>
                        </div>
                      </div>
                      <svg className="h-5 w-5 shrink-0 transition-transform duration-300" style={{ color: T.muted, transform: handsOpen === i ? "rotate(180deg)" : "rotate(0deg)" }}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    {handsOpen === i && (
                      <div className="usecase-animate px-5 pb-5" style={{ background: `${uc.accent}08` }}>
                        <p className="mb-4 text-sm leading-7" style={{ color: T.muted }}>{uc.body}</p>
                        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em]" style={{ color: uc.listColor }}>{uc.listLabel}</p>
                        <div className="mb-4 grid grid-cols-2 gap-2">
                          {uc.items.map(it => (
                            <div key={it} className="rounded-xl p-3 text-sm" style={{ color: T.muted, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}>✓ {it}</div>
                          ))}
                        </div>
                        <p className="text-sm font-black" style={{ color: uc.resultColor }}>{uc.result}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Bridge: Why Both Matter ───────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-12" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
            <div className="absolute inset-0 rounded-[2.5rem]" style={{ background: dark ? "linear-gradient(135deg,rgba(243,158,20,0.10) 0%,transparent 50%,rgba(42,129,186,0.10) 100%)" : "linear-gradient(135deg,rgba(243,158,20,0.07) 0%,transparent 50%,rgba(42,129,186,0.07) 100%)" }} />
            <div className="relative z-10 text-center">
              <p className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: T.muted }}>Core TPG Philosophy</p>
              <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                <span style={{ color: A.orange }}>"The world requires</span>{" "}
                <span style={{ color: T.text }}>both hands</span>{" "}
                <span style={{ color: A.blue }}>and feet."</span>
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <div className="rounded-[2rem] p-7 text-left" style={{ background: `${A.orange}10`, border: `1px solid ${A.orange}25` }}>
                  <div className="text-4xl mb-3">🤲</div>
                  <h3 className="text-xl font-black" style={{ color: A.orange }}>HANDS represent compassion.</h3>
                  <div className="mt-4 space-y-1">
                    {["High Touch","Social Contracts","Human-centered systems","Community stabilization","Housing access","Family preservation","Economic dignity"].map(i => (
                      <p key={i} className="text-sm" style={{ color: T.muted }}>· {i}</p>
                    ))}
                  </div>
                  <p className="mt-5 text-sm font-bold" style={{ color: T.muted }}>Hands alone cannot scale.</p>
                </div>
                <div className="rounded-[2rem] p-7 text-left" style={{ background: `${A.blue}10`, border: `1px solid ${A.blue}25` }}>
                  <div className="text-4xl mb-3">👣</div>
                  <h3 className="text-xl font-black" style={{ color: A.blue }}>FEET represent movement.</h3>
                  <div className="mt-4 space-y-1">
                    {["High Tech","Social Technology","Infrastructure systems","Mobility","Navigation","Translation","Logistics + Resource coordination"].map(i => (
                      <p key={i} className="text-sm" style={{ color: T.muted }}>· {i}</p>
                    ))}
                  </div>
                  <p className="mt-5 text-sm font-bold" style={{ color: T.muted }}>Feet alone cannot heal.</p>
                </div>
              </div>
              <div className="mt-6 rounded-[2rem] p-7" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                <p className="text-lg font-black leading-relaxed" style={{ color: T.text }}>
                  Technology without humanity becomes cold.<br/>Humanity without systems becomes ineffective.
                </p>
                <p className="mt-4 text-sm leading-7" style={{ color: T.muted }}>
                  TPG believes sustainable impact requires both:{" "}
                  <span className="font-bold" style={{ color: A.orange }}>human relationships</span> and{" "}
                  <span className="font-bold" style={{ color: A.blue }}>scalable systems</span>. Together, hands and feet create forward motion.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── H.A.N.D. Asylum Displacement ─────────────────────── */}
        <section id="hand" className="mx-auto max-w-7xl px-6 py-6">
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl" style={{ background: T.panel, border: `1px solid ${T.border}` }}>

            {/* Watermark image — feet/footprints as more-visible watermark */}
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[2.5rem]">
              <img
                src="/ncore-hands-photo.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-bottom"
                style={{ opacity: 0.22, mixBlendMode: dark ? "screen" : "multiply", filter: "hue-rotate(200deg) saturate(0.7)" }}
              />
              <div className="absolute inset-0" style={{ background: dark ? "linear-gradient(to bottom right, rgba(26,47,61,0.80), rgba(26,47,61,0.86))" : "linear-gradient(to bottom right, rgba(221,237,242,0.86), rgba(240,248,251,0.92))" }} />
            </div>

            <SlideVisualBackground type="foot" />

            <div className="relative z-10 p-8 md:p-12">
              {/* Hero grid — nav panel left, copy right */}
              <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">

                {/* Left: Nav systems active panel */}
                <div className="rounded-[2rem] p-7" style={{ background: `${A.blue}08`, border: `1px solid ${A.blue}30` }}>
                  <p className="mb-4 text-xs font-black uppercase tracking-[0.3em]" style={{ color: A.blue }}>Navigation Systems Active</p>
                  <div className="space-y-2">
                    {[
                      { label: "Multilingual Translation",       status: "ACTIVE",   pulse: "#4ade80" },
                      { label: "Emergency Housing Referrals",    status: "ACTIVE",   pulse: "#4ade80" },
                      { label: "Resource Coordination",          status: "ACTIVE",   pulse: "#4ade80" },
                      { label: "Legal Navigation Support",       status: "ROUTING",  pulse: "#facc15" },
                      { label: "Workforce Transition Pathways",  status: "ACTIVE",   pulse: "#4ade80" },
                    ].map(row => (
                      <div key={row.label} className="flex items-center gap-3 rounded-xl p-3"
                        style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}>
                        <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: row.pulse, boxShadow: `0 0 6px ${row.pulse}` }} />
                        <span className="flex-1 text-sm" style={{ color: T.muted }}>{row.label}</span>
                        <span className="text-xs font-bold" style={{ color: row.status === "ACTIVE" ? A.blue : "#facc15" }}>{row.status}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 rounded-xl p-4" style={{ background: `${A.blue}12`, border: `1px solid ${A.blue}25` }}>
                    <p className="text-xs" style={{ color: T.muted }}>NALU AI Active — <span className="font-bold" style={{ color: A.blue }}>multilingual intake assistant ready</span></p>
                  </div>
                </div>

                {/* Right: Copy */}
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.3em]"
                    style={{ background: `${A.blue}15`, border: `1px solid ${A.blue}35`, color: A.blue }}>
                    👣 The Foot · High Tech · Navigation Infrastructure
                  </div>
                  <h2 className="text-5xl font-black leading-none tracking-tight md:text-6xl" style={{ color: A.blue }}>H.A.N.D.</h2>
                  <p className="mt-4 text-xl font-bold" style={{ color: T.muted }}>Helping Asylum Seekers Navigate Displacement</p>

                  <div className="mt-8 space-y-2 text-lg font-semibold leading-relaxed">
                    <p style={{ color: T.text }}>Displacement is not a statistic.</p>
                    <p style={{ color: A.blue }}>It is movement.</p>
                    <p style={{ color: T.text }}>It is uncertainty.</p>
                    <p style={{ color: "#60a5fa" }}>It is language barriers.</p>
                    <p style={{ color: T.text }}>It is fear.</p>
                    <p style={{ color: A.blue }}>It is survival.</p>
                  </div>

                  <p className="mt-8 text-sm leading-8" style={{ color: T.muted }}>
                    H.A.N.D. exists to help asylum seekers navigate displacement with humanity, organization, technology, and coordinated resource systems.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["High Tech","Social Technology","Infrastructure Systems","Multilingual Navigation"].map(tag => (
                      <span key={tag} className="rounded-full px-4 py-2 text-xs font-bold"
                        style={{ background: tag === "High Tech" ? `${A.blue}15` : tag === "Social Technology" ? "rgba(96,165,250,0.12)" : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
                                 border: `1px solid ${tag === "High Tech" ? A.blue+"35" : tag === "Social Technology" ? "rgba(96,165,250,0.30)" : (dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)")}`,
                                 color: tag === "High Tech" ? A.blue : tag === "Social Technology" ? "#60a5fa" : T.muted }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="my-10 h-px" style={{ background: `linear-gradient(90deg, transparent, ${A.blue}60, transparent)` }} />

              {/* Long-form two-column */}
              <div className="mb-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: A.blue }}>The Challenge</p>
                  <p className="text-sm leading-8" style={{ color: T.muted }}>Around the world, millions of people are forced to relocate due to violence, political instability, economic collapse, environmental disruption, and humanitarian crises.</p>
                  <div className="mt-5 rounded-[1.5rem] p-5" style={{ background: `${A.blue}08`, border: `1px solid ${A.blue}20` }}>
                    <p className="text-xs font-black uppercase tracking-[0.2em] mb-3" style={{ color: A.blue }}>Arrival introduces new barriers:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {["Language","Transportation","Documentation","Healthcare","Housing","Food access","Employment","Legal navigation"].map(item => (
                        <div key={item} className="text-sm" style={{ color: T.muted }}>· {item}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.5rem] p-7 flex flex-col justify-center" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                  <p className="text-xl font-black leading-tight" style={{ color: T.text }}>H.A.N.D. is not designed to politicize displacement.</p>
                  <p className="mt-3 text-xl font-black" style={{ color: A.blue }}>It is designed to humanize navigation.</p>
                  <p className="mt-5 text-sm leading-7" style={{ color: T.muted }}>
                    Position it as a <span className="font-bold" style={{ color: T.text }}>coordinated social-economic infrastructure framework</span> — making universities, sponsors, municipalities, and enterprise partners comfortable while preserving the humanity at the center.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="mb-8 h-px" style={{ background: `linear-gradient(90deg, transparent, ${A.blue}60, transparent)` }} />

              {/* Use Cases — Accordion */}
              <div className="mb-6">
                <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: A.blue }}>Real World Use Cases</p>
                <h3 className="mt-3 text-3xl font-black" style={{ color: T.text }}>Who H.A.N.D. serves.</h3>
              </div>
              <div className="space-y-3">
                {[
                  {
                    num: "1", accent: A.blue, numColor: "#000",
                    title: "The Newly Arrived Family", sub: "Technology reduces confusion. Humanity reduces fear.",
                    body: "A family arrives in an unfamiliar city with limited English proficiency.",
                    listLabel: "H.A.N.D. provides:", listColor: A.blue,
                    items: ["Multilingual translation","Emergency housing referrals","Food resources","Transportation guidance","School enrollment assistance","Legal orientation resources"],
                    result: "Technology reduces confusion. Humanity reduces fear.", resultColor: A.blue,
                  },
                  {
                    num: "2", accent: "#3b82f6", numColor: "#fff",
                    title: "NGO Coordination", sub: "Faster service delivery with less duplication.",
                    body: "A nonprofit organization struggles to manage rapidly changing demand. H.A.N.D. infrastructure helps coordinate:",
                    listLabel: "Systems provided:", listColor: "#3b82f6",
                    items: ["Intake systems","Communication tools","Translation services","Resource allocation","Volunteer routing","Partner referrals"],
                    result: "Faster service delivery with less duplication.", resultColor: T.text,
                  },
                  {
                    num: "3", accent: "#8b5cf6", numColor: "#fff",
                    title: "Workforce Transition", sub: "Economic participation and dignity.",
                    body: "An asylum seeker with professional skills cannot access employment due to documentation confusion and lack of local support.",
                    listLabel: "H.A.N.D. coordinates:", listColor: "#8b5cf6",
                    items: ["Translation support","Credential navigation","Workforce training","Sponsor employers","Digital onboarding","Communication tools"],
                    result: "The goal: Economic participation and dignity.", resultColor: "#8b5cf6",
                  },
                ].map((uc, i) => (
                  <div key={i} className="overflow-hidden rounded-[1.5rem]"
                    style={{ border: `1px solid ${uc.accent}35`, background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                    <button
                      className="flex w-full items-center justify-between p-5 text-left"
                      onClick={() => setHandOpen(handOpen === i ? null : i)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg font-black"
                          style={{ background: uc.accent, color: uc.numColor }}>{uc.num}</div>
                        <div>
                          <p className="font-black text-base" style={{ color: T.text }}>{uc.title}</p>
                          <p className="text-xs" style={{ color: T.muted }}>{uc.sub}</p>
                        </div>
                      </div>
                      <svg className="h-5 w-5 shrink-0 transition-transform duration-300" style={{ color: T.muted, transform: handOpen === i ? "rotate(180deg)" : "rotate(0deg)" }}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </button>
                    {handOpen === i && (
                      <div className="usecase-animate px-5 pb-5" style={{ background: `${uc.accent}08` }}>
                        <p className="mb-4 text-sm leading-7" style={{ color: T.muted }}>{uc.body}</p>
                        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em]" style={{ color: uc.listColor }}>{uc.listLabel}</p>
                        <div className="mb-4 grid grid-cols-2 gap-2">
                          {uc.items.map(it => (
                            <div key={it} className="rounded-xl p-3 text-sm" style={{ color: T.muted, background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)" }}>✓ {it}</div>
                          ))}
                        </div>
                        <p className="text-sm font-black" style={{ color: uc.resultColor }}>{uc.result}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How to Participate ───────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-[2.5rem] p-8 md:p-12" style={{ background: T.panel, border: `1px solid ${T.border}` }}>
            <div className="mb-10 text-center">
              <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: T.muted }}>Universal Participation</p>
              <h2 className="mt-3 text-4xl font-black md:text-5xl" style={{ color: T.text }}>"How Can I Participate?"</h2>
              <p className="mt-3 text-base" style={{ color: T.muted }}>Every stakeholder has a role in coordinated social-economic infrastructure.</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-black" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                <span style={{ color: A.orange }}>H.A.N.D.S.</span><span className="opacity-40" style={{ color: T.text }}> + </span><span style={{ color: A.blue }}>H.A.N.D.</span>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { emoji: "🎓", title: "Students",      color: A.orange, bg: `${A.orange}10`, border: `${A.orange}25`, copy: "Volunteer, research, advocate, educate. Be a bridge between institutions and communities that need access." },
                { emoji: "🏛️", title: "Universities",  color: A.teal,   bg: `${A.teal}10`,   border: `${A.teal}25`,   copy: "Host conversations, provide resources, collect data. Institutional platforms create change at scale." },
                { emoji: "🏦", title: "Lenders",       color: A.blue,   bg: `${A.blue}10`,   border: `${A.blue}25`,   copy: "Develop responsible mortgage products. Meet families where they are, not where we assume they should be." },
                { emoji: "🏙️", title: "Cities",        color: "#8b5cf6", bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.22)", copy: "Coordinate housing pathways, resource allocation, and municipal support that connects families to stability." },
                { emoji: "💼", title: "Sponsors",      color: A.blue,   bg: `${A.blue}10`,   border: `${A.blue}25`,   copy: "Fund stability initiatives and educational access. Responsible visibility while creating measurable social impact." },
                { emoji: "🤝", title: "Community",     color: T.text,   bg: T.panelAlt,      border: T.border,        copy: "Mentor families and expand awareness. The most powerful systems begin with one person choosing to show up." },
              ].map(card => (
                <div key={card.title} className="rounded-[1.5rem] p-6 transition-transform hover:-translate-y-1" style={{ background: card.bg, border: `1px solid ${card.border}` }}>
                  <div className="text-3xl mb-4">{card.emoji}</div>
                  <h3 className="text-xl font-black" style={{ color: card.color }}>{card.title}</h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: T.muted }}>{card.copy}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-[2rem] p-8 text-center" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
              <p className="text-3xl font-black" style={{ color: T.text }}>
                <span style={{ color: A.orange }}>"The world requires</span> both hands <span style={{ color: A.blue }}>and feet."</span>
              </p>
              <p className="mt-4 text-sm" style={{ color: T.muted }}>Not charity. Not politics. Not activism alone.<br/><span className="font-bold" style={{ color: T.text }}>Coordinated social-economic infrastructure frameworks.</span></p>
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
