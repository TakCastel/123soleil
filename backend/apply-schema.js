/**
 * Applique le schéma depuis backend/schema.json (API /schema/diff + /schema/apply),
 * puis assure que l’enregistrement singleton Home Settings existe.
 *
 * Usage: npm run directus:schema:apply
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const DIRECTUS_URL = process.env.DIRECTUS_URL || process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL || process.env.DIRECTUS_ADMIN_EMAIL;
const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD || process.env.DIRECTUS_ADMIN_PASSWORD;

const jsonRequest = async (pathName, options = {}) => {
  const response = await fetch(`${DIRECTUS_URL}${pathName}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Directus ${response.status}: ${text}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : {};
};

/** Retourne { hash, diff } ou null si 204 / pas de changement. */
const getSchemaDiff = async (token, snapshot) => {
  const res = await fetch(`${DIRECTUS_URL}/schema/diff`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(snapshot)
  });
  if (res.status === 204) return null;
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Directus ${res.status}: ${text}`);
  }
  const body = await res.json();
  return body?.hash && body?.diff ? body : null;
};

const login = async () => {
  if (!DIRECTUS_EMAIL || !DIRECTUS_PASSWORD) {
    throw new Error(
      'Identifiants manquants dans .env. Définir DIRECTUS_EMAIL et DIRECTUS_PASSWORD (ou DIRECTUS_ADMIN_EMAIL et DIRECTUS_ADMIN_PASSWORD) avec le même email/mot de passe que l’admin Directus.'
    );
  }
  try {
    const res = await jsonRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSWORD })
    });
    return res?.data?.access_token;
  } catch (err) {
    if (err.message && err.message.includes('401')) {
      throw new Error(
        'Connexion Directus refusée (401). Vérifie dans .env : DIRECTUS_URL, DIRECTUS_EMAIL (ou DIRECTUS_ADMIN_EMAIL) et DIRECTUS_PASSWORD (ou DIRECTUS_ADMIN_PASSWORD) — ils doivent être identiques à ceux utilisés pour te connecter à l’interface admin (ex. http://localhost:8055/admin).'
      );
    }
    throw err;
  }
};

const ensureHomeSettingsItem = async (token) => {
  let data;
  try {
    const res = await jsonRequest('/items/home_settings?fields=id', {
      headers: { Authorization: `Bearer ${token}` }
    });
    data = res?.data;
  } catch (e) {
    if (e.message && e.message.includes('404')) data = null;
    else throw e;
  }
  if (data != null && typeof data === 'object' && data.id != null) return;
  await jsonRequest('/items/home_settings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({})
  });
  console.log('Enregistrement Home Settings créé.');
};

const ensureAboutSettingsItem = async (token) => {
  let data;
  try {
    const res = await jsonRequest('/items/about_settings?fields=id', {
      headers: { Authorization: `Bearer ${token}` }
    });
    data = res?.data;
  } catch (e) {
    if (e.message && (e.message.includes('404') || e.message.includes('403'))) {
      console.warn('About Settings : collection absente ou sans permission (lance "npm run directus:setup" pour créer la collection et la permission).');
      return;
    }
    throw e;
  }
  if (data != null && typeof data === 'object' && data.id != null) return;
  const defaultContent = `## L'ACTION DE
### L'ASSOCIATION

Chaque année, une douzaine de professionnels du cinéma, avec des bénévoles de l'association, organisent des ateliers cinéma.

Notre association, fondée par des habitués du cinéma Utopia, se met en lien avec des jeunes issus de diverses structures de la ville le temps d'une collaboration autour d'un court-métrage.

Chaque médiation est réalisée durant une journée, de l'écriture du scénario au tournage. Par la suite les films sont montés par les réalisateurs, parfois en présence des jeunes.

Depuis septembre 2017, 36 films ont été réalisés selon ce dispositif. Ces films sont diffusés lors de projections publiques au cinéma Utopia et dans le cadre de diverses soirées associatives.

Les fonds récoltés vont au bénéfice d'associations locales qui œuvrent auprès de personnes en situation de précarité et de fragilité.`;
  await jsonRequest('/items/about_settings', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ content: defaultContent })
  });
  console.log('Enregistrement About Settings créé.');
};

const run = async () => {
  const schemaPath = path.join(__dirname, 'schema.json');
  if (!fs.existsSync(schemaPath)) {
    console.error('Fichier backend/schema.json absent.');
    console.error('Première fois : lancez "npm run directus:setup", puis "npm run directus:schema:export".');
    process.exit(1);
  }

  const raw = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  // Le fichier peut être { data: { version, collections, ... } } (export API) ou le snapshot à la racine
  const snapshot = raw.data ?? raw;
  const token = await login();

  const diff = await getSchemaDiff(token, snapshot);

  if (diff && (diff.diff?.collections?.length || diff.diff?.fields?.length || diff.diff?.relations?.length)) {
    await jsonRequest('/schema/apply', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ hash: diff.hash, diff: diff.diff })
    });
    console.log('Schéma appliqué.');
  } else {
    console.log('Schéma déjà à jour.');
  }

  await ensureHomeSettingsItem(token);
  await ensureAboutSettingsItem(token);
};

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
