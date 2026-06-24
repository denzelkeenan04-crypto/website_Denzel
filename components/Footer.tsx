import Link from "next/link";
import Image from "next/image";

const NAV = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Ervaring",  href: "/experience" },
  { label: "Projecten", href: "/projects" },
  { label: "Contact",   href: "/contact" },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/denzel-keenan-8504203b",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M4 6v6M4 4v.01M8 12v-3c0-1 .5-2 2-2s2 1 2 2v3M8 6v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "E-mail",
    href: "mailto:denzelkeenan04@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Telefoon",
    href: "tel:+31683891488",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2.5 2.5s1 4 4 6.5 6.5 4 6.5 4l1-2-3-1.5-1 1s-2-1-3.5-3.5-1.5-3.5-1.5-3.5l1-1L4.5 1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-0"
      style={{ borderColor: "rgba(255,255,255,0.1)", background: "#0a0a0a" }}
    >
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-10 items-start">

          {/* Brand + tagline */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/images/logo.png"
                alt="DK logo"
                width={36}
                height={36}
                className="object-contain opacity-90" style={{clipPath: "polygon(60% 0%, 100% 0%, 100% 100%, 60% 100%)"}}
                style={{ filter: 'brightness(2) invert(1) saturate(1.5)' }}
              />
              <span className="font-semibold text-white">Denzel Keenan</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Marketing & Communicatie student uit Friesland.
              Bezig met leren, bouwen en groeien in digitale communicatie.
            </p>

            {/* Status */}
            <div className="inline-flex items-center gap-2 mt-5 px-3 py-1.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.25)", border: "1px solid #bbf7d0" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              <span className="text-[11px] font-medium text-white">Beschikbaar voor opdrachten</span>
            </div>
          </div>

          {/* Navigatie */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60 mb-4">Navigatie</p>
            <ul className="space-y-2.5">
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60 mb-4">Contact</p>
            <ul className="space-y-3">
              {SOCIALS.map(({ label, href, icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="flex items-center gap-2.5 text-sm text-white/70 hover:text-white transition-colors duration-150 group"
                  >
                    <span className="text-white/60 group-hover:text-white transition-colors">{icon}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.1)" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-white/60">
            © {year} Denzel Keenan. Alle rechten voorbehouden.
          </p>
          <p className="text-xs text-white/60">
            Gebouwd met Next.js · Friesland, Nederland
          </p>
        </div>
      </div>
    </footer>
  );
}
