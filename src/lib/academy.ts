import type { GameVersion, ScoutRegion } from "./types";

/**
 * Youth academy return model.
 *
 * Career Mode never exposes its real numbers, so this is a transparent model
 * fitted to how the system behaves in practice:
 *
 *   Experience  → how many players a scout reports back per season, and how
 *                 fast the first reports arrive.
 *   Judgment    → the accuracy of the star range, and the ceiling of the
 *                 potential he is allowed to find.
 *   Region      → a potential bias and a positional skew.
 *   Facilities  → an ongoing multiplier on how much of that potential the
 *                 youth player actually converts into rating.
 *
 * Every coefficient below is a single named constant so the model can be
 * re-tuned in one place when a new title shifts the maths.
 */

export type FacilityLevel = 1 | 2 | 3;

export interface AcademyInput {
  /** How many scouts are on youth assignments. */
  scouts: number;
  /** 1-5 stars, averaged across assigned scouts. */
  experience: number;
  /** 1-5 stars, averaged across assigned scouts. */
  judgment: number;
  region: ScoutRegion;
  /** Months left on the assignment before the intake. */
  months: number;
  /** 1 = Basic, 2 = Good, 3 = Excellent youth facilities. */
  facilities: FacilityLevel;
}

export interface AcademyResult {
  /** Players expected in the intake. */
  playersFound: number;
  /** Highest potential the setup can realistically surface. */
  potentialCeiling: number;
  /** Typical potential of a returned player. */
  averagePotential: number;
  /** Typical starting overall of a returned player. */
  averageOverall: number;
  /** Chance that at least one player in the intake has 85+ potential. */
  gemChance: number;
  /** Width of the reported star range, in stars. Lower is a tighter report. */
  reportSpread: number;
  /** Months before the first usable reports land. */
  monthsToFirstReport: number;
  /** Weekly wage bill for the assigned scouts, using the dataset's scout costs. */
  weeklyCost: number;
  /** Plain-language read on the setup. */
  verdict: string;
  /** What to change next, ordered by impact. */
  advice: string[];
}

const REPORTS_BASE = 0.8;
const REPORTS_PER_EXPERIENCE_STAR = 0.55;
const CEILING_BASE = 72;
const CEILING_PER_JUDGMENT_STAR = 2.6;
const CEILING_PER_REGION_BIAS = 1.6;
const GEM_BASE = 0.02;
const GEM_PER_JUDGMENT_STAR = 0.03;
const GEM_PER_REGION_BIAS = 0.015;
const GEM_PER_EXPERIENCE_STAR = 0.005;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function calculateAcademy(input: AcademyInput, version: GameVersion, weeklyCost: number): AcademyResult {
  const { scouts, experience, judgment, region, months, facilities } = input;

  const seasonFraction = clamp(months / 12, 0.2, 1);
  const perScout = REPORTS_BASE + REPORTS_PER_EXPERIENCE_STAR * (experience - 1);
  const playersFound = Math.round(clamp(perScout * scouts * seasonFraction, 0, 18));

  const potentialCeiling = Math.round(
    clamp(
      CEILING_BASE +
        CEILING_PER_JUDGMENT_STAR * judgment +
        CEILING_PER_REGION_BIAS * region.potentialBias +
        (facilities - 2) * 1.2,
      70,
      version.potentialCap,
    ),
  );

  const averagePotential = Math.round(potentialCeiling - 14 + judgment * 0.8);
  const averageOverall = Math.round(clamp(averagePotential - 22 + facilities * 1.5, 45, 72));

  const perPlayerGem = clamp(
    GEM_BASE +
      GEM_PER_JUDGMENT_STAR * (judgment - 1) +
      GEM_PER_REGION_BIAS * region.potentialBias +
      GEM_PER_EXPERIENCE_STAR * (experience - 1),
    0,
    0.55,
  );
  const gemChance = playersFound === 0 ? 0 : 1 - (1 - perPlayerGem) ** playersFound;

  const reportSpread = Number(clamp(3.2 - 0.55 * judgment, 0.4, 3).toFixed(1));
  const monthsToFirstReport = Math.max(1, Math.round(6 - experience));

  const advice: string[] = [];
  if (judgment < 5) {
    advice.push(
      `Judgment ${judgment}★ caps you at ~${potentialCeiling} POT and leaves a ±${reportSpread}★ report. Every judgment star is worth roughly +${CEILING_PER_JUDGMENT_STAR} potential.`,
    );
  }
  if (experience < 5) {
    advice.push(
      `Experience ${experience}★ returns ${perScout.toFixed(1)} players per scout per season. A 5★ experience scout returns ${(REPORTS_BASE + REPORTS_PER_EXPERIENCE_STAR * 4).toFixed(1)}.`,
    );
  }
  if (region.potentialBias < 3) {
    advice.push(
      `${region.name} carries a ${region.potentialBias >= 0 ? "+" : ""}${region.potentialBias} potential bias. South America is +3 and is where the 90+ ceilings come from.`,
    );
  }
  if (facilities < 3) {
    advice.push(
      "Youth facilities below Excellent cost you roughly 1.5 starting overall per level, which delays first-team readiness by a full season.",
    );
  }
  if (scouts < 3) {
    advice.push("Three assigned scouts is the practical sweet spot — intake size scales linearly with scout count.");
  }
  if (advice.length === 0) {
    advice.push("This is the maximum-value setup in the game. Keep the assignment running year-round and never recall early.");
  }

  const verdict =
    judgment === 5 && experience === 5
      ? `The 5★/5★ benchmark: ~${playersFound} players per intake, ceiling around ${potentialCeiling} POT, and a ${Math.round(gemChance * 100)}% chance of at least one 85+ potential prospect.`
      : `Expect ~${playersFound} players per intake with a ceiling around ${potentialCeiling} POT. Chance of an 85+ potential gem: ${Math.round(gemChance * 100)}%.`;

  return {
    playersFound,
    potentialCeiling,
    averagePotential,
    averageOverall,
    gemChance,
    reportSpread,
    monthsToFirstReport,
    weeklyCost,
    verdict,
    advice,
  };
}
