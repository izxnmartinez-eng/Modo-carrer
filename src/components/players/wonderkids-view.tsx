"use client";

import { useEffect, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Gem, HandCoins, LayoutGrid, Rows3, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { EmptyState, PageHeader, StatTile, Toggle } from "@/components/ui/primitives";
import { FilterPanel } from "./filter-panel";
import { PlayerCard } from "./player-card";
import { PlayerDrawer } from "./player-drawer";
import { PlayerTable } from "./player-table";
import { DEFAULT_FILTERS, queryPlayers, type PlayerFilters, type SortKey } from "@/lib/filters";
import { money } from "@/lib/format";
import { useDataset } from "@/lib/use-dataset";
import { useSearchStore } from "@/store/search";
import { MAX_COMPARE, useCompareIds, useSquadIds, useSquadStore } from "@/store/squad";
import { useToastStore } from "@/store/toast";
import type { DerivedPlayer } from "@/lib/types";

type ViewMode = "table" | "grid";

export function WonderkidsView() {
  const { players, version, versionId } = useDataset();
  const query = useSearchStore((s) => s.query);

  const [filters, setFilters] = useState<PlayerFilters>(DEFAULT_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey>("bargainScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [view, setView] = useState<ViewMode>("table");
  const [openPlayerId, setOpenPlayerId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const squadIds = useSquadIds(versionId);
  const compareIds = useCompareIds(versionId);
  const toggleSquad = useSquadStore((s) => s.toggleSquad);
  const toggleCompare = useSquadStore((s) => s.toggleCompare);
  const push = useToastStore((s) => s.push);

  // Deep link support: `/?player=<id>` opens straight to a scout report.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("player");
    if (id) setOpenPlayerId(id);
  }, []);

  const expiryYears = useMemo(
    () =>
      Array.from(new Set(players.filter((p) => !p.isFreeAgent).map((p) => p.contract.expiresYear))).sort(
        (a, b) => a - b,
      ),
    [players],
  );

  const results = useMemo(
    () => queryPlayers(players, { filters, query, sortKey, sortDir }),
    [players, filters, query, sortKey, sortDir],
  );

  const openPlayer = players.find((p) => p.id === openPlayerId) ?? null;

  const summary = useMemo(() => {
    if (results.length === 0) {
      return { count: 0, avgGrowth: 0, cheapest: null as DerivedPlayer | null, gems: 0 };
    }
    const totalGrowth = results.reduce((sum, p) => sum + p.growth, 0);
    const withValue = results.filter((p) => p.value > 0);
    const cheapest = withValue.reduce<DerivedPlayer | null>(
      (best, p) => (best === null || p.value < best.value ? p : best),
      null,
    );
    return {
      count: results.length,
      avgGrowth: Math.round((totalGrowth / results.length) * 10) / 10,
      cheapest,
      gems: results.filter((p) => p.isHiddenGem).length,
    };
  }, [results]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" || key === "age" || key === "value" || key === "wage" ? "asc" : "desc");
    }
  };

  const handleToggleCompare = (player: DerivedPlayer) => {
    const wasSelected = compareIds.includes(player.id);
    toggleCompare(versionId, player.id);
    if (!wasSelected) {
      push({
        title: `${player.name} added to comparison`,
        description:
          compareIds.length + 1 > MAX_COMPARE
            ? `The comparison holds ${MAX_COMPARE} players — the oldest selection was dropped.`
            : "Open the Player Comparison tab to see the radar overlay.",
        tone: "info",
      });
    }
  };

  const handleToggleSquad = (player: DerivedPlayer) => {
    const wasSelected = squadIds.includes(player.id);
    toggleSquad(versionId, player.id);
    push({
      title: wasSelected ? `${player.name} removed from squad plan` : `${player.name} added to squad plan`,
      description: wasSelected ? undefined : "Wage budget and age profile updated in the Squad Planner.",
      tone: wasSelected ? "info" : "success",
    });
  };

  const presets = [
    {
      key: "bargains" as const,
      icon: Sparkles,
      label: "Bargains",
      hint: "High potential relative to fee and wage",
    },
    { key: "hiddenGems" as const, icon: Gem, label: "Hidden gems", hint: "POT above 82 with OVR under 68" },
    { key: "freeAgents" as const, icon: HandCoins, label: "Free agents", hint: "No club, no transfer fee" },
    {
      key: "expiring" as const,
      icon: Clock,
      label: "Expiring (6 months)",
      hint: "Free pre-contract in the January window",
    },
  ];

  const filterPanel = (
    <FilterPanel filters={filters} onChange={setFilters} expiryYears={expiryYears} />
  );

  return (
    <>
      <PageHeader
        eyebrow={`${version.shortLabel} · ${version.season}`}
        title="Wonderkids & Gem Finder"
        description="Every player in the dataset ranked by how good a Career Mode signing he is — potential, growth curve, release clause and wage burden, not Ultimate Team price."
        actions={
          <>
            <Toggle active={view === "table"} onClick={() => setView("table")}>
              <Rows3 className="size-3.5" aria-hidden /> Table
            </Toggle>
            <Toggle active={view === "grid"} onClick={() => setView("grid")}>
              <LayoutGrid className="size-3.5" aria-hidden /> Grid
            </Toggle>
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="focus-ring chip border-line bg-surface-2 text-zinc-300 lg:hidden"
            >
              <SlidersHorizontal className="size-3.5" aria-hidden /> Filters
            </button>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Matching players" value={summary.count} hint={`of ${players.length} in the dataset`} />
        <StatTile label="Average growth" value={`+${summary.avgGrowth}`} tone="accent" hint="Potential minus overall" />
        <StatTile label="Hidden gems" value={summary.gems} hint="POT > 82 and OVR < 68" />
        <StatTile
          label="Cheapest match"
          value={summary.cheapest ? money(summary.cheapest.value) : "—"}
          hint={summary.cheapest?.name ?? "No priced player in range"}
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {presets.map(({ key, icon: Icon, label, hint }) => (
          <Toggle key={key} active={filters[key]} onClick={() => setFilters({ ...filters, [key]: !filters[key] })} title={hint}>
            <Icon className="size-3.5" aria-hidden />
            {label}
          </Toggle>
        ))}
      </div>

      <div className="flex gap-6">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="panel sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto p-4">{filterPanel}</div>
        </aside>

        <div className="min-w-0 flex-1">
          {results.length === 0 ? (
            <EmptyState
              title="No players match those filters"
              hint="Career Mode datasets are small by design. Widen the potential range, clear a preset, or reset the filters to see the full board."
            />
          ) : view === "table" ? (
            <PlayerTable
              players={results}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={handleSort}
              onOpen={(p) => setOpenPlayerId(p.id)}
              onToggleSquad={handleToggleSquad}
              onToggleCompare={handleToggleCompare}
              squadIds={squadIds}
              compareIds={compareIds}
            />
          ) : (
            <motion.div layout className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {results.map((player) => (
                  <PlayerCard
                    key={player.id}
                    player={player}
                    onOpen={() => setOpenPlayerId(player.id)}
                    onToggleSquad={() => handleToggleSquad(player)}
                    onToggleCompare={() => handleToggleCompare(player)}
                    inSquad={squadIds.includes(player.id)}
                    inCompare={compareIds.includes(player.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Dialog.Root open={filtersOpen} onOpenChange={setFiltersOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-2xl border-t border-line bg-surface p-5 shadow-2xl focus:outline-none lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="text-sm font-semibold text-zinc-100">Filters</Dialog.Title>
              <Dialog.Close className="focus-ring rounded-lg p-1.5 text-zinc-500" aria-label="Close filters">
                <X className="size-5" aria-hidden />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">
              Narrow the player database by age, rating, potential, cost and contract status.
            </Dialog.Description>
            {filterPanel}
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="focus-ring mt-5 w-full rounded-lg border border-accent/50 bg-accent/15 px-3 py-2.5 text-sm font-semibold text-accent"
            >
              Show {results.length} players
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <PlayerDrawer
        player={openPlayer}
        versionId={versionId}
        onClose={() => setOpenPlayerId(null)}
        onToggleSquad={handleToggleSquad}
        onToggleCompare={handleToggleCompare}
        inSquad={openPlayer ? squadIds.includes(openPlayer.id) : false}
        inCompare={openPlayer ? compareIds.includes(openPlayer.id) : false}
      />
    </>
  );
}
