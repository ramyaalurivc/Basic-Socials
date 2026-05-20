import { useState, useEffect } from "react";

const links = [
  { label: "Services", href: "#services" },
  { label: "Who we work with", href: "#who" },
  { label: "How it works", href: "#how" },
  { label: "Portfolio", href: "#portfolio" },
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
        className={`flex items-center gap-2 rounded-full border border-border/60 px-2 py-2 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-xl shadow-sm" : "bg-background/40 backdrop-blur-md"
        }`}
      >
        <a href="#top" className="px-4 font-display text-base font-bold tracking-tight">
          basic<span className="text-accent">.</span>socials
        </a>
        <div className="hidden md:flex items-center gap-1 px-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="btn-dark !py-2 !px-4 text-sm">
          Let's talk
        </a>
      </nav>
    </header>
  );
}