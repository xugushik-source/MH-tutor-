"use client";

import Image from "next/image";
import { Mic, Video, FileText, NotebookPen, ListChecks, TrendingUp } from "lucide-react";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { StaggerReveal } from "@/components/motion/StaggerReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { useDictionary } from "@/i18n/provider";

export function ClassExperience() {
  const dict = useDictionary();

  return (
    <section className="bg-cream-dim py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow text-burgundy">
            <LineReveal>{dict.classExperience.eyebrow}</LineReveal>
          </span>
          <h2 className="mt-4 font-display text-4xl text-espresso sm:text-5xl">
            {dict.classExperience.title}
          </h2>
        </SectionReveal>

        <StaggerReveal className="mt-16 grid grid-cols-1 gap-4 rounded-[2rem] border border-espresso/10 bg-cream p-4 shadow-2xl shadow-espresso/10 sm:p-6 lg:grid-cols-12">
          <div className="flex flex-col gap-4 lg:col-span-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/portraits/levon.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-espresso/70 px-3 py-1 text-xs text-cream">
                  {dict.classExperience.teacher}
                </span>
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src="/portraits/student-demo.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-espresso/70 px-3 py-1 text-xs text-cream">
                  {dict.classExperience.student}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 rounded-2xl border border-espresso/10 bg-cream-dim/50 py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso/5 text-espresso/60">
                <Mic className="h-4 w-4" />
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-espresso/5 text-espresso/60">
                <Video className="h-4 w-4" />
              </div>
            </div>

            <div className="rounded-2xl border border-espresso/10 bg-cream-dim/50 p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-espresso/70">
                <FileText className="h-4 w-4 text-burgundy" />
                {dict.classExperience.materials}
              </p>
              <p className="mt-2 text-sm text-espresso/50">{dict.classExperience.materialsExample}</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-4">
            <div className="rounded-2xl border border-espresso/10 bg-cream-dim/50 p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-espresso/70">
                <NotebookPen className="h-4 w-4 text-burgundy" />
                {dict.classExperience.notes}
              </p>
              <p className="mt-2 text-sm italic text-espresso/50">{dict.classExperience.notesExample}</p>
            </div>

            <div className="rounded-2xl border border-espresso/10 bg-cream-dim/50 p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-espresso/70">
                <ListChecks className="h-4 w-4 text-burgundy" />
                {dict.classExperience.homework}
              </p>
              <ul className="mt-2 flex flex-col gap-1.5 text-sm text-espresso/55">
                <li>— {dict.classExperience.homeworkItem1}</li>
                <li>— {dict.classExperience.homeworkItem2}</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-espresso/10 bg-cream-dim/50 p-5">
              <p className="flex items-center gap-2 text-sm font-medium text-espresso/70">
                <TrendingUp className="h-4 w-4 text-burgundy" />
                {dict.classExperience.progress}
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-espresso/10">
                <div className="h-full w-[68%] rounded-full bg-burgundy" />
              </div>
              <p className="mt-2 text-xs text-espresso/45">{dict.classExperience.progressExample}</p>
            </div>
          </div>
        </StaggerReveal>
      </div>
    </section>
  );
}
