'use client';

import { MotionConfig } from 'framer-motion';
import type React from 'react';

/** Respecte le réglage OS "réduire les animations" pour toutes les animations Framer Motion du site. */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
