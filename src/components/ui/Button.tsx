import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-primary text-primary-foreground shadow-sm shadow-black/10 transition-[background-color] duration-200 ease-out hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  secondary:
    "border border-border/90 bg-card text-foreground shadow-editorial-inset transition-[border-color,background-color,color] duration-editorial ease-editorial hover:border-border hover:bg-muted-surface/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:bg-card/80",
  ghost:
    "border border-transparent bg-transparent text-foreground transition-[color,background-color,border-color] duration-editorial ease-editorial hover:bg-muted-surface/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:hover:bg-muted-surface/20",
};

type ButtonSize = "sm" | "md" | "lg";

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-editorial-nav",
  md: "h-10 px-4 text-editorial-base",
  lg: "h-11 px-5 text-editorial-base font-semibold",
};

/** Классы primary CTA для compose с ContactChoiceTrigger и внешними кнопками. */
export function primaryCtaClassNames(size: ButtonSize = "md"): string {
  return `inline-flex items-center justify-center rounded-lg font-sans font-semibold ${variantClass.primary} ${sizeClass[size]}`;
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-lg font-sans disabled:cursor-not-allowed disabled:opacity-55 ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
