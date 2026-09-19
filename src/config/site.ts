export const siteConfig = {
  name: "Marianna Hayrapetyan Tutoring Center",
  shortName: "MH Tutoring",
  initials: "MH",
  founder: "Marianna Hayrapetyan",
  tagline: "Tutoring Center",
  url: "https://mh-tutoring.example",
  description:
    "Персональные онлайн-занятия с репетиторами, которых отбирают в центр Marianna Hayrapetyan. Подбор преподавателя под цель, уровень и расписание ученика.",
  locale: "ru" as const,
  supportedLocales: ["ru", "hy", "ka", "en"] as const,
  contacts: {
    whatsapp: "+374000000000",
    whatsappLink: "https://wa.me/374000000000",
    email: "hello@mh-tutoring.example",
    instagram: "https://instagram.com/mh.tutoring",
    telegram: "https://t.me/mh_tutoring",
    facebook: "https://facebook.com/mh.tutoring",
  },
  // Placeholder metrics. Replace with verified figures before launch —
  // do not present these as real numbers.
  stats: {
    students: "XX+",
    tutors: "XX",
    subjects: "XX",
    rating: "X.X",
  },
} as const;

export type SiteConfig = typeof siteConfig;
