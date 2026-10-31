#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Galac6 — fabrication des pages traduites du site vitrine (en, es, it, de, he).

Pourquoi : la traduction anglaise d'i18n.js ne s'affiche qu'après un clic dans le navigateur,
Google ne voit donc que le français. Ce script écrit de vraies pages statiques par langue :
  /en/  /en/ecole  /en/about  /en/tarifs           (vote anglais = /international, inchangé)
  /es/  /es/ecole  /es/about  /es/tarifs  /es/international   (idem it, de, he)

Sources des textes :
  - français : les pages françaises elles-mêmes (index.html, ecole.html, about.html, tarifs.html) ;
  - anglais : i18n.js (+ compléments dans scripts/langs/en.json) ; page de vote : international.html ;
  - es, it, de, he : scripts/langs/<langue>.json (mêmes clés qu'i18n.js) ;
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
LANGS = ['en', 'es', 'it', 'de', 'he']
ALL = ['fr'] + LANGS
NAMES = {'fr': 'Français', 'en': 'English', 'es': 'Español', 'it': 'Italiano', 'de': 'Deutsch', 'he': 'עברית'}
LANG_LABEL_FR = 'Langue'
OG_LOCALE = {'fr': 'fr_FR', 'en': 'en_GB', 'es': 'es_ES', 'it': 'it_IT', 'de': 'de_DE', 'he': 'he_IL'}
TODAY = datetime.date.today().isoformat()

# Groupes de pages traduites : fichier source et langue de la source
GROUPS = {
    'index': {'src': 'index.html', 'src_lang': 'fr'},
    'ecole': {'src': 'ecole.html', 'src_lang': 'fr'},
    'about': {'src': 'about.html', 'src_lang': 'fr'},
    'tarifs': {'src': 'tarifs.html', 'src_lang': 'fr'},
    'vote': {'src': 'international.html', 'src_lang': 'en'},
}
# Chemin (adresse) d'une page traduite → groupe
PATH_TO_GROUP = {
    '/': 'index', '/index.html': 'index', '/ecole': 'ecole', '/ecole.html': 'ecole',
    '/about': 'about', '/about.html': 'about', '/tarifs': 'tarifs', '/tarifs.html': 'tarifs',
    '/international': 'vote', '/international.html': 'vote',
}
EMOJI = re.compile('[\U0001F000-\U0001FAFF☀-➿⭐️\U0001F1E6-\U0001F1FF]\\s?')

GLOBE = ('<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
         'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/>'
         '<path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 '
         '15.3 15.3 0 0 1 4-10z"/></svg>')

# Styles communs du menu, insérés dans chaque page (bloc <style id="g6-nav-css">)
NAV_CSS = """
    /* Menu : marge du logo, bouton « Galac6 in your country », sélecteur de langue (généré par scripts/build-langs.py) */
    html, body { overflow-x: clip; } /* les halos décoratifs du haut de page ne créent plus de défilement horizontal */
    .navbar-brand { margin-inline-end: 1.5rem; flex-shrink: 0; }
    .navbar-links a { white-space: nowrap; }
    .navbar-links .nav-intl { display: inline-flex; align-items: center; justify-content: center; gap: 6px; padding: 0.4rem 0.85rem; border: 1.5px solid rgba(139,147,255,0.75); border-radius: 10px; background: rgba(99,102,241,0.1); color: #e9ebfa; font-weight: 600; text-decoration: none; }
    .navbar-links .nav-intl:hover, .navbar-links .nav-intl:focus-visible { border-color: #a78bfa; background: rgba(99,102,241,0.22); color: #fff; text-decoration: none; }
    .navbar-links .nav-intl svg { flex: none; }
    .lang-menu { position: relative; }
    .lang-menu summary { list-style: none; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; min-height: 44px; padding: 0 4px; color: var(--text-muted, #8a8aa3); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.04em; user-select: none; }
    .lang-menu summary::-webkit-details-marker { display: none; }
    .lang-menu summary::after { content: ""; width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid currentColor; }
    .lang-menu summary:hover, .lang-menu[open] summary { color: var(--text, #f0f0f5); }
    .lang-menu-list { position: absolute; top: 100%; inset-inline-end: 0; z-index: 300; min-width: 160px; display: grid; gap: 2px; padding: 6px; background: #13131f; border: 1px solid #2a2a44; border-radius: 12px; box-shadow: 0 12px 32px rgba(0,0,0,0.45); }
    .navbar .lang-menu-list a { display: block; padding: 0.55rem 0.8rem; border-radius: 8px; color: var(--text-muted, #8a8aa3); font-size: 0.9rem; font-weight: 500; text-decoration: none; white-space: nowrap; min-height: 0; }
    .navbar .lang-menu-list a:hover { background: rgba(124,92,252,0.14); color: var(--text, #f0f0f5); }
    .navbar .lang-menu-list a[aria-current] { color: var(--text, #f0f0f5); font-weight: 700; }
    /* Grand écran : menu un peu resserré pour tenir sur une ligne avec le bouton */
    @media (min-width: 1241px) {
      .navbar-links { gap: 1.25rem !important; }
      .navbar-links a { font-size: 0.88rem; }
      .navbar-brand { margin-inline-end: 1.25rem; }
    }
    @media (min-width: 1101px) and (max-width: 1240px) {
      .navbar { padding-left: 2rem !important; padding-right: 2rem !important; }
      .navbar-links { gap: 0.75rem !important; }
      .navbar-links a { font-size: 0.8rem !important; }
      .navbar-links .nav-intl { padding: 0.35rem 0.6rem; gap: 5px; }
      .navbar-links a[href^="https://galac6web"] { padding: 0.45rem 0.9rem !important; }
      .navbar-brand { margin-inline-end: 1rem; }
      .navbar-brand span { font-size: 1.35rem; }
      .navbar-brand img { height: 38px; }
    }
    /* Menu hamburger jusqu'à 1100 px (au lieu de 900) : le menu complet ne tient plus sur une ligne en dessous */
    @media (min-width: 901px) and (max-width: 1100px) {
      .navbar { padding: 1rem 1.5rem !important; flex-wrap: wrap; }
      .navbar-hamburger { display: flex !important; }
      .navbar-links { display: none !important; flex-direction: column; align-items: center; width: 100%; gap: 0.5rem !important; padding: 1rem 0 0.5rem; }
      .navbar-links.open { display: flex !important; }
      .navbar-links a { padding: 0.6rem 0; font-size: 1rem !important; }
    }
    @media (max-width: 1100px) {
      .navbar-brand { margin-inline-end: 0; }
      .navbar-links .nav-intl { order: -1; width: 100%; max-width: 340px; min-height: 44px; margin: 0 auto 0.25rem; padding: 0.6rem 1rem; font-size: 1rem; }
      .lang-menu { align-self: center; }
      .lang-menu summary { font-size: 0.95rem; }
      .lang-menu-list { position: static; display: flex; flex-wrap: wrap; justify-content: center; min-width: 0; margin-top: 4px; }
      .navbar .lang-menu-list a { padding: 0.6rem 0.75rem; font-size: 0.95rem !important; }
    }
"""

# Bandeau anglais présent en haut de TOUTES les pages, jamais traduit, sans bouton de fermeture.
# Son lien mène à la page de vote (réécrit vers /es/international, etc. sur les pages traduites).
INTL_BANNER = ('<!-- intl-banner --><div class="g6-intl-banner" id="g6-intl-banner" lang="en" dir="ltr" role="note">'
               '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" '
               'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/>'
               '<path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 '
               '15.3 15.3 0 0 1 4-10z"/></svg><span>Currently available in France only (French school system). '
               'Want Galac6 in your country? <a href="/international">Send a request&nbsp;&rarr;</a></span></div><!-- /intl-banner -->')
BANNER_CSS = """
    /* Bandeau anglais « Currently available in France only » : toutes les pages, collé en haut avec le menu (généré par scripts/build-langs.py) */
    .g6-intl-banner { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 0; padding: 8px 16px; background: linear-gradient(135deg, #6366f1, #a855f7); color: #fff; font-size: 0.85rem; font-weight: 500; line-height: 1.45; text-align: center; direction: ltr; }
    .g6-intl-banner svg { flex: none; opacity: 0.9; }
    .g6-intl-banner span { min-width: 0; overflow-wrap: anywhere; }
    .g6-intl-banner a { color: #fff; font-weight: 700; text-decoration: none; white-space: nowrap; border-bottom: 1px solid rgba(255,255,255,0.5); }
    .g6-intl-banner a:hover, .g6-intl-banner a:focus-visible { border-bottom-color: #fff; text-decoration: none; }
    body > .g6-intl-banner { position: sticky; top: 0; z-index: 120; }
    @media (max-width: 480px) { .g6-intl-banner { font-size: 0.8rem; padding: 7px 12px; } }
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
    /* Bandeau d'information des pages es/it/de/he, sous le menu (généré par scripts/build-langs.py) */
    .lang-notice { margin: 0; padding: 10px 16px; background: rgba(99,102,241,0.12); border-bottom: 1px solid rgba(139,147,255,0.3); color: #d6d9f5; font-size: 0.88rem; line-height: 1.5; text-align: center; }
    .lang-notice a { color: #fff; font-weight: 600; text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.5); }
"""

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

def lang_menu_html(lang, links, label):
    """links : {langue: adresse}. Texte seul, sans drapeau."""
    items = []
    for l in ALL:
        href = links[l]
        cur = ' aria-current="page"' if l == lang else ''
        rtl = ' dir="rtl"' if l == 'he' else ''
        items.append('<a href="%s" hreflang="%s" lang="%s"%s%s>%s</a>' % (href, l, l, rtl, cur, NAMES[l]))
    return ('<!-- lang-menu --><details class="lang-menu"><summary aria-label="%s : %s">%s</summary>'
            '<div class="lang-menu-list">%s</div></details>%s<!-- /lang-menu -->'
            % (label, NAMES[lang], lang.upper(), ''.join(items), LANG_MENU_JS))


def menu_links(group, current_path):
    """Adresses du sélecteur : la même page dans chaque langue, sinon l'accueil de la langue."""
    links = {}
    for l in ALL:
        p = page_path(group, l) if group else None
        if not p:
            p = current_path if (l == 'fr' and not group) else page_path('index', l)
        links[l] = p
    return links


def hreflang_html(group):
    lines = ['  <!-- hreflang (généré par scripts/build-langs.py) -->']
    for l in group_langs(group):
        lines.append('  <link rel="alternate" hreflang="%s" href="%s%s">' % (l, SITE, page_path(group, l)))
    xdef = page_path(group, 'fr') or page_path(group, 'en')
    lines.append('  <link rel="alternate" hreflang="x-default" href="%s%s">' % (SITE, xdef))
    lines.append('  <!-- /hreflang -->')
    return '\n'.join(lines)


# ─────────────────── 1. mise à jour des pages sources ───────────────────

def source_pages():
    files = []
    for name in sorted(os.listdir(ROOT)):
        if name.endswith('.html'):
            files.append(name)
    blog = os.path.join(ROOT, 'blog')
    for name in sorted(os.listdir(blog)):
        if name.endswith('.html'):
            files.append('blog/' + name)
    return files


def update_banner(s):
    """Retire l'ancien bandeau anglais caché (en-banner) et place le bandeau anglais visible en haut de page."""
    s = re.sub(r'\n[ \t]*<!-- ═══ EN BANNER[^>]*-->[ \t]*', '', s)
    s = re.sub(r'\n[ \t]*<div [^>]*id="en-banner"[^>]*>.*?</div>[ \t]*(?=\n)', '', s, flags=re.S)
    if '<!-- intl-banner -->' in s:
        s = re.sub(r'<!-- intl-banner -->.*?<!-- /intl-banner -->', lambda m: INTL_BANNER, s, flags=re.S)
    elif '<div class="navbar-wrapper">' in s:
        s = s.replace('<div class="navbar-wrapper">', '<div class="navbar-wrapper">\n    ' + INTL_BANNER, 1)
    else:
        s = re.sub(r'(<body[^>]*>)', lambda m: m.group(1) + '\n  ' + INTL_BANNER, s, count=1)
    css = '<style id="g6-banner-css">%s  </style>' % BANNER_CSS
    if '<style id="g6-banner-css">' in s:
        s = re.sub(r'<style id="g6-banner-css">.*?</style>', lambda m: css, s, flags=re.S)
    else:
        s = s.replace('</head>', '  ' + css + '\n</head>', 1)
    return s


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

        # Bouton « Galac6 in your country » (toujours en anglais, avec un globe)
        def intl(m):
            attrs = m.group(1)
            attrs = attrs.replace(' data-i18n="nav.intl"', '')
            cls = re.search(r'class="([^"]*)"', attrs)
            if cls:
                if 'nav-intl' not in cls.group(1):
                    attrs = attrs.replace(cls.group(0), 'class="%s nav-intl"' % cls.group(1))
            else:
                attrs += ' class="nav-intl"'
            return '<a href="/international"%s>%s<span>Galac6 in your country</span></a>' % (attrs, GLOBE)
        s = re.sub(r'<a href="/international"([^>]*)>(?:Galac6 dans votre pays|Galac6 in your country)</a>', intl, s)

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

        # Styles du menu
        css = '<style id="g6-nav-css">%s  </style>' % NAV_CSS
        if '<style id="g6-nav-css">' in s:
            s = re.sub(r'<style id="g6-nav-css">.*?</style>', lambda m: css, s, flags=re.S)
        else:
            s = s.replace('</head>', '  ' + css + '\n</head>', 1)

        # Langue fixe : i18n.js ne traduit plus sur place (le choix se fait par adresse)
        if lang == 'fr' and 'data-static-lang' not in s:
            s = s.replace('<html lang="fr">', '<html lang="fr" data-static-lang>', 1)

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
    g = PATH_TO_GROUP.get(path)
    if g and page_path(g, lang):
        return page_path(g, lang) + rest, True
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
    for sel, val in (({'property': 'og:url'}, url), ({'property': 'og:locale'}, OG_LOCALE[lang])):
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

    # ── bandeau d'information traduit, sous le menu (es, it, de, he ; l'anglais a déjà le bandeau du haut) ──
    if lang != 'en':
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
    ld = None
    if group == 'index':
        faq = []
        for item in soup.select('.faq-item'):
            q = item.select_one('.faq-question span')
            a = item.select_one('.faq-answer-inner')
            if q and a:
                faq.append({'@type': 'Question', 'name': norm(q.get_text()),
                            'acceptedAnswer': {'@type': 'Answer', 'text': norm(EMOJI.sub('', a.get_text()))}})
        ld = {'@context': 'https://schema.org', '@graph': [
            {'@type': 'Organization', '@id': SITE + '/#organization', 'name': 'Galac6', 'url': SITE + '/',
             'logo': SITE + '/icons/logo.png', 'description': meta('description')},
            {'@type': 'WebSite', '@id': SITE + path + '#website', 'url': url, 'name': 'Galac6',
             'inLanguage': lang, 'publisher': {'@id': SITE + '/#organization'}},
            {'@type': 'FAQPage', 'inLanguage': lang, 'mainEntity': faq}]}
    elif group in ('ecole', 'about', 'tarifs'):
        name = need({'ecole': 'nav.school', 'about': 'nav.about', 'tarifs': 'nav.pricing'}[group])
        ld = {'@context': 'https://schema.org', '@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': need('gen.home'), 'item': SITE + page_path('index', lang)},
            {'@type': 'ListItem', 'position': 2, 'name': name, 'item': url}]}
    if ld:
        tag = soup.new_tag('script', type='application/ld+json')
        tag.string = '\n' + json.dumps(ld, ensure_ascii=False, indent=2) + '\n'
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

    out = soup.decode(formatter='minimal')
    if not out.lstrip().lower().startswith('<!doctype'):
        out = '<!DOCTYPE html>\n' + out
    write(out_file(path), out)
    return out_file(path)


# ─────────────── 3. _redirects et sitemap.xml ───────────────

def update_redirects():
    lines = ['# Pages traduites (généré par scripts/build-langs.py) : adresses sans .html']
    for l in LANGS:
        for g in ('ecole', 'about', 'tarifs', 'vote'):
            p = page_path(g, l)
            if p and p != '/international':
                lines.append('%-24s %-28s 200' % (p, '/' + out_file(p)))
    lines.append('# /pages traduites')
    block = '\n'.join(lines)
    s = read('_redirects')
    if '# Pages traduites' in s:
        s = re.sub(r'# Pages traduites.*?# /pages traduites', lambda m: block, s, flags=re.S)
    else:
        s = s.rstrip('\n') + '\n' + block + '\n'
    write('_redirects', s)


def update_sitemap():
    s = read('sitemap.xml')
    urls = re.findall(r'  <url>.*?</url>\n', s, re.S)
    group_paths = set()
    for g in GROUPS:
        for l in group_langs(g):
            group_paths.add(SITE + page_path(g, l))
    kept = [u for u in urls if re.search(r'<loc>([^<]*)</loc>', u).group(1) not in group_paths]
    prio = {'index': '1.0', 'tarifs': '0.9', 'ecole': '0.9', 'about': '0.5', 'vote': '0.6'}
    freq = {'index': 'weekly'}
    new = []
    for g in ('index', 'tarifs', 'ecole', 'about', 'vote'):
        alts = ''.join('    <xhtml:link rel="alternate" hreflang="%s" href="%s%s"/>\n' % (l, SITE, page_path(g, l))
                       for l in group_langs(g))
        alts += '    <xhtml:link rel="alternate" hreflang="x-default" href="%s%s"/>\n' % (
            SITE, page_path(g, 'fr') or page_path(g, 'en'))
        for l in group_langs(g):
            p = float(prio[g]) - (0 if l in ('fr', 'en') or g == 'vote' else 0.1)
            if l != 'fr' and g != 'vote':
                p -= 0.1
            new.append('  <url>\n    <loc>%s%s</loc>\n%s    <lastmod>%s</lastmod>\n    <changefreq>%s</changefreq>\n'
                       '    <priority>%.1f</priority>\n  </url>\n' % (SITE, page_path(g, l), alts, TODAY, freq.get(g, 'monthly'), p))
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
         'hello@galac6.io', 'Éduscol', 'ChatGPT'}


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
    files = source_pages() + ['teaser/index.html']
    for l in LANGS:
        d = os.path.join(ROOT, l)
        if os.path.isdir(d):
            files += ['%s/%s' % (l, n) for n in sorted(os.listdir(d)) if n.endswith('.html')]
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

    for g in ('index', 'ecole', 'about', 'tarifs'):
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
                generated.append((g, l, rel))
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
