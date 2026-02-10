import type { Metadata } from 'next';
import { getProjets, getCategories } from '@/lib/projets';
import { getCategoryLabel } from '@/lib/category-descriptions';
import ProjetsClient from './ProjetsClient';

export const metadata: Metadata = {
  title: "Ateliers et médiations",
  description:
    "Ateliers et projets de l'association de cinéma 1, 2, 3 Soleil à Avignon : court-métrages, lip dub, médiation culturelle et actions jeunesse sur le territoire avignonnais.",
  openGraph: {
    url: "/projets",
  },
};

interface ProjetsPageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function Projets({ searchParams }: ProjetsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams.filter;
  const [projets, categories] = await Promise.all([
    getProjets(filter),
    getCategories()
  ]);

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
  const filters = [
    { id: 'tous', label: 'Tous' },
    ...categories.map((c) => ({
      id: c,
      label: getCategoryLabel(c) ?? capitalize(c)
    }))
  ];

  return <ProjetsClient projets={projets} filters={filters} />;
}
