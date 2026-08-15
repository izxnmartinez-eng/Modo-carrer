"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShieldHalf, X } from "lucide-react";
import { cn } from "@/lib/format";
import { NAV_ITEMS } from "./nav";
import { GlobalSearch } from "./global-search";
import { VersionPill, VersionSwitcher } from "./version-switcher";

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1" aria-label="Sections">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "focus-ring group relative flex items-start gap-3 rounded-lg px-3 py-2.5 transition",
              active ? "bg-accent/10 text-zinc-50" : "text-zinc-400 hover:bg-surface-2 hover:text-zinc-100",
            )}
          >
            {active && (
              <motion.span
                layoutId="nav-active"
                className="absolute left-0 top-1/2 h-7 w-0.5 -translate-y-1/2 rounded-r bg-accent"
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
              />
            )}
            <Icon className={cn("mt-0.5 size-4 shrink-0", active ? "text-accent" : "text-zinc-500")} aria-hidden />
            <span className="min-w-0">
              <span className="block text-sm font-medium">{item.label}</span>
              <span className="block truncate text-[11px] text-zinc-500">{item.description}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="focus-ring flex shrink-0 items-center gap-2.5 rounded-lg">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-accent/40 bg-accent/10">
        <ShieldHalf className="size-5 text-accent" aria-hidden />
      </span>
      <span className={cn("leading-tight", compact && "hidden sm:block")}>
        <span className="block whitespace-nowrap text-sm font-bold tracking-tight text-zinc-50">CAREER HUB</span>
        <span className="block whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          Career Mode only
        </span>
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close the mobile drawer whenever a route change completes.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[1600px]">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 flex-col gap-6 border-r border-line/70 px-4 py-5 lg:flex">
        <Brand />
        <VersionSwitcher />
        <NavList />
        <div className="mt-auto rounded-lg border border-line bg-surface/60 p-3">
          <p className="text-[11px] leading-relaxed text-zinc-500">
            Sample dataset for demonstration. Ratings, values and share codes are illustrative, not scraped from the
            game.
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-line/70 bg-ground/80 backdrop-blur-md">
          <div className="flex items-center gap-3 px-4 py-3">
            <Dialog.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
              <Dialog.Trigger
                className="focus-ring rounded-lg border border-line bg-surface-2 p-2 text-zinc-300 lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="size-5" aria-hidden />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" />
                <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[min(20rem,88vw)] flex-col gap-6 border-r border-line bg-surface px-4 py-5 shadow-2xl focus:outline-none">
                  <div className="flex items-center justify-between">
                    <Dialog.Title asChild>
                      <span>
                        <Brand />
                      </span>
                    </Dialog.Title>
                    <Dialog.Close className="focus-ring rounded-lg p-2 text-zinc-400" aria-label="Close navigation">
                      <X className="size-5" aria-hidden />
                    </Dialog.Close>
                  </div>
                  <Dialog.Description className="sr-only">
                    Choose a section of Career Hub and the active game version.
                  </Dialog.Description>
                  <VersionSwitcher />
                  <NavList onNavigate={() => setDrawerOpen(false)} />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>

            <div className="lg:hidden">
              <Brand compact />
            </div>

            <GlobalSearch className="ml-auto w-full max-w-md" />

            <div className="hidden lg:block">
              <VersionPill />
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
