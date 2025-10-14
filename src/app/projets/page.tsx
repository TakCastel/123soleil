'use client';

import { useState } from 'react';

export default function Projets() {
  const [activeFilter, setActiveFilter] = useState('tous');

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
      image: 'Image du projet'
    },
    {
      id: 2,
      titre: 'Consectetur Adipiscing Elit',
      categorie: 'ateliers',
      annee: 2024,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      image: 'Image du projet'
    },
    {
      id: 3,
      titre: 'Sed Do Eiusmod Tempor',
      categorie: 'documentaires',
      annee: 2023,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      image: 'Image du projet'
    },
    {
      id: 4,
      titre: 'Incididunt Ut Labore',
      categorie: 'jeunesse',
      annee: 2024,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
      image: 'Image du projet'
    },
    {
      id: 5,
      titre: 'Dolore Magna Aliqua',
      categorie: 'films',
      annee: 2022,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'Image du projet'
    },
    {
      id: 6,
      titre: 'Ut Enim Ad Minim',
      categorie: 'ateliers',
      annee: 2024,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.',
      image: 'Image du projet'
    }
  ];

  const filteredProjets = activeFilter === 'tous' 
    ? projets 
    : projets.filter(projet => projet.categorie === activeFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Nos Projets</h1>
      
      <p className="text-gray-600 mb-12 max-w-3xl">
        Découvrez l'ensemble de nos créations : films, documentaires, ateliers de formation 
        et projets jeunesse. Chaque projet témoigne de notre engagement pour la création 
        audiovisuelle et la transmission des savoirs.
      </p>

      {/* Filtres */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeFilter === filter.id
                  ? 'bg-primary text-black'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grille des projets */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjets.map((projet) => (
          <div key={projet.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">{projet.image}</span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold">{projet.titre}</h3>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {projet.annee}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{projet.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 capitalize">
                  {projet.categorie}
                </span>
                <button className="text-black hover:underline">
                  Voir le projet →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun projet trouvé pour cette catégorie.</p>
        </div>
      )}

    </div>
  );
}
