# Spécifications — Page Web Publique Galac6

## Objectif

Refondre la page marketing/pricing du site web public Galac6 pour refléter le nouveau modèle freemium à 3 plans : **Gratuit**, **Mensuel** (13,99€/mois), **Annuel** (9,99€/mois — 119,88€/an).

---

## 1. Structure de la page

### 1.1 Header / Navigation

```
[Logo Galac6] ────────────────────── [Se connecter] [Commencer gratuitement →]
```

- Logo : icône sparkle violet + texte "Galac6" (le "6" en indigo)
- CTA primaire : "Commencer gratuitement" → redirige vers `/` (LoginPage, mode signup)
- CTA secondaire : "Se connecter" → redirige vers `/` (LoginPage, mode login)

### 1.2 Hero Section

```
Badge:   [🎓 Du primaire au lycée]
Titre:   L'IA qui apprend aux élèves.
Sous-titre: Un assistant éducatif qui guide par la méthode socratique.
           Commencez gratuitement, sans carte bancaire.

[3 features en ligne: Méthode socratique | Dictées, quiz, fiches | Programmes EN]
```

### 1.3 Section Pricing — 3 colonnes

**Layout responsive :** 3 colonnes sur desktop, stack vertical sur mobile.

#### Colonne 1 : Gratuit

```
┌──────────────────────┐
│       GRATUIT        │
│        0 €           │
│   Pour découvrir     │
│                      │
│  ✅ 5 messages/jour  │
│  ✅ 1 quiz/jour      │
│  ✅ 1 dictée/jour    │
│  🔒 Synthèse vocale  │
│  🔒 Upload d'images  │
│  🔒 Saisie vocale    │
│  🔒 Remédiation      │
│                      │
│ [Commencer gratuit →]│ ← outline button
└──────────────────────┘
```

- Bouton outline (secondaire) → redirige vers signup
- Pas besoin de Stripe

#### Colonne 2 : Mensuel

```
┌──────────────────────┐
│       MENSUEL        │
│     13,99 €/mois     │
│   Sans engagement    │
│                      │
│  ✅ Messages illimités│
│  ✅ Quiz illimités    │
│  ✅ Dictées illimitées│
│  ✅ Synthèse vocale   │
│  ✅ Upload d'images   │
│  ✅ Saisie vocale     │
│  ✅ Remédiation       │
│                      │
│ [S'abonner →]        │ ← primary button (gradient indigo→violet)
└──────────────────────┘
```

- Bouton → appel API `create-public-checkout` avec `plan_type: "monthly"`
- Redirige vers Stripe Checkout

#### Colonne 3 : Annuel (mise en avant)

```
┌──────────────────────┐
│    ✨ -29% badge     │ ← badge flottant au-dessus
│       ANNUEL         │
│     9,99 €/mois      │
│  Facturé 119,88€/an  │
│                      │
│  ✅ Messages illimités│
│  ✅ Quiz illimités    │
│  ✅ Dictées illimitées│
│  ✅ Synthèse vocale   │
│  ✅ Upload d'images   │
│  ✅ Saisie vocale     │
│  ✅ Remédiation       │
│                      │
│ [S'abonner →]        │ ← primary button (gradient)
│ Annulez à tout moment│
└──────────────────────┘
```

- Bordure indigo/violet, background indigo/5%
- Badge "-29%" en position absolute au-dessus de la card
- Bouton → appel API `create-public-checkout` avec `plan_type: "annual"`

### 1.4 Section Confiance

```
[🛡️ Données hébergées en Europe] [📊 Suivi parental en temps réel] [🎧 Support réactif]
```

### 1.5 Section FAQ (optionnel)

Questions courantes :
- "Puis-je essayer gratuitement ?" → Oui, le plan gratuit est disponible sans carte.
- "Puis-je changer de plan ?" → Oui, à tout moment depuis l'espace parent.
- "Comment fonctionne le parrainage ?" → Chaque utilisateur a un code unique...
- "Combien d'enfants ?" → L'abonnement couvre 1 licence. Ajoutez d'autres depuis le portail.

### 1.6 Footer

Identique au footer existant (liens légaux, CGU, mentions, made in France).

---

## 2. Appel API — Checkout public

### Endpoint

```
POST {SUPABASE_URL}/functions/v1/create-public-checkout
```

### Headers

```
Content-Type: application/json
apikey: {SUPABASE_ANON_KEY}
```

### Body

```json
{
  "plan_type": "monthly" | "annual",
  "success_url": "https://galac6.fr/subscribe?success=true",
  "cancel_url": "https://galac6.fr/subscribe"
}
```

### Response

```json
{
  "url": "https://checkout.stripe.com/..."
}
```

Le frontend redirige vers `url` pour le paiement Stripe.

---

## 3. Page de succès post-paiement

Quand `?success=true` est dans l'URL :

```
┌──────────────────────────────┐
│         🎉                   │
│  Bienvenue dans Galac6 !     │
│                              │
│  Votre abonnement est actif. │
│  Créez votre compte pour     │
│  commencer.                  │
│                              │
│  [Créer mon compte →]        │
│                              │
│  (utiliser le même email     │
│   que pour le paiement)      │
└──────────────────────────────┘
```

Le paramètre `customer_email` peut être récupéré de l'URL pour pré-remplir le champ email à l'inscription.

---

## 4. Design System

### Couleurs

| Token | Valeur | Usage |
|-------|--------|-------|
| `bg-primary` | `#080b14` | Fond de page |
| `indigo-500` | `#6366f1` | CTA, accents |
| `violet-500` | `#8b5cf6` | Gradient CTA |
| `emerald-400` | `#34d399` | Checkmarks |
| `slate-400` | `#94a3b8` | Texte secondaire |
| `white/[0.06]` | semi-transparent | Bordures cards |

### Typography

- Titres : `font-extrabold`, tailles `text-4xl` à `text-6xl`
- Corps : `text-sm` à `text-lg`, couleur `slate-400/80`
- Badges : `text-xs font-semibold`, background gradient

### Boutons

- **Primary** : `bg-gradient-to-r from-indigo-500 to-violet-500`, texte blanc, `h-12 rounded-xl`
- **Outline** : bordure `white/10`, texte `slate-300`, hover `bg-white/5`
- **Ghost** : pas de background, texte `slate-400`, hover `text-white`

### Effets

- Background mesh : 2-3 cercles flous (`blur-[150px]`) en indigo/violet, `opacity < 10%`
- Cards : `border border-white/[0.06] bg-white/[0.02]`, `rounded-2xl`
- Card annuel : `border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.06]`

---

## 5. Responsive

| Breakpoint | Layout pricing | Remarques |
|------------|----------------|-----------|
| < 768px | Stack vertical, full width | Cards empilées, plan annuel en premier |
| 768px+ | 3 colonnes `grid-cols-3` | |

Sur mobile, réordonner pour mettre le plan annuel en premier (meilleur rapport qualité/prix).

---

## 6. SEO / Meta

```html
<title>Galac6 — L'IA qui apprend aux élèves | Tarifs</title>
<meta name="description" content="Assistant éducatif IA basé sur les programmes de l'Éducation Nationale. Gratuit pour commencer, à partir de 9,99€/mois. Du primaire au lycée.">
<meta property="og:title" content="Galac6 — Tarifs">
<meta property="og:description" content="L'IA éducative pour vos enfants. Essayez gratuitement.">
<meta property="og:image" content="https://galac6.fr/og-pricing.png">
```

---

## 7. Suivi Analytics (suggestions)

| Event | Trigger |
|-------|---------|
| `pricing_page_view` | Chargement de la page |
| `pricing_plan_click` | Clic sur un bouton d'abonnement |
| `pricing_free_signup` | Clic sur "Commencer gratuitement" |
| `pricing_checkout_redirect` | Redirection vers Stripe |
| `pricing_success_view` | Page succès affichée |

---

## 8. Variables d'environnement requises

```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

Pas besoin des Stripe Price IDs côté frontend — ils sont gérés côté backend (Edge Functions).

---

## 9. Référence de code existant

L'app Galac6 (ce repo) contient déjà une `PricingPage.tsx` fonctionnelle en `src/pages/PricingPage.tsx` avec :
- Le layout 3 colonnes (Free / Mensuel / Annuel)
- L'appel `createPublicCheckout(planType)`
- La page de succès post-paiement
- Le design system complet (fond sombre, gradient indigo→violet, mesh effects)

Ce fichier peut servir de **référence directe** pour le site public.
