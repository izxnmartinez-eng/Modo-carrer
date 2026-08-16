import type { Dictionary } from "./en";

export const pt = {
  meta: {
    title: "Career Hub — Base de dados do Modo Carreira do EA SPORTS FC",
    description:
      "Joias, cláusulas de rescisão, códigos táticos de treinadores reais, planejamento de elenco e cálculos de base para o Modo Carreira do EA SPORTS FC. Sem Ultimate Team.",
  },

  brand: {
    name: "CAREER HUB",
    tagline: "Só Modo Carreira",
    disclaimer:
      "Conjunto de dados de exemplo para demonstração. Overalls, valores e códigos são ilustrativos e não foram extraídos do jogo.",
    disclaimerReal:
      "Os dados de jogadores do FC 26 vêm de um conjunto de dados público da comunidade ({source}). Os tipos de evolução são deduzidos, não oficiais.",
  },

  nav: {
    sections: "Seções",
    mainNav: "Navegação principal",
    openMenu: "Abrir o menu",
    closeMenu: "Fechar o menu",
    drawerDescription: "Escolha uma seção do Career Hub, a versão do jogo ativa e o idioma da interface.",
    items: {
      wonderkids: {
        label: "Joias e promessas",
        short: "Jogadores",
        description: "Potencial, evolução, cláusulas e pechinchas",
      },
      tactics: {
        label: "Central tática",
        short: "Táticas",
        description: "Sistemas de treinadores reais e códigos",
      },
      squad: {
        label: "Planejador de elenco",
        short: "Elenco",
        description: "Orçamento salarial, idade média, evolução",
      },
      compare: {
        label: "Comparador de jogadores",
        short: "Comparar",
        description: "Radar, curvas de evolução, custo-benefício",
      },
      scouts: {
        label: "Observadores e base",
        short: "Observadores",
        description: "Cálculo da base e rastreador de regens",
      },
    },
  },

  search: {
    placeholder: "Buscar jogadores, clubes, posições…",
    label: "Buscar jogadores, clubes e posições",
    clear: "Limpar a busca",
  },

  version: {
    label: "Versão do jogo",
    aria: "Versão do jogo: {version}",
    switchedTitle: "Alterado para {version}",
    switchedDescription: "Dados de {season} carregados — jogadores, táticas e observação atualizados.",
  },

  language: {
    label: "Idioma",
    aria: "Idioma da interface: {language}",
    switchedTitle: "Idioma alterado para {language}",
    switchedDescription: "A interface agora está em {language}. Sua versão e seus elencos não mudaram.",
  },

  common: {
    reset: "Redefinir",
    any: "Qualquer",
    none: "Nenhuma",
    all: "Tudo",
    free: "Grátis",
    freeAgent: "Sem contrato",
    noClub: "sem clube",
    expired: "Vencido",
    open: "Abrir",
    viewing: "Visualizando",
    close: "Fechar",
    dismiss: "Dispensar a notificação",
    notifications: "Notificações",
    actions: "Ações",
    more: "Mais",
    less: "Menos",
    years: "{count} anos",
    ageShort: "{count} a",
    monthsShort: "{count} m",
    yearsShort: "{count} a",
    yearsMonthsShort: "{years}a {months}m",
    perWeek: "/sem",
    moneyPattern: "€\u00A0{value}",
    compact: { thousand: "mil", million: "mi", billion: "bi" },
    sliderMin: "{label} mínimo",
    sliderMax: "{label} máximo",
    footed: "Pé {foot}",
    foot: {
      Left: "esquerdo",
      Right: "direito",
    },
    positionGroups: {
      Goalkeeper: "Goleiro",
      Defender: "Defensor",
      Midfielder: "Meio-campista",
      Attacker: "Atacante",
    },
    positionGroupsPlural: {
      Goalkeeper: "Goleiros",
      Defender: "Defensores",
      Midfielder: "Meio-campistas",
      Attacker: "Atacantes",
    },
  },

  playerActions: {
    scoutReport: "Relatório de observação",
    addToSquad: "Adicionar ao elenco",
    inSquad: "No plano de elenco",
    addToSquadTitle: "Adicionar ao plano de elenco",
    removeFromSquadTitle: "Remover do plano de elenco",
    compare: "Comparar",
    addToCompare: "Adicionar à comparação",
    removeFromCompare: "Remover da comparação",
    copyLink: "Copiar o link",
  },

  badges: {
    hiddenGem: "Joia escondida",
    bargain: "Pechincha",
    freeAgent: "Sem contrato",
    expiring: "Contrato acabando",
  },

  players: {
    eyebrow: "{version} · {season}",
    title: "Joias e caça-promessas",
    description:
      "Todos os jogadores da base ordenados por quão boa é a contratação no Modo Carreira — potencial, curva de evolução, cláusula de rescisão e peso salarial, não o preço no Ultimate Team.",
    viewTable: "Tabela",
    viewGrid: "Grade",
    filtersButton: "Filtros",
    stats: {
      matching: "Jogadores encontrados",
      matchingHint: "de {total} na base",
      averageGrowth: "Evolução média",
      averageGrowthHint: "Potencial menos overall",
      hiddenGems: "Joias escondidas",
      hiddenGemsHint: "POT acima de 82 e OVR abaixo de 68",
      cheapest: "Mais barato",
      cheapestEmpty: "Nenhum jogador com valor nessa faixa",
    },
    presets: {
      bargains: "Pechinchas",
      bargainsHint: "Muito potencial em relação ao preço e ao salário",
      hiddenGems: "Joias escondidas",
      hiddenGemsHint: "POT acima de 82 com overall abaixo de 68",
      freeAgents: "Sem contrato",
      freeAgentsHint: "Sem clube e sem custo de transferência",
      expiring: "Contrato acabando (6 meses)",
      expiringHint: "Pré-contrato de graça na janela de janeiro",
    },
    emptyTitle: "Nenhum jogador corresponde a esses filtros",
    emptyHint:
      "As bases do Modo Carreira são pequenas de propósito. Amplie a faixa de potencial, tire um filtro rápido ou redefina os filtros para ver a lista completa.",
    mobileFiltersDescription:
      "Refine a base de jogadores por idade, overall, potencial, custo e situação contratual.",
    showPlayers: "Ver {count} jogadores",
    showMore: "Ver mais",
    showingCount: "Mostrando {shown} de {total}",
  },

  filters: {
    title: "Filtros",
    age: "Idade",
    overall: "Overall",
    potential: "Potencial",
    growth: "Evolução (+Δ)",
    maxValue: "Valor de mercado máximo",
    maxWage: "Salário semanal máximo",
    position: "Posição",
    positionTitle: "Inclui jogadores que podem atuar de {position}",
    releaseClause: "Cláusula de rescisão",
    hasClause: "Tem cláusula",
    expiryYear: "Ano de fim do contrato",
    upTo: "≤ {value}",
  },

  table: {
    player: "Jogador",
    age: "Idade",
    overall: "OVR",
    potential: "POT",
    growth: "+Δ",
    value: "Valor",
    wage: "Salário",
    clause: "Cláusula",
    contract: "Contrato",
    score: "Nota",
  },

  drawer: {
    overall: "Overall",
    potential: "Potencial",
    growth: "Evolução",
    growthCurve: "Curva de evolução prevista",
    nextSeason: "Fim da próxima temporada:",
    nextSeasonValue: "{overall} de overall",
    attributes: "Atributos",
    contractCost: "Contrato e custo",
    transferValue: "Valor de mercado",
    weeklyWage: "Salário semanal",
    releaseClauseRow: "Cláusula de rescisão",
    contractExpires: "Fim do contrato",
    costPerGrowth: "Custo por ponto de evolução",
    bargainScore: "Nota de pechincha",
    bargainScoreValue: "{score}/100",
    playStyles: "Estilos de jogo",
    weakFoot: "Perna ruim",
    skillMoves: "Dribles",
    scoutReport: "Relatório de observação",
    linkCopiedTitle: "Link do jogador copiado",
    linkCopiedDescription: "{name} — abre direto neste relatório de observação.",
  },

  growthTypes: {
    Explosive: {
      name: "Explosiva",
      note: "Saltos enormes entre os 17 e os 21 anos e depois estagna. Bota pra jogar já.",
    },
    Early: {
      name: "Precoce",
      note: "Quase toda a evolução vem antes dos 23. Comprar aos 24 é comprar um jogador pronto.",
    },
    Normal: {
      name: "Normal",
      note: "Ganhos constantes e previsíveis até os 25 anos.",
    },
    Slow: {
      name: "Lenta",
      note: "Ganhos pequenos por ano, mas que continuam até os 28.",
    },
    Late: {
      name: "Tardia",
      note: "Quase nada antes dos 23 e depois uma subida forte até os 27. Empreste e espere.",
    },
    Constant: {
      name: "Constante",
      note: "No teto ou muito perto dele. O que você vê é o que você leva.",
    },
  },

  tactics: {
    title: "Central tática e códigos de treinadores",
    description:
      "Sistemas lendários e meta reconstruídos com as funções, controles e instruções do jogo. Copie o código direto para as Táticas da comunidade.",
    allFormations: "Todas as formações",
    emptyTitle: "Nenhuma tática corresponde a essa busca",
    emptyHint: "Tente um treinador (Guardiola, Alonso, Simeone), um clube ou uma formação como 3-2-4-1.",
    setup: "Configuração tática",
    buildUp: "Construção",
    attackingWidth: "Amplitude ofensiva",
    playersInBox: "Na área",
    corners: "Escanteios",
    freeKicks: "Faltas",
    defensiveApproach: "Postura defensiva",
    defensiveWidth: "Amplitude defensiva",
    depth: "Altura da linha defensiva",
    depthHighHint: "Linha alta — seus zagueiros precisam de velocidade.",
    depthDeepHint: "Bloco baixo — você vai ceder a posse de propósito.",
    depthMidHint: "Bloco médio.",
    keyInstructions: "Instruções principais",
    strengths: "Pontos fortes",
    weaknesses: "Pontos fracos",
    recommended: "Quem contratar para isso",
    pitchHint: "Toque em qualquer posição do campo para ver a função e a postura.",
    focus: "Postura: {focus}",
    copiedTitle: "Código tático copiado",
    copiedDescription: "{manager} — {name}. Cole em Táticas > Táticas da comunidade dentro do jogo.",
    difficulty: {
      "Plug & Play": "Pronto para usar",
      Intermediate: "Intermediário",
      Advanced: "Avançado",
    },
    buildUpStyle: {
      Balanced: "Equilibrada",
      Counter: "Contra-ataque",
      "Short Passing": "Passes curtos",
      "Long Ball": "Bola longa",
    },
    approach: {
      Balanced: "Equilibrada",
      Deep: "Recuada",
      High: "Adiantada",
      "Aggressive Press": "Pressão agressiva",
    },
    roleFocus: {
      Defend: "Defensiva",
      Balanced: "Equilibrada",
      Attack: "Ofensiva",
      Roaming: "Livre",
      "Build-Up": "Construção",
    },
  },

  squad: {
    title: "Planejador de elenco",
    description:
      "Monte uma lista de alvos contra um orçamento salarial real e confira o perfil de idade e a evolução total que você está comprando de verdade.",
    clearPlan: "Limpar o plano",
    budgetLabel: "Orçamento salarial semanal",
    wageBill: "Folha salarial",
    overBudget: "Você estourou o orçamento em {amount} por semana.",
    size: "Tamanho do elenco",
    sizeHint: "{value} em valor de mercado",
    averageAge: "Idade média",
    ageYoung: "Elenco jovem de projeto",
    ageBalanced: "Perfil de idade equilibrado",
    averageRating: "Overall médio",
    averageRatingHint: "Previsão de {value} na próxima temporada",
    totalGrowth: "Evolução total",
    totalGrowthHint: "Soma de todos os +Δ do plano",
    cover: "Cobertura por setor",
    coverShort: "Faltam {count} para um elenco completo",
    listTitle: "Jogadores no plano",
    addMore: "Adicionar mais pela base de dados",
    removeAria: "Remover {name} do plano de elenco",
    emptyTitle: "Ainda não há jogadores no plano",
    emptyHint:
      "Adicione jogadores pela base de joias — a folha salarial, a idade média e a evolução total se atualizam na hora.",
    addedTitle: "{name} adicionado ao plano de elenco",
    addedDescription: "Orçamento salarial e perfil de idade atualizados no planejador.",
    removedTitle: "{name} removido do plano de elenco",
  },

  compare: {
    title: "Comparador de jogadores",
    description:
      "Radares de atributos lado a lado, curvas de evolução no mesmo eixo e a conta de salário versus rendimento que decide qual das duas joias você realmente consegue pagar.",
    clear: "Limpar a comparação",
    addPlayer: "Adicionar um jogador",
    searchPlaceholder: "Buscar na base de dados…",
    searchLabel: "Buscar um jogador para comparar",
    noMatches: "Nenhum jogador corresponde a essa busca.",
    removeAria: "Remover {name} da comparação",
    radarTitle: "Radar de atributos",
    keeperNote:
      "Goleiros e jogadores de linha usam estatísticas diferentes, então não podem dividir o mesmo radar. Compare goleiros com goleiros.",
    growthTitle: "Curvas de evolução",
    growthCaption:
      "As linhas cheias são o overall previsto por idade; a linha tracejada da mesma cor é o teto de potencial daquele jogador.",
    metric: "Métrica",
    emptyTitle: "Nada selecionado ainda",
    emptyHint:
      "Escolha até três jogadores — pela busca acima ou pelo botão de comparar na base — para sobrepor radares, curvas de evolução e relações de custo.",
    addedTitle: "{name} adicionado à comparação",
    addedDescription: "Abra a aba do comparador para ver os radares sobrepostos.",
    addedDroppedDescription: "A comparação aceita {max} jogadores — a seleção mais antiga foi removida.",
    metrics: {
      overall: "Overall",
      overallHint: "Overall atual",
      potential: "Potencial",
      potentialHint: "Teto da carreira",
      growth: "Evolução",
      growthHint: "Potencial menos overall",
      age: "Idade",
      ageHint: "Temporadas de evolução restantes",
      value: "Valor de mercado",
      valueHint: "Base do preço pedido",
      wage: "Salário semanal",
      wageHint: "Impacto contínuo no orçamento",
      wagePerOverall: "Salário por ponto de overall",
      wagePerOverallHint: "Quanto cada ponto de overall custa por semana",
      feePerGrowth: "Preço por ponto de evolução",
      feePerGrowthHint: "Quanto cada ponto futuro de overall custa à vista",
      bargainScore: "Nota de pechincha",
      bargainScoreHint: "Nota geral da contratação de 0 a 100",
    },
  },

  scouts: {
    title: "Calculadora de observadores e base",
    description:
      "Calcule o que uma configuração de observação realmente rende antes de gastar uma temporada nela — e acompanhe quais lendas prestes a se aposentar vão reaparecer na sua base.",
    tabsLabel: "Ferramentas de observação",
    tabAcademy: "Calculadora da base",
    tabRegens: "Regens e pregens",
    scoutsAssigned: "Observadores designados",
    experience: "Experiência",
    experienceHint:
      "Quantos jogadores cada observador reporta por temporada e com que rapidez chegam os primeiros relatórios.",
    judgment: "Julgamento",
    judgmentHint: "O quanto a faixa de estrelas é precisa e até que potencial ele consegue encontrar.",
    starsAria: "{label} {count} estrelas",
    region: "Região de observação",
    months: "Meses de missão",
    monthsValue: "{count} meses",
    facilities: "Instalações da base",
    facilityLevels: {
      1: "Básicas",
      2: "Boas",
      3: "Excelentes",
    },
    benchmarkButton: "Carregar a referência de 5★ de experiência / 5★ de julgamento",
    playersPerIntake: "Jogadores por safra",
    playersPerIntakeHint: "Missão em {region}",
    potentialCeiling: "Teto de potencial",
    potentialCeilingHint: "O teto do {version} é {cap}",
    gemChance: "Chance de uma joia 85+",
    gemChanceHint: "Pelo menos uma por safra",
    cost: "Custo da observação",
    costHint: "{count} observadores",
    returnsTitle: "O que essa configuração rende",
    typicalProspect: "Promessa típica",
    reportSpread: "Margem do relatório",
    firstReports: "Primeiros relatórios",
    improveTitle: "Como melhorar",
    availableScouts: "Observadores disponíveis no {version}",
    perWeekShort: "{value}/sem",
    starsShort: "{experience}★ exp / {judgment}★ jul",
    modelNote:
      "O jogo nunca publica os números reais. Este é um modelo transparente ajustado ao comportamento observado — todos os coeficientes estão em {file} e podem ser recalibrados em um só lugar.",
    verdictBenchmark:
      "A referência 5★/5★: cerca de {players} jogadores por safra, teto em torno de {ceiling} de potencial e {chance}% de chance de pelo menos uma promessa de 85+.",
    verdictStandard:
      "Espere cerca de {players} jogadores por safra com teto em torno de {ceiling} de potencial. Chance de uma joia de 85+: {chance}%.",
    advice: {
      judgment:
        "Julgamento {judgment}★ limita você a cerca de {ceiling} de potencial e deixa um relatório de ±{spread}★. Cada estrela de julgamento vale mais ou menos +{perStar} de potencial.",
      experience:
        "Experiência {experience}★ rende {perScout} jogadores por observador por temporada. Um observador com 5★ rende {best}.",
      region:
        "{region} tem um viés de potencial de {bias}. A América do Sul está em +3 e é de lá que saem os tetos acima de 90.",
      facilities:
        "Instalações abaixo de Excelentes custam cerca de 1,5 ponto de overall inicial por nível, o que atrasa em uma temporada inteira a chegada ao time principal.",
      scouts:
        "Três observadores designados é o ponto ideal na prática — o tamanho da safra cresce de forma linear com o número de observadores.",
      optimal:
        "Essa é a configuração de maior retorno do jogo. Mantenha a missão rodando o ano todo e nunca chame os observadores de volta antes da hora.",
    },
    regens: {
      explainer:
        "Quando um jogador real se aposenta, o jogo o reedita como um garoto “regen” que mantém {highlight}. Filtre a sua safra e a lista de jogadores sem contrato por esses cinco campos e o regen aparece sozinho.",
      explainerHighlight: "a nacionalidade, a posição, a altura, a perna boa e a data de nascimento exata",
      allPositions: "Todas as posições",
      retires: "Se aposenta em {season}",
      nation: "País",
      birthday: "Aniversário",
      height: "Altura",
      foot: "Perna",
      startOverall: "Overall inicial",
      potential: "POT",
      whereToLook: "Onde procurar:",
      emptyTitle: "Nenhum regen corresponde a essa busca",
      emptyHint: "Busque pelo nome da lenda, país ou posição.",
    },
  },

  onboarding: {
    open: "Ver o tutorial",
    skip: "Pular",
    back: "Voltar",
    next: "Avançar",
    done: "Começar",
    stepOf: "Passo {current} de {total}",
    steps: {
      welcome: {
        title: "Bem-vindo ao Career Hub",
        body: "Uma base de dados feita só para o Modo Carreira do EA SPORTS FC: potencial, curvas de evolução, cláusulas de rescisão e táticas de treinadores reais. Sem preços de Ultimate Team, sem pacotes, sem barulho de mercado. Em dois minutos você se vira.",
      },
      players: {
        title: "Ache a joia",
        body: "Cada jogador é ordenado por quão boa é a contratação no Modo Carreira. OVR é o que ele é hoje, POT é o teto dele e +Δ é a evolução que você está comprando de verdade. Os filtros rápidos mostram pechinchas, joias escondidas, jogadores sem contrato e contratos acabando em um toque.",
      },
      tactics: {
        title: "Roube a tática de um treinador",
        body: "Sistemas reais de Guardiola, Zidane, Alonso, Klopp e Simeone, reconstruídos com as funções e controles do jogo. Toque no código verde para copiar e cole em Táticas › Táticas da comunidade dentro do jogo.",
      },
      squad: {
        title: "Planeje o elenco e compare",
        body: "Adicione jogadores ao seu plano: folha salarial, idade média e evolução total se atualizam sozinhas. O comparador coloca até três jogadores no mesmo radar e na mesma curva, e mostra quanto cada ponto de overall custa de verdade.",
      },
      scouts: {
        title: "Faça as contas da base",
        body: "Calcule o que uma configuração de observação rende antes de gastar uma temporada nela, e acompanhe quais lendas prestes a se aposentar vão voltar como regens: filtre a sua safra por país, posição, altura, perna e data de nascimento.",
      },
      settings: {
        title: "Seu jogo, seu idioma",
        body: "Troque entre FC 27, FC 26 e FC 25 no topo do menu e o app todo recarrega aquele conjunto de dados; o seletor de idioma fica logo abaixo. Um aviso: os dados são de exemplo, escritos para este projeto, e não extraídos do jogo.",
      },
    },
  },

  toast: {
    copyFailedTitle: "Não foi possível copiar para a área de transferência",
    copyFailedDescription:
      "Seu navegador bloqueou o acesso à área de transferência — selecione o código e copie manualmente.",
  },
} satisfies Dictionary;
