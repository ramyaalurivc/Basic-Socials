import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Selected Work & Reel Showcase · Basic Socials" },
      {
        name: "description",
        content:
          "Explore selected work, 9:16 vertical video reels, UGC ads, and brand case studies by Basic Socials agency in Hyderabad.",
      },
      { property: "og:title", content: "Selected Work & Reel Showcase · Basic Socials" },
      {
        property: "og:description",
        content:
          "We build brands people remember. Organic social reels, UGC ads, personal branding, and video campaigns by Basic Socials.",
      },
      { property: "og:url", content: "https://www.basicsocials.com/our-work" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://www.basicsocials.com/our-work" }],
  }),
  component: OurWorkPage,
});

interface Client {
  name: string;
  industry: string;
}

const clientsList: Client[] = [
  { name: "Dr. Maniteja Guntupalli", industry: "Healthcare · Personal Brand" },
  { name: "Hoppy", industry: "Technology · Advertising" },
  { name: "Shiva Hospitals", industry: "Healthcare" },
  { name: "Shiva Dental", industry: "Healthcare" },
  { name: "Kanchi Cafe", industry: "Hospitality & Food" },
  { name: "Aamara Retreat", industry: "Hospitality · Travel" },
  { name: "The Icon Luxe Salon", industry: "Lifestyle & Beauty" },
  { name: "Lunar Loft", industry: "Lifestyle & Brand" },
];

interface FlagshipProject {
  id: string;
  client: string;
  category: string;
  headline: string;
  services: string[];
  description: string;
  results: string[];
  videoUrl: string;
}

const flagshipProjects: FlagshipProject[] = [
  {
    id: "hoppy",
    client: "HOPPY",
    category: "Technology · Advertising",
    headline: "Making an emerging advertising product easier to understand.",
    services: ["Brand Communication", "Creative Direction", "Product Content", "Campaign Concepts"],
    description:
      "Distilled complex tech infrastructure into slick video demonstrations and high-converting ad motion graphics.",
    results: ["14.2x ROAS Peak", "+320% Enterprise Signups"],
    videoUrl: "/work/videos/Hoppy.mp4",
  },
  {
    id: "dr-maniteja",
    client: "DR. MANITEJA GUNTUPALLI",
    category: "Healthcare · Personal Brand",
    headline: "Turning medical expertise into a digital presence people trust.",
    services: ["Strategy", "Content", "Personal Branding", "Social Media Management"],
    description:
      "Positioned Dr. Maniteja as a premier healthcare authority through breakdown reels and patient awareness series.",
    results: ["1.8M+ Organic Impressions", "400+ Inbound Consultation Queries"],
    videoUrl: "/work/videos/Maniteja.mp4",
  },
  {
    id: "aamara-retreat",
    client: "AAMARA RETREAT",
    category: "Hospitality · Travel",
    headline: "Turning a destination into a digital experience.",
    services: ["Content", "Creative Direction", "Social Media"],
    description:
      "Captured the serene luxury of Aamara Retreat through high-cinematic property walk-through reels that filled weekend bookings.",
    results: ["100% Weekend Occupancy Rate", "3.2M Reel Views"],
    videoUrl: "/work/videos/Aamararetreat.mp4",
  },
];

interface ReelItem {
  id: string;
  client: string;
  categoryTag: string;
  metrics: string;
  videoUrl: string;
}

const reelItems: ReelItem[] = [
  {
    id: "dr-maniteja-reel",
    client: "Dr. Maniteja Guntupalli",
    categoryTag: "Educational Reel",
    metrics: "1.8M Reel Views",
    videoUrl: "/work/videos/Maniteja.mp4",
  },
  {
    id: "hoppy-reel",
    client: "Hoppy",
    categoryTag: "Product Campaign",
    metrics: "1.2M Reel Views",
    videoUrl: "/work/videos/Hoppy.mp4",
  },
  {
    id: "kanchi-reel",
    client: "Kanchi Cafe",
    categoryTag: "Food & Lifestyle",
    metrics: "940K Local Reach",
    videoUrl: "/work/videos/Kanchicafe.mp4",
  },
  {
    id: "aamara-reel",
    client: "Aamara Retreat",
    categoryTag: "Property Reel",
    metrics: "1.5M Reel Views",
    videoUrl: "/work/videos/Aamararetreat.mp4",
  },
  {
    id: "icon-luxe-reel",
    client: "The Icon Luxe Salon",
    categoryTag: "UGC / Beauty",
    metrics: "620K Views",
    videoUrl: "/work/videos/Theiconluxesalon.mp4",
  },
  {
    id: "lunar-loft-reel",
    client: "Lunar Loft",
    categoryTag: "Brand & Lifestyle",
    metrics: "540K Views",
    videoUrl: "/work/videos/Lunarloft.mp4",
  },
  {
    id: "koki-reel",
    client: "Koki",
    categoryTag: "Brand Campaign",
    metrics: "850K Impressions",
    videoUrl: "/work/videos/Koki.mp4",
  },
];

function OurWorkPage() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<FlagshipProject | null>(null);
  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useReveal();
  useLenis();

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = direction === "left" ? -340 : 340;
    carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-[#F7F7F2] bg-[#2929FF] font-sans selection:bg-[#B7FF00] selection:text-[#0B0B0D]">
      <Nav />

      <main className="pt-28 md:pt-36">
        {/* ============================================================ */}
        {/* 01. HERO — NEON BLUE (#2929FF) */}
        {/* ============================================================ */}
        <section className="px-6 pt-8 pb-20 md:pb-28 bg-[#2929FF]">
          <div className="mx-auto max-w-7xl">
            <span className="text-xs uppercase tracking-widest text-[#B7FF00] font-bold block mb-6">
              01 / OUR WORK
            </span>

            <h1 className="font-display text-[clamp(3.2rem,8.5vw,7rem)] font-extrabold leading-[0.93] tracking-[-0.04em] text-[#F7F7F2] max-w-5xl">
              We build brands people{" "}
              <span className="text-[#B7FF00] italic font-normal inline-block">
                remember.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-[#F7F7F2]/90 text-lg md:text-2xl leading-relaxed font-normal">
              From personal brands and healthcare to technology and hospitality — we build organic social engines, 9:16 vertical reels, and UGC ads people care about.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#reels"
                className="rounded-full bg-[#B7FF00] px-7 py-4 text-sm font-bold text-[#0B0B0D] transition-transform hover:scale-105 shadow-[0_0_25px_rgba(183,255,0,0.4)] flex items-center gap-2"
              >
                <span>EXPLORE REELS</span>
                <span className="text-base font-bold">↓</span>
              </a>
              <a
                href="#contact"
                className="rounded-full border border-[#F7F7F2]/30 bg-transparent px-7 py-4 text-sm font-semibold text-[#F7F7F2] transition-all hover:border-[#B7FF00] hover:text-[#B7FF00] hover:scale-105 flex items-center gap-2"
              >
                <span>START A CONVERSATION</span>
                <span className="text-base font-bold">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 02. REEL SHOWCASE IMMEDIATELY AFTER HERO — OFF-WHITE (#F7F7F2) */}
        {/* ============================================================ */}
        <section id="reels" className="px-6 py-20 md:py-32 bg-[#F7F7F2] text-[#0B0B0D]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#2929FF] font-bold block mb-2">
                  02 / WORK IN MOTION
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-[#0B0B0D]">
                  Scroll-stopping isn't a format. <br />
                  It's a feeling.
                </h2>
              </div>

              {/* Scroll controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="h-12 w-12 rounded-full border border-[#0B0B0D]/20 hover:border-[#2929FF] text-[#0B0B0D] flex items-center justify-center transition-all hover:bg-[#2929FF] hover:text-[#F7F7F2]"
                  aria-label="Scroll Left"
                >
                  ←
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="h-12 w-12 rounded-full border border-[#0B0B0D]/20 hover:border-[#2929FF] text-[#0B0B0D] flex items-center justify-center transition-all hover:bg-[#2929FF] hover:text-[#F7F7F2]"
                  aria-label="Scroll Right"
                >
                  →
                </button>
              </div>
            </div>

            {/* 9:16 Reel Cards Showcase */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-none py-2 px-1"
            >
              {reelItems.map((reel, idx) => {
                const isPlayingThis = activeReelId === reel.id;

                return (
                  <div
                    key={reel.id}
                    className="snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[350px] aspect-[9/16] relative rounded-[2rem] overflow-hidden bg-[#0B0B0D] border border-[#0B0B0D]/10 hover:border-[#2929FF] transition-all duration-300 group shadow-lg cursor-pointer"
                    onClick={() => setActiveReelId(isPlayingThis ? null : reel.id)}
                  >
                    {isPlayingThis ? (
                      <div className="w-full h-full bg-black relative">
                        <video
                          src={reel.videoUrl}
                          controls
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover rounded-[2rem]"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveReelId(null);
                          }}
                          className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-black/70 text-white flex items-center justify-center text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col justify-between p-6 relative">
                        {/* Video Background */}
                        <video
                          src={reel.videoUrl}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"
                        />

                        {/* Top Label */}
                        <div className="flex items-center justify-between z-10">
                          <span className="text-xs font-bold font-display text-[#B7FF00] bg-[#0B0B0D]/80 backdrop-blur-md rounded-full px-3 py-1">
                            0{idx + 1} / {reel.client.split(" ")[0].toUpperCase()}
                          </span>
                        </div>

                        {/* Hover Subtle Interaction Indicator */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="rounded-full bg-[#B7FF00] text-[#0B0B0D] px-5 py-2 text-xs font-extrabold tracking-wider shadow-lg flex items-center gap-1.5">
                            <span>PLAY</span>
                            <span>▶</span>
                          </span>
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="relative z-10 pt-8 space-y-1 bg-gradient-to-t from-black/95 via-black/60 to-transparent -mx-6 -mb-6 p-6 rounded-b-[2rem]">
                          <h3 className="font-display text-xl font-extrabold text-[#F7F7F2] tracking-tight group-hover:text-[#B7FF00] transition-colors">
                            {reel.client}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-[#F7F7F2]/80 font-medium">
                            <span>{reel.categoryTag}</span>
                            <span className="text-[#B7FF00] font-bold">{reel.metrics}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 03. COMPRESSED CLIENT ROSTER — NEON BLUE (#2929FF) */}
        {/* ============================================================ */}
        <section id="clients" className="px-6 py-20 bg-[#2929FF] text-[#F7F7F2]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <span className="text-xs uppercase tracking-widest text-[#B7FF00] font-bold block mb-2">
                03 / CLIENT ROSTER
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#F7F7F2]">
                CLIENTS WE'VE BUILT WITH
              </h2>
            </div>

            {/* Compressed 2-Column Roster */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              {clientsList.map((c, idx) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between border-b border-white/20 pb-4 group cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-[#B7FF00]">0{idx + 1}</span>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-[#F7F7F2] group-hover:text-[#B7FF00] transition-colors">
                      {c.name}
                    </h3>
                  </div>
                  <span className="text-xs text-[#F7F7F2]/60 font-medium">{c.industry}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 04. FEATURED WORK (REELS AS HERO) — OFF-WHITE (#F7F7F2) */}
        {/* ============================================================ */}
        <section id="featured" className="px-6 py-24 md:py-36 bg-[#F7F7F2] text-[#0B0B0D]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <span className="text-xs uppercase tracking-widest text-[#2929FF] font-bold block mb-2">
                04 / FEATURED WORK
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-[#0B0B0D]">
                The work behind the scroll.
              </h2>
            </div>

            <div className="space-y-24">
              {flagshipProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center border-b border-[#0B0B0D]/10 pb-16"
                >
                  {/* Left: Large 9:16 Reel Player */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div className="w-[300px] sm:w-[340px] aspect-[9/16] rounded-[2.2rem] overflow-hidden bg-[#0B0B0D] relative border-2 border-[#0B0B0D]/20 shadow-2xl group">
                      <video
                        src={project.videoUrl}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover rounded-[2.2rem]"
                      />
                    </div>
                  </div>

                  {/* Right: Quiet Case Study Information & Metrics */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-2xl font-extrabold text-[#2929FF]">
                        0{idx + 1}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#2929FF] bg-[#2929FF]/10 rounded-full px-3.5 py-1">
                        {project.client}
                      </span>
                      <span className="text-xs text-[#0B0B0D]/60 font-medium">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-display text-3xl md:text-4xl font-extrabold text-[#0B0B0D] leading-tight">
                      "{project.headline}"
                    </h3>

                    <p className="text-[#0B0B0D]/75 text-base md:text-lg leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.services.map((s) => (
                        <span
                          key={s}
                          className="text-xs text-[#0B0B0D] bg-[#0B0B0D]/5 border border-[#0B0B0D]/15 rounded-full px-3.5 py-1.5 font-semibold"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* High-Impact Metrics List */}
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.results.map((res) => (
                        <div
                          key={res}
                          className="rounded-xl bg-[#2929FF]/5 border border-[#2929FF]/15 p-4"
                        >
                          <span className="block text-base font-extrabold text-[#2929FF]">
                            {res}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => setSelectedCaseStudy(project)}
                        className="rounded-full bg-[#2929FF] px-6 py-3 text-xs md:text-sm font-bold text-[#F7F7F2] transition-transform hover:scale-105 flex items-center gap-2"
                      >
                        <span>VIEW PROJECT</span>
                        <span>↗</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Detail Modal */}
        {selectedCaseStudy && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0B0D]/90 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setSelectedCaseStudy(null)}
          >
            <div
              className="relative w-full max-w-2xl rounded-[2.5rem] bg-[#2929FF] p-8 md:p-12 text-[#F7F7F2] border border-[#B7FF00]/40 shadow-2xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-6 right-6 h-10 w-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-[#F7F7F2] transition-colors"
              >
                ✕
              </button>

              <span className="text-xs uppercase tracking-wider font-bold text-[#B7FF00]">
                {selectedCaseStudy.category}
              </span>

              <h2 className="mt-2 font-display text-3xl md:text-5xl font-extrabold tracking-tight">
                {selectedCaseStudy.client}
              </h2>

              <p className="mt-4 text-xl text-[#B7FF00] font-bold">
                "{selectedCaseStudy.headline}"
              </p>

              <p className="mt-6 text-[#F7F7F2]/90 text-base md:text-lg leading-relaxed">
                {selectedCaseStudy.description}
              </p>

              <div className="mt-8 pt-6 border-t border-white/20 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-[#B7FF00] font-bold">
                  Measurable Results
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCaseStudy.results.map((r) => (
                    <div key={r} className="bg-black/40 rounded-xl p-4 text-center border border-[#B7FF00]/30">
                      <span className="block text-sm font-bold text-[#B7FF00]">{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 05. ATTITUDE STATEMENT — DEEP BLACK (#0A0A0A) */}
        {/* ============================================================ */}
        <section className="px-6 py-28 md:py-40 bg-[#0A0A0A] text-[#F7F7F2] border-t border-white/10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-[#F7F7F2] leading-[1.05]">
              WE DON'T MAKE <br />
              CONTENT. <br />
              <br />
              WE MAKE <br />
              <span className="text-[#B7FF00]">PEOPLE CARE.</span>
            </h2>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 06. SHORT TRANSITION — PARROT GREEN (#B7FF00) */}
        {/* ============================================================ */}
        <section className="px-6 py-16 bg-[#B7FF00] text-[#0B0B0D]">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <h3 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#0B0B0D]">
              MORE WORK ↓
            </h3>
            <div className="flex justify-center">
              <span className="text-5xl text-[#2929FF] animate-bounce">↓</span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 07. SECONDARY REEL GALLERY — OFF-WHITE (#F7F7F2) */}
        {/* ============================================================ */}
        <section className="px-6 py-24 md:py-32 bg-[#F7F7F2] text-[#0B0B0D]">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <span className="text-xs uppercase tracking-widest text-[#2929FF] font-bold block mb-2">
                07 / MORE CREATIVE REELS
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-[#0B0B0D]">
                Personal branding & UGC campaigns.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reelItems.slice(0, 4).map((reel, idx) => (
                <div
                  key={`more-${reel.id}`}
                  className="w-full aspect-[9/16] rounded-[2rem] overflow-hidden bg-[#0B0B0D] relative border border-[#0B0B0D]/10 hover:border-[#2929FF] transition-all duration-300 group shadow-md"
                >
                  <video
                    src={reel.videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover rounded-[2rem]"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[0.7rem] font-bold uppercase tracking-wider text-[#0B0B0D] bg-[#B7FF00] rounded-full px-3 py-1">
                      0{idx + 1} / {reel.client.split(" ")[0].toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 08. FINAL CTA — DEEP BLACK (#0A0A0A) */}
        {/* ============================================================ */}
        <section id="contact" className="px-6 py-28 md:py-40 bg-[#0A0A0A] text-[#F7F7F2]">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <span className="text-xs uppercase tracking-widest text-[#B7FF00] font-bold block">
              08 / GET IN TOUCH
            </span>

            <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-[#F7F7F2] leading-tight">
              YOUR BRAND COULD BE <br />
              OUR NEXT PROJECT.
            </h2>

            <div className="pt-6 flex justify-center">
              <a
                href="https://wa.me/919866472562"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#B7FF00] px-9 py-4 text-base font-extrabold text-[#0B0B0D] transition-transform hover:scale-105 shadow-[0_0_35px_rgba(183,255,0,0.5)] flex items-center gap-2"
              >
                <span>LET'S TALK</span>
                <span className="text-xl">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
