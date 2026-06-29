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
  head: () => ({
    meta: [
      { title: "Basic Socials · Creative Marketing & Consulting Agency, Hyderabad" },
      {
        name: "description",
        content:
          "We basically handle your entire marketing — branding, social, performance, video & AI, talent, and consulting. Based in Hyderabad.",
      },
      {
        property: "og:title",
        content: "Basic Socials · Creative Marketing & Consulting Agency, Hyderabad",
      },
      {
        property: "og:description",
        content:
          "We basically handle your entire marketing — branding, social, performance, video & AI, talent, and consulting. Based in Hyderabad.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.basicsocials.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@basicsocials" },
      {
        name: "twitter:title",
        content: "Basic Socials · Creative Marketing & Consulting Agency, Hyderabad",
      },
      {
        name: "twitter:description",
        content:
          "We basically handle your entire marketing — branding, social, performance, video & AI, talent, and consulting. Based in Hyderabad.",
      },
      {
        property: "og:image",
        content: "https://www.basicsocials.com/og-image.webp",
      },
      {
        name: "twitter:image",
        content: "https://www.basicsocials.com/og-image.webp",
      },
    ],
    links: [{ rel: "canonical", href: "https://www.basicsocials.com/" }],
  }),
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
