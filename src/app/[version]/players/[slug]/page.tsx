import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, SourceNote } from "@/components/seo/seo-parts";
import { VersionSync } from "@/components/seo/version-sync";
import { hasCardStats, radarStats } from "@/lib/derive";
import { projectGrowth } from "@/lib/growth";
import {
  INDEXED_VERSIONS,
  contractEnd,
  findPlayerBySlug,
  getPlayers,
  getVersion,
  isIndexedVersion,
  money,
  playerPath,
  playerSlug,
  signedNumber,
  similarPlayers,
  wage,
} from "@/lib/seo";
import type { DerivedPlayer } from "@/lib/types";

export const dynamicParams = false;

export function generateStaticParams() {
  return INDEXED_VERSIONS.flatMap((version) =>
    getPlayers(version).map((player) => ({ version, slug: playerSlug(player) })),
  );
}

/** "an explosive" / "a normal" — the growth types start with both. */
function article(word: string): string {
  return /^[aeiou]/i.test(word) ? "an" : "a";
}

/** One sentence a search result can show in full. */
function summary(player: DerivedPlayer, short: string): string {
  const growth = player.growth > 0 ? `${signedNumber(player.growth)} of growth left` : "no growth left";
  const club = player.club ? `at ${player.club}` : "without a club";
  return `${player.name} is a ${player.age}-year-old ${player.position} ${club} in ${short}, rated ${player.overall} with ${player.potential} potential — ${growth}. Worth ${money(player.value)}.`;
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
    title: `${player.name} ${short} — ${player.overall} OVR, ${player.potential} potential, ${money(player.value)}`,
    description: summary(player, short),
    alternates: { canonical: `/${id}/players/${slug}` },
  };
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line/60 py-1.5 last:border-0">
      <dt className="text-xs text-zinc-500">{label}</dt>
      <dd className="text-right font-mono text-xs text-zinc-200">{value}</dd>
    </div>
  );
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ version: string; slug: string }>;
}) {
  const { version: id, slug } = await params;
  if (!isIndexedVersion(id)) notFound();
  const player = findPlayerBySlug(id, slug);
  if (!player) notFound();

  const version = getVersion(id);
  const short = version.shortLabel;
  // Only the seasons ahead of him: the curve also carries two past years,
  // which are of no use to someone deciding whether to sign him.
  const curve = projectGrowth(player).filter((point) => point.age >= player.age);
  const similar = similarPlayers(id, player);

  return (
    <>
      <VersionSync versionId={id} />
      <Breadcrumbs
        trail={[
          { name: "Career Hub", href: "/" },
          { name: short, href: `/${id}` },
          { name: player.name, href: `/${id}/players/${slug}` },
        ]}
      />

      <h1 className="text-2xl font-bold text-zinc-50 sm:text-3xl">
        {player.name} — {short} Career Mode
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">{summary(player, short)}</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="panel p-4 text-center">
          <p className="field-label">Overall</p>
          <p className="mt-1 font-mono text-2xl font-bold text-zinc-50">{player.overall}</p>
        </div>
        <div className="panel p-4 text-center">
          <p className="field-label">Potential</p>
          <p className="mt-1 font-mono text-2xl font-bold text-accent">{player.potential}</p>
        </div>
        <div className="panel p-4 text-center">
          <p className="field-label">Growth</p>
          <p className="mt-1 font-mono text-2xl font-bold text-zinc-50">{signedNumber(player.growth)}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="panel p-4">
          <h2 className="mb-2 text-sm font-semibold text-zinc-200">Profile</h2>
          <dl>
            <Fact label="Position" value={[player.position, ...player.altPositions].join(", ")} />
            <Fact label="Age" value={player.age} />
            <Fact label="Club" value={player.club ?? "Free agent"} />
            <Fact label="League" value={player.league ?? "—"} />
            <Fact label="Nationality" value={player.nation || "—"} />
            <Fact label="Preferred foot" value={player.foot} />
            <Fact label="Weak foot / skills" value={`${player.weakFoot}★ / ${player.skillMoves}★`} />
            <Fact label="Height / weight" value={`${player.height} cm / ${player.weight} kg`} />
          </dl>
        </section>

        <section className="panel p-4">
          <h2 className="mb-2 text-sm font-semibold text-zinc-200">Contract and cost</h2>
          <dl>
            <Fact label="Market value" value={money(player.value)} />
            <Fact label="Weekly wage" value={player.isFreeAgent ? "—" : wage(player.contract.wage)} />
            <Fact
              label="Release clause"
              value={player.contract.releaseClause ? money(player.contract.releaseClause) : "None"}
            />
            <Fact
              label="Contract expires"
              value={contractEnd(player.contract.expiresYear, player.contract.expiresMonth)}
            />
            <Fact
              label="Cost per growth point"
              value={player.growth > 0 ? money(player.costPerGrowthPoint) : "—"}
            />
          </dl>
        </section>
      </div>

      <section className="mt-5">
        <h2 className="text-lg font-semibold text-zinc-100">
          {player.name} growth by season in {short}
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-zinc-400">
          Projected from his age, his remaining potential and {article(player.growthType)}{" "}
          {player.growthType.toLowerCase()} growth curve. It is this site&apos;s estimate of when the rating arrives,
          not a value read out of the game.
        </p>
        <div className="panel mt-3 overflow-x-auto">
          <table className="w-full min-w-[360px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-[11px] uppercase tracking-wider text-zinc-500">
                <th scope="col" className="px-3 py-2 text-left font-semibold">Age</th>
                <th scope="col" className="px-3 py-2 text-right font-semibold">Projected overall</th>
                <th scope="col" className="px-3 py-2 text-right font-semibold">Gain</th>
              </tr>
            </thead>
            <tbody>
              {curve.map((point, index) => (
                <tr key={point.age} className="border-b border-line/60 last:border-0">
                  <th scope="row" className="px-3 py-2 text-left text-xs font-normal text-zinc-300">
                    {point.age}
                    {point.isNow && <span className="ml-2 text-[11px] text-zinc-500">now</span>}
                  </th>
                  <td className="px-3 py-2 text-right font-mono text-xs tabular-nums text-zinc-100">
                    {point.overall}
                  </td>
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
          <h2 className="text-lg font-semibold text-zinc-100">Attributes</h2>
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
        <h2 className="text-lg font-semibold text-zinc-100">Similar {short} players</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {similar.map((other) => (
            <li key={other.id}>
              <Link
                href={playerPath(id, other)}
                className="focus-ring panel flex items-baseline justify-between gap-3 p-3 transition hover:border-accent/40"
              >
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-zinc-100">{other.name}</span>
                  <span className="block truncate text-xs text-zinc-500">
                    {[other.club, `${other.age}y`, other.position].filter(Boolean).join(" · ")}
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
          Open the {short} database and filter by budget, position and contract →
        </Link>
      </p>

      <SourceNote version={version} />
    </>
  );
}
