#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Serveur local qui imite Netlify pour tester le site : adresses sans .html (/ecole, /es/ecole),
règles « 200 » de _redirects, redirections « 301 » (ex. /primaire.html → /primaire), dossiers → index.html.
Usage : python3 scripts/serve-local.py [port]     (par défaut 8091) puis http://localhost:8091/
"""
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def rules(code):
    """Règles de _redirects d'un code donné ('200' ou '301', avec ou sans « ! »)."""
    m = {}
    with open(os.path.join(ROOT, '_redirects'), encoding='utf-8') as f:
        for line in f:
            p = line.split()
            if len(p) >= 3 and not line.startswith('#') and p[2].rstrip('!') == code:
                m[p[0]] = p[1]
    return m


def rewrites():
    return rules('200')


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def translate_path(self, path):
        clean = path.split('?', 1)[0].split('#', 1)[0]
        clean = rewrites().get(clean, clean)
        full = super().translate_path(clean)
        if not os.path.exists(full) and os.path.isfile(full + '.html'):
            full += '.html'
        return full

    def send_head(self):
        # Redirections 301 (première règle trouvée, sans enchaînement, comme Netlify ; la requête garde ses paramètres)
        path, _, query = self.path.partition('?')
        target = rules('301').get(path)
        if target:
            self.send_response(301)
            self.send_header('Location', target + ('?' + query if query else ''))
            self.send_header('Content-Length', '0')
            self.end_headers()
            return None
        return super().send_head()

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8091
    http.server.ThreadingHTTPServer(('', port), Handler).serve_forever()
