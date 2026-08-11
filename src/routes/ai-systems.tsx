import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { NodeGraph } from "@/components/aisys/NodeGraph";
import { ProblemSplit } from "@/components/aisys/ProblemSplit";
import { SystemsShowcase } from "@/components/aisys/SystemsShowcase";
import { ProcessTimeline } from "@/components/aisys/ProcessTimeline";
import { StatStrip } from "@/components/aisys/StatStrip";
import { ClosingCta } from "@/components/aisys/ClosingCta";

const TITLE = "Custom AI Systems for Your Business | Basic Socials";
const DESC =
  "We understand how your business works, then design custom AI systems around it — simplifying repetitive work and improving how you operate.";

export const Route = createFileRoute("/ai-systems")({
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
  component: AiSystemsPage,
});

function AiSystemsPage() {
  useReveal();
  useLenis();

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main>
        {/* 1. Hero */}
        <section className="relative overflow-hidden pt-40 pb-28 md:pt-52 md:pb-40">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_20%,rgba(0,51,255,0.55),transparent_70%)]" />
            <div className="blob absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-[#AAFF00] opacity-20 blur-3xl" />
          </div>
          <NodeGraph className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-70" />

          <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
            <span className="pill reveal">
              <span className="h-2 w-2 rounded-full bg-[#AAFF00] animate-pulse" />
              AI Systems
            </span>
            <h1 className="reveal reveal-delay-1 mt-8 max-w-5xl font-display text-[clamp(2.4rem,6.6vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              AI built around{" "}
              <span className="italic font-medium grad-text">how you already work.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-6 max-w-2xl text-base md:text-lg text-white/70">
              AI isn't a product you install. We learn how your business runs, find where it makes
              the biggest difference, and build a system around it.
            </p>
            <a href="/#contact" className="btn-green reveal reveal-delay-3 mt-9">
              Book a Discovery Call →
            </a>
          </div>
        </section>

        {/* 2 */}
        <ProblemSplit />
        {/* 3 */}
        <SystemsShowcase />
        {/* 5 */}
        <ProcessTimeline />
        {/* 6 */}
        <StatStrip />
        {/* 7 */}
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}