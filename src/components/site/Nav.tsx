import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

const links = [
  { label: "Services", href: "/#services" },
  { label: "AI Systems", href: "/ai-systems" },
  { label: "Careers", href: "/careers" },
  { label: "About", href: "/about" },
];

/** Detects whether the nav pill currently overlaps a light-background section. */
function useOnLight() {
  const [onLight, setOnLight] = useState(false);
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const probe = 74; // vertical center of the nav pill
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme='light']");
      let hit = false;
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) hit = true;
      });
      setOnLight(hit);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return onLight;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const onLight = useOnLight();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase =
    "relative rounded-full text-[16px] font-medium transition-colors duration-300 after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100";
  const linkTone = onLight
    ? "text-[#111827] hover:text-[#0033FF] after:bg-[#0033FF]"
    : "text-white hover:text-[#AAFF00] after:bg-[#AAFF00]";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3">
      <nav
        className={`flex w-full max-w-5xl items-center justify-between rounded-full border transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          scrolled ? "px-4 md:px-6 py-1.5" : "px-5 md:px-7 py-2.5"
        } ${
          onLight
            ? scrolled
              ? "border-[#0F172A]/12 bg-white/95 shadow-[0_8px_28px_-14px_rgba(15,23,42,0.28)]"
              : "border-[#0F172A]/12 bg-white/90 shadow-[0_6px_20px_-14px_rgba(15,23,42,0.22)]"
            : scrolled
              ? "border-white/30 bg-white/12 shadow-[0_10px_34px_-18px_rgba(0,20,80,0.55)]"
              : "border-white/22 bg-white/[0.08] shadow-[0_8px_26px_-18px_rgba(0,20,80,0.45)]"
        }`}
        style={{
          backdropFilter: scrolled ? "blur(24px) saturate(150%)" : "blur(18px) saturate(140%)",
          WebkitBackdropFilter: scrolled ? "blur(24px) saturate(150%)" : "blur(18px) saturate(140%)",
        }}
      >
        <Link to="/" className="group flex shrink-0 items-center gap-3">
          <span
            className={`flex items-center justify-center rounded-xl transition-all duration-300 ${
              scrolled ? "h-8 w-8" : "h-9 w-9"
            }`}
          >
            <img
              src={logo}
              alt="Basic Socials"
              className={`h-full w-full object-contain transition-[filter] duration-300 ${onLight ? "invert" : ""}`}
            />
          </span>
          <span
            className={`font-display font-semibold tracking-[-0.02em] transition-all duration-300 ${
              scrolled ? "text-[20px]" : "text-[22px]"
            } ${onLight ? "text-[#111827]" : "text-white"}`}
          >
            Basic Socials
          </span>
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:gap-9 md:flex">
          {links.map((l) =>
            l.href.startsWith("/#") ? (
              <a key={l.href} href={l.href} className={`${linkBase} ${linkTone}`}>
                {l.label}
              </a>
            ) : (
              <Link
                key={l.href}
                to={l.href as "/careers"}
                className={`${linkBase} ${linkTone}`}
                activeProps={{ className: onLight ? "text-[#0033FF]" : "text-[#AAFF00]" }}
              >
                {l.label}
              </Link>
            ),
          )}
        </div>

        <a
          href="/#contact"
          className="shrink-0 rounded-full bg-[#AAFF00] px-5 py-2 text-[15px] font-semibold text-[#0033FF] shadow-[0_6px_18px_-8px_rgba(170,255,0,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-10px_rgba(170,255,0,0.85)]"
        >
          Let's Talk
        </a>
      </nav>
    </header>
  );
}