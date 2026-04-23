"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

type DotPattern1Props = {
  className?: string;
};

/** Локальный декор: точки, только внутри карточек / блоков, не глобальный фон. */
export function DotPattern1({ className }: DotPattern1Props) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]", className)} aria-hidden>
      <svg className="h-full w-full text-primary/20 dark:text-primary/15">
        <defs>
          <pattern id={`dp-${id}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#dp-${id})`} />
      </svg>
    </div>
  );
}
