import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

const TITLE = "About Basic Socials | Content + AI Studio in Hyderabad";
const DESC =
  "Basic Socials is a creative marketing and AI systems studio in Hyderabad. We build content that gets brands noticed and AI systems that keep businesses running.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const beliefs = [
  { t: "Strategy before output", d: "We understand the business first. The content and the systems come after, not the other way around." },
  { t: "Built, not templated", d: "Nothing we hand over is a copy of the last client's work. Everything is shaped around how you actually operate." },
  { t: "Creative + technical", d: "One team that can shoot a campaign and wire up the automation behind it. That combination is rare on purpose." },
  { t: "Long-term partners", d: "We stay after launch, refine what works and cut what doesn't. Momentum beats a one-off deliverable." },
];

function AboutPage() {
  useReveal();
  useLenis();

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main>
        <section className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="blob absolute -top-32 left-1/4 h-[440px] w-[440px] rounded-full bg-[#AAFF00] opacity-25 blur-3xl" />
            <div className="blob absolute top-32 -right-24 h-[420px] w-[420px] rounded-full bg-white opacity-15 blur-3xl" style={{ animationDelay: "-4s" }} />
          </div>
          <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
            <span className="pill reveal">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#AAFF00]" />
              About us
            </span>
            <h1 className="reveal reveal-delay-1 mt-8 font-display text-[clamp(2.4rem,6.4vw,5.2rem)] font-bold leading-[0.96] tracking-[-0.045em]">
              A content and AI studio{" "}
              <span className="italic font-medium grad-text">out of Hyderabad.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
              Basic Socials helps businesses get noticed and stay organised — content, video and
              social on one side, custom AI systems on the other.
            </p>
          </div>
        </section>

        <section className="relative px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <span className="pill reveal">What we believe</span>
              <h2 className="reveal reveal-delay-1 mt-6 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em]">
                Fewer templates.{" "}
                <span className="italic font-medium grad-text">More thinking.</span>
              </h2>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              {beliefs.map((b, i) => (
                <div
                  key={b.t}
                  className={`reveal reveal-delay-${(i % 4) + 1} rounded-[24px] border border-white/12 bg-white/[0.05] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#AAFF00]/40 hover:bg-white/[0.08]`}
                >
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#AAFF00] shadow-[0_0_12px_#AAFF00]" />
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">{b.t}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/65">{b.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-6 py-28 md:py-36">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="blob absolute left-1/3 top-0 h-[420px] w-[420px] rounded-full bg-[#AAFF00] opacity-20 blur-3xl" />
          </div>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="reveal font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              Want to see what this looks like{" "}
              <span className="italic font-medium grad-text">for your business?</span>
            </h2>
            <a href="/#contact" className="btn-green reveal reveal-delay-2 mt-9">
              Book a Discovery Call →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
