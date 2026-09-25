import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { tutors, getTutorBySlug } from "@/data/tutors";
import { TutorProfileContent } from "@/components/tutors/TutorProfileContent";
import { siteConfig } from "@/config/site";
import { buildBreadcrumbSchema } from "@/lib/schema";

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

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: siteConfig.url },
    { name: "Tutors", url: `${siteConfig.url}/#tutors` },
    { name: tutor.name, url: `${siteConfig.url}/tutors/${tutor.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <TutorProfileContent tutor={tutor} />
    </>
  );
}
