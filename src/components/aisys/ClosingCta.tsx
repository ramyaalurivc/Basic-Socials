import { useRef } from "react";

export function ClosingCta() {
  const btnRef = useRef<HTMLAnchorElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = btnRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const dist = Math.hypot(dx, dy);
    if (dist > 180) {
      el.style.transform = "";
      return;
    }
    const k = 0.22;
    el.style.transform = `translate(${Math.max(-24, Math.min(24, dx * k))}px, ${Math.max(-16, Math.min(16, dy * k))}px)`;
  };

  const reset = () => {
    if (btnRef.current) btnRef.current.style.transform = "";
  };

  return (
    <section
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative overflow-hidden px-6 py-32 md:py-[140px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#AAFF00] opacity-20 blur-3xl" />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="reveal font-display text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[1.05] tracking-[-0.035em]">
          Not sure where AI fits in your business?
        </h2>
        <p className="reveal reveal-delay-1 mt-5 text-base md:text-lg text-white/75">
          That's the part we figure out with you. Start with a conversation, not a tool.
        </p>
        <div className="mt-10 flex justify-center">
          <a ref={btnRef} href="/#contact" className="btn-green magnetic reveal reveal-delay-2">
            Book a Discovery Call →
          </a>
        </div>
      </div>
    </section>
  );
}