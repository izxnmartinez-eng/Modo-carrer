import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** €215M / €9.5M / €140K / Free */
export function money(value: number): string {
  if (value <= 0) return "Free";
  if (value >= 1e9) return `€${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e8) return `€${Math.round(value / 1e6)}M`;
  if (value >= 1e6) return `€${(value / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
  if (value >= 1e3) return `€${Math.round(value / 1e3)}K`;
  return `€${value}`;
}

export function wage(value: number): string {
  if (value <= 0) return "—";
  return `${money(value)}/wk`;
}

/** June 2029 */
export function contractEnd(year: number, month: number): string {
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${names[month - 1] ?? "Jun"} ${year}`;
}

export function monthsLabel(months: number): string {
  if (months <= 0) return "Expired";
  if (months < 12) return `${months} mo`;
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return rest === 0 ? `${years} yr` : `${years}y ${rest}m`;
}

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
