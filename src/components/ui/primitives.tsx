"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import { useI18n } from "@/i18n/use-i18n";
import { cn, ratingTone } from "@/lib/format";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">{title}</h1>
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Rating({ value, label, className }: { value: number; label?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-9 items-center justify-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-sm font-semibold tabular-nums",
        ratingTone(value),
        className,
      )}
    >
      {value}
      {label && <span className="text-[9px] font-bold uppercase opacity-70">{label}</span>}
    </span>
  );
}

export function StatTile({
  label,
  value,
  hint,
  tone = "default",
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
  tone?: "default" | "accent" | "warn";
}) {
  return (
    <div className="panel p-3.5">
      <p className="field-label">{label}</p>
      <p
        className={cn(
          "mt-1 font-mono text-xl font-bold tabular-nums",
          tone === "accent" && "text-accent",
          tone === "warn" && "text-amber-400",
          tone === "default" && "text-zinc-100",
        )}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">{hint}</p>}
    </div>
  );
}

/** Two-handled range slider used by every numeric filter. */
export function RangeSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  format = (n: number) => String(n),
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  format?: (n: number) => string;
}) {
  const { d, fmt } = useI18n();

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <span className="field-label">{label}</span>
        <span className="font-mono text-xs tabular-nums text-zinc-300">
          {format(value[0])} – {format(value[1])}
        </span>
      </div>
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={(next) => onChange([next[0] ?? min, next[1] ?? max])}
        className="relative flex h-5 w-full touch-none select-none items-center"
        aria-label={label}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-line">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-accent" />
        </SliderPrimitive.Track>
        {[0, 1].map((i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="focus-ring block size-3.5 rounded-full border-2 border-accent bg-ground transition hover:scale-110"
            aria-label={fmt(i === 0 ? d.common.sliderMin : d.common.sliderMax, { label })}
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
}

export function Toggle({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-pressed={active}
      className={cn(
        "focus-ring chip transition",
        active
          ? "border-accent/60 bg-accent/15 text-accent"
          : "border-line bg-surface-2 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200",
      )}
    >
      {children}
    </button>
  );
}

export function EmptyState({ title, hint }: { title: string; hint: string }) {
  return (
    <div className="panel flex flex-col items-center justify-center gap-2 px-6 py-16 text-center">
      <p className="text-sm font-semibold text-zinc-200">{title}</p>
      <p className="max-w-sm text-xs leading-relaxed text-zinc-500">{hint}</p>
    </div>
  );
}
