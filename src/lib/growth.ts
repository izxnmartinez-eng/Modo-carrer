import type { GrowthType, Player } from "./types";

/**
 * Shape of each growth type: when growth starts, when the player tops out, and
 * how front- or back-loaded the curve is.
 *
 * `exponent < 1` front-loads growth (big early jumps), `> 1` back-loads it.
 */
const CURVE: Record<GrowthType, { startAge: number; peakAge: number; exponent: number }> = {
  Explosive: { startAge: 15, peakAge: 22, exponent: 0.45 },
  Early: { startAge: 15, peakAge: 23, exponent: 0.6 },
  Normal: { startAge: 15, peakAge: 25, exponent: 1 },
  Slow: { startAge: 15, peakAge: 28, exponent: 1.35 },
  Late: { startAge: 15, peakAge: 27, exponent: 2.1 },
  Constant: { startAge: 15, peakAge: 24, exponent: 1 },
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Fraction of a player's total career growth that has been realised by `age`. */
function progressAt(age: number, type: GrowthType): number {
  const { startAge, peakAge, exponent } = CURVE[type];
  return clamp01((age - startAge) / (peakAge - startAge)) ** exponent;
}

export interface GrowthPoint {
  age: number;
  overall: number;
  /** True for the player's current age. */
  isNow: boolean;
}

/**
 * Projects a season-by-season overall curve.
 *
 * The curve is anchored on the player's current rating: whatever fraction of
 * the curve is still ahead of him gets distributed across the remaining
 * seasons in the shape his growth type dictates.
 */
export function projectGrowth(player: Pick<Player, "age" | "overall" | "potential" | "growthType">): GrowthPoint[] {
  const { age, overall, potential, growthType } = player;
  const remaining = Math.max(0, potential - overall);
  const { peakAge } = CURVE[growthType];

  const from = Math.max(15, age - 2);
  const to = Math.min(34, Math.max(peakAge + 2, age + 3));

  const p0 = progressAt(age, growthType);
  const headroom = 1 - p0;

  const points: GrowthPoint[] = [];
  for (let a = from; a <= to; a++) {
    let ovr: number;
    if (growthType === "Constant" || remaining === 0) {
      ovr = overall;
    } else if (headroom <= 0.001) {
      // Already past his peak age but still short of potential: the engine
      // hands the rest over in a single season.
      ovr = a > age ? potential : overall;
    } else {
      const delta = ((progressAt(a, growthType) - p0) / headroom) * remaining;
      ovr = overall + delta;
    }
    points.push({
      age: a,
      overall: Math.round(Math.min(potential, Math.max(overall - remaining, ovr))),
      isNow: a === age,
    });
  }
  return points;
}

/** Overall the player is projected to reach at the end of the coming season. */
export function nextSeasonOverall(player: Pick<Player, "age" | "overall" | "potential" | "growthType">): number {
  const curve = projectGrowth(player);
  const next = curve.find((p) => p.age === player.age + 1);
  return next?.overall ?? player.overall;
}

/** Human-readable summary of what the growth type means for planning. */
export const GROWTH_TYPE_NOTE: Record<GrowthType, string> = {
  Explosive: "Huge jumps between 17 and 21, then flat. Play him immediately.",
  Early: "Most of the growth lands before 23. Buying at 24 means buying a finished player.",
  Normal: "Steady, predictable gains through to 25.",
  Slow: "Small annual gains that keep coming until 28.",
  Late: "Almost nothing before 23, then a steep climb to 27. Loan him out and wait.",
  Constant: "At or near his ceiling. What you see is what you get.",
};
