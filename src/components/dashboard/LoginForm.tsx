"use client";

import { useActionState, useState } from "react";
import { signIn, signUp, type AuthFormState } from "@/app/dashboard/login/actions";

const initialState: AuthFormState = null;

export function LoginForm() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [signInState, signInAction, signInPending] = useActionState(signIn, initialState);
  const [signUpState, signUpAction, signUpPending] = useActionState(signUp, initialState);

  const state = mode === "signin" ? signInState : signUpState;

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 flex gap-1 rounded-full border border-ink/10 bg-ink/5 p-1">
        <button
          type="button"
          onClick={() => setMode("signin")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            mode === "signin" ? "bg-forest text-cream" : "text-ink/60"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode("signup")}
          className={`flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            mode === "signup" ? "bg-forest text-cream" : "text-ink/60"
          }`}
        >
          Create account
        </button>
      </div>

      {mode === "signin" ? (
        <form action={signInAction} className="flex flex-col gap-4">
          <Field label="Email" name="email" type="email" autoComplete="email" required />
          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <SubmitButton pending={signInPending}>Sign in</SubmitButton>
        </form>
      ) : (
        <form action={signUpAction} className="flex flex-col gap-4">
          <Field label="Full name" name="fullName" type="text" autoComplete="name" required />
          <Field label="Email" name="email" type="email" autoComplete="email" required />
          <Field
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          <SubmitButton pending={signUpPending}>Create account</SubmitButton>
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
}: {
  children: React.ReactNode;
  pending: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40"
    >
      {pending ? "Please wait…" : children}
    </button>
  );
}
