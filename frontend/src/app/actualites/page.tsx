import { getActualites } from '@/lib/actualites';
import ActualitesClient from './ActualitesClient';

export default async function Actualites() {
  const actualites = await getActualites();
  
  const latestNews = actualites.slice(0, 3);
  const otherNews = actualites.slice(3);

  return <ActualitesClient latestNews={latestNews} otherNews={otherNews} />;
}
