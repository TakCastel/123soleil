/**
 * Exporte le schéma Directus (snapshot) dans backend/schema.json.
 * À lancer une fois après avoir appliqué le schéma (setup ou apply) pour figer l’état.
 *
 * Usage: npm run directus:schema:export
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

const login = async () => {
  if (!DIRECTUS_EMAIL || !DIRECTUS_PASSWORD) {
    throw new Error('DIRECTUS_EMAIL / DIRECTUS_PASSWORD (ou DIRECTUS_ADMIN_*) manquants dans .env');
  }
  const res = await jsonRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSWORD })
  });
  return res?.data?.access_token;
};

const run = async () => {
  const token = await login();
  const snapshot = await jsonRequest('/schema/snapshot', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const outPath = path.join(__dirname, 'schema.json');
  fs.writeFileSync(outPath, JSON.stringify(snapshot, null, 2), 'utf8');
  console.log('Schéma exporté dans backend/schema.json');
};

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
