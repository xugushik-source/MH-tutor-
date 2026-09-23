import type { Locale } from "@/i18n/config";

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Расскажите, чему хотите научиться",
    description: "Пройдите короткий подбор: предмет, цель, уровень и удобное время.",
  },
  {
    index: "02",
    title: "Мы подберём преподавателя",
    description: "Предложим несколько преподавателей, которые подходят именно под вашу задачу.",
  },
  {
    index: "03",
    title: "Познакомьтесь на пробном занятии",
    description: "Проверьте формат вживую — без обязательств продолжать.",
  },
  {
    index: "04",
    title: "Получите персональный план",
    description: "Преподаватель составит маршрут обучения под вашу цель и темп.",
  },
  {
    index: "05",
    title: "Следите за прогрессом",
    description: "Регулярная обратная связь — видно, что меняется от занятия к занятию.",
  },
];

interface ProcessStepTranslation {
  title: string;
  description: string;
}

const processStepTranslations: Record<Exclude<Locale, "ru">, Record<string, ProcessStepTranslation>> = {
  en: {
    "01": {
      title: "Tell us what you want to learn",
      description: "Go through a short matching flow: subject, goal, level and convenient time.",
    },
    "02": {
      title: "We'll match you with a tutor",
      description: "We'll suggest a few tutors who fit your specific goal.",
    },
    "03": {
      title: "Meet on a trial lesson",
      description: "Try the format live — no obligation to continue.",
    },
    "04": {
      title: "Get a personal plan",
      description: "The tutor builds a learning path around your goal and pace.",
    },
    "05": {
      title: "Track the progress",
      description: "Regular feedback — you can see what changes from lesson to lesson.",
    },
  },
  hy: {
    "01": {
      title: "Պատմեք, ինչ եք ուզում սովորել",
      description: "Անցեք կարճ հարցում՝ առարկա, նպատակ, մակարդակ և հարմար ժամանակ։",
    },
    "02": {
      title: "Մենք կընտրենք դասատու",
      description: "Կառաջարկենք մի քանի դասատու, որոնք հարմար են հենց ձեր խնդրի համար։",
    },
    "03": {
      title: "Ծանոթացեք փորձնական դասին",
      description: "Փորձեք ձևաչափը կենդանի՝ առանց շարունակելու պարտավորության։",
    },
    "04": {
      title: "Ստացեք անհատական պլան",
      description: "Դասատուն կկազմի ուսուցման ուղի՝ ըստ ձեր նպատակի և տեմպի։",
    },
    "05": {
      title: "Հետևեք առաջընթացին",
      description: "Կանոնավոր հետադարձ կապ՝ երևում է, թե ինչ է փոխվում դասից դաս։",
    },
  },
};

export function localizeProcessSteps(locale: Locale): ProcessStep[] {
  if (locale === "ru") return processSteps;
  return processSteps.map((step) => ({ ...step, ...processStepTranslations[locale][step.index] }));
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    id: "precision",
    title: "Точный подбор",
    description: "Преподаватель подбирается под предмет, цель и ученика.",
  },
  {
    id: "oneOnOne",
    title: "Один на один",
    description: "Максимальное внимание преподавателя — никаких групп.",
  },
  {
    id: "flexibleSchedule",
    title: "Гибкое расписание",
    description: "Обучение в удобное время, с возможностью менять график.",
  },
  {
    id: "clearProgress",
    title: "Понятный прогресс",
    description: "Ученик и родитель всегда понимают, к какому результату идут.",
  },
  {
    id: "online",
    title: "Онлайн",
    description: "Можно заниматься из любой страны — важен только часовой пояс.",
  },
  {
    id: "vettedTutors",
    title: "Отбор преподавателей",
    description: "Каждый преподаватель проходит отбор центра перед тем, как начать вести учеников.",
  },
];

interface BenefitTranslation {
  title: string;
  description: string;
}

const benefitTranslations: Record<Exclude<Locale, "ru">, Record<string, BenefitTranslation>> = {
  en: {
    precision: {
      title: "Precise matching",
      description: "The tutor is chosen for the subject, the goal and the student.",
    },
    oneOnOne: {
      title: "One on one",
      description: "The tutor's full attention — no groups.",
    },
    flexibleSchedule: {
      title: "Flexible schedule",
      description: "Lessons at a convenient time, with room to change the schedule.",
    },
    clearProgress: {
      title: "Clear progress",
      description: "The student and parent always know what result they're working toward.",
    },
    online: {
      title: "Online",
      description: "Learn from any country — only the time zone matters.",
    },
    vettedTutors: {
      title: "Vetted tutors",
      description: "Every tutor goes through the center's screening before taking on students.",
    },
  },
  hy: {
    precision: {
      title: "Ճշգրիտ ընտրություն",
      description: "Դասատուն ընտրվում է ըստ առարկայի, նպատակի և աշակերտի։",
    },
    oneOnOne: {
      title: "Մեկ առ մեկ",
      description: "Դասատուի ամբողջական ուշադրությունը՝ առանց խմբերի։",
    },
    flexibleSchedule: {
      title: "Ճկուն ժամանակացույց",
      description: "Ուսուցում հարմար ժամանակ՝ գրաֆիկը փոխելու հնարավորությամբ։",
    },
    clearProgress: {
      title: "Հասկանալի առաջընթաց",
      description: "Աշակերտն ու ծնողը միշտ հասկանում են, թե ինչ արդյունքի են գնում։",
    },
    online: {
      title: "Առցանց",
      description: "Կարելի է սովորել ցանկացած երկրից՝ կարևոր է միայն ժամային գոտին։",
    },
    vettedTutors: {
      title: "Դասատուների ընտրություն",
      description: "Յուրաքանչյուր դասատու անցնում է կենտրոնի ընտրություն՝ նախքան աշակերտներ վերցնելը։",
    },
  },
};

export function localizeBenefits(locale: Locale): Benefit[] {
  if (locale === "ru") return benefits;
  return benefits.map((benefit) => ({ ...benefit, ...benefitTranslations[locale][benefit.id] }));
}
