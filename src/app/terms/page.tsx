import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Условия использования",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 sm:px-8">
      <h1 className="font-display text-3xl text-espresso">Условия использования</h1>
      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-espresso/70">
        <p>
          Используя сайт {siteConfig.name}, вы соглашаетесь с тем, что материалы сайта носят
          информационный характер, а запись на пробное занятие не накладывает обязательств до
          подтверждения преподавателем.
        </p>
        <p>
          Стоимость и расписание занятий согласовываются индивидуально после пробного урока.
        </p>
        <p>
          Эта страница — плейсхолдер и должна быть заменена полным текстом условий использования
          перед запуском сайта в продакшн.
        </p>
      </div>
    </div>
  );
}
