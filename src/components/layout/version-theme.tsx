"use client";

import { useEffect } from "react";
import { useVersionStore } from "@/store/version";

/**
 * Mirrors the active game version onto `<html data-version>` so the CSS accent
 * tokens swap with the dataset. Rendered once from the root layout.
 */
export function VersionTheme() {
  const version = useVersionStore((s) => s.version);

  useEffect(() => {
    document.documentElement.dataset.version = version;
  }, [version]);

  return null;
}
