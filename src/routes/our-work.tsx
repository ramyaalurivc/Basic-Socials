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

// Real client data structures
interface Client {
  name: string;
  industry: string;
  category: "Healthcare" | "Hospitality" | "Lifestyle" | "Technology" | "Personal Brand" | "Real Estate";
}

const clientsList: Client[] = [
  { name: "Dr. Maniteja Guntupalli", industry: "Healthcare · Personal Brand", category: "Personal Brand" },
  { name: "Hoppy", industry: "Technology · Advertising", category: "Technology" },
  { name: "Shiva Hospitals", industry: "Healthcare", category: "Healthcare" },
  { name: "Shiva Dental", industry: "Healthcare", category: "Healthcare" },
  { name: "Kanchi Cafe", industry: "Hospitality & Food", category: "Hospitality" },
  { name: "Aamara Retreat", industry: "Hospitality · Travel", category: "Hospitality" },
  { name: "The Icon Luxe Salon", industry: "Lifestyle & Beauty", category: "Lifestyle" },
  { name: "Lunar Loft", industry: "Lifestyle & Brand", category: "Lifestyle" },
];

interface FlagshipProject {
  id: string;
  client: string;
  category: string;
  headline: string;
  services: string[];
  gradient: string;
  accentColor: string;
  description: string;
  results: string[];
}

const flagshipProjects: FlagshipProject[] = [
  {
    id: "dr-maniteja",
    client: "DR. MANITEJA GUNTUPALLI",
    category: "Healthcare · Personal Brand",
    headline: "Turning medical expertise into a digital presence people can trust.",
    services: ["Strategy", "Content", "Personal Branding", "Social Media Management"],
    gradient: "from-blue-900/60 via-indigo-900/40 to-[#0033FF]/60",
    accentColor: "#AAFF00",
    description:
      "Positioned Dr. Maniteja as a premier healthcare authority through simplified medical breakdown reels, patient awareness series, and high-trust LinkedIn thought leadership.",
    results: ["1.8M+ Organic Impressions", "400+ Inbound Consultation Queries", "Top 1% Healthcare Creator"],
  },
  {
    id: "hoppy",
    client: "HOPPY",
    category: "Technology · Advertising",
    headline: "Making an emerging advertising product easier to understand.",
    services: ["Brand Communication", "Creative Direction", "Product Content", "Campaign Concepts"],
    gradient: "from-emerald-900/60 via-teal-900/40 to-cyan-900/60",
    accentColor: "#00E5FF",
    description:
      "Distilled complex tech infrastructure into slick, high-contrast video demonstrations and high-converting ad motion graphics that demystify the platform for prospective clients.",
    results: ["14.2x ROAS Peak", "+320% Enterprise Signups", "Full Product Visual Refresh"],
  },
  {
    id: "shiva-hospitals",
    client: "SHIVA HOSPITALS",
    category: "Healthcare",
    headline: "Building consistent communication for a healthcare brand.",
    services: ["Content Strategy", "Creative", "Social Media Management"],
    gradient: "from-[#0033FF]/70 via-blue-950/80 to-indigo-900/60",
    accentColor: "#AAFF00",
    description:
      "Established an end-to-end digital communication system across hospital departments, humanizing medical procedures and building community trust in emergency care.",
    results: ["2.4M+ Annual Reach", "85% Increase in Direct Inquiries", "Multi-department Campaign System"],
  },
  {
    id: "aamara-retreat",
    client: "AAMARA RETREAT",
    category: "Hospitality · Travel",
    headline: "Turning a destination into a digital experience.",
    services: ["Content", "Creative Direction", "Social Media"],
    gradient: "from-amber-900/50 via-amber-950/70 to-emerald-950/60",
    accentColor: "#FFD700",
    description:
      "Captured the serene luxury of Aamara Retreat through high-cinematic property walk-through reels, influencer stays, and seasonal campaign narratives that filled weekend bookings.",
    results: ["100% Weekend Occupancy Rate", "3.2M Reel Views", "Premium Brand Aesthetic Established"],
  },
];

interface ReelItem {
  id: string;
  client: string;
  categoryTag: string;
  gradient: string;
  metrics: string;
  videoUrl: string;
}

const reelItems: ReelItem[] = [
  {
    id: "dr-maniteja-reel",
    client: "Dr. Maniteja Guntupalli",
    categoryTag: "Educational Reel",
    gradient: "from-blue-900/70 via-indigo-950/80 to-[#0033FF]/70",
    metrics: "1.8M Reel Views",
    videoUrl: "/work/videos/Maniteja.mp4",
  },
  {
    id: "hoppy-reel",
    client: "Hoppy",
    categoryTag: "Product Campaign",
    gradient: "from-cyan-900/70 via-blue-950/80 to-indigo-950/90",
    metrics: "1.2M Reel Views",
    videoUrl: "/work/videos/Hoppy.mp4",
  },
  {
    id: "kanchi-reel",
    client: "Kanchi Cafe",
    categoryTag: "Food & Lifestyle",
    gradient: "from-amber-900/70 via-orange-950/80 to-[#0033FF]/50",
    metrics: "940K Local Reach",
    videoUrl: "/work/videos/Kanchicafe.mp4",
  },
  {
    id: "aamara-reel",
    client: "Aamara Retreat",
    categoryTag: "Property Reel",
    gradient: "from-emerald-900/70 via-teal-950/80 to-[#AAFF00]/20",
    metrics: "1.5M Reel Views",
    videoUrl: "/work/videos/Aamararetreat.mp4",
  },
  {
    id: "icon-luxe-reel",
    client: "The Icon Luxe Salon",
    categoryTag: "UGC / Beauty",
    gradient: "from-pink-900/70 via-purple-950/80 to-indigo-950/90",
    metrics: "620K Views",
    videoUrl: "/work/videos/Theiconluxesalon.mp4",
  },
  {
    id: "lunar-loft-reel",
    client: "Lunar Loft",
    categoryTag: "Brand & Lifestyle",
    gradient: "from-purple-900/70 via-slate-950/80 to-indigo-950/90",
    metrics: "540K Views",
    videoUrl: "/work/videos/Lunarloft.mp4",
  },
  {
    id: "koki-reel",
    client: "Koki",
    categoryTag: "Brand Campaign",
    gradient: "from-blue-900/70 via-indigo-950/80 to-[#0033FF]/70",
    metrics: "850K Impressions",
    videoUrl: "/work/videos/koki.mp4",
  },
];

interface UgcCard {
  id: string;
  hook: string;
  product: string;
  creator: string;
  format: string;
  gradient: string;
}

const ugcCards: UgcCard[] = [
  {
    id: "ugc-1",
    hook: `"Stop wasting ad budget on generic templates..."`,
    product: "Hoppy Ad Infrastructure",
    creator: "Tech & B2B SaaS Creator",
    format: "Problem-Solution Reel",
    gradient: "from-cyan-900/60 to-blue-900/60",
  },
  {
    id: "ugc-2",
    hook: `"I tested these 3 shoes so you don't have to..."`,
    product: "Kicks & Co. Footwear",
    creator: "Street Culture & Fashion Model",
    format: "Direct-to-Camera Review",
    gradient: "from-purple-900/60 to-pink-900/60",
  },
  {
    id: "ugc-3",
    hook: `"Get salon-grade hair transformation in 15 mins..."`,
    product: "The Icon Luxe Styling",
    creator: "Beauty & Lifestyle Influencer",
    format: "Before & After Transformation",
    gradient: "from-[#0033FF]/60 to-indigo-900/60",
  },
  {
    id: "ugc-4",
    hook: `"This hidden luxury retreat in Hyderabad feels unreal..."`,
    product: "Aamara Luxury Retreat",
    creator: "Travel & Lifestyle Storyteller",
    format: "Experience Walkthrough",
    gradient: "from-emerald-900/60 to-teal-950/60",
  },
];

type FilterCategory = "All" | "Healthcare" | "Hospitality" | "Lifestyle" | "Technology" | "Personal Brand" | "Real Estate";

interface SocialPiece {
  id: string;
  client: string;
  category: FilterCategory;
  type: string;
  title: string;
  highlight: string;
  gradient: string;
}

const socialGrid: SocialPiece[] = [
  {
    id: "s1",
    client: "Dr. Maniteja Guntupalli",
    category: "Personal Brand",
    type: "Instagram",
    title: "Understanding Preventive Care",
    highlight: "Educational Reel · 450K Views",
    gradient: "from-blue-900/60 to-indigo-900/60",
  },
  {
    id: "s2",
    client: "Hoppy",
    category: "Technology",
    type: "Campaign",
    title: "Platform Launch Motion Video",
    highlight: "Ad Creative · 14.2x ROAS",
    gradient: "from-cyan-900/60 to-blue-950/60",
  },
  {
    id: "s3",
    client: "Kanchi Cafe",
    category: "Hospitality",
    type: "Campaign",
    title: "Monsoon Special Menu Reveal",
    highlight: "Food Creative · 280K Views",
    gradient: "from-amber-900/60 to-orange-950/60",
  },
  {
    id: "s4",
    client: "Shiva Dental",
    category: "Healthcare",
    type: "Educational",
    title: "Modern Implant Awareness",
    highlight: "Patient Guide · High Inbound",
    gradient: "from-teal-900/60 to-emerald-950/60",
  },
  {
    id: "s5",
    client: "Aamara Retreat",
    category: "Hospitality",
    type: "Brand Content",
    title: "Weekend Escape Aesthetics",
    highlight: "Travel Series · 100% Booked",
    gradient: "from-emerald-900/60 to-teal-900/60",
  },
  {
    id: "s6",
    client: "The Icon Luxe Salon",
    category: "Lifestyle",
    type: "Instagram",
    title: "Bridal Styling Showcase",
    highlight: "Transformation · 320K Views",
    gradient: "from-pink-900/60 to-purple-950/60",
  },
  {
    id: "s7",
    client: "Shiva Hospitals",
    category: "Healthcare",
    type: "Campaign",
    title: "24/7 Emergency Care Campaign",
    highlight: "Community Trust · 600K Reach",
    gradient: "from-blue-950/80 to-indigo-900/60",
  },
  {
    id: "s8",
    client: "Lunar Loft",
    category: "Lifestyle",
    type: "Brand Content",
    title: "Minimalist Living Series",
    highlight: "Aesthetics · 410K Reach",
    gradient: "from-purple-950/70 to-slate-900/70",
  },
];

const whatWeDoCapabilities = [
  {
    title: "Personal Branding",
    desc: "Build a recognisable digital presence around people and their expertise.",
    icon: "👤",
  },
  {
    title: "Social Media Management",
    desc: "Consistent content, publishing and community building across platforms.",
    icon: "📱",
  },
  {
    title: "Content & Creative",
    desc: "Reels, static creatives, carousels, campaigns and platform-native content.",
    icon: "🎨",
  },
  {
    title: "UGC Ads",
    desc: "Creator-led content designed to feel native, build trust and drive action.",
    icon: "📹",
  },
  {
    title: "Paid Social",
    desc: "Amplify strong creative through targeted paid campaigns.",
    icon: "📈",
  },
  {
    title: "Creative Campaigns",
    desc: "Concept, produce and execute campaigns that give brands something worth talking about.",
    icon: "🚀",
  },
];

const industryRange = [
  {
    category: "Healthcare",
    clients: ["Dr. Maniteja Guntupalli", "Shiva Hospitals", "Shiva Dental"],
    borderColor: "border-blue-500/30",
  },
  {
    category: "Hospitality & Food",
    clients: ["Aamara Retreat", "Kanchi Cafe"],
    borderColor: "border-amber-500/30",
  },
  {
    category: "Lifestyle & Beauty",
    clients: ["The Icon Luxe Salon", "Lunar Loft"],
    borderColor: "border-pink-500/30",
  },
  {
    category: "Technology & Advertising",
    clients: ["Hoppy"],
    borderColor: "border-cyan-500/30",
  },
];

const testimonials = [
  {
    quote:
      "Basic Socials built a digital voice for our healthcare practice that commands respect and drives patient trust from day one.",
    author: "Dr. Maniteja Guntupalli",
    role: "Founding Specialist",
  },
  {
    quote:
      "They took an emerging advertising product and created brand communications that made immediate sense to our market.",
    author: "Hoppy Founding Team",
    role: "Technology & Advertising",
  },
  {
    quote:
      "Our retreat's online presence feels like a direct extension of our physical hospitality experience. Weekend bookings skyrocketed.",
    author: "Aamara Retreat Leadership",
    role: "Hospitality & Travel",
  },
];

function OurWorkPage() {
  useLenis();
  useReveal();

  const [activeReelId, setActiveReelId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<FlagshipProject | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const amount = direction === "left" ? -340 : 340;
    carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  const filteredSocialGrid =
    activeFilter === "All"
      ? socialGrid
      : socialGrid.filter((s) => s.category === activeFilter);

  return (
    <div className="min-h-screen text-[#F7F7F2] bg-[#2929FF] font-sans selection:bg-[#B7FF00] selection:text-[#0B0B0D]">
      <Nav />

      <main className="pt-28 md:pt-36">
        {/* ============================================================ */}
        {/* 01. HERO — NEON BLUE (#2929FF) */}
        {/* ============================================================ */}
        <section className="px-6 pt-8 pb-24 md:pb-36 bg-[#2929FF]">
          <div className="mx-auto max-w-7xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B7FF00]/30 bg-black/20 px-4 py-1.5 text-xs uppercase tracking-widest text-[#B7FF00] font-semibold mb-8 reveal">
              <span className="h-2 w-2 rounded-full bg-[#B7FF00] animate-pulse" />
              <span>SELECTED WORK</span>
            </div>

            <h1 className="font-display text-[clamp(3.2rem,8.5vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.04em] text-[#F7F7F2] max-w-5xl reveal reveal-delay-1">
              We build brands <br />
              <span className="text-[#B7FF00] italic text-[1.12em] font-normal my-1 inline-block drop-shadow-[0_0_20px_rgba(183,255,0,0.3)]">
                PEOPLE
              </span>{" "}
              <br />
              remember.
            </h1>

            <p className="mt-8 max-w-2xl text-[#F7F7F2]/85 text-lg md:text-2xl leading-relaxed font-normal reveal reveal-delay-2">
              From personal brands and healthcare to technology, hospitality and lifestyle — we build organic social reels, UGC ads, and digital brand engines people care about.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4 reveal reveal-delay-3">
              <a
                href="#reels"
                className="rounded-full bg-[#B7FF00] px-7 py-4 text-sm font-bold text-[#0B0B0D] transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(183,255,0,0.4)] flex items-center gap-2"
              >
                <span>EXPLORE REEL SHOWCASE</span>
                <span className="text-base font-bold">↓</span>
              </a>
              <a
                href="#contact"
                className="rounded-full border border-[#F7F7F2]/30 bg-transparent px-7 py-4 text-sm font-semibold text-[#F7F7F2] transition-all duration-300 hover:border-[#B7FF00] hover:text-[#B7FF00] hover:scale-105 flex items-center gap-2"
              >
                <span>START A CONVERSATION</span>
                <span className="text-base font-bold">↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 02. REAL CLIENTS — OFF-WHITE (#F7F7F2) EDITORIAL TYPOGRAPHY */}
        {/* ============================================================ */}
        <section id="clients" className="px-6 py-24 md:py-32 bg-[#F7F7F2] text-[#0B0B0D]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-[#0B0B0D]/10 pb-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#2929FF] font-bold block mb-2">
                  02 / CLIENT ROSTER
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-[#0B0B0D]">
                  REAL CLIENTS. <br />
                  REAL REELS. REAL RESULTS.
                </h2>
              </div>
              <p className="text-[#0B0B0D]/70 text-base md:text-lg max-w-md font-medium">
                High-impact brand systems and digital presence built across diverse industries.
              </p>
            </div>

            {/* Editorial Client List - Big Bold Typography */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12">
              {clientsList.map((c, idx) => {
                const colorClass =
                  idx % 3 === 0
                    ? "text-[#0B0B0D] hover:text-[#2929FF]"
                    : idx % 3 === 1
                    ? "text-[#2929FF] hover:text-[#0B0B0D]"
                    : "text-[#0B0B0D] hover:text-[#2929FF]";

                return (
                  <div
                    key={c.name}
                    className="border-b border-[#0B0B0D]/15 pb-8 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2929FF] block mb-1">
                          0{idx + 1}
                        </span>
                        <h3
                          className={`font-display text-3xl md:text-5xl font-extrabold tracking-tight transition-colors ${colorClass}`}
                        >
                          {c.name}
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-[#0B0B0D]/60 bg-[#0B0B0D]/5 border border-[#0B0B0D]/10 rounded-full px-3.5 py-1 mt-2">
                        {c.industry}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 03. FEATURED WORK — NEON BLUE (#2929FF) */}
        {/* ============================================================ */}
        <section id="featured" className="px-6 py-24 md:py-36 bg-[#2929FF] text-[#F7F7F2]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B7FF00] font-bold block mb-2">
                  03 / FEATURED CASE STUDIES
                </span>
                <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-[#F7F7F2]">
                  Selected projects.
                </h2>
              </div>
              <p className="text-[#F7F7F2]/80 text-base md:text-xl max-w-md">
                Deep-dive into flagship brand communications and performance growth models.
              </p>
            </div>

            <div className="space-y-16">
              {flagshipProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className="rounded-[2.5rem] bg-black/30 border border-white/20 p-8 md:p-14 transition-all duration-500 hover:border-[#B7FF00]/60 relative overflow-hidden group shadow-2xl"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="font-display text-2xl md:text-3xl font-extrabold text-[#B7FF00]">
                          0{idx + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#B7FF00] bg-[#B7FF00]/10 border border-[#B7FF00]/30 rounded-full px-3.5 py-1">
                          {project.client}
                        </span>
                        <span className="text-xs text-[#F7F7F2]/60 font-medium">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="font-display text-3xl md:text-5xl font-extrabold text-[#F7F7F2] leading-tight">
                        "{project.headline}"
                      </h3>

                      <p className="text-[#F7F7F2]/85 text-base md:text-lg leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.services.map((s) => (
                          <span
                            key={s}
                            className="text-xs text-[#F7F7F2] bg-white/10 border border-white/20 rounded-full px-4 py-1.5 font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => setSelectedCaseStudy(project)}
                          className="rounded-full bg-[#B7FF00] px-6 py-3 text-xs md:text-sm font-bold text-[#0B0B0D] transition-transform hover:scale-105 flex items-center gap-2"
                        >
                          <span>VIEW CASE STUDY</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-center">
                      <div className="rounded-2xl bg-[#0B0B0D]/80 p-7 border border-[#B7FF00]/30 space-y-5">
                        <span className="text-xs uppercase tracking-wider text-[#B7FF00] font-bold block border-b border-white/10 pb-3">
                          Key Performance Metrics
                        </span>
                        <ul className="space-y-4">
                          {project.results.map((res) => (
                            <li key={res} className="flex items-center gap-3 text-base text-[#F7F7F2] font-bold">
                              <span className="h-2.5 w-2.5 rounded-full bg-[#B7FF00] shadow-[0_0_8px_#B7FF00]" />
                              <span>{res}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Modal */}
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
                <h4 className="text-xs uppercase tracking-wider text-[#F7F7F2]/60 font-bold">
                  Services Provided
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.services.map((s) => (
                    <span
                      key={s}
                      className="text-xs text-[#F7F7F2] bg-white/10 border border-white/20 rounded-full px-4 py-1.5 font-medium"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/20 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-[#B7FF00] font-bold">
                  Measurable Impact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedCaseStudy.results.map((r) => (
                    <div key={r} className="bg-black/40 rounded-xl p-4 text-center border border-[#B7FF00]/30">
                      <span className="block text-sm font-bold text-[#B7FF00]">{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <a
                  href="#contact"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="rounded-full bg-[#B7FF00] px-6 py-3 text-xs md:text-sm font-bold text-[#0B0B0D]"
                >
                  Build a system like this →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 04. REEL GALLERY — OFF-WHITE (#F7F7F2) */}
        {/* ============================================================ */}
        <section id="reels" className="px-6 py-24 md:py-36 bg-[#F7F7F2] text-[#0B0B0D]">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#2929FF] font-bold block mb-2">
                  04 / REEL SHOWCASE (9:16)
                </span>
                <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-[#0B0B0D]">
                  Work in motion.
                </h2>
                <p className="mt-3 text-[#0B0B0D]/70 text-lg md:text-xl max-w-xl">
                  Vertical 9:16 Reels & campaign motion designed to stop scrolling hands.
                </p>
              </div>

              {/* Navigation Arrows */}
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

            {/* 9:16 Reel Carousel */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-none py-4 px-1"
            >
              {reelItems.map((reel, idx) => {
                const isPlayingThis = activeReelId === reel.id;
                const numberColor = idx % 2 === 0 ? "text-[#2929FF]" : "text-[#B7FF00]";

                return (
                  <div
                    key={reel.id}
                    className="snap-start shrink-0 w-[290px] sm:w-[330px] md:w-[360px] aspect-[9/16] relative rounded-[2.2rem] overflow-hidden bg-[#0B0B0D] border-2 border-[#0B0B0D]/10 hover:border-[#2929FF] transition-all duration-500 group shadow-xl"
                  >
                    {isPlayingThis ? (
                      <div className="w-full h-full bg-black relative">
                        <video
                          src={reel.videoUrl}
                          controls
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover rounded-[2.2rem]"
                        />
                        <button
                          onClick={() => setActiveReelId(null)}
                          className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-black/70 text-white flex items-center justify-center text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col justify-between p-6 relative">
                        {/* Background Video Preview */}
                        <video
                          src={reel.videoUrl}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"
                        />

                        {/* Top Category Badge */}
                        <div className="flex items-center justify-between z-10">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-[#0B0B0D] bg-[#B7FF00] rounded-full px-3 py-1 flex items-center gap-1.5 shadow-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0B0B0D] animate-pulse" />
                            <span>{reel.categoryTag}</span>
                          </span>
                          <span className={`text-xs font-extrabold font-display ${numberColor}`}>
                            0{idx + 1} / {reel.client.split(" ")[0].toUpperCase()}
                          </span>
                        </div>

                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <button
                            onClick={() => setActiveReelId(reel.id)}
                            className="h-18 w-18 md:h-20 md:w-20 rounded-full bg-[#B7FF00] text-[#0B0B0D] flex items-center justify-center shadow-[0_0_30px_rgba(183,255,0,0.6)] group-hover:scale-110 transition-transform duration-300"
                            aria-label={`Play ${reel.client}`}
                          >
                            <span className="font-display text-2xl md:text-3xl ml-1 font-extrabold">
                              ▶
                            </span>
                          </button>
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="relative z-10 pt-8 space-y-1.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent -mx-6 -mb-6 p-6 rounded-b-[2.2rem]">
                          <h3 className="font-display text-2xl font-extrabold text-[#F7F7F2] tracking-tight group-hover:text-[#B7FF00] transition-colors">
                            {reel.client}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-[#F7F7F2]/80">
                            <span className="font-medium">{reel.categoryTag}</span>
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
        {/* 05. BIG STATEMENT — DEEP BLACK (#0B0B0D) */}
        {/* ============================================================ */}
        <section className="px-6 py-28 md:py-40 bg-[#0B0B0D] text-[#F7F7F2] border-t border-white/10">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="font-display text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-[#F7F7F2] leading-[1.02]">
              WE DON'T MAKE CONTENT. <br />
              WE MAKE{" "}
              <span className="text-[#B7FF00] underline decoration-[#2929FF] underline-offset-8">
                PEOPLE CARE.
              </span>
            </h2>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 06. SURPRISE INTERMISSION — PARROT GREEN (#B7FF00) */}
        {/* ============================================================ */}
        <section className="px-6 py-20 md:py-28 bg-[#B7FF00] text-[#0B0B0D]">
          <div className="mx-auto max-w-5xl text-center space-y-6">
            <h3 className="font-display text-3xl md:text-6xl font-extrabold tracking-tight text-[#0B0B0D]">
              KEEP SCROLLING. THERE'S MORE.
            </h3>
            <div className="flex justify-center pt-2">
              <span className="text-6xl md:text-8xl text-[#2929FF] animate-bounce">↓</span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 07. FINAL CTA — NEON BLUE (#2929FF) */}
        {/* ============================================================ */}
        <section id="contact" className="px-6 py-28 md:py-40 bg-[#2929FF] text-[#F7F7F2]">
          <div className="mx-auto max-w-5xl text-center space-y-8">
            <span className="text-xs uppercase tracking-widest text-[#B7FF00] font-bold block">
              07 / LET'S WORK TOGETHER
            </span>

            <h2 className="font-display text-4xl md:text-7xl font-extrabold tracking-tight text-[#F7F7F2] leading-tight">
              Your brand could be our next piece of work.
            </h2>
            <p className="text-[#F7F7F2]/90 text-xl md:text-2xl max-w-xl mx-auto font-normal">
              Tell us what you're building.
            </p>

            <div className="pt-6 flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/919866472562"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#B7FF00] px-8 py-4 text-base font-extrabold text-[#0B0B0D] transition-transform hover:scale-105 shadow-[0_0_35px_rgba(183,255,0,0.5)] flex items-center gap-2"
              >
                <span>START A CONVERSATION</span>
                <span className="text-xl">↗</span>
              </a>
            </div>

            <p className="pt-8 text-xs md:text-sm text-[#F7F7F2]/60 tracking-wider uppercase font-bold">
              Personal Branding · Social Media · Content Strategy · Creative Direction · UGC Ads
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
