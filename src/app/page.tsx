import { Hero } from "@/components/sections/Hero";
import { TutorWizard } from "@/components/sections/TutorWizard";
import { Tutors } from "@/components/sections/Tutors";
import { Subjects } from "@/components/sections/Subjects";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyMH } from "@/components/sections/WhyMH";
import { ClassExperience } from "@/components/sections/ClassExperience";
import { Results } from "@/components/sections/Results";

export default function Home() {
  return (
    <>
      <Hero />
      <TutorWizard />
      <Tutors />
      <Subjects />
      <HowItWorks />
      <WhyMH />
      <ClassExperience />
      <Results />
    </>
  );
}
