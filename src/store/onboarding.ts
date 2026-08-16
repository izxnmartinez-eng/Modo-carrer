"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface OnboardingState {
  /** True once the tour has been finished or skipped. Persisted. */
  completed: boolean;
  /** False until the persisted flag has been read back from localStorage. */
  hydrated: boolean;
  /** Whether the tour dialog is currently showing. Never persisted. */
  open: boolean;
  openTour: () => void;
  /** Closes the tour and remembers not to open it again by itself. */
  finishTour: () => void;
  setHydrated: () => void;
}

/**
 * First-run tour state.
 *
 * `completed` persists so the welcome only interrupts once, but the tour stays
 * reachable from the help button in the menu at any time.
 */
export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      completed: false,
      hydrated: false,
      open: false,
      openTour: () => set({ open: true }),
      finishTour: () => set({ open: false, completed: true }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "career-hub:onboarding",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ completed: state.completed }),
      merge: (persisted, current) => {
        const next = persisted as { completed?: unknown } | undefined;
        return { ...current, completed: next?.completed === true };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);
