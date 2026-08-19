import { derivePlayers } from "./derive";
import { DATASETS, VERSION_ORDER } from "./data";
import { en } from "@/i18n/dictionaries/en";
import { es } from "@/i18n/dictionaries/es";
import type { Locale } from "@/i18n";
import type { DerivedPlayer, GameVersion, GameVersionId, GrowthType, PositionGroup } from "./types";

/**
 * Server-rendered, indexable pages.
 *
 * The app itself is one client-rendered screen: fast to use, invisible to a
 * search engine. These helpers back a parallel set of static pages — one per
 * player, one per list, in English at the root and in Spanish under `/es` —
 * that carry the same data as real HTML, so someone searching "fc 26
 * wonderkids" or "mejores perlas fc 26" lands directly on the answer.
 *
 * Only versions whose data is real are published. FC 27 runs on placeholders
 * until EA releases the ratings, and putting invented numbers in a search
 * index would be worse than having no page at all.
 */

export type SeoLocale = "en" | "es";
export const SEO_LOCALES: SeoLocale[] = ["en", "es"];

/** The interface has six languages; the indexed pages have two. */
export function seoLocaleFor(locale: Locale): SeoLocale {
  return locale === "es" ? "es" : "en";
}

/** Canonical origin. Vercel sets the deployment URL; override for a custom domain. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://modo-carrera-nine.vercel.app")
).replace(/\/$/, "");

export const INDEXED_VERSIONS: GameVersionId[] = VERSION_ORDER.filter(
  (id) => DATASETS[id].version.dataSource === "real",
);

export function isIndexedVersion(value: string): value is GameVersionId {
  return (INDEXED_VERSIONS as string[]).includes(value);
}

export function getVersion(id: GameVersionId): GameVersion {
  return DATASETS[id].version;
}

/* ------------------------------------------------------------------ */
/* Paths                                                               */
/* ------------------------------------------------------------------ */

const PREFIX: Record<SeoLocale, string> = { en: "", es: "/es" };
const PLAYERS_SEGMENT: Record<SeoLocale, string> = { en: "players", es: "jugadores" };

export function homePath(locale: SeoLocale): string {
  return locale === "es" ? "/es" : "/";
}

export function versionPath(locale: SeoLocale, id: GameVersionId): string {
  return `${PREFIX[locale]}/${id}`;
}

export function listPath(locale: SeoLocale, id: GameVersionId, list: ListDefinition): string {
  return `${PREFIX[locale]}/${id}/${list.copy[locale].slug}`;
}

export function playerPath(locale: SeoLocale, id: GameVersionId, player: DerivedPlayer): string {
  return `${PREFIX[locale]}/${id}/${PLAYERS_SEGMENT[locale]}/${playerSlug(player)}`;
}

/** hreflang map for one page, given the same page's path in each language. */
export function languageAlternates(paths: Record<SeoLocale, string>) {
  return { en: paths.en, es: paths.es, "x-default": paths.en };
}

/* ------------------------------------------------------------------ */
/* Players                                                             */
/* ------------------------------------------------------------------ */

const playerCache = new Map<GameVersionId, DerivedPlayer[]>();

export function getPlayers(id: GameVersionId): DerivedPlayer[] {
  const cached = playerCache.get(id);
  if (cached) return cached;
  const dataset = DATASETS[id];
  const players = derivePlayers(dataset.players, dataset.version);
  playerCache.set(id, players);
  return players;
}

/**
 * URL slug for a player: name plus the source's numeric id.
 *
 * The id is not decoration — "J. Silva" is several different people, and the
 * suffix keeps every URL unique and stable even when the dataset is
 * re-imported with more rows. It is the same in both languages, because a
 * player's name is.
 */
export function playerSlug(player: DerivedPlayer): string {
  const name = player.name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const id = player.id.split("-").pop() ?? "";
  return name ? `${name}-${id}` : id;
}

export function findPlayerBySlug(versionId: GameVersionId, slug: string): DerivedPlayer | undefined {
  return getPlayers(versionId).find((player) => playerSlug(player) === slug);
}

/** Players a visitor looking at this one would plausibly consider instead. */
export function similarPlayers(versionId: GameVersionId, player: DerivedPlayer, count = 6): DerivedPlayer[] {
  return getPlayers(versionId)
    .filter((other) => other.id !== player.id && other.group === player.group)
    .map((other) => ({
      other,
      distance: Math.abs(other.potential - player.potential) * 2 + Math.abs(other.age - player.age),
    }))
    .sort((a, b) => a.distance - b.distance || b.other.growth - a.other.growth)
    .slice(0, count)
    .map((entry) => entry.other);
}

export function growthTypeName(type: GrowthType, locale: SeoLocale): string {
  return (locale === "es" ? es : en).growthTypes[type].name;
}

export function growthTypeNote(type: GrowthType, locale: SeoLocale): string {
  return (locale === "es" ? es : en).growthTypes[type].note;
}

/* ------------------------------------------------------------------ */
/* Lists                                                               */
/* ------------------------------------------------------------------ */

/** `{version}` in any of these is replaced with the short label, e.g. "FC 26". */
export interface ListCopy {
  slug: string;
  /** Two or three words, for chips and the footer where the version is known. */
  label: string;
  title: string;
  heading: string;
  description: string;
  intro: string;
}

export interface ListDefinition {
  id: string;
  select: (players: DerivedPlayer[]) => DerivedPlayer[];
  copy: Record<SeoLocale, ListCopy>;
}

const byPotential = (a: DerivedPlayer, b: DerivedPlayer) => b.potential - a.potential || b.growth - a.growth;

/** The four position lists share a shape; only the nouns change. */
function youngLine(group: PositionGroup, en: string, es: string, esSlug: string): ListDefinition {
  return {
    id: `young-${en}`,
    select: (players) => players.filter((p) => p.group === group && p.age <= 21).sort(byPotential).slice(0, 100),
    copy: {
      en: {
        slug: `young-${en}`,
        label: `Young ${en}`,
        title: `Best young {version} ${en} for Career Mode`,
        heading: `Best young ${en} — {version} Career Mode`,
        description: `The highest-potential ${en} aged 21 and under in {version}, with growth, market value, wage and release clause.`,
        intro: `Every ${en.replace(/s$/, "")} aged 21 or under in the {version} database, ranked by potential. Growth is potential minus current overall — what you are actually buying.`,
      },
      es: {
        slug: esSlug,
        label: `${es[0]!.toUpperCase()}${es.slice(1)} jóvenes`,
        title: `Mejores ${es} jóvenes de {version} para el Modo Carrera`,
        heading: `Mejores ${es} jóvenes de {version}`,
        description: `Los ${es} de 21 años o menos con más potencial en {version}, con crecimiento, valor de mercado, salario y cláusula de rescisión.`,
        intro: `Todos los ${es} de 21 años o menos de la base de datos de {version}, ordenados por potencial. El crecimiento es el potencial menos la media actual: los puntos que de verdad estás comprando.`,
      },
    },
  };
}

export const LISTS: ListDefinition[] = [
  {
    id: "wonderkids",
    select: (players) => players.filter((p) => p.age <= 21).sort(byPotential).slice(0, 100),
    copy: {
      en: {
        slug: "wonderkids",
        label: "Wonderkids",
        title: "{version} wonderkids — best young players for Career Mode",
        heading: "{version} wonderkids",
        description:
          "The highest-potential players aged 21 and under in {version} Career Mode, with growth, market value, wage and release clause for each.",
        intro:
          "The players aged 21 or under with the most potential in {version}, ranked by ceiling. Growth is potential minus current overall — the rating points you are actually paying for.",
      },
      es: {
        slug: "perlas",
        label: "Perlas",
        title: "Mejores perlas de {version} para el Modo Carrera",
        heading: "Perlas de {version}",
        description:
          "Los jugadores de 21 años o menos con más potencial en el Modo Carrera de {version}, con crecimiento, valor de mercado, salario y cláusula de rescisión.",
        intro:
          "Los jugadores de 21 años o menos con más techo de {version}, ordenados por potencial. El crecimiento es el potencial menos la media actual: los puntos de media que estás pagando de verdad.",
      },
    },
  },
  {
    id: "hidden-gems",
    select: (players) => players.filter((p) => p.isHiddenGem).sort(byPotential).slice(0, 100),
    copy: {
      en: {
        slug: "hidden-gems",
        label: "Hidden gems",
        title: "{version} hidden gems — high potential, low overall",
        heading: "{version} hidden gems",
        description:
          "Players in {version} rated under 68 overall who can still reach 83 or better — the ones your scouts have not flagged yet.",
        intro:
          "Rated below 68 today, capable of 83 or more. These are the signings that look like squad filler in the first season and start for you in the third.",
      },
      es: {
        slug: "joyas-ocultas",
        label: "Joyas ocultas",
        title: "Joyas ocultas de {version}: mucho potencial y media baja",
        heading: "Joyas ocultas de {version}",
        description:
          "Jugadores de {version} con menos de 68 de media que pueden llegar a 83 o más. Los que todavía no ha fichado nadie.",
        intro:
          "Hoy están por debajo de 68 de media y pueden llegar a 83 o más. Son los fichajes que en la primera temporada parecen relleno y en la tercera te son titulares.",
      },
    },
  },
  {
    id: "bargains",
    select: (players) =>
      players
        .filter((p) => p.growth > 0)
        .sort((a, b) => b.bargainScore - a.bargainScore || b.potential - a.potential)
        .slice(0, 100),
    copy: {
      en: {
        slug: "bargains",
        label: "Bargains",
        title: "{version} bargains — best value signings in Career Mode",
        heading: "{version} bargains",
        description:
          "The best value-for-money signings in {version} Career Mode, weighing potential and growth against transfer fee and wage.",
        intro:
          "Ranked by how much potential each euro buys: ceiling and growth measured against transfer value and weekly wage.",
      },
      es: {
        slug: "chollos",
        label: "Chollos",
        title: "Chollos de {version}: los fichajes con mejor relación calidad-precio",
        heading: "Chollos de {version}",
        description:
          "Los fichajes que más rinden por lo que cuestan en el Modo Carrera de {version}, midiendo potencial y crecimiento contra el traspaso y el salario.",
        intro:
          "Ordenados por cuánto potencial compra cada euro: techo y crecimiento medidos contra el valor de traspaso y el salario semanal.",
      },
    },
  },
  {
    id: "free-agents",
    select: (players) =>
      players.filter((p) => p.isFreeAgent).sort((a, b) => b.overall - a.overall || b.potential - a.potential).slice(0, 100),
    copy: {
      en: {
        slug: "free-agents",
        label: "Free agents",
        title: "{version} free agents — best players with no club",
        heading: "{version} free agents",
        description:
          "Every player without a club in {version} Career Mode, ranked by rating and potential. No transfer fee, wage only.",
        intro: "No club, no transfer fee — the wage is the whole cost. Ranked by what they can still become.",
      },
      es: {
        slug: "agentes-libres",
        label: "Agentes libres",
        title: "Agentes libres de {version}: los mejores jugadores sin equipo",
        heading: "Agentes libres de {version}",
        description:
          "Todos los jugadores sin club del Modo Carrera de {version}, ordenados por media y potencial. Sin traspaso: solo pagas la ficha.",
        intro:
          "Sin club y sin coste de traspaso: el salario es todo el gasto. Ordenados por lo que todavía pueden llegar a ser.",
      },
    },
  },
  {
    id: "expiring-contracts",
    select: (players) =>
      players.filter((p) => p.isExpiring).sort((a, b) => b.overall - a.overall || b.potential - a.potential).slice(0, 100),
    copy: {
      en: {
        slug: "expiring-contracts",
        label: "Expiring contracts",
        title: "{version} expiring contracts — free pre-contract targets",
        heading: "{version} expiring contracts",
        description:
          "Players in {version} with six months or less left on their deal, signable on a free pre-contract in the January window.",
        intro:
          "Six months or less left when the January window opens, which is the point a Career Mode save can agree a free pre-contract. Ranked by rating.",
      },
      es: {
        slug: "acaban-contrato",
        label: "Acaban contrato",
        title: "Jugadores que acaban contrato en {version}: precontratos gratis",
        heading: "Acaban contrato en {version}",
        description:
          "Jugadores de {version} a los que les quedan seis meses o menos de contrato y puedes firmar gratis en el mercado de enero.",
        intro:
          "Les quedan seis meses o menos cuando abre el mercado de enero, que es el momento en el que el Modo Carrera te deja firmar un precontrato gratis. Ordenados por media.",
      },
    },
  },
  youngLine("Goalkeeper", "goalkeepers", "porteros", "porteros-jovenes"),
  youngLine("Defender", "defenders", "defensas", "defensas-jovenes"),
  youngLine("Midfielder", "midfielders", "centrocampistas", "centrocampistas-jovenes"),
  youngLine("Attacker", "attackers", "delanteros", "delanteros-jovenes"),
];

export function findListBySlug(locale: SeoLocale, slug: string): ListDefinition | undefined {
  return LISTS.find((list) => list.copy[locale].slug === slug);
}

/** Lists with at least one player — an empty list is not worth a page. */
export function listsFor(versionId: GameVersionId): ListDefinition[] {
  const players = getPlayers(versionId);
  return LISTS.filter((list) => list.select(players).length > 0);
}

/* ------------------------------------------------------------------ */
/* Formatting (server-side, no Intl)                                   */
/* ------------------------------------------------------------------ */

/**
 * Money, in the shape each language writes it: "€115.5M" and "115,5 M €".
 *
 * Deliberately hand-rolled: Node and Chromium disagree on the casing of
 * `Intl` compact notation, which produced a hydration mismatch the last time
 * these numbers were formatted with it.
 */
export function money(value: number, locale: SeoLocale = "en"): string {
  if (value <= 0) return locale === "es" ? "Gratis" : "Free";
  const [amount, unit] =
    value >= 1e9
      ? [value / 1e9, "B"]
      : value >= 1e6
        ? [value / 1e6, "M"]
        : value >= 1e3
          ? [value / 1e3, "K"]
          : [value, ""];
  const rounded = amount >= 100 ? String(Math.round(amount)) : String(Math.round(amount * 10) / 10);
  if (locale === "es") {
    const spanish = rounded.replace(".", ",");
    return unit ? `${spanish} ${unit} €` : `${spanish} €`;
  }
  return `€${rounded}${unit}`;
}

export function wage(value: number, locale: SeoLocale = "en"): string {
  if (value <= 0) return "—";
  return locale === "es" ? `${money(value, "es")}/sem` : `${money(value, "en")}/week`;
}

export function signedNumber(value: number): string {
  return value > 0 ? `+${value}` : String(value);
}

const MONTHS: Record<SeoLocale, string[]> = {
  en: ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  es: ["", "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
};

export function contractEnd(year: number, month: number, locale: SeoLocale = "en"): string {
  if (!year) return locale === "es" ? "Sin club" : "No club";
  const name = MONTHS[locale][month] ?? MONTHS[locale][6]!;
  return locale === "es" ? `${name} de ${year}` : `${name} ${year}`;
}
