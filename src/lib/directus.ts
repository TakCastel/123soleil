type DirectusResponse<T> = {
  data: T;
};

const getBaseUrl = () => {
  const baseUrl =
    process.env.DIRECTUS_INTERNAL_URL ||
    process.env.DIRECTUS_URL ||
    process.env.NEXT_PUBLIC_DIRECTUS_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:8055' : undefined);
  if (!baseUrl) {
    throw new Error('DIRECTUS_INTERNAL_URL, DIRECTUS_URL ou NEXT_PUBLIC_DIRECTUS_URL manquant.');
  }
  return baseUrl.replace(/\/$/, '');
};

export const getDirectusAssetUrl = (fileId: string) => {
  if (!fileId) return '';
  return `${getBaseUrl()}/assets/${fileId}`;
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
