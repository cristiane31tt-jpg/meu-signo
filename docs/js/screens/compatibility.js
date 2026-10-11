/* =====================================================================
   MEU SIGNO - Tela 5: compatibilidade
   O usuario escolhe dois signos e recebe a analise em quatro
   categorias: amor, amizade, comunicacao e compatibilidade geral.
   ===================================================================== */

(function (global) {
  'use strict';

  var M = global.MeuSigno;
  M.screens = M.screens || {};

  var CHEVRON =
    '<svg class="sign-picker__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="m6 9 6 6 6-6"/></svg>';

  var SWAP =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7.5 4.5 4 8l3.5 3.5"/><path d="M4 8h9a5 5 0 0 1 5 5v.5"/>' +
    '<path d="M16.5 19.5 20 16l-3.5-3.5"/><path d="M20 16h-9a5 5 0 0 1-5-5v-.5"/>' +
    '</svg>';

  var SEARCH =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="11" cy="11" r="6.4"/><path d="m15.8 15.8 4 4"/>' +
    '</svg>';

  var STAR =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M12 3.6 14.5 9l5.9.5-4.5 3.9 1.4 5.8L12 16.1 6.7 19.2l1.4-5.8L3.6 9.5 9.5 9Z"/>' +
    '</svg>';

  var USER =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<circle cx="12" cy="8.4" r="3.6"/>' +
    '<path d="M4.8 20a7.2 7.2 0 0 1 14.4 0"/>' +
    '</svg>';

  /* Monta o <select> com os 12 signos, já marcando o selecionado. */
  function options(selectedId) {
    return M.orderedSigns()
      .map(function (sign) {
        var selected = sign.id === selectedId ? ' selected' : '';
        return '<option value="' + sign.id + '"' + selected + '>' +
          M.UI.escape(sign.name) + '</option>';
      })
      .join('');
  }

  function picker(id, label, glyphIcon, selectedId) {
    var sign = M.getSign(selectedId);
    var color = sign ? sign.color : 'var(--brand)';

    return (
      '<div class="sign-picker__control" style="--dot-color:' + color + '">' +
      '  <span class="sign-picker__dot" aria-hidden="true">' + glyphIcon + '</span>' +
      '  <label class="visually-hidden" for="' + id + '">' + M.UI.escape(label) + '</label>' +
      '  <select id="' + id + '" name="' + id + '">' + options(selectedId) + '</select>' +
          CHEVRON +
      '</div>'
    );
  }

  function signGlyph(sign) {
    return (
      '<a class="compat__sign" href="#/signos/' + sign.id + '" style="--tone:' + sign.color + '">' +
      '  <span class="compat__sign-glyph">' + M.UI.glyph(sign) + '</span>' +
      '  <span class="compat__sign-name">' + M.UI.escape(sign.name) + '</span>' +
      '</a>'
    );
  }

  /* Um icone por categoria, para que cada secao se reconheca rapido. */
  function icon(paths) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      paths +
      '</svg>'
    );
  }

  var CATEGORY_ICONS = {
    amor: icon('<path d="M12 20.2S3.8 15 3.8 9.4A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 8.2 2.1c0 5.6-8.2 10.8-8.2 10.8Z"/>'),
    amizade: icon('<circle cx="9" cy="8.6" r="3.2"/><path d="M3.4 19.4a5.6 5.6 0 0 1 11.2 0"/>' +
      '<circle cx="17" cy="9.6" r="2.4"/><path d="M15.6 14.6a4.6 4.6 0 0 1 5 4.8"/>'),
    comunicacao: icon('<path d="M20.4 12.6c0 3.6-3.8 6.5-8.4 6.5a9.8 9.8 0 0 1-2.6-.3l-4.2 1.5 1.2-3.4a6 6 0 0 1-1.8-4.3C4.6 9 8.4 6 13 6s7.4 2.9 7.4 6.6Z"/>' +
      '<path d="M9.8 11.9h.01M13 11.9h.01"/>'),
    geral: STAR
  };

  /* ------------------------------------------------------------------
     Bloco de resultado, reaproveitado quando o usuario troca a
     combinacao sem sair da tela.
     ------------------------------------------------------------------ */
  function resultBlock(signA, signB) {
    var analysis = M.Compatibility.analyze(signA, signB);

    if (!analysis) {
      return '<div class="empty"><p>Escolha os dois signos para ver o resultado.</p></div>';
    }

    var rows = analysis.categories
      .map(function (category) {
        return M.UI.levelBar(category, CATEGORY_ICONS[category.id] || '');
      })
      .join('');

    return (
      '<section class="compat__result" aria-live="polite">' +
      '  <div class="compat__pair">' +
             signGlyph(signA) +
      '    <span class="compat__vs">VS</span>' +
             signGlyph(signB) +
      '  </div>' +
      '  <div class="compat__overall" style="--overall:' + analysis.overall.level.color + '">' +
      '    <span class="compat__overall-glyph" aria-hidden="true">' + STAR + '</span>' +
      '    <span>' +
      '      <span class="compat__overall-label">Compatibilidade geral</span><br>' +
      '      <span class="compat__overall-value">' +
                 M.UI.escape(analysis.overall.level.label) + '</span>' +
      '    </span>' +
      '  </div>' +
      '  <p class="compat__intro">' + M.UI.escape(analysis.intro) + '</p>' +
      '  <div class="card card--pad-lg">' + rows + '</div>' +
      '</section>'
    );
  }

  M.screens.compatibility = {
    title: 'Compatibilidade',
    tab: '#/compatibilidade',

    render: function (root) {
      var UI = M.UI;

      /* Se o usuario ja descobriu o signo, ele vem preenchido. */
      var mySignId = M.state.signId || 'aries';
      var otherSignId = M.state.compatWith || 'leo';

      if (mySignId === otherSignId) {
        otherSignId = mySignId === 'aries' ? 'leo' : 'aries';
      }

      root.innerHTML =
        '<div class="page">' +
        '  <section class="compat__form">' +
        '    <header class="compat__form-head">' +
        '      <h1 class="compat__form-title">Compatibilidade</h1>' +
        '      <p class="compat__form-sub">Escolha dois signos e veja como eles se relacionam.</p>' +
        '    </header>' +
        '    <div class="sign-picker">' +
               picker('sign-a', 'Primeiro signo', USER, mySignId) +
               picker('sign-b', 'Segundo signo', SEARCH, otherSignId) +
               '<button class="sign-picker__swap" type="button" id="btn-swap">' +
                 SWAP + 'Trocar ordem</button>' +
        '    </div>' +
        '    <div class="btn-row" style="margin-top:var(--gap)">' +
        '      <button class="btn btn--primary" type="button" id="btn-compat">' +
                 SEARCH + 'Ver compatibilidade</button>' +
        '    </div>' +
        '  </section>' +
          UI.note() +
        '</div>';

      /* Espaco reservado do resultado, abaixo do formulario. */
      var holder = UI.fromHtml('<div class="page" style="padding-top:0"></div>');
      root.appendChild(holder);

      var selectA = root.querySelector('#sign-a');
      var selectB = root.querySelector('#sign-b');

      function paint() {
        var signA = M.getSign(selectA.value);
        var signB = M.getSign(selectB.value);

        if (!signA || !signB) {
          return;
        }

        M.state.compatWith = signB.id;
        holder.innerHTML = resultBlock(signA, signB);
      }

      root.querySelector('#btn-compat').addEventListener('click', paint);

      root.querySelector('#btn-swap').addEventListener('click', function () {
        var previous = selectA.value;
        selectA.value = selectB.value;
        selectB.value = previous;
        paint();
      });

      /* Atualiza a cor do icone de cada seletor junto com a escolha. */
      [selectA, selectB].forEach(function (select) {
        select.addEventListener('change', function () {
          var sign = M.getSign(select.value);
          var control = select.closest('.sign-picker__control');
          if (sign && control) {
            control.style.setProperty('--dot-color', sign.color);
            control.querySelector('.sign-picker__dot').innerHTML = UI.glyph(sign);
          }
        });
      });
    }
  };
})(window);
