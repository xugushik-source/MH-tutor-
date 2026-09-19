export interface Testimonial {
  name: string;
  subject: string;
  country: string;
  text: string;
  avatarInitial: string;
  size: "lg" | "md";
}

export const testimonials: Testimonial[] = [
  {
    name: "Марина Григорян",
    subject: "Английский язык",
    country: "Армения",
    text: "Дочь занимается уже полгода — впервые вижу, что ей действительно интересно учить язык, а не «потому что надо».",
    avatarInitial: "МГ",
    size: "lg",
  },
  {
    name: "Karen A.",
    subject: "Exam Preparation",
    country: "USA",
    text: "Structured plan, honest feedback, real progress. Exactly what I needed before the exam.",
    avatarInitial: "KA",
    size: "md",
  },
  {
    name: "Тамара Иоселиани",
    subject: "Грузинский язык",
    country: "Грузия",
    text: "Понравился подход — никакой воды, только то, что действительно нужно для разговорного уровня.",
    avatarInitial: "ТИ",
    size: "md",
  },
  {
    name: "Сона Хачатрян",
    subject: "Математика",
    country: "Армения",
    text: "Ребёнок перестал бояться контрольных. Преподаватель нашёл подход, который подошёл именно ему.",
    avatarInitial: "СХ",
    size: "lg",
  },
  {
    name: "Georgi P.",
    subject: "Russian",
    country: "Russia",
    text: "Excellent structure for exam prep, always on time, always prepared.",
    avatarInitial: "GP",
    size: "md",
  },
];
