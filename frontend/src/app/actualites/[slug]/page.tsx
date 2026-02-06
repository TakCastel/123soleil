import { getActualiteBySlug } from '@/lib/actualites';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import styles from './actualite.module.css';

interface ActualitePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ActualitePage({ params }: ActualitePageProps) {
  const { slug } = await params;
  const actualite = await getActualiteBySlug(slug);

  if (!actualite) {
    notFound();
  }

  const contentHtml = actualite.content ? await marked(actualite.content) : '';

  return (
    <div className="">
      {/* En-tête diagonal jaune à pois (comme page médiation) */}
      <section className="bg-diagonal-primary dotted-overlay overflow-visible">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <Link
            href="/actualites"
            className="inline-block text-[color:var(--neutral-dark)] hover:text-[color:var(--secondary)] transition-colors font-medium mb-8"
          >
            ← Retour aux actualités
          </Link>

          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {actualite.categorie && (
              <span className="inline-block bg-white border-2 border-black px-4 py-2 text-sm font-bold uppercase text-[color:var(--neutral-dark)]">
                {actualite.categorie}
              </span>
            )}
            {actualite.date && (
              <span className="inline-block bg-white border-2 border-black px-4 py-2 text-sm font-bold text-[color:var(--neutral-dark)]">
                {actualite.date}
              </span>
            )}
          </div>

          <h1 className="display-title text-4xl md:text-5xl text-[color:var(--secondary)] mb-4">
            {actualite.titre}
          </h1>

          {actualite.description && (
            <p className="text-[color:var(--neutral-dark)] text-lg max-w-2xl mx-auto">
              {actualite.description}
            </p>
          )}
        </div>
      </section>

      {/* Contenu : image, corps */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        {actualite.image && (
          <div className="mb-12 border-2 border-black overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={actualite.image}
              alt={actualite.titre}
              className="w-full h-auto block"
            />
          </div>
        )}

        {contentHtml && (
          <div
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        )}

        <div className="mt-12 text-center">
          <Link
            href="/actualites"
            className="inline-block bg-[color:var(--secondary)] text-white font-bold px-6 py-3 border-2 border-black hover:bg-[color:var(--secondary-hover)] transition-colors"
          >
            Voir toutes les actualités
          </Link>
        </div>
      </section>
    </div>
  );
}
