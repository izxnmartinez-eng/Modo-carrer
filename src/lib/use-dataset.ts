"use client";

import { useMemo } from "react";
import { getDataset, getOverlay } from "./data";
import { derivePlayers } from "./derive";
import { localizeDataset } from "./localize-dataset";
import { useLocaleStore } from "@/store/locale";
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
 * Reads the active game version and interface language, and returns that
 * version's dataset — localised, with every derived field already computed.
 * Switching either setting re-runs this in every subscribed component, which
 * is what makes both switches global.
 */
export function useDataset(): ActiveDataset {
  const versionId = useVersionStore((s) => s.version);
  const hydrated = useVersionStore((s) => s.hydrated);
  const locale = useLocaleStore((s) => s.locale);

  return useMemo(() => {
    // English datasets first, then the locale's prose overlay on top.
    const dataset = localizeDataset(getDataset(versionId), getOverlay(versionId, locale));
    return {
      versionId,
      version: dataset.version,
      players: derivePlayers(dataset.players, dataset.version),
      tactics: dataset.tactics,
      scouting: dataset.scouting,
      hydrated,
    };
  }, [versionId, hydrated, locale]);
}
