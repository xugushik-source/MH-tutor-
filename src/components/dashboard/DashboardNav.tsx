"use client";

import Link from "next/link";
import { useDictionary } from "@/i18n/provider";
import { SignOutButton } from "@/components/dashboard/SignOutButton";

export function DashboardNav({ teacherLabel }: { teacherLabel: string }) {
  const dict = useDictionary().dashboard.nav;

  const navLinks = [
    { href: "/dashboard", label: dict.overview },
    { href: "/dashboard/students", label: dict.students },
    { href: "/dashboard/homework/new", label: dict.newHomework },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 bg-cream px-6 py-4 sm:px-8">
      <nav className="flex flex-wrap gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-ink/70 transition-colors hover:text-forest"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <span className="text-sm text-ink/50">{teacherLabel}</span>
        <SignOutButton />
      </div>
    </div>
  );
}
