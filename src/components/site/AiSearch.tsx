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

const ROW = 64;
const VISIBLE = 5;
const CENTER = Math.floor(VISIBLE / 2); // 2
const SECONDS_PER_ITEM = 2.4;
const TOTAL = queries.length;
const DURATION = TOTAL * SECONDS_PER_ITEM;

export function AiSearch() {
  const containerH = ROW * VISIBLE;
  // Render two copies for seamless loop
  const list = [...queries, ...queries];

  return (
    <section id="ai" className="relative px-6 py-24 md:py-32 overflow-hidden">
      <style>{`
        @keyframes ai-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-${TOTAL * ROW}px); }
        }
        .ai-scroll-track {
          animation: ai-scroll ${DURATION}s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .ai-scroll-track { animation: none; }
        }
      `}</style>

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
              style={{ height: containerH }}
            >
              {/* Highlight box — tight acid-green border only */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-0 right-0 rounded-2xl"
                style={{
                  height: ROW - 8,
                  top: CENTER * ROW + 4,
                  zIndex: 1,
                  background: "rgba(255,255,255,0.06)",
                  boxShadow: "0 0 0 2px #AAFF00",
                }}
              />
              <div
                className="ai-scroll-track relative will-change-transform"
                style={{ zIndex: 2 }}
              >
                {list.map((q, i) => {
                  // Active is whichever sits at CENTER row at any moment.
                  // For visual styling, we mark items based on position within the visible window using JS isn't possible without state; instead we style all uniformly muted, and the highlight box marks the active one. To get the "active" look, we use a CSS approach: difficult without state.
                  // Simpler: keep all items same style but ensure the centered one reads against the highlight box.
                  return (
                    <div
                      key={i}
                      className="relative flex items-center gap-3 px-4 md:px-5"
                      style={{ height: ROW }}
                    >
                      <span className="h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-sm bg-white/10 text-white/70">
                        +
                      </span>
                      <span className="flex-1 truncate font-semibold leading-none text-white/85">
                        {q}
                      </span>
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
