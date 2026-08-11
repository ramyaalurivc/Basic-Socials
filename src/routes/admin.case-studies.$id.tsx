import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell, inputCls, labelCls } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/case-studies/$id")({
  ssr: false,
  head: () => ({ meta: [{ title: "Edit case study | Basic Socials" }, { name: "robots", content: "noindex" }] }),
  component: CaseEditor,
});

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

type Form = Record<string, string>;

const fields: { k: string; label: string; area?: boolean }[] = [
  { k: "client_name", label: "Client name" },
  { k: "industry", label: "Industry" },
  { k: "cover_image", label: "Cover image URL" },
  { k: "video_url", label: "Video URL" },
  { k: "overview", label: "Overview", area: true },
  { k: "challenge", label: "Challenge", area: true },
  { k: "solution", label: "Solution", area: true },
  { k: "process", label: "Process", area: true },
  { k: "results", label: "Results", area: true },
  { k: "testimonial_quote", label: "Testimonial quote", area: true },
  { k: "testimonial_author", label: "Testimonial author" },
  { k: "cta_title", label: "CTA title" },
  { k: "cta_body", label: "CTA body", area: true },
  { k: "seo_title", label: "SEO title" },
  { k: "meta_description", label: "Meta description", area: true },
  { k: "og_image", label: "OG image URL" },
];

const empty: Form = {
  slug: "",
  title: "",
  status: "draft",
  technologies: "",
  images: "",
  ...Object.fromEntries(fields.map((f) => [f.k, ""])),
};

function CaseEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = useState<Form>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    supabase.from("case_studies").select("*").eq("id", id).maybeSingle().then(({ data, error }) => {
      if (error) setMsg(error.message);
      if (data) {
        const next: Form = { ...empty };
        Object.keys(empty).forEach((k) => {
          const v = (data as Record<string, unknown>)[k];
          next[k] = Array.isArray(v) ? v.join(", ") : ((v as string | null) ?? "");
        });
        setForm(next);
      }
      setLoading(false);
    });
  }, [id, isNew]);

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (status?: string) => {
    setSaving(true);
    setMsg(null);
    const nextStatus = status ?? form.status;
    const payload: Record<string, unknown> = {
      slug: form.slug || slugify(form.title),
      title: form.title,
      status: nextStatus,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
      images: form.images.split(",").map((t) => t.trim()).filter(Boolean),
      published_at: nextStatus === "published" ? new Date().toISOString() : null,
    };
    fields.forEach((f) => {
      const required = ["overview", "challenge", "solution", "process", "results"].includes(f.k);
      payload[f.k] = required ? form[f.k] ?? "" : (form[f.k] || null);
    });

    if (isNew) {
      const { data, error } = await supabase.from("case_studies").insert(payload as never).select("id").single();
      setSaving(false);
      if (error) return setMsg(error.message);
      navigate({ to: "/admin/case-studies/$id", params: { id: data.id } });
    } else {
      const { error } = await supabase.from("case_studies").update(payload as never).eq("id", id);
      setSaving(false);
      setForm((f) => ({ ...f, status: nextStatus }));
      setMsg(error ? error.message : "Saved.");
    }
  };

  return (
    <AdminShell title={isNew ? "New case study" : "Edit case study"}>
      {loading ? (
        <p className="text-sm text-[#475569]">Loading…</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-5 rounded-3xl border border-[#E5E7EB] bg-white p-6">
            <div>
              <label className={labelCls}>Title</label>
              <input className={`${inputCls} mt-2`} value={form.title}
                onChange={(e) => { set("title", e.target.value); if (isNew) set("slug", slugify(e.target.value)); }} />
            </div>
            <div>
              <label className={labelCls}>Slug</label>
              <input className={`${inputCls} mt-2`} value={form.slug} onChange={(e) => set("slug", slugify(e.target.value))} />
            </div>
            {fields.map((f) => (
              <div key={f.k}>
                <label className={labelCls}>{f.label}</label>
                {f.area ? (
                  <textarea rows={5} className={`${inputCls} mt-2`} value={form[f.k]} onChange={(e) => set(f.k, e.target.value)} />
                ) : (
                  <input className={`${inputCls} mt-2`} value={form[f.k]} onChange={(e) => set(f.k, e.target.value)} />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-5">
            <div className="space-y-4 rounded-3xl border border-[#E5E7EB] bg-white p-6">
              <div>
                <label className={labelCls}>Status</label>
                <select className={`${inputCls} mt-2`} value={form.status} onChange={(e) => set("status", e.target.value)}>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" disabled={saving} onClick={() => save()} className="rounded-full bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                  {saving ? "Saving…" : "Save"}
                </button>
                <button type="button" disabled={saving} onClick={() => save("published")} className="rounded-full bg-[#0033FF] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
                  Publish
                </button>
                <Link to="/admin" className="rounded-full border border-[#E5E7EB] px-4 py-2.5 text-sm font-semibold text-[#475569]">Back</Link>
              </div>
              {msg && <p className="text-sm text-[#0033FF]">{msg}</p>}
            </div>
            <div className="space-y-4 rounded-3xl border border-[#E5E7EB] bg-white p-6">
              <div>
                <label className={labelCls}>Technologies (comma separated)</label>
                <input className={`${inputCls} mt-2`} value={form.technologies} onChange={(e) => set("technologies", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Gallery image URLs (comma separated)</label>
                <textarea rows={4} className={`${inputCls} mt-2`} value={form.images} onChange={(e) => set("images", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
