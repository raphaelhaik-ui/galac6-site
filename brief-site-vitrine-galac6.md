# Brief mise à jour site vitrine galac6.io

> Audit réalisé le 21/02/2026 — Comparaison entre les fonctionnalités implémentées dans l'app et ce qui est affiché sur galac6.io.

---

## Fonctionnalités déjà bien mises en avant sur le site

- Chat intelligent avec méthode socratique
- Mode Quiz (QCM + questions ouvertes, corrections détaillées, XP)
- Éditeur de formules mathématiques (MathLive WYSIWYG)
- XP et gamification (niveaux, points, séries)
- Apprends le dev (Scratch et Python)
- Tableau de bord parent (stats, historique)
- Dictées avec correction et suivi
- Fiches de révision générées par l'IA
- Coller des photos d'exercices
- Support multi-élèves
- Personnalisation du comportement de l'IA (prompt)
- Du CP à la Terminale
- Programmes Éducation Nationale (Éduscol)

---

## Fonctionnalités implémentées ABSENTES du site — Haute priorité

### 1. Saisie vocale (Whisper)

L'élève peut dicter ses questions et réponses au micro au lieu de taper. Utilisable dans le chat, les quiz et les dictées.

> **Suggestion de copy** : "Dictez vos questions et formules math à l'oral. L'IA transcrit et convertit automatiquement en notation mathématique."

### 2. Dictée vocale de formules math

L'élève dit "x au carré plus racine de x moins 1" et obtient du LaTeX rendu visuellement. Avantage compétitif fort.

> **Suggestion de copy** : "Dites vos formules à voix haute — l'IA les convertit instantanément en écriture mathématique."

### 3. OCR sur photos

Extraction de texte depuis une image collée ou photographiée pour résoudre un exercice.

> **Suggestion de copy** : "Collez ou photographiez un exercice, l'IA extrait le texte et vous aide à le résoudre."

### 4. Lecture vocale des dictées (TTS)

Les dictées sont lues à voix haute par une IA avec un débit adapté. La mention "dictées vocales" existe sur le site mais le TTS n'est pas expliqué.

> **Suggestion de copy** : "Dictées lues par une voix IA naturelle, avec débit adapté au niveau de l'élève."

### 5. Export PDF des fiches de révision

Les fiches peuvent être téléchargées en PDF pour réviser hors-ligne.

> **Suggestion de copy** : "Téléchargez vos fiches de révision en PDF pour réviser hors-ligne, en classe ou en déplacement."

### 6. Remédiation personnalisée par l'IA

Analyse des faiblesses, plans de remédiation avec priorités et exercices recommandés. Présent sur la page pricing mais absent de galac6.io.

> **Suggestion de copy** : "L'IA analyse les erreurs récurrentes et propose un plan de remédiation ciblé avec des exercices adaptés."

### 7. Rapport de progression détaillé

Radar chart par matière, courbe de progression, analyse des erreurs en dictée, alertes sur les faiblesses persistantes. Export PDF.

> **Suggestion de copy** : "Visualisez les forces et faiblesses par matière avec des graphiques détaillés. Export PDF pour les réunions parents-profs."

---

## Fonctionnalités implémentées ABSENTES du site — Priorité moyenne

- **Mode sombre / clair / auto** — Thème adaptable
- **Taille de police ajustable** — Accessibilité pour les élèves dyslexiques ou malvoyants
- **Interface bilingue FR/EN** — L'interface est disponible en français et anglais
- **Multi-onglets de conversation** — Jusqu'à 8 conversations en parallèle
- **Mindmaps visuels dans les fiches** — Diagrammes générés automatiquement par l'IA
- **Suivi des séries quotidiennes (streaks)** — Motivation par séries de jours consécutifs

---

## Éléments sur galac6.io à vérifier

- **"Blocage des sites et apps IA concurrents"** — Mentionné sur galac6.io mais pas d'implémentation trouvée dans le code. Est-ce un guide parent ou une fonctionnalité externe ?
- **"12 matières scolaires disponibles"** — Vérifier que le compte est exact.

---

## Suggestions de nouvelles sections

### Section "Fonctionnalités" — ajouter 4 cartes

| Carte | Copy |
|-------|------|
| Saisie vocale | Dictez vos questions et formules math à l'oral. L'IA transcrit et convertit automatiquement en notation mathématique. |
| OCR sur photos | Collez ou photographiez un exercice, l'IA extrait le texte et vous aide à le résoudre. |
| Export PDF | Téléchargez vos fiches de révision en PDF pour réviser hors-ligne, en classe ou en déplacement. |
| Rapport de progression | Visualisez les forces et faiblesses par matière avec des graphiques détaillés. Export PDF pour les réunions parents-profs. |

### Section "Pour l'élève" — ajouter

- Saisie vocale au micro (questions + formules math)
- OCR : coller une photo d'exercice
- Export PDF des fiches de révision
- Mode sombre et taille de police ajustable
- Jusqu'à 8 conversations en parallèle

### Section "Pour le parent" — ajouter

- Rapport de progression avec graphiques radar
- Plans de remédiation personnalisés par l'IA
- Export PDF du rapport de progression
- Alertes sur les faiblesses persistantes

### Nouvelle section potentielle : "Accessibilité"

- Mode sombre / clair / automatique
- Taille de police ajustable
- Saisie vocale (pas besoin de clavier)
- Interface en français et anglais
