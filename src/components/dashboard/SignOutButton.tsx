"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useDictionary } from "@/i18n/provider";

export function SignOutButton() {
  const dict = useDictionary().dashboard.nav;
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleSignOut() {
    setPending(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/dashboard/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={pending}
      className="text-sm text-ink/60 transition-colors hover:text-ink disabled:opacity-40"
    >
      {dict.signOut}
    </button>
  );
}
