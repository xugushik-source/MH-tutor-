import "server-only";
import { getAnthropicClient, HOMEWORK_MODEL } from "@/lib/ai/client";
import type { Enums } from "@/lib/supabase/types";

export type Subject = Enums<"subject">;

export const SUBJECT_LABELS: Record<Subject, string> = {
  english: "English",
  math: "Math",
  russian: "Russian",
  other: "Other",
};

const SUBJECT_PROMPTS: Record<Subject, string> = {
  english:
    "You are an experienced English language tutor preparing homework for a private student.",
  math: "You are an experienced math tutor preparing homework for a private student.",
  russian:
    "You are an experienced Russian language tutor preparing homework for a private student. Write the exercises themselves in Russian.",
  other:
    "You are an experienced private tutor preparing homework for a student.",
};

export async function generateHomework(input: {
  subject: Subject;
  topic: string;
  level: string;
}): Promise<string> {
  const client = getAnthropicClient();

  const response = await client.messages.create({
    model: HOMEWORK_MODEL,
    max_tokens: 4000,
    system: `${SUBJECT_PROMPTS[input.subject]}

Write the homework as clean Markdown: a one-line instruction, then numbered exercises.
Do not include an answer key — the teacher grades submissions separately.
Target level: ${input.level || "use your judgement based on the topic"}.`,
    messages: [
      {
        role: "user",
        content: `Create a homework assignment on the topic: "${input.topic}".`,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("AI did not return text content.");
  }
  return textBlock.text;
}
