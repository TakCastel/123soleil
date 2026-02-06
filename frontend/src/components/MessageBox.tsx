'use client';

import { useInView } from '@/hooks/useInView';
import { ReactNode } from 'react';
import type React from 'react';

interface MessageBoxProps {
  title: string;
  children: ReactNode;
  centered?: boolean;
  className?: string;
  threshold?: number;
}

export default function MessageBox({ 
  title, 
  children, 
  centered = true, 
  className = '',
  threshold = 0.2 
}: MessageBoxProps) {
  const { ref, isInView } = useInView({ threshold });

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`bg-white border-2 border-black p-8 md:p-10 max-w-4xl mx-auto scroll-animate fade-in ${isInView ? 'in-view' : ''} ${className}`}
    >
      <h2 className={`display-title text-3xl mb-6 text-[color:var(--secondary)] ${centered ? 'text-center' : ''}`}>
        {title}
      </h2>
      <div className={`text-gray-700 text-lg leading-relaxed ${centered ? 'text-center' : ''}`}>
        {children}
      </div>
    </div>
  );
}
