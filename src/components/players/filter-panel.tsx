"use client";

import { RotateCcw } from "lucide-react";
import { RangeSlider, Toggle } from "@/components/ui/primitives";
import { ALL_POSITIONS } from "@/lib/derive";
import { useI18n } from "@/i18n/use-i18n";
import { DEFAULT_FILTERS, type PlayerFilters } from "@/lib/filters";
import type { Position } from "@/lib/types";

const VALUE_STEPS = [null, 5e6, 15e6, 30e6, 60e6, 120e6] as const;
const WAGE_STEPS = [null, 25e3, 60e3, 100e3, 200e3] as const;

export function FilterPanel({
  filters,
  onChange,
  expiryYears,
}: {
  filters: PlayerFilters;
  onChange: (next: PlayerFilters) => void;
  expiryYears: number[];
}) {
  const { d, f, fmt } = useI18n();

  const set = <K extends keyof PlayerFilters>(key: K, value: PlayerFilters[K]) =>
    onChange({ ...filters, [key]: value });

  const togglePosition = (position: Position) => {
    const next = filters.positions.includes(position)
      ? filters.positions.filter((p) => p !== position)
      : [...filters.positions, position];
    set("positions", next);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-zinc-200">{d.filters.title}</h2>
        <button
          type="button"
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="focus-ring inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-zinc-500 transition hover:text-zinc-200"
        >
          <RotateCcw className="size-3" aria-hidden />
          {d.common.reset}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <RangeSlider label={d.filters.age} min={15} max={40} value={filters.age} onChange={(v) => set("age", v)} />
        <RangeSlider label={d.filters.overall} min={40} max={99} value={filters.overall} onChange={(v) => set("overall", v)} />
        <RangeSlider
          label={d.filters.potential}
          min={40}
          max={99}
          value={filters.potential}
          onChange={(v) => set("potential", v)}
        />
        <RangeSlider
          label={d.filters.growth}
          min={0}
          max={30}
          value={filters.growth}
          onChange={(v) => set("growth", v)}
          format={(n) => `+${n}`}
        />
      </div>

      <div>
        <p className="field-label mb-2">{d.filters.maxValue}</p>
        <div className="flex flex-wrap gap-1.5">
          {VALUE_STEPS.map((step) => (
            <Toggle key={String(step)} active={filters.maxValue === step} onClick={() => set("maxValue", step)}>
              {step === null ? d.common.any : fmt(d.filters.upTo, { value: f.money(step) })}
            </Toggle>
          ))}
        </div>
      </div>

      <div>
        <p className="field-label mb-2">{d.filters.maxWage}</p>
        <div className="flex flex-wrap gap-1.5">
          {WAGE_STEPS.map((step) => (
            <Toggle key={String(step)} active={filters.maxWage === step} onClick={() => set("maxWage", step)}>
              {step === null ? d.common.any : fmt(d.filters.upTo, { value: f.money(step) })}
            </Toggle>
          ))}
        </div>
      </div>

      <div>
        <p className="field-label mb-2">{d.filters.position}</p>
        <div className="flex flex-wrap gap-1.5">
          {ALL_POSITIONS.map((position) => (
            <Toggle
              key={position}
              active={filters.positions.includes(position)}
              onClick={() => togglePosition(position)}
              title={fmt(d.filters.positionTitle, { position })}
            >
              {position}
            </Toggle>
          ))}
        </div>
      </div>

      <div>
        <p className="field-label mb-2">{d.filters.releaseClause}</p>
        <div className="flex flex-wrap gap-1.5">
          <Toggle
            active={filters.requireReleaseClause}
            onClick={() => set("requireReleaseClause", !filters.requireReleaseClause)}
          >
            {d.filters.hasClause}
          </Toggle>
          {[30e6, 60e6, 120e6].map((cap) => (
            <Toggle
              key={cap}
              active={filters.maxReleaseClause === cap}
              onClick={() => set("maxReleaseClause", filters.maxReleaseClause === cap ? null : cap)}
            >
              {fmt(d.filters.upTo, { value: f.money(cap) })}
            </Toggle>
          ))}
        </div>
      </div>

      <div>
        <p className="field-label mb-2">{d.filters.expiryYear}</p>
        <div className="flex flex-wrap gap-1.5">
          <Toggle active={filters.expiryYear === null} onClick={() => set("expiryYear", null)}>
            {d.common.any}
          </Toggle>
          {expiryYears.map((year) => (
            <Toggle
              key={year}
              active={filters.expiryYear === year}
              onClick={() => set("expiryYear", filters.expiryYear === year ? null : year)}
            >
              {year}
            </Toggle>
          ))}
        </div>
      </div>
    </div>
  );
}
