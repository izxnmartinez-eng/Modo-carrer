"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n/use-i18n";
import { useLocaleStore } from "@/store/locale";
import { useVersionStore } from "@/store/version";

/**
 * Client bootstrap, rendered once from the root layout.
 *
 * - Picks up the browser's preferred language on a first visit. This runs in an
 *   effect, after hydration, because the prerendered HTML is always the default
 *   locale — switching any earlier would make the first client render disagree
 *   with the server.
 * - Mirrors app-wide state onto the document element: `data-version` drives the
 *   CSS accent tokens, `lang` keeps the page honest for screen readers,
 *   spellcheck and browser translation prompts.
 */
export function VersionTheme() {
  const version = useVersionStore((s) => s.version);
  const detectFromBrowser = useLocaleStore((s) => s.detectFromBrowser);
  const { locale, d } = useI18n();

  useEffect(() => {
    detectFromBrowser();
  }, [detectFromBrowser]);

  useEffect(() => {
    document.documentElement.dataset.version = version;
  }, [version]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = d.meta.title;
  }, [locale, d.meta.title]);

  return null;
}
