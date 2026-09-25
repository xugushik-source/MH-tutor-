import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-cream-dim">
      <div className="border-b border-ink/10 bg-cream px-6 py-4 sm:px-8">
        <Link href="/" className="font-display text-lg text-forest">
          {siteConfig.initials} Homework
        </Link>
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
