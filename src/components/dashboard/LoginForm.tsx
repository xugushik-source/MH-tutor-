"use client";

import { useActionState, useState } from "react";
import { signIn, signUp, type AuthFormState } from "@/app/dashboard/login/actions";
import { useDictionary, useLocale } from "@/i18n/provider";

const initialState: AuthFormState = null;

export function LoginForm() {
  const dict = useDictionary().dashboard.login;
  const { locale } = useLocale();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [signInState, signInAction, signInPending] = useActionState(signIn, initialState);
  const [signUpState, signUpAction, signUpPending] = useActionState(signUp, initialState);

  const state = mode === "signin" ? signInState : signUpState;

  return (
    <div className="flex w-full max-w-sm flex-col items-center">
      <h1 className="mb-2 font-display text-2xl text-ink">{dict.title}</h1>
      <p className="mb-8 text-center text-sm text-ink/60">{dict.subtitle}</p>

      <div className="mb-8 flex w-full gap-1 rounded-full border border-ink/10 bg-ink/5 p-1">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            mode === "signin" ? "bg-forest text-cream" : "text-ink/60"
          }`}
        >
          {dict.signInTab}
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            mode === "signup" ? "bg-forest text-cream" : "text-ink/60"
          }`}
        >
          {dict.signUpTab}
        </button>
      </div>

      {mode === "signin" ? (
        <form action={signInAction} className="flex flex-col gap-4">
          <input type="hidden" name="locale" value={locale} />
          <Field label={dict.emailLabel} name="email" type="email" autoComplete="email" required />
          <Field
            label={dict.passwordLabel}
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <SubmitButton pending={signInPending} pendingLabel={dict.pending}>
            {dict.signInButton}
          </SubmitButton>
        </form>
      ) : (
        <form action={signUpAction} className="flex flex-col gap-4">
          <input type="hidden" name="locale" value={locale} />
          <Field
            label={dict.fullNameLabel}
            name="fullName"
            type="text"
            autoComplete="name"
            required
          />
          <Field label={dict.emailLabel} name="email" type="email" autoComplete="email" required />
          <Field
            label={dict.passwordLabel}
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          <SubmitButton pending={signUpPending} pendingLabel={dict.pending}>
            {dict.signUpButton}
          </SubmitButton>
        </form>
      )}

      {state ? (
        <p
          className={`mt-4 text-sm ${
            state.variant === "error" ? "text-red-600" : "text-forest"
          }`}
        >
          {state.message}
        </p>
      ) : null}
    </div>
  );
}

function Field({
  label,
  name,
  type,
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type: string;
  autoComplete: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-ink/70">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="input"
      />
    </label>
  );
}

function SubmitButton({
  children,
  pending,
  pendingLabel,
}: {
  children: React.ReactNode;
  pending: boolean;
  pendingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40"
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
