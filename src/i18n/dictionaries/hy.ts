import type { Dictionary } from "./ru";

// Machine-drafted Armenian by an LLM, not a native speaker — reasonable
// confidence on vocabulary and structure, but this should get a native
// review pass before being treated as final, especially around question
// particles (՞) and the booking-progress fragment noted below.
const hy: Dictionary = {
  meta: {
    title: "Marianna Hayrapetyan կրթական կենտրոն — առցանց դասատուներ",
    description:
      "Ընտրում ենք դասատու՝ ըստ ձեր նպատակի, մակարդակի և բնավորության։ Անհատական առցանց դասեր անգլերենից, մաթեմատիկայից, ռուսերենից, հայերենից և վրացերենից։",
  },
  splash: {
    eyebrow: "Tutoring Center",
  },
  nav: {
    tutors: "Դասատուներ",
    subjects: "Առարկաներ",
    howItWorks: "Ինչպես է աշխատում",
    testimonials: "Կարծիքներ",
    faq: "FAQ",
    cta: "Փորձնական դաս",
  },
  hero: {
    eyebrow: "Առցանց ուսուցման կենտրոն",
    headlineLine1: "Եկեք գտնենք դասատու,",
    headlineLine2: "ում հետ իրականում կստացվի։",
    subheadline: "Անհատական առցանց դասեր՝ իրական արդյունքի համար։",
    description:
      "Դասատուին ընտրում ենք ըստ նպատակի, մակարդակի, բնավորության և հարմար ժամանակացույցի։",
    ctaPrimary: "Ընտրել դասատու",
    ctaSecondary: "Փորձնական դաս",
  },
  wizard: {
    eyebrow: "Դասատուի ընտրություն",
    title: "Ո՞ւմ եք փնտրում",
    stepLabel: "Քայլ",
    step1Title: "Առարկա",
    step2Title: "Ում համար",
    step3Title: "Նպատակ",
    step4Title: "Հարմար ժամանակ",
    back: "Հետ",
    next: "Հաջորդը",
    submit: "Ցույց տալ դասատուներին",
  },
  tutors: {
    eyebrow: "Դասատուներ",
    title: "Դասատուներ, որոնց ընտրում են ոչ պատահական",
    detailsCta: "Ավելին",
    trialCta: "Փորձնական դաս",
    experienceLabel: "տարվա փորձ",
    reviewsLabel: "կարծիք",
    viewAll: "Բոլոր դասատուները",
  },
  tutorProfile: {
    aboutTitle: "Դասատուի մասին",
    methodologyTitle: "Մեթոդիկա",
    suitableForTitle: "Ում է հարմար",
    educationTitle: "Կրթություն",
    certificatesTitle: "Վկայագրեր",
    videoTitle: "Տեսանյութ ծանոթություն",
    videoComingSoon: "Տեսանյութը շուտով կհայտնվի",
    reviewsTitle: "Կարծիքներ",
    scheduleTitle: "Ժամանակացույց",
    scheduleText:
      "Ճշգրիտ ժամանակացույցը համաձայնեցվում է անհատապես դասատուի հետ՝ փորձնական դասի հայտից հետո։",
    perLesson: "դաս",
    durationOnline: "60 րոպե, առցանց",
  },
  subjects: {
    eyebrow: "Առարկաներ",
    title: "Սովորեք այն, ինչ իսկապես անհրաժեշտ է",
    tutorsAvailable: "դասատու",
  },
  howItWorks: {
    eyebrow: "Ինչպես է աշխատում",
    title: "Նպատակից մինչև արդյունք",
  },
  why: {
    eyebrow: "Ինչու՞ Marianna Hayrapetyan",
    title: "Ոչ միայն դասեր։ Անհատական ուսուցման ուղի։",
  },
  classExperience: {
    eyebrow: "Դասի ձևաչափ",
    title: "Այսպես է թվում ձեր դասը",
    teacher: "Դասատու",
    student: "Աշակերտ",
    materials: "Դասի նյութեր",
    notes: "Նշումներ",
    homework: "Տնային աշխատանք",
    progress: "Առաջընթաց",
    materialsExample: "Present Perfect — նյութ, դաս 12",
    notesExample: "«Լավ յուրացրեց Present Perfect / Past Simple տարբերությունը, ամրապնդենք պրակտիկայով»",
    homeworkItem1: "Վարժություններ 4–6, էջ 32",
    homeworkItem2: "10 նոր բառ թեմայի շուրջ",
    progressExample: "«Present Perfect» թեմա — 68%",
  },
  results: {
    eyebrow: "Արդյունքներ",
    title: "Առաջընթաց, որը երևում է",
    students: "աշակերտ",
    tutorsStat: "դասատու",
    subjectsStat: "առարկա",
    rating: "վարկանիշ",
    placeholderNote: "Այս թվերը սոսկ օրինակ են և կփոխարինվեն իրական տվյալներով մեկնարկից առաջ։",
  },
  testimonials: {
    eyebrow: "Կարծիքներ",
    title: "Ինչ են ասում աշակերտներն ու ծնողները",
  },
  trial: {
    title: "Սկսեք մեկ դասից։",
    description:
      "Ծանոթացեք դասատուի հետ, պատմեք ձեր նպատակի մասին և տեսեք՝ արդյոք ձևաչափը ձեզ հարմար է։",
    cta: "Գրանցվել փորձնական դասի",
  },
  faq: {
    eyebrow: "Հարց ու պատասխան",
    title: "Հաճախակի տրվող հարցեր",
  },
  final: {
    headlineLine1: "Ձեր դասատուն",
    headlineLine2: "կարող է ավելի մոտ լինել,",
    headlineLine3: "քան կարծում եք։",
    cta: "Գտնել դասատու",
  },
  footer: {
    navTitle: "Նավիգացիա",
    contactsTitle: "Կոնտակտներ",
    followTitle: "Հետևեք մեզ",
    privacy: "Գաղտնիության քաղաքականություն",
    terms: "Օգտագործման պայմաններ",
    rights: "Բոլոր իրավունքները պաշտպանված են։",
  },
  booking: {
    title: "Փորձնական դաս",
    step1Title: "Պատմեք մեզ ձեր մասին",
    nameLabel: "Անուն",
    namePlaceholder: "Ինչպե՞ս դիմել ձեզ",
    ageLabel: "Տարիք",
    agePlaceholder: "Աշակերտի տարիքը",
    step2Title: "Առարկա և նպատակ",
    subjectLabel: "Առարկա",
    goalLabel: "Նպատակ",
    step3Title: "Մակարդակ և ժամանակ",
    levelLabel: "Մակարդակ",
    levelPlaceholder: "Օրինակ՝ սկսնակ",
    timeLabel: "Հարմար ժամանակ",
    step4Title: "Կոնտակտային տվյալներ",
    phoneLabel: "Հեռախոս / WhatsApp",
    phonePlaceholder: "+374 00 000000",
    commentLabel: "Մեկնաբանություն",
    commentPlaceholder: "Պատմեք ավելին ձեր խնդրի մասին (ոչ պարտադիր)",
    back: "Հետ",
    next: "Հաջորդը",
    submit: "Ուղարկել հայտը",
    submitting: "Ուղարկվում է…",
    successTitle: "Հայտն ուղարկված է",
    successText: "Մենք շուտով կկապվենք ձեզ հետ՝ փորձնական դասը հաստատելու համար։",
    close: "Փակել",
    // "N-ից M" doesn't slot cleanly into the fixed "{step} {progress} {total}"
    // template the way ru's "из"/en's "of" do — a bare slash sidesteps
    // forcing incorrect Armenian grammar into that slot.
    progress: "/",
  },
  common: {
    openMenu: "Բացել մենյուն",
    closeMenu: "Փակել մենյուն",
  },
  legal: {
    privacyP1:
      "Marianna Hayrapetyan Tutoring Center-ը մշակում է կայքի ձևերի միջոցով ստացված անձնական տվյալները (անուն, աշակերտի տարիք, կոնտակտային տվյալներ)՝ բացառապես դասատու ընտրելու և փորձնական դասը կազմակերպելու նպատակով։",
    privacyP2Before:
      "Տվյալները չեն փոխանցվում երրորդ կողմերի, բացառությամբ կրթական ծառայության մատուցման համար անհրաժեշտ դեպքերի։ Կարող եք հայցել ձեր տվյալների ջնջումը՝ գրելով",
    privacyP3:
      "Այս էջը սոսկ օրինակ է և պետք է փոխարինվի գաղտնիության քաղաքականության ամբողջական տեքստով՝ կայքը շահագործման հանձնելուց առաջ։",
    termsP1:
      "Օգտվելով Marianna Hayrapetyan Tutoring Center կայքից՝ դուք համաձայնում եք, որ դրա նյութերը տեղեկատվական բնույթ ունեն, և փորձնական դասի գրանցումը որևէ պարտավորություն չի առաջացնում մինչև դասատուի հաստատումը։",
    termsP2: "Դասերի արժեքն ու ժամանակացույցը համաձայնեցվում են անհատապես՝ փորձնական դասից հետո։",
    termsP3:
      "Այս էջը սոսկ օրինակ է և պետք է փոխարինվի օգտագործման պայմանների ամբողջական տեքստով՝ կայքը շահագործման հանձնելուց առաջ։",
  },
  breadcrumbs: {
    home: "Գլխավոր",
  },
  pricing: {
    eyebrow: "Գներ",
    title: "Թափանցիկ գներ՝ առանց անակնկալների",
    description: "Ամսական փաթեթներ, մոտավորապես 8 դաս ամսում (Exam Intensive-ը՝ մինչև 12)։ Ճշգրիտ արժեքը կախված է ձևաչափից և խմբի չափից։",
    perMonth: "ամիս",
    fromLabel: "սկսած",
    details: "Մանրամասն",
    hideDetails: "Փակել",
    perStudent: "մեկ աշակերտից",
    students: "աշակերտ",

    formatGroup: "Խումբ",
    formatGroupDesc: "4–6 աշակերտ խմբում։",
    formatMiniGroup: "Փոքր խումբ",
    formatMiniGroupDesc: "2–3 աշակերտ։",
    formatIndividual: "Անհատական",
    formatIndividualDesc: "Մեկ առ մեկ դասատուի հետ։",
    formatExamIntensive: "Exam Intensive",
    formatExamIntensiveDesc: "Ախտորոշում, թեստեր, սխալների վերլուծություն, փորձնական քննություններ․ մինչև 12 դաս ամսում։",
    examIntensiveGroupLabel: "Խմբային ինտենսիվ",
    examIntensiveIndividualLabel: "Անհատական նախապատրաստում",

    packageTitle: "Ավելի շատ առարկա՝ ավելի ձեռնտու",
    packageDescription:
      "Զեղչը հաշվարկվում է մեկ ձևաչափով ընտրված բոլոր առարկաների ընդհանուր արժեքից։ Նույն առարկայից երկու դասը երբեք չի համարվում երկու առարկա։ Զեղչերը չեն գումարվում այլ առաջարկների հետ։",
    package1: "1 առարկա",
    package1Note: "Ստանդարտ արժեք",
    package2: "2 առարկա",
    package2Note: "−10%",
    package3: "3+ առարկա",
    package3Note: "−15%",
    packageExample: "Օրինակ՝ 2 առարկա, յուրաքանչյուրը 50 000 դրամ․ 100 000-ի փոխարեն → 90 000 դրամ/ամիս։",

    guaranteeProgramTitle: "Արդյունքի երաշխիքով ծրագիր",
    guaranteeProgramNote: "Պայմանները և արժեքը որոշվում են անվճար ախտորոշումից հետո։",
    guaranteeProgramExplain:
      "Ախտորոշումից հետո որոշվում է օբյեկտիվորեն հասանելի արդյունքը և ֆիքսվում պայմանագրում։ Եթե աշակերտը կատարում է ծրագրի պայմանները, բայց ֆիքսված արդյունքին չի հասնում, գործում է գումարի վերադարձ՝ երաշխիքային պայմանագրի պայմաններին համապատասխան։",
    cta: "Անցնել անվճար ախտորոշում",
  },
  guarantee: {
    heroShort: "Արդյունքի չհասնելու դեպքում՝ վերադարձնում ենք գումարը։",
    heroNote: "Նպատակը ֆիքսում ենք անվճար ախտորոշումից հետո։",
    eyebrow: "MH երաշխիքը",
    title: "Մենք պատասխանատու ենք արդյունքի համար։",
    subtitle: "Արդյունքի չհասնելու դեպքում՝ վերադարձնում ենք գումարը։",
    step1: "Ախտորոշում",
    step2: "Հասանելի նպատակ",
    step3: "Անհատական պլան",
    step4: "Առաջընթացի հսկողություն",
    step5: "Արդյունք",
    explanation:
      "Ախտորոշումից հետո պայմանագրում ֆիքսում ենք հասանելի արդյունքը։ Եթե աշակերտը կատարում է ծրագրի պայմանները, բայց ֆիքսված արդյունքին չի հասնում, գումարը վերադարձվում է երաշխիքային պայմանագրի պայմաններին համապատասխան։",
    cta: "Անցնել անվճար ախտորոշում",
  },
  leadForm: {
    formatLabel: "Դասի ձևաչափ",
    formatIndividual: "Անհատական",
    formatMiniGroup: "Փոքր խումբ",
    formatGroup: "Խումբ",
    formatExamIntensive: "Exam Intensive",
    groupSizeLabel: "Խմբի չափը",
    subjectCountLabel: "Քանի՞ առարկա",
    subjectCount1: "1 առարկա",
    subjectCount2: "2 առարկա (−10%)",
    subjectCount3: "3 և ավելի (−15%)",
    guaranteeInterestLabel: "Հետաքրքրում է արդյունքի երաշխիքով ծրագիրը",
    priceSummaryLabel: "Կողմնորոշիչ արժեք",
    sendViaWhatsapp: "Ուղարկել WhatsApp-ով",
    sendViaTelegram: "Ուղարկել Telegram-ով",
    notConfiguredNote: "Մեսենջերով հայտերի ընդունումը դեռ միացված չէ․ ձեր հայտը պահպանված է, մենք ինքներս կկապվենք։",
  },
};

export default hy;
