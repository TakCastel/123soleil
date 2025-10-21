import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Actualite {
  id: string;
  titre: string;
  date: string;
  categorie: string;
  description: string;
  image?: string;
  isBreaking?: boolean;
  content?: string;
}

export function getActualites(): Actualite[] {
  const actualitesDirectory = path.join(process.cwd(), 'content/actualites');
  
  // Vérifier si le dossier existe
  if (!fs.existsSync(actualitesDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(actualitesDirectory);
  
  const actualites = filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => {
      const filePath = path.join(actualitesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        id: filename.replace(/\.md$/, ''),
        titre: data.titre || '',
        date: data.date ? new Date(data.date).toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }) : '',
        categorie: data.categorie || '',
        description: data.description || '',
        image: data.image && data.image !== '' ? data.image : undefined,
        isBreaking: false
      };
    });

  // Trier par date décroissante
  actualites.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  // Marquer la première actualité comme "breaking news"
  if (actualites.length > 0) {
    actualites[0].isBreaking = true;
  }

  return actualites;
}

export function getActualiteBySlug(slug: string) {
  const actualitesDirectory = path.join(process.cwd(), 'content/actualites');
  const filePath = path.join(actualitesDirectory, `${slug}.md`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    id: slug,
    titre: data.titre || '',
    date: data.date ? new Date(data.date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) : '',
    categorie: data.categorie || '',
    description: data.description || '',
    image: data.image && data.image !== '' ? data.image : undefined,
    content: content
  };
}

