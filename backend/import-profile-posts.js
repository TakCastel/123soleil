/**
 * Import des posts Facebook (profile_posts_1.json) vers Directus, collection « actualites ».
 *
 * Comportement :
 * - Au lancement : suppression de TOUTES les actualités existantes, puis import.
 * - On ne garde que les posts avec du vrai contenu (pas de « coucou », vide, ???, etc.).
 * - Titres et corps reformulés pour un style clair et lisible (markdown).
 *
 * Champs utilisés : slug, titre, sous_titre, date, body, image, categorie.
 *
 * Usage (à la racine) : node backend/import-profile-posts.js
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
    throw new Error('DIRECTUS_ADMIN_EMAIL et DIRECTUS_PASSWORD requis dans .env');
  }
  const response = await jsonRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email: DIRECTUS_EMAIL, password: DIRECTUS_PASSWORD })
  });
  const token = response?.data?.access_token;
  if (!token) throw new Error('Login Directus échoué');
  return token;
};

function decodeFb(str) {
  if (typeof str !== 'string') return '';
  try {
    return Buffer.from(str, 'latin1').toString('utf8');
  } catch {
    return str;
  }
}

function cleanText(s) {
  if (!s) return '';
  return s
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Texte sans emojis (Unicode au-delà du BMP) pour mesurer le contenu réel. */
function stripEmojis(s) {
  return String(s).replace(/\p{Extended_Pictographic}/gu, '').replace(/\s+/g, ' ').trim();
}

/** Contenu considéré comme vide ou filler (coucou, ???, etc.). */
const FILLER_PATTERNS = [
  /^coucou\s*[?!.]*$/i,
  /^[?\s!.]*$/,
  /^[?\s!.]{1,5}$/,
  /^(coucou|salut|hello|yo)\s*[?!.]*$/i,
  /^\+*\s*$/
];
const FILLER_TITRES = new Set([
  'coucou',
  '???',
  '!!',
  '…',
  '...',
  'photos du journal',
  'téléchargements mobiles'
]);

function isFillerOrEmpty(text) {
  if (!text || typeof text !== 'string') return true;
  const t = stripEmojis(text).toLowerCase().trim();
  if (t.length < 8) return true;
  if (FILLER_TITRES.has(t)) return true;
  return FILLER_PATTERNS.some((re) => re.test(t));
}

function hasMeaningfulText(post) {
  const postText = post.data?.[0]?.post;
  if (postText) {
    const t = cleanText(decodeFb(postText));
    if (t.length > 8 && !isFillerOrEmpty(t)) return true;
  }
  const att = post.attachments?.[0]?.data;
  if (att) {
    for (const d of att) {
      if (d?.event?.description && decodeFb(d.event.description).trim().length > 15) return true;
      if (d?.event?.name && decodeFb(d.event.name).trim().length > 2) return true;
      if (d?.external_context?.name && decodeFb(d.external_context.name).trim().length > 10) return true;
      if (d?.media?.description && decodeFb(d.media.description).trim().length > 8) return true;
    }
  }
  if (post.attachments?.[0]?.data?.[0]?.external_context?.url) {
    const url = post.attachments[0].data[0].external_context.url;
    if (url && url.startsWith('http')) return true;
  }
  return false;
}

function isPhotoOnly(post) {
  const hasPost = post.data?.[0]?.post && cleanText(decodeFb(post.data[0].post)).length > 0;
  if (hasPost) return false;
  const att = post.attachments?.[0]?.data?.[0];
  if (att?.event?.name || att?.event?.description) return false;
  if (att?.external_context?.url && (att.external_context.url || '').startsWith('http')) return false;
  if (att?.external_context?.name && decodeFb(att.external_context.name).trim().length > 5) return false;
  if (att?.media?.description && decodeFb(att.media.description).trim().length > 5) return false;
  return !!att?.media;
}

function firstSentence(text, maxLen = 80) {
  const t = cleanText(text);
  const dot = t.indexOf('.');
  const line = t.indexOf('\n');
  let end = t.length;
  if (dot !== -1) end = Math.min(end, dot + 1);
  if (line !== -1) end = Math.min(end, line);
  let slice = t.slice(0, end).trim();
  if (slice.length > maxLen) slice = slice.slice(0, maxLen - 1).trim() + '…';
  return slice;
}

/** Reformule un titre : première lettre en majuscule, moins de ponctuation excessive. */
function reformuleTitre(s) {
  if (!s) return s;
  let t = s.trim();
  t = t.replace(/\s*[!?.]{2,}\s*$/, (m) => (m.includes('?') ? ' ?' : ' !'));
  if (t.length > 0) t = t[0].toUpperCase() + t.slice(1);
  return t.slice(0, 255);
}

/** Reformule un paragraphe pour un style plus propre. */
function reformuleParagraphe(s) {
  if (!s) return s;
  let t = cleanText(s);
  t = t.replace(/\s*[!?]{2,}/g, ' !');
  t = t.replace(/\s+\./g, '.');
  return t.trim();
}

function buildTitre(post) {
  const postText = post.data?.[0]?.post;
  const att = post.attachments?.[0]?.data?.[0];

  if (att?.event?.name) {
    const name = decodeFb(att.event.name);
    return reformuleTitre(name.length > 255 ? firstSentence(name, 252) + '…' : name);
  }
  if (postText) {
    const text = decodeFb(postText);
    const first = firstSentence(text, 252);
    if (first && !isFillerOrEmpty(first)) return reformuleTitre(first);
  }
  if (att?.media?.title) {
    const t = decodeFb(att.media.title);
    if (t && !FILLER_TITRES.has(t.toLowerCase())) return reformuleTitre(t.slice(0, 255));
  }
  if (att?.external_context?.name) {
    const name = decodeFb(att.external_context.name);
    const first = firstSentence(name, 255);
    if (first) return reformuleTitre(first);
    return 'Lien partagé';
  }
  if (att?.external_context?.url) {
    try {
      const u = new URL(att.external_context.url);
      const host = u.hostname.replace(/^www\./, '');
      return `Lien : ${host}`.slice(0, 255);
    } catch {
      return 'Lien partagé';
    }
  }
  return 'Publication';
}

function buildBodyMarkdown(post) {
  const parts = [];
  const postText = post.data?.[0]?.post;
  if (postText) {
    let text = decodeFb(postText);
    text = cleanText(text);
    if (text && !isFillerOrEmpty(text)) {
      text = text
        .split(/\n\n+/)
        .map((p) => reformuleParagraphe(p))
        .filter((p) => p && stripEmojis(p).length > 5)
        .join('\n\n');
      if (text) {
        text = text.replace(/https?:\/\/[^\s]+/g, (url) => `[${url}](${url})`);
        parts.push(text);
      }
    }
  }

  const att = post.attachments?.[0]?.data;
  if (att) {
    for (const d of att) {
      if (d?.external_context?.url) {
        const url = d.external_context.url.trim();
        if (url.startsWith('http')) {
          const name = d.external_context.name ? decodeFb(d.external_context.name).trim() : '';
          const label = name ? firstSentence(name, 80) : url;
          if (!parts.some((p) => p.includes(url))) {
            parts.push(`\n\n**Lien** : [${label}](${url})`);
          }
        }
      }
      if (d?.event) {
        const e = d.event;
        const name = decodeFb(e.name || '').trim();
        const desc = e.description ? decodeFb(e.description).trim() : '';
        const start = e.start_timestamp
          ? new Date(e.start_timestamp * 1000).toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })
          : '';
        const place = e.place ? decodeFb(e.place.name || e.place.address || '').trim() : '';

        const lines = [];
        if (name) lines.push(`- **${name}**`);
        if (start) lines.push(`- Date : ${start}`);
        if (place) lines.push(`- Lieu : ${place}`);
        if (lines.length) parts.push('\n\n**Événement**\n\n' + lines.join('\n'));
        if (desc && desc.length > 20 && !parts[0]?.includes(desc.slice(0, 50))) {
          const descClean = cleanText(desc)
            .split(/\n\n+/)
            .map(reformuleParagraphe)
            .filter(Boolean)
            .join('\n\n');
          parts.push('\n\n' + descClean);
        }
      }
      if (d?.media?.description) {
        const desc = decodeFb(d.media.description).trim();
        if (desc && desc.length > 10 && !parts.some((p) => p.includes(desc.slice(0, 30)))) {
          parts.push('\n\n' + reformuleParagraphe(desc));
        }
      }
    }
  }

  const body = parts.join('').trim();
  return body || null;
}

function toSlug(titre, timestamp) {
  const base = (titre || '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || 'article';
  return `${base}-${timestamp}`.slice(0, 250);
}

function filterInterestingPosts(posts) {
  return posts.filter((p) => {
    if (!hasMeaningfulText(p) || isPhotoOnly(p)) return false;
    const titre = buildTitre(p);
    if (FILLER_TITRES.has(titre.toLowerCase())) return false;
    if (isFillerOrEmpty(titre)) return false;
    const body = buildBodyMarkdown(p);
    if (!body || stripEmojis(body).length < 15) return false;
    return true;
  });
}

function postToActualite(post) {
  const timestamp = post.timestamp;
  const titre = buildTitre(post);
  const slug = toSlug(titre, timestamp);
  const date = timestamp
    ? new Date(timestamp * 1000).toISOString().slice(0, 19).replace('T', ' ')
    : null;
  const body = buildBodyMarkdown(post);

  return {
    slug,
    titre: titre.slice(0, 255),
    sous_titre: null,
    date,
    body,
    image: null,
    categorie: null
  };
}

async function deleteAllActualites(token) {
  let page = 1;
  const limit = 100;
  let total = 0;
  for (;;) {
    const res = await jsonRequest(
      `/items/actualites?limit=${limit}&page=${page}&fields=id`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = res?.data ?? [];
    if (data.length === 0) break;
    for (const item of data) {
      await jsonRequest('/items/actualites/' + item.id, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      total++;
    }
    if (data.length < limit) break;
    page++;
  }
  return total;
}

async function main() {
  const inputPath = path.join(process.cwd(), 'profile_posts_1.json');
  if (!fs.existsSync(inputPath)) {
    console.error('Fichier introuvable : profile_posts_1.json (à la racine du projet)');
    process.exit(1);
  }

  let posts;
  try {
    posts = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  } catch (e) {
    console.error('JSON invalide dans profile_posts_1.json:', e.message);
    process.exit(1);
  }

  if (!Array.isArray(posts)) {
    console.error('Le JSON doit être un tableau de posts.');
    process.exit(1);
  }

  const toImport = filterInterestingPosts(posts);
  console.log(`${posts.length} posts lus, ${toImport.length} conservés (contenu réel, hors vide / coucou / filler).`);

  const token = await login();
  console.log('Authentification Directus OK.');

  const deleted = await deleteAllActualites(token);
  if (deleted > 0) {
    console.log(`Suppression de ${deleted} actualité(s) existante(s).`);
  }

  const created = [];
  const errors = [];

  for (let i = 0; i < toImport.length; i++) {
    const payload = postToActualite(toImport[i]);
    try {
      await jsonRequest('/items/actualites', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      created.push(payload.slug);
      if ((i + 1) % 5 === 0 || i === toImport.length - 1) {
        console.log(`  ${i + 1}/${toImport.length} importés`);
      }
    } catch (err) {
      errors.push({ slug: payload.slug, message: err.message });
    }
  }

  console.log(`\nTerminé : ${created.length} actualités créées.`);
  if (errors.length) {
    console.error(`${errors.length} erreur(s) :`);
    errors.forEach(({ slug, message }) => console.error(`  ${slug}: ${message}`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
