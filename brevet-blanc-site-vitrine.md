# Brevet blanc — Nouvelle fonctionnalité à ajouter sur galac6.io

> Document de référence — 28 février 2026
> Fonctionnalité implémentée et déployée. À intégrer sur le site vitrine galac6.io.

---

## Résumé

Galac6 propose désormais un mode **Brevet blanc** complet : l'élève passe une épreuve du Diplôme National du Brevet (DNB) dans les conditions réelles. L'IA génère le sujet (ou l'élève choisit des annales), chronomètre l'épreuve, puis corrige la copie exercice par exercice comme un vrai professeur.

**4 matières disponibles :** Mathématiques, Français, Sciences et Histoire-Géographie-EMC.

---

## Ce qu'il faut mettre en avant

### Copy hero (suggestion)

> "Prépare ton Brevet avec des épreuves complètes. 4 matières, sujets IA inédits ou annales officielles, correction détaillée par l'IA — comme un vrai professeur."

### Copy courte (pour une carte fonctionnalité)

> "Brevet blanc DNB en conditions réelles. Maths, Français, Sciences, Histoire-Géo. Chrono, correction et mention."

---

## Détail de la fonctionnalité

### Les 4 matières et leur format officiel

| Matière | Durée | Barème | Structure |
|---------|-------|--------|-----------|
| **Mathématiques** | 2h | /20 | Partie 1 — Automatismes (20 min, 6 pts, sans calculatrice) + Partie 2 — Exercices (1h40, 14 pts, avec calculatrice) |
| **Français** | 3h | /20 | Partie 1 — Grammaire & Compétences (1h10, 10 pts : texte, compréhension, grammaire, réécriture) + Partie 2 — Rédaction (1h50, 10 pts : 2 sujets au choix) |
| **Sciences** | 1h | /25 | 2 disciplines tirées au sort parmi Physique-Chimie, SVT et Technologie (comme au vrai DNB). Exercices documentaires. |
| **Histoire-Géo-EMC** | 2h | /20 | Partie 1 — Histoire ou Géographie (1h, 10 pts : documents + développement construit) + Partie 2 — EMC (1h, 10 pts) |

### Parcours utilisateur

1. L'élève clique sur **Brevet blanc** depuis le tableau de bord
2. Il choisit sa **matière** (Maths, Français, Sciences ou Histoire-Géo)
3. Il configure l'épreuve :
   - **Parties** : épreuve complète, Partie 1 seule ou Partie 2 seule
   - **Source** : sujet généré par l'IA (inédit) ou annales officielles (vrais sujets DNB 2019–2024)
   - **Mode** : examen (chronomètre officiel) ou entraînement (sans chrono)
4. Il passe l'épreuve avec un chronomètre et une interface dédiée
5. Il soumet sa copie
6. L'IA corrige exercice par exercice et attribue une note avec mention

### Source du sujet : IA ou Annales

| Source | Description |
|--------|-------------|
| **Sujet IA** | Sujet inédit généré spécifiquement pour l'élève par l'IA. Idéal pour varier les entraînements et ne jamais tomber sur le même sujet. |
| **Annales** | Vrais sujets tombés au DNB (2019 à 2024). 6 sujets par matière pour les nouvelles matières, plus les sujets Maths existants. Idéal pour se mettre en conditions réelles. |

### Modes d'épreuve

| Mode | Description |
|------|-------------|
| **Examen** | Chronomètre de la durée officielle. Pas d'accès aux corrections avant la fin. Comme le jour J. |
| **Entraînement** | Pas de chronomètre. L'élève travaille à son rythme. |

### La correction

- Chaque question reçoit une **note**, un **commentaire personnalisé** et la **réponse attendue**
- Points partiels accordés quand la démarche est bonne mais le résultat faux
- Score global avec **mention** : Assez Bien (≥60%), Bien (≥70%), Très Bien (≥80%), Félicitations (≥90%)
- **Commentaire général** : points forts, axes de progrès, conseils personnalisés
- Correction adaptée par matière (le "professeur" IA connaît les spécificités de chaque discipline)

---

## Où l'intégrer sur galac6.io

### 1. Section "Fonctionnalités" — Nouvelle carte

| Icône | Titre | Copy |
|-------|-------|------|
| 📝 (ou icône d'examen) | Brevet blanc DNB | Passe des épreuves complètes du Brevet dans 4 matières. Sujets IA ou annales officielles, chronomètre, correction détaillée et mention. |

### 2. Section "Pour l'élève" — Ajouter une ligne

> **Brevet blanc** — Entraîne-toi au DNB avec des épreuves complètes en Maths, Français, Sciences et Histoire-Géo. Choisis un sujet IA ou des annales officielles, passe l'épreuve chrono et reçois ta correction détaillée avec ta mention.

### 3. Section "Pour le parent" — Ajouter une ligne

> **Préparation au Brevet** — Votre enfant s'entraîne au DNB dans les conditions réelles. Correction détaillée par l'IA, note et mention pour chaque épreuve.

### 4. Section "Pour l'école" (offre établissements) — Ajouter une ligne

> **Brevets blancs IA** — Organisez des brevets blancs sans mobiliser de salles ni de correcteurs. L'IA génère les sujets et corrige les copies automatiquement.

### 5. Chiffres clés à mettre à jour

| Métrique | Ancienne valeur | Nouvelle valeur |
|----------|-----------------|-----------------|
| Modes d'apprentissage | 6 (chat, quiz, dictée, fiches, dev, lecture) | **7** (+ brevet blanc) |
| Matières brevet blanc | — | 4 (Maths, Français, Sciences, Histoire-Géo) |
| Annales disponibles | — | 2019 à 2024, 4 matières |

---

## Éléments visuels suggérés

Pour illustrer cette fonctionnalité sur le site :

1. **Capture du dashboard Brevet blanc** — Les 4 cartes matières avec icônes, durées et points
2. **Capture de l'épreuve en cours** — Interface avec chronomètre, exercice et zone de réponse
3. **Capture des résultats** — Score, mention, détail exercice par exercice avec corrections colorées (vert/rouge)

---

## FAQ — Questions à ajouter

**Le brevet blanc est-il au format officiel du DNB ?**
Oui. Chaque matière respecte le format officiel : durées, barèmes, structure en parties. Les annales sont de vrais sujets tombés au DNB.

**L'IA corrige-t-elle aussi bien qu'un professeur ?**
L'IA corrige exercice par exercice avec des points partiels, des commentaires personnalisés et des conseils. Elle est calibrée par matière (un "professeur de maths" pour les maths, un "professeur de français" pour le français, etc.).

**Peut-on ne faire qu'une partie de l'épreuve ?**
Oui. L'élève peut choisir l'épreuve complète, la Partie 1 seule ou la Partie 2 seule. Utile pour s'entraîner sur un point précis.

**Les annales sont-elles de vrais sujets ?**
Oui. Ce sont de vrais sujets tombés au Brevet des collèges entre 2019 et 2024, avec les questions et barèmes originaux.
