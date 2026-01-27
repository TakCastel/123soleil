import { useEffect, useRef, useState, useCallback } from 'react';
import type React from 'react';

interface UseMultipleInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface InViewElement {
  id: string;
  isInView: boolean;
  ref: React.RefObject<HTMLElement>;
}

export function useMultipleInView(options: UseMultipleInViewOptions = {}) {
  const [elements, setElements] = useState<Map<string, InViewElement>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { threshold = 0.1, rootMargin = '-50px', triggerOnce = true } = options;

  const registerElement = useCallback((id: string, element: HTMLElement | null) => {
    if (!element) return;

    // Vérifier si l'élément est déjà enregistré pour éviter les re-renders
    setElements(prev => {
      if (prev.has(id)) return prev; // Éviter les mises à jour inutiles
      
      const newMap = new Map(prev);
      newMap.set(id, {
        id,
        isInView: false,
        ref: { current: element }
      });
      return newMap;
    });

    if (observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  const unregisterElement = useCallback((id: string) => {
    setElements(prev => {
      const newMap = new Map(prev);
      const element = newMap.get(id);
      if (element && observerRef.current) {
        observerRef.current.unobserve(element.ref.current!);
      }
      newMap.delete(id);
      return newMap;
    });
  }, []);

  const getElementState = useCallback((id: string) => {
    const element = elements.get(id);
    return element ? { ref: element.ref, isInView: element.isInView } : { ref: { current: null }, isInView: false };
  }, [elements]);

  const reset = useCallback(() => {
    setElements(new Map());
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const elementId = entry.target.getAttribute('data-inview-id');
          if (!elementId) return;

          setElements(prev => {
            const newMap = new Map(prev);
            const element = newMap.get(elementId);
            if (element) {
              newMap.set(elementId, {
                ...element,
                isInView: entry.isIntersecting
              });
            }
            return newMap;
          });

          if (entry.isIntersecting && triggerOnce && observerRef.current) {
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    registerElement,
    unregisterElement,
    getElementState,
    reset
  };
}