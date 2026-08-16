const steps = [
  { n: "01", title: "Tell us about your brand", body: "Quick form or a short call." },
  { n: "02", title: "You get a proposal", body: "A clear plan with scope and cost, within 48 hours." },
  { n: "03", title: "We start working", body: "Onboarding is fast. Work begins in the first week." },
  { n: "04", title: "We keep going", body: "Monthly. Consistent. Adjusted as your brand grows." },
];

export function HowItWorks() {
  return (
    <section data-nav-theme="light" id="how" className="relative px-6 py-32 md:py-[140px] overflow-hidden bg-[#FAFAFA] text-[#0F172A]">
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -top-px left-0 w-full h-16 md:h-20 text-[#FAFAFA]">
        <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill="currentColor" />
      </svg>
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -bottom-px left-0 w-full h-16 md:h-20 text-[#FAFAFA] rotate-180">
        <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill="currentColor" />
      </svg>
      <div className="mx-auto max-w-7xl relative">
        <div className="mb-14">
          <span className="reveal inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-medium text-[#0033FF]">Process</span>
          <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.03em] max-w-3xl reveal reveal-delay-1 text-[#0F172A]">
            How <span className="italic font-medium text-[#0033FF]">it</span> works.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className={`reveal reveal-delay-${i + 1} group relative overflow-hidden rounded-3xl bg-white border border-[#E5E7EB] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] min-h-[260px] flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-[#0033FF]/40 hover:shadow-[0_12px_40px_-16px_rgba(0,51,255,0.25)]`}
              style={{ padding: "36px" }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-[#0033FF] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-10"
              />
              <div className="flex items-center justify-between">
                <span className="font-display text-xs text-[#94A3B8] tracking-wider">STEP {s.n}</span>
                <span className="h-2 w-2 rounded-full bg-[#0033FF]" />
              </div>
              <div className="relative">
                <h3 className="font-display text-2xl font-semibold tracking-tight mb-3 text-[#0F172A] transition-transform duration-500 group-hover:-translate-y-0.5">
                  {s.title}
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}