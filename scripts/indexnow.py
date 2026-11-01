#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Signale à IndexNow (Bing, Yandex… et donc la recherche de ChatGPT) les pages du site à (ré)explorer.

Usage :
  python3 scripts/indexnow.py --dry-run                 # affiche le JSON sans rien envoyer
  python3 scripts/indexnow.py                           # envoie toutes les URL de sitemap.xml
  python3 scripts/indexnow.py https://galac6.io/tarifs  # envoie seulement les URL données

Prérequis : le fichier de clé <clé>.txt doit être en ligne sur https://galac6.io/<clé>.txt
(sinon IndexNow refuse la demande avec un code 403).
"""
import argparse
import json
import os
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

# Racine du site (le dossier parent de scripts/)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

HOST = "galac6.io"
KEY = "162eb2d040782c29193d88b955bd2d09"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
ENDPOINT = "https://api.indexnow.org/indexnow"


def urls_du_sitemap():
    """Lit toutes les adresses <loc> de sitemap.xml."""
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    arbre = ET.parse(os.path.join(ROOT, "sitemap.xml"))
    return [loc.text.strip() for loc in arbre.getroot().findall(".//sm:loc", ns) if loc.text]


def main():
    parser = argparse.ArgumentParser(description="Envoi des URL du site à IndexNow.")
    parser.add_argument("urls", nargs="*", help="URL à envoyer (par défaut : celles de sitemap.xml)")
    parser.add_argument("--dry-run", action="store_true", help="affiche le JSON sans l'envoyer")
    args = parser.parse_args()

    urls = args.urls or urls_du_sitemap()
    # On ne garde que les adresses du site (IndexNow refuse les autres domaines)
    urls = [u for u in urls if u.startswith(f"https://{HOST}/")]
    if not urls:
        print("Aucune URL de galac6.io à envoyer.")
        return 1

    donnees = {"host": HOST, "key": KEY, "keyLocation": KEY_LOCATION, "urlList": urls}

    if args.dry_run:
        print(json.dumps(donnees, ensure_ascii=False, indent=2))
        print(f"\n(essai à blanc : {len(urls)} URL, rien n'a été envoyé)")
        return 0

    requete = urllib.request.Request(
        ENDPOINT,
        data=json.dumps(donnees).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(requete, timeout=30) as reponse:
            code = reponse.status
    except urllib.error.HTTPError as e:
        code = e.code
    except urllib.error.URLError as e:
        print(f"Erreur réseau : {e.reason}")
        return 1

    # 200 = reçu, 202 = reçu (clé en cours de vérification), 403 = clé introuvable,
    # 422 = URL hors du domaine, 429 = trop de demandes
    print(f"Réponse IndexNow : {code} ({len(urls)} URL envoyées)")
    return 0 if code in (200, 202) else 1


if __name__ == "__main__":
    sys.exit(main())
