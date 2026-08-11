import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { useMagnetic } from "@/hooks/use-magnetic";
import { useLenis } from "@/hooks/use-lenis";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { WhoWeWorkWith } from "@/components/site/WhoWeWorkWith";
import { Services } from "@/components/site/Services";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Portfolio } from "@/components/site/Portfolio";
import { AiSearch } from "@/components/site/AiSearch";
import { Automations } from "@/components/site/Automations";
import { BlogPreview } from "@/components/site/BlogPreview";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => {
    const title = "Basic Socials · Grow with Content + AI";
    const description =
      "A content and AI studio in Hyderabad. Content that gets your business noticed, AI systems that keep it running.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Index,
});

function Index() {
  useReveal();
  useLenis();
  useMagnetic();
  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main>
        <Hero />
        <WhoWeWorkWith />
        <Services />
        <AiSearch />
        <Automations />
        <HowItWorks />
        <Portfolio />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
