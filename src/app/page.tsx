import Hero from '@/components/Hero';
import Card from '@/components/Card';
import NewsCard from '@/components/NewsCard';
import Button from '@/components/Button';

export default function Home() {
  return (
    <div className="">
      <Hero />


      {/* Featured Projects */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="display-title text-3xl mb-12 text-center text-[color:var(--neutral-dark)]">Projets Récents</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 cards-grid">
          {[1, 2, 3].map((i) => (
            <Card
              key={i}
              title={`Lorem Ipsum Projet ${i}`}
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
              imageAlt={`Image du projet ${i}`}
              href="/projets"
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
          {[
            {
              id: 1,
              titre: 'Nouveau Festival Jeunes Talents 2024',
              date: '15 Janvier 2024',
              categorie: 'Événement',
              description: 'Nous organisons notre premier festival dédié aux jeunes talents du cinéma. Inscriptions ouvertes jusqu\'au 15 mars.',
              image: 'Image actualité'
            },
            {
              id: 2,
              titre: 'Formation Cinéma Documentaire',
              date: '10 Janvier 2024',
              categorie: 'Formation',
              description: 'Une nouvelle session de formation au cinéma documentaire débute en février. Places limitées, inscrivez-vous rapidement.',
              image: 'Image actualité'
            }
          ].map((actualite, index) => (
            <NewsCard
              key={actualite.id}
              title={actualite.titre}
              description={actualite.description}
              imageAlt={actualite.image}
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
