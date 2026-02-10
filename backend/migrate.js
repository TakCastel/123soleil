require('dotenv').config();

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { runSetup } = require('./setup');

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL || process.env.DIRECTUS_ADMIN_EMAIL;
const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD || process.env.DIRECTUS_ADMIN_PASSWORD;

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PUBLIC_DIR = path.join(process.cwd(), 'frontend', 'public');

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
  if (!DIRECTUS_EMAIL || !DIRECTUS_PASSWORD) throw new Error('DIRECTUS_EMAIL/DIRECTUS_PASSWORD manquants.');
  const res = await jsonRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSWORD })
  });
  return res?.data?.access_token;
};

const getAuthHeaders = (token) => ({ Authorization: `Bearer ${token}` });

const getMimeType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const map = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4', '.webm': 'video/webm' };
  return map[ext] || 'application/octet-stream';
};

const resolvePublicAsset = (assetPath) => {
  if (!assetPath) return null;
  const normalized = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
  return path.join(PUBLIC_DIR, normalized);
};

const fileCache = new Map();
const uploadFile = async (filePath, token) => {
  if (!filePath || !fs.existsSync(filePath)) return null;
  if (fileCache.has(filePath)) return fileCache.get(filePath);
  const buffer = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const formData = new FormData();
  formData.append('file', new Blob([buffer], { type: getMimeType(filePath) }), fileName);
  const response = await fetch(`${DIRECTUS_URL}/files`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: formData
  });
  if (!response.ok) throw new Error(`Upload échoué ${response.status}`);
  const result = await response.json();
  const fileId = result?.data?.id;
  fileCache.set(filePath, fileId);
  return fileId;
};

const findBySlug = async (collection, slug, token) => {
  const res = await jsonRequest(`/items/${collection}?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`, { headers: getAuthHeaders(token) });
  return res?.data?.[0] || null;
};

const upsertItem = async (collection, slug, payload, token) => {
  const existing = await findBySlug(collection, slug, token);
  if (existing) {
    await jsonRequest(`/items/${collection}/${existing.id}`, { method: 'PATCH', headers: getAuthHeaders(token), body: JSON.stringify(payload) });
    return existing.id;
  }
  const res = await jsonRequest(`/items/${collection}`, { method: 'POST', headers: getAuthHeaders(token), body: JSON.stringify(payload) });
  return res?.data?.id;
};

const migrateActualites = async (token) => {
  const dir = path.join(CONTENT_DIR, 'actualites');
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const slug = file.replace(/\.md$/, '');
    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
    const imageId = await uploadFile(resolvePublicAsset(data.image), token);
    await upsertItem('actualites', slug, {
      slug,
      titre: data.titre || '',
      sous_titre: data.sous_titre || data.description || '',
      date: data.date || null,
      body: content || '',
      image: imageId,
      categorie: data.categorie || ''
    }, token);
  }
};

const migrateMediations = async (token) => {
  const dir = path.join(CONTENT_DIR, 'projets');
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(dir, file);
    const slug = file.replace(/\.md$/, '');
    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
    const imageId = await uploadFile(resolvePublicAsset(data.image), token);
    const videoId = await uploadFile(resolvePublicAsset(data.video_url), token);
    const year = data.annee || new Date().getFullYear();
    const dateValue = data.date || `${year}-01-01T00:00:00.000Z`;
    await upsertItem('mediations', slug, {
      slug,
      titre: data.titre || '',
      sous_titre: data.sous_titre || data.description || '',
      date: dateValue,
      body: content || '',
      image: imageId,
      video: videoId,
      categorie: data.categorie || ''
    }, token);
  }
};

const getHomeSettingsId = async (token) => {
  const res = await jsonRequest('/items/home_settings?fields=id', { headers: getAuthHeaders(token) });
  return res?.data?.id;
};

const migrateHomeSettings = async (token) => {
  const heroImages = [];
  const accueilPath = path.join(CONTENT_DIR, 'pages', 'accueil.md');
  if (fs.existsSync(accueilPath)) {
    const { data } = matter(fs.readFileSync(accueilPath, 'utf8'));
    if (data.hero_image) heroImages.push(data.hero_image);
  }
  const imageDir = path.join(PUBLIC_DIR, 'images');
  if (fs.existsSync(imageDir)) {
    const extra = fs.readdirSync(imageDir)
      .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
      .map((f) => `/images/${f}`);
    heroImages.push(...extra);
  }
  const uniqueImages = [...new Set(heroImages)].slice(0, 10);
  const fileIds = [];
  for (const image of uniqueImages) {
    const id = await uploadFile(resolvePublicAsset(image), token);
    if (id) fileIds.push(id);
  }
  const homeSettingsId = await getHomeSettingsId(token);
  if (!homeSettingsId) throw new Error('Impossible de trouver home_settings (id manquant).');

  await jsonRequest(`/items/home_settings/${homeSettingsId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ hero_image_ids: fileIds })
  });
};

const runMigration = async () => {
  await runSetup();
  const token = await login();
  await migrateActualites(token);
  await migrateMediations(token);
  await migrateHomeSettings(token);
};

if (require.main === module) {
  runMigration()
    .then(() => console.log('✅ Migration terminée.'))
    .catch((err) => {
      console.error('❌ Erreur migration:', err.message);
      process.exit(1);
    });
}

module.exports = { runMigration };
