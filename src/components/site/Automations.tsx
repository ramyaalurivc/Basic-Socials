import { Link } from "@tanstack/react-router";

const journey = [
  {
    n: "01",
    title: "Understand your business",
    body: "We spend time with how you actually work before we suggest anything.",
  },
  {
    n: "02",
    title: "Design your AI system",
    body: "A system shaped around your workflows, not a template you adapt to.",
  },
  {
    n: "03",
    title: "Automate and optimise",
    body: "Repetitive work quietly disappears, and the system improves as you grow.",
  },
];

export function Automations() {
  return (
    <section id="automations" className="relative overflow-hidden px-6 py-32 md:py-[140px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -bottom-40 left-1/4 h-[420px] w-[420px] rounded-full bg-[#AAFF00] opacity-15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="pill reveal">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#AAFF00]" />
            AI Systems
          </span>
          <h2 className="reveal reveal-delay-1 mt-6 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.035em]">
            AI built around{" "}
            <span className="italic font-medium grad-text">the way you already work.</span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base md:text-lg leading-relaxed text-white/70">
            Every business runs differently. We look at how yours operates, find where AI makes the
            biggest difference, and build it around you.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {journey.map((s, i) => (
            <li key={s.n} className={`reveal reveal-delay-${i + 1} relative`}>
              <div className="h-full rounded-3xl border border-white/12 bg-white/[0.06] p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#AAFF00]/40 hover:bg-white/10">
                <span className="font-display text-xs tracking-[0.22em] text-[#AAFF00]">{s.n}</span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm md:text-base leading-relaxed text-white/65">{s.body}</p>
              </div>
              {i < journey.length - 1 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-4 left-1/2 -translate-x-1/2 text-[#AAFF00]/70 md:bottom-1/2 md:left-auto md:-right-4 md:translate-x-0 md:translate-y-1/2"
                >
                  <span className="md:hidden">↓</span>
                  <span className="hidden md:inline">→</span>
                </span>
              )}
            </li>
          ))}
        </ol>

        <div className="reveal mt-16 flex flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-base text-white/70">
            The outcome: less repetitive work, smarter operations, and more time to grow.
          </p>
          <Link to="/ai-systems" className="btn-green">
            Explore AI Systems →
          </Link>
        </div>
      </div>
    </section>
  );
}