import Link from "next/link";
import { siteConfig } from "@/config/site";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-cream-dim">
      <div className="flex items-center justify-between border-b border-ink/10 bg-cream px-6 py-4 sm:px-8">
        <Link href="/" className="font-display text-lg text-forest">
          {siteConfig.initials} Homework
        </Link>
        <LanguageSwitcher />
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
