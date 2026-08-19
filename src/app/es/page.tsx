import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/seo-parts";
import { SEO_STRINGS } from "@/components/seo/strings";
import { INDEXED_VERSIONS, getPlayers, getVersion, listPath, listsFor, versionPath } from "@/lib/seo";

/** Entry point of the Spanish tree — every ES page hangs off this one. */
export const metadata: Metadata = {
  title: "Base de datos de EA Sports FC para el Modo Carrera — perlas, chollos y contratos",
  description:
    "Perlas, joyas ocultas, chollos, agentes libres y jugadores que acaban contrato en el Modo Carrera de EA Sports FC. Potencial, crecimiento, valor, salario y cláusula de cada jugador. Gratis y sin registro.",
  alternates: { canonical: "/es", languages: { en: "/", es: "/es", "x-default": "/" } },
};

export default function SpanishIndex() {
  const s = SEO_STRINGS.es;

  return (
    <>
      <Breadcrumbs trail={[{ name: s.home, href: "/es" }]} />
      <h1 className="text-2xl font-bold text-zinc-50 sm:text-3xl">{s.esIndexTitle}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
        Potencial, crecimiento, valor de mercado, salario, cláusula de rescisión y años de contrato de cada jugador,
        pensado solo para el Modo Carrera. Sin precios de Ultimate Team, sin anuncios y sin registro.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {INDEXED_VERSIONS.map((id) => {
          const version = getVersion(id);
          return (
            <section key={id} className="panel p-4">
              <h2 className="text-lg font-semibold text-zinc-100">
                <Link href={versionPath("es", id)} className="focus-ring rounded hover:text-accent">
                  {version.label}
                </Link>
              </h2>
              <p className="mt-1 text-xs text-zinc-500">
                {getPlayers(id).length} jugadores · temporada {version.season}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {listsFor(id).map((list) => (
                  <li key={list.id}>
                    <Link
                      href={listPath("es", id, list)}
                      className="focus-ring chip border-line bg-surface-2 text-zinc-300 transition hover:border-accent/50 hover:text-accent"
                    >
                      {list.copy.es.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
