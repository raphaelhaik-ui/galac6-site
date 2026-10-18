// Bandeau cookies du site vitrine (RGPD / recommandations CNIL).
// - Trois boutons : « Tout refuser », « Personnaliser », « Tout accepter » (même visibilité).
// - Deux catégories séparées : mesure d'audience (Google Analytics) et publicité (Google Ads, Meta).
// - Rien n'est chargé avant l'accord. Choix gardé 6 mois, puis redemandé.
// - Tout lien portant l'attribut data-cookie-settings (pied de page « Gérer les cookies »)
//   rouvre le choix.
// Syntaxe volontairement ancienne (ES5) pour les vieux Safari iOS.
(function () {
  var CLE = 'galac6-cookie-consent';
  var DUREE_MAX = 182 * 24 * 60 * 60 * 1000; // 6 mois

  function lireChoix() {
    if (window.galac6LireChoixCookies) return window.galac6LireChoixCookies();
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

  var enAnglais = false;
  try { enAnglais = window.localStorage.getItem('galac6-lang') === 'en'; } catch (e) {}

  var T = enAnglais ? {
    texte: 'We would like to measure visits to this site (Google Analytics) and the results of our ads (Google Ads, Meta). ' +
      'These services set cookies and are only loaded if you agree. You can change your mind at any time with the “Manage cookies” link at the bottom of each page.',
    plus: 'Learn more',
    refuser: 'Refuse all',
    perso: 'Customise',
    accepter: 'Accept all',
    titrePerso: 'Choose your cookies',
    audienceTitre: 'Audience measurement',
    audienceTexte: 'Google Analytics: counts visits and the pages viewed, to improve the site.',
    pubTitre: 'Advertising',
    pubTexte: 'Google Ads and Meta (Facebook, Instagram): measure the results of our ads.',
    enregistrer: 'Save my choices',
    necessaires: 'The site also remembers your language and this choice on your device (required, no consent needed).'
  } : {
    texte: 'Nous aimerions mesurer les visites du site (Google Analytics) et les résultats de nos publicités (Google Ads, Meta). ' +
      'Ces services déposent des cookies et ne sont chargés que si vous êtes d\'accord. Vous pouvez changer d\'avis à tout moment avec le lien « Gérer les cookies » en bas de chaque page.',
    plus: 'En savoir plus',
    refuser: 'Tout refuser',
    perso: 'Personnaliser',
    accepter: 'Tout accepter',
    titrePerso: 'Choisir vos cookies',
    audienceTitre: 'Mesure d\'audience',
    audienceTexte: 'Google Analytics : compte les visites et les pages vues, pour améliorer le site.',
    pubTitre: 'Publicité',
    pubTexte: 'Google Ads et Meta (Facebook, Instagram) : mesurent les résultats de nos publicités.',
    enregistrer: 'Enregistrer mes choix',
    necessaires: 'Le site garde aussi votre langue et ce choix sur votre appareil (indispensable, sans accord).'
  };

  // ─── Styles ───
  var style = document.createElement('style');
  style.textContent = [
    '#galac6-cookie-banner{position:fixed;bottom:0;left:0;right:0;z-index:99999;background:#13131f;border-top:1px solid #2e2e45;',
    '  padding:16px 24px;box-shadow:0 -6px 24px rgba(0,0,0,.35);max-height:90vh;overflow-y:auto;}',
    '#galac6-cookie-banner .gcb-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;gap:16px;flex-wrap:wrap;}',
    '#galac6-cookie-banner p{color:#b0b0c8;font-size:14px;line-height:1.5;margin:0;flex:1 1 320px;}',
    '#galac6-cookie-banner a{color:#a78bfa;text-decoration:underline;}',
    '#galac6-cookie-banner .gcb-btns{display:flex;gap:10px;flex-wrap:wrap;flex-shrink:0;}',
    '#galac6-cookie-banner button{font:inherit;font-size:14px;font-weight:600;border-radius:8px;padding:11px 18px;min-height:44px;cursor:pointer;white-space:nowrap;}',
    '#galac6-cookie-banner .gcb-main{background:#7c3aed;color:#fff;border:1px solid #7c3aed;}',
    '#galac6-cookie-banner .gcb-main:hover{background:#6d28d9;border-color:#6d28d9;}',
    '#galac6-cookie-banner .gcb-ghost{background:transparent;color:#d0d0e0;border:1px solid #4a4a6a;}',
    '#galac6-cookie-banner .gcb-ghost:hover{border-color:#7c7c9c;color:#fff;}',
    '#galac6-cookie-banner .gcb-panel{max-width:1100px;margin:0 auto;}',
    '#galac6-cookie-banner h2{color:#f0f0f5;font-size:16px;margin:0 0 10px;}',
    '#galac6-cookie-banner .gcb-cat{display:flex;gap:12px;align-items:flex-start;padding:10px 0;border-top:1px solid #23233a;cursor:pointer;}',
    '#galac6-cookie-banner .gcb-cat input{width:22px;height:22px;margin-top:2px;flex-shrink:0;accent-color:#7c3aed;cursor:pointer;}',
    '#galac6-cookie-banner .gcb-cat strong{color:#f0f0f5;display:block;font-size:14px;}',
    '#galac6-cookie-banner .gcb-cat span{color:#b0b0c8;font-size:13px;line-height:1.45;}',
    '#galac6-cookie-banner .gcb-cat div{line-height:1.45;}',
    '#galac6-cookie-banner .gcb-note{font-size:12px;color:#8a8aa3;margin:8px 0 12px;flex:none;}',
    '.footer-badges{flex-wrap:wrap;}',
    '@media (max-width:600px){',
    '  #galac6-cookie-banner{padding:14px 16px;}',
    '  #galac6-cookie-banner .gcb-btns{width:100%;}',
    '  #galac6-cookie-banner .gcb-btns button{flex:1 1 30%;padding:11px 8px;white-space:normal;}',
    '  .footer-badges{justify-content:center;gap:0.8rem 1.2rem !important;}',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  var banniere = null;

  function fermer() {
    if (banniere && banniere.parentNode) banniere.parentNode.removeChild(banniere);
    banniere = null;
  }

  // Efface les cookies Google / Meta déjà posés (retrait de l'accord)
  function effacerCookies(prefixes) {
    var cookies = document.cookie ? document.cookie.split(';') : [];
    var hote = window.location.hostname;
    var domaines = ['', hote, '.' + hote];
    var morceaux = hote.split('.');
    if (morceaux.length > 2) domaines.push('.' + morceaux.slice(-2).join('.'));
    for (var i = 0; i < cookies.length; i++) {
      var nom = cookies[i].split('=')[0].replace(/^\s+|\s+$/g, '');
      for (var p = 0; p < prefixes.length; p++) {
        if (nom.indexOf(prefixes[p]) === 0) {
          for (var d = 0; d < domaines.length; d++) {
            document.cookie = nom + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' +
              (domaines[d] ? '; domain=' + domaines[d] : '');
          }
        }
      }
    }
  }

  function enregistrer(audience, ads) {
    var avant = lireChoix();
    try {
      window.localStorage.setItem(CLE, JSON.stringify({
        audience: !!audience, ads: !!ads, date: new Date().getTime()
      }));
    } catch (e) {}
    fermer();

    // Retrait d'un accord déjà donné : on efface les cookies et on recharge la page
    // pour arrêter les scripts déjà chargés.
    // Les cookies d'une catégorie refusée sont toujours effacés (y compris ceux
    // posés avec l'ancien bandeau).
    var prefixes = [];
    if (!audience) prefixes.push('_ga');
    if (!ads) { prefixes.push('_gcl'); prefixes.push('_fbp'); prefixes.push('_fbc'); }
    if (prefixes.length) effacerCookies(prefixes);
    var retraitAudience = avant && avant.audience && !audience;
    var retraitPub = avant && avant.ads && !ads;
    if (retraitAudience || retraitPub) {
      window.location.reload();
      return;
    }

    if (audience && window.galac6ChargerAudience) window.galac6ChargerAudience();
    if (ads) {
      if (window.galac6ChargerPubliciteGoogle) window.galac6ChargerPubliciteGoogle();
      if (window.galac6LoadPixel) window.galac6LoadPixel();
    }
  }

  function bouton(classe, texte, action) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = classe;
    b.textContent = texte;
    b.addEventListener('click', action);
    return b;
  }

  function creerConteneur() {
    fermer();
    banniere = document.createElement('div');
    banniere.id = 'galac6-cookie-banner';
    banniere.setAttribute('role', 'dialog');
    banniere.setAttribute('aria-live', 'polite');
    banniere.setAttribute('aria-label', enAnglais ? 'Cookies' : 'Cookies');
    document.body.appendChild(banniere);
    return banniere;
  }

  // Bandeau principal : Tout refuser / Personnaliser / Tout accepter
  function afficherBandeau() {
    var c = creerConteneur();
    var inner = document.createElement('div');
    inner.className = 'gcb-inner';
    var p = document.createElement('p');
    p.textContent = T.texte + ' ';
    var lien = document.createElement('a');
    lien.href = enAnglais ? '/mentions-legales#cookies-en' : '/mentions-legales#cookies';
    lien.textContent = T.plus;
    p.appendChild(lien);
    inner.appendChild(p);
    var btns = document.createElement('div');
    btns.className = 'gcb-btns';
    btns.appendChild(bouton('gcb-main', T.refuser, function () { enregistrer(false, false); }));
    btns.appendChild(bouton('gcb-ghost', T.perso, function () { afficherPanneau(); }));
    btns.appendChild(bouton('gcb-main', T.accepter, function () { enregistrer(true, true); }));
    inner.appendChild(btns);
    c.appendChild(inner);
  }

  function categorie(id, titre, texte, coche) {
    var label = document.createElement('label');
    label.className = 'gcb-cat';
    label.setAttribute('for', id);
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = id;
    input.checked = !!coche;
    var bloc = document.createElement('div');
    var s = document.createElement('strong');
    s.textContent = titre;
    var sp = document.createElement('span');
    sp.textContent = texte;
    bloc.appendChild(s);
    bloc.appendChild(sp);
    label.appendChild(input);
    label.appendChild(bloc);
    return label;
  }

  // Panneau « Personnaliser » (aussi ouvert par « Gérer les cookies »)
  function afficherPanneau() {
    var actuel = lireChoix() || { audience: false, ads: false };
    var c = creerConteneur();
    var panel = document.createElement('div');
    panel.className = 'gcb-panel';
    var h = document.createElement('h2');
    h.textContent = T.titrePerso;
    panel.appendChild(h);
    panel.appendChild(categorie('gcb-audience', T.audienceTitre, T.audienceTexte, actuel.audience));
    panel.appendChild(categorie('gcb-ads', T.pubTitre, T.pubTexte, actuel.ads));
    var note = document.createElement('p');
    note.className = 'gcb-note';
    note.textContent = T.necessaires;
    panel.appendChild(note);
    var btns = document.createElement('div');
    btns.className = 'gcb-btns';
    btns.appendChild(bouton('gcb-main', T.refuser, function () { enregistrer(false, false); }));
    btns.appendChild(bouton('gcb-ghost', T.enregistrer, function () {
      enregistrer(document.getElementById('gcb-audience').checked, document.getElementById('gcb-ads').checked);
    }));
    btns.appendChild(bouton('gcb-main', T.accepter, function () { enregistrer(true, true); }));
    panel.appendChild(btns);
    c.appendChild(panel);
    var premier = document.getElementById('gcb-audience');
    if (premier) premier.focus();
  }

  // Lien « Gérer les cookies » (pied de page de chaque page)
  document.addEventListener('click', function (e) {
    var cible = e.target;
    while (cible && cible !== document) {
      if (cible.getAttribute && cible.getAttribute('data-cookie-settings') !== null) {
        e.preventDefault();
        afficherPanneau();
        return;
      }
      cible = cible.parentNode;
    }
  });
  window.galac6GererCookies = afficherPanneau;

  // Catégories refusées : on efface à chaque page les cookies qui auraient été
  // réécrits par un script encore actif au moment du retrait de l'accord.
  var choixActuel = lireChoix();
  if (choixActuel) {
    var aEffacer = [];
    if (!choixActuel.audience) aEffacer.push('_ga');
    if (!choixActuel.ads) { aEffacer.push('_gcl'); aEffacer.push('_fbp'); aEffacer.push('_fbc'); }
    if (aEffacer.length) effacerCookies(aEffacer);
  }

  // Première visite, ancien format ou choix de plus de 6 mois : on (re)demande.
  if (!choixActuel) {
    try {
      // Ancien choix (avant octobre 2026, un seul bouton « Accepter ») : on le remplace.
      var ancien = window.localStorage.getItem(CLE);
      if (ancien && ancien.charAt(0) !== '{') window.localStorage.removeItem(CLE);
    } catch (e) {}
    afficherBandeau();
  }
})();
