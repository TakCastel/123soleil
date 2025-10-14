import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          1, 2, 3 Soleil
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Association audiovisuelle dédiée à la création, la formation et la diffusion de contenus culturels.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/projets" 
            className="bg-primary text-black px-8 py-3 hover:bg-primary-hover transition-colors rounded"
          >
            Découvrir nos projets
          </Link>
          <Link 
            href="/adhesion" 
            className="border border-primary text-primary px-8 py-3 hover:bg-primary hover:text-black transition-colors rounded"
          >
            Adhérer à l&apos;association
          </Link>
        </div>
      </section>


      {/* Featured Projects */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Projets Récents</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Image du projet {i}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Lorem Ipsum Projet {i}</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <Link 
                  href="/projets" 
                  className="text-black hover:underline"
                >
                  En savoir plus →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            href="/projets" 
            className="bg-primary text-black px-6 py-3 hover:bg-primary-hover transition-colors rounded"
          >
            Voir tous les projets
          </Link>
        </div>
      </section>

      {/* News Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Actualités</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <article key={i} className="border border-gray-200 rounded-lg p-6">
              <div className="w-full h-32 bg-gray-200 mb-4 rounded flex items-center justify-center">
                <span className="text-gray-500">Image actualité {i}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Lorem Ipsum Actualité {i}</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">15 Janvier 2024</span>
                <Link 
                  href="/actualites" 
                  className="text-black hover:underline"
                >
                  Lire la suite →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            href="/actualites" 
            className="bg-primary text-black px-6 py-3 hover:bg-primary-hover transition-colors rounded"
          >
            Voir toutes les actualités
          </Link>
        </div>
      </section>
    </div>
  );
}
