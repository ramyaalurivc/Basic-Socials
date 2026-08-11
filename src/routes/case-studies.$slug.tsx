import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getCaseStudyBySlug } from "@/lib/content.functions";
import type { CaseStudyRow } from "@/lib/content.types";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: async ({ params }) => {
    const item = await getCaseStudyBySlug({ data: { slug: params.slug } });
    if (!item) throw notFound();
    return item;
  },
  head: ({ params, loaderData }) => {
    const c = loaderData;
    const url = `https://basicsocials.lovable.app/case-studies/${params.slug}`;
    if (!c) return { meta: [{ title: "Case study not found · Basic Socials" }] };
    const image = c.og_image || c.cover_image;
    return {
      meta: [
        { title: `${c.seo_title || c.title} · Basic Socials` },
        { name: "description", content: c.meta_description || c.overview },
        { property: "og:title", content: c.seo_title || c.title },
        { property: "og:description", content: c.meta_description || c.overview },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image && image.startsWith("https://")
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CaseStudyPage,
  errorComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-white/70">
      Couldn't load this case study.
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <p className="text-white/70">Case study not found.</p>
        <Link to="/case-studies" className="btn-green mt-6 inline-flex">
          All case studies
        </Link>
      </div>
    </div>
  ),
});

function Block({ title, html }: { title: string; html: string }) {
  if (!html?.trim()) return null;
  return (
    <section className="reveal mt-12">
      <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
      <div className="prose-site mt-3" dangerouslySetInnerHTML={{ __html: html }} />
    </section>
  );
}

function CaseStudyPage() {
  useLenis();
  useReveal();
  const c = Route.useLoaderData() as CaseStudyRow;

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="pt-36 md:pt-44 pb-24">
        <article className="mx-auto max-w-3xl px-6">
          <Link to="/case-studies" className="text-white/60 hover:text-white text-sm ulink">
            ← All case studies
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/60">
            {c.client_name && <span>{c.client_name}</span>}
            {c.industry && (
              <>
                <span>·</span>
                <span>{c.industry}</span>
              </>
            )}
          </div>
          <h1 className="mt-4 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            {c.title}
          </h1>
          <p className="mt-5 text-white/75 text-lg leading-relaxed">{c.overview}</p>

          {c.cover_image && (
            <img
              src={c.cover_image}
              alt={c.title}
              className="mt-8 w-full rounded-3xl border border-white/12 object-cover"
            />
          )}

          <Block title="The challenge" html={c.challenge} />
          <Block title="The solution" html={c.solution} />
          <Block title="Process" html={c.process} />
          <Block title="Results" html={c.results} />

          {c.technologies.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-bold text-white">Tools & tech</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {c.images.length > 0 && (
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {c.images.map((src) => (
                <img key={src} src={src} alt={c.title} loading="lazy" className="rounded-2xl border border-white/12" />
              ))}
            </div>
          )}

          {c.video_url && (
            <div className="mt-12 aspect-video overflow-hidden rounded-3xl border border-white/12">
              <iframe
                src={c.video_url}
                title={`${c.title} video`}
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          )}

          {c.testimonial_quote && (
            <blockquote className="glass mt-12 rounded-3xl p-8">
              <p className="font-display text-xl leading-relaxed text-white">"{c.testimonial_quote}"</p>
              {c.testimonial_author && (
                <footer className="mt-4 text-sm text-white/60">— {c.testimonial_author}</footer>
              )}
            </blockquote>
          )}

          <div className="mt-16 glass rounded-3xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-white">
              {c.cta_title || "Want results like these?"}
            </h3>
            <p className="mt-2 text-white/70 text-sm">
              {c.cta_body || "Tell us how your business runs. We'll show you what we'd build."}
            </p>
            <a href="/#contact" className="btn-green mt-6 inline-flex">
              Start a project →
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
