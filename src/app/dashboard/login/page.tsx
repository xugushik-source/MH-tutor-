import type { Metadata } from "next";
import { LoginForm } from "@/components/dashboard/LoginForm";

export const metadata: Metadata = {
  title: "Teacher login",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-8">
      <LoginForm />
    </div>
  );
}
