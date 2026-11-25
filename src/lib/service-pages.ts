export const SERVICE_PAGES = {
  landing: {
    path: "/services/landing",
    priceKey: "servicesPage.s2Price",
    caseId: "runcoffee",
    caseTitleKey: "portfolioPage.runcoffeeTitle",
  },
  "expert-site": {
    path: "/services/expert-site",
    priceKey: "servicesPage.s3Price",
    caseId: "salieva",
    caseTitleKey: "portfolioPage.salievaTitle",
  },
} as const;

export type ServiceSlug = keyof typeof SERVICE_PAGES;

export function isServiceSlug(value: string): value is ServiceSlug {
  return Object.hasOwn(SERVICE_PAGES, value);
}
