import { NextResponse } from 'next/server';
import { getHomeHeroImages } from '@/lib/home-settings';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

/** GET /api/hero-images — retourne les URLs des images du hero (collection home_settings). */
export async function GET() {
  try {
    const urls = await getHomeHeroImages();
    return NextResponse.json({ urls });
  } catch (error) {
    console.error('[api/hero-images]', error);
    return NextResponse.json(
      { urls: [], error: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 200 }
    );
  }
}
