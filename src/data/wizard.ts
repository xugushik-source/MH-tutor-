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
