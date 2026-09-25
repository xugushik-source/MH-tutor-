"use client";

import { useActionState } from "react";
import {
  generateHomeworkAction,
  type GenerateFormState,
} from "@/app/dashboard/(app)/homework/actions";

const initialState: GenerateFormState = null;

const SUBJECTS = [
  { value: "english", label: "English" },
  { value: "math", label: "Math" },
  { value: "russian", label: "Russian" },
  { value: "other", label: "Other" },
];

export function GenerateHomeworkForm({
  students,
}: {
  students: { id: string; full_name: string }[];
}) {
  const [state, formAction, pending] = useActionState(generateHomeworkAction, initialState);

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">Subject</span>
        <select name="subject" required defaultValue="" className="input">
          <option value="" disabled>
            Choose a subject
          </option>
          {SUBJECTS.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {subject.label}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">Topic</span>
        <input
          name="topic"
          type="text"
          required
          placeholder="e.g. past simple tense, quadratic equations"
          className="input"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">Level (optional)</span>
        <input name="level" type="text" placeholder="e.g. beginner, grade 7" className="input" />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">Assign to student (optional)</span>
        <select name="studentId" defaultValue="" className="input">
          <option value="">Not assigned yet</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.full_name}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        disabled={pending}
        className="mt-2 self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40"
      >
        {pending ? "Generating…" : "Generate homework"}
      </button>

      {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
    </form>
  );
}
