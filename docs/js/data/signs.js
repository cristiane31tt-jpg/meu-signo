/* =====================================================================
   MEU SIGNO - Conteudo dos 12 signos
   ---------------------------------------------------------------------
   Este e o UNICO arquivo que voce precisa editar para mudar textos,
   periodos, cores ou caracteristicas do app.

   Campos de cada signo:
     id          -> identificador interno (usado na URL: #/signos/aries)
     name        -> nome exibido
     symbol      -> simbolo unicode (texto)
     glyph       -> glifo em SVG (traco, herda a cor via currentColor)
     from / to   -> [mes, dia] do periodo (base da data de nascimento)
     period      -> periodo em texto, para as telas
     element     -> Fogo | Terra | Ar | Agua
     modality    -> Cardinal | Fixo | Mutavel
     polarity    -> Yang | Yin
     ruler       -> planeta regente (tradicao astrologica)
     color       -> cor de destaque do signo no app
     tagline     -> frase curta de identidade
     description -> texto geral (1 paragrafo)
     traits      -> principais caracteristicas
     strengths   -> pontos fortes
     attention   -> pontos de atencao

   Editar textos = alterar apenas as strings. Nao e preciso mexer em CSS
   nem em JavaScript para atualizar o conteudo.
   ===================================================================== */

(function (global) {
  'use strict';

  var SIGNS = [
    {
      id: 'aries',
      name: 'Áries',
      symbol: '♈',
      glyph:
        '<path d="M6 20.5V13c0-3.6 1.4-5.8 3.2-5.8 1.7 0 2.4 1.8 2.8 3.5"/>' +
        '<path d="M18 20.5V13c0-3.6-1.4-5.8-3.2-5.8-1.7 0-2.4 1.8-2.8 3.5"/>' +
        '<path d="M12 10.7v9.8"/>',
      from: [3, 21],
      to: [4, 19],
      period: '21 de março a 19 de abril',
      element: 'Fogo',
      modality: 'Cardinal',
      polarity: 'Yang',
      ruler: 'Marte',
      color: '#ff6b57',
      tagline: 'A centelha que começa tudo.',
      description:
        'Áries é o signo da iniciativa. Você age antes de pensar demais, encara o que precisa ser encarado e não costuma recuar diante de um desafio. Funciona melhor quando existe um objetivo claro à vista.',
      traits: [
        'Decisivo e direto ao ponto',
        'Corajoso diante de riscos',
        'Iniciativa e velocidade de reação',
        'Honesto, às vezes sem filtro'
      ],
      strengths: [
        'Age rápido quando a situação exige',
        'Não se deixa levar por hesitação',
        'Recupera energia em cada novo começo'
      ],
      attention: [
        'Pode atropelar detalhes e pessoas',
        'A impaciência gera atrito desnecessário',
        'Perde interesse quando o trabalho fica monótono'
      ]
    },
    {
      id: 'taurus',
      name: 'Touro',
      symbol: '♉',
      glyph:
        '<circle cx="12" cy="15.4" r="4.4"/>' +
        '<path d="M7.6 9.1C6.5 7.9 6.1 6.5 6.1 5.1c2 .3 3.4 1.5 4 3.2"/>' +
        '<path d="M16.4 9.1c1.1-1.2 1.5-2.6 1.5-4-2 .3-3.4 1.5-4 3.2"/>',
      from: [4, 20],
      to: [5, 20],
      period: '20 de abril a 20 de maio',
      element: 'Terra',
      modality: 'Fixo',
      polarity: 'Yin',
      ruler: 'Vênus',
      color: '#4ec98f',
      tagline: 'O que tem valor, você constrói devagar.',
      description:
        'Touro valoriza estabilidade acima de tudo. Você constrói resultados que duram, apoiado no concreto e no conforto. Boa notícia: raramente larga aquilo que começou.',
      traits: [
        'Calmo, prático e difícil de apressar',
        'Sensível ao prazer e ao conforto',
        'Fiel a pessoas e a decisões',
        'Olho prático para dinheiro e recursos'
      ],
      strengths: [
        'Persistência que leva o trabalho até o fim',
        'Confiabilidade em qualquer compromisso',
        'Senso de equilíbrio e cuidado com o essencial'
      ],
      attention: [
        'Rigidez e resistência a mudanças',
        'Pode se apegar demais a pessoas ou rotinas',
        'Adia decisões para evitar risco'
      ]
    },
    {
      id: 'geminis',
      name: 'Gêmeos',
      symbol: '♊',
      glyph:
        '<path d="M9 4.2v15.6"/><path d="M15 4.2v15.6"/>' +
        '<path d="M7 4.2h10"/><path d="M7 19.8h10"/>',
      from: [5, 21],
      to: [6, 20],
      period: '21 de maio a 20 de junho',
      element: 'Ar',
      modality: 'Mutável',
      polarity: 'Yang',
      ruler: 'Mercúrio',
      color: '#f2c94c',
      tagline: 'A curiosidade não para.',
      description:
        'Gêmeos é o signo da mente flexível e da comunicação. Você entende rápido, conecta ideias e pessoas com facilidade e se adapta a contextos diferentes sem esforço aparente.',
      traits: [
        'Curioso e aprende com rapidez',
        'Conversador nato, com humor ágil',
        'Adaptável e flexível',
        'Interessado em várias coisas ao mesmo tempo'
      ],
      strengths: [
        'Explica ideias complexas de forma simples',
        'Conecta pessoas e informações',
        'Lida bem com mudanças de planos'
      ],
      attention: [
        'Dispersão e dificuldade em terminar o que começa',
        'Fala demais e escuta pouco',
        'Foge de conversas difíceis com leveza'
      ]
    },
    {
      id: 'cancer',
      name: 'Câncer',
      symbol: '♋',
      glyph:
        '<circle cx="6.2" cy="8.4" r="2.3"/><circle cx="17.8" cy="15.6" r="2.3"/>' +
        '<path d="M8.5 8.4h3.9a2.8 2.8 0 0 1 0 5.6"/>' +
        '<path d="M15.5 15.6h-3.9a2.8 2.8 0 0 1 0-5.6"/>',
      from: [6, 21],
      to: [7, 22],
      period: '21 de junho a 22 de julho',
      element: 'Água',
      modality: 'Cardinal',
      polarity: 'Yin',
      ruler: 'Lua',
      color: '#7fd1e8',
      tagline: 'Cuida do seu antes de tudo.',
      description:
        'Câncer é o signo do vínculo e da memória. Você protege quem ama, sente profundamente e constrói um lugar seguro, seja uma casa de verdade ou um clima de confiança.',
      traits: [
        'Emocionalmente atento e perceptivo',
        'Leal e protetor com a família',
        'Memória excelente para afetos e detalhes',
        'Prefere ambientes tranquilos e acolhedores'
      ],
      strengths: [
        'Cria vínculos que atravessam o tempo',
        'Percebe o clima emocional sem esforço',
        'Cuida de verdade, com pequenos gestos'
      ],
      attention: [
        'Ficar preso ao passado ou a mágoas antigas',
        'Dificuldade em falar o que realmente sente',
        'Evita confronto por medo de ferir'
      ]
    },
    {
      id: 'leo',
      name: 'Leão',
      symbol: '♌',
      glyph:
        '<circle cx="10.4" cy="12.2" r="3.6"/>' +
        '<path d="M13.6 8.1 17.2 5.6l.6 4 3.6 1"/>' +
        '<path d="M13.9 15.3c1.5 1.6 3.2 2.6 4.6 2.4 1.2-.2 1.5-1.6.6-2.4"/>',
      from: [7, 23],
      to: [8, 22],
      period: '23 de julho a 22 de agosto',
      element: 'Fogo',
      modality: 'Fixo',
      polarity: 'Yang',
      ruler: 'Sol',
      color: '#ffb02e',
      tagline: 'Presença que ilumina a sala.',
      description:
        'Leão é o signo do brilho próprio. Você tem presença natural, gosta de criar e de ser reconhecido pelo que faz e, quando se importa com alguém, faz isso de forma generosa.',
      traits: [
        'Carismático e caloroso',
        'Criativo, com necessidade de expressão',
        'Generoso com quem considera próximo',
        'Orgulhoso da própria história'
      ],
      strengths: [
        'Inspira e motiva quem está perto',
        'Assume responsabilidades com confiança',
        'Traz leveza para ambientes pesados'
      ],
      attention: [
        'A necessidade de admiração pode virar cobrança',
        'Dificuldade em aceitar um não',
        'Orgulho que atrasa pedidos de ajuda'
      ]
    },
    {
      id: 'virgo',
      name: 'Virgem',
      symbol: '♍',
      glyph:
        '<path d="M5.2 5v12.2c0 1.6 1.2 2.7 2.6 2.7s2.7-1.1 2.7-2.7V7.2c0-1.4 1-2.4 2.4-2.4s2.5 1.1 2.5 2.5v9.6"/>' +
        '<path d="M15.4 13.4c1.7 0 3 1.4 3 3.1 0 1.7-1.3 2.9-2.7 2.4"/>',
      from: [8, 23],
      to: [9, 22],
      period: '23 de agosto a 22 de setembro',
      element: 'Terra',
      modality: 'Mutável',
      polarity: 'Yin',
      ruler: 'Mercúrio',
      color: '#8ab4a0',
      tagline: 'O detalhe que faz a diferença.',
      description:
        'Virgem é o signo do cuidado e do acabamento. Você percebe o que passou despercebido, organiza o que é caótico e entrega trabalho confiável mesmo quando ninguém está olhando.',
      traits: [
        'Organizado e metódico',
        'Atento a detalhes e capaz de corrigir erros',
        'Prático e prestativo',
        'Reservado: pede pouco e oferece muito'
      ],
      strengths: [
        'Entrega qualidade consistente',
        'Resolve problemas concretos com eficiência',
        'Cuida dos outros sem esperar nada em troca'
      ],
      attention: [
        'Autocrítica excessiva e culpa por tudo',
        'Perfeccionismo que atrasa entregas',
        'Dificuldade em aceitar ajuda'
      ]
    },
    {
      id: 'libra',
      name: 'Libra',
      symbol: '♎',
      glyph:
        '<path d="M4 16.8h16"/>' +
        '<path d="M6.6 13.4c1.6 0 2.4-1 3-2.6.6-1.7 1.4-2.6 2.4-2.6s1.8.9 2.4 2.6c.6 1.6 1.4 2.6 3 2.6"/>',
      from: [9, 23],
      to: [10, 22],
      period: '23 de setembro a 22 de outubro',
      element: 'Ar',
      modality: 'Cardinal',
      polarity: 'Yang',
      ruler: 'Vênus',
      color: '#f19ecb',
      tagline: 'O equilíbrio na forma e no trato.',
      description:
        'Libra é o signo da relação e do equilíbrio. Você se importa com a estética das coisas e com a qualidade do convívio, buscando acordo sem se anular no processo.',
      traits: [
        'Educado, diplomático e charmoso',
        'Justo e equilibrado em julgamentos',
        'Sensível à estética e ao conforto',
        'Busca parceria em quase tudo'
      ],
      strengths: [
        'Media conflitos com naturalidade',
        'Transforma o ambiente onde entra',
        'Constrói relações com cuidado e coerência'
      ],
      attention: [
        'Evitar confronto e dizer não não é caminho fácil',
        'Decidir sozinho parece desconfortável',
        'Adaptar-se tanto que perca o próprio jeito'
      ]
    },
    {
      id: 'escorpio',
      name: 'Escorpião',
      symbol: '♏',
      glyph:
        '<path d="M5 19.6V5.9c0-.5.4-.9.9-.9.3 0 .6.2.8.5l3.5 6.2c.2.4.5.6.8.6s.6-.2.8-.6l3.5-6.2c.2-.3.5-.5.8-.5.5 0 .9.4.9.9v5.3"/>' +
        '<path d="M14.7 18.7 19.5 14M16 14h3.5v3.5"/>',
      from: [10, 23],
      to: [11, 21],
      period: '23 de outubro a 21 de novembro',
      element: 'Água',
      modality: 'Fixo',
      polarity: 'Yin',
      ruler: 'Plutão',
      color: '#c05fd6',
      tagline: 'Intensidade que não fica na superfície.',
      description:
        'Escorpião é o signo da profundidade. Você não se contenta com a versão fácil das coisas: quer a verdade, sente o que está por baixo e não se assusta com transformações.',
      traits: [
        'Profundo e perceptivo',
        'Intenso em sentimentos e iniciativas',
        'Leal de forma absoluta ou rompe de uma vez',
        'Resiliente diante de crises'
      ],
      strengths: [
        'Percebe o que não foi dito',
        'Constrói confiança profunda com quem ama',
        'Se regenera depois de momentos difíceis'
      ],
      attention: [
        'Desconfiança como padrão',
        'Segredos e mágoas guardadas por muito tempo',
        'Poder e controle dentro das relações'
      ]
    },
    {
      id: 'sagitario',
      name: 'Sagitário',
      symbol: '♐',
      glyph:
        '<path d="M4.6 19.4 19 5"/>' +
        '<path d="M11.4 5H19v7.6"/>' +
        '<path d="M9.4 9.6 14.6 14.8"/>',
      from: [11, 22],
      to: [12, 21],
      period: '22 de novembro a 21 de dezembro',
      element: 'Fogo',
      modality: 'Mutável',
      polarity: 'Yang',
      ruler: 'Júpiter',
      color: '#ff8fa3',
      tagline: 'O horizonte chama mais alto.',
      description:
        'Sagitário é o signo da busca. Você precisa de sentido, espaço e novas perspectivas, e transmite entusiasmo de um jeito que faz os outros também quererem ir além.',
      traits: [
        'Otimista e bem-humorado',
        'Honesto, às vezes demais',
        'Aventureiro e avesso à rotina',
        'Fã de filosofia, viagens e aprendizado'
      ],
      strengths: [
        'Inspira visão de futuro nos outros',
        'Recomeça com força depois de cair',
        'Amplia horizontes com curiosidade genuína'
      ],
      attention: [
        'Promete mais do que consegue entregar',
        'Tédio quando a rotina se instala',
        'Prefere a verdade crua ao silêncio da conversa'
      ]
    },
    {
      id: 'capricornio',
      name: 'Capricórnio',
      symbol: '♑',
      glyph:
        '<path d="M4.8 6.5c1.4 0 2.1.9 2.7 2.3l2.5 6.1c.5 1.2 1.4 1.9 2.6 1.9 1.4 0 2.5-1.1 2.5-2.5"/>' +
        '<path d="M15.1 14.3h3.3c1.4 0 2.4 1 2.4 2.3s-1 2.3-2.4 2.3H18"/>',
      from: [12, 22],
      to: [1, 19],
      period: '22 de dezembro a 19 de janeiro',
      element: 'Terra',
      modality: 'Cardinal',
      polarity: 'Yin',
      ruler: 'Saturno',
      color: '#8d93a8',
      tagline: 'Constância que vira legado.',
      description:
        'Capricórnio é o signo da construção de longo prazo. Você trabalha com método, aceita o esforço do começo e leva a vida a sério, sem depender de atalhos ou promessas fáceis.',
      traits: [
        'Responsável e maduro precocemente',
        'Focado em metas e resultados',
        'Prático, estratégico e realista',
        'Respeita tempo, regra e compromisso'
      ],
      strengths: [
        'Transforma esforço em resultado real',
        'Confiável em longo prazo',
        'Sustenta o plano mesmo sem entusiasmo'
      ],
      attention: [
        'Excesso de responsabilidade e cobrança',
        'Dificuldade em pedir ajuda ou mostrar o que precisa',
        'Rigidez com o próprio ritmo de vida'
      ]
    },
    {
      id: 'aquario',
      name: 'Aquário',
      symbol: '♒',
      glyph:
        '<path d="M4 9.6 8 5.6l4 4 4-4 4 4"/>' +
        '<path d="M4 17.6 8 13.6l4 4 4-4 4 4"/>',
      from: [1, 20],
      to: [2, 18],
      period: '20 de janeiro a 18 de fevereiro',
      element: 'Ar',
      modality: 'Fixo',
      polarity: 'Yang',
      ruler: 'Urano',
      color: '#5cc9f5',
      tagline: 'Pensa diferente, de propósito.',
      description:
        'Aquário é o signo da ideia original. Você questiona o padrão, se interessa pelo futuro e valoriza liberdade acima de qualquer regra que pareça injusta.',
      traits: [
        'Original e independente',
        'Humanitário e igualitário',
        'Racional, com pensamento fora do padrão',
        'Companheiro de grupos e causas'
      ],
      strengths: [
        'Vê alternativas que ninguém mais enxerga',
        'Aceita e respeita diferenças',
        'Age de forma coerente com seus princípios'
      ],
      attention: [
        'Frieza emocional à distância',
        'Teimosia intelectual por princípio',
        'Proximidade que às vezes parece distante'
      ]
    },
    {
      id: 'peixes',
      name: 'Peixes',
      symbol: '♓',
      glyph:
        '<path d="M8.6 4.4c-2.7 2.5-2.7 12.7 0 15.2"/>' +
        '<path d="M15.4 4.4c2.7 2.5 2.7 12.7 0 15.2"/>' +
        '<path d="M5.4 12h13.2"/>',
      from: [2, 19],
      to: [3, 20],
      period: '19 de fevereiro a 20 de março',
      element: 'Água',
      modality: 'Mutável',
      polarity: 'Yin',
      ruler: 'Netuno',
      color: '#6ee7d5',
      tagline: 'Absorve o mundo e o transforma em sonho.',
      description:
        'Peixes é o signo da sensibilidade e da imaginação. Você capta o clima de um ambiente antes dos outros e transforma emoção em arte, cuidado ou compaixão.',
      traits: [
        'Empatia muito forte',
        'Sensível a arte, música e beleza',
        'Humildade e pouco ego',
        'Sonhador, confia no fluxo da vida'
      ],
      strengths: [
        'Entende a dor alheia com profundidade',
        'Cria com delicadeza e originalidade',
        'Perdoa e aceita diferenças com facilidade'
      ],
      attention: [
        'Fugir da realidade quando ela pesa',
        'Evitar escolhas concretas',
        'Absorver o estado emocional do ambiente'
      ]
    }
  ];

  /* Ordem canônica do zodíaco (começa em Áries e fecha em Peixes). */
  var ORDER = [
    'aries', 'taurus', 'geminis', 'cancer', 'leo', 'virgo',
    'libra', 'escorpio', 'sagitario', 'capricornio', 'aquario', 'peixes'
  ];

  /* Índice por id, montado uma única vez. */
  var BY_ID = {};
  SIGNS.forEach(function (sign) {
    BY_ID[sign.id] = sign;
  });

  global.MeuSigno = global.MeuSigno || {};
  global.MeuSigno.SIGNS = SIGNS;
  global.MeuSigno.SIGN_ORDER = ORDER;
  global.MeuSigno.getSign = function (id) {
    return BY_ID[id] || null;
  };
  global.MeuSigno.orderedSigns = function () {
    return ORDER.map(function (id) {
      return BY_ID[id];
    });
  };
})(window);
