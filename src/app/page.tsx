import type { Metadata } from "next";
import { HomeContent } from "@/components/pages/HomeContent";

import { translate } from "@/lib/i18n";

const title = translate("ru", "home.heroTitle");
const description = translate("ru", "home.heroSubtitle");

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
