import logo from "@/assets/logo.png";

const explore = [
  { label: "Services", href: "/#services" },
  { label: "AI Systems", href: "/ai-systems" },
  { label: "Careers", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "FAQ", href: "/faq" },
];

const services = [
  { label: "Content Production", href: "/#services" },
  { label: "AI Content", href: "/#services" },
  { label: "AI Systems", href: "/ai-systems" },
  { label: "Performance Marketing", href: "/#services" },
  { label: "Consulting", href: "/#services" },
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
  { label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/12 px-6 pt-24 pb-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -top-32 left-10 h-[420px] w-[420px] rounded-full bg-[#AAFF00] opacity-15 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-2xl">
          <h2 className="font-display text-[clamp(2.6rem,7vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-white">
            Connect.
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Let's build something remarkable together.
          </p>
          <a
            href="mailto:socials@basicsocials.com"
            className="mt-6 inline-flex items-center gap-2 text-base font-medium text-[#AAFF00] transition-opacity hover:opacity-80"
          >
            socials@basicsocials.com →
          </a>
        </div>

        <div className="reveal reveal-delay-1 mt-20 grid grid-cols-2 gap-10 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Basic Socials" className="h-9 w-9 object-contain" />
              <span className="font-display text-[22px] font-semibold tracking-[-0.02em] text-white">
                Basic Socials
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              A content and AI studio helping businesses grow: content that gets attention,
              systems that keep things running.
            </p>
          </div>

          <FooterCol title="Navigation" items={explore} />
          <FooterCol title="Services" items={services} />

          <div>
            <p className="mb-4 text-xs uppercase tracking-wider text-white/45">Connect</p>
            <ul className="space-y-2.5 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="ulink text-white/75 transition-colors hover:text-white">
                    {s.label} ↗
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="mailto:socials@basicsocials.com" className="ulink text-white/75 transition-colors hover:text-white">
                  socials@basicsocials.com
                </a>
              </li>
              <li>
                <a href="tel:+917993557180" className="ulink text-white/75 transition-colors hover:text-white">
                  +91 79935 57180
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50">
          <span>© 2025 Basic Socials. All rights reserved.</span>
          <span className="flex items-center gap-4"><a href="/admin/login" className="text-white/35 transition-colors hover:text-white/70">Admin Login</a><span>Mon to Sat · 10am to 7pm IST</span></span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-wider text-white/45">{title}</p>
      <ul className="space-y-2.5 text-sm">
        {items.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="ulink text-white/75 transition-colors hover:text-white">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
