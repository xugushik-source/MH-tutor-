"use client";

import Link from "next/link";
import { useDictionary } from "@/i18n/provider";
import type { Subject } from "@/lib/ai/generate";

interface RecentAssignment {
  id: string;
  subject: Subject;
  topic: string;
  student: { full_name: string } | null;
}

export function OverviewView({
  studentCount,
  recentAssignments,
}: {
  studentCount: number;
  recentAssignments: RecentAssignment[];
}) {
  const dict = useDictionary().dashboard.overview;
  const subjectDict = useDictionary().dashboard.subjects;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl text-ink">{dict.title}</h1>
        <p className="mt-1 text-sm text-ink/60">
          {dict.studentsCount.replace("{count}", String(studentCount))}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/homework/new"
          className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
        >
          {dict.generateCta}
        </Link>
        <Link
          href="/dashboard/students"
          className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-forest hover:text-forest"
        >
          {dict.manageCta}
        </Link>
      </div>

      <div>
        <h2 className="font-display text-lg text-ink">{dict.recentTitle}</h2>
        {recentAssignments.length > 0 ? (
          <ul className="mt-4 flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-cream">
            {recentAssignments.map((assignment) => (
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
                  <span className="text-sm text-ink/50">
                    {assignment.student?.full_name ?? dict.unassigned}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-ink/50">{dict.emptyState}</p>
        )}
      </div>
    </div>
  );
}
