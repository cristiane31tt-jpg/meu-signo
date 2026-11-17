/* =====================================================================
   MEU SIGNO - Anuncios (Google AdMob)
   ---------------------------------------------------------------------
   Este arquivo so faz alguma coisa dentro do aplicativo Android.
   No site (GitHub Pages / navegador comum) ele nao carrega nada, nao
   acessa a rede e nao altera o layout.

   FASE ATUAL: somente anuncios de TESTE.
   - A unidade abaixo e a unidade de banner de teste oficial do Google
     para Android. Ela nunca gera receita e nunca exibe anuncio real.
   - A troca para a unidade real so deve acontecer depois de autorizacao
     expressa da proprietaria e com o App ID real no AndroidManifest.
   - Nao ha intersticiais nem recompensados nesta fase.

   O plugin nativo (@capacitor-community/admob) e injetado pelo proprio
   Capacitor em window.Capacitor.Plugins.AdMob. Por isso nao e preciso
   bundler nem copiar arquivos do plugin para dentro de docs/.

   Fluxo:
     1. initialize()
     2. requestConsentInfo()  -> UMP (consentimento)
     3. showConsentForm()     -> somente se o formulario estiver disponivel
     4. showBanner()          -> somente se canRequestAds for verdadeiro

   Eventos do banner ajustam a variavel CSS --admob-height, que reserva
   espaco abaixo da barra de abas para o banner nao cobrir a navegacao.
   ===================================================================== */

(function (global) {
  'use strict';

  var M = (global.MeuSigno = global.MeuSigno || {});

  /* ------------------------------------------------------------------
     Configuracao central. Trocas futuras acontecem somente aqui.
     ------------------------------------------------------------------ */
  var CONFIG = {
    /* Unidade de banner de TESTE oficial do Google (Android). */
    bannerAdId: 'ca-app-pub-3940256099942544/6300978111',
    /* Mantem a solicitacao marcada como teste, alem do ID de teste. */
    isTesting: true,
    /* Banner adaptativo: largura total, altura automatica e discreta. */
    adSize: 'ADAPTIVE_BANNER',
    position: 'BOTTOM_CENTER',
    margin: 0
  };

  var state = {
    plugin: null,
    starting: null,
    listening: false,
    initialized: false,
    bannerRequested: false,
    consent: null,
    consentQuery: null
  };

  function log(message, detail) {
    if (global.console && global.console.warn) {
      if (typeof detail === 'undefined') {
        global.console.warn('[MeuSigno/ads] ' + message);
      } else {
        global.console.warn('[MeuSigno/ads] ' + message, detail);
      }
    }
  }

  /* Somente no app Android/iOS. No site retorna falso. */
  function isNative() {
    var cap = global.Capacitor;
    return !!(cap && typeof cap.isNativePlatform === 'function' && cap.isNativePlatform());
  }

  /* Plugin injetado pelo Capacitor quando o app e nativo. */
  function getPlugin() {
    var cap = global.Capacitor;
    if (!isNative() || !cap || !cap.Plugins) {
      return null;
    }
    return cap.Plugins.AdMob || null;
  }

  function setFlag(name, on) {
    var root = global.document && global.document.documentElement;
    if (!root || !root.classList) {
      return;
    }
    if (on) {
      root.classList.add(name);
    } else {
      root.classList.remove(name);
    }
  }

  /* Altura informada pelo SDK vem em dp, que equivale a px no CSS. */
  function setBannerHeight(height) {
    var root = global.document && global.document.documentElement;
    if (!root || !root.style) {
      return;
    }
    var px = (typeof height === 'number' && isFinite(height) && height > 0)
      ? Math.round(height)
      : 0;
    root.style.setProperty('--admob-height', px + 'px');
    setFlag('admob-banner', px > 0);
  }

  /* O botao "Opcoes de privacidade" so aparece quando o UMP exige. */
  function updatePrivacyEntryPoint(consent) {
    var required = !!(consent && consent.privacyOptionsRequirementStatus === 'REQUIRED');
    setFlag('admob-privacy', required);
  }

  function listen(ad) {
    if (state.listening) {
      return;
    }
    state.listening = true;

    ad.addListener('bannerAdSizeChanged', function (size) {
      setBannerHeight(size ? size.height : 0);
    });

    ad.addListener('bannerAdLoaded', function () {
      /* Se o evento de tamanho nao chegar, reserva uma altura segura. */
      var root = global.document && global.document.documentElement;
      var current = root && root.style ? root.style.getPropertyValue('--admob-height') : '';
      if (!current || current === '0px') {
        setBannerHeight(56);
      }
    });

    ad.addListener('bannerAdFailedToLoad', function (error) {
      log('banner nao carregou', error);
      state.bannerRequested = false;
      setBannerHeight(0);
    });
  }

  /* O banner so pode ser solicitado com consentimento explicito do UMP. */
  function canRequestAds(consent) {
    return !!(consent && consent.canRequestAds === true);
  }

  function requestConsent(ad) {
    /* Reaproveita a consulta em andamento (boot e reconexao simultaneos). */
    if (state.consentQuery) {
      return state.consentQuery;
    }

    var query = ad.requestConsentInfo({}).then(function (info) {
      state.consent = info || null;
      updatePrivacyEntryPoint(state.consent);

      if (info && info.isConsentFormAvailable && info.status === 'REQUIRED') {
        return ad.showConsentForm().then(function (updated) {
          state.consent = updated || info;
          updatePrivacyEntryPoint(state.consent);
          return state.consent;
        });
      }

      return state.consent;
    });

    state.consentQuery = query.then(function (consent) {
      state.consentQuery = null;
      return consent;
    }, function (error) {
      state.consentQuery = null;
      throw error;
    });

    return state.consentQuery;
  }

  function showBanner(ad, consent) {
    /* Sem consentimento valido o banner nao e solicitado. */
    if (!canRequestAds(consent)) {
      log('consentimento ausente ou sem autorizacao para anuncios');
      setBannerHeight(0);
      return Promise.resolve(false);
    }

    /* Nunca cria um segundo banner. */
    if (state.bannerRequested) {
      return Promise.resolve(true);
    }

    /* Sem internet o SDK falharia; tentamos de novo no evento "online". */
    if (global.navigator && global.navigator.onLine === false) {
      log('sem internet: banner adiado');
      return Promise.resolve(false);
    }

    state.bannerRequested = true;

    return ad.showBanner({
      adId: CONFIG.bannerAdId,
      adSize: CONFIG.adSize,
      position: CONFIG.position,
      margin: CONFIG.margin,
      isTesting: CONFIG.isTesting
    }).then(function () {
      return true;
    }).catch(function (error) {
      state.bannerRequested = false;
      setBannerHeight(0);
      log('falha ao exibir banner', error);
      return false;
    });
  }

  function start() {
    if (state.starting) {
      return state.starting;
    }

    var ad = getPlugin();
    if (!ad) {
      return Promise.resolve(false);
    }

    state.plugin = ad;
    setFlag('admob-native', true);
    listen(ad);

    state.starting = ad.initialize({}).then(
      function () {
        state.initialized = true;
      },
      function (error) {
        log('inicializacao falhou', error);
      }
    ).then(function () {
      if (!state.initialized) {
        return false;
      }
      return requestConsent(ad);
    }).then(function (consent) {
      if (!state.initialized) {
        return false;
      }
      return showBanner(ad, consent);
    }).catch(function (error) {
      log('falha inesperada', error);
      return false;
    });

    return state.starting;
  }

  function onOnline() {
    if (!state.plugin || !state.initialized) {
      return;
    }

    /* Ao reconectar, consulta o UMP de novo antes de pedir o banner. */
    try {
      requestConsent(state.plugin).then(function (consent) {
        if (!state.initialized) {
          return false;
        }
        return showBanner(state.plugin, consent);
      }).catch(function (error) {
        log('consentimento indisponivel ao reconectar', error);
        return false;
      });
    } catch (error) {
      log('reconexao: anuncios indisponiveis', error);
    }
  }

  function showPrivacyOptions() {
    var ad = state.plugin || getPlugin();
    if (!ad) {
      return Promise.resolve(false);
    }

    return ad.showPrivacyOptionsForm().then(
      function () {
        return true;
      },
      function (error) {
        log('opcoes de privacidade indisponiveis', error);
        return false;
      }
    );
  }

  /* Clique delegado: o painel "Sobre" e recriado a cada tela. */
  function bindPrivacyLink() {
    if (!global.document || !global.document.addEventListener) {
      return;
    }
    global.document.addEventListener('click', function (event) {
      var node = event.target;
      while (node && node !== global.document) {
        if (node.getAttribute && node.hasAttribute && node.hasAttribute('data-ads-privacy')) {
          event.preventDefault();
          showPrivacyOptions();
          return;
        }
        node = node.parentNode;
      }
    });
  }

  function boot() {
    try {
      start();
    } catch (error) {
      log('anuncios desativados', error);
    }
  }

  M.Ads = {
    config: CONFIG,
    isNative: isNative,
    start: start,
    showPrivacyOptions: showPrivacyOptions,
    /** Usado apenas em testes automatizados. */
    _state: state
  };

  if (global.addEventListener) {
    global.addEventListener('online', onOnline);
  }
  bindPrivacyLink();

  if (global.document && global.document.readyState === 'loading') {
    global.document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})(window);
