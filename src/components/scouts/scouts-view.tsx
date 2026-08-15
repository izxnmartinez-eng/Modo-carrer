"use client";

import { useMemo, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { motion } from "framer-motion";
import { Cake, Info, Radar, Star } from "lucide-react";
import { EmptyState, PageHeader, StatTile, Toggle } from "@/components/ui/primitives";
import { calculateAcademy, type FacilityLevel } from "@/lib/academy";
import { cn, money } from "@/lib/format";
import { scoreRecord } from "@/lib/fuzzy";
import { useDataset } from "@/lib/use-dataset";
import { useSearchStore } from "@/store/search";
import type { Scout } from "@/lib/types";

const FACILITIES: { level: FacilityLevel; label: string }[] = [
  { level: 1, label: "Basic" },
  { level: 2, label: "Good" },
  { level: 3, label: "Excellent" },
];

function StarPicker({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="field-label">{label}</span>
        <span className="font-mono text-xs text-zinc-300">{value}★</span>
      </div>
      <div className="mt-2 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            aria-label={`${label} ${star} stars`}
            aria-pressed={value === star}
            className={cn(
              "focus-ring rounded-md border p-1.5 transition",
              star <= value
                ? "border-accent/50 bg-accent/15 text-accent"
                : "border-line bg-surface-2 text-zinc-600 hover:text-zinc-400",
            )}
          >
            <Star className={cn("size-3.5", star <= value && "fill-current")} aria-hidden />
          </button>
        ))}
      </div>
      <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-600">{hint}</p>
    </div>
  );
}

/** Weekly cost of the requested calibre of scout, priced off the dataset's own scouts. */
function estimateWeeklyCost(scouts: Scout[], count: number, experience: number, judgment: number): number {
  const eligible = scouts.filter((s) => s.experience >= experience && s.judgment >= judgment);
  const pool = eligible.length > 0 ? eligible : scouts;
  const cheapest = pool.reduce((best, s) => (s.cost < best.cost ? s : best), pool[0]!);
  return cheapest.cost * count;
}

function AcademyCalculator() {
  const { scouting, version } = useDataset();
  const [scoutCount, setScoutCount] = useState(3);
  const [experience, setExperience] = useState(5);
  const [judgment, setJudgment] = useState(5);
  const [months, setMonths] = useState(12);
  const [facilities, setFacilities] = useState<FacilityLevel>(3);
  const [regionId, setRegionId] = useState(scouting.regions[0]?.id ?? "");

  const region = scouting.regions.find((r) => r.id === regionId) ?? scouting.regions[0]!;
  const weeklyCost = estimateWeeklyCost(scouting.scouts, scoutCount, experience, judgment);

  const result = useMemo(
    () =>
      calculateAcademy(
        { scouts: scoutCount, experience, judgment, region, months, facilities },
        version,
        weeklyCost,
      ),
    [scoutCount, experience, judgment, region, months, facilities, version, weeklyCost],
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
      <div className="panel flex flex-col gap-5 p-4">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="field-label">Scouts assigned</span>
            <span className="font-mono text-xs text-zinc-300">{scoutCount}</span>
          </div>
          <div className="mt-2 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((count) => (
              <Toggle key={count} active={scoutCount === count} onClick={() => setScoutCount(count)}>
                {count}
              </Toggle>
            ))}
          </div>
        </div>

        <StarPicker
          label="Experience"
          value={experience}
          onChange={setExperience}
          hint="How many players each scout reports back per season, and how quickly the first reports arrive."
        />
        <StarPicker
          label="Judgment"
          value={judgment}
          onChange={setJudgment}
          hint="How accurate the star range is, and how high the potential he is allowed to find goes."
        />

        <div>
          <p className="field-label mb-2">Scouting region</p>
          <div className="flex flex-wrap gap-1.5">
            {scouting.regions.map((r) => (
              <Toggle key={r.id} active={r.id === region.id} onClick={() => setRegionId(r.id)} title={r.note}>
                {r.name}
              </Toggle>
            ))}
          </div>
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">{region.note}</p>
        </div>

        <div>
          <p className="field-label mb-2">Months on assignment</p>
          <div className="flex flex-wrap gap-1.5">
            {[3, 6, 9, 12].map((m) => (
              <Toggle key={m} active={months === m} onClick={() => setMonths(m)}>
                {m} mo
              </Toggle>
            ))}
          </div>
        </div>

        <div>
          <p className="field-label mb-2">Youth facilities</p>
          <div className="flex flex-wrap gap-1.5">
            {FACILITIES.map((f) => (
              <Toggle key={f.level} active={facilities === f.level} onClick={() => setFacilities(f.level)}>
                {f.label}
              </Toggle>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setScoutCount(3);
            setExperience(5);
            setJudgment(5);
            setMonths(12);
            setFacilities(3);
          }}
          className="focus-ring rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-xs font-semibold text-accent transition hover:bg-accent/20"
        >
          Load the 5★ experience / 5★ judgment benchmark
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile label="Players per intake" value={result.playersFound} hint={`${region.name} assignment`} />
          <StatTile label="Potential ceiling" value={result.potentialCeiling} tone="accent" hint={`Cap for ${version.shortLabel} is ${version.potentialCap}`} />
          <StatTile
            label="Chance of an 85+ gem"
            value={`${Math.round(result.gemChance * 100)}%`}
            tone={result.gemChance > 0.5 ? "accent" : "default"}
            hint="At least one per intake"
          />
          <StatTile label="Scouting cost" value={`${money(result.weeklyCost)}/wk`} hint={`${scoutCount} scouts`} />
        </div>

        <div className="panel p-4">
          <h3 className="mb-2 text-sm font-semibold text-zinc-200">What this setup returns</h3>
          <p className="text-sm leading-relaxed text-zinc-300">{result.verdict}</p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-line bg-surface-2 p-3">
              <dt className="field-label">Typical prospect</dt>
              <dd className="mt-1 font-mono text-sm text-zinc-100">
                {result.averageOverall} → {result.averagePotential}
              </dd>
            </div>
            <div className="rounded-lg border border-line bg-surface-2 p-3">
              <dt className="field-label">Report spread</dt>
              <dd className="mt-1 font-mono text-sm text-zinc-100">±{result.reportSpread}★</dd>
            </div>
            <div className="rounded-lg border border-line bg-surface-2 p-3">
              <dt className="field-label">First reports</dt>
              <dd className="mt-1 font-mono text-sm text-zinc-100">{result.monthsToFirstReport} mo</dd>
            </div>
          </dl>
        </div>

        <div className="panel p-4">
          <h3 className="mb-2 text-sm font-semibold text-zinc-200">How to improve it</h3>
          <ul className="flex flex-col gap-2">
            {result.advice.map((item) => (
              <li key={item} className="flex gap-2 text-xs leading-relaxed text-zinc-400">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="panel p-4">
          <h3 className="mb-3 text-sm font-semibold text-zinc-200">Scouts available in {version.shortLabel}</h3>
          <ul className="flex flex-col gap-1.5">
            {scouting.scouts.map((scout) => (
              <li key={scout.id}>
                <button
                  type="button"
                  onClick={() => {
                    setExperience(scout.experience);
                    setJudgment(scout.judgment);
                  }}
                  className="focus-ring flex w-full items-center gap-3 rounded-lg border border-line bg-surface-2 px-3 py-2 text-left transition hover:border-accent/40"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-zinc-100">{scout.name}</span>
                    <span className="block truncate text-[11px] text-zinc-500">
                      {scout.nation} · {scout.specialty}
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-zinc-400">
                    {scout.experience}★ exp / {scout.judgment}★ jdg
                  </span>
                  <span className="shrink-0 font-mono text-xs text-zinc-300">{money(scout.cost)}/wk</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <p className="flex gap-2 rounded-lg border border-line bg-surface/60 p-3 text-[11px] leading-relaxed text-zinc-500">
          <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          The engine never publishes its real numbers. This is a transparent model fitted to observed behaviour — every
          coefficient lives in <code className="font-mono text-zinc-400">src/lib/academy.ts</code> and can be re-tuned in
          one place.
        </p>
      </div>
    </div>
  );
}

function RegenTracker() {
  const { scouting, version } = useDataset();
  const query = useSearchStore((s) => s.query);
  const [positionFilter, setPositionFilter] = useState<string | null>(null);

  const positions = useMemo(
    () => Array.from(new Set(scouting.regens.map((r) => r.position))),
    [scouting.regens],
  );

  const visible = useMemo(() => {
    const trimmed = query.trim();
    return scouting.regens.filter((regen) => {
      if (positionFilter && regen.position !== positionFilter) return false;
      if (!trimmed) return true;
      return (
        scoreRecord(
          [
            { value: regen.legend, weight: 1 },
            { value: regen.nation, weight: 0.7 },
            { value: regen.position, weight: 0.7 },
          ],
          trimmed,
        ) > 0
      );
    });
  }, [scouting.regens, positionFilter, query]);

  return (
    <div className="flex flex-col gap-4">
      <div className="panel flex gap-2 p-3 text-xs leading-relaxed text-zinc-400">
        <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
        <p>
          When a real player retires, the engine reissues him as a youth &quot;regen&quot; who keeps his{" "}
          <strong className="text-zinc-200">nationality, position, height, preferred foot and exact birthday</strong>.
          Filter your youth intake and the free-agent pool on those five fields and the regen falls out of the list.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Toggle active={positionFilter === null} onClick={() => setPositionFilter(null)}>
          All positions
        </Toggle>
        {positions.map((position) => (
          <Toggle
            key={position}
            active={positionFilter === position}
            onClick={() => setPositionFilter(positionFilter === position ? null : position)}
          >
            {position}
          </Toggle>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState title="No regens match that search" hint="Search by legend name, nation, or position." />
      ) : (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((regen) => (
            <motion.article layout key={regen.id} className="panel flex flex-col gap-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-zinc-50">{regen.legend}</p>
                  <p className="text-xs text-zinc-500">
                    Retires {regen.retiresSeason} · {version.shortLabel}
                  </p>
                </div>
                <span className="chip border-accent/40 bg-accent/10 text-accent">{regen.position}</span>
              </div>

              <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-zinc-500">Nation</dt>
                  <dd className="truncate text-zinc-200">{regen.nation}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="flex items-center gap-1 text-zinc-500">
                    <Cake className="size-3" aria-hidden /> Birthday
                  </dt>
                  <dd className="font-mono text-accent">{regen.birthday}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-zinc-500">Height</dt>
                  <dd className="font-mono text-zinc-200">{regen.height}cm</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-zinc-500">Foot</dt>
                  <dd className="text-zinc-200">{regen.foot}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-zinc-500">Start OVR</dt>
                  <dd className="font-mono text-zinc-200">
                    {regen.expectedOverall[0]}–{regen.expectedOverall[1]}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-zinc-500">POT</dt>
                  <dd className="font-mono font-semibold text-accent">
                    {regen.expectedPotential[0]}–{regen.expectedPotential[1]}
                  </dd>
                </div>
              </dl>

              <p className="text-[11px] leading-relaxed text-zinc-500">
                <span className="text-zinc-400">Where to look:</span> {regen.surfacesAt}
              </p>
              <p className="mt-auto text-xs leading-relaxed text-zinc-400">{regen.note}</p>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
}

export function ScoutsView() {
  const { version } = useDataset();

  return (
    <>
      <PageHeader
        eyebrow={`${version.shortLabel} · ${version.season}`}
        title="Scouts & Academy Calculator"
        description="Work out what a scouting setup actually returns before you spend a season on it — then track which retiring legends are about to reappear in your youth intake."
      />

      <Tabs.Root defaultValue="academy">
        <Tabs.List className="mb-5 inline-flex gap-1 rounded-lg border border-line bg-surface-2 p-1" aria-label="Scouting tools">
          {[
            { value: "academy", label: "Academy calculator", icon: Radar },
            { value: "regens", label: "Regens & pregens", icon: Cake },
          ].map(({ value, label, icon: Icon }) => (
            <Tabs.Trigger
              key={value}
              value={value}
              className="focus-ring flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium text-zinc-400 transition data-[state=active]:bg-accent/15 data-[state=active]:text-accent"
            >
              <Icon className="size-3.5" aria-hidden />
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        <Tabs.Content value="academy" className="focus:outline-none">
          <AcademyCalculator />
        </Tabs.Content>
        <Tabs.Content value="regens" className="focus:outline-none">
          <RegenTracker />
        </Tabs.Content>
      </Tabs.Root>
    </>
  );
}
