"use client";

import { create } from "zustand";

export type ToastTone = "success" | "info" | "error";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  tone: ToastTone;
  /** Monospace payload shown under the message — used for copied share codes. */
  code?: string;
}

interface ToastState {
  toasts: Toast[];
  push: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const TOAST_TTL = 3200;
const MAX_TOASTS = 3;

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],
  push: (toast) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }].slice(-MAX_TOASTS) }));
    setTimeout(() => get().dismiss(id), TOAST_TTL);
  },
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export interface CopyFailureCopy {
  title: string;
  description: string;
}

/**
 * Copies text and raises a toast either way.
 * Falls back to a hidden textarea when the async clipboard API is unavailable
 * (older browsers, or a page served over plain HTTP).
 *
 * All four strings are passed in already translated — this module has no
 * dictionary of its own so it stays usable from event handlers.
 */
export async function copyWithToast(
  text: string,
  title: string,
  description: string | undefined,
  failure: CopyFailureCopy,
) {
  const { push } = useToastStore.getState();
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    push({ title, description, tone: "success", code: text });
  } catch {
    push({ title: failure.title, description: failure.description, tone: "error", code: text });
  }
}
