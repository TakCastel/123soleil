'use client';

import { useState, useEffect } from 'react';

/**
 * Hook simplifié pour déclencher le contenu après un délai fixe
 * Calcule automatiquement le délai basé sur la durée d'animation du header
 */
export function usePageContentDelay({ triggerAt = 0.5 }: { triggerAt?: number } = {}) {
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    // Calculer le délai basé sur l'animation du header
    // Le header commence à 300ms et dure environ 1.5-2s selon la longueur du texte
    // On déclenche à 50% de cette durée
    const headerStartDelay = 300; // Délai avant de commencer le header
    const headerDuration = 1000; // Durée approximative de l'animation du header (réduite)
    const triggerDelay = headerStartDelay + (headerDuration * triggerAt);

    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, triggerDelay);

    // Fallback de sécurité - s'assurer que le contenu s'affiche au maximum après 3 secondes
    const fallbackTimer = setTimeout(() => {
      setIsContentVisible(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [triggerAt]);

  return isContentVisible;
}

/**
 * Hook pour déclencher le contenu après un délai personnalisé
 */
export function useDelayedContent(delayMs: number = 1000) {
  const [isContentVisible, setIsContentVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  return isContentVisible;
}
