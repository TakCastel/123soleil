"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  wrapperClassName?: string;
  animated?: boolean;
}

export default function Logo({ 
  width = 120, 
  height = 120, 
  className = '',
  wrapperClassName = '',
  animated = true
}: LogoProps) {
  const content = (
    <Image 
      src="/logo.jpg" 
      alt="1, 2, 3 Soleil" 
      width={width} 
      height={height} 
      className={className}
      priority={true}
    />
  );

  if (!animated) {
    return wrapperClassName ? <div className={wrapperClassName}>{content}</div> : content;
  }

  return (
    <motion.div 
      className={wrapperClassName}
      whileHover={{ 
        scale: 1.03,
        rotate: 1,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.div>
  );
}

