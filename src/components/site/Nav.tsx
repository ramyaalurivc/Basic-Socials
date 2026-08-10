import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

const links = [
  { label: "Services", href: "#services" },
  { label: "Our Work", href: "/our-work" },
  { label: "Who we work with", href: "#who" },
  { label: "How it works", href: "#how" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <nav
          className={`w-full flex items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-[#0B0B0D]/80 backdrop-blur-xl border border-white/15 shadow-2xl"
              : "bg-black/20 backdrop-blur-md border border-white/10"
          }`}
        >
          <Link
            to="/"
            className="font-display text-base md:text-lg font-bold tracking-tight text-[#F7F7F2] flex items-center gap-2.5 group"
          >
            <span className="h-3 w-3 rounded-full bg-[#B7FF00] shadow-[0_0_12px_#B7FF00]" />
            <span className="group-hover:text-[#B7FF00] transition-colors">basic socials</span>
          </Link>

          <div className="hidden md:flex items-center gap-1.5 font-medium text-sm">
            {links.map((l) =>
              l.href.startsWith("/") ? (
                <Link
                  key={l.href}
                  to={l.href as "/blog" | "/our-work"}
                  className="rounded-full px-3.5 py-1.5 text-[#F7F7F2]/80 transition-colors hover:text-[#B7FF00] active:[&.active]:text-[#B7FF00]"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={`/${l.href}`}
                  className="rounded-full px-3.5 py-1.5 text-[#F7F7F2]/80 transition-colors hover:text-[#B7FF00]"
                >
                  {l.label}
                </a>
              ),
            )}
          </div>

          <a
            href="/#contact"
            className="rounded-full bg-[#B7FF00] px-5 py-2 text-xs md:text-sm font-bold text-[#0B0B0D] transition-transform hover:scale-105 shadow-[0_0_20px_rgba(183,255,0,0.4)] flex items-center gap-1"
          >
            <span>LET'S TALK</span>
            <span className="text-base">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
