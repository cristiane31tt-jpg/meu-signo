/* =====================================================================
   MEU SIGNO - Variacoes de perfil
   ---------------------------------------------------------------------
   Cada signo tem o proprio banco de detalhes. As telas do app sorteiam
   uma combinacao a cada consulta, e por isso a mesma pessoa pode ver
   o mesmo signo escrito de formas diferentes, sem que o fundo mude.

   Como esta organizado

   PROFILES.<id do signo>:
     traits .... variacoes de "Caracteristicas" (4 itens por variacao)
     strengths . variacoes de "Pontos fortes" (3 itens)
     attention . variacoes de "Pontos de atenção" (3 itens)

   Cada variacao e um array de itens ja redigidos. Nao existe gerador de
   texto: o conteudo e escrito para o signo, o que mantem a coerencia
   com o perfil tradicional e evita combinacoes contraditorias.

   Como adicionar uma variacao nova
   ---------------------------------------------------------------------
   Acrecente mais um array dentro do grupo desejado. Nao e preciso
   mexer em nenhuma logica do app: a nova variacao entra sozinha na
   rotacao. A unica regra e manter os itens do mesmo signo e sem
   contradizer o que ja esta escrito.

   O primeiro conjunto de cada grupo vem de js/data/signs.js, que segue
   sendo a fonte da apresentacao padrao. As variacoes deste arquivo
   entram na rotacao ao lado dele.
   ===================================================================== */

(function (global) {
  'use strict';

  var PROFILES = {

    /* ----------------------------------------------------------------
       Aries
       ---------------------------------------------------------------- */
    aries: {
      traits: [
        ['Age por instinto antes de pensar bem', 'Assume a dianteira sem ser chamado',
         'Fala o que pensa na hora', 'Impaciente com quem enrola'],

        ['Energia alta e disposição para começar', 'Aceita o desafio como convite',
         'Faz as coisas acontecer no próprio tempo', 'Não tolera esperar de graça'],

        ['Corajoso em situações novas', 'Pioneiro, mesmo sem experiência',
         'Rápido para decidir sob pressão', 'Firme quando é preciso ser firme']
      ],
      strengths: [
        ['Começa o que os outros só planejam', 'Enfrenta o que assusta a maioria',
         'Recomeça sem carregar mágoa do fracasso'],

        ['Lidera pela ação, não pela promessa', 'Age no impulso certo, sem delongas',
         'Corta a hesitação dos outros com coragem'],

        ['Desfaz bloqueios sem rodeios', 'Transforma dúvida em decisão',
         'Não desiste até o assunto estar resolvido']
      ],
      attention: [
        ['Pouca paciência para lentidão alheia', 'Fala o que ainda não estava pronto',
         'Prefere começar a terminar'],

        ['Decide com o calor do momento', 'Pouca predisposição a pedir desculpa detalhada',
         'Desperta atrito sem perceber'],

        ['Confunde pressa com estratégia', 'Impaciência com quem pensa devagar',
         'Abandona o plano no primeiro travamento']
      ]
    },

    /* ----------------------------------------------------------------
       Touro
       ---------------------------------------------------------------- */
    taurus: {
      traits: [
        ['Devagar para se apressar, firme para decidir', 'Ligado ao prazer e ao bem-estar',
         'Valoriza o que tem valor real', 'Não se move sem um motivo concreto'],

        ['Sensível a texturas, cheiros e sabores', 'Precisa de rotina para funcionar bem',
         'Não se deixa levar por modismo', 'Pensa no longo prazo'],

        ['Terroso e ligado ao concreto', 'Mantém a calma sob pressão',
         'Aprecia o que dá para tocar', 'Só muda de casa quando tem certeza']
      ],
      strengths: [
        ['Termina o que começa', 'Dá estabilidade a quem está por perto',
         'Não abandona um combinado já feito'],

        ['Administra recursos com bom senso', 'Constrói algo sólido com o tempo',
         'Percebe o valor de uma coisa antes de pagar por ela'],

        ['Segue o próprio ritmo sem se desculpar', 'Cria conforto com o que é simples',
         'Transforma esforço em resultado concreto']
      ],
      attention: [
        ['Teimosia quando o assunto é rotina', 'Adia o que pode incomodar depois',
         'Aperta os limites quando se apega'],

        ['Confunde segurança com imobilidade', 'Resiste a mudanças que fariam bem',
         'Fica preso ao que já conhece'],

        ['Endurece a reação diante do novo', 'Demora a perdoar quem falhou com ele',
         'Pouca vontade de arriscar o que já está bom']
      ]
    },

    /* ----------------------------------------------------------------
       Gemeos
       ---------------------------------------------------------------- */
    geminis: {
      traits: [
        ['Enxerga várias camadas no mesmo assunto', 'Pensa em voz alta',
         'Troca de assunto sem perder o fio', 'Precisa de informação nova para respirar'],

        ['Aprende imitando o outro', 'Talento natural para escrita e narrativa',
         'Conecta ideias de áreas diferentes', 'Rápido em dobrar a esquina'],

        ['Curioso por natureza, não por escolha', 'Bom em traduzir o que é difícil',
         'Transforma assunto em conversa', 'Reinventa-se com frequência']
      ],
      strengths: [
        ['Comunica com clareza e leveza', 'Enxerga oportunidades onde outros não param',
         'Se adapta rápido a formatos novos'],

        ['Conecta pessoas que não se conheciam', 'Resolve problemas com informação',
         'Desbloqueia quem estava travado'],

        ['Explica o complexo de um jeito que todos entendem', 'Lê rápido e retém melhor que a média',
         'Enche o ambiente de assunto']
      ],
      attention: [
        ['Foge do que exige foco sustentado', 'Assume todos os assuntos ao mesmo tempo',
         'Passa das promises aos fatos'],

        ['Fala para não ouvir', 'Chega na metade de três tarefas juntas',
         'Decide antes de ouvir a segunda metade da história'],

        ['Trabalha no que agrada no curto prazo', 'Confunte curiosidade com interesse duradouro',
         'Se entedia quando não há novidade por perto']
      ]
    },

    /* ----------------------------------------------------------------
       Cancer
       ---------------------------------------------------------------- */
    cancer: {
      traits: [
        ['Valoriza relações construídas com confiança', 'Tem forte percepção do ambiente emocional',
         'Demonstra afeto nos pequenos detalhes', 'Protege quem considera família'],

        ['É dedicado às pessoas que considera importantes', 'Capta o estado emocional de quem está por perto',
         'Memória forte para afetos e lembranças', 'Busca aconchego e ambiente tranquilo'],

        ['Guarda o que importa por muito tempo', 'Sensível a palavras e a gestos',
         'Reage ao clima da casa antes de olhar para fora', 'Demora a se abrir com pessoas novas']
      ],
      strengths: [
        ['Cria vínculos profundos e duradouros', 'Percebe mudanças emocionais com facilidade',
         'Demonstra cuidado por meio de atitudes'],

        ['É dedicado a quem entra na sua família', 'Oferece segurança nos momentos difíceis',
         'Guarda as lembranças importantes com fidelidade'],

        ['Acolhe sem pedir nada em troca', 'Fala pouco, mas fala o que sente',
         'Cria um lugar seguro para as pessoas próximas']
      ],
      attention: [
        ['Carrega o passado com mais peso do que o presente', 'Esconde o que pensa até não aguentar',
         'Fica se retraindo quando o assunto fica pessoal'],

        ['Assume o papel de quem protege e cobra esse papel de si mesmo', 'Cuida dos outros e adia o próprio descanso',
         'Desconfia de quem chega perto sem aviso'],

        ['Demora a perdoar quem quebrou a confiança', 'Tranca a porta do passado e chama isso de segurança',
         'Evita decisões que possam afastar alguém']
      ]
    },

    /* ----------------------------------------------------------------
       Leao
       ---------------------------------------------------------------- */
    leo: {
      traits: [
        ['Presença natural que puxa a atenção do ambiente', 'Gosta de criar e dar brilho ao que faz',
         'Transforma a alegria em linguagem compartilhada', 'Assume o centro sem precisar forçar'],

        ['Generoso e festivo, leva a sério quem chega perto', 'Criativo com mão para palco, texto e imagem',
         'Protetor dos seus sem precisar mandar', 'Enche a casa de movimento e de gente'],

        ['Fiel ao que representa para ele', 'Aparece quando é preciso dar visibilidade',
         'Decidido a terminar o que começa', 'Recebe elogio melhor do que parece']
      ],
      strengths: [
        ['Assume o palco quando o momento pede', 'Motiva quem está ao redor sem esforço',
         'Transforma apresentação em ponto alto'],

        ['Lidera com calor humano e não com autoritarismo', 'Sustenta quem tem mais dificuldade de aparecer',
         'Reconhece o brilho alheio sem ciúme'],

        ['Devolve a confiança de quem estava inseguro', 'Cuida da festa como parte do trabalho',
         'Carrega o próprio erro sem se esconder']
      ],
      attention: [
        ['Busca reconhecimento constante para o que faz', 'Fica abalado quando o mérito passa despercebido',
         'Ocupa mais espaço do que o necessário na roda'],

        ['Faz do elogio o combustível do esforço', 'Leva o fracasso para o pessoal',
         'Espera que os outros leiam as pistas que deixa'],

        ['Confunde teimosia com firmeza', 'Adia decisões para não perder a graça',
         'Assume a culpa quando o resultado não sai como esperado']
      ]
    },

    /* ----------------------------------------------------------------
       Virgo
       ---------------------------------------------------------------- */
    virgo: {
      traits: [
        ['Analítico, com gosto por comparar opções', 'Prefere o papel de detalhe a holofotes',
         'Prepara tudo com antecedência', 'Responsável com o que lhe confiam'],

        ['Observador: repara no que mudou sem ninguém avisar', 'Organiza a vida para reduzir atrito',
         'Fala pouco, mas fala com precisão', 'Gosta de entender o processo antes de agir'],

        ['Cuida dos detalhes que os outros nem notam', 'Fica satisfeito com o papel que tem',
         'Estuda o assunto antes de opinar', 'Presta serviço sem ostentar']
      ],
      strengths: [
        ['Entrega trabalho confiável, sem depender de sorte', 'Transforma bagunça em processo claro',
         'Resolve o concreto com eficiência', 'Percebe o erro antes de ele virar problema'],

        ['Cuida dos outros sem esperar nada em troca', 'Melhora o que já existe com ajustes pequenos',
         'Entrega no prazo combinado', 'Escuta o bastante para entender a queixa real'],

        ['Adapta o método ao que a situação pede', 'Faz o que promete e avisa quando não pode',
         'Traz calma para situações confusas', 'Sustenta a rotina sem reclamar dela']
      ],
      attention: [
        ['Se cobra mais do que qualquer outro cobraria de si', 'Adia a entrega por medo do imperfeito',
         'Se perde nos detalhes e esquece o prazo'],

        ['Confunde ajuda com dívida', 'Corrige os outros sem perceber o tom',
         'Esgota a paciência com imperfeição alheia'],

        ['Se isola quando algo dá errado', 'Cansa de ser o responsável por todos',
         'Espera ter a solução pronta para pedir ajuda']
      ]
    },

    /* ----------------------------------------------------------------
       Libra
       ---------------------------------------------------------------- */
    libra: {
      traits: [
        ['Fala com cuidado para não ferir', 'Repara logo no que está desalinhado',
         'Gosta de estar em boa companhia', 'Busca acordo que agrade a todas as partes'],

        ['Aprecia o que é bem feito e bem apresentado', 'Encara a rotina como arte de ajuste fino',
         'Adia o confronto para manter a paz', 'Adora resolver com conversa'],

        ['Evita se impor, mas sabe do que precisa', 'Traz leveza ao grupo sem passar por cima',
         'Sabe dizer não sem magoar', 'Repara em detalhes que quase ninguém notaria']
      ],
      strengths: [
        ['Usa o diálogo para desmontar o atrito', 'Encontra o meio-termo sem perder o rigor',
         'Faz a ponte entre pessoas que não se entendem'],

        ['Sabe ouvir os dois lados com o mesmo peso', 'Desarma a bronca sem perder o assunto',
         'Cuida dos detalhes de apresentação', 'Faz quem está ao redor se sentir à vontade'],

        ['Transforma tensão em conversa possível', 'Vê o caminho viável dentro do conflito',
         'Cria confiança devagar e bem firmada', 'Respeita o tempo de cada pessoa']
      ],
      attention: [
        ['Evita confronto e dizer não não é caminho fácil', 'Decidir sozinho parece desconfortável',
         'Adapta-se tanto que perca o próprio jeito'],

        ['Foge do silêncio constrangido', 'Escolhe entre o que sente e o que o outro quer',
         'Espera o cenário ficar claro para agir'],

        ['Fala sim para poupar a cena', 'Adia o curto prazo para não quebrar a paz',
         'Esvazia a raiva ou guarda por muito tempo']
      ]
    },

    /* ----------------------------------------------------------------
       Escorpio
       ---------------------------------------------------------------- */
    escorpio: {
      traits: [
        ['Lê o que está por trás das palavras', 'Conduz as coisas até o fim',
         'Faz do silêncio uma ferramenta', 'Enfrenta o que os outros evitam'],

        ['Leal até o fim, ou rompe de uma vez', 'Percebe intenções antes da versão oficial',
         'Intenso em tudo o que assume', 'Age com força diante do que é injusto'],

        ['Nada do que sente fica pela metade', 'Silencioso enquanto precisa decidir',
         'Investe em verdade mais do que em conforto', 'Recomeça depois de derrubar tudo']
      ],
      strengths: [
        ['Investiga o que ficou por trás da cena', 'Firme nos momentos em que todos desistem',
         'Recomeça do zero quando precisa'],

        ['Não recua quando o assunto é difícil', 'Identifica o ponto que trava um projeto',
         'Concentra força quando tudo desanda', 'Cria lealdade sem parecer forçar'],

        ['Transforma crise em reaprendizado', 'Assume o que precisa assumir, sem fuga',
         'Faz o que promete, mesmo no inconvenient', 'Protege o que é dele sem pedir licença']
      ],
      attention: [
        ['Fica atento demais ao que não foi dito', 'Encara a confiança como risco a ser calculado',
         'Impõe o próprio ritmo nas relações'],

        ['Lê o mundo como disputa entre quem ganha e quem perde', 'Trabalha até o desgaste',
         'Testa quem está por perto até cansar', 'Não perdoa a traição nem depois de anos'],

        ['Guarda a mágoa e usa quando for preciso', 'Silencia a vontade de pedir perdão',
         'Dita as regras do seu jeito e espera obediência']
      ]
    },

    /* ----------------------------------------------------------------
       Sagitario
       ---------------------------------------------------------------- */
    sagitario: {
      traits: [
        ['Contagia entusiasmo com o que descobre', 'Fala o que pensa sem medir o tom',
         'Não resiste a um convite de aventura', 'Precisa de espaço para se sentir livre'],

        ['Faz do mundo uma sala de aula', 'Ri até do próprio erro',
         'Tem pressa de viver', 'Foge de quem quer prender a experiência'],

        ['Pensa em vida, não só em tarefa', 'Assume que aproveitar é prioridade',
         'Convence com entusiasmo e honestidade', 'Fica insatisfeito com o já conhecido']
      ],
      strengths: [
        ['Puxa os outros para o próximo passo', 'Enche o grupo de vontade de recomeço',
         'Transforma dúvida em curiosidade saudável'],

        ['Dá coragem para tentar o que dá medo', 'Transforma erro em história engraçada',
         'Vê o lado bom antes do lado ruim', 'Fala de um jeito que deixa a pessoa leve'],

        ['Acredita no recomeço melhor que o passado', 'Traz notícia do que está por vir',
         'Inspira movimento em quem ficou parado', 'Explica o difícil de um jeito que dá vontade de tentar']
      ],
      attention: [
        ['Assume compromissos antes de medir o tamanho', 'O tédio o faz recomeçar tudo do zero',
         'Solta a verdade na hora mais inconvenient'],

        ['Fala a verdade no pior momento', 'Some quando o compromisso aperta',
         'Explica como se todos estivessem na mesma página'],

        ['Só se preocupa quando o assunto interessa de verdade', 'Esquenta com teimosia sem motivo',
         'Perde o interesse bem na hora de fechar']
      ]
    },

    /* ----------------------------------------------------------------
       Capricornio
       ---------------------------------------------------------------- */
    capricornio: {
      traits: [
        ['Responsável desde cedo', 'Constrói tudo com base em plano',
         'Pouca paciência para quem improvisa', 'Leva a vida a sério, sem drama'],

        ['Vive pela meta que vem depois', 'Sabe esperar o momento certo para agir',
         'Exige de si mais do que exige dos outros', 'Sustenta a rotina que já funciona'],

        ['Prático e estratégico, fala em plano', 'Não se abala com rotina',
         'Corrige o próprio erro sem drama', 'Convence com fatos e números']
      ],
      strengths: [
        ['Constrói o que fica depois de muito tempo', 'Carrega o plano nas costas sem reclamar',
         'Entrega o combinado mesmo com a cabeça cansada'],

        ['Assume a responsabilidade que ninguém quer', 'Entrega no prazo, mesmo sob pressão',
         'Constrói em vez de gastar', 'Lida com burocracia sem perder a paciência'],

        ['Faz o que disse que ia fazer', 'Organiza recursos com cuidado',
         'Enfrenta tarefas longas sem perder o rumo', 'Cresce a cada obstáculo novo']
      ],
      attention: [
        ['Se cobra mais do que seria justo', 'Resolve sozinho o que podia dividir',
         'Mantém o passo mesmo quando o corpo pede pausa'],

        ['Mede o valor do descanso em produtividade', 'Trabalha para merecer o direito de descansar',
         'Endurece a resposta quando o assunto é pessoal'],

        ['Fica exausto e chama isso de rotina', 'Adia pedir socorro até virar emergência',
         'Perde o interesse no que não cabe no plano']
      ]
    },

    /* ----------------------------------------------------------------
       Aquario
       ---------------------------------------------------------------- */
    aquario: {
      traits: [
        ['Pensamento lateral, do jeito dele', 'Segue a própria rota mesmo sem plateia',
         'Defende o diferente sem se desculpar', 'Se sente em casa entre quem pensa diferente'],

        ['Impulsionado pela ideia, não pela tradição', 'Analisa o sistema antes de aceitar as regras',
         'Apoia causas que nunca viu pessoalmente', 'Guarda distância quando o clima fica íntimo'],

        ['Inventa solução para problema que ninguém percebia', 'Luta pelo coletivo sem abrir mão do próprio espaço',
         'Aceita o incomum como normal', 'Age por princípio mesmo custando audiência']
      ],
      strengths: [
        ['Abre caminhos que ninguém mais pensou', 'Trata o diferente com naturalidade',
         'Age pelo princípio mesmo sem plateia'],

        ['Escuta o ponto de vista do outro sem perder o seu', 'Cria espaço onde todo mundo cabe',
         'Contesta ideia sem atacar quem trouxe', 'Enxerga o padrão que trava o grupo'],

        ['Enriquece o debate com visão de fora', 'Defende o diferente sem transformá-lo em escolha pessoal',
         'Cobra coerência, não conformidade', 'Conecta quem trabalha sozinho com quem faz grupo']
      ],
      attention: [
        ['Analisa a emoção de longe e perde o essencial', 'Defende a ideia acima do vínculo',
         'Sente falta de quem está por perto sem chegar mais perto'],

        ['Corta a emotividade e chama isso de objetividade', 'Some quando a conversa pede opinião pessoal',
         'Escolhe o grupo pela ideia e não pela afinidade'],

        ['Mantém distância mesmo querendo aproximar', 'Discute princípio no lugar de resolver a situação',
         'Respeta tanto a diferença que não se envolve']
      ]
    },

    /* ----------------------------------------------------------------
       Peixes
       ---------------------------------------------------------------- */
    peixes: {
      traits: [
        ['Absorve o clima do ambiente sem perceber', 'Tem um mundo interno rico e imaginado',
         'Escuta mais do que fala', 'Se dissolve no sonho quando a realidade aperta'],

        ['Permeável ao que os outros sentem', 'Cria com delicadeza e originalidade',
         'Perdoa e aceita diferenças com facilidade', 'Foge do que é brusco e concreto'],

        ['Sensível ao que não foi dito', 'Generoso com o tempo dos outros',
         'Leva a vida com menos pressa', 'Se encontra na arte, na música e na água']
      ],
      strengths: [
        ['Acolhe a dor do outro sem tentar consertar', 'Cria do seu jeito, sem pressa e sem receita',
         'Aceita quem é diferente sem esforço'],

        ['Acolhe sem fazer questão da dor', 'Ajuda o outro a dizer o que ainda não consegue',
         'Cria clima de confiança com pouco esforço', 'Enxerga o potencial de quem já foi desistido'],

        ['Sente junto sem se perder', 'Transforma a dor em criação',
         'Aceita o diferente sem esforço', 'Tem paciência para o tempo das coisas']
      ],
      attention: [
        ['Deixa o problema pesar mais do que precisa', 'Adia a decisão até não ter mais prazo',
         'Carrega o clima de quem está ao redor'],

        ['Carrega a tristeza que não é dele', 'Fica à deriva quando precisa escolher',
         'Perdoa demais quem não pediu perdão'],

        ['Diz sim para não decepcionar', 'Adia a decisão até a oportunidade passar',
         'Se machuca e não conta a ninguém']
      ]
    }
  };

  global.MeuSigno = global.MeuSigno || {};
  global.MeuSigno.PROFILES = PROFILES;
})(window);