'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
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
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);
  // Mémoriser le nombre aléatoire une seule fois
  const [randomSeed] = useState(() => Math.floor(Math.random() * 1000));

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 1000 + (delay * 1000));
    return () => clearTimeout(timer);
  }, [delay]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Désactiver les effets hover sur mobile (écrans < 768px)
    if (window.innerWidth < 768) return;
    
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    // Désactiver les effets hover sur mobile (écrans < 768px)
    if (window.innerWidth < 768) return;
    
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  // Utiliser lorem picsum comme fallback
  const getFinalImageUrl = () => {
    if (imageError || !imageUrl || imageUrl === '') {
      return `https://picsum.photos/600/400?random=${randomSeed}`;
    }
    return imageUrl;
  };

  const hasImage = true; // Toujours vrai car on a un fallback

  // Calculer la rotation en fonction de la position de la souris
  const rotateX = isHovered ? (mousePosition.y - 0.5) * -10 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 10 : 0;

  return (
    <div 
      ref={cardRef}
      className={`${styles.card} card-item ${hasAnimated ? 'has-animated' : ''} ${isHovered ? styles.cardHovered : ''}`}
      style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: isHovered 
          ? `translateY(-16px) translateZ(50px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
          : 'translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) scale(1.0)',
        transformOrigin: 'center center',
        transition: isHovered 
          ? 'transform 0.1s ease-out, box-shadow 0.3s ease-out' 
          : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease-out',
        boxShadow: isHovered 
          ? `0 30px 60px rgba(0, 0, 0, 0.25), 
             0 15px 30px rgba(0, 0, 0, 0.15), 
             0 0 0 3px var(--primary, #F9D849),
             ${(mousePosition.x - 0.5) * 20}px ${(mousePosition.y - 0.5) * 20 + 40}px 40px rgba(0, 0, 0, 0.2)`
          : '0 4px 8px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04)'
      }}
      onMouseEnter={() => {
        // Désactiver les effets hover sur mobile (écrans < 768px)
        if (window.innerWidth >= 768) {
          setIsHovered(true);
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
        {description && <p className="text-gray-700 mb-5 text-base leading-relaxed flex-grow">{description}</p>}
        <div className="flex justify-between items-center mt-auto">
          {category && <span className="text-sm text-gray-600 capitalize">{category}</span>}
          {href && ctaLabel && (
            <span className="cta-stacked cta-stacked--primary" style={{ position: 'relative', zIndex: 2, pointerEvents: 'none' }}>
              <span 
                className="cta-bg" 
                style={{
                  transform: isHovered ? 'translate(0, 0)' : 'translate(-8px, -8px)',
                  transition: 'transform 0.3s ease-out'
                }}
              />
              <span className="cta-border" />
              <span className="cta-label">{ctaLabel}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}


