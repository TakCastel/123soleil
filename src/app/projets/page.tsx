import { getProjets } from '@/lib/projets';
import ProjetsClient from './ProjetsClient';

interface ProjetsPageProps {
  searchParams: { filter?: string };
}

export default function Projets({ searchParams }: ProjetsPageProps) {
  const filter = searchParams.filter;
  const projets = getProjets(filter);

  const filters = [
    { id: 'tous', label: 'Tous' },
    { id: 'court-metrages', label: 'Réalisations' },
    { id: 'lipdubs', label: 'Lipdubs' },
    { id: 'mediations', label: 'Médiations' }
  ];

  return <ProjetsClient projets={projets} filters={filters} />;
}
