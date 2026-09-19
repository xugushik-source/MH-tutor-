"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { localizeSubjects } from "@/data/subjects";
import { localizeWizardOptions, initialWizardState, type WizardState } from "@/data/wizard";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { LineReveal } from "@/components/motion/LineReveal";
import { useDictionary, useLocale } from "@/i18n/provider";
import { useTutorFilter } from "@/components/sections/TutorFilterContext";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 4;

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-all duration-300",
        selected
          ? "border-burgundy bg-burgundy text-cream shadow-lg shadow-burgundy/20"
          : "border-espresso/12 bg-cream text-espresso/80 hover:border-burgundy/40 hover:bg-burgundy/5",
      )}
    >
      {label}
    </button>
  );
}

export function TutorWizard() {
  const dict = useDictionary();
  const { locale } = useLocale();
  const subjects = localizeSubjects(locale);
  const { audiences: wizardAudiences, goals: wizardGoals, times: wizardTimes } = localizeWizardOptions(locale);
  const { setFilterSubject } = useTutorFilter();
  const [step, setStep] = useState(1);
  const [state, setState] = useState<WizardState>(initialWizardState);

  const stepValid =
    step === 1 ? !!state.subject : step === 2 ? !!state.audience : step === 3 ? !!state.goal : !!state.time;

  function handleSubmit() {
    setFilterSubject(state.subject);
    document.getElementById("tutors")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section id="wizard" className="relative bg-cream-dim py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <SectionReveal className="text-center">
          <span className="eyebrow text-burgundy">
            <LineReveal>{dict.wizard.eyebrow}</LineReveal>
          </span>
          <h2 className="mt-4 font-display text-4xl text-espresso sm:text-5xl">{dict.wizard.title}</h2>
        </SectionReveal>

        <SectionReveal delay={0.15} className="mt-14 rounded-[2rem] border border-espresso/10 bg-cream p-6 shadow-xl shadow-espresso/5 sm:p-10">
          <div className="mb-8 flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-300",
                  i < step ? "bg-burgundy" : "bg-espresso/10",
                )}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {step === 1 && (
                <>
                  <h3 className="font-display text-2xl text-espresso">{dict.wizard.step1Title}</h3>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {subjects.map((s) => (
                      <OptionCard
                        key={s.slug}
                        label={s.title}
                        selected={state.subject === s.slug}
                        onClick={() => setState((prev) => ({ ...prev, subject: s.slug }))}
                      />
                    ))}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="font-display text-2xl text-espresso">{dict.wizard.step2Title}</h3>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {wizardAudiences.map((a) => (
                      <OptionCard
                        key={a.id}
                        label={a.label}
                        selected={state.audience === a.id}
                        onClick={() => setState((prev) => ({ ...prev, audience: a.id }))}
                      />
                    ))}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="font-display text-2xl text-espresso">{dict.wizard.step3Title}</h3>
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {wizardGoals.map((g) => (
                      <OptionCard
                        key={g.id}
                        label={g.label}
                        selected={state.goal === g.id}
                        onClick={() => setState((prev) => ({ ...prev, goal: g.id }))}
                      />
                    ))}
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h3 className="font-display text-2xl text-espresso">{dict.wizard.step4Title}</h3>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {wizardTimes.map((t) => (
                      <OptionCard
                        key={t.id}
                        label={t.label}
                        selected={state.time === t.id}
                        onClick={() => setState((prev) => ({ ...prev, time: t.id }))}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium text-espresso/60 transition-opacity hover:text-espresso",
                step === 1 && "invisible",
              )}
            >
              <ChevronLeft className="h-4 w-4" />
              {dict.wizard.back}
            </button>

            {step < TOTAL_STEPS ? (
              <button
                onClick={() => stepValid && setStep((s) => s + 1)}
                disabled={!stepValid}
                className="flex items-center gap-1.5 rounded-full bg-burgundy px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-burgundy-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                {dict.wizard.next}
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!stepValid}
                className="rounded-full bg-burgundy px-7 py-3 text-sm font-medium text-cream transition-colors hover:bg-burgundy-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                {dict.wizard.submit}
              </button>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
