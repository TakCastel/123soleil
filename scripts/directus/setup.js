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

const collectionExists = async (name, token) => {
  const response = await jsonRequest('/collections', {
    headers: getAuthHeaders(token)
  });
  const collections = Array.isArray(response?.data) ? response.data : [];
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

const homeSettingsFilesCollection = {
  collection: 'home_settings_files',
  meta: {
    icon: 'collections',
    hidden: true,
    note: 'Junction home_settings <-> directus_files'
  },
  schema: {}
};

const mediationsFields = [
  {
    field: 'slug',
    type: 'string',
    schema: { is_nullable: false, is_unique: true },
    meta: { interface: 'input', required: true }
  },
  {
    field: 'titre',
    type: 'string',
    schema: { is_nullable: false },
    meta: { interface: 'input', required: true }
  },
  {
    field: 'sous_titre',
    type: 'string',
    schema: { is_nullable: true },
    meta: { interface: 'input' }
  },
  {
    field: 'date',
    type: 'dateTime',
    schema: { is_nullable: true },
    meta: { interface: 'datetime' }
  },
  {
    field: 'body',
    type: 'text',
    schema: { is_nullable: true },
    meta: { interface: 'input-rich-text-md' }
  },
  {
    field: 'image',
    type: 'uuid',
    schema: { is_nullable: true },
    meta: { interface: 'file-image', special: ['file'] }
  },
  {
    field: 'video',
    type: 'uuid',
    schema: { is_nullable: true },
    meta: { interface: 'file', special: ['file'] }
  },
  {
    field: 'categorie',
    type: 'string',
    schema: { is_nullable: true },
    meta: { interface: 'input' }
  }
];

const actualitesFields = [
  {
    field: 'slug',
    type: 'string',
    schema: { is_nullable: false, is_unique: true },
    meta: { interface: 'input', required: true }
  },
  {
    field: 'titre',
    type: 'string',
    schema: { is_nullable: false },
    meta: { interface: 'input', required: true }
  },
  {
    field: 'sous_titre',
    type: 'string',
    schema: { is_nullable: true },
    meta: { interface: 'input' }
  },
  {
    field: 'date',
    type: 'dateTime',
    schema: { is_nullable: true },
    meta: { interface: 'datetime' }
  },
  {
    field: 'body',
    type: 'text',
    schema: { is_nullable: true },
    meta: { interface: 'input-rich-text-md' }
  },
  {
    field: 'image',
    type: 'uuid',
    schema: { is_nullable: true },
    meta: { interface: 'file-image', special: ['file'] }
  },
  {
    field: 'categorie',
    type: 'string',
    schema: { is_nullable: true },
    meta: { interface: 'input' }
  }
];

const homeSettingsFields = [
  {
    field: 'hero_images',
    type: 'alias',
    schema: null,
    meta: {
      interface: 'files',
      special: ['m2m'],
      options: { limit: 10 }
    }
  }
];

const homeSettingsFilesFields = (homeSettingsIdFieldType) => ([
  {
    field: 'home_settings_id',
    type: homeSettingsIdFieldType || 'integer',
    schema: { is_nullable: false },
    meta: { interface: 'input' }
  },
  {
    field: 'directus_files_id',
    type: 'uuid',
    schema: { is_nullable: false },
    meta: { interface: 'input' }
  },
  {
    field: 'sort',
    type: 'integer',
    schema: { is_nullable: true },
    meta: { interface: 'input' }
  }
]);

const relationExists = async (collection, field, token) => {
  const response = await jsonRequest('/relations', {
    headers: getAuthHeaders(token)
  });
  const relations = Array.isArray(response?.data) ? response.data : [];
  return relations.some((relation) => relation.collection === collection && relation.field === field);
};

const ensureRelation = async (payload, token) => {
  const exists = await relationExists(payload.collection, payload.field, token);
  if (exists) return;
  await jsonRequest('/relations', {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload)
  });
};

const runSetup = async () => {
  const token = await login();

  if (await isHomeSettingsBroken(token)) {
    await deleteCollection('home_settings_files', token);
    await deleteCollection('home_settings', token);
  }

  await ensureCollection(mediationsCollection, token);
  await ensureCollection(actualitesCollection, token);
  await ensureCollection(homeSettingsCollection, token);
  await ensureCollection(homeSettingsFilesCollection, token);

  const homeSettingsPrimaryKey = await getPrimaryKeyField('home_settings', token);
  const homeSettingsIdType = homeSettingsPrimaryKey?.type || 'integer';

  await ensureFields('home_settings_files', homeSettingsFilesFields(homeSettingsIdType), token);

  await ensureFields('mediations', mediationsFields, token);
  await ensureFields('actualites', actualitesFields, token);

  const existingHeroField = await getField('home_settings', 'hero_images', token);
  if (existingHeroField) {
    const hasSchema = Boolean(existingHeroField.schema);
    if (existingHeroField.type !== 'alias' || hasSchema) {
      await deleteField('home_settings', 'hero_images', token);
    }
  }

  await ensureFields('home_settings', homeSettingsFields, token);

  await ensureRelation({
    collection: 'home_settings_files',
    field: 'home_settings_id',
    related_collection: 'home_settings',
    schema: { on_delete: 'CASCADE' },
    meta: {
      many_collection: 'home_settings_files',
      many_field: 'home_settings_id',
      one_collection: 'home_settings',
      one_field: 'hero_images',
      one_deselect_action: 'delete',
      junction_field: 'directus_files_id',
      sort_field: 'sort'
    }
  }, token);

  await ensureRelation({
    collection: 'home_settings_files',
    field: 'directus_files_id',
    related_collection: 'directus_files',
    schema: { on_delete: 'CASCADE' },
    meta: {
      many_collection: 'home_settings_files',
      many_field: 'directus_files_id',
      one_collection: 'directus_files',
      one_field: null,
      one_deselect_action: 'delete',
      junction_field: 'home_settings_id',
      sort_field: 'sort'
    }
  }, token);
};

if (require.main === module) {
  runSetup()
    .then(() => {
      console.log('✅ Schéma Directus appliqué.');
    })
    .catch((error) => {
      console.error('❌ Erreur setup Directus:', error.message);
      process.exit(1);
    });
}

module.exports = {
  runSetup
};
