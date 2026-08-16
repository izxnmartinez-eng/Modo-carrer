#!/usr/bin/env node
/**
 * Imports a real player CSV into Career Hub's dataset format.
 *
 *   node scripts/import-players.mjs --csv players.csv --version fc26 --limit 400
 *
 * The CSV is expected to use the column names shared by the SoFIFA-derived
 * datasets published on Kaggle (`short_name`, `overall`, `potential`,
 * `value_eur`, `club_contract_valid_until_year`, …). Common aliases are
 * accepted; anything missing is reported by name instead of silently importing
 * a broken row.
 *
 * Two fields have no equivalent in those datasets and are derived or blanked,
 * which the tool states plainly at the end of every run:
 *   growthType  — inferred from age and remaining growth (a heuristic, not data)
 *   scoutNote   — left empty; the UI hides the section when there is none
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ------------------------------------------------------------------ */
/* CLI                                                                 */
/* ------------------------------------------------------------------ */

function parseArgs(argv) {
  const args = { limit: 400, minPotential: 0, maxAge: 99, dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    const value = argv[i + 1];
    switch (flag) {
      case "--csv": args.csv = value; i += 1; break;
      case "--version": args.version = value; i += 1; break;
      case "--limit": args.limit = Number(value); i += 1; break;
      case "--min-potential": args.minPotential = Number(value); i += 1; break;
      case "--max-age": args.maxAge = Number(value); i += 1; break;
      case "--dry-run": args.dryRun = true; break;
      default: break;
    }
  }
  return args;
}

/* ------------------------------------------------------------------ */
/* CSV parsing (quote-aware, no dependency)                            */
/* ------------------------------------------------------------------ */

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') { field += '"'; i += 1; } else { quoted = false; }
      } else field += char;
      continue;
    }
    if (char === '"') { quoted = true; continue; }
    if (char === ",") { row.push(field); field = ""; continue; }
    if (char === "\n") { row.push(field); rows.push(row); row = []; field = ""; continue; }
    if (char === "\r") continue;
    field += char;
  }
  if (field !== "" || row.length > 0) { row.push(field); rows.push(row); }

  const header = rows.shift() ?? [];
  return rows
    .filter((r) => r.length === header.length)
    .map((r) => Object.fromEntries(header.map((h, i) => [h.trim(), r[i]])));
}

/* ------------------------------------------------------------------ */
/* Column mapping                                                      */
/* ------------------------------------------------------------------ */

/** First matching column wins; every alias seen in the public datasets. */
const COLUMNS = {
  id: ["sofifa_id", "player_id", "id"],
  name: ["short_name", "name", "player_name", "long_name"],
  age: ["age"],
  birthDate: ["dob", "birth_date", "birthday"],
  nation: ["nationality_name", "nationality", "nation", "country"],
  club: ["club_name", "club", "team_name", "club_team"],
  league: ["league_name", "club_league_name", "league"],
  positions: ["player_positions", "positions", "position", "best_position"],
  overall: ["overall", "overall_rating", "ovr", "rating"],
  potential: ["potential", "pot", "potential_rating"],
  value: ["value_eur", "value", "market_value"],
  wage: ["wage_eur", "wage"],
  releaseClause: ["release_clause_eur", "release_clause"],
  contractYear: ["club_contract_valid_until_year", "club_contract_valid_until", "contract_valid_until"],
  foot: ["preferred_foot", "foot"],
  weakFoot: ["weak_foot", "weak_foot_rating"],
  skillMoves: ["skill_moves", "skill_moves_rating"],
  height: ["height_cm", "height"],
  weight: ["weight_kg", "weight"],
  pace: ["pace", "movement_sprint_speed"],
  shooting: ["shooting", "attacking_finishing"],
  passing: ["passing", "attacking_short_passing"],
  dribbling: ["dribbling", "skill_dribbling"],
  defending: ["defending", "defending_marking_awareness"],
  physical: ["physic", "physical", "power_strength"],
  gkDiving: ["goalkeeping_diving", "gk_diving"],
  gkHandling: ["goalkeeping_handling", "gk_handling"],
  gkKicking: ["goalkeeping_kicking", "gk_kicking"],
  gkReflexes: ["goalkeeping_reflexes", "gk_reflexes"],
  gkSpeed: ["goalkeeping_speed", "gk_speed"],
  gkPositioning: ["goalkeeping_positioning", "gk_positioning"],
};

const REQUIRED = ["name", "age", "overall", "potential"];

function resolveColumns(sample) {
  const available = new Set(Object.keys(sample));
  const resolved = {};
  const missing = [];
  for (const [key, aliases] of Object.entries(COLUMNS)) {
    const hit = aliases.find((alias) => available.has(alias));
    if (hit) resolved[key] = hit;
    else if (REQUIRED.includes(key)) missing.push(`${key} (tried: ${aliases.join(", ")})`);
  }
  return { resolved, missing };
}

/* ------------------------------------------------------------------ */
/* Row → Player                                                        */
/* ------------------------------------------------------------------ */

const VALID_POSITIONS = new Set([
  "GK", "CB", "LB", "RB", "LWB", "RWB", "CDM", "CM", "CAM", "LM", "RM", "LW", "RW", "CF", "ST",
]);

const num = (value, fallback = 0) => {
  const n = Number(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : fallback;
};

/**
 * Career Mode growth types are not in any public dataset, so they are inferred:
 * a lot of growth left at a young age looks explosive, very little at an older
 * age looks constant. Documented as a heuristic wherever it is surfaced.
 */
function inferGrowthType(age, growth) {
  if (growth <= 1) return "Constant";
  if (age <= 18) return growth >= 12 ? "Explosive" : "Early";
  if (age <= 21) return growth >= 10 ? "Early" : "Normal";
  if (age <= 24) return growth >= 8 ? "Normal" : "Slow";
  return growth >= 5 ? "Late" : "Slow";
}

function toPlayer(row, cols, versionId) {
  const get = (key, fallback = "") => (cols[key] ? row[cols[key]] ?? fallback : fallback);

  const positions = String(get("positions"))
    .split(/[,|/]/)
    .map((p) => p.trim().toUpperCase())
    .filter((p) => VALID_POSITIONS.has(p));
  const position = positions[0] ?? "CM";

  const overall = num(get("overall"));
  const potential = Math.max(overall, num(get("potential"), overall));
  const age = num(get("age"));
  const club = String(get("club")).trim();
  const isGk = position === "GK";

  const rawId = String(get("id") || get("name")).trim();
  const slug = rawId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const contractYear = num(get("contractYear"));
  const releaseClause = num(get("releaseClause"), 0);

  return {
    id: `${versionId}-${slug}`,
    name: String(get("name")).trim(),
    age,
    birthDate: String(get("birthDate")).trim() || null,
    nation: String(get("nation")).trim(),
    club: club || null,
    league: String(get("league")).trim() || null,
    position,
    altPositions: positions.slice(1, 4),
    overall,
    potential,
    growthType: inferGrowthType(age, potential - overall),
    foot: String(get("foot")).trim().toLowerCase().startsWith("l") ? "Left" : "Right",
    weakFoot: num(get("weakFoot"), 3),
    skillMoves: num(get("skillMoves"), 3),
    height: num(get("height"), 180),
    weight: num(get("weight"), 75),
    value: num(get("value")),
    contract: {
      // No club means a free agent; the app keys "expired" off the same shape.
      expiresYear: club ? contractYear || 0 : 0,
      expiresMonth: 6,
      wage: num(get("wage")),
      releaseClause: releaseClause > 0 ? releaseClause : null,
    },
    attributes: {
      pace: num(get("pace")),
      shooting: num(get("shooting")),
      passing: num(get("passing")),
      dribbling: num(get("dribbling")),
      defending: num(get("defending")),
      physical: num(get("physical")),
    },
    ...(isGk
      ? {
          goalkeeping: {
            diving: num(get("gkDiving")),
            handling: num(get("gkHandling")),
            kicking: num(get("gkKicking")),
            reflexes: num(get("gkReflexes")),
            speed: num(get("gkSpeed")),
            positioning: num(get("gkPositioning")),
          },
        }
      : {}),
    playStyles: [],
    playStylesPlus: [],
    scoutNote: "",
  };
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

const args = parseArgs(process.argv.slice(2));

if (!args.csv || !args.version) {
  console.error(
    "Usage: node scripts/import-players.mjs --csv <file.csv> --version <fc25|fc26|fc27>\n" +
      "       [--limit 400] [--min-potential 80] [--max-age 24] [--dry-run]",
  );
  process.exit(1);
}
if (!existsSync(args.csv)) {
  console.error(`CSV not found: ${args.csv}`);
  process.exit(1);
}

const rows = parseCsv(readFileSync(args.csv, "utf8"));
if (rows.length === 0) {
  console.error("The CSV has no data rows.");
  process.exit(1);
}

const { resolved, missing } = resolveColumns(rows[0]);
if (missing.length > 0) {
  console.error("Missing required columns:\n  " + missing.join("\n  "));
  console.error("\nColumns present:\n  " + Object.keys(rows[0]).join(", "));
  process.exit(1);
}

const players = rows
  .map((row) => toPlayer(row, resolved, args.version))
  .filter((p) => p.name && p.overall > 0)
  .filter((p) => p.potential >= args.minPotential && p.age <= args.maxAge)
  // Career Mode cares about upside, so keep the biggest growth first and let
  // rating break ties.
  .sort((a, b) => b.potential - a.potential || b.potential - b.overall - (a.potential - a.overall))
  .slice(0, args.limit);

const derivedGrowth = players.length;
const out = join(ROOT, "data", args.version, "players.json");

console.log(`Parsed ${rows.length} rows → keeping ${players.length}`);
console.log(`Columns matched: ${Object.keys(resolved).length}/${Object.keys(COLUMNS).length}`);
console.log(`Derived (not real data): growthType for ${derivedGrowth} players`);
console.log(`Blank (not in source): scoutNote, playStyles`);

if (args.dryRun) {
  console.log("\nDry run — nothing written. Sample:");
  console.log(JSON.stringify(players.slice(0, 2), null, 2));
} else {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `${JSON.stringify(players, null, 2)}\n`);
  console.log(`\nWrote ${out}`);
}
