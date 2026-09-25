import type { Metadata } from "next";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { isAiConfigured } from "@/lib/ai/client";
import { GenerateHomeworkForm } from "@/components/dashboard/GenerateHomeworkForm";

export const metadata: Metadata = {
  title: "New homework",
  robots: { index: false, follow: false },
};

export default async function NewHomeworkPage() {
  const user = await verifyTeacher();
  const supabase = await createClient();
  const { data: students } = await supabase
    .from("students")
    .select("id, full_name")
    .eq("teacher_id", user.id)
    .order("full_name");

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl text-ink">New homework</h1>
        <p className="mt-1 text-sm text-ink/60">
          Pick a subject and topic — works the same for English, Math, Russian, or any other
          subject.
        </p>
      </div>

      {!isAiConfigured() ? (
        <p className="rounded-2xl border border-gold/40 bg-gold/10 px-5 py-4 text-sm text-ink/70">
          AI generation isn&apos;t configured yet — an ANTHROPIC_API_KEY needs to be added before
          this works.
        </p>
      ) : null}

      <GenerateHomeworkForm students={students ?? []} />
    </div>
  );
}
