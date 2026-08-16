"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Gamepad2,
  Gem,
  Grid2x2Check,
  Radar,
  ShieldHalf,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import type { Dictionary } from "@/i18n";
import { useI18n } from "@/i18n/use-i18n";
import { cn } from "@/lib/format";
import { useOnboardingStore } from "@/store/onboarding";

type StepKey = keyof Dictionary["onboarding"]["steps"];

/** Order and iconography of the tour. Copy lives in the dictionaries. */
const STEPS: { key: StepKey; icon: LucideIcon }[] = [
  { key: "welcome", icon: ShieldHalf },
  { key: "players", icon: Gem },
  { key: "tactics", icon: Grid2x2Check },
  { key: "squad", icon: Users },
  { key: "scouts", icon: Radar },
  { key: "settings", icon: Gamepad2 },
];

/**
 * First-run welcome tour.
 *
 * Opens by itself once, after the persisted flag has been read — never during
 * the first render, so the prerendered HTML and the first client render agree.
 * Skippable at any point, and reopenable from the help button in the menu.
 */
export function WelcomeTour() {
  const { d, fmt } = useI18n();
  const open = useOnboardingStore((s) => s.open);
  const completed = useOnboardingStore((s) => s.completed);
  const hydrated = useOnboardingStore((s) => s.hydrated);
  const openTour = useOnboardingStore((s) => s.openTour);
  const finishTour = useOnboardingStore((s) => s.finishTour);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (hydrated && !completed) openTour();
  }, [hydrated, completed, openTour]);

  // Always restart from the first slide when the tour is reopened by hand.
  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  const step = STEPS[index] ?? STEPS[0]!;
  const copy = d.onboarding.steps[step.key];
  const Icon = step.icon;
  const isLast = index === STEPS.length - 1;

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && finishTour()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed z-[80] flex flex-col gap-5 border border-line bg-surface shadow-2xl focus:outline-none",
            // Bottom sheet on phones, centred card from sm upwards.
            "inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto rounded-t-2xl p-5",
            "sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(30rem,calc(100vw-2rem))]",
            "sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-2xl sm:p-6",
          )}
        >
          <div className="flex items-start justify-between gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-accent/40 bg-accent/10">
              <Icon className="size-5 text-accent" aria-hidden />
            </span>
            <Dialog.Close
              className="focus-ring -mr-1 -mt-1 rounded-lg p-1.5 text-zinc-500 transition hover:text-zinc-200"
              aria-label={d.common.close}
            >
              <X className="size-5" aria-hidden />
            </Dialog.Close>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <Dialog.Title className="text-xl font-bold tracking-tight text-zinc-50 sm:text-2xl">
                {copy.title}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-relaxed text-zinc-400">
                {copy.body}
              </Dialog.Description>
            </motion.div>
          </AnimatePresence>

          <div className="mt-auto flex flex-col gap-4">
            <div className="flex items-center gap-2" aria-hidden>
              {STEPS.map((s, i) => (
                <span
                  key={s.key}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    i === index ? "bg-accent" : i < index ? "bg-accent/40" : "bg-line",
                  )}
                />
              ))}
            </div>

            <p className="text-[11px] font-medium uppercase tracking-widest text-zinc-600">
              {fmt(d.onboarding.stepOf, { current: index + 1, total: STEPS.length })}
            </p>

            <div className="flex items-center gap-2">
              {index > 0 ? (
                <button
                  type="button"
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface-2 px-3 py-2.5 text-sm font-medium text-zinc-300 transition hover:text-zinc-50"
                >
                  <ArrowLeft className="size-4" aria-hidden />
                  {d.onboarding.back}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={finishTour}
                  className="focus-ring rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-200"
                >
                  {d.onboarding.skip}
                </button>
              )}

              <button
                type="button"
                onClick={() => (isLast ? finishTour() : setIndex((i) => i + 1))}
                className="focus-ring ml-auto inline-flex items-center gap-1.5 rounded-lg border border-accent/50 bg-accent/15 px-4 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent/25"
              >
                {isLast ? d.onboarding.done : d.onboarding.next}
                {!isLast && <ArrowRight className="size-4" aria-hidden />}
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
