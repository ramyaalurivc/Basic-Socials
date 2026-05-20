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
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <span className="pill">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            Creative Marketing & Consulting Agency · Hyderabad
          </span>

          <h1 className="mt-8 max-w-5xl font-display text-[clamp(2.6rem,7.2vw,6.4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            We Basically Handle{" "}
            <span className="italic font-medium text-muted-foreground">Your Entire</span>{" "}
            Marketing.
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            One team. From the logo to the launch, the reels to the ad spend — done.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
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
      <div className="relative mt-20 border-y border-border/60 bg-[var(--cream-deep)] py-5 overflow-hidden">
        <div className="ticker font-display text-2xl md:text-3xl font-medium tracking-tight">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{t}</span>
              <span className="h-2 w-2 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}