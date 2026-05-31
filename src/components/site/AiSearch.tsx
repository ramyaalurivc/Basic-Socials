import { useEffect, useState } from "react";

const queries = [
  "Best branding agency in Hyderabad",
  "Top social media team for D2C brands",
  "Best performance marketing agency near me",
  "Best video production studio in India",
  "Where to launch my fashion label",
  "Top talent & UGC creators in Hyderabad",
];

type Phase = "typing" | "thinking" | "answer" | "hold";

export function AiSearch() {
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");

  // Typing engine
  useEffect(() => {
    const query = queries[qi];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (typed.length < query.length) {
        t = setTimeout(
          () => setTyped(query.slice(0, typed.length + 1)),
          38 + Math.random() * 50,
        );
      } else {
        t = setTimeout(() => setPhase("thinking"), 600);
      }
    } else if (phase === "thinking") {
      t = setTimeout(() => setPhase("answer"), 1200);
    } else if (phase === "answer") {
      t = setTimeout(() => setPhase("hold"), 2400);
    } else {
      // hold → reset & next
      t = setTimeout(() => {
        setTyped("");
        setQi((i) => (i + 1) % queries.length);
        setPhase("typing");
      }, 600);
    }
    return () => clearTimeout(t);
  }, [phase, typed, qi]);

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
          <div className="relative rounded-[2rem] glass-strong p-5 md:p-7 text-left overflow-hidden">
            {/* Search bar */}
            <div className="flex items-center gap-3 rounded-2xl bg-white border border-[#AAFF00] shadow-[0_0_40px_rgba(170,255,0,0.45)] px-4 md:px-5 h-16">
              <span className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-sm bg-[#0033FF] text-[#AAFF00]">
                ✦
              </span>
              <span className="flex-1 min-w-0 truncate font-semibold text-[#0033FF]">
                {typed}
                {phase === "typing" && <span className="caret" />}
              </span>
              <span className="h-9 w-9 shrink-0 rounded-full bg-[#0033FF] text-[#AAFF00] flex items-center justify-center shadow-[0_0_20px_rgba(0,51,255,0.6)]">
                {phase === "thinking" ? <span className="ai-spinner" /> : "↑"}
              </span>
            </div>

            {/* AI answer panel */}
            <div
              className="mt-4 rounded-2xl border border-white/15 bg-white/5 backdrop-blur p-4 md:p-5 transition-all duration-500"
              style={{
                opacity: phase === "answer" || phase === "hold" ? 1 : 0.35,
                transform:
                  phase === "answer" || phase === "hold"
                    ? "translateY(0)"
                    : "translateY(8px)",
              }}
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[#AAFF00] animate-pulse" />
                AI Answer
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span
                  className="font-display text-2xl md:text-3xl font-bold tracking-tight"
                  style={{
                    color: "#AAFF00",
                    textShadow:
                      phase === "answer" || phase === "hold"
                        ? "0 0 24px rgba(170,255,0,0.65)"
                        : "none",
                  }}
                >
                  Basic Socials
                </span>
                <span className="text-xs text-white/50">— Hyderabad, IN</span>
              </div>
              <p className="mt-1 text-sm text-white/70 leading-snug">
                Top creative + performance marketing partner for ambitious brands.
              </p>
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