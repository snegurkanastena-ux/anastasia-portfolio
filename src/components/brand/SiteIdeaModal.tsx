"use client";

import { useCallback, useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { Button, primaryCtaClassNames } from "@/components/ui/Button";
import { ContactChoicePanel } from "@/components/brand/ContactChoiceModal";

type IdeaKey = "launch" | "expert" | "portfolio" | "promo" | "app" | "custom";

const IDEAS: IdeaKey[] = ["launch", "expert", "portfolio", "promo", "app", "custom"];

function SiteIdeaPanel({
  onClose,
  onDiscuss,
}: {
  onClose: () => void;
  onDiscuss: (message: string) => void;
}) {
  const { t } = useLocale();
  const titleId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[190] flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-ink/28 backdrop-blur-[2px] transition-opacity duration-editorial ease-editorial dark:bg-black/45"
        aria-label={t("contactDialog.close")}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 max-h-[min(92vh,760px)] w-full max-w-4xl overflow-y-auto rounded-editorial-lg border border-line/55 bg-elevated p-5 shadow-editorial-modal dark:border-line/38 dark:bg-elevated dark:shadow-editorial-dark sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="eyebrow">{t("ideaDialog.eyebrow")}</p>
            <h2 id={titleId} className="heading-subsection mt-2">
              {t("ideaDialog.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-editorial-base leading-relaxed text-muted">
              {t("ideaDialog.subtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-editorial-md border border-line/65 text-muted transition-[border-color,color,background-color] duration-editorial ease-editorial hover:border-line hover:bg-surface/45 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:bg-surface/22"
            aria-label={t("contactDialog.close")}
          >
            ×
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {IDEAS.map((key) => {
            const title = t(`ideaDialog.${key}Title`);
            const firstScreen = t(`ideaDialog.${key}First`);
            const blocks = t(`ideaDialog.${key}Blocks`);
            const goal = t(`ideaDialog.${key}Goal`);
            const message = `${t("ideaDialog.requestGreeting")} ${title}\n\n${t("ideaDialog.firstScreenLabel")}: ${firstScreen}\n${t("ideaDialog.blocksLabel")}: ${blocks}\n${t("ideaDialog.goalLabel")}: ${goal}`;

            return (
              <article
                key={key}
                className="flex min-h-[15.5rem] flex-col rounded-lg border border-border/20 bg-card p-4 transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-primary/35 hover:shadow-[0_6px_28px_rgb(var(--primary)/0.18)]"
              >
                <h3 className="font-display text-[1.45rem] leading-tight text-[rgb(var(--heading))]">
                  {title}
                </h3>
                <dl className="mt-4 flex flex-1 flex-col gap-3 text-editorial-sm leading-snug">
                  <div>
                    <dt className="inline-flex rounded-sm bg-primary/10 px-1.5 py-0.5 text-editorial-label font-bold tracking-wide text-primary">
                      {t("ideaDialog.firstScreenLabel")}
                    </dt>
                    <dd className="mt-1.5 text-foreground">{firstScreen}</dd>
                  </div>
                  <div>
                    <dt className="inline-flex rounded-sm border border-primary/35 bg-primary/5 px-1.5 py-0.5 text-editorial-label font-bold tracking-wide text-primary">
                      {t("ideaDialog.blocksLabel")}
                    </dt>
                    <dd className="mt-1.5 text-foreground">{blocks}</dd>
                  </div>
                  <div>
                    <dt className="inline-flex rounded-sm border border-line/50 px-1.5 py-0.5 text-editorial-label font-bold tracking-wide text-muted">
                      {t("ideaDialog.goalLabel")}
                    </dt>
                    <dd className="mt-1.5 text-foreground">{goal}</dd>
                  </div>
                </dl>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="mt-4 w-full"
                  onClick={() => onDiscuss(message)}
                >
                  {t("ideaDialog.discussButton")}
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SiteIdeaTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [ideaOpen, setIdeaOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const closeIdea = useCallback(() => setIdeaOpen(false), []);
  const closeContact = useCallback(() => setContactMessage(null), []);
  const discussIdea = useCallback((message: string) => {
    setIdeaOpen(false);
    setContactMessage(message);
  }, []);

  return (
    <>
      <button
        type="button"
        className={className ?? primaryCtaClassNames("lg")}
        aria-haspopup="dialog"
        aria-expanded={ideaOpen || Boolean(contactMessage)}
        onClick={() => setIdeaOpen(true)}
      >
        {children}
      </button>
      {mounted && ideaOpen
        ? createPortal(
            <SiteIdeaPanel onClose={closeIdea} onDiscuss={discussIdea} />,
            document.body,
          )
        : null}
      {mounted && contactMessage
        ? createPortal(
            <ContactChoicePanel onClose={closeContact} initialMessage={contactMessage} />,
            document.body,
          )
        : null}
    </>
  );
}
