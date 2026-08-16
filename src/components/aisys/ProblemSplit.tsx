import { useScrollProgress } from "@/hooks/use-scroll-progress";

const chaos = [
  { label: "Manual steps", x: 6, y: 12, d: "0s" },
  { label: "Scattered data", x: 54, y: 6, d: "-1.2s" },
  { label: "Repeat work", x: 16, y: 52, d: "-2.1s" },
  { label: "Waiting", x: 60, y: 46, d: "-0.6s" },
  { label: "Handoffs", x: 32, y: 78, d: "-1.7s" },
  { label: "Disconnected tools", x: 64, y: 74, d: "-2.6s" },
];

const pains = [
  "The same tasks get repeated every week by people who could be doing better work.",
  "Information lives in different places, so simple answers take far too long to find.",
  "Tools were bought one at a time, and none of them were designed to work together.",
  "Knowledge sits with a few people, and everything slows down when they're unavailable.",
  "Off-the-shelf AI tools promise a lot, then ask your team to change how they work.",
];

export function ProblemSplit() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>(0.25);
  const p = Math.min(1, progress * 1.35);

  return (
    <section className="relative overflow-hidden bg-[#FAFBFC] px-6 py-32 md:py-[140px] text-[#0F172A]">
      <div aria-hidden className="svc-grid absolute inset-0 z-0" />
      <div aria-hidden className="svc-noise absolute inset-0 z-0" />

      <div ref={ref} className="relative z-[1] mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="reveal inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-medium text-[#0033FF]">
            <span className="svc-dot h-1.5 w-1.5 rounded-full bg-[#0033FF]" />
            The starting point
          </span>
          <h2 className="reveal reveal-delay-1 mt-6 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            AI isn't a product you buy. It's a solution designed around your business.
          </h2>
          <p className="reveal reveal-delay-2 mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-[#475569]">
            Most businesses don't need more software. They need the work they already do to take
            less effort. That starts with understanding the business, not the technology.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* chaos */}
          <div className="relative h-[340px] overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white/70 backdrop-blur">
            <span className="absolute left-6 top-5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#94A3B8]">
              Today
            </span>
            {chaos.map((c) => (
              <span
                key={c.label}
                className="aisys-jitter absolute rounded-xl border border-[#E5E7EB] bg-white px-3 py-2 text-xs font-medium text-[#475569] shadow-[0_6px_18px_-12px_rgba(15,23,42,0.4)]"
                style={{ left: `${c.x}%`, top: `${c.y + 12}%`, animationDelay: c.d }}
              >
                {c.label}
              </span>
            ))}
          </div>

          {/* order */}
          <div className="relative h-[340px] overflow-hidden rounded-[24px] border border-[#E5E7EB] bg-white">
            <span className="absolute left-6 top-5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[#0033FF]">
              With a system
            </span>
            <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
              {[60, 110, 160, 210].map((y, i) => (
                <path
                  key={y}
                  d={`M120 ${y} C 190 ${y}, 200 135, 280 135`}
                  fill="none"
                  stroke="#0033FF"
                  strokeWidth="1.4"
                  strokeOpacity="0.5"
                  strokeDasharray="260"
                  strokeDashoffset={260 * (1 - Math.max(0, Math.min(1, p * 1.4 - i * 0.12)))}
                />
              ))}
              <circle cx="288" cy="135" r={6 + p * 3} fill="#0033FF" opacity={0.15 + p * 0.85} />
            </svg>
            {["Your workflow", "Your data", "Your tools", "Your team"].map((l, i) => (
              <span
                key={l}
                className="absolute left-6 rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] px-3 py-1.5 text-xs font-medium text-[#475569]"
                style={{
                  top: `${(60 + i * 50) / 300 * 100}%`,
                  transform: `translateY(-50%) translateX(${(1 - p) * -24}px)`,
                  opacity: 0.25 + p * 0.75,
                  transition: "opacity .2s linear",
                }}
              >
                {l}
              </span>
            ))}
            <span
              className="absolute right-6 top-1/2 rounded-xl bg-[#0033FF] px-4 py-2 text-xs font-semibold text-white shadow-[0_18px_40px_-18px_rgba(0,51,255,0.7)]"
              style={{
                transform: `translateY(-50%) scale(${0.9 + p * 0.1})`,
                opacity: 0.2 + p * 0.8,
              }}
            >
              Your AI system
            </span>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {pains.map((t, i) => (
            <li
              key={t}
              className={`reveal reveal-delay-${(i % 5) + 1} flex gap-4 border-t border-[#E5E7EB] pt-4`}
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0033FF]" />
              <p className="text-[0.975rem] leading-relaxed text-[#475569]">{t}</p>
            </li>
          ))}
        </ul>

        <p className="reveal mt-12 max-w-2xl font-display text-[clamp(1.15rem,2.3vw,1.75rem)] font-semibold leading-snug tracking-[-0.02em] text-[#0F172A]">
          We don't ask your business to adapt to AI. We build AI around the way your business
          already works.
        </p>
      </div>
    </section>
  );
}