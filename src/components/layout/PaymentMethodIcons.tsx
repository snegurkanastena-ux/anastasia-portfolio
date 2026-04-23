"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badge =
  "inline-flex h-8 items-center gap-1.5 rounded-md border border-border/20 bg-card/80 px-2.5 text-[0.7rem] font-semibold tracking-wide text-foreground/90";

function VisaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 16" aria-hidden>
      <text x="0" y="13" fill="currentColor" fontFamily="ui-sans-serif,system-ui,sans-serif" fontSize="14" fontWeight="800" letterSpacing="0.08em">VISA</text>
    </svg>
  );
}

function McIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 20" aria-hidden>
      <circle cx="11" cy="10" r="8" fill="#EB001B" opacity="0.75" />
      <circle cx="21" cy="10" r="8" fill="#F79E1B" opacity="0.75" />
    </svg>
  );
}

function MirIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 16" aria-hidden>
      <path fill="currentColor" opacity="0.85" d="M2 2h6l3 8 3-8h6v12h-4V6l-3.5 8h-3L6 6v8H2V2zm20 0h5c3.5 0 5.5 1.8 5.5 4.5S30.5 11 27 11h-1.5v3H20V2z" />
    </svg>
  );
}

function CashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="4" width="16" height="12" rx="2" />
      <circle cx="10" cy="10" r="3" />
      <path d="M5 7.5v0M15 12.5v0" />
    </svg>
  );
}

export function PaymentMethodIcons({ className, ...rest }: { className?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)} {...rest}>
      <span className={badge}><CashIcon className="h-4 w-4" />Наличные</span>
      <span className={badge}><MirIcon className="h-3.5 w-7" />Мир</span>
      <span className={badge}><VisaIcon className="h-3 w-8" /></span>
      <span className={badge}><McIcon className="h-4 w-6" /></span>
      <span className={badge}>Яндекс.Сплит</span>
      <span className={badge}>Долями</span>
      <span className={badge}>Рассрочка ОТП</span>
    </div>
  );
}
