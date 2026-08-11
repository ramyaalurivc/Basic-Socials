import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { inputCls, labelCls } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/admin/login")({
  ssr: false,
  head: () => ({ meta: [{ title: "Admin Login | Basic Socials" }, { name: "robots", content: "noindex" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (data.session) navigate({ to: "/admin" });
        else setMsg("Account created. Check your email to confirm, then sign in.");
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F6F7F9] px-6">
      <div className="w-full max-w-md rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.35)]">
        <Link to="/" className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0033FF]">
          Basic Socials
        </Link>
        <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0F172A]">
          {mode === "signin" ? "Admin login" : "Create admin account"}
        </h1>
        <p className="mt-2 text-sm text-[#475569]">
          {mode === "signin"
            ? "Sign in to manage blog posts and case studies."
            : "The first account created becomes the site admin."}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className={labelCls} htmlFor="email">Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} mt-2`} />
          </div>
          <div>
            <label className={labelCls} htmlFor="password">Password</label>
            <input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={`${inputCls} mt-2`} />
          </div>
          {msg && <p className="text-sm text-[#0033FF]">{msg}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-[#0033FF] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {busy ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMsg(null); }}
          className="mt-5 text-sm font-medium text-[#475569] underline underline-offset-4 hover:text-[#0033FF]"
        >
          {mode === "signin" ? "Need to create the first admin account?" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
