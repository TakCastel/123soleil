import { getProjetBySlug } from '@/lib/projets';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { marked } from 'marked';
import styles from './projet.module.css';

interface ProjetPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjetPage({ params }: ProjetPageProps) {
  const { slug } = await params;
  const projet = await getProjetBySlug(slug);

  if (!projet) {
    notFound();
  }

  const contentHtml = projet.content ? await marked(projet.content) : '';

  return (
    <div className="">
      {/* En-tête diagonal jaune à pois (comme liste médiations / association) */}
      <section className="bg-diagonal-primary dotted-overlay overflow-visible">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <Link
            href="/projets"
            className="inline-block text-[color:var(--neutral-dark)] hover:text-[color:var(--secondary)] transition-colors font-medium mb-8"
          >
            ← Retour aux médiations
          </Link>

          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {projet.categorie && (
              <span className="inline-block bg-white border-2 border-black px-4 py-2 text-sm font-bold uppercase text-[color:var(--neutral-dark)]">
                {projet.categorie}
              </span>
            )}
            <span className="inline-block bg-white border-2 border-black px-4 py-2 text-sm font-bold text-[color:var(--neutral-dark)]">
              {projet.annee}
            </span>
          </div>

          <h1 className="display-title text-4xl md:text-5xl text-[color:var(--secondary)] mb-4">
            {projet.titre}
          </h1>

          {projet.description && (
            <p className="text-[color:var(--neutral-dark)] text-lg max-w-2xl mx-auto">
              {projet.description}
            </p>
          )}
        </div>
      </section>

      {/* Contenu : image, vidéo, corps */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {projet.image && (
          <div className="mb-12 border-2 border-black overflow-hidden relative aspect-video w-full">
            <Image
              src={projet.image}
              alt={projet.titre}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1152px"
              priority
            />
          </div>
        )}

        {projet.video_url && (
          <div className="mb-12 border-2 border-black bg-[color:var(--neutral-dark)] p-2">
            <video
              className="w-full h-auto"
              controls
              preload="metadata"
              poster={projet.image}
            >
              <source src={projet.video_url} type="video/mp4" />
              <source src={projet.video_url} type="video/webm" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        )}

        {contentHtml && (
          <div
            className={styles.projectContent}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}

        <div className="mt-12 text-center">
          <Link
            href="/projets"
            className="inline-block bg-[color:var(--secondary)] text-white font-bold px-6 py-3 border-2 border-black hover:bg-[color:var(--secondary-hover)] transition-colors"
          >
            Voir toutes les médiations
          </Link>
        </div>
      </section>
    </div>
  );
}
