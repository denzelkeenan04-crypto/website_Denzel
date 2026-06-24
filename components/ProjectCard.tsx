"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export type Project = {
  num:         string;
  title:       string;
  subtitle:    string;
  description: string;
  tags:        string[];
  year:        string;
  color:       string;   /* e.g. "#7c3aed" */
  lightColor:  string;   /* e.g. "#ede9fe" */
};

export default function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sp = { stiffness: 140, damping: 22 };
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), sp);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), sp);

  function move(e: React.MouseEvent) {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function leave() { mx.set(0); my.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", perspective: 1000 }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay: i * 0.1, ease: "easeOut" }}
      className="group cursor-default"
    >
      <div
        className="rounded-3xl p-8 h-full transition-all duration-300"
        style={{
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.1), 0 4px 16px rgba(0,0,0,0.06), 4px 0 0 ${p.color} inset`;
          el.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
          el.style.transform = "none";
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-7">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: p.lightColor }}
          >
            <div className="w-5 h-5 rounded-lg" style={{ background: p.color }} />
          </div>
          <div className="text-right">
            <span
              className="text-[10px] font-mono px-2.5 py-1 rounded-full text-[#71717a]"
              style={{ background: "#f4f4f5", border: "1px solid #e4e4e7" }}
            >
              {p.year}
            </span>
          </div>
        </div>

        {/* Number */}
        <p className="text-[10px] font-mono mb-1.5" style={{ color: p.color }}>
          {p.num}
        </p>

        {/* Title + subtitle */}
        <h3 className="text-xl font-bold tracking-tight text-[#09090b] mb-1">{p.title}</h3>
        <p className="text-xs text-[#a1a1aa] mb-4">{p.subtitle}</p>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#71717a] mb-6">{p.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2.5 py-1 rounded-full text-[#52525b]"
              style={{ background: "#f4f4f5", border: "1px solid #e4e4e7" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Read more — on hover */}
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-250">
          <span className="text-xs font-semibold" style={{ color: p.color }}>Meer lezen</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6h8M6 2l4 4-4 4" stroke={p.color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
