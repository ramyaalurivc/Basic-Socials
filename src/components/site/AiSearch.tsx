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

const ROW = 96;
const VISIBLE = 5;
const CENTER = 2;
const TOTAL = queries.length;
const DURATION = 32; // slower, smoother
const PERIOD_MS = (DURATION * 1000) / TOTAL;
const START_INDEX = 1; // first centered active
const NEG_DELAY = ((START_INDEX - CENTER + TOTAL) % TOTAL) * (DURATION / TOTAL);

export function AiSearch() {
  const [active, setActive] = useState(START_INDEX);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % TOTAL);
    }, PERIOD_MS);
    return () => clearInterval(id);
  }, []);

  const containerH = ROW * VISIBLE;
  const list = [...queries, ...queries];

  return (
    <section id="ai" className="relative px-6 py-24 md:py-32 overflow-hidden">
      <style>{`
        @keyframes ai-scroll {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(0, -50%, 0); }
        }
        .ai-track {
          animation: ai-scroll ${DURATION}s linear infinite;
          animation-delay: -${NEG_DELAY}s;
          will-change: transform;
          backface-visibility: hidden;
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

        <div className="mt-12 mx-auto max-w-4xl reveal reveal-delay-3">
          <div
            className="relative rounded-[2rem] border border-white/25 bg-white/5 backdrop-blur-md overflow-hidden mx-auto"
            style={{ height: containerH }}
          >
            {/* Scrolling muted list */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="ai-track">
                {list.map((q, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-6"
                    style={{ height: ROW, opacity: 0.45 }}
                  >
                    <span className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center bg-white/10 text-white text-lg">
                      +
                    </span>
                    <span
                      className="flex-1 truncate text-left text-white text-[18px] leading-none"
                      style={{ fontWeight: 500 }}
                    >
                      {q}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fixed centered active pill */}
            <div
              className="pointer-events-none absolute left-4 right-4 flex items-center"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                height: ROW - 14,
              }}
            >
              <div
                className="flex w-full items-center gap-4 rounded-full bg-white pl-2 pr-2"
                style={{
                  height: "100%",
                  border: "2px solid #AAFF00",
                  boxShadow: "0 0 16px rgba(170,255,0,0.45)",
                }}
              >
                <span
                  className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-[#AAFF00] text-lg"
                  style={{ background: "#0033FF" }}
                >
                  ✦
                </span>
                <span
                  key={active}
                  className="flex-1 truncate text-left text-[18px] md:text-[20px] leading-none"
                  style={{
                    color: "#0033FF",
                    fontWeight: 600,
                    animation: "fadeIn .35s ease",
                  }}
                >
                  {queries[active]}
                </span>
                <span
                  className="h-11 w-11 shrink-0 rounded-full flex items-center justify-center text-white text-lg"
                  style={{ background: "#0033FF" }}
                >
                  ↑
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-white">
            {["ChatGPT", "Gemini", "Perplexity", "Claude", "Grok"].map((p) => (
              <span
                key={p}
                className="border border-white/70 px-4 py-1.5"
                style={{ borderRadius: 100 }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px);} to { opacity: 1; transform: translateY(0);} }
      `}</style>
    </section>
  );
}
