const tickerItems = [
  "Branding",
  "Social Media",
  "AI Production",
  "High End Video",
  "Performance Marketing",
  "Talent Management",
  "UGC",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32 bg-[#2929FF]">
      {/* Decorative ambient lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -top-32 -left-24 h-[450px] w-[450px] rounded-full bg-[#B7FF00] opacity-25 blur-3xl" />
        <div
          className="blob absolute top-40 -right-24 h-[500px] w-[500px] rounded-full bg-white opacity-15 blur-3xl"
          style={{ animationDelay: "-4s" }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#B7FF00]/30 bg-black/20 px-4 py-1.5 text-xs uppercase tracking-widest text-[#B7FF00] font-bold mb-6 reveal">
            <span className="h-2 w-2 rounded-full bg-[#B7FF00] animate-pulse" />
            <span>Creative Marketing & Consulting Agency · Hyderabad</span>
          </div>

          <h1 className="mt-4 max-w-5xl font-display text-[clamp(3rem,8vw,6.8rem)] font-extrabold leading-[0.93] tracking-[-0.04em] text-[#F7F7F2] reveal reveal-delay-1">
            We build brands people <br />
            <span className="text-[#B7FF00] italic font-normal">remember.</span>
          </h1>

          <p className="mt-8 max-w-2xl text-[#F7F7F2]/90 text-lg md:text-2xl leading-relaxed reveal reveal-delay-2">
            Do your thing. We'll make it trend. Organic social engines, 9:16 vertical reels, UGC ads & personal branding.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 reveal reveal-delay-3">
            <a
              href="#contact"
              className="rounded-full bg-[#B7FF00] px-8 py-4 text-sm font-extrabold text-[#0B0B0D] transition-transform hover:scale-105 shadow-[0_0_30px_rgba(183,255,0,0.4)] flex items-center gap-2"
            >
              <span>EXPLORE SHOWCASE</span>
              <span className="text-base font-bold">↓</span>
            </a>
            <a
              href="/our-work"
              className="rounded-full border border-[#F7F7F2]/30 bg-transparent px-8 py-4 text-sm font-semibold text-[#F7F7F2] transition-all hover:border-[#B7FF00] hover:text-[#B7FF00] hover:scale-105 flex items-center gap-2"
            >
              <span>VIEW OUR WORK</span>
              <span className="text-base font-bold">↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative mt-20 border-y border-white/15 bg-black/20 backdrop-blur py-5 overflow-hidden">
        <div className="ticker font-display text-2xl md:text-3xl font-extrabold tracking-tight text-[#F7F7F2]">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{t.toUpperCase()}</span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#B7FF00] shadow-[0_0_8px_#B7FF00]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
