import type { Metadata } from "next";
import { ServicesContent } from "@/components/pages/ServicesContent";

const title = "Сайты под бизнес-задачу: визитки, лендинги, магазины, SEO-старт";
const description =
  "Сайт глазами предпринимателя: визитка от 10 000 ₽, лендинг и промо от 20 000 ₽, многостраничный сайт от 50 000 ₽, интернет-магазин от 80 000 ₽, SEO-старт от 10 000 ₽.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "создание сайтов",
    "сайт под бизнес задачу",
    "сайт глазами предпринимателя",
    "сайт-визитка от 10000",
    "лендинг от 20000",
    "промо страница на заказ",
    "многостраничный сайт от 50000",
    "интернет-магазин от 80000",
    "приложение от 15000",
    "сайт для эксперта",
    "портфолио на заказ",
    "поддержка сайта",
    "seo старт",
    "подготовка сайта к поиску",
    "яндекс вебмастер",
    "google search console",
    "дизайн сайта",
    "разработка лендинга",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title,
    description,
    url: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
