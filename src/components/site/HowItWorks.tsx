const steps = [
  { n: "01", title: "Tell us about your brand", body: "Quick form or a short call." },
  { n: "02", title: "You get a proposal", body: "A clear plan with scope and cost, within 48 hours." },
  { n: "03", title: "We start working", body: "Onboarding is fast. Work begins in the first week." },
  { n: "04", title: "We keep going", body: "Monthly. Consistent. Adjusted as your brand grows." },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.03em] max-w-3xl mb-14 reveal">
          How <span className="italic font-medium grad-text">it</span> works.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`reveal reveal-delay-${i + 1} group relative overflow-hidden rounded-3xl glass p-7 min-h-[240px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-white/40`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[#AAFF00] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
              />
              <div className="flex items-center justify-between">
                <span className="font-display text-xs text-white/60">STEP {s.n}</span>
                <span className={`h-2 w-2 rounded-full bg-[#AAFF00] transition-shadow ${i === steps.length - 1 ? "shadow-[0_0_12px_#AAFF00]" : "opacity-50 group-hover:opacity-100 group-hover:shadow-[0_0_12px_#AAFF00]"}`} />
              </div>
              <div className="relative">
                <h3 className="font-display text-2xl font-semibold tracking-tight mb-3 text-white transition-transform duration-500 group-hover:-translate-y-0.5">
                  {s.title}
                </h3>
                <p className="text-sm text-white/70">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}