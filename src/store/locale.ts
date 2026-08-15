"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_LOCALE, detectLocale, isLocale, type Locale } from "@/i18n";

interface LocaleState {
  locale: Locale;
  /** False until the persisted choice has been read back from localStorage. */
  hydrated: boolean;
  /** True once the user has picked a language explicitly, which stops auto-detection. */
  chosen: boolean;
  setLocale: (locale: Locale) => void;
  setHydrated: () => void;
  /** Applies the browser's preferred language — a no-op once the user has chosen. */
  detectFromBrowser: () => void;
}

/**
 * Interface language.
 *
 * On a first visit the browser's preferred languages decide the starting
 * locale; once the user picks one explicitly, that choice wins forever.
 *
 * Detection deliberately runs from an effect after mount rather than during
 * rehydration: the prerendered HTML is always the default locale, so switching
 * any earlier would make the first client render disagree with the server.
 */
export const useLocaleStore = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: DEFAULT_LOCALE,
      hydrated: false,
      chosen: false,
      setLocale: (locale) => set({ locale, chosen: true }),
      setHydrated: () => set({ hydrated: true }),
      detectFromBrowser: () => {
        if (get().chosen || typeof navigator === "undefined") return;
        set({ locale: detectLocale(navigator.languages ?? [navigator.language]) });
      },
    }),
    {
      name: "career-hub:locale",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ locale: state.locale, chosen: state.chosen }),
      merge: (persisted, current) => {
        const next = persisted as { locale?: unknown; chosen?: unknown } | undefined;
        return {
          ...current,
          locale: isLocale(next?.locale) ? next.locale : current.locale,
          chosen: next?.chosen === true,
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
