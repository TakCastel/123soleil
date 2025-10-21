import { getActualiteBySlug } from '@/lib/actualites';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import styles from './actualite.module.css';

interface ActualitePageProps {
  params: {
    slug: string;
  };
}

export default async function ActualitePage({ params }: ActualitePageProps) {
  const actualite = getActualiteBySlug(params.slug);
  
  if (!actualite) {
    notFound();
  }

  const contentHtml = actualite.content ? await marked(actualite.content) : '';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.badge}>
          🚧 PAGE EN COURS DE CRÉATION - Design temporaire
        </div>
        
        <Link href="/actualites" className={styles.backLink}>
          ← Retour aux actualités
        </Link>

        <header className={styles.header}>
          <span className={styles.categorie}>{actualite.categorie}</span>
          <h1 className={styles.title}>{actualite.titre}</h1>
          <p className={styles.date}>{actualite.date}</p>
          <p className={styles.description}>{actualite.description}</p>
        </header>

        {actualite.image && (
          <div className={styles.imageWrapper}>
            <img src={actualite.image} alt={actualite.titre} className={styles.image} />
          </div>
        )}

        <div className={styles.articleContent}>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
    </div>
  );
}

