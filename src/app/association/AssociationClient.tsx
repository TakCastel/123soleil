'use client';

import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import MessageBox from '@/components/MessageBox';
import PageHeader from '@/components/PageHeader';
import { usePageContentDelay } from '@/hooks/usePageContentDelay';
import type React from 'react';

export default function AssociationClient() {
  // Hook pour retarder l'apparition du contenu
  const isContentVisible = usePageContentDelay({ triggerAt: 0.3 }); // Délai plus court pour test
  
  // Fallback de sécurité - si le hook ne fonctionne pas, afficher après 1 seconde
  const [fallbackVisible, setFallbackVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setFallbackVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const shouldShowContent = isContentVisible || fallbackVisible;
  
  // Hooks pour les animations
  const gridLeftRef = useInView({ threshold: 0.2 });
  const gridRightRef = useInView({ threshold: 0.2 });

  return (
    <div className="">
      {/* En-tête diagonal jaune à pois */}
      <section className="bg-diagonal-primary dotted-overlay">
        <PageHeader
          seoTitle="Association 1,2,3 Soleil - Médiation culturelle solidaire"
          mainTitle="1,2,3..."
          subtitle="Quelques mots"
          description="Découvrez l'histoire, les missions et les engagements de notre association audiovisuelle, au service d'une médiation culturelle solidaire et inclusive sur le territoire avignonnais."
        />
      </section>

      {/* Présentation */}
      <section className={`max-w-6xl mx-auto px-4 py-12 transition-opacity duration-500 ${shouldShowContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div 
            ref={gridLeftRef.ref as React.RefObject<HTMLDivElement>}
            className={`scroll-animate fade-up ${gridLeftRef.isInView && shouldShowContent ? 'in-view' : ''}`}
          >
            <h2 className="display-title text-3xl mb-1 text-[color:var(--neutral-dark)]">L&apos;ACTION DE</h2>
            <p className="subtitle-black small mb-4">L&apos;ASSOCIATION</p>
            <p className={`text-gray-700 mb-4 scroll-animate fade-up scroll-delay-100 ${gridLeftRef.isInView && shouldShowContent ? 'in-view' : ''}`}>
              Chaque année, une douzaine de professionnels du cinéma, avec des bénévoles de l&apos;association, organisent des ateliers cinéma.
            </p>
            <p className={`text-gray-700 mb-4 scroll-animate fade-up scroll-delay-200 ${gridLeftRef.isInView && shouldShowContent ? 'in-view' : ''}`}>
              Notre association, fondée par des habitués du cinéma Utopia, se met en lien avec des jeunes issus de diverses structures de la ville le temps d&apos;une collaboration autour d&apos;un court métrage.
            </p>
            <p className={`text-gray-700 mb-4 scroll-animate fade-up scroll-delay-300 ${gridLeftRef.isInView && shouldShowContent ? 'in-view' : ''}`}>
              Chaque médiation est réalisée durant une journée, de l&apos;écriture du scénario au tournage.
              Par la suite les films sont montés par les réalisateurs, parfois en présence des jeunes.
            </p>
            <p className={`text-gray-700 mb-4 scroll-animate fade-up scroll-delay-400 ${gridLeftRef.isInView && shouldShowContent ? 'in-view' : ''}`}>
              Depuis septembre 2017, 36 films ont été réalisés selon ce dispositif. Ces films sont diffusés lors de projections publiques au cinéma Utopia et dans le cadre de diverses soirées associatives.
            </p>
            <p className={`text-gray-700 mb-4 scroll-animate fade-up scroll-delay-500 ${gridLeftRef.isInView && shouldShowContent ? 'in-view' : ''}`}>
              Les fonds récoltés vont au bénéfice d&apos;associations locales qui œuvrent auprès de personnes en situation de précarité et de fragilité.
            </p>
          </div>
          <div 
            ref={gridRightRef.ref as React.RefObject<HTMLDivElement>}
            className={`w-full ratio-4-3 bg-gray-200 flex items-center justify-center scroll-animate scale-in scroll-delay-200 ${gridRightRef.isInView && shouldShowContent ? 'in-view' : ''}`}
          >
            <span className="text-gray-500">Image de couverture (picsum)</span>
          </div>
        </div>
      </section>

      {/* Objectifs des ateliers */}
      <section className={`max-w-6xl mx-auto px-4 py-12 transition-opacity duration-500 ${shouldShowContent ? 'opacity-100' : 'opacity-0'}`}>
        <MessageBox 
          title="LES OBJECTIFS DES ATELIERS"
          centered={false}
        >
          <ul className="list-stars space-y-3 text-[color:var(--neutral-dark)]">
            <li>Créer un cadre de rencontre créatif, bienveillant et inclusif entre des personnes issues de milieux sociaux parfois radicalement opposés.</li>
            <li>Favoriser au sein des ateliers une mixité intergénérationnelle.</li>
            <li>Élaborer des dispositifs de médiation vidéo, avec un collectif de réalisateurs et de bénévoles solidaires.</li>
            <li>Sensibiliser aux réalités sociales (immigration, pauvreté, exclusion sociale, inclusion en général).</li>
          </ul>
        </MessageBox>
      </section>
    </div>
  );
}

