"use client";

import { motion } from "framer-motion";

const SKILLS = [
  { cat: "Marketing & Content", items: ["Copywriting", "Social Media", "Content Strategie", "Community Management"] },
  { cat: "Web & SEO",           items: ["WordPress", "Elementor", "Yoast SEO", "Google PageSpeed", "Google Analytics"] },
  { cat: "Visueel",             items: ["Fotografie", "Videografie", "Canva", "Figma"] },
  { cat: "Soft Skills",         items: ["Zelfstandig werken", "Presenteren", "Feedback verwerken", "Plannen"] },
];

const TIMELINE = [
  { year: "2026", title: "BPV Stagiair bij Brandmerck", sub: "Echte projecten, echte klanten, echte deadlines — Bolsward", icon: "🏢", active: true },
  { year: "2025", title: "Winkelmedewerker Allied Sports", sub: "Naast de studie aan het werk — Sneek", icon: "🏅" },
  { year: "2025", title: "Start MBO Marketing & Communicatie", sub: "Theorie achter de praktijk — Firda Sneek", icon: "🎓", active: true },
  { year: "2024", title: "Zelfstandig Online Marketeer", sub: "Een jaar lang op eigen kracht gebouwd — Remote", icon: "💻" },
  { year: "2023", title: "Productiemedewerker", sub: "Werken in een team van 10+ mensen — Moordrecht", icon: "🏭" },
  { year: "2020", title: "Eerste bijbaan in de horeca", sub: "Klantcontact en zelfstandigheid — Alblasserdam", icon: "☕" },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <Reveal>
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/60 mb-4">/ Over mij</p>
          <h1 className="font-black tracking-[-0.04em] leading-[1.05] text-white mb-6"
              style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>
            Hoi, ik ben{" "}
            <span className="text-accent">Denzel</span>.
          </h1>
          <p className="text-lg text-white leading-relaxed max-w-2xl">
            Ik ben 21 jaar en kom oorspronkelijk uit 's-Gravenhage, maar ben opgegroeid in Rotterdam. Op mijn twaalfde verhuisde ik naar Sneek, een stad die ik inmiddels als thuis beschouw. Drie steden, drie levensfases.
          </p>
        </Reveal>

        {/* Bio + quick facts */}
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 mt-20">
          <Reveal delay={0.1}>
            <div className="space-y-5 text-base text-white leading-[1.9]">
              <p>
                Ik ben 21 jaar en kom oorspronkelijk uit 's-Gravenhage, maar ben opgegroeid in Rotterdam.
                Op mijn twaalfde verhuisde ik naar Sneek, een stad die ik inmiddels als thuis beschouw.
                Drie steden, drie levensfases. Elke verhuizing dwong me opnieuw te beginnen, nieuwe mensen
                te leren kennen en me aan te passen. Dat heeft me gemaakt tot wie ik nu ben: iemand die
                zich snel inleeft, niet snel opgeeft en altijd op zoek is naar de volgende stap.
              </p>
              <p>
                Voordat ik aan mijn opleiding begon, heb ik ruim een jaar lang zelfstandig gewerkt
                in de wereld van sociale media. Ik verdiepte me in algoritmes, organische groei en
                AI-gegenereerde content. Het was een periode van veel uitproberen, fouten maken en
                leren, ver buiten mijn comfortzone. Die ervaring gaf me een praktische kijk op digitale
                communicatie die ik in geen enkel klaslokaal had kunnen opdoen.
              </p>
              <p>
                Toen ik eenmaal bij Firda begon met de opleiding Marketing & Communicatie viel
                alles op zijn plek. De theorie achter wat ik al deed begon te kloppen. Tijdens
                mijn stage bij Brandmerck werkte ik aan echte projecten voor echte klanten:
                Reddit-communities opbouwen voor Kustweek.nl, websites optimaliseren, content
                schrijven met een doel. Geen nep-opdrachten, gewoon werk met deadlines.
              </p>
              <p>
                Naast mijn werk hou ik van bewegen en de wereld ontdekken. Het afgelopen jaar
                bezocht ik 9 landen. In het weekend ren ik 8 kilometer, speel ik padel in
                teamverband en train ik 4 à 5 keer per week. Hyrox, de combinatie van kracht
                en uithoudingsvermogen, is mijn nieuwste uitdaging. Die gedrevenheid neem ik
                mee naar alles wat ik aanpak.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div
              className="rounded-3xl p-7 h-fit sticky top-28"
              style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <h3 className="text-sm font-bold text-white mb-5">Op een rijtje</h3>
              <div className="space-y-4">
                {[
                  { label: "Naam",        val: "Denzel Keenan" },
                  { label: "Leeftijd",    val: "21 jaar" },
                  { label: "Geboren",     val: "4 maart 2005, 's-Gravenhage" },
                  { label: "Woonplaats",  val: "Sneek, Friesland" },
                  { label: "Opleiding",   val: "MBO Marketing & Communicatie" },
                  { label: "School",      val: "Firda, Sneek" },
                  { label: "Landen",      val: "9 bezocht (afgelopen jaar)" },
                  { label: "Email",       val: "denzelkeenan04@gmail.com" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-xs text-white/60 flex-shrink-0">{label}</span>
                    <span className="text-xs font-medium text-white text-right">{val}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-[10px] text-white/60 uppercase tracking-wide mb-3">Hobby's</p>
                <div className="flex flex-wrap gap-2">
                  {["Fitness & Krachttraining", "Padel", "Hyrox", "Reizen"].map((h) => (
                    <span
                      key={h}
                      className="text-xs px-3 py-1.5 rounded-full text-white"
                      style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)" }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Timeline */}
        <Reveal delay={0.1}>
          <div className="mt-20">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/60 mb-3">Tijdlijn</p>
            <h2 className="text-3xl font-black tracking-tight text-white mb-10">Mijn pad</h2>
            <div className="relative pl-8">
              <div
                className="absolute left-2 top-2 bottom-2 w-px"
                style={{ background: "linear-gradient(to bottom, #7c3aed, #0ea5e9, rgba(0,0,0,0.05))" }}
              />
              <div className="space-y-6">
                {TIMELINE.map(({ year, title, sub, icon, active }, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                    className="relative flex items-center gap-5"
                  >
                    <div
                      className="absolute -left-6 w-4 h-4 rounded-full ring-4 ring-black flex items-center justify-center text-[8px]"
                      style={{ background: active ? "#7c3aed" : "rgba(255,255,255,0.2)" }}
                    />
                    <div
                      className="flex items-center gap-4 px-5 py-4 rounded-2xl flex-1"
                      style={{
                        background: active ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${active ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.1)"}`,
                      }}
                    >
                      <span className="text-xl">{icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{title}</p>
                        <p className="text-xs text-white/70">{sub}</p>
                      </div>
                      <span className="text-[10px] font-mono text-white/60 flex-shrink-0">{year}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* Skills grid */}
        <Reveal delay={0.1}>
          <div className="mt-20">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/60 mb-3">Toolkit</p>
            <h2 className="text-3xl font-black tracking-tight text-white mb-10">Wat ik meebring</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SKILLS.map(({ cat, items }, ci) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: ci * 0.08, ease: "easeOut" }}
                  className="rounded-2xl p-6"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <p className="text-xs font-bold text-white mb-4 uppercase tracking-wide">{cat}</p>
                  <ul className="space-y-2">
                    {items.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm text-white/80">
                        <span className="w-1 h-1 rounded-full bg-white/40 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </main>
  );
}
