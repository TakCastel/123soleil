import { fetchDirectus, getDirectusAssetUrl } from './directus';

export interface Projet {
  id: string;
  titre: string;
  categorie?: string;
  annee: number;
  description?: string;
  image?: string;
  video_url?: string;
  content?: string;
}

type DirectusMediation = {
  id: string | number;
  slug?: string;
  titre?: string;
  sous_titre?: string;
  date?: string;
  body?: string;
  image?: string;
  video?: string;
  categorie?: string;
};

const MEDIATIONS_FIELDS = [
  'id',
  'slug',
  'titre',
  'sous_titre',
  'date',
  'body',
  'image',
  'video',
  'categorie'
].join(',');

const toYear = (dateValue?: string) => {
  if (!dateValue) return new Date().getFullYear();
  const parsed = new Date(dateValue);
  return Number.isNaN(parsed.getTime()) ? new Date().getFullYear() : parsed.getFullYear();
};

const mapProjet = (item: DirectusMediation): Projet => {
  const imageId = item?.image;
  const videoId = item?.video;
  return {
    id: item?.slug || String(item?.id),
    titre: item?.titre || '',
    categorie: item?.categorie || undefined,
    annee: toYear(item?.date),
    description: item?.sous_titre || undefined,
    image: imageId ? getDirectusAssetUrl(imageId) : undefined,
    video_url: videoId ? getDirectusAssetUrl(videoId) : undefined,
    content: item?.body || ''
  };
};

export async function getProjets(categorie?: string): Promise<Projet[]> {
  const baseQuery = `/items/mediations?fields=${encodeURIComponent(MEDIATIONS_FIELDS)}&limit=-1&sort=-date`;
  const filterQuery = categorie ? `&filter[categorie][_eq]=${encodeURIComponent(categorie)}` : '';
  try {
    const response = await fetchDirectus<DirectusMediation[]>(`${baseQuery}${filterQuery}`);
    return (response?.data || []).map(mapProjet);
  } catch (error) {
    console.warn('Impossible de charger les mediations depuis Directus.', error);
    return [];
  }
}

export async function getProjetBySlug(slug: string) {
  try {
    const response = await fetchDirectus<DirectusMediation[]>(
      `/items/mediations?fields=${encodeURIComponent(MEDIATIONS_FIELDS)}&filter[slug][_eq]=${encodeURIComponent(slug)}&limit=1`
    );
    const item = response?.data?.[0];
    if (!item) return null;
    return mapProjet(item);
  } catch (error) {
    console.warn('Impossible de charger la mediation depuis Directus.', error);
    return null;
  }
}

