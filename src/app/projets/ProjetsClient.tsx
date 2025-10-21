'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import { useInView } from '@/hooks/useInView';
import { useMultipleInView } from '@/hooks/useMultipleInView';
import { Projet } from '@/lib/projets';

interface ProjetsClientProps {
  projets: Projet[];
  filters: { id: string; label: string }[];
}

export default function ProjetsClient({ projets, filters }: ProjetsClientProps) {
  const [activeFilter, setActiveFilter] = useState('tous');
  
  // Hooks pour les animations
  const headerRef = useInView({ threshold: 0.2 });
  const filtersRef = useInView({ threshold: 0.3 });
  
  // Hook pour gérer plusieurs cartes
  const { registerRef, isInView } = useMultipleInView({ threshold: 0.2 });

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const filteredProjets = activeFilter === 'tous' 
    ? projets 
    : projets.filter(projet => projet.categorie === activeFilter);

  return (
    <div className="">
      {/* En-tête diagonal jaune à pois */}
      <section className="bg-diagonal-primary dotted-overlay">
        <div 
          ref={headerRef.ref as React.RefObject<HTMLDivElement>}
          className={`max-w-6xl mx-auto px-4 py-16 text-center scroll-animate fade-in ${headerRef.isInView ? 'in-view' : ''}`}
        >
          {/* Hidden SEO H1 */}
          <h1 className="sr-only">Médiations</h1>
          {/* Visible phrase pair */}
          <div>
            <span className="display-title text-5xl md:text-6xl text-[color:var(--secondary)] title-tilt mb-1 inline-block">L&apos;ACTION</span>
          </div>
          <p className="subtitle-black small mt-1">DE L&apos;ASSOCIATION</p>
          <p className="text-gray-700 max-w-3xl mx-auto mt-4">
            Explorez l&apos;ensemble de nos médiations: films, documentaires, ateliers et projets jeunesse.
            Des dispositifs construits pour créer du lien, favoriser l&apos;expression et transmettre par l&apos;image.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Filtres */}
        <div 
          ref={filtersRef.ref as React.RefObject<HTMLDivElement>}
          className={`mb-16 scroll-animate fade-up ${filtersRef.isInView ? 'in-view' : ''}`}
        >
          <div className="flex flex-wrap gap-4">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-[color:var(--secondary)] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={{ 
                  animationDelay: filtersRef.isInView ? `${index * 50}ms` : '0ms'
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des médiations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 cards-grid">
          {filteredProjets.map((projet, index) => {
            const delayIndex = index % 3; // 0, 1, ou 2
            const delayClass = delayIndex === 0 ? 'scroll-delay-0' : delayIndex === 1 ? 'scroll-delay-100' : 'scroll-delay-200';
            
            return (
              <div
                key={projet.id}
                ref={registerRef(`card-${projet.id}`)}
                className={`scroll-animate fade-up ${delayClass} ${isInView(`card-${projet.id}`) ? 'in-view' : ''}`}
              >
                <Card
                  title={projet.titre}
                  description={projet.description}
                  imageAlt={projet.titre}
                  imageUrl={projet.image}
                  badge={projet.annee}
                  category={projet.categorie}
                  href={`/projets/${projet.id}`}
                  ctaLabel="Voir la médiation →"
                />
              </div>
            );
          })}
        </div>

        {filteredProjets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune médiation trouvée pour cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}

