"use client";

import { useDictionary } from "@/i18n/provider";
import { GenerateHomeworkForm } from "@/components/dashboard/GenerateHomeworkForm";

export function HomeworkNewView({
  students,
  aiConfigured,
}: {
  students: { id: string; full_name: string }[];
  aiConfigured: boolean;
}) {
  const dict = useDictionary().dashboard.homeworkNew;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl text-ink">{dict.title}</h1>
        <p className="mt-1 text-sm text-ink/60">{dict.subtitle}</p>
      </div>

      {!aiConfigured ? (
        <p className="rounded-2xl border border-gold/40 bg-gold/10 px-5 py-4 text-sm text-ink/70">
          {dict.aiNotConfigured}
        </p>
      ) : null}

      <GenerateHomeworkForm students={students} />
    </div>
  );
}
