import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, PlayerRows, PlayerTableHead, SourceNote } from "@/components/seo/seo-parts";
import { VersionSync } from "@/components/seo/version-sync";
import {
  INDEXED_VERSIONS,
  LISTS,
  getPlayers,
  getVersion,
  isIndexedVersion,
  listsFor,
  playerPath,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDEXED_VERSIONS.map((version) => ({ version }));
}

export async function generateMetadata({ params }: { params: Promise<{ version: string }> }): Promise<Metadata> {
  const { version: id } = await params;
  if (!isIndexedVersion(id)) return {};
  const version = getVersion(id);
  const total = getPlayers(id).length;

  return {
    title: `${version.shortLabel} Career Mode database — wonderkids, values and contracts`,
    description: `${total} ${version.shortLabel} players with potential, growth, market value, wage, release clause and contract length. Built for Career Mode, not Ultimate Team.`,
    alternates: { canonical: `/${id}` },
  };
}

export default async function VersionHubPage({ params }: { params: Promise<{ version: string }> }) {
  const { version: id } = await params;
  if (!isIndexedVersion(id)) notFound();

  const version = getVersion(id);
  const players = getPlayers(id);
  const lists = listsFor(id);
  const highlights = LISTS[0]!.select(players).slice(0, 10);

  return (
    <>
      <VersionSync versionId={id} />
      <Breadcrumbs trail={[{ name: "Career Hub", href: "/" }, { name: version.shortLabel, href: `/${id}` }]} />

      <h1 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
        {version.label} Career Mode database
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
        Potential, growth, market value, wage, release clause and contract length for {players.length} players in the{" "}
        {version.season} season. Everything here is what a Career Mode save actually needs — no Ultimate Team prices,
        no packs.
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-100">Lists</h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {lists.map((list) => (
          <li key={list.slug}>
            <Link
              href={`/${id}/${list.slug}`}
              className="focus-ring panel block p-3 transition hover:border-accent/40"
            >
              <span className="block text-sm font-medium text-zinc-100">{list.label}</span>
              <span className="mt-0.5 block text-xs leading-relaxed text-zinc-500">
                {list.description.replace(/\{version\}/g, version.shortLabel)}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mt-8 text-lg font-semibold text-zinc-100">
        Highest potential in {version.shortLabel}
      </h2>
      <div className="panel mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <PlayerTableHead />
          <tbody>
            <PlayerRows versionId={id} players={highlights} />
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-zinc-400">
        <Link href={`/${id}/wonderkids`} className="focus-ring rounded text-accent hover:underline">
          See the full {version.shortLabel} wonderkid list →
        </Link>
      </p>

      <h2 className="mt-8 text-lg font-semibold text-zinc-100">Players</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Every player has a page with his growth curve season by season, his contract and what each rating point costs.
        A few to start with:{" "}
        {players.slice(0, 6).map((player, index) => (
          <span key={player.id}>
            {index > 0 && ", "}
            <Link href={playerPath(id, player)} className="focus-ring rounded text-accent hover:underline">
              {player.name}
            </Link>
          </span>
        ))}
        .
      </p>

      <SourceNote version={version} />
    </>
  );
}
