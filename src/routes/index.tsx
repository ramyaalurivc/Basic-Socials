import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { WhoWeWorkWith } from "@/components/site/WhoWeWorkWith";
import { Services } from "@/components/site/Services";
import { HowItWorks } from "@/components/site/HowItWorks";
import { Portfolio } from "@/components/site/Portfolio";
import { AiSearch } from "@/components/site/AiSearch";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useReveal();
  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main>
        <Hero />
        <WhoWeWorkWith />
        <Services />
        <HowItWorks />
        <Portfolio />
        <AiSearch />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
