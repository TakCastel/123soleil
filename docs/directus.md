# Migration Directus

## Prérequis
- Docker + Docker Compose
- Variables d’environnement (voir `config/example.env`)

## Démarrage local (Directus + Postgres + Front)
1. Copier `config/example.env` vers `.env` à la racine (ou exporter les variables).
2. Lancer: `docker compose up -d --build`

## Appliquer le schéma Directus
```bash
npm run directus:setup
```

## Migrer les contenus Decap -> Directus
```bash
npm run directus:migrate
```

## Notes
- Les images/vidéos sont importées depuis `public/images` et `public/videos`.
- Le script remplit la galerie `home_settings.hero_images` (max 10).
- Pour l’accès front, vous pouvez fournir un token Directus via `DIRECTUS_TOKEN`.
