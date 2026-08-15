/**
 * Dataset registry.
 *
 * Every game version is a folder under `/data/<id>/` holding four files:
 *   meta.json      → GameVersion
 *   players.json   → Player[]
 *   tactics.json   → Tactic[]
 *   scouting.json  → { regions, scouts, regens }
 *
 * To add a title (say FC 28):
 *   1. create `/data/fc28/` with those four files
 *   2. add `"fc28"` to `GameVersionId` in `types.ts`
 *   3. import the files below and add one entry to `DATASETS`
 * Nothing else in the app needs to change.
 *
 * Translations of the datasets' prose live alongside them in
 * `/data/<id>/i18n/<locale>.json` and are registered in `OVERLAYS`. They are
 * optional and partial: anything a locale does not cover falls back to English.
 */
import type { Locale } from "@/i18n";
import type {
  DatasetTextOverlay,
  GameVersion,
  GameVersionId,
  Player,
  Tactic,
  VersionDataset,
} from "./types";

import fc27Meta from "@data/fc27/meta.json";
import fc27Players from "@data/fc27/players.json";
import fc27Tactics from "@data/fc27/tactics.json";
import fc27Scouting from "@data/fc27/scouting.json";

import fc26Meta from "@data/fc26/meta.json";
import fc26Players from "@data/fc26/players.json";
import fc26Tactics from "@data/fc26/tactics.json";
import fc26Scouting from "@data/fc26/scouting.json";

import fc25Meta from "@data/fc25/meta.json";
import fc25Players from "@data/fc25/players.json";
import fc25Tactics from "@data/fc25/tactics.json";
import fc25Scouting from "@data/fc25/scouting.json";

import fc27Es from "@data/fc27/i18n/es.json";
import fc26Es from "@data/fc26/i18n/es.json";
import fc25Es from "@data/fc25/i18n/es.json";

/** JSON imports arrive as widened literal types, so each bundle is asserted once here. */
function bundle(
  meta: unknown,
  players: unknown,
  tactics: unknown,
  scouting: unknown,
): VersionDataset {
  return {
    version: meta as GameVersion,
    players: players as Player[],
    tactics: tactics as Tactic[],
    scouting: scouting as VersionDataset["scouting"],
  };
}

export const DATASETS: Record<GameVersionId, VersionDataset> = {
  fc27: bundle(fc27Meta, fc27Players, fc27Tactics, fc27Scouting),
  fc26: bundle(fc26Meta, fc26Players, fc26Tactics, fc26Scouting),
  fc25: bundle(fc25Meta, fc25Players, fc25Tactics, fc25Scouting),
};

/**
 * Per-version, per-locale text overlays.
 *
 * English needs no entry — it is what the datasets are written in. Adding a
 * translation is one JSON file plus one line here.
 */
export const OVERLAYS: Partial<Record<GameVersionId, Partial<Record<Locale, DatasetTextOverlay>>>> = {
  fc27: { es: fc27Es as DatasetTextOverlay },
  fc26: { es: fc26Es as DatasetTextOverlay },
  fc25: { es: fc25Es as DatasetTextOverlay },
};

export function getOverlay(id: GameVersionId, locale: Locale): DatasetTextOverlay | undefined {
  return OVERLAYS[id]?.[locale];
}

/** Locales that ship a dataset-prose translation for this version. */
export function localesWithOverlay(id: GameVersionId): Locale[] {
  return Object.keys(OVERLAYS[id] ?? {}) as Locale[];
}

/** Newest first — this is the order the version switcher renders in. */
export const VERSION_ORDER: GameVersionId[] = ["fc27", "fc26", "fc25"];

export const VERSIONS: GameVersion[] = VERSION_ORDER.map((id) => DATASETS[id].version);

export const DEFAULT_VERSION: GameVersionId = "fc27";

export function isGameVersionId(value: unknown): value is GameVersionId {
  return typeof value === "string" && VERSION_ORDER.includes(value as GameVersionId);
}

export function getDataset(id: GameVersionId): VersionDataset {
  return DATASETS[id];
}
