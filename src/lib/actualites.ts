import { fetchDirectus, getDirectusAssetUrl } from './directus';

export interface Actualite {
  id: string;
  titre: string;
  date: string;
  categorie?: string;
  description?: string;
  image?: string;
  isBreaking?: boolean;
  content?: string;
}

type DirectusActualite = {
  id: string | number;
  slug?: string;
  titre?: string;
  sous_titre?: string;
  date?: string;
  body?: string;
  image?: string;
  categorie?: string;
};

const ACTUALITES_FIELDS = [
  'id',
  'slug',
  'titre',
  'sous_titre',
  'date',
  'body',
  'image',
  'categorie'
].join(',');

const formatDate = (dateValue?: string) => {
  if (!dateValue) return '';
  return new Date(dateValue).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const mapActualite = (item: DirectusActualite): Actualite => {
  const imageId = item?.image;
  return {
    id: item?.slug || String(item?.id),
    titre: item?.titre || '',
    date: formatDate(item?.date),
    categorie: item?.categorie || undefined,
    description: item?.sous_titre || undefined,
    image: imageId ? getDirectusAssetUrl(imageId) : undefined,
    isBreaking: false,
    content: item?.body || ''
  };
};

export async function getActualites(): Promise<Actualite[]> {
  try {
    const response = await fetchDirectus<DirectusActualite[]>(
      `/items/actualites?fields=${encodeURIComponent(ACTUALITES_FIELDS)}&limit=-1&sort=-date`
    );
    const actualites = (response?.data || []).map(mapActualite);

    if (actualites.length > 0) {
      actualites[0].isBreaking = true;
    }

    return actualites;
  } catch (error) {
    console.warn('Impossible de charger les actualités depuis Directus.', error);
    return [];
  }
}

export async function getActualiteBySlug(slug: string) {
  try {
    const response = await fetchDirectus<DirectusActualite[]>(
      `/items/actualites?fields=${encodeURIComponent(ACTUALITES_FIELDS)}&filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`
    );
    const item = response?.data?.[0];
    if (!item) return null;
    return mapActualite(item);
  } catch (error) {
    console.warn('Impossible de charger l’actualité depuis Directus.', error);
    return null;
  }
}

