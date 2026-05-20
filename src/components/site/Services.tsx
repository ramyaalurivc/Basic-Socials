import { SectionLabel } from "./SectionLabel";

const services = [
  {
    n: "01",
    title: "Branding",
    points: ["Logo & visual identity", "Brand guidelines", "Stationery & assets", "Company profile"],
    tag: "Look credible from day one.",
  },
  {
    n: "02",
    title: "Social Media",
    points: ["Handle creation & setup", "Content, creatives, reels", "Community management", "Online Reputation Management"],
    tag: "Full platform presence — handled.",
  },
  {
    n: "03",
    title: "Performance Marketing",
    points: ["Meta, Google, YouTube, LinkedIn ads", "WhatsApp & SMS marketing", "Email marketing", "Funnels & retargeting"],
    tag: "Your audience, always in the loop.",
  },
  {
    n: "04",
    title: "Video & AI Content",
    points: ["Reels & short-form video", "Full-length ad films", "AI-produced videos & product shoots", "AI avatars"],
    tag: "Real camera and AI — we nail them both.",
  },
  {
    n: "05",
    title: "Talent Management",
    points: ["Models for product shoots", "Creators for social content & UGC", "Talent for ad films", "AI avatars"],
    tag: "Everything a brand needs.",
  },
  {
    n: "06",
    title: "Consulting",
    points: ["Train your in-house team", "Provide our human resources", "Manage your brand end-to-end", "Regular audits"],
    tag: "So you can focus on your business.",
  },
];

export function Services() {
  return (
    <section id="services" className="px-6 py-24 md:py-32 bg-[var(--cream-deep)]">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          label="Services"
          headline={<>What <span className="italic font-medium text-muted-foreground">we</span> do.</>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s.n} className="flip h-[320px]">
              <div className="flip-inner">
                <div className="flip-face bg-card border border-border/60">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-sm text-muted-foreground">{s.n}</span>
                    <span className="h-2 w-2 rounded-full bg-accent" />
                  </div>
                  <h3 className="font-display text-[2rem] md:text-[2.3rem] font-semibold leading-[1] tracking-[-0.03em]">
                    {s.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Hover for details</span>
                    <span className="opacity-60">↗</span>
                  </div>
                </div>
                <div className="flip-face flip-back bg-foreground text-background border border-foreground">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-sm opacity-60">{s.n}</span>
                    <span className="font-display text-sm">{s.title}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm leading-snug">
                        <span className="text-accent">→</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs opacity-70">{s.tag}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}