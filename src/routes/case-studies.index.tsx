import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { listCaseStudies } from "@/lib/content.functions";
import type { CaseStudyRow } from "@/lib/content.types";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";

const TITLE = "Case Studies · Basic Socials";
const DESC =
  "Real projects, real numbers. How we build content engines and AI systems for founders, institutions and D2C brands.";

export const Route = createFileRoute("/case-studies/")({
  loader: () => listCaseStudies(),
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://basicsocials.lovable.app/case-studies" }],
  }),
  component: CaseStudiesIndex,
  errorComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-white/70">
      Couldn't load case studies.
    </div>
  ),
});

function CaseStudiesIndex() {
  useLenis();
  useReveal();
  const items = Route.useLoaderData() as CaseStudyRow[];

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="pt-36 md:pt-44 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <span className="pill reveal">Case Studies</span>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.03em] reveal reveal-delay-1">
            The work, <span className="grad-text">in detail</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-white/70 text-lg reveal reveal-delay-2">
            Every project starts with how a business actually runs. Here's what that looks like
            in practice.
          </p>

          {items.length === 0 ? (
            <div className="glass mt-16 rounded-3xl p-12 text-center">
              <p className="font-display text-2xl font-bold text-white">Case studies loading…</p>
              <p className="mt-3 text-white/65">
                We're writing up the good ones. Want to be the next?
              </p>
              <a href="/#contact" className="btn-green mt-6 inline-flex">
                Start a project →
              </a>
            </div>
          ) : (
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {items.map((c, i) => (
                <Link
                  key={c.slug}
                  to="/case-studies/$slug"
                  params={{ slug: c.slug }}
                  className={`glass rounded-3xl p-7 reveal reveal-delay-${Math.min(i + 1, 5)} group block transition-transform hover:-translate-y-1`}
                >
                  {c.cover_image && (
                    <img
                      src={c.cover_image}
                      alt={c.title}
                      loading="lazy"
                      className="mb-5 h-52 w-full rounded-2xl object-cover"
                    />
                  )}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
                    {c.client_name && <span>{c.client_name}</span>}
                    {c.industry && (
                      <>
                        <span>·</span>
                        <span>{c.industry}</span>
                      </>
                    )}
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white group-hover:text-[#AAFF00] transition-colors">
                    {c.title}
                  </h2>
                  <p className="mt-3 text-white/70 leading-relaxed">{c.overview}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-[#AAFF00] text-sm font-semibold">
                    Read case study →
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
