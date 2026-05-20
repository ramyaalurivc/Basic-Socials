import { SectionLabel } from "./SectionLabel";

const work = [
  { tag: "Branding", title: "Identity for a wellness studio", color: "oklch(0.78 0.22 142)" },
  { tag: "Performance", title: "3.2× ROAS for D2C fashion", color: "oklch(0.7 0.18 50)" },
  { tag: "Video & AI", title: "Ad film for an EdTech launch", color: "oklch(0.55 0.15 260)" },
  { tag: "Social", title: "Real estate handle, 0 → 48k", color: "oklch(0.85 0.16 95)" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="px-6 py-24 md:py-32 bg-[var(--cream-deep)]">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          label="Our Portfolio"
          headline={<>We let our <span className="italic font-medium text-muted-foreground">work</span> speak.</>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {work.map((w, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 bg-card cursor-pointer"
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background: `radial-gradient(120% 80% at 20% 10%, ${w.color}, transparent 60%), linear-gradient(135deg, oklch(0.92 0.018 90), oklch(0.88 0.02 85))`,
                }}
              />
              <div className="relative h-full p-7 flex flex-col justify-between">
                <span className="pill !bg-background/80">{w.tag}</span>
                <div className="flex items-end justify-between">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight max-w-[80%]">
                    {w.title}
                  </h3>
                  <span className="text-2xl opacity-60 group-hover:opacity-100 transition">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}