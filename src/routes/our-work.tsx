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
    id: "hoppy-reel",
    client: "Hoppy",
    categoryTag: "Product Campaign",
    gradient: "from-cyan-900/70 via-blue-950/80 to-indigo-950/90",
    metrics: "1.2M Reel Views",
    videoUrl: "/work/videos/hoppy.mp4",
  },
  {
    id: "kanchi-reel",
    client: "Kanchi Cafe",
    categoryTag: "Food & Lifestyle",
    gradient: "from-amber-900/70 via-orange-950/80 to-[#0033FF]/50",
    metrics: "940K Local Reach",
    videoUrl: "/work/videos/kanchi-cafe.mp4",
  },
  {
    id: "aamara-reel",
    client: "Aamara Retreat",
    categoryTag: "Property Reel",
    gradient: "from-emerald-900/70 via-teal-950/80 to-[#AAFF00]/20",
    metrics: "1.5M Reel Views",
    videoUrl: "/work/videos/aamara-retreat.mp4",
  },
  {
    id: "dr-maniteja-reel",
    client: "Dr. Maniteja Guntupalli",
    categoryTag: "Educational Reel",
    gradient: "from-blue-900/70 via-indigo-950/80 to-[#0033FF]/70",
    metrics: "850K Impressions",
    videoUrl: "/work/videos/dr-maniteja.mp4",
  },
  {
    id: "icon-luxe-reel",
    client: "The Icon Luxe Salon",
    categoryTag: "UGC / Beauty",
    gradient: "from-pink-900/70 via-purple-950/80 to-indigo-950/90",
    metrics: "620K Views",
    videoUrl: "/work/videos/the-icon-salon.mp4",
  },
  {
    id: "shiva-hosp-reel",
    client: "Shiva Hospitals",
    categoryTag: "Healthcare Awareness",
    gradient: "from-blue-950/80 via-cyan-950/80 to-indigo-900/70",
    metrics: "780K Views",
    videoUrl: "/work/videos/shiva-hospitals.mp4",
  },
  {
    id: "shiva-dental-reel",
    client: "Shiva Dental",
    categoryTag: "Dental Education",
    gradient: "from-teal-900/70 via-blue-950/80 to-emerald-950/80",
    metrics: "490K Views",
    videoUrl: "/work/videos/shiva-dental.mp4",
  },
  {
    id: "lunar-loft-reel",
    client: "Lunar Loft",
    categoryTag: "Brand & Lifestyle",
    gradient: "from-purple-900/70 via-slate-950/80 to-indigo-950/90",
    metrics: "540K Views",
    videoUrl: "/work/videos/lunar-loft.mp4",
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
    <div className="min-h-screen text-foreground bg-background">
      <Nav />
      <main className="pt-32 md:pt-40 pb-24">
        {/* ============================================================ */}
        {/* 01. HERO */}
        {/* ============================================================ */}
        <section className="px-6 pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl">
            <span className="pill reveal">
              <span className="h-2 w-2 rounded-full bg-[#AAFF00] animate-pulse" />
              SELECTED WORK
            </span>

            <h1 className="mt-6 font-display text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.93] tracking-[-0.04em] max-w-5xl reveal reveal-delay-1">
              We build brands <span className="italic font-medium grad-text">people remember</span>.
            </h1>

            <p className="mt-6 max-w-2xl text-white/75 text-lg md:text-xl leading-relaxed reveal reveal-delay-2">
              From personal brands and healthcare to hospitality, lifestyle and technology — we create the strategy, content and digital presence behind brands that want to be seen differently.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 reveal reveal-delay-3">
              <a
                href="#reels"
                className="btn-green inline-flex items-center gap-2 text-sm font-semibold tracking-tight"
              >
                <span>Explore Reel Showcase</span>
                <span className="text-base">↓</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/20 hover:border-white/40"
              >
                Start a Conversation →
              </a>
            </div>

            {/* Hero Visual Banner */}
            <div className="mt-14 relative overflow-hidden rounded-[2.5rem] glass border border-white/15 p-2 md:p-3 reveal reveal-delay-4">
              <div className="relative aspect-[16/7] md:aspect-[21/8] w-full overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#0033FF]/80 via-indigo-950 to-black flex items-center justify-center text-center">
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, rgba(170,255,0,0.3), transparent 70%)",
                  }}
                />
                <div className="relative z-10 px-6 max-w-3xl space-y-3">
                  <span className="text-xs uppercase tracking-widest text-[#AAFF00] font-semibold">
                    REAL CLIENTS · REAL REELS · REAL RESULTS
                  </span>
                  <p className="font-display text-2xl md:text-4xl font-bold text-white tracking-tight leading-snug">
                    Strategy, Creative Direction & Social Engines
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-2">
                    {clientsList.map((c) => (
                      <span
                        key={c.name}
                        className="text-xs text-white/80 bg-white/10 border border-white/15 rounded-full px-3 py-1 font-medium"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 02. CLIENTS (Social Proof) */}
        {/* ============================================================ */}
        <section id="clients" className="px-6 py-20 border-t border-white/10 bg-black/20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-widest text-[#AAFF00] font-semibold">
                CLIENTS WE WORK WITH
              </span>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
                People. Businesses. Brands.
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {clientsList.map((c, i) => (
                <div
                  key={c.name}
                  className={`glass rounded-2xl p-6 text-center hover:border-[#AAFF00]/40 transition-all duration-300 hover:-translate-y-1 reveal reveal-delay-${(i % 3) + 1
                    }`}
                >
                  <span className="block font-display text-lg md:text-xl font-bold text-white tracking-tight">
                    {c.name}
                  </span>
                  <span className="block mt-1 text-xs text-white/50 font-medium">
                    {c.industry}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 03. FEATURED WORK (4 Flagship Projects) */}
        {/* ============================================================ */}
        <section id="featured" className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-6 flex-wrap mb-16">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#AAFF00] font-semibold">
                  FEATURED WORK
                </span>
                <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight text-white">
                  Selected projects
                </h2>
              </div>
              <p className="text-white/60 text-sm max-w-xs">
                Deep-dive into four flagship brand systems we built from the ground up.
              </p>
            </div>

            <div className="space-y-12">
              {flagshipProjects.map((project, idx) => (
                <div
                  key={project.id}
                  className={`group relative overflow-hidden rounded-[2.5rem] glass p-8 md:p-14 border border-white/15 transition-all duration-500 hover:border-white/30 reveal reveal-delay-${idx + 1
                    }`}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -inset-full opacity-30 group-hover:opacity-50 transition-opacity duration-700 bg-gradient-to-r ${project.gradient} blur-3xl`}
                  />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="flex items-center gap-3">
                        <span
                          className="font-display text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                          style={{
                            color: project.accentColor,
                            borderColor: `${project.accentColor}40`,
                            backgroundColor: `${project.accentColor}10`,
                          }}
                        >
                          {project.client}
                        </span>
                        <span className="text-xs text-white/50 font-medium">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                        "{project.headline}"
                      </h3>

                      <p className="text-white/75 text-base md:text-lg leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.services.map((s) => (
                          <span
                            key={s}
                            className="text-xs text-white/80 bg-white/10 border border-white/15 rounded-full px-3.5 py-1.5 font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={() => setSelectedCaseStudy(project)}
                          className="btn-green inline-flex items-center gap-2 text-sm"
                        >
                          <span>View Case Study</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-center">
                      <div className="rounded-2xl glass-strong p-6 border border-white/20 space-y-4">
                        <span className="text-xs uppercase tracking-wider text-white/50 font-semibold block border-b border-white/10 pb-2">
                          Key Performance Metrics
                        </span>
                        <ul className="space-y-3">
                          {project.results.map((res) => (
                            <li key={res} className="flex items-center gap-3 text-sm text-white font-medium">
                              <span className="h-2 w-2 rounded-full bg-[#AAFF00]" />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedCaseStudy(null)}
          >
            <div
              className="relative w-full max-w-2xl rounded-[2.5rem] glass-strong p-8 md:p-12 text-white border border-white/30 shadow-2xl overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                ✕
              </button>

              <span className="text-xs uppercase tracking-wider font-semibold text-[#AAFF00]">
                {selectedCaseStudy.category}
              </span>

              <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
                {selectedCaseStudy.client}
              </h2>

              <p className="mt-4 text-xl text-[#AAFF00] font-semibold">
                "{selectedCaseStudy.headline}"
              </p>

              <p className="mt-6 text-white/80 text-base md:text-lg leading-relaxed">
                {selectedCaseStudy.description}
              </p>

              <div className="mt-8 pt-6 border-t border-white/15 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                  Services Provided
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.services.map((s) => (
                    <span
                      key={s}
                      className="text-xs text-white bg-white/10 border border-white/20 rounded-full px-4 py-1.5"
                    >
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 space-y-3">
                <h4 className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                  Measurable Impact
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedCaseStudy.results.map((r) => (
                    <div key={r} className="bg-white/10 rounded-xl p-4 text-center border border-white/15">
                      <span className="block text-sm font-bold text-white">{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <a
                  href="#contact"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="btn-green text-sm"
                >
                  Build a system like this →
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* 04. WORK IN MOTION — 9:16 VERTICAL REEL CAROUSEL */}
        {/* ============================================================ */}
        <section id="reels" className="px-6 py-24 border-t border-white/10 bg-black/30">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#AAFF00] font-semibold border border-[#AAFF00]/30 rounded-full px-4 py-1.5 bg-[#AAFF00]/10 inline-block mb-3">
                  WORK IN MOTION
                </span>
                <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white">
                  Real work. Real brands.
                </h2>
                <p className="mt-2 text-white/70 text-base md:text-lg">
                  Vertical 9:16 Reels & campaign motion designed to stop scrolling hands.
                </p>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => scrollCarousel("left")}
                  className="h-12 w-12 rounded-full glass border border-white/20 hover:border-[#AAFF00] text-white flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Scroll Left"
                >
                  ←
                </button>
                <button
                  onClick={() => scrollCarousel("right")}
                  className="h-12 w-12 rounded-full glass border border-white/20 hover:border-[#AAFF00] text-white flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Scroll Right"
                >
                  →
                </button>
              </div>
            </div>

            {/* 9:16 Reel Cards Carousel */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 snap-x snap-mandatory scrollbar-none py-4 px-1"
            >
              {reelItems.map((reel, idx) => {
                const isPlayingThis = activeReelId === reel.id;

                return (
                  <div
                    key={reel.id}
                    className={`snap-start shrink-0 w-[280px] sm:w-[320px] md:w-[360px] aspect-[9/16] relative rounded-[2.2rem] overflow-hidden glass-strong border border-white/20 hover:border-[#AAFF00]/60 transition-all duration-500 group shadow-2xl reveal reveal-delay-${(idx % 3) + 1
                      }`}
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
                          className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-black/60 text-white/80 hover:text-white flex items-center justify-center text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-b ${reel.gradient} flex flex-col justify-between p-6 relative`}
                      >
                        {/* Top Category Badge */}
                        <div className="flex items-center justify-between z-10">
                          <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-[#AAFF00] bg-black/40 backdrop-blur-md border border-[#AAFF00]/30 rounded-full px-3 py-1 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#AAFF00] animate-pulse" />
                            <span>{reel.categoryTag}</span>
                          </span>
                          <span className="text-[0.7rem] text-white/60 bg-black/30 backdrop-blur-md rounded-full px-2.5 py-1">
                            9:16 Reel
                          </span>
                        </div>

                        {/* Center Big Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <button
                            onClick={() => setActiveReelId(reel.id)}
                            className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-[#AAFF00] text-[#0033FF] flex items-center justify-center shadow-[0_0_35px_rgba(170,255,0,0.6)] group-hover:scale-110 transition-transform duration-300"
                            aria-label={`Play ${reel.client} ${reel.categoryTag}`}
                          >
                            <span className="font-display text-2xl md:text-3xl ml-1 font-bold">
                              ▶
                            </span>
                          </button>
                        </div>

                        {/* Bottom Info Overlay */}
                        <div className="relative z-10 pt-6 space-y-1.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent -mx-6 -mb-6 p-6 rounded-b-[2.2rem]">
                          <h3 className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-[#AAFF00] transition-colors">
                            {reel.client}
                          </h3>
                          <div className="flex items-center justify-between text-xs text-white/70">
                            <span className="font-medium">{reel.categoryTag}</span>
                            <span className="text-[#AAFF00] font-semibold">{reel.metrics}</span>
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
        {/* UGC ADS SECTION ("UGC THAT FEELS REAL.") */}
        {/* ============================================================ */}
        <section className="px-6 py-24 border-t border-white/10 bg-gradient-to-b from-black/40 to-background">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#AAFF00] font-semibold border border-[#AAFF00]/30 rounded-full px-4 py-1.5 bg-[#AAFF00]/10 inline-block">
                UGC THAT FEELS REAL.
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                We create UGC-style ads that don't feel like ads.
              </h2>
              <p className="text-white/75 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                From creator-led product demonstrations to testimonials, hooks, problem-solution videos and conversion-focused creatives — we produce UGC content designed for paid social.
              </p>

              {/* Process pipeline */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-[#AAFF00]">
                <span>Concept</span>
                <span>→</span>
                <span>Script</span>
                <span>→</span>
                <span>Creator</span>
                <span>→</span>
                <span>Production</span>
                <span>→</span>
                <span className="text-white bg-white/10 px-3 py-1 rounded-full border border-white/20">
                  Ad Creative
                </span>
              </div>
            </div>

            {/* 4 UGC Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ugcCards.map((card, idx) => (
                <div
                  key={card.id}
                  className={`group relative overflow-hidden rounded-[2.2rem] glass p-7 border border-white/15 flex flex-col justify-between hover:border-[#AAFF00]/40 transition-all duration-500 hover:-translate-y-2 reveal reveal-delay-${idx + 1
                    }`}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-br ${card.gradient}`}
                  />

                  <div className="relative z-10 space-y-4">
                    <span className="text-[0.7rem] uppercase tracking-wider font-semibold text-[#AAFF00] bg-[#AAFF00]/10 border border-[#AAFF00]/20 rounded-full px-3 py-1 inline-block">
                      {card.format}
                    </span>

                    <p className="font-display text-lg font-bold text-white leading-snug group-hover:text-[#AAFF00] transition-colors">
                      {card.hook}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 pt-4 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Product</span>
                      <span className="text-white font-medium">{card.product}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50">Creator</span>
                      <span className="text-white/80">{card.creator}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <a
                href="#contact"
                className="btn-green inline-flex items-center gap-2 text-sm font-semibold"
              >
                <span>See UGC Work</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 05. SELECTED SOCIAL WORK (Static Work Grid) */}
        {/* ============================================================ */}
        <section className="px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#AAFF00] font-semibold">
                  STATIC & CREATIVE PORTFOLIO
                </span>
                <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight text-white">
                  A closer look.
                </h2>
              </div>

              {/* Category Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {(
                  [
                    "All",
                    "Healthcare",
                    "Hospitality",
                    "Lifestyle",
                    "Technology",
                    "Personal Brand",
                    "Real Estate",
                  ] as FilterCategory[]
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-300 ${activeFilter === cat
                        ? "bg-[#AAFF00] text-[#0033FF] font-bold shadow-[0_0_15px_rgba(170,255,0,0.3)]"
                        : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Columns Desktop Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSocialGrid.map((piece, i) => (
                <div
                  key={piece.id}
                  className={`group relative overflow-hidden rounded-[2rem] glass p-7 border border-white/15 flex flex-col justify-between hover:border-white/40 hover:-translate-y-1.5 transition-all duration-500 reveal reveal-delay-${(i % 3) + 1
                    }`}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-br ${piece.gradient}`}
                  />

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider font-semibold text-[#AAFF00] bg-[#AAFF00]/10 border border-[#AAFF00]/20 rounded-full px-3 py-1">
                        {piece.type}
                      </span>
                      <span className="text-xs text-white/50">{piece.category}</span>
                    </div>

                    <div className="pt-2">
                      <h4 className="font-display text-xl font-bold text-white group-hover:text-[#AAFF00] transition-colors">
                        {piece.client}
                      </h4>
                      <p className="mt-1 text-sm text-white/80 font-medium">{piece.title}</p>
                    </div>
                  </div>

                  <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                    <span>{piece.highlight}</span>
                    <span className="text-[#AAFF00] font-semibold group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 06. WHAT WE ACTUALLY DO (Capabilities Framework) */}
        {/* ============================================================ */}
        <section className="px-6 py-24 border-t border-white/10 bg-black/20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl mb-16 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#AAFF00] font-semibold">
                WHAT WE DO
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                Strategy → Content → Distribution → Growth
              </h2>
              <p className="text-white/70 text-lg">
                We build the brand organically, create content, produce UGC, and use paid distribution to scale what works.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatWeDoCapabilities.map((cap, idx) => (
                <div
                  key={cap.title}
                  className={`glass rounded-3xl p-8 border border-white/15 hover:border-[#AAFF00]/40 transition-all duration-300 hover:-translate-y-1 space-y-4 reveal reveal-delay-${(idx % 3) + 1
                    }`}
                >
                  <div className="text-3xl">{cap.icon}</div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 07. CLIENT RANGE (Industry Matrix) */}
        {/* ============================================================ */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-widest text-[#AAFF00] font-semibold">
                INDUSTRY VERSATILITY
              </span>
              <h2 className="mt-3 font-display text-4xl md:text-6xl font-bold tracking-tight text-white">
                Different industries. One approach.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryRange.map((ind, idx) => (
                <div
                  key={ind.category}
                  className={`rounded-[2rem] glass p-8 border ${ind.borderColor} space-y-6 reveal reveal-delay-${(idx % 4) + 1
                    }`}
                >
                  <h3 className="font-display text-xl font-bold text-[#AAFF00]">
                    {ind.category}
                  </h3>

                  <ul className="space-y-3">
                    {ind.clients.map((cli) => (
                      <li
                        key={cli}
                        className="flex items-center gap-2 text-sm text-white/90 font-medium"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#AAFF00]" />
                        <span>{cli}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Subtitle statement */}
            <div className="mt-14 text-center">
              <p className="font-display text-xl md:text-2xl italic text-white/80 font-medium max-w-xl mx-auto">
                "We understand brands, not just industries."
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 08. TESTIMONIALS */}
        {/* ============================================================ */}
        <section className="px-6 py-20 border-t border-white/10 bg-black/30">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-widest text-[#AAFF00] font-semibold">
                CLIENT TRUST
              </span>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
                What our clients say.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <div
                  key={t.author}
                  className={`glass rounded-[2.5rem] p-8 border border-white/15 flex flex-col justify-between space-y-6 reveal reveal-delay-${idx + 1
                    }`}
                >
                  <p className="text-white/85 text-base md:text-lg leading-relaxed italic">
                    "{t.quote}"
                  </p>
                  <div>
                    <span className="block font-display text-base font-bold text-[#AAFF00]">
                      {t.author}
                    </span>
                    <span className="block text-xs text-white/50 font-medium">{t.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 09. FINAL CTA */}
        {/* ============================================================ */}
        <section id="contact" className="px-6 py-28 md:py-36">
          <div className="mx-auto max-w-5xl text-center space-y-8 reveal">
            <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-white leading-tight">
              Your brand could be our next piece of work.
            </h2>
            <p className="text-white/70 text-xl max-w-xl mx-auto">
              Tell us what you're building.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/919866472562"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-green text-base px-8 py-4 inline-flex items-center gap-2 font-bold shadow-[0_0_30px_rgba(170,255,0,0.5)]"
              >
                <span>Start a Conversation</span>
                <span>→</span>
              </a>
            </div>

            <p className="pt-6 text-xs md:text-sm text-white/50 tracking-wider uppercase font-semibold">
              Personal Branding · Social Media · Content Strategy · Creative Direction · UGC Ads
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
