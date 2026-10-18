// Pixel Meta (Facebook) — chargé UNIQUEMENT si le visiteur accepte la catégorie
// « Publicité » du bandeau cookies (RGPD / CNIL). Sans accord, rien n'est chargé.
(function () {
  var PIXEL_ID = '1365191655374063';
  var CLE = 'galac6-cookie-consent';
  var DUREE_MAX = 182 * 24 * 60 * 60 * 1000; // 6 mois

  function loadPixel() {
    if (window.fbq) return; // déjà chargé
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
  }

  // Visiteur ayant déjà accepté la publicité il y a moins de 6 mois → on charge le pixel.
  try {
    var brut = window.localStorage.getItem(CLE);
    if (brut && brut.charAt(0) === '{') {
      var choix = JSON.parse(brut);
      if (choix && choix.ads === true && typeof choix.date === 'number' &&
          new Date().getTime() - choix.date <= DUREE_MAX) {
        loadPixel();
      }
    }
  } catch (e) {}

  // Permet à cookie-consent.js de déclencher le pixel quand la publicité est acceptée.
  window.galac6LoadPixel = loadPixel;
})();
