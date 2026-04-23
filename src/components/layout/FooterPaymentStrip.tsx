"use client";

import { PAYMENT_URL } from "@/lib/site";
import { useLocale } from "@/contexts/LocaleContext";
import { PaymentMethodIcons } from "@/components/layout/PaymentMethodIcons";
import { primaryCtaClassNames } from "@/components/ui/Button";

export function FooterPaymentStrip() {
  const { t } = useLocale();

  return (
    <div className="mt-4 space-y-3">
      <PaymentMethodIcons aria-label={t("footer.paymentMethodsAria")} />
      <a
        href={PAYMENT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${primaryCtaClassNames("md")} inline-flex h-10 w-full max-w-[14rem] items-center justify-center px-5 text-editorial-sm`}
      >
        {t("paymentPage.cta")}
      </a>
    </div>
  );
}
