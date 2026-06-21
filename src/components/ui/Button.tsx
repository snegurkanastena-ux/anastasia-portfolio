import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "border border-transparent bg-primary text-primary-foreground shadow-sm shadow-black/10 transition-[background-color] duration-200 ease-out hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
  secondary:
    "border border-primary/45 bg-primary/5 text-[rgb(var(--heading))] shadow-[inset_0_0_0_1px_rgb(var(--rim)/0.42)] transition-[border-color,background-color,color,box-shadow] duration-200 ease-out hover:border-primary/75 hover:bg-primary/10 hover:shadow-[inset_0_0_0_1px_rgb(var(--primary)/0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-primary/50 dark:bg-transparent dark:text-foreground dark:hover:border-primary/75 dark:hover:bg-primary/10",
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

export function secondaryCtaClassNames(size: ButtonSize = "md"): string {
  return `inline-flex items-center justify-center rounded-lg font-sans font-semibold ${variantClass.secondary} ${sizeClass[size]}`;
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
