const services = [
  {
    n: "01",
    title: "Content Production",
    front: "Stories that build brands.",
    points: [
      "Brand Films",
      "Founder Content",
      "Product Shoots",
      "Podcast Production",
      "Event Coverage",
      "Social Media Content",
    ],
    tag: "Everything your brand needs to create content people remember.",
  },
  {
    n: "02",
    title: "AI Content",
    front: "Create beyond traditional production.",
    points: [
      "AI Product Photoshoots",
      "AI Brand Films",
      "AI Avatars",
      "AI UGC Creators",
      "AI Voiceovers",
      "Creative AI Campaigns",
    ],
    tag: "Next-generation content powered by AI.",
  },
  {
    n: "03",
    title: "AI Systems",
    front: "Automate. Scale. Grow.",
    points: [
      "AI Chatbots",
      "Business Automations",
      "CRM & Workflow Automation",
      "Lead Capture Systems",
      "AI Sales Assistants",
      "Internal AI Agents",
    ],
    tag: "Smart systems that work for your business 24/7.",
  },
  {
    n: "04",
    title: "Consulting",
    front: "Strategy before execution.",
    points: [
      "AI Visibility (AEO & GEO)",
      "Content Strategy",
      "Personal Branding",
      "Marketing Roadmaps",
      "Team Workshops",
      "Growth Consulting",
    ],
    tag: "Helping businesses become the brands people, and AI, recommend.",
  },
];

export function Services() {
  return (
    <section data-nav-theme="light" id="services" className="svc-section relative px-6 py-32 md:py-[160px] overflow-hidden bg-[#FAFBFC] text-[#0F172A]">
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -top-px left-0 w-full h-16 md:h-20 text-[#FAFBFC] z-[2]">
        <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill="currentColor" />
      </svg>
      <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -bottom-px left-0 w-full h-16 md:h-20 text-[#FAFBFC] rotate-180 z-[2]">
        <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill="currentColor" />
      </svg>
      {/* premium ambient background */}
      <div aria-hidden className="svc-grid absolute inset-0 z-0" />
      <div aria-hidden className="svc-glow absolute inset-x-0 top-0 h-[520px] z-0" />
      <div aria-hidden className="svc-noise absolute inset-0 z-0" />
      <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[6%] top-[18%] h-40 w-40 rounded-2xl border border-[#0F172A]/[0.04]" />
        <div className="absolute right-[8%] top-[30%] h-24 w-56 rounded-xl border border-[#0033FF]/[0.06]" />
        <div className="absolute left-[22%] bottom-[12%] h-28 w-28 rounded-xl border border-[#0F172A]/[0.03]" />
        <svg viewBox="0 0 200 200" className="absolute -left-6 top-6 h-52 w-52 text-[#0033FF]/[0.07]">
          <path d="M0 40 H90 V120 H160" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="90" cy="120" r="3" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 200 200" className="absolute -right-6 bottom-6 h-52 w-52 text-[#0033FF]/[0.07] rotate-180">
          <path d="M0 40 H90 V120 H160" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="90" cy="120" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl relative z-[1]">
        <div className="mb-16 md:mb-24 text-center mx-auto max-w-3xl">
          <span className="reveal inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-medium text-[#0033FF] shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <span className="svc-dot h-1.5 w-1.5 rounded-full bg-[#0033FF]" />
            Services
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,4.6vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.035em] reveal reveal-delay-1 text-[#0F172A]">
            Everything your business needs to grow.
          </h2>
          <p className="mt-6 text-[1.0625rem] leading-relaxed text-[#475569] reveal reveal-delay-2">
            From content production to AI-powered creativity, intelligent automation, and strategic
            consulting, we help businesses become the brands people, and AI, recommend.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div key={s.n} className={`svc-card flip rounded-[24px] h-[420px] reveal reveal-delay-${(i % 5) + 1}`}>
              <div className="flip-inner">
                <div className="flip-face bg-white border border-[#E5E7EB] rounded-[24px] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.10)]" style={{ padding: "36px" }}>
                  <div className="flex items-start justify-between">
                    <span className="svc-badge inline-flex h-9 min-w-9 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#FAFBFC] px-2 font-display text-sm text-[#0033FF]">
                      {s.n}
                    </span>
                    <span className="svc-dot h-2 w-2 rounded-full bg-[#0033FF]" />
                  </div>
                  <div>
                    <h3 className="font-display text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#0F172A]">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#475569]">{s.front}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-[#475569]">
                    <span>Hover for details</span>
                    <span className="svc-arrow text-[#0033FF]">→</span>
                  </div>
                </div>
                <div className="flip-face flip-back rounded-[24px] bg-[#0033FF] text-white border border-[#0033FF] shadow-[0_18px_44px_-18px_rgba(0,51,255,0.55)]" style={{ padding: "36px" }}>
                  <div className="flex items-start justify-between">
                    <span className="font-display text-sm opacity-70">{s.n}</span>
                    <span className="font-display text-sm">{s.title}</span>
                  </div>
                  <ul className="space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2 text-[0.8125rem] leading-snug">
                        <span className="opacity-70">→</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs opacity-85 font-medium leading-relaxed">{s.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}