#!/usr/bin/env bash
set -euo pipefail

# Récupère la base Directus de la PROD (VPS) et la restaure en LOCAL.
# Depuis la racine du projet : ./backend/pull-directus-db.sh
# Mêmes variables que migrate-directus-db.sh (VPS_HOST, VPS_USER, VPS_DIR, etc.)
# Fichier optionnel : backend/migrate-directus-db.env

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
root_dir="$(cd "${script_dir}/.." && pwd)"
env_file="${MIGRATE_DIRECTUS_ENV:-${script_dir}/migrate-directus-db.env}"
root_env_file="${MIGRATE_DIRECTUS_ROOT_ENV:-.env}"

cd "${root_dir}"
if [[ -f "${env_file}" ]]; then
  # shellcheck disable=SC1090
  source "${env_file}"
elif [[ -f "${root_env_file}" ]]; then
  # shellcheck disable=SC1090
  source "${root_env_file}"
fi

VPS_HOST=${VPS_HOST:-}
VPS_USER=${VPS_USER:-}
VPS_DIR=${VPS_DIR:-}
POSTGRES_CONTAINER=${POSTGRES_CONTAINER:-postgres}
DB_USER=${DB_USER:-directus}
DB_NAME=${DB_NAME:-directus}
LOCAL_POSTGRES_CONTAINER=${LOCAL_POSTGRES_CONTAINER:-postgres}

required_vars=(VPS_HOST VPS_USER VPS_DIR)
missing=false
for var in "${required_vars[@]}"; do
  if [[ -z "${!var}" ]]; then
    echo "Variable manquante: ${var}"
    missing=true
  fi
done
if [[ "${missing}" == true ]]; then
  echo "Definissez les variables via env ou ${env_file}."
  exit 1
fi

remote="${VPS_USER}@${VPS_HOST}"

echo "==> Dump de la DB PROD (${remote}:${VPS_DIR})..."
echo "==> Vidage de la DB locale puis restauration..."
docker exec -i "${LOCAL_POSTGRES_CONTAINER}" psql -U "${DB_USER}" -d "${DB_NAME}" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" </dev/null 2>/dev/null || true

ssh "${remote}" "cd ${VPS_DIR} && docker exec -i ${POSTGRES_CONTAINER} pg_dump -U ${DB_USER} -d ${DB_NAME}" | \
  docker exec -i "${LOCAL_POSTGRES_CONTAINER}" psql -U "${DB_USER}" -d "${DB_NAME}" -q

echo "==> Restauration terminée. Redémarre Directus si besoin : docker compose restart directus"
