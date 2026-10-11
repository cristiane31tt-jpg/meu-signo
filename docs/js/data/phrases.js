/* =====================================================================
   MEU SIGNO - Frases
   ---------------------------------------------------------------------
   Todo o texto "de impacto" do app fica neste arquivo. Nenhuma frase
   esta escrita dentro das telas: elas apenas pedem uma frase aqui.

   Como adicionar frases novas
   ---------------------------------------------------------------------
   - Home: acrescente uma frase no array PHRASES.home.intro.
     Com 3 ou mais frases, a rotacao evita repetir a anterior.
   - Por signo: acrescente uma frase no array do signo desejado em
     PHRASES.signs. Quantas frases quiser: o app sorteia sem repetir
     ate o ciclo acabar.

   Nenhuma frase pode se repetir dentro do mesmo conjunto: os testes
   do projeto falham se isso acontecer, porque repetir e exatamente o
   que a rotacao tenta evitar.
   ===================================================================== */

(function (global) {
  'use strict';

  var PHRASES = {

    /* ----------------------------------------------------------------
       Frases da tela inicial. Curtas, intrigantes, sem repetir.
       ---------------------------------------------------------------- */
    home: {
      intro: [
        'Existe uma história escrita nas estrelas. Descubra a sua.',
        'Você conhece seu signo. Mas conhece mesmo a sua personalidade?',
        'Doze signos. Bilhões de personalidades. Descubra a sua.',
        'Talvez você tenha chegado aqui por um motivo.',
        'Cada signo carrega uma força. Qual é a sua?',
        'O que o seu signo revela sobre você?',
        'Algumas conexões parecem acaso. Outras, nem tanto.',
        'Uma data marca o dia. O signo marca o temperamento.',
        'Observe como você reage. Há um signo nisso.',
        'Todo signo tem um paradoxo. O seu é qual?',
        'Existe um mapa nas estrelas, e você é uma linha dele.',
        'Você é a soma de tudo o que já foi. O signo organiza.',
        'O que você procura aqui talvez ainda não tenha nome.',
        'Há um talento seu que quase ninguém percebe.',
        'Nenhuma combinação é acidental. Nem todo encontro é casual.',
        'Antes de conhecer seu signo, você já o viveu.'
      ]
    },

    /* ----------------------------------------------------------------
       Frases de cada signo. Aparecem na tela de resultado e na página
       do signo, sempre sorteadas de forma diferente.
       ---------------------------------------------------------------- */
    signs: {
      aries: [
        'Intensidade, iniciativa e coragem. Descubra o que existe por trás dessa combinação.',
        'Você decide rápido demais para perder uma oportunidade.',
        'Há uma impaciência em você que já abriu portas que outras pessoas demoram um ano para tocar.',
        'A coragem não é o que mais se destaca em você. É a vontade de tentar.'
      ],

      taurus: [
        'Determinação e estabilidade dizem muito sobre você.',
        'Você constrói devagar e por isso quase nada do que faz se desfaz.',
        'Existe paciência em você que outras pessoas acham difícil de entender.',
        'Você valoriza o que tem valor real, e isso é raro.'
      ],

      geminis: [
        'Curiosidade, comunicação e movimento fazem parte dessa personalidade.',
        'Sua mente muda de assunto rápido, mas nunca para de aprender.',
        'Você entende pessoas diferentes porque enxerga o mundo de jeitos diferentes.',
        'A conversa é o seu lugar mais confortável.'
      ],

      cancer: [
        'Você sente o clima de um ambiente antes de qualquer outra pessoa.',
        'Há um cuidado em você que não precisa ser solicitado.',
        'Você guarda as coisas que importam por muito tempo.',
        'Segurança, para você, não é luxo: é necessidade.'
      ],

      leo: [
        'Você entra em um lugar e o lugar muda um pouco.',
        'Há uma necessidade de brilho em você que vai além da vaidade.',
        'Você não faz nada pela metade, nem mesmo se proteger.',
        'Quando você gosta de alguém, essa pessoa sente.'
      ],

      virgo: [
        'Você percebe o que passou despercebido e quase sempre conserta.',
        'Existe um critério em você que trabalha mesmo quando ninguém vê.',
        'Você se cobra mais do que os outros se cobram de você.',
        'O detalhe é a sua forma de cuidado.'
      ],

      libra: [
        'Você busca equilíbrio antes de decidir quase tudo.',
        'Há elegância em você que aparece nos gestos pequenos.',
        'Você repara na pessoa que está excluída da conversa.',
        'Justiça, para você, é um assunto pessoal.'
      ],

      escorpio: [
        'Você não se contenta com a versão fácil das coisas.',
        'Existe intensidade em você que não se desliga.',
        'Você lê o que não foi dito melhor do que quem disse.',
        'Quando você entrega confiança, é para sempre.'
      ],

      sagitario: [
        'Você precisa de espaço, sentido e um horizonte novo.',
        'O entusiasmo em você é contagioso, mesmo quando você não tenta.',
        'Você prefere a verdade incômoda ao conforto da conversa.',
        'Existe em você uma vontade de ir além do que já é conhecido.'
      ],

      capricornio: [
        'Você leva a vida a sério, e isso costuma render.',
        'Existe uma disciplina em você que precede a motivação.',
        'Você constrói em silêncio e cobra o resultado de si mesmo.',
        'Nada em você é acaso. Tudo em você é método.'
      ],

      aquario: [
        'Você questiona a regra antes de obedecê-la.',
        'Há uma liberdade em você que não se negocia.',
        'Você enxerga alternativas onde os outros só veem um caminho.',
        'Você age do jeito que acha certo, mesmo ficando sozinho nisso.'
      ],

      peixes: [
        'Você capta o clima de um ambiente antes dos outros.',
        'Existe imaginação em você que não obedece horário.',
        'Você sente a dor alheia como se fosse sua.',
        'Sua vida tem uma parte que só existe no que você imagina.'
      ]
    }
  };

  global.MeuSigno = global.MeuSigno || {};
  global.MeuSigno.PHRASES = PHRASES;
})(window);
