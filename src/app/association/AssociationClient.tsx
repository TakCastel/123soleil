'use client';

import { useInView } from '@/hooks/useInView';

export default function AssociationClient() {
  // Hooks pour les animations
  const headerRef = useInView({ threshold: 0.2 });
  const gridLeftRef = useInView({ threshold: 0.2 });
  const gridRightRef = useInView({ threshold: 0.2 });
  const objectifsRef = useInView({ threshold: 0.2 });

  return (
    <div className="">
      {/* En-tête diagonal jaune à pois */}
      <section className="bg-diagonal-primary dotted-overlay">
        <div 
          ref={headerRef.ref as React.RefObject<HTMLDivElement>}
          className={`max-w-6xl mx-auto px-4 py-16 text-center scroll-animate fade-in ${headerRef.isInView ? 'in-view' : ''}`}
        >
          <h1 className="display-title text-5xl md:text-6xl text-[color:var(--secondary)] title-tilt mb-3">1,2,3...</h1>
          <p className="subtitle-black small mt-1">Quelques mots</p>
          <p className="text-gray-700 max-w-3xl mx-auto mt-4">
            Découvrez l&apos;histoire, les missions et les engagements de notre association audiovisuelle, au service
            d&apos;une médiation culturelle solidaire et inclusive sur le territoire avignonnais.
          </p>
        </div>
      </section>

      {/* Présentation */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div 
            ref={gridLeftRef.ref as React.RefObject<HTMLDivElement>}
            className={`scroll-animate fade-up ${gridLeftRef.isInView ? 'in-view' : ''}`}
          >
            <h2 className="display-title text-3xl mb-1 text-[color:var(--neutral-dark)]">L&apos;ACTION DE</h2>
            <p className="subtitle-black small mb-4">L&apos;ASSOCIATION</p>
            <p className="text-gray-700 mb-4">
              Chaque année, une douzaine de professionnels du cinéma, avec des bénévoles de l&apos;association, organisent des ateliers cinéma.
            </p>
            <p className="text-gray-700 mb-4">
              Notre association, fondée par des habitués du cinéma Utopia, se met en lien avec des jeunes issus de diverses structures de la ville le temps d&apos;une collaboration autour d&apos;un court métrage.
            </p>
            <p className="text-gray-700 mb-4">
              Chaque médiation est réalisée durant une journée, de l&apos;écriture du scénario au tournage.
              Par la suite les films sont montés par les réalisateurs, parfois en présence des jeunes.
            </p>
            <p className="text-gray-700 mb-4">
              Depuis septembre 2017, 36 films ont été réalisés selon ce dispositif. Ces films sont diffusés lors de projections publiques au cinéma Utopia et dans le cadre de diverses soirées associatives.
            </p>
            <p className="text-gray-700 mb-4">
              Les fonds récoltés vont au bénéfice d&apos;associations locales qui œuvrent auprès de personnes en situation de précarité et de fragilité.
            </p>
          </div>
          <div 
            ref={gridRightRef.ref as React.RefObject<HTMLDivElement>}
            className={`w-full ratio-4-3 bg-gray-200 flex items-center justify-center scroll-animate scale-in scroll-delay-200 ${gridRightRef.isInView ? 'in-view' : ''}`}
          >
            <span className="text-gray-500">Image de couverture (picsum)</span>
          </div>
        </div>
      </section>

      {/* Objectifs des ateliers */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div 
          ref={objectifsRef.ref as React.RefObject<HTMLDivElement>}
          className={`bg-white border-2 border-black p-8 md:p-10 scroll-animate scale-in ${objectifsRef.isInView ? 'in-view' : ''}`}
        >
          <h2 className="display-title text-3xl text-[color:var(--secondary)] mb-6">LES OBJECTIFS DES ATELIERS</h2>
          <ul className="list-stars space-y-3 text-[color:var(--neutral-dark)]">
            <li>Créer un cadre de rencontre créatif, bienveillant et inclusif entre des personnes issues de milieux sociaux parfois radicalement opposés.</li>
            <li>Favoriser au sein des ateliers une mixité intergénérationnelle.</li>
            <li>Élaborer des dispositifs de médiation vidéo, avec un collectif de réalisateurs et de bénévoles solidaires.</li>
            <li>Sensibiliser aux réalités sociales (immigration, pauvreté, exclusion sociale, inclusion en général).</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

