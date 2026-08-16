import type { Dictionary } from "./en";

export const it = {
  meta: {
    title: "Career Hub — Database Modalità Carriera di EA SPORTS FC",
    description:
      "Talenti, clausole rescissorie, codici tattici di allenatori reali, pianificazione della rosa e calcoli sul settore giovanile per la Modalità Carriera di EA SPORTS FC. Niente Ultimate Team.",
  },

  brand: {
    name: "CAREER HUB",
    tagline: "Solo Modalità Carriera",
    disclaimer:
      "Dataset di esempio a scopo dimostrativo. Valutazioni, valori e codici sono illustrativi e non estratti dal gioco.",
  },

  nav: {
    sections: "Sezioni",
    openMenu: "Apri il menu",
    closeMenu: "Chiudi il menu",
    drawerDescription: "Scegli una sezione di Career Hub, la versione del gioco attiva e la lingua dell'interfaccia.",
    items: {
      wonderkids: {
        label: "Talenti e gioielli",
        description: "Potenziale, crescita, clausole e affari",
      },
      tactics: {
        label: "Centro tattico",
        description: "Sistemi di allenatori reali e codici",
      },
      squad: {
        label: "Pianificatore rosa",
        description: "Monte ingaggi, età media, crescita",
      },
      compare: {
        label: "Confronto giocatori",
        description: "Radar, curve di crescita, rapporto ingaggio",
      },
      scouts: {
        label: "Osservatori e vivaio",
        description: "Calcoli sul vivaio e tracker dei regen",
      },
    },
  },

  search: {
    placeholder: "Cerca giocatori, club, ruoli…",
    label: "Cerca giocatori, club e ruoli",
    clear: "Cancella la ricerca",
  },

  version: {
    label: "Versione del gioco",
    aria: "Versione del gioco: {version}",
    switchedTitle: "Passato a {version}",
    switchedDescription: "Dataset {season} caricato — giocatori, tattiche e scouting aggiornati.",
  },

  language: {
    label: "Lingua",
    aria: "Lingua dell'interfaccia: {language}",
    switchedTitle: "Lingua cambiata in {language}",
    switchedDescription: "L'interfaccia ora è in {language}. Versione e piani rosa restano invariati.",
  },

  common: {
    reset: "Reimposta",
    any: "Qualsiasi",
    none: "Nessuna",
    all: "Tutto",
    free: "Gratis",
    freeAgent: "Svincolato",
    noClub: "senza club",
    expired: "Scaduto",
    open: "Apri",
    viewing: "In visione",
    close: "Chiudi",
    dismiss: "Chiudi la notifica",
    notifications: "Notifiche",
    actions: "Azioni",
    more: "Altro",
    less: "Meno",
    years: "{count} anni",
    ageShort: "{count} a",
    monthsShort: "{count} mesi",
    yearsShort: "{count} a",
    yearsMonthsShort: "{years}a {months}m",
    perWeek: "/sett.",
    moneyPattern: "{value}\u00A0€",
    compact: { thousand: "K", million: "Mln", billion: "Mld" },
    sliderMin: "{label} minimo",
    sliderMax: "{label} massimo",
    footed: "Piede {foot}",
    foot: {
      Left: "sinistro",
      Right: "destro",
    },
    positionGroups: {
      Goalkeeper: "Portiere",
      Defender: "Difensore",
      Midfielder: "Centrocampista",
      Attacker: "Attaccante",
    },
    positionGroupsPlural: {
      Goalkeeper: "Portieri",
      Defender: "Difensori",
      Midfielder: "Centrocampisti",
      Attacker: "Attaccanti",
    },
  },

  playerActions: {
    scoutReport: "Report di scouting",
    addToSquad: "Aggiungi alla rosa",
    inSquad: "Nel piano rosa",
    addToSquadTitle: "Aggiungi al piano rosa",
    removeFromSquadTitle: "Rimuovi dal piano rosa",
    compare: "Confronta",
    addToCompare: "Aggiungi al confronto",
    removeFromCompare: "Rimuovi dal confronto",
    copyLink: "Copia il link",
  },

  badges: {
    hiddenGem: "Gioiello nascosto",
    bargain: "Affare",
    freeAgent: "Svincolato",
    expiring: "In scadenza",
  },

  players: {
    eyebrow: "{version} · {season}",
    title: "Talenti e cerca gioielli",
    description:
      "Tutti i giocatori del database ordinati per quanto valgono come colpo in Modalità Carriera — potenziale, curva di crescita, clausola rescissoria e peso dell'ingaggio, non il prezzo in Ultimate Team.",
    viewTable: "Tabella",
    viewGrid: "Griglia",
    filtersButton: "Filtri",
    stats: {
      matching: "Giocatori trovati",
      matchingHint: "su {total} nel database",
      averageGrowth: "Crescita media",
      averageGrowthHint: "Potenziale meno valutazione",
      hiddenGems: "Gioielli nascosti",
      hiddenGemsHint: "POT sopra 82 e VAL sotto 68",
      cheapest: "Il più economico",
      cheapestEmpty: "Nessun giocatore con valore in questo intervallo",
    },
    presets: {
      bargains: "Affari",
      bargainsHint: "Tanto potenziale rispetto a costo e ingaggio",
      hiddenGems: "Gioielli nascosti",
      hiddenGemsHint: "POT sopra 82 con valutazione sotto 68",
      freeAgents: "Svincolati",
      freeAgentsHint: "Senza club e senza costo del cartellino",
      expiring: "In scadenza (6 mesi)",
      expiringHint: "Precontratto gratuito nella finestra di gennaio",
    },
    emptyTitle: "Nessun giocatore corrisponde a questi filtri",
    emptyHint:
      "I database della Modalità Carriera sono piccoli per scelta. Allarga l'intervallo di potenziale, togli un filtro rapido o reimposta i filtri per vedere l'elenco completo.",
    mobileFiltersDescription:
      "Restringi il database per età, valutazione, potenziale, costo e situazione contrattuale.",
    showPlayers: "Mostra {count} giocatori",
  },

  filters: {
    title: "Filtri",
    age: "Età",
    overall: "Valutazione",
    potential: "Potenziale",
    growth: "Crescita (+Δ)",
    maxValue: "Valore di mercato massimo",
    maxWage: "Ingaggio settimanale massimo",
    position: "Ruolo",
    positionTitle: "Include i giocatori che possono giocare da {position}",
    releaseClause: "Clausola rescissoria",
    hasClause: "Ha una clausola",
    expiryYear: "Anno di scadenza del contratto",
    upTo: "≤ {value}",
  },

  table: {
    player: "Giocatore",
    age: "Età",
    overall: "VAL",
    potential: "POT",
    growth: "+Δ",
    value: "Valore",
    wage: "Ingaggio",
    clause: "Clausola",
    contract: "Contratto",
    score: "Voto",
  },

  drawer: {
    overall: "Valutazione",
    potential: "Potenziale",
    growth: "Crescita",
    growthCurve: "Curva di crescita prevista",
    nextSeason: "Fine della prossima stagione:",
    nextSeasonValue: "{overall} di valutazione",
    attributes: "Attributi",
    contractCost: "Contratto e costi",
    transferValue: "Valore di mercato",
    weeklyWage: "Ingaggio settimanale",
    releaseClauseRow: "Clausola rescissoria",
    contractExpires: "Scadenza del contratto",
    costPerGrowth: "Costo per punto di crescita",
    bargainScore: "Voto affare",
    bargainScoreValue: "{score}/100",
    playStyles: "Stili di gioco",
    weakFoot: "Piede debole",
    skillMoves: "Abilità",
    scoutReport: "Report di scouting",
    linkCopiedTitle: "Link del giocatore copiato",
    linkCopiedDescription: "{name} — apre direttamente questo report di scouting.",
  },

  growthTypes: {
    Explosive: {
      name: "Esplosiva",
      note: "Salti enormi tra i 17 e i 21 anni, poi si ferma. Fallo giocare subito.",
    },
    Early: {
      name: "Precoce",
      note: "Quasi tutta la crescita arriva prima dei 23. Comprarlo a 24 significa comprare un giocatore finito.",
    },
    Normal: {
      name: "Normale",
      note: "Miglioramenti costanti e prevedibili fino ai 25 anni.",
    },
    Slow: {
      name: "Lenta",
      note: "Piccoli guadagni annuali, che però continuano fino ai 28.",
    },
    Late: {
      name: "Tardiva",
      note: "Quasi nulla prima dei 23, poi una salita ripida fino ai 27. Mandalo in prestito e aspetta.",
    },
    Constant: {
      name: "Costante",
      note: "È al suo tetto o molto vicino. Quello che vedi è quello che avrai.",
    },
  },

  tactics: {
    title: "Centro tattico e codici degli allenatori",
    description:
      "Sistemi leggendari e meta ricostruiti con ruoli, cursori e istruzioni del gioco. Copia il codice e incollalo nelle Tattiche della community.",
    allFormations: "Tutti i moduli",
    emptyTitle: "Nessuna tattica corrisponde a questa ricerca",
    emptyHint: "Prova con un allenatore (Guardiola, Alonso, Simeone), un club o un modulo come 3-2-4-1.",
    setup: "Impostazioni tattiche",
    buildUp: "Costruzione",
    attackingWidth: "Ampiezza offensiva",
    playersInBox: "In area",
    corners: "Corner",
    freeKicks: "Punizioni",
    defensiveApproach: "Approccio difensivo",
    defensiveWidth: "Ampiezza difensiva",
    depth: "Altezza della linea difensiva",
    depthHighHint: "Linea alta — i tuoi centrali devono avere velocità.",
    depthDeepHint: "Blocco basso — cederai il possesso di proposito.",
    depthMidHint: "Blocco medio.",
    keyInstructions: "Istruzioni chiave",
    strengths: "Punti di forza",
    weaknesses: "Punti deboli",
    recommended: "Chi acquistare per questo sistema",
    pitchHint: "Tocca una posizione sul campo per vederne ruolo e atteggiamento.",
    focus: "Atteggiamento: {focus}",
    copiedTitle: "Codice tattico copiato",
    copiedDescription: "{manager} — {name}. Incollalo in Tattiche > Tattiche della community.",
    difficulty: {
      "Plug & Play": "Pronto all'uso",
      Intermediate: "Intermedio",
      Advanced: "Avanzato",
    },
    buildUpStyle: {
      Balanced: "Equilibrata",
      Counter: "Contropiede",
      "Short Passing": "Passaggi corti",
      "Long Ball": "Palla lunga",
    },
    approach: {
      Balanced: "Equilibrato",
      Deep: "Basso",
      High: "Alto",
      "Aggressive Press": "Pressing aggressivo",
    },
    roleFocus: {
      Defend: "Difensivo",
      Balanced: "Equilibrato",
      Attack: "Offensivo",
      Roaming: "Libero",
      "Build-Up": "Costruzione",
    },
  },

  squad: {
    title: "Pianificatore della rosa",
    description:
      "Costruisci una lista di obiettivi con un monte ingaggi reale, poi controlla l'età media e la crescita totale che stai davvero comprando.",
    clearPlan: "Svuota il piano",
    budgetLabel: "Monte ingaggi settimanale",
    wageBill: "Monte ingaggi",
    overBudget: "Sfori il budget di {amount} a settimana.",
    size: "Dimensione della rosa",
    sizeHint: "{value} di valore di mercato",
    averageAge: "Età media",
    ageYoung: "Rosa giovane da progetto",
    ageBalanced: "Età media equilibrata",
    averageRating: "Valutazione media",
    averageRatingHint: "Previsione di {value} la prossima stagione",
    totalGrowth: "Crescita totale",
    totalGrowthHint: "Somma di tutti i +Δ del piano",
    cover: "Copertura per reparto",
    coverShort: "Ne mancano {count} per una rosa completa",
    listTitle: "Giocatori nel piano",
    addMore: "Aggiungine altri dal database",
    removeAria: "Rimuovi {name} dal piano rosa",
    emptyTitle: "Ancora nessun giocatore nel piano",
    emptyHint:
      "Aggiungi giocatori dal database dei talenti — monte ingaggi, età media e crescita totale si aggiornano man mano.",
    addedTitle: "{name} aggiunto al piano rosa",
    addedDescription: "Monte ingaggi ed età media aggiornati nel pianificatore.",
    removedTitle: "{name} rimosso dal piano rosa",
  },

  compare: {
    title: "Confronto giocatori",
    description:
      "Radar degli attributi affiancati, curve di crescita su un unico asse e i calcoli ingaggio/rendimento che decidono quale dei due talenti puoi davvero permetterti.",
    clear: "Svuota il confronto",
    addPlayer: "Aggiungi un giocatore",
    searchPlaceholder: "Cerca nel database…",
    searchLabel: "Cerca un giocatore da confrontare",
    noMatches: "Nessun giocatore corrisponde a questa ricerca.",
    removeAria: "Rimuovi {name} dal confronto",
    radarTitle: "Radar degli attributi",
    keeperNote:
      "Portieri e giocatori di movimento usano statistiche diverse, quindi non possono condividere lo stesso radar. Confronta i portieri tra loro.",
    growthTitle: "Curve di crescita",
    growthCaption:
      "Le linee continue sono la valutazione prevista per età; la linea tratteggiata dello stesso colore è il tetto di potenziale del giocatore.",
    metric: "Metrica",
    emptyTitle: "Non hai ancora selezionato nulla",
    emptyHint:
      "Scegli fino a tre giocatori — dalla ricerca qui sopra o dal pulsante di confronto nel database — per sovrapporre radar, curve di crescita e rapporti di costo.",
    addedTitle: "{name} aggiunto al confronto",
    addedDescription: "Apri la scheda Confronto giocatori per vedere i radar sovrapposti.",
    addedDroppedDescription: "Il confronto contiene {max} giocatori — la selezione più vecchia è stata rimossa.",
    metrics: {
      overall: "Valutazione",
      overallHint: "Valutazione attuale",
      potential: "Potenziale",
      potentialHint: "Tetto di carriera",
      growth: "Crescita",
      growthHint: "Potenziale meno valutazione",
      age: "Età",
      ageHint: "Stagioni di crescita rimaste",
      value: "Valore di mercato",
      valueHint: "Base del prezzo richiesto",
      wage: "Ingaggio settimanale",
      wageHint: "Impatto continuo sul bilancio",
      wagePerOverall: "Ingaggio per punto di valutazione",
      wagePerOverallHint: "Quanto ti costa ogni punto di valutazione ogni settimana",
      feePerGrowth: "Costo per punto di crescita",
      feePerGrowthHint: "Quanto ti costa subito ogni punto futuro di valutazione",
      bargainScore: "Voto affare",
      bargainScoreHint: "Valutazione complessiva del colpo su 100",
    },
  },

  scouts: {
    title: "Calcolatore osservatori e vivaio",
    description:
      "Calcola cosa rende davvero una configurazione di scouting prima di dedicarle una stagione — poi tieni d'occhio quali leggende in ritiro stanno per riapparire nel tuo vivaio.",
    tabsLabel: "Strumenti di scouting",
    tabAcademy: "Calcolatore del vivaio",
    tabRegens: "Regen e pregen",
    scoutsAssigned: "Osservatori assegnati",
    experience: "Esperienza",
    experienceHint:
      "Quanti giocatori segnala ogni osservatore a stagione e con quanta rapidità arrivano i primi report.",
    judgment: "Giudizio",
    judgmentHint: "Quanto è preciso l'intervallo di stelle e fino a che potenziale può arrivare a trovare.",
    starsAria: "{label} {count} stelle",
    region: "Regione di scouting",
    months: "Mesi di incarico",
    monthsValue: "{count} mesi",
    facilities: "Strutture del vivaio",
    facilityLevels: {
      1: "Base",
      2: "Buone",
      3: "Eccellenti",
    },
    benchmarkButton: "Carica il riferimento 5★ esperienza / 5★ giudizio",
    playersPerIntake: "Giocatori per leva",
    playersPerIntakeHint: "Incarico in {region}",
    potentialCeiling: "Tetto di potenziale",
    potentialCeilingHint: "Il tetto di {version} è {cap}",
    gemChance: "Probabilità di un gioiello 85+",
    gemChanceHint: "Almeno uno per leva",
    cost: "Costo dello scouting",
    costHint: "{count} osservatori",
    returnsTitle: "Cosa rende questa configurazione",
    typicalProspect: "Prospetto tipico",
    reportSpread: "Margine del report",
    firstReports: "Primi report",
    improveTitle: "Come migliorarla",
    availableScouts: "Osservatori disponibili in {version}",
    perWeekShort: "{value}/sett.",
    starsShort: "{experience}★ esp. / {judgment}★ giu.",
    modelNote:
      "Il gioco non pubblica mai i suoi numeri reali. Questo è un modello trasparente tarato sul comportamento osservato — tutti i coefficienti stanno in {file} e si possono ricalibrare in un unico punto.",
    verdictBenchmark:
      "Il riferimento 5★/5★: circa {players} giocatori per leva, un tetto attorno a {ceiling} di potenziale e il {chance}% di probabilità di almeno un prospetto da 85+.",
    verdictStandard:
      "Aspettati circa {players} giocatori per leva con un tetto attorno a {ceiling} di potenziale. Probabilità di un gioiello da 85+: {chance}%.",
    advice: {
      judgment:
        "Un giudizio di {judgment}★ ti limita a circa {ceiling} di potenziale e lascia un report a ±{spread}★. Ogni stella di giudizio vale circa +{perStar} di potenziale.",
      experience:
        "Con {experience}★ di esperienza ottieni {perScout} giocatori per osservatore a stagione. Un osservatore con 5★ ne porta {best}.",
      region:
        "{region} ha un bias di potenziale di {bias}. Il Sud America è a +3 ed è da lì che arrivano i tetti oltre il 90.",
      facilities:
        "Strutture del vivaio sotto il livello Eccellenti ti costano circa 1,5 punti di valutazione iniziale per livello, ritardando di una stagione intera l'ingresso in prima squadra.",
      scouts:
        "Tre osservatori assegnati è il punto ottimale nella pratica — la dimensione della leva cresce in modo lineare con il numero di osservatori.",
      optimal:
        "Questa è la configurazione più redditizia del gioco. Tieni l'incarico attivo tutto l'anno e non richiamarli mai in anticipo.",
    },
    regens: {
      explainer:
        "Quando un giocatore reale si ritira, il gioco lo ripropone come giovane «regen» che mantiene {highlight}. Filtra la tua leva e la lista degli svincolati su questi cinque campi e il regen salta fuori da solo.",
      explainerHighlight: "nazionalità, ruolo, altezza, piede preferito e data di nascita esatta",
      allPositions: "Tutti i ruoli",
      retires: "Si ritira nel {season}",
      nation: "Nazione",
      birthday: "Compleanno",
      height: "Altezza",
      foot: "Piede",
      startOverall: "Valutazione iniziale",
      potential: "POT",
      whereToLook: "Dove cercarlo:",
      emptyTitle: "Nessun regen corrisponde a questa ricerca",
      emptyHint: "Cerca per nome della leggenda, nazione o ruolo.",
    },
  },

  onboarding: {
    open: "Guarda il tutorial",
    skip: "Salta",
    back: "Indietro",
    next: "Avanti",
    done: "Iniziamo",
    stepOf: "Passo {current} di {total}",
    steps: {
      welcome: {
        title: "Benvenuto su Career Hub",
        body: "Un database pensato solo per la Modalità Carriera di EA SPORTS FC: potenziale, curve di crescita, clausole rescissorie e tattiche di allenatori reali. Niente prezzi di Ultimate Team, niente pacchetti, niente rumore di mercato. Due minuti e ci prendi la mano.",
      },
      players: {
        title: "Trova il talento",
        body: "Ogni giocatore è ordinato per quanto vale come colpo in Modalità Carriera. VAL è quello che è oggi, POT è il suo tetto e +Δ è la crescita che stai comprando davvero. I filtri rapidi tirano fuori affari, gioielli nascosti, svincolati e contratti in scadenza con un tocco.",
      },
      tactics: {
        title: "Ruba la tattica di un allenatore",
        body: "Sistemi reali di Guardiola, Zidane, Alonso, Klopp e Simeone, ricostruiti con ruoli e cursori del gioco. Tocca il codice verde per copiarlo e incollalo in Tattiche › Tattiche della community dentro il gioco.",
      },
      squad: {
        title: "Pianifica la rosa e confronta",
        body: "Aggiungi giocatori al tuo piano: monte ingaggi, età media e crescita totale si aggiornano da soli. Il confronto mette fino a tre giocatori sullo stesso radar e sulla stessa curva, e mostra quanto ti costa davvero ogni punto di valutazione.",
      },
      scouts: {
        title: "Fai i conti del vivaio",
        body: "Calcola cosa rende una configurazione di scouting prima di dedicarle una stagione, e tieni d'occhio quali leggende in ritiro stanno per tornare come regen: filtra la tua leva per nazione, ruolo, altezza, piede e data di nascita.",
      },
      settings: {
        title: "Il tuo gioco, la tua lingua",
        body: "Passa tra FC 27, FC 26 e FC 25 in cima al menu e tutta l'app ricarica quel dataset; il selettore della lingua sta subito sotto. Una precisazione: i dati sono di esempio, scritti per questo progetto e non estratti dal gioco.",
      },
    },
  },

  toast: {
    copyFailedTitle: "Impossibile copiare negli appunti",
    copyFailedDescription:
      "Il browser ha bloccato l'accesso agli appunti — seleziona il codice e copialo a mano.",
  },
} satisfies Dictionary;
