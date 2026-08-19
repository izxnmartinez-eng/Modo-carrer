import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListView } from "@/components/seo/pages";
import { t } from "@/components/seo/strings";
import {
  INDEXED_VERSIONS,
  findListBySlug,
  getVersion,
  isIndexedVersion,
  languageAlternates,
  listPath,
  listsFor,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDEXED_VERSIONS.flatMap((version) =>
    listsFor(version).map((list) => ({ version, list: list.copy.es.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ version: string; list: string }>;
}): Promise<Metadata> {
  const { version: id, list: slug } = await params;
  const list = findListBySlug("es", slug);
  if (!isIndexedVersion(id) || !list) return {};
  const short = getVersion(id).shortLabel;

  return {
    title: t(list.copy.es.title, { version: short }),
    description: t(list.copy.es.description, { version: short }),
    alternates: {
      canonical: listPath("es", id, list),
      languages: languageAlternates({ en: listPath("en", id, list), es: listPath("es", id, list) }),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ version: string; list: string }> }) {
  const { version: id, list: slug } = await params;
  const list = findListBySlug("es", slug);
  if (!isIndexedVersion(id) || !list || !listsFor(id).some((entry) => entry.id === list.id)) notFound();
  return <ListView locale="es" versionId={id} list={list} />;
}
