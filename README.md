# Didask Technical Test - Markdown Stream Parser

Ce repository contient deux implémentations d'un parseur Markdown en streaming.

## Contexte

Test technique pour Didask : Création d'un parseur Markdown en streaming qui traite le texte par petits morceaux (chunks) et affiche le rendu en temps réel.

## Fonctionnalités demandées

Le parseur doit permettre :
- Le **parsing de texte en streaming** (traitement morceau par morceau).
- La gestion de :
  - **Lignes de texte** (avec gestion des espaces de fin).
  - **Titres** de niveau H1, H2, et H3.
  - **Code inline**.
  - **Blocs de code multi-lignes**.
- **Rendu optimiste** (affichage progressif) pour commencer à afficher les éléments partiels dès qu'ils sont détectés.

## Détails des Dossiers

- **vanilla/** : Version demandée dans le test technique, avec une implémentation simple en JavaScript dans un fichier HTML unique.
  - **Parsing en temps réel** : Le parseur traite le texte au fur et à mesure qu'il arrive.
  - **Rendu DOM direct** : Utilisation directe de DOM API pour le rendu.
  - **Code auto-contenu** : Pas de dépendances externes.

- **typescript/** : Version bonus montrant une implémentation en TypeScript avec une architecture plus modulaire.
  - **TypeScript** : Séparation du code en modules TypeScript pour une meilleure lisibilité et maintenabilité.
  - **Architecture modulaire** : Chaque composant est isolé pour faciliter la maintenance.
  - **Bonnes pratiques de développement** : Utilisation de Vite pour le bundling.

### Fonctionnalités

Le parseur prend en charge les éléments suivants :
- **Lignes de texte** : Rend les lignes en fonction des espaces de fin pour déterminer les sauts de ligne.
- **Titres** : Gère les titres H1, H2, et H3 de manière progressive (optimistique).
- **Code inline** : Gère le code inline en utilisant des backticks (`` ` ``) avec rendu progressif.
- **Blocs de code multi-lignes** : Supporte les blocs de code multi-lignes avec rendu progressif en utilisant des triple backticks (`` ``` ``).

## Utilisation

### Pour le dossier `vanilla`

1. Ouvrir le fichier `vanilla/index.html` dans un navigateur pour voir l'implémentation JavaScript en action.

### Pour le dossier `typescript`

1. Ouvrir un terminal et naviguer dans le dossier `typescript` :
   ```bash
   cd typescript
   npm install
   npm run dev

Cette version n'inclut pas de CI/CD ni de tests unitaires.