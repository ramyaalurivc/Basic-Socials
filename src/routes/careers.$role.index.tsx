import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useLenis } from "@/hooks/use-lenis";
import { getRole, perks, whyJoin } from "@/lib/roles";

export const Route = createFileRoute("/careers/$role/")({
  loader: ({ params }) => {
    const role = getRole(params.role);
    if (!role) throw notFound();
    return { slug: role.slug };
  },
  head: ({ params }) => {
    const role = getRole(params.role);
    if (!role) return { meta: [{ title: "Role not found | Basic Socials" }] };
    const title = `${role.title} | Careers at Basic Socials`;
    const desc = `${role.tagline} ${role.employmentType} role in ${role.location} at Basic Socials.`;
    const url = `https://basicsocials.lovable.app/careers/${role.slug}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: RolePage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-center text-white">
      <div>
        <p className="text-white/70">That role isn't open right now.</p>
        <Link to="/careers" className="btn-green mt-6 inline-flex">
          See open roles
        </Link>
      </div>
    </div>
  ),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="font-display text-[1.6rem] font-bold tracking-tight text-[#0F172A] md:text-3xl">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3.5 text-[1.02rem] leading-relaxed text-[#475569]">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0033FF]" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function RolePage() {
  useLenis();
  const { role: slug } = Route.useParams();
  const role = getRole(slug)!;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A]" data-nav-theme="light">
      <Nav />
      <main className="pb-32 pt-32 md:pt-40">
        <div className="mx-auto max-w-3xl px-6">
          <Link to="/careers" className="text-sm text-[#475569] hover:text-[#0033FF]">
            ← All openings
          </Link>

          <div className="mt-8 flex flex-col items-start gap-7 sm:flex-row sm:items-center">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-[#AAFF00] ring-8 ring-[#0033FF]/10">
              <img
                src={role.img}
                alt={`${role.title} at Basic Socials`}
                className="h-full w-full object-contain p-1"
                width={224}
                height={224}
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#0033FF]/20 bg-[#0033FF]/5 px-3.5 py-1.5 text-xs font-semibold text-[#0033FF]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#AAFF00]" />
                Actively hiring
              </span>
              <h1 className="mt-4 font-display text-[clamp(2.1rem,5.5vw,3.4rem)] font-bold leading-[1.03] tracking-[-0.04em]">
                {role.title}
              </h1>
            </div>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-[#475569]">{role.intro}</p>

          <dl className="mt-9 grid gap-3 rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:grid-cols-3">
            {[
              ["Location", role.location],
              ["Employment type", role.employmentType],
              ["Work mode", role.workMode],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[#94A3B8]">
                  {k}
                </dt>
                <dd className="mt-1.5 font-medium text-[#0F172A]">{v}</dd>
              </div>
            ))}
          </dl>

          <Section title="Role overview">
            <p className="text-[1.05rem] leading-relaxed text-[#475569]">{role.overview}</p>
          </Section>

          <Section title="Responsibilities">
            <Bullets items={role.responsibilities} />
          </Section>

          <Section title="Requirements">
            <Bullets items={role.requirements} />
          </Section>

          <Section title="Nice to have">
            <Bullets items={role.niceToHave} />
          </Section>

          <Section title="What you'll learn">
            <Bullets items={role.learn} />
          </Section>

          <Section title="Why join Basic Socials">
            <Bullets items={whyJoin} />
          </Section>

          <Section title="Perks & benefits">
            <div className="grid gap-4 sm:grid-cols-2">
              {perks.map((p) => (
                <div
                  key={p.t}
                  className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-[#0033FF]/30"
                >
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#AAFF00]" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-[#0F172A]">{p.t}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-[#475569]">{p.d}</p>
                </div>
              ))}
            </div>
          </Section>

          <div className="mt-16 rounded-[32px] border border-[#E5E7EB] bg-white p-9 text-center shadow-[0_18px_50px_-30px_rgba(15,23,42,0.35)]">
            <h3 className="font-display text-2xl font-bold text-[#0F172A]">
              Think this is you?
            </h3>
            <p className="mx-auto mt-2.5 max-w-md text-[#475569]">
              The form takes about five minutes. We read every single one.
            </p>
            <Link
              to="/careers/$role/apply"
              params={{ role: role.slug }}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0033FF] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_36px_-16px_rgba(0,51,255,0.8)] transition hover:-translate-y-0.5"
            >
              Apply now →
            </Link>
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 z-40 border-t border-[#E5E7EB] bg-white/85 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate font-display text-base font-semibold text-[#0F172A]">
              {role.title}
            </p>
            <p className="truncate text-xs text-[#475569]">
              {role.employmentType} · {role.location}
            </p>
          </div>
          <Link
            to="/careers/$role/apply"
            params={{ role: role.slug }}
            className="shrink-0 rounded-full bg-[#0033FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_32px_-16px_rgba(0,51,255,0.8)] transition hover:-translate-y-0.5"
          >
            Apply now
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}