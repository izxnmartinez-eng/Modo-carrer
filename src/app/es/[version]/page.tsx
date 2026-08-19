import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { VersionHub } from "@/components/seo/pages";
import { SEO_STRINGS, t } from "@/components/seo/strings";
import { INDEXED_VERSIONS, getPlayers, getVersion, isIndexedVersion, languageAlternates, versionPath } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDEXED_VERSIONS.map((version) => ({ version }));
}

export async function generateMetadata({ params }: { params: Promise<{ version: string }> }): Promise<Metadata> {
  const { version: id } = await params;
  if (!isIndexedVersion(id)) return {};
  const version = getVersion(id);
  const s = SEO_STRINGS.es;
  const vars = { short: version.shortLabel, count: getPlayers(id).length };

  return {
    title: t(s.hubMetaTitle, vars),
    description: t(s.hubMetaDescription, vars),
    alternates: {
      canonical: versionPath("es", id),
      languages: languageAlternates({ en: versionPath("en", id), es: versionPath("es", id) }),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ version: string }> }) {
  const { version: id } = await params;
  if (!isIndexedVersion(id)) notFound();
  return <VersionHub locale="es" versionId={id} />;
}
