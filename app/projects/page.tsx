"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";

type SkillProject = {
  num:         string;
  skill:       string;
  what:        string;
  learned:     string[];
  tags:        string[];
  year:        string;
  color:       string;
  lightColor:  string;
  img:         string;
};

const PROJECTS: SkillProject[] = [
  {
    num:        "01",
    skill:      "WordPress & Elementor",
    what:       "Website bouwen & beheren",
    learned: [
      "Pagina's opgebouwd met Elementor drag-and-drop",
      "Navigatiestructuur en menu's ingesteld",
      "Afbeeldingen geoptimaliseerd voor snelheid",
      "Mobiele responsiviteit gecontroleerd en gecorrigeerd",
    ],
    tags:    ["WordPress", "Elementor", "Responsive Design", "CMS beheer"],
    year:    "2026",
    color:   "#7c3aed",
    lightColor: "#ede9fe",
    img:     "/images/work/kustweek-wordpress.png",
  },
  {
    num:        "02",
    skill:      "SEO & Snelheidsoptimalisatie",
    what:       "Technische website-optimalisatie",
    learned: [
      "Yoast SEO ingesteld voor elke pagina",
      "Google PageSpeed-score verbeterd met lazy loading",
      "CSS inline geladen voor betere laadtijd",
      "Google Fonts lokaal gehost voor privacy & snelheid",
    ],
    tags:    ["Yoast SEO", "Google PageSpeed", "Core Web Vitals", "Performance"],
    year:    "2026",
    color:   "#0ea5e9",
    lightColor: "#e0f2fe",
    img:     "/images/work/seo-optimalisatie.png",
  },
  {
    num:        "03",
    skill:      "Community Management",
    what:       "Reddit-community van 0 opgebouwd",
    learned: [
      "Community branding en bannercreatie ontworpen",
      "Posts en discussies opgestart om engagement te stimuleren",
      "Contentkalender voor Reddit bijgehouden",
      "Organisch bereik gegenereerd zonder advertentiebudget",
    ],
    tags:    ["Reddit", "Community Building", "Organisch bereik", "Canva"],
    year:    "2026",
    color:   "#f59e0b",
    lightColor: "#fef3c7",
    img:     "/images/work/reddit-banner.png",
  },
  {
    num:        "04",
    skill:      "Webdesign & Huisstijl",
    what:       "Pagina-layouts en visuele uitstraling",
    learned: [
      "Footer en navigatie ontworpen passend bij merkidentiteit",
      "Kleurenschema's en typografie consistent doorgevoerd",
      "Logo-varianten beoordeeld en verwerkt",
      "Feedback van opdrachtgever verwerkt in revisies",
    ],
    tags:    ["Webdesign", "UI/UX", "Branding", "Figma / Canva"],
    year:    "2026",
    color:   "#22c55e",
    lightColor: "#dcfce7",
    img:     "/images/work/kustweek-footer.png",
  },
  {
    num:        "05",
    skill:      "Fotografie & Videografie",
    what:       "Content op locatie geproduceerd",
    learned: [
      "Locaties gescouted en gefotografeerd in Friesland",
      "Compositie en belichting afgestemd op merksfeer",
      "Videobeelden bewerkt voor gebruik op website en socials",
      "Foto's geoptimaliseerd voor webgebruik (formaat/grootte)",
    ],
    tags:    ["Fotografie", "Videografie", "On-location", "Content productie"],
    year:    "2026",
    color:   "#8b5cf6",
    lightColor: "#ede9fe",
    img:     "/images/work/kustweek-homepage.png",
  },
  {
    num:        "06",
    skill:      "Copywriting & Content",
    what:       "Teksten schrijven voor web en socials",
    learned: [
      "Webpagina-teksten geschreven in de juiste toon voor de doelgroep",
      "Paginatitels en meta-descriptions opgesteld voor SEO",
      "Social media posts gecreëerd met call-to-action",
      "Feedback van teamleden verwerkt om kwaliteit te verhogen",
    ],
    tags:    ["Copywriting", "SEO-teksten", "Social media", "Tone of voice"],
    year:    "2026",
    color:   "#ef4444",
    lightColor: "#fee2e2",
    img:     "/images/work/kustweek-logo.png",
  },
];

function SkillCard({ p, i }: { p: SkillProject; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sp = { stiffness: 120, damping: 20 };
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), sp);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), sp);

  function onMove(e: React.MouseEvent) {
    if (flipped) return;
    const r = cardRef.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
      style={{ perspective: "1200px", height: 420 }}
      className="cursor-pointer select-none"
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          rotateX: flipped ? 0 : rotX,
          rotateY: flipped ? 180 : rotY,
          transformStyle: "preserve-3d",
          transition: flipped ? "transform 0.65s cubic-bezier(0.4,0,0.2,1)" : undefined,
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* ── VOORKANT ── */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
            borderRadius: "1.5rem",
            overflow: "hidden",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          }}
        >
          {/* Screenshot */}
          <div className="relative h-48 overflow-hidden" style={{ background: p.lightColor }}>
            <Image
              src={p.img}
              alt={p.skill}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.95) 100%)" }}
            />
            <div
              className="absolute top-4 left-4 w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white"
              style={{ background: p.color }}
            >
              {p.num}
            </div>
            <span
              className="absolute top-4 right-4 text-[10px] font-mono px-2.5 py-1 rounded-full text-white/70"
              style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.08)" }}
            >
              {p.year}
            </span>
          </div>

          <div className="p-6">
            <p className="text-[10px] font-mono uppercase tracking-wide mb-1" style={{ color: p.color }}>
              {p.what}
            </p>
            <h3 className="text-lg font-black tracking-tight text-white mb-3">{p.skill}</h3>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2.5 py-1 rounded-full text-white/80"
                  style={{ background: "#f4f4f5", border: "1px solid #e4e4e7" }}
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-white/60 flex items-center gap-1.5 mt-auto">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1v5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Klik om te draaien
            </p>
          </div>
        </div>

        {/* ── ACHTERKANT ── */}
        <div
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            inset: 0,
            borderRadius: "1.5rem",
            padding: "1.75rem",
            background: "rgba(255,255,255,0.05)",
            border: `1px solid ${p.color}30`,
            boxShadow: `0 8px 40px ${p.color}18, 0 2px 12px rgba(0,0,0,0.06)`,
          }}
        >
          {/* Gekleurde top strip */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, ${p.color}, ${p.color}88)` }}
          />

          <div className="flex items-center gap-3 mb-5 mt-2">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black text-white flex-shrink-0"
              style={{ background: p.color }}
            >
              {p.num}
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-wide" style={{ color: p.color }}>{p.what}</p>
              <p className="text-sm font-black text-white">{p.skill}</p>
            </div>
          </div>

          <p className="text-[10px] font-semibold uppercase tracking-wide text-white/60 mb-3">Wat ik leerde</p>
          <ul className="space-y-2.5 mb-5">
            {p.learned.map((l) => (
              <li key={l} className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.color }} />
                {l}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2.5 py-1 rounded-full font-medium"
                style={{ background: p.lightColor, color: p.color }}
              >
                {t}
              </span>
            ))}
          </div>

          <p className="text-[11px] text-white/60 flex items-center gap-1.5 mt-4">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Klik om terug te draaien
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-5"
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/60 mb-4">/ Vaardigheden & Projecten</p>
          <h1
            className="font-black tracking-[-0.04em] leading-[1.05] text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Wat ik{" "}
            <span className="text-accent">leerde</span>.
          </h1>
          <p className="text-lg text-white leading-relaxed max-w-2xl">
            Tijdens mijn stage bij Brandmerck werkte ik aan echte projecten voor echte klanten.
            Elke opdracht leerde me een nieuwe vaardigheid — hier zie je precies wat.
          </p>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="flex flex-wrap gap-4 mb-14 mt-8"
        >
          {[
            { v: "6",    l: "Vaardigheden geleerd" },
            { v: "3+",   l: "Live websites geraakt" },
            { v: "100%", l: "Echte klantprojecten" },
            { v: "5mo",  l: "Stage-ervaring" },
          ].map(({ v, l }) => (
            <div
              key={l}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="text-xl font-black text-white">{v}</span>
              <span className="text-xs text-white/60">{l}</span>
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <SkillCard key={p.num} p={p} i={i} />
          ))}
        </div>

        {/* Live websites sectie */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mt-20"
        >
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/60 mb-3">/ Live websites</p>
            <h2 className="text-2xl font-black tracking-tight text-white mb-2">
              Gebouwd met{" "}
              <span className="text-accent">WordPress & Elementor</span>.
            </h2>
            <p className="text-sm text-white max-w-xl">
              Twee live websites die ik van begin tot eind heb opgebouwd voor echte klanten — van structuur en navigatie tot huisstijl en SEO.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Kustweek.nl */}
            <motion.a
              href="https://kustweek.nl"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="group rounded-3xl overflow-hidden block"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                textDecoration: "none",
              }}
            >
              {/* Screenshot */}
              <div className="relative h-52 overflow-hidden" style={{ background: "#e0f2fe" }}>
                <Image
                  src="/images/work/kustweek-homepage.png"
                  alt="Kustweek.nl homepage"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.9) 100%)" }}
                />
                <span
                  className="absolute top-4 right-4 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                  style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a", border: "1px solid #bbf7d0" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                  Live
                </span>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-black text-white tracking-tight">kustweek.nl</h3>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/60 group-hover:text-[#0ea5e9] transition-colors mt-0.5 flex-shrink-0">
                    <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  Toeristische evenementenwebsite voor de kust van Friesland. Pagina's opgebouwd in Elementor, navigatiestructuur ingericht, afbeeldingen geoptimaliseerd en SEO via Yoast ingesteld.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["WordPress", "Elementor", "Yoast SEO", "Responsive"].map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ background: "#e0f2fe", color: "#0ea5e9" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>

            {/* Restaurantniven.nl */}
            <motion.a
              href="https://restaurantniven.nl"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.07, ease: "easeOut" }}
              className="group rounded-3xl overflow-hidden block"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                textDecoration: "none",
              }}
            >
              {/* Placeholder header */}
              <div
                className="relative h-52 flex items-center justify-center overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
              >
                <div className="text-center select-none">
                  <p className="text-white/20 text-[10px] font-mono uppercase tracking-widest mb-2">Restaurant</p>
                  <p
                    className="font-black text-white tracking-tight"
                    style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.04em" }}
                  >
                    Niven
                  </p>
                  <p className="text-white/30 text-[10px] mt-1 font-mono">restaurantniven.nl</p>
                </div>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.15) 0%, transparent 60%)" }}
                />
                <span
                  className="absolute top-4 right-4 text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                  style={{ background: "rgba(34,197,94,0.1)", color: "#16a34a", border: "1px solid #bbf7d0" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse" />
                  Live
                </span>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-base font-black text-white tracking-tight">restaurantniven.nl</h3>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white/60 group-hover:text-[#7c3aed] transition-colors mt-0.5 flex-shrink-0">
                    <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-xs text-white/70 leading-relaxed mb-4">
                  Website voor een restaurant, volledig opgebouwd met Elementor. Huisstijl doorgevoerd, menustructuur ingericht en de site mobielvriendelijk gemaakt.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["WordPress", "Elementor", "Webdesign", "Horeca"].map((t) => (
                    <span key={t} className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ background: "#ede9fe", color: "#7c3aed" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* Handleidingen & Workshop sectie */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mt-20"
        >
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/60 mb-3">/ Interne documentatie & training</p>
            <h2 className="text-2xl font-black tracking-tight text-white mb-2">
              Handleidingen gemaakt voor{" "}
              <span className="text-accent">nieuwe stagiairs</span>.
            </h2>
            <p className="text-sm text-white max-w-xl">
              Naast het uitvoerende werk heb ik documentatie gemaakt zodat toekomstige stagiairs direct aan de slag kunnen. Ook gaf ik samen met andere stagiairs een workshop aan twee VWO-klassen van verschillende scholen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                icon: "📋",
                label: "Reddit Community Handleiding",
                desc: "Stap-voor-stap gids voor het aanmaken, inrichten en beheren van een Reddit-community voor klanten.",
                meta: "12 slides · PowerPoint",
                color: "#7c3aed",
                lightColor: "#ede9fe",
                href: "/docs/reddit-community-handleiding.pptx",
                type: "pptx",
              },
              {
                icon: "📈",
                label: "Reddit Organisch Opbouwen",
                desc: "Complete gids voor organische accountgroei en community building — van karma opbouwen tot community launchen.",
                meta: "15 slides · PDF",
                color: "#f59e0b",
                lightColor: "#fef3c7",
                href: "/docs/reddit-organisch-opbouwen.pdf",
                type: "pdf",
              },
              {
                icon: "🔒",
                label: "NordVPN + Reddit Onboarding",
                desc: "Visuele handleiding voor nieuwe stagiairs: NordVPN instellen en veilig inloggen op Reddit accounts.",
                meta: "10 slides · PowerPoint",
                color: "#0ea5e9",
                lightColor: "#e0f2fe",
                href: "/docs/nordvpn-reddit-onboarding.pptx",
                type: "pptx",
              },
              {
                icon: "🎤",
                label: "Workshop 21 mei — VWO presentatie",
                desc: "Presentatie over digital marketing gegeven samen met andere stagiairs aan twee VWO-klassen van verschillende scholen.",
                meta: "PDF · Canva · Brandmerck",
                color: "#22c55e",
                lightColor: "#dcfce7",
                href: "/docs/workshop-21-mei.pdf",
                type: "pdf",
              },
            ].map((doc, i) => (
              <motion.a
                key={doc.label}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                className="group flex items-start gap-4 rounded-3xl p-6 transition-all duration-200 hover:shadow-lg"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  textDecoration: "none",
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: doc.lightColor }}
                >
                  {doc.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-sm font-bold text-white leading-snug">{doc.label}</p>
                    {/* Open/download badge */}
                    <span
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 uppercase tracking-wide"
                      style={{ background: doc.lightColor, color: doc.color }}
                    >
                      {doc.type === "pdf" ? "Openen" : "Download"}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-2">{doc.desc}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/60">{doc.meta}</span>
                    <svg
                      width="10" height="10" viewBox="0 0 10 10" fill="none"
                      className="text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
                    >
                      <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mt-16 rounded-3xl p-10 text-center"
          style={{
            background: "linear-gradient(135deg, #faf5ff 0%, #f0f9ff 100%)",
            border: "1px solid rgba(124,58,237,0.1)",
          }}
        >
          <h2 className="text-2xl font-black tracking-tight text-white mb-2">
            Wil je samenwerken?
          </h2>
          <p className="text-sm text-white/70 mb-6 max-w-sm mx-auto">
            Ik leer snel en pak nieuwe vaardigheden graag op. Neem contact op.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white"
            style={{ background: "#09090b" }}
          >
            Contact opnemen
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </main>
  );
}
