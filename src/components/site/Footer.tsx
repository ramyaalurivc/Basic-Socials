export function Footer() {
  return (
    <footer className="relative px-6 pt-24 pb-10 overflow-hidden border-t border-white/15">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -top-32 left-10 h-[420px] w-[420px] rounded-full bg-[#AAFF00] opacity-20 blur-3xl" />
        <div className="blob absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-white opacity-10 blur-3xl" style={{ animationDelay: "-5s" }} />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Big logo */}
        <div className="reveal reveal-delay-1">
          <div className="relative flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display font-bold leading-[0.85] tracking-[-0.05em] text-white text-[clamp(3.5rem,16vw,15rem)]">
              Basic <span className="grad-text">Socials</span>
              <span className="inline-block h-3 w-3 md:h-5 md:w-5 ml-1 md:ml-2 rounded-full bg-[#AAFF00] shadow-[0_0_30px_#AAFF00] align-baseline" />
            </h2>
          </div>
          <div className="mt-2 flex items-center gap-3 text-white/60 text-sm">
            <span className="h-px w-12 bg-white/40" />
            <span>Hyderabad · India · Worldwide</span>
          </div>
        </div>

        {/* Links grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 reveal reveal-delay-2">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50 mb-4">Studio</p>
            <p className="text-white/80 text-sm leading-relaxed">
              Creative marketing & consulting agency in Hyderabad.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50 mb-4">Explore</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="ulink text-white/80 hover:text-white">Services</a></li>
              <li><a href="#who" className="ulink text-white/80 hover:text-white">Who we work with</a></li>
              <li><a href="#how" className="ulink text-white/80 hover:text-white">How it works</a></li>
              <li><a href="#ai" className="ulink text-white/80 hover:text-white">AI Visibility</a></li>
              <li><a href="/blog" className="ulink text-white/80 hover:text-white">Blog</a></li>
              <li><a href="#faq" className="ulink text-white/80 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50 mb-4">Social</p>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="ulink text-white/80 hover:text-white">Instagram ↗</a></li>
              <li><a href="#" className="ulink text-white/80 hover:text-white">X / Twitter ↗</a></li>
              <li><a href="#" className="ulink text-white/80 hover:text-white">LinkedIn ↗</a></li>
              <li><a href="#" className="ulink text-white/80 hover:text-white">YouTube ↗</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-white/50 mb-4">Say hi</p>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:hello@basicsocials.in" className="ulink text-white/80 hover:text-white">hello@basicsocials.in</a></li>
              <li><a href="tel:+917993557180" className="ulink text-white/80 hover:text-white">+91 79935 57180</a></li>
              <li><a href="https://wa.me/910000000000" className="ulink text-[#AAFF00]">WhatsApp →</a></li>
              <li className="text-white/60">Mon to Sat · 10am to 7pm IST</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/55">
          <span>© 2025 Basic Socials. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
