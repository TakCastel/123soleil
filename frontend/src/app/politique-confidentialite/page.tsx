import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site de l'association de cinéma 1, 2, 3 Soleil à Avignon.",
  robots: { index: false, follow: true },
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Politique de Confidentialité</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Responsable du traitement</h2>
          <p className="text-gray-600 mb-4">
            Le responsable du traitement des données personnelles est l&apos;association
            <strong> 1,2,3 Soleil Cinéma Solidaire</strong>.
          </p>
          <p className="text-gray-600">Contact : 123soleilcinemasolidaire@gmail.com</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Données collectées</h2>
          <p className="text-gray-600 mb-4">
            Les données collectées via le formulaire de contact peuvent inclure :
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Message libre</li>
          </ul>
          <p className="text-gray-600 mb-3">Aucune donnée sensible n&apos;est demandée sur ce site.</p>
          <p className="text-gray-600">
            Pour l&apos;adhésion et les dons, le site redirige vers la plateforme HelloAsso. Les traitements
            réalisés sur HelloAsso relèvent de leur propre politique de confidentialité.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Finalités du traitement</h2>
          <p className="text-gray-600">
            Les données sont utilisées uniquement pour répondre aux demandes envoyées via le formulaire
            de contact et pour assurer le suivi des échanges.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Base légale</h2>
          <p className="text-gray-600 mb-4">
            La base légale du traitement est l&apos;intérêt légitime de l&apos;association à répondre aux
            sollicitations qui lui sont adressées.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Destinataires des données</h2>
          <p className="text-gray-600 mb-4">
            Les données sont destinées uniquement aux personnes habilitées au sein de l&apos;association.
            Elles ne sont ni vendues, ni cédées à des tiers à des fins commerciales.
          </p>
          <p className="text-gray-600">
            Pour l&apos;envoi des messages via le formulaire de contact, les données transitent par les
            serveurs Google (Gmail), utilisés comme prestataire technique d&apos;envoi d&apos;email.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Durée de conservation</h2>
          <p className="text-gray-600 mb-4">
            Les données issues du formulaire de contact sont conservées pendant une durée maximale
            de 3 ans à compter du dernier échange.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
          <p className="text-gray-600 mb-4">
            Le site n&apos;utilise pas, à ce jour, de cookies publicitaires ou de mesure d&apos;audience
            nécessitant le recueil du consentement.
          </p>
          <p className="text-gray-600">
            Des cookies strictement techniques peuvent être utilisés pour le bon fonctionnement
            du site et de l&apos;hébergement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Vos droits</h2>
          <p className="text-gray-600 mb-4">
            Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits
            d&apos;accès, de rectification, d&apos;effacement, de limitation et d&apos;opposition.
          </p>
          <p className="text-gray-600">
            Pour exercer vos droits : 123soleilcinemasolidaire@gmail.com
          </p>
        </section>
      </div>
    </div>
  );
}
