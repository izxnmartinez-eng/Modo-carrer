"use client";

import { usePathname, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";
import { cn } from "@/lib/format";
import { useSearchStore } from "@/store/search";

/**
 * Instant fuzzy search across player names, clubs, leagues, nations and
 * positions. Typing anywhere in the app routes to the database view and
 * filters it live — there is no submit step.
 */
export function GlobalSearch({ className }: { className?: string }) {
  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);
  const router = useRouter();
  const pathname = usePathname();
  const { d } = useI18n();

  return (
    <div className={cn("relative", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" aria-hidden />
      <input
        type="search"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
          if (event.target.value && pathname !== "/") router.push("/");
        }}
        placeholder={d.search.placeholder}
        aria-label={d.search.label}
        className="focus-ring w-full rounded-lg border border-line bg-surface-2 py-2 pl-9 pr-9 text-sm text-zinc-100 placeholder:text-zinc-600 transition hover:border-zinc-700"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label={d.search.clear}
          className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-500 transition hover:text-zinc-200"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
