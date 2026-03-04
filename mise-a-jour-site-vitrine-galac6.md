# Galac6 — Mise à jour du site vitrine galac6.io

> Document de référence — 25 février 2026
> Recense TOUTES les fonctionnalités implémentées dans l'app Galac6 pour mise à jour du site de présentation.

---

## Vue d'ensemble

Galac6 est un **assistant IA pédagogique** pour les élèves du **CP à la Terminale** (extensible jusqu'à Bac+5). L'IA utilise la **méthode socratique** : elle guide l'élève pas à pas sans jamais donner la réponse. Tous les contenus sont alignés sur les **programmes officiels de l'Éducation Nationale** (Éduscol / Bulletin Officiel).

**Propulsé par :** Anthropic Claude (Haiku + Sonnet), Google Gemini TTS, OpenAI Whisper, MathLive, KaTeX, Mermaid.

---

## 🆕 Nouvelles fonctionnalités (depuis le 21/02/2026)

Les fonctionnalités ci-dessous ont été développées après le dernier audit et sont **absentes du site vitrine actuel**.

### 1. Gamification complète

Système de gamification engageant pour motiver les élèves au quotidien.

| Élément | Description |
|---|---|
| **XP et niveaux** | Chaque activité rapporte des points d'expérience. 100 XP = 1 niveau. Barre de progression visuelle. |
| **23 badges** | 6 catégories (conversations, quiz, dictées, séries, exploration, XP), 4 niveaux de rareté (Commun, Rare, Épique, Légendaire). Mur de badges avec progression. |
| **3 défis quotidiens** | Missions renouvelées chaque jour (envoyer X messages, compléter un quiz, gagner X XP…). Widget vibrant dans la barre latérale du chat. |
| **Coins et boutique cosmétique** | Monnaie virtuelle gagnée avec l'XP. 16 fonds d'écran thématiques déblocables (nature, espace, gaming, Japon, art…). |
| **Séries (streaks)** | Compteur de jours consécutifs d'utilisation. Badges à 3, 7, 14 et 30 jours. |

> **Suggestion de copy :** "Gagne de l'XP, débloque des badges, relève des défis quotidiens et personnalise ton univers. Apprendre n'a jamais été aussi motivant."

### 2. Accessibilité et aménagements scolaires

Adaptations d'affichage pour les élèves à besoins spécifiques, activables par les parents ou l'école.

| Aménagement | Effet |
|---|---|
| **Dyslexie** | Police OpenDyslexic, espacement augmenté, interligne plus grand |
| **Dyspraxie** | Zones cliquables agrandies (min. 44×44px), espacement doublé, indicateurs de focus épais |
| **Mal voyant** | Texte agrandi, graisse renforcée, icônes plus grandes |
| **Mal entendant** | Bouton « Lire à voix haute » sur tous les contenus (synthèse vocale) |

Contrôles d'accessibilité rapides directement dans la barre d'en-tête de l'élève (taille du texte, raccourcis visuels).

> **Suggestion de copy :** "Adapté à chaque élève : modes dyslexie, dyspraxie, malvoyant et malentendant. L'inclusion fait partie de l'ADN de Galac6."

### 3. Contrôle du temps d'écran

Les parents et administrateurs d'école peuvent définir des limites quotidiennes par élève.

- Temps maximum configurable (ex : 1h, 2h, illimité)
- Avertissement avant l'expiration
- Blocage automatique une fois la limite atteinte
- Temps bonus accordable par le parent ou l'école

> **Suggestion de copy :** "Maîtrisez le temps d'écran. Définissez des limites quotidiennes par enfant et suivez l'utilisation en temps réel."

### 4. Administration scolaire (offre École)

Mode établissement scolaire avec gestion centralisée.

- **Console d'administration école** : liste des élèves affiliés, aménagements, temps d'écran
- **Codes d'invitation** : chaque école a un code unique pour affilier les élèves
- **Rôles** : administrateur et enseignant
- **Tableau de bord** : statistiques d'utilisation agrégées par classe

> **Suggestion de copy :** "Déployez Galac6 dans votre établissement. Console centralisée, codes d'invitation, suivi par classe et temps d'écran maîtrisé."

### 5. Écrans d'accueil thématiques par âge

Trois univers visuels gamifiés adaptés au profil de l'élève.

| Niveau | Thème |
|---|---|
| **Primaire** | Univers coloré et ludique (fusées cartoon, fonds IA) |
| **Collège** | Design moderne avec effets glass-frosted |
| **Lycée** | Style épuré inspiration Notion |

Fonds d'écran générés par IA ou sélectionnés parmi des images de haute qualité. Personnalisables via la boutique cosmétique.

> **Suggestion de copy :** "Un univers visuel adapté à chaque âge. Fonds d'écran IA, thèmes personnalisables et boutique cosmétique pour un espace qui leur ressemble."

### 6. Dictée vocale améliorée

Améliorations majeures du mode dictée.

| Nouveauté | Description |
|---|---|
| **Voix Gemini TTS** | Voix IA française naturelle de haute qualité (Google Gemini 2.5 Flash) |
| **Vitesse réglable** | 3 vitesses : lent (débutants), normal, rapide (élèves à l'aise) |
| **Mode papier** | L'élève écrit sur une feuille et compare avec le texte original |
| **Compte à rebours 10s** | Préparation avant le début de la dictée |
| **Diversité des textes** | L'IA varie les thèmes automatiquement en gardant en mémoire les dictées passées |

> **Suggestion de copy :** "Des dictées lues par une voix IA naturelle, à la vitesse de votre enfant. Mode papier, compte à rebours et textes toujours variés."

### 7. Saisie vocale des formules mathématiques en quiz

En mode quiz (questions ouvertes de maths), l'élève dicte sa réponse à voix haute. L'IA convertit automatiquement la voix en formule mathématique LaTeX.

> **Suggestion de copy :** "Dites vos formules à voix haute pendant les quiz. L'IA les convertit instantanément en écriture mathématique."

### 8. Fiches de révision synthétiques (pense-bête)

En plus des fiches complètes, un mode **pense-bête** génère une version ultra-compacte : définitions clés, formules essentielles, points critiques. Idéal pour une révision express avant un contrôle.

> **Suggestion de copy :** "Fiches complètes ou pense-bêtes express. Choisissez le format adapté au moment : révision approfondie ou dernière minute."

### 9. Fiches de révision du CP à la Terminale

Les fiches de révision couvrent désormais **tous les niveaux** (CP à Terminale), et non plus uniquement le collège.

### 10. Emails transactionnels brandés

Intégration Resend pour tous les emails (confirmation d'inscription, notifications de feedback, etc.) avec templates brandés Galac6.

---

## Fonctionnalités existantes à conserver sur le site

Ces fonctionnalités sont déjà présentes sur galac6.io et restent valides.

### Chat IA socratique
- L'IA guide l'élève par étapes au lieu de donner la réponse
- Adapté au niveau scolaire (CP à Terminale)
- Basé sur les programmes officiels Éduscol
- Détection automatique de la matière
- Jusqu'à **8 conversations simultanées** en onglets
- Historique des conversations avec panneau latéral

### Mode Quiz interactif
- QCM + questions ouvertes
- Correction détaillée par l'IA
- XP et gamification
- **Nouveau :** saisie vocale des formules math

### Mode Dictée vocale
- Générée par l'IA ou texte personnalisé
- 4 niveaux de difficulté (facile → compétition)
- 3 longueurs (flash, normal, compétition)
- Correction détaillée avec note sur 10
- Graphique de progression et historique
- **Nouveau :** voix Gemini, vitesse réglable, mode papier, diversité des textes

### Fiches de révision IA
- Basées sur les programmes Éduscol (CP à Terminale)
- Chapitres et sous-thèmes officiels sélectionnables
- Mindmaps et diagrammes Mermaid
- Mode complet ou synthétique (pense-bête)
- Export PDF
- Point d'approfondissement personnalisable

### Apprends le dev (Scratch / Python)
- Scratch (primaire et début collège)
- Python (collège et lycée / NSI)
- 3 niveaux par langage (débutant, intermédiaire, confirmé)
- Parcours structurés (chapitres → leçons → exercices)

### Éditeur de formules mathématiques
- Éditeur WYSIWYG MathLive
- Clavier mathématique virtuel
- Fractions, exposants, racines, lettres grecques

### Saisie vocale (Whisper)
- Dicter ses questions au micro
- Chrome/Edge : reconnaissance native
- Safari/iOS : transcription Whisper
- Dictée vocale de formules mathématiques

### OCR sur photos
- Coller ou photographier un exercice
- Extraction de texte automatique par l'IA
- Fonctionne dans le chat, quiz, fiches, corrections

### Tableau de bord parent (admin)
- Gestion des élèves (ajout, suppression, aménagements)
- Historique de toutes les conversations
- Rapports de progression (radar par matière, courbes, export PDF)
- Plans de remédiation personnalisés par l'IA
- Personnalisation du prompt IA
- Suivi de consommation et facturation
- **Nouveau :** contrôle du temps d'écran

### Support multi-élèves
- Plusieurs profils d'élèves par compte
- Sélecteur rapide dans le chat
- Données et progression indépendantes

### 11 matières scolaires
Mathématiques, Français, Histoire-Géo, Physique-Chimie, SVT, Anglais, Espagnol, Allemand, Philosophie, SES, Informatique.

### Du CP à la Terminale (+ Bac+5)
17 niveaux scolaires : CP, CE1, CE2, CM1, CM2, 6ème, 5ème, 4ème, 3ème, Seconde, Première, Terminale, Bac+1 à Bac+5.

### Programmes Éducation Nationale
Contenus alignés sur les programmes officiels publiés sur eduscol.education.fr (Bulletin Officiel). Badge tricolore dans l'interface.

---

## Fonctionnalités à mettre en avant — Priorité haute

### Section « Pour l'élève » — ajouter

| Fonctionnalité | Copy suggéré |
|---|---|
| **Gamification** | Gagne de l'XP, débloque des badges, relève des défis quotidiens et personnalise ton univers. |
| **Boutique cosmétique** | 16 fonds d'écran thématiques à débloquer avec tes coins (nature, espace, gaming, Japon…). |
| **Saisie vocale** | Dicte tes questions et formules math à l'oral. L'IA transcrit et convertit automatiquement. |
| **Mode pense-bête** | Fiches ultra-compactes pour la révision de dernière minute. |
| **Vitesse de dictée** | Choisis ta vitesse : lent, normal ou rapide. La dictée s'adapte à toi. |
| **Accessibilité** | Modes dyslexie, dyspraxie, malvoyant, malentendant pour une lecture confortable. |

### Section « Pour le parent » — ajouter

| Fonctionnalité | Copy suggéré |
|---|---|
| **Temps d'écran** | Définissez des limites quotidiennes par enfant. Avertissement et blocage automatiques. |
| **Rapports PDF** | Radar par matière, courbe de progression, plans de remédiation. Export PDF pour les réunions. |
| **Remédiation IA** | L'IA analyse les erreurs récurrentes et propose un plan ciblé avec exercices adaptés. |
| **Aménagements** | Activez les adaptations d'affichage pour les besoins spécifiques de votre enfant. |

### Nouvelle section « Pour l'école »

| Fonctionnalité | Copy suggéré |
|---|---|
| **Console école** | Gérez tous vos élèves depuis une interface centralisée. |
| **Codes d'invitation** | Affiliez les élèves en un clic grâce aux codes d'invitation par établissement. |
| **Temps d'écran école** | Contrôlez le temps d'utilisation pour chaque élève affilié. |
| **Aménagements par classe** | Activez les adaptations d'accessibilité directement depuis le panneau école. |

### Nouvelle section « Accessibilité »

| Fonctionnalité | Détail |
|---|---|
| **Dyslexie** | Police OpenDyslexic, espacement augmenté |
| **Dyspraxie** | Zones cliquables élargies, focus épais |
| **Mal voyant** | Texte agrandi, graisse renforcée |
| **Mal entendant** | Lecture vocale de tout contenu |
| **Mode sombre / clair / auto** | Thème adapté à l'environnement |
| **Taille de police ajustable** | Contrôle direct dans l'en-tête |
| **Saisie vocale** | Alternative au clavier |
| **Interface FR / EN** | Bilingue français-anglais |

### Nouvelle section « Gamification »

1. **XP et niveaux** — Chaque activité rapporte de l'XP. 100 XP = 1 niveau.
2. **23 badges à collectionner** — Du Commun au Légendaire, dans 6 catégories.
3. **3 défis quotidiens** — Missions renouvelées chaque jour pour gagner de l'XP bonus.
4. **Coins et boutique** — Monnaie virtuelle pour débloquer 16 fonds d'écran thématiques.
5. **Séries (streaks)** — Jours consécutifs d'utilisation, avec badges dédiés.

> **Copy hero :** "Un vrai système de jeu au service de l'apprentissage. XP, badges, défis quotidiens, boutique cosmétique — votre enfant ne voudra plus s'arrêter de réviser."

---

## Éléments à vérifier / corriger sur galac6.io

| Point | Statut |
|---|---|
| « 12 matières scolaires » | **Vérifier** — 11 matières implémentées dans le code (Maths, Français, Histoire-Géo, Physique-Chimie, SVT, Anglais, Espagnol, Allemand, Philo, SES, Informatique) |
| « Blocage des sites et apps IA concurrents » | **À nuancer** — Fonctionnalité non implémentée dans l'app. Une application dédiée est annoncée « bientôt disponible ». Reformuler en mention future. |
| Prix affichés | **À vérifier** — L'app facture ~10€/enfant/mois + 1-5€ d'usage IA. S'assurer que la page pricing est cohérente. |

---

## Résumé des chiffres clés pour le site

| Métrique | Valeur |
|---|---|
| Niveaux scolaires | CP à Terminale (17 niveaux, extensible Bac+5) |
| Matières | 11 matières conformes Éducation Nationale |
| Badges | 23 badges, 6 catégories, 4 niveaux de rareté |
| Fonds d'écran | 16 thèmes cosmétiques déblocables |
| Défis quotidiens | 3 par jour, renouvelés automatiquement |
| Conversations simultanées | Jusqu'à 8 onglets |
| Modes d'apprentissage | 5 (chat, quiz, dictée, fiches, dev) |
| Aménagements | 4 profils (dyslexie, dyspraxie, malvoyant, malentendant) |
| Langues interface | 2 (FR, EN) |
| Langues enseignées | 4 (anglais, espagnol, allemand + français) |
| Export | PDF (fiches de révision, rapports de progression) |

---

## Stack technique (pour page « À propos » ou footer)

| Composant | Technologie |
|---|---|
| IA conversationnelle | Anthropic Claude (Haiku + Sonnet) |
| Voix dictée | Google Gemini 2.5 Flash TTS |
| Transcription vocale | OpenAI Whisper |
| Formules math | MathLive + KaTeX |
| Diagrammes | Mermaid |
| Hébergement | Supabase (Europe), Netlify |
| Conformité | RGPD, données en Europe, Made in France |
