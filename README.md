# Career Hub

A Career Mode companion for EA SPORTS FC. Wonderkids, release clauses, real manager tactical
codes, squad planning and youth academy maths — with none of the Ultimate Team pricing, packs or
market noise that makes general FC databases hard to use for a single-player save.

Built for the five things a Career Mode player actually needs at the transfer screen:

1. **Wonderkids & Gem Finder** — the full player database with Career-Mode-specific filters.
2. **Tactical Hub & Manager Codes** — real managerial systems with copyable in-game share codes.
3. **Squad Planner** — a shortlist measured against a real weekly wage budget.
4. **Player Comparison** — radar overlay, growth curves on one axis, wage-versus-performance maths.
5. **Scouts & Academy** — an intake-return calculator and a regen/pregen tracker.

Every section is driven by a **persistent game-version switcher** (FC 27 / FC 26 / FC 25) that
swaps the entire dataset — players, tactics, scouts, regens and the accent colour — in one action,
and by a **language switcher** covering English, Spanish, German, French, Italian and Brazilian
Portuguese.

---

## Getting started

```bash
npm install
npm run dev            # http://localhost:3000
```

Other scripts:

```bash
npm run build          # production build
npm run start          # serve the production build
npm run typecheck      # tsc --noEmit
```

Requires Node 20+. No environment variables, no database, no external services — all data ships as
JSON in the repo.

---

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19, TypeScript strict |
| Styling | Tailwind CSS v4 (CSS-first `@theme`), dark by default |
| State | Zustand (+ `persist`) for version, squad, comparison, toasts, search |
| Primitives | Radix UI (Dialog, Dropdown Menu, Slider, Tabs) |
| Motion | Framer Motion for tab, filter and list transitions |
| i18n | Hand-rolled, typed dictionaries — no runtime translation library |
| Icons | lucide-react |
| Charts | Hand-rolled SVG (radar + growth curve) — no chart dependency |

`noUncheckedIndexedAccess` is on, so array access is narrowed everywhere rather than assumed.

---

## Project layout

```
data/                        Datasets, one folder per game version
  fc27/  fc26/  fc25/
    meta.json                GameVersion   — season, career start date, potential cap, accent
    players.json             Player[]      — 19-24 detailed players per version
    tactics.json             Tactic[]      — 5 complete manager systems per version
    scouting.json            regions, scouts, regens
    i18n/<locale>.json       optional translation of that dataset's prose

src/
  app/                       App Router routes
    layout.tsx               Shell, theme sync, toaster
    page.tsx                 /          Wonderkids & Gem Finder
    tactics/page.tsx         /tactics   Tactical Hub
    squad/page.tsx           /squad     Squad Planner
    compare/page.tsx         /compare   Player Comparison
    scouts/page.tsx          /scouts    Scouts & Academy
    globals.css              Tailwind theme tokens, per-version accents

  i18n/
    index.ts                 Locale registry, detection, `fmt()` placeholder filling
    use-i18n.ts              Hook: active locale → dictionary + localised formatters
    dictionaries/en.ts       Source of truth; `Dictionary` is derived from it
    dictionaries/{es,de,fr,it,pt}.ts   `satisfies Dictionary` — a missing key fails the build

  lib/
    types.ts                 Every domain type: GameVersion, Player, Tactic, Scout, RegenProfile…
    localize-dataset.ts      Merges a locale's text overlay over an English dataset
    data.ts                  Dataset registry — the one file a new version touches
    derive.ts                DerivedPlayer: growth, months remaining, bargain score, gem flags
    growth.ts                Growth-curve projection engine (per growth type)
    filters.ts               Filter + fuzzy-search + sort pipeline
    fuzzy.ts                 Dependency-free fuzzy matcher
    academy.ts               Youth academy return model
    format.ts                Money, contract, rating-tone formatting + `cn`
    use-dataset.ts           Hook: active version → fully derived dataset

  store/
    version.ts               Active game version (persisted)
    locale.ts                Interface language (persisted, auto-detected on first visit)
    squad.ts                 Squad plan, wage budget, comparison slate (persisted, keyed by version)
    toast.ts                 Toast queue + `copyWithToast`
    search.ts                Global fuzzy-search query

  components/
    layout/                  App shell, sidebar, mobile drawer, version + language switchers, search
    players/                 Filters, table, grid cards, scout-report drawer, badges
    tactics/                 Pitch diagram, tactic cards, tactical detail
    squad/                   Squad planner, comparison tool
    scouts/                  Academy calculator, regen tracker
    charts/                  Radar chart, growth chart (SVG)
    ui/                      Page header, stat tiles, range slider, toggles, toaster
```

---

## Game version switching

`useVersionStore` holds a single `GameVersionId`. `useDataset()` reads it and returns that
version's dataset with every derived field already computed:

```ts
const { version, players, tactics, scouting } = useDataset();
```

Because all five sections consume that one hook, changing the version in the navbar re-renders the
whole app against the new dataset in the same tick. The choice is persisted to `localStorage`, and
`<html data-version>` is updated so the CSS accent tokens change with it (FC 27 lime, FC 26 gold,
FC 25 cyan).

### Adding a new title (e.g. FC 28)

1. Create `data/fc28/` with `meta.json`, `players.json`, `tactics.json`, `scouting.json`.
2. Add `"fc28"` to the `GameVersionId` union in `src/lib/types.ts`.
3. Import the four files in `src/lib/data.ts` and add one entry to `DATASETS` + `VERSION_ORDER`.

Nothing else changes. TypeScript will fail the build if any of the four files drift from the
schema, and the switcher, filters, calculators and squad plans pick the new version up for free.

---

## Languages

The interface ships in six languages: **English, Español, Deutsch, Français, Italiano and
Português (BR)**. On a first visit the app follows the browser's preferred language; once a
language is picked from the switcher, that choice is persisted and wins from then on.

### How it is wired

`src/i18n/dictionaries/en.ts` is the source of truth and `Dictionary` is derived from it with
`typeof`. Every other locale is declared `satisfies Dictionary`, so a missing or misspelled key is
a **build error**, not a string that silently falls back to English at runtime. Components read
keys as plain properties (`d.players.title`) rather than dot-path strings, which keeps typos
compile-time visible; `fmt()` fills `{placeholders}`.

Numbers, currency and dates go through `Intl` via `createFormatters()`, so a German user sees
`9,5 Mio. €` and an English one `€9.5M`. Compact currency is scaled by hand rather than with
`Intl`'s `notation: "compact"` — Node and browser ICU builds disagree on it (`€9.5m` vs `€9.5M`),
which would break SSR hydration.

Language detection runs in an effect after mount, never during store rehydration: the prerendered
HTML is always the default locale, so switching any earlier would make the first client render
disagree with the server.

### Adding a language

1. Copy `src/i18n/dictionaries/en.ts` to `<code>.ts` and translate the values.
2. Add the code to the `Locale` union and an entry to `LOCALES` + `DICTIONARIES` in
   `src/i18n/index.ts`.

`tsc` will list every key you still owe.

### Dataset prose

The datasets themselves are written in English. Their long-form prose — scout reports, tactical
summaries, instructions, region and regen notes, and the in-game role glossary — is translated
through optional overlays at `data/<version>/i18n/<locale>.json`, merged over the English text by
`localizeDataset()`. Overlays are partial by design: anything a locale does not cover falls back to
English, and an overlay can only ever replace prose, never a rating or a coordinate.

**Spanish overlays ship for all three versions.** German, French, Italian and Portuguese currently
translate the interface only; their dataset prose stays in English until an overlay file is added
alongside the Spanish one and registered in `OVERLAYS` (`src/lib/data.ts`).

---

## How the numbers work

These are the parts a Career Mode player will want to audit before trusting the output.

**Growth curves** (`src/lib/growth.ts`) — each growth type has a start age, a peak age and an
exponent that front- or back-loads the curve. `Explosive` peaks at 22 with exponent 0.45 (big
teenage jumps); `Late` peaks at 27 with exponent 2.1 (almost nothing before 23). The projection is
anchored on the player's *current* rating, so whatever share of the curve is still ahead of him
gets distributed across the seasons that remain.

**Bargain score** (`src/lib/derive.ts`) — a 0-100 composite, weighted 35% potential (scaled to the
title's potential cap), 25% raw growth, 30% price efficiency (growth points bought per €10m) and
10% wage burden. Deliberately potential-heavy: a cheap player who never improves is squad filler,
not a bargain.

**Expiring contracts** — measured from each version's `preContractDate` (the January window), not
the real-world clock, so "six months left" means what it means in game: signable on a free
pre-contract.

**Hidden gems** — the literal `POT > 82 && OVR < 68` profile, i.e. the players the AI has not
priced up yet.

**Academy returns** (`src/lib/academy.ts`) — experience drives how many players come back and how
fast; judgment drives report accuracy and the potential ceiling; the region applies a potential
bias; facilities shift the starting overall. The engine never publishes its real numbers, so every
coefficient is a named constant at the top of the file and can be re-tuned in one place.

---

## Interaction details

- **Six-language interface** with a switcher beside the version selector, browser-language
  detection on first visit, and `<html lang>` kept in sync.
- **Instant fuzzy search** in the header spans player names, clubs, leagues, nations and positions,
  with exact > prefix > word-prefix > substring > subsequence scoring (`mstn` finds Mastantuono).
  It also filters the Tactical Hub (manager, club, formation) and the regen tracker.
- **Copy Tactical Share Code** writes to the clipboard and raises a toast showing the copied code,
  with a `document.execCommand` fallback for browsers that block the async clipboard API.
- **Player share links** (`/?player=<id>`) open straight to that scout report.
- **Squad plans and comparison slates are keyed by version**, so an FC 27 plan never mixes with an
  FC 26 one.
- **Mobile-first**: drawer navigation and a bottom-sheet filter panel below `lg`, sidebar above it.
  Wide tables scroll inside their own container rather than the page.

---

## About the data

The datasets are **illustrative samples written for this project**, not scraped from the game or
from any commercial database. Ratings, values, wages, release clauses and tactical share codes are
plausible-but-invented figures whose purpose is to demonstrate the tooling end to end. FC 27 in
particular is a forward-looking placeholder title. Swap in your own JSON — the schema in
`src/lib/types.ts` is the contract.

Player names, clubs and manager systems are referenced descriptively for a fan tool. This project
is not affiliated with, endorsed by, or connected to EA Sports.
