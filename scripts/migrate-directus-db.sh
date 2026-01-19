#!/usr/bin/env bash
set -euo pipefail

env_file="${MIGRATE_DIRECTUS_ENV:-scripts/migrate-directus-db.env}"
root_env_file="${MIGRATE_DIRECTUS_ROOT_ENV:-.env}"
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
POSTGRES_CONTAINER=${POSTGRES_CONTAINER:-}
DIRECTUS_CONTAINER=${DIRECTUS_CONTAINER:-}
DB_USER=${DB_USER:-}
DB_NAME=${DB_NAME:-}
FRONTEND_CONTAINER=${FRONTEND_CONTAINER:-}

usage() {
  echo "Usage: $0 [--backup]"
  echo ""
  echo "Options:"
  echo "  --backup    Sauvegarde la DB du VPS avant ecrasement."
}

backup=false
if [[ "${1:-}" == "--backup" ]]; then
  backup=true
  shift
fi

if [[ "${1:-}" != "" ]]; then
  usage
  exit 1
fi

required_vars=(VPS_HOST VPS_USER VPS_DIR POSTGRES_CONTAINER DIRECTUS_CONTAINER DB_USER DB_NAME)
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

echo "==> Dump DB locale depuis le container ${POSTGRES_CONTAINER}"
dump_cmd=(docker exec -i "${POSTGRES_CONTAINER}" pg_dump -U "${DB_USER}" -d "${DB_NAME}")

remote_backup_cmd=""
if [[ "${backup}" == true ]]; then
  timestamp=$(date +"%Y%m%d_%H%M%S")
  backup_file="backup_directus_${timestamp}.sql"
  remote_backup_cmd="docker exec -i ${POSTGRES_CONTAINER} pg_dump -U ${DB_USER} -d ${DB_NAME} > ${backup_file}"
  echo "==> Backup VPS active : ${VPS_DIR}/${backup_file}"
fi

echo "==> Stream vers le VPS et restauration"
set -o pipefail
"${dump_cmd[@]}" | ssh "${remote}" "set -euo pipefail; cd ${VPS_DIR}; \
${remote_backup_cmd:+${remote_backup_cmd} && }\
docker exec -i ${POSTGRES_CONTAINER} psql -U ${DB_USER} -d ${DB_NAME} -c \"DROP SCHEMA public CASCADE; CREATE SCHEMA public;\" </dev/null; \
docker exec -i ${POSTGRES_CONTAINER} psql -U ${DB_USER} -d ${DB_NAME}; \
docker restart ${DIRECTUS_CONTAINER}; \
${FRONTEND_CONTAINER:+docker restart ${FRONTEND_CONTAINER}; }"

echo "==> Migration terminee."
