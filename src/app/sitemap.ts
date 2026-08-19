import type { MetadataRoute } from "next";
import { INDEXED_VERSIONS, SEO_LOCALES, SITE_URL, getPlayers, listPath, listsFor, playerPath, versionPath } from "@/lib/seo";

/**
 * Every indexable URL, in both languages.
 *
 * The five app screens are one client-rendered page each, so they carry a low
 * priority; the value for search is in the per-player and per-list pages,
 * which are static HTML.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const monthly = "monthly" as const;

  const appScreens = ["", "/tactics", "/squad", "/compare", "/scouts"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: monthly,
    priority: path === "" ? 1 : 0.5,
  }));

  const contentPages = SEO_LOCALES.flatMap((locale) =>
    INDEXED_VERSIONS.flatMap((version) => [
      { url: `${SITE_URL}${versionPath(locale, version)}`, changeFrequency: monthly, priority: 0.9 },
      ...listsFor(version).map((list) => ({
        url: `${SITE_URL}${listPath(locale, version, list)}`,
        changeFrequency: monthly,
        priority: 0.8,
      })),
      ...getPlayers(version).map((player) => ({
        url: `${SITE_URL}${playerPath(locale, version, player)}`,
        changeFrequency: monthly,
        priority: 0.6,
      })),
    ]),
  );

  return [...appScreens, ...contentPages];
}
