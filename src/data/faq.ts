import type { Locale } from "@/i18n/config";

export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Как проходят занятия?",
    answer:
      "Занятия проходят онлайн один на один с преподавателем в удобное для вас время. Формат — видеосвязь, интерактивные материалы и домашние задания между уроками.",
  },
  {
    question: "Как выбрать преподавателя?",
    answer:
      "Пройдите короткий подбор: расскажите о предмете, цели и удобном времени — мы предложим подходящих преподавателей с учётом опыта и специализации.",
  },
  {
    question: "Можно ли поменять преподавателя?",
    answer:
      "Да. Если формат не подошёл, мы поможем подобрать другого преподавателя без лишних вопросов.",
  },
  {
    question: "Сколько длится урок?",
    answer: "Стандартная длительность занятия — 60 минут. По договорённости с преподавателем возможны другие форматы.",
  },
  {
    question: "Можно ли заниматься из другой страны?",
    answer: "Да, все занятия проходят онлайн, поэтому расположение ученика не имеет значения — важен только часовой пояс.",
  },
  {
    question: "Как проходит пробный урок?",
    answer:
      "Пробное занятие — это полноценный урок, на котором преподаватель оценивает уровень, обсуждает цель и предлагает план дальнейшего обучения.",
  },
  {
    question: "Как оплачиваются занятия?",
    answer: "Оплата производится пакетами занятий удобным способом — детали обсуждаются индивидуально после пробного урока.",
  },
  {
    question: "Можно ли выбрать расписание?",
    answer: "Да, расписание согласовывается с преподавателем и может меняться по мере необходимости.",
  },
];

const translations: Record<Exclude<Locale, "ru">, FaqItem[]> = {
  en: [
    {
      question: "How do lessons work?",
      answer:
        "Lessons happen online, one-on-one with a tutor, at a time that suits you. The format is video calls, interactive materials and homework between lessons.",
    },
    {
      question: "How do I choose a tutor?",
      answer:
        "Go through a short matching flow: tell us the subject, goal and convenient time — we'll suggest tutors that fit based on experience and specialization.",
    },
    {
      question: "Can I switch tutors?",
      answer: "Yes. If the format doesn't feel right, we'll help you find another tutor — no questions asked.",
    },
    {
      question: "How long is a lesson?",
      answer: "A standard lesson is 60 minutes. Other formats are possible by arrangement with the tutor.",
    },
    {
      question: "Can I take lessons from another country?",
      answer: "Yes — all lessons are online, so the student's location doesn't matter, only the time zone.",
    },
    {
      question: "What happens during the trial lesson?",
      answer:
        "The trial lesson is a full lesson where the tutor assesses your level, discusses your goal and suggests a learning plan.",
    },
    {
      question: "How do payments work?",
      answer: "Lessons are paid in packages via a convenient method — details are worked out individually after the trial lesson.",
    },
    {
      question: "Can I choose the schedule?",
      answer: "Yes, the schedule is agreed with the tutor and can change as needed.",
    },
  ],
  hy: [
    {
      question: "Ինչպե՞ս են անցկացվում դասերը",
      answer:
        "Դասերն անցկացվում են առցանց՝ դասատուի հետ մեկ առ մեկ, ձեզ հարմար ժամանակ։ Ձևաչափը՝ վիդեոկապ, ինտերակտիվ նյութեր և տնային առաջադրանքներ դասերի միջև։",
    },
    {
      question: "Ինչպե՞ս ընտրել դասատու",
      answer:
        "Անցեք կարճ հարցում՝ պատմեք առարկայի, նպատակի և հարմար ժամանակի մասին. մենք կառաջարկենք դասատուներ՝ ըստ փորձի և մասնագիտացման։",
    },
    {
      question: "Հնարավո՞ր է փոխել դասատուին",
      answer: "Այո։ Եթե ձևաչափը չի համապատասխանում, մենք կօգնենք գտնել այլ դասատու՝ առանց ավելորդ հարցերի։",
    },
    {
      question: "Որքա՞ն է տևում դասը",
      answer: "Ստանդարտ դասի տևողությունը 60 րոպե է։ Դասատուի հետ համաձայնությամբ հնարավոր են այլ ձևաչափեր։",
    },
    {
      question: "Հնարավո՞ր է սովորել այլ երկրից",
      answer: "Այո, բոլոր դասերն անցկացվում են առցանց, ուստի աշակերտի գտնվելու վայրը կարևոր չէ՝ միայն ժամային գոտին։",
    },
    {
      question: "Ինչպե՞ս է անցնում փորձնական դասը",
      answer:
        "Փորձնական դասը լիարժեք դաս է, որի ընթացքում դասատուն գնահատում է մակարդակը, քննարկում նպատակը և առաջարկում ուսուցման պլան։",
    },
    {
      question: "Ինչպե՞ս է կատարվում վճարումը",
      answer: "Վճարումը կատարվում է դասերի փաթեթներով՝ հարմար եղանակով. մանրամասները քննարկվում են անհատապես՝ փորձնական դասից հետո։",
    },
    {
      question: "Հնարավո՞ր է ընտրել ժամանակացույցը",
      answer: "Այո, ժամանակացույցը համաձայնեցվում է դասատուի հետ և կարող է փոփոխվել անհրաժեշտության դեպքում։",
    },
  ],
};

export function localizeFaq(locale: Locale): FaqItem[] {
  return locale === "ru" ? faqItems : translations[locale];
}
