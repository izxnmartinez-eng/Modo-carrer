import type { DatasetTextOverlay, Tactic, VersionDataset } from "./types";

/**
 * Merges a locale overlay over an English dataset.
 *
 * Only prose is replaced — ids, ratings, coordinates and every number stay
 * exactly as the dataset defines them, so a translation can never change the
 * maths. Anything the overlay omits falls through to the English original.
 */
export function localizeDataset(dataset: VersionDataset, overlay: DatasetTextOverlay | undefined): VersionDataset {
  if (!overlay) return dataset;

  const roles = overlay.roles ?? {};
  const localizeTactic = (tactic: Tactic): Tactic => {
    const t = overlay.tactics?.[tactic.id];
    const positions =
      Object.keys(roles).length === 0
        ? tactic.positions
        : tactic.positions.map((position) => ({ ...position, role: roles[position.role] ?? position.role }));

    if (!t && positions === tactic.positions) return tactic;

    return {
      ...tactic,
      positions,
      name: t?.name ?? tactic.name,
      summary: t?.summary ?? tactic.summary,
      tags: t?.tags ?? tactic.tags,
      keyInstructions: t?.keyInstructions ?? tactic.keyInstructions,
      strengths: t?.strengths ?? tactic.strengths,
      weaknesses: t?.weaknesses ?? tactic.weaknesses,
      recommendedProfiles: t?.recommendedProfiles ?? tactic.recommendedProfiles,
    };
  };

  return {
    version: dataset.version,
    players: dataset.players.map((player) => {
      const scoutNote = overlay.players?.[player.id]?.scoutNote;
      return scoutNote ? { ...player, scoutNote } : player;
    }),
    tactics: dataset.tactics.map(localizeTactic),
    scouting: {
      regions: dataset.scouting.regions.map((region) => {
        const r = overlay.scouting?.regions?.[region.id];
        return r ? { ...region, name: r.name ?? region.name, bias: r.bias ?? region.bias, note: r.note ?? region.note } : region;
      }),
      scouts: dataset.scouting.scouts.map((scout) => {
        const s = overlay.scouting?.scouts?.[scout.id];
        return s?.specialty ? { ...scout, specialty: s.specialty } : scout;
      }),
      regens: dataset.scouting.regens.map((regen) => {
        const r = overlay.scouting?.regens?.[regen.id];
        return r ? { ...regen, surfacesAt: r.surfacesAt ?? regen.surfacesAt, note: r.note ?? regen.note } : regen;
      }),
    },
  };
}
