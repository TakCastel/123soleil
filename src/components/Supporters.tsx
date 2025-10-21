'use client';

import Image from 'next/image';
import { useInView } from '@/hooks/useInView';
import styles from './Supporters.module.css';

export default function Supporters() {
  const titleRef = useInView({ threshold: 0.3 });
  const logo1Ref = useInView({ threshold: 0.3 });
  const logo2Ref = useInView({ threshold: 0.3 });

  return (
    <section className={styles.supportersSection}>
      <div className={styles.container}>
        <h2 
          ref={titleRef.ref as React.RefObject<HTMLHeadingElement>}
          className={`display-title text-3xl mb-12 text-center text-[color:var(--neutral-dark)] scroll-animate fade-up ${titleRef.isInView ? 'in-view' : ''}`}
        >
          Avec le Soutien de
        </h2>
        <div className={styles.logosContainer}>
          <a 
            ref={logo1Ref.ref as React.RefObject<HTMLAnchorElement>}
            href="https://www.grandavignon.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${styles.logoWrapper} scroll-animate scale-in scroll-delay-100 ${logo1Ref.isInView ? 'in-view' : ''} transition-transform duration-300 ease-in-out hover:scale-105`}
          >
            <Image
              src="/grand-avignon-logo.svg"
              alt="Grand Avignon"
              width={200}
              height={100}
              className={`${styles.logo} ${styles.logoGrandAvignon}`}
            />
          </a>
          <a 
            ref={logo2Ref.ref as React.RefObject<HTMLAnchorElement>}
            href="https://www.avignon.fr" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${styles.logoWrapper} scroll-animate scale-in scroll-delay-200 ${logo2Ref.isInView ? 'in-view' : ''} transition-transform duration-300 ease-in-out hover:scale-105`}
          >
            <Image
              src="/ville-avignon-logo.png"
              alt="Ville d'Avignon"
              width={200}
              height={100}
              className={`${styles.logo} ${styles.logoVilleAvignon}`}
            />
          </a>
        </div>
      </div>
    </section>
  );
}

