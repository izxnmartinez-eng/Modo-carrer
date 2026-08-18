import Link from "next/link";
import { INDEXED_VERSIONS, getVersion, listsFor } from "@/lib/seo";

/**
 * Server-rendered link block.
 *
 * The five app screens are one client-rendered page, so nothing links to the
 * static pages from HTML a crawler can read. This is that link — and it is
 * useful to a person too, which is why it is a real footer and not a hidden
 * list of URLs.
 */
export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-line pt-6 text-sm">
      <div className="grid gap-6 sm:grid-cols-2">
        {INDEXED_VERSIONS.map((id) => {
          const version = getVersion(id);
          return (
            <div key={id}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                <Link href={`/${id}`} className="focus-ring rounded transition hover:text-accent">
                  {version.label}
                </Link>
              </h2>
              <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                {listsFor(id).map((list) => (
                  <li key={list.slug}>
                    <Link
                      href={`/${id}/${list.slug}`}
                      className="focus-ring rounded text-xs text-zinc-400 transition hover:text-accent"
                    >
                      {list.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-xs text-zinc-600">
        Career Hub — a free EA Sports FC Career Mode database. Not affiliated with EA Sports.
      </p>
    </footer>
  );
}
