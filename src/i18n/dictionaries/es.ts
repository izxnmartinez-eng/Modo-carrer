import type { Dictionary } from "./en";

export const es = {
  meta: {
    title: "Career Hub — Base de datos de Modo Carrera de EA SPORTS FC",
    description:
      "Perlas, cláusulas de rescisión, códigos tácticos de entrenadores reales, planificación de plantilla y cálculos de cantera para el Modo Carrera de EA SPORTS FC. Sin Ultimate Team.",
  },

  brand: {
    name: "CAREER HUB",
    tagline: "Solo Modo Carrera",
    disclaimer:
      "Datos de muestra para demostración. Las medias, valores y códigos son ilustrativos, no extraídos del juego.",
    disclaimerReal:
      "Los datos de FC 26 provienen de un conjunto de datos público de la comunidad ({source}). Los tipos de crecimiento son deducidos, no oficiales.",
  },

  nav: {
    sections: "Secciones",
    mainNav: "Navegación principal",
    openMenu: "Abrir el menú",
    closeMenu: "Cerrar el menú",
    drawerDescription: "Elige una sección de Career Hub, la versión del juego activa y el idioma de la interfaz.",
    items: {
      wonderkids: {
        label: "Perlas y joyas",
        short: "Jugadores",
        description: "Potencial, crecimiento, cláusulas y chollos",
      },
      tactics: {
        label: "Centro táctico",
        short: "Tácticas",
        description: "Sistemas de entrenadores reales y códigos",
      },
      squad: {
        label: "Planificador de plantilla",
        short: "Plantilla",
        description: "Presupuesto salarial, edad, crecimiento",
      },
      compare: {
        label: "Comparador de jugadores",
        short: "Comparar",
        description: "Radar, curvas de crecimiento, ratio salarial",
      },
      scouts: {
        label: "Ojeadores y cantera",
        short: "Ojeadores",
        description: "Cálculo de cantera y rastreador de regens",
      },
    },
  },

  search: {
    placeholder: "Busca jugadores, clubes, posiciones…",
    label: "Buscar jugadores, clubes y posiciones",
    clear: "Limpiar la búsqueda",
  },

  version: {
    label: "Versión del juego",
    aria: "Versión del juego: {version}",
    switchedTitle: "Has cambiado a {version}",
    switchedDescription: "Datos de {season} cargados: jugadores, tácticas y ojeo actualizados.",
  },

  language: {
    label: "Idioma",
    aria: "Idioma de la interfaz: {language}",
    switchedTitle: "Idioma cambiado a {language}",
    switchedDescription: "La interfaz ya está en {language}. Tu versión y tus plantillas no han cambiado.",
  },

  common: {
    reset: "Restablecer",
    any: "Cualquiera",
    none: "Ninguna",
    all: "Todo",
    free: "Gratis",
    freeAgent: "Agente libre",
    noClub: "sin club",
    expired: "Vencido",
    open: "Abrir",
    viewing: "Viendo",
    close: "Cerrar",
    dismiss: "Descartar la notificación",
    notifications: "Notificaciones",
    actions: "Acciones",
    more: "Más",
    less: "Menos",
    years: "{count} años",
    ageShort: "{count} a",
    monthsShort: "{count} m",
    yearsShort: "{count} a",
    yearsMonthsShort: "{years}a {months}m",
    perWeek: "/sem",
    moneyPattern: "{value}\u00A0€",
    compact: { thousand: "K", million: "M", billion: "B" },
    sliderMin: "{label} mínimo",
    sliderMax: "{label} máximo",
    footed: "Zurdo/diestro: {foot}",
    foot: {
      Left: "Izquierdo",
      Right: "Derecho",
    },
    positionGroups: {
      Goalkeeper: "Portero",
      Defender: "Defensa",
      Midfielder: "Centrocampista",
      Attacker: "Delantero",
    },
    positionGroupsPlural: {
      Goalkeeper: "Porteros",
      Defender: "Defensas",
      Midfielder: "Centrocampistas",
      Attacker: "Delanteros",
    },
  },

  playerActions: {
    scoutReport: "Informe de ojeo",
    addToSquad: "Añadir a la plantilla",
    inSquad: "En la plantilla",
    addToSquadTitle: "Añadir al plan de plantilla",
    removeFromSquadTitle: "Quitar del plan de plantilla",
    compare: "Comparar",
    addToCompare: "Añadir a la comparación",
    removeFromCompare: "Quitar de la comparación",
    copyLink: "Copiar el enlace",
  },

  badges: {
    hiddenGem: "Joya oculta",
    bargain: "Chollo",
    freeAgent: "Agente libre",
    expiring: "Termina contrato",
  },

  players: {
    eyebrow: "{version} · {season}",
    title: "Perlas y buscador de joyas",
    description:
      "Todos los jugadores de la base de datos ordenados por lo buen fichaje que son para el Modo Carrera: potencial, curva de crecimiento, cláusula de rescisión y peso salarial, no el precio en Ultimate Team.",
    viewTable: "Tabla",
    viewGrid: "Cuadrícula",
    filtersButton: "Filtros",
    stats: {
      matching: "Jugadores encontrados",
      matchingHint: "de {total} en la base de datos",
      averageGrowth: "Crecimiento medio",
      averageGrowthHint: "Potencial menos media",
      hiddenGems: "Joyas ocultas",
      hiddenGemsHint: "POT por encima de 82 y media por debajo de 68",
      cheapest: "El más barato",
      cheapestEmpty: "Ningún jugador con precio en este rango",
    },
    presets: {
      bargains: "Chollos",
      bargainsHint: "Mucho potencial en relación al precio y al salario",
      hiddenGems: "Joyas ocultas",
      hiddenGemsHint: "POT por encima de 82 con media por debajo de 68",
      freeAgents: "Agentes libres",
      freeAgentsHint: "Sin club y sin coste de traspaso",
      expiring: "Terminan contrato (6 meses)",
      expiringHint: "Precontrato gratis en el mercado de enero",
    },
    emptyTitle: "Ningún jugador coincide con esos filtros",
    emptyHint:
      "Las bases de datos de Modo Carrera son pequeñas a propósito. Amplía el rango de potencial, quita un filtro rápido o restablece los filtros para ver el listado completo.",
    mobileFiltersDescription:
      "Acota la base de datos por edad, media, potencial, coste y situación contractual.",
    showPlayers: "Ver {count} jugadores",
    showMore: "Ver más",
    showingCount: "Mostrando {shown} de {total}",
  },

  filters: {
    title: "Filtros",
    age: "Edad",
    overall: "Media",
    potential: "Potencial",
    growth: "Crecimiento (+Δ)",
    maxValue: "Valor de traspaso máximo",
    maxWage: "Salario semanal máximo",
    position: "Posición",
    positionTitle: "Incluye jugadores que pueden jugar de {position}",
    releaseClause: "Cláusula de rescisión",
    hasClause: "Tiene cláusula",
    expiryYear: "Año de fin de contrato",
    upTo: "≤ {value}",
  },

  table: {
    player: "Jugador",
    age: "Edad",
    overall: "MED",
    potential: "POT",
    growth: "+Δ",
    value: "Valor",
    wage: "Salario",
    clause: "Cláusula",
    contract: "Contrato",
    score: "Nota",
  },

  drawer: {
    overall: "Media",
    potential: "Potencial",
    growth: "Crecimiento",
    growthCurve: "Curva de crecimiento prevista",
    nextSeason: "Al final de la próxima temporada:",
    nextSeasonValue: "{overall} de media",
    attributes: "Atributos",
    contractCost: "Contrato y coste",
    transferValue: "Valor de traspaso",
    weeklyWage: "Salario semanal",
    releaseClauseRow: "Cláusula de rescisión",
    contractExpires: "Fin de contrato",
    costPerGrowth: "Coste por punto de crecimiento",
    bargainScore: "Nota de chollo",
    bargainScoreValue: "{score}/100",
    playStyles: "Estilos de juego",
    weakFoot: "Pierna mala",
    skillMoves: "Filigranas",
    scoutReport: "Informe de ojeo",
    linkCopiedTitle: "Enlace del jugador copiado",
    linkCopiedDescription: "{name}: abre directamente este informe de ojeo.",
  },

  growthTypes: {
    Explosive: {
      name: "Explosivo",
      note: "Saltos enormes entre los 17 y los 21, y después se estanca. Dale minutos ya.",
    },
    Early: {
      name: "Temprano",
      note: "Casi todo el crecimiento llega antes de los 23. Ficharlo a los 24 es ficharlo ya terminado.",
    },
    Normal: {
      name: "Normal",
      note: "Mejora constante y predecible hasta los 25.",
    },
    Slow: {
      name: "Lento",
      note: "Subidas pequeñas cada año, pero que no paran hasta los 28.",
    },
    Late: {
      name: "Tardío",
      note: "Casi nada antes de los 23 y luego una subida brusca hasta los 27. Cédelo y ten paciencia.",
    },
    Constant: {
      name: "Constante",
      note: "Está en su techo o muy cerca. Lo que ves es lo que hay.",
    },
  },

  tactics: {
    title: "Centro táctico y códigos de entrenadores",
    description:
      "Sistemas legendarios y meta reconstruidos con los roles, sliders e instrucciones del juego. Copia el código y pégalo directamente en Tácticas de la comunidad.",
    allFormations: "Todas las formaciones",
    emptyTitle: "Ninguna táctica coincide con esa búsqueda",
    emptyHint: "Prueba con un entrenador (Guardiola, Alonso, Simeone), un club o una formación como 3-2-4-1.",
    setup: "Configuración táctica",
    buildUp: "Salida de balón",
    attackingWidth: "Amplitud en ataque",
    playersInBox: "En el área",
    corners: "Córners",
    freeKicks: "Faltas",
    defensiveApproach: "Planteamiento defensivo",
    defensiveWidth: "Amplitud defensiva",
    depth: "Altura de la línea defensiva",
    depthHighHint: "Línea alta: tus centrales necesitan velocidad.",
    depthDeepHint: "Bloque bajo: vas a ceder la posesión a propósito.",
    depthMidHint: "Bloque medio.",
    keyInstructions: "Instrucciones clave",
    strengths: "Puntos fuertes",
    weaknesses: "Puntos débiles",
    recommended: "A quién fichar para esto",
    pitchHint: "Toca cualquier posición del campo para ver su rol y su enfoque.",
    focus: "Enfoque: {focus}",
    copiedTitle: "Código táctico copiado",
    copiedDescription: "{manager} — {name}. Pégalo en Tácticas > Tácticas de la comunidad dentro del juego.",
    difficulty: {
      "Plug & Play": "Listo para usar",
      Intermediate: "Intermedio",
      Advanced: "Avanzado",
    },
    buildUpStyle: {
      Balanced: "Equilibrado",
      Counter: "Al contraataque",
      "Short Passing": "Pase corto",
      "Long Ball": "Balón largo",
    },
    approach: {
      Balanced: "Equilibrado",
      Deep: "Repliegue",
      High: "Presión alta",
      "Aggressive Press": "Presión agresiva",
    },
    roleFocus: {
      Defend: "Defensivo",
      Balanced: "Equilibrado",
      Attack: "Ofensivo",
      Roaming: "Libre",
      "Build-Up": "Salida de balón",
    },
  },

  squad: {
    title: "Planificador de plantilla",
    description:
      "Monta una lista de fichajes contra un presupuesto salarial real y comprueba el perfil de edad y el crecimiento total que estás comprando de verdad.",
    clearPlan: "Vaciar el plan",
    budgetLabel: "Presupuesto salarial semanal",
    wageBill: "Masa salarial",
    overBudget: "Te pasas del presupuesto en {amount} por semana.",
    size: "Tamaño de la plantilla",
    sizeHint: "{value} en valor de traspaso",
    averageAge: "Edad media",
    ageYoung: "Plantilla joven de proyecto",
    ageBalanced: "Perfil de edad equilibrado",
    averageRating: "Media del equipo",
    averageRatingHint: "Previsión de {value} la próxima temporada",
    totalGrowth: "Crecimiento total",
    totalGrowthHint: "Suma de todos los +Δ del plan",
    cover: "Cobertura por posición",
    coverShort: "Faltan {count} para una plantilla completa",
    listTitle: "Jugadores en el plan",
    addMore: "Añadir más desde la base de datos",
    removeAria: "Quitar a {name} del plan de plantilla",
    emptyTitle: "Todavía no hay jugadores en el plan",
    emptyHint:
      "Añade jugadores desde la base de datos de perlas: la masa salarial, la edad media y el crecimiento total se actualizan sobre la marcha.",
    addedTitle: "{name} añadido al plan de plantilla",
    addedDescription: "Presupuesto salarial y perfil de edad actualizados en el planificador.",
    removedTitle: "{name} eliminado del plan de plantilla",
  },

  compare: {
    title: "Comparador de jugadores",
    description:
      "Radares de atributos enfrentados, curvas de crecimiento en un mismo eje y los cálculos de salario frente a rendimiento que deciden cuál de dos perlas te puedes permitir de verdad.",
    clear: "Vaciar la comparación",
    addPlayer: "Añadir un jugador",
    searchPlaceholder: "Busca en la base de datos…",
    searchLabel: "Buscar un jugador para comparar",
    noMatches: "Ningún jugador coincide con esa búsqueda.",
    removeAria: "Quitar a {name} de la comparación",
    radarTitle: "Radar de atributos",
    keeperNote:
      "Los porteros y los jugadores de campo usan estadísticas distintas, así que no pueden compartir un mismo radar. Compara porteros con porteros.",
    growthTitle: "Curvas de crecimiento",
    growthCaption:
      "Las líneas continuas son la media prevista por edad; la línea discontinua del mismo color es el techo de potencial de ese jugador.",
    metric: "Métrica",
    emptyTitle: "Todavía no has seleccionado nada",
    emptyHint:
      "Elige hasta tres jugadores, desde el buscador de arriba o desde el botón de comparar de la base de datos, para superponer sus radares, sus curvas de crecimiento y sus ratios de coste.",
    addedTitle: "{name} añadido a la comparación",
    addedDescription: "Abre la pestaña del comparador para ver los radares superpuestos.",
    addedDroppedDescription: "La comparación admite {max} jugadores: se ha quitado el más antiguo.",
    metrics: {
      overall: "Media",
      overallHint: "Valoración actual",
      potential: "Potencial",
      potentialHint: "Techo de su carrera",
      growth: "Crecimiento",
      growthHint: "Potencial menos media",
      age: "Edad",
      ageHint: "Temporadas de crecimiento que le quedan",
      value: "Valor de traspaso",
      valueHint: "Precio de partida que pedirá el club",
      wage: "Salario semanal",
      wageHint: "Impacto continuo en el presupuesto",
      wagePerOverall: "Salario por punto de media",
      wagePerOverallHint: "Lo que te cuesta cada punto de media todas las semanas",
      feePerGrowth: "Precio por punto de crecimiento",
      feePerGrowthHint: "Lo que te cuesta por adelantado cada punto futuro de media",
      bargainScore: "Nota de chollo",
      bargainScoreHint: "Valoración global del fichaje sobre 100",
    },
  },

  scouts: {
    title: "Calculadora de ojeadores y cantera",
    description:
      "Calcula lo que te va a dar de verdad una configuración de ojeo antes de gastarte una temporada en ella, y controla qué leyendas a punto de retirarse van a reaparecer en tu cantera.",
    tabsLabel: "Herramientas de ojeo",
    tabAcademy: "Calculadora de cantera",
    tabRegens: "Regens y pregens",
    scoutsAssigned: "Ojeadores asignados",
    experience: "Experiencia",
    experienceHint:
      "Cuántos jugadores reporta cada ojeador por temporada y con qué rapidez llegan los primeros informes.",
    judgment: "Criterio",
    judgmentHint: "Cómo de preciso es el rango de estrellas y hasta qué potencial puede llegar a encontrar.",
    starsAria: "{label}: {count} estrellas",
    region: "Región de ojeo",
    months: "Meses asignado",
    monthsValue: "{count} meses",
    facilities: "Instalaciones de cantera",
    facilityLevels: {
      1: "Básicas",
      2: "Buenas",
      3: "Excelentes",
    },
    benchmarkButton: "Cargar la referencia de 5★ de experiencia / 5★ de criterio",
    playersPerIntake: "Jugadores por promoción",
    playersPerIntakeHint: "Asignación en {region}",
    potentialCeiling: "Techo de potencial",
    potentialCeilingHint: "El tope de {version} es {cap}",
    gemChance: "Probabilidad de una joya de 85+",
    gemChanceHint: "Al menos una por promoción",
    cost: "Coste de ojeo",
    costHint: "{count} ojeadores",
    returnsTitle: "Lo que da esta configuración",
    typicalProspect: "Promesa típica",
    reportSpread: "Margen del informe",
    firstReports: "Primeros informes",
    improveTitle: "Cómo mejorarla",
    availableScouts: "Ojeadores disponibles en {version}",
    perWeekShort: "{value}/sem",
    starsShort: "{experience}★ exp / {judgment}★ crit",
    modelNote:
      "El juego nunca publica sus números reales. Esto es un modelo transparente ajustado al comportamiento observado: todos los coeficientes están en {file} y se pueden reajustar desde un único sitio.",
    verdictBenchmark:
      "La referencia 5★/5★: unos {players} jugadores por promoción, un techo cercano a {ceiling} de potencial y un {chance}% de probabilidad de que salga al menos una promesa de 85+.",
    verdictStandard:
      "Espera unos {players} jugadores por promoción con un techo cercano a {ceiling} de potencial. Probabilidad de una joya de 85+: {chance}%.",
    advice: {
      judgment:
        "Con {judgment}★ de criterio te quedas en unos {ceiling} de potencial y con un informe de ±{spread}★. Cada estrella de criterio vale unos +{perStar} de potencial.",
      experience:
        "Con {experience}★ de experiencia consigues {perScout} jugadores por ojeador y temporada. Un ojeador con 5★ de experiencia consigue {best}.",
      region:
        "{region} tiene un sesgo de potencial de {bias}. Sudamérica está en +3 y es de donde salen los techos de 90+.",
      facilities:
        "Unas instalaciones de cantera por debajo de Excelentes te cuestan alrededor de 1,5 puntos de media inicial por nivel, lo que retrasa una temporada entera su llegada al primer equipo.",
      scouts:
        "Tres ojeadores asignados es el punto óptimo en la práctica: el tamaño de la promoción escala de forma lineal con el número de ojeadores.",
      optimal:
        "Esta es la configuración de máximo rendimiento del juego. Mantén la asignación activa todo el año y no los retires antes de tiempo.",
    },
    regens: {
      explainer:
        "Cuando un jugador real se retira, el juego lo reedita como un canterano «regen» que conserva su {highlight}. Filtra tu cantera y la lista de agentes libres por esos cinco campos y el regen sale solo.",
      explainerHighlight: "nacionalidad, posición, altura, pierna buena y fecha de nacimiento exacta",
      allPositions: "Todas las posiciones",
      retires: "Se retira en {season}",
      nation: "País",
      birthday: "Cumpleaños",
      height: "Altura",
      foot: "Pierna",
      startOverall: "Media inicial",
      potential: "POT",
      whereToLook: "Dónde buscarlo:",
      emptyTitle: "Ningún regen coincide con esa búsqueda",
      emptyHint: "Busca por nombre de la leyenda, país o posición.",
    },
  },

  onboarding: {
    open: "Ver el tutorial",
    skip: "Saltar",
    back: "Atrás",
    next: "Siguiente",
    done: "Empezar",
    stepOf: "Paso {current} de {total}",
    steps: {
      welcome: {
        title: "Bienvenido a Career Hub",
        body: "Una base de datos hecha solo para el Modo Carrera de EA SPORTS FC: potencial, curvas de crecimiento, cláusulas de rescisión y tácticas de entrenadores reales. Sin precios de Ultimate Team, sin sobres y sin ruido de mercado. En dos minutos te manejas.",
      },
      players: {
        title: "Encuentra la perla",
        body: "Cada jugador está ordenado por lo buen fichaje que es para el Modo Carrera. MED es lo que es hoy, POT es su techo y +Δ es el crecimiento que estás comprando de verdad. Los filtros rápidos te sacan chollos, joyas ocultas, agentes libres y contratos que terminan, de un toque.",
      },
      tactics: {
        title: "Copia las tácticas de un entrenador",
        body: "Sistemas reales de Guardiola, Zidane, Alonso, Klopp y Simeone, reconstruidos con los roles y sliders del juego. Toca el código verde para copiarlo y pégalo en Tácticas › Tácticas de la comunidad dentro del juego.",
      },
      squad: {
        title: "Planifica la plantilla y compara",
        body: "Añade jugadores a tu plan y la masa salarial, la edad media y el crecimiento total se actualizan solos. El comparador pone hasta tres jugadores en el mismo radar y la misma curva, y te dice lo que te cuesta de verdad cada punto de media.",
      },
      scouts: {
        title: "Haz los números de la cantera",
        body: "Calcula lo que te va a dar una configuración de ojeo antes de gastarte una temporada en ella, y controla qué leyendas a punto de retirarse van a volver como regens: filtra tu cantera por país, posición, altura, pierna y fecha de nacimiento.",
      },
      settings: {
        title: "Tu juego, tu idioma",
        body: "Cambia entre FC 27, FC 26 y FC 25 arriba del menú y toda la app recarga ese conjunto de datos; el selector de idioma está justo debajo. Un aviso: los datos son de muestra, escritos para este proyecto, no extraídos del juego.",
      },
    },
  },

  toast: {
    copyFailedTitle: "No se ha podido copiar al portapapeles",
    copyFailedDescription:
      "Tu navegador ha bloqueado el acceso al portapapeles: selecciona el código y cópialo a mano.",
  },
} satisfies Dictionary;
