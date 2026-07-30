"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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
        transformationCoach: {
          title: t("portfolioPage.transformationCoachTitle"),
          intro: t("portfolioPage.transformationCoachIntro"),
          task: t("portfolioPage.transformationCoachTask"),
          done: t("portfolioPage.transformationCoachDone"),
          result: t("portfolioPage.transformationCoachResult"),
          trust: t("portfolioPage.transformationCoachTrust"),
        },
        openclawKuzya: {
          title: t("portfolioPage.openclawKuzyaTitle"),
          intro: t("portfolioPage.openclawKuzyaIntro"),
          task: t("portfolioPage.openclawKuzyaTask"),
          done: t("portfolioPage.openclawKuzyaDone"),
          result: t("portfolioPage.openclawKuzyaResult"),
          trust: t("portfolioPage.openclawKuzyaTrust"),
        },
        businessStickers: {
          title: t("portfolioPage.businessStickersTitle"),
          intro: t("portfolioPage.businessStickersIntro"),
          task: t("portfolioPage.businessStickersTask"),
          done: t("portfolioPage.businessStickersDone"),
          result: t("portfolioPage.businessStickersResult"),
          trust: t("portfolioPage.businessStickersTrust"),
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
  const selectedProject = openProject ? PROJECT_CASES.find((project) => project.id === openProject) : null;
  const selectedCopy = selectedProject ? copy[selectedProject.id] : null;
  const labelClass = "text-editorial-label font-semibold tracking-wide text-muted";
  const blockClass = "mt-1.5 text-editorial-sm font-medium leading-snug text-foreground sm:text-editorial-base sm:leading-snug";
  const closeLabel = locale === "ru" ? "Закрыть" : "Close";

  useEffect(() => {
    if (!openProject) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openProject]);

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
          className="mt-12 grid auto-rows-fr grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7"
          variants={listContainer(staggerLists)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-6% 0px" }}
        >
          {PROJECT_CASES.map((project) => {
            const c = copy[project.id];
            return (
              <motion.article key={project.id} variants={listItem} className={`group flex min-h-full flex-col ${cardMediaFrame}`}>
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-muted-surface/40">
                  <Image
                    src={project.coverSrc}
                    alt={c.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
                  <h2 className="heading-subsection text-pretty">{c.title}</h2>
                  <p className="mt-1.5 text-editorial-sm leading-snug text-muted sm:text-editorial-base">{c.intro}</p>
                  <button
                    type="button"
                    onClick={() => setOpenProject(project.id)}
                    className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {t("portfolioPage.ctaViewProject")}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {selectedProject && selectedCopy ? (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/92 px-3 py-4 backdrop-blur-xl sm:px-5 sm:py-7"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-case-title"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setOpenProject(null);
              }
            }}
          >
            <div className="relative flex max-h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-lg border border-border/25 bg-card shadow-[0_24px_90px_rgb(var(--foreground)/0.28)] sm:max-h-[calc(100dvh-3.5rem)]">
              <div className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b border-border/20 bg-card/95 px-4 py-3 backdrop-blur sm:px-6">
                <div className="min-w-0">
                  <p className="text-editorial-label font-semibold tracking-wide text-primary">{t("portfolioPage.ctaViewProject")}</p>
                  <h2 id="portfolio-case-title" className="heading-subsection mt-1 text-pretty">{selectedCopy.title}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenProject(null)}
                  aria-label={closeLabel}
                  className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-border/25 bg-background/80 px-4 text-sm font-semibold text-foreground backdrop-blur transition-colors duration-200 hover:bg-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {closeLabel}
                </button>
              </div>
              <div className="min-h-0 overflow-y-auto">
                <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-7">
                  <div className="min-w-0">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/20 bg-muted-surface/40">
                      <Image
                        src={selectedProject.coverSrc}
                        alt={selectedCopy.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 44vw"
                      />
                    </div>
                    {"screenshots" in selectedProject ? (
                      <div className="mt-4 flex snap-x gap-4 overflow-x-auto pb-3">
                        {selectedProject.screenshots.map((src, index) => (
                          <figure key={src} className="min-w-[min(86vw,520px)] snap-start">
                            <div className="relative h-[min(72vh,620px)] overflow-hidden rounded-lg border border-border/20 bg-muted-surface/40 shadow-[0_14px_32px_rgb(var(--foreground)/0.12)]">
                              <Image
                                src={src}
                                alt={selectedProject.id === "taskplanner" ? t(index === 0 ? "portfolioPage.taskplannerScreenshotHomeAlt" : "portfolioPage.taskplannerScreenshotCalendarAlt") : `${selectedCopy.title}: screen ${index + 1}`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 86vw, 520px"
                              />
                            </div>
                            {selectedProject.id === "taskplanner" ? (
                              <figcaption className="mt-2 text-editorial-caption font-medium leading-tight text-muted">
                                {t(index === 0 ? "portfolioPage.taskplannerScreenshotHomeCaption" : "portfolioPage.taskplannerScreenshotCalendarCaption")}
                              </figcaption>
                            ) : null}
                          </figure>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex min-w-0 flex-col gap-4">
                    <p className="text-editorial-base leading-snug text-muted">{selectedCopy.intro}</p>
                    <div>
                      <p className={labelClass}>{t("portfolioPage.panelTaskLabel")}</p>
                      <p className={blockClass}>{selectedCopy.task}</p>
                    </div>
                    <div>
                      <p className={labelClass}>{t("portfolioPage.panelDoneLabel")}</p>
                      <p className={blockClass}>{selectedCopy.done}</p>
                    </div>
                    <div>
                      <p className={labelClass}>{t("portfolioPage.panelEffectLabel")}</p>
                      <p className={blockClass}>{selectedCopy.result}</p>
                    </div>
                    <div className="rounded-lg border border-primary/25 bg-primary/8 p-3">
                      <p className="text-editorial-label font-semibold tracking-wide text-primary">{t("portfolioPage.panelTrustLabel")}</p>
                      <p className="mt-1.5 text-editorial-sm font-medium leading-snug text-foreground">{selectedCopy.trust}</p>
                    </div>
                    {"href" in selectedProject ? (
                      <a
                        href={selectedProject.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 w-full items-center justify-center rounded-lg border border-primary/35 bg-primary/8 px-5 text-sm font-semibold text-primary transition-colors duration-200 hover:border-primary hover:bg-primary/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-fit"
                      >
                        {selectedProject.id === "taskplanner" ? t("portfolioPage.ctaOpenRuStore") : t("portfolioPage.ctaOpenProject")}
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
