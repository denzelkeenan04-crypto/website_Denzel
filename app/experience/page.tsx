"use client";

import { motion } from "framer-motion";

const EXPERIENCE = [
  {
    period:    "Feb 2026 – Jun 2026",
    title:     "BPV Stagiair Marketing & Communicatie",
    company:   "Brandmerck",
    location:  "Bolsward, Friesland",
    color:     "#7c3aed",
    lightColor:"#ede9fe",
    current:   true,
    points: [
      "Opbouw en beheer van Reddit-communities voor Kustweek.nl als hoofdproject",
      "Ontwikkelde 3 interne onboardinghandleidingen voor nieuwe stagiairs: Reddit community-beheer, organische groeistrategie en NordVPN-setup",
      "Gaf samen met andere stagiairs een marketing workshop aan twee VWO-klassen van verschillende scholen",
      "Websitebeheer en -optimalisatie voor klanten (WordPress + Elementor)",
      "SEO-analyses en implementaties via Yoast SEO",
      "Google Analytics-rapportages voor klantpresentaties",
      "Assistentie bij fotografie en videoproductie op locatie",
    ],
    deliverables: [
      { icon: "📋", label: "Reddit Community Handleiding", sub: "12 slides · Onboarding voor nieuwe stagiairs" },
      { icon: "📈", label: "Reddit Organisch Opbouwen", sub: "15 slides · Community groei & SEO strategie" },
      { icon: "🔒", label: "NordVPN + Reddit Onboarding", sub: "10 slides · VPN-setup & veilig inloggen" },
      { icon: "🎤", label: "Workshop 21 mei", sub: "Presentatie voor 2 VWO-klassen van verschillende scholen" },
    ],
  },
  {
    period:    "Jan 2024 – Aug 2025",
    title:     "Zelfstandig Online Marketeer",
    company:   "Eigen onderneming",
    location:  "Remote",
    color:     "#f59e0b",
    lightColor:"#fef3c7",
    current:   false,
    points: [
      "Beheer van sociale media accounts gericht op organische groei",
      "Creëren van AI-gegenereerde content: foto's en video's voor Instagram en Twitter",
      "Virale groeistrategie ontwikkeld en uitgevoerd op meerdere platforms",
      "Diepgaande kennis opgedaan van algoritmes, engagement en contenttrends",
      "1,5 jaar lang volledig op eigen kracht een onderneming gerund",
    ],
  },
  {
    period:    "Jun 2025 – heden",
    title:     "Medewerker",
    company:   "Allied Sports",
    location:  "Sneek, Friesland",
    color:     "#0ea5e9",
    lightColor:"#e0f2fe",
    current:   true,
    points: [
      "Jeugdclinics padel geven en jonge spelers begeleiden",
      "Organiseren en beheren van de squash laddercompetitie",
      "Runnen van de King of Court toernooien",
      "Maken van video content voor social media",
      "Advies en verkoop van rackets in de winkel en op events",
      "Bediening achter de bar tijdens evenementen",
    ],
  },
  {
    period:    "Jul 2023 – Jul 2024",
    title:     "Productiemedewerker",
    company:   "BV CP Phenolics",
    location:  "Moordrecht",
    color:     "#f59e0b",
    lightColor:"#fef3c7",
    current:   false,
    points: [
      "Kwaliteitscontrole bij productie van technische kunststoffen",
      "Machine-bediening en toezicht op productielijn",
      "Samenwerking in een team van 10+ medewerkers",
    ],
  },
  {
    period:    "Mar 2020 – Okt 2023",
    title:     "Medewerker Bediening",
    company:   "Le Barage",
    location:  "Alblasserdam",
    color:     "#22c55e",
    lightColor:"#dcfce7",
    current:   false,
    points: [
      "Bediening en klantencontact in horecagelegenheid",
      "Zelfstandig openen en sluiten van de zaak",
      "Training van nieuwe medewerkers",
    ],
  },
];

export default function ExperiencePage() {
  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/60 mb-4">/ Ervaring</p>
          <h1
            className="font-black tracking-[-0.04em] leading-[1.05] text-white mb-6"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Werkervaring &{" "}
            <span className="text-accent">stage</span>.
          </h1>
          <p className="text-lg text-white/70 leading-relaxed max-w-xl">
            Van horeca tot marketing bureau — elk hoofdstuk leerde me iets nieuws.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-20 relative">
          {/* Vertical line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(124,58,237,0.2), rgba(14,165,233,0.1) 60%, transparent)" }}
          />

          <div className="space-y-10 pl-16">
            {EXPERIENCE.map(({ period, title, company, location, color, lightColor, current, points, deliverables }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[2.75rem] top-6 w-3 h-3 rounded-full ring-4 ring-white"
                  style={{ background: color }}
                />

                {/* Card */}
                <div
                  className="rounded-3xl p-8"
                  style={{
                    background: "#0a0a0a",
                    border: "1px solid rgba(0,0,0,0.07)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* Top */}
                  <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-2xl flex-shrink-0"
                        style={{ background: lightColor }}
                      />
                      <div>
                        <p className="text-base font-bold text-white">{title}</p>
                        <p className="text-xs text-white/70">{company} · {location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span
                        className="text-[10px] font-mono px-2.5 py-1 rounded-full text-white/70"
                        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
                      >
                        {period}
                      </span>
                      {current && (
                        <span
                          className="text-[10px] px-2.5 py-1 rounded-full font-medium text-white"
                          style={{ background: "rgba(34,197,94,0.25)", border: "1px solid #bbf7d0" }}
                        >
                          Nu
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Points */}
                  <ul className="space-y-2.5">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-white/80">
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: color }} />
                        {p}
                      </li>
                    ))}
                  </ul>

                  {/* Deliverables */}
                  {deliverables && (
                    <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-white/60 mb-3 flex items-center gap-1.5">
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                          <path d="M2 1h7a1 1 0 011 1v7a1 1 0 01-1 1H2a1 1 0 01-1-1V2a1 1 0 011-1zM1 4h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" style={{ color: 'rgba(255,255,255,0.6)' }}/>
                        </svg>
                        Opgeleverde documenten & activiteiten
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {deliverables.map((d) => (
                          <div
                            key={d.label}
                            className="flex items-start gap-2.5 rounded-2xl px-3.5 py-3"
                            style={{ background: lightColor }}
                          >
                            <span className="text-base leading-none mt-0.5">{d.icon}</span>
                            <div>
                              <p className="text-xs font-semibold text-[#09090b]">{d.label}</p>
                              <p className="text-[10px] text-white/70 leading-snug mt-0.5">{d.sub}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Opleiding block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-16 rounded-3xl p-8"
          style={{ background: "linear-gradient(135deg, #faf5ff 0%, #f0f9ff 100%)", border: "1px solid rgba(124,58,237,0.12)" }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#09090b]/60 mb-5">Opleiding</p>
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #7c3aed, #0ea5e9)" }}
            >
              F
            </div>
            <div>
              <p className="text-base font-bold text-[#09090b]">MBO Marketing & Communicatie</p>
              <p className="text-sm text-[#09090b]/70">Firda · Sneek · Aug 2025 – Jun 2027</p>
            </div>
            <span
              className="ml-auto text-[10px] px-2.5 py-1 rounded-full font-medium text-[#09090b] flex-shrink-0"
              style={{ background: "rgba(34,197,94,0.25)", border: "1px solid #bbf7d0" }}
            >
              Huidig
            </span>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
