import Link from "next/link";
import { SEO_STRINGS, t } from "./strings";
import { money, playerPath, signedNumber, SITE_URL, wage, type SeoLocale } from "@/lib/seo";
import { nationName } from "@/lib/nations";
import type { DerivedPlayer, GameVersion, GameVersionId } from "@/lib/types";

/**
 * Shared pieces of the server-rendered pages.
 *
 * These are server components on purpose: their text has to be in the HTML a
 * crawler receives, not assembled in the browser afterwards.
 */

export function Breadcrumbs({ trail }: { trail: { name: string; href: string }[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.name,
      item: `${SITE_URL}${step.href}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-zinc-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          {trail.map((step, index) => (
            <li key={step.href} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden>/</span>}
              {index === trail.length - 1 ? (
                <span className="text-zinc-400">{step.name}</span>
              ) : (
                <Link href={step.href} className="focus-ring rounded transition hover:text-accent">
                  {step.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** Provenance line. Every indexed page states where its numbers come from. */
export function SourceNote({ version, locale }: { version: GameVersion; locale: SeoLocale }) {
  return (
    <p className="mt-8 border-t border-line pt-4 text-xs leading-relaxed text-zinc-500">
      {t(SEO_STRINGS[locale].sourceNote, {
        short: version.shortLabel,
        source: version.sourceLabel ? ` (${version.sourceLabel})` : "",
      })}
    </p>
  );
}

/** Rows of a player table, used by every list page. */
export function PlayerRows({
  versionId,
  players,
  locale,
}: {
  versionId: GameVersionId;
  players: DerivedPlayer[];
  locale: SeoLocale;
}) {
  return (
    <>
      {players.map((player, index) => (
        <tr key={player.id} className="border-b border-line/60 last:border-0">
          <td className="px-3 py-2 text-right font-mono text-xs text-zinc-600">{index + 1}</td>
          <td className="px-3 py-2">
            <Link
              href={playerPath(locale, versionId, player)}
              className="focus-ring rounded font-medium text-zinc-100 hover:text-accent"
            >
              {player.name}
            </Link>
            <span className="block text-xs text-zinc-500">
              {[player.club, nationName(player.nation, locale)].filter(Boolean).join(" · ")}
            </span>
          </td>
          <td className="px-3 py-2 text-center text-xs text-zinc-400">{player.position}</td>
          <td className="px-3 py-2 text-center font-mono text-xs tabular-nums text-zinc-300">{player.age}</td>
          <td className="px-3 py-2 text-center font-mono text-xs tabular-nums text-zinc-100">{player.overall}</td>
          <td className="px-3 py-2 text-center font-mono text-xs tabular-nums text-accent">{player.potential}</td>
          <td className="px-3 py-2 text-center font-mono text-xs tabular-nums text-zinc-300">
            {signedNumber(player.growth)}
          </td>
          <td className="px-3 py-2 text-right font-mono text-xs tabular-nums text-zinc-300">
            {money(player.value, locale)}
          </td>
          <td className="hidden px-3 py-2 text-right font-mono text-xs tabular-nums text-zinc-400 sm:table-cell">
            {player.isFreeAgent ? "—" : wage(player.contract.wage, locale)}
          </td>
        </tr>
      ))}
    </>
  );
}

export function PlayerTableHead({ locale }: { locale: SeoLocale }) {
  const head = SEO_STRINGS[locale].table;
  return (
    <thead>
      <tr className="border-b border-line text-[11px] uppercase tracking-wider text-zinc-500">
        <th scope="col" className="px-3 py-2 text-right font-semibold">{head.rank}</th>
        <th scope="col" className="px-3 py-2 text-left font-semibold">{head.player}</th>
        <th scope="col" className="px-3 py-2 text-center font-semibold">{head.position}</th>
        <th scope="col" className="px-3 py-2 text-center font-semibold">{head.age}</th>
        <th scope="col" className="px-3 py-2 text-center font-semibold">{head.overall}</th>
        <th scope="col" className="px-3 py-2 text-center font-semibold">{head.potential}</th>
        <th scope="col" className="px-3 py-2 text-center font-semibold">{head.growth}</th>
        <th scope="col" className="px-3 py-2 text-right font-semibold">{head.value}</th>
        <th scope="col" className="hidden px-3 py-2 text-right font-semibold sm:table-cell">{head.wage}</th>
      </tr>
    </thead>
  );
}
