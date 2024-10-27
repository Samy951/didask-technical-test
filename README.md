# Didask Technical Test - Markdown Stream Parser

Ce repository contient deux implémentations du parseur Markdown streaming.

## Contexte
Test technique pour Didask : Création d'un parseur Markdown en streaming qui traite le texte par petits morceaux (chunks) et affiche le rendu en temps réel.

### Fonctionnalités demandées
- Parsing de texte en streaming (chunk par chunk)
- Gestion de :
  - Lignes de texte (avec gestion des espaces de fin)
  - Titres (h1, h2, h3)
  - Code inline
  - Blocs de code multi-lignes
- Rendu optimiste (affichage progressif)

## /vanilla
Version demandée dans le test technique : une implémentation simple en JavaScript dans un fichier HTML unique.
- Parsing en temps réel
- Rendu DOM direct
- Code auto-contenu

## /typescript
Version bonus montrant une implémentation plus avancée avec :
- TypeScript
- Architecture modulaire
- Tests unitaires
- CI/CD
- Bonnes pratiques de développement

## Utilisation
[À compléter une fois les implémentations terminées]