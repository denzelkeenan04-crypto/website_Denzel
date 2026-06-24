"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const LINKS = [
  {
    label: "E-mail",
    value: "denzelkeenan04@gmail.com",
    href:  "mailto:denzelkeenan04@gmail.com",
    color: "#7c3aed",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Telefoon",
    value: "+31 6 83 89 14 88",
    href:  "tel:+31683891488",
    color: "#0ea5e9",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 3.5C3 3.5 4 8 7.5 11.5S14.5 15 14.5 15l1-2-3-1.5-1 1s-2-1-4-4-2-4-2-4l1-1L5 3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "Denzel Keenan",
    href:  "https://www.linkedin.com/in/denzel-keenan-8504203b",
    color: "#0a66c2",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5 7v6M5 5v.01M9 13v-3c0-1 .5-2 2-2s2 1 2 2v3M9 7v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const SUBJECTS = [
  "Stage / bijbaan",
  "Freelance project",
  "Website vraag",
  "Samenwerking",
  "Overig",
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const inputBase = "w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-[#7c3aed]/20 text-white placeholder-white/60";
  const inputStyle = { background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)" };

  return (
    <main className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 max-w-2xl"
        >
          <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/60 mb-4">/ Contact</p>
          <h1
            className="font-black tracking-[-0.04em] leading-[1.05] text-white mb-5"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
          >
            Laten we{" "}
            <span className="text-accent">praten</span>.
          </h1>
          <p className="text-lg text-white leading-relaxed mb-6">
            Heb je een project, vraag of wil je samenwerken? Stuur een bericht
            en ik reageer binnen 24 uur.
          </p>
          {/* Response time badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full"
            style={{ background: "rgba(34,197,94,0.25)", border: "1px solid #bbf7d0" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span className="text-xs font-medium text-white">Reactietijd: binnen 24 uur</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          >
            {sent ? (
              <div
                className="rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center"
                style={{ background: "linear-gradient(135deg, #faf5ff, #f0f9ff)", border: "1px solid rgba(124,58,237,0.1)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "rgba(34,197,94,0.25)", border: "2px solid #bbf7d0" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="text-xl font-black text-white mb-2">Bericht verstuurd</h2>
                <p className="text-sm text-white max-w-xs">
                  Bedankt, {form.name}. Ik neem zo snel mogelijk contact met je op.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-2 ml-1">Naam</label>
                    <input
                      type="text" required
                      placeholder="Jouw naam"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputBase} style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-2 ml-1">E-mailadres</label>
                    <input
                      type="email" required
                      placeholder="jouw@email.nl"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputBase} style={inputStyle}
                    />
                  </div>
                </div>

                {/* Subject chips */}
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-2 ml-1">Onderwerp</label>
                  <div className="flex flex-wrap gap-2">
                    {SUBJECTS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, subject: s })}
                        className="px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150"
                        style={{
                          background: form.subject === s ? "#7c3aed" : "rgba(255,255,255,0.05)",
                          color: form.subject === s ? "#fff" : "rgba(255,255,255,0.8)",
                          border: `1px solid ${form.subject === s ? "#7c3aed" : "rgba(255,255,255,0.1)"}`,
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-2 ml-1">Bericht</label>
                  <textarea
                    required rows={6}
                    placeholder="Vertel me over je project, vraag of idee..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputBase} resize-none`} style={inputStyle}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-88 active:scale-[0.99] flex items-center justify-center gap-2"
                  style={{ background: "#09090b", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}
                >
                  Verstuur bericht
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
            className="space-y-3"
          >
            {LINKS.map(({ label, value, href, color, icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="flex items-center gap-4 p-5 rounded-2xl group transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "#0a0a0a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 2px 8px rgba(124,58,237,0.05)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}12`, color }}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-[10px] text-white uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-white">{value}</p>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M6 2l4 4-4 4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </a>
            ))}

            {/* Availability */}
            <div
              className="rounded-2xl p-6 mt-2"
              style={{
                background: "linear-gradient(135deg, #faf5ff 0%, #f0f9ff 100%)",
                border: "1px solid rgba(124,58,237,0.12)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span className="text-xs font-semibold text-[#09090b]">Beschikbaar</span>
              </div>
              <p className="text-sm font-bold text-[#09090b]">Wat ik zoek</p>
              <ul className="space-y-1.5">
                {[
                  "Freelance marketing opdrachten",
                  "Content en SEO projecten",
                  "Bijbanen naast de opleiding",
                  "Toekomstige stages (2027)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-[#09090b]">
                    <span className="w-1 h-1 rounded-full bg-[#7c3aed] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div
              className="rounded-2xl px-5 py-4 flex items-center gap-3"
              style={{ background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5zm0 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" fill="#a1a1aa"/>
              </svg>
              <div>
                <p className="text-xs font-medium text-white">Sneek, Friesland</p>
                <p className="text-[10px] text-white">Nederland · Remote beschikbaar</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
