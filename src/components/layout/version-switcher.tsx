"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Gamepad2 } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";
import { VERSIONS } from "@/lib/data";
import { cn } from "@/lib/format";
import { useToastStore } from "@/store/toast";
import { useVersionStore } from "@/store/version";
import { DataBadge } from "./data-banner";

/**
 * Persistent game-version selector.
 *
 * Selecting a title rewrites the global version state, which every section
 * reads through `useDataset()` — players, tactics, scouts, regens and the
 * accent colour all swap in the same tick.
 */
export function VersionSwitcher({ className }: { className?: string }) {
  const version = useVersionStore((s) => s.version);
  const setVersion = useVersionStore((s) => s.setVersion);
  const push = useToastStore((s) => s.push);
  const { d, fmt } = useI18n();

  const active = VERSIONS.find((v) => v.id === version) ?? VERSIONS[0]!;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={cn(
          "focus-ring group flex w-full items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2 text-left transition hover:border-accent/50",
          className,
        )}
        aria-label={fmt(d.version.aria, { version: active.label })}
      >
        <Gamepad2 className="size-4 shrink-0 text-accent" aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-zinc-100">{active.shortLabel}</span>
          <span className="block truncate text-[11px] text-zinc-500">{active.season}</span>
        </span>
        <ChevronDown className="size-4 shrink-0 text-zinc-500 transition group-data-[state=open]:rotate-180" aria-hidden />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="start"
          className="z-50 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/60"
        >
          <div className="border-b border-line px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
            {d.version.label}
          </div>
          {VERSIONS.map((v) => (
            <DropdownMenu.Item
              key={v.id}
              onSelect={() => {
                if (v.id === version) return;
                setVersion(v.id);
                push({
                  title: fmt(d.version.switchedTitle, { version: v.label }),
                  description: fmt(d.version.switchedDescription, { season: v.season }),
                  tone: "info",
                });
              }}
              className={cn(
                "flex cursor-pointer items-start gap-3 px-3 py-3 text-sm outline-none transition",
                "data-highlighted:bg-surface-2",
                v.id === version && "bg-accent/5",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border",
                  v.id === version ? "border-accent bg-accent/20 text-accent" : "border-line text-transparent",
                )}
              >
                <Check className="size-3" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-semibold text-zinc-100">{v.label}</span>
                  <span className="text-[11px] text-zinc-500">{v.season}</span>
                  <DataBadge dataSource={v.dataSource} ratingsPending={v.ratingsPending} />
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-zinc-400">{v.note}</span>
              </span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/** Compact animated pill showing the active title — used in the mobile header. */
export function VersionPill() {
  const version = useVersionStore((s) => s.version);
  const active = VERSIONS.find((v) => v.id === version) ?? VERSIONS[0]!;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={active.id}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 6 }}
        transition={{ duration: 0.16 }}
        className="chip border-accent/40 bg-accent/10 text-accent"
      >
        {active.shortLabel}
      </motion.span>
    </AnimatePresence>
  );
}
