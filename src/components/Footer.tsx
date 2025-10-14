import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="mb-4">
              <Image
                src="/logo.jpg"
                alt="1, 2, 3 Soleil"
                width={100}
                height={50}
                className="h-10 w-auto mb-4"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Association audiovisuelle dédiée à la création, la formation et la diffusion de contenus culturels.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <nav className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors">
                Accueil
              </Link>
              <Link href="/association" className="block text-gray-300 hover:text-white transition-colors">
                L'Association
              </Link>
              <Link href="/projets" className="block text-gray-300 hover:text-white transition-colors">
                Projets
              </Link>
              <Link href="/actualites" className="block text-gray-300 hover:text-white transition-colors">
                Actualités
              </Link>
            </nav>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-300 mb-2">Association 1, 2, 3 Soleil</p>
            <p className="text-gray-300 mb-2">Avignon, France</p>
            <Link 
              href="/adhesion" 
              className="inline-block bg-primary text-black px-4 py-2 hover:bg-primary-hover transition-colors rounded"
            >
              Adhérer via HelloAsso
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Association 1, 2, 3 Soleil. Tous droits réservés.</p>
          <div className="mt-4 space-x-4">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-confidentialite" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
