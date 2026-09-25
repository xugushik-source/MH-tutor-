"use client";

import { useActionState, useRef, useEffect } from "react";
import {
  gradeSubmissionAction,
  type GradeFormState,
} from "@/app/dashboard/(app)/homework/actions";

const initialState: GradeFormState = null;

export function GradeSubmissionForm({
  assignmentId,
  students,
}: {
  assignmentId: string;
  students: { id: string; full_name: string }[];
}) {
  const [state, formAction, pending] = useActionState(gradeSubmissionAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state === null && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="assignmentId" value={assignmentId} />

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">Student</span>
        <select name="studentId" required defaultValue="" className="input">
          <option value="" disabled>
            Choose a student
          </option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.full_name}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">Completed homework (photo or PDF)</span>
        <input
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/webp,application/pdf"
          required
          className="input"
        />
      </label>

      <button
        type="submit"
        disabled={pending}
        className="self-start rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40"
      >
        {pending ? "Uploading & grading…" : "Upload & grade"}
      </button>

      {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
    </form>
  );
}
