'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import Logo from './Logo';

function getLinkProps(href: string, pathname: string, baseClass: string) {
  const isActive =
    pathname === href || (href !== '/' && pathname.startsWith(href + '/'));
  return {
    className: `${baseClass}${isActive ? ' !text-[color:var(--secondary)] font-bold' : ''}`.trim(),
    'aria-current': isActive ? ('page' as const) : undefined,
  };
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b-2 border-black h-16 md:h-24 text-[color:var(--neutral-dark)]">
      <div className="relative max-w-6xl mx-auto px-4 h-16 md:h-24 flex items-center">
        {/* Overlapping logo token - left aligned */}
        <Link href="/">
          <motion.div 
            className="header-logo-token header-logo-token--left"
            whileHover={{ 
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo width={84} height={84} className="w-14 h-14 md:w-full md:h-full object-cover aspect-square" animated={false} />
          </motion.div>
        </Link>

        <div className="flex w-full items-center justify-between">
          {/* Desktop Navigation - Centered with logo offset */}
          <nav className="hidden md:flex items-center justify-center space-x-8 flex-1 ml-24">
            <Link href="/" {...getLinkProps('/', pathname, 'hover:text-[color:var(--secondary)] transition-colors animate-in-down anim-delay-0')}>Accueil</Link>
            <Link href="/association" {...getLinkProps('/association', pathname, 'hover:text-[color:var(--secondary)] transition-colors animate-in-down anim-delay-1')}>L&apos;Association</Link>
            <Link href="/projets" {...getLinkProps('/projets', pathname, 'hover:text-[color:var(--secondary)] transition-colors animate-in-down anim-delay-2')}>Ateliers</Link>
            <Link href="/actualites" {...getLinkProps('/actualites', pathname, 'hover:text-[color:var(--secondary)] transition-colors animate-in-down anim-delay-3')}>Actualités</Link>
            <Link href="/contact" {...getLinkProps('/contact', pathname, 'hover:text-[color:var(--secondary)] transition-colors animate-in-down anim-delay-4')}>Contact</Link>
          </nav>

          {/* CTA Button - Right aligned */}
          <div className="hidden md:block animate-in-down anim-delay-5">
            <Button href="/adhesion" bgColor="var(--secondary)" labelColor="#ffffff">Adhésion</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto rounded-md p-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              id="mobile-menu"
              className="md:hidden fixed left-0 right-0 top-16 bottom-0 bg-white border-t border-gray-200 px-6 py-6 z-30"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-6 pt-1">
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }}>
                    <Link onClick={() => setIsMenuOpen(false)} href="/" {...getLinkProps('/', pathname, 'block text-xl hover:text-[color:var(--secondary)] transition-colors')}>Accueil</Link>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
                    <Link onClick={() => setIsMenuOpen(false)} href="/association" {...getLinkProps('/association', pathname, 'block text-xl hover:text-[color:var(--secondary)] transition-colors')}>L&apos;Association</Link>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
                    <Link onClick={() => setIsMenuOpen(false)} href="/projets" {...getLinkProps('/projets', pathname, 'block text-xl hover:text-[color:var(--secondary)] transition-colors')}>Ateliers</Link>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
                    <Link onClick={() => setIsMenuOpen(false)} href="/actualites" {...getLinkProps('/actualites', pathname, 'block text-xl hover:text-[color:var(--secondary)] transition-colors')}>Actualités</Link>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Link onClick={() => setIsMenuOpen(false)} href="/contact" {...getLinkProps('/contact', pathname, 'block text-xl hover:text-[color:var(--secondary)] transition-colors')}>Contact</Link>
                  </motion.div>
                </div>
                <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="pb-2">
                  <div className="inline-block origin-left">
                    <Button href="/adhesion" bgColor="var(--secondary)" labelColor="#ffffff">Adhésion</Button>
                  </div>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
