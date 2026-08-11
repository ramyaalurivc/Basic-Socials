import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAdmin() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!active) return;
      if (!user) {
        setEmail(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      setEmail(user.email ?? null);
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);
      if (!active) return;
      setIsAdmin((roles ?? []).some((r) => r.role === "admin"));
      setLoading(false);
    };
    load();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") load();
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { loading, email, isAdmin };
}
