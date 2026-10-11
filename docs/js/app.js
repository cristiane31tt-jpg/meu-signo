/* =====================================================================
   MEU SIGNO - Roteador e estado
   ---------------------------------------------------------------------
   Um unico ponto de entrada. Lê o hash da URL, escolhe a tela,
   atualiza o cabecalho e a barra de abas.

   Rotas:
     #/                     tela inicial
     #/signo                resultado do usuario
     #/signos               os 12 signos
     #/signos/:id           pagina de um signo
     #/compatibilidade      comparacao entre dois signos

   Para adicionar uma tela nova: crie o arquivo em js/screens/, registre
   em SCREENS e inclua o <script> no index.html.
   ===================================================================== */

(function (global) {
  'use strict';

  var M = global.MeuSigno;

  /* ------------------------------------------------------------------
     Estado da sessao. Nao ha servidor nem login: fica so no aparelho.
     ------------------------------------------------------------------ */
  M.state = {
    birthDate: null,
    signId: null,
    compatWith: null,
    lastRoute: '#/'
  };

  /* ------------------------------------------------------------------
     Telas conhecidas.
     ------------------------------------------------------------------ */
  var SCREENS = [
    { pattern: /^\/?$/, screen: M.screens.home },
    { pattern: /^\/signo\/?$/, screen: M.screens.result },
    { pattern: /^\/signos\/?$/, screen: M.screens.allSigns },
    { pattern: /^\/signos\/([a-z]+)\/?$/, screen: M.screens.signDetail },
    { pattern: /^\/compatibilidade\/?$/, screen: M.screens.compatibility }
  ];

  var ROOT_TABS = ['#/', '#/signos', '#/compatibilidade'];

  var main = document.getElementById('app');
  var titleEl = document.getElementById('app-bar-title');
  var backBtn = document.getElementById('back-btn');

  /* Normaliza "#/signos/aries/" e "#signos" para "#/signos/aries". */
  function normalize(hash) {
    var path = (hash || '').replace(/^#/, '');
    if (!path || path === '/') {
      return '#/';
    }
    if (path.charAt(0) !== '/') {
      path = '/' + path;
    }
    if (path.length > 1 && path.charAt(path.length - 1) === '/') {
      path = path.slice(0, -1);
    }
    return '#' + path;
  }

  /* Os padroes acima descrevem o caminho sem o "#".
     Aceitamos "#/signos", "signos" e "/signos". */
  function resolve(route) {
    var path = String(route).replace(/^#/, '');

    for (var i = 0; i < SCREENS.length; i++) {
      var match = path.match(SCREENS[i].pattern);
      if (match) {
        return { screen: SCREENS[i].screen, params: match.slice(1) };
      }
    }
    return null;
  }

  /* Rota que representa a aba ativa, para as sub-telas. */
  function tabFor(route) {
    if (route.indexOf('#/signos') === 0) {
      return '#/signos';
    }
    return ROOT_TABS.indexOf(route) >= 0 ? route : '#/';
  }

  function updateTabs(route) {
    var active = tabFor(route);
    var tabs = document.querySelectorAll('.tab');

    Array.prototype.forEach.call(tabs, function (tab) {
      tab.classList.toggle('is-active', tab.dataset.tab === active);
      if (tab.dataset.tab === active) {
        tab.setAttribute('aria-current', 'page');
      } else {
        tab.removeAttribute('aria-current');
      }
    });
  }

  function updateHeader(route) {
    var resolved = resolve(route);
    var label = resolved && resolved.screen.title ? resolved.screen.title : 'Meu Signo';

    if (resolved && resolved.screen === M.screens.signDetail) {
      var sign = M.getSign(resolved.params[0]);
      label = sign ? sign.name : 'Signo';
    }

    titleEl.textContent = label;
    document.title = label === 'Meu Signo' ? label : label + ' - Meu Signo';

    var isRoot = ROOT_TABS.indexOf(route) >= 0;
    backBtn.hidden = isRoot;
  }

  function render() {
    var route = normalize(global.location.hash);
    var resolved = resolve(route);

    if (!resolved) {
      global.location.replace('#/');
      return;
    }

    updateHeader(route);
    updateTabs(route);

    main.classList.remove('screen-enter');
    main.innerHTML = '';

    resolved.screen.render(main, { id: resolved.params[0], route: route });

    /* Reinicia a animacao de entrada da tela. */
    void main.offsetWidth;
    main.classList.add('screen-enter');

    M.state.lastRoute = route;

    /* Telas internas voltam ao topo; as abas preservam a rolagem. */
    if (ROOT_TABS.indexOf(route) < 0) {
      global.scrollTo({ top: 0, behavior: 'auto' });
    }
  }

  backBtn.addEventListener('click', function () {
    var previous = M.state.lastRoute;
    var target = previous && previous !== global.location.hash
      ? previous
      : '#/signos';
    global.location.hash = target;
  });

  global.addEventListener('hashchange', render);

  /* Primeira carga. */
  if (!global.location.hash) {
    global.location.replace('#/');
  }
  render();
})(window);
