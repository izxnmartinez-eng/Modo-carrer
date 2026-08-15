"use client";

import { useMemo } from "react";
import { fmt, getDictionary, getLocaleMeta, type Dictionary, type Locale, type LocaleMeta } from "@/i18n";
import { createFormatters, type Formatters } from "@/lib/format";
import { useLocaleStore } from "@/store/locale";

export interface I18n {
  locale: Locale;
  meta: LocaleMeta;
  /** The active dictionary — read keys directly, e.g. `d.players.title`. */
  d: Dictionary;
  /** Fills `{placeholders}` in a dictionary string. */
  fmt: typeof fmt;
  /** Locale-aware money, wage, contract and number formatters. */
  f: Formatters;
}

/**
 * The single entry point for translated copy and localised numbers.
 *
 * Dictionary access is a plain property read rather than a string path, so a
 * typo is a type error instead of a missing translation at runtime.
 */
export function useI18n(): I18n {
  const locale = useLocaleStore((s) => s.locale);

  return useMemo(() => {
    const meta = getLocaleMeta(locale);
    const d = getDictionary(locale);
    return { locale, meta, d, fmt, f: createFormatters(meta.intlTag, d) };
  }, [locale]);
}
