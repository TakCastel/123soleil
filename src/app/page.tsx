import Hero from '@/components/Hero';
import Supporters from '@/components/Supporters';
import HomeClient from './HomeClient';
import { getProjets } from '@/lib/projets';
import { getActualites } from '@/lib/actualites';

export default function Home() {
  // Charger les 3 derniers projets
  const projets = getProjets().slice(0, 3);
  
  // Charger les 2 dernières actualités
  const actualites = getActualites().slice(0, 2);

  return (
    <div className="">
      <Hero />
      <HomeClient projets={projets} actualites={actualites} />
      <Supporters />
    </div>
  );
}
