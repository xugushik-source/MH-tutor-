import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { isAiConfigured } from "@/lib/ai/client";
import { HomeworkDetailView } from "@/components/dashboard/HomeworkDetailView";

export const metadata: Metadata = {
  title: "Homework assignment",
  robots: { index: false, follow: false },
};

export default async function HomeworkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await verifyTeacher();
  const supabase = await createClient();

  const { data: assignment } = await supabase
    .from("homework_assignments")
    .select("id, subject, topic, level, content, created_at")
    .eq("id", id)
    .eq("teacher_id", user.id)
    .single();

  if (!assignment) {
    notFound();
  }

  const [{ data: students }, { data: submissions }] = await Promise.all([
    supabase.from("students").select("id, full_name").eq("teacher_id", user.id).order("full_name"),
    supabase
      .from("submissions")
      .select(
        "id, file_path, submitted_at, student:students(full_name), gradings(score, max_score, feedback, corrections)"
      )
      .eq("assignment_id", assignment.id)
      .order("submitted_at", { ascending: false }),
  ]);

  const submissionsWithUrls = await Promise.all(
    (submissions ?? []).map(async (submission) => {
      const { data: signed } = await supabase.storage
        .from("homework-files")
        .createSignedUrl(submission.file_path, 60 * 10);
      return { ...submission, fileUrl: signed?.signedUrl ?? null };
    })
  );

  return (
    <HomeworkDetailView
      assignment={assignment}
      students={students ?? []}
      submissions={submissionsWithUrls}
      aiConfigured={isAiConfigured()}
    />
  );
}
