import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { CaseStudyRow, PostRow } from "./content.types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return (data ?? []) as PostRow[];
});

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const sb = publicClient();
    const { data: post } = await sb
      .from("posts")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (!post) return { post: null, related: [] as PostRow[] };
    const typed = post as PostRow;
    let related: PostRow[] = [];
    if (typed.related_slugs?.length) {
      const { data: rel } = await sb
        .from("posts")
        .select("*")
        .in("slug", typed.related_slugs)
        .eq("status", "published");
      related = (rel ?? []) as PostRow[];
    }
    if (related.length < 2) {
      const { data: rest } = await sb
        .from("posts")
        .select("*")
        .neq("slug", typed.slug)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(3);
      const extra = ((rest ?? []) as PostRow[]).filter(
        (p) => !related.some((r) => r.slug === p.slug),
      );
      related = [...related, ...extra].slice(0, 2);
    }
    return { post: typed, related: related.slice(0, 2) };
  });

export const listCaseStudies = createServerFn({ method: "GET" }).handler(async () => {
  const { data } = await publicClient()
    .from("case_studies")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  return (data ?? []) as CaseStudyRow[];
});

export const getCaseStudyBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: { slug: string }) => data)
  .handler(async ({ data }) => {
    const { data: row } = await publicClient()
      .from("case_studies")
      .select("*")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    return (row as CaseStudyRow | null) ?? null;
  });

export const listSitemapSlugs = createServerFn({ method: "GET" }).handler(async () => {
  const sb = publicClient();
  const [{ data: posts }, { data: cases }] = await Promise.all([
    sb.from("posts").select("slug").eq("status", "published"),
    sb.from("case_studies").select("slug").eq("status", "published"),
  ]);
  return {
    posts: ((posts ?? []) as { slug: string }[]).map((p) => p.slug),
    caseStudies: ((cases ?? []) as { slug: string }[]).map((c) => c.slug),
  };
});
