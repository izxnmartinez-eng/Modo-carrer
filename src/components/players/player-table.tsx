"use client";

import { ArrowDown, ArrowUp, GitCompareArrows, UserPlus } from "lucide-react";
import { Rating } from "@/components/ui/primitives";
import { PlayerBadges } from "./player-badges";
import { useI18n } from "@/i18n/use-i18n";
import { cn, growthTone, signed } from "@/lib/format";
import type { SortKey } from "@/lib/filters";
import type { Dictionary } from "@/i18n";
import type { DerivedPlayer } from "@/lib/types";

/** `label` keys into `dictionary.table`, so column headers follow the locale. */
const COLUMNS: {
  key: SortKey;
  label: keyof Dictionary["table"];
  align?: "right";
  hideBelow?: string;
}[] = [
  { key: "name", label: "player" },
  { key: "age", label: "age", align: "right" },
  { key: "overall", label: "overall", align: "right" },
  { key: "potential", label: "potential", align: "right" },
  { key: "growth", label: "growth", align: "right" },
  { key: "value", label: "value", align: "right" },
  { key: "wage", label: "wage", align: "right", hideBelow: "md" },
  { key: "releaseClause", label: "clause", align: "right", hideBelow: "lg" },
  { key: "monthsRemaining", label: "contract", align: "right", hideBelow: "lg" },
];

export function PlayerTable({
  players,
  sortKey,
  sortDir,
  onSort,
  onOpen,
  onToggleSquad,
  onToggleCompare,
  squadIds,
  compareIds,
}: {
  players: DerivedPlayer[];
  sortKey: SortKey;
  sortDir: "asc" | "desc";
  onSort: (key: SortKey) => void;
  onOpen: (player: DerivedPlayer) => void;
  onToggleSquad: (player: DerivedPlayer) => void;
  onToggleCompare: (player: DerivedPlayer) => void;
  squadIds: string[];
  compareIds: string[];
}) {
  const { d, f } = useI18n();

  return (
    <div className="panel overflow-x-auto">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-left">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  "px-3 py-2.5 font-semibold",
                  col.align === "right" && "text-right",
                  col.hideBelow === "md" && "hidden md:table-cell",
                  col.hideBelow === "lg" && "hidden lg:table-cell",
                )}
                aria-sort={sortKey === col.key ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
              >
                <button
                  type="button"
                  onClick={() => onSort(col.key)}
                  className={cn(
                    "focus-ring inline-flex items-center gap-1 rounded text-[11px] font-semibold uppercase tracking-wider transition",
                    sortKey === col.key ? "text-accent" : "text-zinc-500 hover:text-zinc-200",
                  )}
                >
                  {d.table[col.label]}
                  {sortKey === col.key &&
                    (sortDir === "asc" ? (
                      <ArrowUp className="size-3" aria-hidden />
                    ) : (
                      <ArrowDown className="size-3" aria-hidden />
                    ))}
                </button>
              </th>
            ))}
            <th scope="col" className="px-3 py-2.5 text-right">
              <span className="sr-only">{d.common.actions}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            const inSquad = squadIds.includes(player.id);
            const inCompare = compareIds.includes(player.id);
            return (
              <tr key={player.id} className="border-b border-line/60 transition last:border-0 hover:bg-surface-2/60">
                <td className="px-3 py-2.5">
                  <button type="button" onClick={() => onOpen(player)} className="focus-ring rounded text-left">
                    <span className="flex items-center gap-2">
                      <span className="font-medium text-zinc-100 hover:text-accent">{player.name}</span>
                      <span className="chip border-line bg-surface-2 text-[10px] text-zinc-400">{player.position}</span>
                    </span>
                    <span className="mt-0.5 flex items-center gap-2">
                      <span className="truncate text-xs text-zinc-500">{player.club ?? d.common.freeAgent}</span>
                      <PlayerBadges player={player} compact />
                    </span>
                  </button>
                </td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-zinc-300">{player.age}</td>
                <td className="px-3 py-2.5 text-right">
                  <Rating value={player.overall} />
                </td>
                <td className="px-3 py-2.5 text-right">
                  <Rating value={player.potential} />
                </td>
                <td className={cn("px-3 py-2.5 text-right font-mono font-semibold tabular-nums", growthTone(player.growth))}>
                  {signed(player.growth)}
                </td>
                <td className="px-3 py-2.5 text-right font-mono tabular-nums text-zinc-200">{f.money(player.value)}</td>
                <td className="hidden px-3 py-2.5 text-right font-mono tabular-nums text-zinc-300 md:table-cell">
                  {player.isFreeAgent ? "—" : f.wage(player.contract.wage)}
                </td>
                <td className="hidden px-3 py-2.5 text-right font-mono tabular-nums text-zinc-300 lg:table-cell">
                  {player.contract.releaseClause ? f.money(player.contract.releaseClause) : "—"}
                </td>
                <td className="hidden px-3 py-2.5 text-right lg:table-cell">
                  <span className="font-mono text-xs tabular-nums text-zinc-300">
                    {player.isFreeAgent ? d.common.free : f.contractEnd(player.contract.expiresYear, player.contract.expiresMonth)}
                  </span>
                  <span className="block text-[10px] text-zinc-600">
                    {player.isFreeAgent ? d.common.noClub : f.monthsLabel(player.monthsRemaining)}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onToggleCompare(player)}
                      aria-pressed={inCompare}
                      title={inCompare ? d.playerActions.removeFromCompare : d.playerActions.addToCompare}
                      className={cn(
                        "focus-ring rounded-md border p-1.5 transition",
                        inCompare
                          ? "border-sky-500/50 bg-sky-500/15 text-sky-300"
                          : "border-line bg-surface-2 text-zinc-500 hover:text-zinc-100",
                      )}
                    >
                      <GitCompareArrows className="size-3.5" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleSquad(player)}
                      aria-pressed={inSquad}
                      title={inSquad ? d.playerActions.removeFromSquadTitle : d.playerActions.addToSquadTitle}
                      className={cn(
                        "focus-ring rounded-md border p-1.5 transition",
                        inSquad
                          ? "border-accent/50 bg-accent/15 text-accent"
                          : "border-line bg-surface-2 text-zinc-500 hover:text-zinc-100",
                      )}
                    >
                      <UserPlus className="size-3.5" aria-hidden />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
