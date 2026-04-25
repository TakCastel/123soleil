import type { MetadataRoute } from 'next';
import { getProjets } from '@/lib/projets';
import { getActualites } from '@/lib/actualites';
import { getSiteUrl } from '@/lib/site-url';

const baseUrl = getSiteUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!baseUrl) return [];
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/association`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/projets`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/actualites`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/adhesion`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  let projets: Awaited<ReturnType<typeof getProjets>> = [];
  let actualites: Awaited<ReturnType<typeof getActualites>> = [];
  try {
    [projets, actualites] = await Promise.all([getProjets(), getActualites()]);
  } catch {
    // Directus indisponible
  }

  const projetEntries: MetadataRoute.Sitemap = projets
    .filter((p) => Boolean(p.id))
    .map((p) => ({
      url: `${baseUrl}/projets/${encodeURIComponent(p.id)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  const actualiteEntries: MetadataRoute.Sitemap = actualites
    .filter((a) => Boolean(a.id))
    .map((a) => ({
      url: `${baseUrl}/actualites/${encodeURIComponent(a.id)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...projetEntries, ...actualiteEntries];
}
