import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Star, PlayCircle, GraduationCap, BadgeCheck, Quote } from "lucide-react";
import { tutors, getTutorBySlug } from "@/data/tutors";
import { TutorPortraitReveal } from "@/components/tutors/TutorAvatar";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { TutorBookingCta } from "@/components/tutors/TutorBookingCta";
import { siteConfig } from "@/config/site";

interface TutorPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tutors.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: TutorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tutor = getTutorBySlug(slug);
  if (!tutor) return {};

  return {
    title: `${tutor.name} — ${tutor.subjectLabel}`,
    description: tutor.shortBio,
    alternates: { canonical: `/tutors/${tutor.slug}` },
    openGraph: {
      title: `${tutor.name} — ${tutor.subjectLabel}`,
      description: tutor.shortBio,
    },
  };
}

export default async function TutorPage({ params }: TutorPageProps) {
  const { slug } = await params;
  const tutor = getTutorBySlug(slug);
  if (!tutor) notFound();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: tutor.name,
    jobTitle: tutor.subjectLabel,
    description: tutor.shortBio,
    knowsLanguage: tutor.languages,
    url: `${siteConfig.url}/tutors/${tutor.slug}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tutor.rating,
      reviewCount: tutor.reviewsCount,
    },
  };

  return (
    <div className="bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-32 sm:px-8 sm:pt-36">
        <Link
          href="/#tutors"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-espresso/55 transition-colors hover:text-burgundy"
        >
          <ChevronLeft className="h-4 w-4" />
          Все преподаватели
        </Link>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 pb-28 pt-8 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <SectionReveal className="flex flex-col gap-6 sm:flex-row sm:items-end">
            <TutorPortraitReveal
              tutor={tutor}
              className="aspect-[4/5] w-full max-w-[220px] rounded-[1.75rem] shadow-xl shadow-espresso/15"
              sizes="220px"
              priority
            />
            <div>
              <p className="eyebrow text-burgundy">{tutor.subjectLabel}</p>
              <h1 className="mt-2 font-display text-4xl text-espresso sm:text-5xl">{tutor.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-espresso/60">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-champagne text-champagne" />
                  {tutor.rating.toFixed(1)} · {tutor.reviewsCount} отзывов
                </span>
                <span>{tutor.experienceYears} лет опыта</span>
                <span>{tutor.languages.join(", ")}</span>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1} className="mt-14">
            <h2 className="font-display text-2xl text-espresso">О преподавателе</h2>
            <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-espresso/70">
              {tutor.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.15} className="mt-12">
            <h2 className="font-display text-2xl text-espresso">Методика</h2>
            <p className="mt-4 text-sm leading-relaxed text-espresso/70">{tutor.methodology}</p>
          </SectionReveal>

          <SectionReveal delay={0.2} className="mt-12">
            <h2 className="font-display text-2xl text-espresso">Кому подходит</h2>
            <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {tutor.suitableFor.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-espresso/70">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" />
                  {item}
                </li>
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal delay={0.25} className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 font-display text-xl text-espresso">
                <GraduationCap className="h-5 w-5 text-burgundy" />
                Образование
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-espresso/65">
                {tutor.education.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="flex items-center gap-2 font-display text-xl text-espresso">
                <BadgeCheck className="h-5 w-5 text-burgundy" />
                Сертификаты
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-espresso/65">
                {tutor.certificates.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.3} className="mt-12">
            <h2 className="font-display text-2xl text-espresso">Видео-знакомство</h2>
            <div className="mt-4 flex aspect-video w-full items-center justify-center rounded-[1.5rem] border border-dashed border-espresso/20 bg-espresso/[0.03] text-espresso/40">
              <div className="flex flex-col items-center gap-2">
                <PlayCircle className="h-10 w-10" />
                <span className="text-xs">Видео появится позже</span>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.35} className="mt-12">
            <h2 className="font-display text-2xl text-espresso">Отзывы</h2>
            <div className="mt-4 flex flex-col gap-4">
              {tutor.reviews.map((r, i) => (
                <div key={i} className="rounded-2xl border border-espresso/10 bg-cream-dim/40 p-5">
                  <Quote className="h-5 w-5 text-champagne" />
                  <p className="mt-2 text-sm leading-relaxed text-espresso/75">{r.text}</p>
                  <p className="mt-3 text-xs font-medium text-espresso/50">
                    {r.author}, {r.country}
                  </p>
                </div>
              ))}
            </div>
          </SectionReveal>

          <SectionReveal delay={0.4} className="mt-12">
            <h2 className="font-display text-2xl text-espresso">Расписание</h2>
            <p className="mt-4 text-sm leading-relaxed text-espresso/70">
              Точное расписание согласовывается индивидуально с преподавателем после заявки на
              пробное занятие.
            </p>
          </SectionReveal>
        </div>

        <div className="lg:col-span-4">
          <TutorBookingCta tutor={tutor} />
        </div>
      </div>
    </div>
  );
}
