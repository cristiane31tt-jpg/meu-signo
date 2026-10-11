/* =====================================================================
   MEU SIGNO - Sorteio de frases
   ---------------------------------------------------------------------
   Como uma frase e escolhida a cada abertura do app.

   A regra e simples: cada conjunto de frases (o da home, o de um signo)
   tem uma "bolsa". A primeira vez que o conjunto e usado, a bolsa e
   embaralhada; as proximas vezes vao retirando frases dela, uma por
   vez, sem repetir. Quando a bolsa esvazia, ela e embaralhada de novo.

   Resultado: o usuario nunca ve a mesma frase duas aberturas seguidas,
   e mesmo dentro de um ciclo longo as frases ficam bem distribuidas.

   Onde o progresso fica guardado
   ---------------------------------------------------------------------
   - sessionStorage: qual frase foi usada na sessao atual. Se fechar e
     abrir o app, comeca um ciclo novo.
   - localStorage: a ultima frase de cada conjunto, para o caso de o
     navegador bloquear o sessionStorage.

   Se nenhum armazenamento estiver disponivel (modo privado muito
   restrito), o sorteio volta a ser aleatorio simples e o app continua
   funcionando normalmente.
   ===================================================================== */

(function (global) {
  'use strict';

  var M = global.MeuSigno;
  var SESSION_KEY = 'meu-signo:bag:';
  var LAST_KEY = 'meu-signo:last:';

  /* ------------------------------------------------------------------
     Armazenamento tolerante a falha.
     ------------------------------------------------------------------ */
  function readSession(key) {
    try {
      return global.sessionStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeSession(key, value) {
    try {
      global.sessionStorage.setItem(key, value);
    } catch (error) {
      /* Modo privado pode bloquear. O app segue funcionando. */
    }
  }

  function readLocal(key) {
    try {
      return global.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeLocal(key, value) {
    try {
      global.localStorage.setItem(key, value);
    } catch (error) {
      /* Sem espaco em disco: sem persistencia, e tudo bem. */
    }
  }

  /* ------------------------------------------------------------------
     Fisher-Yates: embaralha sem viés e sem mexer no array original.
     ------------------------------------------------------------------ */
  function shuffle(list) {
    var copy = list.slice();

    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  /* ------------------------------------------------------------------
     Sorteia uma frase de um conjunto, evitando repetir a anterior.
     ------------------------------------------------------------------ */
  function pick(bucket, list) {
    if (!list || list.length === 0) {
      return null;
    }
    if (list.length === 1) {
      return { value: list[0], index: 0 };
    }

    var bag = readSession(SESSION_KEY + bucket);
    var lastRaw = readLocal(LAST_KEY + bucket);
    var last = lastRaw === null ? -1 : Number(lastRaw);

    if (!bag) {
      bag = shuffle(list.map(function (_, index) { return index; }));

      /* Sessao nova: descarta a ultima variante usada para que a
         primeira exibicao de hoje nao repita a ultima de ontem. */
      if (last >= 0 && last < list.length) {
        bag = bag.filter(function (index) { return index !== last; });
      }
    } else {
      bag = bag.split(',').map(Number).filter(function (index) {
        return index >= 0 && index < list.length;
      });
    }

    /* Bolsa corrompida ou sem movimento: comeca um ciclo novo. */
    if (bag.length === 0) {
      bag = shuffle(list.map(function (_, index) { return index; }));
    }

    var index = bag.shift();

    /*Ultima retirada: garante que a frase final do ciclo seja
      diferente da primeira, fechando o ciclo sem repeticao. */
    if (bag.length === 1 && bag[0] === index) {
      bag = [];
    }

    writeSession(SESSION_KEY + bucket, bag.join(','));
    writeLocal(LAST_KEY + bucket, String(index));

    return { value: list[index], index: index };
  }

  /* ------------------------------------------------------------------
     Sorteia um item qualquer de uma lista guardando o ciclo, sem
     depender do tipo do item. Usado pelas variacoes de perfil.
     ------------------------------------------------------------------ */
  function set(bucket, list) {
    var chosen = pick(bucket, list);
    return chosen ? chosen.value : null;
  }

  /* ------------------------------------------------------------------
     Frase da tela inicial.
     ------------------------------------------------------------------ */
  function homeIntro() {
    return set('home', M.PHRASES.home.intro) || '';
  }

  /* ------------------------------------------------------------------
     Frase de um signo. Se o signo nao tiver frases, devolve vazio.
     ------------------------------------------------------------------ */
  function forSign(signId) {
    return set('sign:' + signId, (M.PHRASES.signs || {})[signId] || []) || '';
  }

  /* ------------------------------------------------------------------
     Sorteio de um item qualquer de uma lista, usado pela
     compatibilidade. Menos estados, entao nao persiste.
     ------------------------------------------------------------------ */
  function fromList(list) {
    if (!list || !list.length) {
      return '';
    }
    return list[Math.floor(Math.random() * list.length)];
  }

  M.Phrases = {
    shuffle: shuffle,
    set: set,
    homeIntro: homeIntro,
    forSign: forSign,
    fromList: fromList
  };
})(window);
