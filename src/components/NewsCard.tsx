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

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000 + (delay * 1000));
    return () => clearTimeout(timer);
  }, [delay]);

  const getImageUrl = () => {
    if (imageUrl) return imageUrl;
    const seed = title.replace(/\s+/g, '');
    return `https://picsum.photos/seed/${seed}/800/600`;
  };

  const content = (
    <>
      {/* Image avec effet comics */}
      <div className={styles.imageContainer}>
        <img 
          src={getImageUrl()} 
          alt={imageAlt} 
          className={styles.image}
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
      <div className={styles.content}>
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
    </>
  );

  return (
    <div
      className={`${styles.newsCard} ${styles[variant]} ${hasAnimated ? styles.hasAnimated : ''} ${isBreaking ? styles.breaking : ''}`}
      style={{
        opacity: hasAnimated ? 1 : 0,
        transform: hasAnimated ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {href ? (
        <Link href={href} className={styles.link}>
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}