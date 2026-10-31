#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Serveur local qui imite Netlify pour tester le site : adresses sans .html (/ecole, /es/ecole),
règles « 200 » de _redirects, dossiers → index.html.
Usage : python3 scripts/serve-local.py [port]     (par défaut 8091) puis http://localhost:8091/
"""
import http.server
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def rewrites():
    m = {}
    with open(os.path.join(ROOT, '_redirects'), encoding='utf-8') as f:
        for line in f:
            p = line.split()
            if len(p) >= 3 and not line.startswith('#') and p[2] == '200':
                m[p[0]] = p[1]
    return m


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

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8091
    http.server.ThreadingHTTPServer(('', port), Handler).serve_forever()
