import type { LucideIcon } from "lucide-react";
import { Gem, Grid2x2Check, Radar, Users, Wand2 } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  short: string;
  description: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Wonderkids & Gems",
    short: "Wonderkids",
    description: "Potential, growth, clauses and bargains",
    icon: Gem,
  },
  {
    href: "/tactics",
    label: "Tactical Hub",
    short: "Tactics",
    description: "Real manager systems and share codes",
    icon: Grid2x2Check,
  },
  {
    href: "/squad",
    label: "Squad Planner",
    short: "Squad",
    description: "Wage budget, age profile, growth",
    icon: Users,
  },
  {
    href: "/compare",
    label: "Player Comparison",
    short: "Compare",
    description: "Radar, growth overlay, wage ratio",
    icon: Wand2,
  },
  {
    href: "/scouts",
    label: "Scouts & Academy",
    short: "Scouts",
    description: "Intake maths and regen tracker",
    icon: Radar,
  },
];
