import { useCallback, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/")({
  ssr: false,
  head: () => ({ meta: [{ title: "CMS | Basic Socials" }, { name: "robots", content: "noindex" }] }),
  component: AdminHome,
});

type Row = { id: string; slug: string; title: string; status: string; updated_at: string };

function AdminHome() {
  return (
    <AdminShell title="Content">
      <div className="grid gap-8 lg:grid-cols-2">
        <ContentList table="posts" label="Blog posts" editBase="/admin/posts/$id" />
        <ContentList
          table="case_studies"
          label="Case studies"
          editBase="/admin/case-studies/$id"
        />
      </div>
    </AdminShell>
  );
}

function ContentList({
  table,
  label,
  newTo,
  editBase,
}: {
  table: "posts" | "case_studies";
  label: string;
  newTo: "/admin/posts/new" | "/admin/case-studies/new";
  editBase: "/admin/posts/$id" | "/admin/case-studies/$id";
}) {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select("id, slug, title, status, updated_at")
      .order("updated_at", { ascending: false });
    if (error) setError(error.message);
    setRows((data ?? []) as Row[]);
    setLoading(false);
  }, [table]);

  useEffect(() => { load(); }, [load]);

  const remove = async (id: string) => {
    if (!confirm("Delete this item permanently?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) setError(error.message);
    load();
  };

  return (
    <section className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.35)]">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold tracking-tight">{label}</h2>
        <Link
          to={newTo}
          className="rounded-full bg-[#0033FF] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          New
        </Link>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {loading && <p className="mt-4 text-sm text-[#475569]">Loading…</p>}
      {!loading && rows.length === 0 && (
        <p className="mt-4 text-sm text-[#475569]">Nothing here yet. Create your first entry.</p>
      )}

      <ul className="mt-4 divide-y divide-[#EEF0F3]">
        {rows.map((r) => (
          <li key={r.id} className="flex items-center justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#0F172A]">{r.title || "Untitled"}</p>
              <p className="truncate text-xs text-[#94A3B8]">/{r.slug}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide ${
                  r.status === "published"
                    ? "bg-[#0033FF]/10 text-[#0033FF]"
                    : "bg-[#F1F5F9] text-[#64748B]"
                }`}
              >
                {r.status}
              </span>
              <Link to={editBase} params={{ id: r.id }} className="text-sm font-semibold text-[#0033FF]">
                Edit
              </Link>
              <button type="button" onClick={() => remove(r.id)} className="text-sm text-[#94A3B8] hover:text-red-600">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
