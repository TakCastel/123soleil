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

## Accès public (production)
Si les contenus doivent être publics, donnez au rôle **Public** les droits **READ** sur :
- `mediations`
- `actualites`
- `directus_files` (indispensable pour servir les images/vidéos via `/assets/:id`)

Sans ces droits, le front SSR échouera avec des erreurs 403.

## Générer les collections sur le serveur
Exécuter le setup Directus (création/patch des collections et champs) depuis le container `web` :
```bash
docker compose exec web sh -lc "DIRECTUS_URL=http://directus:8055 DIRECTUS_EMAIL=admin@example.com DIRECTUS_PASSWORD=ChangeMe123! npm run directus:setup"
```

Vous pouvez ensuite injecter les contenus si besoin :
```bash
docker compose exec web sh -lc "DIRECTUS_URL=http://directus:8055 DIRECTUS_EMAIL=admin@example.com DIRECTUS_PASSWORD=ChangeMe123! npm run directus:migrate"
```

Remplacez les identifiants par ceux de votre admin Directus (env `DIRECTUS_ADMIN_EMAIL` / `DIRECTUS_ADMIN_PASSWORD`).
