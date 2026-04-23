"use client";

import { useState } from "react";
import { LegalDrawer } from "@/components/legal/LegalDrawer";
import { FooterChannelStrip } from "@/components/layout/FooterChannelStrip";
import { FooterPaymentStrip } from "@/components/layout/FooterPaymentStrip";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLocale } from "@/contexts/LocaleContext";

const zoneLabel =
  "text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted sm:text-editorial-label";

export function SiteFooter() {
  const { t } = useLocale();
  const [legalOpen, setLegalOpen] = useState(false);

  return (
    <>
      <LegalDrawer open={legalOpen} onClose={() => setLegalOpen(false)} />
      <footer className="mt-auto border-t border-border/20 bg-plate/55 py-8 dark:bg-plate/45 sm:py-9">
        <Container>
          <div className="rounded-lg border border-border/20 bg-elevated/25 p-5 shadow-none dark:bg-elevated/15 sm:p-6 lg:p-7">
            <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
              {/* ── ОФЕРТА ── */}
              <div className="flex flex-col">
                <p className={zoneLabel}>{t("footer.offer")}</p>
                <p className="mt-2 max-w-xs text-editorial-sm leading-relaxed text-muted">{t("footer.offerLead")}</p>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  className="mt-4 w-full max-w-[14rem]"
                  onClick={() => setLegalOpen(true)}
                >
                  {t("footer.offerButton")}
                </Button>
                <p className="mt-3 max-w-xs text-[0.65rem] leading-snug text-muted/60">
                  {t("footer.cookie")}
                </p>
              </div>

              {/* ── ОПЛАТА ── */}
              <div className="flex flex-col border-t border-border/20 pt-8 lg:border-l lg:border-t-0 lg:border-border/20 lg:pl-6 lg:pt-0">
                <p className={zoneLabel}>{t("footer.payment")}</p>
                <p className="mt-2 max-w-xs text-editorial-sm leading-relaxed text-muted">{t("footer.paymentLead")}</p>
                <FooterPaymentStrip />
              </div>

              {/* ── СВЯЗЬ ── */}
              <div className="flex flex-col border-t border-border/20 pt-8 lg:border-l lg:border-t-0 lg:border-border/20 lg:pl-6 lg:pt-0">
                <p className={zoneLabel}>{t("footer.connectEyebrow")}</p>
                <FooterChannelStrip />
              </div>
            </div>

            <p className="mt-6 border-t border-border/20 pt-4 text-center text-[0.65rem] leading-snug text-muted/70 sm:text-left">
              {t("footer.copyright")}
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}
