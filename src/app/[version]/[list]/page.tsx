import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, PlayerRows, PlayerTableHead, SourceNote } from "@/components/seo/seo-parts";
import { VersionSync } from "@/components/seo/version-sync";
import {
  INDEXED_VERSIONS,
  SITE_URL,
  findList,
  getPlayers,
  getVersion,
  isIndexedVersion,
  listsFor,
  playerPath,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDEXED_VERSIONS.flatMap((version) =>
    listsFor(version).map((list) => ({ version, list: list.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ version: string; list: string }>;
}): Promise<Metadata> {
  const { version: id, list: slug } = await params;
  const list = findList(slug);
  if (!isIndexedVersion(id) || !list) return {};
  const short = getVersion(id).shortLabel;

  return {
    title: list.title.replace(/\{version\}/g, short),
    description: list.description.replace(/\{version\}/g, short),
    alternates: { canonical: `/${id}/${slug}` },
  };
}

export default async function ListPage({ params }: { params: Promise<{ version: string; list: string }> }) {
  const { version: id, list: slug } = await params;
  const list = findList(slug);
  if (!isIndexedVersion(id) || !list) notFound();

  const version = getVersion(id);
  const short = version.shortLabel;
  const players = list.select(getPlayers(id));
  if (players.length === 0) notFound();

  const otherLists = listsFor(id).filter((entry) => entry.slug !== slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: list.heading.replace(/\{version\}/g, short),
    numberOfItems: players.length,
    itemListElement: players.slice(0, 25).map((player, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: player.name,
      url: `${SITE_URL}${playerPath(id, player)}`,
    })),
  };

  return (
    <>
      <VersionSync versionId={id} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs
        trail={[
          { name: "Career Hub", href: "/" },
          { name: short, href: `/${id}` },
          { name: list.heading.replace(/\{version\}/g, short), href: `/${id}/${slug}` },
        ]}
      />

      <h1 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
        {list.heading.replace(/\{version\}/g, short)}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
        {list.intro.replace(/\{version\}/g, short)}
      </p>
      <p className="mt-1 text-xs text-zinc-500">
        {players.length} players · {version.label} · {version.season} season
      </p>

      <div className="panel mt-5 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <PlayerTableHead />
          <tbody>
            <PlayerRows versionId={id} players={players} />
          </tbody>
        </table>
      </div>

      <h2 className="mt-8 text-lg font-semibold text-zinc-100">Other {short} lists</h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {otherLists.map((entry) => (
          <li key={entry.slug}>
            <Link
              href={`/${id}/${entry.slug}`}
              className="focus-ring chip border-line bg-surface-2 text-zinc-300 transition hover:border-accent/50 hover:text-accent"
            >
              {entry.label}
            </Link>
          </li>
        ))}
      </ul>

      <SourceNote version={version} />
    </>
  );
}
