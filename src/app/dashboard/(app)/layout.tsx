import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

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
      <DashboardNav teacherLabel={teacher?.full_name ?? user.email ?? ""} />
      <main className="flex-1 px-6 py-10 sm:px-8">{children}</main>
    </div>
  );
}
