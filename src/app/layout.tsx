import type { Metadata } from "next";
import { Caveat, Manrope, PT_Serif } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  BRAND_DISPLAY_NAME_RU,
  EMAIL_CONTACT,
  TELEGRAM_BOT_URL,
  TELEGRAM_CHANNEL_URL,
  VK_URL,
} from "@/lib/site";
import { Providers } from "./providers";
import "./globals.css";

const display = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

const signature = Caveat({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  variable: "--font-signature",
});

const siteUrlAscii = "https://www.xn----8sb1aregjk5f.xn--p1ai";
const siteDescription =
  "Сайт глазами предпринимателя: создание сайтов, лендингов, промо-страниц, портфолио, интернет-магазинов и приложений для бизнеса и экспертов.";
const siteTitle = `${BRAND_DISPLAY_NAME_RU} — сайты для бизнеса и экспертов`;
const canonicalUrl = siteUrlAscii;
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${canonicalUrl}/#website`,
      url: canonicalUrl,
      name: "про-сайты.рф",
      alternateName: siteTitle,
      inLanguage: "ru-RU",
      description: siteDescription,
    },
    {
      "@type": "Person",
      "@id": `${canonicalUrl}/#person`,
      name: BRAND_DISPLAY_NAME_RU,
      url: canonicalUrl,
      email: EMAIL_CONTACT,
      jobTitle: "AI-first веб-дизайнер и вайб-кодер",
      knowsAbout: [
        "создание сайтов",
        "лендинги",
        "сайты для бизнеса",
        "сайты для экспертов",
        "GPT-агенты",
        "AI-инструменты для контента",
        "веб-дизайн",
      ],
      sameAs: [TELEGRAM_CHANNEL_URL, TELEGRAM_BOT_URL, VK_URL],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${canonicalUrl}/#service`,
      name: "Создание сайтов для бизнеса и экспертов",
      url: canonicalUrl,
      image: `${canonicalUrl}/images/brand-mark.png`,
      description: siteDescription,
      email: EMAIL_CONTACT,
      founder: {
        "@id": `${canonicalUrl}/#person`,
      },
      areaServed: {
        "@type": "Country",
        name: "Россия",
      },
      priceRange: "от 10 000 ₽",
      sameAs: [TELEGRAM_CHANNEL_URL, TELEGRAM_BOT_URL, VK_URL],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Услуги по созданию сайтов",
        itemListElement: [
          {
            "@type": "Offer",
            name: "Сайт-визитка",
            priceCurrency: "RUB",
            priceSpecification: { "@type": "PriceSpecification", minPrice: 10000, priceCurrency: "RUB" },
            itemOffered: { "@type": "Service", serviceType: "Создание сайта-визитки" },
          },
          {
            "@type": "Offer",
            name: "Лендинг",
            priceCurrency: "RUB",
            priceSpecification: { "@type": "PriceSpecification", minPrice: 20000, priceCurrency: "RUB" },
            itemOffered: { "@type": "Service", serviceType: "Создание лендинга" },
          },
          {
            "@type": "Offer",
            name: "Многостраничный сайт",
            priceCurrency: "RUB",
            priceSpecification: { "@type": "PriceSpecification", minPrice: 50000, priceCurrency: "RUB" },
            itemOffered: { "@type": "Service", serviceType: "Создание многостраничного сайта" },
          },
          {
            "@type": "Offer",
            name: "Интернет-магазин",
            priceCurrency: "RUB",
            priceSpecification: { "@type": "PriceSpecification", minPrice: 80000, priceCurrency: "RUB" },
            itemOffered: { "@type": "Service", serviceType: "Создание интернет-магазина" },
          },
          {
            "@type": "Offer",
            name: "Приложение или рабочий инструмент",
            priceCurrency: "RUB",
            priceSpecification: { "@type": "PriceSpecification", minPrice: 15000, priceCurrency: "RUB" },
            itemOffered: { "@type": "Service", serviceType: "Разработка приложения или рабочего инструмента" },
          },
        ],
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrlAscii),
  title: {
    default: siteTitle,
    template: `%s | ${BRAND_DISPLAY_NAME_RU}`,
  },
  description: siteDescription,
  applicationName: "про-сайты.рф",
  creator: BRAND_DISPLAY_NAME_RU,
  publisher: BRAND_DISPLAY_NAME_RU,
  category: "создание сайтов",
  keywords: [
    "создание сайтов",
    "сайт для бизнеса",
    "сайт для эксперта",
    "сайт-визитка",
    "лендинг",
    "промо-страница",
    "многостраничный сайт",
    "интернет-магазин",
    "портфолио",
    "поддержка сайта",
    "разработка приложений",
    "дизайн сайта",
    "AI-first веб-дизайнер",
    "вайб-кодер",
    "Анастасия Мельникова",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className={`${display.variable} ${sans.variable} ${signature.variable} app-canvas`}>
        <Providers>
          <div className="relative isolate z-[1] flex min-h-screen flex-col">
            <SiteHeader />
            <main className="relative flex-1">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
