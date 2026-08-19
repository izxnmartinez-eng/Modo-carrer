import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlayerProfile, playerMetaTitle, playerSummary } from "@/components/seo/pages";
import {
  INDEXED_VERSIONS,
  findPlayerBySlug,
  getPlayers,
  getVersion,
  isIndexedVersion,
  languageAlternates,
  playerPath,
  playerSlug,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDEXED_VERSIONS.flatMap((version) =>
    getPlayers(version).map((player) => ({ version, slug: playerSlug(player) })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ version: string; slug: string }>;
}): Promise<Metadata> {
  const { version: id, slug } = await params;
  if (!isIndexedVersion(id)) return {};
  const player = findPlayerBySlug(id, slug);
  if (!player) return {};
  const short = getVersion(id).shortLabel;

  return {
    title: playerMetaTitle(player, short, "es"),
    description: playerSummary(player, short, "es"),
    alternates: {
      canonical: playerPath("es", id, player),
      languages: languageAlternates({
        en: playerPath("en", id, player),
        es: playerPath("es", id, player),
      }),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ version: string; slug: string }> }) {
  const { version: id, slug } = await params;
  if (!isIndexedVersion(id)) notFound();
  const player = findPlayerBySlug(id, slug);
  if (!player) notFound();
  return <PlayerProfile locale="es" versionId={id} player={player} />;
}
