import React, { useMemo, useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Crown,
  Globe2,
  Handshake,
  Hotel,
  Layers3,
  MapPinned,
  Mic2,
  Network,
  Sparkles,
  Sun,
  Moon,
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

// ── Palette — matches Ncore2027Microsite exactly ──────────────
const A = {
  teal:   "#17a186",
  orange: "#f39e14",
  red:    "#c13a2c",
  lime:   "#92d050",
  blue:   "#2a81ba",
};

const DARK = {
  bg:        "#1a2f3d",
  panel:     "#274552",
  panelAlt:  "#1e3a4a",
  text:      "#ffffff",
  muted:     "#94a3b8",
  subtleMuted:"#64748b",
  border:    "rgba(255,255,255,0.10)",
  glassBg:   "rgba(255,255,255,0.08)",
  navBg:     "rgba(39,69,82,0.92)",
};

const LIGHT = {
  bg:        "#ddedf2",
  panel:     "#ffffff",
  panelAlt:  "#f0f8fb",
  text:      "#0f2130",
  muted:     "#3d5a6a",
  subtleMuted:"#5a7a8a",
  border:    "rgba(0,0,0,0.09)",
  glassBg:   "rgba(255,255,255,0.22)",
  navBg:     "rgba(255,255,255,0.92)",
};

type Theme = typeof DARK;

const cx = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(" ");

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const stats = [
  { label: "Event Window",    value: "Mon–Fri", detail: "Welcome through breakfast & concierge extensions" },
  { label: "Core Lanes",      value: "4",        detail: "High Touch, High Tech, Brand Experience, Procurement" },
  { label: "Executive Suites",value: "5",        detail: "Private ARIA closing-table environments" },
  { label: "Global Layer",    value: "140+",     detail: "Language-enabled mobile access concept" },
];

const lanes = [
  {
    icon: Handshake,
    title: "High Touch Civic Program",
    eyebrow: "H.A.N.D.S. + H.A.N.D.",
    text: "Human-centered civic programming where attendees form municipality tables, elect Mayors, debate real-world issues, allocate resources, and develop impact-driven recommendations for housing, homelessness, workforce, wellness, education, and community infrastructure.",
  },
  {
    icon: Zap,
    title: "High Tech Symposium",
    eyebrow: "R.I.S.E. + NALU",
    text: "Technology-focused programming built around AI, mobile infrastructure, translation, smart cities, telehealth, tokenized engagement, civic data, and globally deployable institutional frameworks.",
  },
  {
    icon: Sparkles,
    title: "Commercial & Brand Experience",
    eyebrow: "Sponsors + Vendors",
    text: "A physical and digital activation layer for product placement, booth presence, hospitality integrations, retail rewards, sponsor storytelling, and experiential brand alignment across the ARIA and NCORE footprint.",
  },
  {
    icon: Crown,
    title: "Executive Procurement Model",
    eyebrow: "Closing Tables",
    text: "Curated institutional alignment where pre-qualified sponsors, vendors, universities, NGOs, government stakeholders, and enterprise buyers move from VIP symposium presentations into scheduled executive-suite deal discussions.",
  },
];

const agenda = [
  { day: "Monday",    theme: "Arrival + Welcome",              items: ["Late afternoon registration", "NALU orientation", "ARIA welcome reception", "Sponsor introductions", "VIP hospitality networking"] },
  { day: "Tuesday",   theme: "Issue Immersion",                items: ["Opening keynote", "Municipality formation", "Mayor elections", "H.A.N.D.S. / H.A.N.D. civic panels", "VIP Symposium Lounge programming", "Executive Suite appointments"] },
  { day: "Wednesday", theme: "Solution Development",           items: ["Municipality workshops", "R.I.S.E. technology symposium", "NALU-assisted research", "Sponsor labs", "Procurement breakouts", "Evening hospitality extensions"] },
  { day: "Thursday",  theme: "Resolution + Commitment",        items: ["Municipal presentations", "Global translation broadcast", "Institutional commitments", "Media capture", "Closing gala", "Executive relationship sessions"] },
  { day: "Friday",    theme: "Breakfast + Concierge Continuity",items: ["Morning breakfast", "Checkout networking", "Late-flight concierge", "Golf / dining / nightlife options", "Weekend extension programming"] },
];

const monetization = [
  { title: "Sponsorships",        detail: "Title, presenting, program, municipality, translation, NALU, and VIP lounge sponsorships." },
  { title: "Executive Suites",    detail: "Premium suite sponsorships, procurement retainers, and strategic deal facilitation." },
  { title: "Product Integration", detail: "Beverage, wellness, apparel, mobility, device, retail, and hospitality placements." },
  { title: "Hospitality Revenue", detail: "Room blocks, dining, nightlife, golf, concierge, transportation, wellness, and weekend extensions." },
  { title: "Media & VIBE",        detail: "VIBE Network content, VIBE 100 creators, podcasts, interviews, and multilingual distribution." },
  { title: "Licensing & Continuity", detail: "University curriculum, NGO frameworks, institutional subscriptions, quarterly updates, and global access." },
];

const partners = [
  "ARIA Resort & Casino", "Majestra", "TPG Worldwide", "NCORE Unite",
  "NALU AI", "VIBE Network", "VIBE 100", "Stirling Club",
  "Universities", "NGOs", "Government", "Enterprise Sponsors",
];

const municipalitySteps = [
  "Mayor Election", "Resource Allocation", "NALU Query Support",
  "Sponsor Solution Labs", "Policy Prescriptions", "Global Translation Broadcast",
];

function SectionHeader({ eyebrow, title, children, align = "left", T }: {
  eyebrow: string; title: string; children?: React.ReactNode;
  align?: "left" | "center"; T: Theme;
}) {
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className={cx("max-w-4xl", align === "center" && "mx-auto text-center")}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em]" style={{ color: A.teal }}>{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight md:text-5xl" style={{ color: T.text }}>{title}</h2>
      {children && <p className="mt-5 text-base leading-8 md:text-lg" style={{ color: T.muted }}>{children}</p>}
    </motion.div>
  );
}

function Card({ children, className = "", T }: { children: React.ReactNode; className?: string; T: Theme }) {
  return (
    <div className={cx("rounded-[2rem] p-6 shadow-xl", className)}
      style={{ background: T.panel, border: `1px solid ${T.border}` }}>
      {children}
    </div>
  );
}

export default function NcoreAriaExperienceMicrosite() {
  const [activeDay, setActiveDay] = useState(0);
  const [dark, setDark] = useState(true);
  const activeAgenda = useMemo(() => agenda[activeDay], [activeDay]);

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

      {/* ── Nav ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300"
        style={{ background: T.navBg, borderBottom: `1px solid ${T.border}` }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl font-black text-sm text-white"
              style={{ background: A.teal }}>N</div>
            <div>
              <p className="text-sm font-bold tracking-wide" style={{ color: T.text }}>NCORE Unite 2027</p>
              <p className="text-xs" style={{ color: T.subtleMuted }}>ARIA Experience Portal</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm lg:flex" style={{ color: T.muted }}>
            {[["#model","Model"],["#agenda","Agenda"],["#sponsors","Sponsors"],["#venue","ARIA"],["#participate","Participate"]].map(([href, label]) => (
              <a key={label} href={href} className="transition-opacity hover:opacity-80" style={{ color: T.muted }}>{label}</a>
            ))}
            <a href="/" className="text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: A.orange }}>← Main Site</a>
          </nav>

          <button onClick={toggleTheme} aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
            className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:opacity-80"
            style={{ background: T.glassBg, border: `1px solid ${T.border}`, color: T.text }}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <main>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.25em]"
              style={{ background: `${A.teal}18`, border: `1px solid ${A.teal}40`, color: A.teal }}>
              High Touch + High Tech + Global Civic Intelligence
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-black leading-tight tracking-tight md:text-7xl" style={{ color: T.text }}>
              The future of convention programming is a live civic operating system.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-3xl text-lg leading-8 md:text-xl" style={{ color: T.muted }}>
              NCORE Unite 2027 transforms ARIA Las Vegas into an immersive destination platform where attendees, sponsors, universities, NGOs, governments, and enterprise partners collaborate inside municipality simulations, AI-assisted symposiums, procurement suites, hospitality experiences, and globally translated media ecosystems.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
              <a href="#participate"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
                style={{ background: A.teal }}>
                Enter the Ecosystem <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#sponsors"
                className="inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition-opacity hover:opacity-80"
                style={{ border: `1px solid ${T.border}`, color: T.text, background: T.glassBg }}>
                Sponsor / Vendor Access
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }}>
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl"
              style={{ background: T.panel, border: `1px solid ${T.border}` }}>
              <div className="absolute inset-0 rounded-[2rem]"
                style={{ background: `radial-gradient(circle at 30% 20%, ${A.teal}28, transparent 40%), radial-gradient(circle at 75% 70%, ${A.orange}18, transparent 40%)` }} />
              <div className="relative flex flex-col gap-4 p-6">
                {/* NALU status bar */}
                <div className="flex items-center justify-between rounded-2xl p-4"
                  style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full text-white"
                      style={{ background: A.teal }}><Network className="h-5 w-5" /></div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: T.text }}>NALU Civic Intelligence</p>
                      <p className="text-xs" style={{ color: T.muted }}>Live translation · research · rewards</p>
                    </div>
                  </div>
                  <span className="rounded-full px-3 py-1 text-xs font-bold"
                    style={{ background: `${A.lime}18`, color: A.lime }}>Online</span>
                </div>
                {/* Stat cards */}
                <div className="grid gap-2 md:grid-cols-2">
                  {stats.map((s) => (
                    <div key={s.label} className="rounded-xl p-3"
                      style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                      <p className="text-xl font-black" style={{ color: T.text }}>{s.value}</p>
                      <p className="mt-0.5 text-xs font-semibold" style={{ color: A.teal }}>{s.label}</p>
                      <p className="mt-0.5 text-xs leading-4" style={{ color: T.muted }}>{s.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Four Lanes ───────────────────────────────────── */}
        <section id="model" className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeader eyebrow="Operating Model" title="Four lanes. One integrated economic ecosystem." align="center" T={T}>
            NCORE Unite is structured as a coordinated civic, technology, commercial, and procurement environment where every program lane creates engagement, content, sponsorship value, and institutional opportunity.
          </SectionHeader>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }}
            className="mt-12 grid gap-5 md:grid-cols-2">
            {lanes.map((lane) => {
              const Icon = lane.icon;
              return (
                <motion.div variants={fadeUp} key={lane.title}>
                  <Card className="h-full" T={T}>
                    <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl text-white"
                      style={{ background: A.teal }}><Icon className="h-6 w-6" /></div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: A.teal }}>{lane.eyebrow}</p>
                    <h3 className="mt-3 text-2xl font-bold" style={{ color: T.text }}>{lane.title}</h3>
                    <p className="mt-4 leading-7" style={{ color: T.muted }}>{lane.text}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* ── Municipality Model ───────────────────────────── */}
        <section className="py-16" style={{ background: T.panel, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <SectionHeader eyebrow="Municipality Model™" title="Every table becomes a city." T={T}>
              Attendees are assigned to round-table municipalities, elect a Mayor, evaluate issue dossiers, allocate resources, consult NALU, and deliver final recommendations — creating leadership, ownership, and measurable continuity beyond the venue.
            </SectionHeader>
            <div className="grid gap-3 sm:grid-cols-2">
              {municipalitySteps.map((item, idx) => (
                <div key={item} className="rounded-2xl p-4" style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                  <p className="text-sm font-bold" style={{ color: T.text }}>{String(idx + 1).padStart(2, "0")} / {item}</p>
                  <p className="mt-2 text-xs leading-5" style={{ color: T.muted }}>Designed to move attendees from discussion into structured action.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Agenda ───────────────────────────────────────── */}
        <section id="agenda" className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeader eyebrow="Program Calendar" title="Monday welcome through Friday breakfast, with weekend concierge extensions." T={T}>
            The calendar moves attendees from arrival and immersion into issue debate, solution design, procurement alignment, public commitments, and extended Las Vegas hospitality.
          </SectionHeader>
          <div className="mt-10 grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
            <div className="grid gap-3 content-start">
              {agenda.map((d, idx) => (
                <button key={d.day} onClick={() => setActiveDay(idx)}
                  className="rounded-2xl border p-5 text-left transition-all"
                  style={activeDay === idx
                    ? { border: `1px solid ${A.teal}`, background: `${A.teal}15` }
                    : { border: `1px solid ${T.border}`, background: T.panel }}>
                  <p className="text-sm font-bold" style={{ color: T.text }}>{d.day}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em]" style={{ color: T.muted }}>{d.theme}</p>
                </button>
              ))}
            </div>
            <Card T={T}>
              <div className="mb-6 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: A.teal }}>
                  <CalendarDays className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold" style={{ color: T.text }}>{activeAgenda.day}</h3>
                  <p className="font-semibold" style={{ color: A.teal }}>{activeAgenda.theme}</p>
                </div>
              </div>
              <div className="grid gap-3">
                {activeAgenda.items.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl p-4"
                    style={{ background: T.panelAlt, border: `1px solid ${T.border}` }}>
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: A.teal }} />
                    <p style={{ color: T.muted }}>{item}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ── ARIA Venue ───────────────────────────────────── */}
        <section id="venue" className="py-16" style={{ background: T.panel, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
            <SectionHeader eyebrow="ARIA Experience" title="The venue is part of the platform." T={T}>
              ARIA Las Vegas becomes an executive hospitality environment where civic dialogue, luxury experience, sponsor activation, culinary programming, nightlife, wellness, and procurement alignment are integrated into one elevated destination experience.
            </SectionHeader>
            <div className="grid gap-4 sm:grid-cols-2">
              {([ [Hotel, "Luxury Hospitality"], [Building2, "Executive Suites"], [Mic2, "VIP Symposium Lounge"], [MapPinned, "Vegas Concierge"] ] as [React.ComponentType<{className?:string; style?: React.CSSProperties}>, string][]).map(([Icon, label]) => (
                <Card key={label} T={T}>
                  <Icon className="h-7 w-7" style={{ color: A.teal }} />
                  <h3 className="mt-5 text-xl font-bold" style={{ color: T.text }}>{label}</h3>
                  <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>Designed to enhance attendee value, sponsor proximity, and executive relationship development.</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Monetization ─────────────────────────────────── */}
        <section id="sponsors" className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeader eyebrow="Monetization Stack" title="Built to monetize more than attendance." align="center" T={T}>
            The economic engine extends across sponsorships, executive suite retainers, product integrations, hospitality participation, media rights, VIBE distribution, institutional licensing, and year-round continuity programming.
          </SectionHeader>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {monetization.map((m) => (
              <Card key={m.title} T={T}>
                <WalletCards className="h-7 w-7" style={{ color: A.orange }} />
                <h3 className="mt-5 text-xl font-bold" style={{ color: T.text }}>{m.title}</h3>
                <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>{m.detail}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Global Reach ─────────────────────────────────── */}
        <section className="py-16" style={{ background: T.panel, borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}` }}>
          <div className="mx-auto max-w-7xl px-6">
            <SectionHeader eyebrow="Global Reach" title="Ideas leave the room." align="center" T={T}>
              Through NALU, TPGW mobile delivery, and multilingual translation infrastructure, NCORE content, policy discussions, municipality outputs, podcasts, and institutional frameworks can be accessed and adapted by governments, universities, NGOs, and private institutions worldwide.
            </SectionHeader>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {([ [Globe2,"Multilingual Distribution","Content and findings structured for immediate global consumption."], [Users,"Institutional Replication","Universities and agencies may recreate NCORE simulations locally."], [Layers3,"Year-Round Continuity","Quarterly updates, podcasts, scorecards, and symposium activity."] ] as [React.ComponentType<{className?:string; style?: React.CSSProperties}>, string, string][]).map(([Icon, title, text]) => (
                <Card key={title} T={T}>
                  <Icon className="h-8 w-8" style={{ color: A.teal }} />
                  <h3 className="mt-5 text-xl font-bold" style={{ color: T.text }}>{title}</h3>
                  <p className="mt-3 text-sm leading-6" style={{ color: T.muted }}>{text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── Partners ─────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <SectionHeader eyebrow="Ecosystem Partners" title="A platform designed for institutional and commercial alignment." T={T} />
          <div className="mt-8 flex flex-wrap gap-3">
            {partners.map((p) => (
              <span key={p} className="rounded-full px-4 py-2 text-sm font-semibold"
                style={{ background: T.panel, border: `1px solid ${T.border}`, color: T.muted }}>{p}</span>
            ))}
          </div>
        </section>

        {/* ── Participate ──────────────────────────────────── */}
        <section id="participate" className="mx-auto max-w-7xl px-6 pb-24">
          <div className="relative overflow-hidden rounded-[2.5rem] p-8 shadow-2xl md:p-12"
            style={{ background: `linear-gradient(135deg, ${A.teal}22, ${T.panel})`, border: `1px solid ${A.teal}40` }}>
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full blur-3xl" style={{ background: `${A.teal}28` }} />
            <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.35em]" style={{ color: A.teal }}>Participate</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl" style={{ color: T.text }}>Join the NCORE Unite 2027 ecosystem.</h2>
                <p className="mt-6 max-w-3xl text-lg leading-8" style={{ color: T.muted }}>
                  Register as an attendee, activate as a sponsor, join a university delegation, request executive symposium access, or begin institutional partnership discussions.
                </p>
              </div>
              <div className="grid gap-3">
                {["Attendee Registration","Sponsor Inquiry","Executive Symposium Access","University Delegation","Institutional Partnership"].map((cta) => (
                  <a key={cta} href="mailto:info@ncoreunite.com"
                    className="group flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-bold transition-all hover:opacity-80"
                    style={{ background: T.panel, border: `1px solid ${T.border}`, color: T.text }}>
                    {cta}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" style={{ color: A.teal }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="px-6 py-10 text-center text-sm" style={{ borderTop: `1px solid ${T.border}`, color: T.subtleMuted }}>
        NCORE Unite 2027 ARIA Experience Portal · TPG Worldwide · NALU AI
        <span className="mx-3">·</span>
        <a href="/" className="font-semibold transition-opacity hover:opacity-70" style={{ color: A.orange }}>← Back to Main Site</a>
      </footer>
    </div>
  );
}
