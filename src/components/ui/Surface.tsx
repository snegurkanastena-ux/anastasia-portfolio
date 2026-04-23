import type { ReactNode } from "react";

type SurfaceVariant = "base" | "plate" | "panel";

const variantClass: Record<SurfaceVariant, string> = {
  base: "bg-surface text-ink",
  plate:
    "border border-line/60 bg-plate/90 shadow-editorial backdrop-blur-md dark:border-line/50 dark:bg-plate/80 dark:shadow-editorial-dark",
  panel:
    "border border-line/50 bg-elevated/70 shadow-[0_1px_0_rgb(var(--line)/0.2)] dark:border-line/40 dark:bg-elevated/50",
};

type SurfaceProps = {
  children: ReactNode;
  variant?: SurfaceVariant;
  className?: string;
  as?: "div" | "footer" | "header" | "article";
};

export function Surface({
  children,
  variant = "base",
  className = "",
  as: Tag = "div",
}: SurfaceProps) {
  return (
    <Tag className={`${variantClass[variant]} ${className}`.trim()}>{children}</Tag>
  );
}
