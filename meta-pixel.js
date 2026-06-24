// Pixel Meta (Facebook) — chargé UNIQUEMENT après consentement cookies (RGPD).
// Tant que le visiteur n'a pas cliqué « Accepter », aucun cookie publicitaire n'est posé.
(function () {
  var PIXEL_ID = '1365191655374063';

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

  // Visiteur ayant déjà accepté lors d'une précédente visite → on charge le pixel.
  try {
    if (localStorage.getItem('galac6-cookie-consent') === 'accepted') {
      loadPixel();
    }
  } catch (e) {}

  // Permet à cookie-consent.js de déclencher le pixel au clic « Accepter ».
  window.galac6LoadPixel = loadPixel;
})();
