'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpg"
              alt="1, 2, 3 Soleil"
              width={120}
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-secondary transition-colors">
              Accueil
            </Link>
            <Link href="/association" className="hover:text-secondary transition-colors">
              L'Association
            </Link>
            <Link href="/projets" className="hover:text-secondary transition-colors">
              Projets
            </Link>
            <Link href="/actualites" className="hover:text-secondary transition-colors">
              Actualités
            </Link>
            <Link href="/adhesion" className="bg-primary text-black px-4 py-2 hover:bg-primary-hover transition-colors rounded">
              Adhésion
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4">
            <Link href="/" className="block hover:text-secondary transition-colors">
              Accueil
            </Link>
            <Link href="/association" className="block hover:text-secondary transition-colors">
              L'Association
            </Link>
            <Link href="/projets" className="block hover:text-secondary transition-colors">
              Projets
            </Link>
            <Link href="/actualites" className="block hover:text-secondary transition-colors">
              Actualités
            </Link>
            <Link href="/adhesion" className="block bg-primary text-black px-4 py-2 hover:bg-primary-hover transition-colors w-fit rounded">
              Adhésion
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
