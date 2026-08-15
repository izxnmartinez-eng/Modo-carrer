import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { fmt, type Dictionary } from "@/i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ------------------------------------------------------------------ */
/* Locale-independent helpers                                          */
/* ------------------------------------------------------------------ */

export function signed(value: number): string {
  return value > 0 ? `+${value}` : `${value}`;
}

/** Tailwind colour class for an overall/potential rating chip. */
export function ratingTone(rating: number): string {
  if (rating >= 87) return "bg-accent/15 text-accent border-accent/40";
  if (rating >= 80) return "bg-emerald-500/10 text-emerald-300 border-emerald-500/30";
  if (rating >= 72) return "bg-sky-500/10 text-sky-300 border-sky-500/30";
  if (rating >= 65) return "bg-amber-500/10 text-amber-300 border-amber-500/30";
  return "bg-zinc-500/10 text-zinc-300 border-zinc-500/30";
}

export function growthTone(growth: number): string {
  if (growth >= 15) return "text-accent";
  if (growth >= 9) return "text-emerald-400";
  if (growth >= 4) return "text-sky-400";
  if (growth > 0) return "text-zinc-300";
  return "text-zinc-500";
}

/* ------------------------------------------------------------------ */
/* Locale-aware formatters                                             */
/* ------------------------------------------------------------------ */

export interface Formatters {
  /** Compact currency, localised: "€215M" / "215 Mio. €" / "€ 215 mi". */
  money: (value: number) => string;
  /** Weekly wage, e.g. "€145K/wk" — or an em dash when there is no wage. */
  wage: (value: number) => string;
  /** Contract end as a localised month + year, e.g. "Jun 2029". */
  contractEnd: (year: number, month: number) => string;
  /** Remaining contract length, e.g. "2y 10m". */
  monthsLabel: (months: number) => string;
  /** Plain localised number with the right decimal separator. */
  decimal: (value: number) => string;
}

/**
 * Builds the formatter set for a locale.
 *
 * Currency, month names and decimal separators all come from `Intl`, so a
 * German user sees "215 Mio. €" and a Spanish user "215 M €" without any
 * per-locale formatting code.
 */
export function createFormatters(intlTag: string, d: Dictionary): Formatters {
  // Deliberately NOT `Intl` compact notation: ICU versions disagree on it
  // (Node renders "€9.5m", Chromium "€9.5M"), which breaks SSR hydration.
  // Scaling by hand and formatting only the plain number is stable everywhere.
  const monthYear = new Intl.DateTimeFormat(intlTag, { month: "short", year: "numeric", timeZone: "UTC" });
  const decimal = new Intl.NumberFormat(intlTag, { maximumFractionDigits: 1 });

  const money = (value: number) => {
    if (value <= 0) return d.common.free;
    const [divisor, unit] =
      value >= 1e9
        ? [1e9, d.common.compact.billion]
        : value >= 1e6
          ? [1e6, d.common.compact.million]
          : value >= 1e3
            ? [1e3, d.common.compact.thousand]
            : [1, ""];
    // Non-breaking space: "9,5 M €" must never wrap across two lines in a table cell.
    const amount = `${decimal.format(value / divisor)}${unit ? `\u00A0${unit}` : ""}`;
    return fmt(d.common.moneyPattern, { value: amount });
  };

  return {
    money,
    wage: (value: number) => (value <= 0 ? "—" : `${money(value)}${d.common.perWeek}`),
    contractEnd: (year: number, month: number) => monthYear.format(new Date(Date.UTC(year, month - 1, 1))),
    monthsLabel: (months: number) => {
      if (months <= 0) return d.common.expired;
      if (months < 12) return fmt(d.common.monthsShort, { count: months });
      const years = Math.floor(months / 12);
      const rest = months % 12;
      return rest === 0
        ? fmt(d.common.yearsShort, { count: years })
        : fmt(d.common.yearsMonthsShort, { years, months: rest });
    },
    decimal: (value: number) => decimal.format(value),
  };
}
