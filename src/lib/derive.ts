import type {
  DerivedPlayer,
  FaceStats,
  GameVersion,
  KeeperStats,
  Player,
  Position,
  PositionGroup,
} from "./types";

const GROUP_BY_POSITION: Record<Position, PositionGroup> = {
  GK: "Goalkeeper",
  CB: "Defender",
  LB: "Defender",
  RB: "Defender",
  LWB: "Defender",
  RWB: "Defender",
  CDM: "Midfielder",
  CM: "Midfielder",
  CAM: "Midfielder",
  LM: "Midfielder",
  RM: "Midfielder",
  LW: "Attacker",
  RW: "Attacker",
  CF: "Attacker",
  ST: "Attacker",
};

export const ALL_POSITIONS = Object.keys(GROUP_BY_POSITION) as Position[];

export function positionGroup(position: Position): PositionGroup {
  return GROUP_BY_POSITION[position];
}

/** Whole months between two `year * 12 + month` points, floored at zero. */
function monthsBetween(fromISO: string, toYear: number, toMonth: number): number {
  const [y, m] = fromISO.split("-");
  const fromMonths = Number(y) * 12 + Number(m);
  return Math.max(0, toYear * 12 + toMonth - fromMonths);
}

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * 0-100 composite of how good a Career Mode signing a player is.
 *
 *   35%  potential, scaled against this title's potential cap
 *   25%  raw growth (+Δ), scaled so +20 is a perfect score
 *   30%  price efficiency — growth points bought per €10m
 *   10%  wage burden, scaled so €300k/wk is a zero
 *
 * The weights are deliberately potential-heavy: in Career Mode a cheap player
 * who never improves is not a bargain, he is a squad filler.
 */
function bargainScore(player: Player, growth: number, version: GameVersion): number {
  const potFloor = 70;
  const potScore = clamp01((player.potential - potFloor) / (version.potentialCap - potFloor));
  const growthScore = clamp01(growth / 20);

  // Free agents cost nothing up front, so they score the maximum on efficiency
  // whenever they still have growth left.
  const perTenMillion = player.value <= 0 ? 20 : growth / Math.max(player.value / 1e7, 0.05);
  const efficiencyScore = clamp01(perTenMillion / 12);

  const wageScore = clamp01(1 - player.contract.wage / 300_000);

  return Math.round(
    (0.35 * potScore + 0.25 * growthScore + 0.3 * efficiencyScore + 0.1 * wageScore) * 100,
  );
}

export function derivePlayer(player: Player, version: GameVersion): DerivedPlayer {
  const growth = player.potential - player.overall;
  const isFreeAgent = player.club === null;

  const monthsRemaining = isFreeAgent
    ? 0
    : monthsBetween(version.careerStartDate, player.contract.expiresYear, player.contract.expiresMonth);

  // "Six months left" is measured from the January window, because that is the
  // point at which a Career Mode player can sign a free pre-contract.
  const monthsAtPreContract = isFreeAgent
    ? 0
    : monthsBetween(version.preContractDate, player.contract.expiresYear, player.contract.expiresMonth);

  return {
    ...player,
    growth,
    group: positionGroup(player.position),
    isFreeAgent,
    monthsRemaining,
    costPerGrowthPoint: growth > 0 ? Math.round(player.value / growth) : player.value,
    bargainScore: bargainScore(player, growth, version),
    isHiddenGem: player.potential > 82 && player.overall < 68,
    isExpiring: !isFreeAgent && monthsAtPreContract > 0 && monthsAtPreContract <= 6,
  };
}

export function derivePlayers(players: Player[], version: GameVersion): DerivedPlayer[] {
  return players.map((p) => derivePlayer(p, version));
}

/* ------------------------------------------------------------------ */
/* Radar / face-stat helpers                                           */
/* ------------------------------------------------------------------ */

export interface RadarStat {
  key: string;
  /** Three-letter card label, e.g. "PAC" or "DIV". */
  short: string;
  label: string;
  value: number;
}

const OUTFIELD_LABELS: { key: keyof FaceStats; short: string; label: string }[] = [
  { key: "pace", short: "PAC", label: "Pace" },
  { key: "shooting", short: "SHO", label: "Shooting" },
  { key: "passing", short: "PAS", label: "Passing" },
  { key: "dribbling", short: "DRI", label: "Dribbling" },
  { key: "defending", short: "DEF", label: "Defending" },
  { key: "physical", short: "PHY", label: "Physical" },
];

const KEEPER_LABELS: { key: keyof KeeperStats; short: string; label: string }[] = [
  { key: "diving", short: "DIV", label: "Diving" },
  { key: "handling", short: "HAN", label: "Handling" },
  { key: "kicking", short: "KIC", label: "Kicking" },
  { key: "reflexes", short: "REF", label: "Reflexes" },
  { key: "speed", short: "SPD", label: "Speed" },
  { key: "positioning", short: "POS", label: "Positioning" },
];

/**
 * Whether this player has card stats at all.
 *
 * Not every public dataset publishes attributes — the FC 25 scrape ships
 * ratings, money and contracts but leaves the attribute block empty. A radar
 * drawn from six zeroes looks like a broken chart rather than missing data, so
 * callers check this first and say so instead.
 */
export function hasCardStats(player: Player): boolean {
  return radarStats(player).some((stat) => stat.value > 0);
}

/** The six card stats for a player, using keeper semantics when appropriate. */
export function radarStats(player: Player): RadarStat[] {
  if (player.position === "GK" && player.goalkeeping) {
    const gk = player.goalkeeping;
    return KEEPER_LABELS.map(({ key, short, label }) => ({ key, short, label, value: gk[key] }));
  }
  return OUTFIELD_LABELS.map(({ key, short, label }) => ({
    key,
    short,
    label,
    value: player.attributes[key],
  }));
}
