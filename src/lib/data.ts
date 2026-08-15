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
 */
import type { GameVersion, GameVersionId, Player, Tactic, VersionDataset } from "./types";

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
