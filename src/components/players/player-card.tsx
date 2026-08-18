"use client";

import { motion } from "framer-motion";
import { GitCompareArrows, UserPlus } from "lucide-react";
import { Rating } from "@/components/ui/primitives";
import { PlayerBadges } from "./player-badges";
import { useI18n } from "@/i18n/use-i18n";
import { cn, growthTone, signed } from "@/lib/format";
import type { DerivedPlayer } from "@/lib/types";

export function PlayerCard({
  player,
  onOpen,
  onToggleSquad,
  onToggleCompare,
  inSquad,
  inCompare,
}: {
  player: DerivedPlayer;
  onOpen: () => void;
  onToggleSquad: () => void;
  onToggleCompare: () => void;
  inSquad: boolean;
  inCompare: boolean;
}) {
  const { d, f, fmt } = useI18n();

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="panel group flex min-w-0 flex-col gap-3 p-4 transition hover:border-accent/40"
    >
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={onOpen} className="focus-ring min-w-0 rounded-md text-left">
          <p className="truncate font-semibold text-zinc-50 group-hover:text-accent">{player.name}</p>
          <p className="truncate text-xs text-zinc-500">
            {[player.club ?? d.common.freeAgent, player.nation].filter(Boolean).join(" · ")}
          </p>
        </button>
        <div className="flex shrink-0 items-center gap-1">
          <Rating value={player.overall} />
          <span className="text-zinc-600">→</span>
          <Rating value={player.potential} />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="chip border-line bg-surface-2 text-zinc-300">{player.position}</span>
        <span className="chip border-line bg-surface-2 text-zinc-400">{fmt(d.common.ageShort, { count: player.age })}</span>
        <span className={cn("chip border-line bg-surface-2 font-mono", growthTone(player.growth))}>
          {signed(player.growth)}
        </span>
      </div>

      {/* Two facts, not four. Clause and contract live in the scout report —
          keeping them here forced the card wider than a 390px phone, because
          "260 K €/sem" carries a non-breaking space and cannot wrap. */}
      <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
        <div className="flex min-w-0 items-baseline justify-between gap-2">
          <dt className="shrink-0 text-zinc-500">{d.table.value}</dt>
          <dd className="min-w-0 truncate font-mono tabular-nums text-zinc-200">{f.money(player.value)}</dd>
        </div>
        <div className="flex min-w-0 items-baseline justify-between gap-2">
          <dt className="shrink-0 text-zinc-500">{d.table.wage}</dt>
          <dd className="min-w-0 truncate font-mono tabular-nums text-zinc-200">
            {player.isFreeAgent ? "—" : f.wage(player.contract.wage)}
          </dd>
        </div>
      </dl>

      <PlayerBadges player={player} />

      <div className="mt-auto flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={onOpen}
          className="focus-ring flex-1 rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-accent/50 hover:text-accent"
        >
          {d.playerActions.scoutReport}
        </button>
        <button
          type="button"
          onClick={onToggleCompare}
          aria-pressed={inCompare}
          title={inCompare ? d.playerActions.removeFromCompare : d.playerActions.addToCompare}
          className={cn(
            "focus-ring rounded-lg border p-1.5 transition",
            inCompare
              ? "border-sky-500/50 bg-sky-500/15 text-sky-300"
              : "border-line bg-surface-2 text-zinc-400 hover:text-zinc-100",
          )}
        >
          <GitCompareArrows className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={onToggleSquad}
          aria-pressed={inSquad}
          title={inSquad ? d.playerActions.removeFromSquadTitle : d.playerActions.addToSquadTitle}
          className={cn(
            "focus-ring rounded-lg border p-1.5 transition",
            inSquad
              ? "border-accent/50 bg-accent/15 text-accent"
              : "border-line bg-surface-2 text-zinc-400 hover:text-zinc-100",
          )}
        >
          <UserPlus className="size-4" aria-hidden />
        </button>
      </div>
    </motion.article>
  );
}
