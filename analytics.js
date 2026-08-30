// Google Analytics 4 + Google Ads + Consent Mode v2 (RGPD)
// Par défaut, tout est "denied" : Analytics envoie uniquement des pings anonymes,
// sans cookie ni identifiant. Si le visiteur accepte le bandeau cookies, on passe
// analytics_storage à "granted" (mesure d'audience complète avec cookie).
(function () {
  var GA_ID = 'G-9NY519N8MH';
  var ADS_ID = 'AW-18419069147';
  // L'inscription se fait sur un autre domaine : on relie les deux pour
  // ne pas perdre l'origine du clic publicitaire.
  var LINKED_DOMAINS = ['galac6.io', 'www.galac6.io', 'galac6web.netlify.app'];

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

  // Autorisations accordées quand le visiteur accepte le bandeau.
  // Exposées pour que cookie-consent.js applique exactement les mêmes.
  var GRANTED = {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  };
  window.galac6ConsentGranted = GRANTED;

  // Si le visiteur avait déjà accepté lors d'une précédente visite, on réautorise.
  try {
    if (localStorage.getItem('galac6-cookie-consent') === 'accepted') {
      gtag('consent', 'update', GRANTED);
    }
  } catch (e) {}

  gtag('js', new Date());
  gtag('config', GA_ID, { linker: { domains: LINKED_DOMAINS } });
  gtag('config', ADS_ID, { linker: { domains: LINKED_DOMAINS } });

  // Chargement asynchrone de gtag.js
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
})();
