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

**Nouvelle collection (ex. `about_settings`)** : si `directus:schema:apply` affiche « Schéma déjà à jour » alors que la collection n’existe pas encore (ou 403), lancer **`npm run directus:setup`** pour créer la collection, le singleton et la permission de lecture (même policy que `home_settings`).

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
- `pull-directus-db.sh` – récupère la DB de la prod et la restaure en local.

## Récupérer les contenus de la prod en local

Pour avoir la même base de données (et donc les mêmes contenus) qu’en production :

1. **Conteneurs locaux démarrés** : `docker compose up -d`
2. **Mêmes variables que la migration** : `VPS_HOST`, `VPS_USER`, `VPS_DIR`, etc. (fichier optionnel **`backend/migrate-directus-db.env`** ou `.env` à la racine).
3. **Lancer le script** depuis la racine du projet :
   ```bash
   ./backend/pull-directus-db.sh
   ```
4. **Fichiers (médias)** : la DB contient les métadonnées ; les fichiers sont dans le volume Directus. Pour les récupérer aussi, depuis ta machine (en adaptant chemins et noms de conteneurs) :
   ```bash
   mkdir -p backend/uploads
   rsync -avz "${VPS_USER}@${VPS_HOST}:${VPS_DIR}/uploads/" backend/uploads/
   docker compose cp backend/uploads/. directus:/directus/uploads/
   ```
   Ou copier manuellement le dossier `uploads` du VPS dans le volume du conteneur `directus`.

## Migration DB (local → VPS)

Depuis la **racine du projet** :
```bash
chmod +x backend/migrate-directus-db.sh
./backend/migrate-directus-db.sh --backup   # --backup = sauvegarde la DB VPS avant
```

Variables : `VPS_HOST`, `VPS_USER`, `VPS_DIR`, `POSTGRES_CONTAINER`, `DIRECTUS_CONTAINER`, `DB_USER`, `DB_NAME`, `FRONTEND_CONTAINER` (optionnel).  
Fichier optionnel (non versionné) **`backend/migrate-directus-db.env`** pour les définir, sinon le script charge le `.env` à la racine.
