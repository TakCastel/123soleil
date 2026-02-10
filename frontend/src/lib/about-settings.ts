import { fetchDirectus } from './directus';

/** Récupère l'item singleton about_settings (champ content = markdown). En cas d'erreur (ex. 403), retourne null. */
export async function getAboutSettingsContent(): Promise<string | null> {
  try {
    const res = await fetchDirectus<{ data: { content?: string }[] | { content?: string } }>(
      '/items/about_settings?fields=content'
    );
    const data = res.data;
    // Singleton : Directus peut renvoyer { data: [item] } ou { data: item }
    const item = Array.isArray(data) ? data[0] ?? null : data;
    return item?.content ?? null;
  } catch {
    return null;
  }
}
