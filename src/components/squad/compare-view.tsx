"use client";

import { useMemo, useState } from "react";
import { Plus, X } from "lucide-react";
import { GrowthChart } from "@/components/charts/growth-chart";
import { RadarChart } from "@/components/charts/radar-chart";
import { EmptyState, PageHeader, Rating } from "@/components/ui/primitives";
import { radarStats } from "@/lib/derive";
import { cn, growthTone, money, signed, wage } from "@/lib/format";
import { projectGrowth } from "@/lib/growth";
import { scoreRecord } from "@/lib/fuzzy";
import { useDataset } from "@/lib/use-dataset";
import { MAX_COMPARE, useCompareIds, useSquadStore } from "@/store/squad";
import type { DerivedPlayer } from "@/lib/types";

const SERIES_COLORS = ["var(--color-accent)", "#38bdf8", "#fbbf24"];

/** Rows of the head-to-head table. `better: "low"` means a smaller number wins. */
const METRICS: {
  label: string;
  hint: string;
  value: (p: DerivedPlayer) => number;
  format: (p: DerivedPlayer) => string;
  better: "high" | "low";
}[] = [
  { label: "Overall", hint: "Current rating", value: (p) => p.overall, format: (p) => String(p.overall), better: "high" },
  { label: "Potential", hint: "Career ceiling", value: (p) => p.potential, format: (p) => String(p.potential), better: "high" },
  { label: "Growth", hint: "Potential minus overall", value: (p) => p.growth, format: (p) => signed(p.growth), better: "high" },
  { label: "Age", hint: "Seasons of growth left", value: (p) => p.age, format: (p) => `${p.age}`, better: "low" },
  { label: "Transfer value", hint: "Asking price baseline", value: (p) => p.value, format: (p) => money(p.value), better: "low" },
  {
    label: "Weekly wage",
    hint: "Ongoing budget hit",
    value: (p) => p.contract.wage,
    format: (p) => (p.isFreeAgent ? "—" : wage(p.contract.wage)),
    better: "low",
  },
  {
    label: "Wage per OVR point",
    hint: "What each rating point costs you every week",
    value: (p) => Math.round(p.contract.wage / Math.max(1, p.overall)),
    format: (p) => (p.isFreeAgent ? "—" : `${money(Math.round(p.contract.wage / Math.max(1, p.overall)))}/wk`),
    better: "low",
  },
  {
    label: "Fee per growth point",
    hint: "What each future rating point costs up front",
    value: (p) => (p.growth > 0 ? p.costPerGrowthPoint : Number.MAX_SAFE_INTEGER),
    format: (p) => (p.growth > 0 ? money(p.costPerGrowthPoint) : "—"),
    better: "low",
  },
  { label: "Bargain score", hint: "Composite signing rating out of 100", value: (p) => p.bargainScore, format: (p) => `${p.bargainScore}`, better: "high" },
];

function PlayerPicker({ onPick, taken }: { onPick: (player: DerivedPlayer) => void; taken: string[] }) {
  const { players } = useDataset();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const pool = players.filter((p) => !taken.includes(p.id));
    if (!query.trim()) return pool.slice(0, 6);
    return pool
      .map((player) => ({
        player,
        score: scoreRecord(
          [
            { value: player.name, weight: 1 },
            { value: player.club, weight: 0.8 },
            { value: player.position, weight: 0.7 },
          ],
          query,
        ),
      }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((r) => r.player);
  }, [players, query, taken]);

  return (
    <div className="panel flex flex-col gap-3 p-4">
      <div className="flex items-center gap-2 text-zinc-400">
        <Plus className="size-4" aria-hidden />
        <span className="text-sm font-medium">Add a player</span>
      </div>
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search the database…"
        aria-label="Search for a player to compare"
        className="focus-ring rounded-lg border border-line bg-surface-2 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600"
      />
      <ul className="flex flex-col gap-1">
        {results.map((player) => (
          <li key={player.id}>
            <button
              type="button"
              onClick={() => {
                onPick(player);
                setQuery("");
              }}
              className="focus-ring flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition hover:bg-surface-2"
            >
              <span className="chip w-12 justify-center border-line bg-surface-2 text-[10px] text-zinc-500">
                {player.position}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm text-zinc-200">{player.name}</span>
              <span className="font-mono text-xs text-zinc-500">
                {player.overall}→{player.potential}
              </span>
            </button>
          </li>
        ))}
        {results.length === 0 && <li className="px-2 py-1.5 text-xs text-zinc-600">No players match that search.</li>}
      </ul>
    </div>
  );
}

export function CompareView() {
  const { players, versionId, version } = useDataset();
  const compareIds = useCompareIds(versionId);
  const toggleCompare = useSquadStore((s) => s.toggleCompare);
  const clearCompare = useSquadStore((s) => s.clearCompare);

  const selected = useMemo(
    () => compareIds.map((id) => players.find((p) => p.id === id)).filter((p): p is DerivedPlayer => Boolean(p)),
    [compareIds, players],
  );

  // Goalkeepers and outfielders use different card stats, so a mixed slate
  // cannot share one radar. Only overlay when the whole slate agrees.
  const axesSource = selected[0];
  const sameStatSet =
    selected.length > 0 && selected.every((p) => (p.position === "GK") === (axesSource?.position === "GK"));

  return (
    <>
      <PageHeader
        eyebrow={`${version.shortLabel} · ${version.season}`}
        title="Player Comparison"
        description="Side-by-side attribute radars, growth curves on one axis, and the wage-versus-performance maths that decides which of two wonderkids you can actually afford."
        actions={
          selected.length > 0 ? (
            <button
              type="button"
              onClick={() => clearCompare(versionId)}
              className="focus-ring chip border-line bg-surface-2 text-zinc-400 hover:text-rose-300"
            >
              Clear comparison
            </button>
          ) : undefined
        }
      />

      <div className="mb-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {selected.map((player, index) => (
          <div key={player.id} className="panel flex items-start gap-3 p-4">
            <span
              className="mt-1 size-3 shrink-0 rounded-full"
              style={{ background: SERIES_COLORS[index % SERIES_COLORS.length] }}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-zinc-50">{player.name}</p>
              <p className="truncate text-xs text-zinc-500">
                {player.club ?? "Free agent"} · {player.position} · {player.age}y
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <Rating value={player.overall} />
                <span className="text-zinc-700">→</span>
                <Rating value={player.potential} />
                <span className={cn("ml-1 font-mono text-xs font-semibold", growthTone(player.growth))}>
                  {signed(player.growth)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggleCompare(versionId, player.id)}
              aria-label={`Remove ${player.name} from the comparison`}
              className="focus-ring rounded-md p-1 text-zinc-600 hover:text-rose-400"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        ))}
        {selected.length < MAX_COMPARE && <PlayerPicker onPick={(p) => toggleCompare(versionId, p.id)} taken={compareIds} />}
      </div>

      {selected.length === 0 ? (
        <EmptyState
          title="Nothing selected yet"
          hint="Pick up to three players — from the search above or the compare button in the database — to overlay their radars, growth curves and cost ratios."
        />
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 lg:grid-cols-2">
            <section className="panel flex flex-col items-center p-4">
              <h2 className="mb-2 self-start text-sm font-semibold text-zinc-200">Attribute radar</h2>
              {sameStatSet && axesSource ? (
                <RadarChart
                  axes={radarStats(axesSource).map((s) => s.short)}
                  series={selected.map((player, index) => ({
                    id: player.id,
                    label: player.name,
                    color: SERIES_COLORS[index % SERIES_COLORS.length]!,
                    values: radarStats(player).map((s) => s.value),
                  }))}
                  size={300}
                />
              ) : (
                <p className="py-10 text-center text-xs text-zinc-500">
                  Goalkeepers and outfield players use different card stats, so they can&apos;t share one radar. Compare
                  keepers against keepers.
                </p>
              )}
            </section>

            <section className="panel p-4">
              <h2 className="mb-2 text-sm font-semibold text-zinc-200">Growth curves</h2>
              <GrowthChart
                height={230}
                series={selected.map((player, index) => ({
                  id: player.id,
                  label: player.name,
                  color: SERIES_COLORS[index % SERIES_COLORS.length]!,
                  points: projectGrowth(player),
                  potential: player.potential,
                }))}
              />
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                Solid lines are projected overall by age; the dashed line of the same colour is that player&apos;s
                potential ceiling.
              </p>
            </section>
          </div>

          <section className="panel overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    Metric
                  </th>
                  {selected.map((player, index) => (
                    <th key={player.id} scope="col" className="px-4 py-3 text-right text-xs font-semibold text-zinc-200">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="size-2 rounded-full"
                          style={{ background: SERIES_COLORS[index % SERIES_COLORS.length] }}
                          aria-hidden
                        />
                        {player.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {METRICS.map((metric) => {
                  const values = selected.map(metric.value);
                  const best = metric.better === "high" ? Math.max(...values) : Math.min(...values);
                  const uniqueWinner = values.filter((v) => v === best).length === 1;
                  return (
                    <tr key={metric.label} className="border-b border-line/60 last:border-0">
                      <th scope="row" className="px-4 py-2.5 text-left font-normal">
                        <span className="block text-xs text-zinc-300">{metric.label}</span>
                        <span className="block text-[11px] text-zinc-600">{metric.hint}</span>
                      </th>
                      {selected.map((player, index) => (
                        <td
                          key={player.id}
                          className={cn(
                            "px-4 py-2.5 text-right font-mono text-xs tabular-nums",
                            uniqueWinner && values[index] === best ? "font-bold text-accent" : "text-zinc-300",
                          )}
                        >
                          {metric.format(player)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>
      )}
    </>
  );
}
