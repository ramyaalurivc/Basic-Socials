import { SectionLabel } from "./SectionLabel";

const tiles = [
  "Founders & Startups",
  "Educational Institutions",
  "Health & Wellness",
  "Clothing & Fashion",
  "Real Estate",
  "Professionals & Personal Brands",
];

export function WhoWeWorkWith() {
  return (
    <section id="who" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          label="Who we work with"
          headline={
            <>
              Built for <span className="italic font-medium grad-text">these</span> businesses.
            </>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tiles.map((t, i) => {
            return (
              <div
                key={t}
                className={`reveal reveal-delay-${(i % 5) + 1} group relative overflow-hidden rounded-3xl p-8 min-h-[180px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 glass hover:border-white/40`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(400px 200px at var(--mx,50%) var(--my,0%), rgba(170,255,0,0.25), transparent 60%)",
                  }}
                />
                <span className="relative font-display text-xs text-white/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative font-display text-2xl md:text-[1.7rem] font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1 text-white">
                  {t}
                </h3>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-base text-white/70 md:text-lg reveal">
          Your industry isn't on the list? Reach out. We'll tell you if we're the right fit.
        </p>
        <a
          href="#contact"
          className="reveal mt-6 inline-flex items-center gap-2 rounded-full bg-[#AAFF00] px-4 py-1.5 text-sm font-medium text-[#0033FF] shadow-[0_0_20px_rgba(170,255,0,0.5)] hover:scale-105 transition w-fit"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#0033FF] animate-pulse" />
          Let's talk
        </a>
      </div>
    </section>
  );
}
