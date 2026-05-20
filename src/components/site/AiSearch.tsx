import { useEffect, useState } from "react";

const queries = [
  "Best Cardiologist in Hyderabad",
  "Best branding agency near me",
  "Top social media agency in Hyderabad",
  "Best performance marketing team for D2C",
  "Best video production company in Hyderabad",
  "Top talent & UGC creators in India",
  "Best marketing consultant for startups",
  "Where to launch my fashion label",
];

export function AiSearch() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % queries.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const ROW = 64; // px row height
  const VISIBLE = 5; // odd number so middle is centered
  const CENTER = Math.floor(VISIBLE / 2);
  const containerH = ROW * VISIBLE;

  return (
    <section id="ai" className="relative px-6 py-24 md:py-32 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute top-10 left-1/4 h-[420px] w-[420px] rounded-full bg-[#AAFF00] opacity-20 blur-3xl" />
        <div className="blob absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-white opacity-15 blur-3xl" style={{ animationDelay: "-6s" }} />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <span className="pill reveal">
          <span className="h-2 w-2 rounded-full bg-[#AAFF00] animate-pulse" />
          AI Visibility · GEO
        </span>
        <h2 className="mt-6 font-display text-[clamp(2rem,5.5vw,4.4rem)] font-bold leading-[1] tracking-[-0.03em] reveal reveal-delay-1">
          Google is <span className="line-through opacity-60">outdated</span>.
          <br />
          Let <span className="italic font-medium grad-text">AI</span> suggest your brand.
        </h2>
        <p className="mt-5 text-white/70 max-w-2xl mx-auto reveal reveal-delay-2">
          Your future customers are asking ChatGPT, Gemini, and Perplexity. We make sure your brand is the answer.
        </p>

        <div className="mt-12 mx-auto max-w-3xl reveal reveal-delay-3">
          <div className="relative rounded-[2rem] glass-strong p-5 md:p-7 text-left">
            {/* Scrolling list viewport */}
            <div
              className="relative overflow-hidden"
              style={{
                height: containerH,
                maskImage:
                  "linear-gradient(to bottom, transparent 0, #000 18%, #000 82%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0, #000 18%, #000 82%, transparent 100%)",
              }}
            >
              {/* Fixed centered highlight strip (inside viewport, not masked because it sits on top) */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 rounded-2xl bg-white/95 border border-[#AAFF00] shadow-[0_0_40px_rgba(170,255,0,0.55)] z-10"
                style={{
                  height: ROW - 8,
                  top: CENTER * ROW + 4,
                }}
              />
              <div
                className="will-change-transform"
                style={{
                  transform: `translateY(${(CENTER - active) * ROW}px)`,
                  transition: "transform 1400ms cubic-bezier(0.65, 0, 0.35, 1)",
                }}
              >
                {queries.map((q, i) => {
                  const isActive = i === active;
                  return (
                    <div
                      key={q}
                      className="relative flex items-center gap-3 px-4 md:px-5 z-20"
                      style={{ height: ROW }}
                    >
                      <span
                        className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-sm transition-colors duration-700 ${
                          isActive ? "bg-[#0033FF] text-[#AAFF00]" : "bg-white/10 text-white/50"
                        }`}
                      >
                        {isActive ? "✦" : "+"}
                      </span>
                      <span
                        className={`flex-1 truncate font-medium leading-none transition-colors duration-700 ${
                          isActive ? "text-[#0033FF]" : "text-white/40"
                        }`}
                      >
                        {q}
                      </span>
                      {isActive && (
                        <span className="h-9 w-9 shrink-0 rounded-full bg-[#0033FF] text-[#AAFF00] flex items-center justify-center shadow-[0_0_20px_rgba(0,51,255,0.6)]">
                          ↑
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-white/60">
            <span className="rounded-full border border-white/15 px-3 py-1.5">ChatGPT</span>
            <span className="rounded-full border border-white/15 px-3 py-1.5">Gemini</span>
            <span className="rounded-full border border-white/15 px-3 py-1.5">Perplexity</span>
            <span className="rounded-full border border-white/15 px-3 py-1.5">Claude</span>
            <span className="rounded-full border border-white/15 px-3 py-1.5">Grok</span>
          </div>
        </div>
      </div>
    </section>
  );
}
