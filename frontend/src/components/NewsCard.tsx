'use client';

import Link from 'next/link';
import Image from 'next/image';
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000 + (delay * 1000));
    return () => clearTimeout(timer);
  }, [delay]);

  const hasValidImage = imageUrl && imageUrl !== '' && !imageError;

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
        {hasValidImage ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className={styles.image}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
            unoptimized={imageUrl.startsWith('http') && (imageUrl.includes('localhost:8055') || imageUrl.includes('directus'))}
          />
        ) : null}
        {isBreaking && (
          <div className={styles.breakingOverlay}>
            <div className={styles.breakingText}>BREAKING</div>
          </div>
        )}
      </div>
      
      {/* Contenu */}
      <div className={styles.content} style={{ position: 'relative', zIndex: 0 }}>
        <h3 className={styles.title}>
          {title}
        </h3>

        <div className={styles.header}>
          {date && (
            <span className={styles.date}>
              {date}
            </span>
          )}
          {category && (
            <span className={`${styles.category} ${isBreaking ? styles.breakingCategory : ''}`}>
              {category}
            </span>
          )}
        </div>
        
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