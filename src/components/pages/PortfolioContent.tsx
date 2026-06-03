"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Container } from "@/components/ui/Container";
import { TextType } from "@/components/ui/TextType";
import { useLocale } from "@/contexts/LocaleContext";
import { transitionBase } from "@/lib/motion";
import { PROJECT_CASES, type ProjectCaseId } from "@/lib/site";

const listContainer = (stagger: boolean) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger ? 0.055 : 0 } },
});

const listItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: transitionBase },
};

const cardMediaFrame =
  "flex h-full flex-col overflow-hidden rounded-lg border border-border/20 bg-card transition-[border-color,opacity,transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_6px_32px_rgb(var(--primary)/0.22),0_0_0_1px_rgb(var(--primary)/0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

type CaseCopy = {
  title: string;
  intro: string;
  task: string;
  done: string;
  result: string;
  trust: string;
};

export function PortfolioContent() {
  const { t, locale } = useLocale();
  const reduceMotion = useReducedMotion();
  const staggerLists = !reduceMotion;
  const [openProject, setOpenProject] = useState<ProjectCaseId | null>(null);

  const copy = useMemo(
    () =>
      ({
        melanomusic: {
          title: t("portfolioPage.melanomusicTitle"),
          intro: t("portfolioPage.melanomusicIntro"),
          task: t("portfolioPage.melanomusicTask"),
          done: t("portfolioPage.melanomusicDone"),
          result: t("portfolioPage.melanomusicResult"),
          trust: t("portfolioPage.melanomusicTrust"),
        },
        neiroera: {
          title: t("portfolioPage.neiroTitle"),
          intro: t("portfolioPage.neiroIntro"),
          task: t("portfolioPage.neiroTask"),
          done: t("portfolioPage.neiroDone"),
          result: t("portfolioPage.neiroResult"),
          trust: t("portfolioPage.neiroTrust"),
        },
        songmuse: {
          title: t("portfolioPage.songmuseTitle"),
          intro: t("portfolioPage.songmuseIntro"),
          task: t("portfolioPage.songmuseTask"),
          done: t("portfolioPage.songmuseDone"),
          result: t("portfolioPage.songmuseResult"),
          trust: t("portfolioPage.songmuseTrust"),
        },
        salieva: {
          title: t("portfolioPage.salievaTitle"),
          intro: t("portfolioPage.salievaIntro"),
          task: t("portfolioPage.salievaTask"),
          done: t("portfolioPage.salievaDone"),
          result: t("portfolioPage.salievaResult"),
          trust: t("portfolioPage.salievaTrust"),
        },
        runcoffee: {
          title: t("portfolioPage.runcoffeeTitle"),
          intro: t("portfolioPage.runcoffeeIntro"),
          task: t("portfolioPage.runcoffeeTask"),
          done: t("portfolioPage.runcoffeeDone"),
          result: t("portfolioPage.runcoffeeResult"),
          trust: t("portfolioPage.runcoffeeTrust"),
        },
        rada: {
          title: t("portfolioPage.radaTitle"),
          intro: t("portfolioPage.radaIntro"),
          task: t("portfolioPage.radaTask"),
          done: t("portfolioPage.radaDone"),
          result: t("portfolioPage.radaResult"),
          trust: t("portfolioPage.radaTrust"),
        },
        t2academy: {
          title: t("portfolioPage.t2academyTitle"),
          intro: t("portfolioPage.t2academyIntro"),
          task: t("portfolioPage.t2academyTask"),
          done: t("portfolioPage.t2academyDone"),
          result: t("portfolioPage.t2academyResult"),
          trust: t("portfolioPage.t2academyTrust"),
        },
        taskplanner: {
          title: t("portfolioPage.taskplannerTitle"),
          intro: t("portfolioPage.taskplannerIntro"),
          task: t("portfolioPage.taskplannerTask"),
          done: t("portfolioPage.taskplannerDone"),
          result: t("portfolioPage.taskplannerResult"),
          trust: t("portfolioPage.taskplannerTrust"),
        },
        reportapp: {
          title: t("portfolioPage.reportappTitle"),
          intro: t("portfolioPage.reportappIntro"),
          task: t("portfolioPage.reportappTask"),
          done: t("portfolioPage.reportappDone"),
          result: t("portfolioPage.reportappResult"),
          trust: t("portfolioPage.reportappTrust"),
        },
      }) satisfies Record<ProjectCaseId, CaseCopy>,
    [t],
  );

  const pageTitle = reduceMotion ? (
    <h1 className="heading-hero max-w-[min(100%,52ch)]" aria-label={t("portfolioPage.title")}>{t("portfolioPage.title")}</h1>
  ) : (
    <h1 className="heading-hero max-w-[min(100%,52ch)]" aria-label={t("portfolioPage.title")}>
      <TextType
        key={`${locale}-portfolio-h1`}
        text={t("portfolioPage.title")}
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
    <div className="relative min-h-full overflow-x-hidden pb-section-lg pt-section-sm sm:pt-section-md">
      <Container className="relative z-10">
        <header className="max-w-2xl">
          {pageTitle}
          <p className="mt-6 max-w-prose border-l-4 border-primary pl-5 text-editorial-body-lg font-medium leading-relaxed text-foreground">
            {t("portfolioPage.lead")}
          </p>
        </header>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7"
          variants={listContainer(staggerLists)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6% 0px" }}
        >
          {PROJECT_CASES.map((project) => {
            const c = copy[project.id];
            const labelClass = "text-editorial-label font-semibold tracking-wide text-muted";
            const blockClass = "mt-1.5 text-editorial-sm font-medium leading-snug text-foreground sm:text-editorial-base sm:leading-snug";
            const isOpen = openProject === project.id;
            return (
              <motion.article key={project.id} variants={listItem} className={`group flex h-full flex-col ${cardMediaFrame}`}>
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted-surface/40">
                  <Image
                    src={project.coverSrc}
                    alt={c.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h2 className="heading-subsection text-pretty">{c.title}</h2>
                  <p className="mt-1.5 text-editorial-sm leading-snug text-muted sm:text-editorial-base">{c.intro}</p>
                  {isOpen ? (
                    <div className="mt-4 flex flex-col gap-3.5 border-t border-border/15 pt-4">
                      <div>
                        <p className={labelClass}>{t("portfolioPage.panelTaskLabel")}</p>
                        <p className={blockClass}>{c.task}</p>
                      </div>
                      <div>
                        <p className={labelClass}>{t("portfolioPage.panelDoneLabel")}</p>
                        <p className={blockClass}>{c.done}</p>
                      </div>
                      <div>
                        <p className={labelClass}>{t("portfolioPage.panelEffectLabel")}</p>
                        <p className={blockClass}>{c.result}</p>
                      </div>
                      <p className="border-t border-border/15 pt-3 text-editorial-caption font-medium leading-snug text-muted">{c.trust}</p>
                      {"screenshots" in project ? (
                        <div className="grid grid-cols-2 gap-3">
                          {project.screenshots.map((src, index) => (
                            <figure key={src} className="min-w-0">
                              <div className="relative aspect-[591/1280] overflow-hidden rounded-lg border border-border/20 bg-muted-surface/40 shadow-[0_14px_32px_rgb(var(--foreground)/0.12)]">
                                <Image
                                  src={src}
                                  alt={t(index === 0 ? "portfolioPage.taskplannerScreenshotHomeAlt" : "portfolioPage.taskplannerScreenshotCalendarAlt")}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 640px) 42vw, 150px"
                                />
                              </div>
                              <figcaption className="mt-2 text-editorial-caption font-medium leading-tight text-muted">
                                {t(index === 0 ? "portfolioPage.taskplannerScreenshotHomeCaption" : "portfolioPage.taskplannerScreenshotCalendarCaption")}
                              </figcaption>
                            </figure>
                          ))}
                        </div>
                      ) : null}
                      {"href" in project ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-primary/35 bg-primary/8 px-5 text-sm font-semibold text-primary transition-colors duration-200 hover:border-primary hover:bg-primary/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          {t("portfolioPage.ctaOpenProject")}
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setOpenProject(isOpen ? null : project.id)}
                    aria-expanded={isOpen}
                    className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {isOpen ? t("portfolioPage.ctaCollapseDetails") : t("portfolioPage.ctaViewProject")}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </div>
  );
}
