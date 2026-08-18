"use client";

import { useEffect } from "react";
import { useVersionStore } from "@/store/version";
import type { GameVersionId } from "@/lib/types";

/**
 * Points the app's version switcher at whichever title this page is about.
 *
 * Someone arriving from a search lands on, say, an FC 25 player page while
 * their stored preference says FC 26. Without this the sidebar, the accent
 * colour and every "open in the tool" link would describe a different game
 * from the page they are reading.
 */
export function VersionSync({ versionId }: { versionId: GameVersionId }) {
  const setVersion = useVersionStore((s) => s.setVersion);
  const current = useVersionStore((s) => s.version);

  useEffect(() => {
    if (current !== versionId) setVersion(versionId);
  }, [current, setVersion, versionId]);

  return null;
}
