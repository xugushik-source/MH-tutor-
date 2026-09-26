import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { StudentHistoryView } from "@/components/dashboard/StudentHistoryView";

export const metadata: Metadata = {
  title: "Student history",
  robots: { index: false, follow: false },
};

export default async function StudentHistoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await verifyTeacher();
  const supabase = await createClient();

  const { data: student } = await supabase
    .from("students")
    .select("id, full_name, notes")
    .eq("id", id)
    .eq("teacher_id", user.id)
    .single();

  if (!student) {
    notFound();
  }

  const { data: assignments } = await supabase
    .from("homework_assignments")
    .select(
      "id, subject, topic, created_at, submissions(id, submitted_at, gradings(score, max_score))"
    )
    .eq("student_id", student.id)
    .eq("teacher_id", user.id)
    .order("created_at", { ascending: false });

  return <StudentHistoryView student={student} assignments={assignments ?? []} />;
}
