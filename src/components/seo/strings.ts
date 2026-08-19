import type { SeoLocale } from "@/lib/seo";

/**
 * Copy for the indexed pages.
 *
 * Separate from the app's dictionaries on purpose: those are interface labels
 * for someone already inside the tool, these are sentences written to be read
 * cold, by a person who arrived from a search result and has never seen the
 * site. Spanish here is written, not translated.
 */
export interface SeoStrings {
  home: string;
  lists: string;
  players: string;
  hubTitle: string;
  hubIntro: string;
  hubMetaTitle: string;
  hubMetaDescription: string;
  highestPotential: string;
  seeFullList: string;
  playersIntro: string;
  otherLists: string;
  countLine: string;
  esIndexTitle: string;
  esIndexIntro: string;
  table: {
    rank: string;
    player: string;
    position: string;
    age: string;
    overall: string;
    potential: string;
    growth: string;
    value: string;
    wage: string;
  };
  profile: string;
  profileRows: {
    position: string;
    age: string;
    club: string;
    league: string;
    nationality: string;
    foot: string;
    weakSkills: string;
    heightWeight: string;
  };
  contract: string;
  contractRows: {
    value: string;
    wage: string;
    clause: string;
    expires: string;
    costPerGrowth: string;
  };
  growthHeading: string;
  growthIntro: string;
  growthTable: { age: string; projected: string; gain: string; now: string };
  attributes: string;
  similar: string;
  openApp: string;
  freeAgent: string;
  none: string;
  sourceNote: string;
}

export const SEO_STRINGS: Record<SeoLocale, SeoStrings> = {
  en: {
    home: "Career Hub",
    lists: "Lists",
    players: "Players",
    hubTitle: "{label} Career Mode database",
    hubIntro:
      "Potential, growth, market value, wage, release clause and contract length for {count} players in the {season} season. Everything a Career Mode save actually needs — no Ultimate Team prices, no packs.",
    hubMetaTitle: "{short} Career Mode database — wonderkids, values and contracts",
    hubMetaDescription:
      "{count} {short} players with potential, growth, market value, wage, release clause and contract length. Built for Career Mode, not Ultimate Team.",
    highestPotential: "Highest potential in {short}",
    seeFullList: "See the full {short} wonderkid list →",
    playersIntro:
      "Every player has a page with his growth curve season by season, his contract and what each rating point costs. A few to start with: ",
    otherLists: "Other {short} lists",
    countLine: "{count} players · {label} · {season} season",
    esIndexTitle: "EA Sports FC Career Mode database",
    esIndexIntro: "Choose a game version.",
    table: {
      rank: "#",
      player: "Player",
      position: "Pos",
      age: "Age",
      overall: "OVR",
      potential: "POT",
      growth: "Growth",
      value: "Value",
      wage: "Wage",
    },
    profile: "Profile",
    profileRows: {
      position: "Position",
      age: "Age",
      club: "Club",
      league: "League",
      nationality: "Nationality",
      foot: "Preferred foot",
      weakSkills: "Weak foot / skills",
      heightWeight: "Height / weight",
    },
    contract: "Contract and cost",
    contractRows: {
      value: "Market value",
      wage: "Weekly wage",
      clause: "Release clause",
      expires: "Contract expires",
      costPerGrowth: "Cost per growth point",
    },
    growthHeading: "{name} growth by season in {short}",
    growthIntro:
      "Projected from his age, his remaining potential and {article} {type} growth curve. It is this site's estimate of when the rating arrives, not a value read out of the game.",
    growthTable: { age: "Age", projected: "Projected overall", gain: "Gain", now: "now" },
    attributes: "Attributes",
    similar: "Similar {short} players",
    openApp: "Open the {short} database and filter by budget, position and contract →",
    freeAgent: "Free agent",
    none: "None",
    sourceNote:
      "{short} player data comes from a public community dataset{source}. Growth curves are this site's own projection from age and remaining potential, not values read out of the game. Career Hub is a fan project and is not affiliated with EA Sports.",
  },
  es: {
    home: "Career Hub",
    lists: "Listas",
    players: "Jugadores",
    hubTitle: "Base de datos de {label} para el Modo Carrera",
    hubIntro:
      "Potencial, crecimiento, valor de mercado, salario, cláusula de rescisión y años de contrato de {count} jugadores de la temporada {season}. Lo que de verdad hace falta en un Modo Carrera: sin precios de Ultimate Team y sin sobres.",
    hubMetaTitle: "Base de datos de {short} para el Modo Carrera: perlas, valores y contratos",
    hubMetaDescription:
      "{count} jugadores de {short} con potencial, crecimiento, valor de mercado, salario, cláusula de rescisión y años de contrato. Hecha para el Modo Carrera, no para Ultimate Team.",
    highestPotential: "Los de más potencial de {short}",
    seeFullList: "Ver la lista completa de perlas de {short} →",
    playersIntro:
      "Cada jugador tiene su ficha con el crecimiento temporada a temporada, el contrato y lo que cuesta cada punto de media. Para empezar: ",
    otherLists: "Otras listas de {short}",
    countLine: "{count} jugadores · {label} · temporada {season}",
    esIndexTitle: "Base de datos de EA Sports FC para el Modo Carrera",
    esIndexIntro: "Elige una versión del juego.",
    table: {
      rank: "#",
      player: "Jugador",
      position: "Pos",
      age: "Edad",
      overall: "MED",
      potential: "POT",
      growth: "Crec.",
      value: "Valor",
      wage: "Salario",
    },
    profile: "Perfil",
    profileRows: {
      position: "Posición",
      age: "Edad",
      club: "Club",
      league: "Liga",
      nationality: "Nacionalidad",
      foot: "Pierna buena",
      weakSkills: "Pierna mala / filigranas",
      heightWeight: "Altura / peso",
    },
    contract: "Contrato y coste",
    contractRows: {
      value: "Valor de mercado",
      wage: "Salario semanal",
      clause: "Cláusula de rescisión",
      expires: "Fin de contrato",
      costPerGrowth: "Coste por punto de crecimiento",
    },
    growthHeading: "Crecimiento de {name} por temporada en {short}",
    growthIntro:
      "Proyectado a partir de su edad, del potencial que le queda y de una curva de crecimiento {type}. Es la estimación de esta web sobre cuándo llega la media, no un dato sacado del juego.",
    growthTable: { age: "Edad", projected: "Media prevista", gain: "Subida", now: "ahora" },
    attributes: "Atributos",
    similar: "Jugadores parecidos de {short}",
    openApp: "Abrir la base de datos de {short} y filtrar por presupuesto, posición y contrato →",
    freeAgent: "Agente libre",
    none: "Ninguna",
    sourceNote:
      "Los datos de jugadores de {short} vienen de un conjunto de datos público de la comunidad{source}. Las curvas de crecimiento son una estimación propia de esta web a partir de la edad y del potencial restante, no valores sacados del juego. Career Hub es un proyecto de aficionado y no está afiliado a EA Sports.",
  },
};

/** Replaces `{name}` placeholders. */
export function t(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in vars ? String(vars[key]) : match));
}
