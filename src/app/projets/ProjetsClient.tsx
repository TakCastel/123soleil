'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Card from '@/components/Card';
import FilterButton from '@/components/FilterButton';
import { useInView } from '@/hooks/useInView';
import { useMultipleInView } from '@/hooks/useMultipleInView';
import { Projet } from '@/lib/projets';

interface ProjetsClientProps {
  projets: Projet[];
  filters: { id: string; label: string }[];
}

export default function ProjetsClient({ projets, filters }: ProjetsClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // États séparés et clairs
  const [displayFilter, setDisplayFilter] = useState(() => {
    const filterParam = searchParams.get('filter');
    return filterParam && filters.some(f => f.id === filterParam) ? filterParam : 'tous';
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  // Hooks pour les animations
  const headerRef = useInView({ threshold: 0.2 });
  const filtersRef = useInView({ threshold: 0.3 });
  const { registerRef, isInView } = useMultipleInView({ threshold: 0.2 });

  // Synchroniser avec les changements d'URL (navigation navigateur)
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    const newFilter = filterParam && filters.some(f => f.id === filterParam) ? filterParam : 'tous';
    if (newFilter !== displayFilter && !isLoading) {
      setDisplayFilter(newFilter);
    }
  }, [searchParams, filters, displayFilter, isLoading]);

  // Mettre à jour le filtre affiché une fois le chargement terminé
  useEffect(() => {
    if (!isLoading) {
      const filterParam = searchParams.get('filter');
      const newFilter = filterParam && filters.some(f => f.id === filterParam) ? filterParam : 'tous';
      setDisplayFilter(newFilter);
    }
  }, [isLoading, searchParams, filters]);


  const handleFilterChange = async (filterId: string) => {
    // 1. Bloquer les filtres immédiatement
    setIsLoading(true);
    
    // 2. Mettre à jour l'URL (ce qui va déclencher un re-render avec les nouveaux projets)
    const params = new URLSearchParams(searchParams.toString());
    if (filterId === 'tous') {
      params.delete('filter');
    } else {
      params.set('filter', filterId);
    }
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.push(`/projets${newUrl}`, { scroll: false });
    
    // 3. Attendre que la navigation soit terminée
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // 4. Débloquer les filtres
    setIsLoading(false);
  };

  // Les projets sont déjà filtrés côté serveur
  const filteredProjets = projets;

  // Contenu SEO adaptatif selon le filtre
  const getSeoContent = () => {
    switch (displayFilter) {
      case 'court-metrages':
        return {
          title: 'Réalisations',
          description: 'Découvrez nos réalisations de fictions cinéma et documentaires. Des créations originales qui explorent différents genres et sujets.',
          seoTitle: 'Réalisations - Fictions cinéma et documentaires'
        };
      case 'lipdubs':
        return {
          title: 'Lipdubs',
          description: 'Nos lipdubs créatifs et festifs, réalisés avec la participation active des communautés locales.',
          seoTitle: 'Lipdubs - Créations participatives et festives'
        };
      case 'mediations':
        return {
          title: 'Médiations',
          description: 'Nos ateliers et dispositifs pensés sur-mesure pour établissements scolaires, centres sociaux, ESAT, EPAHD et autres structures sociales.',
          seoTitle: 'Médiations - Ateliers sur-mesure et dispositifs pédagogiques'
        };
      default:
        return {
          title: 'L\'ACTION',
          description: 'Explorez l\'ensemble de nos médiations: court métrages, lipdubs et ateliers. Des dispositifs construits pour créer du lien, favoriser l\'expression et transmettre par l\'image.',
          seoTitle: 'Médiations - Court métrages, Lipdubs et Ateliers'
        };
    }
  };

  const seoContent = getSeoContent();

  return (
    <div className="">
      {/* En-tête diagonal jaune à pois */}
      <section className="bg-diagonal-primary dotted-overlay">
        <div 
          ref={headerRef.ref as React.RefObject<HTMLDivElement>}
          className={`max-w-6xl mx-auto px-4 py-16 text-center scroll-animate fade-in ${headerRef.isInView ? 'in-view' : ''}`}
        >
          {/* Hidden SEO H1 */}
          <h1 className="sr-only">{seoContent.seoTitle}</h1>
          {/* Visible phrase pair */}
          <div>
            <span className="display-title text-5xl md:text-6xl text-[color:var(--secondary)] title-tilt mb-1 inline-block">{seoContent.title}</span>
          </div>
          <p className="subtitle-black small mt-1">DE L&apos;ASSOCIATION</p>
          <p className="text-gray-700 max-w-3xl mx-auto mt-4">
            {seoContent.description}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Filtres */}
        <div 
          ref={filtersRef.ref as React.RefObject<HTMLDivElement>}
          className={`mb-16 scroll-animate fade-up ${filtersRef.isInView ? 'in-view' : ''}`}
        >
          <div className="flex flex-wrap gap-3">
            {filters.map((filter, index) => (
              <FilterButton
                key={filter.id}
                onClick={() => !isLoading && handleFilterChange(filter.id)}
                active={displayFilter === filter.id}
                disabled={isLoading}
                style={{ 
                  animationDelay: filtersRef.isInView ? `${index * 50}ms` : '0ms'
                }}
              >
                {filter.label}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Grille des médiations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 cards-grid">
          {isLoading && (
            <div className="col-span-full flex justify-center items-center py-12">
              <div className="flex flex-col items-center space-y-4">
                {/* Loader simple et élégant */}
                <div className="w-8 h-8 border-3 border-gray-300 border-t-[var(--primary)] rounded-full animate-spin"></div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Chargement...</p>
                </div>
              </div>
            </div>
          )}
          {!isLoading && filteredProjets.map((projet, index) => {
            return (
              <div
                key={projet.id}
                className="opacity-100"
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

        {!isLoading && filteredProjets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune médiation trouvée pour cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}

