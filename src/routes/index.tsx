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
import { Faq } from "@/components/site/Faq";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
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
        <HowItWorks />
        <Portfolio />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
