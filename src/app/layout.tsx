import type { Metadata } from "next";
import { Caveat, Manrope, PT_Serif } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BRAND_DISPLAY_NAME_RU } from "@/lib/site";
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

const siteUrl = "https://www.про-сайты.рф";
const siteUrlAscii = "https://www.xn----8sb1aregjk5f.xn--p1ai";
const siteDescription =
  "Портфолио: сайты, интерфейсы и digital-проекты. Vibe Coder / AI-first веб-дизайнер.";
const siteTitle = `${BRAND_DISPLAY_NAME_RU} — портфолио`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrlAscii),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    siteName: siteTitle,
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
