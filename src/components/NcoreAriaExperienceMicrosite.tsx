import React, { useMemo, useState } from "react";
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
  Users,
  WalletCards,
  Zap,
} from "lucide-react";

const cx = (...classes: (string | boolean | undefined | null)[]) =>
  classes.filter(Boolean).join(" ");

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const stats = [
  { label: "Event Window", value: "Mon–Fri", detail: "Welcome through breakfast & concierge extensions" },
  { label: "Core Lanes", value: "4", detail: "High Touch, High Tech, Brand Experience, Procurement" },
  { label: "Executive Suites", value: "5", detail: "Private ARIA closing-table environments" },
  { label: "Global Layer", value: "140+", detail: "Language-enabled mobile access concept" },
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
  {
    day: "Monday",
    theme: "Arrival + Welcome",
    items: ["Late afternoon registration", "NALU orientation", "ARIA welcome reception", "Sponsor introductions", "VIP hospitality networking"],
  },
  {
    day: "Tuesday",
    theme: "Issue Immersion",
    items: ["Opening keynote", "Municipality formation", "Mayor elections", "H.A.N.D.S. / H.A.N.D. civic panels", "VIP Symposium Lounge programming", "Executive Suite appointments"],
  },
  {
    day: "Wednesday",
    theme: "Solution Development",
    items: ["Municipality workshops", "R.I.S.E. technology symposium", "NALU-assisted research", "Sponsor labs", "Procurement breakouts", "Evening hospitality extensions"],
  },
  {
    day: "Thursday",
    theme: "Resolution + Commitment",
    items: ["Municipal presentations", "Global translation broadcast", "Institutional commitments", "Media capture", "Closing gala", "Executive relationship sessions"],
  },
  {
    day: "Friday",
    theme: "Breakfast + Concierge Continuity",
    items: ["Morning breakfast", "Checkout networking", "Late-flight concierge", "Golf / dining / nightlife options", "Weekend extension programming"],
  },
];

const monetization = [
  { title: "Sponsorships", detail: "Title, presenting, program, municipality, translation, NALU, and VIP lounge sponsorships." },
  { title: "Executive Suites", detail: "Premium suite sponsorships, procurement retainers, and strategic deal facilitation." },
  { title: "Product Integration", detail: "Beverage, wellness, apparel, mobility, device, retail, and hospitality placements." },
  { title: "Hospitality Revenue", detail: "Room blocks, dining, nightlife, golf, concierge, transportation, wellness, and weekend extensions." },
  { title: "Media & VIBE", detail: "VIBE Network content, VIBE 100 creators, podcasts, interviews, and multilingual distribution." },
  { title: "Licensing & Continuity", detail: "University curriculum, NGO frameworks, institutional subscriptions, quarterly updates, and global access." },
];

const partners = [
  "ARIA Resort & Casino",
  "Majestra",
  "TPG Worldwide",
  "NCORE Unite",
  "NALU AI",
  "VIBE Network",
  "VIBE 100",
  "Stirling Club",
  "Universities",
  "NGOs",
  "Government",
  "Enterprise Sponsors",
];

function SectionHeader({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-120px" }}
      className={cx("max-w-4xl", align === "center" && "mx-auto text-center")}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {children && <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{children}</p>}
    </motion.div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cx("rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl", className)}>
      {children}
    </div>
  );
}

export default function NcoreAriaExperienceMicrosite() {
  const [activeDay, setActiveDay] = useState(0);
  const activeAgenda = useMemo(() => agenda[activeDay], [activeDay]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#05070b] text-white">
      <div className="pointer-events-none fixed inset-0 opacity-70">
        <div className="absolute left-[-10%] top-[-10%] h-[36rem] w-[36rem] rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-[10%] right-[-8%] h-[30rem] w-[30rem] rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_35%),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_100%,64px_64px,64px_64px]" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">NCORE Unite 2027</p>
            <p className="mt-1 text-sm text-slate-400">ARIA Las Vegas Experience Portal</p>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            <a href="#model" className="hover:text-white">Model</a>
            <a href="#agenda" className="hover:text-white">Agenda</a>
            <a href="#sponsors" className="hover:text-white">Sponsors</a>
            <a href="#venue" className="hover:text-white">ARIA</a>
            <a href="/" className="text-slate-400 hover:text-white">← Main Site</a>
            <a href="#participate" className="rounded-full border border-cyan-300/50 px-4 py-2 text-cyan-100 hover:bg-cyan-300/10">Participate</a>
          </nav>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-28">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100">
            High Touch + High Tech + Global Civic Intelligence
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            The future of convention programming is a live civic operating system.
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
            NCORE Unite 2027 transforms ARIA Las Vegas into an immersive destination platform where attendees, sponsors, universities, NGOs, governments, and enterprise partners collaborate inside municipality simulations, AI-assisted symposiums, procurement suites, hospitality experiences, and globally translated media ecosystems.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <a href="#participate" className="group rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-100">
              Enter the Ecosystem <ArrowRight className="ml-2 inline h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#sponsors" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Sponsor / Vendor Access
            </a>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }}>
          <GlassCard className="relative min-h-[540px] overflow-hidden p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.24),transparent_28%),radial-gradient(circle_at_75%_70%,rgba(245,158,11,0.16),transparent_30%)]" />
            <div className="absolute inset-x-8 top-8 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-cyan-300/15 text-cyan-200"><Network className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm font-semibold">NALU Civic Intelligence</p>
                  <p className="text-xs text-slate-400">Live translation • research • rewards</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">Online</span>
            </div>
            <div className="absolute bottom-8 left-8 right-8 grid gap-4 md:grid-cols-2">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur">
                  <p className="text-3xl font-semibold text-white">{s.value}</p>
                  <p className="mt-1 text-sm font-semibold text-cyan-100">{s.label}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{s.detail}</p>
                </div>
              ))}
            </div>
            <div className="absolute left-1/2 top-1/2 grid h-44 w-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan-200/30 bg-cyan-300/10 shadow-2xl shadow-cyan-500/20 backdrop-blur-xl">
              <div className="text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-100">ARIA</p>
                <p className="mt-2 text-2xl font-semibold">Las Vegas</p>
                <p className="mt-2 text-xs text-slate-300">Destination Platform</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      <section id="model" className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeader eyebrow="Operating Model" title="Four lanes. One integrated economic ecosystem." align="center">
          NCORE Unite is not built as a passive conference. It is structured as a coordinated civic, technology, commercial, and procurement environment where every program lane creates engagement, content, sponsorship value, and institutional opportunity.
        </SectionHeader>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-120px" }} className="mt-12 grid gap-5 md:grid-cols-2">
          {lanes.map((lane) => {
            const Icon = lane.icon;
            return (
              <motion.div variants={fadeUp} key={lane.title}>
                <GlassCard className="h-full">
                  <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-cyan-200"><Icon className="h-6 w-6" /></div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">{lane.eyebrow}</p>
                  <h3 className="mt-3 text-2xl font-semibold">{lane.title}</h3>
                  <p className="mt-4 leading-7 text-slate-300">{lane.text}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.03] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader eyebrow="Municipality Model™" title="Every table becomes a city.">
            Attendees are assigned to round-table municipalities, elect a Mayor, evaluate issue dossiers, allocate resources, consult NALU, and deliver final recommendations. The exercise creates leadership, ownership, collaboration, and measurable continuity beyond the venue.
          </SectionHeader>
          <GlassCard>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Mayor Election", "Resource Allocation", "NALU Query Support", "Sponsor Solution Labs", "Policy Prescriptions", "Global Translation Broadcast"].map((item, idx) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-semibold text-white">{String(idx + 1).padStart(2, "0")} / {item}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">Designed to move attendees from discussion into structured action.</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section id="agenda" className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeader eyebrow="Program Calendar" title="Monday welcome through Friday breakfast, with weekend concierge extensions.">
          The calendar is intentionally paced to move attendees from arrival and immersion into issue debate, solution design, procurement alignment, public commitments, and extended Las Vegas hospitality.
        </SectionHeader>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.38fr_0.62fr]">
          <div className="grid gap-3">
            {agenda.map((d, idx) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(idx)}
                className={cx(
                  "rounded-2xl border p-5 text-left transition",
                  activeDay === idx ? "border-cyan-300/60 bg-cyan-300/10" : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
                )}
              >
                <p className="text-sm font-semibold text-white">{d.day}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">{d.theme}</p>
              </button>
            ))}
          </div>
          <GlassCard>
            <div className="mb-6 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan-300/10 text-cyan-200"><CalendarDays className="h-6 w-6" /></div>
              <div>
                <h3 className="text-3xl font-semibold">{activeAgenda.day}</h3>
                <p className="text-cyan-200">{activeAgenda.theme}</p>
              </div>
            </div>
            <div className="grid gap-3">
              {activeAgenda.items.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
                  <p className="text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      <section id="venue" className="relative z-10 border-y border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 md:px-8 lg:grid-cols-2">
          <SectionHeader eyebrow="ARIA Experience" title="The venue is part of the platform.">
            ARIA Las Vegas is positioned as more than a venue hold. It becomes an executive hospitality environment where civic dialogue, luxury experience, sponsor activation, culinary programming, nightlife, wellness, and procurement alignment are integrated into one elevated destination experience.
          </SectionHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            {(
              [
                [Hotel, "Luxury Hospitality"],
                [Building2, "Executive Suites"],
                [Mic2, "VIP Symposium Lounge"],
                [MapPinned, "Vegas Concierge"],
              ] as [React.ComponentType<{ className?: string }>, string][]
            ).map(([Icon, label]) => (
              <GlassCard key={label}>
                <Icon className="h-7 w-7 text-cyan-200" />
                <h3 className="mt-5 text-xl font-semibold">{label}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">Designed to enhance attendee value, sponsor proximity, and executive relationship development.</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section id="sponsors" className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeader eyebrow="Monetization Stack" title="Built to monetize more than attendance." align="center">
          The economic engine extends across sponsorships, executive suite retainers, product integrations, hospitality participation, media rights, VIBE distribution, institutional licensing, and year-round continuity programming.
        </SectionHeader>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {monetization.map((m) => (
            <GlassCard key={m.title}>
              <WalletCards className="h-7 w-7 text-amber-200" />
              <h3 className="mt-5 text-xl font-semibold">{m.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{m.detail}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="relative z-10 border-y border-white/10 bg-white/[0.03] py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader eyebrow="Global Reach" title="Ideas leave the room." align="center">
            Through NALU, TPGW mobile delivery, and multilingual translation infrastructure, NCORE content, policy discussions, municipality outputs, podcasts, and institutional frameworks can be accessed and adapted by governments, universities, NGOs, and private institutions worldwide.
          </SectionHeader>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {(
              [
                [Globe2, "Multilingual Distribution", "Content and findings structured for immediate global consumption."],
                [Users, "Institutional Replication", "Universities and agencies may recreate NCORE simulations locally."],
                [Layers3, "Year-Round Continuity", "Quarterly updates, podcasts, scorecards, and symposium activity."],
              ] as [React.ComponentType<{ className?: string }>, string, string][]
            ).map(([Icon, title, text]) => (
              <GlassCard key={title}>
                <Icon className="h-8 w-8 text-cyan-200" />
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-20 md:px-8">
        <SectionHeader eyebrow="Ecosystem Partners" title="A platform designed for institutional and commercial alignment." />
        <div className="mt-8 flex flex-wrap gap-3">
          {partners.map((p) => (
            <span key={p} className="rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm text-slate-300">{p}</span>
          ))}
        </div>
      </section>

      <section id="participate" className="relative z-10 px-5 pb-20 md:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-cyan-300/20 bg-gradient-to-br from-cyan-300/15 via-white/[0.06] to-amber-300/10 p-8 shadow-2xl shadow-cyan-950/30 md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">Participate</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">Join the NCORE Unite 2027 ecosystem.</h2>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                Register as an attendee, activate as a sponsor, join a university delegation, request executive symposium access, or begin institutional partnership discussions.
              </p>
            </div>
            <div className="grid gap-3">
              {["Attendee Registration", "Sponsor Inquiry", "Executive Symposium Access", "University Delegation", "Institutional Partnership"].map((cta) => (
                <a key={cta} href="mailto:info@ncoreunite.com" className="group flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-5 py-4 text-sm font-semibold transition hover:bg-white/10">
                  {cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10 text-center text-sm text-slate-500 md:px-8">
        NCORE Unite 2027 ARIA Experience Portal • TPG Worldwide • NALU AI
        <span className="mx-3">·</span>
        <a href="/" className="text-cyan-400 hover:text-cyan-300">← Back to Main Site</a>
      </footer>
    </main>
  );
}
