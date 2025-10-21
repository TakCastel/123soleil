'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Card.module.css';

type CardProps = {
  title: string;
  description?: string;
  imageAlt?: string;
  imageUrl?: string;
  href?: string;
  badge?: string | number;
  category?: string;
  ctaLabel?: string;
  slashSide?: 'left' | 'right';
  isVisible?: boolean;
  delay?: number;
};

export default function Card({ title, description, imageAlt = '', imageUrl, href, badge, category, ctaLabel, isVisible = true, delay = 0 }: CardProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
      return `https://picsum.photos/600/400?random=${randomSeed}`;
    }
    return imageUrl;
  };

  const hasImage = true; // Toujours vrai car on a un fallback

  return (
    <div 
      className={`${styles.card} card-item ${hasAnimated ? 'has-animated' : ''} ${isHovered ? styles.cardHovered : ''}`}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        perspective: 1000,
        transform: isHovered 
          ? 'translateY(-4px) rotateX(2deg) rotateY(2deg) rotateZ(0deg) scale(1.05)'
          : 'translateY(-2px) rotateX(3deg) rotateY(3deg) rotateZ(0deg) scale(1.0)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0, 0, 0, 0.15), 0 0 0 4px var(--primary, #ff6b6b), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
          : '0 8px 20px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Lien invisible qui couvre toute la carte */}
      {href && (
        <Link 
          href={href} 
          className={styles.cardLink}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1
          }}
          aria-label={`Voir ${title}`}
        />
      )}
      
      <div
        className={`${styles.cardMedia} flex items-center justify-center`}
        style={{ 
          backgroundImage: `url(${getFinalImageUrl()})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          transform: 'rotate(-8deg) scale(1.2)',
          marginTop: '-4px',
          zIndex: 0,
          position: 'relative'
        }}
      >
        <img 
          src={getFinalImageUrl()} 
          alt={imageAlt}
          style={{ display: 'none' }}
          onError={() => setImageError(true)}
        />
      </div>
      <div className={styles.cardBody} style={{ position: 'relative', zIndex: 0 }}>
        <div className="flex justify-end items-start mb-3 -mt-4 relative z-10">
          <div className="flex flex-col items-end">
            <h3 className="text-xl font-semibold text-right bg-white px-6 py-3">{title}</h3>
            {badge !== undefined && (
              <span className={styles.cardBadge}>{badge}</span>
            )}
          </div>
        </div>
        {description && <p className="text-gray-700 mb-5 text-base leading-relaxed">{description}</p>}
        <div className="flex justify-between items-center">
          {category && <span className="text-sm text-gray-600 capitalize">{category}</span>}
          {href && ctaLabel && (
            <span className="cta-stacked cta-stacked--primary" style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
              <span className="cta-bg" />
              <span className="cta-border" />
              <span className="cta-label">{ctaLabel}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


