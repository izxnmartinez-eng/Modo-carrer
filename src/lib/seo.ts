import { derivePlayers } from "./derive";
import { DATASETS, VERSION_ORDER } from "./data";
import type { DerivedPlayer, GameVersion, GameVersionId, PositionGroup } from "./types";

/**
 * Server-rendered, indexable pages.
 *
 * The app itself is one client-rendered screen: fast to use, invisible to a
 * search engine. These helpers back a parallel set of static pages — one per
 * player, one per list — that carry the same data as real HTML, so someone
 * searching "wonderkids fc 26" or a specific player's potential can land
 * directly on the answer.
 *
 * Only versions whose data is real are published. FC 27 runs on placeholders
 * until EA releases the ratings, and putting invented numbers in a search
 * index would be worse than having no page at all.
 */

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
 * re-imported with more rows.
 */
export function playerSlug(player: DerivedPlayer): string {
  const name = player.name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const id = player.id.split("-").pop() ?? "";
  return name ? `${name}-${id}` : id;
}

export function playerPath(versionId: GameVersionId, player: DerivedPlayer): string {
  return `/${versionId}/players/${playerSlug(player)}`;
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

/* ------------------------------------------------------------------ */
/* Lists                                                               */
/* ------------------------------------------------------------------ */

export interface ListDefinition {
  slug: string;
  /** Two or three words, for chips and the footer where the version is already known. */
  label: string;
  /** `{version}` is replaced with the short label, e.g. "FC 26". */
  title: string;
  heading: string;
  description: string;
  intro: string;
  select: (players: DerivedPlayer[]) => DerivedPlayer[];
}

const byPotential = (a: DerivedPlayer, b: DerivedPlayer) =>
  b.potential - a.potential || b.growth - a.growth;

function youngestFirst(group: PositionGroup, label: string, plural: string): ListDefinition {
  return {
    slug: `young-${plural.toLowerCase()}`,
    label: `Young ${plural.toLowerCase()}`,
    title: `Best young {version} ${plural.toLowerCase()} for Career Mode`,
    heading: `Best young ${plural.toLowerCase()} — {version} Career Mode`,
    description: `The highest-potential ${label.toLowerCase()}s aged 21 and under in {version}, with growth, market value, wage and release clause.`,
    intro: `Every ${label.toLowerCase()} aged 21 or under in the {version} database, ranked by potential. Growth is potential minus current overall — what you are actually buying.`,
    select: (players) =>
      players.filter((p) => p.group === group && p.age <= 21).sort(byPotential).slice(0, 100),
  };
}

export const LISTS: ListDefinition[] = [
  {
    slug: "wonderkids",
    label: "Wonderkids",
    title: "{version} wonderkids — best young players for Career Mode",
    heading: "{version} wonderkids",
    description:
      "The highest-potential players aged 21 and under in {version} Career Mode, with growth, market value, wage and release clause for each.",
    intro:
      "The players aged 21 or under with the most potential in {version}, ranked by ceiling. Growth is potential minus current overall — the rating points you are actually paying for.",
    select: (players) => players.filter((p) => p.age <= 21).sort(byPotential).slice(0, 100),
  },
  {
    slug: "hidden-gems",
    label: "Hidden gems",
    title: "{version} hidden gems — high potential, low overall",
    heading: "{version} hidden gems",
    description:
      "Players in {version} rated under 68 overall who can still reach 83 or better — the ones your scouts have not flagged yet.",
    intro:
      "Rated below 68 today, capable of 83 or more. These are the signings that look like squad filler in the first season and start for you in the third.",
    select: (players) => players.filter((p) => p.isHiddenGem).sort(byPotential).slice(0, 100),
  },
  {
    slug: "bargains",
    label: "Bargains",
    title: "{version} bargains — best value signings in Career Mode",
    heading: "{version} bargains",
    description:
      "The best value-for-money signings in {version} Career Mode, weighing potential and growth against transfer fee and wage.",
    intro:
      "Ranked by how much potential each euro buys: ceiling and growth measured against transfer value and weekly wage.",
    select: (players) =>
      players
        .filter((p) => p.growth > 0)
        .sort((a, b) => b.bargainScore - a.bargainScore || b.potential - a.potential)
        .slice(0, 100),
  },
  {
    slug: "free-agents",
    label: "Free agents",
    title: "{version} free agents — best players with no club",
    heading: "{version} free agents",
    description:
      "Every player without a club in {version} Career Mode, ranked by rating and potential. No transfer fee, wage only.",
    intro:
      "No club, no transfer fee — the wage is the whole cost. Ranked by what they can still become.",
    select: (players) =>
      players.filter((p) => p.isFreeAgent).sort((a, b) => b.overall - a.overall || b.potential - a.potential).slice(0, 100),
  },
  {
    slug: "expiring-contracts",
    label: "Expiring contracts",
    title: "{version} expiring contracts — free pre-contract targets",
    heading: "{version} expiring contracts",
    description:
      "Players in {version} with six months or less left on their deal, signable on a free pre-contract in the January window.",
    intro:
      "Six months or less left when the January window opens, which is the point a Career Mode save can agree a free pre-contract. Ranked by rating.",
    select: (players) =>
      players.filter((p) => p.isExpiring).sort((a, b) => b.overall - a.overall || b.potential - a.potential).slice(0, 100),
  },
  youngestFirst("Goalkeeper", "Goalkeeper", "Goalkeepers"),
  youngestFirst("Defender", "Defender", "Defenders"),
  youngestFirst("Midfielder", "Midfielder", "Midfielders"),
  youngestFirst("Attacker", "Attacker", "Attackers"),
];

export function findList(slug: string): ListDefinition | undefined {
  return LISTS.find((list) => list.slug === slug);
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
 * Money as "€115.5M".
 *
 * Deliberately hand-rolled: Node and Chromium disagree on the casing of
 * `Intl` compact notation, which produced a hydration mismatch the last time
 * these numbers were formatted with it.
 */
export function money(value: number): string {
  if (value <= 0) return "Free";
  if (value >= 1e9) return `€${trim(value / 1e9)}B`;
  if (value >= 1e6) return `€${trim(value / 1e6)}M`;
  if (value >= 1e3) return `€${trim(value / 1e3)}K`;
  return `€${value}`;
}

export function wage(value: number): string {
  return value > 0 ? `${money(value)}/week` : "—";
}

function trim(n: number): string {
  return n >= 100 ? String(Math.round(n)) : String(Math.round(n * 10) / 10);
}

export function signedNumber(value: number): string {
  return value > 0 ? `+${value}` : String(value);
}

const MONTHS = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function contractEnd(year: number, month: number): string {
  if (!year) return "No club";
  return `${MONTHS[month] ?? "June"} ${year}`;
}
