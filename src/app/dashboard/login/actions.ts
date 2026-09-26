"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/config/site";
import { getDictionary, defaultLocale, locales, type Locale } from "@/i18n";

export type AuthFormState = {
  variant: "error" | "info";
  message: string;
} | null;

function localeFrom(formData: FormData): Locale {
  const raw = String(formData.get("locale") ?? "");
  return (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;
}

export async function signIn(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const dict = getDictionary(localeFrom(formData)).dashboard.login;
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { variant: "error", message: dict.errorEmailPassword };
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
  const dict = getDictionary(localeFrom(formData)).dashboard.login;
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!fullName) {
    return { variant: "error", message: dict.errorName };
  }
  if (!email) {
    return { variant: "error", message: dict.errorEmail };
  }
  if (password.length < 8) {
    return { variant: "error", message: dict.errorPasswordLength };
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
      message: dict.confirmEmailInfo,
    };
  }

  redirect("/dashboard");
}
