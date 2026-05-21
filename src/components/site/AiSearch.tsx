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

const ROW = 64;
const VISIBLE = 5;
const CENTER = Math.floor(VISIBLE / 2);
const DURATION = 1100;
const INTERVAL = 2600;

export function AiSearch() {
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), INTERVAL);
    return () => clearInterval(id);
  }, []);

  // Seamless loop: once we pass the original length, snap back invisibly
  useEffect(() => {
    if (step === queries.length) {
      const t = setTimeout(() => {
        setAnimate(false);
        setStep(0);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setAnimate(true)),
        );
      }, DURATION);
      return () => clearTimeout(t);
    }
  }, [step]);

  const list = [...queries, ...queries.slice(0, VISIBLE)];
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
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 rounded-2xl bg-white border border-[#AAFF00] shadow-[0_0_40px_rgba(170,255,0,0.55)]"
                style={{
                  height: ROW - 8,
                  top: CENTER * ROW + 4,
                  zIndex: 1,
                }}
              />
              <div
                className="relative will-change-transform"
                style={{
                  zIndex: 2,
                  transform: `translateY(${(CENTER - step) * ROW}px)`,
                  transition: animate
                    ? `transform ${DURATION}ms cubic-bezier(0.65, 0, 0.35, 1)`
                    : "none",
                }}
              >
                {list.map((q, i) => {
                  const isActive = i === step;
                  return (
                    <div
                      key={i}
                      className="relative flex items-center gap-3 px-4 md:px-5"
                      style={{ height: ROW }}
                    >
                      <span
                        className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-sm transition-colors duration-500 ${
                          isActive ? "bg-[#0033FF] text-[#AAFF00]" : "bg-white/10 text-white/50"
                        }`}
                      >
                        {isActive ? "✦" : "+"}
                      </span>
                      <span
                        className={`flex-1 truncate font-semibold leading-none transition-colors duration-500 ${
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