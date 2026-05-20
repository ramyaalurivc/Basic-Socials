export function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-white/15">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div>
          <a href="#top" className="font-display text-2xl font-bold tracking-tight text-white">
            basic<span className="text-[#AAFF00]">.</span>socials
          </a>
          <p className="mt-2 text-sm text-white/60 max-w-xs">
            Creative marketing & consulting agency. Hyderabad.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center text-sm">
          <a href="#services" className="ulink text-white/70 hover:text-white">Services</a>
          <a href="#who" className="ulink text-white/70 hover:text-white">Who we work with</a>
          <a href="#how" className="ulink text-white/70 hover:text-white">How it works</a>
          <a href="#contact" className="ulink text-white/70 hover:text-white">Contact</a>
        </div>
        <div className="flex gap-4 md:justify-end text-sm">
          <a href="#" className="ulink text-white/70 hover:text-white">Instagram</a>
          <a href="#" className="ulink text-white/70 hover:text-white">X</a>
          <a href="#" className="ulink text-white/70 hover:text-white">LinkedIn</a>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-10 pt-6 border-t border-white/10 text-xs text-white/60 flex flex-wrap gap-3 justify-between">
        <span>© 2025 Basic Socials. All rights reserved.</span>
        <span>Made with intent in Hyderabad.</span>
      </div>
    </footer>
  );
}