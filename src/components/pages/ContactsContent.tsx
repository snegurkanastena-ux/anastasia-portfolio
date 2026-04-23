"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ContactChoiceTrigger } from "@/components/brand/ContactChoiceModal";
import { primaryCtaClassNames } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TextType } from "@/components/ui/TextType";
import { useLocale } from "@/contexts/LocaleContext";
import { transitionBase } from "@/lib/motion";
import {
  CONTACT_FULL_NAME,
  CONTACT_INN,
  CONTACT_STATUS,
  EMAIL_CONTACT,
  TELEGRAM_BOT_URL,
  TELEGRAM_CHANNEL_URL,
  VK_URL,
} from "@/lib/site";

const panel = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: transitionBase,
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-border/20 py-4 sm:grid-cols-[minmax(0,0.35fr)_1fr] sm:items-center sm:gap-6">
      <dt className="text-editorial-label font-semibold tracking-wide text-muted">{label}</dt>
      <dd className="text-editorial-base text-foreground">{children}</dd>
    </div>
  );
}

export function ContactsContent() {
  const { t, locale } = useLocale();
  const reduceMotion = useReducedMotion();

  const heroTitle = reduceMotion ? (
    <h1 className="heading-hero mt-5 max-w-[22ch] sm:max-w-[28ch]" aria-label={t("contactsPage.title")}>{t("contactsPage.title")}</h1>
  ) : (
    <h1 className="heading-hero mt-5 max-w-[22ch] sm:max-w-[28ch]" aria-label={t("contactsPage.title")}>
      <TextType
        key={`${locale}-contacts-h1`}
        text={t("contactsPage.title")}
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
    <Container className="pb-section-lg pt-section-sm sm:pt-section-md">
      <header className="relative rounded-lg border border-border/20 bg-card p-6 transition-[border-color,opacity] duration-200 ease-out hover:border-border/35 hover:opacity-[0.98] sm:p-8">
        <p className="eyebrow">{t("contactsPage.heroEyebrow")}</p>
        {heroTitle}
        <p className="mt-7 max-w-prose border-l-4 border-primary pl-5 text-editorial-body-lg font-medium leading-snug text-foreground">
          {t("contactsPage.intro")}
        </p>
        <div className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`${primaryCtaClassNames("lg")} h-12 min-h-[3rem] flex-1 px-6 text-editorial-sm`}
          >
            {t("contactDialog.telegram")}
          </a>
          <ContactChoiceTrigger className="inline-flex h-12 min-h-[3rem] flex-1 items-center justify-center rounded-lg border border-border/20 bg-transparent px-6 text-editorial-sm font-semibold text-foreground transition-[border-color,opacity] duration-200 hover:border-border/35 hover:opacity-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            {t("contactDialog.title")}
          </ContactChoiceTrigger>
        </div>
      </header>

      <div className="mt-12 sm:mt-14">
        <h2 className="text-editorial-label font-semibold tracking-wide text-muted">
          {t("contactsPage.legalBlockTitle")}
        </h2>
      </div>

      <motion.div {...panel} className="mt-6 rounded-lg border border-border/20 bg-card p-6 sm:p-8">
        <dl>
          <Row label={t("contactsPage.nameLabel")}>{CONTACT_FULL_NAME}</Row>
          <Row label={t("contactsPage.emailLabel")}>
            <ContactChoiceTrigger className="text-accent underline-offset-4 transition-opacity hover:underline hover:opacity-90">
              {EMAIL_CONTACT}
            </ContactChoiceTrigger>
          </Row>
          <Row label={t("contactsPage.tgChannelLabel")}>
            <a
              className="text-accent underline-offset-4 transition-opacity hover:underline hover:opacity-90"
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {TELEGRAM_CHANNEL_URL.replace(/^https?:\/\//, "")}
            </a>
          </Row>
          <Row label={t("contactsPage.tgBotLabel")}>
            <a
              className="text-accent underline-offset-4 transition-opacity hover:underline hover:opacity-90"
              href={TELEGRAM_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {TELEGRAM_BOT_URL.replace(/^https?:\/\//, "")}
            </a>
          </Row>
          <Row label={t("contactsPage.vkLabel")}>
            <a
              className="text-accent underline-offset-4 transition-opacity hover:underline hover:opacity-90"
              href={VK_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {VK_URL.replace(/^https?:\/\//, "")}
            </a>
          </Row>
          <Row label={t("contactsPage.statusLabel")}>{CONTACT_STATUS}</Row>
          <Row label={t("contactsPage.innLabel")}>{CONTACT_INN}</Row>
        </dl>
      </motion.div>
    </Container>
  );
}
