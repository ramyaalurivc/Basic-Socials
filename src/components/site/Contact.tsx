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
            headline={<>Let's <span className="italic font-medium text-muted-foreground">talk</span>.</>}
          />
          <p className="text-lg text-muted-foreground max-w-md">
            Tell us about your brand. We reply within 24 hours.
          </p>
          <a
            href="https://wa.me/910000000000"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
          >
            Or chat on WhatsApp →
          </a>
        </div>

        <div className="rounded-3xl bg-foreground text-background p-8 md:p-10">
          {sent ? (
            <div className="min-h-[420px] flex flex-col items-center justify-center text-center gap-4">
              <span className="h-14 w-14 rounded-full bg-accent flex items-center justify-center text-foreground text-2xl">✓</span>
              <h3 className="font-display text-3xl font-semibold tracking-tight">
                We've got your message.
              </h3>
              <p className="text-background/70">Talk soon.</p>
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
                <label className="block text-xs uppercase tracking-wider text-background/60 mb-2">
                  What do you need?
                </label>
                <div className="flex flex-wrap gap-2">
                  {needs.map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setNeed(n)}
                      className={`rounded-full px-4 py-2 text-sm border transition ${
                        need === n
                          ? "bg-accent text-foreground border-accent"
                          : "border-background/20 text-background/80 hover:border-background/50"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-background/60 mb-2">
                  Anything else? (optional)
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-2xl bg-background/5 border border-background/15 px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition"
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
      <label className="block text-xs uppercase tracking-wider text-background/60 mb-2">
        {label}
      </label>
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-background/5 border border-background/15 px-4 py-3 text-background placeholder:text-background/40 focus:outline-none focus:border-accent transition"
      />
    </div>
  );
}