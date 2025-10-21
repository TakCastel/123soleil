import { useEffect, useRef, useState, useCallback } from 'react';

interface UseMultipleInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useMultipleInView(options: UseMultipleInViewOptions = {}) {
  const [elementsInView, setElementsInView] = useState<Set<string>>(new Set());
  const refs = useRef<Map<string, HTMLElement>>(new Map());

  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;

  const registerRef = useCallback((key: string) => {
    return (element: HTMLElement | null) => {
      if (element) {
        refs.current.set(key, element);
      } else {
        refs.current.delete(key);
      }
    };
  }, []);

  const isInView = useCallback((key: string) => {
    return elementsInView.has(key);
  }, [elementsInView]);

  const reset = useCallback(() => {
    setElementsInView(new Set());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = Array.from(refs.current.entries()).find(([_, element]) => element === entry.target)?.[0];
          if (!key) return;

          if (entry.isIntersecting) {
            setElementsInView(prev => new Set([...prev, key]));
            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setElementsInView(prev => {
              const newSet = new Set(prev);
              newSet.delete(key);
              return newSet;
            });
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observe all registered elements
    refs.current.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { registerRef, isInView, reset };
}
