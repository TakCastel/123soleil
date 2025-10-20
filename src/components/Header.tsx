'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Button from './Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b-2 border-black h-24 text-[color:var(--neutral-dark)]">
      <div className="relative max-w-6xl mx-auto px-4 h-24 flex items-center">
        {/* Overlapping logo token - left aligned */}
        <Link href="/" className="header-logo-token header-logo-token--left">
          <Image src="/logo.jpg" alt="1, 2, 3 Soleil" width={84} height={84} className="w-20 h-20 object-cover" />
        </Link>

        <div className="flex w-full items-center justify-between">
          {/* Desktop Navigation - Centered with logo offset */}
          <nav className="hidden md:flex items-center justify-center space-x-8 flex-1 ml-24">
            <Link href="/" className="hover:text-[color:var(--secondary)] transition-colors animate-in-down anim-delay-0">Accueil</Link>
            <Link href="/association" className="hover:text-[color:var(--secondary)] transition-colors animate-in-down anim-delay-1">L&apos;Association</Link>
            <Link href="/projets" className="hover:text-[color:var(--secondary)] transition-colors animate-in-down anim-delay-2">Médiations</Link>
            <Link href="/actualites" className="hover:text-[color:var(--secondary)] transition-colors animate-in-down anim-delay-3">Actualités</Link>
          </nav>

          {/* CTA Button - Right aligned */}
          <div className="hidden md:block animate-in-down anim-delay-4">
            <Button href="/adhesion" bgColor="var(--secondary)" labelColor="#ffffff">Adhésion</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden absolute left-0 right-0 top-24 bg-white border-b border-gray-200 px-4 py-4 space-y-4 z-30">
            <Link href="/" className="block hover:text-[color:var(--secondary)] transition-colors">Accueil</Link>
            <Link href="/association" className="block hover:text-[color:var(--secondary)] transition-colors">L&apos;Association</Link>
            <Link href="/projets" className="block hover:text-[color:var(--secondary)] transition-colors">Médiations</Link>
            <Link href="/actualites" className="block hover:text-[color:var(--secondary)] transition-colors">Actualités</Link>
            <Button href="/adhesion" bgColor="var(--secondary)" labelColor="#ffffff">Adhésion</Button>
          </nav>
        )}
      </div>
    </header>
  );
}
