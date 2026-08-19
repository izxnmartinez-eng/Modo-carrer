import Link from "next/link";
import { Breadcrumbs, PlayerRows, PlayerTableHead, SourceNote } from "./seo-parts";
import { SEO_STRINGS, t } from "./strings";
import { VersionSync } from "./version-sync";
import { hasCardStats, radarStats } from "@/lib/derive";
import { nationName } from "@/lib/nations";
import { projectGrowth } from "@/lib/growth";
import {
  LISTS,
  SITE_URL,
  contractEnd,
  getPlayers,
  getVersion,
  growthTypeName,
  growthTypeNote,
  homePath,
  listPath,
  listsFor,
  money,
  playerPath,
  signedNumber,
  similarPlayers,
  versionPath,
  wage,
  type ListDefinition,
  type SeoLocale,
} from "@/lib/seo";
import type { DerivedPlayer, GameVersionId } from "@/lib/types";

/**
 * The bodies of the indexed pages, written once and rendered under both
 * language trees. Everything language-specific arrives as `locale`.
 */

/** One sentence a search result can show in full. */
export function playerSummary(player: DerivedPlayer, short: string, locale: SeoLocale): string {
  if (locale === "es") {
    const club = player.club ? `del ${player.club}` : "sin equipo";
    const growth =
      player.growth > 0 ? `le quedan ${signedNumber(player.growth)} de crecimiento` : "ya está en su techo";
    return `${player.name} es un ${player.position} de ${player.age} años ${club} en ${short}, con ${player.overall} de media y ${player.potential} de potencial: ${growth}. Vale ${money(player.value, "es")}.`;
  }
  const club = player.club ? `at ${player.club}` : "without a club";
  const growth = player.growth > 0 ? `${signedNumber(player.growth)} of growth left` : "no growth left";
  return `${player.name} is a ${player.age}-year-old ${player.position} ${club} in ${short}, rated ${player.overall} with ${player.potential} potential — ${growth}. Worth ${money(player.value, locale)}.`;
}

export function playerMetaTitle(player: DerivedPlayer, short: string, locale: SeoLocale): string {
  return locale === "es"
    ? `${player.name} ${short}: ${player.overall} de media, ${player.potential} de potencial, ${money(player.value, "es")}`
    : `${player.name} ${short} — ${player.overall} OVR, ${player.potential} potential, ${money(player.value, "en")}`;
}

/* ------------------------------------------------------------------ */

export function VersionHub({ locale, versionId }: { locale: SeoLocale; versionId: GameVersionId }) {
  const s = SEO_STRINGS[locale];
  const version = getVersion(versionId);
  const players = getPlayers(versionId);
  const lists = listsFor(versionId);
  const highlights = LISTS[0]!.select(players).slice(0, 10);

  return (
    <>
      <VersionSync versionId={versionId} />
      <Breadcrumbs
        trail={[
          { name: s.home, href: homePath(locale) },
          { name: version.shortLabel, href: versionPath(locale, versionId) },
        ]}
      />

      <h1 className="text-2xl font-bold text-zinc-50 sm:text-3xl">{t(s.hubTitle, { label: version.label })}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
        {t(s.hubIntro, { count: players.length, season: version.season })}
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-100">{s.lists}</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {lists.map((list) => (
          <li key={list.id}>
            <Link href={listPath(locale, versionId, list)} className="focus-ring panel block p-3 transition hover:border-accent/40">
              <span className="block text-sm font-medium text-zinc-100">{list.copy[locale].label}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-zinc-500">
                {t(list.copy[locale].description, { version: version.shortLabel })}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-zinc-100">
        {t(s.highestPotential, { short: version.shortLabel })}
      </h2>
      <div className="panel mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <PlayerTableHead locale={locale} />
          <tbody>
            <PlayerRows versionId={versionId} players={highlights} locale={locale} />
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-zinc-400">
        <Link href={listPath(locale, versionId, LISTS[0]!)} className="focus-ring rounded text-accent hover:underline">
          {t(s.seeFullList, { short: version.shortLabel })}
        </Link>
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-100">{s.players}</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        {s.playersIntro}
        {players.slice(0, 6).map((player, index) => (
          <span key={player.id}>
            {index > 0 && ", "}
            <Link href={playerPath(locale, versionId, player)} className="focus-ring rounded text-accent hover:underline">
              {player.name}
            </Link>
          </span>
        ))}
        .
      </p>

      <SourceNote version={version} locale={locale} />
    </>
  );
}

/* ------------------------------------------------------------------ */

export function ListView({
  locale,
  versionId,
  list,
}: {
  locale: SeoLocale;
  versionId: GameVersionId;
  list: ListDefinition;
}) {
  const s = SEO_STRINGS[locale];
  const version = getVersion(versionId);
  const short = version.shortLabel;
  const copy = list.copy[locale];
  const players = list.select(getPlayers(versionId));
  const heading = t(copy.heading, { version: short });
  const otherLists = listsFor(versionId).filter((entry) => entry.id !== list.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: heading,
    numberOfItems: players.length,
    itemListElement: players.slice(0, 25).map((player, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: player.name,
      url: `${SITE_URL}${playerPath(locale, versionId, player)}`,
    })),
  };

  return (
    <>
      <VersionSync versionId={versionId} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs
        trail={[
          { name: s.home, href: homePath(locale) },
          { name: short, href: versionPath(locale, versionId) },
          { name: heading, href: listPath(locale, versionId, list) },
        ]}
      />

      <h1 className="text-2xl font-bold text-zinc-50 sm:text-3xl">{heading}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">{t(copy.intro, { version: short })}</p>
      <p className="mt-1 text-xs text-zinc-500">
        {t(s.countLine, { count: players.length, label: version.label, season: version.season })}
      </p>

      <div className="panel mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <PlayerTableHead locale={locale} />
          <tbody>
            <PlayerRows versionId={versionId} players={players} locale={locale} />
          </tbody>
        </table>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-zinc-100">{t(s.otherLists, { short })}</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {otherLists.map((entry) => (
          <li key={entry.id}>
            <Link
              href={listPath(locale, versionId, entry)}
              className="focus-ring chip border-line bg-surface-2 text-zinc-300 transition hover:border-accent/50 hover:text-accent"
            >
              {entry.copy[locale].label}
            </Link>
          </li>
        ))}
      </ul>

      <SourceNote version={version} locale={locale} />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line/60 py-1.5 last:border-0">
      <dt className="text-xs text-zinc-500">{label}</dt>
      <dd className="text-right font-mono text-xs text-zinc-200">{value}</dd>
    </div>
  );
}

/** "an explosive" / "a normal" — English growth types start with both. */
function article(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

export function PlayerProfile({
  locale,
  versionId,
  player,
}: {
  locale: SeoLocale;
  versionId: GameVersionId;
  player: DerivedPlayer;
}) {
  const s = SEO_STRINGS[locale];
  const version = getVersion(versionId);
  const short = version.shortLabel;
  // Only the seasons ahead of him: the curve also carries two past years,
  // which are of no use to someone deciding whether to sign him.
  const curve = projectGrowth(player).filter((point) => point.age >= player.age);
  const similar = similarPlayers(versionId, player);
  const typeName = growthTypeName(player.growthType, locale).toLowerCase();

  return (
    <>
      <VersionSync versionId={versionId} />
      <Breadcrumbs
        trail={[
          { name: s.home, href: homePath(locale) },
          { name: short, href: versionPath(locale, versionId) },
          { name: player.name, href: playerPath(locale, versionId, player) },
        ]}
      />

      <h1 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
        {player.name} — {short} {locale === "es" ? "Modo Carrera" : "Career Mode"}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
        {playerSummary(player, short, locale)}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="panel p-4 text-center">
          <p className="field-label">{locale === "es" ? "Media" : "Overall"}</p>
          <p className="mt-1 font-mono text-2xl font-bold text-zinc-50">{player.overall}</p>
        </div>
        <div className="panel p-4 text-center">
          <p className="field-label">{locale === "es" ? "Potencial" : "Potential"}</p>
          <p className="mt-1 font-mono text-2xl font-bold text-accent">{player.potential}</p>
        </div>
        <div className="panel p-4 text-center">
          <p className="field-label">{locale === "es" ? "Crecimiento" : "Growth"}</p>
          <p className="mt-1 font-mono text-2xl font-bold text-zinc-50">{signedNumber(player.growth)}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="panel p-4">
          <h2 className="mb-2 text-sm font-semibold text-zinc-200">{s.profile}</h2>
          <dl>
            <Fact label={s.profileRows.position} value={[player.position, ...player.altPositions].join(", ")} />
            <Fact label={s.profileRows.age} value={player.age} />
            <Fact label={s.profileRows.club} value={player.club ?? s.freeAgent} />
            <Fact label={s.profileRows.league} value={player.league ?? "—"} />
            <Fact label={s.profileRows.nationality} value={nationName(player.nation, locale) || "—"} />
            <Fact
              label={s.profileRows.foot}
              value={
                locale === "es" ? (player.foot === "Left" ? "Izquierda" : "Derecha") : player.foot
              }
            />
            <Fact label={s.profileRows.weakSkills} value={`${player.weakFoot}★ / ${player.skillMoves}★`} />
            <Fact label={s.profileRows.heightWeight} value={`${player.height} cm / ${player.weight} kg`} />
          </dl>
        </section>

        <section className="panel p-4">
          <h2 className="mb-2 text-sm font-semibold text-zinc-200">{s.contract}</h2>
          <dl>
            <Fact label={s.contractRows.value} value={money(player.value, locale)} />
            <Fact
              label={s.contractRows.wage}
              value={player.isFreeAgent ? "—" : wage(player.contract.wage, locale)}
            />
            <Fact
              label={s.contractRows.clause}
              value={player.contract.releaseClause ? money(player.contract.releaseClause, locale) : s.none}
            />
            <Fact
              label={s.contractRows.expires}
              value={contractEnd(player.contract.expiresYear, player.contract.expiresMonth, locale)}
            />
            <Fact
              label={s.contractRows.costPerGrowth}
              value={player.growth > 0 ? money(player.costPerGrowthPoint, locale) : "—"}
            />
          </dl>
        </section>
      </div>

      <section className="mt-5">
        <h2 className="text-lg font-semibold text-zinc-100">
          {t(s.growthHeading, { name: player.name, short })}
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-400">
          {t(s.growthIntro, { article: article(typeName), type: typeName })}
        </p>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-500">
          {growthTypeNote(player.growthType, locale)}
        </p>
        <div className="panel mt-3 overflow-x-auto">
          <table className="w-full min-w-[360px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wider text-zinc-500">
                <th scope="col" className="px-3 py-2 text-left font-semibold">{s.growthTable.age}</th>
                <th scope="col" className="px-3 py-2 text-right font-semibold">{s.growthTable.projected}</th>
                <th scope="col" className="px-3 py-2 text-right font-semibold">{s.growthTable.gain}</th>
              </tr>
            </thead>
            <tbody>
              {curve.map((point, index) => (
                <tr key={point.age} className="border-b border-line/60 last:border-0">
                  <th scope="row" className="px-3 py-2 text-left text-xs font-normal text-zinc-300">
                    {point.age}
                    {point.isNow && <span className="ml-2 text-[11px] text-zinc-500">{s.growthTable.now}</span>}
                  </th>
                  <td className="px-3 py-2 text-right font-mono text-xs tabular-nums text-zinc-100">{point.overall}</td>
                  <td className="px-3 py-2 text-right font-mono text-xs tabular-nums text-zinc-500">
                    {index === 0 ? "—" : signedNumber(point.overall - curve[index - 1]!.overall)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {hasCardStats(player) && (
        <section className="mt-5">
          <h2 className="text-lg font-semibold text-zinc-100">{s.attributes}</h2>
          <dl className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {radarStats(player).map((stat) => (
              <div key={stat.key} className="panel px-2 py-2 text-center">
                <dt className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{stat.short}</dt>
                <dd className="font-mono text-sm font-semibold text-zinc-100">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-zinc-100">{t(s.similar, { short })}</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {similar.map((other) => (
            <li key={other.id}>
              <Link
                href={playerPath(locale, versionId, other)}
                className="focus-ring panel flex items-baseline justify-between gap-3 p-3 transition hover:border-accent/40"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-zinc-100">{other.name}</span>
                  <span className="block truncate text-xs text-zinc-500">
                    {[other.club, `${other.age}${locale === "es" ? " a" : "y"}`, other.position]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-xs text-zinc-400">
                  {other.overall}→{other.potential}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 text-sm text-zinc-400">
        <Link href="/" className="focus-ring rounded text-accent hover:underline">
          {t(s.openApp, { short })}
        </Link>
      </p>

      <SourceNote version={version} locale={locale} />
    </>
  );
}
