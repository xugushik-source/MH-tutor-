export const siteConfig = {
  name: "Marianna Hayrapetyan Tutoring Center",
  shortName: "MH Tutoring",
  initials: "MH",
  founder: "Marianna Hayrapetyan",
  tagline: "Tutoring Center",
  url: "https://mh-tutoring.example",
  description:
    "Personal online lessons with tutors hand-picked for the Marianna Hayrapetyan center. We match a tutor to your goal, level and schedule.",
  locale: "en" as const,
  supportedLocales: ["en", "hy", "ru"] as const,
  contacts: {
    whatsapp: "+374000000000",
    whatsappLink: "https://wa.me/374000000000",
    email: "hello@mh-tutoring.example",
    instagram: "https://instagram.com/mh.tutoring",
    telegram: "https://t.me/mh_tutoring",
    facebook: "https://facebook.com/mh.tutoring",
  },
  // Demo metrics for this showcase build — not real figures. Chosen to stay
  // consistent with the rest of the demo data: 60 = sum of subjects.ts's
  // per-subject tutorsCount, 4.9 ≈ the average of the six tutor ratings in
  // data/tutors.ts, 8 = the number of subject tiles actually shown on the
  // site. Replace with verified numbers before treating this as a real launch.
  stats: {
    students: "850+",
    tutors: "60+",
    subjects: "8",
    rating: "4.9",
  },
} as const;

export type SiteConfig = typeof siteConfig;
