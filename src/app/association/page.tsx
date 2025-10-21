export default function Association() {
  return (
    <div className="">
      {/* En-tête diagonal jaune à pois */}
      <section className="bg-diagonal-primary dotted-overlay">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
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
          <div>
            <h2 className="display-title text-3xl mb-1 text-[color:var(--neutral-dark)]">LES OBJECTIFS</h2>
            <p className="subtitle-black small mb-4">DES ATELIERS</p>
            <p className="text-gray-700 mb-4">
              Créée en 2017, l’association 1,2,3 Soleil est implantée à Avignon (84000). Elle
              favorise les initiatives audiovisuelles collectives et citoyennes auprès des jeunes
              et des habitants des quartiers prioritaires.
            </p>
            <p className="text-gray-700 mb-4">
              Les médiations associent tournage, écriture, montage et diffusion, dans un cadre d’éducation
              à l’image et aux médias. Depuis 2023, le siège social est situé à la Maison pour Tous Monclar (MPT).
            </p>
          </div>
          <div className="w-full ratio-4-3 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Image de couverture (picsum)</span>
          </div>
        </div>
      </section>

      {/* Objectifs des ateliers */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-[color:var(--primary)] dotted-overlay rounded-lg p-8 md:p-10">
          <h2 className="display-title text-3xl text-[color:var(--secondary)] mb-6">LES OBJECTIFS DES ATELIERS</h2>
          <ul className="list-stars space-y-3 text-[color:var(--neutral-dark)]">
            <li>Favoriser un sens fort des liens et du tissu intergénérationnel.</li>
            <li>Développer des dispositifs de médiation vidéo avec des participants solidaires.</li>
            <li>Sensibiliser aux réalités contemporaines et territoriales.</li>
            <li>Produire des contenus audiovisuels porteurs d&apos;inclusion et de partage.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
