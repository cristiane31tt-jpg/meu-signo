/* =====================================================================
   MEU SIGNO - Perfil dinamico por signo
   ---------------------------------------------------------------------
   Monta as tres secoes que aparecem na tela de resultado e na pagina
   do signo:

     - Caracteristicas
     - Pontos fortes
     - Pontos de atenção

   De onde vem o conteudo

   Para cada secao existe um conjunto padrao em js/data/signs.js e tres
   variacoes adicionais em js/data/profiles.js. Os quatro entram juntos
   na rotacao. O app nao sorteia frases soltas: ele sorteia um
   conjunto inteiro de cada secao, o que garante tres coisas ao mesmo
   tempo:

     1. O signo continua coerente. As variacoes nunca saem do banco
        daquele signo e nao se contradizem entre si.
     2. A combinacao muda de verdade. Cada conjunto destaca aspects
        diferentes do mesmo perfil, e nao apenas troca palavras.
     3. Nada se repete em seguida. A rotacao nunca entrega a mesma
        variacao duas vezes seguidas, nem ao fechar e abrir o app.

   Como funciona a rotacao

   Cada par (signo, secao) tem uma bolsa propria, guardada em
   sessionStorage: a lista embaralhada do que ainda nao saiu. Cada
   consulta gasta uma variacao. Quando a bolsa esvazia, um ciclo novo
   comeca sem repetir a ultima. A ultima variante usada tambem fica em
   localStorage, para que a primeira exibicao de uma sessao nova nunca
   seja igual a ultima da sessao anterior.

   Como adicionar uma variacao nova
   ---------------------------------------------------------------------
   Bastante acrescentar um array em js/data/profiles.js, dentro do
   grupo desejado. Nada aqui precisa mudar: a nova variacao entra
   automaticamente na rotacao.
   ===================================================================== */

(function (global) {
  'use strict';

  var M = global.MeuSigno;

  /* Cada grupo: nome da secao, campo noSigns e campo no Profiles. */
  var GROUPS = [
    { id: 'traits', field: 'traits', label: 'Características' },
    { id: 'strengths', field: 'strengths', label: 'Pontos fortes' },
    { id: 'attention', field: 'attention', label: 'Pontos de atenção' }
  ];

  /* Um item precisa ser texto com alguma coisa dentro. */
  function validItems(list) {
    return Array.isArray(list) && list.length > 0 && list.every(function (item) {
      return typeof item === 'string' && item.trim().length > 0;
    });
  }

  /* O banco traz uma lista de itens por variacao. Descarta as que
     vierem malformadas em vez de quebrar a tela. */
  function validVariants(list) {
    if (!Array.isArray(list)) {
      return [];
    }
    return list.filter(validItems);
  }

  /* Junta o conjunto padrao doSigns com as variacoes do Profiles.
     Devolve null quando nao ha nada utilizavel, para quem chama
     recorrer ao texto fixo. */
  function variantsFor(sign, group) {
    var bank = (M.PROFILES || {})[sign.id] || {};
    var lists = validVariants(bank[group.id]);

    if (validItems(sign[group.field])) {
      lists.unshift(sign[group.field]);
    }

    return lists.length ? lists : null;
  }

  /* ------------------------------------------------------------------
     Perfil de um signo: as tres listas ja sorteadas.

     Cada secao e sorteada de forma independente, entao o resultado
     seguinte pode repetir um item que estava em outro conjunto: sao
     secoes diferentes, com pesos diferentes.
     ------------------------------------------------------------------ */
  function forSign(signId) {
    var sign = M.getSign(signId);
    var profile = { signId: signId };

    GROUPS.forEach(function (group) {
      var variants = sign ? variantsFor(sign, group) : null;

      if (!variants) {
        profile[group.id] = (sign && sign[group.field]) || [];
        return;
      }

      var chosen = M.Phrases.set(
        'profile:' + signId + ':' + group.id,
        variants
      );

      profile[group.id] = chosen || sign[group.field];
    });

    return profile;
  }

  /* ------------------------------------------------------------------
     Quantas variacoes existem para um grupo. Util para os testes e
     para quem quiser conferir o tamanho do banco.
     ------------------------------------------------------------------ */
  function countFor(signId, groupId) {
    var sign = M.getSign(signId);
    if (!sign) {
      return 0;
    }
    for (var i = 0; i < GROUPS.length; i++) {
      if (GROUPS[i].id === groupId) {
        return (variantsFor(sign, GROUPS[i]) || []).length;
      }
    }
    return 0;
  }

  M.Profiles = {
    GROUPS: GROUPS,
    forSign: forSign,
    countFor: countFor
  };
})(window);