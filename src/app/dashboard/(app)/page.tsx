import Link from "next/link";
import type { Metadata } from "next";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { SUBJECT_LABELS } from "@/lib/ai/generate";

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
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl text-ink">Overview</h1>
        <p className="mt-1 text-sm text-ink/60">{studentCount ?? 0} students</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/dashboard/homework/new"
          className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-deep"
        >
          Generate homework
        </Link>
        <Link
          href="/dashboard/students"
          className="rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-forest hover:text-forest"
        >
          Manage students
        </Link>
      </div>

      <div>
        <h2 className="font-display text-lg text-ink">Recent homework</h2>
        {recentAssignments && recentAssignments.length > 0 ? (
          <ul className="mt-4 flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-cream">
            {recentAssignments.map((assignment) => (
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
                  <span className="text-sm text-ink/50">
                    {assignment.student?.full_name ?? "Unassigned"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-ink/50">No homework generated yet.</p>
        )}
      </div>
    </div>
  );
}
