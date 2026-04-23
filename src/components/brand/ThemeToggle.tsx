"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const { t } = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const cycle = () => {
    if (!mounted) return;
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className="inline-flex h-9 min-w-[5.5rem] items-center justify-center rounded-editorial-md border border-line/70 bg-elevated/55 px-3 text-editorial-nav font-medium text-ink/90 shadow-editorial-inset backdrop-blur-sm transition-[border-color,background-color,color] duration-editorial ease-editorial hover:border-line hover:bg-elevated focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-elevated/35"
      aria-label={t("theme.toggle")}
    >
      {mounted ? (isDark ? t("theme.light") : t("theme.dark")) : "…"}
    </button>
  );
}
