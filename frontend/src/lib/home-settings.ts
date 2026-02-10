import { fetchDirectus } from './directus';

/** Récupère l’item singleton home_settings (une seule requête, champs demandés en paramètre). En cas d’erreur (ex. 403), retourne null. */
async function getHomeSettings<T>(fields: string): Promise<T | null> {
  try {
    const res = await fetchDirectus<{ data: T[] | T }>(`/items/home_settings?fields=${fields}`);
    const data = res.data;
    // Singleton : Directus peut renvoyer { data: [item] } ou { data: item }
    return Array.isArray(data) ? data[0] ?? null : data;
  } catch {
    return null;
  }
}

export interface HomeChiffres {
  courts_metrages?: string | null;
  participants_region?: string | null;
  projections?: string | null;
  editions_festival?: string | null;
  realisateurs?: string | null;
  adherents?: string | null;
}

const CHIFFRES_FIELDS = 'courts_metrages,participants_region,projections,editions_festival,realisateurs,adherents';

/** Section « Quelques chiffres » de la page d’accueil (home_settings). */
export async function getHomeChiffres(): Promise<HomeChiffres | null> {
  return getHomeSettings<HomeChiffres>(CHIFFRES_FIELDS);
}
