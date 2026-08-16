const tickerItems = [
  "Branding",
  "Social Media",
  "AI Content",
  "Video Production",
  "Performance Marketing",
  "AI Automations",
  "Consulting",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -top-40 -left-24 h-[460px] w-[460px] rounded-full bg-[#AAFF00] opacity-25 blur-3xl" />
        <div className="blob absolute top-40 -right-24 h-[520px] w-[520px] rounded-full bg-white opacity-15 blur-3xl" style={{ animationDelay: "-4s" }} />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <span className="pill reveal">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Content + AI growth studio
          </span>

          <h1 className="mt-10 max-w-[18ch] font-display text-[clamp(2.9rem,7.6vw,6.8rem)] font-bold leading-[0.94] tracking-[-0.045em] reveal reveal-delay-1">
            We grow businesses with{" "}
            <span className="italic font-medium grad-text">content and AI.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-white/70 reveal reveal-delay-2">
            Content that gets you noticed. AI systems that keep the business running.
            Built for founders and growing brands.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4 reveal reveal-delay-3">
            <a href="#contact" className="btn-green">
              Start a project →
            </a>
            <a href="#services" className="btn-dark" data-sfx="enter">
              See what we do
            </a>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative mt-24 border-y border-white/12 bg-white/5 backdrop-blur py-5 overflow-hidden">
        <div className="ticker font-display text-xl md:text-2xl font-medium tracking-tight text-white/85">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{t}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#AAFF00]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}