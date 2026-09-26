import type { Metadata } from "next";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { OverviewView } from "@/components/dashboard/OverviewView";

export const metadata: Metadata = {
  title: "Overview",
  robots: { index: false, follow: false },
};

export default async function DashboardOverviewPage() {
  const user = await verifyTeacher();
  const supabase = await createClient();

  const [{ count: studentCount }, { data: recentAssignments }] = await Promise.all([
    supabase
      .from("students")
      .select("id", { count: "exact", head: true })
      .eq("teacher_id", user.id),
    supabase
      .from("homework_assignments")
      .select("id, subject, topic, created_at, student:students(full_name)")
      .eq("teacher_id", user.id)
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  return (
    <OverviewView studentCount={studentCount ?? 0} recentAssignments={recentAssignments ?? []} />
  );
}
