# TontinePro

Application de gestion de tontines (PWA installable, fonctionne hors ligne).

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'application complète (HTML + CSS + JS) |
| `manifest.json` | Décrit l'app pour l'installation (nom, icônes, couleurs) |
| `sw.js` | Service worker — cache pour le mode hors ligne |
| `icon-192.png`, `icon-512.png` | Icônes de l'app |
| `icon-maskable-512.png` | Icône adaptative Android |
| `apple-touch-icon.png` | Icône iOS |

## Déploiement sur GitHub Pages

1. Créer un repo (ex. `tontinepro`) et y pousser **tous** ces fichiers à la racine.
2. Dans le repo : **Settings → Pages**.
3. Source : `Deploy from a branch`, branche `main`, dossier `/ (root)`.
4. Attendre 1–2 minutes, l'URL sera `https://<ton-compte>.github.io/tontinepro/`.

Tous les chemins sont **relatifs**, donc ça marche quel que soit le nom du repo,
sans rien modifier.

## Installation sur téléphone

- **Android / Chrome** : ouvrir l'URL → une bannière « Installer TontinePro »
  apparaît en bas. Sinon : menu ⋮ → « Ajouter à l'écran d'accueil ».
- **iPhone / Safari** : ouvrir l'URL → bouton **Partager** ⬆️ →
  « Sur l'écran d'accueil ». (iOS ne permet pas l'installation en un clic.)

> HTTPS est obligatoire pour qu'une PWA soit installable. GitHub Pages le
> fournit automatiquement.

## Mettre à jour l'app

Après avoir modifié `index.html`, **incrémenter la version du cache** en haut de
`sw.js` :

```js
const CACHE = 'tontinepro-v2';  // v1 → v2
```

Sans ça, les téléphones qui ont déjà installé l'app continueront d'afficher
l'ancienne version depuis leur cache.

## Où sont stockées les données

Dans le `localStorage` du navigateur, **sur l'appareil uniquement**. Elles ne
sont ni synchronisées entre appareils, ni sauvegardées en ligne. Vider les
données du navigateur ou désinstaller l'app les efface définitivement.
