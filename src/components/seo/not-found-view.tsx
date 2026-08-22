"use client";

import Link from "next/link";
import { SearchX } from "lucide-react";
import { useI18n } from "@/i18n/use-i18n";
import { seoLocaleFor, INDEXED_VERSIONS, getVersion, versionPath } from "@/lib/seo";

/** Client-side so the message is in the visitor's own interface language. */
export function NotFoundView() {
  const { d, locale } = useI18n();
  const seoLocale = seoLocaleFor(locale);

  return (
    <div className="mx-auto max-w-lg py-10 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-line bg-surface-2">
        <SearchX className="size-6 text-accent" aria-hidden />
      </span>
      <h1 className="mt-4 text-2xl font-bold text-zinc-50">{d.notFound.title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{d.notFound.body}</p>

      <Link
        href="/"
        className="focus-ring mt-6 inline-block rounded-lg border border-accent/50 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/20"
      >
        {d.notFound.home}
      </Link>

      <p className="mt-6 text-xs uppercase tracking-wider text-zinc-500">{d.notFound.browse}</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {INDEXED_VERSIONS.map((id) => (
          <Link
            key={id}
            href={versionPath(seoLocale, id)}
            className="focus-ring rounded-lg border border-line bg-surface-2 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-accent/50 hover:text-accent"
          >
            {getVersion(id).shortLabel}
          </Link>
        ))}
      </div>
    </div>
  );
}
