import { useEffect, useRef, useState, useCallback } from 'react';

interface UseOptimizedAnimationOptions {
  duration?: number;
  delay?: number;
  easing?: string;
}

export function useOptimizedAnimation(options: UseOptimizedAnimationOptions = {}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  
  const { duration = 1000, delay = 0, easing = 'ease-out' } = options;

  const startAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    setIsAnimating(true);
    setProgress(0);
    startTimeRef.current = performance.now() + delay;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) return;

      const elapsed = currentTime - startTimeRef.current;
      const normalizedProgress = Math.min(elapsed / duration, 1);
      
      // Easing function
      let easedProgress = normalizedProgress;
      if (easing === 'ease-out') {
        easedProgress = 1 - Math.pow(1 - normalizedProgress, 3);
      } else if (easing === 'ease-in') {
        easedProgress = Math.pow(normalizedProgress, 3);
      } else if (easing === 'ease-in-out') {
        easedProgress = normalizedProgress < 0.5 
          ? 4 * Math.pow(normalizedProgress, 3)
          : 1 - Math.pow(-2 * normalizedProgress + 2, 3) / 2;
      }

      setProgress(easedProgress);

      if (normalizedProgress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, [duration, delay, easing]);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setIsAnimating(false);
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return {
    isAnimating,
    progress,
    startAnimation,
    stopAnimation
  };
}
