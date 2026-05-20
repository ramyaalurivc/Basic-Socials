import { SectionLabel } from "./SectionLabel";
import { useRef } from "react";

const work = [
  { tag: "Branding", title: "Identity for a wellness studio", color: "#AAFF00" },
  { tag: "Performance", title: "3.2× ROAS for D2C fashion", color: "#FFFFFF" },
  { tag: "Video & AI", title: "Ad film for an EdTech launch", color: "#AAFF00" },
  { tag: "Social", title: "Real estate handle, 0 → 48k", color: "#FFFFFF" },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionLabel
          label="Our Portfolio"
          headline={<>We let our <span className="italic font-medium grad-text">work</span> speak.</>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {work.map((w, i) => (
            <TiltCard key={i} index={i} {...w} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TiltCard({ tag, title, color, index }: { tag: string; title: string; color: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`reveal reveal-delay-${index + 1} group relative aspect-[4/3] overflow-hidden rounded-3xl glass cursor-pointer transition-transform duration-300 will-change-transform`}
    >
      <div
        className="absolute inset-0 transition-opacity duration-700 opacity-60 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 80% at var(--mx,20%) var(--my,10%), ${color}55, transparent 55%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(300px 200px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.18), transparent 60%)`,
        }}
      />
      <div className="relative h-full p-7 flex flex-col justify-between">
        <span className="pill self-start">{tag}</span>
        <div className="flex items-end justify-between">
          <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight max-w-[80%] text-white">
            {title}
          </h3>
          <span className="text-2xl text-[#AAFF00] opacity-70 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition">↗</span>
        </div>
      </div>
    </div>
  );
}