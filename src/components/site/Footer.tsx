export function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-border/60">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <a href="#top" className="font-display text-2xl font-bold tracking-tight">
            basic<span className="text-accent">.</span>socials
          </a>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs">
            Creative marketing & consulting agency. Hyderabad.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center text-sm">
          <a href="#services" className="hover:text-foreground text-muted-foreground">Services</a>
          <a href="#who" className="hover:text-foreground text-muted-foreground">Who we work with</a>
          <a href="#how" className="hover:text-foreground text-muted-foreground">How it works</a>
          <a href="#contact" className="hover:text-foreground text-muted-foreground">Contact</a>
        </div>
        <div className="flex gap-4 md:justify-end text-sm">
          <a href="#" className="hover:text-foreground text-muted-foreground">Instagram</a>
          <a href="#" className="hover:text-foreground text-muted-foreground">X</a>
          <a href="#" className="hover:text-foreground text-muted-foreground">LinkedIn</a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-border/40 text-xs text-muted-foreground flex flex-wrap gap-3 justify-between">
        <span>© 2025 Basic Socials. All rights reserved.</span>
        <span>Made with intent in Hyderabad.</span>
      </div>
    </footer>
  );
}