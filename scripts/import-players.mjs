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
 *
 * Two shapes of source file are handled. Some publish the six card stats
 * (`pace`, `shooting`, …) directly; the SoFIFA scrapes publish only the ~30
 * detailed attributes behind them, in which case the six are recomputed from
 * the documented community weights. Money may arrive as plain euros
 * (`115500000`) or as display text (`€115.5M`), and age may be missing
 * entirely, leaving only a date of birth. All three are handled here rather
 * than by asking for a differently shaped CSV.
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
  nation: ["nationality_name", "nationality", "nation", "country_name", "country"],
  description: ["description", "bio", "player_bio"],
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

/**
 * Nationality → country, for sources whose `country_*` block is the national
 * *team* (filled in for the few hundred players in a squad) rather than where
 * the player is from. Those files still state it in the bio prose — "is an
 * Italian footballer who plays as a striker for…" — which is the only place
 * left to read it from.
 *
 * "British" maps to England because the scrape lists Scottish, Welsh and
 * Northern Irish players under their own demonyms. "Ukranian" is misspelt at
 * the source and is matched as written.
 */
const NATIONALITIES = {
  British: "England", German: "Germany", Spanish: "Spain", Argentine: "Argentina", French: "France",
  Brazilian: "Brazil", Italian: "Italy", Dutch: "Netherlands", Norwegian: "Norway", Swedish: "Sweden",
  Portuguese: "Portugal", Polish: "Poland", Danish: "Denmark", Irish: "Republic of Ireland", Belgian: "Belgium",
  Korean: "Korea Republic", Turkish: "Türkiye", Romanian: "Romania", Austrian: "Austria", Chinese: "China PR",
  "Saudi Arabian": "Saudi Arabia", Scottish: "Scotland", Uruguayan: "Uruguay", Swiss: "Switzerland",
  Colombian: "Colombia", Paraguayan: "Paraguay", Indian: "India", Croatian: "Croatia", Chilean: "Chile",
  Nigerian: "Nigeria", Moroccan: "Morocco", Welsh: "Wales", Senegalese: "Senegal", Ghanaian: "Ghana",
  Ivorian: "Côte d'Ivoire", Ecuadorian: "Ecuador", Serbian: "Serbia", Venezuelan: "Venezuela", Peruvian: "Peru",
  Greek: "Greece", Czech: "Czechia", Japanese: "Japan", Ukranian: "Ukraine", Bolivian: "Bolivia",
  "Northern Irish": "Northern Ireland", Cameroonian: "Cameroon", Malian: "Mali", Algerian: "Algeria",
  Finnish: "Finland", Icelandic: "Iceland", Albanian: "Albania", Kosovan: "Kosovo", Slovak: "Slovakia",
  Slovenian: "Slovenia", Hungarian: "Hungary", Mexican: "Mexico", Guinean: "Guinea", Gambian: "Gambia",
  Jamaican: "Jamaica", Tunisian: "Tunisia", Qatari: "Qatar", Angolan: "Angola", "Cape Verdean": "Cape Verde",
  "Bissau-Guinean": "Guinea-Bissau", Bulgarian: "Bulgaria", Montenegrin: "Montenegro",
  Macedonian: "North Macedonia", Israeli: "Israel", Surinamese: "Suriname", Russian: "Russia", Cypriot: "Cyprus",
  Luxembourgian: "Luxembourg", Emirati: "United Arab Emirates", Comorian: "Comoros", "Costa Rican": "Costa Rica",
  Togolese: "Togo", Azerbaijani: "Azerbaijan", Iraqi: "Iraq", Indonesian: "Indonesia", Zimbabwean: "Zimbabwe",
  "Sierra Leonean": "Sierra Leone", Gabonese: "Gabon", Panamanian: "Panama", Beninese: "Benin", Kenyan: "Kenya",
  Syrian: "Syria", Egyptian: "Egypt", Haitian: "Haiti", Moldovan: "Moldova",
  "Dominican Republic": "Dominican Republic", Zambian: "Zambia", Armenian: "Armenia", Iranian: "Iran",
  Equatoguinean: "Equatorial Guinea", Honduran: "Honduras", Mauritanian: "Mauritania", Latvian: "Latvia",
  Grenadian: "Grenada", Lithuanian: "Lithuania", Maltese: "Malta", Guyanese: "Guyana", Estonian: "Estonia",
  Ugandan: "Uganda", Liberian: "Liberia", Uzbekistani: "Uzbekistan", Burundian: "Burundi",
  Malagasy: "Madagascar", Filipino: "Philippines", Tanzanian: "Tanzania", "Saint Lucian": "Saint Lucia",
  Montserratian: "Montserrat", Jordanian: "Jordan", Guatemalan: "Guatemala", Palestinian: "Palestine",
  Belarusian: "Belarus", Kazakhstani: "Kazakhstan", Mozambican: "Mozambique", Libyan: "Libya", Cuban: "Cuba",
  Salvadoran: "El Salvador", Lebanese: "Lebanon", Chadian: "Chad", "Sri Lankan": "Sri Lanka", Fijian: "Fiji",
  Malawian: "Malawi", Barbadian: "Barbados", Faroese: "Faroe Islands", Bangladeshi: "Bangladesh",
  Bermudian: "Bermuda", Nambian: "Namibia", Vanuatuan: "Vanuatu", Nigerien: "Niger", Andorran: "Andorra",
  Pakistani: "Pakistan", Rwandan: "Rwanda", Somalian: "Somalia", Tajikistani: "Tajikistan",
  "New Caledonian": "New Caledonia", "Puerto Rican": "Puerto Rico", Sudanese: "Sudan",
  American: "United States", Australian: "Australia", Canadian: "Canada", "South African": "South Africa",
  "Burkinab\u00e9": "Burkina Faso", "Curaçao": "Curaçao", Georgian: "Georgia",
  Bosnian: "Bosnia and Herzegovina", "New Zealand": "New Zealand", Trinidadian: "Trinidad and Tobago",
};

/** Reads the nationality out of a bio sentence; "" when there is nothing to read. */
function nationFromDescription(text) {
  const match = String(text ?? "").match(
    /\bis an? ([A-Z][A-Za-zÀ-ÿ-]+(?: [A-Z][A-Za-zÀ-ÿ-]+)?) (?:footballer|soccer player|football player)\b/,
  );
  if (!match) return "";
  return NATIONALITIES[match[1]] ?? match[1];
}

/**
 * The detailed attributes the six card stats are rebuilt from, for sources
 * that only publish those. Names differ between scrapes, so each is aliased.
 */
const DETAIL_COLUMNS = {
  acceleration: ["acceleration", "movement_acceleration"],
  sprint_speed: ["sprint_speed", "movement_sprint_speed"],
  finishing: ["finishing", "attacking_finishing"],
  long_shots: ["long_shots", "power_long_shots"],
  shot_power: ["shot_power", "power_shot_power"],
  positioning: ["positioning", "mentality_positioning"],
  volleys: ["volleys", "attacking_volleys"],
  penalties: ["penalties", "mentality_penalties"],
  short_passing: ["short_passing", "attacking_short_passing"],
  vision: ["vision", "mentality_vision"],
  crossing: ["crossing", "attacking_crossing"],
  long_passing: ["long_passing", "skill_long_passing"],
  fk_accuracy: ["fk_accuracy", "skill_fk_accuracy"],
  curve: ["curve", "skill_curve"],
  dribbling: ["dribbling", "skill_dribbling"],
  ball_control: ["ball_control", "skill_ball_control"],
  agility: ["agility", "movement_agility"],
  balance: ["balance", "movement_balance"],
  reactions: ["reactions", "movement_reactions"],
  defensive_awareness: ["defensive_awareness", "defending_marking_awareness", "marking"],
  standing_tackle: ["standing_tackle", "defending_standing_tackle"],
  sliding_tackle: ["sliding_tackle", "defending_sliding_tackle"],
  interceptions: ["interceptions", "mentality_interceptions"],
  heading_accuracy: ["heading_accuracy", "attacking_heading_accuracy"],
  strength: ["strength", "power_strength"],
  stamina: ["stamina", "power_stamina"],
  aggression: ["aggression", "mentality_aggression", "mentality_aggressions"],
  jumping: ["jumping", "power_jumping"],
};

/**
 * Community-standard weights for the six card stats. They are the ones SoFIFA
 * and every FIFA calculator have used for years; each set sums to 1.
 */
const FACE_STAT_WEIGHTS = {
  pace: { sprint_speed: 0.55, acceleration: 0.45 },
  shooting: { finishing: 0.45, long_shots: 0.2, shot_power: 0.2, positioning: 0.05, volleys: 0.05, penalties: 0.05 },
  passing: { short_passing: 0.35, vision: 0.2, crossing: 0.15, long_passing: 0.15, fk_accuracy: 0.1, curve: 0.05 },
  dribbling: { dribbling: 0.5, ball_control: 0.2, agility: 0.2, balance: 0.05, reactions: 0.05 },
  defending: {
    defensive_awareness: 0.3,
    standing_tackle: 0.3,
    interceptions: 0.2,
    heading_accuracy: 0.1,
    sliding_tackle: 0.1,
  },
  physical: { strength: 0.5, stamina: 0.25, aggression: 0.2, jumping: 0.05 },
};

const REQUIRED = ["name", "overall", "potential"];

function resolveColumns(rows) {
  const sample = rows[0];
  // A column can exist in the header and be blank in every row — the SoFIFA
  // scrapes ship the whole attribute block that way. Presence is not data, so
  // "available" means present *and* filled in at least one of the first rows.
  const probe = rows.slice(0, 200);
  const available = new Set(
    Object.keys(sample).filter((key) => probe.some((row) => String(row[key] ?? "").trim() !== "")),
  );
  const resolved = {};
  const missing = [];
  for (const [key, aliases] of Object.entries(COLUMNS)) {
    const hit = aliases.find((alias) => available.has(alias));
    if (hit) resolved[key] = hit;
    else if (REQUIRED.includes(key)) missing.push(`${key} (tried: ${aliases.join(", ")})`);
  }
  const details = {};
  for (const [key, aliases] of Object.entries(DETAIL_COLUMNS)) {
    const hit = aliases.find((alias) => available.has(alias));
    if (hit) details[key] = hit;
  }

  // A file that publishes `pace` publishes all six; one that does not has to
  // have them rebuilt, and only can if every input of every weight is present.
  const needed = new Set(Object.values(FACE_STAT_WEIGHTS).flatMap((w) => Object.keys(w)));
  const deriveFaceStats = !available.has("pace") && [...needed].every((key) => key in details);
  const faceStats = available.has("pace") ? "columns" : deriveFaceStats ? "derived" : "missing";

  return { resolved, missing, details, deriveFaceStats, faceStats };
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
 * Money in euros, from either plain digits or display text.
 *
 * `num()` cannot be used here: it would read "€115.5M" as 115.5 euros and
 * turn the most expensive player in the game into a free transfer.
 */
function money(value) {
  const raw = String(value ?? "").replace(/[\s,]/g, "");
  const match = raw.match(/(-?\d+(?:\.\d+)?)([KMB])?/i);
  if (!match) return 0;
  const n = Number(match[1]);
  if (!Number.isFinite(n)) return 0;
  const scale = { K: 1e3, M: 1e6, B: 1e9 }[(match[2] ?? "").toUpperCase()] ?? 1;
  return Math.round(n * scale);
}

/** Age on the career's start date, for sources that only publish a birth date. */
function ageOn(birthDate, referenceDate) {
  const born = new Date(birthDate);
  const at = new Date(referenceDate);
  if (Number.isNaN(born.getTime()) || Number.isNaN(at.getTime())) return 0;
  let age = at.getFullYear() - born.getFullYear();
  const monthDelta = at.getMonth() - born.getMonth();
  if (monthDelta < 0 || (monthDelta === 0 && at.getDate() < born.getDate())) age -= 1;
  return age > 0 && age < 60 ? age : 0;
}

/**
 * Contract end, from either a bare year ("2027") or a full date
 * ("Jun 30, 2025" — how the scrapes write loan spells).
 */
function parseContractEnd(value) {
  const text = String(value ?? "").trim();
  if (!text) return { year: 0, month: 6 };
  if (/^\d{4}$/.test(text)) return { year: Number(text), month: 6 };
  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) return { year: parsed.getFullYear(), month: parsed.getMonth() + 1 };
  const digits = text.match(/\d{4}/);
  return { year: digits ? Number(digits[0]) : 0, month: 6 };
}

/** Rebuilds one card stat from the detailed attributes behind it. */
function faceStat(row, details, weights) {
  let total = 0;
  for (const [key, weight] of Object.entries(weights)) total += num(row[details[key]]) * weight;
  return Math.round(total);
}

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

function toPlayer(row, plan, versionId) {
  const { resolved: cols, details, deriveFaceStats, careerStartDate } = plan;
  const get = (key, fallback = "") => (cols[key] ? row[cols[key]] ?? fallback : fallback);

  const positions = String(get("positions"))
    .split(/[,|/]/)
    .map((p) => p.trim().toUpperCase())
    .filter((p) => VALID_POSITIONS.has(p));
  const position = positions[0] ?? "CM";

  const overall = num(get("overall"));
  const potential = Math.max(overall, num(get("potential"), overall));
  const birthDate = String(get("birthDate")).trim();
  // Prefer a published age; fall back to the birth date measured against the
  // career's own start date, so it matches the age shown in that save.
  const age = num(get("age")) || ageOn(birthDate, careerStartDate);
  const club = String(get("club")).trim();
  const isGk = position === "GK";

  const rawId = String(get("id") || get("name")).trim();
  const slug = rawId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const contract = parseContractEnd(get("contractYear"));
  const releaseClause = money(get("releaseClause"));

  // Some scrapes suffix every name with a stray dash ("Rodri -").
  const name = String(get("name")).replace(/\s*[-–]\s*$/, "").trim();

  const attributes = deriveFaceStats
    ? {
        pace: faceStat(row, details, FACE_STAT_WEIGHTS.pace),
        shooting: faceStat(row, details, FACE_STAT_WEIGHTS.shooting),
        passing: faceStat(row, details, FACE_STAT_WEIGHTS.passing),
        dribbling: faceStat(row, details, FACE_STAT_WEIGHTS.dribbling),
        defending: faceStat(row, details, FACE_STAT_WEIGHTS.defending),
        physical: faceStat(row, details, FACE_STAT_WEIGHTS.physical),
      }
    : {
        pace: num(get("pace")),
        shooting: num(get("shooting")),
        passing: num(get("passing")),
        dribbling: num(get("dribbling")),
        defending: num(get("defending")),
        physical: num(get("physical")),
      };

  return {
    id: `${versionId}-${slug}`,
    name,
    age,
    birthDate: birthDate || null,
    nation: String(get("nation")).trim() || nationFromDescription(get("description")),
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
    value: money(get("value")),
    contract: {
      // No club means a free agent; the app keys "expired" off the same shape.
      expiresYear: club ? contract.year : 0,
      expiresMonth: club ? contract.month : 6,
      wage: money(get("wage")),
      releaseClause: releaseClause > 0 ? releaseClause : null,
    },
    attributes,
    ...(isGk
      ? {
          goalkeeping: {
            diving: num(get("gkDiving")),
            handling: num(get("gkHandling")),
            kicking: num(get("gkKicking")),
            reflexes: num(get("gkReflexes")),
            // Keeper speed is the average of the two pace attributes; sources
            // that omit the column would otherwise plot a keeper at zero.
            speed:
              num(get("gkSpeed")) ||
              (details.acceleration && details.sprint_speed
                ? Math.round((num(row[details.acceleration]) + num(row[details.sprint_speed])) / 2)
                : 0),
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

const { resolved, missing, details, deriveFaceStats, faceStats } = resolveColumns(rows);
if (missing.length > 0) {
  console.error("Missing required columns:\n  " + missing.join("\n  "));
  console.error("\nColumns present:\n  " + Object.keys(rows[0]).join(", "));
  process.exit(1);
}
if (!resolved.age && !resolved.birthDate) {
  console.error("The CSV has neither an age column nor a date of birth, so age cannot be established.");
  console.error("\nColumns present:\n  " + Object.keys(rows[0]).join(", "));
  process.exit(1);
}

const metaPath = join(ROOT, "data", args.version, "meta.json");
if (!existsSync(metaPath)) {
  console.error(`Unknown version "${args.version}" — no ${metaPath}`);
  process.exit(1);
}
const { careerStartDate } = JSON.parse(readFileSync(metaPath, "utf8"));
const plan = { resolved, details, deriveFaceStats, careerStartDate };

const players = rows
  .map((row) => toPlayer(row, plan, args.version))
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
console.log(`Age: ${resolved.age ? "from the age column" : `computed from ${resolved.birthDate} at ${careerStartDate}`}`);
const FACE_STAT_REPORT = {
  columns: "taken from the source columns",
  derived: "recomputed from the detailed attributes (weighted)",
  missing: "NOT IN THIS SOURCE — left at 0, and the app hides the radar for these players",
};
console.log(`Card stats: ${FACE_STAT_REPORT[faceStats]}`);
console.log(`Derived (not real data): growthType for ${derivedGrowth} players`);
const nationCoverage = resolved.nation
  ? rows.filter((row) => String(row[resolved.nation] ?? "").trim() !== "").length / rows.length
  : 0;
if (nationCoverage < 0.9) {
  console.log(
    `Nationality: the ${resolved.nation ?? "nation"} column covers ${Math.round(nationCoverage * 100)}% of rows` +
      `${resolved.description ? " — the rest is read from the bio text" : " and there is no bio text to fall back on"}`,
  );
}
console.log(`Blank (not in source): scoutNote, playStyles`);

if (args.dryRun) {
  console.log("\nDry run — nothing written. Sample:");
  console.log(JSON.stringify(players.slice(0, 2), null, 2));
} else {
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `${JSON.stringify(players, null, 2)}\n`);
  console.log(`\nWrote ${out}`);
}
