'use client';

import { useInView } from '@/hooks/useInView';
import Card from '@/components/Card';
import NewsCard from '@/components/NewsCard';
import ButtonOffset from '@/components/ButtonOffset';
import MessageBox from '@/components/MessageBox';
import { MdMovie, MdPeople, MdLocationCity, MdStar, MdVideocam, MdHandshake } from 'react-icons/md';
import type { Projet } from '@/lib/projets';
import type { Actualite } from '@/lib/actualites';
import type { HomeChiffres } from '@/lib/home-settings';
import type React from 'react';

const CHIFFRES_LABELS = [
  'courts-métrages dont 7 Lip-dubs',
  'participants de la région',
  'projections',
  'éditions du festival',
  'Vidéastes',
  'adhérents, membres actifs'
] as const;

const CHIFFRES_DETAILS: (string | null)[] = [
  null,
  null,
  'dans des lieux de diffusion récurrents : le cinéma Utopia et le jardin du Verger Urbain V, le Fenouil à vapeur, le stade de Désaignes, Cinéma Écran village, Salle des fêtes de Caromb...',
  "« On fait de l'image ça se partage » en Ardèche",
  null,
  null
];

interface HomeClientProps {
  projets: Projet[];
  actualites: Actualite[];
  chiffres?: HomeChiffres | null;
}

function toNum(value: string | null | undefined): string {
  const s = value?.trim();
  return s !== undefined && s !== '' ? s : '0';
}

export default function HomeClient({ projets, actualites, chiffres }: HomeClientProps) {
  const nums = [
    toNum(chiffres?.courts_metrages),
    toNum(chiffres?.participants_region),
    toNum(chiffres?.projections),
    toNum(chiffres?.editions_festival),
    toNum(chiffres?.realisateurs),
    toNum(chiffres?.adherents)
  ];
  // Hooks pour chaque section
  const projetsSection = useInView({ threshold: 0.1 });
  const chiffresSection = useInView({ threshold: 0.1 });
  const actualitesSection = useInView({ threshold: 0.1 });

  // Hooks individuels pour les cartes de projets
  const projet1 = useInView({ threshold: 0.2 });
  const projet2 = useInView({ threshold: 0.2 });
  const projet3 = useInView({ threshold: 0.2 });

  // Hooks individuels pour les statistiques
  const stat1 = useInView({ threshold: 0.3 });
  const stat2 = useInView({ threshold: 0.3 });
  const stat3 = useInView({ threshold: 0.3 });
  const stat4 = useInView({ threshold: 0.3 });
  const stat5 = useInView({ threshold: 0.3 });
  const stat6 = useInView({ threshold: 0.3 });

  const projetRefs = [projet1, projet2, projet3];
  return (
    <>
      {/* Encart retiré : élargissement du champ d'action
      <section className="max-w-6xl mx-auto px-4 py-12">
        <MessageBox 
          title="1,2,3 Soleil !"
          centered={true}
        >
          <p>
            élargit son champ d&apos;action et propose depuis 2022 des ateliers aux établissements scolaires, centres sociaux, ESAT, EPAHD, MPT et d&apos;autres structures sociales du Grand Avignon et au-delà.
          </p>
        </MessageBox>
      </section>
      */}

      {/* News Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 
          ref={actualitesSection.ref as React.RefObject<HTMLHeadingElement>}
          className={`display-title text-3xl mb-12 text-center text-[color:var(--neutral-dark)] scroll-animate slide-left ${actualitesSection.isInView ? 'in-view' : ''}`}
        >
          Actualités
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {actualites.map((actualite, index) => (
            <NewsCard
              key={actualite.id}
              title={actualite.titre}
              description={actualite.description}
              imageUrl={actualite.image}
              imageAlt={actualite.titre}
              date={actualite.date}
              category={actualite.categorie}
              href={`/actualites/${actualite.id}`}
              variant="newspaper"
              delay={index * 0.2}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <ButtonOffset 
            onClick={() => window.location.href = '/actualites'}
            variant="white"
            className="inline-block"
          >
            Voir toutes les actualités
          </ButtonOffset>
        </div>
      </section>

      {/* Quelques chiffres */}
      <section className="bg-[color:var(--primary)] dotted-overlay py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 
            ref={chiffresSection.ref as React.RefObject<HTMLHeadingElement>}
            className={`display-title text-3xl mb-2 text-center text-[color:var(--secondary)] scroll-animate slide-left ${chiffresSection.isInView ? 'in-view' : ''}`}
          >
            QUELQUES CHIFFRES
          </h2>
          <p className="subtitle-black small text-center mb-12">Depuis 2017</p>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div 
              ref={stat1.ref as React.RefObject<HTMLDivElement>}
              className={`bg-white border-2 border-black p-6 flex items-start gap-4 scroll-animate slide-left scroll-delay-100 ${stat1.isInView ? 'in-view' : ''}`}
            >
              <MdMovie className="text-[color:var(--secondary)] text-4xl flex-shrink-0" />
              <div>
                <p className="display-title text-5xl text-[color:var(--neutral-dark)] mb-2">{nums[0]}</p>
                <p className="text-[color:var(--neutral-dark)] font-bold text-lg">{CHIFFRES_LABELS[0]}</p>
              </div>
            </div>
            <div 
              ref={stat2.ref as React.RefObject<HTMLDivElement>}
              className={`bg-white border-2 border-black p-6 flex items-start gap-4 scroll-animate slide-right scroll-delay-200 ${stat2.isInView ? 'in-view' : ''}`}
            >
              <MdPeople className="text-[color:var(--secondary)] text-4xl flex-shrink-0" />
              <div>
                <p className="display-title text-5xl text-[color:var(--neutral-dark)] mb-2">{nums[1]}</p>
                <p className="text-[color:var(--neutral-dark)] font-bold text-lg">{CHIFFRES_LABELS[1]}</p>
              </div>
            </div>
            <div 
              ref={stat3.ref as React.RefObject<HTMLDivElement>}
              className={`bg-white border-2 border-black p-6 flex items-start gap-4 scroll-animate slide-left scroll-delay-300 ${stat3.isInView ? 'in-view' : ''}`}
            >
              <MdLocationCity className="text-[color:var(--secondary)] text-4xl flex-shrink-0" />
              <div>
                <p className="display-title text-5xl text-[color:var(--neutral-dark)] mb-2">{nums[2]}</p>
                <p className="text-[color:var(--neutral-dark)] font-bold text-lg mb-2">{CHIFFRES_LABELS[2]}</p>
                {CHIFFRES_DETAILS[2] && <p className="text-gray-700 text-sm">{CHIFFRES_DETAILS[2]}</p>}
              </div>
            </div>
            <div 
              ref={stat4.ref as React.RefObject<HTMLDivElement>}
              className={`bg-white border-2 border-black p-6 flex items-start gap-4 scroll-animate slide-right scroll-delay-400 ${stat4.isInView ? 'in-view' : ''}`}
            >
              <MdStar className="text-[color:var(--secondary)] text-4xl flex-shrink-0" />
              <div>
                <p className="display-title text-5xl text-[color:var(--neutral-dark)] mb-2">{nums[3]}</p>
                <p className="text-[color:var(--neutral-dark)] font-bold text-lg">{CHIFFRES_LABELS[3]}</p>
                {CHIFFRES_DETAILS[3] && <p className="text-gray-700 text-sm">{CHIFFRES_DETAILS[3]}</p>}
              </div>
            </div>
            <div 
              ref={stat5.ref as React.RefObject<HTMLDivElement>}
              className={`bg-white border-2 border-black p-6 flex items-start gap-4 scroll-animate slide-left scroll-delay-500 ${stat5.isInView ? 'in-view' : ''}`}
            >
              <MdVideocam className="text-[color:var(--secondary)] text-4xl flex-shrink-0" />
              <div>
                <p className="display-title text-5xl text-[color:var(--neutral-dark)] mb-2">{nums[4]}</p>
                <p className="text-[color:var(--neutral-dark)] font-bold text-lg">{CHIFFRES_LABELS[4]}</p>
              </div>
            </div>
            <div 
              ref={stat6.ref as React.RefObject<HTMLDivElement>}
              className={`bg-white border-2 border-black p-6 flex items-start gap-4 scroll-animate slide-right scroll-delay-600 ${stat6.isInView ? 'in-view' : ''}`}
            >
              <MdHandshake className="text-[color:var(--secondary)] text-4xl flex-shrink-0" />
              <div>
                <p className="display-title text-5xl text-[color:var(--neutral-dark)] mb-2">{nums[5]}</p>
                <p className="text-[color:var(--neutral-dark)] font-bold text-lg">{CHIFFRES_LABELS[5]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 
          ref={projetsSection.ref as React.RefObject<HTMLHeadingElement>}
          className={`display-title text-3xl mb-12 text-center text-[color:var(--neutral-dark)] scroll-animate slide-left ${projetsSection.isInView ? 'in-view' : ''}`}
        >
          Derniers courts-métrages
        </h2>
        <div className="grid md:grid-cols-2 gap-12 cards-grid">
          {projets.map((projet, index) => (
            <div
              key={projet.id}
              ref={projetRefs[index]?.ref as React.RefObject<HTMLDivElement>}
              className={`scroll-animate slide-up scroll-delay-${(index + 1) * 100} ${projetRefs[index]?.isInView ? 'in-view' : ''}`}
            >
              <Card
                title={projet.titre}
                description={projet.description}
                imageUrl={projet.image}
                imageAlt={projet.titre}
                badge={projet.annee}
                category={projet.categorie}
                href={`/projets/${projet.id}`}
                ctaLabel="En savoir plus →"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <ButtonOffset 
            onClick={() => window.location.href = '/projets'}
            variant="white"
            className="inline-block"
          >
            Voir tous les projets
          </ButtonOffset>
        </div>
      </section>
    </>
  );
}

