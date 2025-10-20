import Link from 'next/link';
import { ReactNode } from 'react';

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  bgColor?: string; // e.g. 'var(--primary)' | 'var(--secondary)' | '#ff0000'
  labelColor?: string; // e.g. '#000000' | '#ffffff'
  className?: string;
  ariaLabel?: string;
};

export default function Button({
  href,
  children,
  variant = 'primary',
  bgColor = 'var(--primary)',
  labelColor = '#000000',
  className = '',
  ariaLabel,
}: ButtonProps) {
  if (variant === 'secondary') {
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={`relative inline-block px-4 py-2 font-medium group ${className}`}
      >
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        <span className="relative text-black group-hover:text-white">
          {children}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`relative px-6 py-3 font-bold group ${className}`}
    >
      <span
        className="absolute inset-0 w-full h-full transition duration-300 ease-out transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"
        style={{ backgroundColor: bgColor }}
      />
      <span className="absolute inset-0 w-full h-full border-2 border-black" />
      <span className="relative" style={{ color: labelColor }}>
        {children}
      </span>
    </Link>
  );
}


