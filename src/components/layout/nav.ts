import type { LucideIcon } from "lucide-react";
import { Gem, Grid2x2Check, Radar, Users, Wand2 } from "lucide-react";
import type { Dictionary } from "@/i18n";

/** Key into `dictionary.nav.items` — labels live in the dictionaries, not here. */
export type NavKey = keyof Dictionary["nav"]["items"];

export interface NavItem {
  key: NavKey;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { key: "wonderkids", href: "/", icon: Gem },
  { key: "tactics", href: "/tactics", icon: Grid2x2Check },
  { key: "squad", href: "/squad", icon: Users },
  { key: "compare", href: "/compare", icon: Wand2 },
  { key: "scouts", href: "/scouts", icon: Radar },
];
