"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { verifyTeacher } from "@/lib/dal";
import { createClient } from "@/lib/supabase/server";
import { generateHomework, type Subject } from "@/lib/ai/generate";
import { gradeSubmission, type SubmissionMediaType } from "@/lib/ai/grade";
import { isAiConfigured } from "@/lib/ai/client";
import { getDictionary, defaultLocale, locales, type Locale } from "@/i18n";

export type GenerateFormState = { error: string } | null;

const SUBJECTS: Subject[] = ["english", "math", "russian", "other"];

function localeFrom(formData: FormData): Locale {
  const raw = String(formData.get("locale") ?? "");
  return (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;
}

export async function generateHomeworkAction(
  _prevState: GenerateFormState,
  formData: FormData
): Promise<GenerateFormState> {
  const dict = getDictionary(localeFrom(formData)).dashboard.homeworkNew;

  if (!isAiConfigured()) {
    return { error: dict.errorNotConfigured };
  }

  const user = await verifyTeacher();

  const subject = String(formData.get("subject") ?? "");
  const topic = String(formData.get("topic") ?? "").trim();
  const level = String(formData.get("level") ?? "").trim();
  const studentId = String(formData.get("studentId") ?? "").trim();

  if (!SUBJECTS.includes(subject as Subject)) {
    return { error: dict.errorChooseSubject };
  }
  if (!topic) {
    return { error: dict.errorEnterTopic };
  }

  let content: string;
  try {
    content = await generateHomework({ subject: subject as Subject, topic, level });
  } catch {
    return { error: dict.errorGenerationFailed };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("homework_assignments")
    .insert({
      teacher_id: user.id,
      student_id: studentId || null,
      subject: subject as Subject,
      topic,
      level: level || null,
      content,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: error?.message ?? dict.errorSaveFailed };
  }

  redirect(`/dashboard/homework/${data.id}`);
}

export type GradeFormState = { error: string } | null;

const MEDIA_TYPES: Record<string, SubmissionMediaType> = {
  "image/jpeg": "image/jpeg",
  "image/png": "image/png",
  "image/webp": "image/webp",
  "application/pdf": "application/pdf",
};

export async function gradeSubmissionAction(
  _prevState: GradeFormState,
  formData: FormData
): Promise<GradeFormState> {
  const dict = getDictionary(localeFrom(formData)).dashboard.homeworkDetail;

  if (!isAiConfigured()) {
    return { error: dict.errorNotConfigured };
  }

  const user = await verifyTeacher();
  const assignmentId = String(formData.get("assignmentId") ?? "");
  const studentId = String(formData.get("studentId") ?? "");
  const file = formData.get("file") as File | null;

  if (!studentId) {
    return { error: dict.errorChooseStudent };
  }
  if (!file || file.size === 0) {
    return { error: dict.errorChooseFile };
  }

  const mediaType = MEDIA_TYPES[file.type];
  if (!mediaType) {
    return { error: dict.errorFileType };
  }

  const supabase = await createClient();

  const { data: assignment, error: assignmentError } = await supabase
    .from("homework_assignments")
    .select("id, subject, content")
    .eq("id", assignmentId)
    .eq("teacher_id", user.id)
    .single();

  if (assignmentError || !assignment) {
    return { error: dict.errorAssignmentNotFound };
  }

  const filePath = `${user.id}/${studentId}/${assignment.id}-${Date.now()}-${file.name}`;
  const fileBuffer = await file.arrayBuffer();

  const { error: uploadError } = await supabase.storage
    .from("homework-files")
    .upload(filePath, fileBuffer, { contentType: file.type });

  if (uploadError) {
    return { error: `Upload failed: ${uploadError.message}` };
  }

  const { data: submission, error: submissionError } = await supabase
    .from("submissions")
    .insert({
      assignment_id: assignment.id,
      student_id: studentId,
      teacher_id: user.id,
      file_path: filePath,
    })
    .select("id")
    .single();

  if (submissionError || !submission) {
    return { error: submissionError?.message ?? dict.errorSaveSubmissionFailed };
  }

  let grading;
  try {
    const base64 = Buffer.from(fileBuffer).toString("base64");
    grading = await gradeSubmission({
      subject: assignment.subject,
      assignmentContent: assignment.content,
      fileBase64: base64,
      mediaType,
    });
  } catch {
    return { error: dict.errorGradingFailed };
  }

  const { error: gradingError } = await supabase.from("gradings").insert({
    submission_id: submission.id,
    teacher_id: user.id,
    score: grading.score,
    max_score: grading.maxScore,
    feedback: grading.feedback,
    corrections: grading.corrections,
  });

  if (gradingError) {
    return { error: gradingError.message };
  }

  revalidatePath(`/dashboard/homework/${assignment.id}`);
  revalidatePath(`/dashboard/students/${studentId}`);
  return null;
}
