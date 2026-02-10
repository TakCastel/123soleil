import type { Metadata } from 'next';
import { getActualites } from '@/lib/actualites';
import ActualitesClient from './ActualitesClient';

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Actualités de l'association de cinéma 1, 2, 3 Soleil à Avignon : actions de médiation, diffusions, partenariats et événements sur le territoire avignonnais.",
  openGraph: {
    url: "/actualites",
  },
};

export default async function Actualites() {
  const actualites = await getActualites();
  
  const latestNews = actualites.slice(0, 3);
  const otherNews = actualites.slice(3);

  return <ActualitesClient latestNews={latestNews} otherNews={otherNews} />;
}
