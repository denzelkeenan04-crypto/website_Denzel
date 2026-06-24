"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/* ─── Animated video card ──────────────────────────────────────────────── */
function VideoCard() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sp = { stiffness: 110, damping: 18 };
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), sp);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), sp);

  function move(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function leave() { mx.set(0); my.set(0); }

  return (
    <div className="flex items-center justify-center select-none" style={{ perspective: "1200px" }}>
      <motion.div
        ref={ref}
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative cursor-default animate-float"
      >
        {/* Glow — verbindt de zonsondergang in de video met de paarse 3D blobs */}
        <div
          className="absolute -inset-10 rounded-[3.5rem] opacity-50 blur-3xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.55) 0%, rgba(251,146,60,0.45) 50%, rgba(14,165,233,0.25) 100%)",
            transform: "translateZ(-40px)",
          }}
        />

        {/* Gradient border ring */}
        <div
          className="absolute -inset-[2px] rounded-[2.2rem] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.6), rgba(251,146,60,0.5), rgba(14,165,233,0.4))",
            transform: "translateZ(-2px)",
          }}
        />

        {/* Video frame */}
        <div
          className="relative overflow-hidden"
          style={{
            width: 480,
            height: 270,
            borderRadius: "2rem",
            boxShadow: "0 40px 100px rgba(124,58,237,0.2), 0 20px 40px rgba(251,146,60,0.15), 0 4px 12px rgba(0,0,0,0.12)",
          }}
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            poster="/images/denzel.jpg"
          >
            <source src="/video/denzelkeenan.mp4" type="video/mp4" />
          </video>

          {/* Cinematic gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(9,9,11,0.72) 0%, rgba(9,9,11,0.1) 45%, transparent 70%), linear-gradient(to bottom, rgba(124,58,237,0.08) 0%, transparent 30%)",
            }}
          />

          {/* Subtiele glans bovenaan */}
          <div
            className="absolute top-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)",
            }}
          />

          {/* Naam label */}
          <div className="absolute bottom-4 left-5" style={{ transform: "translateZ(20px)" }}>
            <p className="text-white font-bold text-sm leading-tight tracking-tight">Denzel Keenan</p>
            <p className="text-white/60 text-xs mt-0.5">Marketing & Communicatie · Friesland</p>
          </div>

          {/* Status pill */}
          <div
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.14)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.3)",
              transform: "translateZ(30px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            <span className="text-[10px] font-semibold text-white">Beschikbaar</span>
          </div>
        </div>

        {/* Schaduw grond */}
        <div
          className="absolute -bottom-10 left-1/2 w-4/5 h-10 rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, rgba(251,146,60,0.12) 50%, transparent 80%)",
            filter: "blur(16px)",
            transform: "translateZ(-60px) translateX(-50%)",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ─── Marquee ───────────────────────────────────────────────────────────── */
const TOOLS = [
  "WordPress", "Elementor", "SEO", "Google Analytics", "Yoast SEO",
  "Content Marketing", "Community Management", "Copywriting", "Canva", "Videografie",
  "Fotografie", "Google PageSpeed", "Framer Motion", "Figma", "Social Media",
  "WordPress", "Elementor", "SEO", "Google Analytics", "Yoast SEO",
  "Content Marketing", "Community Management", "Copywriting", "Canva", "Videografie",
  "Fotografie", "Google PageSpeed", "Framer Motion", "Figma", "Social Media",
];

function Marquee() {
  return (
    <div className="w-full overflow-hidden py-5 border-y" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {TOOLS.map((t, i) => (
          <span key={i} className="flex items-center gap-3 text-xs font-medium text-[#a1a1aa] uppercase tracking-[0.12em] flex-shrink-0">
            {t}
            <span className="w-1 h-1 rounded-full bg-[#d4d4d8]" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────── */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;

    // Parallax effect on hero background
    gsap.to(section.querySelector('.hero-bg'), {
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 100,
      ease: 'none',
    });

    // Fade out on scroll
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom 30%',
        scrub: 0.5,
      },
      opacity: 0.3,
      ease: 'power1.inOut',
    });

    // Scale content down on scroll
    gsap.to(section.querySelector('.hero-content'), {
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: 'bottom top',
        scrub: 1,
      },
      scale: 0.95,
      ease: 'power1.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="relative min-h-screen flex items-center pt-28 pb-16 px-6 overflow-hidden">

        {/* 3D achtergrond scene */}
        <div className="hero-bg absolute inset-0">
          <HeroScene />
        </div>

        {/* Subtiele achtergrond */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 70% 20%, rgba(124,58,237,0.05) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(14,165,233,0.04) 0%, transparent 50%)",
          }}
        />

        <div className="hero-content relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* Links — tekst */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
              className="inline-flex items-center gap-2 mb-9"
            >
              <span
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-[#52525b]"
                style={{ background: "#f4f4f5", border: "1px solid rgba(0,0,0,0.07)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                Beschikbaar voor nieuwe opdrachten
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.75, ease: "easeOut" }}
              className="font-black leading-[1.03] tracking-[-0.04em] text-white mb-7"
              style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }}
            >
              <span className="text-accent">Digitale</span>
              <br />
              <span className="text-accent">ervaringen</span>
              <br />
              die werken.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.37, duration: 0.65, ease: "easeOut" }}
              className="text-base leading-[1.85] text-white mb-10 max-w-md"
            >
              Ik ben Denzel Keenan — Marketing & Communicatie student, BPV-stagiair
              en iemand die graag leert door te doen. Ik werk aan websites, SEO en
              content die er echt toe doen.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.55, ease: "easeOut" }}
              className="flex flex-wrap gap-3 mb-14"
            >
              <Link
                href="/projects"
                className="px-7 py-3.5 rounded-2xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-88 active:scale-[0.98]"
                style={{ background: "#09090b", boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
              >
                Bekijk mijn werk
              </Link>
              <Link
                href="/contact"
                className="px-7 py-3.5 rounded-2xl text-sm font-medium text-[#09090b] transition-all duration-200 hover:bg-[#f4f4f5] active:scale-[0.98]"
                style={{ background: "#0a0a0a", border: "1px solid rgba(0,0,0,0.1)" }}
              >
                Neem contact op
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.72, duration: 0.6 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                {["#7c3aed","#0ea5e9","#22c55e"].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white -ml-2 first:ml-0" style={{ background: c }} />
                ))}
                <span className="text-xs text-[#a1a1aa] ml-1">3 live klanten bediend</span>
              </div>
              <div className="h-4 w-px bg-[#e4e4e7]" />
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="12" height="12" viewBox="0 0 12 12" fill="#f59e0b">
                    <path d="M6 1l1.4 2.8 3.1.45-2.25 2.2.53 3.1L6 8.15 3.22 9.55l.53-3.1L1.5 4.25l3.1-.45z"/>
                  </svg>
                ))}
                <span className="text-xs text-[#a1a1aa] ml-1">Friesland, NL</span>
              </div>
            </motion.div>
          </div>

          {/* Rechts — 3D foto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.9, ease: "easeOut" }}
            className="flex justify-center lg:justify-end pr-8"
          >
            <VideoCard />
          </motion.div>

        </div>
      </section>

      <Marquee />
    </>
  );
}
