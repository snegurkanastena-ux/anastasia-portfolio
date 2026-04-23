"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/contexts/LocaleContext";
import { transitionFast, transitionPageOverlay } from "@/lib/motion";

const DURATION_MS = 320;

function transitionKeyForPath(pathname: string): string {
  if (pathname.startsWith("/portfolio")) return "transition.portfolio";
  if (pathname.startsWith("/services")) return "transition.services";
  if (pathname.startsWith("/contacts")) return "transition.contacts";
  return "transition.default";
}

function ChipmunkGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="24" cy="22" rx="14" ry="7" className="fill-ink/15" />
      <ellipse cx="24" cy="14" rx="12" ry="10" className="fill-ink/90 dark:fill-surface/95" />
      <circle cx="18" cy="13" r="2" className="fill-surface dark:fill-ink" />
      <circle cx="30" cy="13" r="2" className="fill-surface dark:fill-ink" />
      <path
        d="M8 10c2-4 6-6 10-5"
        className="stroke-ink/70 dark:stroke-surface/70"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M40 10c-2-4-6-6-10-5"
        className="stroke-ink/70 dark:stroke-surface/70"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M20 18c2 2 6 2 8 0"
        className="stroke-ink/50 dark:stroke-surface/50"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const prevPath = useRef<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [labelKey, setLabelKey] = useState("transition.default");

  useEffect(() => {
    if (prevPath.current === null) {
      prevPath.current = pathname;
      return;
    }

    if (prevPath.current === pathname) return;

    prevPath.current = pathname;

    if (reduceMotion) return;

    setLabelKey(transitionKeyForPath(pathname));
    setVisible(true);

    const id = window.setTimeout(() => setVisible(false), DURATION_MS);
    return () => window.clearTimeout(id);
  }, [pathname, reduceMotion]);

  return (
    <>
      {children}
      <AnimatePresence>
        {visible && !reduceMotion ? (
          <motion.div
            key={pathname + "-overlay"}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-ink/22 backdrop-blur-[2px] dark:bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitionPageOverlay}
          >
            <motion.div
              className="flex flex-col items-center gap-3 rounded-editorial-lg border border-line/50 bg-elevated/90 px-6 py-4 shadow-editorial-modal dark:border-line/40 dark:bg-elevated/88 dark:shadow-editorial-dark"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={transitionFast}
            >
              <div className="flex items-center justify-center opacity-90">
                <ChipmunkGlyph className="h-10 w-14" />
              </div>
              <p className="max-w-[16rem] text-center font-sans text-editorial-caption font-medium uppercase tracking-[0.18em] text-muted">
                {t(labelKey)}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
