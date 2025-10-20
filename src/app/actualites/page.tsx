'use client';

import { useEffect, useState } from 'react';
import NewsCard from '@/components/NewsCard';

export default function Actualites() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const actualites = [
    {
      id: 1,
      titre: 'Nouveau Festival Jeunes Talents 2024',
      date: '15 Janvier 2024',
      categorie: 'Événement',
      description: 'Nous organisons notre premier festival dédié aux jeunes talents du cinéma. Inscriptions ouvertes jusqu\'au 15 mars. Un événement unique pour découvrir les futurs réalisateurs de demain.',
      image: 'Festival jeunes talents',
      isBreaking: true
    },
    {
      id: 2,
      titre: 'Formation Cinéma Participatif',
      date: '10 Janvier 2024',
      categorie: 'Formation',
      description: 'Nouvelle session de formation aux techniques de cinéma participatif. Apprenez à créer des films avec les communautés locales.',
      image: 'Formation cinéma',
      isBreaking: false
    },
    {
      id: 3,
      titre: 'Partenariat avec la Cinémathèque',
      date: '5 Janvier 2024',
      categorie: 'Partenariat',
      description: 'Signature d\'un partenariat historique avec la Cinémathèque française pour la préservation et la diffusion du patrimoine cinématographique.',
      image: 'Partenariat cinémathèque',
      isBreaking: false
    },
    {
      id: 4,
      titre: 'Diffusion "Mémoires Urbaines"',
      date: '20 Décembre 2023',
      categorie: 'Diffusion',
      description: 'Projection exceptionnelle du documentaire "Mémoires Urbaines" dans 15 villes de France. Un voyage à travers l\'histoire des quartiers populaires.',
      image: 'Diffusion mémoires urbaines',
      isBreaking: false
    },
    {
      id: 5,
      titre: 'Appel à Projets 2024',
      date: '1er Décembre 2023',
      categorie: 'Appel à projets',
      description: 'Lancement de notre appel à projets annuel. Soutenez des initiatives cinématographiques innovantes et participatives dans votre région.',
      image: 'Appel à projets',
      isBreaking: false
    },
    {
      id: 6,
      titre: 'Atelier Cinéma Mobile',
      date: '25 Novembre 2023',
      categorie: 'Formation',
      description: 'Découvrez notre cinéma mobile qui sillonne les routes de France. Une expérience unique de projection en plein air.',
      image: 'Cinéma mobile',
      isBreaking: false
    },
    {
      id: 7,
      titre: 'Rencontres Cinématographiques',
      date: '15 Novembre 2023',
      categorie: 'Événement',
      description: 'Organisation de rencontres entre professionnels du cinéma et jeunes talents. Un moment d\'échange et de partage d\'expériences.',
      image: 'Rencontres cinéma',
      isBreaking: false
    },
    {
      id: 8,
      titre: 'Nouvelle Saison de Programmation',
      date: '1er Novembre 2023',
      categorie: 'Programmation',
      description: 'Découvrez notre nouvelle saison avec une programmation riche et diversifiée. Des films d\'auteur aux documentaires engagés.',
      image: 'Programmation saison',
      isBreaking: false
    }
  ];

  const latestNews = actualites.slice(0, 3);
  const otherNews = actualites.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header cohérent avec les autres pages */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* Hidden SEO H1 */}
          <h1 className="sr-only">Actualités</h1>
          {/* Visible phrase pair */}
          <div>
            <span className="display-title text-5xl md:text-6xl text-[color:var(--secondary)] title-tilt mb-1 inline-block">SUIVEZ</span>
          </div>
          <p className="subtitle-black small mt-1">NOS ACTUALITÉS</p>
          <p className="text-gray-700 max-w-3xl mx-auto mt-4">
            Suivez l'actualité de l'association 1,2,3 Soleil: actions de médiation, diffusions, 
            partenariats et appels à participation. Restez informé des temps forts et des nouvelles initiatives.
          </p>
        </div>
      </div>

      {/* Section HERO - 3 dernières actualités */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="display-title text-3xl mb-12 text-center text-[color:var(--neutral-dark)]">Dernières actualités</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Grande carte principale - BREAKING NEWS */}
            <div className="lg:col-span-8">
              <div className="relative group">
                <div className="absolute -top-4 -left-4 bg-red-600 text-white px-4 py-2 text-sm font-black tracking-wider transform -rotate-2 z-10">
                  BREAKING NEWS
                </div>
                <NewsCard
                  title={latestNews[0].titre}
                  description={latestNews[0].description}
                  imageAlt={latestNews[0].image}
                  date={latestNews[0].date}
                  category={latestNews[0].categorie}
                  href={`/actualites/${latestNews[0].id}`}
                  variant="hero"
                  delay={0}
                  isBreaking={false}
                />
              </div>
            </div>
            
            {/* 2 cartes secondaires */}
            <div className="lg:col-span-4 space-y-6">
              {latestNews.slice(1, 3).map((actualite, index) => (
                <div key={actualite.id} className="relative">
                  <NewsCard
                    title={actualite.titre}
                    description={actualite.description}
                    imageAlt={actualite.image}
                    date={actualite.date}
                    category={actualite.categorie}
                    href={`/actualites/${actualite.id}`}
                    variant="compact"
                    delay={(index + 1) * 0.2}
                    isBreaking={actualite.isBreaking}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section NEWSPAPER - Toutes les autres actualités */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`transform transition-all duration-1000 delay-500 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="display-title text-3xl mb-12 text-center text-[color:var(--neutral-dark)]">Toutes les actualités</h2>
            </div>

            {/* Layout en colonnes style journal */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherNews.map((actualite, index) => (
                <div key={actualite.id} className="group">
                  <NewsCard
                    title={actualite.titre}
                    description={actualite.description}
                    imageAlt={actualite.image}
                    date={actualite.date}
                    category={actualite.categorie}
                    href={`/actualites/${actualite.id}`}
                    variant="newspaper"
                    delay={index * 0.1}
                    isBreaking={actualite.isBreaking}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
