import "server-only";
import { getAnthropicClient, HOMEWORK_MODEL } from "@/lib/ai/client";
import type { Subject } from "@/lib/ai/generate";

export interface GradingResult {
  score: number;
  maxScore: number;
  feedback: string;
  corrections: string;
}

export type SubmissionMediaType =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "application/pdf";

const GRADING_INSTRUCTIONS = `You are a tutor grading a student's homework submission against the original assignment. The submission may be a photo of handwritten work, a scan, or a PDF — read it carefully, including handwriting; if a part is genuinely illegible, say so in the feedback rather than guessing.

Respond with ONLY a JSON object, no other text, in exactly this shape:
{"score": number, "maxScore": number, "feedback": string, "corrections": string}

- score/maxScore: out of 100 unless the assignment implies otherwise
- feedback: 2-4 sentences, encouraging but honest, written to the student
- corrections: a Markdown list of the specific mistakes found and the correct answer/form for each. Empty string if there are no mistakes.`;

export async function gradeSubmission(input: {
  subject: Subject;
  assignmentContent: string;
  fileBase64: string;
  mediaType: SubmissionMediaType;
}): Promise<GradingResult> {
  const client = getAnthropicClient();

  const fileBlock =
    input.mediaType === "application/pdf"
      ? ({
          type: "document",
          source: {
            type: "base64",
            media_type: "application/pdf",
            data: input.fileBase64,
          },
        } as const)
      : ({
          type: "image",
          source: {
            type: "base64",
            media_type: input.mediaType,
            data: input.fileBase64,
          },
        } as const);

  const response = await client.messages.create({
    model: HOMEWORK_MODEL,
    max_tokens: 2000,
    system: GRADING_INSTRUCTIONS,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Subject: ${input.subject}\n\nOriginal assignment:\n${input.assignmentContent}\n\nThe student's submitted work is attached below.`,
          },
          fileBlock,
        ],
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("AI did not return text content.");
  }

  const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("AI response did not contain valid JSON.");
  }

  const parsed = JSON.parse(jsonMatch[0]) as Partial<GradingResult>;
  return {
    score: Number(parsed.score) || 0,
    maxScore: Number(parsed.maxScore) || 100,
    feedback: String(parsed.feedback ?? ""),
    corrections: String(parsed.corrections ?? ""),
  };
}
