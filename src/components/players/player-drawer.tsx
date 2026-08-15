"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { GitCompareArrows, Link2, UserPlus, X } from "lucide-react";
import { GrowthChart } from "@/components/charts/growth-chart";
import { RadarChart } from "@/components/charts/radar-chart";
import { Rating } from "@/components/ui/primitives";
import { PlayerBadges } from "./player-badges";
import { radarStats } from "@/lib/derive";
import { cn, contractEnd, growthTone, money, monthsLabel, signed, wage } from "@/lib/format";
import { GROWTH_TYPE_NOTE, nextSeasonOverall, projectGrowth } from "@/lib/growth";
import { copyWithToast } from "@/store/toast";
import type { DerivedPlayer, GameVersionId } from "@/lib/types";

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line/60 py-1.5 last:border-0">
      <dt className="text-xs text-zinc-500">{label}</dt>
      <dd className="text-right font-mono text-xs text-zinc-200">{value}</dd>
    </div>
  );
}

export function PlayerDrawer({
  player,
  versionId,
  onClose,
  onToggleSquad,
  onToggleCompare,
  inSquad,
  inCompare,
}: {
  player: DerivedPlayer | null;
  versionId: GameVersionId;
  onClose: () => void;
  onToggleSquad: (player: DerivedPlayer) => void;
  onToggleCompare: (player: DerivedPlayer) => void;
  inSquad: boolean;
  inCompare: boolean;
}) {
  const open = player !== null;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="fixed inset-y-0 right-0 z-50 w-[min(30rem,100vw)] overflow-y-auto border-l border-line bg-surface shadow-2xl focus:outline-none">
          {player && (
            <div className="flex min-h-full flex-col gap-5 p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Dialog.Title className="truncate text-lg font-bold text-zinc-50">{player.name}</Dialog.Title>
                  <Dialog.Description className="truncate text-xs text-zinc-500">
                    {player.club ?? "Free agent"}
                    {player.league ? ` · ${player.league}` : ""} · {player.nation}
                  </Dialog.Description>
                </div>
                <Dialog.Close className="focus-ring rounded-lg p-1.5 text-zinc-500 hover:text-zinc-200" aria-label="Close">
                  <X className="size-5" aria-hidden />
                </Dialog.Close>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="chip border-line bg-surface-2 text-zinc-200">{player.position}</span>
                {player.altPositions.map((pos) => (
                  <span key={pos} className="chip border-line/60 bg-surface-2/60 text-zinc-500">
                    {pos}
                  </span>
                ))}
                <span className="chip border-line bg-surface-2 text-zinc-400">{player.age} years</span>
                <span className="chip border-line bg-surface-2 text-zinc-400">{player.foot} footed</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-center">
                  <p className="field-label">Overall</p>
                  <Rating value={player.overall} className="mt-1 text-base" />
                </div>
                <span className="text-zinc-700">→</span>
                <div className="text-center">
                  <p className="field-label">Potential</p>
                  <Rating value={player.potential} className="mt-1 text-base" />
                </div>
                <div className="ml-auto text-right">
                  <p className="field-label">Growth</p>
                  <p className={cn("mt-1 font-mono text-lg font-bold", growthTone(player.growth))}>
                    {signed(player.growth)}
                  </p>
                </div>
              </div>

              <PlayerBadges player={player} />

              <section className="panel p-4">
                <div className="mb-3 flex items-baseline justify-between gap-2">
                  <h3 className="text-sm font-semibold text-zinc-200">Projected growth curve</h3>
                  <span className="chip border-line bg-surface-2 text-zinc-400">{player.growthType}</span>
                </div>
                <GrowthChart
                  series={[
                    {
                      id: player.id,
                      label: player.name,
                      color: "var(--color-accent)",
                      points: projectGrowth(player),
                      potential: player.potential,
                    },
                  ]}
                />
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">{GROWTH_TYPE_NOTE[player.growthType]}</p>
                <p className="mt-1 text-xs text-zinc-400">
                  End of next season:{" "}
                  <span className="font-mono font-semibold text-accent">{nextSeasonOverall(player)} OVR</span>
                </p>
              </section>

              <section className="panel flex flex-col items-center p-4">
                <h3 className="mb-2 self-start text-sm font-semibold text-zinc-200">Attributes</h3>
                <RadarChart
                  axes={radarStats(player).map((s) => s.short)}
                  series={[
                    {
                      id: player.id,
                      label: player.name,
                      color: "var(--color-accent)",
                      values: radarStats(player).map((s) => s.value),
                    },
                  ]}
                />
                <dl className="mt-2 grid w-full grid-cols-3 gap-2">
                  {radarStats(player).map((stat) => (
                    <div key={stat.key} className="rounded-lg border border-line bg-surface-2 px-2 py-1.5 text-center">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{stat.short}</dt>
                      <dd className="font-mono text-sm font-semibold text-zinc-100">{stat.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="panel p-4">
                <h3 className="mb-2 text-sm font-semibold text-zinc-200">Contract & cost</h3>
                <dl>
                  <Row label="Transfer value" value={money(player.value)} />
                  <Row label="Weekly wage" value={player.isFreeAgent ? "—" : wage(player.contract.wage)} />
                  <Row
                    label="Release clause"
                    value={player.contract.releaseClause ? money(player.contract.releaseClause) : "None"}
                  />
                  <Row
                    label="Contract expires"
                    value={
                      player.isFreeAgent
                        ? "Free agent"
                        : `${contractEnd(player.contract.expiresYear, player.contract.expiresMonth)} · ${monthsLabel(player.monthsRemaining)}`
                    }
                  />
                  <Row
                    label="Cost per growth point"
                    value={player.growth > 0 ? money(player.costPerGrowthPoint) : "—"}
                  />
                  <Row label="Bargain score" value={`${player.bargainScore}/100`} />
                </dl>
              </section>

              {(player.playStyles.length > 0 || player.playStylesPlus.length > 0) && (
                <section className="panel p-4">
                  <h3 className="mb-2 text-sm font-semibold text-zinc-200">PlayStyles</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {player.playStylesPlus.map((style) => (
                      <span key={style} className="chip border-gold/50 bg-gold/10 text-gold">
                        {style}+
                      </span>
                    ))}
                    {player.playStyles.map((style) => (
                      <span key={style} className="chip border-line bg-surface-2 text-zinc-300">
                        {style}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex gap-3 text-xs text-zinc-400">
                    <span>
                      Weak foot <span className="font-mono text-zinc-100">{player.weakFoot}★</span>
                    </span>
                    <span>
                      Skills <span className="font-mono text-zinc-100">{player.skillMoves}★</span>
                    </span>
                    <span>
                      <span className="font-mono text-zinc-100">{player.height}cm</span> / {player.weight}kg
                    </span>
                  </div>
                </section>
              )}

              <section className="panel border-accent/25 bg-accent/5 p-4">
                <h3 className="mb-1.5 text-sm font-semibold text-accent">Scout report</h3>
                <p className="text-sm leading-relaxed text-zinc-300">{player.scoutNote}</p>
              </section>

              <div className="mt-auto flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onToggleSquad(player)}
                  className={cn(
                    "focus-ring flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition",
                    inSquad
                      ? "border-accent/60 bg-accent/15 text-accent"
                      : "border-line bg-surface-2 text-zinc-300 hover:border-accent/50",
                  )}
                >
                  <UserPlus className="size-4" aria-hidden />
                  {inSquad ? "In squad plan" : "Add to squad"}
                </button>
                <button
                  type="button"
                  onClick={() => onToggleCompare(player)}
                  className={cn(
                    "focus-ring flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition",
                    inCompare
                      ? "border-sky-500/60 bg-sky-500/15 text-sky-300"
                      : "border-line bg-surface-2 text-zinc-300 hover:border-sky-500/50",
                  )}
                >
                  <GitCompareArrows className="size-4" aria-hidden />
                  Compare
                </button>
                <button
                  type="button"
                  onClick={() =>
                    copyWithToast(
                      `${window.location.origin}/?v=${versionId}&player=${player.id}`,
                      "Player link copied",
                      `${player.name} — opens straight to this scout report.`,
                    )
                  }
                  title="Copy share link"
                  className="focus-ring rounded-lg border border-line bg-surface-2 px-3 py-2 text-zinc-300 transition hover:border-accent/50 hover:text-accent"
                >
                  <Link2 className="size-4" aria-hidden />
                  <span className="sr-only">Copy share link</span>
                </button>
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
