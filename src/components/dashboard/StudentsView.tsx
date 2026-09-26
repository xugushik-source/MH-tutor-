"use client";

import Link from "next/link";
import { useDictionary } from "@/i18n/provider";
import { AddStudentForm } from "@/components/dashboard/AddStudentForm";
import { deleteStudent } from "@/app/dashboard/(app)/students/actions";

interface StudentRow {
  id: string;
  full_name: string;
  notes: string | null;
}

export function StudentsView({ students }: { students: StudentRow[] }) {
  const dict = useDictionary().dashboard.students;

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-display text-2xl text-ink">{dict.title}</h1>
        <p className="mt-1 text-sm text-ink/60">{dict.subtitle}</p>
      </div>

      <div className="rounded-2xl border border-ink/10 bg-cream p-6">
        <AddStudentForm />
      </div>

      {students.length > 0 ? (
        <ul className="flex flex-col divide-y divide-ink/10 rounded-2xl border border-ink/10 bg-cream">
          {students.map((student) => (
            <li key={student.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <Link href={`/dashboard/students/${student.id}`} className="flex flex-col gap-0.5">
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
                  {dict.removeButton}
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-ink/50">{dict.emptyState}</p>
      )}
    </div>
  );
}
