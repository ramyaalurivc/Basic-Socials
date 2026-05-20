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
          headline={<>Built for <span className="italic font-medium text-muted-foreground">these</span> businesses.</>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tiles.map((t, i) => {
            const isLast = i === tiles.length - 1;
            return (
              <div
                key={t}
                className={`group relative rounded-3xl border border-border/60 p-8 min-h-[180px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isLast ? "bg-foreground text-background" : "bg-card hover:border-foreground/40"
                }`}
              >
                <span className="font-display text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`font-display text-2xl md:text-[1.7rem] font-semibold tracking-tight ${isLast ? "text-background/90" : ""}`}>
                  {t}
                </h3>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-2xl text-base text-muted-foreground md:text-lg">
          If your industry isn't listed — reach out. We'll tell you if we're the right fit.
        </p>
      </div>
    </section>
  );
}