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
import { useI18n } from "@/i18n/use-i18n";
import { DEFAULT_FILTERS, queryPlayers, type PlayerFilters, type SortKey } from "@/lib/filters";
import { cn } from "@/lib/format";
import { useDataset } from "@/lib/use-dataset";
import { useSearchStore } from "@/store/search";
import { MAX_COMPARE, useCompareIds, useSquadIds, useSquadStore } from "@/store/squad";
import { useToastStore } from "@/store/toast";
import type { DerivedPlayer } from "@/lib/types";

type ViewMode = "table" | "grid";

/**
 * How many players to paint at once.
 *
 * A real dataset is thousands of rows; rendering them all locked up scrolling
 * on a phone. A visible "show more" is cheaper than virtualisation and keeps
 * the page height honest, which matters for the browser's back-scroll.
 */
const PAGE_SIZE = 40;

export function WonderkidsView() {
  const { players, version, versionId } = useDataset();
  const query = useSearchStore((s) => s.query);
  const { d, f, fmt } = useI18n();

  const [filters, setFilters] = useState<PlayerFilters>(DEFAULT_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey>("bargainScore");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [view, setView] = useState<ViewMode>("table");
  const [openPlayerId, setOpenPlayerId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [visible, setVisible] = useState(PAGE_SIZE);

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

  // Any change to what is being asked for starts the list again from the top.
  useEffect(() => {
    setVisible(PAGE_SIZE);
  }, [filters, query, sortKey, sortDir, versionId]);

  const shown = useMemo(() => results.slice(0, visible), [results, visible]);

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
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
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
        title: fmt(d.compare.addedTitle, { name: player.name }),
        description:
          compareIds.length + 1 > MAX_COMPARE
            ? fmt(d.compare.addedDroppedDescription, { max: MAX_COMPARE })
            : d.compare.addedDescription,
        tone: "info",
      });
    }
  };

  const handleToggleSquad = (player: DerivedPlayer) => {
    const wasSelected = squadIds.includes(player.id);
    toggleSquad(versionId, player.id);
    push({
      title: fmt(wasSelected ? d.squad.removedTitle : d.squad.addedTitle, { name: player.name }),
      description: wasSelected ? undefined : d.squad.addedDescription,
      tone: wasSelected ? "info" : "success",
    });
  };

  /**
   * Quick filters that can never match in this version are not offered.
   *
   * The FC 25 source lists a club for every player, so "free agents" would be
   * a button that always returns an empty list. Asking the real filter is
   * cheaper than duplicating its rules here.
   */
  const availablePresets = useMemo(() => {
    const keys = ["bargains", "hiddenGems", "freeAgents", "expiring"] as const;
    return new Set(
      keys.filter(
        (key) =>
          queryPlayers(players, {
            filters: { ...DEFAULT_FILTERS, [key]: true },
            query: "",
            sortKey: "potential",
            sortDir: "desc",
          }).length > 0,
      ),
    );
  }, [players]);

  // Switching version can withdraw a quick filter that was switched on. Clear
  // it, so the list is never narrowed by a control that is no longer on screen.
  useEffect(() => {
    setFilters((prev) => {
      const next = { ...prev };
      let changed = false;
      for (const key of ["bargains", "hiddenGems", "freeAgents", "expiring"] as const) {
        if (next[key] && !availablePresets.has(key)) {
          next[key] = false;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [availablePresets]);

  const presets = [
    {
      key: "bargains" as const,
      icon: Sparkles,
      label: d.players.presets.bargains,
      hint: d.players.presets.bargainsHint,
    },
    {
      key: "hiddenGems" as const,
      icon: Gem,
      label: d.players.presets.hiddenGems,
      hint: d.players.presets.hiddenGemsHint,
    },
    {
      key: "freeAgents" as const,
      icon: HandCoins,
      label: d.players.presets.freeAgents,
      hint: d.players.presets.freeAgentsHint,
    },
    {
      key: "expiring" as const,
      icon: Clock,
      label: d.players.presets.expiring,
      hint: d.players.presets.expiringHint,
    },
  ].filter((preset) => availablePresets.has(preset.key));

  const filterPanel = (hideTitle: boolean) => (
    <FilterPanel filters={filters} onChange={setFilters} expiryYears={expiryYears} hideTitle={hideTitle} />
  );

  return (
    <>
      <PageHeader
        eyebrow={fmt(d.players.eyebrow, { version: version.shortLabel, season: version.season })}
        title={d.players.title}
        description={d.players.description}
        actions={
          <>
            <span className="hidden items-center gap-2 lg:flex">
              <Toggle active={view === "table"} onClick={() => setView("table")}>
                <Rows3 className="size-3.5" aria-hidden /> {d.players.viewTable}
              </Toggle>
              <Toggle active={view === "grid"} onClick={() => setView("grid")}>
                <LayoutGrid className="size-3.5" aria-hidden /> {d.players.viewGrid}
              </Toggle>
            </span>
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="focus-ring chip border-line bg-surface-2 text-zinc-300 lg:hidden"
            >
              <SlidersHorizontal className="size-3.5" aria-hidden /> {d.players.filtersButton}
            </button>
          </>
        }
      />

      {/* One swipeable row on phones, a 2x2 then 1x4 grid once there is room. */}
      <div className="-mx-4 mb-5 grid grid-flow-col auto-cols-[10.5rem] gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
        <StatTile
          label={d.players.stats.matching}
          value={summary.count}
          hint={fmt(d.players.stats.matchingHint, { total: players.length })}
        />
        <StatTile
          label={d.players.stats.averageGrowth}
          value={`+${f.decimal(summary.avgGrowth)}`}
          tone="accent"
          hint={d.players.stats.averageGrowthHint}
        />
        <StatTile label={d.players.stats.hiddenGems} value={summary.gems} hint={d.players.stats.hiddenGemsHint} />
        <StatTile
          label={d.players.stats.cheapest}
          value={summary.cheapest ? f.money(summary.cheapest.value) : "—"}
          hint={summary.cheapest?.name ?? d.players.stats.cheapestEmpty}
        />
      </div>

      <div className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
        {presets.map(({ key, icon: Icon, label, hint }) => (
          <span key={key} className="shrink-0">
            <Toggle active={filters[key]} onClick={() => setFilters({ ...filters, [key]: !filters[key] })} title={hint}>
              <Icon className="size-3.5" aria-hidden />
              {label}
            </Toggle>
          </span>
        ))}
      </div>

      <div className="flex gap-6">
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="panel sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto p-4">{filterPanel(false)}</div>
        </aside>

        <div className="min-w-0 flex-1">
          {results.length === 0 ? (
            <EmptyState title={d.players.emptyTitle} hint={d.players.emptyHint} />
          ) : (
            <>
              {view === "table" && (
                <div className="hidden lg:block">
                  <PlayerTable
                    players={shown}
                    sortKey={sortKey}
                    sortDir={sortDir}
                    onSort={handleSort}
                    onOpen={(p) => setOpenPlayerId(p.id)}
                    onToggleSquad={handleToggleSquad}
                    onToggleCompare={handleToggleCompare}
                    squadIds={squadIds}
                    compareIds={compareIds}
                  />
                </div>
              )}
              <motion.div
                layout
                className={cn(
                  "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
                  view === "table" && "lg:hidden",
                )}
              >
                <AnimatePresence mode="popLayout">
                  {shown.map((player) => (
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

              {results.length > shown.length && (
                <div className="mt-5 flex flex-col items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="focus-ring w-full rounded-lg border border-accent/50 bg-accent/10 px-4 py-3 text-sm font-semibold text-accent transition hover:bg-accent/20 sm:w-auto sm:px-8"
                  >
                    {d.players.showMore}
                  </button>
                  <p className="text-xs text-zinc-500">
                    {fmt(d.players.showingCount, { shown: shown.length, total: results.length })}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <Dialog.Root open={filtersOpen} onOpenChange={setFiltersOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden" />
          <Dialog.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[85dvh] overflow-y-auto rounded-t-2xl border-t border-line bg-surface p-5 shadow-2xl focus:outline-none lg:hidden">
            <div className="mb-4 flex items-center justify-between">
              <Dialog.Title className="text-sm font-semibold text-zinc-100">{d.filters.title}</Dialog.Title>
              <Dialog.Close className="focus-ring rounded-lg p-1.5 text-zinc-500" aria-label={d.common.close}>
                <X className="size-5" aria-hidden />
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">{d.players.mobileFiltersDescription}</Dialog.Description>
            {filterPanel(true)}
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              className="focus-ring mt-5 w-full rounded-lg border border-accent/50 bg-accent/15 px-3 py-2.5 text-sm font-semibold text-accent"
            >
              {fmt(d.players.showPlayers, { count: results.length })}
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
