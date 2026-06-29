import { useId, useState } from "react";

const needs = ["Full Marketing", "Consulting", "Talent & Shoots", "Not sure yet"];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [need, setNeed] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section id="contact" className="relative px-6 py-24 md:py-32 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute top-0 -left-32 h-[480px] w-[480px] rounded-full bg-[#AAFF00] opacity-20 blur-3xl" />
        <div
          className="blob absolute bottom-10 -right-32 h-[460px] w-[460px] rounded-full bg-white opacity-15 blur-3xl"
          style={{ animationDelay: "-3s" }}
        />
      </div>

      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-stretch">
        {/* Left column */}
        <div className="lg:col-span-2 flex flex-col justify-between">
          <div>
            <span className="pill reveal">
              <span className="h-2 w-2 rounded-full bg-[#AAFF00] animate-pulse" />
              Contact
            </span>
            <h2 className="mt-5 font-display text-[clamp(2.4rem,6vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.03em] reveal reveal-delay-1">
              Basically We <span className="italic font-medium grad-text">Understand</span> The
              Assignment.
            </h2>
            <p className="mt-6 text-lg text-white/70 max-w-md reveal reveal-delay-2">
              Tell us yours.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="lg:col-span-3 relative reveal reveal-delay-2 flex">
          <div
            aria-hidden
            className="absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-[#AAFF00]/40 via-white/10 to-[#0033FF]/40 blur-xl opacity-60"
          />
          <div className="relative rounded-[2rem] glass-strong p-8 md:p-10 w-full flex flex-col">
            {sent ? (
              <div className="min-h-[460px] flex flex-col items-center justify-center text-center gap-5">
                <span className="h-16 w-16 rounded-full bg-[#AAFF00] flex items-center justify-center text-[#0033FF] text-3xl shadow-[0_0_40px_#AAFF00]">
                  ✓
                </span>
                <h3 className="font-display text-4xl font-semibold tracking-tight text-white">
                  We've got your message.
                </h3>
                <p className="text-white/70 max-w-xs">Talk soon. Keep an eye on your inbox.</p>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (submitting) return;
                  setError(null);
                  const form = e.currentTarget;
                  const fd = new FormData(form);
                  const payload = {
                    name: String(fd.get("name") || ""),
                    brand: String(fd.get("brand") || ""),
                    phone: String(fd.get("phone") || ""),
                    need: need || "",
                    notes: String(fd.get("notes") || ""),
                  };
                  if (!payload.name || !payload.brand || !payload.phone) {
                    setError("Please fill name, brand and phone.");
                    return;
                  }
                  setSubmitting(true);
                  try {
                    const res = await fetch("/api/public/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });
                    if (!res.ok) throw new Error("Request failed");
                    setSent(true);
                  } catch {
                    setError("Something went wrong. Try WhatsApp instead.");
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                <div className="flex items-center justify-end mb-2">
                  <span className="flex gap-1">
                    <span className="h-1 w-6 rounded-full bg-[#AAFF00]" />
                    <span className="h-1 w-6 rounded-full bg-white/20" />
                    <span className="h-1 w-6 rounded-full bg-white/20" />
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Field label="Your name" name="name" required />
                  <Field label="Brand / Company" name="brand" required />
                </div>

                <Field
                  label="Phone number"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 9xxxxxxxxx"
                />

                <div>
                  <label
                    htmlFor="contact-need"
                    className="block text-xs uppercase tracking-wider text-white/60 mb-3"
                  >
                    What do you need?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {needs.map((n) => (
                      <button
                        id={n === needs[0] ? "contact-need" : undefined}
                        type="button"
                        key={n}
                        onClick={() => setNeed(n)}
                        className={`rounded-full px-4 py-2 text-sm border transition-all duration-300 ${
                          need === n
                            ? "bg-[#AAFF00] text-[#0033FF] border-[#AAFF00] shadow-[0_0_20px_rgba(170,255,0,0.5)] scale-105"
                            : "border-white/20 text-white/80 hover:border-white/50 hover:bg-white/5"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <TextareaField label="Anything else? (optional)" name="notes" />

                {error && <p className="text-xs text-red-300">{error}</p>}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-green flex-1 justify-center disabled:opacity-60"
                  >
                    {submitting ? "Sending..." : "Send it →"}
                  </button>
                  <a
                    href="https://wa.me/919866472562"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-dark justify-center"
                  >
                    Or WhatsApp
                  </a>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 text-[#AAFF00] focus:ring-0 focus:ring-offset-0 accent-[#AAFF00] cursor-pointer"
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs text-white/60 leading-normal cursor-pointer select-none"
                  >
                    I agree to be contacted by Basic Socials regarding my enquiry. We will only use
                    your details to respond to you. Read our{" "}
                    <a
                      href="/privacy"
                      className="underline underline-offset-2 hover:text-[#AAFF00] transition-colors"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  required,
  type,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-wider text-white/60 mb-2">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type || "text"}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#AAFF00] transition"
      />
    </div>
  );
}

function TextareaField({ label, name }: { label: string; name: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-xs uppercase tracking-wider text-white/60 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={4}
        className="w-full rounded-2xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[#AAFF00] transition"
      />
    </div>
  );
}
