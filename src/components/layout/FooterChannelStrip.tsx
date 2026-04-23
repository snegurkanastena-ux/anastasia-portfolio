"use client";

import {
  TELEGRAM_BOT_URL,
  TELEGRAM_CHANNEL_URL,
  VK_URL,
} from "@/lib/site";
import { ContactChoiceTrigger } from "@/components/brand/ContactChoiceModal";

function IconTg({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  );
}

function IconVk({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.523-2.049-1.714-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.462 2.303 4.623 2.896 4.623.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.253-1.406 2.15-3.574 2.15-3.574.17-.305.44-.491.814-.491h1.744c.525 0 .644.27.525.643-.203.966-2.15 3.066-2.15 3.066-.407.542-.542.78-.407 1.033 0 .186.407.847.78 1.355.78 1.118 1.033 2.015 1.033 2.354 0 .186-.102.373-.593.373z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4V6zm0 0l8 6 8-6" />
    </svg>
  );
}

function IconMax({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.5 5.5h3v3.75L16 8v8l-2.5-3.25V16.5h-3v-9z" opacity="0.85" />
    </svg>
  );
}

const btnPrimary =
  "inline-flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const btnSecondary =
  "inline-flex h-9 items-center gap-2 rounded-lg border border-border/25 bg-transparent px-4 text-sm font-semibold text-foreground transition-[border-color,background-color] duration-200 hover:border-border/45 hover:bg-border/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

const btnVk =
  "inline-flex h-9 items-center gap-2 rounded-lg bg-[#2787F5] px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1f6fd1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2787F5]";

const btnTgChannel =
  "inline-flex h-9 items-center gap-2 rounded-lg bg-[#2AABEE] px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#229ED9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2AABEE]";

const btnMax =
  "inline-flex h-9 items-center gap-2 rounded-lg bg-[#5B6CFF] px-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#4a5ae6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B6CFF]";

const icon = "h-4 w-4 shrink-0";

const MAX_CHANNEL_URL = "https://max.ru/join/97kInXgz8SvwTIVfosXrcX782wDQnIh_UmPJQfd39CY";

const groupLabel = "text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted";

export function FooterChannelStrip() {
  return (
    <div className="mt-4 flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <p className={groupLabel}>Контакты</p>
        <div className="flex flex-wrap items-center gap-2">
          <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
            <IconTg className={icon} />Telegram
          </a>
          <ContactChoiceTrigger className={btnSecondary}>
            <IconMail className={icon} />Email
          </ContactChoiceTrigger>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className={groupLabel}>Каналы</p>
        <div className="flex flex-wrap items-center gap-2">
          <a href={VK_URL} target="_blank" rel="noopener noreferrer" className={btnVk}>
            <IconVk className={icon} />VK
          </a>
          <a href={TELEGRAM_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className={btnTgChannel}>
            <IconTg className={icon} />Telegram
          </a>
          <a href={MAX_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className={btnMax}>
            <IconMax className={icon} />Max
          </a>
        </div>
      </div>
    </div>
  );
}
