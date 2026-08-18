import type { MetadataRoute } from "next";
import { INDEXED_VERSIONS, SITE_URL, getPlayers, listsFor, playerPath } from "@/lib/seo";

/**
 * Every indexable URL.
 *
 * The five app screens are one client-rendered page each, so they carry a low
 * priority; the value for search is in the per-player and per-list pages,
 * which are static HTML.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const appScreens = ["", "/tactics", "/squad", "/compare", "/scouts"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.5,
  }));

  const versionPages = INDEXED_VERSIONS.flatMap((version) => [
    { url: `${SITE_URL}/${version}`, changeFrequency: "monthly" as const, priority: 0.9 },
    ...listsFor(version).map((list) => ({
      url: `${SITE_URL}/${version}/${list.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getPlayers(version).map((player) => ({
      url: `${SITE_URL}${playerPath(version, player)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ]);

  return [...appScreens, ...versionPages];
}
