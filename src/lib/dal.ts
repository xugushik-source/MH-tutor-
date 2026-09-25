import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Centralized session check per the Next.js Data Access Layer pattern —
// proxy.ts (src/proxy.ts) handles the redirect for page navigations, but
// Server Actions and Route Handlers can be invoked directly, so every
// mutation calls this too rather than trusting the proxy alone.
export const verifyTeacher = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dashboard/login");
  }

  return user;
});
