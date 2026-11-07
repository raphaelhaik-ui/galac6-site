#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Galac6 — fabrication des pages traduites du site vitrine (en, es, it, de, pt, nl ; he en réserve).

Pourquoi : la traduction anglaise d'i18n.js ne s'affiche qu'après un clic dans le navigateur,
Google ne voit donc que le français. Ce script écrit de vraies pages statiques par langue :
  /en/  /en/familles  /en/ecole  /en/about  /en/tarifs           (vote anglais = /international, inchangé)
  /es/  /es/familles  /es/ecole  /es/about  /es/tarifs  /es/international   (idem it, de, pt, nl)
  /ecoles-francaises-etranger → /en/french-schools-abroad    (français et anglais seulement)

Sources des textes :
  - français : les pages françaises elles-mêmes (index.html, familles.html, ecole.html, about.html, tarifs.html) ;
  - anglais : i18n.js (+ compléments dans scripts/langs/en.json) ; page de vote : international.html ;
  - es, it, de, pt, nl (et he) : scripts/langs/<langue>.json (mêmes clés qu'i18n.js) ;
  - noms de pays de la page de vote : scripts/langs/countries.json (voir make-countries.js).

Ce que fait le script, dans l'ordre :
  1. met à jour les pages françaises (et international.html) : sélecteur de langue en texte,
     bouton « Galac6 in your country », marge du logo, balises hreflang, attribut data-static-lang ;
  2. écrit les pages traduites (lang, dir="rtl" pour l'hébreu, title, description, Open Graph,
     canonical, hreflang, chemins absolus, sans i18n.js) ;
  3. met à jour _redirects (adresses sans .html) et sitemap.xml (alternatives hreflang) ;
  4. contrôle : clés manquantes, texte de la langue source oublié, liens internes cassés.

Usage (depuis n'importe où) :
  python3 scripts/build-langs.py                 # tout régénérer + contrôles
  python3 scripts/build-langs.py --export-source # réécrit scripts/langs/_source.json (clés + textes FR/EN)
  python3 scripts/build-langs.py --check-only    # contrôles seuls (liens, textes oubliés)
Prérequis : Python 3.9+, BeautifulSoup 4 (pip3 install beautifulsoup4), Node.js (lecture d'i18n.js).
"""
import datetime
import json
import os
import re
import subprocess
import sys

from bs4 import BeautifulSoup, Comment, NavigableString

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANGDIR = os.path.join(ROOT, 'scripts', 'langs')
SITE = 'https://galac6.io'
# Hébreu retiré pour l'instant (Raphaël, 31/10/2026) : remettre 'he' ici pour le republier, le dictionnaire scripts/langs/he.json est gardé
# Portugais (du Portugal) et néerlandais ajoutés le 31/10/2026
LANGS = ['en', 'es', 'it', 'de', 'pt', 'nl']
ALL = ['fr'] + LANGS
NAMES = {'fr': 'Français', 'en': 'English', 'es': 'Español', 'it': 'Italiano', 'de': 'Deutsch', 'pt': 'Português', 'nl': 'Nederlands', 'he': 'עברית'}
LANG_LABEL_FR = 'Langue'
OG_LOCALE = {'fr': 'fr_FR', 'en': 'en_GB', 'es': 'es_ES', 'it': 'it_IT', 'de': 'de_DE', 'pt': 'pt_PT', 'nl': 'nl_NL', 'he': 'he_IL'}
TODAY = datetime.date.today().isoformat()

# Groupes de pages traduites : fichier source et langue de la source
GROUPS = {
    'index': {'src': 'index.html', 'src_lang': 'fr'},
    'familles': {'src': 'familles.html', 'src_lang': 'fr'},  # page Familles (refonte du 02/11/2026)
    'ecole': {'src': 'ecole.html', 'src_lang': 'fr'},
    'about': {'src': 'about.html', 'src_lang': 'fr'},
    'tarifs': {'src': 'tarifs.html', 'src_lang': 'fr'},
    'vote': {'src': 'international.html', 'src_lang': 'en'},
    'etranger': {'src': 'ecoles-francaises-etranger.html', 'src_lang': 'fr'},
    'expat': {'src': 'familles-francaises-etranger.html', 'src_lang': 'fr'},
    'dictee': {'src': 'dictee-en-ligne.html', 'src_lang': 'fr'},
    'annales': {'src': 'annales-brevet-bac.html', 'src_lang': 'fr'},
}
# Pages à adresse propre par langue (une langue absente = pas de page dans cette langue)
SLUGS = {
    'etranger': {'fr': '/ecoles-francaises-etranger', 'en': '/en/french-schools-abroad'},
    # Familles françaises à l'étranger : adresses construites sur les requêtes réelles de chaque langue (SEO, 31/10/2026)
    'expat': {'fr': '/familles-francaises-etranger', 'en': '/en/french-curriculum-abroad',
              'es': '/es/programa-escolar-frances', 'it': '/it/programma-scolastico-francese',
              'de': '/de/franzoesischer-lehrplan', 'pt': '/pt/curriculo-frances', 'nl': '/nl/frans-curriculum'},
    'dictee': {'fr': '/dictee-en-ligne', 'en': '/en/french-dictation-online'},
    'annales': {'fr': '/annales-brevet-bac', 'en': '/en/brevet-bac-past-papers'},
}
# Chemin (adresse) d'une page traduite → groupe
PATH_TO_GROUP = {
    '/': 'index', '/index.html': 'index', '/familles': 'familles', '/familles.html': 'familles', '/ecole': 'ecole', '/ecole.html': 'ecole',
    '/about': 'about', '/about.html': 'about', '/tarifs': 'tarifs', '/tarifs.html': 'tarifs',
    '/international': 'vote', '/international.html': 'vote',
    '/ecoles-francaises-etranger': 'etranger', '/ecoles-francaises-etranger.html': 'etranger',
    '/french-schools-abroad': 'etranger',
    '/french-curriculum-abroad': 'expat', '/french-dictation-online': 'dictee', '/brevet-bac-past-papers': 'annales',
    '/familles-francaises-etranger': 'expat', '/familles-francaises-etranger.html': 'expat',
    '/dictee-en-ligne': 'dictee', '/dictee-en-ligne.html': 'dictee',
    '/annales-brevet-bac': 'annales', '/annales-brevet-bac.html': 'annales',
}
# Pages faites à la main (hors groupes) qui ont une version anglaise : liens traduits et sélecteur de langue (31/10/2026)
# '/blog' → '/en/blog' : index du blog anglais (01/11/2026) ; les autres langues gardent le blog français.
# Blog : adresse de référence avec la barre finale (/blog/, /en/blog/), audit SEO du 03/11/2026 ; '/blog' gardé pour les anciens liens
PAIRES_EN = {'/ecoles-francaises-royaume-uni': '/en/french-schools-uk',
             '/blog': '/en/blog/', '/blog/': '/en/blog/',
             '/blog/pisa-2025-ecole-du-futur': '/en/blog/pisa-2025-school-of-the-future'}
# Fil d'Ariane des pages françaises (les autres langues : clés nav.* ou <groupe>.crumb des dictionnaires)
CRUMB_FR = {'familles': 'Familles', 'ecole': 'Professeurs et écoles', 'about': 'À propos', 'tarifs': 'Tarifs',
            'etranger': "Écoles françaises à l'étranger", 'expat': "Familles françaises à l'étranger",
            'dictee': 'Dictée en ligne', 'annales': 'Annales du brevet et du bac'}
CRUMB_KEY = {'familles': 'nav.families', 'ecole': 'nav.school', 'about': 'nav.about', 'tarifs': 'nav.pricing', 'etranger': 'etranger.crumb',
             'expat': 'expat.crumb', 'dictee': 'dictee.crumb', 'annales': 'annales.crumb'}
# Pages françaises dont les données structurées sont écrites par ce script (les autres : à la main ;
# familles.html garde ses données faites à la main, ses versions traduites sont générées)
# dictee-en-ligne.html (réécrite le 01/11/2026) a ses propres données structurées (SoftwareApplication, offres) : à la main
AUTO_LD_FR = ('ecole', 'about', 'etranger', 'expat', 'annales')
# Pays servis (données structurées) : la France et les pays d'Europe qui ont des écoles françaises.
# Galac6 y suit toujours le programme français, sans promesse d'un programme local.
AREA_SERVED = ['FR', 'BE', 'LU', 'CH', 'MC', 'AD', 'ES', 'PT', 'IT', 'DE', 'AT', 'NL', 'GB', 'IE',
               'DK', 'SE', 'NO', 'FI', 'PL', 'CZ', 'HU', 'RO', 'GR', 'HR', 'BG', 'SK', 'SI', 'CY', 'MT']
ORG_DESC = {
    # Méthode pédagogique en tête (05/11/2026, texte de Raphaël) : préparation au contrôle, puis l'hébergement en France en fin de phrase
    'fr': "Galac6 (galac6.io) prépare chaque élève à son contrôle d'une façon unique. L'élève apprend sa leçon sur une fiche de révision Galac6. Une IA l'interroge ensuite pour mesurer ce qu'il a vraiment retenu. Puis Galac6 lui propose des exercices adaptés à son niveau. Pendant tout ce travail, un chat pédagogique l'aide sans jamais lui donner la réponse. Chaque élève peut aussi s'entraîner à la dictée, avec plus de 2 000 textes, et au calcul mental, et faire des annales du brevet et du bac. Du CP à la Terminale, sur le programme scolaire français. Données hébergées en France, IA traitée en Europe.",
    'en': "Galac6 (galac6.io) prepares each pupil for their class test in a unique way. The pupil learns the lesson on a Galac6 revision sheet. An AI then quizzes them to measure what they have really remembered. Next, Galac6 offers them exercises suited to their level. Throughout this work, a teaching chat helps them without ever giving them the answer. Each pupil can also practise dictation, with over 2,000 texts, and mental maths, and work on past brevet and bac papers. From CP to Terminale (grades 1 to 12), on the French national curriculum. Data hosted in France, AI processed in Europe.",
    'es': "Galac6 (galac6.io) prepara a cada alumno para su examen de una forma única. El alumno aprende su lección con una ficha de repaso de Galac6. Después, una IA le hace preguntas para medir lo que realmente ha retenido. Luego, Galac6 le propone ejercicios adaptados a su nivel. Durante todo este trabajo, un chat pedagógico le ayuda sin darle nunca la respuesta. Cada alumno también puede practicar el dictado, con más de 2 000 textos, y el cálculo mental, y hacer exámenes de años anteriores del brevet y del bac. Del CP a la Terminale, según el programa escolar francés. Datos alojados en Francia, IA procesada en Europa.",
    'it': "Galac6 (galac6.io) prepara ogni alunno alla sua verifica in modo unico. L'alunno studia la lezione su una scheda di ripasso Galac6. Poi un'IA lo interroga per misurare ciò che ha davvero memorizzato. Quindi Galac6 gli propone esercizi adatti al suo livello. Durante tutto questo lavoro, una chat didattica lo aiuta senza mai dargli la risposta. Ogni alunno può anche esercitarsi nel dettato, con oltre 2 000 testi, e nel calcolo mentale, e svolgere prove d'esame degli anni passati del brevet e del bac. Dalla primaria al liceo, sul programma scolastico francese. Dati ospitati in Francia, IA elaborata in Europa.",
    'de': "Galac6 (galac6.io) bereitet jeden Schüler auf einzigartige Weise auf seine Klassenarbeit vor. Der Schüler lernt seine Lektion mit einem Galac6-Lernblatt. Danach fragt ihn eine KI ab, um zu messen, was er wirklich behalten hat. Dann schlägt Galac6 ihm Übungen auf seinem Niveau vor. Während der ganzen Arbeit hilft ihm ein pädagogischer Chat, ohne ihm jemals die Antwort zu geben. Jeder Schüler kann außerdem Diktate üben, mit über 2.000 Texten, Kopfrechnen trainieren und frühere Prüfungen des Brevet und des Bac bearbeiten. Von der 1. bis zur 12. Klasse, nach dem französischen Lehrplan. Daten in Frankreich gehostet, KI in Europa verarbeitet.",
    'pt': "O Galac6 (galac6.io) prepara cada aluno para o seu teste de uma forma única. O aluno estuda a lição numa ficha de revisão do Galac6. Depois, uma IA faz-lhe perguntas para medir o que ele realmente reteve. Em seguida, o Galac6 propõe-lhe exercícios adaptados ao seu nível. Durante todo este trabalho, um chat pedagógico ajuda-o sem nunca lhe dar a resposta. Cada aluno pode também treinar o ditado, com mais de 2 000 textos, e o cálculo mental, e fazer exames de anos anteriores do brevet e do bac. Do CP à Terminale, segundo o currículo francês. Dados alojados em França, IA processada na Europa.",
    'nl': "Galac6 (galac6.io) bereidt elke leerling op een unieke manier voor op zijn toets. De leerling leert zijn les met een samenvattingsfiche van Galac6. Daarna overhoort een AI hem om te meten wat hij echt onthouden heeft. Vervolgens stelt Galac6 hem oefeningen voor die bij zijn niveau passen. Tijdens dit hele werk helpt een pedagogische chat hem, zonder hem ooit het antwoord te geven. Elke leerling kan ook dictees oefenen, met meer dan 2.000 teksten, hoofdrekenen trainen en oude examens van het brevet en het bac maken. Van CP tot Terminale, volgens het Franse curriculum. Gegevens gehost in Frankrijk, AI verwerkt in Europa.",
}
# Slogan officiel, toujours avec son point (03/11/2026)
SLOGAN = "L'IA au service de la pédagogie."
PERSON_ID = SITE + '/about#raphael-haik'
JOB_TITLE = {'fr': 'Fondateur de Galac6', 'en': 'Founder of Galac6', 'es': 'Fundador de Galac6', 'it': 'Fondatore di Galac6',
             'de': 'Gründer von Galac6', 'pt': 'Fundador do Galac6', 'nl': 'Oprichter van Galac6'}
# Texte alternatif de l'image de partage (og:image:alt), par langue (03/11/2026)
OG_ALT = {'fr': "Galac6, l'IA au service de la pédagogie.", 'en': 'Galac6, AI in the service of teaching.',
          'es': 'Galac6, la IA al servicio de la pedagogía.', 'it': "Galac6, l'IA al servizio della pedagogia.",
          'de': 'Galac6, KI im Dienst der Pädagogik.', 'pt': 'Galac6, a IA ao serviço da pedagogia.',
          'nl': 'Galac6, AI in dienst van de pedagogiek.', 'he': 'Galac6'}
EMOJI = re.compile('[\U0001F000-\U0001FAFF☀-➿⭐️\U0001F1E6-\U0001F1FF]\\s?')

GLOBE = ('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
         'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/>'
         '<path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 '
         '15.3 15.3 0 0 1 4-10z"/></svg>')

# Styles communs du menu, insérés dans chaque page (bloc <style id="g6-nav-css">).
# Barre de navigation unique (01/11/2026) : ces règles décrivent TOUTE la barre (hauteur, marges, logo, liens,
# hamburger) et passent devant les styles propres à chaque page (sélecteurs préfixés par .navbar-wrapper).
NAV_CSS = """
    /* Menu commun à toutes les pages : mêmes liens, même logo, mêmes marges (généré par scripts/build-langs.py) */
    html, body { overflow-x: clip; } /* les halos décoratifs du haut de page ne créent plus de défilement horizontal */
    .navbar-wrapper { position: sticky; top: 0; z-index: 100; background: rgba(11,11,20,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid var(--border, #1e1e32); }
    .navbar-wrapper .navbar { display: flex; align-items: center; justify-content: space-between; flex-wrap: nowrap; gap: 0; padding: 1.25rem 2.5rem; max-width: 1200px; margin: 0 auto; line-height: 1.7; }
    .navbar-wrapper .navbar-brand { display: flex; align-items: center; gap: 0.6rem; text-decoration: none; margin-inline-end: 1.5rem; flex-shrink: 0; }
    .navbar-wrapper .navbar-brand img { height: 44px; width: auto; }
    .navbar-wrapper .navbar-brand span { font-size: 1.6rem; font-weight: 800; color: var(--text, #f0f0f5); letter-spacing: -0.02em; }
    .navbar-wrapper .navbar-links { display: flex; flex-direction: row; align-items: center; gap: 2rem; width: auto; padding: 0; margin: 0; }
    .navbar-wrapper .navbar-links > a { display: inline; min-height: 0; padding: 0; color: var(--text-muted, #8a8aa3); font-size: 0.9rem; font-weight: 500; text-decoration: none; white-space: nowrap; transition: color 0.2s; }
    .navbar-wrapper .navbar-links > a:hover, .navbar-wrapper .navbar-links > a.active { color: var(--text, #f0f0f5); text-decoration: none; }
    .navbar-wrapper .navbar-hamburger { display: none; background: none; border: none; cursor: pointer; padding: 0.5rem; flex-direction: column; justify-content: center; align-items: center; gap: 5px; min-width: 44px; min-height: 44px; }
    .navbar-wrapper .navbar-hamburger span { display: block; width: 24px; height: 2px; background: var(--text, #f0f0f5); border-radius: 2px; transition: transform 0.3s, opacity 0.3s; }
    .navbar-wrapper .navbar-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .navbar-wrapper .navbar-hamburger.open span:nth-child(2) { opacity: 0; }
    .navbar-wrapper .navbar-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    .lang-menu { position: relative; }
    .lang-menu summary { list-style: none; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; min-height: 44px; padding: 0 4px; color: var(--text-muted, #8a8aa3); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.04em; user-select: none; }
    .lang-menu summary::-webkit-details-marker { display: none; }
    .lang-menu summary::after { content: ""; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid currentColor; }
    .lang-menu summary:hover, .lang-menu[open] summary { color: var(--text, #f0f0f5); }
    .lang-menu-list { position: absolute; top: 100%; inset-inline-end: 0; z-index: 300; min-width: 160px; display: grid; gap: 2px; padding: 6px; background: #13131f; border: 1px solid #2a2a44; border-radius: 12px; box-shadow: 0 12px 32px rgba(0,0,0,0.45); }
    .navbar .lang-menu-list a { display: block; padding: 0.55rem 0.8rem; border-radius: 8px; color: var(--text-muted, #8a8aa3); font-size: 0.9rem; font-weight: 500; text-decoration: none; white-space: nowrap; min-height: 0; }
    .navbar .lang-menu-list a:hover { background: rgba(124,92,252,0.14); color: var(--text, #f0f0f5); }
    .navbar .lang-menu-list a[aria-current] { color: var(--text, #f0f0f5); font-weight: 700; }
    .lang-menu .lang-flag { flex: none; width: 20px; height: 14px; border-radius: 2px; box-shadow: 0 0 0 1px rgba(255,255,255,0.15); }
    .navbar .lang-menu-list a { display: flex; align-items: center; gap: 8px; }
    /* Grand écran : menu un peu resserré pour tenir sur une ligne */
    @media (min-width: 1241px) {
      .navbar-wrapper .navbar-links { gap: 1.25rem; }
      .navbar-wrapper .navbar-links > a { font-size: 0.88rem; }
      .navbar-wrapper .navbar-brand { margin-inline-end: 1.25rem; }
    }
    @media (min-width: 901px) and (max-width: 1240px) {
      .navbar-wrapper .navbar { padding-left: 2rem; padding-right: 2rem; }
      .navbar-wrapper .navbar-links { gap: 0.75rem; }
      .navbar-wrapper .navbar-links > a { font-size: 0.8rem; }
      .navbar-wrapper .navbar-links > a[href^="https://galac6web"] { padding: 0.45rem 0.9rem !important; }
      .navbar-wrapper .navbar-brand { margin-inline-end: 1rem; }
      .navbar-wrapper .navbar-brand span { font-size: 1.35rem; }
      .navbar-wrapper .navbar-brand img { height: 38px; }
    }
    /* Menu hamburger (900 px et moins) */
    @media (max-width: 900px) {
      .navbar-wrapper .navbar { padding: 1rem 1.5rem; flex-wrap: wrap; }
      .navbar-wrapper .navbar-brand { margin-inline-end: 0; }
      .navbar-wrapper .navbar-hamburger { display: flex; }
      .navbar-wrapper .navbar-links { display: none; flex-direction: column; width: 100%; gap: 0.5rem; padding: 1rem 0 0.5rem; }
      .navbar-wrapper .navbar-links.open { display: flex; }
      .navbar-wrapper .navbar-links > a { display: flex; align-items: center; justify-content: center; min-height: 44px; padding: 0.6rem 0; font-size: 1rem; }
      .lang-menu { align-self: center; }
      .lang-menu summary { font-size: 0.95rem; }
      .lang-menu-list { position: static; display: flex; flex-wrap: wrap; justify-content: center; min-width: 0; margin-top: 4px; }
      .navbar .lang-menu-list a { padding: 0.6rem 0.75rem; font-size: 0.95rem !important; }
    }
"""

# Barre de navigation unique (01/11/2026, demande de Raphaël) : mêmes liens, même ordre, même logo, même bouton
# sur toutes les pages et dans toutes les langues. Nouveau menu du 02/11/2026 (refonte) : Familles, Professeurs et
# écoles, Tarifs, Blog, À propos, langue, inscription. Le lien de la page courante est mis en surbrillance (class="active").
NAV_ITEMS = ('families', 'school', 'pricing', 'blog', 'about')
NAV_FR = {'nav.families': 'Familles', 'nav.school': 'Professeurs et écoles', 'nav.pricing': 'Tarifs',
          'nav.blog': 'Blog', 'nav.about': 'À propos', 'nav.signup': 'Inscription ou connexion'}
SIGNUP_URL = 'https://galac6web.netlify.app/'
SIGNUP_STYLE = ('background: linear-gradient(135deg, var(--gradient-start, #6366f1), var(--gradient-end, #a855f7)); '
                'color: #fff; padding: 0.5rem 1.2rem; border-radius: 10px; font-weight: 600; text-align: center;')

# Bandeau anglais présent sur TOUTES les pages, jamais traduit, sans bouton de fermeture.
# Depuis l'audit SEO du 03/11/2026 : son HTML est placé juste au-dessus du pied de page (rien en anglais avant le h1).
# Depuis le 07/11/2026 (demande de Raphaël, en bas personne ne le voyait) : AFFICHÉ en haut de l'écran et toujours
# visible, par CSS (position fixe). Le petit script mesure sa hauteur (--g6-banner-h) pour décaler la page, le menu
# collant et les ancres ; sans script, des hauteurs estimées par largeur d'écran prennent le relais.
# Son lien mène à la page de vote (réécrit vers /es/international, etc. sur les pages traduites).
INTL_BANNER = ('<!-- intl-banner --><div class="g6-intl-banner" id="g6-intl-banner" lang="en" dir="ltr" role="note">'
               '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
               'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/>'
               '<path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 '
               '15.3 15.3 0 0 1 4-10z"/></svg><span>Galac6 follows the French national curriculum, for French schools and families in France and abroad. '
               'Want Galac6 for your country&rsquo;s curriculum? <a href="/international">Send a request&nbsp;&rarr;</a></span></div>'
               '<script id="g6-banner-js">(function(){var b=document.getElementById(\'g6-intl-banner\');if(!b)return;var r=document.documentElement;'
               'function h(){r.style.setProperty(\'--g6-banner-h\',b.offsetHeight+\'px\');}h();'
               'if(window.ResizeObserver)new ResizeObserver(h).observe(b);else window.addEventListener(\'resize\',h);})();</script>'
               '<!-- /intl-banner -->')
BANNER_CSS = """
    /* Bandeau anglais « Galac6 follows the French national curriculum » : HTML juste au-dessus du pied de page (règle SEO), affiché en haut de l'écran et toujours visible (généré par scripts/build-langs.py) */
    .g6-intl-banner { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 0; padding: 6px 16px; background: linear-gradient(135deg, #6366f1, #a855f7); color: #fff; font-size: 0.82rem; font-weight: 500; line-height: 1.4; text-align: center; direction: ltr; position: fixed; top: 0; left: 0; right: 0; z-index: 200; box-shadow: 0 1px 0 rgba(255,255,255,0.12); }
    .g6-intl-banner svg { flex: none; opacity: 0.9; }
    .g6-intl-banner span { min-width: 0; overflow-wrap: anywhere; }
    .g6-intl-banner a { position: relative; color: #fff; font-weight: 700; text-decoration: none; white-space: nowrap; border-bottom: 1px solid rgba(255,255,255,0.5); }
    .g6-intl-banner a::after { content: ""; position: absolute; left: -8px; right: -8px; top: -14px; bottom: -14px; } /* zone de clic agrandie sans grossir le bandeau */
    .g6-intl-banner a:hover, .g6-intl-banner a:focus-visible { border-bottom-color: #fff; text-decoration: none; }
    /* Décalages : la page, le menu collant et les ancres passent sous le bandeau (hauteur mesurée par le script, sinon estimée) */
    html:has(#g6-intl-banner) { --g6-banner-h: 33px; scroll-padding-top: 0; }
    html:has(#g6-intl-banner) body { padding-top: var(--g6-banner-h); }
    html:has(#g6-intl-banner) .navbar-wrapper { top: var(--g6-banner-h); }
    html:has(#g6-intl-banner) [id] { scroll-margin-top: calc(var(--g6-banner-h) + 100px); }
    html:has(#g6-intl-banner) .toc-side { top: calc(var(--g6-banner-h) + 110px); max-height: calc(100vh - var(--g6-banner-h) - 130px); }
    html:has(#g6-intl-banner) .cmp thead th { top: calc(var(--nav-h, 0px) + var(--g6-banner-h)); }
    @media (max-width: 1240px) { html:has(#g6-intl-banner) { --g6-banner-h: 51px; } }
    @media (max-width: 600px) {
      .g6-intl-banner { font-size: 13px; line-height: 1.32; padding: 5px 12px; }
      .g6-intl-banner svg { display: none; }
      html:has(#g6-intl-banner) { --g6-banner-h: 61px; }
    }
"""

# Corrections de mise en page pour l'hébreu (écrit de droite à gauche)
RTL_CSS = """
    /* Hébreu : lecture de droite à gauche (généré par scripts/build-langs.py) */
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Arial Hebrew", "Noto Sans Hebrew", Arial, sans-serif; }
    .faq-question, .school-pill-text { text-align: right; }
    .en-banner { padding-left: 1rem; padding-right: 1rem; }
    input[type="email"], input[type="tel"] { direction: ltr; text-align: right; }
    .hero::before { left: auto; right: -150px; }
    .hero::after { right: auto; left: -100px; }
"""

NOTICE_CSS = """
    /* Bandeau d'information des pages es/it/de/pt/nl, sous le menu (généré par scripts/build-langs.py) */
    .lang-notice { margin: 0; padding: 10px 16px; background: rgba(99,102,241,0.12); border-bottom: 1px solid rgba(139,147,255,0.3); color: #d6d9f5; font-size: 0.88rem; line-height: 1.5; text-align: center; }
    .lang-notice a { color: #fff; font-weight: 600; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.5); }
"""

# Drapeaux du sélecteur de langue (03/11/2026) : SVG simplifiés lisibles à 20 × 14, pas d'emojis (ne s'affichent pas sous Windows).
# Royaume-Uni simplifié, Espagne et Portugal sans armoiries (le Portugal garde un disque jaune pour rester reconnaissable).
FLAGS = {
    'fr': '<rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#002654"/><rect x="13.33" width="6.67" height="14" fill="#ce1126"/>',
    'en': ('<rect width="20" height="14" fill="#012169"/><path d="M0 0L20 14M20 0L0 14" stroke="#fff" stroke-width="3"/>'
           '<path d="M0 0L20 14M20 0L0 14" stroke="#c8102e" stroke-width="1"/><path d="M10 0V14M0 7H20" stroke="#fff" stroke-width="4.5"/>'
           '<path d="M10 0V14M0 7H20" stroke="#c8102e" stroke-width="2.5"/>'),
    'es': '<rect width="20" height="14" fill="#aa151b"/><rect y="3.5" width="20" height="7" fill="#f1bf00"/>',
    'it': '<rect width="20" height="14" fill="#fff"/><rect width="6.67" height="14" fill="#009246"/><rect x="13.33" width="6.67" height="14" fill="#ce2b37"/>',
    'de': '<rect width="20" height="14" fill="#ffce00"/><rect width="20" height="4.67" fill="#000"/><rect y="4.67" width="20" height="4.67" fill="#dd0000"/>',
    'pt': ('<rect width="20" height="14" fill="#da291c"/><rect width="8" height="14" fill="#046a38"/>'
           '<circle cx="8" cy="7" r="3" fill="#ffe900"/><circle cx="8" cy="7" r="1.6" fill="#da291c"/>'),
    'nl': '<rect width="20" height="14" fill="#fff"/><rect width="20" height="4.67" fill="#ae1c28"/><rect y="9.33" width="20" height="4.67" fill="#21468b"/>',
    'he': '<rect width="20" height="14" fill="#fff"/><rect y="1.5" width="20" height="2" fill="#0038b8"/><rect y="10.5" width="20" height="2" fill="#0038b8"/>'
          '<path d="M10 4.2L12.4 8.4H7.6ZM10 9.8L7.6 5.6H12.4Z" fill="none" stroke="#0038b8" stroke-width="0.7"/>',
}

LANG_MENU_JS = ("<script>document.addEventListener('click',function(e){document.querySelectorAll('details.lang-menu[open]')"
                ".forEach(function(d){if(!d.contains(e.target))d.removeAttribute('open');});});</script>")


# ───────────────────────────── utilitaires ─────────────────────────────

def read(rel):
    with open(os.path.join(ROOT, rel), encoding='utf-8') as f:
        return f.read()


def write(rel, text):
    path = os.path.join(ROOT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)


def norm(s):
    return re.sub(r'\s+', ' ', s or '').strip()


def page_path(group, lang):
    """Adresse publique d'une page (None si elle n'existe pas dans cette langue)."""
    if group in SLUGS:
        return SLUGS[group].get(lang)
    if group == 'vote':
        if lang == 'fr':
            return None
        return '/international' if lang == 'en' else '/%s/international' % lang
    if group == 'index':
        return '/' if lang == 'fr' else '/%s/' % lang
    return '/%s' % group if lang == 'fr' else '/%s/%s' % (lang, group)


def out_file(path):
    """Fichier écrit pour une adresse : /es/ → es/index.html, /es/ecole → es/ecole.html."""
    if path.endswith('/'):
        return path.strip('/') + '/index.html'
    return path.strip('/') + '.html'


def group_langs(group):
    return [l for l in ALL if page_path(group, l)]


def load_en():
    """Textes anglais : objet translations.en d'i18n.js (lu par Node) + compléments en.json."""
    js = r"""
const fs=require('fs'),vm=require('vm');const src=fs.readFileSync(process.argv[1],'utf8');
const i=src.indexOf('var translations = ');let j=i+'var translations = '.length,d=0,k=j,q=null;
for(;k<src.length;k++){const c=src[k];if(q){if(c==='\\'){k++;continue;}if(c===q)q=null;continue;}
if(c==="'"||c==='"'||c==='`'){q=c;continue;}if(c==='/'&&src[k+1]==='/'){k=src.indexOf('\n',k);continue;}
if(c==='/'&&src[k+1]==='*'){k=src.indexOf('*/',k)+1;continue;}if(c==='{')d++;else if(c==='}'){d--;if(d===0)break;}}
process.stdout.write(JSON.stringify(vm.runInNewContext('('+src.slice(j,k+1)+')').en));
"""
    out = subprocess.run(['node', '-e', js, os.path.join(ROOT, 'i18n.js')], capture_output=True, text=True, check=True)
    en = json.loads(out.stdout)
    extra = json.load(open(os.path.join(LANGDIR, 'en.json'), encoding='utf-8'))
    extra.pop('_comment', None)
    en.update(extra)
    return en


def load_dicts():
    d = {'en': load_en()}
    for l in LANGS[1:]:
        x = json.load(open(os.path.join(LANGDIR, l + '.json'), encoding='utf-8'))
        x.pop('_comment', None)
        d[l] = x
    return d


# ───────────────────────── sélecteur de langue ─────────────────────────

def flag_svg(lang):
    """Petit drapeau SVG (20 × 14) devant le nom de la langue, décoratif (aria-hidden)."""
    return ('<svg class="lang-flag" width="20" height="14" viewBox="0 0 20 14" aria-hidden="true" focusable="false">%s</svg>'
            % FLAGS[lang])


def lang_menu_html(lang, links, label):
    """links : {langue: adresse}. Drapeau SVG + texte (drapeaux ajoutés le 03/11/2026, demande de Raphaël)."""
    items = []
    for l in ALL:
        href = links[l]
        cur = ' aria-current="page"' if l == lang else ''
        rtl = ' dir="rtl"' if l == 'he' else ''
        items.append('<a href="%s" hreflang="%s" lang="%s"%s%s>%s<span>%s</span></a>' % (href, l, l, rtl, cur, flag_svg(l), NAMES[l]))
    return ('<!-- lang-menu --><details class="lang-menu"><summary aria-label="%s : %s">%s<span>%s</span></summary>'
            '<div class="lang-menu-list">%s</div></details>%s<!-- /lang-menu -->'
            % (label, NAMES[lang], flag_svg(lang), lang.upper(), ''.join(items), LANG_MENU_JS))


def menu_links(group, current_path):
    """Adresses du sélecteur : la même page dans chaque langue, sinon l'accueil de la langue."""
    links = {}
    for l in ALL:
        p = page_path(group, l) if group else None
        if not p:
            p = current_path if (l == 'fr' and not group) else page_path('index', l)
        # blog/index.html a pour adresse '/blog/' : on cherche aussi sans la barre finale
        paire = PAIRES_EN.get(current_path) or PAIRES_EN.get(current_path.rstrip('/'))
        if l == 'en' and not group and paire:
            p = paire
        links[l] = p
    return links


def nav_href(item, lang):
    """Adresse d'un lien du menu dans une langue (le blog n'existe qu'en français et en anglais)."""
    return {'families': page_path('familles', lang), 'school': page_path('ecole', lang),
            'pricing': page_path('tarifs', lang), 'blog': '/en/blog/' if lang == 'en' else '/blog/',
            'about': page_path('about', lang)}[item]


def nav_current(url_path):
    """Lien du menu à mettre en surbrillance pour une adresse (None pour l'accueil et les autres pages)."""
    p = re.sub(r'^/(?:%s)(?=/|$)' % '|'.join(LANGS), '', url_path).rstrip('/')
    p = re.sub(r'\.html$', '', p)
    if p == '/blog' or p.startswith('/blog/'):
        return 'blog'
    return {'/familles': 'families', '/ecole': 'school', '/tarifs': 'pricing', '/about': 'about'}.get(p)


def navbar_html(lang, texts, url_path, menu, signup_href=SIGNUP_URL, i18n=False, indent='    '):
    """Barre de navigation complète (<nav class="navbar">) : la même partout, seul le texte change de langue.
    i18n=True : garde les attributs data-i18n (pages sources, traduites ensuite par build_page)."""
    cur = nav_current(url_path)
    att = (lambda k: ' data-i18n="%s"' % k) if i18n else (lambda k: '')
    i1, i2, i3 = indent, indent + '  ', indent + '    '
    lines = ['<nav class="navbar">',
             i2 + '<a href="%s" class="navbar-brand">' % page_path('index', lang),
             i3 + '<img src="/icons/icon-nav.png" alt="Galac6" width="132" height="132">',
             i3 + '<span>Galac6</span>',
             i2 + '</a>',
             i2 + '<button class="navbar-hamburger" aria-label="Menu" onclick="this.classList.toggle(\'open\');this.nextElementSibling.classList.toggle(\'open\')">',
             i3 + '<span></span><span></span><span></span>',
             i2 + '</button>',
             i2 + '<div class="navbar-links">']
    for item in NAV_ITEMS:
        key = 'nav.' + item
        extra = ' class="active" aria-current="page"' if item == cur else ''
        if item == 'blog' and lang not in ('fr', 'en'):
            extra += ' hreflang="fr"'
        lines.append(i3 + '<a href="%s"%s%s>%s</a>' % (nav_href(item, lang), extra, att(key), texts[key]))
    lines.append(i3 + menu)
    lines.append(i3 + '<a href="%s" style="%s"%s>%s</a>' % (signup_href, SIGNUP_STYLE, att('nav.signup'), texts['nav.signup']))
    lines.append(i2 + '</div>')
    lines.append(i1 + '</nav>')
    return '\n'.join(lines)


def apply_navbar(s, lang, texts, url_path, i18n=False):
    """Remplace la barre <nav class="navbar"> d'une page par la barre commune (sélecteur de langue conservé)."""
    m = re.search(r'<nav class="navbar">.*?</nav>', s, re.S)
    if not m:
        return s
    old = m.group(0)
    menu = re.search(r'<!-- lang-menu -->.*?<!-- /lang-menu -->', old, re.S)
    if not menu:
        return s
    # Lien d'inscription : on garde l'adresse de la page si elle porte un suivi (utm), sinon l'adresse commune
    sign = re.search(r'<a href="(https://galac6web\.netlify\.app/[^"]*)"', old)
    signup = sign.group(1).replace('&amp;', '&').replace('&', '&amp;') if sign else SIGNUP_URL
    line_start = s.rfind('\n', 0, m.start()) + 1
    indent = re.match(r'[ \t]*', s[line_start:m.start()]).group(0)
    return s[:m.start()] + navbar_html(lang, texts, url_path, menu.group(0), signup, i18n, indent) + s[m.end():]


def hreflang_html(group):
    lines = ['  <!-- hreflang (généré par scripts/build-langs.py) -->']
    for l in group_langs(group):
        lines.append('  <link rel="alternate" hreflang="%s" href="%s%s">' % (l, SITE, page_path(group, l)))
    xdef = page_path(group, 'fr') or page_path(group, 'en')
    lines.append('  <link rel="alternate" hreflang="x-default" href="%s%s">' % (SITE, xdef))
    lines.append('  <!-- /hreflang -->')
    return '\n'.join(lines)


# ───────────────────── données structurées (JSON-LD) ─────────────────────

def faq_items(soup):
    """Questions et réponses visibles d'une page (FAQ « .faq-item » ou « .faq details »)."""
    def hidden(el):
        return el.find_parent(class_='en-only') is not None or 'en-only' in (el.get('class') or [])
    out = []
    for item in soup.select('.faq-item'):
        q = item.select_one('.faq-question span') or item.select_one('.faq-question')
        a = item.select_one('.faq-answer-inner') or item.select_one('.faq-answer')
        if q and a and not hidden(item):
            out.append((q, a))
    for item in soup.select('.faq details'):
        q, a = item.find('summary'), item.select_one('.ans')
        if q and a and not hidden(item):
            out.append((q, a))
    return [{'@type': 'Question', 'name': norm(q.get_text()),
             'acceptedAnswer': {'@type': 'Answer', 'text': norm(EMOJI.sub('', a.get_text()))}} for q, a in out]


def organization_ld(lang):
    return {'@type': 'Organization', '@id': SITE + '/#organization', 'name': 'Galac6', 'url': SITE + '/',
            'logo': SITE + '/icons/logo.png', 'slogan': SLOGAN,
            'description': ORG_DESC.get(lang, ORG_DESC['en']), 'email': 'hello@galac6.io',
            # Fiche d'identité (02/11/2026) : société, fondateur et comptes officiels, à garder sur tous les accueils
            'legalName': 'RHK CONSEIL',
            'address': {'@type': 'PostalAddress', 'streetAddress': '19 rue de Croulebarbe', 'postalCode': '75013',
                        'addressLocality': 'Paris', 'addressCountry': 'FR'},
            'founder': {'@id': PERSON_ID},
            'sameAs': ['https://www.linkedin.com/company/galac6', 'https://www.facebook.com/profile.php?id=61586374984363'],
            'contactPoint': {'@type': 'ContactPoint', 'contactType': 'customer support', 'email': 'hello@galac6.io'},
            'areaServed': AREA_SERVED, 'knowsLanguage': ALL}


def person_ld(lang):
    """Fondateur (seul fondateur) : même fiche sur la page À propos et comme auteur des articles du blog."""
    return {'@type': 'Person', '@id': PERSON_ID, 'name': 'Raphaël Haïk', 'url': SITE + '/about',
            'jobTitle': JOB_TITLE.get(lang, JOB_TITLE['en']), 'worksFor': {'@id': SITE + '/#organization'},
            'sameAs': ['https://www.linkedin.com/in/raphaelhaik']}


def page_ld(soup, group, lang, url, home_name, crumb_name):
    """Page (WebPage, ou FAQPage si la page a une FAQ visible), fil d'Ariane, et pour l'accueil l'organisation et le site."""
    title = norm(soup.title.get_text()) if soup.title else 'Galac6'
    desc_tag = soup.find('meta', attrs={'name': 'description'})
    faq = faq_items(soup)
    website_id = SITE + page_path('index', lang) + '#website'
    kind = 'AboutPage' if group == 'about' else ('FAQPage' if faq else 'WebPage')
    page = {'@type': kind, '@id': url + '#webpage', 'url': url, 'name': title,
            'inLanguage': lang, 'isPartOf': {'@id': website_id}, 'publisher': {'@id': SITE + '/#organization'}}
    if desc_tag is not None:
        page['description'] = desc_tag.get('content', '')
    # Date « Mis à jour le … » affichée sur la page (<p class="updated"><time datetime="…">) → dateModified
    updated = soup.select_one('.updated time[datetime]')
    if updated is not None:
        page['dateModified'] = updated['datetime']
    if faq and kind == 'FAQPage':
        page['mainEntity'] = faq
    graph = []
    if group == 'about':
        page['about'] = {'@id': SITE + '/#organization'}
        page['mainEntity'] = {'@id': SITE + '/#organization'}
        graph += [organization_ld(lang), person_ld(lang)]
        if faq:
            graph.append({'@type': 'FAQPage', '@id': url + '#faq', 'mainEntity': faq})
    if group == 'index':
        graph += [organization_ld(lang),
                  {'@type': 'WebSite', '@id': website_id, 'url': url, 'name': 'Galac6', 'inLanguage': lang,
                   'publisher': {'@id': SITE + '/#organization'}}]
    else:
        graph.insert(0, {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': home_name, 'item': SITE + page_path('index', lang)},
            {'@type': 'ListItem', 'position': 2, 'name': crumb_name, 'item': url}]})
    graph.insert(0 if group != 'index' else len(graph), page)  # page en tête (accueil : après l'organisation et le site)
    return {'@context': 'https://schema.org', '@graph': graph}


def ld_script(ld):
    return ('<script type="application/ld+json" id="g6-ld">\n%s\n  </script>'
            % json.dumps(ld, ensure_ascii=False, indent=2))


# ─────────────────── 1. mise à jour des pages sources ───────────────────

def source_pages():
    files = []
    for name in sorted(os.listdir(ROOT)):
        if name.endswith('.html') and name != '404.html':  # page d'erreur : hors traductions, sitemap et redirections
            files.append(name)
    blog = os.path.join(ROOT, 'blog')
    for name in sorted(os.listdir(blog)):
        if name.endswith('.html'):
            files.append('blog/' + name)
    return files


def update_banner(s):
    """Retire l'ancien bandeau anglais caché (en-banner) et place le HTML du bandeau anglais juste au-dessus du pied de page (affiché en haut par CSS)."""
    # Pages marquées « no-intl-banner » (article PISA) : pas de bandeau « France only »
    if '<!-- no-intl-banner -->' in s:
        return re.sub(r'\n?[ \t]*<!-- intl-banner -->.*?<!-- /intl-banner -->', '', s, flags=re.S)
    s = re.sub(r'\n[ \t]*<!-- ═══ EN BANNER[^>]*-->[ \t]*', '', s)
    s = re.sub(r'\n[ \t]*<div [^>]*id="en-banner"[^>]*>.*?</div>[ \t]*(?=\n)', '', s, flags=re.S)
    # Ancien emplacement (en haut, dans le menu collant) ou emplacement actuel : on retire, puis on replace avant le pied de page
    s = re.sub(r'\n?[ \t]*<!-- intl-banner -->.*?<!-- /intl-banner -->', '', s, flags=re.S)
    pos = s.rfind('<div class="footer-wrapper">')
    if pos < 0:
        pos = s.rfind('<footer')
    if pos < 0:
        pos = s.rfind('</body>')
    line_start = s.rfind('\n', 0, pos) + 1
    if not s[line_start:pos].strip():  # la balise est seule sur sa ligne : bandeau sur la ligne au-dessus
        indent = s[line_start:pos]
        s = s[:line_start] + indent + INTL_BANNER + '\n' + s[line_start:]
    else:
        s = s[:pos] + INTL_BANNER + '\n' + s[pos:]
    css = '<style id="g6-banner-css">%s  </style>' % BANNER_CSS
    if '<style id="g6-banner-css">' in s:
        s = re.sub(r'<style id="g6-banner-css">.*?</style>', lambda m: css, s, flags=re.S)
    else:
        s = s.replace('</head>', '  ' + css + '\n</head>', 1)
    return s


def set_nav_css(s):
    css = '<style id="g6-nav-css">%s  </style>' % NAV_CSS
    if '<style id="g6-nav-css">' in s:
        return re.sub(r'<style id="g6-nav-css">.*?</style>', lambda m: css, s, flags=re.S)
    return s.replace('</head>', '  ' + css + '\n</head>', 1)


def refresh_lang_menu(s, lang, label):
    """Page faite à la main : redessine le sélecteur (drapeaux compris) en gardant ses propres adresses."""
    m = re.search(r'<!-- lang-menu -->.*?<!-- /lang-menu -->', s, re.S)
    if not m:
        return s
    links = {l: h for h, l in re.findall(r'<a [^>]*?href="([^"]*)"[^>]*?hreflang="([a-z]+)"', m.group(0))}
    if any(l not in links for l in ALL):
        return s
    return s[:m.start()] + lang_menu_html(lang, links, label) + s[m.end():]


def update_handmade_en(generated):
    """Pages anglaises faites à la main (blog anglais, écoles du Royaume-Uni…) : même barre de navigation."""
    done = {rel for _, _, rel in generated}
    en = load_en()
    texts = {k: v for k, v in en.items() if k.startswith('nav.')}
    changed = []
    for dirpath, _, names in os.walk(os.path.join(ROOT, 'en')):
        for name in sorted(names):
            rel = os.path.relpath(os.path.join(dirpath, name), ROOT)
            if not name.endswith('.html') or rel in done:
                continue
            s = read(rel)
            if 'class="navbar-links"' not in s:
                continue
            url_path = '/' + re.sub(r'(index)?\.html$', '', rel)
            new = set_nav_css(apply_navbar(refresh_lang_menu(update_banner(s), 'en', 'Language'), 'en', texts, url_path))
            if new != s:
                write(rel, new)
                changed.append(rel)
    return changed


def update_sources():
    changed = []
    for rel in source_pages() + ['teaser/index.html']:
        s = read(rel)
        orig = s
        s = update_banner(s)
        if 'class="navbar-links"' not in s:
            if s != orig:
                write(rel, s)
                changed.append(rel)
            continue
        is_vote = rel == 'international.html'
        lang = 'en' if is_vote else 'fr'
        url_path = '/' + re.sub(r'(index)?\.html$', '', rel)
        group = PATH_TO_GROUP.get(url_path) or PATH_TO_GROUP.get('/' + rel)

        # Plus de bouton « Galac6 in your country » dans le menu (décision du 31/10/2026) :
        # le bandeau anglais du haut suffit. On retire l'ancien lien, quelle que soit sa forme.
        s = re.sub(r'\n[ \t]*<a href="/international"[^>]*>(?:Galac6 dans votre pays|Galac6 in your country|<svg[^>]*>.*?</svg><span>Galac6 in your country</span>)</a>',
                   '', s, flags=re.S)

        # Sélecteur de langue (remplace le bouton drapeau FR/EN)
        menu = lang_menu_html(lang, menu_links(group, url_path), 'Language' if lang == 'en' else LANG_LABEL_FR)
        if '<!-- lang-menu -->' in s:
            s = re.sub(r'<!-- lang-menu -->.*?<!-- /lang-menu -->', lambda m: menu, s, flags=re.S)
        elif re.search(r'<button id="lang-toggle"[^>]*>[^<]*</button>', s):
            s = re.sub(r'<button id="lang-toggle"[^>]*>[^<]*</button>', lambda m: menu, s, count=1)
        else:
            block = re.search(r'<div class="navbar-links">.*?</div>', s, re.S)
            inner = block.group(0)
            pos = inner.find('<a href="https://galac6web.netlify.app/"')
            if pos < 0:
                pos = len(inner) - len('</div>')
            new = inner[:pos] + menu + '\n        ' + inner[pos:]
            s = s.replace(inner, new, 1)

        # Barre de navigation commune (liens, logo, bouton), avec les clés data-i18n pour les pages traduites
        texts = {k: v for k, v in load_en().items() if k.startswith('nav.')} if lang == 'en' else NAV_FR
        s = apply_navbar(s, lang, texts, url_path, i18n=True)

        # Styles du menu
        s = set_nav_css(s)

        # Langue fixe : i18n.js ne traduit plus sur place (le choix se fait par adresse)
        if lang == 'fr' and 'data-static-lang' not in s:
            s = s.replace('<html lang="fr">', '<html lang="fr" data-static-lang>', 1)

        # Page de vote anglaise : bandeau cookies en anglais (mêmes textes que /en/)
        if is_vote:
            en = load_en()
            txt = {k: en['gen.cookie.' + k] for k in COOKIE_KEYS}
            txt['lien'] = '/mentions-legales#cookies-en'
            block = '<script id="g6-cookie-txt">window.G6_COOKIE_TXT = %s;</script>' % json.dumps(txt, ensure_ascii=False)
            if '<script id="g6-cookie-txt">' in s:
                s = re.sub(r'<script id="g6-cookie-txt">.*?</script>', lambda m: block, s, flags=re.S)
            else:
                s = s.replace('</head>', '  ' + block + '\n</head>', 1)

        # Données structurées des pages françaises écrites par le script (fil d'Ariane, FAQ, langue)
        if group in AUTO_LD_FR:
            soup = BeautifulSoup(s, 'html.parser')
            block = ld_script(page_ld(soup, group, 'fr', SITE + page_path(group, 'fr'), 'Accueil', CRUMB_FR[group]))
            s = re.sub(r'[ \t]*<script type="application/ld\+json"[^>]*>.*?</script>\n?', '', s, flags=re.S)
            s = re.sub(r'(<link rel="canonical"[^>]*>\n)', lambda m: m.group(1) + '  ' + block + '\n', s, count=1)

        # hreflang des pages traduites
        if group:
            block = hreflang_html(group)
            if '<!-- hreflang' in s:
                s = re.sub(r'  <!-- hreflang.*?<!-- /hreflang -->', lambda m: block, s, flags=re.S)
            else:
                s = re.sub(r'(<link rel="canonical"[^>]*>\n)', lambda m: m.group(1) + block + '\n', s, count=1)

        if s != orig:
            write(rel, s)
            changed.append(rel)
    return changed


# ─────────────────────── 2. pages traduites ───────────────────────

def map_href(href, lang):
    """Réécrit un lien interne vers la page de la langue cible. Retourne (lien, traduit?)."""
    if not href.startswith('/') or href.startswith('//'):
        return href, None
    m = re.match(r'([^?#]*)(.*)', href)
    path, rest = m.group(1), m.group(2)
    if path == '/en' or path.startswith('/en/'):
        path = path[3:] or '/'
    if lang == 'en' and path in PAIRES_EN:
        return PAIRES_EN[path] + rest, True
    g = PATH_TO_GROUP.get(path)
    if g and page_path(g, lang):
        return page_path(g, lang) + rest, True
    if g in SLUGS:  # page absente dans cette langue : version française
        return page_path(g, 'fr') + rest, False
    return path + rest, False


def absolutize(v):
    if not v or re.match(r'^(/|#|\?|[a-z][a-z0-9+.-]*:)', v, re.I):
        return v
    return '/' + v


def css_abs(text):
    return re.sub(r'url\((["\']?)(?![/"\']|https?:|data:|#)', r'url(\1/', text)


def css_logical(text):
    """Hébreu : marges, bordures et alignements « gauche/droite » deviennent « début/fin » de ligne."""
    for phys, log in (('border-left', 'border-inline-start'), ('border-right', 'border-inline-end'),
                      ('padding-left', 'padding-inline-start'), ('padding-right', 'padding-inline-end'),
                      ('margin-left', 'margin-inline-start'), ('margin-right', 'margin-inline-end')):
        text = re.sub(r'(?<![\w-])' + phys + r'(?=\s*:)', log, text)
    text = re.sub(r'text-align\s*:\s*left', 'text-align: start', text)
    text = re.sub(r'text-align\s*:\s*right', 'text-align: end', text)
    return text


def set_html(el, html):
    el.clear()
    frag = BeautifulSoup(html, 'html.parser')
    for node in list(frag.contents):
        el.append(node)


# Textes français écrits en dur dans les pages sources (sans data-i18n) → clé du dictionnaire de chaque langue
RAW_FR = {'Réviser le Bac de maths': 'raw.revise.bacmaths', 'Réviser les maths': 'raw.revise.maths',
          'Fiches de révision par IA': 'fam.links.sheets', 'Cours particulier en ligne': 'raw.revise.private',
          'Calcul mental en ligne': 'fam.links.mental', 'sem. 1': 'raw.week1', 'sem. 6': 'raw.week6',
          'Exemple de carte de maîtrise, données fictives': 'raw.aria.mastery',
          'Exemple de courbe de progression sur six semaines, données fictives': 'raw.aria.spark',
          'Niveau scolaire': 'raw.aria.level', 'Élèves testeurs': 'raw.aria.testers'}


# Textes du bandeau cookies (mêmes clés que l'objet T de cookie-consent.js)
COOKIE_KEYS = ('texte', 'plus', 'refuser', 'perso', 'accepter', 'titrePerso', 'audienceTitre',
               'audienceTexte', 'pubTitre', 'pubTexte', 'enregistrer', 'necessaires')


def dyn_object(group, D):
    pre = 'dyn.%s.' % group
    keys = {k[len(pre):]: v for k, v in D.items() if k.startswith(pre)}
    if not keys:
        return None
    if 'title' in keys and ('meta.%s.title' % group) in D:
        keys['title'] = D['meta.%s.title' % group]  # même titre d'onglet que la balise <title>
    if group != 'tarifs':
        return keys
    p = {}
    for mode in ('year', 'month'):
        p[mode] = {}
        for who in ('eleve', 'fam'):
            p[mode][who] = [keys['%s.%s.price' % (mode, who)], keys['%s.%s.alt' % (mode, who)],
                            keys.get('%s.%s.save' % (mode, who), ''), keys['%s.note' % mode]]
    return {'title': keys['title'], 'plansLabel': keys['plansLabel'], 'prices': p}


def build_page(group, lang, D, countries, errors):
    src = GROUPS[group]['src']
    soup = BeautifulSoup(read(src), 'html.parser')
    path = page_path(group, lang)
    url = SITE + path
    meta = lambda k: D.get('meta.%s.%s' % (group, k))

    def need(key):
        if key not in D:
            errors.append('%s (%s) : clé manquante « %s »' % (path, lang, key))
            return ''
        return D[key]

    html = soup.html
    html['lang'] = lang
    if lang == 'he':
        html['dir'] = 'rtl'
    elif 'dir' in html.attrs:
        del html['dir']
    if 'data-static-lang' in html.attrs:
        del html['data-static-lang']

    # ── <head> ──
    head = soup.head
    head.title.string = need('meta.%s.title' % group)
    for sel, key in (({'name': 'description'}, 'description'), ({'property': 'og:title'}, 'og_title'),
                     ({'property': 'og:description'}, 'og_description'), ({'name': 'twitter:title'}, 'og_title'),
                     ({'name': 'twitter:description'}, 'og_description')):
        tag = head.find('meta', attrs=sel)
        if tag is not None:
            tag['content'] = need('meta.%s.%s' % (group, key))
    for sel, val in (({'property': 'og:url'}, url), ({'property': 'og:locale'}, OG_LOCALE[lang]),
                     ({'property': 'og:image:alt'}, OG_ALT[lang]), ({'name': 'twitter:image:alt'}, OG_ALT[lang])):
        tag = head.find('meta', attrs=sel)
        if tag is not None:
            tag['content'] = val
    for tag in head.find_all('meta', attrs={'property': 'og:locale:alternate'}):
        tag.decompose()
    head.find('link', rel='canonical')['href'] = url
    for c in head.find_all(string=lambda t: isinstance(t, Comment) and 'hreflang' in t):
        c.extract()
    for tag in head.find_all('link', attrs={'rel': 'alternate', 'hreflang': True}):
        tag.decompose()
    canon = head.find('link', rel='canonical')
    frag = BeautifulSoup('\n' + hreflang_html(group) + '\n', 'html.parser')
    for node in reversed(list(frag.contents)):
        canon.insert_after(node)
    for tag in soup.find_all('script', attrs={'type': 'application/ld+json'}):
        tag.decompose()
    for tag in soup.find_all('script', src=re.compile(r'(^|/)i18n\.js$')):
        tag.decompose()

    # ── bandeau d'information traduit, sous le menu (es, it, de, pt, nl ; l'anglais a déjà le bandeau du haut) ──
    if lang != 'en':
        # Un seul bandeau par page (02/11/2026) : le bandeau traduit remplace le bandeau anglais du haut
        for tag in soup.find_all('div', id='g6-intl-banner'):
            tag.decompose()
        for tag in soup.find_all('script', id='g6-banner-js'):  # son script de mesure ne sert plus
            tag.decompose()
        notice = BeautifulSoup('<div class="lang-notice" role="note">%s</div>' % need('gen.notice'), 'html.parser').div
        anchor = soup.find('div', class_='navbar-wrapper')
        if anchor is not None:
            anchor.insert_after(notice)
        else:
            soup.body.insert(0, notice)

    # ── textes ──
    for el in soup.select('[data-i18n]'):
        el.string = need(el['data-i18n'])
    for el in soup.select('[data-i18n-html]'):
        set_html(el, need(el['data-i18n-html']))
    for attr, name in (('data-i18n-ph', 'placeholder'), ('data-i18n-aria', 'aria-label'), ('data-i18n-alt', 'alt')):
        for el in soup.select('[%s]' % attr):
            el[name] = need(el[attr])
    for el in soup.select('.navbar-hamburger'):
        el['aria-label'] = need('gen.menu')
    # Textes français sans attribut data-i18n dans les pages sources (liens du pied de page, légendes de graphiques) :
    # traduits ici par leur texte exact, sans toucher aux pages françaises (02/11/2026)
    for t in soup.find_all(string=True):
        if not isinstance(t, Comment) and t.parent.name not in ('script', 'style') and norm(t) in RAW_FR:
            t.replace_with(NavigableString(t.replace(norm(t), need(RAW_FR[norm(t)]))))
    for el in soup.find_all(attrs={'aria-label': True}):
        if norm(el['aria-label']) in RAW_FR:
            el['aria-label'] = need(RAW_FR[norm(el['aria-label'])])
    for el in soup.select('.en-only'):
        el['class'] = [c for c in el['class'] if c != 'en-only']
        if el.get('style', '').replace(' ', '').startswith('display:none'):
            del el['style']
    for el in soup.select('.fr-only'):
        el.decompose()
    for el in soup.select('[data-only]'):
        if el['data-only'] != lang:
            el.decompose()
        else:
            del el['data-only']

    # ── textes dynamiques (scripts de la page) ──
    dyn = dyn_object(group, D)
    if group == 'ecole' and soup.find(id='devis-title') is not None:
        soup.find(id='devis-title').string = need('dyn.ecole.devis')
    if group == 'tarifs' and dyn:
        for who in ('eleve', 'fam'):
            vals = dyn['prices']['year'][who]
            set_html(soup.find(id='p-' + who), vals[0])
            soup.find(id='a-' + who).string = vals[1]
            soup.find(id='s-' + who).string = vals[2]
            soup.find(id='n-' + who).string = vals[3]
    if dyn:
        tag = soup.new_tag('script')
        tag.string = 'window.G6_DYN = %s;' % json.dumps(dyn, ensure_ascii=False)
        head.append(tag)
        head.append('\n')

    # ── bandeau cookies (cookie-consent.js) dans la langue de la page ──
    for old_tag in soup.select('script#g6-cookie-txt'):
        old_tag.decompose()
    cookie_txt = {k: need('gen.cookie.' + k) for k in COOKIE_KEYS}
    cookie_txt['lien'] = '/mentions-legales#cookies-en'
    tag = soup.new_tag('script')
    tag.string = 'window.G6_COOKIE_TXT = %s;' % json.dumps(cookie_txt, ensure_ascii=False)
    head.append(tag)
    head.append('\n')

    # ── liste des pays (page de vote) ──
    if group == 'vote' and lang in countries:
        sel = soup.find('select', id='v-pays')
        opts = sel.find_all('option')
        first, other = opts[0], [o for o in opts if o.get('value') == 'Other'][0]
        for o in opts:
            o.extract()
        sel.append(first)
        for c in countries[lang]:
            o = soup.new_tag('option', value=c['value'])
            o.string = c['label']
            sel.append(o)
        sel.append(other)

    # ── sélecteur de langue ──
    menu = soup.find('details', class_='lang-menu')
    if menu is not None:
        for c in menu.parent.find_all(string=lambda t: isinstance(t, Comment) and 'lang-menu' in t):
            c.extract()
        nxt = menu.find_next_sibling('script')
        if nxt is not None and 'lang-menu' in (nxt.string or ''):
            nxt.decompose()
        new = BeautifulSoup(lang_menu_html(lang, menu_links(group, path), need('gen.lang_label')), 'html.parser')
        menu.replace_with(new)

    # ── données structurées traduites ──
    crumb = need(CRUMB_KEY[group]) if group in CRUMB_KEY else None
    if group == 'vote':  # page de vote : fil d'Ariane au nom du titre principal (audit SEO du 03/11/2026)
        crumb = norm(soup.h1.get_text()) if soup.h1 else 'Galac6'
    ld = page_ld(soup, group, lang, url, need('gen.home'), crumb)
    if ld:
        tag = BeautifulSoup(ld_script(ld), 'html.parser').script
        canon_last = head.find_all('link', attrs={'rel': 'alternate'})
        (canon_last[-1] if canon_last else canon).insert_after(tag)

    # ── nettoyage du texte : emojis, flèches en hébreu ──
    for t in soup.find_all(string=True):
        if isinstance(t, Comment) or t.parent.name in ('script', 'style'):
            continue
        new = EMOJI.sub('', t)
        if lang == 'he' and t.find_parent(id='g6-intl-banner') is None:  # le bandeau anglais garde sa flèche →
            new = new.replace('→', '←')
        if new != t:
            t.replace_with(NavigableString(new))
    for el in soup.find_all(class_=re.compile('icon')):
        if not el.find(True) and not norm(el.get_text()):
            el.decompose()

    # ── liens et chemins ──
    for el in soup.find_all(href=True):
        if el.find_parent('details', class_='lang-menu') is not None:
            continue  # le sélecteur de langue pointe déjà vers les bonnes adresses
        if el.name == 'a':
            new, translated = map_href(el['href'], lang)
            if translated is None:
                el['href'] = absolutize(el['href'])
            else:
                el['href'] = new
                if translated is False and 'hreflang' not in el.attrs and re.match(r'^/[^.]*(\.html)?([?#].*)?$', new) and new != '/':
                    el['hreflang'] = 'fr'
        else:
            el['href'] = absolutize(el['href'])
    for el in soup.find_all(src=True):
        el['src'] = absolutize(el['src'])
    for el in soup.find_all(style=True):
        el['style'] = css_abs(el['style'])
    for st in soup.find_all('style'):
        if st.string:
            st.string = css_abs(st.string)
            if lang == 'he':
                st.string = css_logical(st.string)
    if lang == 'he':
        for el in soup.find_all(style=True):
            el['style'] = css_logical(el['style'])

    # ── styles propres aux pages traduites ──
    extra = NOTICE_CSS + (RTL_CSS if lang == 'he' else '')
    tag = soup.new_tag('style', id='g6-lang-css')
    tag.string = extra + '  '
    head.append(tag)
    head.append('\n')

    # ── attributs de traduction retirés (inutiles sans i18n.js) ──
    for attr in ('data-i18n', 'data-i18n-html', 'data-i18n-ph', 'data-i18n-aria', 'data-i18n-alt', 'data-ph-fr'):
        for el in soup.find_all(attrs={attr: True}):
            del el[attr]

    # Clés manquantes : la page existante est gardée telle quelle (pas de page à moitié vide en ligne)
    if any(e.startswith('%s (%s) : clé manquante' % (path, lang)) for e in errors):
        return None
    out = soup.decode(formatter='minimal')
    if not out.lstrip().lower().startswith('<!doctype'):
        out = '<!DOCTYPE html>\n' + out
    write(out_file(path), out)
    return out_file(path)


# ─────────────── 3. _redirects et sitemap.xml ───────────────

def clean_path(rel):
    """Adresse propre d'un fichier : index.html → /, blog/index.html → /blog/, en/index.html → /en/, about.html → /about."""
    if rel == 'index.html':
        return '/'
    if rel.endswith('/index.html'):
        d = rel[:-len('index.html')]
        # Barre finale gardée (/blog/, /en/blog/) : adresse de référence du blog (audit SEO du 03/11/2026)
        return '/' + d
    return '/' + rel[:-len('.html')]


def all_html_pages():
    files = source_pages() + ['teaser/index.html']
    for l in LANGS:
        d = os.path.join(ROOT, l)
        if os.path.isdir(d):
            files += ['%s/%s' % (l, n) for n in sorted(os.listdir(d)) if n.endswith('.html')]
    return files


def update_redirects():
    lines = ['# Pages traduites (généré par scripts/build-langs.py) : adresses sans .html']
    for l in LANGS:
        for g in GROUPS:
            p = page_path(g, l)
            if g != 'index' and p and p != '/international':
                lines.append('%-24s %-28s 200' % (p, '/' + out_file(p)))
    for g in GROUPS:  # pages françaises ajoutées par groupe (adresse sans .html)
        p = page_path(g, 'fr')
        if g not in ('index', 'familles', 'ecole', 'about', 'tarifs', 'etranger') and p:
            lines.append('%-24s %-28s 200' % (p, '/' + out_file(p)))
    lines.append('# /pages traduites')
    # Redirections 301 des adresses en .html vers les adresses propres (un seul exemplaire de chaque page pour Google).
    # « 301! » : obligatoire, le fichier .html existant aurait sinon priorité sur la règle.
    # Pas de règle avec barre finale (Netlify confond /blog et /blog/ : la règle bouclerait).
    lines.append('# Adresses en .html → adresses propres (301, généré par scripts/build-langs.py)')
    for rel in all_html_pages():
        if rel == 'teaser/index.html':  # images en chemins relatifs : la page doit rester servie sous /teaser/
            continue
        lines.append('%-40s %-34s 301!' % ('/' + rel, clean_path(rel)))
    lines.append('# /adresses en .html')
    block = '\n'.join(lines)
    s = read('_redirects')
    s = re.sub(r'\n?# Adresses en \.html.*?# /adresses en \.html\n?', '\n', s, flags=re.S)
    if '# Pages traduites' in s:
        s = re.sub(r'# Pages traduites.*?# /pages traduites', lambda m: block, s, flags=re.S)
    else:
        s = s.rstrip('\n') + '\n' + block + '\n'
    write('_redirects', s.rstrip('\n') + '\n')


def file_date(rel):
    """Date réelle de dernière modification d'un fichier : aujourd'hui s'il a changé depuis le dernier commit,
    sinon la date de son dernier commit (git)."""
    try:
        dirty = subprocess.run(['git', '-C', ROOT, 'status', '--porcelain', '--', rel],
                               capture_output=True, text=True).stdout.strip()
        if dirty:
            return TODAY
        d = subprocess.run(['git', '-C', ROOT, 'log', '-1', '--format=%cs', '--', rel],
                           capture_output=True, text=True).stdout.strip()
        return d or TODAY
    except Exception:
        return TODAY


def update_sitemap():
    s = read('sitemap.xml')
    urls = re.findall(r'  <url>.*?</url>\n', s, re.S)
    group_paths = set()
    for g in GROUPS:
        for l in group_langs(g):
            group_paths.add(SITE + page_path(g, l))
    redirects = redirect_map()
    kept = []
    for u in urls:  # pages hors groupes (gardées telles quelles, date réelle recalculée)
        loc = re.search(r'<loc>([^<]*)</loc>', u).group(1)
        if loc in group_paths:
            continue
        rel = resolve(loc[len(SITE):] or '/', redirects)
        if rel:
            u = re.sub(r'<lastmod>[^<]*</lastmod>', '<lastmod>%s</lastmod>' % file_date(rel), u)
        u = re.sub(r'[ \t]*<(changefreq|priority)>[^<]*</\1>\n', '', u)  # ignorés par Google (audit du 03/11/2026)
        kept.append(u)
    new = []
    for g in ('index', 'familles', 'tarifs', 'ecole', 'etranger', 'expat', 'dictee', 'annales', 'about', 'vote'):
        alts = ''.join('    <xhtml:link rel="alternate" hreflang="%s" href="%s%s"/>\n' % (l, SITE, page_path(g, l))
                       for l in group_langs(g))
        alts += '    <xhtml:link rel="alternate" hreflang="x-default" href="%s%s"/>\n' % (
            SITE, page_path(g, 'fr') or page_path(g, 'en'))
        for l in group_langs(g):
            new.append('  <url>\n    <loc>%s%s</loc>\n%s    <lastmod>%s</lastmod>\n  </url>\n' % (
                SITE, page_path(g, l), alts, file_date(out_file(page_path(g, l)) if page_path(g, l) != '/' else 'index.html')))
    out = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
           + ''.join(new) + ''.join(kept) + '</urlset>\n')
    write('sitemap.xml', out)


# ─────────────────────────── 4. contrôles ───────────────────────────

def visible_texts(soup):
    res = []
    for t in soup.find_all(string=True):
        if isinstance(t, Comment) or t.parent.name in ('script', 'style', 'title', '[document]'):
            continue
        if t.find_parent(attrs={'lang': True}) is not None and t.find_parent(attrs={'lang': True}) is not soup.html:
            continue
        n = norm(t)
        if len(n) >= 4 and re.search(r'[A-Za-zÀ-ÿ]{3}', n):
            res.append(n)
    for el in soup.find_all(True):
        for a in ('placeholder', 'aria-label', 'alt', 'title'):
            if el.get(a) and el.name != 'meta':
                res.append(norm(el[a]))
    return res


COUNTRIES = json.load(open(os.path.join(LANGDIR, 'countries.json'), encoding='utf-8'))
ALLOW = {'Galac6', 'FAQ', 'Blog', 'Galac6 in your country', 'Menu', 'Contact', 'Email', 'Pack', 'Quiz', 'Galac6.',
         'hello@galac6.io', 'Éduscol', 'ChatGPT',
         'Hugo', 'Inès', 'Chloé', 'Nathan', 'Manon', 'Lucas'}  # prénoms du tableau d'exemple (page Professeurs et écoles)


def check_leftovers(generated, dicts):
    """Texte de la page source resté tel quel dans une page traduite (oubli de traduction)."""
    problems = []
    for g, l, rel in generated:
        src = BeautifulSoup(read(GROUPS[g]['src']), 'html.parser')
        src_texts = set(visible_texts(src))
        page = BeautifulSoup(read(rel), 'html.parser')
        dict_vals = set(norm(re.sub(r'<[^>]+>', ' ', v)) for v in dicts[l].values() if isinstance(v, str))
        for v in dicts[l].values():  # morceaux de texte des valeurs HTML (mots identiques voulus : « quiz », « brevet »…)
            if isinstance(v, str) and '<' in v:
                dict_vals |= set(norm(x) for x in BeautifulSoup(v, 'html.parser').find_all(string=True))
        dict_vals |= set(c['label'] for c in COUNTRIES.get(l, []))  # noms de pays identiques d'une langue à l'autre
        for t in visible_texts(page):
            if t in src_texts and t not in dict_vals and t not in ALLOW and t not in NAMES.values():
                problems.append('%s : texte non traduit « %s »' % (rel, t[:90]))
    return problems


def redirect_map():
    m = {}
    for line in read('_redirects').splitlines():
        parts = line.split()
        if len(parts) >= 3 and not line.startswith('#') and parts[2].startswith('200'):
            m[parts[0]] = parts[1]
    return m


def resolve(path, redirects):
    """Fichier servi pour une adresse (règles Netlify : fichier, .html, index.html, _redirects)."""
    p = redirects.get(path, path)
    cand = [p.lstrip('/')]
    if p.endswith('/'):
        cand = [p.lstrip('/') + 'index.html']
    else:
        cand += [p.lstrip('/') + '.html', p.lstrip('/') + '/index.html']
    for c in cand:
        f = os.path.join(ROOT, c)
        if c and os.path.isfile(f):
            return c
    if p == '/':
        return 'index.html'
    return None


def check_links():
    """Tous les href/src internes de toutes les pages du site (y compris les ancres #)."""
    redirects = redirect_map()
    problems = []
    files = all_html_pages()
    ids_cache = {}

    def ids(rel):
        if rel not in ids_cache:
            soup = BeautifulSoup(read(rel), 'html.parser')
            ids_cache[rel] = set(e['id'] for e in soup.find_all(id=True)) | set(e['name'] for e in soup.find_all('a', attrs={'name': True}))
        return ids_cache[rel]

    for rel in files:
        soup = BeautifulSoup(read(rel), 'html.parser')
        base = '/' + rel
        for el in soup.find_all(True):
            for a in ('href', 'src'):
                v = el.get(a)
                if not v or re.match(r'^([a-z][a-z0-9+.-]*:|//)', v, re.I):
                    continue
                if v == '#' :
                    continue
                m = re.match(r'([^?#]*)(\?[^#]*)?(#.*)?$', v)
                path, frag = m.group(1), (m.group(3) or '')[1:]
                if not path:
                    target = rel
                else:
                    if not path.startswith('/'):
                        path = os.path.normpath(os.path.join(os.path.dirname(base), path))
                    target = resolve(path, redirects)
                    if target is None:
                        problems.append('%s : lien cassé %s="%s"' % (rel, a, v))
                        continue
                if frag and target.endswith('.html') and frag not in ids(target):
                    problems.append('%s : ancre absente %s="%s"' % (rel, a, v))
        for st in soup.find_all('style'):
            for u in re.findall(r'url\(["\']?([^"\')]+)', st.string or ''):
                if re.match(r'^(data:|https?:|#)', u):
                    continue
                path = u if u.startswith('/') else os.path.normpath(os.path.join(os.path.dirname(base), u))
                if resolve(path, redirects) is None:
                    problems.append('%s : image CSS absente %s' % (rel, u))
    return problems, len(files)


# ─────────────────────── export des textes source ───────────────────────

def export_source():
    """Réécrit scripts/langs/_source.json : toutes les clés à traduire avec le français et l'anglais."""
    en = load_en()
    src = {}

    def add(k, fr, e, page):
        if k in ('nav.intl', 'banner.text'):
            return
        if k in src:
            src[k]['pages'] = sorted(set(src[k]['pages']) | {page})
            return
        src[k] = {'fr': fr, 'en': e, 'pages': [page]}

    for g in ('index', 'familles', 'ecole', 'about', 'tarifs'):
        s = BeautifulSoup(read(GROUPS[g]['src']), 'html.parser')
        for el in s.select('[data-i18n]'):
            add(el['data-i18n'], norm(el.get_text()), en.get(el['data-i18n']), g)
        for el in s.select('[data-i18n-html]'):
            add(el['data-i18n-html'], norm(el.decode_contents()), en.get(el['data-i18n-html']), g)
        for a, attr in (('data-i18n-ph', 'placeholder'), ('data-i18n-aria', 'aria-label'), ('data-i18n-alt', 'alt')):
            for el in s.select('[%s]' % a):
                add(el[a], el.get(attr), en.get(el[a]), g)
    s = BeautifulSoup(read('international.html'), 'html.parser')
    for el in s.select('[data-i18n]'):
        k = el['data-i18n']
        add(k, None, en.get(k) if k.startswith('nav.') else norm(el.get_text()), 'vote')
    for el in s.select('[data-i18n-html]'):
        add(el['data-i18n-html'], None, norm(el.decode_contents()), 'vote')
    for el in s.select('[data-i18n-ph]'):
        add(el['data-i18n-ph'], None, el.get('placeholder'), 'vote')
    h = s.head
    add('meta.vote.title', None, h.title.string, 'vote')
    add('meta.vote.description', None, h.find('meta', attrs={'name': 'description'})['content'], 'vote')
    add('meta.vote.og_title', None, h.find('meta', attrs={'property': 'og:title'})['content'], 'vote')
    add('meta.vote.og_description', None, h.find('meta', attrs={'property': 'og:description'})['content'], 'vote')
    for k in COOKIE_KEYS:
        add('gen.cookie.' + k, None, en.get('gen.cookie.' + k), 'toutes')
    old = {}
    try:
        old = json.load(open(os.path.join(LANGDIR, '_source.json'), encoding='utf-8'))
    except Exception:
        pass
    for k, v in old.items():  # clés dyn.* / meta.* / gen.* : gardées (textes FR des scripts)
        if k not in src and (k.startswith(('dyn.', 'meta.', 'gen.')) or k in en):
            src[k] = v
            if k in en:
                src[k]['en'] = en[k]
    out = dict(sorted(src.items()))
    with open(os.path.join(LANGDIR, '_source.json'), 'w', encoding='utf-8') as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
    print('_source.json : %d clés' % len(out))


# ─────────────────────────────── main ───────────────────────────────

def main():
    args = sys.argv[1:]
    if '--export-source' in args:
        export_source()
        return 0
    dicts = load_dicts()
    generated = []
    errors = []
    if '--check-only' not in args:
        changed = update_sources()
        print('Pages sources mises à jour : %d %s' % (len(changed), ', '.join(changed)))
        countries = json.load(open(os.path.join(LANGDIR, 'countries.json'), encoding='utf-8'))
        for l in LANGS:
            for g in GROUPS:
                p = page_path(g, l)
                if not p or (g == 'vote' and l == 'en'):
                    continue
                rel = build_page(g, l, dicts[l], countries, errors)
                if rel:
                    generated.append((g, l, rel))
        hand = update_handmade_en(generated)
        print('Pages anglaises faites à la main mises à jour : %d %s' % (len(hand), ', '.join(hand)))
        update_redirects()
        update_sitemap()
        print('Pages traduites écrites : %d' % len(generated))
    else:
        for l in LANGS:
            for g in GROUPS:
                p = page_path(g, l)
                if p and not (g == 'vote' and l == 'en'):
                    generated.append((g, l, out_file(p)))
    problems = errors + check_leftovers(generated, dicts)
    links, n = check_links()
    problems += links
    for p in problems:
        print('  PROBLÈME ' + p)
    print('Contrôle : %d pages vérifiées, %d problème(s)' % (n, len(problems)))
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())
