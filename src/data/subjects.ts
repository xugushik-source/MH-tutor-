export type SubjectSlug =
  | "english"
  | "math"
  | "russian"
  | "armenian"
  | "georgian"
  | "school-prep"
  | "exam-prep"
  | "other";

export interface Subject {
  slug: SubjectSlug;
  title: string;
  description: string;
  tutorsCount: number;
  size: "lg" | "md" | "sm";
}

export const subjects: Subject[] = [
  {
    slug: "english",
    title: "Английский",
    description: "От нуля до свободной речи и подготовки к международным экзаменам.",
    tutorsCount: 14,
    size: "lg",
  },
  {
    slug: "math",
    title: "Математика",
    description: "Школьная программа, олимпиады, подготовка к экзаменам.",
    tutorsCount: 11,
    size: "md",
  },
  {
    slug: "russian",
    title: "Русский язык",
    description: "Грамотность, литература, подготовка к экзаменам.",
    tutorsCount: 9,
    size: "sm",
  },
  {
    slug: "armenian",
    title: "Армянский язык",
    description: "Для тех, кто говорит дома или учится в школе.",
    tutorsCount: 6,
    size: "sm",
  },
  {
    slug: "georgian",
    title: "Грузинский язык",
    description: "Разговорный и академический грузинский.",
    tutorsCount: 4,
    size: "sm",
  },
  {
    slug: "school-prep",
    title: "Подготовка к школе",
    description: "Мягкий старт для дошкольников и первоклассников.",
    tutorsCount: 5,
    size: "md",
  },
  {
    slug: "exam-prep",
    title: "Подготовка к экзаменам",
    description: "ЕГЭ, ОГЭ, SAT, IELTS, TOEFL и другие форматы.",
    tutorsCount: 8,
    size: "lg",
  },
  {
    slug: "other",
    title: "Другое",
    description: "Расскажите, что нужно — подберём преподавателя.",
    tutorsCount: 3,
    size: "sm",
  },
];

export function getSubjectBySlug(slug: string) {
  return subjects.find((s) => s.slug === slug);
}
