import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

const links = [
  { label: "Services", href: "#services" },
  { label: "Who we work with", href: "#who" },
  { label: "How it works", href: "#how" },
  { label: "Portfolio", href: "#portfolio" },
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
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex items-center gap-2 rounded-full border border-white/20 px-2 py-2 transition-all duration-300 ${
          scrolled ? "bg-white/15 backdrop-blur-2xl shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4)]" : "bg-white/10 backdrop-blur-xl"
        }`}
      >
        <Link to="/" className="pl-2 pr-4 font-display text-base font-bold tracking-tight text-white flex items-center gap-2">
          <img src={logo} alt="Basic Socials" className="h-9 w-9 object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-1 px-2">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.href}
                to={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={`/${l.href}`}
                className="rounded-full px-3 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </a>
            ),
          )}
        </div>
        <a href="/#contact" className="btn-green !py-2 !px-4 text-sm">
          Let's talk
        </a>
      </nav>
    </header>
  );
}