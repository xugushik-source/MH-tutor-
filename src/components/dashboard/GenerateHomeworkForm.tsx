"use client";

import { useActionState } from "react";
import {
  generateHomeworkAction,
  type GenerateFormState,
} from "@/app/dashboard/(app)/homework/actions";
import { useDictionary, useLocale } from "@/i18n/provider";

const initialState: GenerateFormState = null;

const SUBJECT_VALUES = ["english", "math", "russian", "other"] as const;

export function GenerateHomeworkForm({
  students,
}: {
  students: { id: string; full_name: string }[];
}) {
  const dict = useDictionary().dashboard.homeworkNew;
  const subjectDict = useDictionary().dashboard.subjects;
  const { locale } = useLocale();
  const [state, formAction, pending] = useActionState(generateHomeworkAction, initialState);

  return (
    <form action={formAction} className="flex max-w-lg flex-col gap-4">
      <input type="hidden" name="locale" value={locale} />

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">{dict.subjectLabel}</span>
        <select name="subject" required defaultValue="" className="input">
          <option value="" disabled>
            {dict.subjectPlaceholder}
          </option>
          {SUBJECT_VALUES.map((value) => (
            <option key={value} value={value}>
              {subjectDict[value]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">{dict.topicLabel}</span>
        <input
          name="topic"
          type="text"
          required
          placeholder={dict.topicPlaceholder}
          className="input"
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">{dict.levelLabel}</span>
        <input name="level" type="text" placeholder={dict.levelPlaceholder} className="input" />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-ink/70">{dict.assignLabel}</span>
        <select name="studentId" defaultValue="" className="input">
          <option value="">{dict.notAssignedOption}</option>
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
        {pending ? dict.generatingButton : dict.generateButton}
      </button>

      {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
    </form>
  );
}
