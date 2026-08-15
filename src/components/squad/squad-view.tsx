"use client";

import { useMemo } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2, TriangleAlert, X } from "lucide-react";
import { EmptyState, PageHeader, Rating, StatTile } from "@/components/ui/primitives";
import { cn, money, signed, wage } from "@/lib/format";
import { nextSeasonOverall } from "@/lib/growth";
import { useDataset } from "@/lib/use-dataset";
import { DEFAULT_WAGE_BUDGET, useBudget, useSquadIds, useSquadStore } from "@/store/squad";
import type { DerivedPlayer, PositionGroup } from "@/lib/types";

const GROUP_ORDER: PositionGroup[] = ["Goalkeeper", "Defender", "Midfielder", "Attacker"];
const GROUP_MINIMUM: Record<PositionGroup, number> = {
  Goalkeeper: 2,
  Defender: 6,
  Midfielder: 6,
  Attacker: 4,
};

export function SquadView() {
  const { players, versionId, version } = useDataset();
  const squadIds = useSquadIds(versionId);
  const budget = useBudget(versionId);
  const setBudget = useSquadStore((s) => s.setBudget);
  const removeFromSquad = useSquadStore((s) => s.removeFromSquad);
  const clearSquad = useSquadStore((s) => s.clearSquad);

  const squad = useMemo(
    () => squadIds.map((id) => players.find((p) => p.id === id)).filter((p): p is DerivedPlayer => Boolean(p)),
    [squadIds, players],
  );

  const stats = useMemo(() => {
    if (squad.length === 0) {
      return null;
    }
    const totalWage = squad.reduce((sum, p) => sum + p.contract.wage, 0);
    const totalValue = squad.reduce((sum, p) => sum + p.value, 0);
    const avgAge = squad.reduce((sum, p) => sum + p.age, 0) / squad.length;
    const avgOverall = squad.reduce((sum, p) => sum + p.overall, 0) / squad.length;
    const avgPotential = squad.reduce((sum, p) => sum + p.potential, 0) / squad.length;
    const totalGrowth = squad.reduce((sum, p) => sum + p.growth, 0);
    const nextSeasonAvg = squad.reduce((sum, p) => sum + nextSeasonOverall(p), 0) / squad.length;

    const byGroup = GROUP_ORDER.map((group) => ({
      group,
      count: squad.filter((p) => p.group === group).length,
      minimum: GROUP_MINIMUM[group],
    }));

    return {
      totalWage,
      totalValue,
      avgAge: Math.round(avgAge * 10) / 10,
      avgOverall: Math.round(avgOverall * 10) / 10,
      avgPotential: Math.round(avgPotential * 10) / 10,
      totalGrowth,
      nextSeasonAvg: Math.round(nextSeasonAvg * 10) / 10,
      byGroup,
      wageUsed: budget > 0 ? Math.min(200, (totalWage / budget) * 100) : 0,
      overBudget: totalWage > budget,
    };
  }, [squad, budget]);

  return (
    <>
      <PageHeader
        eyebrow={`${version.shortLabel} · ${version.season}`}
        title="Squad Planner"
        description="Build a shortlist against a real wage budget, then check the age profile and the total growth you are actually buying."
        actions={
          squad.length > 0 ? (
            <button
              type="button"
              onClick={() => clearSquad(versionId)}
              className="focus-ring chip border-line bg-surface-2 text-zinc-400 hover:text-rose-300"
            >
              <Trash2 className="size-3.5" aria-hidden /> Clear plan
            </button>
          ) : undefined
        }
      />

      <div className="panel mb-5 flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <label htmlFor="wage-budget" className="field-label">
            Weekly wage budget
          </label>
          <div className="mt-2 flex items-center gap-3">
            <span className="font-mono text-sm text-zinc-500">€</span>
            <input
              id="wage-budget"
              type="number"
              min={0}
              step={25000}
              value={budget}
              onChange={(event) => setBudget(versionId, Number(event.target.value))}
              className="focus-ring w-40 rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-sm text-zinc-100"
            />
            <button
              type="button"
              onClick={() => setBudget(versionId, DEFAULT_WAGE_BUDGET)}
              className="focus-ring rounded-md px-2 py-1 text-xs text-zinc-500 hover:text-zinc-200"
            >
              Reset
            </button>
          </div>
        </div>
        {stats && (
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="field-label">Wage bill</span>
              <span
                className={cn(
                  "font-mono text-sm tabular-nums",
                  stats.overBudget ? "text-rose-400" : "text-accent",
                )}
              >
                {wage(stats.totalWage)} / {money(budget)}
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-line">
              <motion.div
                className={cn("h-full rounded-full", stats.overBudget ? "bg-rose-500" : "bg-accent")}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, stats.wageUsed)}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
            {stats.overBudget && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-400">
                <TriangleAlert className="size-3.5" aria-hidden />
                Over budget by {money(stats.totalWage - budget)} per week.
              </p>
            )}
          </div>
        )}
      </div>

      {squad.length === 0 || !stats ? (
        <EmptyState
          title="No players in the plan yet"
          hint="Add players from the Wonderkids database — the wage bill, average age and total growth update as you go."
        />
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <StatTile label="Squad size" value={squad.length} hint={`${money(stats.totalValue)} of transfer value`} />
            <StatTile label="Average age" value={stats.avgAge} hint={stats.avgAge < 24 ? "Young project squad" : "Balanced age profile"} />
            <StatTile
              label="Average rating"
              value={`${stats.avgOverall} → ${stats.avgPotential}`}
              tone="accent"
              hint={`Projected ${stats.nextSeasonAvg} next season`}
            />
            <StatTile label="Total growth" value={signed(stats.totalGrowth)} tone="accent" hint="Sum of every +Δ in the plan" />
          </div>

          <div className="panel p-4">
            <h2 className="mb-3 text-sm font-semibold text-zinc-200">Positional cover</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.byGroup.map(({ group, count, minimum }) => {
                const short = count < minimum;
                return (
                  <div key={group} className="rounded-lg border border-line bg-surface-2 p-3">
                    <p className="field-label">{group}s</p>
                    <p className={cn("mt-1 font-mono text-lg font-bold", short ? "text-amber-400" : "text-zinc-100")}>
                      {count}
                      <span className="ml-1 text-xs font-normal text-zinc-600">/ {minimum}</span>
                    </p>
                    {short && <p className="mt-0.5 text-[11px] text-amber-400/80">{minimum - count} short of a full squad</p>}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <h2 className="text-sm font-semibold text-zinc-200">Players in the plan</h2>
              <Link href="/" className="focus-ring rounded-md text-xs text-accent hover:underline">
                Add more from the database
              </Link>
            </div>
            <ul>
              <AnimatePresence initial={false}>
                {squad.map((player) => (
                  <motion.li
                    key={player.id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-3 border-b border-line/60 px-4 py-3 last:border-0"
                  >
                    <span className="chip w-14 justify-center border-line bg-surface-2 text-zinc-400">
                      {player.position}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-zinc-100">{player.name}</span>
                      <span className="block truncate text-xs text-zinc-500">
                        {player.club ?? "Free agent"} · {player.age}y · {wage(player.contract.wage)}
                      </span>
                    </span>
                    <span className="hidden items-center gap-1 sm:flex">
                      <Rating value={player.overall} />
                      <span className="text-zinc-700">→</span>
                      <Rating value={player.potential} />
                    </span>
                    <span className="w-16 text-right font-mono text-sm tabular-nums text-zinc-300">
                      {money(player.value)}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromSquad(versionId, player.id)}
                      aria-label={`Remove ${player.name} from the squad plan`}
                      className="focus-ring rounded-md p-1.5 text-zinc-600 transition hover:text-rose-400"
                    >
                      <X className="size-4" aria-hidden />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
