"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "@/i18n/use-i18n";
import { cn } from "@/lib/format";
import { NAV_ITEMS } from "./nav";

/**
 * Phone navigation.
 *
 * Five destinations in a fixed bottom bar — the convention people already know
 * from every other app on their phone, and one tap instead of open-drawer-then-
 * pick. The drawer stays, but only for settings (version, language, tour).
 *
 * `main` carries matching bottom padding so the bar never covers content, and
 * the bar sits above the safe-area inset on notched devices.
 */
export function BottomNav() {
  const pathname = usePathname();
  const { d } = useI18n();

  return (
    <nav
      aria-label={d.nav.mainNav}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line/70 bg-ground/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
    >
      <ul className="flex items-stretch">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                // 44px minimum touch target, with the label always visible so
                // the icons never have to carry the meaning alone.
                className={cn(
                  "focus-ring relative flex min-h-[3.25rem] flex-col items-center justify-center gap-1 px-1 py-2 transition",
                  active ? "text-accent" : "text-zinc-500",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="bottom-nav-active"
                    className="absolute inset-x-3 top-0 h-0.5 rounded-b bg-accent"
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  />
                )}
                <Icon className="size-5 shrink-0" aria-hidden />
                <span className="w-full truncate text-center text-[10px] font-medium leading-none">
                  {d.nav.items[item.key].short}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
