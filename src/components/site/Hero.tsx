const tickerItems = [
  "Branding",
  "Social Media",
  "AI Production",
  "High End Video Production",
  "Performance Marketing",
  "Talent Management",
  "UGC",
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      {/* Decorative blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-[#AAFF00] opacity-30 blur-3xl" />
        <div className="blob absolute top-40 -right-24 h-[480px] w-[480px] rounded-full bg-white opacity-20 blur-3xl" style={{ animationDelay: "-4s" }} />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <span className="pill reveal">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Creative Marketing & Consulting Agency · Hyderabad
          </span>

          <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.6rem,7.2vw,6.4rem)] font-bold leading-[0.95] tracking-[-0.04em] reveal reveal-delay-1">
            We Basically Handle{" "}
            <span className="italic font-medium grad-text">Your Entire</span>{" "}
            Marketing.
          </h1>

          <p className="mt-6 max-w-xl text-base text-white/70 md:text-lg reveal reveal-delay-2">
            One team. From the logo to the launch, the reels to the ad spend — done.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 reveal reveal-delay-3">
            <a href="#contact" className="btn-green">
              Start a project →
            </a>
            <a href="#services" className="btn-dark">
              What we do
            </a>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className="relative mt-20 border-y border-white/15 bg-white/5 backdrop-blur py-5 overflow-hidden">
        <div className="ticker font-display text-2xl md:text-3xl font-medium tracking-tight text-white">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{t}</span>
              <span className="h-2 w-2 rounded-full bg-[#AAFF00]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}