import type { Locale } from "@/i18n/config";

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

const translations: Record<Exclude<Locale, "ru">, Record<SubjectSlug, { title: string; description: string }>> = {
  en: {
    english: {
      title: "English",
      description: "From zero to fluent speech and international exam preparation.",
    },
    math: {
      title: "Mathematics",
      description: "School curriculum, olympiads, exam preparation.",
    },
    russian: {
      title: "Russian",
      description: "Literacy, literature, exam preparation.",
    },
    armenian: {
      title: "Armenian",
      description: "For those who speak it at home or study it at school.",
    },
    georgian: {
      title: "Georgian",
      description: "Conversational and academic Georgian.",
    },
    "school-prep": {
      title: "School Prep",
      description: "A gentle start for preschoolers and first-graders.",
    },
    "exam-prep": {
      title: "Exam Prep",
      description: "SAT, IELTS, TOEFL and other formats.",
    },
    other: {
      title: "Other",
      description: "Tell us what you need — we'll match a tutor.",
    },
  },
  hy: {
    english: {
      title: "Անգլերեն",
      description: "Զրոյից մինչև ազատ խոսք և միջազգային քննությունների նախապատրաստում։",
    },
    math: {
      title: "Մաթեմատիկա",
      description: "Դպրոցական ծրագիր, օլիմպիադաներ, քննությունների նախապատրաստում։",
    },
    russian: {
      title: "Ռուսերեն",
      description: "Գրագիտություն, գրականություն, քննությունների նախապատրաստում։",
    },
    armenian: {
      title: "Հայերեն",
      description: "Նրանց համար, ովքեր խոսում են տանը կամ սովորում դպրոցում։",
    },
    georgian: {
      title: "Վրացերեն",
      description: "Խոսակցական և ակադեմիական վրացերեն։",
    },
    "school-prep": {
      title: "Նախապատրաստում դպրոցին",
      description: "Մեղմ սկիզբ նախադպրոցականների և առաջին դասարանցիների համար։",
    },
    "exam-prep": {
      title: "Քննությունների նախապատրաստում",
      description: "SAT, IELTS, TOEFL և այլ ձևաչափեր։",
    },
    other: {
      title: "Այլ",
      description: "Պատմեք, թե ինչ է անհրաժեշտ․ մենք կընտրենք դասատու։",
    },
  },
};

export function localizeSubjects(locale: Locale): Subject[] {
  if (locale === "ru") return subjects;
  const t = translations[locale];
  return subjects.map((s) => ({ ...s, title: t[s.slug].title, description: t[s.slug].description }));
}

export function getSubjectBySlug(slug: string) {
  return subjects.find((s) => s.slug === slug);
}
