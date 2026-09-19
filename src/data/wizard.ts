import type { Locale } from "@/i18n/config";

export const wizardAudiences = [
  { id: "child", label: "Ребёнок" },
  { id: "teen", label: "Подросток" },
  { id: "adult", label: "Взрослый" },
] as const;

export const wizardGoals = [
  { id: "grades", label: "Улучшить оценки" },
  { id: "exam", label: "Подготовиться к экзамену" },
  { id: "speaking", label: "Разговорный язык" },
  { id: "scratch", label: "Начать с нуля" },
  { id: "admission", label: "Поступление" },
  { id: "custom", label: "Индивидуальная цель" },
] as const;

export const wizardTimes = [
  { id: "morning", label: "Утро" },
  { id: "afternoon", label: "День" },
  { id: "evening", label: "Вечер" },
  { id: "flexible", label: "Гибко" },
] as const;

export type WizardAudienceId = (typeof wizardAudiences)[number]["id"];
export type WizardGoalId = (typeof wizardGoals)[number]["id"];
export type WizardTimeId = (typeof wizardTimes)[number]["id"];

export interface WizardState {
  subject: string | null;
  audience: WizardAudienceId | null;
  goal: WizardGoalId | null;
  time: WizardTimeId | null;
}

export const initialWizardState: WizardState = {
  subject: null,
  audience: null,
  goal: null,
  time: null,
};

const audienceLabels: Record<Exclude<Locale, "ru">, Record<WizardAudienceId, string>> = {
  en: { child: "Child", teen: "Teenager", adult: "Adult" },
  hy: { child: "Երեխա", teen: "Դեռահաս", adult: "Մեծահասակ" },
};

const goalLabels: Record<Exclude<Locale, "ru">, Record<WizardGoalId, string>> = {
  en: {
    grades: "Improve grades",
    exam: "Prepare for an exam",
    speaking: "Conversational skills",
    scratch: "Start from scratch",
    admission: "University admission",
    custom: "A specific goal",
  },
  hy: {
    grades: "Բարելավել գնահատականները",
    exam: "Նախապատրաստվել քննությանը",
    speaking: "Խոսակցական լեզու",
    scratch: "Սկսել զրոյից",
    admission: "Ընդունելություն",
    custom: "Անհատական նպատակ",
  },
};

const timeLabels: Record<Exclude<Locale, "ru">, Record<WizardTimeId, string>> = {
  en: { morning: "Morning", afternoon: "Afternoon", evening: "Evening", flexible: "Flexible" },
  hy: { morning: "Առավոտ", afternoon: "Ցերեկ", evening: "Երեկո", flexible: "Ճկուն" },
};

export function localizeWizardOptions(locale: Locale) {
  if (locale === "ru") {
    return { audiences: wizardAudiences, goals: wizardGoals, times: wizardTimes };
  }
  return {
    audiences: wizardAudiences.map((a) => ({ ...a, label: audienceLabels[locale][a.id] })),
    goals: wizardGoals.map((g) => ({ ...g, label: goalLabels[locale][g.id] })),
    times: wizardTimes.map((t) => ({ ...t, label: timeLabels[locale][t.id] })),
  };
}
