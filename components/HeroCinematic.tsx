'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !headingRef.current) return;

    // Kill previous animations if any
    gsap.killTweensOf('*');

    // ──── MAIN HEADING ANIMATION ────
    const words = headingRef.current.querySelectorAll('.word');
    gsap.from(words, {
      opacity: 0,
      y: 60,
      rotationZ: -10,
      duration: 0.8,
      stagger: {
        amount: 0.6,
        ease: 'power2.out',
      },
      ease: 'elastic.out(1.2, 0.5)',
    });

    // ──── SUB-LINE ANIMATION ────
    if (subRef.current) {
      gsap.from(subRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out',
      });
    }

    // ──── PHOTO ENTRANCE ────
    if (photoRef.current) {
      gsap.from(photoRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 100,
        duration: 1.2,
        delay: 0.4,
        ease: 'back.out(1.3)',
      });
    }

    // ──── CTA BUTTONS ────
    if (ctaRef.current) {
      gsap.from(ctaRef.current.querySelectorAll('a'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        delay: 1.2,
        ease: 'power2.out',
      });
    }

    // ──── SCROLL TRIGGER: Fade out on scroll ────
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom 20%',
        scrub: 0.5,
      },
      opacity: 0,
      y: -100,
      ease: 'power1.inOut',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0f3460 100%)',
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              background: ['#7c3aed', '#0ea5e9', '#f59e0b'][i % 3],
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              filter: 'blur(60px)',
              animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
              animationDelay: `${-Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Content grid */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text */}
        <div className="space-y-8">
          {/* Main heading with word split */}
          <h1
            ref={headingRef}
            className="text-[3.5rem] lg:text-6xl font-black leading-[1.1] text-white tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            <span className="word block">Strategy.</span>
            <span className="word block">Content.</span>
            <span className="word block">
              <span style={{ color: '#7c3aed' }} className="inline-block">
                Growth.
              </span>
            </span>
          </h1>

          {/* Sub-line */}
          <p
            ref={subRef}
            className="text-xl text-gray-300 max-w-md leading-relaxed"
          >
            From zero to hero. Building digital experiences that drive real results.
          </p>

          {/* Tagline */}
          <p className="text-sm font-mono text-purple-400 uppercase tracking-widest opacity-80">
            Digital Marketing · Community Building · Growth Strategy
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/projects"
              className="px-8 py-4 bg-white text-[#09090b] font-bold rounded-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border border-white/30 text-white font-bold rounded-xl hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
            >
              Let's Talk
            </Link>
          </div>
        </div>

        {/* Right: Photo */}
        <div ref={photoRef} className="relative">
          {/* Glow background */}
          <div
            className="absolute -inset-8 rounded-3xl opacity-40 blur-3xl"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)',
            }}
          />

          {/* Photo container */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm shadow-2xl">
            <Image
              src="/images/denzel.jpg"
              alt="Denzel Keenan"
              width={500}
              height={600}
              className="w-full h-auto object-cover"
              priority
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(135deg, rgba(124,58,237,0.3) 0%, transparent 50%, rgba(14,165,233,0.2) 100%)',
              }}
            />

            {/* Info badge */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/50 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <p className="text-white font-bold text-sm">Denzel Keenan</p>
              <p className="text-white/70 text-xs mt-1">Marketing & Communicatie Student</p>
              <p className="text-purple-400 text-xs mt-2 font-mono">
                BPV Stage @ Brandmerck • Growth Expert
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-center">
        <p className="text-sm mb-2">Scroll to explore</p>
        <svg
          className="w-6 h-6 mx-auto animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* CSS for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(10px); }
          66% { transform: translateY(30px) translateX(-10px); }
        }
      `}</style>
    </section>
  );
}
