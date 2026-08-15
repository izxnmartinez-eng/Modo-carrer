"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CircleAlert, CircleCheck, Info, X } from "lucide-react";
import { cn } from "@/lib/format";
import { useToastStore, type ToastTone } from "@/store/toast";

const TONE: Record<ToastTone, { icon: typeof Info; ring: string; iconColor: string }> = {
  success: { icon: CircleCheck, ring: "border-accent/50", iconColor: "text-accent" },
  info: { icon: Info, ring: "border-sky-500/50", iconColor: "text-sky-400" },
  error: { icon: CircleAlert, ring: "border-rose-500/50", iconColor: "text-rose-400" },
};

/** Bottom-right toast viewport. Mounted once from the root layout. */
export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed inset-x-3 bottom-3 z-[60] flex flex-col items-end gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const { icon: Icon, ring, iconColor } = TONE[toast.tone];
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
              className={cn(
                "pointer-events-auto w-full max-w-sm rounded-xl border bg-surface/95 p-3 shadow-2xl shadow-black/60 backdrop-blur",
                ring,
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn("mt-0.5 size-4 shrink-0", iconColor)} aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-100">{toast.title}</p>
                  {toast.description && (
                    <p className="mt-0.5 text-xs leading-relaxed text-zinc-400">{toast.description}</p>
                  )}
                  {toast.code && (
                    <code className="mt-2 block truncate rounded-md border border-line bg-ground px-2 py-1 font-mono text-xs text-accent">
                      {toast.code}
                    </code>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  aria-label="Dismiss notification"
                  className="focus-ring rounded-md p-0.5 text-zinc-500 transition hover:text-zinc-200"
                >
                  <X className="size-3.5" aria-hidden />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
