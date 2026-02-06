# Backend (Directus)

Tout ce qui concerne **Directus** (CMS) : schéma, scripts d’installation et de migration.

## Schéma en un fichier

- **`schema.json`** = snapshot officiel Directus (collections, champs, relations). Source de vérité.
- À chaque déploiement, la CI exécute `directus:schema:apply` pour aligner la prod.

## Commandes (depuis la racine du projet)

| Commande | Rôle |
|----------|------|
| `npm run directus:schema:export` | Exporte le schéma vers `backend/schema.json` (après modif en dev). |
| `npm run directus:schema:apply` | Applique `backend/schema.json` sur l’instance (à chaque déploiement). |
| `npm run deploy` | Lance les conteneurs (front + Directus + Postgres) puis applique le schéma. |

## Première fois (nouvelle env)

1. `docker compose up -d --build`
2. Attendre que Directus soit prêt (~30 s)
3. `npm run directus:setup` (crée les collections une fois)
4. `npm run directus:schema:export` (génère `backend/schema.json`)
5. Commiter `backend/schema.json`

## Modifier le schéma

- **Option A** : modifier dans l’interface Directus en dev, puis `npm run directus:schema:export`, commiter `schema.json`.
- **Option B** : éditer `backend/schema.json` à la main, puis `npm run directus:schema:apply` pour tester.

## Schéma local → prod

1. En local : modifie le schéma (interface ou `schema.json`).
2. Si modif dans l’interface : `npm run directus:schema:export` → commite `backend/schema.json`.
3. Push sur `main` → la CI déploie et exécute `directus:schema:apply` sur le serveur.

## Fichiers

- `schema.json` – snapshot du schéma (à versionner).
- `export-schema.js` / `apply-schema.js` – export / application du schéma.
- `setup.js` – première installation (collections, champs, relations).
- `migrate.js` – import de contenu (ex. Decap → Directus).
- `migrate-directus-db.sh` – migration DB (dump local → stream SSH → restauration VPS).

## Migration DB (local → VPS)

Depuis la **racine du projet** :
```bash
chmod +x backend/migrate-directus-db.sh
./backend/migrate-directus-db.sh --backup   # --backup = sauvegarde la DB VPS avant
```

Variables : `VPS_HOST`, `VPS_USER`, `VPS_DIR`, `POSTGRES_CONTAINER`, `DIRECTUS_CONTAINER`, `DB_USER`, `DB_NAME`, `FRONTEND_CONTAINER` (optionnel).  
Fichier optionnel (non versionné) **`backend/migrate-directus-db.env`** pour les définir, sinon le script charge le `.env` à la racine.
