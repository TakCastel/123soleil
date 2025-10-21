import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Projet {
  id: string;
  titre: string;
  categorie: string;
  annee: number;
  description: string;
  image?: string;
  video_url?: string;
  content?: string;
}

export function getProjets(categorie?: string): Projet[] {
  const projetsDirectory = path.join(process.cwd(), 'content/projets');
  
  // Vérifier si le dossier existe
  if (!fs.existsSync(projetsDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(projetsDirectory);
  
  const projets = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(projetsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        id: filename.replace(/\.md$/, ''),
        titre: data.titre || '',
        categorie: data.categorie || '',
        annee: data.annee || new Date().getFullYear(),
        description: data.description || '',
        image: data.image && data.image !== '' ? data.image : undefined
      };
    })
    .filter(projet => !categorie || projet.categorie === categorie);

  // Trier par année décroissante
  projets.sort((a, b) => b.annee - a.annee);

  return projets;
}

export function getProjetBySlug(slug: string) {
  const projetsDirectory = path.join(process.cwd(), 'content/projets');
  const filePath = path.join(projetsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    id: slug,
    titre: data.titre || '',
    categorie: data.categorie || '',
    annee: data.annee || new Date().getFullYear(),
    description: data.description || '',
    image: data.image && data.image !== '' ? data.image : undefined,
    video_url: data.video_url,
    content: content
  };
}

