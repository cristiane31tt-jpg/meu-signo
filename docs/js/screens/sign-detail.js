/* =====================================================================
   MEU SIGNO - Tela 4: pagina de um signo
   Mesmo conteudo da tela de resultado, mas acessivel para os 12 signos
   e sem depender de data de nascimento.
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

  var BACK =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="3.6" y="3.6" width="7" height="7" rx="2"/>' +
    '<rect x="13.4" y="3.6" width="7" height="7" rx="2"/>' +
    '<rect x="3.6" y="13.4" width="7" height="7" rx="2"/>' +
    '<rect x="13.4" y="13.4" width="7" height="7" rx="2"/>' +
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

  M.screens.signDetail = {
    title: 'Signo',
    tab: '#/signos',

    render: function (root, params) {
      var UI = M.UI;
      var sign = M.getSign(params.id);

      if (!sign) {
        root.innerHTML =
          '<div class="page">' +
          '  <div class="empty">' +
          '    <div class="empty__icon">' +
          '      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" ' +
          '           stroke-linecap="round" stroke-linejoin="round">' +
          '        <circle cx="12" cy="12" r="8.6"/><path d="M9.4 9.4h.01"/><path d="M14.6 9.4h.01"/>' +
          '        <path d="M8.6 14.6c1.8 1.7 5 1.7 6.8 0"/>' +
          '      </svg>' +
          '    </div>' +
          '    <h1 class="section-head__title">Signo não encontrado</h1>' +
          '    <p class="section-head__sub">Escolha um dos 12 signos na lista.</p>' +
          '    <div style="margin-top:var(--gap)">' +
          '      <a class="btn btn--primary" href="#/signos">Ver os 12 signos</a>' +
          '    </div>' +
          '  </div>' +
            UI.note() +
          '</div>';
        return;
      }

      UI.applySignColor(root, sign);
      var isMySign = M.state.signId === sign.id;

      /* Mesma rotacao da tela de resultado: variacao nova a cada visita. */
      var profile = M.Profiles.forSign(sign.id);

      root.innerHTML =
        '<div class="page">' +
        '  <section class="detail__hero">' +
        '    <div class="detail__glyph">' + UI.signMark(sign) + '</div>' +
        '    <div class="detail__text">' +
        '      <h1 class="detail__name">' + UI.escape(sign.name) + '</h1>' +
        '      <p class="detail__period">' + UI.escape(sign.tagline) + '</p>' +
        '      <p class="detail__period">' + UI.escape(M.Zodiac.buildPeriod(sign)) + '</p>' +
        '      <p class="detail__phrase">' + UI.escape(M.Phrases.forSign(sign.id)) + '</p>' +
        '    </div>' +
        '  </section>' +
        '  <div class="chips detail__facts">' +
             fact('elemento', sign.element) +
             fact('modalidade', sign.modality) +
             fact('regente', sign.ruler) +
             fact('polaridade', sign.polarity) +
        '  </div>' +
        section('Sobre',
          '<p>' + UI.escape(sign.description) + '</p>') +
        section('Características',
          UI.list(profile.traits, 'traits')) +
        section('Pontos fortes',
          UI.list(profile.strengths, 'good')) +
        section('Pontos de atenção',
          UI.list(profile.attention, 'warn')) +
        '  <div class="btn-row" style="margin-top:var(--gap-lg)">' +
        '    <a class="btn btn--sign" href="#/compatibilidade">' + HEART +
             'Comparar este signo</a>' +
        '    <a class="btn btn--ghost" href="#/signos">' + BACK + 'Ver os 12 signos</a>' +
        '  </div>' +
        (isMySign
          ? '  <p class="muted" style="margin-top:var(--gap);text-align:center;font-size:.82rem">' +
            'Este é o seu signo.</p>'
          : '') +
          UI.note() +
        '</div>';
    }
  };
})(window);
