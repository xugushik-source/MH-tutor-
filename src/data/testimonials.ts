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
  {
    name: "Ануш Петросян",
    subject: "Подготовка к школе",
    country: "Армения",
    text: "Боялись, что дочь не готова к школе — оказалось, ей просто нужен был не программа, а спокойный темп.",
    avatarInitial: "АП",
    size: "md",
  },
  {
    name: "David Lee",
    subject: "English",
    country: "South Korea",
    text: "First tutoring format that actually got me speaking instead of just doing more grammar drills.",
    avatarInitial: "DL",
    size: "lg",
  },
  {
    name: "Հասմիկ Ղազարյան",
    subject: "Русский язык",
    country: "Армения",
    text: "Сын готовился к переезду в русскоязычную школу — за лето догнал программу и не отстаёт от класса.",
    avatarInitial: "ՀՂ",
    size: "md",
  },
];
