import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: "Adhérer et soutenir",
  description:
    "Rejoignez ou soutenez l'association de cinéma 1, 2, 3 Soleil à Avignon : adhésion et dons en ligne via HelloAsso.",
  openGraph: { url: "/adhesion" },
};

const HELLOASSO_ADHESION_FALLBACK_URL =
  'https://www.helloasso.com/associations/123-soleil-cinema-solidaire/adhesions/123-soleil-cinema-solidaire';
const HELLOASSO_DON_FALLBACK_URL =
  'https://www.helloasso.com/associations/123-soleil-cinema-solidaire/formulaires/1';

const helloAssoAdhesionUrl = process.env.HELLOASSO_ADHESION_URL ?? HELLOASSO_ADHESION_FALLBACK_URL;
const helloAssoDonUrl = process.env.HELLOASSO_DON_URL ?? HELLOASSO_DON_FALLBACK_URL;

export default function Adhesion() {
  return (
    <div className="">
      <section className="bg-diagonal-primary dotted-overlay">
        <PageHeader
          seoTitle="Adhérer et soutenir - 1,2,3 Soleil"
          mainTitle="Adhérer &amp; soutenir"
          subtitle="L&apos;ASSOCIATION"
          description="Rejoignez l'association ou soutenez-la par un don. HelloAsso permet d'adhérer et de donner en ligne en toute simplicité."
        />
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-0">
        {/* Bloc Adhérer */}
        <section className="pb-16 mb-16 border-b-2 border-[color:var(--neutral-dark)]">
          <h2 className="display-title text-2xl text-[color:var(--neutral-dark)] mb-6">
            Adhérer
          </h2>
          <p className="display-title text-lg text-[color:var(--neutral-dark)]/90 mb-4">
            Pourquoi adhérer à l&apos;asso ?
          </p>
          <ul className="list-stars space-y-3 text-[color:var(--neutral-dark)] mb-8">
            <li>
              Pour participer tout au long de l&apos;année aux différents ateliers, tournages, soirées de projection et festivals de l&apos;association : cuisine, régie, participation devant ou derrière la caméra, making-off, renfort… Nous avons toujours besoin de monde !
            </li>
            <li>
              Pour être informé des différents événements et actions de l&apos;association tout au long de l&apos;année, des tournages aux projections.
            </li>
            <li>
              Pour faire partie de notre joyeux réseau avignonnais, qui défend des valeurs de mixité et d&apos;entraide par la création vidéo en tant que membres et adhérents de l&apos;association.
            </li>
          </ul>
          <a
            href={helloAssoAdhesionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-8 py-4 font-bold text-lg group inline-block text-center"
          >
            <span
              className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 bg-[color:var(--primary)]"
              aria-hidden
            />
            <span className="absolute inset-0 w-full h-full border-2 border-black" aria-hidden />
            <span className="relative text-black">Adhérer via HelloAsso</span>
          </a>
        </section>

        {/* Bloc Soutenir */}
        <section>
          <h2 className="display-title text-2xl text-[color:var(--neutral-dark)] mb-6">
            Soutenir
          </h2>
          <p className="display-title text-lg text-[color:var(--neutral-dark)]/90 mb-4">
            Pourquoi soutenir l&apos;association ?
          </p>
          <ul className="list-stars space-y-3 text-[color:var(--neutral-dark)] mb-8">
            <li>
              Pour soutenir financièrement la rémunération des réalisateurs qui animent les différents ateliers tout au long de l&apos;année.
            </li>
            <li>
              Pour aider l&apos;association à financer ses différents supports de communication.
            </li>
            <li>
              Pour soutenir financièrement l&apos;association dans la mise en place des festivals et soirées de projection, qui participent à la sensibilisation des Avignonnais aux questions de l&apos;inclusion sociale, de l&apos;immigration et de la mixité.
            </li>
          </ul>
          <a
            href={helloAssoDonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-8 py-4 font-bold text-lg group inline-block text-center"
          >
            <span
              className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 bg-[color:var(--secondary)]"
              aria-hidden
            />
            <span className="absolute inset-0 w-full h-full border-2 border-black" aria-hidden />
            <span className="relative text-white">Donner via HelloAsso</span>
          </a>
        </section>

        <p className="text-center">
          <Link
            href="/contact"
            className="text-[color:var(--secondary)] font-medium hover:underline underline-offset-2"
          >
            Une question ? Écrivez-nous
          </Link>
        </p>
      </div>
    </div>
  );
}
