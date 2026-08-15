"use client";

import { Clock, Gem, HandCoins, Sparkles } from "lucide-react";
import { BARGAIN_THRESHOLD } from "@/lib/filters";
import type { DerivedPlayer } from "@/lib/types";

/** The Career Mode signals a player can carry: gem, bargain, free agent, expiring. */
export function PlayerBadges({ player, compact = false }: { player: DerivedPlayer; compact?: boolean }) {
  const badges: { key: string; icon: typeof Gem; label: string; className: string }[] = [];

  if (player.isHiddenGem) {
    badges.push({
      key: "gem",
      icon: Gem,
      label: "Hidden gem",
      className: "border-gold/50 bg-gold/10 text-gold",
    });
  }
  if (player.bargainScore >= BARGAIN_THRESHOLD) {
    badges.push({
      key: "bargain",
      icon: Sparkles,
      label: "Bargain",
      className: "border-accent/50 bg-accent/10 text-accent",
    });
  }
  if (player.isFreeAgent) {
    badges.push({
      key: "free",
      icon: HandCoins,
      label: "Free agent",
      className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    });
  }
  if (player.isExpiring) {
    badges.push({
      key: "expiring",
      icon: Clock,
      label: "Expiring",
      className: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    });
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {badges.map(({ key, icon: Icon, label, className }) => (
        <span key={key} className={`chip ${className}`} title={label}>
          <Icon className="size-3" aria-hidden />
          {!compact && label}
        </span>
      ))}
    </div>
  );
}
