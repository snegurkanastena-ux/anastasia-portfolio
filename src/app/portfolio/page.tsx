import type { Metadata } from "next";
import { PortfolioContent } from "@/components/pages/PortfolioContent";

const title = "Портфолио сайтов, лендингов, приложений и AI-first проектов";
const description =
  "Кейсы Анастасии Мельниковой: сайты для бизнеса и экспертов, лендинги, промо-страницы, портфолио, приложения и AI-first digital-проекты.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "портфолио сайтов",
    "кейсы сайтов",
    "примеры лендингов",
    "сайт для эксперта пример",
    "AI-first проекты",
    "портфолио веб-дизайнера",
    "примеры сайтов для бизнеса",
  ],
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title,
    description,
    url: "/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
