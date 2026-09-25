"use client";

import { useActionState, useRef, useEffect } from "react";
import { addStudent, type StudentFormState } from "@/app/dashboard/(app)/students/actions";

const initialState: StudentFormState = null;

export function AddStudentForm() {
  const [state, formAction, pending] = useActionState(addStudent, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state === null && formRef.current) {
      formRef.current.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-wrap items-end gap-3">
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">Student name</span>
        <input name="fullName" type="text" required className="input" />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">Notes (optional)</span>
        <input name="notes" type="text" className="input" />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-forest px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-40"
      >
        {pending ? "Adding…" : "Add student"}
      </button>
      {state?.error ? <p className="w-full text-sm text-red-600">{state.error}</p> : null}
    </form>
  );
}
