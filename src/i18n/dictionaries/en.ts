/**
 * English dictionary — the source of truth for the shape of every other locale.
 *
 * `Dictionary` is derived from this object, and every other locale file is
 * declared `satisfies Dictionary`, so a missing or misspelled key fails the
 * build rather than silently rendering an English string at runtime.
 *
 * Strings containing `{placeholders}` are rendered through `fmt()`.
 */
export const en = {
  meta: {
    title: "Career Hub — EA SPORTS FC Career Mode Database",
    description:
      "Wonderkids, release clauses, real manager tactical codes, squad planning and youth academy maths for EA SPORTS FC Career Mode. No Ultimate Team.",
  },

  brand: {
    name: "CAREER HUB",
    tagline: "Career Mode only",
    disclaimer:
      "Sample dataset for demonstration. Ratings, values and share codes are illustrative, not scraped from the game.",
  },

  nav: {
    sections: "Sections",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    drawerDescription: "Choose a section of Career Hub, the active game version and the interface language.",
    items: {
      wonderkids: {
        label: "Wonderkids & Gems",
        description: "Potential, growth, clauses and bargains",
      },
      tactics: {
        label: "Tactical Hub",
        description: "Real manager systems and share codes",
      },
      squad: {
        label: "Squad Planner",
        description: "Wage budget, age profile, growth",
      },
      compare: {
        label: "Player Comparison",
        description: "Radar, growth overlay, wage ratio",
      },
      scouts: {
        label: "Scouts & Academy",
        description: "Intake maths and regen tracker",
      },
    },
  },

  search: {
    placeholder: "Search players, clubs, positions…",
    label: "Search players, clubs and positions",
    clear: "Clear search",
  },

  version: {
    label: "Game version",
    aria: "Game version: {version}",
    switchedTitle: "Switched to {version}",
    switchedDescription: "{season} dataset loaded — players, tactics and scouting updated.",
  },

  language: {
    label: "Language",
    aria: "Interface language: {language}",
    switchedTitle: "Language changed to {language}",
    switchedDescription: "The interface is now in {language}. Your version and squad plans are unchanged.",
  },

  common: {
    reset: "Reset",
    any: "Any",
    none: "None",
    all: "All",
    free: "Free",
    freeAgent: "Free agent",
    noClub: "no club",
    expired: "Expired",
    open: "Open",
    viewing: "Viewing",
    close: "Close",
    dismiss: "Dismiss notification",
    notifications: "Notifications",
    actions: "Actions",
    years: "{count} years",
    ageShort: "{count}y",
    monthsShort: "{count} mo",
    yearsShort: "{count} yr",
    yearsMonthsShort: "{years}y {months}m",
    perWeek: "/wk",
    moneyPattern: "€{value}",
    compact: { thousand: "K", million: "M", billion: "B" },
    sliderMin: "{label} minimum",
    sliderMax: "{label} maximum",
    footed: "{foot} footed",
    foot: {
      Left: "Left",
      Right: "Right",
    },
    positionGroups: {
      Goalkeeper: "Goalkeeper",
      Defender: "Defender",
      Midfielder: "Midfielder",
      Attacker: "Attacker",
    },
    positionGroupsPlural: {
      Goalkeeper: "Goalkeepers",
      Defender: "Defenders",
      Midfielder: "Midfielders",
      Attacker: "Attackers",
    },
  },

  playerActions: {
    scoutReport: "Scout report",
    addToSquad: "Add to squad",
    inSquad: "In squad plan",
    addToSquadTitle: "Add to squad plan",
    removeFromSquadTitle: "Remove from squad plan",
    compare: "Compare",
    addToCompare: "Add to comparison",
    removeFromCompare: "Remove from comparison",
    copyLink: "Copy share link",
  },

  badges: {
    hiddenGem: "Hidden gem",
    bargain: "Bargain",
    freeAgent: "Free agent",
    expiring: "Expiring",
  },

  players: {
    eyebrow: "{version} · {season}",
    title: "Wonderkids & Gem Finder",
    description:
      "Every player in the dataset ranked by how good a Career Mode signing he is — potential, growth curve, release clause and wage burden, not Ultimate Team price.",
    viewTable: "Table",
    viewGrid: "Grid",
    filtersButton: "Filters",
    stats: {
      matching: "Matching players",
      matchingHint: "of {total} in the dataset",
      averageGrowth: "Average growth",
      averageGrowthHint: "Potential minus overall",
      hiddenGems: "Hidden gems",
      hiddenGemsHint: "POT above 82 and OVR under 68",
      cheapest: "Cheapest match",
      cheapestEmpty: "No priced player in range",
    },
    presets: {
      bargains: "Bargains",
      bargainsHint: "High potential relative to fee and wage",
      hiddenGems: "Hidden gems",
      hiddenGemsHint: "POT above 82 with OVR under 68",
      freeAgents: "Free agents",
      freeAgentsHint: "No club, no transfer fee",
      expiring: "Expiring (6 months)",
      expiringHint: "Free pre-contract in the January window",
    },
    emptyTitle: "No players match those filters",
    emptyHint:
      "Career Mode datasets are small by design. Widen the potential range, clear a preset, or reset the filters to see the full board.",
    mobileFiltersDescription: "Narrow the player database by age, rating, potential, cost and contract status.",
    showPlayers: "Show {count} players",
  },

  filters: {
    title: "Filters",
    age: "Age",
    overall: "Overall",
    potential: "Potential",
    growth: "Growth (+Δ)",
    maxValue: "Max transfer value",
    maxWage: "Max weekly wage",
    position: "Position",
    positionTitle: "Includes players who can play {position}",
    releaseClause: "Release clause",
    hasClause: "Has a clause",
    expiryYear: "Contract expiry year",
    upTo: "≤ {value}",
  },

  table: {
    player: "Player",
    age: "Age",
    overall: "OVR",
    potential: "POT",
    growth: "+Δ",
    value: "Value",
    wage: "Wage",
    clause: "Clause",
    contract: "Contract",
    score: "Score",
  },

  drawer: {
    overall: "Overall",
    potential: "Potential",
    growth: "Growth",
    growthCurve: "Projected growth curve",
    nextSeason: "End of next season:",
    nextSeasonValue: "{overall} OVR",
    attributes: "Attributes",
    contractCost: "Contract & cost",
    transferValue: "Transfer value",
    weeklyWage: "Weekly wage",
    releaseClauseRow: "Release clause",
    contractExpires: "Contract expires",
    costPerGrowth: "Cost per growth point",
    bargainScore: "Bargain score",
    bargainScoreValue: "{score}/100",
    playStyles: "PlayStyles",
    weakFoot: "Weak foot",
    skillMoves: "Skills",
    scoutReport: "Scout report",
    linkCopiedTitle: "Player link copied",
    linkCopiedDescription: "{name} — opens straight to this scout report.",
  },

  growthTypes: {
    Explosive: {
      name: "Explosive",
      note: "Huge jumps between 17 and 21, then flat. Play him immediately.",
    },
    Early: {
      name: "Early",
      note: "Most of the growth lands before 23. Buying at 24 means buying a finished player.",
    },
    Normal: {
      name: "Normal",
      note: "Steady, predictable gains through to 25.",
    },
    Slow: {
      name: "Slow",
      note: "Small annual gains that keep coming until 28.",
    },
    Late: {
      name: "Late",
      note: "Almost nothing before 23, then a steep climb to 27. Loan him out and wait.",
    },
    Constant: {
      name: "Constant",
      note: "At or near his ceiling. What you see is what you get.",
    },
  },

  tactics: {
    title: "Tactical Hub & Manager Codes",
    description:
      "Legendary and meta managerial systems rebuilt with in-game roles, sliders and instructions. Copy the share code straight into Community Tactics.",
    allFormations: "All formations",
    emptyTitle: "No tactics match that search",
    emptyHint: "Try a manager name (Guardiola, Alonso, Simeone), a club, or a formation like 3-2-4-1.",
    setup: "Tactical setup",
    buildUp: "Build-up",
    attackingWidth: "Attacking width",
    playersInBox: "In box",
    corners: "Corners",
    freeKicks: "Free kicks",
    defensiveApproach: "Defensive approach",
    defensiveWidth: "Defensive width",
    depth: "Defensive line depth",
    depthHighHint: "High line — your centre-backs need pace.",
    depthDeepHint: "Deep block — you will concede possession by design.",
    depthMidHint: "Mid block.",
    keyInstructions: "Key instructions",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    recommended: "Who to sign for it",
    pitchHint: "Tap any position on the pitch to see its role and focus.",
    focus: "Focus: {focus}",
    copiedTitle: "Tactical code copied",
    copiedDescription: "{manager} — {name}. Paste it into the in-game Tactics > Community Tactics screen.",
    difficulty: {
      "Plug & Play": "Plug & Play",
      Intermediate: "Intermediate",
      Advanced: "Advanced",
    },
    buildUpStyle: {
      Balanced: "Balanced",
      Counter: "Counter",
      "Short Passing": "Short Passing",
      "Long Ball": "Long Ball",
    },
    approach: {
      Balanced: "Balanced",
      Deep: "Deep",
      High: "High",
      "Aggressive Press": "Aggressive Press",
    },
    roleFocus: {
      Defend: "Defend",
      Balanced: "Balanced",
      Attack: "Attack",
      Roaming: "Roaming",
      "Build-Up": "Build-Up",
    },
  },

  squad: {
    title: "Squad Planner",
    description:
      "Build a shortlist against a real wage budget, then check the age profile and the total growth you are actually buying.",
    clearPlan: "Clear plan",
    budgetLabel: "Weekly wage budget",
    wageBill: "Wage bill",
    overBudget: "Over budget by {amount} per week.",
    size: "Squad size",
    sizeHint: "{value} of transfer value",
    averageAge: "Average age",
    ageYoung: "Young project squad",
    ageBalanced: "Balanced age profile",
    averageRating: "Average rating",
    averageRatingHint: "Projected {value} next season",
    totalGrowth: "Total growth",
    totalGrowthHint: "Sum of every +Δ in the plan",
    cover: "Positional cover",
    coverShort: "{count} short of a full squad",
    listTitle: "Players in the plan",
    addMore: "Add more from the database",
    removeAria: "Remove {name} from the squad plan",
    emptyTitle: "No players in the plan yet",
    emptyHint:
      "Add players from the Wonderkids database — the wage bill, average age and total growth update as you go.",
    addedTitle: "{name} added to squad plan",
    addedDescription: "Wage budget and age profile updated in the Squad Planner.",
    removedTitle: "{name} removed from squad plan",
  },

  compare: {
    title: "Player Comparison",
    description:
      "Side-by-side attribute radars, growth curves on one axis, and the wage-versus-performance maths that decides which of two wonderkids you can actually afford.",
    clear: "Clear comparison",
    addPlayer: "Add a player",
    searchPlaceholder: "Search the database…",
    searchLabel: "Search for a player to compare",
    noMatches: "No players match that search.",
    removeAria: "Remove {name} from the comparison",
    radarTitle: "Attribute radar",
    keeperNote:
      "Goalkeepers and outfield players use different card stats, so they can't share one radar. Compare keepers against keepers.",
    growthTitle: "Growth curves",
    growthCaption:
      "Solid lines are projected overall by age; the dashed line of the same colour is that player's potential ceiling.",
    metric: "Metric",
    emptyTitle: "Nothing selected yet",
    emptyHint:
      "Pick up to three players — from the search above or the compare button in the database — to overlay their radars, growth curves and cost ratios.",
    addedTitle: "{name} added to comparison",
    addedDescription: "Open the Player Comparison tab to see the radar overlay.",
    addedDroppedDescription: "The comparison holds {max} players — the oldest selection was dropped.",
    metrics: {
      overall: "Overall",
      overallHint: "Current rating",
      potential: "Potential",
      potentialHint: "Career ceiling",
      growth: "Growth",
      growthHint: "Potential minus overall",
      age: "Age",
      ageHint: "Seasons of growth left",
      value: "Transfer value",
      valueHint: "Asking price baseline",
      wage: "Weekly wage",
      wageHint: "Ongoing budget hit",
      wagePerOverall: "Wage per OVR point",
      wagePerOverallHint: "What each rating point costs you every week",
      feePerGrowth: "Fee per growth point",
      feePerGrowthHint: "What each future rating point costs up front",
      bargainScore: "Bargain score",
      bargainScoreHint: "Composite signing rating out of 100",
    },
  },

  scouts: {
    title: "Scouts & Academy Calculator",
    description:
      "Work out what a scouting setup actually returns before you spend a season on it — then track which retiring legends are about to reappear in your youth intake.",
    tabsLabel: "Scouting tools",
    tabAcademy: "Academy calculator",
    tabRegens: "Regens & pregens",
    scoutsAssigned: "Scouts assigned",
    experience: "Experience",
    experienceHint: "How many players each scout reports back per season, and how quickly the first reports arrive.",
    judgment: "Judgment",
    judgmentHint: "How accurate the star range is, and how high the potential he is allowed to find goes.",
    starsAria: "{label} {count} stars",
    region: "Scouting region",
    months: "Months on assignment",
    monthsValue: "{count} mo",
    facilities: "Youth facilities",
    facilityLevels: {
      1: "Basic",
      2: "Good",
      3: "Excellent",
    },
    benchmarkButton: "Load the 5★ experience / 5★ judgment benchmark",
    playersPerIntake: "Players per intake",
    playersPerIntakeHint: "{region} assignment",
    potentialCeiling: "Potential ceiling",
    potentialCeilingHint: "Cap for {version} is {cap}",
    gemChance: "Chance of an 85+ gem",
    gemChanceHint: "At least one per intake",
    cost: "Scouting cost",
    costHint: "{count} scouts",
    returnsTitle: "What this setup returns",
    typicalProspect: "Typical prospect",
    reportSpread: "Report spread",
    firstReports: "First reports",
    improveTitle: "How to improve it",
    availableScouts: "Scouts available in {version}",
    perWeekShort: "{value}/wk",
    starsShort: "{experience}★ exp / {judgment}★ jdg",
    modelNote:
      "The engine never publishes its real numbers. This is a transparent model fitted to observed behaviour — every coefficient lives in {file} and can be re-tuned in one place.",
    verdictBenchmark:
      "The 5★/5★ benchmark: ~{players} players per intake, ceiling around {ceiling} POT, and a {chance}% chance of at least one 85+ potential prospect.",
    verdictStandard:
      "Expect ~{players} players per intake with a ceiling around {ceiling} POT. Chance of an 85+ potential gem: {chance}%.",
    advice: {
      judgment:
        "Judgment {judgment}★ caps you at ~{ceiling} POT and leaves a ±{spread}★ report. Every judgment star is worth roughly +{perStar} potential.",
      experience:
        "Experience {experience}★ returns {perScout} players per scout per season. A 5★ experience scout returns {best}.",
      region:
        "{region} carries a {bias} potential bias. South America is +3 and is where the 90+ ceilings come from.",
      facilities:
        "Youth facilities below Excellent cost you roughly 1.5 starting overall per level, which delays first-team readiness by a full season.",
      scouts: "Three assigned scouts is the practical sweet spot — intake size scales linearly with scout count.",
      optimal:
        "This is the maximum-value setup in the game. Keep the assignment running year-round and never recall early.",
    },
    regens: {
      explainer:
        "When a real player retires, the engine reissues him as a youth “regen” who keeps his {highlight}. Filter your youth intake and the free-agent pool on those five fields and the regen falls out of the list.",
      explainerHighlight: "nationality, position, height, preferred foot and exact birthday",
      allPositions: "All positions",
      retires: "Retires {season}",
      nation: "Nation",
      birthday: "Birthday",
      height: "Height",
      foot: "Foot",
      startOverall: "Start OVR",
      potential: "POT",
      whereToLook: "Where to look:",
      emptyTitle: "No regens match that search",
      emptyHint: "Search by legend name, nation, or position.",
    },
  },

  toast: {
    copyFailedTitle: "Couldn't copy to clipboard",
    copyFailedDescription: "Your browser blocked clipboard access — select the code and copy it manually.",
  },
};

/**
 * The shape every locale must satisfy.
 *
 * Note the deliberate absence of `as const`: leaves widen to `string`, so other
 * locales must supply the same *keys* without being forced to the same *values*.
 */
export type Dictionary = typeof en;
