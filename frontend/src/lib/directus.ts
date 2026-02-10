type DirectusResponse<T> = {
  data: T;
};

const getBaseUrl = () => {
  const baseUrl =
    process.env.DIRECTUS_INTERNAL_URL ||
    process.env.DIRECTUS_URL ||
    process.env.NEXT_PUBLIC_DIRECTUS_URL;
  if (!baseUrl) {
    throw new Error('DIRECTUS_INTERNAL_URL, DIRECTUS_URL ou NEXT_PUBLIC_DIRECTUS_URL manquant.');
  }
  return baseUrl.replace(/\/$/, '');
};

/** URL publique pour les assets (HTTPS, utilisée dans le navigateur). En prod, éviter mixed content. */
const getPublicBaseUrl = () => {
  const publicUrl =
    process.env.DIRECTUS_PUBLIC_URL ||
    process.env.NEXT_PUBLIC_DIRECTUS_URL;
  if (!publicUrl) {
    return getBaseUrl();
  }
  return publicUrl.replace(/\/$/, '');
};

export const getDirectusAssetUrl = (fileId: string) => {
  if (!fileId) return '';
  return `${getPublicBaseUrl()}/assets/${fileId}`;
};

export async function fetchDirectus<T = unknown>(path: string): Promise<DirectusResponse<T>> {
  const baseUrl = getBaseUrl();
  const token = process.env.DIRECTUS_TOKEN;
  const response = await fetch(`${baseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Directus error ${response.status}: ${errorText}`);
  }

  return response.json();
}
