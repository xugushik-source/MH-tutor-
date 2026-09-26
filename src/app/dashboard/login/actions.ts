"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site";

export type AuthFormState = {
  variant: "error" | "info";
  message: string;
} | null;

export async function signIn(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { variant: "error", message: "Enter your email and password." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { variant: "error", message: error.message };
  }

  redirect("/dashboard");
}

export async function signUp(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName) {
    return { variant: "error", message: "Enter your name." };
  }
  if (!email) {
    return { variant: "error", message: "Enter your email." };
  }
  if (password.length < 8) {
    return { variant: "error", message: "Password must be at least 8 characters." };
  }

  const supabase = await createClient();
  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      // Without this, Supabase falls back to the project's Site URL
      // setting (defaults to http://localhost:3000) for the confirmation
      // link — this must also be added to the Redirect URLs allow list
      // in the Supabase dashboard, or it's silently ignored.
      emailRedirectTo: `${siteConfig.url}/dashboard`,
    },
  });

  if (error) {
    return { variant: "error", message: error.message };
  }

  if (!data.session) {
    return {
      variant: "info",
      message: "Account created — check your email to confirm it, then sign in below.",
    };
  }

  redirect("/dashboard");
}
