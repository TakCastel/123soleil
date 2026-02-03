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

## Migration Directus prod

### Script de migration (local -> VPS)
Le script `scripts/migrate-directus-db.sh`:
- dump la DB locale via Docker
- stream le dump en SSH vers le VPS
- reset le schema public puis injecte le dump
- redemarre Directus (et optionnellement le front)
- option `--backup` pour sauvegarder la DB du VPS avant ecrasement

Exemple:
```bash
chmod +x scripts/migrate-directus-db.sh
./scripts/migrate-directus-db.sh --backup
```

Variables (override possible via env):
- `VPS_HOST`
- `VPS_USER`
- `VPS_DIR`
- `POSTGRES_CONTAINER`
- `DIRECTUS_CONTAINER`
- `DB_USER`
- `DB_NAME`
- `FRONTEND_CONTAINER` (optionnel)

Pour eviter d'avoir des infos sensibles en clair dans le repo, vous pouvez
creer un fichier local `scripts/migrate-directus-db.env` (non versionne) :
```bash
VPS_HOST=your.vps.ip.or.host
VPS_USER=your_ssh_user
VPS_DIR=/path/to/project
POSTGRES_CONTAINER=postgres
DIRECTUS_CONTAINER=directus
DB_USER=directus
DB_NAME=directus
FRONTEND_CONTAINER=frontend
```
Le script charge automatiquement ce fichier s'il existe, ou bien le `.env` a la
racine. Pour un autre chemin, utilisez `MIGRATE_DIRECTUS_ENV=/chemin/vers/fichier.env`.

### Point critique: Basic Auth
Ne pas activer de Basic Auth global sur `api.123soleil-cinema.fr`.
Sinon `/auth/login` renvoie 401 et la connexion Directus est impossible.
Si besoin, proteger le front uniquement, ou exclure explicitement `/auth/*`.
