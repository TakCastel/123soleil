import Hero from '@/components/Hero';
import Supporters from '@/components/Supporters';
import HomeClient from './HomeClient';
import { getProjets } from '@/lib/projets';
import { getActualites } from '@/lib/actualites';
import { getHomeHeroImages } from '@/lib/home-settings';

export default async function Home() {
  // Charger les 3 derniers projets
  const projets = (await getProjets()).slice(0, 3);
  
  // Charger les 2 dernières actualités
  const actualites = (await getActualites()).slice(0, 2);

  const heroImages = await getHomeHeroImages();

  return (
    <div className="">
      <Hero imageUrls={heroImages} />
      <HomeClient projets={projets} actualites={actualites} />
      <Supporters />
    </div>
  );
}
