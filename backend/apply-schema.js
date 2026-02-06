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
    throw new Error('DIRECTUS_EMAIL / DIRECTUS_PASSWORD manquants dans .env');
  }
  const res = await jsonRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSWORD })
  });
  return res?.data?.access_token;
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

const run = async () => {
  const schemaPath = path.join(__dirname, 'schema.json');
  if (!fs.existsSync(schemaPath)) {
    console.error('Fichier backend/schema.json absent.');
    console.error('Première fois : lancez "npm run directus:setup", puis "npm run directus:schema:export".');
    process.exit(1);
  }

  const snapshot = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
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
};

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
