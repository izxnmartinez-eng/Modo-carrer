/**
 * Core domain model for Career Hub.
 *
 * Every dataset shipped under `/data/<versionId>/` must satisfy these types.
 * Adding a new game version means adding a folder + one entry in `src/lib/data.ts`.
 */

/* ------------------------------------------------------------------ */
/* Game versions                                                       */
/* ------------------------------------------------------------------ */

/** Identifier for a supported game version. Extend the union to add a title. */
export type GameVersionId = "fc27" | "fc26" | "fc25";

export interface GameVersion {
  id: GameVersionId;
  /** Full marketing name, e.g. "EA SPORTS FC 27". */
  label: string;
  /** Compact label used in the navbar pill, e.g. "FC 27". */
  shortLabel: string;
  /** Season the default career starts in, e.g. "2026/27". */
  season: string;
  /**
   * In-game "today" for the first career save of this title (ISO date).
   * All contract maths (expiring deals, months remaining) is measured against
   * this date rather than the real-world clock, so filters stay deterministic.
   */
  careerStartDate: string;
  /**
   * The January pre-contract window of the first season (ISO date).
   * A deal with six months or less left measured from here can be signed for
   * free — that is what the "Expiring Contracts (6 months)" preset means.
   */
  preContractDate: string;
  /** Highest potential the engine hands out in this title. Used by the gem scale. */
  potentialCap: number;
  /** Short note surfaced in the version switcher. */
  note: string;
  /** Tailwind-friendly accent token key, see `globals.css`. */
  accent: "lime" | "gold" | "cyan";
}

/* ------------------------------------------------------------------ */
/* Players                                                             */
/* ------------------------------------------------------------------ */

export type Position =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "LWB"
  | "RWB"
  | "CDM"
  | "CM"
  | "CAM"
  | "LM"
  | "RM"
  | "LW"
  | "RW"
  | "CF"
  | "ST";

export type PositionGroup = "Goalkeeper" | "Defender" | "Midfielder" | "Attacker";

export type Foot = "Left" | "Right";

/**
 * How the engine distributes growth across a player's career.
 * Drives the projected growth curve in `src/lib/growth.ts`.
 */
export type GrowthType = "Early" | "Normal" | "Late" | "Explosive" | "Slow" | "Constant";

/** The six outfield face stats. For a goalkeeper, see {@link KeeperStats}. */
export interface FaceStats {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
}

/** The six goalkeeper face stats. Occupies the same card slots as {@link FaceStats}. */
export interface KeeperStats {
  diving: number;
  handling: number;
  kicking: number;
  reflexes: number;
  speed: number;
  positioning: number;
}

export interface Contract {
  /** Calendar year the deal runs out. */
  expiresYear: number;
  /** Month (1-12) the deal runs out — almost always 6 (June 30). */
  expiresMonth: number;
  /** Weekly wage in the dataset currency (EUR). */
  wage: number;
  /** Minimum-fee release clause, or `null` when the contract has none. */
  releaseClause: number | null;
  /** Club the player is currently loaned out to, if any. */
  loanedTo?: string | null;
}

export interface Player {
  id: string;
  name: string;
  age: number;
  /** ISO birth date — also the key used by the regen tracker. */
  birthDate: string;
  nation: string;
  /** `null` marks a free agent. */
  club: string | null;
  /** `null` for free agents. */
  league: string | null;
  position: Position;
  altPositions: Position[];
  overall: number;
  potential: number;
  growthType: GrowthType;
  foot: Foot;
  /** 1-5 stars. */
  weakFoot: number;
  /** 1-5 stars. */
  skillMoves: number;
  /** Centimetres. */
  height: number;
  /** Kilograms. */
  weight: number;
  /** Transfer value in EUR. */
  value: number;
  contract: Contract;
  attributes: FaceStats;
  /** Present if and only if `position === "GK"`. */
  goalkeeping?: KeeperStats;
  playStyles: string[];
  playStylesPlus: string[];
  /** Free-text scouting summary shown in the player drawer. */
  scoutNote: string;
}

/** A player enriched with values the UI derives once and reuses everywhere. */
export interface DerivedPlayer extends Player {
  /** `potential - overall`. */
  growth: number;
  group: PositionGroup;
  isFreeAgent: boolean;
  /** Whole months left on the deal, measured from the version's career start date. */
  monthsRemaining: number;
  /** Cost in EUR for every potential point above the current overall. */
  costPerGrowthPoint: number;
  /** 0-100 composite of potential, growth and price. Higher is a better career signing. */
  bargainScore: number;
  /** POT > 82 while OVR < 68 — the classic "nobody has scouted him yet" profile. */
  isHiddenGem: boolean;
  /** Six-months-or-less left on the deal. */
  isExpiring: boolean;
}

/* ------------------------------------------------------------------ */
/* Tactics                                                             */
/* ------------------------------------------------------------------ */

export type BuildUpStyle = "Balanced" | "Counter" | "Short Passing" | "Long Ball";
export type DefensiveApproach = "Balanced" | "Deep" | "High" | "Aggressive Press";

/** One slot on the pitch diagram. `x`/`y` are percentages of a vertical pitch. */
export interface TacticPosition {
  id: string;
  label: Position;
  /** 0 = left touchline, 100 = right touchline. */
  x: number;
  /** 0 = opposition goal line, 100 = own goal line. */
  y: number;
  /** In-game role, e.g. "Ball-Playing Defender". */
  role: string;
  /** Role focus, e.g. "Defend" / "Balanced" / "Attack" / "Roaming". */
  focus: string;
}

export interface Tactic {
  id: string;
  /** Display name of the system, e.g. "Inverted 3-2-4-1". */
  name: string;
  manager: string;
  club: string;
  /** Season(s) the system is modelled on, e.g. "2016/17". */
  era: string;
  formation: string;
  /** The in-game Tactical Share Code. */
  shareCode: string;
  summary: string;
  difficulty: "Plug & Play" | "Intermediate" | "Advanced";
  tags: string[];
  offensive: {
    buildUpStyle: BuildUpStyle;
    /** 0-100 slider. */
    width: number;
    /** 0-10. */
    playersInBox: number;
    /** 0-5. */
    corners: number;
    /** 0-5. */
    freeKicks: number;
  };
  defensive: {
    approach: DefensiveApproach;
    /** 0-100 slider. */
    width: number;
    /** 0-100 slider — how high the line sits. */
    depth: number;
  };
  positions: TacticPosition[];
  keyInstructions: string[];
  strengths: string[];
  weaknesses: string[];
  /** What kind of player each key slot needs, for squad-building. */
  recommendedProfiles: { slot: string; note: string }[];
}

/* ------------------------------------------------------------------ */
/* Scouting & youth academy                                            */
/* ------------------------------------------------------------------ */

export interface ScoutRegion {
  id: string;
  name: string;
  /** Countries the region covers in-game. */
  countries: string[];
  /** -3..+3 modifier applied to the average potential of returned youths. */
  potentialBias: number;
  /** Position types the region over-produces. */
  bias: string;
  note: string;
}

export interface Scout {
  id: string;
  name: string;
  nation: string;
  /** 1-5 stars — drives how many players come back and how fast. */
  experience: number;
  /** 1-5 stars — drives report accuracy and the potential ceiling. */
  judgment: number;
  /** Weekly cost in EUR. */
  cost: number;
  /** Position type the scout specialises in. */
  specialty: string;
}

/** A retired legend the engine will re-issue as a youth "regen". */
export interface RegenProfile {
  id: string;
  legend: string;
  position: Position;
  nation: string;
  /** `MM-DD` — regens inherit the original player's birthday exactly. */
  birthday: string;
  /** Season the original is expected to retire in this title. */
  retiresSeason: string;
  height: number;
  foot: Foot;
  expectedOverall: [number, number];
  expectedPotential: [number, number];
  /** Where the regen is most likely to surface. */
  surfacesAt: string;
  note: string;
}

/* ------------------------------------------------------------------ */
/* Dataset bundle                                                      */
/* ------------------------------------------------------------------ */

export interface VersionDataset {
  version: GameVersion;
  players: Player[];
  tactics: Tactic[];
  scouting: {
    regions: ScoutRegion[];
    scouts: Scout[];
    regens: RegenProfile[];
  };
}
