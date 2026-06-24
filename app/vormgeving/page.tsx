"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type Assignment = {
  num: string;
  title: string;
  category: string;
  points: number;
  done: boolean;
  img?: string;
  imgAlt?: string;
  video?: string;
  video2?: string;
  extraImg?: string;
  story: string;
  feedback: string[];
  tags: string[];
  color: string;
  lightColor: string;
  featured?: boolean;
};

const ASSIGNMENTS: Assignment[] = [
  {
    num: "01",
    title: "Stilte foto",
    category: "Fotografie",
    points: 2,
    done: true,
    img: "/images/vormgeving/stilte-foto.png",
    imgAlt: "Mist over een spiegelglad meer bij zonsopkomst",
    story:
      "Voor dit onderdeel was het doel één ding: stilte vastleggen. Ik stond vroeg op en liep naar een plek waar ik het water al van verre zag glinsteren. De mist hing laag over het meer, de bomen waren silhouetten en nergens was een geluid te horen. Ik wachtte tot het licht precies goed was, drukte af en wist meteen: dit is hem. Geen nabewerking nodig — de natuur deed het werk zelf.",
    feedback: [
      "Bijsnijding aangepast: meer lucht boven de bomen voor rustiger gevoel",
      "Helderheid iets omlaag gezet zodat de mistsfeer bewaard bleef",
      "Tweede en derde foto toegevoegd op verzoek van de docent",
    ],
    tags: ["Fotografie", "Compositie", "Natuurlijk licht", "Camera"],
    color: "#7c3aed",
    lightColor: "#ede9fe",
  },
  {
    num: "02",
    title: "Weerfoto",
    category: "Fotografie",
    points: 2,
    done: true,
    img: "/images/vormgeving/scheveningen.png",
    imgAlt: "Eenzame wandelaar op het natte strand van Scheveningen",
    story:
      "De opdracht was simpel: laat het weer het hoofdonderwerp zijn. Op het strand van Scheveningen vond ik wat ik zocht. Een bewolkte lucht, nat zand en één figuur in de verte die de schaal van het geheel versterkte. De rust en de weidsheid spreken voor zich — het weer als sfeer, niet als spektakel.",
    feedback: [
      "Horizonlijn rechtgezet na feedback dat die scheef stond",
      "Contrast licht verhoogd zodat de luchtstructuur beter zichtbaar werd",
      "Kadrering iets verkleind om de lege ruimte links weg te halen",
    ],
    tags: ["Fotografie", "Landschap", "Sfeer", "Strand"],
    color: "#0ea5e9",
    lightColor: "#e0f2fe",
  },
  {
    num: "03",
    title: "Social media campagne",
    category: "Campagne ontwerp",
    points: 5,
    done: true,
    video: "/video/social-media-campagne.mp4",
    video2: "/video/social-media-campagne-2.mp4",
    story:
      "Dit was de zwaarste opdracht: een volledige sociale media campagne bedenken voor Allied Sports, de padel- en squashwinkel in Sneek. Ik werkte een concept uit dat past bij de energieke sfeer van de sport, met een korte promovideo die als reel of story ingezet kan worden. De campagne richt zich op de lokale doelgroep en laat zien wat Allied Sports te bieden heeft — van clinics en toernooien tot racketadvies.",
    feedback: [
      "Muziek in de video aangepast: rustiger tempo paste beter bij de doelgroep",
      "Caption herschreven — eerste versie was te lang voor een reel",
      "Logo van Allied Sports groter gemaakt voor betere merkherkenning",
    ],
    tags: ["Campagne", "Allied Sports", "Padel", "Sneek", "Video", "Reel", "Social media"],
    color: "#f59e0b",
    lightColor: "#fef3c7",
    featured: true,
  },
  {
    num: "04",
    title: "Display advertising",
    category: "Online adverteren",
    points: 2,
    done: true,
    img: "/images/vormgeving/banners.png",
    imgAlt: "Nike display banners in drie formaten",
    story:
      "Voor display advertising maakte ik drie banners voor Nike in verschillende standaardformaten: een leaderboard (1200×400 px), een square (1080×1080 px) en een rectangle (1200×628 px). Elk formaat heeft dezelfde visuele taal maar is qua compositie en tekstverdeling aangepast aan het formaat. Strak, herkenbaar en direct.",
    feedback: [
      "Lettergrootte van de tagline vergroot — was te klein op klein scherm",
      "Knopkleur aangepast van wit naar geel voor hogere klikbaarheid",
      "Tekstpositie in de square-banner verschoven zodat het gezicht niet werd afgedekt",
    ],
    tags: ["Display advertising", "Nike", "Banners", "Canva", "Online advertising"],
    color: "#0ea5e9",
    lightColor: "#e0f2fe",
  },
  {
    num: "05",
    title: "Flyer",
    category: "Print & digitaal",
    points: 2,
    done: true,
    img: "/images/vormgeving/flyer-sinterklaas.jpg",
    imgAlt: "Sinterklaas flyer voor Allied Sports Sneek",
    story:
      "Voor Allied Sports ontwierp ik een Sinterklaasflyer om de speciale padel-actie te promoten. De uitdaging: een sportieve sfeer combineren met de warmte van het sinterklaasseizoen. Met een bruine achtergrond, pepernoten en de herkenbare Allied Sports huisstijl werd het een flyer die meteen opvalt in een feed of op een prikbord.",
    feedback: [
      "Huisstijl aangescherpt: logo's op alle vier de hoeken consequent geplaatst",
      "Spelfout in 'aankomende' gecorrigeerd na docent-review",
      "Prijs duidelijker in beeld gebracht — stond eerst te klein in de tekst verstopt",
    ],
    tags: ["Flyer", "Allied Sports", "Sinterklaas", "Canva", "Huisstijl"],
    color: "#22c55e",
    lightColor: "#dcfce7",
  },
  {
    num: "06",
    title: "Vacature",
    category: "Print & digitaal",
    points: 2,
    done: true,
    img: "/images/vormgeving/vacature.png",
    imgAlt: "Vacature poster voor stagiair sport- en evenementenorganisatie",
    story:
      "Voor Allied Sports maakte ik ook een vacature-poster voor een stagiair sport- en evenementenorganisatie. De post moest professioneel ogen maar ook energie uitstralen — precies wat je verwacht van een sportieve werkgever. Ik combineerde een actionfoto met duidelijke kopregels en contactinformatie zodat de post zowel op Instagram als uitgeprint werkt.",
    feedback: [
      "Functietitel in hoofdletters gezet voor meer impact boven de vouw",
      "E-mailadres en telefoonnummer toegevoegd — stond er eerst niet in",
      "Tekstkleur op de foto aangepast naar wit zodat het beter leesbaar werd",
    ],
    tags: ["Vacature", "Allied Sports", "Poster", "Typografie", "Canva"],
    color: "#8b5cf6",
    lightColor: "#ede9fe",
  },
  {
    num: "07",
    title: "Nieuwsbericht",
    category: "Schrijven & vormgeving",
    points: 3,
    done: true,
    img: "/images/vormgeving/nieuwsbericht.png",
    imgAlt: "Nieuwsbericht opgemaakt als journalistiek artikel",
    story:
      "Voor deze opdracht schreef en vormgaf ik een nieuwsbericht in journalistieke stijl. Het doel was om een actueel onderwerp helder en bondig te presenteren — met een sterke kop, een informatieve lead en een opbouw die de lezer direct meeneemt. De lay-out moest professioneel ogen, alsof het artikel in een krant of op een nieuwssite zou staan. Een combinatie van schrijven én design.",
    feedback: [
      "Kop herschreven — eerste versie was te lang en niet pakkend genoeg",
      "Alinea-indeling verbeterd voor betere leesbaarheid op de pagina",
      "Datum en bronvermelding toegevoegd na feedback dat die ontbraken",
    ],
    tags: ["Nieuwsbericht", "Journalistiek", "Copywriting", "Lay-out", "Canva"],
    color: "#ec4899",
    lightColor: "#fdf2f8",
  },
  {
    num: "08",
    title: "Loesje poster",
    category: "Typografie",
    points: 2,
    done: true,
    img: "/images/vormgeving/loesje.png",
    imgAlt: "Loesje poster met quote over agenda en geluk",
    story:
      "De Loesje-opdracht draaide puur om typografie en een scherpe boodschap. De stijl van Loesje is bewust minimalistisch: zwart-wit, grote letters, geen afleiding. De quote die ik koos snijdt hout — iedereen wil gelukkig worden, maar de agenda staat dat maar al te vaak in de weg. Simpel gezegd, maximaal effect.",
    feedback: [
      "Lettertype gewijzigd naar het officiële Loesje-lettertype na opmerking docent",
      "Regelafstand vergroot zodat de tekst meer ruimte kreeg om te ademen",
      "Contactgegevens onderaan kleiner gemaakt — domineerden te veel de lay-out",
    ],
    tags: ["Typografie", "Loesje", "Minimalistisch", "Quote", "Print"],
    color: "#ef4444",
    lightColor: "#fee2e2",
  },
];

const totalPoints = 20;
const earnedPoints = ASSIGNMENTS.filter((a) => a.done).reduce((s, a) => s + a.points, 0);

function CheckBadge({ done }: { done: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
      style={
        done
          ? { background: "rgba(34,197,94,0.25)", color: "#16a34a", border: "1px solid #bbf7d0" }
          : { background: "#fefce8", color: "#ca8a04", border: "1px solid #fde68a" }
      }
    >
      {done ? (
        <>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 2.5" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Ingeleverd
        </>
      ) : (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-[#ca8a04]" />
          In beoordeling
        </>
      )}
    </span>
  );
}

function PointsBadge({ points, color }: { points: number; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold"
      style={{ background: `${color}18`, color }}
    >
      {points} {points === 1 ? "punt" : "punten"}
    </span>
  );
}

const STILTE_FOTOS = [
  {
    img: "/images/vormgeving/stilte-foto.png",
    title: "Mistlandschap bij zonsopkomst",
    caption:
      "Zo vroeg dat alles nog slaapt. De mist hangt laag over het water, de bomen zijn silhouetten. Nergens een geluid — alleen het licht dat langzaam doorbreekt.",
  },
  {
    img: "/images/vormgeving/weerfoto.jpg",
    title: "Zonsondergang bij de pier",
    caption:
      "Het water kleurt goud, de pier tekent zich scherp af tegen de avondlucht. Het strand is leeg. Stilte heeft soms een kleur.",
  },
  {
    img: "/images/vormgeving/caribbean.jpg",
    title: "Caribisch strand overdag",
    caption:
      "Zeilboten dobberen zacht, zand glanst wit, een palmboom buigt mee met de bries. Rust bestaat overal ter wereld — je hoeft er alleen op te letten.",
  },
];

function StilteFotoCard({ a, i }: { a: Assignment; i: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.07, ease: "easeOut" }}
      className="rounded-3xl overflow-hidden md:col-span-2"
      style={{
        background: "#0a0a0a",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header / hero - click to toggle */}
      <div
        className="cursor-pointer select-none"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="relative overflow-hidden" style={{ height: 240, background: a.lightColor }}>
          <Image
            src={a.img!}
            alt={a.imgAlt || a.title}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(255,255,255,0.92) 100%)" }}
          />
          <div
            className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black text-white"
            style={{ background: a.color }}
          >
            {a.num}
          </div>
          {/* Galerie hint */}
          <div
            className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold"
            style={{ background: "rgba(255,255,255,0.85)", color: a.color }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="6.5" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="1" y="6.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
              <rect x="6.5" y="6.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            3 foto&#39;s
          </div>
        </div>

        <div className="px-7 pt-6 pb-4">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <CheckBadge done={a.done} />
            <PointsBadge points={a.points} color={a.color} />
          </div>
          <p className="text-[10px] font-mono uppercase tracking-wide mb-1" style={{ color: a.color }}>
            {a.category}
          </p>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-black tracking-tight text-white">{a.title}</h3>
            <div
              className="flex-shrink-0 transition-transform duration-300"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 7l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(255,255,255,0.6)' }}/>
              </svg>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mt-2">{a.story}</p>
          <p className="text-[11px] text-white/60 flex items-center gap-1.5 mt-4 mb-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v5l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            {open ? "Klik om te sluiten" : "Klik om alle foto’s te zien"}
          </p>
        </div>
      </div>

      {/* Gallery - 3 photos */}
      {open && (
        <div
          className="px-7 pb-8"
          style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <p
            className="text-[10px] font-semibold uppercase tracking-wide mt-6 mb-4"
            style={{ color: a.color }}
          >
            Alle stilte foto&#39;s
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {STILTE_FOTOS.map((foto) => (
              <div key={foto.title}>
                <div
                  className="relative rounded-2xl overflow-hidden mb-3"
                  style={{ height: 200, background: "#f0ede8" }}
                >
                  <Image
                    src={foto.img}
                    alt={foto.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-sm font-bold text-white mb-1.5">{foto.title}</p>
                <p className="text-xs text-white/70 leading-relaxed">{foto.caption}</p>
              </div>
            ))}
          </div>

          {/* Feedback verwerkt - StilteFotoCard */}
          {a.feedback.length > 0 && (
            <div
              className="rounded-2xl p-4 mt-6 mb-2"
              style={{ background: "#0a0a0a", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/60 mb-2.5 flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1 3h9M1 5.5h6M1 8h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                Feedback verwerkt
              </p>
              <ul className="space-y-1.5">
                {a.feedback.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-white/70 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mt-4">
            {a.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2.5 py-1 rounded-full"
                style={{ background: a.lightColor, color: a.color }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function RegularCard({ a, i }: { a: Assignment; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: i * 0.07, ease: "easeOut" }}
    >
      <a
        href={a.img}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-3xl overflow-hidden group transition-transform duration-200 hover:-translate-y-1"
        style={{
          background: "#0a0a0a",
          border: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          textDecoration: "none",
        }}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: 240, background: a.lightColor }}>
          {a.img && (
            <Image
              src={a.img}
              alt={a.imgAlt || a.title}
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.9) 100%)" }}
          />
          <div
            className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-black text-white"
            style={{ background: a.color }}
          >
            {a.num}
          </div>
          {/* Open hint */}
          <div
            className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
            style={{ background: "rgba(255,255,255,0.9)", color: a.color }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 9L9 2M9 2H5M9 2V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Volledig beeld
          </div>
        </div>

        {/* Content */}
        <div className="p-7">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <CheckBadge done={a.done} />
            <PointsBadge points={a.points} color={a.color} />
          </div>
          <p className="text-[10px] font-mono uppercase tracking-wide mb-1" style={{ color: a.color }}>
            {a.category}
          </p>
          <h3 className="text-xl font-black tracking-tight text-white mb-4">{a.title}</h3>
          <p className="text-sm text-white/70 leading-relaxed mb-5">{a.story}</p>

          {/* Feedback verwerkt */}
          {a.feedback.length > 0 && (
            <div
              className="rounded-2xl p-4 mb-5"
              style={{ background: "#0a0a0a", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/60 mb-2.5 flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1 3h9M1 5.5h6M1 8h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                Feedback verwerkt
              </p>
              <ul className="space-y-1.5">
                {a.feedback.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-white/70 leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5">
            {a.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] px-2.5 py-1 rounded-full"
                style={{ background: a.lightColor, color: a.color }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </a>
    </motion.div>
  );
}

function FeaturedCard({ a }: { a: Assignment }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="rounded-3xl overflow-hidden"
      style={{
        background: "#0a0a0a",
        border: `1px solid ${a.color}30`,
        boxShadow: `0 8px 48px ${a.color}15, 0 4px 16px rgba(0,0,0,0.06)`,
      }}
    >
      {/* Top accent */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${a.color}, ${a.color}66)` }} />

      <div className="p-8 lg:p-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <CheckBadge done={a.done} />
              <PointsBadge points={a.points} color={a.color} />
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold"
                style={{ background: `${a.color}12`, color: a.color, border: `1px solid ${a.color}30` }}
              >
                ★ Zwaarste opdracht
              </span>
            </div>
            <p className="text-[10px] font-mono uppercase tracking-wide mb-1" style={{ color: a.color }}>
              {a.category}
            </p>
            <h3 className="text-2xl font-black tracking-tight text-white">{a.title}</h3>
          </div>
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
            style={{ background: a.color }}
          >
            {a.num}
          </div>
        </div>

        <p className="text-sm text-white/70 leading-relaxed mb-8 max-w-3xl">{a.story}</p>

        {/* Banners image */}
        {a.img && (
          <div className="rounded-2xl overflow-hidden mb-6" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
            <Image
              src={a.img}
              alt={a.imgAlt || a.title}
              width={1200}
              height={700}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Video */}
        {a.video && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-white/70 mb-3 flex items-center gap-2">
              <span
                className="w-5 h-5 rounded-md flex items-center justify-center"
                style={{ background: `${a.color}18` }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M3 2l5 3-5 3V2z" fill={a.color} />
                </svg>
              </span>
              Campagne video
            </p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(0,0,0,0.07)", background: "#000" }}
            >
              <video
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full"
                style={{ maxHeight: 480, objectFit: "contain" }}
              >
                <source src={a.video} type="video/mp4" />
              </video>
            </div>
          </div>
        )}

        {/* Tweede video */}
        {a.video2 && (
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/60 mb-2 flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 2l6 3-6 3V2z" fill="currentColor"/>
              </svg>
              Video 2
            </p>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(0,0,0,0.07)", background: "#000" }}
            >
              <video
                controls
                muted
                loop
                playsInline
                className="w-full"
                style={{ maxHeight: 480, objectFit: "contain" }}
              >
                <source src={a.video2} type="video/mp4" />
              </video>
            </div>
          </div>
        )}

        {/* Feedback verwerkt - FeaturedCard */}
        {a.feedback.length > 0 && (
          <div
            className="rounded-2xl p-4 mb-5"
            style={{ background: "#0a0a0a", border: "1px solid rgba(0,0,0,0.06)" }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wide text-white/60 mb-2.5 flex items-center gap-1.5">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 3h9M1 5.5h6M1 8h4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              Feedback verwerkt
            </p>
            <ul className="space-y-1.5">
              {a.feedback.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs text-white/70 leading-relaxed">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: a.color }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {a.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2.5 py-1 rounded-full font-medium"
              style={{ background: a.lightColor, color: a.color }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function VormgevingPage() {
  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6"
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/60 mb-4">/ Schoolopdrachten</p>
          <h1
            className="font-black tracking-[-0.04em] leading-[1.05] text-white mb-5"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Vorm&shy;geving{" "}
            <span className="text-accent">opdrachten</span>.
          </h1>
          <p className="text-lg text-white leading-relaxed max-w-2xl">
            Voor mijn opleiding Marketing & Communicatie maakte ik een reeks vormgevingsopdrachten — van stille fotografie tot complete sociale media campagnes. Hier zie je alles wat ik heb gemaakt.
          </p>
        </motion.div>

        {/* Score bar */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.55, ease: "easeOut" }}
          className="flex flex-wrap gap-4 mb-14 mt-8"
        >
          {[
            { v: `${earnedPoints}/${totalPoints}`, l: "Punten behaald" },
            { v: `${ASSIGNMENTS.filter((a) => a.done).length}/${ASSIGNMENTS.length}`, l: "Opdrachten ingeleverd" },
            { v: "MBO", l: "Marketing & Communicatie" },
            { v: "2025", l: "Schooljaar" },
          ].map(({ v, l }) => (
            <div
              key={l}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{ background: "#0a0a0a", border: "1px solid rgba(0,0,0,0.06)" }}
            >
              <span className="text-xl font-black text-white">{v}</span>
              <span className="text-xs text-white/60">{l}</span>
            </div>
          ))}
        </motion.div>

        {/* Regular cards grid (excl. featured) */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {ASSIGNMENTS.filter((a) => !a.featured).map((a, i) =>
            a.num === "01" ? (
              <StilteFotoCard key={a.num} a={a} i={i} />
            ) : (
              <RegularCard key={a.num} a={a} i={i} />
            )
          )}
        </div>

        {/* Featured: social media campagne */}
        {ASSIGNMENTS.filter((a) => a.featured).map((a) => (
          <FeaturedCard key={a.num} a={a} />
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mt-12 rounded-3xl p-10 text-center"
          style={{
            background: "linear-gradient(135deg, #faf5ff 0%, #f0f9ff 100%)",
            border: "1px solid rgba(124,58,237,0.1)",
          }}
        >
          <h2 className="text-2xl font-black tracking-tight text-[#09090b] mb-2">
            Meer van mijn werk zien?
          </h2>
          <p className="text-sm text-[#09090b] mb-6 max-w-sm mx-auto">
            Bekijk ook mijn stage-projecten bij Brandmerck of neem direct contact op.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white"
              style={{ background: "#09090b" }}
            >
              Stage projecten
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium text-white"
              style={{ background: "#09090b" }}
            >
              Contact opnemen
            </a>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
