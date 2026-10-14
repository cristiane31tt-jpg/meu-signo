/* =====================================================================
   MEU SIGNO - Tela 3: os 12 signos
   Grade com todos os signos. Tocar em um abre a pagina dele.
   ===================================================================== */

(function (global) {
  'use strict';

  var M = global.MeuSigno;
  M.screens = M.screens || {};

  /* Periodo curto para o card: "21/03 - 19/04". */
  function shortPeriod(sign) {
    return M.pad2(sign.from[1]) + '/' + M.pad2(sign.from[0]) +
      ' - ' + M.pad2(sign.to[1]) + '/' + M.pad2(sign.to[0]);
  }

  M.screens.allSigns = {
    title: 'Os 12 signos',
    tab: '#/signos',

    render: function (root) {
      var UI = M.UI;
      var signs = M.orderedSigns();

      var cards = signs
        .map(function (sign) {
          return (
            '<a class="sign-card" href="#/signos/' + sign.id + '" ' +
            'style="--sign:' + sign.color + '">' +
            '  <span class="sign-card__glyph">' + UI.glyph(sign) + '</span>' +
            '  <span class="sign-card__name">' + UI.escape(sign.name) + '</span>' +
            '  <span class="sign-card__period">' + UI.escape(shortPeriod(sign)) + '</span>' +
            '</a>'
          );
        })
        .join('');

      root.innerHTML =
        '<div class="page">' +
        '  <header class="section-head all-signs__legend">' +
        '    <h1 class="section-head__title">Os 12 signos</h1>' +
        '    <p class="section-head__sub">Toque em um signo para ver perfil e características.</p>' +
        '  </header>' +
        '  <div class="sign-grid stagger">' + cards + '</div>' +
          UI.note() +
        '</div>';
    }
  };
})(window);
