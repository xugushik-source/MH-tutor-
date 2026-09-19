import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-28 sm:px-8">
      <h1 className="font-display text-3xl text-espresso">Политика конфиденциальности</h1>
      <div className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-espresso/70">
        <p>
          {siteConfig.name} обрабатывает персональные данные, переданные через формы на сайте
          (имя, возраст ученика, контактные данные), исключительно для подбора преподавателя и
          организации пробного занятия.
        </p>
        <p>
          Данные не передаются третьим лицам, за исключением случаев, необходимых для оказания
          образовательных услуг. Вы можете запросить удаление своих данных, написав на{" "}
          <a href={`mailto:${siteConfig.contacts.email}`} className="text-burgundy underline underline-offset-2">
            {siteConfig.contacts.email}
          </a>
          .
        </p>
        <p>
          Эта страница — плейсхолдер и должна быть заменена полным текстом политики
          конфиденциальности перед запуском сайта в продакшн.
        </p>
      </div>
    </div>
  );
}
