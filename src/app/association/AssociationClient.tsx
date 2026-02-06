'use client';

import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import MessageBox from '@/components/MessageBox';
import PageHeader from '@/components/PageHeader';
import { usePageContentDelay } from '@/hooks/usePageContentDelay';
import type React from 'react';

interface AssociationClientProps {
  associationVideoUrl?: string | null;
}

export default function AssociationClient({ associationVideoUrl }: AssociationClientProps) {
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
        <div className="flex justify-center pb-8">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg border-2 border-black p-1 bg-black overflow-hidden shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/logo-123soleil-animated.gif"
              alt="Logo 1, 2, 3 Soleil animé"
              className="block w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
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
              Notre association, fondée par des habitués du cinéma Utopia, se met en lien avec des jeunes issus de diverses structures de la ville le temps d&apos;une collaboration autour d&apos;un court-métrage.
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
            className={`w-full ratio-4-3 bg-black border-2 border-black overflow-hidden flex items-center justify-center scroll-animate scale-in scroll-delay-200 ${gridRightRef.isInView && shouldShowContent ? 'in-view' : ''}`}
          >
            {associationVideoUrl ? (
              <video
                src={associationVideoUrl}
                controls
                className="w-full h-full object-contain"
                playsInline
              >
                Votre navigateur ne prend pas en charge la lecture de vidéos.
              </video>
            ) : (
              <span className="text-gray-500 text-sm">Vidéo à venir</span>
            )}
          </div>
        </div>
      </section>

      {/* Trombinoscope — 3 rôles asso en premier, puis réals en bas — dispersé type tableau */}
      <section className={`max-w-6xl mx-auto px-4 py-12 transition-opacity duration-500 ${shouldShowContent ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="display-title text-3xl mb-2 text-[color:var(--neutral-dark)] text-center">
          LE BUREAU
        </h2>
        <p className="subtitle-black small text-center mb-12">Trombinoscope</p>

        {/* 3 rôles de l'association en premier */}
        <ul className="flex flex-wrap justify-center items-center gap-8 md:gap-12 py-4">
          {[
            { name: 'Christine Conte', role: 'Présidente', slug: 'christine-conte', rotate: -5, x: -10, y: 6 },
            { name: 'Claire Feronwilmart', role: 'Administratrice', slug: 'claire-feronwilmart', rotate: 8, x: 12, y: -8 },
            { name: 'Elisabeth Cozian', role: 'Trésorière', slug: 'elisabeth-cozian', rotate: -4, x: 6, y: 10 }
          ].map((person, index) => (
            <li
              key={person.slug}
              className={`scroll-animate fade-up scroll-delay-${(index % 5) * 100} ${shouldShowContent ? 'in-view' : ''}`}
              style={{
                transform: `rotate(${person.rotate}deg) translate(${person.x}px, ${person.y}px)`
              }}
            >
              <div className="relative w-full max-w-[180px] overflow-visible">
                <div className="relative z-[1] p-2 pt-3 bg-white border border-black/20 rounded-sm" style={{ boxShadow: '4px 6px 16px rgba(0,0,0,0.18), 1px 2px 4px rgba(0,0,0,0.1)' }}>
                  <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 border border-black/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/assets/trombinoscope/${person.slug}.png`}
                      alt={`${person.name}, ${person.role}`}
                      className="w-full h-full object-cover object-top scale-125"
                      width={180}
                      height={240}
                    />
                  </div>
                  <p className="mt-2 font-bold text-[color:var(--neutral-dark)] text-center text-sm">
                    {person.name}
                  </p>
                  <p className="text-[color:var(--neutral-dark)]/80 text-center text-sm">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Réalisateurs et réalisatrices — première ligne de 3 */}
        <ul className="flex flex-wrap justify-center items-center gap-8 md:gap-12 py-4 mt-16 md:mt-20">
          {[
            { name: 'Arnaud Ban', role: 'Réalisateur', slug: 'arnaud-ban', rotate: 6, x: -14, y: -4 },
            { name: 'Boris Doussy', role: 'Réalisateur', slug: 'boris-doussy', rotate: -7, x: 10, y: 12 },
            { name: 'Pierre Lacourt', role: 'Réalisateur', slug: 'pierre-lacourt', rotate: -4, x: 8, y: -10 }
          ].map((person, index) => (
            <li
              key={person.slug}
              className={`scroll-animate fade-up scroll-delay-${(index % 5) * 100} ${shouldShowContent ? 'in-view' : ''}`}
              style={{
                transform: `rotate(${person.rotate}deg) translate(${person.x}px, ${person.y}px)`
              }}
            >
              <div className="relative w-full max-w-[180px] overflow-visible">
                <div className="relative z-[1] p-2 pt-3 bg-white border border-black/20 rounded-sm" style={{ boxShadow: '4px 6px 16px rgba(0,0,0,0.18), 1px 2px 4px rgba(0,0,0,0.1)' }}>
                  <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 border border-black/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/assets/trombinoscope/${person.slug}.png`}
                      alt={`${person.name}, ${person.role}`}
                      className="w-full h-full object-cover object-top scale-125"
                      width={180}
                      height={240}
                    />
                  </div>
                  <p className="mt-2 font-bold text-[color:var(--neutral-dark)] text-center text-sm">
                    {person.name}
                  </p>
                  <p className="text-[color:var(--neutral-dark)]/80 text-center text-sm">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Réalisateurs et réalisatrices — deuxième ligne de 3 */}
        <ul className="flex flex-wrap justify-center items-center gap-8 md:gap-12 py-4 mt-4">
          {[
            { name: 'Marie Delaruelle', role: 'Réalisatrice', slug: 'marie-delaruelle', rotate: -6, x: -8, y: 8 },
            { name: 'Karine Music', role: 'Réalisatrice', slug: 'karine-music', rotate: 5, x: 14, y: -6 },
            { name: 'Florine Clap', role: 'Réalisatrice', slug: 'florine-clap', rotate: -3, x: -12, y: 10 }
          ].map((person, index) => (
            <li
              key={person.slug}
              className={`scroll-animate fade-up scroll-delay-${(index % 5) * 100} ${shouldShowContent ? 'in-view' : ''}`}
              style={{
                transform: `rotate(${person.rotate}deg) translate(${person.x}px, ${person.y}px)`
              }}
            >
              <div className="relative w-full max-w-[180px] overflow-visible">
                <div className="relative z-[1] p-2 pt-3 bg-white border border-black/20 rounded-sm" style={{ boxShadow: '4px 6px 16px rgba(0,0,0,0.18), 1px 2px 4px rgba(0,0,0,0.1)' }}>
                  <div className="w-full aspect-[3/4] overflow-hidden bg-gray-100 border border-black/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/assets/trombinoscope/${person.slug}.png`}
                      alt={`${person.name}, ${person.role}`}
                      className="w-full h-full object-cover object-top scale-125"
                      width={180}
                      height={240}
                    />
                  </div>
                  <p className="mt-2 font-bold text-[color:var(--neutral-dark)] text-center text-sm">
                    {person.name}
                  </p>
                  <p className="text-[color:var(--neutral-dark)]/80 text-center text-sm">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
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

