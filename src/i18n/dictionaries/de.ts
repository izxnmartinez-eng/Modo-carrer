import type { Dictionary } from "./en";

export const de = {
  meta: {
    title: "Career Hub — EA SPORTS FC Karrieremodus-Datenbank",
    description:
      "Wunderkinder, Ausstiegsklauseln, Taktik-Codes echter Trainer, Kaderplanung und Nachwuchs-Mathematik für den Karrieremodus von EA SPORTS FC. Kein Ultimate Team.",
  },

  brand: {
    name: "CAREER HUB",
    tagline: "Nur Karrieremodus",
    disclaimer:
      "Beispieldatensatz zu Demonstrationszwecken. Wertungen, Marktwerte und Codes sind illustrativ und nicht aus dem Spiel ausgelesen.",
    disclaimerReal:
      "Die FC-26-Spielerdaten stammen aus einem öffentlichen Community-Datensatz ({source}). Wachstumstypen sind abgeleitet, nicht offiziell.",
  },

  nav: {
    sections: "Bereiche",
    mainNav: "Hauptnavigation",
    openMenu: "Navigation öffnen",
    closeMenu: "Navigation schließen",
    drawerDescription: "Wähle einen Bereich von Career Hub, die aktive Spielversion und die Sprache der Oberfläche.",
    items: {
      wonderkids: {
        label: "Wunderkinder & Juwelen",
        short: "Spieler",
        description: "Potenzial, Wachstum, Klauseln und Schnäppchen",
      },
      tactics: {
        label: "Taktik-Zentrale",
        short: "Taktik",
        description: "Systeme echter Trainer und Taktik-Codes",
      },
      squad: {
        label: "Kaderplaner",
        short: "Kader",
        description: "Gehaltsbudget, Altersstruktur, Wachstum",
      },
      compare: {
        label: "Spielervergleich",
        short: "Vergleich",
        description: "Radar, Wachstumskurven, Gehaltsverhältnis",
      },
      scouts: {
        label: "Scouts & Nachwuchs",
        short: "Scouts",
        description: "Nachwuchs-Rechner und Regen-Tracker",
      },
    },
  },

  search: {
    placeholder: "Spieler, Vereine, Positionen suchen…",
    label: "Spieler, Vereine und Positionen suchen",
    clear: "Suche zurücksetzen",
  },

  version: {
    label: "Spielversion",
    aria: "Spielversion: {version}",
    switchedTitle: "Gewechselt zu {version}",
    switchedDescription: "Datensatz {season} geladen — Spieler, Taktiken und Scouting aktualisiert.",
  },

  language: {
    label: "Sprache",
    aria: "Sprache der Oberfläche: {language}",
    switchedTitle: "Sprache auf {language} geändert",
    switchedDescription: "Die Oberfläche ist jetzt auf {language}. Version und Kaderplanung bleiben unverändert.",
  },

  common: {
    reset: "Zurücksetzen",
    any: "Beliebig",
    none: "Keine",
    all: "Alle",
    free: "Ablösefrei",
    freeAgent: "Vereinslos",
    noClub: "kein Verein",
    expired: "Abgelaufen",
    open: "Öffnen",
    viewing: "Geöffnet",
    close: "Schließen",
    dismiss: "Benachrichtigung schließen",
    notifications: "Benachrichtigungen",
    actions: "Aktionen",
    more: "Mehr",
    less: "Weniger",
    years: "{count} Jahre",
    ageShort: "{count} J.",
    monthsShort: "{count} Mon.",
    yearsShort: "{count} J.",
    yearsMonthsShort: "{years} J. {months} Mon.",
    perWeek: "/Wo.",
    moneyPattern: "{value}\u00A0€",
    compact: { thousand: "Tsd.", million: "Mio.", billion: "Mrd." },
    sliderMin: "{label} Minimum",
    sliderMax: "{label} Maximum",
    footed: "{foot} Fuß",
    foot: {
      Left: "Linker",
      Right: "Rechter",
    },
    positionGroups: {
      Goalkeeper: "Torwart",
      Defender: "Verteidiger",
      Midfielder: "Mittelfeldspieler",
      Attacker: "Stürmer",
    },
    positionGroupsPlural: {
      Goalkeeper: "Torhüter",
      Defender: "Verteidiger",
      Midfielder: "Mittelfeldspieler",
      Attacker: "Stürmer",
    },
  },

  playerActions: {
    scoutReport: "Scoutbericht",
    addToSquad: "Zum Kader hinzufügen",
    inSquad: "Im Kaderplan",
    addToSquadTitle: "Zum Kaderplan hinzufügen",
    removeFromSquadTitle: "Aus dem Kaderplan entfernen",
    compare: "Vergleichen",
    addToCompare: "Zum Vergleich hinzufügen",
    removeFromCompare: "Aus dem Vergleich entfernen",
    copyLink: "Link kopieren",
  },

  badges: {
    hiddenGem: "Geheimtipp",
    bargain: "Schnäppchen",
    freeAgent: "Vereinslos",
    expiring: "Vertrag läuft aus",
  },

  players: {
    eyebrow: "{version} · {season}",
    title: "Wunderkinder & Juwelen-Finder",
    description:
      "Alle Spieler des Datensatzes, sortiert danach, wie gut sie als Karrieremodus-Transfer sind — Potenzial, Wachstumskurve, Ausstiegsklausel und Gehaltslast, nicht der Ultimate-Team-Preis.",
    viewTable: "Tabelle",
    viewGrid: "Kacheln",
    filtersButton: "Filter",
    stats: {
      matching: "Passende Spieler",
      matchingHint: "von {total} im Datensatz",
      averageGrowth: "Durchschnittliches Wachstum",
      averageGrowthHint: "Potenzial minus Gesamtwertung",
      hiddenGems: "Geheimtipps",
      hiddenGemsHint: "POT über 82 und GES unter 68",
      cheapest: "Günstigster Treffer",
      cheapestEmpty: "Kein Spieler mit Marktwert in diesem Bereich",
    },
    presets: {
      bargains: "Schnäppchen",
      bargainsHint: "Viel Potenzial im Verhältnis zu Ablöse und Gehalt",
      hiddenGems: "Geheimtipps",
      hiddenGemsHint: "POT über 82 bei einer GES unter 68",
      freeAgents: "Vereinslose",
      freeAgentsHint: "Kein Verein, keine Ablöse",
      expiring: "Auslaufende Verträge (6 Monate)",
      expiringHint: "Ablösefreier Vorvertrag im Januar-Transferfenster",
    },
    emptyTitle: "Keine Spieler passen zu diesen Filtern",
    emptyHint:
      "Karrieremodus-Datensätze sind bewusst klein. Erweitere den Potenzialbereich, entferne einen Schnellfilter oder setze die Filter zurück, um die volle Liste zu sehen.",
    mobileFiltersDescription:
      "Grenze die Spielerdatenbank nach Alter, Wertung, Potenzial, Kosten und Vertragslage ein.",
    showPlayers: "{count} Spieler anzeigen",
    showMore: "Mehr anzeigen",
    showingCount: "{shown} von {total} angezeigt",
  },

  filters: {
    title: "Filter",
    age: "Alter",
    overall: "Gesamtwertung",
    potential: "Potenzial",
    growth: "Wachstum (+Δ)",
    maxValue: "Maximaler Marktwert",
    maxWage: "Maximales Wochengehalt",
    position: "Position",
    positionTitle: "Enthält Spieler, die auf {position} spielen können",
    releaseClause: "Ausstiegsklausel",
    hasClause: "Hat eine Klausel",
    expiryYear: "Vertragsende (Jahr)",
    upTo: "≤ {value}",
  },

  table: {
    player: "Spieler",
    age: "Alter",
    overall: "GES",
    potential: "POT",
    growth: "+Δ",
    value: "Marktwert",
    wage: "Gehalt",
    clause: "Klausel",
    contract: "Vertrag",
    score: "Wertung",
  },

  drawer: {
    overall: "Gesamtwertung",
    potential: "Potenzial",
    growth: "Wachstum",
    growthCurve: "Prognostizierte Wachstumskurve",
    nextSeason: "Ende der nächsten Saison:",
    nextSeasonValue: "{overall} GES",
    attributes: "Attribute",
    contractCost: "Vertrag & Kosten",
    transferValue: "Marktwert",
    weeklyWage: "Wochengehalt",
    releaseClauseRow: "Ausstiegsklausel",
    contractExpires: "Vertrag endet",
    costPerGrowth: "Kosten pro Wachstumspunkt",
    bargainScore: "Schnäppchen-Wertung",
    bargainScoreValue: "{score}/100",
    playStyles: "Spielstile",
    weakFoot: "Schwacher Fuß",
    skillMoves: "Skill-Moves",
    scoutReport: "Scoutbericht",
    linkCopiedTitle: "Spieler-Link kopiert",
    linkCopiedDescription: "{name} — öffnet direkt diesen Scoutbericht.",
  },

  growthTypes: {
    Explosive: {
      name: "Explosiv",
      note: "Riesige Sprünge zwischen 17 und 21, danach flach. Setz ihn sofort ein.",
    },
    Early: {
      name: "Früh",
      note: "Der Großteil des Wachstums kommt vor 23. Mit 24 kaufst du einen fertigen Spieler.",
    },
    Normal: {
      name: "Normal",
      note: "Gleichmäßige, planbare Zuwächse bis 25.",
    },
    Slow: {
      name: "Langsam",
      note: "Kleine jährliche Zuwächse, die aber bis 28 nicht abreißen.",
    },
    Late: {
      name: "Spät",
      note: "Fast nichts vor 23, dann ein steiler Anstieg bis 27. Verleihen und abwarten.",
    },
    Constant: {
      name: "Konstant",
      note: "Am Limit oder knapp darunter. Was du siehst, bekommst du.",
    },
  },

  tactics: {
    title: "Taktik-Zentrale & Trainer-Codes",
    description:
      "Legendäre und Meta-Systeme, nachgebaut mit den Rollen, Reglern und Anweisungen des Spiels. Kopiere den Code direkt in die Community-Taktiken.",
    allFormations: "Alle Formationen",
    emptyTitle: "Keine Taktik passt zu dieser Suche",
    emptyHint: "Versuch es mit einem Trainer (Guardiola, Alonso, Simeone), einem Verein oder einer Formation wie 3-2-4-1.",
    setup: "Taktische Einstellungen",
    buildUp: "Spielaufbau",
    attackingWidth: "Offensive Breite",
    playersInBox: "Im Strafraum",
    corners: "Ecken",
    freeKicks: "Freistöße",
    defensiveApproach: "Defensive Ausrichtung",
    defensiveWidth: "Defensive Breite",
    depth: "Höhe der Abwehrlinie",
    depthHighHint: "Hohe Linie — deine Innenverteidiger brauchen Tempo.",
    depthDeepHint: "Tiefer Block — du gibst den Ballbesitz bewusst ab.",
    depthMidHint: "Mittlerer Block.",
    keyInstructions: "Wichtigste Anweisungen",
    strengths: "Stärken",
    weaknesses: "Schwächen",
    recommended: "Wen du dafür verpflichten solltest",
    pitchHint: "Tippe auf eine Position auf dem Feld, um Rolle und Ausrichtung zu sehen.",
    focus: "Ausrichtung: {focus}",
    copiedTitle: "Taktik-Code kopiert",
    copiedDescription: "{manager} — {name}. Füge ihn im Spiel unter Taktik > Community-Taktiken ein.",
    difficulty: {
      "Plug & Play": "Sofort einsetzbar",
      Intermediate: "Fortgeschritten",
      Advanced: "Anspruchsvoll",
    },
    buildUpStyle: {
      Balanced: "Ausgeglichen",
      Counter: "Konter",
      "Short Passing": "Kurzpassspiel",
      "Long Ball": "Lange Bälle",
    },
    approach: {
      Balanced: "Ausgeglichen",
      Deep: "Tief",
      High: "Hoch",
      "Aggressive Press": "Aggressives Pressing",
    },
    roleFocus: {
      Defend: "Defensiv",
      Balanced: "Ausgeglichen",
      Attack: "Offensiv",
      Roaming: "Freie Rolle",
      "Build-Up": "Spielaufbau",
    },
  },

  squad: {
    title: "Kaderplaner",
    description:
      "Stelle eine Transferliste gegen ein echtes Gehaltsbudget zusammen und prüfe die Altersstruktur und das Wachstum, das du tatsächlich einkaufst.",
    clearPlan: "Plan leeren",
    budgetLabel: "Wöchentliches Gehaltsbudget",
    wageBill: "Gehaltslast",
    overBudget: "{amount} pro Woche über dem Budget.",
    size: "Kadergröße",
    sizeHint: "{value} Marktwert",
    averageAge: "Durchschnittsalter",
    ageYoung: "Junger Projektkader",
    ageBalanced: "Ausgewogene Altersstruktur",
    averageRating: "Durchschnittswertung",
    averageRatingHint: "Prognose {value} nächste Saison",
    totalGrowth: "Gesamtwachstum",
    totalGrowthHint: "Summe aller +Δ im Plan",
    cover: "Positionsabdeckung",
    coverShort: "{count} fehlen für einen vollen Kader",
    listTitle: "Spieler im Plan",
    addMore: "Weitere aus der Datenbank hinzufügen",
    removeAria: "{name} aus dem Kaderplan entfernen",
    emptyTitle: "Noch keine Spieler im Plan",
    emptyHint:
      "Füge Spieler aus der Wunderkinder-Datenbank hinzu — Gehaltslast, Durchschnittsalter und Gesamtwachstum aktualisieren sich sofort.",
    addedTitle: "{name} zum Kaderplan hinzugefügt",
    addedDescription: "Gehaltsbudget und Altersstruktur im Kaderplaner aktualisiert.",
    removedTitle: "{name} aus dem Kaderplan entfernt",
  },

  compare: {
    title: "Spielervergleich",
    description:
      "Attribut-Radare nebeneinander, Wachstumskurven auf einer Achse und die Gehalt-gegen-Leistung-Rechnung, die entscheidet, welches von zwei Wunderkindern du dir wirklich leisten kannst.",
    clear: "Vergleich leeren",
    addPlayer: "Spieler hinzufügen",
    searchPlaceholder: "Datenbank durchsuchen…",
    searchLabel: "Spieler für den Vergleich suchen",
    noMatches: "Kein Spieler passt zu dieser Suche.",
    removeAria: "{name} aus dem Vergleich entfernen",
    radarTitle: "Attribut-Radar",
    keeperNote:
      "Torhüter und Feldspieler nutzen unterschiedliche Kartenwerte und können sich daher kein Radar teilen. Vergleiche Torhüter mit Torhütern.",
    growthTitle: "Wachstumskurven",
    growthCaption:
      "Durchgezogene Linien sind die prognostizierte Wertung nach Alter; die gestrichelte Linie derselben Farbe ist das Potenzial-Limit des Spielers.",
    metric: "Kennzahl",
    emptyTitle: "Noch nichts ausgewählt",
    emptyHint:
      "Wähle bis zu drei Spieler — über die Suche oben oder den Vergleichs-Button in der Datenbank — um Radare, Wachstumskurven und Kostenverhältnisse zu überlagern.",
    addedTitle: "{name} zum Vergleich hinzugefügt",
    addedDescription: "Öffne den Spielervergleich, um die überlagerten Radare zu sehen.",
    addedDroppedDescription: "Der Vergleich fasst {max} Spieler — die älteste Auswahl wurde entfernt.",
    metrics: {
      overall: "Gesamtwertung",
      overallHint: "Aktuelle Wertung",
      potential: "Potenzial",
      potentialHint: "Karriere-Limit",
      growth: "Wachstum",
      growthHint: "Potenzial minus Gesamtwertung",
      age: "Alter",
      ageHint: "Verbleibende Wachstumssaisons",
      value: "Marktwert",
      valueHint: "Ausgangspunkt der Ablöseforderung",
      wage: "Wochengehalt",
      wageHint: "Dauerhafte Budgetbelastung",
      wagePerOverall: "Gehalt pro GES-Punkt",
      wagePerOverallHint: "Was dich jeder Wertungspunkt pro Woche kostet",
      feePerGrowth: "Ablöse pro Wachstumspunkt",
      feePerGrowthHint: "Was dich jeder künftige Wertungspunkt sofort kostet",
      bargainScore: "Schnäppchen-Wertung",
      bargainScoreHint: "Gesamtbewertung des Transfers von 100",
    },
  },

  scouts: {
    title: "Scout- & Nachwuchsrechner",
    description:
      "Rechne aus, was eine Scouting-Aufstellung wirklich einbringt, bevor du eine Saison darauf verwendest — und behalte im Blick, welche Legenden bald als Nachwuchsspieler zurückkommen.",
    tabsLabel: "Scouting-Werkzeuge",
    tabAcademy: "Nachwuchsrechner",
    tabRegens: "Regens & Pregens",
    scoutsAssigned: "Eingesetzte Scouts",
    experience: "Erfahrung",
    experienceHint:
      "Wie viele Spieler jeder Scout pro Saison meldet und wie schnell die ersten Berichte eintreffen.",
    judgment: "Urteilsvermögen",
    judgmentHint: "Wie genau die Sterne-Spanne ist und wie hoch das Potenzial sein darf, das er findet.",
    starsAria: "{label} {count} Sterne",
    region: "Scouting-Region",
    months: "Monate im Einsatz",
    monthsValue: "{count} Mon.",
    facilities: "Nachwuchseinrichtungen",
    facilityLevels: {
      1: "Einfach",
      2: "Gut",
      3: "Hervorragend",
    },
    benchmarkButton: "Referenzwert 5★ Erfahrung / 5★ Urteilsvermögen laden",
    playersPerIntake: "Spieler pro Jahrgang",
    playersPerIntakeHint: "Einsatz in {region}",
    potentialCeiling: "Potenzial-Limit",
    potentialCeilingHint: "Das Limit für {version} liegt bei {cap}",
    gemChance: "Chance auf ein 85+ Juwel",
    gemChanceHint: "Mindestens eines pro Jahrgang",
    cost: "Scouting-Kosten",
    costHint: "{count} Scouts",
    returnsTitle: "Was diese Aufstellung einbringt",
    typicalProspect: "Typisches Talent",
    reportSpread: "Berichtsspanne",
    firstReports: "Erste Berichte",
    improveTitle: "So verbesserst du sie",
    availableScouts: "Verfügbare Scouts in {version}",
    perWeekShort: "{value}/Wo.",
    starsShort: "{experience}★ Erf. / {judgment}★ Urt.",
    modelNote:
      "Das Spiel veröffentlicht seine echten Zahlen nie. Dies ist ein transparentes Modell, das an beobachtetes Verhalten angepasst wurde — alle Koeffizienten stehen in {file} und lassen sich an einer Stelle nachjustieren.",
    verdictBenchmark:
      "Der 5★/5★-Referenzwert: rund {players} Spieler pro Jahrgang, ein Limit um {ceiling} POT und eine Chance von {chance}%, mindestens ein Talent mit 85+ Potenzial zu bekommen.",
    verdictStandard:
      "Erwarte rund {players} Spieler pro Jahrgang mit einem Limit um {ceiling} POT. Chance auf ein Juwel mit 85+ Potenzial: {chance}%.",
    advice: {
      judgment:
        "{judgment}★ Urteilsvermögen begrenzt dich auf etwa {ceiling} POT und lässt einen Bericht mit ±{spread}★. Jeder Stern beim Urteilsvermögen ist rund +{perStar} Potenzial wert.",
      experience:
        "{experience}★ Erfahrung liefert {perScout} Spieler pro Scout und Saison. Ein Scout mit 5★ Erfahrung liefert {best}.",
      region:
        "{region} hat einen Potenzial-Bonus von {bias}. Südamerika liegt bei +3 und liefert die Limits jenseits der 90.",
      facilities:
        "Nachwuchseinrichtungen unterhalb von Hervorragend kosten dich pro Stufe etwa 1,5 Punkte Startwertung, was die Erstliga-Reife um eine ganze Saison verzögert.",
      scouts:
        "Drei eingesetzte Scouts sind der praktische Idealwert — die Jahrgangsgröße skaliert linear mit der Zahl der Scouts.",
      optimal:
        "Das ist die ertragreichste Aufstellung im Spiel. Lass den Einsatz ganzjährig laufen und rufe die Scouts nie vorzeitig zurück.",
    },
    regens: {
      explainer:
        "Wenn ein echter Spieler zurücktritt, gibt ihn das Spiel als jugendlichen „Regen“ neu aus, der seine {highlight} behält. Filtere deinen Jahrgang und den Markt der Vereinslosen nach diesen fünf Feldern, und der Regen fällt von selbst heraus.",
      explainerHighlight: "Nationalität, Position, Größe, Schussfuß und exaktes Geburtsdatum",
      allPositions: "Alle Positionen",
      retires: "Tritt {season} zurück",
      nation: "Nation",
      birthday: "Geburtstag",
      height: "Größe",
      foot: "Fuß",
      startOverall: "Start-GES",
      potential: "POT",
      whereToLook: "Wo du suchen musst:",
      emptyTitle: "Kein Regen passt zu dieser Suche",
      emptyHint: "Suche nach dem Namen der Legende, der Nation oder der Position.",
    },
  },

  onboarding: {
    open: "Tour ansehen",
    skip: "Überspringen",
    back: "Zurück",
    next: "Weiter",
    done: "Los geht's",
    stepOf: "Schritt {current} von {total}",
    steps: {
      welcome: {
        title: "Willkommen bei Career Hub",
        body: "Eine Datenbank nur für den Karrieremodus von EA SPORTS FC: Potenzial, Wachstumskurven, Ausstiegsklauseln und Taktiken echter Trainer. Keine Ultimate-Team-Preise, keine Packs, kein Marktrauschen. Zwei Minuten und du findest dich zurecht.",
      },
      players: {
        title: "Finde das Wunderkind",
        body: "Jeder Spieler ist danach sortiert, wie gut er als Karrieremodus-Transfer ist. GES ist das, was er heute kann, POT sein Limit und +Δ das Wachstum, das du tatsächlich einkaufst. Die Schnellfilter zeigen Schnäppchen, Geheimtipps, Vereinslose und auslaufende Verträge mit einem Tipp.",
      },
      tactics: {
        title: "Klau dir die Taktik eines Trainers",
        body: "Echte Systeme von Guardiola, Zidane, Alonso, Klopp und Simeone, nachgebaut mit den Rollen und Reglern des Spiels. Tippe auf den grünen Code, um ihn zu kopieren, und füge ihn im Spiel unter Taktik › Community-Taktiken ein.",
      },
      squad: {
        title: "Kader planen, Optionen vergleichen",
        body: "Füge Spieler zu deinem Plan hinzu — Gehaltslast, Durchschnittsalter und Gesamtwachstum aktualisieren sich sofort. Der Vergleich legt bis zu drei Spieler auf ein Radar und eine Wachstumskurve und zeigt, was dich jeder Wertungspunkt wirklich kostet.",
      },
      scouts: {
        title: "Rechne den Nachwuchs durch",
        body: "Finde heraus, was eine Scouting-Aufstellung einbringt, bevor du eine Saison darauf verwendest, und behalte im Blick, welche Legenden bald als Regens zurückkommen — filtere deinen Jahrgang nach Nation, Position, Größe, Fuß und Geburtstag.",
      },
      settings: {
        title: "Dein Spiel, deine Sprache",
        body: "Wechsle oben im Menü zwischen FC 27, FC 26 und FC 25 — die ganze App lädt diesen Datensatz neu; die Sprachauswahl steht direkt darunter. Ein Hinweis: Die Daten sind Beispieldaten für dieses Projekt, nicht aus dem Spiel ausgelesen.",
      },
    },
  },

  toast: {
    copyFailedTitle: "Kopieren in die Zwischenablage fehlgeschlagen",
    copyFailedDescription:
      "Dein Browser hat den Zugriff auf die Zwischenablage blockiert — markiere den Code und kopiere ihn manuell.",
  },
} satisfies Dictionary;
