"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SiteIdeaTrigger } from "@/components/brand/SiteIdeaModal";
import { Container } from "@/components/ui/Container";
import { HeadingTextType } from "@/components/ui/HeadingTextType";
import { primaryCtaClassNames, secondaryCtaClassNames } from "@/components/ui/Button";
import { TextType } from "@/components/ui/TextType";
import { useLocale } from "@/contexts/LocaleContext";
import { transitionBase } from "@/lib/motion";

const sectionMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8% 0px" },
  transition: transitionBase,
};

const listContainer = (stagger: boolean) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger ? 0.055 : 0 } },
});

const listItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
};

const cardSurface =
  "rounded-lg border border-border/20 bg-card/90 p-5 transition-[background-color,border-color,opacity,transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:border-primary/25 hover:bg-card hover:shadow-[0_10px_40px_rgb(var(--depth)/0.18)] sm:p-6";

const labelBaseClass =
  "inline-flex w-fit items-center rounded-lg border border-[rgb(var(--foreground)/0.24)] bg-[rgb(var(--background)/0.55)] px-3 py-1.5 text-editorial-sm font-semibold leading-none text-[rgb(var(--heading))] shadow-[inset_0_0_0_1px_rgb(var(--rim)/0.55)]";
const priceBadgeClass =
  "inline-flex min-w-[8.5rem] flex-col items-end justify-center rounded-lg border border-transparent bg-primary px-3.5 py-2 text-primary-foreground shadow-sm shadow-black/10";

export function ServicesContent() {
  const { t, locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const staggerLists = !reduceMotion;

  const items = [
    { title: t("servicesPage.s1"), price: t("servicesPage.s1Price"), when: t("servicesPage.s1When"), result: t("servicesPage.s1Result") },
    { title: t("servicesPage.s2"), price: t("servicesPage.s2Price"), when: t("servicesPage.s2When"), result: t("servicesPage.s2Result") },
    { title: t("servicesPage.s3"), price: t("servicesPage.s3Price"), when: t("servicesPage.s3When"), result: t("servicesPage.s3Result") },
    { title: t("servicesPage.s4"), price: t("servicesPage.s4Price"), when: t("servicesPage.s4When"), result: t("servicesPage.s4Result") },
    { title: t("servicesPage.s5"), price: t("servicesPage.s5Price"), when: t("servicesPage.s5When"), result: t("servicesPage.s5Result") },
    { title: t("servicesPage.s6"), price: t("servicesPage.s6Price"), when: t("servicesPage.s6When"), result: t("servicesPage.s6Result") },
    { title: t("servicesPage.s7"), price: t("servicesPage.s7Price"), when: t("servicesPage.s7When"), result: t("servicesPage.s7Result") },
    { title: t("servicesPage.s8"), price: t("servicesPage.s8Price"), when: t("servicesPage.s8When"), result: t("servicesPage.s8Result") },
    { title: t("servicesPage.s9"), price: t("servicesPage.s9Price"), when: t("servicesPage.s9When"), result: t("servicesPage.s9Result") },
  ];

  const processSteps = [
    { title: t("servicesPage.process1Title"), text: t("servicesPage.process1Text") },
    { title: t("servicesPage.process2Title"), text: t("servicesPage.process2Text") },
    { title: t("servicesPage.process3Title"), text: t("servicesPage.process3Text") },
  ];

  const closingPoints = [t("servicesPage.closingPoint1"), t("servicesPage.closingPoint2"), t("servicesPage.closingPoint3")];

  const heroTitle = reduceMotion ? (
    <h1 className="heading-hero mt-5 max-w-[min(100%,52ch)]" aria-label={t("servicesPage.title")}>{t("servicesPage.title")}</h1>
  ) : (
    <h1 className="heading-hero mt-5 max-w-[min(100%,52ch)]" aria-label={t("servicesPage.title")}>
      <TextType
        key={`${locale}-services-h1`}
        text={t("servicesPage.title")}
        loop={false}
        allowDelete={false}
        startOnVisible={false}
        typingSpeed={36}
        pauseDuration={0}
        showCursor
        hideCursorAfterMs={2000}
        cursorCharacter="_"
        cursorClassName="text-[rgb(var(--heading))] opacity-80"
        className="font-display text-editorial-hero font-normal leading-[1.04] tracking-[-0.038em]"
      />
    </h1>
  );

  return (
    <Container className="relative pb-section-lg pt-section-sm sm:pb-section-xl sm:pt-section-md">
      <header className="relative max-w-3xl">
        {heroTitle}
        <p className="mt-5 max-w-2xl border-l-4 border-primary pl-5 text-editorial-body-lg font-medium leading-snug text-foreground">
          {t("servicesPage.lead")}
        </p>
      </header>

      <motion.div
        className="relative mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3"
        variants={listContainer(staggerLists)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-6% 0px" }}
      >
        {items.map((item, i) => (
          <motion.article key={item.title} variants={listItem} className={`flex flex-col ${cardSurface}`}>
            <div className="flex items-start justify-between gap-5">
              <span className="font-display text-editorial-display-sm leading-none text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div className={priceBadgeClass}>
                <p className="text-editorial-label font-semibold opacity-85">{t("servicesPage.priceLabel")}</p>
                <p className="mt-1 font-display text-[1.28rem] leading-none sm:text-[1.45rem]">{item.price}</p>
              </div>
            </div>
            <h2 className="heading-subsection mt-6">{item.title}</h2>
            <div className="mt-5 flex flex-1 flex-col gap-4 border-t border-border/15 pt-5">
              <div>
                <p className={labelBaseClass}>{t("servicesPage.panelWhenLabel")}</p>
                <p className="mt-1.5 text-editorial-sm font-medium leading-snug text-foreground sm:text-editorial-base">{item.when}</p>
              </div>
              <div>
                <p className={labelBaseClass}>{t("servicesPage.panelResultLabel")}</p>
                <p className="mt-1.5 text-editorial-sm font-medium leading-snug text-foreground sm:text-editorial-base">{item.result}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      <motion.p
        className="mt-5 max-w-3xl text-editorial-sm font-medium leading-snug text-muted sm:text-editorial-base"
        {...sectionMotion}
      >
        {t("servicesPage.pricingNote")}
      </motion.p>

      <motion.section className="mt-10 sm:mt-12" {...sectionMotion}>
        <HeadingTextType as="h2" text={t("servicesPage.processTitle")} typingSpeed={88} className="heading-section max-w-[18ch]" />
        <motion.ol
          className="mt-7 grid gap-4 lg:grid-cols-3"
          variants={listContainer(staggerLists)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6% 0px" }}
        >
          {processSteps.map((step, i) => (
            <motion.li key={step.title} variants={listItem} className={cardSurface}>
              <span className="text-editorial-label font-bold text-primary/90">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="heading-subsection mt-3">{step.title}</h3>
              <p className="mt-2 text-editorial-base leading-relaxed text-foreground">{step.text}</p>
            </motion.li>
          ))}
        </motion.ol>
      </motion.section>

      <motion.section className={`relative mt-10 sm:mt-12 ${cardSurface}`} {...sectionMotion}>
        <HeadingTextType as="h2" text={t("servicesPage.valueTitle")} typingSpeed={86} className="heading-section" />
        <p className="mt-5 max-w-prose border-l-4 border-primary pl-6 text-editorial-body-lg font-medium leading-snug text-foreground">
          {t("servicesPage.valueBody")}
        </p>
      </motion.section>

      <motion.section
        {...sectionMotion}
        className="relative mt-10 rounded-lg border border-border/20 bg-[rgb(var(--void))] p-5 text-foreground transition-[border-color,opacity] duration-200 ease-out hover:border-border/35 sm:mt-12 sm:p-8"
      >
        <HeadingTextType as="h2" text={t("servicesPage.closingTitle")} typingSpeed={80} className="heading-invert" />
        <ul className="mt-4 max-w-prose list-disc space-y-2 pl-5 text-editorial-base font-medium leading-snug opacity-90 marker:text-primary">
          {closingPoints.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <SiteIdeaTrigger className={`${primaryCtaClassNames("lg")} min-w-[12rem]`}>{t("servicesPage.ctaButton")}</SiteIdeaTrigger>
          <Link
            href="/portfolio"
            className={`${secondaryCtaClassNames("lg")} h-11 min-w-[10rem] px-6 text-editorial-sm`}
          >
            {t("cta.works")}
          </Link>
        </div>
      </motion.section>
    </Container>
  );
}
