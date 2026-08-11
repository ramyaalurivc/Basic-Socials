import { Blocks, Puzzle, RefreshCw, Users } from "lucide-react";

const cards = [
  {
    icon: Blocks,
    title: "Custom, Never Generic",
    body: "Every AI system is designed around your business, workflows, and goals — never from a one-size-fits-all template.",
  },
  {
    icon: Users,
    title: "People-First Implementation",
    body: "AI should make work easier, not more complicated. We build solutions your team can actually adopt and use with confidence.",
  },
  {
    icon: Puzzle,
    title: "Works With Your Existing Tools",
    body: "Our AI systems integrate with the platforms you already use whenever possible, minimising disruption and preserving the way your team works.",
  },
  {
    icon: RefreshCw,
    title: "Continuous Improvement",
    body: "Your business evolves, and so should your AI systems. We continuously refine and optimise solutions as your processes grow and change.",
  },
];

export function StatStrip() {
  return (
    <section className="relative px-6 py-32 md:py-[140px]">
      <div className="mx-auto max-w-7xl">
        <h2 className="reveal max-w-3xl font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
          What makes us{" "}
          <span className="italic font-medium grad-text">different.</span>
        </h2>
        <p className="reveal reveal-delay-1 mt-5 max-w-xl text-base text-white/70">
          Why businesses choose Basic Socials to build the systems they run on.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className={`reveal reveal-delay-${(i % 4) + 1} group flex h-full flex-col rounded-[24px] border border-white/12 bg-white/[0.04] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#AAFF00]/40 hover:bg-white/[0.07]`}
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-[#0033FF]/25 text-[#AAFF00] transition-colors duration-300 group-hover:border-[#AAFF00]/40">
                <c.icon size={20} strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 font-display text-lg font-semibold tracking-tight text-white">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}