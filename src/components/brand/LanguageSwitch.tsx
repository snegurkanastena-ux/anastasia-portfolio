"use client";

import { useLocale } from "@/contexts/LocaleContext";
import { locales, type Locale } from "@/lib/i18n";

function langLabel(code: Locale): string {
  return code === "ru" ? "lang.ru" : "lang.en";
}

export function LanguageSwitch() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t("lang.toggle")}
      className="inline-flex h-9 items-stretch overflow-hidden rounded-editorial-md border border-line/70 bg-elevated/55 text-editorial-nav font-medium text-ink/90 shadow-editorial-inset backdrop-blur-sm dark:bg-elevated/35"
    >
      {locales.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            className={`min-w-[2.75rem] px-2.5 transition-[color,background-color] duration-editorial ease-editorial focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent ${
              active
                ? "bg-ink text-surface dark:bg-elevated dark:text-ink"
                : "text-muted hover:bg-surface/50 hover:text-ink dark:hover:bg-surface/25"
            }`}
            aria-pressed={active}
          >
            {t(langLabel(code))}
          </button>
        );
      })}
    </div>
  );
}
