import Link from "next/link";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/dashboard/SignOutButton";

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/students", label: "Students" },
  { href: "/dashboard/homework/new", label: "New homework" },
];

export default async function DashboardAppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await verifyTeacher();
  const supabase = await createClient();
  const { data: teacher } = await supabase
    .from("teachers")
    .select("full_name")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink/10 bg-cream px-6 py-4 sm:px-8">
        <nav className="flex flex-wrap gap-6">
          {NAV_LINKS.map((link) => (
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
          <span className="text-sm text-ink/50">{teacher?.full_name ?? user.email}</span>
          <SignOutButton />
        </div>
      </div>
      <main className="flex-1 px-6 py-10 sm:px-8">{children}</main>
    </div>
  );
}
