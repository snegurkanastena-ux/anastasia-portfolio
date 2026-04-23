"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { useLocale } from "@/contexts/LocaleContext";
import { TELEGRAM_BOT_URL } from "@/lib/site";
import { Button } from "@/components/ui/Button";

type SendState = "idle" | "loading" | "success" | "error";
type FieldErrors = { name?: string; email?: string; message?: string };

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function ContactChoicePanel({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const titleId = useId();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendState, setSendState] = useState<SendState>("idle");
  const [errorIsConfig, setErrorIsConfig] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const resetFeedback = useCallback(() => {
    if (sendState === "loading") return;
    if (sendState !== "idle") setSendState("idle");
    setErrorIsConfig(false);
  }, [sendState]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    firstFieldRef.current?.focus();
  }, []);

  const validate = useCallback((): boolean => {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = t("contactDialog.errorName");
    if (!email.trim() || !isValidEmail(email.trim())) errors.email = t("contactDialog.errorEmail");
    if (!message.trim()) errors.message = t("contactDialog.errorMessage");
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [name, email, message, t]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      setSendState("loading");
      setErrorIsConfig(false);
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
          }),
        });
        let payload: { error?: string } = {};
        try {
          payload = (await res.json()) as { error?: string };
        } catch {
          payload = {};
        }
        if (!res.ok) {
          setErrorIsConfig(res.status === 503 && payload.error === "configuration");
          setSendState("error");
          return;
        }
        setSendState("success");
        setName("");
        setEmail("");
        setMessage("");
        setFieldErrors({});
      } catch {
        setErrorIsConfig(false);
        setSendState("error");
      }
    },
    [name, email, message, validate],
  );

  const fieldBase =
    "mt-1.5 w-full rounded-editorial-md border bg-surface/50 px-3 py-2.5 text-editorial-base text-ink outline-none transition-[border-color,box-shadow] duration-editorial ease-editorial focus:border-accent focus:ring-1 focus:ring-accent dark:bg-surface/22";
  const fieldOk = `${fieldBase} border-line/70`;
  const fieldErr = `${fieldBase} border-red-500/70`;

  const errorHint = "mt-1 text-[0.75rem] leading-snug text-red-500 dark:text-red-400";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="presentation"
    >
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
        className="relative z-10 max-h-[min(90vh,720px)] w-full max-w-md overflow-y-auto rounded-editorial-lg border border-line/55 bg-elevated p-6 shadow-editorial-modal dark:border-line/38 dark:bg-elevated dark:shadow-editorial-dark sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <h2 id={titleId} className="heading-subsection">
            {t("contactDialog.title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-editorial-md border border-line/65 text-muted transition-[border-color,color,background-color] duration-editorial ease-editorial hover:border-line hover:bg-surface/45 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:bg-surface/22"
            aria-label={t("contactDialog.close")}
          >
            ×
          </button>
        </div>
        <p className="mt-3 text-editorial-caption leading-relaxed text-muted">
          {t("contactDialog.subtitle")}
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor={nameId} className="text-editorial-label font-semibold uppercase text-muted">
              {t("contactsPage.nameLabel")}
            </label>
            <input
              ref={firstFieldRef}
              id={nameId}
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: undefined }));
                resetFeedback();
              }}
              className={fieldErrors.name ? fieldErr : fieldOk}
            />
            {fieldErrors.name && <p className={errorHint}>{fieldErrors.name}</p>}
          </div>
          <div>
            <label htmlFor={emailId} className="text-editorial-label font-semibold uppercase text-muted">
              {t("contactsPage.emailLabel")}
            </label>
            <input
              id={emailId}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: undefined }));
                resetFeedback();
              }}
              className={fieldErrors.email ? fieldErr : fieldOk}
            />
            {fieldErrors.email && <p className={errorHint}>{fieldErrors.email}</p>}
          </div>
          <div>
            <label htmlFor={messageId} className="text-editorial-label font-semibold uppercase text-muted">
              {t("contactDialog.messageLabel")}
            </label>
            <textarea
              id={messageId}
              name="message"
              rows={5}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (fieldErrors.message) setFieldErrors((p) => ({ ...p, message: undefined }));
                resetFeedback();
              }}
              className={fieldErrors.message ? fieldErr : fieldOk}
            />
            {fieldErrors.message && <p className={errorHint}>{fieldErrors.message}</p>}
          </div>

          {sendState === "success" && (
            <p className="text-editorial-base font-medium text-green-700 dark:text-green-400" role="status">
              {t("contactDialog.sent")}
            </p>
          )}
          {sendState === "error" && (
            <p className="text-editorial-base font-medium text-red-600 dark:text-red-400" role="alert">
              {errorIsConfig ? t("contactDialog.failedConfig") : t("contactDialog.failed")}
            </p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={sendState === "loading"}
          >
            {sendState === "loading" ? t("contactDialog.sending") : t("contactDialog.submit")}
          </Button>
        </form>

        <p className="mt-6 text-center text-editorial-label font-semibold uppercase tracking-[0.16em] text-muted">
          {t("contactDialog.altLabel")}
        </p>
        <a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-editorial-md border border-line/70 bg-transparent text-editorial-base font-semibold text-ink transition-[border-color,background-color,color] duration-editorial ease-editorial hover:border-line hover:bg-elevated/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:hover:bg-elevated/22"
        >
          {t("contactDialog.telegram")}
        </a>
      </div>
    </div>
  );
}

export function ContactChoiceTrigger({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => setOpen(false), []);
  const handleOpen = useCallback(() => setOpen(true), []);

  return (
    <>
      <button
        type="button"
        className={className}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={handleOpen}
      >
        {children}
      </button>
      {mounted && open
        ? createPortal(
            <ContactChoicePanel onClose={handleClose} />,
            document.body,
          )
        : null}
    </>
  );
}
