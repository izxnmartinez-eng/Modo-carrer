"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Copy, TriangleAlert } from "lucide-react";
import { EmptyState, PageHeader, Toggle } from "@/components/ui/primitives";
import { Pitch, shortRole } from "./pitch";
import { cn } from "@/lib/format";
import { scoreField } from "@/lib/fuzzy";
import { useDataset } from "@/lib/use-dataset";
import { useSearchStore } from "@/store/search";
import { copyWithToast } from "@/store/toast";
import type { Tactic } from "@/lib/types";

function SliderBar({ label, value, hint }: { label: string; value: number; hint?: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="field-label">{label}</span>
        <span className="font-mono text-xs tabular-nums text-zinc-300">{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-line">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
      {hint && <p className="mt-1 text-[11px] text-zinc-600">{hint}</p>}
    </div>
  );
}

function CopyCodeButton({ tactic, className }: { tactic: Tactic; className?: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        copyWithToast(
          tactic.shareCode,
          "Tactical code copied",
          `${tactic.manager} — ${tactic.name}. Paste it into the in-game Tactics > Community Tactics screen.`,
        )
      }
      className={cn(
        "focus-ring group inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 font-mono text-sm font-semibold text-accent transition hover:bg-accent/20",
        className,
      )}
    >
      <Copy className="size-3.5 shrink-0 transition group-hover:scale-110" aria-hidden />
      {tactic.shareCode}
    </button>
  );
}

function TacticDetail({ tactic }: { tactic: Tactic }) {
  const [selected, setSelected] = useState<string | null>(null);
  const active = tactic.positions.find((p) => p.id === selected) ?? null;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <div className="panel p-4">
        <Pitch positions={tactic.positions} selectedId={selected} onSelect={(id) => setSelected(id === selected ? null : id)} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active?.id ?? "none"}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.14 }}
            className="mt-3 rounded-lg border border-line bg-surface-2 p-3"
          >
            {active ? (
              <>
                <p className="text-sm font-semibold text-zinc-100">
                  {active.label} · {active.role}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">Focus: {active.focus}</p>
              </>
            ) : (
              <p className="text-xs text-zinc-500">Tap any position on the pitch to see its role and focus.</p>
            )}
          </motion.div>
        </AnimatePresence>

        <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2 lg:grid-cols-1">
          {tactic.positions.map((position) => (
            <li key={position.id}>
              <button
                type="button"
                onClick={() => setSelected(position.id === selected ? null : position.id)}
                className={cn(
                  "focus-ring flex w-full items-baseline gap-2 rounded px-1 py-0.5 text-left transition hover:bg-surface-2",
                  position.id === selected && "bg-surface-2",
                )}
              >
                <span className="w-9 shrink-0 font-mono text-[10px] font-bold text-zinc-500">{position.label}</span>
                <span className="w-9 shrink-0 font-mono text-[10px] font-bold text-accent">
                  {shortRole(position.role)}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] text-zinc-400">{position.role}</span>
                <span className="shrink-0 text-[10px] text-zinc-600">{position.focus}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <div className="panel p-4">
          <h3 className="mb-3 text-sm font-semibold text-zinc-200">Tactical setup</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2">
                <span className="field-label">Build-up</span>
                <span className="text-xs font-semibold text-zinc-100">{tactic.offensive.buildUpStyle}</span>
              </div>
              <SliderBar label="Attacking width" value={tactic.offensive.width} />
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "In box", value: tactic.offensive.playersInBox },
                  { label: "Corners", value: tactic.offensive.corners },
                  { label: "Free kicks", value: tactic.offensive.freeKicks },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-line bg-surface-2 px-2 py-1.5">
                    <p className="text-[10px] uppercase tracking-wider text-zinc-500">{item.label}</p>
                    <p className="font-mono text-sm font-semibold text-zinc-100">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2">
                <span className="field-label">Defensive approach</span>
                <span className="text-xs font-semibold text-zinc-100">{tactic.defensive.approach}</span>
              </div>
              <SliderBar label="Defensive width" value={tactic.defensive.width} />
              <SliderBar
                label="Defensive line depth"
                value={tactic.defensive.depth}
                hint={
                  tactic.defensive.depth >= 65
                    ? "High line — your centre-backs need pace."
                    : tactic.defensive.depth <= 40
                      ? "Deep block — you will concede possession by design."
                      : "Mid block."
                }
              />
            </div>
          </div>
        </div>

        <div className="panel p-4">
          <h3 className="mb-2 text-sm font-semibold text-zinc-200">Key instructions</h3>
          <ul className="flex flex-col gap-2">
            {tactic.keyInstructions.map((instruction) => (
              <li key={instruction} className="flex gap-2 text-sm leading-relaxed text-zinc-300">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                {instruction}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="panel p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <CircleCheck className="size-4" aria-hidden /> Strengths
            </h3>
            <ul className="flex flex-col gap-1.5 text-xs leading-relaxed text-zinc-400">
              {tactic.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="panel p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-amber-300">
              <TriangleAlert className="size-4" aria-hidden /> Weaknesses
            </h3>
            <ul className="flex flex-col gap-1.5 text-xs leading-relaxed text-zinc-400">
              {tactic.weaknesses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="panel p-4">
          <h3 className="mb-2 text-sm font-semibold text-zinc-200">Who to sign for it</h3>
          <dl className="flex flex-col gap-2.5">
            {tactic.recommendedProfiles.map((profile) => (
              <div key={profile.slot} className="border-b border-line/60 pb-2.5 last:border-0 last:pb-0">
                <dt className="text-xs font-semibold text-accent">{profile.slot}</dt>
                <dd className="mt-0.5 text-xs leading-relaxed text-zinc-400">{profile.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export function TacticsView() {
  const { tactics, version } = useDataset();
  const query = useSearchStore((s) => s.query);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [formationFilter, setFormationFilter] = useState<string | null>(null);

  const formations = useMemo(() => Array.from(new Set(tactics.map((t) => t.formation))), [tactics]);

  const visible = useMemo(() => {
    const trimmed = query.trim();
    return tactics.filter((tactic) => {
      if (formationFilter && tactic.formation !== formationFilter) return false;
      if (!trimmed) return true;
      return (
        Math.max(
          scoreField(tactic.manager, trimmed),
          scoreField(tactic.name, trimmed),
          scoreField(tactic.club, trimmed),
          scoreField(tactic.formation, trimmed),
        ) > 0
      );
    });
  }, [tactics, formationFilter, query]);

  const active = visible.find((t) => t.id === activeId) ?? visible[0] ?? null;

  return (
    <>
      <PageHeader
        eyebrow={`${version.shortLabel} · ${version.season}`}
        title="Tactical Hub & Manager Codes"
        description="Legendary and meta managerial systems rebuilt with in-game roles, sliders and instructions. Copy the share code straight into Community Tactics."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <Toggle active={formationFilter === null} onClick={() => setFormationFilter(null)}>
          All formations
        </Toggle>
        {formations.map((formation) => (
          <Toggle
            key={formation}
            active={formationFilter === formation}
            onClick={() => setFormationFilter(formationFilter === formation ? null : formation)}
          >
            {formation}
          </Toggle>
        ))}
      </div>

      {visible.length === 0 ? (
        <EmptyState
          title="No tactics match that search"
          hint="Try a manager name (Guardiola, Alonso, Simeone), a club, or a formation like 3-2-4-1."
        />
      ) : (
        <div className="flex flex-col gap-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((tactic) => {
              const selected = active?.id === tactic.id;
              return (
                <motion.article
                  layout
                  key={tactic.id}
                  className={cn(
                    "panel flex flex-col gap-3 p-4 transition",
                    selected ? "border-accent/50 bg-accent/5" : "hover:border-accent/30",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(tactic.id)}
                    className="focus-ring rounded-md text-left"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent">{tactic.manager}</p>
                    <h2 className="mt-0.5 font-bold text-zinc-50">{tactic.name}</h2>
                    <p className="text-xs text-zinc-500">
                      {tactic.club} · {tactic.era} · {tactic.formation}
                    </p>
                  </button>

                  <p className="line-clamp-3 text-xs leading-relaxed text-zinc-400">{tactic.summary}</p>

                  <div className="flex flex-wrap gap-1.5">
                    <span className="chip border-line bg-surface-2 text-zinc-400">{tactic.difficulty}</span>
                    {tactic.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="chip border-line/60 bg-surface-2/60 text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-2">
                    <CopyCodeButton tactic={tactic} className="flex-1" />
                    <button
                      type="button"
                      onClick={() => setActiveId(tactic.id)}
                      className="focus-ring rounded-lg border border-line bg-surface-2 px-3 py-2 text-xs font-medium text-zinc-300 transition hover:text-zinc-50"
                    >
                      {selected ? "Viewing" : "Open"}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {active && (
            <section aria-label={`${active.name} detail`}>
              <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-zinc-50">
                    {active.manager} — {active.name}
                  </h2>
                  <p className="text-xs text-zinc-500">
                    {active.club} · {active.era} · {active.formation}
                  </p>
                </div>
                <CopyCodeButton tactic={active} />
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  <TacticDetail tactic={active} />
                </motion.div>
              </AnimatePresence>
            </section>
          )}
        </div>
      )}
    </>
  );
}
