"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PHONE_W = 240;
const PHONE_H = 520;

function CameraModule() {
  return (
    <div
      className="absolute top-7 left-7 rounded-[1.4rem] p-3"
      style={{
        width: 90,
        height: 90,
        background: "linear-gradient(135deg, #111113, #1c1c1f)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      <div className="absolute top-4 left-4 w-8 h-8 rounded-full"
        style={{ background: "radial-gradient(circle at 35% 35%, #2a2a3a, #080810)", boxShadow: "0 0 0 2px #1a1a22, 0 2px 6px rgba(0,0,0,0.8)" }}>
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-white/20" />
      </div>
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full"
        style={{ background: "radial-gradient(circle at 35% 35%, #1a2a2a, #060c0c)", boxShadow: "0 0 0 2px #1a1a22, 0 2px 6px rgba(0,0,0,0.8)" }}>
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-white/20" />
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full"
        style={{ background: "radial-gradient(circle at 35% 35%, #1a1a2e, #06060e)", boxShadow: "0 0 0 2px #1a1a22, 0 2px 6px rgba(0,0,0,0.8)" }}>
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-white/20" />
      </div>
      <div className="absolute bottom-5 right-3.5 flex flex-col gap-1">
        <div className="w-2 h-2 rounded-full" style={{ background: "#e8d5a0", boxShadow: "0 0 4px rgba(232,213,160,0.4)" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "#2a2a2a", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)" }} />
      </div>
    </div>
  );
}

function PhoneBack() {
  return (
    <div
      className="absolute inset-0 rounded-[3.2rem]"
      style={{
        background: "linear-gradient(160deg, #2c2c2e 0%, #1c1c1e 40%, #252527 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
      }}
    >
      <CameraModule />
      <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: 30 }}>
        <svg width="28" height="34" viewBox="0 0 28 34" fill="none" opacity={0.12}>
          <path d="M23.4 17.8c0-4.2 3.4-6.2 3.6-6.3-2-2.9-5-3.3-6.1-3.3-2.6-.3-5 1.5-6.3 1.5-1.3 0-3.3-1.5-5.5-1.4C6.4 8.4 3.6 10 2.1 12.6c-3 5.2-.8 13 2.2 17.2 1.4 2.1 3.2 4.4 5.4 4.3 2.2-.1 3-1.4 5.6-1.4 2.6 0 3.3 1.4 5.6 1.4 2.3 0 3.8-2.1 5.2-4.2 1.6-2.4 2.3-4.7 2.3-4.8-.1-.1-4.4-1.7-4.4-6.6zm-4.2-12.1c1.2-1.4 2-3.4 1.8-5.4-1.7.1-3.8 1.1-5 2.5-1.1 1.3-2.1 3.3-1.8 5.3 1.9.1 3.8-.9 5-2.4z" fill="white"/>
        </svg>
      </div>
      <div
        className="absolute inset-0 rounded-[3.2rem] pointer-events-none"
        style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)" }}
      />
    </div>
  );
}

function PhoneFront() {
  return (
    <div
      className="absolute inset-0 rounded-[3.2rem] overflow-hidden"
      style={{
        background: "#000",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Titanium frame gloss */}
      <div
        className="absolute inset-0 rounded-[3.2rem] pointer-events-none z-20"
        style={{
          boxShadow: "inset 0 0 0 2px rgba(255,255,255,0.12), inset 0 0 0 3px rgba(0,0,0,0.6)",
        }}
      />

      {/* Screen with video */}
      <div
        className="absolute rounded-[2.8rem] overflow-hidden"
        style={{ inset: 3, zIndex: 1 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/video/stage-footage.mp4" type="video/mp4" />
        </video>
        {/* Subtle screen gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 18%, transparent 78%, rgba(0,0,0,0.35) 100%)",
          }}
        />
      </div>

      {/* Dynamic Island */}
      <div
        className="absolute z-30"
        style={{
          top: 14,
          left: "50%",
          transform: "translateX(-50%)",
          width: 100,
          height: 32,
          borderRadius: 16,
          background: "#000",
        }}
      />

      {/* Side-button highlights (titanium look) */}
      <div
        className="absolute left-0 pointer-events-none z-10"
        style={{
          top: "28%",
          width: 3,
          height: 50,
          borderRadius: "0 2px 2px 0",
          background: "linear-gradient(to bottom, #3a3a3c, #4a4a4e, #3a3a3c)",
        }}
      />
      <div
        className="absolute right-0 pointer-events-none z-10"
        style={{
          top: "22%",
          width: 3,
          height: 70,
          borderRadius: "2px 0 0 2px",
          background: "linear-gradient(to bottom, #3a3a3c, #4a4a4e, #3a3a3c)",
        }}
      />
    </div>
  );
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const sp = { stiffness: 120, damping: 22 };
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), sp);

  const [revealed, setRevealed] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setRevealed(true), 900);
    return () => clearTimeout(t);
  }, [inView]);

  // GSAP Scroll animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const textEl = section.querySelector('.video-section-text');
    const phoneEl = section.querySelector('.video-section-phone');

    if (textEl) {
      gsap.from(textEl, {
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1.5,
        },
        opacity: 0,
        x: -100,
        ease: 'power2.out',
      });
    }

    if (phoneEl) {
      gsap.from(phoneEl, {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1.5,
        },
        opacity: 0,
        x: 100,
        ease: 'power2.out',
      });

      // Gentle parallax on phone (much slower fade-out)
      gsap.to(phoneEl, {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom 50%',
          scrub: 2,
        },
        y: 20,
        ease: 'none',
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  function move(e: React.MouseEvent) {
    if (!revealed) return;
    const r = phoneRef.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
  }
  function leave() { mx.set(0); }

  return (
    <section ref={sectionRef} className="py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Text left */}
          <motion.div
            className="video-section-text"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/60 mb-4">/ Stage in beeld</p>
            <h2
              className="font-black tracking-[-0.04em] leading-[1.08] text-white mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
            >
              Buiten de{" "}
              <span className="text-accent">kantoorruimte</span>.
            </h2>
            <p className="text-base text-white/70 leading-relaxed mb-8 max-w-md">
              Marketing is niet alleen achter een scherm. Tijdens mijn stage ging ik op
              locatie voor fotografie, videoproductie en het in kaart brengen van
              toeristische plekken voor Kustweek.nl.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "📸", skill: "Fotografie",      detail: "iPhone + compositie" },
                { icon: "🎥", skill: "Videoproductie",  detail: "Filmen & editing" },
                { icon: "📍", skill: "Locatiescouts",   detail: "Friesland & kust" },
                { icon: "✏️", skill: "Content creatie", detail: "Tekst + beeld" },
              ].map(({ icon, skill, detail }) => (
                <div
                  key={skill}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <span className="text-lg">{icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-white">{skill}</p>
                    <p className="text-[10px] text-white/60">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* iPhone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.1 }}
            className="flex justify-center video-section-phone"
          >
            <div style={{ perspective: "1200px" }}>
              <motion.div
                ref={phoneRef}
                onMouseMove={move}
                onMouseLeave={leave}
                style={{
                  rotateY: revealed ? rotY : 0,
                  position: "relative",
                  width: PHONE_W,
                  height: PHONE_H,
                  cursor: "default",
                }}
              >
                {/* Ambient glow */}
                <div
                  className="absolute -inset-10 rounded-[4rem] pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(40,40,55,0.5) 0%, transparent 70%)",
                    filter: "blur(24px)",
                    opacity: 0.8,
                  }}
                />

                {/* Drop shadow */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    bottom: -40,
                    left: "10%",
                    right: "10%",
                    height: 40,
                    background: "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)",
                    filter: "blur(16px)",
                  }}
                />

                {/* Flip wrapper */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transformStyle: "preserve-3d",
                    transform: revealed ? "rotateY(0deg)" : "rotateY(180deg)",
                    transition: "transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 40px 80px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.25)",
                    borderRadius: "3.2rem",
                  }}
                >
                  <PhoneFront />
                  <PhoneBack />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
