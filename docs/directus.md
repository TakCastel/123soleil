# Directus (backend)

Le backend est dans **`backend/`**. Pour les commandes, le schéma et la première installation : **`backend/README.md`**.

## Où est quoi ?

| Rôle | Où |
|------|-----|
| **Front (Next.js)** | **`frontend/`** |
| **Backend (Directus)** | **`backend/`** + conteneur Docker `directus` (port 8055) |
| **Schéma** | **`backend/schema.json`** |
| **Déploiement** | **`docs/deploy.md`** |

## Prérequis

- Docker + Docker Compose
- Variables d'environnement : copier `config/example.env` vers `.env` à la racine.

## Accès public (production)

Donner au rôle **Public** les droits **Lecture** sur : `mediations`, `actualites`, `home_settings`, `about_settings`, `directus_files`.  
Comme pour les autres collections : une requête sur la collection, point. Sans ça, le front renvoie 403.

- **home_settings** : 6 champs **courts_metrages**, **participants_region**, **projections**, **editions_festival**, **realisateurs**, **adherents** (section « Quelques chiffres »). (Les images du hero sont statiques : `frontend/public/hero/`.)
- **about_settings** : champ **content** (texte Markdown de la page Association). Si la permission manque, la page Association affiche le texte par défaut.

## Dépannage : sélection d'image dans le BO

Si la librairie d'images ne fonctionne pas pour une actualité/médiation : réappliquer le schéma (`npm run directus:schema:apply`) ou vérifier les relations vers `directus_files` dans Paramètres → Data Model.

## Appliquer le schéma depuis le serveur

```bash
docker compose exec web sh -lc "DIRECTUS_URL=http://directus:8055 DIRECTUS_EMAIL=... DIRECTUS_PASSWORD=... node /backend/apply-schema.js"
```

Remplace les identifiants par ceux de l'admin Directus (prod).
