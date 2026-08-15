"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, Languages } from "lucide-react";
import { fmt, getDictionary, LOCALES } from "@/i18n";
import { useI18n } from "@/i18n/use-i18n";
import { cn } from "@/lib/format";
import { useLocaleStore } from "@/store/locale";
import { useToastStore } from "@/store/toast";

/**
 * Interface language selector.
 *
 * Sits next to the game-version switcher because they are the two settings
 * that change the whole app at once. The choice persists across reloads.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { d, locale, meta } = useI18n();
  const setLocale = useLocaleStore((s) => s.setLocale);
  const push = useToastStore((s) => s.push);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className={cn(
          "focus-ring group flex w-full items-center gap-2 rounded-lg border border-line bg-surface-2 px-3 py-2 text-left transition hover:border-accent/50",
          className,
        )}
        aria-label={fmt(d.language.aria, { language: meta.nativeName })}
      >
        <Languages className="size-4 shrink-0 text-accent" aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-zinc-100">{meta.nativeName}</span>
          <span className="block truncate text-[11px] text-zinc-500">{d.language.label}</span>
        </span>
        <ChevronDown
          className="size-4 shrink-0 text-zinc-500 transition group-data-[state=open]:rotate-180"
          aria-hidden
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          align="start"
          className="z-50 w-[min(18rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/60"
        >
          <div className="border-b border-line px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
            {d.language.label}
          </div>
          {LOCALES.map((option) => (
            <DropdownMenu.Item
              key={option.code}
              onSelect={() => {
                if (option.code === locale) return;
                setLocale(option.code);
                // Confirm in the language just selected, not the one being left.
                const next = getDictionary(option.code);
                push({
                  title: fmt(next.language.switchedTitle, { language: option.nativeName }),
                  description: fmt(next.language.switchedDescription, { language: option.nativeName }),
                  tone: "info",
                });
              }}
              className={cn(
                "flex cursor-pointer items-center gap-3 px-3 py-2.5 text-sm outline-none transition",
                "data-highlighted:bg-surface-2",
                option.code === locale && "bg-accent/5",
              )}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border",
                  option.code === locale ? "border-accent bg-accent/20 text-accent" : "border-line text-transparent",
                )}
              >
                <Check className="size-3" aria-hidden />
              </span>
              <span aria-hidden className="text-base leading-none">
                {option.flag}
              </span>
              <span className="min-w-0 flex-1 truncate font-medium text-zinc-100">{option.nativeName}</span>
              <span className="shrink-0 font-mono text-[10px] uppercase text-zinc-600">{option.code}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
