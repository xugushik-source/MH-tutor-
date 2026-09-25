import type { Metadata } from "next";
import { LoginForm } from "@/components/dashboard/LoginForm";

export const metadata: Metadata = {
  title: "Teacher login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-8">
      <div className="flex flex-col items-center">
        <h1 className="mb-2 font-display text-2xl text-ink">Teacher login</h1>
        <p className="mb-8 text-sm text-ink/60">
          Generate and grade homework for your students.
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
