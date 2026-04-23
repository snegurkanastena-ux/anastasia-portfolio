import ru from "@/messages/ru.json";
import en from "@/messages/en.json";

export type Locale = "ru" | "en";

export const locales: Locale[] = ["ru", "en"];

export const dictionaries: Record<Locale, typeof ru> = {
  ru,
  en,
};

/** Пути вида `home.hero.title` — словари растут без ручного union-типа. */
export type MessageKey = string;

function getNested(obj: unknown, path: string): string | undefined {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);

  return typeof value === "string" ? value : undefined;
}

export function translate(locale: Locale, key: MessageKey): string {
  const dict = dictionaries[locale];
  return getNested(dict, key) ?? key;
}
