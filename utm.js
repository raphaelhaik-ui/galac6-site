// Suivi de l'origine des visiteurs (paramètres UTM, ex. posts Facebook par groupe).
// - Sert uniquement à savoir d'où viennent les inscriptions (attribution), propre au site.
// - Sans accord « mesure d'audience » : UTM gardés seulement pour la visite en cours
//   (sessionStorage, effacé à la fermeture de l'onglet) — exempté de consentement.
// - Avec accord « mesure d'audience » : UTM du premier contact gardés 30 jours
//   (localStorage, clé galac6_utm).
// - Ajoute ces UTM aux liens vers l'application pour garder l'origine à l'inscription.
// Aucun identifiant, aucun cookie, aucune dépendance externe.
// Syntaxe volontairement ancienne (ES5) pour les vieux Safari iOS.
(function () {
  var CLE = 'galac6_utm';
  var DUREE_MAX = 30 * 24 * 60 * 60 * 1000; // 30 jours en millisecondes
  var NOMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  // Domaines de l'application web vers lesquels on transmet les UTM
  var DOMAINES_APPLI = ['galac6web.netlify.app', 'app.galac6.io'];

  // Lit un paramètre dans une chaîne de requête "?a=1&b=2"
  function lireParam(requete, nom) {
    var morceaux = (requete || '').replace(/^\?/, '').split('&');
    for (var i = 0; i < morceaux.length; i++) {
      var paire = morceaux[i].split('=');
      if (paire[0] === nom && paire.length > 1) {
        try {
          return decodeURIComponent(paire.slice(1).join('=').replace(/\+/g, ' '));
        } catch (e) {
          return paire.slice(1).join('=');
        }
      }
    }
    return '';
  }

  // Lit les UTM présents dans l'URL de la page
  function utmDeLaPage() {
    var trouve = false;
    var utm = {};
    for (var i = 0; i < NOMS.length; i++) {
      var valeur = lireParam(window.location.search, NOMS[i]);
      if (valeur) {
        utm[NOMS[i]] = valeur.substring(0, 200);
        trouve = true;
      }
    }
    return trouve ? utm : null;
  }

  // Accord « mesure d'audience » donné il y a moins de 6 mois ? (bandeau cookies)
  function audienceAcceptee() {
    try {
      var brut = window.localStorage.getItem('galac6-cookie-consent');
      if (!brut || brut.charAt(0) !== '{') return false;
      var choix = JSON.parse(brut);
      return !!choix && choix.audience === true && typeof choix.date === 'number' &&
        new Date().getTime() - choix.date <= 182 * 24 * 60 * 60 * 1000;
    } catch (e) {
      return false;
    }
  }

  // Avec accord : localStorage (30 jours). Sans accord : sessionStorage (visite en cours)
  // et on efface un éventuel ancien enregistrement de longue durée.
  var stockage = null;
  try {
    if (audienceAcceptee()) {
      stockage = window.localStorage;
    } else {
      try { window.localStorage.removeItem(CLE); } catch (e) {}
      stockage = window.sessionStorage;
    }
  } catch (e) {
    stockage = null;
  }

  // Lit l'enregistrement stocké (null si absent, illisible ou trop vieux)
  function lireStockage() {
    try {
      if (!stockage) return null;
      var brut = stockage.getItem(CLE);
      if (!brut) return null;
      var donnees = JSON.parse(brut);
      if (!donnees || typeof donnees.ts !== 'number') return null;
      if (new Date().getTime() - donnees.ts > DUREE_MAX) return null;
      return donnees;
    } catch (e) {
      return null;
    }
  }

  // Règle « premier contact » : on n'écrase pas un enregistrement de moins de 30 jours
  var utmCourants = utmDeLaPage();
  var stocke = lireStockage();
  // Accord donné pendant la visite : on reprend les UTM gardés pour la visite en cours
  if (!stocke && stockage) {
    try {
      var brutSession = stockage === window.localStorage ? window.sessionStorage.getItem(CLE) : null;
      if (brutSession) {
        stockage.setItem(CLE, brutSession);
        window.sessionStorage.removeItem(CLE);
        stocke = lireStockage();
      }
    } catch (e) {}
  }
  if (utmCourants && !stocke) {
    utmCourants.ts = new Date().getTime();
    try {
      if (stockage) stockage.setItem(CLE, JSON.stringify(utmCourants));
    } catch (e) {}
    stocke = utmCourants;
  }
  // Si le stockage est indisponible (navigation privée), on garde au moins les UTM de la page
  var utmATransmettre = stocke || utmCourants;
  if (!utmATransmettre) return;

  // Vrai si le lien pointe vers l'application web
  function estLienAppli(lien) {
    var hote = (lien.hostname || '').toLowerCase();
    for (var i = 0; i < DOMAINES_APPLI.length; i++) {
      if (hote === DOMAINES_APPLI[i]) return true;
    }
    return false;
  }

  // Ajoute les UTM au lien, sans doublon et sans casser la requête ni l'ancre existantes
  function enrichirLien(lien) {
    if (!lien || !lien.href || !estLienAppli(lien)) return;
    var href = lien.getAttribute('href') || '';
    var ancre = '';
    var posAncre = href.indexOf('#');
    if (posAncre !== -1) {
      ancre = href.substring(posAncre);
      href = href.substring(0, posAncre);
    }
    var posRequete = href.indexOf('?');
    var requete = posRequete !== -1 ? href.substring(posRequete) : '';
    var ajouts = [];
    for (var i = 0; i < NOMS.length; i++) {
      var nom = NOMS[i];
      var valeur = utmATransmettre[nom];
      // On ne touche pas à un paramètre déjà présent dans le lien
      if (valeur && requete.indexOf(nom + '=') === -1) {
        ajouts.push(nom + '=' + encodeURIComponent(valeur));
      }
    }
    if (!ajouts.length) return;
    var separateur = posRequete === -1 ? '?' : (/[?&]$/.test(href) ? '' : '&');
    lien.setAttribute('href', href + separateur + ajouts.join('&') + ancre);
  }

  // Enrichit tous les liens présents dans la page
  function enrichirTout() {
    var liens = document.getElementsByTagName('a');
    for (var i = 0; i < liens.length; i++) enrichirLien(liens[i]);
  }

  // Liens ajoutés plus tard (traductions, contenus dynamiques) : enrichis au moment du clic
  function surClic(evenement) {
    var cible = evenement.target;
    while (cible && cible.nodeName !== 'A') cible = cible.parentNode;
    if (cible) enrichirLien(cible);
  }
  document.addEventListener('click', surClic, true);
  document.addEventListener('auxclick', surClic, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enrichirTout);
  } else {
    enrichirTout();
  }
})();
