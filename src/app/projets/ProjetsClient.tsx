'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useInView } from '@/hooks/useInView';
import { Projet } from '@/lib/projets';

interface ProjetsClientProps {
  projets: Projet[];
  filters: { id: string; label: string }[];
}

export default function ProjetsClient({ projets, filters }: ProjetsClientProps) {
  const [activeFilter, setActiveFilter] = useState('tous');
  const { ref: gridRef, isInView, reset } = useInView({ 
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px'
  });

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    reset();
  };

  const filteredProjets = activeFilter === 'tous' 
    ? projets 
    : projets.filter(projet => projet.categorie === activeFilter);

  return (
    <div className="">
      {/* En-tête diagonal jaune à pois */}
      <section className="bg-diagonal-primary dotted-overlay">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
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
        <div className="mb-16">
          <div className="flex flex-wrap gap-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-[color:var(--secondary)] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grille des médiations */}
        <div ref={gridRef as React.RefObject<HTMLDivElement>} className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 cards-grid">
          {filteredProjets.map((projet, index) => (
            <Card
              key={projet.id}
              title={projet.titre}
              description={projet.description}
              imageAlt={projet.titre}
              imageUrl={projet.image}
              badge={projet.annee}
              category={projet.categorie}
              href={`/projets/${projet.id}`}
              ctaLabel="Voir la médiation →"
              isVisible={isInView}
              delay={index * 0.05}
            />
          ))}
        </div>

        {filteredProjets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune médiation trouvée pour cette catégorie.</p>
          </div>
        )}

        {/* Bouton voir tous les projets */}
        {projets.length > 0 && (
          <div className="text-center mt-16">
            <Button 
              href="/projets" 
              bgColor="var(--primary)" 
              labelColor="#000000"
              className="inline-block"
            >
              Voir tous les projets
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

