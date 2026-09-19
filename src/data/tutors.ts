import type { SubjectSlug } from "./subjects";

export interface TutorReview {
  author: string;
  country: string;
  rating: number;
  text: string;
}

export interface Tutor {
  slug: string;
  name: string;
  subject: SubjectSlug;
  subjectLabel: string;
  specializations: string[];
  experienceYears: number;
  languages: string[];
  rating: number;
  reviewsCount: number;
  priceFrom: number;
  currency: string;
  shortBio: string;
  about: string[];
  methodology: string;
  suitableFor: string[];
  education: string[];
  certificates: string[];
  reviews: TutorReview[];
  avatarInitial: string;
  avatarTone: "burgundy" | "espresso" | "champagne";
}

export const tutors: Tutor[] = [
  {
    slug: "anna-petrosyan",
    name: "Анна Петросян",
    subject: "english",
    subjectLabel: "Английский язык",
    specializations: ["Разговорный английский", "IELTS", "Подготовка к собеседованиям"],
    experienceYears: 8,
    languages: ["Русский", "Английский", "Армянский"],
    rating: 4.9,
    reviewsCount: 132,
    priceFrom: 25,
    currency: "USD",
    shortBio: "Помогаю заговорить на английском без страха ошибиться — уверенно и по делу.",
    about: [
      "Работаю с учениками, которым важен результат, а не просто «прохождение учебника».",
      "За 8 лет практики вела и детей, и взрослых — от нуля до уровня C1.",
    ],
    methodology:
      "Коммуникативный подход: минимум теории, максимум живой практики. Каждое занятие — конкретная цель.",
    suitableFor: ["Взрослые, которым нужен разговорный английский", "Подготовка к IELTS", "Собеседования на английском"],
    education: ["Ереванский государственный лингвистический университет им. В. Брюсова"],
    certificates: ["CELTA", "IELTS Trainer Certificate"],
    reviews: [
      {
        author: "Марина",
        country: "Армения",
        rating: 5,
        text: "За три месяца сдвинулась с мёртвой точки — теперь не боюсь говорить на встречах.",
      },
      {
        author: "David",
        country: "USA",
        rating: 5,
        text: "Very structured lessons, always clear homework and feedback.",
      },
    ],
    avatarInitial: "АП",
    avatarTone: "burgundy",
  },
  {
    slug: "levon-sargsyan",
    name: "Левон Саргсян",
    subject: "math",
    subjectLabel: "Математика",
    specializations: ["Школьная программа", "Олимпиадная математика", "Подготовка к ЕГЭ"],
    experienceYears: 11,
    languages: ["Русский", "Армянский"],
    rating: 4.8,
    reviewsCount: 98,
    priceFrom: 20,
    currency: "USD",
    shortBio: "Объясняю математику так, чтобы она перестала быть страшной.",
    about: [
      "11 лет преподаю математику школьникам — от отстающих до олимпиадников.",
      "Строю занятия вокруг пробелов конкретного ученика, а не общего плана.",
    ],
    methodology: "Диагностика пробелов → персональный план → разбор задач в формате экзамена.",
    suitableFor: ["Подтянуть оценки", "Подготовка к ЕГЭ/ОГЭ", "Олимпиадная подготовка"],
    education: ["Ереванский государственный университет, механико-математический факультет"],
    certificates: ["Сертификат преподавателя годового курса подготовки к ЕГЭ"],
    reviews: [
      {
        author: "Сона",
        country: "Армения",
        rating: 5,
        text: "Сын подтянул алгебру за один семестр, оценки выросли с троек до пятёрок.",
      },
    ],
    avatarInitial: "ЛС",
    avatarTone: "espresso",
  },
  {
    slug: "elena-vardanyan",
    name: "Елена Варданян",
    subject: "russian",
    subjectLabel: "Русский язык",
    specializations: ["Грамотность", "Литература", "Подготовка к ОГЭ/ЕГЭ"],
    experienceYears: 9,
    languages: ["Русский", "Армянский"],
    rating: 5.0,
    reviewsCount: 76,
    priceFrom: 18,
    currency: "USD",
    shortBio: "Учу не зубрить правила, а понимать язык.",
    about: [
      "Филолог по образованию, 9 лет работаю с детьми и подростками.",
      "Особое внимание — сочинениям и подготовке к экзаменам.",
    ],
    methodology: "Разбор правил через живые примеры и постоянную практику письма.",
    suitableFor: ["Повышение грамотности", "Подготовка к экзаменам", "Подготовка к сочинениям"],
    education: ["Российско-Армянский университет, филологический факультет"],
    certificates: ["Сертификат эксперта ОГЭ по русскому языку"],
    reviews: [
      {
        author: "Карина",
        country: "Грузия",
        rating: 5,
        text: "Дочь наконец перестала бояться диктантов.",
      },
    ],
    avatarInitial: "ЕВ",
    avatarTone: "champagne",
  },
  {
    slug: "gohar-manukyan",
    name: "Гоар Манукян",
    subject: "exam-prep",
    subjectLabel: "Подготовка к экзаменам",
    specializations: ["SAT", "IELTS", "TOEFL"],
    experienceYears: 7,
    languages: ["Русский", "Английский", "Армянский"],
    rating: 4.9,
    reviewsCount: 61,
    priceFrom: 30,
    currency: "USD",
    shortBio: "Веду к конкретному баллу — с чёткой стратегией и трекингом прогресса.",
    about: [
      "Специализируюсь на международных экзаменах — SAT, IELTS, TOEFL.",
      "Работаю с измеримыми целями: знаем, к какому баллу идём с первого занятия.",
    ],
    methodology: "Пробный тест → разбор слабых мест → тренировка по секциям → полные пробники.",
    suitableFor: ["Поступление за рубеж", "Международные экзамены", "Ограниченный срок подготовки"],
    education: ["American University of Armenia"],
    certificates: ["IELTS Trainer Certificate", "SAT Prep Specialist"],
    reviews: [
      {
        author: "Тигран",
        country: "Армения",
        rating: 5,
        text: "Поднял балл IELTS с 6.0 до 7.5 за два месяца интенсивной подготовки.",
      },
    ],
    avatarInitial: "ГМ",
    avatarTone: "burgundy",
  },
  {
    slug: "nino-beridze",
    name: "Нино Беридзе",
    subject: "georgian",
    subjectLabel: "Грузинский язык",
    specializations: ["Разговорный грузинский", "Академический грузинский"],
    experienceYears: 6,
    languages: ["Грузинский", "Русский", "Английский"],
    rating: 4.8,
    reviewsCount: 34,
    priceFrom: 16,
    currency: "USD",
    shortBio: "Помогаю освоить грузинский быстро и без стресса — с нуля или для школы.",
    about: [
      "Преподаю грузинский как иностранный и как язык школьной программы.",
      "Подхожу индивидуально к темпу и целям каждого ученика.",
    ],
    methodology: "Разговорная практика с первого занятия + системная грамматика.",
    suitableFor: ["Начать с нуля", "Школьная программа", "Переезд в Грузию"],
    education: ["Тбилисский государственный университет им. Ив. Джавахишвили"],
    certificates: ["Сертификат преподавателя грузинского как иностранного"],
    reviews: [
      {
        author: "Анна",
        country: "Россия",
        rating: 5,
        text: "За полгода дошли до уровня уверенного бытового общения.",
      },
    ],
    avatarInitial: "НБ",
    avatarTone: "espresso",
  },
  {
    slug: "mariam-tovmasyan",
    name: "Мариам Товмасян",
    subject: "school-prep",
    subjectLabel: "Подготовка к школе",
    specializations: ["Чтение и письмо", "Счёт", "Развитие речи"],
    experienceYears: 10,
    languages: ["Русский", "Армянский"],
    rating: 5.0,
    reviewsCount: 54,
    priceFrom: 17,
    currency: "USD",
    shortBio: "Готовлю к школе бережно — через игру, а не давление.",
    about: [
      "10 лет работаю с дошкольниками — учу учиться с интересом, а не по принуждению.",
      "Ставим акцент на самостоятельность и уверенность ребёнка.",
    ],
    methodology: "Игровые форматы, короткие фокусные блоки, постоянная обратная связь для родителей.",
    suitableFor: ["Дети 5–7 лет", "Подготовка к первому классу", "Развитие речи и внимания"],
    education: ["Армянский государственный педагогический университет им. Х. Абовяна"],
    certificates: ["Сертификат по дошкольной педагогике"],
    reviews: [
      {
        author: "Лилит",
        country: "Армения",
        rating: 5,
        text: "Сын с нетерпением ждёт каждое занятие — раньше боялся всего, что связано с учёбой.",
      },
    ],
    avatarInitial: "МТ",
    avatarTone: "champagne",
  },
];

export function getTutorBySlug(slug: string) {
  return tutors.find((t) => t.slug === slug);
}

export function getTutorsBySubject(subject: SubjectSlug) {
  return tutors.filter((t) => t.subject === subject);
}
