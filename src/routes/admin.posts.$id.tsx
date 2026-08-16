import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell, inputCls, labelCls } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/posts/$id")({
  ssr: false,
  head: () => ({ meta: [{ title: "Edit post | Basic Socials" }, { name: "robots", content: "noindex" }] }),
  component: PostEditor,
});

type Form = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string;
  author: string;
  read_minutes: number;
  seo_title: string;
  meta_description: string;
  og_image: string;
  status: string;
};

const empty: Form = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  featured_image: "",
  category: "",
  tags: "",
  author: "Basic Socials",
  read_minutes: 4,
  seo_title: "",
  meta_description: "",
  og_image: "",
  status: "draft",
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function PostEditor() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const [form, setForm] = useState<Form>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (error) setMsg(error.message);
        if (data) {
          setForm({
            slug: data.slug ?? "",
            title: data.title ?? "",
            excerpt: data.excerpt ?? "",
            content: data.content ?? "",
            featured_image: data.featured_image ?? "",
            category: data.category ?? "",
            tags: (data.tags ?? []).join(", "),
            author: data.author ?? "Basic Socials",
            read_minutes: data.read_minutes ?? 4,
            seo_title: data.seo_title ?? "",
            meta_description: data.meta_description ?? "",
            og_image: data.og_image ?? "",
            status: data.status ?? "draft",
          });
        }
        setLoading(false);
      });
  }, [id, isNew]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (status?: string) => {
    setSaving(true);
    setMsg(null);
    const nextStatus = status ?? form.status;
    const payload = {
      slug: form.slug || slugify(form.title),
      title: form.title,
      excerpt: form.excerpt,
      content: form.content,
      featured_image: form.featured_image || null,
      category: form.category || null,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      author: form.author,
      read_minutes: Number(form.read_minutes) || 4,
      seo_title: form.seo_title || null,
      meta_description: form.meta_description || null,
      og_image: form.og_image || null,
      status: nextStatus,
      published_at: nextStatus === "published" ? new Date().toISOString() : null,
    };
    if (isNew) {
      const { data, error } = await supabase.from("posts").insert(payload).select("id").single();
      setSaving(false);
      if (error) return setMsg(error.message);
      navigate({ to: "/admin/posts/$id", params: { id: data.id } });
      setMsg("Saved.");
    } else {
      const { error } = await supabase.from("posts").update(payload).eq("id", id);
      setSaving(false);
      setForm((f) => ({ ...f, status: nextStatus }));
      setMsg(error ? error.message : "Saved.");
    }
  };

  return (
    <AdminShell title={isNew ? "New blog post" : "Edit blog post"}>
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
            <div>
              <label className={labelCls}>Excerpt</label>
              <textarea rows={3} className={`${inputCls} mt-2`} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Content (HTML)</label>
              <textarea rows={22} className={`${inputCls} mt-2 font-mono text-xs leading-relaxed`} value={form.content}
                onChange={(e) => set("content", e.target.value)} placeholder="<h2>Heading</h2><p>Paragraph…</p>" />
            </div>
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
                <label className={labelCls}>Featured image URL</label>
                <input className={`${inputCls} mt-2`} value={form.featured_image} onChange={(e) => set("featured_image", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Category</label>
                <input className={`${inputCls} mt-2`} value={form.category} onChange={(e) => set("category", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Tags (comma separated)</label>
                <input className={`${inputCls} mt-2`} value={form.tags} onChange={(e) => set("tags", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Author</label>
                <input className={`${inputCls} mt-2`} value={form.author} onChange={(e) => set("author", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Read minutes</label>
                <input type="number" className={`${inputCls} mt-2`} value={form.read_minutes} onChange={(e) => set("read_minutes", Number(e.target.value))} />
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-[#E5E7EB] bg-white p-6">
              <p className="font-display text-sm font-bold">SEO</p>
              <div>
                <label className={labelCls}>SEO title</label>
                <input className={`${inputCls} mt-2`} value={form.seo_title} onChange={(e) => set("seo_title", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>Meta description</label>
                <textarea rows={3} className={`${inputCls} mt-2`} value={form.meta_description} onChange={(e) => set("meta_description", e.target.value)} />
              </div>
              <div>
                <label className={labelCls}>OG image URL</label>
                <input className={`${inputCls} mt-2`} value={form.og_image} onChange={(e) => set("og_image", e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
