import { getProjets } from '@/lib/projets';
import ProjetsClient from './ProjetsClient';

interface ProjetsPageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function Projets({ searchParams }: ProjetsPageProps) {
  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams.filter;
  const projets = getProjets(filter);

  const filters = [
    { id: 'tous', label: 'Tous' },
    { id: 'court-metrages', label: 'Réalisations' },
    { id: 'lipdubs', label: 'Lipdubs' },
    { id: 'mediations', label: 'Médiations' }
  ];

  return <ProjetsClient projets={projets} filters={filters} />;
}
