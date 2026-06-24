"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

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
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 select-none group">
            <Image
              src="/images/logo.png"
              alt="DK logo"
              width={40}
              height={40}
              className="object-contain w-10 h-10"
              style={{ clipPath: "polygon(60% 0%, 100% 0%, 100% 100%, 60% 100%)" }}
            />
            <span className="text-sm font-semibold text-[#09090b] group-hover:text-[#09090b] transition-colors duration-200">
              Denzel Keenan
            </span>
          </Link>

          {/* Links */}
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

          {/* CTA */}
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
        </nav>
      </motion.div>
    </header>
  );
}
