import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site de l'association de cinéma 1, 2, 3 Soleil à Avignon.",
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Mentions Légales</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Editeur du site</h2>
          <p className="text-gray-600 mb-4">
            Le présent site est édité par l&apos;association <strong>1,2,3 Soleil Cinéma Solidaire</strong>.
          </p>
          <p className="text-gray-600 mb-2">
            Siège social : 4 rue des Escaliers Sainte-Anne, 84000 Avignon.
          </p>
          <p className="text-gray-600 mb-2">
            Email : 123soleilcinemasolidaire@gmail.com
          </p>
          <p className="text-gray-600 mb-2">
            Téléphone : 06 84 79 88 75.
          </p>
          <p className="text-gray-600 mb-2">
            RNA : W842010897.
          </p>
          <p className="text-gray-600">
            SIREN : 889 422 101 - SIRET (siège) : 889 422 101 00028.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Directrice de la publication</h2>
          <p className="text-gray-600">
            Christine Conte, présidente de l&apos;association.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Hébergement</h2>
          <p className="text-gray-600">
            Le site est hébergé par OVHcloud.
          </p>
          <p className="text-gray-600">
            OVH SAS - 2 rue Kellermann, 59100 Roubaix, France.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Propriété intellectuelle</h2>
          <p className="text-gray-600 mb-4">
            L&apos;ensemble des contenus présents sur ce site (textes, images, vidéos, logos, éléments graphiques)
            est protégé par le droit d&apos;auteur et le droit de la propriété intellectuelle.
          </p>
          <p className="text-gray-600">
            Toute reproduction, représentation, adaptation ou diffusion, totale ou partielle, sans
            autorisation écrite préalable est interdite.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Responsabilité</h2>
          <p className="text-gray-600 mb-4">
            L&apos;association s&apos;efforce de fournir des informations exactes et à jour. Toutefois, elle ne
            peut garantir l&apos;exactitude, la complétude ou l&apos;actualité de l&apos;ensemble des contenus.
          </p>
          <p className="text-gray-600">
            L&apos;utilisation des informations du site se fait sous la responsabilité de l&apos;utilisateur.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-600">
            Pour toute question, vous pouvez nous contacter à l&apos;adresse : 123soleilcinemasolidaire@gmail.com
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Crédits</h2>
          <p className="text-gray-600">
            Site réalisé par Tarik Talhaoui (
            <a
              href="https://studio-castel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              studio-castel.com
            </a>
            ).
          </p>
        </section>
      </div>
    </div>
  );
}
