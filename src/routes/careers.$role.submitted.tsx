import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getRole } from "@/lib/roles";

export const Route = createFileRoute("/careers/$role/submitted")({
  head: () => ({
    meta: [
      { title: "Application received | Basic Socials" },
      { name: "description", content: "Thanks for applying to Basic Socials. We review every application." },
      { property: "og:title", content: "Application received | Basic Socials" },
      { property: "og:description", content: "Thanks for applying to Basic Socials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SubmittedPage,
});

function SubmittedPage() {
  const { role: slug } = Route.useParams();
  const role = getRole(slug);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A]" data-nav-theme="light">
      <Nav />
      <main className="flex min-h-[70vh] items-center px-6 pb-24 pt-36">
        <div className="mx-auto w-full max-w-xl rounded-[32px] border border-[#E5E7EB] bg-white p-10 text-center shadow-[0_24px_60px_-34px_rgba(15,23,42,0.4)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#AAFF00] text-2xl">
            ✓
          </div>
          <h1 className="mt-7 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-tight tracking-[-0.035em]">
            Application received.
          </h1>
          <p className="mt-4 leading-relaxed text-[#475569]">
            Thanks for applying{role ? ` for ${role.title}` : ""}. Our team reviews every application
            properly — if it looks like a fit, we'll get in touch to take it forward.
          </p>
          <p className="mt-3 text-sm text-[#94A3B8]">Keep an eye on your inbox, including spam.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/careers"
              className="rounded-full bg-[#0033FF] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            >
              See other roles
            </Link>
            <Link
              to="/"
              className="rounded-full border border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#0F172A] transition hover:border-[#0033FF] hover:text-[#0033FF]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}