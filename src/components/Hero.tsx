"use client";
import Link from 'next/link';
import Button from './Button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const title = '1,2,3 SOLEIL';
  const letters = Array.from(title);
  const subtitle1 = 'POUR UN CINÉMA';
  const subtitle1Letters = Array.from(subtitle1);
  const subtitle2 = 'SOLIDAIRE ET INCLUSIF !';
  const subtitle2Letters = Array.from(subtitle2);
  const baseDelay = 0.15; // delayChildren used by the container
  const perLetterStagger = 0.06; // stronger visual staggering per letter
  
  // Calculer la durée totale d'animation pour chaque étape
  const getAnimationDuration = (textLength: number) => baseDelay + (textLength * perLetterStagger);
  
  // Durées d'animation pour chaque étape
  const titleDuration = getAnimationDuration(letters.length);
  const subtitle1Duration = getAnimationDuration(subtitle1Letters.length);
  const subtitle2Duration = getAnimationDuration(subtitle2Letters.length);
  
  // Ajuster les stagger pour que toutes les animations aient la même durée
  const adjustedTitleStagger = perLetterStagger;
  const adjustedSubtitle1Stagger = (titleDuration - baseDelay) / subtitle1Letters.length;
  const adjustedSubtitle2Stagger = (titleDuration - baseDelay) / subtitle2Letters.length;
  const [subtitle1Visible, setSubtitle1Visible] = useState(false);
  const [subtitle2Visible, setSubtitle2Visible] = useState(false);
  const [cta1Visible, setCta1Visible] = useState(false);
  const [cta2Visible, setCta2Visible] = useState(false);
  const [imagesVisible, setImagesVisible] = useState(false);
  const [triangleVisible, setTriangleVisible] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    // Configuration centralisée des timings (facile à modifier)
    const TIMING = {
      images: 800,
      title: 1000,
      triangle: 800, // Même timing que les images
      subtitle1Trigger: 0.75, // 75% du titre
      subtitle2Trigger: 0.25, // 25% du sous-titre 1
      cta1Trigger: 0.75, // 75% du sous-titre 2
      cta2Trigger: 0.75, // 75% du CTA 1
    };

    // 1. Images et triangle apparaissent en même temps
    setTimeout(() => {
      setImagesVisible(true);
      setTriangleVisible(true);
    }, TIMING.images);
    
    // 3. Titre "1,2,3 SOLEIL" commence
    setTimeout(() => setTitleVisible(true), TIMING.title);
    
    // Calculer les durées d'animation (en millisecondes)
    const titleDuration = (baseDelay + (letters.length * perLetterStagger)) * 1000;
    const subtitle1Duration = (baseDelay + (subtitle1Letters.length * adjustedSubtitle1Stagger)) * 1000;
    const subtitle2Duration = (baseDelay + (subtitle2Letters.length * adjustedSubtitle2Stagger)) * 1000;
    
    // 4. Sous-titre 1 "POUR UN CINÉMA" à 75% du titre
    const subtitle1Delay = TIMING.title + (titleDuration * TIMING.subtitle1Trigger);
    setTimeout(() => setSubtitle1Visible(true), subtitle1Delay);
    
    // 5. Sous-titre 2 "SOLIDAIRE ET INCLUSIF" à 75% du sous-titre 1
    const subtitle2Delay = subtitle1Delay + (subtitle1Duration * TIMING.subtitle2Trigger);
    setTimeout(() => setSubtitle2Visible(true), subtitle2Delay);
    
    // 6. CTA 1 à 75% du sous-titre 2
    const cta1Delay = subtitle2Delay + (subtitle2Duration * TIMING.cta1Trigger);
    setTimeout(() => setCta1Visible(true), cta1Delay);
    
    // 7. CTA 2 à 75% du CTA 1
    const cta2Delay = cta1Delay + (200 * TIMING.cta2Trigger); // 200ms de durée pour CTA 1
    setTimeout(() => setCta2Visible(true), cta2Delay);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: adjustedTitleStagger, delayChildren: baseDelay }
    }
  };

  // Variants pour le premier sous-titre avec animation lettre par lettre
  const subtitle1ContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: adjustedSubtitle1Stagger, delayChildren: 0.1 }
    }
  };

  // Variants pour le deuxième sous-titre avec animation lettre par lettre
  const subtitle2ContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: adjustedSubtitle2Stagger, delayChildren: 0.1 }
    }
  };

  const subtitleLetterVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 12,
      scale: 0.8,
      rotate: ((i * 23) % 13) - 6 // pseudo-random small angle
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

  const heroItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Animation variants pour les images
  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0, // Pas de stagger automatique
        delayChildren: 0.3 // Délai initial
      }
    }
  };

  // Fonction pour calculer la position dans la grille 4x4 avec zones vides
  const getGridPosition = (index: number) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    return { row, col };
  };

  // Fonction pour déterminer si une cellule doit être vide selon la nouvelle grille
  const shouldBeEmpty = (index: number) => {
    const { row, col } = getGridPosition(index);
    // Ligne 2 (index 4-7) et ligne 3 (index 8-11) : colonnes 0, 1, 2 sont vides
    return (row === 1 || row === 2) && col < 3;
  };

  // Animation aléatoire pendant la durée du titre + première ligne (plus rapide)
  const getRandomDelay = (index: number) => {
    // Ne pas animer les cellules vides
    if (shouldBeEmpty(index)) {
      return 0;
    }
    
    // Calculer la durée totale : titre + première ligne du sous-titre
    const titleDuration = baseDelay + (letters.length * perLetterStagger);
    const subtitle1Duration = baseDelay + (subtitle1Letters.length * adjustedSubtitle1Stagger);
    const totalDuration = titleDuration + subtitle1Duration;
    
    // Délai aléatoire entre 0 et 40% de la durée totale pour être encore plus rapide
    return Math.random() * (totalDuration * 0.4);
  };

  const imageVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      scale: 0.5, // Moins petit pour un effet plus doux
      filter: 'blur(4px)' // Moins de blur pour un effet plus subtil
    }),
    visible: (index: number) => ({
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 120, // Plus doux
        damping: 25, // Plus de damping pour moins de rebond
        mass: 1.2, // Plus de masse pour un mouvement plus lent
        delay: getRandomDelay(index) // Animation aléatoire
      }
    }),
  };

  // Animation du titre avec zoom
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: adjustedTitleStagger, delayChildren: baseDelay }
    }
  };

  const titleLetterVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      y: 14,
      scale: 0.7,
      rotate: ((i * 37) % 17) - 8 // pseudo-random small angle
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

  // Animation du triangle : faux triangle très fin → triangle complet
  const triangleVariants = {
    hidden: {
      clipPath: 'polygon(0% 49%, 100% 49%, 100% 51%)', // Triangle très fin (3 points)
      opacity: 1
    },
    visible: {
      clipPath: 'polygon(0% 25%, 100% 0%, 100% 100%)', // Triangle complet
      opacity: 1,
      transition: {
        clipPath: {
          duration: 1.5,
          ease: "easeInOut"
        }
      }
    }
  };

  return (
    <section className="hero-section dotted-overlay">
      {/* 4x4 grid full of images; center content overlays the 2x2 area */}
      <motion.div 
        className="hero-grid" 
        aria-hidden
        variants={imageContainerVariants}
        initial="hidden"
        animate={imagesVisible ? "visible" : "hidden"}
      >
        {Array.from({ length: 16 }).map((_, i) => {
          // Si la cellule doit être vide, ne pas l'afficher
          if (shouldBeEmpty(i)) {
            return null;
          }
          
          return (
            <motion.div
              key={i}
              className="hero-cell"
              style={{ backgroundImage: `url(https://picsum.photos/seed/${i + 200}/1000/800)` }}
              custom={i}
              variants={imageVariants}
              initial="hidden"
              animate={imagesVisible ? "visible" : "hidden"}
            />
          );
        })}
        {/* Center content cell spanning 3x2 */}
        <div className="hero-center">
          <div className="hero-center-inner text-center">
            <motion.div 
              className="hero-triangle"
              variants={triangleVariants}
              initial="hidden"
              animate={triangleVisible ? "visible" : "hidden"}
            />
            <div className="relative z-10">
              <motion.h1
                className="display-title text-6xl md:text-7xl mb-3 text-[color:var(--secondary)]"
                variants={titleContainerVariants}
                initial="hidden"
                animate={titleVisible ? "visible" : "hidden"}
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
              </motion.h1>
              <div className="hero-untilt">
                {/* 1) Subtitle Part 1 */}
                <motion.div
                  variants={subtitle1ContainerVariants}
                  initial="hidden"
                  animate={subtitle1Visible ? 'visible' : 'hidden'}
                  className="mb-2"
                >
                  <motion.p 
                    className="display-title text-3xl text-[color:var(--neutral-dark)]"
                    variants={subtitle1ContainerVariants}
                    initial="hidden"
                    animate={subtitle1Visible ? 'visible' : 'hidden'}
                  >
                    {subtitle1Letters.map((char, i) => (
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

                {/* 2) Subtitle Part 2 */}
                <motion.div
                  variants={subtitle2ContainerVariants}
                  initial="hidden"
                  animate={subtitle2Visible ? 'visible' : 'hidden'}
                  className="mb-8 md:mb-12 lg:mb-16"
                >
                  <motion.p 
                    className="display-title text-3xl text-[color:var(--neutral-dark)]"
                    variants={subtitle2ContainerVariants}
                    initial="hidden"
                    animate={subtitle2Visible ? 'visible' : 'hidden'}
                  >
                    {subtitle2Letters.map((char, i) => (
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

                {/* 2) CTA 1 (Adhérer), 3) CTA 2 (Découvrir) */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <div className={cta1Visible ? 'animate-in-down anim-delay-0' : 'opacity-0'}>
                    <Button href="/adhesion" bgColor="#ffffff" labelColor="#000000">Adhérer à l&apos;association</Button>
                  </div>
                  <motion.div
                    variants={heroItem}
                    initial="hidden"
                    animate={cta2Visible ? 'visible' : 'hidden'}
                  >
                    <Button href="/projets" bgColor="var(--secondary)" labelColor="#ffffff">Découvrir nos médiations</Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      {/* legacy centered overlay removed in favor of grid-spanned center */}
    </section>
  );
}


