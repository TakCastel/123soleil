import { getActualites } from '@/lib/actualites';
import ActualitesClient from './ActualitesClient';

export default function Actualites() {
  const actualites = getActualites();
  
  const latestNews = actualites.slice(0, 3);
  const otherNews = actualites.slice(3);

  return <ActualitesClient latestNews={latestNews} otherNews={otherNews} />;
}
