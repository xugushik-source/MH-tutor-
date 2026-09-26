"use client";

import { useDictionary } from "@/i18n/provider";
import type { Subject } from "@/lib/ai/generate";
import { GradeSubmissionForm } from "@/components/dashboard/GradeSubmissionForm";

interface Assignment {
  id: string;
  subject: Subject;
  topic: string;
  level: string | null;
  content: string;
}

interface SubmissionRow {
  id: string;
  student: { full_name: string } | null;
  fileUrl: string | null;
  gradings: {
    score: number | null;
    max_score: number;
    feedback: string | null;
    corrections: string | null;
  }[];
}

export function HomeworkDetailView({
  assignment,
  students,
  submissions,
  aiConfigured,
}: {
  assignment: Assignment;
  students: { id: string; full_name: string }[];
  submissions: SubmissionRow[];
  aiConfigured: boolean;
}) {
  const dict = useDictionary().dashboard.homeworkDetail;
  const subjectDict = useDictionary().dashboard.subjects;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <span className="eyebrow text-forest">{subjectDict[assignment.subject]}</span>
        <h1 className="mt-2 font-display text-2xl text-ink">{assignment.topic}</h1>
        {assignment.level ? (
          <p className="mt-1 text-sm text-ink/50">
            {dict.levelLabel}: {assignment.level}
          </p>
        ) : null}
      </div>

      <article className="whitespace-pre-wrap rounded-2xl border border-ink/10 bg-cream p-6 text-sm leading-relaxed text-ink/80">
        {assignment.content}
      </article>

      <div className="rounded-2xl border border-ink/10 bg-cream p-6">
        <h2 className="font-display text-lg text-ink">{dict.gradeSectionTitle}</h2>
        <p className="mt-1 text-sm text-ink/60">{dict.gradeSectionSubtitle}</p>
        {!aiConfigured ? (
          <p className="mt-4 rounded-xl border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink/70">
            {dict.aiNotConfiguredGrading}
          </p>
        ) : (
          <div className="mt-4">
            <GradeSubmissionForm assignmentId={assignment.id} students={students} />
          </div>
        )}
      </div>

      {submissions.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h2 className="font-display text-lg text-ink">{dict.submissionsTitle}</h2>
          {submissions.map((submission) => {
            const grading = submission.gradings?.[0];
            return (
              <div
                key={submission.id}
                className="flex flex-col gap-3 rounded-2xl border border-ink/10 bg-cream p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-ink">
                    {submission.student?.full_name ?? dict.unknownStudent}
                  </span>
                  {submission.fileUrl ? (
                    <a
                      href={submission.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-forest underline underline-offset-2"
                    >
                      {dict.viewFile}
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
                  <p className="text-sm text-ink/40">{dict.notGradedYet}</p>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
