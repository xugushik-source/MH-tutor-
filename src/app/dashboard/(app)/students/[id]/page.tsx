import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { SUBJECT_LABELS } from "@/lib/ai/generate";

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

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl text-ink">{student.full_name}</h1>
        {student.notes ? <p className="mt-1 text-sm text-ink/50">{student.notes}</p> : null}
      </div>

      {assignments && assignments.length > 0 ? (
        <ul className="flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-cream">
          {assignments.map((assignment) => {
            const submission = assignment.submissions?.[0];
            const grading = submission?.gradings?.[0];
            return (
              <li key={assignment.id}>
                <Link
                  href={`/dashboard/homework/${assignment.id}`}
                  className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-sage-soft/40"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="eyebrow text-forest text-[0.65rem]">
                      {SUBJECT_LABELS[assignment.subject]}
                    </span>
                    <span className="font-medium text-ink">{assignment.topic}</span>
                  </div>
                  {grading ? (
                    <span className="font-display text-lg text-forest">
                      {grading.score}
                      <span className="text-sm text-ink/40">/{grading.max_score}</span>
                    </span>
                  ) : submission ? (
                    <span className="text-sm text-ink/40">Grading…</span>
                  ) : (
                    <span className="text-sm text-ink/40">Not submitted</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-ink/50">
          No homework assigned to {student.full_name} yet.{" "}
          <Link href="/dashboard/homework/new" className="text-forest underline underline-offset-2">
            Generate one
          </Link>
          .
        </p>
      )}
    </div>
  );
}
