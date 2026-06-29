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
    <div className="min-h-screen text-foreground bg-background">
      <Nav />
      <main className="pt-36 md:pt-44 pb-24">
        <div className="mx-auto max-w-4xl px-6">
          <span className="pill reveal">Legal</span>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-[1] tracking-[-0.03em] reveal reveal-delay-1">
            Privacy <span className="grad-text">Policy</span>.
          </h1>
          <p className="mt-5 text-white/70 text-lg reveal reveal-delay-2">
            Last Updated: June 2026. This policy outlines how Basic Socials handles your data,
            aligned with India's Digital Personal Data Protection (DPDP) Act, 2023.
          </p>

          <div className="mt-16 space-y-10 text-white/80 leading-relaxed reveal reveal-delay-3">
            <div className="glass rounded-[2rem] p-8 md:p-10 space-y-6">
              <p>
                <strong>Basic Socials</strong> ("we", "us", "our") is a creative marketing and consulting agency based in Hyderabad, India. This Privacy Policy explains how we collect, use, store, and protect your personal data when you visit <strong>basicsocials.com</strong> or contact us through any channel.
              </p>
              <p>
                This policy is in accordance with India's <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>.
              </p>
            </div>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">1. Who We Are</h2>
              <div className="space-y-2">
                <p><strong>Basic Socials</strong></p>
                <p>Hyderabad, Telangana, India</p>
                <p>📧 <a href="mailto:socials@basicsocials.com" className="text-[#AAFF00] hover:underline">socials@basicsocials.com</a></p>
                <p>📞 <a href="tel:+919866472562" className="text-[#AAFF00] hover:underline">+91 9866472562</a></p>
                <p>🌐 <a href="https://basicsocials.com" target="_blank" rel="noopener noreferrer" className="text-[#AAFF00] hover:underline">basicsocials.com</a></p>
              </div>
              <p className="mt-4 text-sm text-white/60">
                We are the <strong>Data Fiduciary</strong> — meaning we determine the purpose and means of processing your personal data.
              </p>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">2. What Data We Collect</h2>
              <p>We only collect data that you voluntarily provide to us. This includes:</p>

              <div className="overflow-x-auto my-6 border border-white/10 rounded-2xl">
                <table className="min-w-full divide-y divide-white/10 text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-white">Data</th>
                      <th className="px-6 py-4 text-left font-semibold text-white">When we collect it</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">Name</td>
                      <td className="px-6 py-4 text-white/70">Contact form, WhatsApp, email enquiry</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">Phone number</td>
                      <td className="px-6 py-4 text-white/70">Contact form, WhatsApp, email enquiry</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">Email address</td>
                      <td className="px-6 py-4 text-white/70">Contact form, email enquiry</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">Business / brand name</td>
                      <td className="px-6 py-4 text-white/70">Contact form, client onboarding</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">Message content</td>
                      <td className="px-6 py-4 text-white/70">Contact form, WhatsApp, email</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">Project details</td>
                      <td className="px-6 py-4 text-white/70">Client onboarding and briefing</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-2 mt-4">
                <p className="font-semibold text-white">We do not collect:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Payment or financial information (handled via third-party payment processors)</li>
                  <li>Sensitive personal data (health, biometric, religious, political data)</li>
                  <li>Data from children under 18 (our services are not directed at minors)</li>
                </ul>
              </div>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">3. Why We Collect Your Data</h2>
              <p>We collect and use your data only for the following purposes:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>To respond to your enquiry</strong> — when you fill our contact form or reach out via WhatsApp or email</li>
                <li><strong>To provide our services</strong> — branding, social media, marketing, video, consulting</li>
                <li><strong>To send project updates and communications</strong> — only to active clients</li>
                <li><strong>To improve our website</strong> — through anonymised analytics (no individual tracking)</li>
                <li><strong>To comply with legal obligations</strong> — if required by law</li>
              </ol>
              <div className="mt-4 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200">
                <p className="font-semibold">We do not use your data for:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Selling or sharing with third parties for their own marketing</li>
                  <li>Automated decision-making or profiling</li>
                  <li>Unsolicited promotional emails or spam</li>
                </ul>
              </div>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">4. Legal Basis for Processing</h2>
              <p>Under India's DPDP Act, 2023, we process your data based on:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Consent</strong> — you provide it voluntarily when you contact us</li>
                <li><strong>Legitimate interest</strong> — to fulfil our services to you as a client</li>
                <li><strong>Legal obligation</strong> — where required by applicable law</li>
              </ul>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">5. How We Store and Protect Your Data</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your data is stored securely on password-protected systems.</li>
                <li>We use industry-standard security measures to prevent unauthorised access, disclosure, or loss.</li>
                <li>Access to your data is limited to team members who need it to serve you.</li>
                <li>We do not store payment information — all transactions are handled by secure third-party processors.</li>
              </ul>
              <div className="mt-4 space-y-2">
                <p className="font-semibold text-white">We retain your data for:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Enquiries (no project started):</strong> up to 6 months</li>
                  <li><strong>Active client data:</strong> for the duration of the engagement + 2 years for legal/accounting purposes</li>
                  <li><strong>Data is deleted</strong> after the retention period unless you request otherwise.</li>
                </ul>
              </div>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">6. Who We Share Your Data With</h2>
              <p>We do <strong>not</strong> sell your data. We may share it only with:</p>

              <div className="overflow-x-auto my-6 border border-white/10 rounded-2xl">
                <table className="min-w-full divide-y divide-white/10 text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-white">Recipient</th>
                      <th className="px-6 py-4 text-left font-semibold text-white">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">Internal team members</td>
                      <td className="px-6 py-4 text-white/70">To deliver our services</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">Freelancers / contractors</td>
                      <td className="px-6 py-4 text-white/70">Only under confidentiality agreements, for project delivery</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-white">Legal authorities</td>
                      <td className="px-6 py-4 text-white/70">Only if required by law or a court order</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-white/60">
                We use tools such as Google Workspace and WhatsApp Business for communication. These services have their own privacy policies and data handling practices.
              </p>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">7. Your Rights</h2>
              <p>Under the DPDP Act, 2023, you have the right to:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
                <li><strong>Correction</strong> — ask us to correct inaccurate or incomplete data</li>
                <li><strong>Erasure</strong> — request deletion of your data (subject to legal obligations)</li>
                <li><strong>Grievance redressal</strong> — raise a complaint if you believe your data has been mishandled</li>
                <li><strong>Nominate</strong> — nominate another person to exercise your rights on your behalf in case of death or incapacity</li>
              </ol>
              <p className="mt-4">
                To exercise any of these rights, contact us at:
                <br />
                📧 <a href="mailto:socials@basicsocials.com" className="text-[#AAFF00] hover:underline font-semibold">socials@basicsocials.com</a>
                <br />
                📞 <a href="tel:+919866472562" className="text-[#AAFF00] hover:underline font-semibold">+91 9866472562</a>
              </p>
              <p className="text-sm text-white/60">
                We will respond within <strong>30 days</strong> of receiving your request.
              </p>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">8. Cookies</h2>
              <p>
                Our website may use basic cookies for functionality (e.g. remembering form inputs). We do not use tracking or advertising cookies. We do not use third-party ad pixels or retargeting tags on this website.
              </p>
              <p className="text-sm text-white/60">
                If we add analytics or tracking in the future, this policy will be updated and a cookie notice will be displayed.
              </p>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">9. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party platforms (Instagram, LinkedIn, YouTube, etc.). We are not responsible for their privacy practices. We recommend reading their respective privacy policies.
              </p>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">10. Children's Privacy</h2>
              <p>
                Our services are intended for businesses and adults. We do not knowingly collect personal data from anyone under the age of 18. If you believe a minor has submitted data to us, contact us immediately at <a href="mailto:socials@basicsocials.com" className="text-[#AAFF00] hover:underline">socials@basicsocials.com</a> and we will delete it promptly.
              </p>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. When we do, we will update the "Last updated" date at the top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="glass rounded-[2rem] p-8 md:p-10 space-y-4">
              <h2 className="font-display text-2xl font-bold text-white">12. Contact & Grievance Officer</h2>
              <div className="space-y-2">
                <p><strong>Grievance Officer</strong></p>
                <p>Basic Socials</p>
                <p>Hyderabad, Telangana, India</p>
                <p>📧 <a href="mailto:socials@basicsocials.com" className="text-[#AAFF00] hover:underline">socials@basicsocials.com</a></p>
                <p>📞 <a href="tel:+919866472562" className="text-[#AAFF00] hover:underline">+91 9866472562</a></p>
                <p className="text-white/60">Mon to Sat · 10am to 7pm IST</p>
              </div>
              <p className="mt-4 text-sm text-white/60">
                We take all privacy concerns seriously and will respond within 30 days.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
