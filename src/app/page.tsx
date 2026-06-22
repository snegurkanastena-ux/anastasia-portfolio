import type { Metadata } from "next";
import { HomeContent } from "@/components/pages/HomeContent";

const title = "Сайт глазами предпринимателя для бизнеса и экспертов";
const description =
  "Создаю сайты, лендинги, портфолио, промо-страницы и AI-first проекты: понятная структура, доверие, заявки и поддержка после запуска.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "сайт глазами предпринимателя",
    "создание сайтов для бизнеса",
    "сайт для эксперта",
    "лендинг на заказ",
    "сайт-визитка",
    "портфолио эксперта",
    "AI-first веб-дизайнер",
    "вайб-кодер",
    "Анастасия Мельникова",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
