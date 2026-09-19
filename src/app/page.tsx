import { Hero } from "@/components/sections/Hero";
import { TutorWizard } from "@/components/sections/TutorWizard";
import { Tutors } from "@/components/sections/Tutors";
import { Subjects } from "@/components/sections/Subjects";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyMH } from "@/components/sections/WhyMH";
import { ClassExperience } from "@/components/sections/ClassExperience";
import { Results } from "@/components/sections/Results";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrialCta } from "@/components/sections/TrialCta";
import { Faq } from "@/components/sections/Faq";
import { FinalScreen } from "@/components/sections/FinalScreen";
import { buildOrganizationSchema, buildFaqSchema } from "@/lib/schema";

export default function Home() {
  const organizationSchema = buildOrganizationSchema();
  const faqSchema = buildFaqSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Hero />
      <TutorWizard />
      <Tutors />
      <Subjects />
      <HowItWorks />
      <WhyMH />
      <ClassExperience />
      <Results />
      <Testimonials />
      <TrialCta />
      <Faq />
      <FinalScreen />
    </>
  );
}
