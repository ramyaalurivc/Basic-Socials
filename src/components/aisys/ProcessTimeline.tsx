import { useScrollProgress } from "@/hooks/use-scroll-progress";

const steps = [
  {
    n: "01",
    title: "Understand your business",
    body: "We sit with your team and learn how the work actually gets done today.",
  },
  {
    n: "02",
    title: "Find the opportunities",
    body: "We map the repetitive tasks and the moments where AI would create real value.",
  },
  {
    n: "03",
    title: "Design the system",
    body: "We shape a system around your operations, in plain language you can sign off on.",
  },
  {
    n: "04",
    title: "Integrate with what you use",
    body: "Wherever possible it plugs into your existing tools, so nobody relearns their job.",
  },
  {
    n: "05",
    title: "Refine as you grow",
    body: "We keep tuning it as the business changes, month after month.",
  },
];

export function ProcessTimeline() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>(0.3);
  const p = Math.min(1, progress * 1.5);

  return (
    <section className="relative overflow-hidden bg-[#FAFBFC] px-6 py-32 md:py-[140px] text-[#0F172A]">
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -top-px left-0 w-full h-16 md:h-20 text-[#FAFBFC] z-[2]">
        <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill="currentColor" />
      </svg>
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -bottom-px left-0 w-full h-16 md:h-20 text-[#FAFBFC] rotate-180 z-[2]">
        <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill="currentColor" />
      </svg>
      <div aria-hidden className="svc-grid absolute inset-0 z-0" />

      <div ref={ref} className="relative z-[1] mx-auto max-w-4xl">
        <span className="reveal inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-medium text-[#0033FF]">
          <span className="svc-dot h-1.5 w-1.5 rounded-full bg-[#0033FF]" />
          How we work
        </span>
        <h2 className="reveal reveal-delay-1 mt-6 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
          From understanding to running. No mystery.
        </h2>

        <div className="relative mt-16 pl-12">
          <div className="absolute left-[15px] top-2 bottom-2 w-[2px] bg-[#E5E7EB]" />
          <div
            className="absolute left-[15px] top-2 w-[2px] origin-top bg-[#0033FF]"
            style={{ height: `calc((100% - 1rem) * ${p})` }}
          />
          <ol className="space-y-14">
            {steps.map((s, i) => {
              const on = p > (i + 0.2) / steps.length;
              return (
                <li key={s.n} className="relative">
                  <span
                    className="absolute -left-12 top-1 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white font-display text-[0.7rem] transition-all duration-500"
                    style={{
                      borderColor: on ? "#0033FF" : "#E5E7EB",
                      color: on ? "#0033FF" : "#94A3B8",
                      transform: `translateX(-1px) scale(${on ? 1.05 : 1})`,
                      boxShadow: on ? "0 0 0 6px rgba(0,51,255,0.08)" : "none",
                    }}
                  >
                    {s.n}
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">{s.title}</h3>
                  <p className="mt-2 max-w-xl text-[0.975rem] leading-relaxed text-[#475569]">{s.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}