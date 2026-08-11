import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { RolesCarousel } from "@/components/careers/RolesCarousel";

const TITLE = "Careers | Basic Socials";
const DESC =
  "Join a small, AI-first creative team in Hyderabad. Open roles for social media interns, video editors, screen presenters and content creators.";

export const Route = createFileRoute("/careers/")({
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
  component: CareersPage,
});

const values = [
  { t: "Ownership", d: "You run your work end to end. No one hovering, no one taking credit." },
  { t: "AI-first", d: "Every workflow here is built with AI. You'll learn tools most teams haven't touched." },
  { t: "Ship fast", d: "Ideas become live work in days. We'd rather publish and learn than plan forever." },
  { t: "Zero politics", d: "Small team, direct conversations, no ladder to climb before your ideas count." },
  { t: "Learn constantly", d: "Branding, editing, automation, strategy. You'll leave with range, not one skill." },
  { t: "Real impact", d: "Everything you make goes out to real brands with real audiences. Nothing sits in a folder." },
];

function applyHref(role: string) {
  return `mailto:socials@basicsocials.com?subject=${encodeURIComponent(`Application — ${role}`)}`;
}

function CareersPage() {
  useReveal();
  useLenis();

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="blob absolute -top-32 left-1/4 h-[440px] w-[440px] rounded-full bg-[#AAFF00] opacity-25 blur-3xl" />
            <div className="blob absolute top-32 -right-24 h-[420px] w-[420px] rounded-full bg-white opacity-15 blur-3xl" style={{ animationDelay: "-4s" }} />
          </div>
          <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
            <span className="pill reveal">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#AAFF00]" />
              We're hiring
            </span>
            <h1 className="reveal reveal-delay-1 mt-8 font-display text-[clamp(2.6rem,7vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.045em]">
              Join Basic Socials.{" "}
              <span className="italic font-medium grad-text">Build cool things.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-7 max-w-xl text-lg leading-relaxed text-white/70">
              Solve hard problems. Learn faster than anywhere else. A small team using AI and
              creativity to grow real businesses.
            </p>
            <a href="#openings" className="btn-green reveal reveal-delay-3 mt-10">
              See open roles →
            </a>
          </div>
        </section>

        {/* Why work here */}
        <section className="relative px-6 py-24 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <span className="pill reveal">Why work here</span>
              <h2 className="reveal reveal-delay-1 mt-6 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em]">
                Small team. <span className="italic font-medium grad-text">Big ideas.</span>
              </h2>
              <p className="reveal reveal-delay-2 mt-5 text-lg leading-relaxed text-white/70">
                You won't be the person who fetches files. You'll be the person whose work goes live.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {values.map((v, i) => (
                <div
                  key={v.t}
                  className={`reveal reveal-delay-${(i % 4) + 1} group rounded-3xl border border-white/12 bg-white/[0.06] p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#AAFF00]/40 hover:bg-white/10`}
                >
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#AAFF00] shadow-[0_0_12px_#AAFF00]" />
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
                    {v.t}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-white/65">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Openings */}
        <section
          id="openings"
          data-nav-theme="light"
          className="relative overflow-hidden bg-[#FAFAFA] px-6 py-28 text-[#0F172A] md:py-36"
        >
          <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -top-px left-0 h-16 w-full text-[#FAFAFA] md:h-20">
            <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill="currentColor" />
          </svg>
          <div className="relative mx-auto max-w-6xl">
            <div className="max-w-2xl">
              <span className="reveal inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-medium text-[#0033FF]">
                Current openings
              </span>
              <h2 className="reveal reveal-delay-1 mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-[#0F172A]">
                Roles we're filling right now.
              </h2>
            </div>

            <RolesCarousel />
          </div>
          <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -bottom-px left-0 h-16 w-full rotate-180 text-[#FAFAFA] md:h-20">
            <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill="currentColor" />
          </svg>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden px-6 py-28 md:py-36">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="blob absolute left-1/3 top-0 h-[420px] w-[420px] rounded-full bg-[#AAFF00] opacity-20 blur-3xl" />
          </div>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="reveal font-display text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.02] tracking-[-0.035em]">
              Don't see your role?{" "}
              <span className="italic font-medium grad-text">Pitch yourself.</span>
            </h2>
            <p className="reveal reveal-delay-1 mt-5 text-lg text-white/70">
              We love people who create opportunities instead of waiting for one to be posted.
            </p>
            <a href={applyHref("Pitching myself")} className="btn-green reveal reveal-delay-2 mt-9">
              socials@basicsocials.com →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
