import { scoreRecord } from "./fuzzy";
import type { DerivedPlayer, Position } from "./types";

export type SortKey =
  | "bargainScore"
  | "overall"
  | "potential"
  | "growth"
  | "age"
  | "value"
  | "wage"
  | "releaseClause"
  | "monthsRemaining"
  | "name";

export interface PlayerFilters {
  age: [number, number];
  overall: [number, number];
  potential: [number, number];
  /** Minimum and maximum +Δ (potential − overall). */
  growth: [number, number];
  /** Upper bound on transfer value, in EUR. `null` means no cap. */
  maxValue: number | null;
  /** Upper bound on weekly wage, in EUR. `null` means no cap. */
  maxWage: number | null;
  positions: Position[];
  /** Only players with a release clause at or below this figure. */
  maxReleaseClause: number | null;
  requireReleaseClause: boolean;
  /** Contract expiry year, or `null` for any. */
  expiryYear: number | null;
  bargains: boolean;
  hiddenGems: boolean;
  freeAgents: boolean;
  expiring: boolean;
}

export const DEFAULT_FILTERS: PlayerFilters = {
  age: [15, 40],
  overall: [40, 99],
  potential: [40, 99],
  growth: [0, 30],
  maxValue: null,
  maxWage: null,
  positions: [],
  maxReleaseClause: null,
  requireReleaseClause: false,
  expiryYear: null,
  bargains: false,
  hiddenGems: false,
  freeAgents: false,
  expiring: false,
};

/** A player counts as a bargain when the composite signing score clears this. */
export const BARGAIN_THRESHOLD = 62;

export function isDefaultFilters(filters: PlayerFilters): boolean {
  return JSON.stringify(filters) === JSON.stringify(DEFAULT_FILTERS);
}

function matchesFilters(player: DerivedPlayer, f: PlayerFilters): boolean {
  if (player.age < f.age[0] || player.age > f.age[1]) return false;
  if (player.overall < f.overall[0] || player.overall > f.overall[1]) return false;
  if (player.potential < f.potential[0] || player.potential > f.potential[1]) return false;
  if (player.growth < f.growth[0] || player.growth > f.growth[1]) return false;

  if (f.maxValue !== null && player.value > f.maxValue) return false;
  if (f.maxWage !== null && player.contract.wage > f.maxWage) return false;

  if (f.positions.length > 0) {
    const covered = [player.position, ...player.altPositions];
    if (!covered.some((pos) => f.positions.includes(pos))) return false;
  }

  const clause = player.contract.releaseClause;
  if (f.requireReleaseClause && clause === null) return false;
  if (f.maxReleaseClause !== null && (clause === null || clause > f.maxReleaseClause)) return false;

  if (f.expiryYear !== null && player.contract.expiresYear !== f.expiryYear) return false;

  // Career Mode presets. Each is an independent switch, so they stack.
  if (f.bargains && player.bargainScore < BARGAIN_THRESHOLD) return false;
  if (f.hiddenGems && !player.isHiddenGem) return false;
  if (f.freeAgents && !player.isFreeAgent) return false;
  if (f.expiring && !player.isExpiring) return false;

  return true;
}

function sortValue(player: DerivedPlayer, key: SortKey): number | string {
  switch (key) {
    case "releaseClause":
      return player.contract.releaseClause ?? -1;
    case "wage":
      return player.contract.wage;
    case "name":
      return player.name;
    default:
      return player[key];
  }
}

export interface QueryOptions {
  filters: PlayerFilters;
  query: string;
  sortKey: SortKey;
  sortDir: "asc" | "desc";
}

/**
 * Filters, fuzzy-searches and sorts in one pass.
 * When a search query is present, relevance wins over the chosen sort column.
 */
export function queryPlayers(players: DerivedPlayer[], options: QueryOptions): DerivedPlayer[] {
  const { filters, query, sortKey, sortDir } = options;
  const trimmed = query.trim();

  const scored: { player: DerivedPlayer; score: number }[] = [];
  for (const player of players) {
    if (!matchesFilters(player, filters)) continue;
    if (trimmed) {
      const score = scoreRecord(
        [
          { value: player.name, weight: 1 },
          { value: player.club, weight: 0.85 },
          { value: player.league, weight: 0.6 },
          { value: player.nation, weight: 0.6 },
          { value: player.position, weight: 0.75 },
          { value: player.altPositions.join(" "), weight: 0.5 },
        ],
        trimmed,
      );
      if (score <= 0) continue;
      scored.push({ player, score });
    } else {
      scored.push({ player, score: 0 });
    }
  }

  const dir = sortDir === "asc" ? 1 : -1;
  scored.sort((a, b) => {
    if (trimmed && b.score !== a.score) return b.score - a.score;
    const av = sortValue(a.player, sortKey);
    const bv = sortValue(b.player, sortKey);
    if (typeof av === "string" || typeof bv === "string") {
      return String(av).localeCompare(String(bv)) * dir;
    }
    if (av === bv) return b.player.potential - a.player.potential;
    return (av - bv) * dir;
  });

  return scored.map((s) => s.player);
}
