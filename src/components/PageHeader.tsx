'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PageHeaderProps {
  seoTitle: string;
  mainTitle: string;
  subtitle: string;
  description: string;
  className?: string;
  onProgress?: (progress: number) => void;
}

export default function PageHeader({ 
  seoTitle, 
  mainTitle, 
  subtitle, 
  description, 
  className = "",
  onProgress
}: PageHeaderProps) {
  const letters = Array.from(mainTitle);
  const subtitleLetters = Array.from(subtitle);
  
  const baseDelay = 0.05;
  const perLetterStagger = 0.03;
  
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);

  useEffect(() => {
    // Configuration des timings
    const TIMING = {
      title: 300, // Délai avant de commencer le titre
      subtitleTrigger: 0.75, // 75% du titre
      descriptionTrigger: 0.75, // 75% du sous-titre
    };

    // Calculer la durée d'animation du titre
    const titleDuration = (baseDelay + (letters.length * perLetterStagger)) * 1000;
    
    // Démarrer le titre
    setTimeout(() => setTitleVisible(true), TIMING.title);
    
    // Démarrer le sous-titre à 75% du titre
    const subtitleDelay = TIMING.title + (titleDuration * TIMING.subtitleTrigger);
    setTimeout(() => setSubtitleVisible(true), subtitleDelay);
    
    // Calculer la durée d'animation du sous-titre
    const subtitleDuration = (baseDelay + (subtitleLetters.length * perLetterStagger)) * 1000;
    
    // Démarrer la description à 75% du sous-titre
    const descriptionDelay = subtitleDelay + (subtitleDuration * TIMING.descriptionTrigger);
    setTimeout(() => setDescriptionVisible(true), descriptionDelay);

    // Calculer la durée totale d'animation pour le callback de progression
    const totalDuration = descriptionDelay + (subtitleDuration * 0.5); // 50% de la description
    
    // Émettre les callbacks de progression
    if (onProgress) {
      // 25% - Milieu du titre
      setTimeout(() => onProgress(0.25), TIMING.title + (titleDuration * 0.5));
      
      // 50% - Fin du titre (déclencheur principal)
      setTimeout(() => onProgress(0.5), TIMING.title + titleDuration);
      
      // 75% - Milieu du sous-titre
      setTimeout(() => onProgress(0.75), subtitleDelay + (subtitleDuration * 0.5));
      
      // 100% - Fin complète
      setTimeout(() => onProgress(1.0), totalDuration);
    }
  }, [letters.length, subtitleLetters.length, onProgress]);

  // Variants pour le titre principal
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: perLetterStagger, delayChildren: baseDelay }
    }
  };

  const titleLetterVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 14,
      scale: 0.7,
      rotate: ((i * 37) % 17) - 8
    }),
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 520,
        damping: 22,
        mass: 0.6
      }
    }
  };

  // Variants pour le sous-titre
  const subtitleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: perLetterStagger, delayChildren: 0.1 }
    }
  };

  const subtitleLetterVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 12,
      scale: 0.8,
      rotate: ((i * 23) % 13) - 6
    }),
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 480,
        damping: 24,
        mass: 0.7
      }
    }
  };

  // Variants pour la description (slide up + fade in)
  const descriptionVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.8
      }
    }
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-16 text-center ${className}`}>
      {/* H1 caché pour le SEO */}
      <h1 className="sr-only">{seoTitle}</h1>
      
      {/* Titre principal en rouge penché avec animation lettre par lettre */}
      <motion.div
        className="mb-3"
        variants={titleContainerVariants}
        initial="hidden"
        animate={titleVisible ? "visible" : "hidden"}
      >
        <motion.span 
          className="display-title text-5xl md:text-6xl text-[color:var(--secondary)] title-tilt inline-block"
        >
          {letters.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={titleLetterVariants}
              style={{ display: 'inline-block', willChange: 'transform' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </motion.div>

      {/* Sous-titre en noir avec animation lettre par lettre */}
      <motion.div
        className="mb-4"
        variants={subtitleContainerVariants}
        initial="hidden"
        animate={subtitleVisible ? "visible" : "hidden"}
      >
        <motion.p className="subtitle-black small">
          {subtitleLetters.map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={subtitleLetterVariants}
              style={{ display: 'inline-block', willChange: 'transform' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>

      {/* Description SEO avec animation slide up + fade in */}
      <motion.div
        variants={descriptionVariants}
        initial="hidden"
        animate={descriptionVisible ? "visible" : "hidden"}
      >
        <p className="text-gray-700 max-w-3xl mx-auto">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
