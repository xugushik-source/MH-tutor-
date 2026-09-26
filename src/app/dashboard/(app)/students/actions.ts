"use server";

import { revalidatePath } from "next/cache";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { getDictionary, defaultLocale, locales, type Locale } from "@/i18n";

export type StudentFormState = { error: string } | null;

function localeFrom(formData: FormData): Locale {
  const raw = String(formData.get("locale") ?? "");
  return (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;
}

export async function addStudent(
  _prevState: StudentFormState,
  formData: FormData
): Promise<StudentFormState> {
  const dict = getDictionary(localeFrom(formData)).dashboard.students;
  const user = await verifyTeacher();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!fullName) {
    return { error: dict.errorNameRequired };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("students").insert({
    teacher_id: user.id,
    full_name: fullName,
    notes: notes || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/students");
  return null;
}

export async function deleteStudent(studentId: string) {
  const user = await verifyTeacher();
  const supabase = await createClient();
  await supabase
    .from("students")
    .delete()
    .eq("id", studentId)
    .eq("teacher_id", user.id);
  revalidatePath("/dashboard/students");
}
