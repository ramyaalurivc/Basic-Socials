import { useState } from "react";

const faqs = [
  {
    q: "What are the services provided by Basic Socials?",
    a: "We offer Branding, Personal Brand Management, Social Media, Performance Marketing, Video & AI Content, Podcast Production, Influencer Campaigns, PR, LinkedIn Management, Talent Management, and Consulting. Basically your entire marketing — under one roof.",
  },
  {
    q: "Does Basic Socials handle personal brands for professionals?",
    a: "Yes. Doctors, CAs, Lawyers, Architects, Teachers, Real Estate Agents, Brand Owners — you name the field, we handle your entire brand portfolio end to end.",
  },
  {
    q: "What does a personal brand actually include?",
    a: "Everything that represents you online — all built around you and your expertise. We create, manage, and grow your entire online presence so when someone searches your name, your profession, or your city — you show up, you stand out, and they reach out.",
  },
  {
    q: "Do I need to be on camera?",
    a: "Your call. We do original on-camera production and AI avatars both. Real shoots with real people — or fully AI-generated. Either way, the content gets made.",
  },
  {
    q: "Do Basic Socials produce podcasts?",
    a: "Yes. We handle everything — concept, recording, editing, and distribution.",
  },
  {
    q: "Does Basic Socials handle influencer campaigns and PR?",
    a: "Both. Influencer campaigns handled from sourcing to reporting. PR puts your name in news articles, podcasts, and media — not just your own feed.",
  },
  {
    q: "Can you manage my LinkedIn?",
    a: "Yes — your personal profile and company page both. Posts in your voice, thought leadership, audience growth. You run your business. We make sure you're always in the conversation.",
  },
  {
    q: "How do I contact Basic Socials?",
    a: (
      <>
        Drop us a mail at{" "}
        <a href="mailto:connect@basicsocials.com" className="ulink text-[#AAFF00] hover:text-white transition-colors">
          connect@basicsocials.com
        </a>
        {" "}— or just{" "}
        <a href="https://wa.me/910000000000" target="_blank" rel="noreferrer" className="ulink text-[#AAFF00] hover:text-white transition-colors">
          say hi
        </a>
        . We'll take it from there. Either way, we find you.
      </>
    ),
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <span className="pill reveal">FAQ</span>
        <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1] tracking-[-0.03em] max-w-3xl reveal reveal-delay-1">
          Questions?{" "}
          <span className="italic font-medium grad-text">Basically</span>{" "}
          answered.
        </h2>

        <div className="mt-14 max-w-4xl space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${Math.min(i + 1, 5)} rounded-3xl glass overflow-hidden transition-all duration-500 ${
                  isOpen ? "border-[#AAFF00]/40 shadow-[0_0_40px_-10px_rgba(170,255,0,0.2)]" : "border-white/18"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 text-left cursor-pointer group"
                >
                  <span className="font-display text-base md:text-lg font-semibold tracking-tight text-white group-hover:text-[#AAFF00] transition-colors">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? "bg-[#AAFF00] border-[#AAFF00] text-[#0033FF] rotate-45"
                        : "border-white/30 text-white/60 group-hover:border-white/60 group-hover:text-white"
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 md:px-8 pb-6 text-white/80 text-sm md:text-base leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
