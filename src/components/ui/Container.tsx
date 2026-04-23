import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Единый горизонтальный контейнер shell + страниц. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-shell px-gutter-sm sm:px-gutter-md lg:px-gutter-lg ${className}`}
    >
      {children}
    </div>
  );
}
