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
- Variables d’environnement : copier `config/example.env` vers `.env` à la racine.

## Accès public (production)

Donner au rôle **Public** les droits **READ** sur : `mediations`, `actualites`, `home_settings`, `home_settings_files`, `directus_files`.  
Sans ça, le front SSR peut renvoyer 403.

## Dépannage : sélection d’image dans le BO

Si la librairie d’images ne fonctionne pas pour une actualité/médiation : réappliquer le schéma (`npm run directus:schema:apply`) ou vérifier les relations vers `directus_files` dans Paramètres → Data Model.

## Appliquer le schéma depuis le serveur

```bash
docker compose exec web sh -lc "DIRECTUS_URL=http://directus:8055 DIRECTUS_EMAIL=... DIRECTUS_PASSWORD=... node /backend/apply-schema.js"
```

Remplace les identifiants par ceux de l’admin Directus (prod).
