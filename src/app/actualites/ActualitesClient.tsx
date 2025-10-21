'use client';

import { useEffect, useState } from 'react';
import NewsCard from '@/components/NewsCard';
import { Actualite } from '@/lib/actualites';

interface ActualitesClientProps {
  latestNews: Actualite[];
  otherNews: Actualite[];
}

export default function ActualitesClient({ latestNews, otherNews }: ActualitesClientProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
            Suivez l&apos;actualité de l&apos;association 1,2,3 Soleil: actions de médiation, diffusions, 
            partenariats et appels à participation. Restez informé des temps forts et des nouvelles initiatives.
          </p>
        </div>
      </div>

      {/* Section HERO - 3 dernières actualités */}
      {latestNews.length > 0 && (
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className={`transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="display-title text-3xl mb-12 text-center text-[color:var(--neutral-dark)]">Dernières actualités</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              {/* Grande carte principale - BREAKING NEWS */}
              <div className="lg:col-span-8">
                <div className="relative group">
                  {latestNews[0].isBreaking && (
                    <div className="absolute -top-4 -left-4 bg-red-600 text-white px-4 py-2 text-sm font-black tracking-wider transform -rotate-2 z-10">
                      BREAKING NEWS
                    </div>
                  )}
                  <NewsCard
                    title={latestNews[0].titre}
                    description={latestNews[0].description}
                    imageUrl={latestNews[0].image}
                    imageAlt={latestNews[0].titre}
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
              {latestNews.length > 1 && (
                <div className="lg:col-span-4 space-y-6">
                  {latestNews.slice(1, 3).map((actualite, index) => (
                    <div key={actualite.id} className="relative">
                      <NewsCard
                        title={actualite.titre}
                        description={actualite.description}
                        imageUrl={actualite.image}
                        imageAlt={actualite.titre}
                        date={actualite.date}
                        category={actualite.categorie}
                        href={`/actualites/${actualite.id}`}
                        variant="compact"
                        delay={(index + 1) * 0.2}
                        isBreaking={actualite.isBreaking || false}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section NEWSPAPER - Toutes les autres actualités */}
      {otherNews.length > 0 && (
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
                      imageUrl={actualite.image}
                      imageAlt={actualite.titre}
                      date={actualite.date}
                      category={actualite.categorie}
                      href={`/actualites/${actualite.id}`}
                      variant="newspaper"
                      delay={index * 0.1}
                      isBreaking={actualite.isBreaking || false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message si aucune actualité */}
      {latestNews.length === 0 && otherNews.length === 0 && (
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center">
            <p className="text-gray-500 text-lg">Aucune actualité pour le moment.</p>
          </div>
        </div>
      )}
    </div>
  );
}

