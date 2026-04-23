"use client";

import { useLocale } from "@/contexts/LocaleContext";
export function StubHeading({ pageKey }: { pageKey: string }) {
  const { t } = useLocale();
  return (
    <h1 className="heading-section">
      {t(pageKey)}
    </h1>
  );
}
