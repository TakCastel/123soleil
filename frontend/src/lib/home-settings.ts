import { fetchDirectus, getDirectusAssetUrl } from './directus';

type HomeSettingsFile = {
  directus_files_id?: string;
};

type HomeSettingsResponse = {
  hero_images?: HomeSettingsFile[];
  association_video?: string;
};

export async function getHomeHeroImages(): Promise<string[]> {
  const response = await fetchDirectus<HomeSettingsResponse>(
    '/items/home_settings?fields=hero_images.directus_files_id'
  );

  const heroImages = Array.isArray(response?.data?.hero_images) ? response.data.hero_images : [];

  return heroImages
    .map((item) => item?.directus_files_id)
    .filter(Boolean)
    .map((fileId) => getDirectusAssetUrl(fileId as string));
}

/** URL de la vidéo de présentation (page Association), ou null si non définie. */
export async function getAssociationVideoUrl(): Promise<string | null> {
  try {
    const response = await fetchDirectus<HomeSettingsResponse>(
      '/items/home_settings?fields=association_video'
    );
    const fileId = response?.data?.association_video;
    if (!fileId) return null;
    return getDirectusAssetUrl(fileId);
  } catch {
    return null;
  }
}
