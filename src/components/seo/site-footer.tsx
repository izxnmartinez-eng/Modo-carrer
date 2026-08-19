import Link from "next/link";
import { SEO_LOCALES, INDEXED_VERSIONS, getVersion, listPath, listsFor, versionPath } from "@/lib/seo";

/**
 * Server-rendered link block.
 *
 * The five app screens are one client-rendered page, so nothing links to the
 * static pages from HTML a crawler can read. This is that link — and it is
 * useful to a person too, which is why it is a real footer and not a hidden
 * list of URLs. Both languages are listed, so each tree is reachable from
 * anywhere on the site.
 */
export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-line pt-6 text-sm">
      <div className="grid gap-6 sm:grid-cols-2">
        {SEO_LOCALES.flatMap((locale) =>
          INDEXED_VERSIONS.map((id) => {
            const version = getVersion(id);
            return (
              <div key={`${locale}-${id}`}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  <Link href={versionPath(locale, id)} className="focus-ring rounded transition hover:text-accent">
                    {version.label}
                    <span className="ml-2 text-[10px] text-zinc-600">{locale === "es" ? "ES" : "EN"}</span>
                  </Link>
                </h2>
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                  {listsFor(id).map((list) => (
                    <li key={list.id}>
                      <Link
                        href={listPath(locale, id, list)}
                        className="focus-ring rounded text-xs text-zinc-400 transition hover:text-accent"
                      >
                        {list.copy[locale].label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }),
        )}
      </div>
      <p className="mt-6 text-xs text-zinc-600">
        Career Hub — a free EA Sports FC Career Mode database. Not affiliated with EA Sports.
      </p>
    </footer>
  );
}
