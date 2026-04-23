"use client";

import { ThemeProvider } from "next-themes";
import { CodeStreamLayer } from "@/components/brand/CodeStreamLayer";
import { DocumentMetaSync } from "@/components/brand/DocumentMetaSync";
import { PageTransition } from "@/components/brand/PageTransition";
import { SiteBackground } from "@/components/brand/SiteBackground";
import { LocaleProvider } from "@/contexts/LocaleContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LocaleProvider>
        <DocumentMetaSync />
        <SiteBackground />
        <CodeStreamLayer />
        <PageTransition>{children}</PageTransition>
      </LocaleProvider>
    </ThemeProvider>
  );
}
