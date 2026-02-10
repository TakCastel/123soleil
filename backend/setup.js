require('dotenv').config();

const DIRECTUS_URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const DIRECTUS_EMAIL = process.env.DIRECTUS_EMAIL || process.env.DIRECTUS_ADMIN_EMAIL;
const DIRECTUS_PASSWORD = process.env.DIRECTUS_PASSWORD || process.env.DIRECTUS_ADMIN_PASSWORD;

const jsonRequest = async (path, options = {}) => {
  const response = await fetch(`${DIRECTUS_URL}${path}`, {
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
  const error = new Error(`Directus ${response.status} (${method} ${path}): ${errorText}`);
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

/** Liste des collections à supprimer (créées par erreur ou pour des tests). */
const COLLECTIONS_TO_REMOVE = ['test_permission_check', 'test_permission_checks'];

/** Champs attendus sur home_settings : id + 6 chiffres (section Quelques chiffres). */
const HOME_SETTINGS_ALLOWED_FIELDS = new Set([
  'id',
  'courts_metrages',
  'participants_region',
  'projections',
  'editions_festival',
  'realisateurs',
  'adherents'
]);

const getCollections = async (token) => {
  const response = await jsonRequest('/collections', {
    headers: getAuthHeaders(token)
  });
  return Array.isArray(response?.data) ? response.data : [];
};

const collectionExists = async (name, token) => {
  const collections = await getCollections(token);
  return collections.some((item) => item?.collection === name);
};

const ensureCollection = async (definition, token) => {
  const exists = await collectionExists(definition.collection, token);
  if (exists) return;

  await jsonRequest('/collections', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(definition)
  });
};

const deleteCollection = async (name, token) => {
  try {
    await jsonRequest(`/collections/${name}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    });
  } catch (error) {
    if (error.status === 404) return;
    throw error;
  }
};

const isHomeSettingsBroken = async (token) => {
  try {
    await jsonRequest('/items/home_settings?fields=id', {
      headers: getAuthHeaders(token)
    });
    return false;
  } catch (error) {
    if (error.status === 403 || error.status === 404) {
      return false;
    }
    if (error.status === 500 && error.message.includes('home_settings.hero_images')) {
      return true;
    }
    throw error;
  }
};

const getFields = async (collection, token) => {
  try {
    const response = await jsonRequest(`/fields/${collection}`, {
      headers: getAuthHeaders(token)
    });
    return response?.data || [];
  } catch (error) {
    if (error.status === 403 || error.status === 404) return [];
    throw error;
  }
};

const getPrimaryKeyField = async (collection, token) => {
  const fields = await getFields(collection, token);
  return fields.find((field) => field?.schema?.is_primary_key);
};

const ensureFields = async (collection, fields, token) => {
  const existing = await getFields(collection, token);
  const existingNames = new Set(existing.map((field) => field.field));

  for (const field of fields) {
    if (existingNames.has(field.field)) {
      continue;
    }

    await jsonRequest(`/fields/${collection}`, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(field)
    });
  }
};

const getField = async (collection, field, token) => {
  try {
    const response = await jsonRequest(`/fields/${collection}/${field}`, {
      headers: getAuthHeaders(token)
    });
    return response?.data || null;
  } catch (error) {
    if (error.status === 403 || error.status === 404) return null;
    throw error;
  }
};

const deleteField = async (collection, field, token) => {
  await jsonRequest(`/fields/${collection}/${field}`, {
    method: 'DELETE',
    headers: getAuthHeaders(token)
  });
};

/** Met à jour les meta d’un champ (ex. interface "files" pour galerie multi-fichiers). */
const updateFieldMeta = async (collection, field, meta, token) => {
  const current = await getField(collection, field, token);
  if (!current) return;
  await jsonRequest(`/fields/${collection}/${field}`, {
    method: 'PATCH',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ meta: { ...current.meta, ...meta } })
  });
};

const mediationsCollection = {
  collection: 'mediations',
  meta: {
    icon: 'video_library',
    note: 'Médiations (anciens projets Decap CMS)'
  },
  schema: {}
};

const actualitesCollection = {
  collection: 'actualites',
  meta: {
    icon: 'feed',
    note: 'Actualités (Decap CMS)'
  },
  schema: {}
};

const homeSettingsCollection = {
  collection: 'home_settings',
  meta: {
    icon: 'home',
    singleton: true,
    note: 'Paramètres de la page d’accueil'
  },
  schema: {}
};

const aboutSettingsCollection = {
  collection: 'about_settings',
  meta: {
    icon: 'info',
    singleton: true,
    note: 'Paramètres de la page Association (texte éditable)'
  },
  schema: {}
};

const mediationsFields = [
  { field: 'slug', type: 'string', schema: { is_nullable: false, is_unique: true }, meta: { interface: 'input', required: true } },
  { field: 'titre', type: 'string', schema: { is_nullable: false }, meta: { interface: 'input', required: true } },
  { field: 'sous_titre', type: 'string', schema: { is_nullable: true }, meta: { interface: 'input' } },
  { field: 'date', type: 'dateTime', schema: { is_nullable: true }, meta: { interface: 'datetime' } },
  { field: 'body', type: 'text', schema: { is_nullable: true }, meta: { interface: 'input-rich-text-md' } },
  { field: 'image', type: 'uuid', schema: { is_nullable: true }, meta: { interface: 'file-image', special: ['file'] } },
  { field: 'video', type: 'uuid', schema: { is_nullable: true }, meta: { interface: 'file', special: ['file'] } },
  { field: 'categorie', type: 'string', schema: { is_nullable: true }, meta: { interface: 'input' } }
];

const actualitesFields = [
  { field: 'slug', type: 'string', schema: { is_nullable: false, is_unique: true }, meta: { interface: 'input', required: true } },
  { field: 'titre', type: 'string', schema: { is_nullable: false }, meta: { interface: 'input', required: true } },
  { field: 'sous_titre', type: 'string', schema: { is_nullable: true }, meta: { interface: 'input' } },
  { field: 'date', type: 'dateTime', schema: { is_nullable: true }, meta: { interface: 'datetime' } },
  { field: 'body', type: 'text', schema: { is_nullable: true }, meta: { interface: 'input-rich-text-md' } },
  { field: 'image', type: 'uuid', schema: { is_nullable: true }, meta: { interface: 'file-image', special: ['file'] } },
  { field: 'categorie', type: 'string', schema: { is_nullable: true }, meta: { interface: 'input' } }
];

const homeSettingsFields = [
  { field: 'courts_metrages', type: 'string', schema: { is_nullable: true }, meta: { interface: 'input', note: 'Ex. 40+' } },
  { field: 'participants_region', type: 'string', schema: { is_nullable: true }, meta: { interface: 'input', note: 'Participants de la région' } },
  { field: 'projections', type: 'string', schema: { is_nullable: true }, meta: { interface: 'input', note: 'Projections' } },
  { field: 'editions_festival', type: 'string', schema: { is_nullable: true }, meta: { interface: 'input', note: 'Éditions du festival' } },
  { field: 'realisateurs', type: 'string', schema: { is_nullable: true }, meta: { interface: 'input', note: 'Réalisateurs·rices' } },
  { field: 'adherents', type: 'string', schema: { is_nullable: true }, meta: { interface: 'input', note: 'Adhérents, membres actifs' } }
];

const aboutSettingsFields = [
  {
    field: 'content',
    type: 'text',
    schema: { is_nullable: true },
    meta: { interface: 'input-rich-text-md', note: 'Texte principal de la page Association (Markdown)' }
  }
];

const relationExists = async (collection, field, token) => {
  const response = await jsonRequest('/relations', { headers: getAuthHeaders(token) });
  const relations = Array.isArray(response?.data) ? response.data : [];
  return relations.some((r) => r.collection === collection && r.field === field);
};

const ensureRelation = async (payload, token) => {
  if (await relationExists(payload.collection, payload.field, token)) return;
  await jsonRequest('/relations', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload)
  });
};

const DEFAULT_HOME_CHIFFRES = {
  courts_metrages: '40+',
  participants_region: '400',
  projections: '25+',
  editions_festival: '5',
  realisateurs: '19',
  adherents: '40'
};

const ensureHomeSettingsItem = async (token) => {
  const response = await jsonRequest('/items/home_settings?fields=id', {
    headers: getAuthHeaders(token)
  });
  const data = response?.data;
  if (data != null && typeof data === 'object' && data.id != null) return;
  await jsonRequest('/items/home_settings', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(DEFAULT_HOME_CHIFFRES)
  });
};

/** Texte par défaut de la page Association (Markdown), pré-rempli dans about_settings à la création. */
const DEFAULT_ABOUT_CONTENT = `## L'ACTION DE
### L'ASSOCIATION

Chaque année, une douzaine de professionnels du cinéma, avec des bénévoles de l'association, organisent des ateliers cinéma.

Notre association, fondée par des habitués du cinéma Utopia, se met en lien avec des jeunes issus de diverses structures de la ville le temps d'une collaboration autour d'un court-métrage.

Chaque médiation est réalisée durant une journée, de l'écriture du scénario au tournage. Par la suite les films sont montés par les réalisateurs, parfois en présence des jeunes.

Depuis septembre 2017, 36 films ont été réalisés selon ce dispositif. Ces films sont diffusés lors de projections publiques au cinéma Utopia et dans le cadre de diverses soirées associatives.

Les fonds récoltés vont au bénéfice d'associations locales qui œuvrent auprès de personnes en situation de précarité et de fragilité.`;

const ensureAboutSettingsItem = async (token) => {
  const response = await jsonRequest('/items/about_settings?fields=id', {
    headers: getAuthHeaders(token)
  });
  const data = response?.data;
  if (data != null && typeof data === 'object' && data.id != null) return;
  await jsonRequest('/items/about_settings', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ content: DEFAULT_ABOUT_CONTENT })
  });
};

/** Donne au même rôle (policy) que home_settings le droit de lecture sur about_settings. */
const ensureAboutSettingsPermission = async (token) => {
  let existing;
  try {
    existing = await jsonRequest('/permissions?filter[collection][_eq]=home_settings&filter[action][_eq]=read&limit=1', {
      headers: getAuthHeaders(token)
    });
  } catch (e) {
    if (e.status === 403 || e.status === 404) return;
    throw e;
  }
  const list = existing?.data;
  const homePerm = Array.isArray(list) && list.length > 0 ? list[0] : null;
  const policyId = homePerm?.policy;
  if (!policyId) return;

  let aboutPerms;
  try {
    aboutPerms = await jsonRequest('/permissions?filter[collection][_eq]=about_settings&filter[action][_eq]=read', {
      headers: getAuthHeaders(token)
    });
  } catch (e) {
    if (e.status === 403 || e.status === 404) return;
    throw e;
  }
  const aboutList = aboutPerms?.data;
  if (Array.isArray(aboutList) && aboutList.length > 0) return;

  await jsonRequest('/permissions', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({
      policy: policyId,
      collection: 'about_settings',
      action: 'read',
      fields: ['*']
    })
  });
  console.log('Permission lecture about_settings ajoutée.');
};

const runSetup = async () => {
  const token = await login();

  const collections = await getCollections(token);
  for (const col of collections) {
    const name = col?.collection || '';
    if (COLLECTIONS_TO_REMOVE.includes(name) || name.toLowerCase().includes('test_permission')) {
      await deleteCollection(name, token);
      console.log('Collection supprimée:', name);
    }
  }

  if (await isHomeSettingsBroken(token)) {
    await deleteCollection('home_settings', token);
  }

  await ensureCollection(mediationsCollection, token);
  await ensureCollection(actualitesCollection, token);
  await ensureCollection(homeSettingsCollection, token);
  await ensureCollection(aboutSettingsCollection, token);

  await ensureFields('mediations', mediationsFields, token);
  await ensureFields('actualites', actualitesFields, token);

  await ensureFields('home_settings', homeSettingsFields, token);
  await ensureFields('about_settings', aboutSettingsFields, token);

  // Supprimer l’ancienne table de liaison avant de créer la relation hero_images,
  const homeSettingsFieldsList = await getFields('home_settings', token);
  for (const f of homeSettingsFieldsList) {
    const name = f?.field;
    if (name && !HOME_SETTINGS_ALLOWED_FIELDS.has(name)) {
      try {
        await deleteField('home_settings', name, token);
        console.log('Champ home_settings supprimé (nettoyage):', name);
      } catch (err) {
        console.warn('Impossible de supprimer le champ home_settings.' + name, err.message);
      }
    }
  }

  await ensureRelation({
    collection: 'mediations',
    field: 'image',
    related_collection: 'directus_files',
    schema: { on_delete: 'SET NULL' },
    meta: { many_collection: 'mediations', many_field: 'image', one_collection: 'directus_files', one_field: null, one_deselect_action: 'nullify' }
  }, token);
  await ensureRelation({
    collection: 'mediations',
    field: 'video',
    related_collection: 'directus_files',
    schema: { on_delete: 'SET NULL' },
    meta: { many_collection: 'mediations', many_field: 'video', one_collection: 'directus_files', one_field: null, one_deselect_action: 'nullify' }
  }, token);
  await ensureRelation({
    collection: 'actualites',
    field: 'image',
    related_collection: 'directus_files',
    schema: { on_delete: 'SET NULL' },
    meta: { many_collection: 'actualites', many_field: 'image', one_collection: 'directus_files', one_field: null, one_deselect_action: 'nullify' }
  }, token);

  try {
    await ensureHomeSettingsItem(token);
  } catch (err) {
    console.warn('⚠ Item Home Settings non créé (tu peux lancer "npm run directus:schema:apply" après coup) :', err.message);
  }

  try {
    await ensureAboutSettingsItem(token);
  } catch (err) {
    console.warn('⚠ Item About Settings non créé :', err.message);
  }

  try {
    await ensureAboutSettingsPermission(token);
  } catch (err) {
    console.warn('⚠ Permission about_settings non ajoutée (à faire à la main dans Paramètres > Accès) :', err.message);
  }
};

if (require.main === module) {
  runSetup()
    .then(() => console.log('✅ Schéma Directus appliqué.'))
    .catch((err) => {
      console.error('❌ Erreur setup Directus:', err.message);
      process.exit(1);
    });
}

module.exports = { runSetup };
