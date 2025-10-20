"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import Button from './Button';

export default function Footer() {
  const { ref: logoRef, isInView: logoInView } = useInView({ threshold: 0.3, triggerOnce: true });
  const { ref: contentRef, isInView: contentInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: bottomRef, isInView: bottomInView } = useInView({ threshold: 0.3, triggerOnce: true });

  // Animation variants
  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 0.6
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        duration: 0.5
      }
    }
  };

  const bottomVariants = {
    hidden: { 
      opacity: 0, 
      y: 20
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 0.6
      }
    }
  };

  return (
    <footer className="footer-section dotted-overlay">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Logo section with animation */}
        <motion.div 
          ref={logoRef}
          className="flex justify-center mb-12"
          variants={logoVariants}
          initial="hidden"
          animate={logoInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="footer-logo-token"
            whileHover={{ 
              scale: 1.05,
              rotate: 2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Image 
              src="/logo.jpg" 
              alt="1, 2, 3 Soleil" 
              width={120} 
              height={120} 
              className="w-28 h-28 object-cover" 
            />
          </motion.div>
        </motion.div>

        {/* Main content grid with staggered animations */}
        <motion.div 
          ref={contentRef}
          className="grid md:grid-cols-3 gap-12 mb-12"
          variants={contentVariants}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
        >
          {/* Association info */}
          <motion.div 
            className="text-center md:text-left"
            variants={sectionVariants}
          >
            <motion.h3 
              className="display-title text-2xl text-[color:var(--neutral-dark)] mb-4"
              whileHover={{ scale: 1.02 }}
            >
              ASSOCIATION
            </motion.h3>
            <motion.p 
              className="text-[color:var(--neutral-dark)] mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Association audiovisuelle dédiée à la création, la formation et la diffusion de contenus culturels solidaires et inclusifs.
            </motion.p>
            <motion.div 
              className="flex justify-center md:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Button 
                href="/adhesion" 
                bgColor="var(--secondary)" 
                labelColor="#ffffff"
              >
                Adhérer à l&apos;association
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Navigation */}
          <motion.div 
            className="text-center"
            variants={sectionVariants}
          >
            <motion.h3 
              className="display-title text-2xl text-[color:var(--neutral-dark)] mb-6"
              whileHover={{ scale: 1.02 }}
            >
              NAVIGATION
            </motion.h3>
            <motion.nav 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {[
                { href: "/", label: "Accueil" },
                { href: "/association", label: "L'Association" },
                { href: "/projets", label: "Médiations" },
                { href: "/actualites", label: "Actualités" }
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
                >
                  <Link 
                    href={link.href} 
                    className="block text-[color:var(--neutral-dark)] hover:text-[color:var(--secondary)] transition-colors font-medium"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
          
          {/* Contact */}
          <motion.div 
            className="text-center md:text-right"
            variants={sectionVariants}
          >
            <motion.h3 
              className="display-title text-2xl text-[color:var(--neutral-dark)] mb-6"
              whileHover={{ scale: 1.02 }}
            >
              CONTACT
            </motion.h3>
            <motion.div 
              className="space-y-3 text-[color:var(--neutral-dark)]"
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.p 
                className="font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                Association 1, 2, 3 Soleil
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                Avignon, France
              </motion.p>
              <motion.p 
                className="text-sm opacity-80"
                initial={{ opacity: 0, y: 10 }}
                animate={contentInView ? { opacity: 0.8, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.8, duration: 0.3 }}
              >
                Pour un cinéma solidaire et inclusif
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Bottom section with legal links */}
        <motion.div 
          ref={bottomRef}
          className="border-t-2 border-[color:var(--neutral-dark)] pt-8"
          variants={bottomVariants}
          initial="hidden"
          animate={bottomInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            animate={bottomInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.p 
              className="text-[color:var(--neutral-dark)] font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={bottomInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              &copy; 2024 Association 1, 2, 3 Soleil. Tous droits réservés.
            </motion.p>
            <motion.div 
              className="flex justify-center space-x-6 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={bottomInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <Link 
                href="/mentions-legales" 
                className="text-[color:var(--neutral-dark)] hover:text-[color:var(--secondary)] transition-colors"
              >
                Mentions légales
              </Link>
              <Link 
                href="/politique-confidentialite" 
                className="text-[color:var(--neutral-dark)] hover:text-[color:var(--secondary)] transition-colors"
              >
                Politique de confidentialité
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}
