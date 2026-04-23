"use client";

import { useEffect } from "react";
import { useLocale } from "@/contexts/LocaleContext";

/**
 * Синхронизирует document.title и meta description с локалью (RU/EN).
 */
export function DocumentMetaSync() {
  const { locale, t } = useLocale();

  useEffect(() => {
    document.title = t("meta.title");

    let el = document.querySelector('meta[name="description"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "description");
      document.head.appendChild(el);
    }
    el.setAttribute("content", t("meta.description"));
  }, [locale, t]);

  return null;
}
