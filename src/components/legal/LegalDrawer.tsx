"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useId } from "react";
import { createPortal } from "react-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { transitionBase, transitionFast } from "@/lib/motion";

export function LegalDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t } = useLocale();
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const handleOverlayClick = useCallback(() => onClose(), [onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="legal-overlay"
          className="fixed inset-0 z-[180] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transitionFast}
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/26 backdrop-blur-[2px] transition-opacity duration-editorial ease-editorial dark:bg-black/45"
            aria-label={t("contactDialog.close")}
            onClick={handleOverlayClick}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ...transitionBase }}
            className="relative z-10 flex h-full w-full max-w-lg flex-col border-l border-line/55 bg-elevated shadow-editorial-modal dark:border-line/40 dark:bg-elevated dark:shadow-editorial-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line/45 px-6 py-5 sm:px-8 dark:border-line/35">
              <div>
                <p className="text-editorial-label font-semibold uppercase text-muted">
                  {t("footer.offer")}
                </p>
                <h2
                  id={titleId}
                  className="heading-drawer-title mt-3"
                >
                  {t("offerPage.title")}
                </h2>
                <p className="mt-3 text-editorial-base text-muted">{t("offerPage.lead")}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-editorial-md border border-line/65 text-muted transition-[border-color,color,background-color] duration-editorial ease-editorial hover:border-line hover:bg-surface/40 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:bg-surface/22"
                aria-label={t("contactDialog.close")}
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              <nav
                className="flex flex-wrap gap-5 border-b border-line/40 pb-5 text-editorial-nav font-medium text-ink dark:border-line/30"
                aria-label={t("offerPage.tocLabel")}
              >
                <a
                  href="#legal-privacy"
                  className="underline-offset-[0.2rem] transition-opacity duration-editorial ease-editorial hover:opacity-75"
                >
                  {t("offerPage.privacyTitle")}
                </a>
                <a
                  href="#legal-offer"
                  className="underline-offset-[0.2rem] transition-opacity duration-editorial ease-editorial hover:opacity-75"
                >
                  {t("offerPage.offerTitle")}
                </a>
              </nav>
              <article className="mt-10 space-y-10 pb-10">
                <section id="legal-privacy" className="scroll-mt-6">
                  <h3 className="heading-doc">{t("offerPage.privacyTitle")}</h3>
                  <p className="mt-5 rounded-editorial-lg border border-dashed border-line/65 bg-surface/50 p-5 text-editorial-base leading-relaxed text-muted dark:bg-surface/28">
                    {t("offerPage.privacyPlaceholder")}
                  </p>
                </section>
                <section id="legal-offer" className="scroll-mt-6">
                  <h3 className="heading-doc">{t("offerPage.offerTitle")}</h3>
                  <p className="mt-5 rounded-editorial-lg border border-dashed border-line/65 bg-surface/50 p-5 text-editorial-base leading-relaxed text-muted dark:bg-surface/28">
                    {t("offerPage.offerPlaceholder")}
                  </p>
                </section>
              </article>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
