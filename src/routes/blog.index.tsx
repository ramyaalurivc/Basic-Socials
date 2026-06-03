import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { posts } from "@/content/posts";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog · Basic Socials — Marketing, AI & LinkedIn insights" },
      {
        name: "description",
        content:
          "Tactics, frameworks, and case notes from Basic Socials on AI search, LinkedIn content, performance marketing and video.",
      },
      { property: "og:title", content: "Basic Socials Blog" },
      {
        property: "og:description",
        content:
          "Tactics and frameworks on AI search, LinkedIn content, performance marketing and video.",
      },
      { property: "og:url", content: "https://basicsocials.lovable.app/blog" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://basicsocials.lovable.app/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  useLenis();
  useReveal();
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="pt-36 md:pt-44 pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <span className="pill reveal">The Blog</span>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.03em] reveal reveal-delay-1">
            Notes from the <span className="grad-text">studio</span>.
          </h1>
          <p className="mt-5 max-w-2xl text-white/70 text-lg reveal reveal-delay-2">
            Frameworks, opinions and case notes on AI search, LinkedIn growth, performance
            marketing and video.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {sorted.map((p, i) => (
              <Link
                key={p.slug}
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className={`glass rounded-3xl p-7 reveal reveal-delay-${Math.min(i + 1, 5)} group block transition-transform hover:-translate-y-1`}
              >
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <time>{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" })}</time>
                  <span>·</span>
                  <span>{p.readMinutes} min read</span>
                </div>
                <h2 className="mt-4 font-display text-2xl md:text-[1.7rem] font-bold tracking-tight text-white leading-tight group-hover:text-[#AAFF00] transition-colors">
                  {p.title}
                </h2>
                <p className="mt-3 text-white/70 text-[0.98rem] leading-relaxed">{p.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[0.7rem] uppercase tracking-wider text-white/60 border border-white/15 rounded-full px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-1 text-[#AAFF00] text-sm font-semibold">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}