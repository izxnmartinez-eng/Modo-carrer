import type { SeoLocale } from "./seo";

/**
 * The three pages that are about the site rather than about players.
 *
 * They exist for two reasons. A visitor who arrives from a search result and
 * is deciding whether to trust these numbers needs to be able to find out who
 * made them and where they came from; and every claim the site makes about
 * being free and collecting nothing needs to be written down somewhere it can
 * be checked, not just asserted in a footer.
 */

export interface InfoSection {
  heading: string;
  paragraphs: string[];
}

export interface InfoPage {
  slug: Record<SeoLocale, string>;
  title: Record<SeoLocale, string>;
  description: Record<SeoLocale, string>;
  h1: Record<SeoLocale, string>;
  intro: Record<SeoLocale, string>;
  sections: Record<SeoLocale, InfoSection[]>;
}

export const ABOUT: InfoPage = {
  slug: { en: "about", es: "sobre-la-web" },
  title: {
    en: "About Career Hub — who made it and where the data comes from",
    es: "Sobre Career Hub: quién la hace y de dónde salen los datos",
  },
  description: {
    en: "Career Hub is a free EA Sports FC Career Mode database: wonderkids, growth, contracts and release clauses. No ads, no signup, no Ultimate Team.",
    es: "Career Hub es una base de datos gratuita del Modo Carrera de EA Sports FC: perlas, crecimiento, contratos y cláusulas. Sin anuncios, sin registro y sin Ultimate Team.",
  },
  h1: { en: "About Career Hub", es: "Sobre Career Hub" },
  intro: {
    en: "A database built for one thing: playing Career Mode.",
    es: "Una base de datos hecha para una sola cosa: jugar al Modo Carrera.",
  },
  sections: {
    en: [
      {
        heading: "Why it exists",
        paragraphs: [
          "Every big EA Sports FC site is built around Ultimate Team. Card prices, packs, SBC solutions, market trends — none of which matter in a save. What matters in a save is different: how high can this kid actually go, when does the growth arrive, what is the release clause, and when does the contract run out.",
          "I play Career Mode and I got tired of opening four tabs to answer those questions. So I built the thing I wanted: one page where you filter by budget, age and position, and every player has a profile with his growth season by season and what each rating point costs you.",
        ],
      },
      {
        heading: "Where the data comes from",
        paragraphs: [
          "Ratings, potential, market values, wages, release clauses and contract lengths come from public community datasets derived from SoFIFA. Each game version says on screen which dataset and which date, and the same note appears at the bottom of every page on this site.",
          "Two things are not from any dataset, and the site says so wherever they appear. Growth curves — the season-by-season projection on each player page — are this site's own model, built from the player's age and remaining potential. And the growth type label (explosive, early, late…) is inferred from the same two numbers, not read out of the game.",
          "FC 27 is a special case: EA has not published its ratings yet, so that version runs on placeholder players and carries a warning on every screen. The day the official ratings are published, the real data replaces them.",
        ],
      },
      {
        heading: "What it costs and what it collects",
        paragraphs: [
          "Nothing, and nothing. There are no ads, no accounts, no signup, no paywall, no affiliate links and no tracking. Your squad plans and comparisons are saved in your own browser and never leave it.",
          "It is a hobby project by one person, not a company, and it is not affiliated with, endorsed by or connected to EA Sports.",
        ],
      },
    ],
    es: [
      {
        heading: "Por qué existe",
        paragraphs: [
          "Todas las webs grandes de EA Sports FC giran alrededor de Ultimate Team: precios de cartas, sobres, soluciones de SBC, tendencias del mercado. Nada de eso importa en una carrera. Lo que importa en una carrera es otra cosa: hasta dónde puede llegar de verdad ese chaval, cuándo llega el crecimiento, cuál es su cláusula y cuándo se le acaba el contrato.",
          "Juego al Modo Carrera y me cansé de abrir cuatro pestañas para responder a eso. Así que hice lo que quería tener: una página donde filtras por presupuesto, edad y posición, y donde cada jugador tiene su ficha con el crecimiento temporada a temporada y lo que te cuesta cada punto de media.",
        ],
      },
      {
        heading: "De dónde salen los datos",
        paragraphs: [
          "Las medias, el potencial, los valores de mercado, los salarios, las cláusulas de rescisión y los años de contrato vienen de conjuntos de datos públicos de la comunidad derivados de SoFIFA. Cada versión del juego indica en pantalla de qué conjunto y de qué fecha, y esa misma nota aparece al pie de todas las páginas.",
          "Hay dos cosas que no salen de ningún conjunto de datos, y la web lo dice allí donde aparecen. Las curvas de crecimiento — la proyección temporada a temporada de cada ficha — son un modelo propio de esta web, calculado a partir de la edad y del potencial que le queda al jugador. Y el tipo de crecimiento (explosivo, temprano, tardío…) está deducido de esos mismos dos números, no leído del juego.",
          "FC 27 es un caso aparte: EA todavía no ha publicado sus medias, así que esa versión funciona con jugadores de prueba y lo avisa en todas las pantallas. El día que se publiquen las medias oficiales, los datos reales las sustituyen.",
        ],
      },
      {
        heading: "Qué cuesta y qué recoge",
        paragraphs: [
          "Nada, y nada. No hay anuncios, ni cuentas, ni registro, ni suscripción, ni enlaces de afiliado, ni seguimiento. Tus plantillas y comparaciones se guardan en tu propio navegador y no salen de ahí.",
          "Es un proyecto de aficionado hecho por una persona, no una empresa, y no está afiliado a EA Sports ni respaldado por ellos.",
        ],
      },
    ],
  },
};

export const PRIVACY: InfoPage = {
  slug: { en: "privacy", es: "privacidad" },
  title: {
    en: "Privacy — Career Hub collects nothing",
    es: "Privacidad: Career Hub no recoge nada",
  },
  description: {
    en: "No accounts, no cookies, no analytics and no tracking. What little Career Hub stores stays in your own browser.",
    es: "Sin cuentas, sin cookies, sin analítica y sin seguimiento. Lo poco que Career Hub guarda se queda en tu propio navegador.",
  },
  h1: { en: "Privacy", es: "Privacidad" },
  intro: {
    en: "Short version: there is nothing to collect, because nothing is collected.",
    es: "Versión corta: no hay nada que recoger, porque no se recoge nada.",
  },
  sections: {
    en: [
      {
        heading: "No account, no personal data",
        paragraphs: [
          "There is no signup and no login, so the site never asks for your name, your email or anything else. There are no forms of any kind.",
        ],
      },
      {
        heading: "What is stored in your browser",
        paragraphs: [
          "Four things are saved locally so the site remembers them between visits: the game version you selected, the interface language, your squad plans and comparison picks, and whether you have already seen the welcome tour.",
          "These are stored with your browser's localStorage. They stay on your device, they are never sent anywhere, and nobody — including me — can read them. Clearing your browser data removes them.",
        ],
      },
      {
        heading: "No cookies, no analytics, no ads",
        paragraphs: [
          "The site sets no cookies. There is no analytics tool, no tracking pixel, no advertising and no third-party scripts of any kind.",
          "The site is hosted on Vercel, which — like any web host — processes the technical requests your browser makes in order to serve the pages. That is standard server operation and is not used to profile you.",
        ],
      },
      {
        heading: "If this ever changes",
        paragraphs: [
          "If analytics or anything else that observes visitors is ever added, this page will say so before it goes live, in plain language.",
        ],
      },
    ],
    es: [
      {
        heading: "Sin cuenta y sin datos personales",
        paragraphs: [
          "No hay registro ni inicio de sesión, así que la web nunca te pide tu nombre, tu correo ni ninguna otra cosa. No hay formularios de ningún tipo.",
        ],
      },
      {
        heading: "Qué se guarda en tu navegador",
        paragraphs: [
          "Se guardan cuatro cosas en local para que la web las recuerde entre visitas: la versión del juego que elegiste, el idioma de la interfaz, tus plantillas y comparaciones, y si ya has visto el tutorial de bienvenida.",
          "Se almacenan con el localStorage de tu navegador. Se quedan en tu dispositivo, no se envían a ningún sitio y nadie — yo incluido — puede leerlas. Si borras los datos del navegador, desaparecen.",
        ],
      },
      {
        heading: "Sin cookies, sin analítica y sin anuncios",
        paragraphs: [
          "La web no instala cookies. No hay herramienta de analítica, ni píxel de seguimiento, ni publicidad, ni scripts de terceros de ningún tipo.",
          "La web está alojada en Vercel, que — como cualquier alojamiento web — procesa las peticiones técnicas que hace tu navegador para poder servirte las páginas. Eso es funcionamiento normal de un servidor y no se usa para perfilarte.",
        ],
      },
      {
        heading: "Si esto cambia alguna vez",
        paragraphs: [
          "Si algún día se añade analítica o cualquier otra cosa que observe a los visitantes, esta página lo dirá antes de que se active, y lo dirá claro.",
        ],
      },
    ],
  },
};

export const INFO_PAGES: InfoPage[] = [ABOUT, PRIVACY];

/* ------------------------------------------------------------------ */
/* FAQ — its own shape, because it also emits FAQPage structured data  */
/* ------------------------------------------------------------------ */

export const FAQ_SLUG: Record<SeoLocale, string> = { en: "faq", es: "preguntas-frecuentes" };

export const FAQ_META = {
  title: {
    en: "Career Hub FAQ — data, potential, growth and FC 27",
    es: "Preguntas frecuentes de Career Hub: datos, potencial, crecimiento y FC 27",
  },
  description: {
    en: "Where the ratings come from, what potential and growth mean in Career Mode, how the growth curves are calculated, and when FC 27 data arrives.",
    es: "De dónde salen las medias, qué significan el potencial y el crecimiento en el Modo Carrera, cómo se calculan las curvas de crecimiento y cuándo llegan los datos de FC 27.",
  },
  h1: { en: "Frequently asked questions", es: "Preguntas frecuentes" },
};

export const FAQ: Record<SeoLocale, { question: string; answer: string }[]> = {
  en: [
    {
      question: "Where do the ratings and values come from?",
      answer:
        "From public community datasets derived from SoFIFA — the same source most Career Mode players already use. Each game version states which dataset and which date at the bottom of every page. They are not official EA data, and this site does not read anything out of the game.",
    },
    {
      question: "Are the growth curves real, or estimated?",
      answer:
        "Estimated. The season-by-season projection on each player page is this site's own model, calculated from the player's age and the potential he has left. Growth type — explosive, early, normal, slow, late, constant — is inferred from those same two numbers. No public dataset publishes either, so treat them as a guide to when the growth arrives, not as a value taken from the game.",
    },
    {
      question: "What does growth (+Δ) mean?",
      answer:
        "Potential minus current overall: the rating points a player still has left to gain. A 65-rated 17-year-old with 87 potential has +22, which is what you are actually buying. It is the single most useful number in a Career Mode signing, and the one Ultimate Team sites never show.",
    },
    {
      question: "When will FC 27 data be added?",
      answer:
        "The day EA publishes the official FC 27 ratings. Until then FC 27 runs on placeholder players, and every screen in that version says so. Nothing about FC 27 on this site should be used to plan a save yet.",
    },
    {
      question: "Why does FC 25 have no free agents list, and no attribute charts?",
      answer:
        "Because the public FC 25 dataset does not contain them. It gives every player a club, so there are no free agents to list, and its attribute columns are empty, so the radar is hidden rather than drawn as a flat shape. Ratings, potential, values, wages, clauses and contracts are all there and all real.",
    },
    {
      question: "Is it free? Are there ads or accounts?",
      answer:
        "It is free, there are no ads, there is nothing to sign up for and nothing to buy. It is a hobby project, not a business.",
    },
    {
      question: "Do you store anything about me?",
      answer:
        "No. Your version, language, squad plans and comparisons are saved in your own browser and never sent anywhere. There are no cookies, no analytics and no tracking. The privacy page explains it in full.",
    },
    {
      question: "Is this an official EA Sports site?",
      answer:
        "No. Career Hub is an independent fan project, not affiliated with, endorsed by or connected to EA Sports in any way.",
    },
  ],
  es: [
    {
      question: "¿De dónde salen las medias y los valores?",
      answer:
        "De conjuntos de datos públicos de la comunidad derivados de SoFIFA, la misma fuente que ya usa la mayoría de jugadores de Modo Carrera. Cada versión del juego indica de qué conjunto y de qué fecha al pie de todas las páginas. No son datos oficiales de EA, y esta web no extrae nada del juego.",
    },
    {
      question: "¿Las curvas de crecimiento son reales o estimadas?",
      answer:
        "Estimadas. La proyección temporada a temporada de cada ficha es un modelo propio de esta web, calculado a partir de la edad del jugador y del potencial que le queda. El tipo de crecimiento — explosivo, temprano, normal, lento, tardío, constante — está deducido de esos mismos dos números. Ningún conjunto de datos público publica ninguna de las dos cosas, así que tómalas como una guía de cuándo llega el crecimiento, no como un dato sacado del juego.",
    },
    {
      question: "¿Qué significa el crecimiento (+Δ)?",
      answer:
        "El potencial menos la media actual: los puntos de media que al jugador le quedan por ganar. Un chaval de 17 años con 65 de media y 87 de potencial tiene +22, y eso es lo que estás comprando de verdad. Es el número más útil de un fichaje en Modo Carrera, y justo el que las webs de Ultimate Team nunca enseñan.",
    },
    {
      question: "¿Cuándo se añadirán los datos de FC 27?",
      answer:
        "El mismo día que EA publique las medias oficiales de FC 27. Hasta entonces, FC 27 funciona con jugadores de prueba y todas las pantallas de esa versión lo avisan. Nada de lo que veas ahora en FC 27 sirve para planificar una carrera.",
    },
    {
      question: "¿Por qué FC 25 no tiene lista de agentes libres ni gráficos de atributos?",
      answer:
        "Porque el conjunto de datos público de FC 25 no los trae. Asigna club a todos los jugadores, así que no hay agentes libres que listar, y sus columnas de atributos vienen vacías, así que el radar se oculta en vez de dibujarse plano. Las medias, el potencial, los valores, los salarios, las cláusulas y los contratos sí están, y son reales.",
    },
    {
      question: "¿Es gratis? ¿Hay anuncios o hay que registrarse?",
      answer:
        "Es gratis, no hay anuncios, no hay nada que registrar y no hay nada que comprar. Es un proyecto de aficionado, no un negocio.",
    },
    {
      question: "¿Guardáis algo sobre mí?",
      answer:
        "No. Tu versión, tu idioma, tus plantillas y tus comparaciones se guardan en tu propio navegador y no se envían a ningún sitio. No hay cookies, ni analítica, ni seguimiento. La página de privacidad lo explica entero.",
    },
    {
      question: "¿Es una web oficial de EA Sports?",
      answer:
        "No. Career Hub es un proyecto independiente de aficionado, sin ninguna afiliación con EA Sports ni respaldo por su parte.",
    },
  ],
};
