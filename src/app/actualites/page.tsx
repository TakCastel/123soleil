export default function Actualites() {
  const actualites = [
    {
      id: 1,
      titre: 'Lorem Ipsum Dolor Sit Amet',
      date: '15 Janvier 2024',
      categorie: 'Événement',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      image: 'Image actualité'
    },
    {
      id: 2,
      titre: 'Consectetur Adipiscing Elit',
      date: '10 Janvier 2024',
      categorie: 'Formation',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.',
      image: 'Image actualité'
    },
    {
      id: 3,
      titre: 'Sed Do Eiusmod Tempor',
      date: '5 Janvier 2024',
      categorie: 'Partenariat',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
      image: 'Image actualité'
    },
    {
      id: 4,
      titre: 'Incididunt Ut Labore Et',
      date: '20 Décembre 2023',
      categorie: 'Diffusion',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      image: 'Image actualité'
    },
    {
      id: 5,
      titre: 'Dolore Magna Aliqua Ut',
      date: '1er Décembre 2023',
      categorie: 'Appel à projets',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.',
      image: 'Image actualité'
    },
    {
      id: 6,
      titre: 'Enim Ad Minim Veniam',
      date: '25 Novembre 2023',
      categorie: 'Formation',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.',
      image: 'Image actualité'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Actualités</h1>
      
      <p className="text-gray-600 mb-12 max-w-3xl">
        Suivez l&apos;actualité de l&apos;association 1, 2, 3 Soleil : nouveaux projets, 
        événements, formations et partenariats.
      </p>

      {/* Actualités principales */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {actualites.slice(0, 2).map((actualite) => (
          <article key={actualite.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">{actualite.image}</span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                  {actualite.categorie}
                </span>
                <span className="text-sm text-gray-500">{actualite.date}</span>
              </div>
              <h2 className="text-xl font-semibold mb-3">{actualite.titre}</h2>
              <p className="text-gray-600 mb-4">{actualite.description}</p>
              <button className="text-black hover:underline">
                Lire la suite →
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Liste des autres actualités */}
      <div className="space-y-6">
        {actualites.slice(2).map((actualite) => (
          <article key={actualite.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-32 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-gray-500 text-sm">{actualite.image}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {actualite.categorie}
                  </span>
                  <span className="text-sm text-gray-500">{actualite.date}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{actualite.titre}</h3>
                <p className="text-gray-600 mb-3">{actualite.description}</p>
                <button className="text-black hover:underline">
                  Lire la suite →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
