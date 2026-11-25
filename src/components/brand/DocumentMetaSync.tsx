"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { isServiceSlug } from "@/lib/service-pages";

/**
 * Синхронизирует document.title и meta description с локалью (RU/EN).
 */
export function DocumentMetaSync() {
  const { t } = useLocale();
  const pathname = usePathname();
  const service = pathname.startsWith("/services/") ? pathname.slice("/services/".length) : "";
  const serviceKey = isServiceSlug(service) ? "serviceDetails." + service : null;
  let title = t("meta.title");
  let description = t("meta.description");

  if (pathname === "/") {
    title = t("home.heroTitle");
    description = t("home.heroSubtitle");
  } else if (serviceKey) {
    title = t(serviceKey + ".title");
    description = t(serviceKey + ".intro");
  }

  useEffect(() => {
    document.title = title;

    let el = document.querySelector('meta[name="description"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "description");
      document.head.appendChild(el);
    }
    el.setAttribute("content", description);
  }, [description, title]);

  return null;
}
