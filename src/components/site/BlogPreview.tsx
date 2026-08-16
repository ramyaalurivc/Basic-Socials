import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { listPosts } from "@/lib/content.functions";

export function BlogPreview() {
  const { data } = useQuery({ queryKey: ["posts", "latest"], queryFn: () => listPosts() });
  const latest = (data ?? []).slice(0, 3);

  return (
    <section id="blog" className="relative px-6 py-24 md:py-32 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute top-20 right-10 h-[360px] w-[360px] rounded-full bg-[#AAFF00] opacity-10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="pill reveal">The Blog</span>
            <h2 className="mt-5 font-display text-[clamp(2rem,5.5vw,4.4rem)] font-bold leading-[1] tracking-[-0.03em] reveal reveal-delay-1">
              Fresh from the <span className="italic font-medium grad-text">studio</span>.
            </h2>
            <p className="mt-4 max-w-xl text-white/70 reveal reveal-delay-2">
              Frameworks, opinions and case notes on AI search, LinkedIn growth, performance
              marketing and video.
            </p>
          </div>
          <Link to="/blog" className="btn-dark self-start md:self-auto reveal reveal-delay-2">
            View all articles →
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {latest.map((p, i) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className={`glass rounded-3xl p-7 reveal reveal-delay-${Math.min(i + 1, 5)} group block transition-transform hover:-translate-y-1`}
            >
              <div className="flex items-center gap-2 text-xs text-white/60">
                <time>
                  {new Date(p.published_at ?? p.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "UTC",
                  })}
                </time>
                <span>·</span>
                <span>{p.read_minutes} min read</span>
              </div>
              <h3 className="mt-4 font-display text-xl md:text-2xl font-bold tracking-tight text-white leading-tight group-hover:text-[#AAFF00] transition-colors">
                {p.title}
              </h3>
              <p className="mt-3 text-white/70 text-sm leading-relaxed line-clamp-3">
                {p.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 text-[#AAFF00] text-sm font-semibold">
                Read article →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}