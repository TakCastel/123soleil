import { getProjetBySlug } from '@/lib/projets';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { marked } from 'marked';
import styles from './projet.module.css';

interface ProjetPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjetPage({ params }: ProjetPageProps) {
  const projet = getProjetBySlug(params.slug);
  
  if (!projet) {
    notFound();
  }

  const contentHtml = projet.content ? await marked(projet.content) : '';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.badge}>
          🎬 PAGE TEST - Design en développement
        </div>
        
        <Link href="/projets" className={styles.backLink}>
          ← Retour aux projets
        </Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.categorie}>{projet.categorie}</span>
            <span className={styles.annee}>{projet.annee}</span>
          </div>
          <h1 className={styles.title}>{projet.titre}</h1>
          <p className={styles.description}>{projet.description}</p>
        </header>

        {projet.image && (
          <div className={styles.imageWrapper}>
            <img src={projet.image} alt={projet.titre} className={styles.image} />
          </div>
        )}

        {projet.video_url && (
          <div className={styles.videoWrapper}>
            <p className={styles.videoLabel}>🎥 Vidéo du projet :</p>
            <video 
              className={styles.videoPlayer}
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

        <div className={styles.projectContent}>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </div>
      </div>
    </div>
  );
}

