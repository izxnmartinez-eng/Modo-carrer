import { en, type Dictionary } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import { de } from "./dictionaries/de";
import { fr } from "./dictionaries/fr";
import { it } from "./dictionaries/it";
import { pt } from "./dictionaries/pt";

/**
 * Supported interface languages.
 *
 * To add one: create `dictionaries/<code>.ts` declared `satisfies Dictionary`,
 * add the code to this union, and add an entry to `LOCALES` + `DICTIONARIES`.
 * TypeScript then refuses to build until the new dictionary is complete.
 */
export type Locale = "en" | "es" | "de" | "fr" | "it" | "pt";

export interface LocaleMeta {
  code: Locale;
  /** Name of the language written in that language. */
  nativeName: string;
  /** English name, used as a secondary label. */
  englishName: string;
  /** BCP-47 tag handed to `Intl` for number, currency and date formatting. */
  intlTag: string;
  flag: string;
}

export const LOCALES: LocaleMeta[] = [
  { code: "en", nativeName: "English", englishName: "English", intlTag: "en-GB", flag: "🇬🇧" },
  { code: "es", nativeName: "Español", englishName: "Spanish", intlTag: "es-ES", flag: "🇪🇸" },
  { code: "de", nativeName: "Deutsch", englishName: "German", intlTag: "de-DE", flag: "🇩🇪" },
  { code: "fr", nativeName: "Français", englishName: "French", intlTag: "fr-FR", flag: "🇫🇷" },
  { code: "it", nativeName: "Italiano", englishName: "Italian", intlTag: "it-IT", flag: "🇮🇹" },
  { code: "pt", nativeName: "Português (BR)", englishName: "Portuguese", intlTag: "pt-BR", flag: "🇧🇷" },
];

const DICTIONARIES: Record<Locale, Dictionary> = { en, es, de, fr, it, pt };

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.some((l) => l.code === value);
}

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

export function getLocaleMeta(locale: Locale): LocaleMeta {
  return LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!;
}

/** Best supported match for the browser's preferred languages. */
export function detectLocale(candidates: readonly string[]): Locale {
  for (const candidate of candidates) {
    const base = candidate.toLowerCase().split("-")[0];
    const match = LOCALES.find((l) => l.code === base);
    if (match) return match.code;
  }
  return DEFAULT_LOCALE;
}

/**
 * Replaces `{placeholders}` in a dictionary string.
 * Unknown placeholders are left untouched so a missing value is visible rather
 * than silently rendering an empty gap.
 */
export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export type { Dictionary };
