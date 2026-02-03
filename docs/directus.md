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

## Sélection d’image depuis la librairie (actualités / médiations)

Si, dans le backoffice, choisir une image depuis la librairie pour une actualité ou une médiation ne fonctionne pas, c’est en général que la **relation** entre la collection et `directus_files` n’est pas créée.

**Solution 1 – Réappliquer le schéma (recommandé)**  
Depuis la racine du projet (avec Directus démarré et identifiants admin dans l’env) :
```bash
npm run directus:setup
```
Le script crée désormais les relations M2O `mediations.image`, `mediations.video` et `actualites.image` vers `directus_files`. Après exécution, rafraîchir le backoffice et réessayer la sélection d’image.

**Solution 2 – Vérifier / créer la relation à la main**  
1. **Paramètres** (icône engrenage) → **Data Model**.  
2. Ouvrir la collection **Médiations** (ou **Actualités**).  
3. Cliquer sur le champ **Image** (ou **Vidéo** pour médiations).  
4. Dans la configuration du champ, vérifier qu’une **relation** vers la collection **Directus Files** est bien définie (type « Many to One », collection liée : `directus_files`).  
5. Si la relation n’existe pas : **Paramètres** → **Data Model** → onglet **Relations**, créer une relation :
   - **Collection (Many)** : `mediations` (ou `actualites`)
   - **Champ (Many)** : `image` (ou `video`)
   - **Collection (One)** : `directus_files`
   - **Champ (One)** : laisser vide.  
6. Enregistrer, puis rafraîchir la page et réessayer la sélection depuis la librairie.

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
