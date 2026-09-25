import Link from "next/link";
import type { Metadata } from "next";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { AddStudentForm } from "@/components/dashboard/AddStudentForm";
import { deleteStudent } from "@/app/dashboard/(app)/students/actions";

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

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl text-ink">Students</h1>
        <p className="mt-1 text-sm text-ink/60">
          Add students once, then assign and grade homework by name.
        </p>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-cream p-6">
        <AddStudentForm />
      </div>

      {students && students.length > 0 ? (
        <ul className="flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-cream">
          {students.map((student) => (
            <li key={student.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <Link
                href={`/dashboard/students/${student.id}`}
                className="flex flex-col gap-0.5"
              >
                <span className="font-medium text-ink">{student.full_name}</span>
                {student.notes ? (
                  <span className="text-sm text-ink/50">{student.notes}</span>
                ) : null}
              </Link>
              <form action={deleteStudent.bind(null, student.id)}>
                <button
                  type="submit"
                  className="text-sm text-ink/40 transition-colors hover:text-red-600"
                >
                  Remove
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-ink/50">No students yet — add your first one above.</p>
      )}
    </div>
  );
}
