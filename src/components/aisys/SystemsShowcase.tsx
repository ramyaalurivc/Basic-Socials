import { useState } from "react";

type Area = {
  key: string;
  index: string;
  title: string;
  body: string;
  kicker: string;
  inputs: [string, string, string];
  core: string;
  output: string;
};

const areas: Area[] = [
  {
    key: "ops",
    index: "A-01",
    title: "Operations",
    body: "The day-to-day steps your team repeats to keep things moving get simplified, so work flows without constant chasing.",
    kicker: "Less coordination. More output.",
    inputs: ["Requests", "Schedules", "Updates"],
    core: "Your AI system",
    output: "Work moves on its own",
  },
  {
    key: "customer",
    index: "A-02",
    title: "Customer experience",
    body: "People get answers faster and nothing slips through, while your team stays in control of the conversations that matter.",
    kicker: "Faster answers. Fewer gaps.",
    inputs: ["Questions", "Requests", "History"],
    core: "Your AI system",
    output: "Quicker, consistent replies",
  },
  {
    key: "admin",
    index: "A-03",
    title: "Admin and back office",
    body: "The paperwork, data entry and repeated checks that quietly consume hours each week get handled in the background.",
    kicker: "Hours back, every week.",
    inputs: ["Documents", "Records", "Approvals"],
    core: "Your AI system",
    output: "Admin handled quietly",
  },
  {
    key: "knowledge",
    index: "A-04",
    title: "Knowledge and decisions",
    body: "What your business knows becomes easy to find and easy to act on, so decisions don't wait on one person.",
    kicker: "Answers without the digging.",
    inputs: ["Files", "Notes", "Numbers"],
    core: "Your AI system",
    output: "Clarity on demand",
  },
];

function Diagram({ area }: { area: Area }) {
  return (
    <svg viewBox="0 0 420 240" className="h-full w-full">
      {area.inputs.map((l, i) => (
        <g key={l}>
          <rect x="16" y={40 + i * 62} width="118" height="40" rx="12" fill="#FAFBFC" stroke="#E5E7EB" />
          <text x="75" y={65 + i * 62} textAnchor="middle" fontSize="12" fill="#475569">{l}</text>
          <path
            className="aisys-flow"
            style={{ animationDelay: `${i * 0.25}s` }}
            d={`M134 ${60 + i * 62} C 180 ${60 + i * 62}, 180 120, 224 120`}
            fill="none" stroke="#0033FF" strokeWidth="1.6" strokeDasharray="6 8"
          />
        </g>
      ))}
      <rect x="224" y="96" width="96" height="48" rx="14" fill="#0033FF" />
      <text x="272" y="125" textAnchor="middle" fontSize="12" fill="#fff">{area.core}</text>
      <path className="aisys-flow" d="M320 120 H366" fill="none" stroke="#0033FF" strokeWidth="1.6" strokeDasharray="6 8" />
      <circle className="aisys-pulse" cx="382" cy="120" r="10" fill="#AAFF00" stroke="#0033FF" />
      <text x="382" y="158" textAnchor="middle" fontSize="11" fill="#94A3B8">outcome</text>
    </svg>
  );
}

export function SystemsShowcase() {
  const [active, setActive] = useState(areas[0].key);
  const current = areas.find((a) => a.key === active)!;

  return (
    <section className="relative overflow-hidden bg-[#FAFBFC] px-6 py-32 md:py-[140px] text-[#0F172A]">
      <div aria-hidden className="svc-grid absolute inset-0 z-0" />
      <div aria-hidden className="svc-glow absolute inset-x-0 top-0 z-0 h-[420px]" />
      <div className="relative z-[1] mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="reveal inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-medium text-[#0033FF]">
            <span className="svc-dot h-1.5 w-1.5 rounded-full bg-[#0033FF]" />
            Where AI can help
          </span>
          <h2 className="reveal reveal-delay-1 mt-6 font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            Any part of the business. Wherever the repetition lives.
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-[1.05rem] leading-relaxed text-[#475569]">
            There's no fixed menu. We look at where your time actually goes, then build for that.
            These are simply the places we're asked most often.
          </p>
        </div>

        <div className="reveal reveal-delay-2 mt-12 grid gap-8 lg:grid-cols-[minmax(0,320px)_1fr]">
          <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {areas.map((a) => {
              const on = a.key === active;
              return (
                <button
                  key={a.key}
                  type="button"
                  onClick={() => setActive(a.key)}
                  onMouseEnter={() => setActive(a.key)}
                  className={`aisys-tab relative min-w-[220px] shrink-0 rounded-2xl border px-5 py-4 text-left transition-colors lg:min-w-0 ${
                    on
                      ? "border-[#0033FF]/30 bg-white text-[#0F172A]"
                      : "border-[#E5E7EB] bg-white/50 text-[#475569] hover:bg-white"
                  }`}
                >
                  <span className="font-display text-[0.7rem] tracking-[0.18em] text-[#94A3B8]">{a.index}</span>
                  <span className="mt-1 block font-display text-[1.05rem] font-semibold leading-snug">{a.title}</span>
                  <span
                    className="absolute bottom-0 left-5 right-5 h-[2px] origin-left bg-[#0033FF] transition-transform duration-500"
                    style={{ transform: `scaleX(${on ? 1 : 0})` }}
                  />
                </button>
              );
            })}
          </div>

          <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 md:p-10">
            <div key={current.key} className="aisys-swap">
              <div className="h-[240px] w-full">
                <Diagram area={current} />
              </div>
              <div className="mt-6 border-t border-[#E5E7EB] pt-6">
                <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">{current.title}</h3>
                <p className="mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-[#475569]">{current.body}</p>
                <p className="mt-3 text-sm font-medium text-[#0033FF]">{current.kicker}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
