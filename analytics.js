// Google Analytics 4 (mesure d'audience) + Google Ads (publicité).
// RGPD / CNIL : RIEN n'est chargé tant que le visiteur n'a pas donné son accord.
// - Google Analytics : seulement si la case « Mesure d'audience » est acceptée.
// - Google Ads : seulement si la case « Publicité » est acceptée.
// Le choix est enregistré par cookie-consent.js (clé galac6-cookie-consent, 6 mois).
// Syntaxe volontairement ancienne (ES5) pour les vieux Safari iOS.
(function () {
  var GA_ID = 'G-9NY519N8MH';
  var ADS_ID = 'AW-18419069147';
  // L'inscription se fait sur un autre domaine : on relie les deux pour
  // ne pas perdre l'origine du clic publicitaire.
  var LINKED_DOMAINS = ['galac6.io', 'www.galac6.io', 'galac6web.netlify.app'];
  var CLE = 'galac6-cookie-consent';
  var DUREE_MAX = 182 * 24 * 60 * 60 * 1000; // 6 mois

  // Lit le choix enregistré (null si absent, ancien format ou plus vieux que 6 mois)
  function lireChoix() {
    try {
      var brut = window.localStorage.getItem(CLE);
      if (!brut || brut.charAt(0) !== '{') return null;
      var choix = JSON.parse(brut);
      if (!choix || typeof choix.date !== 'number') return null;
      if (new Date().getTime() - choix.date > DUREE_MAX) return null;
      return { audience: choix.audience === true, ads: choix.ads === true, date: choix.date };
    } catch (e) {
      return null;
    }
  }
  window.galac6LireChoixCookies = lireChoix;

  var gtagCharge = false;
  var gaActif = false;
  var adsActif = false;

  // Charge gtag.js une seule fois, avec le consentement correspondant au choix
  function preparerGtag(premierId) {
    window.dataLayer = window.dataLayer || [];
    if (!window.gtag) {
      window.gtag = function () { window.dataLayer.push(arguments); };
    }
    if (gtagCharge) return;
    gtagCharge = true;
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    });
    window.gtag('js', new Date());
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + premierId;
    document.head.appendChild(s);
  }

  // Mesure d'audience (Google Analytics) — appelée uniquement après accord
  function chargerAudience() {
    if (gaActif) return;
    gaActif = true;
    preparerGtag(GA_ID);
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('config', GA_ID, { linker: { domains: LINKED_DOMAINS } });
  }

  // Publicité (Google Ads) — appelée uniquement après accord
  function chargerPublicite() {
    if (adsActif) return;
    adsActif = true;
    preparerGtag(ADS_ID);
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted'
    });
    window.gtag('config', ADS_ID, { linker: { domains: LINKED_DOMAINS } });
  }

  window.galac6ChargerAudience = chargerAudience;
  window.galac6ChargerPubliciteGoogle = chargerPublicite;

  // Visiteur ayant déjà fait son choix (moins de 6 mois) : on applique ce choix.
  var choix = lireChoix();
  if (choix && choix.audience) chargerAudience();
  if (choix && choix.ads) chargerPublicite();
})();
