import type { Metadata } from "next";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { StudentsView } from "@/components/dashboard/StudentsView";

export const metadata: Metadata = {
  title: "Students",
  robots: { index: false, follow: false },
};

export default async function StudentsPage() {
  const user = await verifyTeacher();
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("id, full_name, notes, created_at")
    .eq("teacher_id", user.id)
    .order("full_name");

  return <StudentsView students={students ?? []} />;
}
