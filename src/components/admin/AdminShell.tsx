import type { ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/lib/use-admin";

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const { loading, isAdmin, email } = useAdmin();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F6F7F9] text-[#475569]">
        Loading…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#F6F7F9] px-6 text-center">
        <h1 className="font-display text-2xl font-bold text-[#0F172A]">Admin access required</h1>
        <p className="text-[#475569]">
          {email ? `${email} is not an admin on this site.` : "Please sign in to continue."}
        </p>
        <Link
          to="/admin/login"
          className="rounded-full bg-[#0033FF] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F7F9] text-[#0F172A]">
      <header className="sticky top-0 z-20 border-b border-[#E5E7EB] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link to="/admin" className="font-display text-lg font-bold tracking-tight">
              Basic Socials <span className="text-[#0033FF]">CMS</span>
            </Link>
            <nav className="hidden gap-5 text-sm font-medium text-[#475569] sm:flex">
              <Link to="/admin" className="hover:text-[#0033FF]">Content</Link>
              <Link to="/" className="hover:text-[#0033FF]">View site</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-[#475569] md:inline">{email}</span>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/admin/login" });
              }}
              className="rounded-full border border-[#E5E7EB] px-4 py-2 font-medium text-[#0F172A] transition hover:border-[#0033FF] hover:text-[#0033FF]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="font-display text-3xl font-bold tracking-tight">{title}</h1>
        <div className="mt-8">{children}</div>
      </main>
    </div>
  );
}

export const inputCls =
  "w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#0F172A] outline-none transition focus:border-[#0033FF] focus:ring-2 focus:ring-[#0033FF]/15";
export const labelCls = "block text-xs font-semibold uppercase tracking-[0.1em] text-[#475569]";
