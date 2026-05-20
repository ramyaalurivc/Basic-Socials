import { useState } from "react";
import { SectionLabel } from "./SectionLabel";

const needs = ["Full Marketing", "Consulting", "Talent & Shoots", "Not sure yet"];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [need, setNeed] = useState<string | null>(null);

  return (
    <section id="contact" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <SectionLabel
            label="Contact"
            headline={<>Let's <span className="italic font-medium grad-text">talk</span>.</>}
          />
          <p className="text-lg text-white/70 max-w-md reveal">
            Tell us about your brand. We reply within 24 hours.
          </p>
          <a
            href="https://wa.me/910000000000"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#AAFF00] ulink reveal"
          >
            Or chat on WhatsApp →
          </a>
        </div>

        <div className="rounded-3xl glass-strong p-8 md:p-10 reveal reveal-delay-2">
          {sent ? (
            <div className="min-h-[420px] flex flex-col items-center justify-center text-center gap-4">
              <span className="h-14 w-14 rounded-full bg-[#AAFF00] flex items-center justify-center text-[#0033FF] text-2xl shadow-[0_0_30px_#AAFF00]">✓</span>
              <h3 className="font-display text-3xl font-semibold tracking-tight text-white">
                We've got your message.
              </h3>
              <p className="text-white/70">Talk soon.</p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <Field label="Your name" name="name" placeholder="Jane Doe" required />
              <Field label="Brand or company name" name="brand" placeholder="Acme Co." required />

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                  What do you need?
                </label>
                <div className="flex flex-wrap gap-2">
                  {needs.map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setNeed(n)}
                      className={`rounded-full px-4 py-2 text-sm border transition-all duration-300 ${
                        need === n
                          ? "bg-[#AAFF00] text-[#0033FF] border-[#AAFF00] shadow-[0_0_20px_rgba(170,255,0,0.5)]"
                          : "border-white/20 text-white/80 hover:border-white/50 hover:bg-white/5"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
                  Anything else? (optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-2xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#AAFF00] transition"
                  placeholder="Goals, timelines, budget..."
                />
              </div>

              <button type="submit" className="btn-green w-full justify-center">
                Send it →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
}: { label: string; name: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">
        {label}
      </label>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#AAFF00] transition"
      />
    </div>
  );
}