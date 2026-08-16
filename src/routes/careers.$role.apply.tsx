import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getRole } from "@/lib/roles";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/careers/$role/apply")({
  loader: ({ params }) => {
    if (!getRole(params.role)) throw notFound();
    return null;
  },
  head: ({ params }) => {
    const role = getRole(params.role);
    const title = role ? `Apply — ${role.title} | Basic Socials` : "Apply | Basic Socials";
    const desc = role
      ? `Apply for the ${role.title} role at Basic Socials in ${role.location}. Takes about five minutes.`
      : "Apply to join the Basic Socials team.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: ApplyPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center text-white">
      <Link to="/careers" className="btn-green">
        See open roles
      </Link>
    </div>
  ),
});

const urlish = z.string().trim().url({ message: "Enter a full URL starting with https://" }).max(400);

const FormSchema = z.object({
  full_name: z.string().trim().min(2, "Tell us your full name").max(120),
  email: z.string().trim().email("Enter a valid email address").max(255),
  phone: z
    .string()
    .trim()
    .min(6, "Enter a valid phone number")
    .max(32)
    .regex(/^[+0-9()\-\s]+$/, "Digits, spaces and + only"),
  location: z.string().trim().min(2, "Where are you based?").max(120),
  experience: z.string().trim().min(1, "Enter your experience").max(80),
  notice_period: z.string().trim().min(1, "Enter your notice period").max(80),
  portfolio_url: urlish,
  linkedin_url: z.union([urlish, z.literal("")]),
  current_company: z.string().trim().max(160),
  expected_ctc: z.string().trim().max(80),
  why_join: z.string().trim().min(20, "A couple of sentences, please").max(3000),
});

const emptyForm = {
  full_name: "",
  email: "",
  phone: "",
  location: "",
  experience: "",
  notice_period: "",
  portfolio_url: "",
  linkedin_url: "",
  current_company: "",
  expected_ctc: "",
  why_join: "",
};

const ALLOWED = [".pdf", ".doc", ".docx"];

const inputCls =
  "w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-[0.95rem] text-[#0F172A] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0033FF] focus:ring-4 focus:ring-[#0033FF]/10";

function Field({
  label,
  hint,
  error,
  children,
  required,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block" data-error={error ? "1" : undefined}>
      <span className="text-sm font-medium text-[#0F172A]">
        {label}
        {required && <span className="text-[#0033FF]"> *</span>}
      </span>
      {hint && <span className="mt-1 block text-xs text-[#94A3B8]">{hint}</span>}
      <div className="mt-2">{children}</div>
      {error && <span className="mt-1.5 block text-xs font-medium text-[#DC2626]">{error}</span>}
    </label>
  );
}

function ApplyPage() {
  const { role: slug } = Route.useParams();
  const role = getRole(slug)!;
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [creators, setCreators] = useState(
    Array.from({ length: 5 }, () => ({ name: "", link: "" })),
  );
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const set =
    (k: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const setCreator = (i: number, k: "name" | "link", v: string) =>
    setCreators((c) => c.map((row, idx) => (idx === i ? { ...row, [k]: v } : row)));

  const validate = () => {
    const next: Record<string, string> = {};
    const parsed = FormSchema.safeParse(form);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
    }
    if (!resume) {
      next.resume = "Upload your resume (PDF, DOC or DOCX)";
    } else {
      const lower = resume.name.toLowerCase();
      if (!ALLOWED.some((ext) => lower.endsWith(ext))) next.resume = "Only PDF, DOC or DOCX files";
      else if (resume.size > 8 * 1024 * 1024) next.resume = "Keep it under 8MB";
    }
    creators.forEach((c, i) => {
      if (!c.name.trim()) next[`creator_name_${i}`] = "Required";
      const link = c.link.trim();
      if (!link) next[`creator_link_${i}`] = "Required";
      else if (!urlish.safeParse(link).success) next[`creator_link_${i}`] = "Enter a full URL";
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) {
      setTimeout(() => {
        document
          .querySelector("[data-error]")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
      return;
    }
    setSubmitting(true);
    try {
      const file = resume!;
      const ext = file.name.slice(file.name.lastIndexOf("."));
      const safeName = form.full_name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .slice(0, 40);
      const path = `${slug}/${Date.now()}-${safeName}${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(path, file, { contentType: file.type || "application/octet-stream" });
      if (uploadError) throw new Error(uploadError.message);

      const res = await fetch("/api/public/job-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          role_slug: role.slug,
          role_title: role.title,
          creators: creators.map((c) => ({ name: c.name.trim(), link: c.link.trim() })),
          resume_path: path,
          resume_filename: file.name,
        }),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(j?.error || "Something went wrong. Please try again.");
      }
      navigate({ to: "/careers/$role/submitted", params: { role: role.slug } });
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A]" data-nav-theme="light">
      <Nav />
      <main className="pb-28 pt-32 md:pt-40">
        <div className="mx-auto max-w-2xl px-6">
          <Link
            to="/careers/$role"
            params={{ role: role.slug }}
            className="text-sm text-[#475569] hover:text-[#0033FF]"
          >
            ← Back to role
          </Link>
          <p className="mt-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0033FF]/20 bg-[#0033FF]/5 px-3.5 py-1.5 text-xs font-semibold text-[#0033FF]">
              Applying for
            </span>
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.03] tracking-[-0.04em]">
            {role.title}
          </h1>
          <p className="mt-4 text-[#475569]">
            Five minutes, honestly answered, beats a polished template. Fields marked * are required.
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-10 space-y-8">
            <fieldset className="space-y-5 rounded-[28px] border border-[#E5E7EB] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <legend className="px-2 font-display text-lg font-semibold">About you</legend>
              <Field label="Full name" required error={errors.full_name}>
                <input className={inputCls} value={form.full_name} onChange={set("full_name")} autoComplete="name" />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Email address" required error={errors.email}>
                  <input className={inputCls} type="email" value={form.email} onChange={set("email")} autoComplete="email" />
                </Field>
                <Field label="Phone number" required error={errors.phone}>
                  <input className={inputCls} type="tel" value={form.phone} onChange={set("phone")} autoComplete="tel" />
                </Field>
              </div>
              <Field label="Current location" required error={errors.location}>
                <input className={inputCls} value={form.location} onChange={set("location")} />
              </Field>
            </fieldset>

            <fieldset className="space-y-5 rounded-[28px] border border-[#E5E7EB] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <legend className="px-2 font-display text-lg font-semibold">Experience</legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Experience" required hint="e.g. Fresher, 6 months, 1 year, 3 years" error={errors.experience}>
                  <input className={inputCls} value={form.experience} onChange={set("experience")} />
                </Field>
                <Field label="Notice period" required hint="e.g. Immediate, 15 days, 1 month" error={errors.notice_period}>
                  <input className={inputCls} value={form.notice_period} onChange={set("notice_period")} />
                </Field>
              </div>
              <Field
                label="Portfolio / website"
                required
                hint="Drive folder, Behance, personal site — anything that shows your work"
                error={errors.portfolio_url}
              >
                <input className={inputCls} value={form.portfolio_url} onChange={set("portfolio_url")} placeholder="https://" />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="LinkedIn profile" error={errors.linkedin_url}>
                  <input className={inputCls} value={form.linkedin_url} onChange={set("linkedin_url")} placeholder="https://" />
                </Field>
                <Field label="Current company" error={errors.current_company}>
                  <input className={inputCls} value={form.current_company} onChange={set("current_company")} />
                </Field>
              </div>
              <Field label="Expected CTC" error={errors.expected_ctc}>
                <input className={inputCls} value={form.expected_ctc} onChange={set("expected_ctc")} />
              </Field>
              <Field label="Resume" required hint="PDF, DOC or DOCX — max 8MB" error={errors.resume}>
                <div className="rounded-2xl border border-dashed border-[#CBD5E1] bg-[#FAFAFA] px-4 py-5 text-center transition hover:border-[#0033FF]">
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="sr-only"
                    onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                  />
                  <span className="cursor-pointer text-sm font-semibold text-[#0033FF]">
                    {resume ? "Choose a different file" : "Choose a file"}
                  </span>
                  <span className="mt-1.5 block truncate text-xs text-[#475569]">
                    {resume ? resume.name : "No file selected"}
                  </span>
                </div>
              </Field>
            </fieldset>

            <fieldset className="space-y-5 rounded-[28px] border border-[#E5E7EB] bg-white p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <legend className="px-2 font-display text-lg font-semibold">The interesting part</legend>
              <Field label="Why do you want to join Basic Socials?" required error={errors.why_join}>
                <textarea rows={5} className={inputCls} value={form.why_join} onChange={set("why_join")} />
              </Field>

              <div>
                <p className="text-sm font-medium text-[#0F172A]">
                  Your top 5 creators / influencers<span className="text-[#0033FF]"> *</span>
                </p>
                <p className="mt-1 text-xs text-[#94A3B8]">
                  Anyone you actually follow, on any platform. All five required.
                </p>
                <div className="mt-4 space-y-3">
                  {creators.map((c, i) => (
                    <div key={i} className="grid gap-3 sm:grid-cols-[1fr_1.4fr]">
                      <div data-error={errors[`creator_name_${i}`] ? "1" : undefined}>
                        <input
                          className={inputCls}
                          placeholder={`Creator ${i + 1} name`}
                          aria-label={`Creator ${i + 1} name`}
                          value={c.name}
                          onChange={(e) => setCreator(i, "name", e.target.value)}
                        />
                        {errors[`creator_name_${i}`] && (
                          <span className="mt-1 block text-xs font-medium text-[#DC2626]">
                            {errors[`creator_name_${i}`]}
                          </span>
                        )}
                      </div>
                      <div data-error={errors[`creator_link_${i}`] ? "1" : undefined}>
                        <input
                          className={inputCls}
                          placeholder="https://profile-link"
                          aria-label={`Creator ${i + 1} profile link`}
                          value={c.link}
                          onChange={(e) => setCreator(i, "link", e.target.value)}
                        />
                        {errors[`creator_link_${i}`] && (
                          <span className="mt-1 block text-xs font-medium text-[#DC2626]">
                            {errors[`creator_link_${i}`]}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </fieldset>

            {serverError && (
              <p className="rounded-2xl border border-[#DC2626]/25 bg-[#DC2626]/5 px-5 py-4 text-sm text-[#DC2626]">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-[#0033FF] px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(0,51,255,0.9)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending your application…" : "Submit application"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}