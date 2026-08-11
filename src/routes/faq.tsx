import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

const TITLE = "FAQ | Basic Socials";
const DESC =
  "Answers about our content production, AI content, AI systems and consulting services, how we work, and how to get in touch.";

export const Route = createFileRoute("/faq")({
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
  component: FaqPage,
});

type Item = { q: string; a: React.ReactNode };

const groups: { title: string; items: Item[] }[] = [
  {
    title: "Services",
    items: [
      {
        q: "What does Basic Socials actually do?",
        a: "Two things, tightly connected. Content: branding, social media, video production, AI-generated content and performance marketing. AI: automations and systems that handle your leads, follow-ups, reporting and internal busywork. Content brings attention. AI makes sure nothing falls through once it arrives.",
      },
      {
        q: "What are AI Systems and Automations?",
        a: "Custom workflows built around your business. A lead comes in on WhatsApp, Instagram or your site, gets an instant reply, gets qualified, books a meeting, updates your CRM, and gets followed up until they respond. You see it all in one place instead of five apps.",
      },
      {
        q: "Do you make AI content, or real shoots?",
        a: "Both. We run original on-camera production with real people, and we produce AI avatars, AI video and AI-assisted creative when speed or volume matters. Most clients use a mix.",
      },
      {
        q: "Do you handle personal brands?",
        a: "Yes. Founders, doctors, CAs, lawyers, architects, real estate professionals. We build and run your entire presence so when someone searches your name or your field, you show up and they reach out.",
      },
      {
        q: "Can you manage LinkedIn and podcasts?",
        a: "Yes. LinkedIn for both personal profiles and company pages, written in your voice. Podcasts end to end: concept, recording, editing and distribution.",
      },
    ],
  },
  {
    title: "Working together",
    items: [
      {
        q: "How does a project start?",
        a: "You tell us about your brand through the form or a short call. You get a clear proposal with scope and cost within 48 hours. Onboarding is fast, and work usually begins in the first week.",
      },
      {
        q: "Do you work on retainers or one-off projects?",
        a: "Mostly monthly retainers, because brand and growth compound. We do take on one-off builds, shoots and AI system projects where it makes sense.",
      },
      {
        q: "Do you only work with businesses in Hyderabad?",
        a: "No. We're based in Hyderabad and work with clients across India and internationally. Everything runs remotely except shoots.",
      },
      {
        q: "Do we own the systems and content you build?",
        a: "Yes. Content, accounts and automations are yours. We build in your tools, on your accounts, so you're never locked in.",
      },
    ],
  },
  {
    title: "Contact",
    items: [
      {
        q: "How do I connect with Basic Socials?",
        a: (
          <>
            Email us at{" "}
            <a
              href="mailto:socials@basicsocials.com"
              className="font-medium text-[#0033FF] underline underline-offset-4"
            >
              socials@basicsocials.com
            </a>{" "}
            or fill in the form on the homepage. We reply within 24 hours on working days.
          </>
        ),
      },
      {
        q: "Are you hiring?",
        a: (
          <>
            Often, yes. Open roles live on our{" "}
            <a href="/careers" className="font-medium text-[#0033FF] underline underline-offset-4">
              Careers page
            </a>
            . If nothing fits, pitch yourself at socials@basicsocials.com.
          </>
        ),
      },
    ],
  },
];

function FaqPage() {
  useReveal();
  useLenis();

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main>
        <section className="relative overflow-hidden pt-40 pb-24 md:pt-52 md:pb-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
            <div className="blob absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-[#AAFF00] opacity-20 blur-3xl" />
          </div>
          <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
            <span className="pill reveal">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#AAFF00]" />
              FAQ
            </span>
            <h1 className="reveal reveal-delay-1 mt-8 font-display text-[clamp(2.4rem,6.4vw,5rem)] font-bold leading-[0.98] tracking-[-0.04em]">
              Questions? <span className="italic font-medium grad-text">Basically</span> answered.
            </h1>
            <p className="reveal reveal-delay-2 mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              Everything about what we build, how we work, and how to reach us.
            </p>
          </div>
        </section>

        <section
          data-nav-theme="light"
          className="relative bg-[#FAFAFA] px-6 py-28 text-[#0F172A] md:py-36"
        >
          <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -top-px left-0 h-16 w-full text-[#FAFAFA] md:h-20">
            <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill="currentColor" />
          </svg>
          <div className="relative mx-auto max-w-3xl space-y-20">
            {groups.map((g) => (
              <div key={g.title}>
                <h2 className="reveal font-display text-sm font-semibold uppercase tracking-[0.14em] text-[#0033FF]">
                  {g.title}
                </h2>
                <div className="mt-8 space-y-4">
                  {g.items.map((item, i) => (
                    <Accordion key={item.q} item={item} defaultOpen={g === groups[0] && i === 0} />
                  ))}
                </div>
              </div>
            ))}

            <div className="reveal rounded-3xl border border-[#E5E7EB] bg-white p-10 text-center shadow-[0_10px_40px_-24px_rgba(15,23,42,0.25)]">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
                Still have a question?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[#475569]">
                Write to us and a human replies. Usually the same day.
              </p>
              <a
                href="mailto:socials@basicsocials.com"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0033FF] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-14px_rgba(0,51,255,0.7)] transition-all duration-300 hover:-translate-y-0.5"
              >
                socials@basicsocials.com →
              </a>
            </div>
          </div>
          <svg aria-hidden viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -bottom-px left-0 h-16 w-full rotate-180 text-[#FAFAFA] md:h-20">
            <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill="currentColor" />
          </svg>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Accordion({ item, defaultOpen }: { item: Item; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div
      className={`overflow-hidden rounded-3xl bg-white transition-all duration-500 ${
        open
          ? "border border-[#0033FF]/35 shadow-[0_12px_44px_-20px_rgba(0,51,255,0.3)]"
          : "border border-[#E5E7EB] shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
      }`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-center justify-between gap-6 px-8 py-6 text-left md:px-10"
      >
        <span className="font-display text-[1.05rem] font-semibold leading-snug tracking-tight text-[#0F172A] transition-colors group-hover:text-[#0033FF] md:text-lg">
          {item.q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            open
              ? "rotate-45 border-[#0033FF] bg-[#0033FF] text-white"
              : "border-[#E5E7EB] text-[#475569] group-hover:border-[#0033FF] group-hover:text-[#0033FF]"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-8 pb-8 text-[1rem] leading-[1.75] text-[#475569] md:px-10">
            {item.a}
          </div>
        </div>
      </div>
    </div>
  );
}
