'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './NewsCard.module.css';

type NewsCardProps = {
  title: string;
  description?: string;
  date?: string;
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
  href?: string;
  variant?: 'hero' | 'compact' | 'newspaper';
  delay?: number;
  isBreaking?: boolean;
};

export default function NewsCard({ 
  title, 
  description, 
  date, 
  category, 
  imageUrl, 
  imageAlt = '', 
  href, 
  variant = 'newspaper',
  delay = 0,
  isBreaking = false
}: NewsCardProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [imageError, setImageError] = useState(false);
  // Mémoriser le nombre aléatoire une seule fois
  const [randomSeed] = useState(() => Math.floor(Math.random() * 1000));

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000 + (delay * 1000));
    return () => clearTimeout(timer);
  }, [delay]);

  // Utiliser lorem picsum comme fallback
  const getFinalImageUrl = () => {
    if (imageError || !imageUrl || imageUrl === '') {
      // Dimensions selon le variant
      const dimensions = variant === 'hero' ? '800/600' : variant === 'compact' ? '400/300' : '600/400';
      return `https://picsum.photos/${dimensions}?random=${randomSeed}`;
    }
    return imageUrl;
  };

  const hasImage = true; // Toujours vrai car on a un fallback

  return (
    <div
      className={`${styles.newsCard} ${styles[variant]} ${hasAnimated ? styles.hasAnimated : ''} ${isBreaking ? styles.breaking : ''}`}
      style={{
        position: 'relative',
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {/* Lien invisible qui couvre toute la carte */}
      {href && (
        <Link 
          href={href} 
          className={styles.cardLink}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10
          }}
          aria-label={`Lire l'article: ${title}`}
        />
      )}
      
      {/* Image avec effet comics */}
      <div className={`${styles.imageContainer}`} style={{ position: 'relative', zIndex: 0 }}>
        <img 
          src={getFinalImageUrl()} 
          alt={imageAlt} 
          className={styles.image}
          onError={() => setImageError(true)}
        />
        {date && (
          <span className={styles.date}>
            {date}
          </span>
        )}
        {isBreaking && (
          <div className={styles.breakingOverlay}>
            <div className={styles.breakingText}>BREAKING</div>
          </div>
        )}
      </div>
      
      {/* Contenu */}
      <div className={styles.content} style={{ position: 'relative', zIndex: 0 }}>
        <div className={styles.header}>
          {category && (
            <span className={`${styles.category} ${isBreaking ? styles.breakingCategory : ''}`}>
              {category}
            </span>
          )}
        </div>
        
        <h3 className={styles.title}>
          {title}
        </h3>
        
        {description && (
          <p className={styles.description}>
            {description}
          </p>
        )}
        
        {href && (
          <div className={styles.cta}>
            <span className={styles.ctaText}>
              Lire la suite
            </span>
            <span className={styles.ctaArrow}>
              →
            </span>
          </div>
        )}
      </div>
    </div>
  );
}