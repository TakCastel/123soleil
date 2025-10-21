import { getProjets } from '@/lib/projets';
import ProjetsClient from './ProjetsClient';

export default function Projets() {
  const projets = getProjets();

  const filters = [
    { id: 'tous', label: 'Tous' },
    { id: 'films', label: 'Films' },
    { id: 'documentaires', label: 'Documentaires' },
    { id: 'ateliers', label: 'Ateliers' },
    { id: 'jeunesse', label: 'Jeunesse' }
  ];

  return <ProjetsClient projets={projets} filters={filters} />;
}
