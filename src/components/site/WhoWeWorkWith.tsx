import { SectionLabel } from "./SectionLabel";

const tiles = [
  "Founders & Startups",
  "Educational Institutions",
  "Health & Wellness",
  "Clothing & Fashion",
  "Real Estate",
  "More coming soon",
];

export function WhoWeWorkWith() {
  return (
    <section id="who" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          label="Who we work with"
          headline={<>Built for <span className="italic font-medium grad-text">these</span> businesses.</>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tiles.map((t, i) => {
            const isLast = i === tiles.length - 1;
            return (
              <div
                key={t}
                className={`reveal reveal-delay-${(i % 5) + 1} group relative overflow-hidden rounded-3xl p-8 min-h-[180px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 ${
                  isLast
                    ? "bg-[#AAFF00] text-[#0033FF] border border-[#AAFF00]"
                    : "glass hover:border-white/40"
                }`}
              >
                {!isLast && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(400px 200px at var(--mx,50%) var(--my,0%), rgba(170,255,0,0.25), transparent 60%)" }}
                  />
                )}
                <span className={`relative font-display text-xs ${isLast ? "text-[#0033FF]/70" : "text-white/60"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`relative font-display text-2xl md:text-[1.7rem] font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1 ${isLast ? "" : "text-white"}`}>
                  {t}
                </h3>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-base text-white/70 md:text-lg reveal">
          If your industry isn't listed, reach out. We'll tell you if we're the right fit.
        </p>
      </div>
    </section>
  );
}