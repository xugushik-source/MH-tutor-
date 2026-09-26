import type { Metadata } from "next";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { isAiConfigured } from "@/lib/ai/client";
import { HomeworkNewView } from "@/components/dashboard/HomeworkNewView";

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

  return <HomeworkNewView students={students ?? []} aiConfigured={isAiConfigured()} />;
}
