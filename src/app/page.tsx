import Hero from '@/components/Hero';
import Supporters from '@/components/Supporters';
import HomeClient from './HomeClient';
import { getProjets } from '@/lib/projets';
import { getActualites } from '@/lib/actualites';
import { getHomeHeroImages } from '@/lib/home-settings';

export default async function Home() {
  let projets: Awaited<ReturnType<typeof getProjets>> = [];
  let actualites: Awaited<ReturnType<typeof getActualites>> = [];
  let heroImages: string[] = [];

  try {
    const [projetsData, actualitesData, heroImagesData] = await Promise.all([
      getProjets(),
      getActualites(),
      getHomeHeroImages()
    ]);
    projets = projetsData.slice(0, 2);
    actualites = actualitesData.slice(0, 3);
    heroImages = heroImagesData;
  } catch {
    // Directus indisponible (ex. dev sans Docker) : afficher la page avec données vides
  }

  return (
    <div className="">
      <Hero imageUrls={heroImages} />
      <HomeClient projets={projets} actualites={actualites} />
      <Supporters />
    </div>
  );
}
