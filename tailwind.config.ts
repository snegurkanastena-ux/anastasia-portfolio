import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      maxWidth: {
        shell: "88rem",
      },
      spacing: {
        "gutter-sm": "1.25rem",
        "gutter-md": "1.5rem",
        "gutter-lg": "2rem",
        "section-sm": "2.5rem",
        "section-md": "4rem",
        "section-lg": "6rem",
        "section-xl": "7.5rem",
      },
      borderRadius: {
        "editorial-sm": "0.25rem",
        "editorial-md": "0.5rem",
        "editorial-lg": "0.75rem",
      },
      transitionDuration: {
        "editorial-instant": "150ms",
        editorial: "220ms",
        "editorial-slow": "320ms",
        "editorial-slower": "420ms",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui"],
        /** Имя в шапке: рукописный акцент (Caveat), не основной текст */
        signature: ["var(--font-signature)", "var(--font-sans)", "system-ui"],
      },
      fontSize: {
        /** Display serif: hero */
        "editorial-hero": [
          "clamp(2.5rem, 1.65rem + 3.4vw, 4rem)",
          { lineHeight: "1.04", letterSpacing: "-0.038em" },
        ],
        /** Display serif: страничный H1 */
        "editorial-h1": [
          "clamp(2rem, 1.25rem + 2.6vw, 3.25rem)",
          { lineHeight: "1.08", letterSpacing: "-0.03em" },
        ],
        /** Display serif: секционный H2 */
        "editorial-h2": [
          "clamp(1.5rem, 1.05rem + 1.5vw, 2.125rem)",
          { lineHeight: "1.12", letterSpacing: "-0.024em" },
        ],
        /** Display serif: H3 */
        "editorial-h3": [
          "1.3125rem",
          { lineHeight: "1.38", letterSpacing: "-0.014em" },
        ],
        /** Минимум 14px */
        "editorial-caption": [
          "0.875rem",
          { lineHeight: "1.5rem", letterSpacing: "0.01em" },
        ],
        "editorial-label": [
          "0.875rem",
          { lineHeight: "1.35rem", letterSpacing: "0.14em" },
        ],
        "editorial-nav": [
          "0.9375rem",
          { lineHeight: "1.35rem", letterSpacing: "0.01em" },
        ],
        "editorial-xs": [
          "0.875rem",
          { lineHeight: "1.4rem", letterSpacing: "0.06em" },
        ],
        "editorial-sm": [
          "0.875rem",
          { lineHeight: "1.45rem", letterSpacing: "0.01em" },
        ],
        /** Body (основной текст интерфейса) */
        "editorial-base": [
          "1.0625rem",
          { lineHeight: "1.72rem", letterSpacing: "0" },
        ],
        /** Body large */
        "editorial-body-lg": [
          "1.125rem",
          { lineHeight: "1.78rem", letterSpacing: "0" },
        ],
        /** Legacy display scale — страницы пока не трогаем */
        "editorial-display-sm": [
          "1.5rem",
          { lineHeight: "1.2", letterSpacing: "-0.02em" },
        ],
        "editorial-display": [
          "clamp(1.75rem, 1.2rem + 2vw, 2.75rem)",
          { lineHeight: "1.12", letterSpacing: "-0.03em" },
        ],
        "editorial-display-lg": [
          "clamp(2.25rem, 1.5rem + 3vw, 3.5rem)",
          { lineHeight: "1.08", letterSpacing: "-0.035em" },
        ],
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-hover": "rgb(var(--primary-hover) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
        "muted-surface": "rgb(var(--muted-surface) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        elevated: "rgb(var(--elevated) / <alpha-value>)",
        plate: "rgb(var(--plate) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-ink": "rgb(var(--accent-ink) / <alpha-value>)",
      },
      boxShadow: {
        editorial:
          "0 1px 0 rgb(var(--line) / 0.32), 0 20px 44px -26px rgb(var(--depth) / 0.1)",
        "editorial-dark":
          "0 1px 0 rgb(var(--rim) / 0.05), 0 24px 48px -28px rgb(0 0 0 / 0.38)",
        "editorial-inset": "inset 0 1px 0 rgb(var(--line) / 0.22)",
        "editorial-modal":
          "0 1px 0 rgb(var(--line) / 0.28), 0 32px 64px -36px rgb(var(--depth) / 0.18)",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
