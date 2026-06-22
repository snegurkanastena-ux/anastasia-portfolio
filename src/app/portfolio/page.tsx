import type { Metadata } from "next";
import { PortfolioContent } from "@/components/pages/PortfolioContent";

const title = "Проекты сайтов, лендингов, приложений и AI-first решений";
const description =
  "Проекты Анастасии Мельниковой: сайты для бизнеса и экспертов, лендинги, промо-страницы, портфолио, приложения и AI-first решения с понятным путём к заявке.";

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
