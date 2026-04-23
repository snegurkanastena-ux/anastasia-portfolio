import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Вертикальный ритм секции: sm / md / lg */
  y?: "sm" | "md" | "lg";
};

const yMap = {
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
};

export function Section({ children, className = "", y = "md" }: SectionProps) {
  return <section className={`${yMap[y]} ${className}`}>{children}</section>;
}
