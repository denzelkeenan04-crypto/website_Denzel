'use client';

import { motion } from 'framer-motion';

export default function ExperienceIntro() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="max-w-6xl mx-auto px-6 py-24"
    >
      <div
        className="rounded-3xl p-12 border"
        style={{
          background: '#0a0a0a',
          borderColor: 'rgba(255,255,255,0.1)',
        }}
      >
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/60 mb-4">
          / Mijn Journey
        </p>
        <h2
          className="font-black leading-[1.1] tracking-[-0.04em] mb-6 text-white"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Van horeca tot{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #7c3aed, #0ea5e9)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            digital marketing.
          </span>
        </h2>
        <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
          Elke ervaring heeft me iets geleerd. Van teamwork in de horeca tot strategie en groei in digital marketing. Hier zie je hoe mijn journey eruitziet — werkervaring, stage, en onderwijs.
        </p>
      </div>
    </motion.section>
  );
}
