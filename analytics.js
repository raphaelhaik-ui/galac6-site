// Google Analytics 4 + Consent Mode v2 (RGPD)
// Par défaut, tout est "denied" : Analytics envoie uniquement des pings anonymes,
// sans cookie ni identifiant. Si le visiteur accepte le bandeau cookies, on passe
// analytics_storage à "granted" (mesure d'audience complète avec cookie).
(function () {
  var GA_ID = 'G-9NY519N8MH';

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  // Refus par défaut (avant tout chargement de gtag.js)
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied'
  });

  // Si le visiteur avait déjà accepté lors d'une précédente visite, on réautorise.
  try {
    if (localStorage.getItem('galac6-cookie-consent') === 'accepted') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  } catch (e) {}

  gtag('js', new Date());
  gtag('config', GA_ID);

  // Chargement asynchrone de gtag.js
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
})();
