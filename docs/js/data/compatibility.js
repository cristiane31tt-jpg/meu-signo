/* =====================================================================
   MEU SIGNO - Motor de compatibilidade
   ---------------------------------------------------------------------
   COMO FUNCIONA
   Cada par de signos tem uma nota propria em OVERRIDES (0 a 100 por
   categoria). A explicacao em texto e MONTADA automaticamente a partir
   de tres dimensoes da tradicao astrologica:

     1. ELEMENTO   (Fogo / Terra / Ar / Agua)  -> quanto as energias se somam
     2. MODALIDADE (Cardinal / Fixo / Mutavel) -> quanto os ritmos se encaixam
     3. POLARIDADE (Yang / Yin)                -> quanto as formas se completam

   COMO EDITAR
   - OVERRIDES ....... notas de cada par. Chave 'idA|idB' em ordem alfabetica.
                      As 66 combinacoes possiveis estao mapeadas.
   - ELEMENT_TEXT .... explicacao de cada combinacao de elementos (9 pares).
   - MODALITY_TEXT ... explicacao de cada combinacao de modalidades (6 pares).
   - OPENERS ......... frase de abertura por nivel e por categoria.
   - CATEGORIES ...... categorias e o que cada uma pondera.

   Para criar um par novo: copie uma linha de OVERRIDES, troque a chave e
   as quatro notas. Nada mais precisa ser alterado.
   ===================================================================== */

(function (global) {
  'use strict';

  /* ------------------------------------------------------------------
     Niveis de resultado (tambem usados no CSS e nas telas)
     ------------------------------------------------------------------ */
  var LEVELS = [
    { id: 'excelente', label: 'Excelente', min: 85, color: '#3ddc97' },
    { id: 'boa', label: 'Boa', min: 70, color: '#5cc9f5' },
    { id: 'moderada', label: 'Moderada', min: 50, color: '#f2c94c' },
    { id: 'desafiadora', label: 'Desafiadora', min: 0, color: '#ff7a8a' }
  ];

  /* ------------------------------------------------------------------
     Categorias e o que cada uma pondera. Pesos somam 1.
     ------------------------------------------------------------------ */
  var CATEGORIES = [
    {
      id: 'amor',
      label: 'Amor',
      hint: 'Paixao, atracao e o jeito de demonstrar afeto.',
      weights: { element: 0.55, modality: 0.24, polarity: 0.21 }
    },
    {
      id: 'amizade',
      label: 'Amizade',
      hint: 'Companhia, confianca e convivencia leve.',
      weights: { element: 0.34, modality: 0.46, polarity: 0.20 }
    },
    {
      id: 'comunicacao',
      label: 'Comunicação',
      hint: 'Entender o outro sem precisar traduzir tudo.',
      weights: { element: 0.42, modality: 0.23, polarity: 0.35 }
    },
    {
      id: 'geral',
      label: 'Compatibilidade geral',
      hint: 'A soma de tudo o que existe entre os dois signos.',
      weights: { element: 0.46, modality: 0.39, polarity: 0.15 }
    }
  ];

  /* ------------------------------------------------------------------
     Frases de abertura: [nivel][categoria] -> lista de variantes.
     A variante usada e escolhida pelo indice da categoria, de modo que
     as quatro secoes de uma mesma tela nunca comecam igual.
     ------------------------------------------------------------------ */
  var OPENERS = {
    excelente: {
      amor: [
        'A atração aqui é imediata e difícil de explicar.',
        'Existe uma sintonia emocional que dispensa discussão.'
      ],
      amizade: [
        'Compania fácil e uma confiança que cresce rápido.',
        'Vocês se entendem sem precisar se explicar.'
      ],
      comunicacao: [
        'As palavras chegam com pouca intermediação.',
        'Existe uma sintonia clara entre o que se diz e o que se quer dizer.'
      ],
      geral: [
        'Alta compatibilidade, do tipo que sustenta.',
        'Aqui as energias conversam bem.'
      ]
    },
    boa: {
      amor: [
        'Existe atração e carinho, com espaço para melhorar.',
        'Há afinidade real, embora não isenta de ajustes.'
      ],
      amizade: [
        'Convívio saudável, com alguns pontos a ajustar.',
        'A amizade funciona e ganha força com tempo.'
      ],
      comunicacao: [
        'A conversa funciona, mas pede clareza em alguns temas.',
        'Quase sempre dá para se entender, com um esforço pequeno.'
      ],
      geral: [
        'Boa compatibilidade, com algum atrito esperado.',
        'O caminho é mais fluído do que a maioria dos pares.'
      ]
    },
    moderada: {
      amor: [
        'Há interesse, porém a relação pede mais consciência.',
        'A aproximação existe, mas não vem sozinha.'
      ],
      amizade: [
        'A amizade funciona quando cada um respeita o tempo do outro.',
        'Dá para construir, se houver paciência dos dois lados.'
      ],
      comunicacao: [
        'É preciso explicar o que se sente em vez de esperar que o outro perceba.',
        'As mensagens chegam, mas chegam com ruído.'
      ],
      geral: [
        'Compatibilidade moderada: funciona, mas não é automática.',
        'Nada que não se resolva com conversa.'
      ]
    },
    desafiadora: [
      undefined,
      undefined,
      undefined,
      undefined
    ]
  };

  OPENERS.desafiadora = {
    amor: [
      'A atração pode existir, mas vem acompanhada de tensão.',
      'Há intensidade, e é exatamente ela que dificulta.'
    ],
    amizade: [
      'A relação pede cuidado para não virar competição.',
      'Dá para conviver, se as regras ficarem claras.'
    ],
    comunicacao: [
      'Costuma haver ruído: o que um diz, o outro lê de outro jeito.',
      'As palavras precisam de tradução o tempo todo.'
    ],
    geral: [
      'Compatibilidade desafiadora, com bastante espaço para crescer.',
      'É um par que não se acomoda fácil, e por isso mesmo ensina.'
    ]
  };


  /* ------------------------------------------------------------------
     Explicacao por combinacao de elementos.
     Chave sempre 'elemento1|elemento2' em ordem alfabetica.

     Sao duas variantes por par de proposito: a categoria Amor usa a
     primeira e a categoria Compatibilidade geral usa a segunda. Assim
     a mesma tela nao repete a mesma frase.
     ------------------------------------------------------------------ */
  var ELEMENT_TEXT = {
    'agua|fogo': [
      'Fogo e Água se acendem e se queimam: a atração é forte, mas sobra pouca calma.',
      'Um puxa com calor e o outro com profundidade, e nenhum dos dois sai ileso do encontro.'
    ],
    'agua|terra': [
      'Água e Terra se sustentam: uma dá acolhimento, a outra dá forma.',
      'É uma união de cuidado concreto, do tipo que aparece na vida cotidiana.'
    ],
    'agua|agua': [
      'Duas energias de Água se reconhecem de imediato, sem esforço.',
      'A afinidade é enorme; o cuidado é não deixar a intensidade ficar parada.'
    ],
    'ar|ar': [
      'Dois elementos de Ar se entendem pela ideia, e a conversa flui.',
      'A liberdade vira linguagem comum: os dois pensam rápido e explicam bem.'
    ],
    'ar|fogo': [
      'Ar e Fogo se energizam: um dá entusiasmo, o outro dá direção.',
      'Juntos conversam melhor do que com quase qualquer outro par.'
    ],
    'ar|terra': [
      'Ar e Terra trafegam em ritmos diferentes: um experimenta, o outro consolida.',
      'Funciona quando cada um respeita o tempo do outro.'
    ],
    'fogo|fogo': [
      'Mesma centelha dos dois lados, e uma disputa por espaço que não costuma ser silenciosa.',
      'A afinidade vem acompanhada de calor, e nenhum dos dois aceita perder de boa.'
    ],
    'fogo|terra': [
      'Fogo e Terra é a combinação que mais exige consciência sobre o tempo de cada um.',
      'Um quer acelerar e o outro quer consolidar; o equilíbrio não vem pronto.'
    ],
    'terra|terra': [
      'Duas bases de Terra: confiança, constância e resultados concretos.',
      'Construem juntos com muita segurança; o desafio é não travar no comfortável.'
    ]
  };

  /* ------------------------------------------------------------------
     Explicacao por combinacao de modalidades.
     A primeira variante vai para Amizade, a segunda para Comunicacao.
     ------------------------------------------------------------------ */
  var MODALITY_TEXT = {
    'cardinal|cardinal': [
      'Os dois querem começar coisas, então disputam a iniciativa.',
      'No ritmo, ambos aceleram a mesma hora, e isso cansa.'
    ],
    'cardinal|fixo': [
      'Um abre caminhos e o outro sustenta: boa dinâmica de parceria.',
      'Na conversa, um propõe e o outro leva a proposta a sério.'
    ],
    'cardinal|mutavel': [
      'Iniciativa de um lado, flexibilidade do outro.',
      'Na conversa, funciona bem quando o flexível diz o que precisa em vez de apenas adaptar.'
    ],
    'fixo|fixo': [
      'A mesma constância nos dois constrói e sustenta, mas trava nas mesmas teimosias.',
      'Na conversa, os dois persistem até alguém ceder, e às vezes ninguém cede.'
    ],
    'fixo|mutavel': [
      'O fixo dá estabilidade e o mutável dá movimento, com espaço para cada papel.',
      'Na conversa, o fixo reclama e o mutável acaba cedendo mais do que queria.'
    ],
    'mutavel|mutavel': [
      'Os dois se adaptam rápido, mas falta um ponto de referência que segure as decisões.',
      'Na conversa, é fácil concordar e difícil decidir.'
    ]
  };

  /* ------------------------------------------------------------------
     Polaridade: como as formas se completam. Usada em Comunicacao,
     porque é a categoria onde "se entender" mais importa.
     ------------------------------------------------------------------ */
  var POLARITY_TEXT = {
    yang: 'Duas energias yang: o esforço de vocês convence quem está por perto.',
    yin: 'Duas energias yin: a conversa é sutil e chega por baixo, sem precisar de palavras.',
    mixed: 'Energias de signos opostos: o que um diz em uma frase, o outro entende em duas.'
  };

  /* ------------------------------------------------------------------
     Essencia de cada signo: uma linha que entra na apresentacao do par
     e torna a analise especifica desses dois signos, e nao so generica.
     ------------------------------------------------------------------ */
  var ESSENCE = {
    aries: 'age antes de pensar',
    taurus: 'constrói devagar e para quando decide',
    geminis: 'entende rápido e explica melhor ainda',
    cancer: 'sente o clima antes de entrar na sala',
    leo: 'muda o ambiente ao entrar',
    virgo: 'percebe o detalhe que ninguém notou',
    libra: 'busca equilíbrio antes de decidir',
    escorpio: 'não se contenta com a versão fácil',
    sagitario: 'precisa de horizonte novo',
    capricornio: 'transforma esforço em resultado',
    aquario: 'questiona a regra antes de obedecê-la',
    peixes: 'imagina o que ainda não existe'
  };

  /* ------------------------------------------------------------------
     Mesmo signo: um par repetido ganha um alerta proprio, sorteado a
     partir do id para que cada signo receba sempre a mesma redacao.
     ------------------------------------------------------------------ */
  var SAME_SIGN_NOTES = [
    'Por serem o mesmo signo, a compreensão é imediata e a tendência de repetir os mesmos pontos cegos também.',
    'Por serem o mesmo signo, tudo é entendido sem tradução, inclusive o que nenhum dos dois diz.',
    'Por serem o mesmo signo, a intimidade vem rápido e com ela a repetição dos mesmos erros.',
    'Por serem o mesmo signo, o que um reconhece no outro já vem escrito, e isso é raro fora daqui.'
  ];

  /* ------------------------------------------------------------------
     Apresentacao do par. Montada em 3 pecas para nunca soar igual:
     abertura (variante por nivel) + ponte (variante por afinidade) +
     essencia dos dois signos.
     ------------------------------------------------------------------ */
  var INTRO_OPENERS = {
    excelente: [
      'Quando %A% encontra %B%, alguma coisa se acende.',
      'Existe um encontro raro entre %A% e %B%.',
      '%A% e %B% se reconhecem depressa.'
    ],
    boa: [
      'Quando %A% encontra %B%, o encontro funciona bem.',
      '%A% e %B% têm mais em comum do que aparentam.',
      'O encontro entre %A% e %B% pede pouco esforço.'
    ],
    moderada: [
      'Quando %A% encontra %B%, há aproximação e também resistência.',
      '%A% e %B% precisam de conversa para se acertar.',
      'O encontro entre %A% e %B% é interessante, mas não é automático.'
    ],
    desafiadora: [
      'Quando %A% encontra %B%, o atrito aparece cedo.',
      '%A% e %B% têm modos opostos de olhar.',
      'O encontro entre %A% e %B% não é fácil, e por isso mesmo é interessante.'
    ]
  };

  /* Ponte: 3 redacoes para cada lado, conforme a afinidade. */
  var INTRO_BRIDGE = {
    affinity: [
      'As energias se somam em vez de se cancelar.',
      'O que um tem, o outro procura.',
      'Existe complementaridade entre os dois jeitos de funcionar.'
    ],
    tension: [
      'As energias se atropelam, e o ajuste precisa ser consciente.',
      'Cada um chega com um ritmo, e os dois precisam aprender o do outro.',
      'Há atrito na forma, mesmo quando existe carinho.'
    ]
  };


  /* ------------------------------------------------------------------
     OVERRIDES - notas de cada par: amor, amizade, comunicacao, geral.
     Ordem alfabetica das chaves. As 66 combinacoes estao mapeadas.
     ------------------------------------------------------------------ */
  var OVERRIDES = {
    'aries|aquario': [60, 70, 66, 64],
    'aries|aries': [88, 90, 82, 87],
    'aries|cancer': [82, 84, 72, 80],
    'aries|geminis': [80, 86, 88, 84],
    'aries|leo': [95, 88, 84, 92],
    'aries|libra': [89, 76, 72, 82],
    'aries|escorpio': [76, 72, 58, 69],
    'aries|sagitario': [78, 84, 80, 81],
    'aries|taurus': [84, 78, 66, 80],
    'aries|virgo': [72, 80, 70, 74],

    'aquario|aquario': [76, 88, 86, 82],
    'aquario|cancer': [66, 74, 66, 68],
    'aquario|capricornio': [58, 66, 68, 62],
    'aquario|geminis': [72, 90, 94, 83],
    'aquario|leo': [62, 70, 66, 65],
    'aquario|libra': [70, 82, 80, 77],
    'aquario|escorpio': [60, 68, 58, 62],
    'aquario|peixes': [70, 74, 64, 69],
    'aquario|sagitario': [70, 82, 84, 78],
    'aquario|taurus': [58, 70, 62, 63],
    'aquario|virgo': [64, 78, 76, 72],

    'cancer|cancer': [90, 92, 76, 88],
    'cancer|capricornio': [70, 78, 62, 72],
    'cancer|geminis': [82, 90, 84, 85],
    'cancer|leo': [84, 88, 76, 85],
    'cancer|libra': [86, 90, 78, 87],
    'cancer|escorpio': [93, 86, 78, 88],
    'cancer|peixes': [90, 88, 74, 86],
    'cancer|sagitario': [76, 78, 70, 74],
    'cancer|taurus': [86, 88, 72, 84],
    'cancer|virgo': [80, 86, 74, 82],

    'capricornio|capricornio': [82, 88, 74, 84],
    'capricornio|cancer': [70, 78, 62, 72],
    'capricornio|escorpio': [74, 76, 64, 73],
    'capricornio|geminis': [74, 80, 82, 78],
    'capricornio|leo': [72, 78, 70, 74],
    'capricornio|libra': [78, 86, 76, 81],
    'capricornio|peixes': [66, 72, 60, 65],
    'capricornio|sagitario': [72, 82, 74, 77],
    'capricornio|taurus': [80, 88, 70, 81],
    'capricornio|virgo': [76, 86, 76, 80],

    'escorpio|escorpio': [92, 84, 70, 86],
    'escorpio|geminis': [58, 70, 60, 62],
    'escorpio|leo': [84, 78, 66, 79],
    'escorpio|libra': [82, 76, 68, 78],
    'escorpio|peixes': [86, 82, 66, 81],
    'escorpio|sagitario': [74, 78, 70, 76],
    'escorpio|taurus': [89, 78, 62, 82],

    'geminis|geminis': [84, 90, 94, 86],
    'geminis|leo': [78, 84, 80, 80],
    'geminis|libra': [88, 92, 90, 90],
    'geminis|peixes': [82, 88, 74, 84],
    'geminis|sagitario': [88, 92, 96, 90],
    'geminis|taurus': [70, 76, 66, 71],
    'geminis|virgo': [78, 86, 84, 82],

    'leo|leo': [92, 86, 80, 88],
    'leo|libra': [90, 88, 82, 87],
    'leo|peixes': [86, 88, 74, 85],
    'leo|sagitario': [88, 90, 86, 88],
    'leo|taurus': [78, 80, 68, 77],
    'leo|virgo': [80, 84, 72, 80],

    'libra|libra': [86, 88, 84, 86],
    'libra|peixes': [91, 84, 80, 88],
    'libra|sagitario': [84, 88, 86, 86],
    'libra|taurus': [86, 88, 74, 85],
    'libra|virgo': [76, 82, 78, 79],

    'peixes|peixes': [90, 90, 74, 87],
    'peixes|sagitario': [82, 86, 76, 82],
    'peixes|taurus': [82, 84, 70, 80],

    'sagitario|sagitario': [88, 90, 88, 88],
    'sagitario|taurus': [74, 80, 70, 76],

    'taurus|taurus': [90, 92, 76, 88],
    'taurus|virgo': [87, 90, 82, 88],

    'virgo|virgo': [82, 88, 78, 85],
    'virgo|escorpio': [70, 74, 66, 71]
  };


  /* ------------------------------------------------------------------
     Funcoes auxiliares
     ------------------------------------------------------------------ */

  /* Remove acentos e deixa minusculo, para casar "Agua" com "agua". */
  function key(text) {
    return String(text)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  /* Chave de par em ordem alfabetica, para nao duplicar dados. */
  function pairKey(a, b) {
    return a < b ? a + '|' + b : b + '|' + a;
  }

  function clamp(value) {
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  function levelFor(score) {
    for (var i = 0; i < LEVELS.length; i++) {
      if (score >= LEVELS[i].min) {
        return LEVELS[i];
      }
    }
    return LEVELS[LEVELS.length - 1];
  }

  /* Pega a variante pedida de uma lista. Aceita texto simples tambem,
     para nenhum trecho antigo quebrar se a lista virar array depois. */
  function variant(value, index) {
    if (!value) {
      return '';
    }
    if (typeof value === 'string') {
      return value;
    }
    if (!value.length) {
      return '';
    }
    return value[index % value.length];
  }

  /* Sorteio livre, usado nas aberturas: o usuario que volta a abrir a
     compatibilidade le um texto diferente. */
  function anyVariant(list) {
    if (!list || !list.length) {
      return '';
    }
    return list[Math.floor(Math.random() * list.length)];
  }

  function sameSignNote(sign) {
    var sum = 0;
    for (var i = 0; i < sign.id.length; i++) {
      sum += sign.id.charCodeAt(i);
    }
    return SAME_SIGN_NOTES[sum % SAME_SIGN_NOTES.length];
  }

  /* Linha que resume o par na categoria geral. Escrita sempre na ordem
     alfabetica dos ids: assim o texto e o mesmo com os signos trocados
     de lugar, e a compatibilidade continua simetrica. */
  function essenceLine(signA, signB) {
    if (signA.id === signB.id) {
      return ESSENCE[signA.id] + ' dos dois lados: o mesmo jeito de funcionar, com os mesmos excessos.';
    }
    var ids = pairKey(signA.id, signB.id).split('|');
    return 'Um ' + ESSENCE[ids[0]] + ', o outro ' + ESSENCE[ids[1]] +
      ': dois jeitos de funcionar que convivem aqui.';
  }

  /* ------------------------------------------------------------------
     Monta a explicacao de uma categoria.

     Cada categoria olha para um angulo diferente de proposito, para a
     tela nao repetir a mesma frase quatro vezes:

       amor ............. combinacao de elementos (1a variante)
       amizade .......... combinacao de modalidades (1a variante)
       comunicacao ...... polaridade + modalidades (2a variante)
       geral ............ elementos (2a variante) + essencia dos signos
     ------------------------------------------------------------------ */
  function composeText(categoryId, signA, signB) {
    var notes = OVERRIDES[pairKey(signA.id, signB.id)];
    var scores = notes || fallbackScores(signA, signB);
    var index = indexOfCategory(categoryId);
    var score = scores[index];
    var level = levelFor(score);

    var parts = [];

    parts.push(variant(OPENERS[level.id] && OPENERS[level.id][categoryId], index));

    var elKey = pairKey(key(signA.element), key(signB.element));
    var moKey = pairKey(key(signA.modality), key(signB.modality));

    if (categoryId === 'comunicacao') {
      var polarityKey =
        signA.polarity === signB.polarity ? key(signA.polarity) : 'mixed';
      parts.push(POLARITY_TEXT[polarityKey]);
      parts.push(variant(MODALITY_TEXT[moKey], 1));
    } else if (categoryId === 'amizade') {
      parts.push(variant(MODALITY_TEXT[moKey], 0));
    } else if (categoryId === 'geral') {
      parts.push(variant(ELEMENT_TEXT[elKey], 1));
      parts.push(essenceLine(signA, signB));
    } else {
      parts.push(variant(ELEMENT_TEXT[elKey], 0));
    }

    if (signA.id === signB.id) {
      parts.push(sameSignNote(signA));
    }

    return parts.filter(Boolean).join(' ');
  }

  /* ------------------------------------------------------------------
     Abertura do par, mostrada antes das notas.

     Montada em tres pecas para nunca comecar igual: uma frase por nivel,
     uma ponte por afinidade e uma linha nomeando o que cada signo traz.
     Os marcadores %A% e %B% viram o nome dos signos.
     ------------------------------------------------------------------ */
  function buildIntro(signA, signB, overallScore) {
    var level = levelFor(overallScore);
    var isSameSign = signA.id === signB.id;
    var bridge = INTRO_BRIDGE[overallScore >= 70 || isSameSign ? 'affinity' : 'tension'];

    var opener = anyVariant(INTRO_OPENERS[level.id])
      .replace(/%A%/g, signA.name)
      .replace(/%B%/g, signB.name);

    var essence = isSameSign
      ? signA.name + ' ' + ESSENCE[signA.id] + ', e o outro também.'
      : signA.name + ' ' + ESSENCE[signA.id] + ', ' + signB.name + ' ' +
        ESSENCE[signB.id] + '.';

    return [
      opener,
      anyVariant(bridge),
      essence
    ].filter(Boolean).join(' ');
  }

  function indexOfCategory(categoryId) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === categoryId) {
        return i;
      }
    }
    return 0;
  }

  /* ------------------------------------------------------------------
     Fallback: se um par nao estiver em OVERRIDES, calcula a partir das
     matrizes. Serve como rede de seguranca para pares novos.
     ------------------------------------------------------------------ */
  var ELEMENT_MATRIX = {
    fogo: { fogo: 88, terra: 44, ar: 82, agua: 46 },
    terra: { fogo: 44, terra: 88, ar: 46, agua: 84 },
    ar: { fogo: 82, terra: 46, ar: 88, agua: 45 },
    agua: { fogo: 46, terra: 84, ar: 45, agua: 88 }
  };

  var MODALITY_MATRIX = {
    cardinal: { cardinal: 84, fixo: 71, mutavel: 53 },
    fixo: { cardinal: 71, fixo: 86, mutavel: 69 },
    mutavel: { cardinal: 53, fixo: 69, mutavel: 84 }
  };

  var POLARITY_MATRIX = {
    yang: { yang: 82, yin: 59 },
    yin: { yang: 59, yin: 82 }
  };

  function dimensionScores(signA, signB) {
    return {
      element: ELEMENT_MATRIX[key(signA.element)][key(signB.element)],
      modality: MODALITY_MATRIX[key(signA.modality)][key(signB.modality)],
      polarity: POLARITY_MATRIX[key(signA.polarity)][key(signB.polarity)]
    };
  }

  function fallbackScores(signA, signB) {
    var d = dimensionScores(signA, signB);
    return CATEGORIES.map(function (category) {
      var w = category.weights;
      return clamp(d.element * w.element + d.modality * w.modality + d.polarity * w.polarity);
    });
  }

  /* ------------------------------------------------------------------
     Analise principal.
     Retorna { a, b, categories: [...], overall: { score, level } }
     ------------------------------------------------------------------ */
  function analyze(signA, signB) {
    if (!signA || !signB) {
      return null;
    }

    var notes = OVERRIDES[pairKey(signA.id, signB.id)];
    var scores = notes || fallbackScores(signA, signB);

    var categories = CATEGORIES.map(function (category, i) {
      var score = clamp(scores[i]);
      return {
        id: category.id,
        label: category.label,
        hint: category.hint,
        score: score,
        level: levelFor(score),
        text: composeText(category.id, signA, signB)
      };
    });

    var total = categories.reduce(function (acc, c) {
      return acc + c.score;
    }, 0);
    var overallScore = clamp(total / categories.length);

    return {
      a: signA,
      b: signB,
      intro: buildIntro(signA, signB, overallScore),
      categories: categories,
      overall: { score: overallScore, level: levelFor(overallScore) }
    };
  }

  global.MeuSigno = global.MeuSigno || {};
  global.MeuSigno.Compatibility = {
    LEVELS: LEVELS,
    CATEGORIES: CATEGORIES,
    analyze: analyze,
    levelFor: levelFor
  };

})(window);
