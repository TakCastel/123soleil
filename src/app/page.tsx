import Hero from '@/components/Hero';
import Card from '@/components/Card';
import NewsCard from '@/components/NewsCard';
import Button from '@/components/Button';
import { getProjets } from '@/lib/projets';
import { getActualites } from '@/lib/actualites';

export default function Home() {
  // Charger les 3 derniers projets
  const projets = getProjets().slice(0, 3);
  
  // Charger les 2 dernières actualités
  const actualites = getActualites().slice(0, 2);

  return (
    <div className="">
      <Hero />

      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="display-title text-3xl mb-12 text-center text-[color:var(--neutral-dark)]">Projets Récents</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 cards-grid">
          {projets.map((projet, index) => (
            <Card
              key={projet.id}
              title={projet.titre}
              description={projet.description}
              imageUrl={projet.image}
              imageAlt={projet.titre}
              badge={projet.annee}
              category={projet.categorie}
              href={`/projets/${projet.id}`}
              ctaLabel="En savoir plus →"
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button 
            href="/projets" 
            variant="secondary"
            labelColor="#000000"
            className="inline-block"
          >
            Voir tous les projets
          </Button>
        </div>
      </section>

      {/* News Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="display-title text-3xl mb-12 text-center text-[color:var(--neutral-dark)]">Actualités</h2>
        <div className="grid md:grid-cols-2 gap-12">
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
          <Button 
            href="/actualites" 
            variant="secondary"
            labelColor="#000000"
            className="inline-block"
          >
            Voir toutes les actualités
          </Button>
        </div>
      </section>
    </div>
  );
}
