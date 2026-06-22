import type { Metadata } from "next";
import { ContactsContent } from "@/components/pages/ContactsContent";

const title = "Контакты для заказа сайта, лендинга или AI-first проекта";
const description =
  "Связаться с Анастасией Мельниковой: обсудить сайт для бизнеса, лендинг, портфолио, интернет-магазин, приложение или поддержку проекта.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "заказать сайт",
    "обсудить создание сайта",
    "контакты веб-дизайнера",
    "создание лендинга",
    "сайт для бизнеса",
    "сайт для эксперта",
    "Анастасия Мельникова контакты",
  ],
  alternates: {
    canonical: "/contacts",
  },
  openGraph: {
    title,
    description,
    url: "/contacts",
  },
};

export default function ContactsPage() {
  return <ContactsContent />;
}
