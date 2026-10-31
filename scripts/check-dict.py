#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Contrôle d'un dictionnaire de traduction (scripts/langs/<langue>.json).

Usage : python3 scripts/check-dict.py es      (ou it, de, he)

Vérifie, par rapport à scripts/langs/_source.json (clés + textes FR/EN de référence) :
  - aucune clé manquante ni en trop ;
  - mêmes balises HTML et mêmes liens (href) que le texte anglais de référence ;
  - pas d'emoji ;
  - pas de « gratuit » hors pilote école, pas de « socratique » ;
  - pas de chiffres absents du texte de référence.
Sortie : liste des problèmes, code de retour 1 s'il y en a.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
EMOJI = re.compile('[\U0001F000-\U0001FAFF☀-➿⭐️\U0001F1E6-\U0001F1FF]')
FREE = {
    'es': r'\bgratu[ií]t|\bgratis\b',
    'it': r'\bgratuit|\bgratis\b',
    'de': r'kostenlos|gratis|unentgeltlich',
    'he': r'חינם|ללא תשלום|בחינם',
    'en': r'\bfree\b',
}
SOCRATIC = r'socr[aá]t|sokrat|סוקרט'


def tags(s):
    return sorted(re.findall(r'</?([a-zA-Z0-9]+)', s or ''))


def hrefs(s):
    return sorted(re.findall(r'href="([^"]*)"', s or ''))


def digits(s):
    # Nombres présents (on ignore séparateurs de milliers et décimales)
    return set(re.sub(r'[\s.,  ]', '', n) for n in re.findall(r'\d[\d\s.,  ]*\d|\d', re.sub(r'<[^>]+>', ' ', s or '')))


def main(lang):
    src = json.load(open(os.path.join(HERE, 'langs', '_source.json'), encoding='utf-8'))
    path = os.path.join(HERE, 'langs', lang + '.json')
    d = json.load(open(path, encoding='utf-8'))
    d.pop('_comment', None)
    pb = []
    for k in src:
        if k not in d:
            pb.append('clé manquante : ' + k)
    for k in d:
        if k not in src:
            pb.append('clé en trop : ' + k)
    for k, v in d.items():
        if k not in src:
            continue
        ref = src[k]['en'] or ''
        if not isinstance(v, str) or not v.strip():
            pb.append('valeur vide : ' + k)
            continue
        if tags(v) != tags(ref):
            pb.append('balises différentes : %s\n    ref : %s\n    vous : %s' % (k, tags(ref), tags(v)))
        if hrefs(v) != hrefs(ref):
            pb.append('liens différents : %s %s / %s' % (k, hrefs(ref), hrefs(v)))
        if EMOJI.search(v):
            pb.append('emoji : ' + k)
        if re.search(FREE.get(lang, r'$^'), v, re.I) and 'pilot' not in ref.lower() and 'pilote' not in (src[k]['fr'] or '').lower():
            pb.append('« gratuit » hors pilote école : ' + k)
        if re.search(SOCRATIC, v, re.I):
            pb.append('« socratique » interdit : ' + k)
        extra = digits(v) - digits(ref) - digits(src[k]['fr'] or '')
        if extra:
            pb.append('chiffres absents de la référence %s : %s' % (sorted(extra), k))
    for p in pb:
        print(p)
    print('%s : %d clés, %d problème(s)' % (lang, len(d), len(pb)))
    return 1 if pb else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else 'es'))
