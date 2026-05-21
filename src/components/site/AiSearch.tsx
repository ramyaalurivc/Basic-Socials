import { useEffect, useState } from "react";

const queries = [
  "Best cardiologist in Hyderabad",
  "Top NEET coaching centres near Kukatpally",
  "Top 5 wedding jewellery shops near me",
  "Best playschool near Kondapur",
  "Best cafe near Jubilee Hills",
  "Top sweet shops near me",
  "Best affordable apartments in Hyderabad",
  "Top gyms and fitness centres near me in Hyderabad",
  "Best skin clinic near Banjara Hills",
  "Top saree shops in Hyderabad",
  "Top interior designers in Hyderabad",
  "Best chartered accountant near Madhapur",
  "Top wedding photographers in Hyderabad",
  "Best biryani place near Secunderabad",
];

const ROW = 56;
const VISIBLE = 5;
const CENTER = 2; // center row index in visible window
const DURATION = 18; // seconds for full loop
const TOTAL = queries.length;
const PERIOD_MS = (DURATION * 1000) / TOTAL; // time per item
// Start so question 4 (index 3) sits at the center row (index 2)
const START_INDEX = 3;
const NEG_DELAY = ((START_INDEX - CENTER) / TOTAL) * DURATION;

export function AiSearch() {
  // Track which question is currently centered, for active styling
  const [active, setActive] = useState(START_INDEX);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % TOTAL);
    }, PERIOD_MS);
    return () => clearInterval(id);
  }, []);

  const containerH = ROW * VISIBLE;
  const list = [...queries, ...queries]; // duplicate for seamless loop

  return (
    <section id="ai" className="relative px-6 py-24 md:py-32 overflow-hidden">
      <style>{`
        @keyframes ai-scroll {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .ai-track {
          animation: ai-scroll ${DURATION}s linear infinite;
          animation-delay: -${NEG_DELAY}s;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-track { animation: none; }
        }
      `}</style>

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute top-10 left-1/4 h-[420px] w-[420px] rounded-full bg-[#AAFF00] opacity-20 blur-3xl" />
        <div
          className="blob absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-white opacity-15 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
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
          <div
            className="relative overflow-hidden mx-auto"
            style={{ height: containerH, maxWidth: 640 }}
          >
            <div className="ai-track">
              {list.map((q, i) => {
                const isActive = i % TOTAL === active;
                return (
                  <div
                    key={i}
                    className="flex items-center px-2"
                    style={{ height: ROW }}
                  >
                    {isActive ? (
                      <div
                        className="flex w-full items-center gap-3 rounded-full bg-white pl-2 pr-2"
                        style={{
                          height: ROW - 8,
                          border: "2px solid #AAFF00",
                          boxShadow: "0 0 12px rgba(170,255,0,0.4)",
                        }}
                      >
                        <span
                          className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-white"
                          style={{ background: "#0033FF" }}
                        >
                          ✦
                        </span>
                        <span
                          className="flex-1 truncate text-left text-[16px] leading-none"
                          style={{ color: "#0033FF", fontWeight: 600 }}
                        >
                          {q}
                        </span>
                        <span
                          className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center text-white"
                          style={{ background: "#0033FF" }}
                        >
                          ↑
                        </span>
                      </div>
                    ) : (
                      <div
                        className="flex w-full items-center gap-3 px-2"
                        style={{ opacity: 0.45 }}
                      >
                        <span className="h-9 w-9 shrink-0 rounded-full flex items-center justify-center bg-white/10 text-white/80">
                          +
                        </span>
                        <span
                          className="flex-1 truncate text-left text-white text-[16px] leading-none"
                          style={{ fontWeight: 500 }}
                        >
                          {q}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-white">
            {["ChatGPT", "Gemini", "Perplexity", "Claude", "Grok"].map((p) => (
              <span
                key={p}
                className="border border-white px-4 py-1.5"
                style={{ borderRadius: 100 }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
