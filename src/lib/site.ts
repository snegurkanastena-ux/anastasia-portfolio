/**
 * Публичное имя в интерфейсе (не путать с юридическим ФИО `CONTACT_FULL_NAME`).
 * Должно совпадать с `brand.name` в `src/messages/ru.json` / `en.json`.
 */
export const BRAND_DISPLAY_NAME_RU = "Анастасия Мельникова";
export const BRAND_DISPLAY_NAME_EN = "Anastasia Melnikova";

/** Реальные внешние URL — не дублировать «плейсхолдерами» в UI. */
export const PAYMENT_URL = "https://neuroera.payform.ru";

export const TELEGRAM_BOT_URL = "https://t.me/Neuroeracall_bot";
export const TELEGRAM_CHANNEL_URL = "https://t.me/neiroeraMelnikova";
export const VK_URL = "https://vk.com/neuroera_melnikova";
export const EMAIL_CONTACT = "neuroera@yandex.com";

/** Явный mailto без query — как в ТЗ. */
export const MAILTO_CONTACT_URL = "mailto:neuroera@yandex.com";

/** Юр. и контактные данные — только как в ТЗ, не дублировать в переводах значения. */
export const CONTACT_FULL_NAME = "Мельникова Анастасия Викторовна";
export const CONTACT_STATUS = "самозанятая";
export const CONTACT_INN = "591111416790";

export const PROJECT_CASES = [
  {
    id: "melanomusic",
    href: "https://melanomusic.ru/",
    coverSrc:
      "https://api.microlink.io/?url=https%3A%2F%2Fmelanomusic.ru&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=960&viewport.deviceScaleFactor=1",
  },
  {
    id: "neiroera",
    href: "https://neiroera.com/",
    coverSrc:
      "https://api.microlink.io/?url=https%3A%2F%2Fneiroera.com&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=960&viewport.deviceScaleFactor=1",
  },
  {
    id: "songmuse",
    href: "https://song-muse-ai-89.lovable.app/",
    coverSrc:
      "https://api.microlink.io/?url=https%3A%2F%2Fsong-muse-ai-89.lovable.app%2F&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=960&viewport.deviceScaleFactor=1",
  },
  {
    id: "salieva",
    href: "https://snegurkanastena-ux.github.io/ekaterina-salieva-site/",
    coverSrc:
      "https://api.microlink.io/?url=https%3A%2F%2Fsnegurkanastena-ux.github.io%2Fekaterina-salieva-site%2F&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=960&viewport.deviceScaleFactor=1",
  },
  {
    id: "runcoffee",
    href: "https://snegurkanastena-ux.github.io/run-coffee-demo/",
    coverSrc:
      "https://api.microlink.io/?url=https%3A%2F%2Fsnegurkanastena-ux.github.io%2Frun-coffee-demo%2F&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=960&viewport.deviceScaleFactor=1",
  },
  {
    id: "taskplanner",
    coverSrc: "/images/projects/taskplanner.svg",
  },
  {
    id: "reportapp",
    coverSrc: "/images/projects/reportapp.svg",
  },
] as const;

export type ProjectCaseId = (typeof PROJECT_CASES)[number]["id"];
