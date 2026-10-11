/* =====================================================================
   MEU SIGNO - Helpers de interface
   ---------------------------------------------------------------------
   Funcoes pequenas e reutilizadas por todas as telas.
   ===================================================================== */

(function (global) {
  'use strict';

  /* ------------------------------------------------------------------
     Cria um elemento a partir de uma string HTML.
     Devolve o primeiro elemento filho.
     ------------------------------------------------------------------ */
  function fromHtml(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }

  /* ------------------------------------------------------------------
     Glifo SVG do signo. Herda a cor do container via currentColor.
     ------------------------------------------------------------------ */
  function glyph(sign, className) {
    return (
      '<svg class="glyph ' + (className || '') + '" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="1.4" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      sign.glyph +
      '</svg>'
    );
  }

  /* ------------------------------------------------------------------
     Marca grande do signo (usada nos cabecalhos).
     O desenho e SVG, mas o simbolo unicode fica disponivel para leitor
     de tela, copia de texto e searches.
     ------------------------------------------------------------------ */
  function signMark(sign, className) {
    return (
      '<div class="' + (className || '') + '">' + glyph(sign) +
      '<span class="visually-hidden">' + escape(sign.symbol) + '</span>' +
      '</div>'
    );
  }

  /* ------------------------------------------------------------------
     Escapa texto antes de colocar dentro de HTML.
     ------------------------------------------------------------------ */
  function escape(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ------------------------------------------------------------------
     Lista com marcador (usada em caracteristicas, forcas e atencoes).
     kind: 'traits' | 'good' | 'warn'
     ------------------------------------------------------------------ */
  function list(items, kind) {
    var icons = {
      traits: '<circle cx="12" cy="12" r="4"/>',
      good: '<path d="M4.5 12.5 9.5 17.5 19.5 6.5"/>',
      warn: '<path d="M12 4.5 21 19.5H3Z"/><path d="M12 10v4.2"/><path d="M12 17.2h.01"/>'
    };
    var svg =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      icons[kind] +
      '</svg>';

    return (
      '<ul class="bullet-list bullet-list--' + kind + '">' +
      items
        .map(function (item) {
          return '<li><span class="bullet-icon">' + svg + '</span>' + escape(item) + '</li>';
        })
        .join('') +
      '</ul>'
    );
  }

  /* ------------------------------------------------------------------
     Barra de nivel usada na compatibilidade.
     ------------------------------------------------------------------ */
  function levelBar(category, icon) {
    var mark = icon ? '<span class="level-row__icon">' + icon + '</span>' : '';

    return (
      '<section class="level-row" style="--pill:' + category.level.color + '">' +
      '<div class="level-row__head">' + mark +
      '<span class="level-row__label">' + escape(category.label) + '</span>' +
      '<span class="level-pill" style="--pill:' + category.level.color + '">' +
      escape(category.level.label) +
      '</span>' +
      '</div>' +
      '<div class="bar" role="img" aria-label="' + escape(category.label) + ': ' +
      category.level.label + '">' +
      '<div class="bar__fill" style="width:' + category.score + '%;--pill:' +
      category.level.color + '"></div>' +
      '</div>' +
      (category.hint ? '<p class="level-row__hint">' + escape(category.hint) + '</p>' : '') +
      '<p class="level-row__text">' + escape(category.text) + '</p>' +
      '</section>'
    );
  }

  /* ------------------------------------------------------------------
     Mensagem temporaria no rodape da tela.
     ------------------------------------------------------------------ */
  var toastTimer = null;

  function toast(message) {
    var el = document.getElementById('toast');
    if (!el) {
      return;
    }
    el.textContent = message;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove('is-visible');
    }, 2800);
  }

  /* ------------------------------------------------------------------
     Aplica a cor do signo em um elemento.
     ------------------------------------------------------------------ */
  function applySignColor(element, sign) {
    if (element && sign) {
      element.style.setProperty('--sign', sign.color);
    }
  }

  /* ------------------------------------------------------------------
     Painel "Sobre este app".

     A informacao sobre astrologia nao aparece mais solta ao pe de cada
     tela: ela fica recolhida em um detalhe que so abre quando a pessoa
     toca. O texto continua no documento (sem JavaScript extra), mas
     nao ocupa a experiencia principal.
     ------------------------------------------------------------------ */
  function note() {
    return (
      '<details class="app-note">' +
      '<summary class="app-note__summary">Sobre o Meu Signo</summary>' +
      '<div class="app-note__body">' +
      '<p>Um mapa dos 12 signos, das personalidades que cada um descreve ' +
      'e da compatibilidade entre eles.</p>' +
      '<p class="app-note__meta">Funciona sem internet, sem conta e sem ' +
      'enviar nenhum dado para servidores.</p>' +
      '<p class="app-note__links">' +
      '<a class="app-note__link" href="privacy-policy.html">Política de Privacidade</a>' +
      '</p>' +
      '</div>' +
      '</details>'
    );
  }

  /* ------------------------------------------------------------------
     Guarda e recupera a ultima data usada no dispositivo.
     Nao ha servidor nem login: e so um dado local do navegador.
     ------------------------------------------------------------------ */
  var STORAGE_KEY = 'meu-signo:last-date';

  function saveLastDate(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      /* Modo privado pode bloquear o storage. Nao e erro grave. */
    }
  }

  function loadLastDate() {
    try {
      return localStorage.getItem(STORAGE_KEY) || '';
    } catch (error) {
      return '';
    }
  }

  global.MeuSigno = global.MeuSigno || {};
  global.MeuSigno.UI = {
    fromHtml: fromHtml,
    glyph: glyph,
    signMark: signMark,
    escape: escape,
    list: list,
    levelBar: levelBar,
    toast: toast,
    applySignColor: applySignColor,
    note: note,
    saveLastDate: saveLastDate,
    loadLastDate: loadLastDate
  };
})(window);
