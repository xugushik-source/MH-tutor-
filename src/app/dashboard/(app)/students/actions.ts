"use server";

import { revalidatePath } from "next/cache";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";

export type StudentFormState = { error: string } | null;

export async function addStudent(
  _prevState: StudentFormState,
  formData: FormData
): Promise<StudentFormState> {
  const user = await verifyTeacher();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!fullName) {
    return { error: "Enter the student's name." };
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
