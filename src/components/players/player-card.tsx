"use client";

import { motion } from "framer-motion";
import { GitCompareArrows, UserPlus } from "lucide-react";
import { Rating } from "@/components/ui/primitives";
import { PlayerBadges } from "./player-badges";
import { cn, contractEnd, growthTone, money, signed, wage } from "@/lib/format";
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
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className="panel group flex flex-col gap-3 p-4 transition hover:border-accent/40"
    >
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={onOpen} className="focus-ring min-w-0 rounded-md text-left">
          <p className="truncate font-semibold text-zinc-50 group-hover:text-accent">{player.name}</p>
          <p className="truncate text-xs text-zinc-500">
            {player.club ?? "Free agent"} · {player.nation}
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
        {player.altPositions.slice(0, 2).map((pos) => (
          <span key={pos} className="chip border-line/60 bg-surface-2/50 text-zinc-500">
            {pos}
          </span>
        ))}
        <span className="chip border-line bg-surface-2 text-zinc-400">{player.age}y</span>
        <span className={cn("chip border-line bg-surface-2 font-mono", growthTone(player.growth))}>
          {signed(player.growth)}
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
        <div className="flex justify-between gap-2">
          <dt className="text-zinc-500">Value</dt>
          <dd className="font-mono text-zinc-200">{money(player.value)}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-zinc-500">Wage</dt>
          <dd className="font-mono text-zinc-200">{player.isFreeAgent ? "—" : wage(player.contract.wage)}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-zinc-500">Clause</dt>
          <dd className="font-mono text-zinc-200">
            {player.contract.releaseClause ? money(player.contract.releaseClause) : "None"}
          </dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-zinc-500">Contract</dt>
          <dd className="font-mono text-zinc-200">
            {player.isFreeAgent ? "—" : contractEnd(player.contract.expiresYear, player.contract.expiresMonth)}
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
          Scout report
        </button>
        <button
          type="button"
          onClick={onToggleCompare}
          aria-pressed={inCompare}
          title={inCompare ? "Remove from comparison" : "Add to comparison"}
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
          title={inSquad ? "Remove from squad plan" : "Add to squad plan"}
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
