"use client";

import Link from "next/link";
import { ContactChoiceTrigger } from "@/components/brand/ContactChoiceModal";
import { primaryCtaClassNames, secondaryCtaClassNames } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/contexts/LocaleContext";
import { SERVICE_PAGES, type ServiceSlug } from "@/lib/service-pages";

const scopeItems = ["structure", "design", "launch"] as const;
const questions = ["schedule", "content", "handoff"] as const;

export function ServiceDetailContent({ service }: { service: ServiceSlug }) {
  const { t } = useLocale();
  const page = SERVICE_PAGES[service];
  const copy = (key: string) => t("serviceDetails." + service + "." + key);
  const details = (key: string) => t("serviceDetails." + key);

  return (
    <Container className="pb-section-lg pt-section-sm sm:pt-section-md">
      <header className="max-w-3xl">
        <Link className="text-editorial-sm font-semibold text-primary underline underline-offset-4" href="/services">
          {details("back")}
        </Link>
        <h1 className="heading-hero mt-4 text-balance">{copy("title")}</h1>
        <p className="mt-4 max-w-2xl text-editorial-body-lg leading-snug">{copy("intro")}</p>
        <p className="mt-5 font-display text-editorial-display-sm text-primary">{t(page.priceKey)}</p>
        <ContactChoiceTrigger className={primaryCtaClassNames("lg") + " mt-5 w-full sm:w-auto"} initialMessage={copy("message")}>
          {copy("contact")}
        </ContactChoiceTrigger>
      </header>

      <section className="mt-10 border-t border-border/20 pt-8 sm:mt-12" aria-labelledby="scope-title">
        <h2 id="scope-title" className="heading-section">{details("scopeTitle")}</h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {scopeItems.map((item) => (
            <li key={item} className="rounded-lg border border-border/25 bg-card p-5">
              <h3 className="heading-subsection">{details(item)}</h3>
              <p className="mt-2 text-editorial-base leading-relaxed">{copy(item)}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-lg border border-border/25 bg-card p-5 sm:p-7" aria-labelledby="example-title">
        <h2 id="example-title" className="heading-subsection">{t(page.caseTitleKey)}</h2>
        <p className="mt-2 max-w-2xl text-editorial-base leading-relaxed">{copy("caseSummary")}</p>
        <Link className={secondaryCtaClassNames("md") + " mt-4"} href={"/portfolio#" + page.caseId}>
          {details("caseLink")}
        </Link>
      </section>

      <section className="mt-10 max-w-3xl sm:mt-12" aria-labelledby="questions-title">
        <h2 id="questions-title" className="heading-section">{details("faqTitle")}</h2>
        <div className="mt-4 divide-y divide-border/25 border-y border-border/25">
          {questions.map((question) => (
            <details key={question} className="py-4">
              <summary className="cursor-pointer text-editorial-base font-semibold">{details(question + "Question")}</summary>
              <p className="mt-2 text-editorial-base leading-relaxed">{copy(question)}</p>
            </details>
          ))}
        </div>
      </section>
    </Container>
  );
}
