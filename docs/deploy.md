# Déploiement (CI/CD)

Au **push sur la branche `main`**, GitHub Actions déploie automatiquement sur le serveur : `git pull`, `docker compose up --build`, puis application du schéma Directus (`backend/schema.json` via `directus:schema:apply`).

## Prérequis sur le serveur

1. **Docker** et **Docker Compose** installés.
2. **Git** : le dépôt cloné dans un répertoire (ex. `/home/user/123soleil`).
3. **Fichier `.env`** à la racine du projet (même structure que `config/example.env`), avec les variables pour Directus, Postgres, etc.
4. **Accès SSH** : une clé SSH dont la partie **publique** est dans `~/.ssh/authorized_keys` du serveur (pour que GitHub Actions puisse se connecter).

## Secrets GitHub

Dans le dépôt GitHub : **Settings → Secrets and variables → Actions → New repository secret**.

Ajouter :

| Secret | Description |
|--------|-------------|
| `SSH_HOST` | Adresse du serveur (IP ou nom de domaine). |
| `SSH_USER` | Utilisateur SSH (ex. `deploy` ou `root`). |
| `SSH_PRIVATE_KEY` | Contenu **complet** de la clé privée SSH (celle qui correspond à la clé publique sur le serveur). |
| `DEPLOY_PATH` | Chemin du projet sur le serveur (ex. `/home/deploy/123soleil`). |
| `DIRECTUS_ADMIN_EMAIL` | Email admin Directus (prod) pour appliquer le schéma. |
| `DIRECTUS_ADMIN_PASSWORD` | Mot de passe admin Directus (prod). |

## Première mise en place sur le serveur

1. Cloner le dépôt : `git clone https://github.com/.../123soleil.git` (ou SSH).
2. Copier `config/example.env` vers `.env` et remplir les valeurs (prod).
3. Lancer une fois : `docker compose up -d --build`, attendre que Directus soit prêt, puis `npm run directus:setup` (ou appliquer le schéma depuis la machine locale si tu as déjà `backend/schema.json`).
4. S’assurer que la branche suivie est `main` : `git branch -M main` si besoin.

Ensuite, chaque push sur `main` déclenchera le déploiement et l’application du schéma.

## Schéma Directus : local → prod

Pour que les changements de schéma (nouveaux champs, collections) soient appliqués en prod :

1. En **local** : modifier le schéma dans l’interface Directus (ou éditer `backend/schema.json`).
2. Si tu as modifié dans l’interface : `npm run directus:schema:export` puis commiter `backend/schema.json`.
3. Push sur `main` → la CI exécute `directus:schema:apply` sur le serveur → le schéma prod est aligné.

## Branche

Le workflow se déclenche sur **`main`**. Si tu utilises **`master`**, éditer `.github/workflows/deploy.yml` et remplacer `branches: [main]` par `branches: [master]`.
