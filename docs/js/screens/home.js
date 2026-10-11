/* =====================================================================
   MEU SIGNO - Tela 1: inicial
   Campo de data, botao de descoberta e atalho para os 12 signos.
   ===================================================================== */

(function (global) {
  'use strict';

  var M = global.MeuSigno;
  M.screens = M.screens || {};

  var SPARKLE =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3.5 13.7 9l5.5 1.7-5.5 1.7L12 18l-1.7-5.6L4.8 10.7 10.3 9Z"/>' +
    '<path d="M18.5 16.5 19.2 19l2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7Z"/>' +
    '</svg>';

  var GRID =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="3.6" y="3.6" width="7" height="7" rx="2"/>' +
    '<rect x="13.4" y="3.6" width="7" height="7" rx="2"/>' +
    '<rect x="3.6" y="13.4" width="7" height="7" rx="2"/>' +
    '<rect x="13.4" y="13.4" width="7" height="7" rx="2"/>' +
    '</svg>';

  var CALENDAR =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<rect x="3.6" y="5" width="16.8" height="15.4" rx="3"/>' +
    '<path d="M3.6 9.6h16.8M8.4 3.4v3.4M15.6 3.4v3.4"/>' +
    '</svg>';

  var INFO =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="8.6"/>' +
    '<path d="M12 11v5.2"/><path d="M12 7.9h.01"/>' +
    '</svg>';

  function todayISO() {
    var now = new Date();
    var m = String(now.getMonth() + 1).padStart(2, '0');
    var d = String(now.getDate()).padStart(2, '0');
    return now.getFullYear() + '-' + m + '-' + d;
  }

  M.screens.home = {
    title: 'Meu Signo',
    tab: '#/',

    render: function (root) {
      var UI = M.UI;

      root.innerHTML =
        '<div class="page">' +
        '  <section class="hero">' +
        '    <div class="hero__mark" aria-hidden="true">' + SPARKLE + '</div>' +
        '    <h1 class="hero__title">Meu Signo</h1>' +
        '    <p class="hero__phrase">' + M.Phrases.homeIntro() + '</p>' +
        '  </section>' +
        '  <section class="hero__card">' +
        '    <div class="hero__card-head">' +
        '      <h2 class="hero__card-title">Qual é o seu signo?</h2>' +
        '      <p class="hero__card-sub">Informe sua data de nascimento. O cálculo é feito no seu aparelho.</p>' +
        '    </div>' +
        '    <label class="field" for="birth-date">' +
        '      <span class="field__label">Data de nascimento</span>' +
        '      <span class="field__control">' + CALENDAR +
        '        <input type="date" id="birth-date" inputmode="numeric"' +
        '               min="1900-01-01" max="' + todayISO() + '"' +
        '               value="' + UI.escape(UI.loadLastDate()) + '"' +
        '               autocomplete="bday" aria-describedby="birth-hint">' +
        '      </span>' +
        '    </label>' +
        '    <p class="field__hint" id="birth-hint">A data fica apenas neste dispositivo.</p>' +
        '    <p class="field__error" id="birth-error" role="alert"></p>' +
        '    <div class="btn-row" style="margin-top:var(--gap)">' +
        '      <button class="btn btn--primary" type="button" id="btn-discover">' +
        SPARKLE + 'Descobrir meu signo</button>' +
        '      <a class="btn btn--ghost" href="#/signos">' + GRID + 'Explorar os 12 signos</a>' +
        '    </div>' +
        '  </section>' +
        '  <div class="notice home__footer-links">' + INFO +
        '    <span>Depois de descobrir, você pode consultar a compatibilidade entre ' +
        '    qualquer par de signos e abrir a página de cada um dos 12.</span>' +
        '  </div>' +
          UI.note() +
        '</div>';

      this.bind(root);
    },

    bind: function (root) {
      var input = root.querySelector('#birth-date');
      var errorBox = root.querySelector('#birth-error');
      var button = root.querySelector('#btn-discover');

      /* Tira o erro assim que a pessoa corrige a data. */
      input.addEventListener('input', function () {
        errorBox.textContent = '';
      });

      /* Enter no campo tambem descobre o signo. */
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          discover();
        }
      });

      button.addEventListener('click', discover);

      function discover() {
        var parsed = M.Zodiac.parseBirthDate(input.value);

        if (!parsed.ok) {
          errorBox.textContent = parsed.error;
          input.focus();
          return;
        }

        var sign = M.Zodiac.getSign(parsed.date);
        if (!sign) {
          errorBox.textContent = 'Não foi possível identificar o signo dessa data.';
          return;
        }

        M.state.birthDate = parsed.date;
        M.state.signId = sign.id;
        M.UI.saveLastDate(input.value);
        global.location.hash = '#/signo';
      }
    }
  };
})(window);
