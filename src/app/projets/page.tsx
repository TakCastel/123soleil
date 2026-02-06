import { getProjets, getCategories } from '@/lib/projets';
import ProjetsClient from './ProjetsClient';

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
    ...categories.map((c) => ({ id: c, label: capitalize(c) }))
  ];

  return <ProjetsClient projets={projets} filters={filters} />;
}
