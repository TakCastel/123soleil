import Hero from '@/components/Hero';
import Supporters from '@/components/Supporters';
import HomeClient from './HomeClient';
import { getProjets } from '@/lib/projets';
import { getActualites } from '@/lib/actualites';
import { getHomeChiffres } from '@/lib/home-settings';

/** Pas de cache : le hero doit tirer 4 images aléatoires (1–27) à chaque refresh. */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Accueil",
  description:
    "1, 2, 3 Soleil – Association de cinéma à Avignon. Cinéma solidaire et inclusif : ateliers, médiation artistique, films et projets jeunesse sur le territoire avignonnais.",
  openGraph: { url: "/" },
  alternates: { canonical: "/" },
};

export default async function Home() {
  let projets: Awaited<ReturnType<typeof getProjets>> = [];
  let actualites: Awaited<ReturnType<typeof getActualites>> = [];
  let chiffres: Awaited<ReturnType<typeof getHomeChiffres>> = null;

  try {
    const [projetsData, actualitesData, chiffresData] = await Promise.all([
      getProjets(),
      getActualites(),
      getHomeChiffres()
    ]);
    projets = projetsData.slice(0, 2);
    actualites = actualitesData.slice(0, 3);
    chiffres = chiffresData;
  } catch {
    // Directus indisponible (ex. dev sans Docker) : afficher la page avec données vides
  }

  return (
    <div className="">
      <Hero />
      <HomeClient projets={projets} actualites={actualites} chiffres={chiffres} />
      <Supporters />
    </div>
  );
}
