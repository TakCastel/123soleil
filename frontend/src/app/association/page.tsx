import type { Metadata } from 'next';
import AssociationClient from './AssociationClient';
import { getAboutSettingsContent } from '@/lib/about-settings';
import { marked } from 'marked';

export const metadata: Metadata = {
  title: "L'Association",
  description:
    "Découvrez 1, 2, 3 Soleil, association de cinéma à Avignon : histoire, missions et engagements pour un cinéma solidaire et une médiation culturelle inclusive sur le territoire avignonnais.",
  openGraph: {
    url: "/association",
  },
};

export default async function Association() {
  const aboutContent = await getAboutSettingsContent();
  const contentHtml = aboutContent ? await marked(aboutContent) : null;
  return <AssociationClient contentHtml={contentHtml} />;
}
