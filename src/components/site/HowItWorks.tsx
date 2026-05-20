const steps = [
  { n: "01", title: "Tell us about your brand", body: "Quick form or a short call." },
  { n: "02", title: "You get a proposal", body: "A clear plan with scope and cost — within 48 hours." },
  { n: "03", title: "We start working", body: "Onboarding is fast. Work begins in the first week." },
  { n: "04", title: "We keep going", body: "Monthly. Consistent. Adjusted as your brand grows." },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.03em] max-w-3xl mb-14">
          How <span className="italic font-medium text-muted-foreground">it</span> works.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="relative rounded-3xl border border-border/60 bg-card p-7 min-h-[240px] flex flex-col justify-between transition-all hover:-translate-y-1 hover:border-foreground/40"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-xs text-muted-foreground">STEP {s.n}</span>
                {i === steps.length - 1 && (
                  <span className="h-2 w-2 rounded-full bg-accent" />
                )}
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}