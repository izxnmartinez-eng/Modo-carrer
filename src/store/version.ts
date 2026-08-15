"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { DEFAULT_VERSION, isGameVersionId } from "@/lib/data";
import type { GameVersionId } from "@/lib/types";

interface VersionState {
  version: GameVersionId;
  /** False until the persisted value has been read back from localStorage. */
  hydrated: boolean;
  setVersion: (version: GameVersionId) => void;
  setHydrated: () => void;
}

/**
 * The single source of truth for "which game am I planning a save in".
 *
 * Every section reads this and every dataset lookup keys off it, so switching
 * the version swaps players, tactics, scouts and regens app-wide in one action.
 * The choice persists across reloads.
 */
export const useVersionStore = create<VersionState>()(
  persist(
    (set) => ({
      version: DEFAULT_VERSION,
      hydrated: false,
      setVersion: (version) => set({ version }),
      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "career-hub:version",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ version: state.version }),
      merge: (persisted, current) => {
        const next = persisted as { version?: unknown } | undefined;
        return {
          ...current,
          version: isGameVersionId(next?.version) ? next.version : current.version,
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

/** True once the persisted version has been restored on the client. */
export function useVersionHydrated(): boolean {
  return useVersionStore((s) => s.hydrated);
}
