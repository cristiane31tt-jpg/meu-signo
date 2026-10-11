/* =====================================================================
   MEU SIGNO - Tela 2: resultado
   Mostra o signo escolhido pelo usuario, com todas as informacoes
   quebradas em secoes curtas.
   ===================================================================== */

(function (global) {
  'use strict';

  var M = global.MeuSigno;
  M.screens = M.screens || {};

  var HEART =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 20.2S3.8 15.4 3.8 9.7A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 8.2 2.1c0 5.7-8.2 10.5-8.2 10.5Z"/>' +
    '</svg>';

  var GRID =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="3.6" y="3.6" width="7" height="7" rx="2"/>' +
    '<rect x="13.4" y="3.6" width="7" height="7" rx="2"/>' +
    '<rect x="3.6" y="13.4" width="7" height="7" rx="2"/>' +
    '<rect x="13.4" y="13.4" width="7" height="7" rx="2"/>' +
    '</svg>';

  var WARN =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="8.6"/>' +
    '<path d="M12 7.8v4.6"/><path d="M12 16h.01"/>' +
    '</svg>';

  function fact(label, value) {
    return '<span class="chip"><strong>' + M.UI.escape(value) + '</strong> ' +
      M.UI.escape(label) + '</span>';
  }

  function section(title, inner) {
    return '<section class="section">' +
      '<h2 class="section__title">' + M.UI.escape(title) + '</h2>' +
      inner +
      '</section>';
  }

  M.screens.result = {
    title: 'Seu signo',
    tab: '#/',

    render: function (root) {
      var UI = M.UI;
      var sign = M.getSign(M.state.signId);

      /* Sem signo definido (acesso direto pela URL), volta para o inicio. */
      if (!sign) {
        global.location.replace('#/');
        return;
      }

      UI.applySignColor(root, sign);

      /* Cada secao sorteia sua propria variacao do banco do signo. */
      var profile = M.Profiles.forSign(sign.id);

      var dateNote = M.state.birthDate
        ? UI.escape(M.Zodiac.formatDate(M.state.birthDate))
        : '';

      root.innerHTML =
        '<div class="page">' +
        '  <section class="result__hero">' +
        '    <div class="result__halo" aria-hidden="true"></div>' +
        '    <div class="result__glyph">' + UI.signMark(sign) + '</div>' +
        '    <h1 class="result__name">' + UI.escape(sign.name) + '</h1>' +
        '    <p class="result__tagline">' + UI.escape(sign.tagline) + '</p>' +
        '    <p class="result__period">' + UI.escape(M.Zodiac.buildPeriod(sign)) + '</p>' +
        '    <p class="result__phrase">' + UI.escape(M.Phrases.forSign(sign.id)) + '</p>' +
        '  </section>' +
        '  <div class="chips result__facts">' +
             fact('elemento', sign.element) +
             fact('modalidade', sign.modality) +
             fact('regente', sign.ruler) +
             fact('polaridade', sign.polarity) +
             (dateNote ? '<span class="chip"><strong>' + dateNote + '</strong></span>' : '') +
        '  </div>' +
        (M.Zodiac.isNearBoundary(M.state.birthDate)
          ? '  <div class="notice notice--gold" style="margin-top:var(--gap)">' + WARN +
            '    <span>Sua data cai em uma fronteira entre signos. Nessa transição, o signo ' +
            'pode variar conforme o ano e o local de nascimento.</span></div>'
          : '') +
        section('Sobre',
          '<p>' + UI.escape(sign.description) + '</p>') +
        section('Características',
          UI.list(profile.traits, 'traits')) +
        section('Pontos fortes',
          UI.list(profile.strengths, 'good')) +
        section('Pontos de atenção',
          UI.list(profile.attention, 'warn')) +
        '  <div class="btn-row result__actions">' +
        '    <a class="btn btn--sign" href="#/compatibilidade">' + HEART +
             'Ver compatibilidade</a>' +
        '    <a class="btn btn--ghost" href="#/signos">' + GRID + 'Ver os 12 signos</a>' +
        '  </div>' +
          UI.note() +
        '</div>';
    }
  };
})(window);
