"use client";

import Link from "next/link";
import { useDictionary } from "@/i18n/provider";
import type { Subject } from "@/lib/ai/generate";

interface AssignmentRow {
  id: string;
  subject: Subject;
  topic: string;
  submissions: { gradings: { score: number | null; max_score: number }[] }[];
}

interface StudentRow {
  id: string;
  full_name: string;
  notes: string | null;
}

export function StudentHistoryView({
  student,
  assignments,
}: {
  student: StudentRow;
  assignments: AssignmentRow[];
}) {
  const dict = useDictionary().dashboard.studentHistory;
  const subjectDict = useDictionary().dashboard.subjects;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl text-ink">{student.full_name}</h1>
        {student.notes ? <p className="mt-1 text-sm text-ink/50">{student.notes}</p> : null}
      </div>

      {assignments.length > 0 ? (
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
                      {subjectDict[assignment.subject]}
                    </span>
                    <span className="font-medium text-ink">{assignment.topic}</span>
                  </div>
                  {grading ? (
                    <span className="font-display text-lg text-forest">
                      {grading.score}
                      <span className="text-sm text-ink/40">/{grading.max_score}</span>
                    </span>
                  ) : submission ? (
                    <span className="text-sm text-ink/40">{dict.gradingEllipsis}</span>
                  ) : (
                    <span className="text-sm text-ink/40">{dict.notSubmitted}</span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-ink/50">
          {dict.emptyStatePrefix}
          {student.full_name}
          {dict.emptyStateSuffix}{" "}
          <Link href="/dashboard/homework/new" className="text-forest underline underline-offset-2">
            {dict.generateOneLink}
          </Link>
          .
        </p>
      )}
    </div>
  );
}
