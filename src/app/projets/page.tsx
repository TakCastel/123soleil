'use client';

import { useState } from 'react';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useInView } from '@/hooks/useInView';

export default function Projets() {
  const [activeFilter, setActiveFilter] = useState('tous');
  const { ref: gridRef, isInView, reset } = useInView({ 
    threshold: 0.3, // Au moins 30% de la grille doit être visible
    rootMargin: '0px 0px -100px 0px' // Déclenche 100px avant que l'élément soit complètement visible
  });

  // Réinitialiser l'animation quand le filtre change
  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
    reset(); // Réinitialiser l'état d'animation
  };

  const filters = [
    { id: 'tous', label: 'Tous' },
    { id: 'films', label: 'Lorem Ipsum' },
    { id: 'documentaires', label: 'Dolor Sit' },
    { id: 'ateliers', label: 'Consectetur' },
    { id: 'jeunesse', label: 'Adipiscing' }
  ];

  const projets = [
    {
      id: 1,
      titre: 'Lorem Ipsum Dolor Sit',
      categorie: 'films',
      annee: 2023,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
      image: 'Image de la médiation'
    },
    {
      id: 2,
      titre: 'Consectetur Adipiscing Elit',
      categorie: 'ateliers',
      annee: 2024,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      image: 'Image de la médiation'
    },
    {
      id: 3,
      titre: 'Sed Do Eiusmod Tempor',
      categorie: 'documentaires',
      annee: 2023,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      image: 'Image de la médiation'
    },
    {
      id: 4,
      titre: 'Incididunt Ut Labore',
      categorie: 'jeunesse',
      annee: 2024,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
      image: 'Image de la médiation'
    },
    {
      id: 5,
      titre: 'Dolore Magna Aliqua',
      categorie: 'films',
      annee: 2022,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'Image de la médiation'
    },
    {
      id: 6,
      titre: 'Ut Enim Ad Minim',
      categorie: 'ateliers',
      annee: 2024,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.',
      image: 'Image de la médiation'
    }
  ];

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
            <span className="display-title text-5xl md:text-6xl text-[color:var(--secondary)] title-tilt mb-1 inline-block">L’ACTION</span>
          </div>
          <p className="subtitle-black small mt-1">DE L’ASSOCIATION</p>
          <p className="text-gray-700 max-w-3xl mx-auto mt-4">
            Explorez l’ensemble de nos médiations: films, documentaires, ateliers et projets jeunesse.
            Des dispositifs construits pour créer du lien, favoriser l’expression et transmettre par l’image.
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
      <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 cards-grid">
        {filteredProjets.map((projet, index) => (
          <Card
            key={projet.id}
            title={projet.titre}
            description={projet.description}
            imageAlt={projet.image}
            badge={projet.annee}
            category={projet.categorie}
            href={`/projets`}
            ctaLabel="Voir la médiation →"
            isVisible={isInView}
            delay={index * 0.05} // Délai échelonné de 50ms entre chaque carte
          />
        ))}
      </div>

      {filteredProjets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune médiation trouvée pour cette catégorie.</p>
        </div>
      )}

      {/* Bouton voir tous les projets */}
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

      </div>
    </div>
  );
}
