import type { SubjectSlug } from "./subjects";
import type { Locale } from "@/i18n/config";

export interface TutorReview {
  author: string;
  country: string;
  rating: number;
  text: string;
}

// priceFrom/currency are superseded by MH's approved AMD package pricing in
// data/pricing.ts (group/mini-group/individual/exam-intensive) and are no
// longer rendered anywhere — TutorBookingCta shows the shared individual
// package price instead of a per-tutor figure. Left in place rather than
// stripped from every tutor record, since removing the field is a bigger,
// unrequested data-model change; treat these numbers as unused.
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
  avatarTone: "forest" | "ink" | "gold";
  /** Optional real photo (falls back to the initials placeholder when absent). */
  photo?: string;
}

export const tutors: Tutor[] = [
  {
    slug: "marianna-hayrapetyan",
    name: "Марианна Айрапетян",
    subject: "english",
    subjectLabel: "Английский язык",
    specializations: ["Разговорный английский", "IELTS", "Подготовка к собеседованиям"],
    experienceYears: 8,
    languages: ["Русский", "Английский", "Армянский"],
    rating: 4.9,
    reviewsCount: 132,
    priceFrom: 18,
    currency: "USD",
    shortBio: "Основательница центра. Помогаю заговорить на английском без страха ошибиться — уверенно и по делу.",
    about: [
      "Я основала этот центр, потому что сама 8 лет преподаю английский и знаю, чего не хватает большинству программ — персонального подхода.",
      "Работаю с учениками, которым важен результат, а не просто «прохождение учебника»: вела и детей, и взрослых — от нуля до уровня C1.",
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
      {
        author: "Ани",
        country: "Армения",
        rating: 5,
        text: "Готовилась к переходу на английский на работе — за два месяца перестала переводить фразы в голове перед тем, как сказать.",
      },
    ],
    avatarInitial: "МА",
    avatarTone: "forest",
    photo: "/portraits/marianna.jpg",
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
    priceFrom: 15,
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
      {
        author: "Michael R.",
        country: "USA",
        rating: 5,
        text: "Clear explanations, patient with mistakes, always shows the logic behind a method instead of just the steps.",
      },
      {
        author: "Мгер",
        country: "Армения",
        rating: 4,
        text: "Готовились к олимпиаде — не прошли в финал, но впервые понял, за что реально люблю математику.",
      },
    ],
    avatarInitial: "ЛС",
    avatarTone: "ink",
    photo: "/portraits/levon.jpg",
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
    priceFrom: 14,
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
      {
        author: "Армен",
        country: "Армения",
        rating: 5,
        text: "Готовили сочинение к ОГЭ — Елена разбирала каждую формулировку, а не просто ставила галочки в чек-листе.",
      },
    ],
    avatarInitial: "ЕВ",
    avatarTone: "gold",
    photo: "/portraits/elena.jpg",
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
    priceFrom: 20,
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
      {
        author: "Lucy Chen",
        country: "Canada",
        rating: 5,
        text: "Structured SAT plan with weekly mock tests — knew exactly what score range to expect before the real exam.",
      },
    ],
    avatarInitial: "ГМ",
    avatarTone: "forest",
    photo: "/portraits/gohar.jpg",
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
    priceFrom: 13,
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
      {
        author: "Дмитрий",
        country: "Армения",
        rating: 4,
        text: "Переехал в Грузию по работе — за три месяца стало комфортно решать бытовые вопросы без переводчика.",
      },
    ],
    avatarInitial: "НБ",
    avatarTone: "ink",
    photo: "/portraits/nino.jpg",
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
    priceFrom: 14,
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
      {
        author: "Наира",
        country: "Армения",
        rating: 5,
        text: "Дочь пошла в первый класс уже умея читать и совсем не боясь новых людей — для нас это было главным.",
      },
    ],
    avatarInitial: "МТ",
    avatarTone: "gold",
    photo: "/portraits/mariam.jpg",
  },
];

export function getTutorBySlug(slug: string) {
  return tutors.find((t) => t.slug === slug);
}

export function getTutorsBySubject(subject: SubjectSlug) {
  return tutors.filter((t) => t.subject === subject);
}

interface TutorTranslation {
  name: string;
  subjectLabel: string;
  specializations: string[];
  languages: string[];
  shortBio: string;
  about: string[];
  methodology: string;
  suitableFor: string[];
  education: string[];
  avatarInitial: string;
}

// Reviews are left untranslated on purpose — like the homepage testimonials,
// they read as quotes from real people in whatever language they actually
// wrote them in, rather than being run through translation.
const tutorTranslations: Record<Exclude<Locale, "ru">, Record<string, TutorTranslation>> = {
  en: {
    "marianna-hayrapetyan": {
      name: "Marianna Hayrapetyan",
      subjectLabel: "English",
      specializations: ["Conversational English", "IELTS", "Interview Preparation"],
      languages: ["Russian", "English", "Armenian"],
      shortBio: "Founder of the center. I help people speak English confidently, without the fear of making a mistake.",
      about: [
        "I founded this center because I've taught English myself for 8 years and know exactly what most programs are missing — a personal approach.",
        "I work with students who care about results, not just “getting through the textbook”: children and adults alike, from zero to C1.",
      ],
      methodology: "A communicative approach: minimal theory, maximum live practice. Every lesson has a specific goal.",
      suitableFor: ["Adults who need conversational English", "IELTS preparation", "English-language interviews"],
      education: ["Yerevan State Linguistic University named after V. Brusov"],
      avatarInitial: "MH",
    },
    "levon-sargsyan": {
      name: "Levon Sargsyan",
      subjectLabel: "Mathematics",
      specializations: ["School curriculum", "Olympiad mathematics", "Exam preparation"],
      languages: ["Russian", "Armenian"],
      shortBio: "I explain math so it stops being scary.",
      about: [
        "I've taught math to school students for 11 years — from those struggling to olympiad winners.",
        "I build lessons around a specific student's gaps, not a generic plan.",
      ],
      methodology: "Diagnose gaps → build a personal plan → work through exam-style problems.",
      suitableFor: ["Improve grades", "National exam preparation", "Olympiad preparation"],
      education: ["Yerevan State University, Faculty of Mechanics and Mathematics"],
      avatarInitial: "LS",
    },
    "elena-vardanyan": {
      name: "Elena Vardanyan",
      subjectLabel: "Russian",
      specializations: ["Literacy", "Literature", "Exam preparation"],
      languages: ["Russian", "Armenian"],
      shortBio: "I teach students to understand the language, not memorize rules.",
      about: [
        "A philologist by training, I've worked with children and teenagers for 9 years.",
        "Special focus on essay writing and exam preparation.",
      ],
      methodology: "Working through rules with real examples and constant writing practice.",
      suitableFor: ["Improving literacy", "Exam preparation", "Essay writing"],
      education: ["Russian-Armenian University, Faculty of Philology"],
      avatarInitial: "EV",
    },
    "gohar-manukyan": {
      name: "Gohar Manukyan",
      subjectLabel: "Exam Preparation",
      specializations: ["SAT", "IELTS", "TOEFL"],
      languages: ["Russian", "English", "Armenian"],
      shortBio: "I get you to a specific score — with a clear strategy and progress tracking.",
      about: [
        "I specialize in international exams — SAT, IELTS, TOEFL.",
        "I work with measurable goals: we know the target score from lesson one.",
      ],
      methodology: "Diagnostic test → target the weak spots → section drills → full-length mock exams.",
      suitableFor: ["Studying abroad", "International exams", "Tight preparation timelines"],
      education: ["American University of Armenia"],
      avatarInitial: "GM",
    },
    "nino-beridze": {
      name: "Nino Beridze",
      subjectLabel: "Georgian",
      specializations: ["Conversational Georgian", "Academic Georgian"],
      languages: ["Georgian", "Russian", "English"],
      shortBio: "I help you learn Georgian quickly and without stress — from scratch or for school.",
      about: [
        "I teach Georgian both as a foreign language and as a school-curriculum subject.",
        "I adapt the pace and goals individually to each student.",
      ],
      methodology: "Conversational practice from lesson one, plus systematic grammar.",
      suitableFor: ["Starting from scratch", "School curriculum", "Relocating to Georgia"],
      education: ["Ivane Javakhishvili Tbilisi State University"],
      avatarInitial: "NB",
    },
    "mariam-tovmasyan": {
      name: "Mariam Tovmasyan",
      subjectLabel: "School Preparation",
      specializations: ["Reading and writing", "Counting", "Speech development"],
      languages: ["Russian", "Armenian"],
      shortBio: "I prepare kids for school gently — through play, not pressure.",
      about: [
        "I've worked with preschoolers for 10 years — teaching them to enjoy learning, not be forced into it.",
        "The focus is on the child's independence and confidence.",
      ],
      methodology: "Game-based formats, short focused blocks, constant feedback for parents.",
      suitableFor: ["Children aged 5–7", "First-grade preparation", "Speech and attention development"],
      education: ["Khachatur Abovyan Armenian State Pedagogical University"],
      avatarInitial: "MT",
    },
  },
  hy: {
    "marianna-hayrapetyan": {
      name: "Մարիաննա Հայրապետյան",
      subjectLabel: "Անգլերեն",
      specializations: ["Խոսակցական անգլերեն", "IELTS", "Հարցազրույցի նախապատրաստում"],
      languages: ["Ռուսերեն", "Անգլերեն", "Հայերեն"],
      shortBio: "Կենտրոնի հիմնադիրը։ Օգնում եմ վստահ խոսել անգլերեն՝ առանց սխալվելու վախի։",
      about: [
        "Ես հիմնադրեցի այս կենտրոնը, քանի որ ինքս 8 տարի դասավանդում եմ անգլերեն և գիտեմ, թե ինչ է պակասում շատ ծրագրերում՝ անհատական մոտեցում։",
        "Աշխատում եմ աշակերտների հետ, ովքեր կարևորում են արդյունքը, ոչ թե պարզապես դասագրքի ավարտը՝ դասավանդել եմ և՛ երեխաների, և՛ մեծահասակների՝ զրոյից մինչև C1 մակարդակ։",
      ],
      methodology: "Հաղորդակցական մոտեցում՝ նվազագույն տեսություն, առավելագույն կենդանի պրակտիկա։ Յուրաքանչյուր դաս ունի կոնկրետ նպատակ։",
      suitableFor: ["Մեծահասակներ, ովքեր ուզում են խոսակցական անգլերեն", "IELTS-ի նախապատրաստում", "Հարցազրույցներ անգլերենով"],
      education: ["Երևանի Վ. Բրյուսովի անվան պետական լեզվահասարակագիտական համալսարան"],
      avatarInitial: "ՄՀ",
    },
    "levon-sargsyan": {
      name: "Լևոն Սարգսյան",
      subjectLabel: "Մաթեմատիկա",
      specializations: ["Դպրոցական ծրագիր", "Օլիմպիադային մաթեմատիկա", "Քննության նախապատրաստում"],
      languages: ["Ռուսերեն", "Հայերեն"],
      shortBio: "Բացատրում եմ մաթեմատիկան այնպես, որ այն դադարի վախեցնող լինելուց։",
      about: [
        "11 տարի դասավանդում եմ մաթեմատիկա դպրոցականների՝ հետամնացներից մինչև օլիմպիադակիրներ։",
        "Դասերը կառուցում եմ կոնկրետ աշակերտի բացերի շուրջ, ոչ թե ընդհանուր պլանի։",
      ],
      methodology: "Բացերի ախտորոշում → անհատական պլան → խնդիրների վերլուծություն քննության ձևաչափով։",
      suitableFor: ["Բարձրացնել գնահատականները", "Քննության նախապատրաստում", "Օլիմպիադային նախապատրաստում"],
      education: ["Երևանի պետական համալսարան, մեխանիկա-մաթեմատիկական ֆակուլտետ"],
      avatarInitial: "ԼՍ",
    },
    "elena-vardanyan": {
      name: "Ելենա Վարդանյան",
      subjectLabel: "Ռուսերեն",
      specializations: ["Գրագիտություն", "Գրականություն", "Քննության նախապատրաստում"],
      languages: ["Ռուսերեն", "Հայերեն"],
      shortBio: "Սովորեցնում եմ հասկանալ լեզուն, ոչ թե անգիր անել կանոնները։",
      about: [
        "Բանասեր եմ կրթությամբ, 9 տարի աշխատում եմ երեխաների ու դեռահասների հետ։",
        "Հատուկ ուշադրություն՝ շարադրություններին և քննության նախապատրաստմանը։",
      ],
      methodology: "Կանոնների վերլուծություն իրական օրինակներով և գրելու մշտական պրակտիկա։",
      suitableFor: ["Գրագիտության բարձրացում", "Քննության նախապատրաստում", "Շարադրության նախապատրաստում"],
      education: ["Ռուս-հայկական համալսարան, բանասիրական ֆակուլտետ"],
      avatarInitial: "ԵՎ",
    },
    "gohar-manukyan": {
      name: "Գոհար Մանուկյան",
      subjectLabel: "Քննությունների նախապատրաստում",
      specializations: ["SAT", "IELTS", "TOEFL"],
      languages: ["Ռուսերեն", "Անգլերեն", "Հայերեն"],
      shortBio: "Տանում եմ դեպի կոնկրետ միավոր՝ հստակ ռազմավարությամբ և առաջընթացի հետևմամբ։",
      about: [
        "Մասնագիտացած եմ միջազգային քննություններում՝ SAT, IELTS, TOEFL։",
        "Աշխատում եմ չափելի նպատակներով՝ առաջին իսկ դասից գիտենք, թե ինչ միավորի ենք ձգտում։",
      ],
      methodology: "Փորձնական թեստ → թույլ կողմերի վերլուծություն → բաժինների մարզում → ամբողջական փորձնական թեստեր։",
      suitableFor: ["Ընդունելություն արտերկրում", "Միջազգային քննություններ", "Սահմանափակ ժամկետով նախապատրաստում"],
      education: ["Հայաստանի ամերիկյան համալսարան"],
      avatarInitial: "ԳՄ",
    },
    "nino-beridze": {
      name: "Նինո Բերիձե",
      subjectLabel: "Վրացերեն",
      specializations: ["Խոսակցական վրացերեն", "Ակադեմիական վրացերեն"],
      languages: ["Վրացերեն", "Ռուսերեն", "Անգլերեն"],
      shortBio: "Օգնում եմ արագ և առանց սթրեսի սովորել վրացերեն՝ զրոյից կամ դպրոցի համար։",
      about: [
        "Դասավանդում եմ վրացերենը և՛ որպես օտար լեզու, և՛ որպես դպրոցական առարկա։",
        "Անհատապես մոտենում եմ յուրաքանչյուր աշակերտի տեմպին և նպատակներին։",
      ],
      methodology: "Խոսակցական պրակտիկա առաջին իսկ դասից՝ գումարած համակարգված քերականություն։",
      suitableFor: ["Սկսել զրոյից", "Դպրոցական ծրագիր", "Տեղափոխություն Վրաստան"],
      education: ["Իվ. Ջավախիշվիլու անվան Թբիլիսիի պետական համալսարան"],
      avatarInitial: "ՆԲ",
    },
    "mariam-tovmasyan": {
      name: "Մարիամ Թովմասյան",
      subjectLabel: "Նախապատրաստում դպրոցին",
      specializations: ["Ընթերցանություն և գրություն", "Հաշվարկ", "Խոսքի զարգացում"],
      languages: ["Ռուսերեն", "Հայերեն"],
      shortBio: "Զգուշորեն նախապատրաստում եմ դպրոցին՝ խաղի միջոցով, ոչ թե ճնշման։",
      about: [
        "10 տարի աշխատում եմ նախադպրոցականների հետ՝ սովորեցնելով սովորել հետաքրքրությամբ, ոչ թե հարկադրանքով։",
        "Շեշտը դնում ենք երեխայի ինքնուրույնության և վստահության վրա։",
      ],
      methodology: "Խաղային ձևաչափեր, կարճ կենտրոնացված բլոկներ, մշտական հետադարձ կապ ծնողների հետ։",
      suitableFor: ["5–7 տարեկան երեխաներ", "Առաջին դասարանի նախապատրաստում", "Խոսքի և ուշադրության զարգացում"],
      education: ["Խ. Աբովյանի անվան հայկական պետական մանկավարժական համալսարան"],
      avatarInitial: "ՄԹ",
    },
  },
};

export function localizeTutor(tutor: Tutor, locale: Locale): Tutor {
  if (locale === "ru") return tutor;
  const t = tutorTranslations[locale][tutor.slug];
  if (!t) return tutor;
  return { ...tutor, ...t };
}

export function localizeTutors(locale: Locale): Tutor[] {
  return tutors.map((t) => localizeTutor(t, locale));
}
