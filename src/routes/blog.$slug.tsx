import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getPostBySlug } from "@/lib/content.functions";
import type { PostRow } from "@/lib/content.types";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";
import { useState } from "react";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const result = await getPostBySlug({ data: { slug: params.slug } });
    if (!result.post) throw notFound();
    return result;
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    const url = `https://basicsocials.lovable.app/blog/${params.slug}`;
    if (!post) return { meta: [{ title: "Post not found · Basic Socials" }] };
    const image = post.og_image || post.featured_image;
    return {
      meta: [
        { title: `${post.seo_title || post.title} · Basic Socials` },
        { name: "description", content: post.meta_description || post.excerpt },
        { property: "og:title", content: post.seo_title || post.title },
        { property: "og:description", content: post.meta_description || post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        ...(post.published_at
          ? [{ property: "article:published_time", content: post.published_at }]
          : []),
        { property: "article:author", content: post.author },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.seo_title || post.title },
        { name: "twitter:description", content: post.meta_description || post.excerpt },
        ...(image && image.startsWith("https://")
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.meta_description || post.excerpt,
            datePublished: post.published_at,
            author: { "@type": "Organization", name: post.author },
            publisher: {
              "@type": "Organization",
              name: "Basic Socials",
              url: "https://basicsocials.lovable.app/",
            },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  component: BlogPost,
  errorComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-white/70">
      Couldn't load this article.
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <p className="text-white/70">Post not found.</p>
        <Link to="/blog" className="btn-green mt-6 inline-flex">
          Back to blog
        </Link>
      </div>
    </div>
  ),
});

function BlogPost() {
  useLenis();
  useReveal();
  const { post, related } = Route.useLoaderData() as { post: PostRow; related: PostRow[] };
  const url = `https://basicsocials.lovable.app/blog/${post!.slug}`;
  const linkedInShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const twitterShare = `https://twitter.com/intent/tweet?text=${encodeURIComponent(post!.title)}&url=${encodeURIComponent(url)}`;
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="pt-36 md:pt-44 pb-24">
        <article className="mx-auto max-w-3xl px-6">
          <Link to="/blog" className="text-white/60 hover:text-white text-sm ulink">
            ← All articles
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-white/60">
            {post!.tags.map((t) => (
              <span
                key={t}
                className="uppercase tracking-wider border border-white/15 rounded-full px-2.5 py-1"
              >
                {t}
              </span>
            ))}
            <span>·</span>
            <time>
              {new Date(post!.published_at ?? post!.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
            <span>·</span>
            <span>{post!.read_minutes} min read</span>
          </div>

          <h1 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.02] tracking-[-0.03em]">
            {post!.title}
          </h1>
          <p className="mt-5 text-white/75 text-lg leading-relaxed">{post!.excerpt}</p>

          {post!.featured_image && (
            <img
              src={post!.featured_image}
              alt={post!.title}
              className="mt-8 w-full rounded-3xl border border-white/12 object-cover"
            />
          )}

          <div className="mt-8 flex flex-wrap items-center gap-2">
            <a href={linkedInShare} target="_blank" rel="noopener noreferrer" className="btn-green !py-2.5 !px-4 text-sm">
              Share on LinkedIn
            </a>
            <a href={twitterShare} target="_blank" rel="noopener noreferrer" className="btn-dark !py-2.5 !px-4 text-sm">
              Share on X
            </a>
            <button onClick={copy} className="btn-dark !py-2.5 !px-4 text-sm">
              {copied ? "Link copied ✓" : "Copy link"}
            </button>
          </div>

          <div className="mt-10 border-t border-white/10" />

          <div className="prose-site mt-2" dangerouslySetInnerHTML={{ __html: post!.content }} />

          <div className="mt-16 glass rounded-3xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-white">Found this useful?</h3>
            <p className="mt-2 text-white/70 text-sm">
              Share it with your network — or talk to us about your brand.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <a href={linkedInShare} target="_blank" rel="noopener noreferrer" className="btn-green !py-2.5 !px-4 text-sm">
                Post to LinkedIn
              </a>
              <a href="/#contact" className="btn-dark !py-2.5 !px-4 text-sm">
                Start a project
              </a>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <h3 className="font-display text-xl font-bold text-white">Keep reading</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/blog/$slug"
                    params={{ slug: r.slug }}
                    className="glass rounded-2xl p-5 hover:-translate-y-1 transition-transform"
                  >
                    <p className="text-xs text-white/60">{r.read_minutes} min read</p>
                    <p className="mt-2 font-display text-lg font-bold text-white">{r.title}</p>
                    <p className="mt-2 text-sm text-white/70">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
