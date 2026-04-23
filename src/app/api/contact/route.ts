import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EMAIL_CONTACT } from "@/lib/site";

const LIMITS = { name: 120, email: 254, message: 8000 } as const;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/** Пустые и пробель-only значения в .env считаем «не задано» (удобнее для локальной настройки). */
function envTrim(key: string): string | undefined {
  const raw = process.env[key];
  if (raw === undefined) return undefined;
  const t = raw.trim();
  return t === "" ? undefined : t;
}

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "validation" }, { status: 400 });
    }
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "validation" }, { status: 400 });
    }
    if (
      name.length > LIMITS.name ||
      email.length > LIMITS.email ||
      message.length > LIMITS.message
    ) {
      return NextResponse.json({ error: "validation" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "validation" }, { status: 400 });
    }

    const host = envTrim("SMTP_HOST");
    const user = envTrim("SMTP_USER");
    const pass = envTrim("SMTP_PASS");
    if (!host || !user || !pass) {
      console.error("contact API: SMTP_HOST / SMTP_USER / SMTP_PASS not set or empty");
      return NextResponse.json({ error: "configuration" }, { status: 503 });
    }

    const portRaw = envTrim("SMTP_PORT");
    const port = Number(portRaw ?? "465");
    if (!Number.isFinite(port) || port <= 0 || port > 65535) {
      return NextResponse.json({ error: "validation" }, { status: 400 });
    }

    const secureFlag = envTrim("SMTP_SECURE");
    const secure =
      secureFlag === "1" ||
      secureFlag === "true" ||
      port === 465;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      ...(port === 587 && !secure ? { requireTLS: true } : {}),
      auth: { user, pass },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });

    const fromAddr = envTrim("CONTACT_MAIL_FROM") ?? user;
    const fromNameRaw = envTrim("CONTACT_MAIL_FROM_NAME") ?? "Portfolio";
    const fromName = fromNameRaw.replace(/"/g, "'");

    await transporter.sendMail({
      from: `"${fromName}" <${fromAddr}>`,
      to: EMAIL_CONTACT,
      replyTo: `${name} <${email}>`,
      subject: `[site] ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><b>From:</b> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact API:", e);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
