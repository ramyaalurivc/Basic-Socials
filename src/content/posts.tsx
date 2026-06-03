import type { ReactNode } from "react";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  author: string;
  readMinutes: number;
  tags: string[];
  body: ReactNode;
};

const P = ({ children }: { children: ReactNode }) => (
  <p className="mt-5 text-white/80 leading-relaxed text-[1.05rem]">{children}</p>
);
const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="mt-12 font-display text-2xl md:text-3xl font-bold tracking-tight text-white">
    {children}
  </h2>
);
const UL = ({ children }: { children: ReactNode }) => (
  <ul className="mt-5 space-y-2 text-white/80 list-disc pl-6 marker:text-[#AAFF00]">{children}</ul>
);

export const posts: Post[] = [
  {
    slug: "ai-search-visibility-2026",
    title: "AI Search Is the New SEO: How Brands Win in 2026",
    excerpt:
      "ChatGPT, Perplexity and Gemini now answer the questions Google used to. Here's how to make sure your brand is the one being recommended.",
    date: "2026-05-22",
    author: "Basic Socials",
    readMinutes: 6,
    tags: ["AI", "SEO", "Strategy"],
    body: (
      <>
        <P>
          Half of your future customers will never see a blue link. They'll ask an AI assistant for
          the best agency, product, or restaurant — and act on the first name it surfaces. If your
          brand isn't in that answer, you don't exist.
        </P>
        <H2>Why AI search changes the game</H2>
        <P>
          Traditional SEO optimised for a list. AI search optimises for a single recommendation.
          That shifts the work from ranking to <em>being cited</em>: the model has to trust your
          name enough to say it out loud.
        </P>
        <H2>What actually moves the needle</H2>
        <UL>
          <li>Clear, structured pages with real entities (people, places, services).</li>
          <li>Genuine third-party mentions on sites the LLMs already trust.</li>
          <li>An llms.txt and clean schema markup so crawlers parse you instantly.</li>
          <li>Consistent positioning across LinkedIn, Instagram, and your site.</li>
        </UL>
        <H2>The quick test</H2>
        <P>
          Open ChatGPT and ask: "Best marketing agency in Hyderabad." If your brand isn't in the
          first three names, you have an AI visibility problem — not a marketing problem.
        </P>
      </>
    ),
  },
  {
    slug: "linkedin-content-engine",
    title: "Build a LinkedIn Content Engine That Actually Drives Pipeline",
    excerpt:
      "Most LinkedIn posts get likes. Very few get meetings. Here's the framework we use with founders to turn a feed into a sales channel.",
    date: "2026-04-10",
    author: "Basic Socials",
    readMinutes: 5,
    tags: ["LinkedIn", "Content", "B2B"],
    body: (
      <>
        <P>
          LinkedIn rewards specificity. The accounts that grow aren't the loudest — they're the
          ones who pick a single audience and speak to it like a friend, every week, for a year.
        </P>
        <H2>The 3-post weekly rhythm</H2>
        <UL>
          <li><strong>Insight:</strong> a sharp opinion the rest of your industry won't say out loud.</li>
          <li><strong>Proof:</strong> a real story, client win, or behind-the-scenes case study.</li>
          <li><strong>Invitation:</strong> something the reader can act on — a checklist, audit, or DM prompt.</li>
        </UL>
        <H2>Stop chasing virality</H2>
        <P>
          A 800-impression post that gets your dream client to reply beats a 80k-impression post
          that gets you nothing. Track replies and profile visits, not likes.
        </P>
      </>
    ),
  },
  {
    slug: "ugc-vs-high-production",
    title: "UGC or High-Production Video? The Honest Answer",
    excerpt:
      "Founders ask us this every week. The right answer depends on the funnel stage — not the budget.",
    date: "2026-03-02",
    author: "Basic Socials",
    readMinutes: 4,
    tags: ["Video", "UGC", "Performance"],
    body: (
      <>
        <P>
          UGC wins on trust. Cinematic wins on brand. You need both — but at different moments in
          the funnel.
        </P>
        <H2>When to use UGC</H2>
        <UL>
          <li>Performance ads where credibility outranks polish.</li>
          <li>Product education and how-tos.</li>
          <li>Anything that needs to feel like a friend's recommendation.</li>
        </UL>
        <H2>When to invest in high-end production</H2>
        <UL>
          <li>Brand films that anchor your homepage and pitch deck.</li>
          <li>Launches where the visual language defines the category.</li>
          <li>Founder positioning — once a year, do it properly.</li>
        </UL>
        <P>
          Spend 80% of your video budget on UGC for the funnel, 20% on one hero film a year. That
          ratio works for almost every D2C and B2B brand we run.
        </P>
      </>
    ),
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);