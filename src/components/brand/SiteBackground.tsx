"use client";

import { FallingPattern } from "@/components/ui/falling-pattern";

/**
 * Фон: FallingPattern + лёгкий vignette + затемняющий слой читаемости. Без шума и второго движущегося слоя.
 */
export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background" aria-hidden>
      <FallingPattern
        className="h-full w-full min-h-[100dvh]"
        duration={100}
        blurIntensity="0.5rem"
        density={1.4}
      />
      <div className="absolute inset-0 bg-background/90 dark:bg-background/92" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_115%_95%_at_50%_45%,transparent_58%,rgb(var(--foreground)/0.045)_100%)] dark:bg-[radial-gradient(ellipse_115%_95%_at_50%_45%,transparent_58%,rgb(var(--foreground)/0.06)_100%)]"
        aria-hidden
      />
    </div>
  );
}
