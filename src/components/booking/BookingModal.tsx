"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { useBookingModal } from "./BookingModalContext";
import { useDictionary, useLocale } from "@/i18n/provider";
import { localizeSubjects } from "@/data/subjects";
import { localizeWizardOptions } from "@/data/wizard";
import { submitBookingRequest, type BookingPayload } from "@/lib/booking";
import { cn } from "@/lib/utils";

const TOTAL_STEPS = 4;

const emptyForm: BookingPayload = {
  name: "",
  age: "",
  subject: "",
  goal: "",
  level: "",
  time: "",
  phone: "",
  comment: "",
};

export function BookingModal() {
  const { isOpen, prefill, close } = useBookingModal();
  const dict = useDictionary();
  const { locale } = useLocale();
  const subjects = localizeSubjects(locale);
  const { goals: wizardGoals, times: wizardTimes } = localizeWizardOptions(locale);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<BookingPayload>(emptyForm);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  // Reset the flow whenever the modal transitions from closed to open.
  // Adjusted during render (React's documented pattern for state that
  // depends on a prop change) rather than in an effect, which would cause
  // an extra render pass just to blank the form back out.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (isOpen) {
      setStep(1);
      setStatus("idle");
      setForm({ ...emptyForm, subject: prefill.subject ?? "", goal: prefill.goal ?? "" });
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  function update<K extends keyof BookingPayload>(key: K, value: BookingPayload[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit() {
    setStatus("submitting");
    await submitBookingRequest(form);
    setStatus("success");
  }

  const canProceed =
    step === 1
      ? form.name.trim().length > 0
      : step === 2
        ? form.subject.trim().length > 0
        : step === 3
          ? form.time.trim().length > 0
          : form.phone.trim().length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
          <motion.button
            aria-label={dict.booking.close}
            className="absolute inset-0 bg-espresso/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={dict.booking.title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-cream p-6 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <button
              onClick={close}
              aria-label={dict.booking.close}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-espresso/15 text-espresso transition-colors hover:border-espresso/40"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "success" ? (
              <SuccessScreen onClose={close} />
            ) : (
              <>
                <div className="mb-6 pr-10">
                  <span className="eyebrow text-burgundy">{dict.booking.title}</span>
                  <div className="mt-3 flex items-center gap-2">
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
                  <p className="mt-2 text-xs text-espresso/50">
                    {step} {dict.booking.progress} {TOTAL_STEPS}
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-4"
                  >
                    {step === 1 && (
                      <>
                        <h3 className="font-display text-xl text-espresso">
                          {dict.booking.step1Title}
                        </h3>
                        <Field label={dict.booking.nameLabel}>
                          <input
                            autoFocus
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder={dict.booking.namePlaceholder}
                            className="input"
                          />
                        </Field>
                        <Field label={dict.booking.ageLabel}>
                          <input
                            value={form.age}
                            onChange={(e) => update("age", e.target.value)}
                            placeholder={dict.booking.agePlaceholder}
                            className="input"
                          />
                        </Field>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <h3 className="font-display text-xl text-espresso">
                          {dict.booking.step2Title}
                        </h3>
                        <Field label={dict.booking.subjectLabel}>
                          <select
                            value={form.subject}
                            onChange={(e) => update("subject", e.target.value)}
                            className="input"
                          >
                            <option value="" disabled>
                              —
                            </option>
                            {subjects.map((s) => (
                              <option key={s.slug} value={s.slug}>
                                {s.title}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label={dict.booking.goalLabel}>
                          <select
                            value={form.goal}
                            onChange={(e) => update("goal", e.target.value)}
                            className="input"
                          >
                            <option value="" disabled>
                              —
                            </option>
                            {wizardGoals.map((g) => (
                              <option key={g.id} value={g.id}>
                                {g.label}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <h3 className="font-display text-xl text-espresso">
                          {dict.booking.step3Title}
                        </h3>
                        <Field label={dict.booking.levelLabel}>
                          <input
                            value={form.level}
                            onChange={(e) => update("level", e.target.value)}
                            placeholder={dict.booking.levelPlaceholder}
                            className="input"
                          />
                        </Field>
                        <Field label={dict.booking.timeLabel}>
                          <select
                            value={form.time}
                            onChange={(e) => update("time", e.target.value)}
                            className="input"
                          >
                            <option value="" disabled>
                              —
                            </option>
                            {wizardTimes.map((t) => (
                              <option key={t.id} value={t.id}>
                                {t.label}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </>
                    )}

                    {step === 4 && (
                      <>
                        <h3 className="font-display text-xl text-espresso">
                          {dict.booking.step4Title}
                        </h3>
                        <Field label={dict.booking.phoneLabel}>
                          <input
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            placeholder={dict.booking.phonePlaceholder}
                            className="input"
                          />
                        </Field>
                        <Field label={dict.booking.commentLabel}>
                          <textarea
                            value={form.comment}
                            onChange={(e) => update("comment", e.target.value)}
                            placeholder={dict.booking.commentPlaceholder}
                            rows={3}
                            className="input resize-none"
                          />
                        </Field>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="mt-7 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                    className={cn(
                      "text-sm font-medium text-espresso/60 transition-opacity hover:text-espresso",
                      step === 1 && "invisible",
                    )}
                  >
                    {dict.booking.back}
                  </button>
                  {step < TOTAL_STEPS ? (
                    <button
                      onClick={() => canProceed && setStep((s) => s + 1)}
                      disabled={!canProceed}
                      className="rounded-full bg-burgundy px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-burgundy-deep disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {dict.booking.next}
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={!canProceed || status === "submitting"}
                      className="rounded-full bg-burgundy px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-burgundy-deep disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {status === "submitting" ? dict.booking.submitting : dict.booking.submit}
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-espresso/70">{label}</span>
      {children}
    </label>
  );
}

function SuccessScreen({ onClose }: { onClose: () => void }) {
  const dict = useDictionary();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 py-10 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-burgundy text-cream">
        <Check className="h-7 w-7" />
      </div>
      <h3 className="font-display text-2xl text-espresso">{dict.booking.successTitle}</h3>
      <p className="max-w-xs text-sm text-espresso/60">{dict.booking.successText}</p>
      <button
        onClick={onClose}
        className="mt-2 rounded-full border border-espresso/20 px-6 py-3 text-sm font-medium text-espresso transition-colors hover:border-espresso/50"
      >
        {dict.booking.close}
      </button>
    </motion.div>
  );
}
