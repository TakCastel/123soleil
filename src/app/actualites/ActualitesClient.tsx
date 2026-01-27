'use client';

import { useState, useEffect } from 'react';
import NewsCard from '@/components/NewsCard';
import { useInView } from '@/hooks/useInView';
import { Actualite } from '@/lib/actualites';
import PageHeader from '@/components/PageHeader';
import { usePageContentDelay } from '@/hooks/usePageContentDelay';
import type React from 'react';

interface ActualitesClientProps {
  latestNews: Actualite[];
  otherNews: Actualite[];
}

export default function ActualitesClient({ latestNews, otherNews }: ActualitesClientProps) {
  // Hook pour retarder l'apparition du contenu
  const isContentVisible = usePageContentDelay({ triggerAt: 0.3 });
  
  // Fallback de sécurité - si le hook ne fonctionne pas, afficher après 1 seconde
  const [fallbackVisible, setFallbackVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setFallbackVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const shouldShowContent = isContentVisible || fallbackVisible;
  
  // Hooks pour les animations des sections
  const titleLatestRef = useInView({ threshold: 0.3 });
  const heroCardRef = useInView({ threshold: 0.2 });
  const sideCard1Ref = useInView({ threshold: 0.2 });
  const sideCard2Ref = useInView({ threshold: 0.2 });
  const titleOtherRef = useInView({ threshold: 0.3 });

  // Hook pour gérer plusieurs cartes d'actualités - simplifié

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header cohérent avec les autres pages */}
      <div className="mb-16">
        <PageHeader
          seoTitle="Actualités - Association 1,2,3 Soleil"
          mainTitle="SUIVEZ"
          subtitle="NOS ACTUALITÉS"
          description="Suivez l'actualité de l'association 1,2,3 Soleil: actions de médiation, diffusions, partenariats et appels à participation. Restez informé des temps forts et des nouvelles initiatives."
        />
      </div>

      {/* Section HERO - 3 dernières actualités */}
      {latestNews.length > 0 && (
        <div className={`max-w-6xl mx-auto px-4 py-16 transition-opacity duration-500 ${shouldShowContent ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <div 
              ref={titleLatestRef.ref as React.RefObject<HTMLDivElement>}
              className={`text-center mb-12 scroll-animate fade-up ${titleLatestRef.isInView && shouldShowContent ? 'in-view' : ''}`}
            >
              <h2 className="display-title text-3xl mb-12 text-center text-[color:var(--neutral-dark)]">Dernières actualités</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
              {/* Grande carte principale - BREAKING NEWS */}
              <div 
                ref={heroCardRef.ref as React.RefObject<HTMLDivElement>}
                className={`lg:col-span-8 scroll-animate scale-in ${heroCardRef.isInView && shouldShowContent ? 'in-view' : ''}`}
              >
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
                  {latestNews.slice(1, 3).map((actualite, index) => {
                    const ref = index === 0 ? sideCard1Ref : sideCard2Ref;
                    return (
                      <div 
                        key={actualite.id} 
                        ref={ref.ref as React.RefObject<HTMLDivElement>}
                        className={`relative scroll-animate scale-in scroll-delay-${(index + 1) * 100} ${ref.isInView && shouldShowContent ? 'in-view' : ''}`}
                      >
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
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section NEWSPAPER - Toutes les autres actualités */}
      {otherNews.length > 0 && (
        <div className={`bg-gray-100 py-16 transition-opacity duration-500 ${shouldShowContent ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-6xl mx-auto px-4">
            <div>
              <div 
                ref={titleOtherRef.ref as React.RefObject<HTMLDivElement>}
                className={`text-center mb-12 scroll-animate fade-up ${titleOtherRef.isInView && shouldShowContent ? 'in-view' : ''}`}
              >
                <h2 className="display-title text-3xl mb-12 text-center text-[color:var(--neutral-dark)]">Toutes les actualités</h2>
              </div>

              {/* Layout en colonnes style journal */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherNews.map((actualite, index) => {
                  const delay = (index % 3) * 100; // Délai basé sur la colonne
                  
                  return (
                    <div 
                      key={actualite.id} 
                      className={`group scroll-animate fade-up scroll-delay-${delay} ${shouldShowContent ? 'in-view' : ''}`}
                    >
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
                  );
                })}
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

