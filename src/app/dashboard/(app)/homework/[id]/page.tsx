import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { isAiConfigured } from "@/lib/ai/client";
import { SUBJECT_LABELS } from "@/lib/ai/generate";
import { GradeSubmissionForm } from "@/components/dashboard/GradeSubmissionForm";

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
    <div className="flex flex-col gap-10">
      <div>
        <span className="eyebrow text-forest">{SUBJECT_LABELS[assignment.subject]}</span>
        <h1 className="mt-2 font-display text-2xl text-ink">{assignment.topic}</h1>
        {assignment.level ? (
          <p className="mt-1 text-sm text-ink/50">Level: {assignment.level}</p>
        ) : null}
      </div>

      <article className="whitespace-pre-wrap rounded-2xl border border-ink/10 bg-cream p-6 text-sm leading-relaxed text-ink/80">
        {assignment.content}
      </article>

      <div className="rounded-2xl border border-ink/10 bg-cream p-6">
        <h2 className="font-display text-lg text-ink">Grade a submission</h2>
        <p className="mt-1 text-sm text-ink/60">
          Upload the student&apos;s completed work — a photo or a PDF — and AI will score it,
          leave feedback, and list corrections.
        </p>
        {!isAiConfigured() ? (
          <p className="mt-4 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink/70">
            AI grading isn&apos;t configured yet — an ANTHROPIC_API_KEY needs to be added before
            this works.
          </p>
        ) : (
          <div className="mt-4">
            <GradeSubmissionForm assignmentId={assignment.id} students={students ?? []} />
          </div>
        )}
      </div>

      {submissionsWithUrls.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-lg text-ink">Submissions</h2>
          {submissionsWithUrls.map((submission) => {
            const grading = submission.gradings?.[0];
            return (
              <div
                key={submission.id}
                className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-cream p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-ink">
                    {submission.student?.full_name ?? "Unknown student"}
                  </span>
                  {submission.fileUrl ? (
                    <a
                      href={submission.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-forest underline underline-offset-2"
                    >
                      View file
                    </a>
                  ) : null}
                </div>
                {grading ? (
                  <>
                    <p className="text-2xl font-display text-forest">
                      {grading.score}
                      <span className="text-base text-ink/40">/{grading.max_score}</span>
                    </p>
                    {grading.feedback ? (
                      <p className="text-sm text-ink/70">{grading.feedback}</p>
                    ) : null}
                    {grading.corrections ? (
                      <div className="whitespace-pre-wrap text-sm text-ink/60">
                        {grading.corrections}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <p className="text-sm text-ink/40">Not graded yet.</p>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
