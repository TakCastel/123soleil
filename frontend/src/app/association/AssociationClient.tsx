'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';
import MessageBox from '@/components/MessageBox';
import PageHeader from '@/components/PageHeader';
import { usePageContentDelay } from '@/hooks/usePageContentDelay';
import type React from 'react';
import styles from '@/app/actualites/[slug]/actualite.module.css';

const LOGO_GIF_URL = '/assets/logo-123soleil-animated.gif';
const FALLBACK_VIDEO_URL = '/videos/video.mp4';
/** Durée d’une boucle du GIF (environ 5 s) : on attend la fin de la boucle avant d’afficher la vidéo */
const GIF_LOADER_DURATION_MS = 5000;

interface AssociationClientProps {
  associationVideoUrl?: string | null;
  /** HTML du contenu markdown (page Association), issu de Directus about_settings uniquement */
  contentHtml?: string | null;
}

export default function AssociationClient({ associationVideoUrl, contentHtml }: AssociationClientProps) {
  const videoUrl = associationVideoUrl || FALLBACK_VIDEO_URL;

  // Hook pour retarder l'apparition du contenu
  const isContentVisible = usePageContentDelay({ triggerAt: 0.3 }); // Délai plus court pour test
  
  // Fallback de sécurité - si le hook ne fonctionne pas, afficher après 1 seconde
  const [fallbackVisible, setFallbackVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setFallbackVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const shouldShowContent = isContentVisible || fallbackVisible;

  // Loader GIF sur la vidéo : affiché jusqu'à la fin du GIF, puis lecture auto de la vidéo
  const [showGifLoader, setShowGifLoader] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Ratio de la vidéo pour adapter le conteneur et éviter les bandes noires
  const [videoAspectRatio, setVideoAspectRatio] = useState<string | null>(null);

  // Timer : on laisse le GIF faire toute sa boucle (~5 s), puis on enlève le GIF et on affiche la vidéo
  useEffect(() => {
    const timeoutId = setTimeout(() => setShowGifLoader(false), GIF_LOADER_DURATION_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  // Dès que le loader est caché, on lance la vidéo (muted pour autoplay). On attend canplay si besoin.
  useEffect(() => {
    if (showGifLoader) return;
    const video = videoRef.current;
    if (!video) return;

    const startPlay = () => {
      video.muted = true;
      video.play().catch(() => {});
    };

    if (video.readyState >= 2) {
      startPlay();
    } else {
      video.addEventListener('canplay', startPlay, { once: true });
      return () => video.removeEventListener('canplay', startPlay);
    }
  }, [showGifLoader]);
  
  // Hooks pour les animations
  const gridLeftRef = useInView({ threshold: 0.2 });
  const gridRightRef = useInView({ threshold: 0.2 });

  // Formes autour de chaque carte : jaune et rouge pleins, positions stables par slug
  type ShapeItem = {
    type: 'triangle' | 'square';
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
    size: number;
    rot: number;
    color: string;
  };
  const shapeColors = ['#facc15', '#dc2626', '#eab308', '#b91c1c']; // jaune vif, rouge vif, amber, rouge foncé
  const seed = (s: string) => s.split('').reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
  const shapesAroundCard = (slug: string): ShapeItem[] => {
    const r = (i: number) => Math.abs((seed(slug) + i * 31) % 100) / 100;
    return [
      { type: 'triangle', top: -8, left: -12, size: 22 + r(1) * 14, rot: r(2) * 360, color: shapeColors[0] },
      { type: 'square', top: `${15 + r(3) * 25}%`, right: -14, size: 14 + r(4) * 12, rot: r(5) * 360, color: shapeColors[1] },
      { type: 'triangle', bottom: -6, left: `${20 + r(6) * 50}%`, size: 18 + r(7) * 10, rot: r(8) * 360, color: shapeColors[2] },
      { type: 'square', top: `${r(9) * 40}%`, left: -10, size: 12 + r(10) * 10, rot: r(11) * 360, color: shapeColors[3] },
    ];
  };

  const renderTrombiCard = (person: { name: string; role: string; slug: string; rotate: number; x: number; y: number; imageClass?: string }, index: number) => {
    const imageClass = person.imageClass ?? 'w-full h-full object-cover object-top scale-125';
    const shapes = shapesAroundCard(person.slug);
    return (
      <li
        key={person.slug}
        className={`scroll-animate fade-up scroll-delay-${(index % 5) * 100} ${shouldShowContent ? 'in-view' : ''}`}
        style={{ transform: `rotate(${person.rotate}deg) translate(${person.x}px, ${person.y}px)` }}
      >
        <div className="relative w-full max-w-[180px] overflow-visible">
          {/* Formes colorées autour de la carte, derrière */}
          {shapes.map((shape, i) => (
            <div
              key={i}
              className="absolute pointer-events-none z-0"
              style={{
                ...(shape.top !== undefined && { top: typeof shape.top === 'number' ? `${shape.top}px` : shape.top }),
                ...(shape.bottom !== undefined && { bottom: typeof shape.bottom === 'number' ? `${shape.bottom}px` : shape.bottom }),
                ...(shape.left !== undefined && { left: typeof shape.left === 'number' ? `${shape.left}px` : shape.left }),
                ...(shape.right !== undefined && { right: typeof shape.right === 'number' ? `${shape.right}px` : shape.right }),
                width: shape.size,
                height: shape.size,
                transform: `rotate(${shape.rot}deg)`,
                background: shape.color,
                clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
                borderRadius: shape.type === 'square' ? 4 : 0
              }}
            />
          ))}
            <div className="relative z-[1] p-2 pt-3 bg-white border border-black/20 rounded-sm" style={{ boxShadow: '4px 6px 16px rgba(0,0,0,0.18), 1px 2px 4px rgba(0,0,0,0.1)' }}>
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 border border-black/30">
              <Image
                src={`/assets/trombinoscope/${person.slug}.png`}
                alt={`${person.name}, ${person.role}`}
                className={imageClass}
                width={180}
                height={240}
                sizes="180px"
              />
            </div>
            <p className="mt-2 font-bold text-[color:var(--neutral-dark)] text-center text-sm">{person.name}</p>
            <p className="text-[color:var(--neutral-dark)]/80 text-center text-sm">{person.role}</p>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="">
      {/* En-tête diagonal jaune à pois */}
      <section className="bg-diagonal-primary dotted-overlay">
        <PageHeader
          seoTitle="Association 1,2,3 Soleil - Médiation culturelle solidaire"
          mainTitle="1,2,3..."
          subtitle="Quelques mots"
          description="Découvrez l'histoire, les missions et les engagements de notre association audiovisuelle, au service d'une médiation culturelle solidaire et inclusive sur le territoire avignonnais."
        />
      </section>

      {/* Présentation : titre fixe + texte (Directus) qui s’écoule autour de la vidéo */}
      <section className={`max-w-6xl mx-auto px-4 py-12 transition-opacity duration-500 ${shouldShowContent ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="display-title text-3xl mb-1 text-[color:var(--neutral-dark)]">L&apos;ACTION DE</h2>
        <p className="subtitle-black small mb-8">L&apos;ASSOCIATION</p>

        <div className="overflow-hidden">
          {/* Vidéo flottante à droite : le texte s’écoule à gauche et en dessous */}
          <div
            ref={gridRightRef.ref as React.RefObject<HTMLDivElement>}
            className={`relative w-full md:w-1/2 md:float-right md:ml-6 md:mb-4 bg-black border-2 border-black overflow-hidden flex items-center justify-center scroll-animate scale-in scroll-delay-200 ${gridRightRef.isInView && shouldShowContent ? 'in-view' : ''}`}
            style={{
              aspectRatio: videoAspectRatio ?? '4/3',
            }}
          >
            <>
              <div
                className={`absolute inset-0 flex items-center justify-center bg-black transition-opacity duration-300 z-10 ${showGifLoader ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                aria-hidden={!showGifLoader}
              >
                <div className="relative w-[70%] h-[70%] max-w-full max-h-full">
                  <Image
                    src={LOGO_GIF_URL}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="70vw"
                    unoptimized
                  />
                </div>
              </div>
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                className="w-full h-full object-contain"
                playsInline
                muted
                preload="auto"
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  if (v.videoWidth && v.videoHeight) {
                    setVideoAspectRatio(`${v.videoWidth} / ${v.videoHeight}`);
                  }
                }}
              >
                Votre navigateur ne prend pas en charge la lecture de vidéos.
              </video>
            </>
          </div>

          <div
            ref={gridLeftRef.ref as React.RefObject<HTMLDivElement>}
            className={`scroll-animate fade-up ${gridLeftRef.isInView && shouldShowContent ? 'in-view' : ''}`}
          >
            {contentHtml && (
              <div
                className={styles.articleContent}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            )}
          </div>
        </div>
      </section>

      {/* Trombinoscope — 3 rôles asso en premier, puis réals en bas — dispersé type tableau */}
      <section className={`max-w-6xl mx-auto px-4 py-12 transition-opacity duration-500 ${shouldShowContent ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="display-title text-3xl mb-12 text-[color:var(--neutral-dark)] text-center">
          LE BUREAU
        </h2>

        {/* 3 rôles de l'association en premier */}
        <ul className="flex flex-wrap justify-center items-center gap-8 md:gap-12 py-4">
          {[
            { name: 'Christine Conte', role: 'Présidente', slug: 'christine-conte', rotate: -5, x: -10, y: 6, imageClass: 'w-full h-full object-cover object-[center_22%] scale-100' },
            { name: 'Claire Feronwilmart', role: 'Administratrice', slug: 'claire-feronwilmart', rotate: 8, x: 12, y: -8 },
            { name: 'Elisabeth Cozian', role: 'Trésorière', slug: 'elisabeth-cozian', rotate: -4, x: 6, y: 10 }
          ].map((person, index) => renderTrombiCard(person, index))}
        </ul>

        <h3 className="display-title text-2xl md:text-3xl mb-8 mt-16 md:mt-20 text-[color:var(--neutral-dark)] text-center">
          LES VIDÉASTES
        </h3>

        {/* Vidéastes — grille 3 par 3, ordre alphabétique */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 py-4 justify-items-center">
          {[
            { name: 'Arnaud Ban', role: 'Réalisateur', slug: 'arnaud-ban', rotate: 0, x: 0, y: 0 },
            { name: 'Boris Doussy', role: 'Réalisateur', slug: 'boris-doussy', rotate: 0, x: 0, y: 0 },
            { name: 'Florine Clap', role: 'Réalisatrice', slug: 'florine-clap', rotate: 0, x: 0, y: 0 },
            { name: 'Karine Music', role: 'Réalisatrice', slug: 'karine-music', rotate: 0, x: 0, y: 0 },
            { name: 'Marie Delaruelle', role: 'Réalisatrice', slug: 'marie-delaruelle', rotate: 0, x: 0, y: 0 },
            { name: 'Pierre Lacourt', role: 'Réalisateur', slug: 'pierre-lacourt', rotate: 0, x: 0, y: 0 }
          ].map((person, index) => renderTrombiCard(person, index))}
        </ul>
      </section>

      {/* Objectifs des ateliers */}
      <section className={`max-w-6xl mx-auto px-4 py-12 transition-opacity duration-500 ${shouldShowContent ? 'opacity-100' : 'opacity-0'}`}>
        <MessageBox 
          title="LES OBJECTIFS DES ATELIERS"
          centered={false}
        >
          <ul className="list-stars space-y-3 text-[color:var(--neutral-dark)]">
            <li>Créer un cadre de rencontre créatif, bienveillant et inclusif entre des personnes issues de milieux sociaux parfois radicalement opposés.</li>
            <li>Favoriser au sein des ateliers une mixité intergénérationnelle.</li>
            <li>Élaborer des dispositifs de médiation vidéo, avec un collectif de réalisateurs et de bénévoles solidaires.</li>
            <li>Sensibiliser aux réalités sociales (immigration, pauvreté, exclusion sociale, inclusion en général).</li>
          </ul>
        </MessageBox>
      </section>
    </div>
  );
}

