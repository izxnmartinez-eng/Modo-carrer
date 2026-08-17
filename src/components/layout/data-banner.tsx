"use client";

import { TriangleAlert } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";
import { cn } from "@/lib/format";
import { useDataset } from "@/lib/use-dataset";

/**
 * States, on every page, that the active title is not running on real data.
 *
 * Real versions show nothing — the quiet provenance note in the sidebar is
 * enough. Versions without real ratings get an unmissable strip instead of a
 * footnote, because someone planning transfers around invented numbers is a
 * worse outcome than a slightly louder page. It is deliberately not
 * dismissible: the warning has to still be there on the visit after this one.
 */
export function DataBanner({ className }: { className?: string }) {
  const { d, fmt } = useI18n();
  const { version } = useDataset();

  if (version.dataSource === "real") return null;

  const notice = d.dataNotice;
  const vars = { version: version.shortLabel };
  const title = fmt(version.ratingsPending ? notice.pendingTitle : notice.sampleTitle, vars);
  const body = fmt(version.ratingsPending ? notice.pendingBody : notice.sampleBody, vars);

  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-3 rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3",
        className,
      )}
    >
      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-400" aria-hidden />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-amber-200">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-amber-100/80">{body}</p>
      </div>
    </div>
  );
}

/** Compact provenance tag for the version list: real data, test data, or pending. */
export function DataBadge({
  dataSource,
  ratingsPending,
}: {
  dataSource: "real" | "sample";
  ratingsPending?: boolean;
}) {
  const { d } = useI18n();

  if (dataSource === "real") {
    return <span className="chip border-emerald-500/40 bg-emerald-500/10 text-emerald-300">{d.dataNotice.realBadge}</span>;
  }
  return (
    <span className="chip border-amber-500/40 bg-amber-500/10 text-amber-300">
      {ratingsPending ? d.dataNotice.pendingBadge : d.dataNotice.sampleBadge}
    </span>
  );
}
