import type { Dictionary } from "./en";

export const fr = {
  meta: {
    title: "Career Hub — Base de données Mode Carrière EA SPORTS FC",
    description:
      "Pépites, clauses libératoires, codes tactiques d'entraîneurs réels, planification d'effectif et calculs de centre de formation pour le Mode Carrière d'EA SPORTS FC. Sans Ultimate Team.",
  },

  brand: {
    name: "CAREER HUB",
    tagline: "Mode Carrière uniquement",
    disclaimer:
      "Jeu de données d'exemple à but de démonstration. Les notes, valeurs et codes sont illustratifs et non extraits du jeu.",
  },

  nav: {
    sections: "Sections",
    openMenu: "Ouvrir la navigation",
    closeMenu: "Fermer la navigation",
    drawerDescription: "Choisis une section de Career Hub, la version du jeu active et la langue de l'interface.",
    items: {
      wonderkids: {
        label: "Pépites & joyaux",
        description: "Potentiel, progression, clauses et bonnes affaires",
      },
      tactics: {
        label: "Pôle tactique",
        description: "Systèmes d'entraîneurs réels et codes de partage",
      },
      squad: {
        label: "Planificateur d'effectif",
        description: "Budget salarial, âge moyen, progression",
      },
      compare: {
        label: "Comparateur de joueurs",
        description: "Radar, courbes de progression, ratio salarial",
      },
      scouts: {
        label: "Recruteurs & formation",
        description: "Calculs de promotion et suivi des regens",
      },
    },
  },

  search: {
    placeholder: "Rechercher joueurs, clubs, postes…",
    label: "Rechercher des joueurs, des clubs et des postes",
    clear: "Effacer la recherche",
  },

  version: {
    label: "Version du jeu",
    aria: "Version du jeu : {version}",
    switchedTitle: "Passage à {version}",
    switchedDescription: "Données {season} chargées — joueurs, tactiques et recrutement mis à jour.",
  },

  language: {
    label: "Langue",
    aria: "Langue de l'interface : {language}",
    switchedTitle: "Langue changée en {language}",
    switchedDescription: "L'interface est maintenant en {language}. Ta version et tes effectifs sont inchangés.",
  },

  common: {
    reset: "Réinitialiser",
    any: "Indifférent",
    none: "Aucune",
    all: "Tout",
    free: "Libre",
    freeAgent: "Agent libre",
    noClub: "sans club",
    expired: "Expiré",
    open: "Ouvrir",
    viewing: "Affiché",
    close: "Fermer",
    dismiss: "Fermer la notification",
    notifications: "Notifications",
    actions: "Actions",
    more: "Plus",
    less: "Moins",
    years: "{count} ans",
    ageShort: "{count} ans",
    monthsShort: "{count} mois",
    yearsShort: "{count} ans",
    yearsMonthsShort: "{years} a {months} m",
    perWeek: "/sem.",
    moneyPattern: "{value}\u00A0€",
    compact: { thousand: "K", million: "M", billion: "Md" },
    sliderMin: "{label} minimum",
    sliderMax: "{label} maximum",
    footed: "Pied {foot}",
    foot: {
      Left: "gauche",
      Right: "droit",
    },
    positionGroups: {
      Goalkeeper: "Gardien",
      Defender: "Défenseur",
      Midfielder: "Milieu",
      Attacker: "Attaquant",
    },
    positionGroupsPlural: {
      Goalkeeper: "Gardiens",
      Defender: "Défenseurs",
      Midfielder: "Milieux",
      Attacker: "Attaquants",
    },
  },

  playerActions: {
    scoutReport: "Rapport de recrutement",
    addToSquad: "Ajouter à l'effectif",
    inSquad: "Dans l'effectif",
    addToSquadTitle: "Ajouter au plan d'effectif",
    removeFromSquadTitle: "Retirer du plan d'effectif",
    compare: "Comparer",
    addToCompare: "Ajouter à la comparaison",
    removeFromCompare: "Retirer de la comparaison",
    copyLink: "Copier le lien",
  },

  badges: {
    hiddenGem: "Pépite cachée",
    bargain: "Bonne affaire",
    freeAgent: "Agent libre",
    expiring: "Fin de contrat",
  },

  players: {
    eyebrow: "{version} · {season}",
    title: "Pépites & détecteur de joyaux",
    description:
      "Tous les joueurs de la base classés selon la qualité de la recrue en Mode Carrière — potentiel, courbe de progression, clause libératoire et poids salarial, pas le prix Ultimate Team.",
    viewTable: "Tableau",
    viewGrid: "Grille",
    filtersButton: "Filtres",
    stats: {
      matching: "Joueurs trouvés",
      matchingHint: "sur {total} dans la base",
      averageGrowth: "Progression moyenne",
      averageGrowthHint: "Potentiel moins note globale",
      hiddenGems: "Pépites cachées",
      hiddenGemsHint: "POT au-dessus de 82 et NOT en dessous de 68",
      cheapest: "Le moins cher",
      cheapestEmpty: "Aucun joueur valorisé dans cette plage",
    },
    presets: {
      bargains: "Bonnes affaires",
      bargainsHint: "Beaucoup de potentiel au regard du prix et du salaire",
      hiddenGems: "Pépites cachées",
      hiddenGemsHint: "POT au-dessus de 82 avec une note sous 68",
      freeAgents: "Agents libres",
      freeAgentsHint: "Sans club, sans indemnité de transfert",
      expiring: "Fin de contrat (6 mois)",
      expiringHint: "Pré-contrat gratuit lors du mercato de janvier",
    },
    emptyTitle: "Aucun joueur ne correspond à ces filtres",
    emptyHint:
      "Les bases Mode Carrière sont volontairement petites. Élargis la plage de potentiel, retire un filtre rapide ou réinitialise pour revoir toute la liste.",
    mobileFiltersDescription:
      "Affine la base de joueurs par âge, note, potentiel, coût et situation contractuelle.",
    showPlayers: "Voir {count} joueurs",
  },

  filters: {
    title: "Filtres",
    age: "Âge",
    overall: "Note globale",
    potential: "Potentiel",
    growth: "Progression (+Δ)",
    maxValue: "Valeur de transfert max.",
    maxWage: "Salaire hebdomadaire max.",
    position: "Poste",
    positionTitle: "Inclut les joueurs capables de jouer {position}",
    releaseClause: "Clause libératoire",
    hasClause: "Possède une clause",
    expiryYear: "Année de fin de contrat",
    upTo: "≤ {value}",
  },

  table: {
    player: "Joueur",
    age: "Âge",
    overall: "NOT",
    potential: "POT",
    growth: "+Δ",
    value: "Valeur",
    wage: "Salaire",
    clause: "Clause",
    contract: "Contrat",
    score: "Score",
  },

  drawer: {
    overall: "Note globale",
    potential: "Potentiel",
    growth: "Progression",
    growthCurve: "Courbe de progression prévue",
    nextSeason: "Fin de la saison prochaine :",
    nextSeasonValue: "{overall} de note",
    attributes: "Attributs",
    contractCost: "Contrat & coût",
    transferValue: "Valeur de transfert",
    weeklyWage: "Salaire hebdomadaire",
    releaseClauseRow: "Clause libératoire",
    contractExpires: "Fin de contrat",
    costPerGrowth: "Coût par point de progression",
    bargainScore: "Score de bonne affaire",
    bargainScoreValue: "{score}/100",
    playStyles: "Styles de jeu",
    weakFoot: "Mauvais pied",
    skillMoves: "Gestes techniques",
    scoutReport: "Rapport de recrutement",
    linkCopiedTitle: "Lien du joueur copié",
    linkCopiedDescription: "{name} — ouvre directement ce rapport de recrutement.",
  },

  growthTypes: {
    Explosive: {
      name: "Explosive",
      note: "Des bonds énormes entre 17 et 21 ans, puis plus rien. Fais-le jouer tout de suite.",
    },
    Early: {
      name: "Précoce",
      note: "L'essentiel de la progression arrive avant 23 ans. L'acheter à 24, c'est acheter un joueur fini.",
    },
    Normal: {
      name: "Normale",
      note: "Des gains réguliers et prévisibles jusqu'à 25 ans.",
    },
    Slow: {
      name: "Lente",
      note: "De petits gains annuels, mais qui continuent jusqu'à 28 ans.",
    },
    Late: {
      name: "Tardive",
      note: "Presque rien avant 23 ans, puis une montée brutale jusqu'à 27. Prête-le et attends.",
    },
    Constant: {
      name: "Constante",
      note: "À son plafond ou tout proche. Ce que tu vois est ce que tu auras.",
    },
  },

  tactics: {
    title: "Pôle tactique & codes d'entraîneurs",
    description:
      "Des systèmes légendaires et méta reconstruits avec les rôles, curseurs et consignes du jeu. Copie le code directement dans les Tactiques de la communauté.",
    allFormations: "Toutes les formations",
    emptyTitle: "Aucune tactique ne correspond à cette recherche",
    emptyHint: "Essaie un entraîneur (Guardiola, Alonso, Simeone), un club ou une formation comme 3-2-4-1.",
    setup: "Réglages tactiques",
    buildUp: "Construction",
    attackingWidth: "Largeur offensive",
    playersInBox: "Dans la surface",
    corners: "Corners",
    freeKicks: "Coups francs",
    defensiveApproach: "Approche défensive",
    defensiveWidth: "Largeur défensive",
    depth: "Hauteur de la ligne défensive",
    depthHighHint: "Ligne haute — tes défenseurs centraux ont besoin de vitesse.",
    depthDeepHint: "Bloc bas — tu laisses volontairement la possession.",
    depthMidHint: "Bloc médian.",
    keyInstructions: "Consignes clés",
    strengths: "Points forts",
    weaknesses: "Points faibles",
    recommended: "Qui recruter pour ce système",
    pitchHint: "Touche un poste sur le terrain pour voir son rôle et son orientation.",
    focus: "Orientation : {focus}",
    copiedTitle: "Code tactique copié",
    copiedDescription: "{manager} — {name}. Colle-le dans Tactiques > Tactiques de la communauté.",
    difficulty: {
      "Plug & Play": "Prêt à l'emploi",
      Intermediate: "Intermédiaire",
      Advanced: "Avancé",
    },
    buildUpStyle: {
      Balanced: "Équilibrée",
      Counter: "Contre-attaque",
      "Short Passing": "Passes courtes",
      "Long Ball": "Jeu long",
    },
    approach: {
      Balanced: "Équilibrée",
      Deep: "Bloc bas",
      High: "Bloc haut",
      "Aggressive Press": "Pressing agressif",
    },
    roleFocus: {
      Defend: "Défensif",
      Balanced: "Équilibré",
      Attack: "Offensif",
      Roaming: "Libre",
      "Build-Up": "Construction",
    },
  },

  squad: {
    title: "Planificateur d'effectif",
    description:
      "Construis une liste de recrues face à un vrai budget salarial, puis vérifie la pyramide des âges et la progression totale que tu achètes réellement.",
    clearPlan: "Vider le plan",
    budgetLabel: "Budget salarial hebdomadaire",
    wageBill: "Masse salariale",
    overBudget: "Dépassement de {amount} par semaine.",
    size: "Taille de l'effectif",
    sizeHint: "{value} de valeur de transfert",
    averageAge: "Âge moyen",
    ageYoung: "Effectif jeune en projet",
    ageBalanced: "Pyramide des âges équilibrée",
    averageRating: "Note moyenne",
    averageRatingHint: "Prévision de {value} la saison prochaine",
    totalGrowth: "Progression totale",
    totalGrowthHint: "Somme de tous les +Δ du plan",
    cover: "Couverture par poste",
    coverShort: "Il en manque {count} pour un effectif complet",
    listTitle: "Joueurs dans le plan",
    addMore: "Ajouter d'autres joueurs depuis la base",
    removeAria: "Retirer {name} du plan d'effectif",
    emptyTitle: "Aucun joueur dans le plan pour l'instant",
    emptyHint:
      "Ajoute des joueurs depuis la base des pépites — la masse salariale, l'âge moyen et la progression totale se mettent à jour au fil de l'eau.",
    addedTitle: "{name} ajouté au plan d'effectif",
    addedDescription: "Budget salarial et pyramide des âges mis à jour dans le planificateur.",
    removedTitle: "{name} retiré du plan d'effectif",
  },

  compare: {
    title: "Comparateur de joueurs",
    description:
      "Radars d'attributs côte à côte, courbes de progression sur un même axe et le calcul salaire/rendement qui décide laquelle de deux pépites tu peux vraiment t'offrir.",
    clear: "Vider la comparaison",
    addPlayer: "Ajouter un joueur",
    searchPlaceholder: "Rechercher dans la base…",
    searchLabel: "Rechercher un joueur à comparer",
    noMatches: "Aucun joueur ne correspond à cette recherche.",
    removeAria: "Retirer {name} de la comparaison",
    radarTitle: "Radar d'attributs",
    keeperNote:
      "Les gardiens et les joueurs de champ n'utilisent pas les mêmes statistiques et ne peuvent donc pas partager un radar. Compare les gardiens entre eux.",
    growthTitle: "Courbes de progression",
    growthCaption:
      "Les traits pleins sont la note prévue selon l'âge ; la ligne pointillée de la même couleur est le plafond de potentiel du joueur.",
    metric: "Indicateur",
    emptyTitle: "Rien de sélectionné pour l'instant",
    emptyHint:
      "Choisis jusqu'à trois joueurs — via la recherche ci-dessus ou le bouton de comparaison dans la base — pour superposer leurs radars, leurs courbes et leurs ratios de coût.",
    addedTitle: "{name} ajouté à la comparaison",
    addedDescription: "Ouvre l'onglet Comparateur pour voir les radars superposés.",
    addedDroppedDescription: "La comparaison contient {max} joueurs — la plus ancienne sélection a été retirée.",
    metrics: {
      overall: "Note globale",
      overallHint: "Note actuelle",
      potential: "Potentiel",
      potentialHint: "Plafond de carrière",
      growth: "Progression",
      growthHint: "Potentiel moins note globale",
      age: "Âge",
      ageHint: "Saisons de progression restantes",
      value: "Valeur de transfert",
      valueHint: "Base du prix demandé",
      wage: "Salaire hebdomadaire",
      wageHint: "Impact continu sur le budget",
      wagePerOverall: "Salaire par point de note",
      wagePerOverallHint: "Ce que chaque point de note te coûte chaque semaine",
      feePerGrowth: "Indemnité par point de progression",
      feePerGrowthHint: "Ce que chaque point de note futur te coûte immédiatement",
      bargainScore: "Score de bonne affaire",
      bargainScoreHint: "Note globale de la recrue sur 100",
    },
  },

  scouts: {
    title: "Calculateur de recrutement & de formation",
    description:
      "Calcule ce que rapporte vraiment une configuration de recrutement avant d'y consacrer une saison — puis suis les légendes bientôt retraitées qui vont réapparaître dans ta formation.",
    tabsLabel: "Outils de recrutement",
    tabAcademy: "Calculateur de formation",
    tabRegens: "Regens & pregens",
    scoutsAssigned: "Recruteurs affectés",
    experience: "Expérience",
    experienceHint:
      "Combien de joueurs chaque recruteur remonte par saison, et la rapidité des premiers rapports.",
    judgment: "Jugement",
    judgmentHint: "La précision de la fourchette d'étoiles et le potentiel maximum qu'il peut trouver.",
    starsAria: "{label} {count} étoiles",
    region: "Région de prospection",
    months: "Mois d'affectation",
    monthsValue: "{count} mois",
    facilities: "Infrastructures de formation",
    facilityLevels: {
      1: "Basiques",
      2: "Bonnes",
      3: "Excellentes",
    },
    benchmarkButton: "Charger la référence 5★ expérience / 5★ jugement",
    playersPerIntake: "Joueurs par promotion",
    playersPerIntakeHint: "Affectation en {region}",
    potentialCeiling: "Plafond de potentiel",
    potentialCeilingHint: "Le plafond de {version} est {cap}",
    gemChance: "Chance d'une pépite 85+",
    gemChanceHint: "Au moins une par promotion",
    cost: "Coût du recrutement",
    costHint: "{count} recruteurs",
    returnsTitle: "Ce que rapporte cette configuration",
    typicalProspect: "Espoir type",
    reportSpread: "Marge du rapport",
    firstReports: "Premiers rapports",
    improveTitle: "Comment l'améliorer",
    availableScouts: "Recruteurs disponibles dans {version}",
    perWeekShort: "{value}/sem.",
    starsShort: "{experience}★ exp. / {judgment}★ jug.",
    modelNote:
      "Le jeu ne publie jamais ses vrais chiffres. Ceci est un modèle transparent calé sur le comportement observé — tous les coefficients sont dans {file} et se règlent au même endroit.",
    verdictBenchmark:
      "La référence 5★/5★ : environ {players} joueurs par promotion, un plafond autour de {ceiling} de potentiel et {chance}% de chances d'obtenir au moins un espoir à 85+.",
    verdictStandard:
      "Attends-toi à environ {players} joueurs par promotion avec un plafond autour de {ceiling} de potentiel. Chance d'une pépite à 85+ : {chance}%.",
    advice: {
      judgment:
        "Un jugement de {judgment}★ te limite à environ {ceiling} de potentiel et laisse un rapport à ±{spread}★. Chaque étoile de jugement vaut environ +{perStar} de potentiel.",
      experience:
        "Une expérience de {experience}★ rapporte {perScout} joueurs par recruteur et par saison. Un recruteur 5★ en rapporte {best}.",
      region:
        "{region} applique un biais de potentiel de {bias}. L'Amérique du Sud est à +3 et c'est de là que viennent les plafonds au-dessus de 90.",
      facilities:
        "Des infrastructures inférieures à Excellentes te coûtent environ 1,5 point de note de départ par niveau, ce qui retarde d'une saison entière l'intégration en équipe première.",
      scouts:
        "Trois recruteurs affectés est l'optimum en pratique — la taille de la promotion évolue linéairement avec le nombre de recruteurs.",
      optimal:
        "C'est la configuration la plus rentable du jeu. Laisse l'affectation tourner toute l'année et ne rappelle jamais tes recruteurs en avance.",
    },
    regens: {
      explainer:
        "Quand un joueur réel prend sa retraite, le jeu le réédite en jeune « regen » qui conserve sa {highlight}. Filtre ta promotion et le marché des agents libres sur ces cinq champs et le regen ressort tout seul.",
      explainerHighlight: "nationalité, son poste, sa taille, son pied fort et sa date de naissance exacte",
      allPositions: "Tous les postes",
      retires: "Prend sa retraite en {season}",
      nation: "Nation",
      birthday: "Anniversaire",
      height: "Taille",
      foot: "Pied",
      startOverall: "Note de départ",
      potential: "POT",
      whereToLook: "Où chercher :",
      emptyTitle: "Aucun regen ne correspond à cette recherche",
      emptyHint: "Cherche par nom de légende, nation ou poste.",
    },
  },

  onboarding: {
    open: "Voir le tutoriel",
    skip: "Passer",
    back: "Retour",
    next: "Suivant",
    done: "C'est parti",
    stepOf: "Étape {current} sur {total}",
    steps: {
      welcome: {
        title: "Bienvenue sur Career Hub",
        body: "Une base de données pensée uniquement pour le Mode Carrière d'EA SPORTS FC : potentiel, courbes de progression, clauses libératoires et tactiques d'entraîneurs réels. Pas de prix Ultimate Team, pas de packs, pas de bruit de marché. Deux minutes et tu seras à l'aise.",
      },
      players: {
        title: "Trouve la pépite",
        body: "Chaque joueur est classé selon la qualité de la recrue en Mode Carrière. NOT est son niveau actuel, POT son plafond, et +Δ la progression que tu achètes vraiment. Les filtres rapides sortent les bonnes affaires, les pépites cachées, les agents libres et les fins de contrat en un geste.",
      },
      tactics: {
        title: "Pique la tactique d'un entraîneur",
        body: "Des systèmes réels de Guardiola, Zidane, Alonso, Klopp et Simeone, reconstruits avec les rôles et curseurs du jeu. Touche le code vert pour le copier, puis colle-le dans Tactiques › Tactiques de la communauté.",
      },
      squad: {
        title: "Planifie l'effectif, compare les options",
        body: "Ajoute des joueurs à ton plan : masse salariale, âge moyen et progression totale se mettent à jour au fil de l'eau. Le comparateur place jusqu'à trois joueurs sur un même radar et une même courbe, et montre ce que coûte réellement chaque point de note.",
      },
      scouts: {
        title: "Fais les calculs du centre de formation",
        body: "Calcule ce que rapporte une configuration de recrutement avant d'y passer une saison, et suis les légendes bientôt retraitées qui vont revenir en regens — filtre ta promotion par nation, poste, taille, pied et date de naissance.",
      },
      settings: {
        title: "Ton jeu, ta langue",
        body: "Bascule entre FC 27, FC 26 et FC 25 en haut du menu et toute l'appli recharge ce jeu de données ; le sélecteur de langue est juste en dessous. À savoir : les données sont des exemples écrits pour ce projet, pas extraites du jeu.",
      },
    },
  },

  toast: {
    copyFailedTitle: "Impossible de copier dans le presse-papiers",
    copyFailedDescription:
      "Ton navigateur a bloqué l'accès au presse-papiers — sélectionne le code et copie-le manuellement.",
  },
} satisfies Dictionary;
