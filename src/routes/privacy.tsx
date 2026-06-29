import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { useReveal } from "@/hooks/use-reveal";
import { useLenis } from "@/hooks/use-lenis";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · Basic Socials" },
      {
        name: "description",
        content:
          "Basic Socials privacy policy. Under Indian DPDP Act (2023), understand how we collect, process, and protect your information.",
      },
      { property: "og:title", content: "Privacy Policy · Basic Socials" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://www.basicsocials.com/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://www.basicsocials.com/privacy" }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  useLenis();
  useReveal();

  return (
    <div className="min-h-screen text-foreground">
      <Nav />
      <main className="pt-36 md:pt-44 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <span className="pill reveal">Legal</span>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.03em] reveal reveal-delay-1">
            Privacy <span className="grad-text">Policy</span>.
          </h1>
          <p className="mt-5 text-white/70 text-lg reveal reveal-delay-2">
            Last Updated: June 27, 2026. This policy outlines how Basic Socials handles your data,
            aligned with India's Digital Personal Data Protection (DPDP) Act, 2023.
          </p>

          <div className="mt-16 space-y-10 text-white/80 leading-relaxed reveal reveal-delay-3">
            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">1. Introduction</h2>
              <p>
                Welcome to Basic Socials ("we", "our", or "us"). We are committed to protecting your
                personal data and respecting your privacy. This Privacy Policy describes how we
                collect, use, process, and protect your personal details when you visit our website,
                use our contact form, or communicate with us.
              </p>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">
                2. Consent & Data We Collect
              </h2>
              <p>
                By checking the consent box on our contact form, you explicitly consent to the
                collection and processing of your personal information for the specific purpose of
                responding to your business inquiries. The data we collect includes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Your Name:</strong> To address you personally.
                </li>
                <li>
                  <strong>Brand / Company:</strong> To understand your business context and services
                  required.
                </li>
                <li>
                  <strong>Phone Number:</strong> To contact you via call or WhatsApp.
                </li>
                <li>
                  <strong>Enquiry Details:</strong> Project requirements, consulting preferences, or
                  other notes you voluntarily provide.
                </li>
              </ul>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">
                3. How We Use Your Data
              </h2>
              <p>
                Your information is used strictly for legitimate business purposes. Under the DPDP
                Act 2023, we act as a Data Fiduciary and use your personal details only to:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Respond to your direct enquiries.</li>
                <li>Provide proposals, marketing scopes, or consulting outlines.</li>
                <li>Communicate via WhatsApp, email, or telephone for project onboarding.</li>
              </ul>
              <p className="mt-2 font-semibold text-[#AAFF00]">
                We promise a strict no-spam policy. We do not sell, rent, or share your data with
                third parties for marketing purposes.
              </p>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">
                4. Your Rights (DPDP Act, 2023)
              </h2>
              <p>You have comprehensive rights regarding your personal data under Indian law:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Right to Information:</strong> Access details about how your data is being
                  processed.
                </li>
                <li>
                  <strong>Right to Correction & Erasure:</strong> Request updates, corrections, or
                  complete deletion of your records.
                </li>
                <li>
                  <strong>Right to Withdraw Consent:</strong> You can revoke your consent at any
                  time.
                </li>
                <li>
                  <strong>Right of Grievance Redressal:</strong> Register any concerns or complaints
                  regarding our data practices.
                </li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please email us directly at{" "}
                <a href="mailto:socials@basicsocials.com" className="text-[#AAFF00] hover:underline">
                  socials@basicsocials.com
                </a>
                .
              </p>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">5. Security Measures</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect
                your personal details from unauthorized access, loss, or alteration. Data is stored
                securely and is accessible only to authorized team members who require it to serve
                you.
              </p>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">
                6. Updates to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to remain compliant with
                evolving legal guidelines or our internal processing practices. Any changes will be
                published directly on this page with an updated revision date.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
