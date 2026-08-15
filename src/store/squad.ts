"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { GameVersionId } from "@/lib/types";

type PerVersion<T> = Partial<Record<GameVersionId, T>>;

interface SquadState {
  /** Player ids in the planner, keyed by game version. */
  squads: PerVersion<string[]>;
  /** Weekly wage budget in EUR, keyed by game version. */
  budgets: PerVersion<number>;
  /** Player ids selected for the comparison tool (max 3), keyed by game version. */
  compare: PerVersion<string[]>;
  hydrated: boolean;

  toggleSquad: (version: GameVersionId, playerId: string) => void;
  removeFromSquad: (version: GameVersionId, playerId: string) => void;
  clearSquad: (version: GameVersionId) => void;
  setBudget: (version: GameVersionId, budget: number) => void;
  toggleCompare: (version: GameVersionId, playerId: string) => void;
  clearCompare: (version: GameVersionId) => void;
  setHydrated: () => void;
}

export const DEFAULT_WAGE_BUDGET = 1_500_000;
export const MAX_COMPARE = 3;

/**
 * Squad planner state.
 *
 * Everything is keyed by game version so a squad built for an FC 27 save is
 * never mixed with an FC 26 one — switching titles switches plans too.
 */
export const useSquadStore = create<SquadState>()(
  persist(
    (set) => ({
      squads: {},
      budgets: {},
      compare: {},
      hydrated: false,

      toggleSquad: (version, playerId) =>
        set((state) => {
          const current = state.squads[version] ?? [];
          const next = current.includes(playerId)
            ? current.filter((id) => id !== playerId)
            : [...current, playerId];
          return { squads: { ...state.squads, [version]: next } };
        }),

      removeFromSquad: (version, playerId) =>
        set((state) => ({
          squads: {
            ...state.squads,
            [version]: (state.squads[version] ?? []).filter((id) => id !== playerId),
          },
        })),

      clearSquad: (version) => set((state) => ({ squads: { ...state.squads, [version]: [] } })),

      setBudget: (version, budget) =>
        set((state) => ({ budgets: { ...state.budgets, [version]: Math.max(0, budget) } })),

      toggleCompare: (version, playerId) =>
        set((state) => {
          const current = state.compare[version] ?? [];
          if (current.includes(playerId)) {
            return { compare: { ...state.compare, [version]: current.filter((id) => id !== playerId) } };
          }
          // Oldest selection drops out once the slate is full.
          const next = [...current, playerId].slice(-MAX_COMPARE);
          return { compare: { ...state.compare, [version]: next } };
        }),

      clearCompare: (version) => set((state) => ({ compare: { ...state.compare, [version]: [] } })),

      setHydrated: () => set({ hydrated: true }),
    }),
    {
      name: "career-hub:squad",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        squads: state.squads,
        budgets: state.budgets,
        compare: state.compare,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

export function useSquadIds(version: GameVersionId): string[] {
  return useSquadStore((s) => s.squads[version]) ?? EMPTY;
}

export function useCompareIds(version: GameVersionId): string[] {
  return useSquadStore((s) => s.compare[version]) ?? EMPTY;
}

export function useBudget(version: GameVersionId): number {
  return useSquadStore((s) => s.budgets[version]) ?? DEFAULT_WAGE_BUDGET;
}

/** Stable identity so selectors returning "nothing" never retrigger a render. */
const EMPTY: string[] = [];
