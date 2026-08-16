import { useEffect, useState } from "react";

const convos = [
  {
    q: "Best Gynecologist in Hyderabad",
    recs: [
      { n: "Dr. A. — Women's Health Clinic", t: "Jubilee Hills · 15+ yrs experience" },
      { n: "City Care Women's Hospital", t: "Banjara Hills · Highly reviewed" },
      { n: "Dr. M. — Maternity Specialist", t: "Gachibowli · Same-day slots" },
    ],
  },
  {
    q: "Top 5 Interior Designers in Hyderabad",
    recs: [
      { n: "Studio Nine Interiors", t: "Turnkey homes · Modern minimal" },
      { n: "Form & Frame Design Co.", t: "Luxury residential · 8 yrs" },
      { n: "The Layout Studio", t: "Apartments & villas · Hyderabad" },
    ],
  },
  {
    q: "Best CA Firms in Hyderabad",
    recs: [
      { n: "Nova & Associates", t: "Startups · Tax & compliance" },
      { n: "Ledgerline Advisory", t: "GST, audits, ROC filings" },
      { n: "Sterling Accountancy", t: "SMEs · 20 yrs practice" },
    ],
  },
  {
    q: "Top Law Firms in Hyderabad",
    recs: [
      { n: "Meridian Legal Partners", t: "Corporate & contracts" },
      { n: "Anchor Law Chambers", t: "Property & civil disputes" },
      { n: "Kestrel Advocates", t: "Startup & IP advisory" },
    ],
  },
  {
    q: "Best Real Estate Company in Hyderabad",
    recs: [
      { n: "Skyline Realty Group", t: "Villas & gated communities" },
      { n: "Urban Nest Properties", t: "Rentals & resale · West HYD" },
      { n: "Northline Estates", t: "Commercial leasing" },
    ],
  },
  {
    q: "Top Rated Restaurants in Hyderabad",
    recs: [
      { n: "The Copper Table", t: "Modern Indian · Jubilee Hills" },
      { n: "Saffron & Smoke", t: "Biryani & grills · 4.7★" },
      { n: "Terrace 21", t: "Rooftop dining · Continental" },
    ],
  },
  {
    q: "Best Resorts Near Bangalore",
    recs: [
      { n: "Silver Pine Retreat", t: "90 mins away · Lakeside" },
      { n: "Wildgrass Resort", t: "Weekend stays · Family friendly" },
      { n: "Hillfold Estate", t: "Boutique · Nandi Hills" },
    ],
  },
];

const THINKING = ["Thinking…", "Analyzing recommendations…", "Comparing top options…"];

type Phase = "typing" | "thinking" | "answer" | "clear";

export function AiSearch() {
  const [ci, setCi] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [thought, setThought] = useState(0);
  const [shown, setShown] = useState(0);

  const convo = convos[ci];

  useEffect(() => {
    const query = convo.q;
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (typed.length < query.length) {
        t = setTimeout(() => setTyped(query.slice(0, typed.length + 1)), 34 + Math.random() * 45);
      } else {
        t = setTimeout(() => setPhase("thinking"), 550);
      }
    } else if (phase === "thinking") {
      if (thought < THINKING.length - 1) {
        t = setTimeout(() => setThought((n) => n + 1), 750);
      } else {
        t = setTimeout(() => setPhase("answer"), 750);
      }
    } else if (phase === "answer") {
      if (shown < convo.recs.length) {
        t = setTimeout(() => setShown((n) => n + 1), 420);
      } else {
        t = setTimeout(() => setPhase("clear"), 2800);
      }
    } else {
      t = setTimeout(() => {
        setTyped("");
        setThought(0);
        setShown(0);
        setCi((i) => (i + 1) % convos.length);
        setPhase("typing");
      }, 420);
    }
    return () => clearTimeout(t);
  }, [phase, typed, thought, shown, convo, ci]);

  const clearing = phase === "clear";

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
          <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-4 md:p-5 text-left backdrop-blur-xl">
            {/* prompt row */}
            <div className="flex items-center gap-3 rounded-2xl bg-white border border-[#AAFF00] shadow-[0_0_50px_rgba(170,255,0,0.35)] px-4 md:px-5 h-16">
              <span className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-sm bg-[#0033FF] text-[#AAFF00]">
                ✦
              </span>
              <span className="flex-1 min-w-0 truncate font-semibold text-[#0033FF] text-base md:text-lg">
                {typed}
                {phase === "typing" && <span className="caret" />}
              </span>
              <span className="h-10 w-10 shrink-0 rounded-full bg-[#0033FF] text-[#AAFF00] flex items-center justify-center shadow-[0_0_20px_rgba(0,51,255,0.6)]">
                {phase === "thinking" ? <span className="ai-spinner" /> : "↑"}
              </span>
            </div>

            {/* conversation */}
            <div
              className="min-h-[266px] px-1 pt-5 transition-opacity duration-300"
              style={{ opacity: clearing ? 0 : 1 }}
            >
              {phase === "thinking" && (
                <div className="flex items-center gap-3 text-sm text-white/70 transition-all duration-300">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-[#AAFF00] animate-pulse"
                        style={{ animationDelay: `${d * 160}ms` }}
                      />
                    ))}
                  </span>
                  <span className="animate-pulse">{THINKING[thought]}</span>
                </div>
              )}

              {phase === "answer" && (
                <div>
                  <p className="animate-fade-in text-sm md:text-base text-white/80">
                    Here are a few highly recommended businesses based on your request.
                  </p>
                  <div className="mt-4 space-y-2.5">
                    {convo.recs.slice(0, shown).map((r, i) => (
                      <div
                        key={r.n}
                        className="animate-fade-in flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3 transition-colors duration-300 hover:border-[#AAFF00]/40"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#0033FF]/40 text-xs font-semibold text-[#AAFF00]">
                          {i + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-white">{r.n}</span>
                          <span className="block truncate text-xs text-white/55">{r.t}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
