## Structure

- **`frontend/`** – site Next.js (src, public, etc.)
- **`backend/`** – Directus (schéma, scripts : setup, migrate, export/apply du schéma)
- À la racine : `docker-compose.yml`, `.env`, scripts npm (dev, deploy, directus:*)

## Développement local (voir les modifs en direct)

**Docker** build une image avec le code au moment du build : les changements dans tes fichiers ne sont **pas** vus par le conteneur. Tu vois donc l’ancienne version sur localhost:3000.

Pour le **dev avec hot-reload** (modifs visibles tout de suite) :

1. **Arrête le conteneur front** (si Docker tourne) :  
   `docker compose stop web`

2. **Lance le front en local** :  
   `npm run dev`  
   → Le site est sur http://localhost:3000, chaque sauvegarde se met à jour.

3. **Si tu as besoin de Directus** (actualités, projets, etc.) :  
   Lance seulement Postgres + Directus en Docker :  
   `docker compose up postgres directus -d`  
   Puis `npm run dev` pour le front. Le front en local parlera à Directus sur localhost:8055.

Pour **tester la version “prod”** (build + Docker) :  
`docker compose up --build` puis aller sur localhost:3000 (il faut rebuild pour voir les derniers changements).

---

## Déploiement automatique (CI/CD)

Chaque **push sur `main`** déclenche un déploiement sur le serveur (GitHub Actions) : mise à jour du code, rebuild des conteneurs, application du schéma Directus.  
→ Voir **`docs/deploy.md`** pour configurer les secrets GitHub et le serveur.

---

## Migration DB Directus (local → VPS)

Le script **`backend/migrate-directus-db.sh`** : dump la DB locale, stream en SSH vers le VPS, restaure et redémarre Directus (option `--backup` pour sauvegarder la DB VPS avant).  
→ Détail et variables : **`backend/README.md`** (section « Migration DB »).

### Point critique: Basic Auth
Ne pas activer de Basic Auth global sur `api.123soleil-cinema.fr`.
Sinon `/auth/login` renvoie 401 et la connexion Directus est impossible.
Si besoin, proteger le front uniquement, ou exclure explicitement `/auth/*`.
