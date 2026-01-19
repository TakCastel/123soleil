require('dotenv').config();

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { runSetup } = require('./setup');

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL || process.env.DIRECTUS_ADMIN_EMAIL;
const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD || process.env.DIRECTUS_ADMIN_PASSWORD;

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

const jsonRequest = async (pathName, options = {}) => {
  const response = await fetch(`${DIRECTUS_URL}${pathName}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });

  if (response.ok) {
    const text = await response.text();
    if (!text) return {};
    return JSON.parse(text);
  }

  const errorText = await response.text();
  const method = options.method || 'GET';
  const error = new Error(`Directus ${response.status} (${method} ${pathName}): ${errorText}`);
  error.status = response.status;
  throw error;
};

const login = async () => {
  if (!DIRECTUS_EMAIL || !DIRECTUS_PASSWORD) {
    throw new Error('DIRECTUS_EMAIL/DIRECTUS_PASSWORD manquants.');
  }

  const response = await jsonRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: DIRECTUS_EMAIL,
      password: DIRECTUS_PASSWORD
    })
  });

  return response?.data?.access_token;
};

const getAuthHeaders = (token) => ({
  Authorization: `Bearer ${token}`
});

const getMimeType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.png') return 'image/png';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.mp4') return 'video/mp4';
  if (ext === '.webm') return 'video/webm';
  return 'application/octet-stream';
};

const resolvePublicAsset = (assetPath) => {
  if (!assetPath) return null;
  const normalized = assetPath.startsWith('/')
    ? assetPath.slice(1)
    : assetPath;
  return path.join(PUBLIC_DIR, normalized);
};

const fileCache = new Map();

const uploadFile = async (filePath, token) => {
  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  if (fileCache.has(filePath)) {
    return fileCache.get(filePath);
  }

  const buffer = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const formData = new FormData();
  formData.append('file', new Blob([buffer], { type: getMimeType(filePath) }), fileName);

  const response = await fetch(`${DIRECTUS_URL}/files`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: formData
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload échoué ${response.status}: ${errorText}`);
  }

  const result = await response.json();
  const fileId = result?.data?.id;
  fileCache.set(filePath, fileId);
  return fileId;
};

const findBySlug = async (collection, slug, token) => {
  const response = await jsonRequest(
    `/items/${collection}?filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`,
    { headers: getAuthHeaders(token) }
  );
  return response?.data?.[0] || null;
};

const upsertItem = async (collection, slug, payload, token) => {
  const existing = await findBySlug(collection, slug, token);
  if (existing) {
    await jsonRequest(`/items/${collection}/${existing.id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(token),
      body: JSON.stringify(payload)
    });
    return existing.id;
  }

  const response = await jsonRequest(`/items/${collection}`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload)
  });
  return response?.data?.id;
};

const migrateActualites = async (token) => {
  const actualitesDir = path.join(CONTENT_DIR, 'actualites');
  if (!fs.existsSync(actualitesDir)) return;

  const files = fs.readdirSync(actualitesDir).filter((file) => file.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(actualitesDir, file);
    const slug = file.replace(/\.md$/, '');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const imagePath = resolvePublicAsset(data.image);
    const imageId = await uploadFile(imagePath, token);

    await upsertItem(
      'actualites',
      slug,
      {
        slug,
        titre: data.titre || '',
        sous_titre: data.sous_titre || data.description || '',
        date: data.date || null,
        body: content || '',
        image: imageId,
        categorie: data.categorie || ''
      },
      token
    );
  }
};

const migrateMediations = async (token) => {
  const projetsDir = path.join(CONTENT_DIR, 'projets');
  if (!fs.existsSync(projetsDir)) return;

  const files = fs.readdirSync(projetsDir).filter((file) => file.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(projetsDir, file);
    const slug = file.replace(/\.md$/, '');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    const imagePath = resolvePublicAsset(data.image);
    const imageId = await uploadFile(imagePath, token);

    const videoPath = resolvePublicAsset(data.video_url);
    const videoId = await uploadFile(videoPath, token);

    const year = data.annee || new Date().getFullYear();
    const dateValue = data.date || `${year}-01-01T00:00:00.000Z`;

    await upsertItem(
      'mediations',
      slug,
      {
        slug,
        titre: data.titre || '',
        sous_titre: data.sous_titre || data.description || '',
        date: dateValue,
        body: content || '',
        image: imageId,
        video: videoId,
        categorie: data.categorie || ''
      },
      token
    );
  }
};

const getHomeSettingsId = async (token) => {
  const response = await jsonRequest('/items/home_settings?fields=id', {
    headers: getAuthHeaders(token)
  });
  return response?.data?.id;
};

const migrateHomeSettings = async (token) => {
  const accueilPath = path.join(CONTENT_DIR, 'pages', 'accueil.md');
  const heroImages = [];

  if (fs.existsSync(accueilPath)) {
    const fileContents = fs.readFileSync(accueilPath, 'utf8');
    const { data } = matter(fileContents);
    if (data.hero_image) {
      heroImages.push(data.hero_image);
    }
  }

  const imageDir = path.join(PUBLIC_DIR, 'images');
  if (fs.existsSync(imageDir)) {
    const extraImages = fs
      .readdirSync(imageDir)
      .filter((file) => /\.(png|jpe?g|webp|gif)$/i.test(file))
      .map((file) => `/images/${file}`);
    heroImages.push(...extraImages);
  }

  const uniqueImages = [...new Set(heroImages)].slice(0, 10);
  const fileIds = [];

  for (const image of uniqueImages) {
    const imagePath = resolvePublicAsset(image);
    const fileId = await uploadFile(imagePath, token);
    if (fileId) {
      fileIds.push(fileId);
    }
  }

  const homeSettingsId = await getHomeSettingsId(token);
  if (!homeSettingsId) {
    throw new Error('Impossible de trouver home_settings (id manquant).');
  }

  const existingLinks = await jsonRequest(
    `/items/home_settings_files?filter[home_settings_id][_eq]=${homeSettingsId}&fields=id&limit=-1`,
    {
      headers: getAuthHeaders(token)
    }
  );
  const existingIds = Array.isArray(existingLinks?.data)
    ? existingLinks.data.map((item) => item.id).filter(Boolean)
    : [];

  if (existingIds.length > 0) {
    await jsonRequest('/items/home_settings_files', {
      method: 'DELETE',
      headers: getAuthHeaders(token),
      body: JSON.stringify({ keys: existingIds })
    });
  }

  for (const [index, fileId] of fileIds.entries()) {
    await jsonRequest('/items/home_settings_files', {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify({
        home_settings_id: homeSettingsId,
        directus_files_id: fileId,
        sort: index + 1
      })
    });
  }
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
    .then(() => {
      console.log('✅ Migration terminée.');
    })
    .catch((error) => {
      console.error('❌ Erreur migration:', error.message);
      process.exit(1);
    });
}

module.exports = {
  runMigration
};
