"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const NAV = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Ervaring",  href: "/experience" },
  { label: "Projecten", href: "/projects" },
  { label: "Vormgeving", href: "/vormgeving" },
  { label: "Contact",   href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Menu sluiten zodra je naar een andere pagina gaat
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto max-w-6xl px-6 pt-5"
      >
        <nav
          className="flex items-center justify-between px-6 py-3.5 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(125, 211, 252, 0.14)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 select-none group">
            {/* logo-dark heeft een zwarte D; de gewone logo.png heeft een
                witte D en die viel volledig weg tegen de lichte balk. */}
            <Image
              src="/images/logo-dark.png"
              alt="Logo Denzel Keenan"
              width={40}
              height={40}
              className="object-contain w-10 h-10"
            />
            <span className="text-sm font-semibold text-[#09090b] group-hover:text-[#09090b] transition-colors duration-200">
              Denzel Keenan
            </span>
          </Link>

          {/* Links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className="relative px-3.5 py-2 text-sm rounded-xl transition-colors duration-200"
                  style={{ color: active ? "#09090b" : "rgba(9,9,11,0.45)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-bg"
                      className="absolute inset-0 rounded-xl bg-[#09090b]/[0.055]"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10 hover:text-[#09090b] transition-colors">{label}</span>
                </Link>
              );
            })}
          </div>

          {/* CTA — desktop */}
          <Link
            href="/contact"
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:opacity-85"
            style={{ background: "#09090b" }}
          >
            Hire me
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5h6M5 2l3 3-3 3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          {/* Menuknop — alleen op telefoon. Zonder deze knop was er op
              mobiel geen enkele manier om naar een andere pagina te gaan. */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
            className="md:hidden flex items-center justify-center rounded-xl"
            style={{
              width: 40,
              height: 40,
              background: "rgba(9,9,11,0.06)",
              border: "1px solid rgba(9,9,11,0.12)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M2.5 5h13M2.5 9h13M2.5 13h13" stroke="#09090b" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </nav>

        {/* Uitklapmenu — telefoon.
            Bewust géén dekkingsanimatie: die bleef halverwege hangen op
            0,69 waardoor je de pagina dwars door het menu heen las.
            Volledig ondoorzichtig wit, zodat het altijd leesbaar is. */}
        {open && (
          <div
            className="md:hidden mt-2 rounded-2xl overflow-hidden"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(125, 211, 252, 0.28)",
              boxShadow: "0 12px 36px rgba(0,0,0,0.35)",
            }}
          >
              <div className="flex flex-col p-2">
                {NAV.map(({ label, href }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className="px-4 py-3 rounded-xl text-sm font-medium"
                      style={{
                        color: "#09090b",
                        background: active ? "rgba(9,9,11,0.06)" : "transparent",
                        textDecoration: "none",
                      }}
                    >
                      {label}
                    </Link>
                  );
                })}
                <Link
                  href="/contact"
                  className="mt-1 px-4 py-3 rounded-xl text-sm font-semibold text-center text-white"
                  style={{ background: "#09090b", textDecoration: "none" }}
                >
                  Hire me
                </Link>
            </div>
          </div>
        )}
      </motion.div>
    </header>
  );
}
