/* =====================================================================
   MEU SIGNO - Calculo do signo a partir da data de nascimento
   ---------------------------------------------------------------------
   Logica pura, sem dependencias de DOM. Pode ser testada em Node
   (veja tests/test-zodiac.js).

   Os limites de cada signo ficam em js/data/signs.js (campos from/to),
   entao ajustar uma data e uma edicao de dado, nao de codigo.
   ===================================================================== */

(function (global) {
  'use strict';

  var MONTHS = [
    'janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  /* Converte [mes, dia] em um numero ordenavel: [3, 21] -> 321.
     So usamos o primeiro dia de cada signo como referencia. */
  function stamp(month, day) {
    return month * 100 + day;
  }

  function signStamp(sign) {
    return stamp(sign.from[0], sign.from[1]);
  }

  /* Compara a data com um par [mes, dia].
     Devolve -1 (antes), 0 (igual) ou 1 (depois). */
  function compare(date, ref) {
    var month = date.getMonth() + 1;
    var day = date.getDate();

    if (month !== ref[0]) {
      return month < ref[0] ? -1 : 1;
    }
    if (day !== ref[1]) {
      return day < ref[1] ? -1 : 1;
    }
    return 0;
  }

  /* Compara dois pares [mes, dia]. */
  function compareRef(refA, refB) {
    if (refA[0] !== refB[0]) {
      return refA[0] < refB[0] ? -1 : 1;
    }
    if (refA[1] !== refB[1]) {
      return refA[1] < refB[1] ? -1 : 1;
    }
    return 0;
  }

  /* ------------------------------------------------------------------
     Descobre o signo de uma data.
     Os 12 periodos estao em ordem, sem sobreposicao, e cobrem o ano
     inteiro. O unico que "dobra" a virada do ano e Capricornio:
     comecar em dezembro e terminar em janeiro.
     ------------------------------------------------------------------ */
  function getSign(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return null;
    }

    var signs = global.MeuSigno.SIGNS;

    for (var i = 0; i < signs.length; i++) {
      var sign = signs[i];
      var wrapsYear = compareRef(sign.to, sign.from) < 0;

      var matches = wrapsYear
        ? compare(date, sign.from) >= 0 || compare(date, sign.to) <= 0
        : compare(date, sign.from) >= 0 && compare(date, sign.to) <= 0;

      if (matches) {
        return sign;
      }
    }
    return null;
  }

  /* ------------------------------------------------------------------
     Le a data do campo <input type="date"> (formato AAAA-MM-DD).
     Devolve { ok: true, date } ou { ok: false, error: '...' }.
     ------------------------------------------------------------------ */
  function parseBirthDate(value) {
    if (!value) {
      return { ok: false, error: 'Informe sua data de nascimento.' };
    }

    /* Exige exatamente AAAA-MM-DD. O campo <input type="date"> ja entrega
       esse formato, mas a funcao tambem e chamada em outros contextos. */
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value))) {
      return { ok: false, error: 'Data inválida. Use o formato AAAA-MM-DD.' };
    }

    var parts = String(value).split('-');

    var year = Number(parts[0]);
    var month = Number(parts[1]);
    var day = Number(parts[2]);

    if (!year || !month || !day) {
      return { ok: false, error: 'Data incompleta.' };
    }
    if (month < 1 || month > 12) {
      return { ok: false, error: 'Mes invalido.' };
    }
    if (day < 1 || day > 31) {
      return { ok: false, error: 'Dia invalido.' };
    }

    /* new Date(ano, mes-1, dia) corrige datas impossiveis como 31/02,
       que virariam 3 de marco. Checamos se o dia voltou igual. */
    var date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return { ok: false, error: 'Essa data nao existe no calendario.' };
    }

    var currentYear = new Date().getFullYear();
    if (year < 1900) {
      return { ok: false, error: 'Informe um ano a partir de 1900.' };
    }
    if (year > currentYear) {
      return { ok: false, error: 'A data nao pode estar no futuro.' };
    }

    return { ok: true, date: date };
  }

  /* Formata a data no padrao brasileiro: 14/05/1990 */
  function formatDate(date) {
    var d = String(date.getDate()).padStart(2, '0');
    var m = String(date.getMonth() + 1).padStart(2, '0');
    return d + '/' + m + '/' + date.getFullYear();
  }

  /* Nome do mes por extenso, com a primeira letra maiuscula. */
  function monthName(month) {
    var name = MONTHS[month - 1] || '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  /* "21 de marco a 19 de abril" ja vem pronto em signs.js.
     Este helper monta o periodo quando o dado nao existir. */
  function buildPeriod(sign) {
    if (sign.period) {
      return sign.period;
    }
    return (
      sign.from[1] + ' de ' + monthName(sign.from[0]) +
      ' a ' + sign.to[1] + ' de ' + monthName(sign.to[0])
    );
  }

  /* ------------------------------------------------------------------
     Nas fronteiras entre dois signos, a data muda a cada ano porque o
     zodiaco tropical segue o calendario solar. Avisamos o usuario em vez
     de esconder a imprecisao.
     ------------------------------------------------------------------ */
  var CUSP_WARNING_DAYS = 2;

  function isNearBoundary(date) {
    var signs = global.MeuSigno.SIGNS;
    for (var i = 0; i < signs.length; i++) {
      var nearStart = daysBetween(date, signs[i].from);
      var nearEnd = daysBetween(date, signs[i].to);
      if (
        nearStart <= CUSP_WARNING_DAYS ||
        nearEnd >= 365 - CUSP_WARNING_DAYS
      ) {
        return true;
      }
    }
    return false;
  }

  /* Diferenca em dias ate [mes, dia] deste ano (negativa se ja passou). */
  function daysBetween(date, ref) {
    var target = new Date(date.getFullYear(), ref[0] - 1, ref[1]);
    var start = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var diff = Math.round((target - start) / 86400000);
    if (diff < 0) {
      diff += 365;
      /* 29 de fevereiro: usar 366 evita o caso limite. */
      var leap = new Date(date.getFullYear(), 1, 29).getDate() === 29;
      if (leap && target.getMonth() === 1) {
        diff += 1;
      }
    }
    return diff;
  }

  global.MeuSigno = global.MeuSigno || {};
  global.MeuSigno.Zodiac = {
    MONTHS: MONTHS,
    stamp: stamp,
    signStamp: signStamp,
    compare: compare,
    compareRef: compareRef,
    getSign: getSign,
    parseBirthDate: parseBirthDate,
    formatDate: formatDate,
    monthName: monthName,
    buildPeriod: buildPeriod,
    isNearBoundary: isNearBoundary
  };
})(typeof window !== 'undefined' ? window : globalThis);
