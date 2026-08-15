"use client";

import { useMemo } from "react";
import { getDataset } from "./data";
import { derivePlayers } from "./derive";
import { useVersionStore } from "@/store/version";
import type { DerivedPlayer, GameVersion, GameVersionId, Tactic, VersionDataset } from "./types";

export interface ActiveDataset {
  versionId: GameVersionId;
  version: GameVersion;
  players: DerivedPlayer[];
  tactics: Tactic[];
  scouting: VersionDataset["scouting"];
  hydrated: boolean;
}

/**
 * Reads the active game version and returns that version's dataset with all
 * derived fields already computed. Switching version in the navbar re-runs
 * this in every subscribed component, which is what makes the switch global.
 */
export function useDataset(): ActiveDataset {
  const versionId = useVersionStore((s) => s.version);
  const hydrated = useVersionStore((s) => s.hydrated);

  return useMemo(() => {
    const dataset = getDataset(versionId);
    return {
      versionId,
      version: dataset.version,
      players: derivePlayers(dataset.players, dataset.version),
      tactics: dataset.tactics,
      scouting: dataset.scouting,
      hydrated,
    };
  }, [versionId, hydrated]);
}
