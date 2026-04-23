"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactChoiceTrigger } from "@/components/brand/ContactChoiceModal";
import { LanguageSwitch } from "@/components/brand/LanguageSwitch";
import { ThemeToggle } from "@/components/brand/ThemeToggle";
import { primaryCtaClassNames } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/contexts/LocaleContext";

const NAV = [
  { href: "/", key: "nav.home" as const },
  { href: "/portfolio", key: "nav.portfolio" as const },
  { href: "/services", key: "nav.services" as const },
  { href: "/contacts", key: "nav.contacts" as const },
];

const navLinkBase =
  "relative py-2 text-editorial-nav font-medium text-muted transition-[color] duration-editorial ease-editorial after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-editorial after:ease-editorial hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const navLinkActive = "text-foreground after:scale-x-100";

const HEADER_LOGO = "/images/brand-mark.png";

export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLocale();

  return (
    <header className="sticky top-0 z-40 border-b border-border/20 bg-background/90 backdrop-blur-xl dark:bg-background/88">
      <Container className="flex flex-col gap-3 !px-4 py-3.5 sm:!px-5 sm:flex-row sm:items-center sm:justify-between sm:py-4 lg:!px-6">
        <Link
          href="/"
          className="group flex w-full min-w-0 flex-1 items-center gap-5 lg:gap-6"
          aria-label={t("brand.headerLockup")}
        >
          <Image
            src={HEADER_LOGO}
            alt=""
            width={80}
            height={80}
            className="h-20 w-20 shrink-0 rounded-md object-contain dark:brightness-100"
            priority
          />
          <span className="min-w-0 flex-1 text-left text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl md:whitespace-nowrap lg:text-3xl lg:font-bold lg:leading-[1.1]">
            {t("brand.headerLockup")}
          </span>
        </Link>
        <div className="flex shrink-0 flex-col gap-2.5 sm:items-end">
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-0.5 sm:justify-end sm:gap-x-7">
            {NAV.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className={`${navLinkBase} ${active ? navLinkActive : ""}`}>
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <ContactChoiceTrigger className={`${primaryCtaClassNames("md")} text-editorial-nav font-semibold tracking-wide`}>
              {t("cta.contact")}
            </ContactChoiceTrigger>
            <LanguageSwitch />
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  );
}
