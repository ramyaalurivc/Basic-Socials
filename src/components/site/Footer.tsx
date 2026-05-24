import mascot from "@/assets/mascot.png";

export function Footer() {
  return (
    <footer className="relative px-6 pt-24 pb-10 overflow-hidden border-t border-white/15">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -top-32 left-10 h-[420px] w-[420px] rounded-full bg-[#AAFF00] opacity-20 blur-3xl" />
        <div className="blob absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-white opacity-10 blur-3xl" style={{ animationDelay: "-5s" }} />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* CTA strip */}
        <div className="relative rounded-[2rem] glass-strong p-8 md:p-12 md:pr-[24rem] md:min-h-[20rem] flex flex-col md:flex-row items-start md:items-center justify-between gap-8 reveal overflow-visible">
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Ready when you are</p>
            <h3 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-[-0.03em] text-white max-w-xl leading-[1]">
              Let's build something <span className="italic font-medium grad-text">basically</span> unforgettable.
            </h3>
          </div>

          {/* Mascot + button cluster (desktop) */}
          <div className="hidden md:block absolute right-6 lg:right-10 inset-y-0 w-[28rem] pointer-events-none group/mascot">
            <img
              src={mascot}
              alt="Basic Socials mascot"
              className="absolute left-0 bottom-0 h-[115%] w-auto select-none drop-shadow-[0_18px_25px_rgba(0,0,0,0.22)] transition-transform duration-500 group-hover/mascot:-rotate-3 group-hover/mascot:-translate-y-1 z-20"
              loading="lazy"
            />
            {/* soft ground shadow under button */}
            <div
              aria-hidden
              className="absolute right-2 bottom-[26%] h-4 w-60 rounded-full bg-black/15 blur-2xl"
            />
            <a
              href="#contact"
              className="btn-green text-lg px-7 py-4 pointer-events-auto absolute right-2 bottom-[30%] whitespace-nowrap z-10"
            >
              Start a project →
            </a>
          </div>

          {/* Mascot + button (mobile) */}
          <div className="relative md:hidden w-full flex flex-col items-center">
            <img
              src={mascot}
              alt="Basic Socials mascot"
              className="h-40 w-auto select-none drop-shadow-[0_18px_25px_rgba(0,0,0,0.4)] -mb-6 translate-x-6"
              loading="lazy"
            />
            <a href="#contact" className="btn-green text-base relative z-10">
              Start a project →
            </a>
          </div>
        </div>

        {/* Big logo */}
        <div className="mt-20 reveal reveal-delay-1">
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
